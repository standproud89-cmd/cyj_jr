const crypto = require('crypto');
// 수업 화면 송출 · 학생 기록용 API (구글시트 탭 2개를 씀 — 없으면 자동으로 만들어요)
//  ClassRoster : A반명 B요일(MWF/TTH) C담당ID D담당이름 E학생(JSON) F수정시각
//  ClassLog    : A기록ID B날짜 C시간 D반명 E학생 F항목 G점수 H기록자ID I기록자 J취소(1이면 취소된 기록)
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const ROSTER = 'ClassRoster';
const LOG = 'ClassLog';

function b64u(input) {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function getAccessToken() {
  let creds;
  try { creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}'); }
  catch (e) { throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON 환경변수가 올바른 JSON 형식이 아니에요: ' + e.message); }
  const email = creds.client_email, privateKey = (creds.private_key || '').replace(/\\n/g, '\n');
  if (!email || !privateKey) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON 안에 client_email 또는 private_key가 없어요');
  const now = Math.floor(Date.now() / 1000);
  const unsigned = b64u(JSON.stringify({ alg: 'RS256', typ: 'JWT' })) + '.' + b64u(JSON.stringify({
    iss: email, scope: 'https://www.googleapis.com/auth/spreadsheets', aud: 'https://oauth2.googleapis.com/token', exp: now + 3600, iat: now }));
  const sign = crypto.createSign('RSA-SHA256'); sign.update(unsigned); sign.end();
  const jwt = unsigned + '.' + sign.sign(privateKey).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }) });
  const data = await res.json();
  if (!data.access_token) throw new Error('구글 토큰 발급 실패: ' + JSON.stringify(data));
  return data.access_token;
}
const base = () => `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}`;
async function call(url, token, opt = {}) {
  const res = await fetch(url, { ...opt, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
  const data = await res.json();
  if (data.error) { const e = new Error(JSON.stringify(data.error)); e.gerr = data.error; throw e; }
  return data;
}
const HEAD = {
  [ROSTER]: ['반명', '요일', '담당ID', '담당이름', '학생(JSON)', '수정시각'],
  [LOG]: ['기록ID', '날짜', '시간', '반명', '학생', '항목', '점수', '기록자ID', '기록자', '취소'],
};
async function ensureTabs(token) {
  const meta = await call(`${base()}?fields=sheets.properties.title`, token);
  const have = new Set((meta.sheets || []).map((s) => s.properties.title));
  for (const tab of [ROSTER, LOG]) {
    if (have.has(tab)) continue;
    await call(`${base()}:batchUpdate`, token, { method: 'POST', body: JSON.stringify({ requests: [{ addSheet: { properties: { title: tab } } }] }) });
    const col = String.fromCharCode(64 + HEAD[tab].length);
    await call(`${base()}/values/${encodeURIComponent(`${tab}!A1:${col}1`)}?valueInputOption=RAW`, token, {
      method: 'PUT', body: JSON.stringify({ values: [HEAD[tab]] }) });
  }
}
async function read(token, range) {
  const d = await call(`${base()}/values/${encodeURIComponent(range)}`, token);
  return d.values || [];
}
const s = (v, n = 60) => String(v == null ? '' : v).slice(0, n);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const token = await getAccessToken();
    await ensureTabs(token);

    if (req.method === 'GET') {
      const type = req.query.type;
      if (type === 'roster') {
        const rows = await read(token, `${ROSTER}!A2:F`);
        const classes = rows.filter((r) => r[0]).map((r) => {
          let students = []; try { students = JSON.parse(r[4] || '[]'); } catch (e) {}
          return { cls: r[0], days: r[1] || 'MWF', teacherId: r[2] || '', teacherName: r[3] || '', students, updatedAt: r[5] || '' };
        });
        return res.status(200).json({ classes });
      }
      if (type === 'logs') {
        const cls = req.query.cls;
        if (!cls) return res.status(400).json({ error: 'cls 파라미터가 필요해요' });
        const rows = await read(token, `${LOG}!A2:J`);
        const logs = rows.filter((r) => r[3] === cls && r[9] !== '1').map((r) => ({
          id: r[0], date: r[1], time: r[2], cls: r[3], stu: r[4], item: r[5], pt: Number(r[6]) || 0, byId: r[7] || '', by: r[8] || '' }));
        return res.status(200).json({ logs });
      }
      return res.status(400).json({ error: 'type 파라미터는 roster 또는 logs 예요' });
    }

    if (req.method === 'POST') {
      const b = req.body || {};
      if (b.action === 'saveRoster') {
        if (!b.cls) return res.status(400).json({ error: '반명이 필요해요' });
        const students = (Array.isArray(b.students) ? b.students : []).map((x) => s(x, 30).trim()).filter(Boolean).slice(0, 18);
        const rows = await read(token, `${ROSTER}!A2:F`);
        const key = b.oldCls || b.cls;
        const idx = rows.findIndex((r) => r[0] === key);
        if (b.oldCls !== b.cls && rows.some((r) => r[0] === b.cls)) return res.status(409).json({ error: '같은 반명이 이미 있어요' });
        const now = new Date().toISOString();
        const vals = [s(b.cls, 30), b.days === 'TTH' ? 'TTH' : 'MWF', s(b.teacherId, 30), s(b.teacherName, 30), JSON.stringify(students), now];
        if (idx >= 0) {
          await call(`${base()}/values/${encodeURIComponent(`${ROSTER}!A${idx + 2}:F${idx + 2}`)}?valueInputOption=RAW`, token, { method: 'PUT', body: JSON.stringify({ values: [vals] }) });
        } else {
          await call(`${base()}/values/${encodeURIComponent(`${ROSTER}!A:F`)}:append?valueInputOption=RAW`, token, { method: 'POST', body: JSON.stringify({ values: [vals] }) });
        }
        return res.status(200).json({ ok: true });
      }
      if (b.action === 'deleteRoster') {
        const rows = await read(token, `${ROSTER}!A2:F`);
        const idx = rows.findIndex((r) => r[0] === b.cls);
        if (idx < 0) return res.status(404).json({ error: '반을 찾지 못했어요' });
        await call(`${base()}/values/${encodeURIComponent(`${ROSTER}!A${idx + 2}:F${idx + 2}`)}:clear`, token, { method: 'POST', body: '{}' });
        return res.status(200).json({ ok: true });
      }
      if (b.action === 'log') {
        if (!b.id || !b.cls || !b.stu || !b.item) return res.status(400).json({ error: 'id/cls/stu/item 값이 필요해요' });
        const vals = [s(b.id, 40), s(b.date, 10), s(b.time, 8), s(b.cls, 30), s(b.stu, 30), s(b.item, 40), Number(b.pt) || 0, s(b.byId, 30), s(b.by, 30), ''];
        await call(`${base()}/values/${encodeURIComponent(`${LOG}!A:J`)}:append?valueInputOption=RAW`, token, { method: 'POST', body: JSON.stringify({ values: [vals] }) });
        return res.status(200).json({ ok: true });
      }
      if (b.action === 'undo') {
        const ids = await read(token, `${LOG}!A2:A`);
        const idx = ids.findIndex((r) => r[0] === b.id);
        if (idx < 0) return res.status(404).json({ error: '기록을 찾지 못했어요' });
        await call(`${base()}/values/${encodeURIComponent(`${LOG}!J${idx + 2}`)}?valueInputOption=RAW`, token, { method: 'PUT', body: JSON.stringify({ values: [['1']] }) });
        return res.status(200).json({ ok: true });
      }
      return res.status(400).json({ error: 'unknown action' });
    }
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
