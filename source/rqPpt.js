/* ===== 수업 PPT(.pptx) → Review Quiz 문제 자동 생성 (AI 없이 패턴) =====
   본사 LF PPT 구조 기준
   - "Student book pp.xx" 슬라이드부터가 오늘 수업 (그 앞은 숙제 확인·지난 시간 리뷰)
   - Today's Grammar Point: "단어 (뜻)" 목록 + Q./A. 예문
   - Activity Time: 질문/대답 문장
   - 빈칸 게임: "Q. ___ does Jeff ___ ?" + 빨간 정답 글상자 → 완전한 문장으로 복원 */
import JSZip from "jszip";

const EMU_IN = 914400;
const RED = /^(FF0000|C00000|E60000|FF3333)$/i;
const norm = (s) => (s || "").replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
const hasKo = (s) => /[가-힣]/.test(s);
const words = (s) => norm(s).split(" ").filter(Boolean);
const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const uniq = (a, key = (x) => x) => { const s = new Set(); return a.filter((x) => { const k = key(x); if (s.has(k)) return false; s.add(k); return true; }); };

/* ---------- PPTX 읽기 ---------- */
function childrenByTag(el, tag) { const out = []; for (let n = el.firstChild; n; n = n.nextSibling) if (n.nodeType === 1 && (n.localName === tag || n.nodeName === tag)) out.push(n); return out; }
function descByTag(el, tag) { return Array.from(el.getElementsByTagName(tag)); }

function readShape(sp) {
  const off = descByTag(sp, "a:off")[0];
  const x = off ? Number(off.getAttribute("x")) / EMU_IN : 0;
  const y = off ? Number(off.getAttribute("y")) / EMU_IN : 0;
  const nv = descByTag(sp, "p:cNvPr")[0];
  const name = nv ? nv.getAttribute("name") || "" : "";
  const paras = [];
  let redChars = 0, allChars = 0;
  descByTag(sp, "a:p").forEach((p) => {
    let t = "";
    descByTag(p, "a:r").forEach((r) => {
      const tt = descByTag(r, "a:t").map((n) => n.textContent).join("");
      const clr = descByTag(r, "a:srgbClr")[0];
      if (clr && RED.test(clr.getAttribute("val") || "")) redChars += tt.trim().length;
      allChars += tt.trim().length;
      t += tt;
    });
    descByTag(p, "a:br").forEach(() => {});
    if (norm(t)) paras.push(t);
  });
  return { name, x, y, paras, text: norm(paras.join(" ")), red: allChars > 0 && redChars / allChars > 0.6 };
}

export async function readPptx(arrayBuffer, parseXml) {
  const zip = await JSZip.loadAsync(arrayBuffer);
  const xml = async (path) => { const f = zip.file(path); return f ? parseXml(await f.async("string")) : null; };
  const pres = await xml("ppt/presentation.xml");
  const rels = await xml("ppt/_rels/presentation.xml.rels");
  const relMap = {};
  descByTag(rels, "Relationship").forEach((r) => { relMap[r.getAttribute("Id")] = r.getAttribute("Target"); });
  const ids = descByTag(pres, "p:sldId").map((s) => s.getAttribute("r:id"));
  const slides = [];
  for (const id of ids) {
    const target = relMap[id]; if (!target) continue;
    const doc = await xml("ppt/" + target.replace(/^\/?ppt\//, ""));
    if (!doc) continue;
    const shapes = descByTag(doc, "p:sp").map(readShape).filter((s) => s.text);
    slides.push({ shapes, text: shapes.map((s) => s.text).join(" ") });
  }
  return slides;
}

/* ---------- 오늘 수업 부분 찾기 ---------- */
function todaySlides(slides) {
  const i = slides.findIndex((s) => /student\s*book/i.test(s.text));
  return i >= 0 ? slides.slice(i + 1) : slides;
}

/* 문장처럼 보이는지 */
function isSentence(s) {
  const t = norm(s);
  if (hasKo(t) || t.includes("__")) return false;
  if (!/[.?]$/.test(t)) return false;
  const w = words(t);
  return w.length >= 3 && w.length <= 14 && /^[A-Z"']/.test(t);
}
/* "Q. ... A. ..." → 문장들 */
function splitQA(text) {
  return norm(text).split(/(?:^|\s)[QA]\s*\.\s*/).map((x) => norm(x)).filter(Boolean)
    .map((x) => x.replace(/^(Yes|No|Sure)(?=[,.])/, "$1"));
}

/* 빈칸 게임: 밑줄 자리에 빨간 정답을 순서대로 넣어 문장 복원 */
function rebuildBlanks(slide) {
  const lines = slide.shapes.filter((s) => !s.red && /_{2,}/.test(s.text) && /^\s*[QA]?\.?/.test(s.text)).sort((a, b) => a.y - b.y);
  const reds = slide.shapes.filter((s) => s.red && !/^\d+$/.test(s.text));
  if (!lines.length || !reds.length) return [];
  const out = [];
  lines.forEach((ln, li) => {
    const next = lines[li + 1];
    const mine = reds.filter((r) => r.y >= ln.y - 0.25 && (!next || r.y < next.y - 0.15))
      .sort((a, b) => (Math.abs(a.y - b.y) < 0.3 ? a.x - b.x : a.y - b.y));
    const answers = mine.flatMap((r) => r.paras.flatMap((p) => norm(p).split(/\s{1,}/))).filter(Boolean);
    let src = norm(ln.paras.join(" ")).replace(/^[QA]\s*\.\s*/, "");
    const blanks = (src.match(/_{2,}/g) || []).length;
    if (!blanks || blanks !== answers.length) return;
    const filled = []; let k = 0;
    const full = src.replace(/_{2,}/g, () => { const a = answers[k++]; filled.push(a); return a; });
    out.push({ sentence: norm(full).replace(/\s+([,.?!])/g, "$1"), answers: filled });
  });
  return out;
}

/* ---------- 문제 만들기 ---------- */
const STOP = new Set(["a", "an", "the", "i", "you", "he", "she", "it", "we", "they", "my", "your", "his", "her", "our", "their", "do", "does", "how", "could", "please", "sure", "yes", "no", "i'll", "don't", "doesn't", "is", "are", "to", "with", "me", "them"]);
const PARTICLES = ["off", "on", "away", "up", "out", "over", "after", "down", "in", "back"];

function adjFromAdv(w) {
  if (!/ly$/i.test(w) || w.length < 5) return null;
  if (/ily$/i.test(w)) return w.slice(0, -3) + "y";
  if (/ully$/i.test(w)) return w.slice(0, -2);
  return w.slice(0, -2);
}
function baseVerb(v) {
  const l = v.toLowerCase();
  if (l === "does") return "do"; if (l === "has") return "have"; if (l === "goes") return "go";
  if (/[^aeiou]ies$/.test(l)) return v.slice(0, -3) + "y";
  if (/(ches|shes|sses|xes|zes)$/.test(l)) return v.slice(0, -2);
  if (/[^s]s$/.test(l) && !/(ss|us|is)$/.test(l)) return v.slice(0, -1);
  return null;
}
function sForm(v) {
  const l = v.toLowerCase();
  if (/[^aeiou]y$/.test(l)) return v.slice(0, -1) + "ies";
  if (/(ch|sh|ss|x|z|o)$/.test(l)) return v + "es";
  return v + "s";
}
const NOT_VERB = new Set(["the", "a", "an", "me", "you", "it", "them", "him", "her", "us", "now", "not", "please", "really", "help"]);
/* 틀린 곳 고치기: 규칙으로 틀린 문장 만들기 */
function makeFix(sentence, vocabSet) {
  const w = words(sentence);
  const bare = (t) => t.replace(/[^A-Za-z']/g, "");
  const once = (t) => w.filter((x) => bare(x).toLowerCase() === t.toLowerCase()).length === 1;
  const rules = [];
  // 1) 부사 → 형용사 (beautifully → beautiful)
  w.forEach((tok) => {
    const b = bare(tok);
    if (vocabSet.has(b.toLowerCase())) { const adj = adjFromAdv(b); if (adj && once(b)) rules.push({ wrong: adj, answer: b, src: b }); }
  });
  // 2) 3인칭 단수 동사 (She sings → She sing)
  for (let i = 0; i < w.length - 1; i++) {
    if (/^(he|she|it)$/i.test(bare(w[i]))) {
      const v = bare(w[i + 1]); const base = baseVerb(v);
      if (base && base.toLowerCase() !== v.toLowerCase() && once(v) && !/^(is|was|has)$/i.test(v)) rules.push({ wrong: base, answer: v, src: v });
    }
  }
  // 3) Does/Do 바꾸기
  const first = bare(w[0] || "");
  if (/^does$/i.test(first) && /^(he|she|it)$/i.test(bare(w[1] || ""))) rules.push({ wrong: "Do", answer: "Does", src: w[0] });
  if (/^do$/i.test(first) && /^(they|you|we|i)$/i.test(bare(w[1] || ""))) rules.push({ wrong: "Does", answer: "Do", src: w[0] });
  // 4) please / I'll / will / can / could you 뒤에는 동사원형 (turn → turns 로 틀리게)
  for (let i = 0; i < w.length - 1; i++) {
    const a = bare(w[i]).toLowerCase(), b2 = bare(w[i - 1] || "").toLowerCase();
    const trigger = a === "please" || a === "i'll" || a === "will" || ((b2 === "could" || b2 === "can") && a === "you" && bare(w[i + 1]).toLowerCase() !== "please");
    if (!trigger) continue;
    const v = bare(w[i + 1]);
    if (!v || NOT_VERB.has(v.toLowerCase()) || /s$/i.test(v) || !once(v)) continue;
    rules.push({ wrong: sForm(v), answer: v, src: v });
  }
  if (!rules.length) return null;
  const r = rules[Math.floor(Math.random() * rules.length)];
  const wrongSentence = w.map((tok) => (bare(tok) === r.src ? tok.replace(r.src, r.wrong) : tok)).join(" ");
  return `${wrongSentence}|${r.wrong}|${r.answer}`;
}

export function generateFromSlides(slides, maxPer = 4) {
  const today = todaySlides(slides);

  // 1) 단어 (뜻) 목록
  let vocab = [];
  today.forEach((sl) => sl.shapes.forEach((sh) => sh.paras.forEach((p) => {
    const m = norm(p).match(/^([A-Za-z][A-Za-z' \-]*?)\s*\((.*[가-힣].*)\)\s*$/);
    if (m) vocab.push({ en: norm(m[1]), ko: norm(m[2]).replace(/[()]/g, " ").replace(/\s+/g, " ").trim() });
  })));
  vocab = uniq(vocab, (v) => v.en.toLowerCase());
  const single = vocab.filter((v) => !v.en.includes(" "));
  const phrases = vocab.filter((v) => v.en.includes(" "));
  const vocabSet = new Set(single.map((v) => v.en.toLowerCase()));

  // 2) 문장 모으기
  let sentences = [];
  today.forEach((sl) => {
    sl.shapes.forEach((sh) => {
      sh.paras.forEach((p) => splitQA(p).forEach((s) => { if (isSentence(s)) sentences.push(s); }));
    });
    rebuildBlanks(sl).forEach((b) => { if (isSentence(b.sentence)) sentences.push(b.sentence); });
  });
  sentences = uniq(sentences.map((s) => norm(s).replace(/^A\.\s*/, "")), (s) => s.toLowerCase());

  // 단어 목록이 없으면 빨간 정답 단어로 대신
  const keyWords = single.length ? single.map((v) => v.en) : [];

  // 오늘 핵심 표현이 들어간 문장 우선
  const phraseKeys = phrases.map((p) => { const w = words(p.en.toLowerCase()); return { full: p.en, verb: w[0], particle: w.find((x) => PARTICLES.includes(x)) }; });
  const isKey = (s) => { const l = " " + s.toLowerCase().replace(/[^a-z' ]/g, " ") + " "; return keyWords.some((k) => l.includes(" " + k.toLowerCase() + " ")) || phraseKeys.some((p) => p.particle && l.includes(" " + p.particle + " ") && l.includes(" " + p.verb)); };
  const keySent = shuffle(sentences.filter(isKey));
  const pick = (arr, n) => shuffle(arr).slice(0, n);

  const out = {};
  // 언스크램블: 한 단어짜리 단어 (없으면 구동사의 명사)
  let un = single.map((v) => v.en);
  if (un.length < maxPer) un = un.concat(phrases.map((p) => words(p.en).slice(-1)[0]).filter((w) => w.length >= 4 && !STOP.has(w.toLowerCase())));
  out.unscramble = pick(uniq(un.map((w) => w.toUpperCase())).filter((w) => /^[A-Z]{4,12}$/.test(w)), maxPer);

  // 문장 완성: 4~9 단어 문장
  out.sentence = pick(keySent.filter((s) => words(s).length >= 4 && words(s).length <= 9), maxPer);

  // 3지선다: 뜻 ↔ 영어
  out.choice = [];
  if (vocab.length >= 3) {
    pick(vocab, maxPer).forEach((v, i) => {
      const others = shuffle(vocab.filter((o) => o.en !== v.en)).slice(0, 2);
      out.choice.push(i % 2 === 0
        ? `'${v.en}'의 뜻은?|${v.ko}|${others[0].ko}|${others[1].ko}`
        : `'${v.ko}'를 영어로?|${v.en}|${others[0].en}|${others[1].en}`);
    });
  }

  // 빈칸: 단어(부사)나 구동사 부사(off/on/away...) 자리를 비우고, 뜻을 힌트로 (그림 없이도 답이 하나로 정해지게)
  out.fill = [];
  const koOf = Object.fromEntries(single.map((v) => [v.en.toLowerCase(), v.ko]));
  const usedFill = new Set();
  keySent.forEach((s) => {
    if (out.fill.length >= maxPer) return;
    const w = words(s); const low = s.toLowerCase();
    let idx = w.findIndex((tok) => vocabSet.has(tok.replace(/[^A-Za-z']/g, "").toLowerCase()));
    let hint = idx >= 0 ? koOf[w[idx].replace(/[^A-Za-z']/g, "").toLowerCase()] : "";
    if (idx < 0) {
      const ph = phraseKeys.find((p) => p.particle && low.includes(" " + p.particle) && new RegExp("\\b" + p.verb + "\\b").test(low));
      if (ph) { idx = w.findIndex((tok) => tok.replace(/[^A-Za-z]/g, "").toLowerCase() === ph.particle); hint = (phrases.find((x) => x.en === ph.full) || {}).ko || ""; }
    }
    if (idx < 0) return;
    const ans = w[idx].replace(/[^A-Za-z']/g, "");
    const key = ans.toLowerCase() + "|" + hint;
    if (usedFill.has(key)) return; usedFill.add(key);
    const blanked = w.map((tok, i) => (i === idx ? tok.replace(ans, "___") : tok)).join(" ");
    out.fill.push(`${blanked}${hint ? ` (${hint})` : ""}|${ans}`);
  });

  // 받아쓰기: 오늘 단어·표현
  out.dictation = pick(vocab.map((v) => v.en).filter((e) => words(e).length <= 5), maxPer);

  // 듣고 고르기: 핵심 단어만 바꾼 문장 3개 중 들린 것
  out.listen = [];
  const usedListen = new Set();
  keySent.forEach((s) => {
    if (out.listen.length >= maxPer) return;
    const w = words(s);
    const idx = w.findIndex((tok) => vocabSet.has(tok.replace(/[^A-Za-z']/g, "").toLowerCase()));
    let pool, i = idx;
    if (idx >= 0) pool = single.map((v) => v.en);
    else { i = w.findIndex((tok) => PARTICLES.includes(tok.replace(/[^A-Za-z]/g, "").toLowerCase())); pool = uniq(phraseKeys.map((p) => p.particle).filter(Boolean)); }
    if (i < 0 || pool.length < 3) return;
    const ans = w[i].replace(/[^A-Za-z']/g, "");
    if (usedListen.has(ans.toLowerCase())) return; usedListen.add(ans.toLowerCase());
    const alts = shuffle(pool.filter((x) => x.toLowerCase() !== ans.toLowerCase())).slice(0, 2);
    const mk = (rep) => w.map((tok, k) => (k === i ? tok.replace(ans, rep) : tok)).join(" ");
    out.listen.push([s, ...alts.map(mk)].join("|"));
  });
  if (out.listen.length < maxPer && vocab.length >= 3) {
    pick(vocab, maxPer - out.listen.length).forEach((v) => {
      const o = shuffle(vocab.filter((x) => x.en !== v.en)).slice(0, 2);
      out.listen.push([v.en, o[0].en, o[1].en].join("|"));
    });
  }

  // 틀린 곳 고치기
  out.fix = [];
  shuffle(sentences).forEach((s) => { if (out.fix.length >= maxPer) return; const f = makeFix(s, vocabSet); if (f) out.fix.push(f); });

  // 순서 맞추기: 오늘 부분에 A:/B: 대화가 있을 때만
  out.order = [];
  today.forEach((sl) => sl.shapes.forEach((sh) => {
    const lines = sh.paras.map(norm).filter((p) => /^[AB]\s*:/.test(p)).map((p) => p.replace(/^[AB]\s*:\s*/, ""));
    if (lines.length >= 3) out.order.push(lines.slice(0, 5).join(" / "));
  }));

  const texts = Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.join("\n")]));
  return { texts, summary: { vocab: vocab.length, sentences: sentences.length, today: today.length, total: slides.length } };
}
