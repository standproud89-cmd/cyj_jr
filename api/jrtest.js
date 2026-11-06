const crypto = require('crypto');
// 주니어테스트 성적 저장용 API (구글시트의 "JrTest" 탭 사용 — 탭이 없으면 자동으로 만들어요)
// 열: A키 B기간 C반명 D과목 E담당 F학생JSON G수정시각 H수정자
const TAB = 'JrTest';
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

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
async function ensureTab(token) {
  const meta = await call(`${base()}?fields=sheets.properties.title`, token);
  if ((meta.sheets || []).some((s) => s.properties.title === TAB)) return;
  await call(`${base()}:batchUpdate`, token, { method: 'POST', body: JSON.stringify({ requests: [{ addSheet: { properties: { title: TAB } } }] }) });
  await call(`${base()}/values/${encodeURIComponent(TAB + '!A1:H1')}?valueInputOption=USER_ENTERED`, token, {
    method: 'PUT', body: JSON.stringify({ values: [['키', '기간', '반명', '과목', '담당', '학생(JSON)', '수정시각', '수정자']] }) });
}
async function readAll(token) {
  await ensureTab(token);
  const d = await call(`${base()}/values/${encodeURIComponent(TAB + '!A2:H')}`, token);
  return d.values || [];
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const token = await getAccessToken();
    if (req.method === 'GET') {
      const period = req.query.period;
      if (!period) return res.status(400).json({ error: 'period 파라미터가 필요해요' });
      const rows = await readAll(token);
      const items = rows.filter((r) => r[1] === period).map((r) => {
        let students = []; try { students = JSON.parse(r[5] || '[]'); } catch (e) {}
        return { key: r[0], period: r[1], cls: r[2], subject: r[3], teacher: r[4], students, updatedAt: r[6] || '', updatedBy: r[7] || '' };
      });
      return res.status(200).json({ items });
    }
    if (req.method === 'POST') {
      const b = req.body || {};
      if (b.action !== 'save') return res.status(400).json({ error: 'unknown action' });
      if (!b.period || !b.cls || !b.subject) return res.status(400).json({ error: 'period/cls/subject 값이 필요해요' });
      const students = (Array.isArray(b.students) ? b.students : []).slice(0, 12).map((s) => ({
        n: String((s && s.n) || '').slice(0, 40),
        s: (s && s.s !== '' && s.s != null && !isNaN(+s.s)) ? Math.max(0, Math.min(100, +s.s)) : '' }));
      const key = `${b.period}|${b.cls}|${b.subject}`;
      const rows = await readAll(token);
      const idx = rows.findIndex((r) => r[0] === key);
      const now = new Date().toISOString();
      const vals = [key, b.period, b.cls, b.subject, b.teacher || '', JSON.stringify(students), now, b.by || ''];
      if (idx >= 0) {
        await call(`${base()}/values/${encodeURIComponent(`${TAB}!A${idx + 2}:H${idx + 2}`)}?valueInputOption=USER_ENTERED`, token, { method: 'PUT', body: JSON.stringify({ values: [vals] }) });
      } else {
        await call(`${base()}/values/${encodeURIComponent(TAB + '!A:H')}:append?valueInputOption=USER_ENTERED`, token, { method: 'POST', body: JSON.stringify({ values: [vals] }) });
      }
      return res.status(200).json({ ok: true, updatedAt: now });
    }
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
