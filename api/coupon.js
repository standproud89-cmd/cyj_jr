const crypto = require('crypto');

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function getAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  if (!email || !privateKey) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY 환경변수가 설정 안 됨');
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

      if (action === 'balances') {
        const data = await sheetsGet('잔여현황!A2:D', token);
        const rows = (data.values || []).map((r) => ({
          id: r[0] || '',
          name: r[1] || '',
          lte: Number(r[2] || 0),
          wow: Number(r[3] || 0),
        }));
        return res.status(200).json({ rows });
      }

      if (action === 'history') {
        const data = await sheetsGet('거래내역!A2:I', token);
        const rows = (data.values || []).map((r, i) => ({
          row: i + 2,
          date: r[0] || '',
          id: r[1] || '',
          name: r[2] || '',
          type: r[3] || '',
          category: r[4] || '',
          delta: r[5] || '',
          reason: r[6] || '',
          status: r[7] || '',
          handler: r[8] || '',
        }));
        return res.status(200).json({ rows });
      }

      return res.status(400).json({ error: 'unknown action' });
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const action = body.action;

      if (action === 'request') {
        const now = new Date().toISOString();
        await sheetsAppend(
          '거래내역!A:I',
          [now, body.id, body.name, body.type, '신청', -1, body.reason || '', '대기', ''],
          token
        );
        return res.status(200).json({ ok: true });
      }

      if (action === 'grant') {
        const now = new Date().toISOString();
        const delta = Number(body.delta);
        const category = delta > 0 ? '지급' : '회수';
        await sheetsAppend(
          '거래내역!A:I',
          [now, body.id, body.name, body.type, category, delta, body.reason || '', '완료', body.handler || ''],
          token
        );
        return res.status(200).json({ ok: true });
      }

      if (action === 'resolve') {
        const status = body.decision === 'approve' ? '완료' : '거절';
        await sheetsUpdate(`거래내역!H${body.row}:I${body.row}`, [status, body.handler || ''], token);
        return res.status(200).json({ ok: true });
      }

      return res.status(400).json({ error: 'unknown action' });
    }

    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
