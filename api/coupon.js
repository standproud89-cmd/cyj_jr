const crypto = require('crypto');

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function getAccessToken() {
  let creds;
  try {
    creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');
  } catch (e) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON 환경변수가 올바른 JSON 형식이 아니에요: ' + e.message);
  }
  const email = creds.client_email;
  const privateKey = (creds.private_key || '').replace(/\\n/g, '\n');
  if (!email || !privateKey) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON 안에 client_email 또는 private_key가 없어요');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claimSet = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };
  const unsigned = base64url(JSON.stringify(header)) + '.' + base64url(JSON.stringify(claimSet));

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsigned);
  sign.end();
  const signature = sign
    .sign(privateKey)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const jwt = unsigned + '.' + signature;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!data.access_token) {
    throw new Error('구글 토큰 발급 실패: ' + JSON.stringify(data));
  }
  return data.access_token;
}

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

// 거래내역 행(A~L) 배열을 받아 만료일 기반 FIFO 소진 로직으로 선생님별 잔여 개수를 계산한다.
// A:캠퍼스 B:일시 C:아이디 D:이름 E:종류 F:구분 G:증감 H:사유 I:상태 J:처리자 K:만료일 L:무제한
function computeBalances(rows) {
  const lots = {}; // key = "아이디|종류" -> [{qty, expiry:'YYYY-MM-DD'|null, unlimited:bool}]
  const names = {};
  const todayStr = new Date().toISOString().slice(0, 10);

  function getLots(key) {
    if (!lots[key]) lots[key] = [];
    return lots[key];
  }

  for (const r of rows) {
    const id = r[2] || '';
    const name = r[3] || '';
    const type = r[4] || '';
    const category = r[5] || '';
    const delta = Number(r[6] || 0);
    const expiryRaw = (r[10] || '').trim();
    const unlimitedRaw = (r[11] || '').trim();
    if (!id || !type) continue;
    names[id] = name;
    const key = id + '|' + type;

    if (category === '지급') {
      const hasExpiryCols = expiryRaw !== '' || unlimitedRaw !== '';
      let unlimited = false;
      let expiry = null;
      if (!hasExpiryCols) {
        // K/L 컬럼이 생기기 전(과거)에 지급된 건 - 만료 개념이 없었으므로 무제한으로 취급
        unlimited = true;
      } else if (unlimitedRaw === 'Y') {
        unlimited = true;
      } else if (expiryRaw) {
        expiry = expiryRaw;
      }
      getLots(key).push({ qty: delta, expiry, unlimited });
    } else if (category === '사용' || category === '회수') {
      let need = Math.abs(delta);
      const lotArr = getLots(key);
      const order = lotArr
        .filter((lot) => lot.qty > 0)
        .sort((a, b) => {
          if (a.unlimited && !b.unlimited) return 1;
          if (!a.unlimited && b.unlimited) return -1;
          if (a.unlimited && b.unlimited) return 0;
          return (a.expiry || '').localeCompare(b.expiry || '');
        });
      for (const lot of order) {
        if (need <= 0) break;
        const take = Math.min(lot.qty, need);
        lot.qty -= take;
        need -= take;
      }
    }
  }

  const result = {};
  for (const key in lots) {
    const [id, type] = key.split('|');
    if (!result[id]) {
      result[id] = {
        id, name: names[id] || id,
        lte: 0, wow: 0,
        lteExpiry: null, wowExpiry: null,
        lteUnlimited: false, wowUnlimited: false,
      };
    }
    let sum = 0;
    let nearestExpiry = null;
    let hasUnlimited = false;
    for (const lot of lots[key]) {
      if (lot.qty <= 0) continue;
      if (!lot.unlimited && lot.expiry && lot.expiry < todayStr) continue; // 만료된 잔여분은 카운트하지 않음
      sum += lot.qty;
      if (lot.unlimited) hasUnlimited = true;
      else if (lot.expiry && (!nearestExpiry || lot.expiry < nearestExpiry)) nearestExpiry = lot.expiry;
    }
    if (type === 'LTE') {
      result[id].lte = sum;
      result[id].lteExpiry = nearestExpiry;
      result[id].lteUnlimited = hasUnlimited;
    } else if (type === 'Wow') {
      result[id].wow = sum;
      result[id].wowExpiry = nearestExpiry;
      result[id].wowUnlimited = hasUnlimited;
    }
  }
  return Object.values(result);
}

async function sheetsGet(range, token) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json();
  if (data.error) throw new Error('시트 읽기 실패: ' + JSON.stringify(data.error));
  return data;
}

async function sheetsAppend(range, values, token) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [values] }),
  });
  const data = await res.json();
  if (data.error) throw new Error('시트 추가 실패: ' + JSON.stringify(data.error));
  return data;
}

async function sheetsUpdate(range, values, token) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [values] }),
  });
  const data = await res.json();
  if (data.error) throw new Error('시트 수정 실패: ' + JSON.stringify(data.error));
  return data;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const token = await getAccessToken();

    if (req.method === 'GET') {
      const action = req.query.action;
      const campus = req.query.campus;
      if (!campus) {
        return res.status(400).json({ error: 'campus 파라미터가 필요해요' });
      }

      if (action === 'balances') {
        const data = await sheetsGet('거래내역!A2:L', token);
        const rows = (data.values || []).filter((r) => (r[0] || '') === campus);
        const balanceRows = computeBalances(rows);
        return res.status(200).json({ rows: balanceRows });
      }

      if (action === 'history') {
        const data = await sheetsGet('거래내역!A2:L', token);
        const rows = (data.values || [])
          .map((r, i) => ({
            row: i + 2,
            campus: r[0] || '',
            date: r[1] || '',
            id: r[2] || '',
            name: r[3] || '',
            type: r[4] || '',
            category: r[5] || '',
            delta: r[6] || '',
            reason: r[7] || '',
            status: r[8] || '',
            handler: r[9] || '',
            expiry: r[10] || '',
            unlimited: r[11] || '',
          }))
          .filter((r) => r.campus === campus);
        return res.status(200).json({ rows });
      }

      return res.status(400).json({ error: 'unknown action' });
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const action = body.action;
      if (!body.campus) {
        return res.status(400).json({ error: 'campus 값이 필요해요' });
      }

      if (action === 'request') {
        const now = new Date().toISOString();
        await sheetsAppend(
          '거래내역!A:L',
          [body.campus, now, body.id, body.name, body.type, '사용', -1, body.reason || '', '완료', body.name, '', ''],
          token
        );
        return res.status(200).json({ ok: true });
      }

      if (action === 'grant') {
        const now = new Date();
        const nowIso = now.toISOString();
        const delta = Number(body.delta);
        const category = delta > 0 ? '지급' : '회수';

        let expiryStr = '';
        let unlimitedFlag = '';
        if (category === '지급') {
          if (body.unlimited) {
            unlimitedFlag = 'Y';
          } else {
            const expiry = new Date(now);
            expiry.setMonth(expiry.getMonth() + 6);
            expiryStr = expiry.toISOString().slice(0, 10);
          }
        }

        await sheetsAppend(
          '거래내역!A:L',
          [body.campus, nowIso, body.id, body.name, body.type, category, delta, body.reason || '', '완료', body.handler || '', expiryStr, unlimitedFlag],
          token
        );
        return res.status(200).json({ ok: true });
      }

      return res.status(400).json({ error: 'unknown action' });
    }

    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
