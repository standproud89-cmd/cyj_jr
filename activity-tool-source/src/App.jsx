import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play, Pause, RotateCcw, Shuffle, Users, ListOrdered, Sparkles,
  Users2, Plus, Minus, Save, X, Pencil, Trophy, Loader2,
  Ghost, Skull, KeyRound, Settings2, Delete, PartyPopper, ArrowRight
} from "lucide-react";

/* ---------- Design tokens (from GnB CYJ Jr. hexagon identity) ---------- */
const C = {
  purple: "#9B4FC9",
  blue: "#2E7FE3",
  red: "#F0472E",
  orange: "#F5A623",
  black: "#1C1C1E",
  gray: "#9A9A9E",
  bg: "#FFFFFF",
  surface: "#F7F7F8",
  border: "#E7E7EA",
  ink: "#1C1C1E",
  sub: "#6B6B70",
  // Halloween event theme
  hbg: "#0b0b0d",
  hcard: "#18171a",
  hred: "#FF3131",
  hborder: "#5a1010",
};

const MODE_COLOR = { teams: C.blue, turns: C.purple, pick: C.orange, pair: C.red };
const GROUP_PALETTE = [C.purple, C.blue, C.red, C.orange, "#0F9D58", "#00897B", C.black, C.gray];

/* ---------- CYJ Jr. logo (brand lockup) ---------- */
const CYJ_LOGO_SRC = "data:image/png;base64,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ppNZO2qU+jnoTYLAG1RUHTE8EERaH6QEDx6cFi8XSoJwniEYQOGJkEy5OYDBxK8RFMzlC5EiJOBUSVSCqv9FvnR46DlEUgAyKVkQABxfX716NZpsacn+V1BQuwBqwU9goEbUTkWyOS/4a6+9dvvtt99zzz2vvPJKLopSquRmyuW3m4kiAEMgB2nIzOWQwkN16HkV2CACIEgDwLcioOWt2Pqmm0ZBaArIWckCHbPQZ8yYce21115//fUvvPACuu5Y2o7nCHWxx/z58+++++4rr7xy+vTpK1asQEJeCgIDaUegCOhIgQcQwZdbwSR/PEpEPBZUUsv8W2AR8RQmExIn8IIBXoDvkxehEIrLUFnXIM8+EW+/Nv3LLbJ4kbY0e1WPH8KGD6ySV/XK1C42yxtz5Z6p8abf2ivP+x9oQkSaqNEdaX3oNt65OHtw1lZq9iH78MMP//73v//zn/+Mx2c0gT9HOmoAHKAINph/97vfURG155zIf+6556666qrf/va3M2fOJJCgw0wV6JjpD3/4A2ZiUYIOkYovvvjizTffTBWKpk2btmrVKqY2SuGZNWsWcujV888/DyUHpOXI1k17dORgzldfffWSSy758Y9//JOf/OSn2fM///M///3f//1f//Vfv/nNb7ABM9kTTzxB2EydOvXZZ58li2aZqLDTH//4x7zWNddc89RTTyENU6FuIueuu+7CTg899FAeOcy1mP/SSy/9+c9//otf/IIWf5U9IACUX/7yl1RZunQp1dtBBPcUIUK4W167Jk67Pd7463jj5fHGK9OpV8WbfpPe9Jt441UpcN2l6e3XxpefluZGwe1j0V54Mt55XXrHtTL7BSkWCQz83EE9FqRhnWVh5WiXAAAQAElEQVSRE++7RZa8Ic0t3BFYw1qb9Uy8a6rdcJXd9FuZdqe8PluKrA9qxea4YE78yy12+/X2yovW2IAoeibETfYpFovLli279dZbUeF//Md//Od//idqvO+++5YvX46bUooG7r///uuuu47lAn/1SiI4MbolNtA2Or/pppvw8sbGRlUfOJFzxx13oHkqvv766/PmzWO1efXVV59++ulHHnkE3RI58MybN2/u3Lm0nk9wGIUwIMCwBfq888476QnKJnIuv/zy//3f/73sssvyVoicl156ibAheLCmqjead6wnpD09cubMmYPj/uhHP/rh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";

/* ---------- Storage helpers ---------- */
async function storageGet(key) {
  try {
    const r = await window.storage.get(key, false);
    return r ? JSON.parse(r.value) : null;
  } catch {
    return null;
  }
}
async function storageSet(key, value) {
  try {
    await window.storage.set(key, JSON.stringify(value), false);
  } catch {
    /* best-effort */
  }
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ================= Activity Tool ================= */
function ActivityTool() {
  const [classes, setClasses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddClass, setShowAddClass] = useState(false);
  const [editingRoster, setEditingRoster] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [rosterInput, setRosterInput] = useState("");

  const [mode, setMode] = useState("teams");
  const [numTeams, setNumTeams] = useState(2);
  const [groups, setGroups] = useState([]);
  const [excludeAfterPick, setExcludeAfterPick] = useState(true);
  const [pickPool, setPickPool] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [spinName, setSpinName] = useState("");
  const spinRef = useRef(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null); // { name, fromGroupId }

  const selectedClass = classes.find((c) => c.id === selectedId) || null;
  const roster = selectedClass ? selectedClass.students : [];

  // Load classes on mount
  useEffect(() => {
    (async () => {
      const saved = await storageGet("activity-tool:classes");
      const list = saved || [];
      setClasses(list);
      if (list.length > 0) setSelectedId(list[0].id);
      setLoading(false);
    })();
  }, []);

  // Load session when class changes
  useEffect(() => {
    if (!selectedId) {
      setGroups([]);
      return;
    }
    (async () => {
      const session = await storageGet(`activity-tool:session:${selectedId}`);
      if (session) {
        setMode(session.mode || "teams");
        setNumTeams(session.numTeams || 2);
        setGroups(session.groups || []);
        setExcludeAfterPick(session.excludeAfterPick ?? true);
        setPickPool(session.pickPool || []);
      } else {
        setMode("teams");
        setGroups([]);
        setPickPool([]);
      }
    })();
  }, [selectedId]);

  // Persist session on change
  useEffect(() => {
    if (!selectedId || loading) return;
    storageSet(`activity-tool:session:${selectedId}`, {
      mode, numTeams, groups, excludeAfterPick, pickPool,
    });
  }, [selectedId, mode, numTeams, groups, excludeAfterPick, pickPool, loading]);

  const saveClasses = async (list) => {
    setClasses(list);
    await storageSet("activity-tool:classes", list);
  };

  const deleteClass = async (id) => {
    const updated = classes.filter((c) => c.id !== id);
    await saveClasses(updated);
    if (selectedId === id) {
      setSelectedId(updated.length > 0 ? updated[0].id : null);
    }
    setDeleteConfirmId(null);
  };

  const moveStudent = (name, fromGroupId, toGroupId) => {
    if (fromGroupId === toGroupId) return;
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === fromGroupId) return { ...g, members: g.members.filter((m) => m !== name) };
        if (g.id === toGroupId && !g.members.includes(name)) return { ...g, members: [...g.members, name] };
        return g;
      })
    );
    setSelectedStudent(null);
  };

  const addClass = async () => {
    const name = nameInput.trim();
    const students = rosterInput.split("\n").map((s) => s.trim()).filter(Boolean);
    if (!name || students.length === 0) return;
    const newClass = { id: `class-${Date.now()}`, name, students };
    await saveClasses([...classes, newClass]);
    setSelectedId(newClass.id);
    setNameInput("");
    setRosterInput("");
    setShowAddClass(false);
  };

  const saveRosterEdit = async () => {
    const students = rosterInput.split("\n").map((s) => s.trim()).filter(Boolean);
    const updated = classes.map((c) =>
      c.id === selectedId ? { ...c, students } : c
    );
    await saveClasses(updated);
    setEditingRoster(false);
  };

  const openEditRoster = () => {
    setRosterInput(roster.join("\n"));
    setEditingRoster(true);
  };

  const switchMode = (m) => {
    setMode(m);
    setGroups([]);
    setPickPool(shuffleArray(roster));
  };

  const makeTeams = () => {
    const n = Math.max(2, Math.min(numTeams, roster.length || 2));
    const shuffled = shuffleArray(roster);
    const teams = Array.from({ length: n }, (_, i) => ({
      id: `team-${i + 1}`, label: `Team ${i + 1}`, members: [], score: 0,
    }));
    shuffled.forEach((s, i) => teams[i % n].members.push(s));
    setGroups(teams);
  };

  const makeTurns = () => {
    const shuffled = shuffleArray(roster);
    setGroups(shuffled.map((s, i) => ({
      id: `turn-${i + 1}`, label: `${i + 1}`, members: [s], score: 0,
    })));
  };

  const makePairs = () => {
    const shuffled = shuffleArray(roster);
    const pairs = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      if (i + 1 < shuffled.length) {
        pairs.push({ id: `pair-${pairs.length + 1}`, label: `Pair ${pairs.length + 1}`, members: [shuffled[i], shuffled[i + 1]], score: 0 });
      } else if (pairs.length > 0) {
        pairs[pairs.length - 1].members.push(shuffled[i]);
      } else {
        pairs.push({ id: `pair-1`, label: `Pair 1`, members: [shuffled[i]], score: 0 });
      }
    }
    setGroups(pairs);
  };

  const pickOne = () => {
    let pool = excludeAfterPick ? pickPool : roster;
    if (pool.length === 0) pool = roster;
    if (pool.length === 0) return;
    setSpinning(true);
    let ticks = 0;
    clearInterval(spinRef.current);
    spinRef.current = setInterval(() => {
      setSpinName(roster[Math.floor(Math.random() * roster.length)]);
      ticks++;
      if (ticks > 12) {
        clearInterval(spinRef.current);
        const finalPick = pool[Math.floor(Math.random() * pool.length)];
        setSpinName(finalPick);
        setSpinning(false);
        setGroups((prev) => [
          { id: `pick-${prev.length + 1}`, label: `${prev.length + 1}번째`, members: [finalPick], score: 0 },
          ...prev,
        ]);
        if (excludeAfterPick) {
          setPickPool((prev) => {
            const remaining = prev.filter((s) => s !== finalPick);
            return remaining.length > 0 ? remaining : shuffleArray(roster);
          });
        }
      }
    }, 70);
  };

  const adjustScore = (id, delta) => {
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, score: g.score + delta } : g)));
  };
  const setScore = (id, value) => {
    const v = value === "" ? 0 : parseInt(value, 10);
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, score: isNaN(v) ? 0 : v } : g)));
  };
  const resetScores = () => setGroups((prev) => prev.map((g) => ({ ...g, score: 0 })));

  const modeConfig = {
    teams: { label: "Split Teams", icon: Users, action: makeTeams, actionLabel: "팀 나누기" },
    turns: { label: "Take Turns", icon: ListOrdered, action: makeTurns, actionLabel: "순서 정하기" },
    pick: { label: "Pick One", icon: Sparkles, action: pickOne, actionLabel: "한 명 뽑기" },
    pair: { label: "Pair Work", icon: Users2, action: makePairs, actionLabel: "짝 정하기" },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 gap-2" style={{ color: C.sub }}>
        <Loader2 className="animate-spin" size={20} />
        <span>불러오는 중...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      {/* Class selector */}
      <div className="flex flex-wrap items-center gap-2 pt-6">
        {classes.map((c) =>
          deleteConfirmId === c.id ? (
            <div key={c.id} className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: "#FEECEC", border: `1px solid ${C.red}` }}>
              <span style={{ color: C.red }}>{c.name} 삭제할까요?</span>
              <button onClick={() => deleteClass(c.id)} className="font-black px-1" style={{ color: C.red }}>확인</button>
              <button onClick={() => setDeleteConfirmId(null)} className="px-1" style={{ color: C.sub }}>취소</button>
            </div>
          ) : (
            <div key={c.id} className="relative group">
              <button
                onClick={() => setSelectedId(c.id)}
                className="pl-4 pr-8 py-2 rounded-full text-sm font-bold transition"
                style={{
                  backgroundColor: selectedId === c.id ? C.ink : C.surface,
                  color: selectedId === c.id ? "#fff" : C.ink,
                  border: `1px solid ${selectedId === c.id ? C.ink : C.border}`,
                }}
              >
                {c.name}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(c.id); }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ color: selectedId === c.id ? "#fff" : C.sub, opacity: 0.7 }}
                title="반 삭제"
              >
                <X size={13} />
              </button>
            </div>
          )
        )}
        <button
          onClick={() => { setShowAddClass(!showAddClass); setNameInput(""); setRosterInput(""); }}
          className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1"
          style={{ border: `1px dashed ${C.gray}`, color: C.sub }}
        >
          <Plus size={16} /> 새 반
        </button>
      </div>

      {/* Add class form */}
      {showAddClass && (
        <div className="mt-4 p-4 rounded-2xl" style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="반 이름 (예: 중2 화목반)"
            className="w-full px-3 py-2 rounded-lg mb-2 text-sm outline-none"
            style={{ border: `1px solid ${C.border}` }}
          />
          <textarea
            value={rosterInput}
            onChange={(e) => setRosterInput(e.target.value)}
            placeholder={"학생 이름을 한 줄에 한 명씩 입력\n예)\n김민준\n이서연\n박도윤"}
            rows={6}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
            style={{ border: `1px solid ${C.border}` }}
          />
          <div className="flex gap-2 mt-2">
            <button onClick={addClass} className="px-4 py-2 rounded-lg text-sm font-bold text-white flex items-center gap-1" style={{ backgroundColor: C.purple }}>
              <Save size={15} /> 저장
            </button>
            <button onClick={() => setShowAddClass(false)} className="px-4 py-2 rounded-lg text-sm font-bold" style={{ color: C.sub }}>
              취소
            </button>
          </div>
        </div>
      )}

      {!selectedClass && !showAddClass && (
        <div className="text-center py-20" style={{ color: C.sub }}>
          <p className="font-bold mb-1">아직 등록된 반이 없어요</p>
          <p className="text-sm">'새 반' 버튼을 눌러 학생 명단을 추가해보세요.</p>
        </div>
      )}

      {selectedClass && (
        <>
          {/* Roster row */}
          <div className="mt-5 flex items-center justify-between">
            <div className="text-sm" style={{ color: C.sub }}>
              학생 <span className="font-bold" style={{ color: C.ink }}>{roster.length}명</span>
            </div>
            <button onClick={openEditRoster} className="text-sm font-bold flex items-center gap-1" style={{ color: C.blue }}>
              <Pencil size={14} /> 명단 수정
            </button>
          </div>

          {editingRoster && (
            <div className="mt-2 p-4 rounded-2xl" style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
              <textarea
                value={rosterInput}
                onChange={(e) => setRosterInput(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                style={{ border: `1px solid ${C.border}` }}
              />
              <div className="flex gap-2 mt-2">
                <button onClick={saveRosterEdit} className="px-4 py-2 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: C.purple }}>저장</button>
                <button onClick={() => setEditingRoster(false)} className="px-4 py-2 rounded-lg text-sm font-bold" style={{ color: C.sub }}>취소</button>
              </div>
            </div>
          )}

          {/* Mode switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            {Object.entries(modeConfig).map(([key, cfg]) => {
              const Icon = cfg.icon;
              const active = mode === key;
              return (
                <button
                  key={key}
                  onClick={() => switchMode(key)}
                  className="rounded-2xl py-3 flex flex-col items-center gap-1 font-bold text-sm transition"
                  style={{
                    backgroundColor: active ? MODE_COLOR[key] : C.surface,
                    color: active ? "#fff" : C.ink,
                    border: `1px solid ${active ? MODE_COLOR[key] : C.border}`,
                  }}
                >
                  <Icon size={18} />
                  {cfg.label}
                </button>
              );
            })}
          </div>

          {/* Controls row */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {mode === "teams" && (
              <div className="flex items-center gap-2 text-sm font-bold">
                <span style={{ color: C.sub }}>팀 수</span>
                <button onClick={() => setNumTeams((n) => Math.max(2, n - 1))} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}><Minus size={14} /></button>
                <span className="w-5 text-center">{numTeams}</span>
                <button onClick={() => setNumTeams((n) => Math.min(8, n + 1))} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}><Plus size={14} /></button>
              </div>
            )}
            {mode === "pick" && (
              <label className="flex items-center gap-2 text-sm font-bold" style={{ color: C.sub }}>
                <input type="checkbox" checked={excludeAfterPick} onChange={(e) => setExcludeAfterPick(e.target.checked)} />
                뽑힌 학생 제외
              </label>
            )}
            <button
              onClick={modeConfig[mode].action}
              disabled={roster.length === 0 || spinning}
              className="ml-auto px-5 py-2.5 rounded-full text-sm font-bold text-white flex items-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: MODE_COLOR[mode] }}
            >
              <Shuffle size={16} />
              {modeConfig[mode].actionLabel}
            </button>
            {groups.length > 0 && (
              <button onClick={resetScores} className="px-4 py-2.5 rounded-full text-sm font-bold flex items-center gap-1" style={{ color: C.sub, border: `1px solid ${C.border}` }}>
                <RotateCcw size={14} /> 점수 초기화
              </button>
            )}
          </div>

          {/* Pick One spin display */}
          {mode === "pick" && spinning && (
            <div className="mt-6 text-center py-8 rounded-2xl font-black text-3xl" style={{ backgroundColor: C.surface, color: C.orange }}>
              {spinName}
            </div>
          )}

          {/* Group cards */}
          {(mode === "teams" || mode === "pair" || mode === "turns") && groups.length > 0 && !spinning && (
            <p className="text-xs font-bold mt-4 mb-1" style={{ color: C.sub }}>
              💡 이름 박스를 드래그하거나, 탭한 뒤 이동할 팀을 탭하면 팀을 옮길 수 있어요
            </p>
          )}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {groups.map((g, idx) => {
              const gColor = GROUP_PALETTE[idx % GROUP_PALETTE.length];
              return (
              <div
                key={g.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  try {
                    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
                    moveStudent(data.name, data.fromGroupId, g.id);
                  } catch {
                    /* ignore */
                  }
                }}
                onClick={() => {
                  if (selectedStudent && selectedStudent.fromGroupId !== g.id) {
                    moveStudent(selectedStudent.name, selectedStudent.fromGroupId, g.id);
                  }
                }}
                className="rounded-2xl p-4"
                style={{ backgroundColor: C.surface, border: `1.5px solid ${gColor}30` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black text-sm" style={{ color: gColor }}>{g.label}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3 min-h-[38px]">
                  {g.members.map((name) => {
                    const isSelected = selectedStudent && selectedStudent.name === name && selectedStudent.fromGroupId === g.id;
                    return (
                      <button
                        key={name}
                        draggable
                        onDragStart={(e) => {
                          e.stopPropagation();
                          e.dataTransfer.setData("text/plain", JSON.stringify({ name, fromGroupId: g.id }));
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudent(isSelected ? null : { name, fromGroupId: g.id });
                        }}
                        className="px-3.5 py-2 rounded-xl text-sm font-bold cursor-grab active:cursor-grabbing"
                        style={{
                          backgroundColor: isSelected ? gColor : "#fff",
                          color: isSelected ? "#fff" : C.ink,
                          border: `1.5px solid ${isSelected ? gColor : gColor + "55"}`,
                        }}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); adjustScore(g.id, -1); }} className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: C.gray }}><Minus size={15} /></button>
                  <input
                    type="number"
                    value={g.score}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setScore(g.id, e.target.value)}
                    className="w-16 text-center rounded-lg py-1 font-black text-lg outline-none"
                    style={{ border: `1px solid ${C.border}`, backgroundColor: "#fff" }}
                  />
                  <button onClick={(e) => { e.stopPropagation(); adjustScore(g.id, 1); }} className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: gColor }}><Plus size={15} /></button>
                  <span className="ml-auto text-xs font-bold" style={{ color: C.sub }}>누적 점수</span>
                </div>
              </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ================= Review Test (timer) ================= */
function ReviewTest() {
  const MIN_SEC = 60;
  const MAX_SEC = 45 * 60;
  const DEFAULT_SEC = 5 * 60;

  const [durationSec, setDurationSec] = useState(DEFAULT_SEC);
  const [remaining, setRemaining] = useState(DEFAULT_SEC);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const lastTickRef = useRef(null);

  const getCtx = () => {
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AC();
    }
    return audioCtxRef.current;
  };

  const beep = useCallback((freq = 880, duration = 140, type = "sine", volume = 0.28, delay = 0) => {
    try {
      const ctx = getCtx();
      const t0 = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      gain.gain.setValueAtTime(volume, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration / 1000);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + duration / 1000 + 0.02);
    } catch {
      /* audio not available */
    }
  }, []);

  const playStartSound = useCallback(() => {
    beep(587, 110, "sine", 0.25, 0);
    beep(880, 160, "sine", 0.28, 0.13);
  }, [beep]);

  const playTick = useCallback(() => beep(660, 90, "square", 0.2), [beep]);
  const playEnd = useCallback(() => {
    // Gentle ascending bell chime (C5-E5-G5-C6) instead of a harsh buzzer
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      beep(freq, 550, "sine", 0.22, i * 0.11);
      beep(freq * 2, 400, "sine", 0.07, i * 0.11); // soft overtone for a bell-like shimmer
    });
  }, [beep]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (next <= 10 && next > 0 && lastTickRef.current !== next) {
          lastTickRef.current = next;
          playTick();
        }
        if (next <= 0) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          playEnd();
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, playTick, playEnd]);

  const handleStart = () => {
    if (remaining <= 0) setRemaining(durationSec);
    setHasStarted(true);
    setIsRunning(true);
    playStartSound();
  };
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setHasStarted(false);
    setRemaining(durationSec);
    lastTickRef.current = null;
  };
  const adjustDuration = (deltaSec) => {
    if (isRunning) return;
    const next = Math.min(MAX_SEC, Math.max(MIN_SEC, durationSec + deltaSec));
    setDurationSec(next);
    if (!hasStarted) setRemaining(next);
  };

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const isLast10 = remaining <= 10 && remaining > 0;
  const progress = 1 - remaining / durationSec;

  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const d = today.getDate();
  const suffix = d % 10 === 1 && d !== 11 ? "st" : d % 10 === 2 && d !== 12 ? "nd" : d % 10 === 3 && d !== 13 ? "rd" : "th";
  const dateStr = `${days[today.getDay()]}, ${months[today.getMonth()]} ${d}${suffix}, ${today.getFullYear()}`;

  const R = 90;
  const CIRC = 2 * Math.PI * R;

  const displayFont = "'Poppins', 'Century Gothic', 'Futura', 'SF Pro Display', -apple-system, 'Segoe UI', sans-serif";

  // ---- 아날로그 스톱워치 다이얼 (색이 차오르는 방식) ----
  const dialAngle = Math.min(360, progress * 360);
  const polar = (cx, cy, r, deg) => ({
    x: cx + r * Math.sin((deg * Math.PI) / 180),
    y: cy - r * Math.cos((deg * Math.PI) / 180),
  });
  const cx = 100, cy = 105, faceR = 78;
  const start = polar(cx, cy, faceR, 0);
  const end = polar(cx, cy, faceR, dialAngle);
  const largeArc = dialAngle > 180 ? 1 : 0;
  const piePath =
    dialAngle <= 0.001
      ? ""
      : dialAngle >= 359.999
      ? `M ${cx} ${cy - faceR} A ${faceR} ${faceR} 0 1 1 ${cx - 0.01} ${cy - faceR} Z`
      : `M ${cx} ${cy} L ${start.x} ${start.y} A ${faceR} ${faceR} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  const needleEnd = polar(cx, cy, faceR - 6, dialAngle);
  const dialColor = isLast10 ? C.red : C.orange;

  const ticks = Array.from({ length: 12 }, (_, i) => {
    const deg = i * 30;
    const p1 = polar(cx, cy, faceR - 10, deg);
    const p2 = polar(cx, cy, faceR - 3, deg);
    return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" />;
  });

  return (
    <div className="max-w-4xl mx-auto px-4" style={{ fontFamily: displayFont }}>
      <div
        className="w-full rounded-3xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 mt-8 px-8 py-10"
        style={{ border: `2px solid ${C.ink}` }}
      >
        {/* 왼쪽: 타이틀 / 날짜 / 분 조정 / 버튼 */}
        <div className="flex flex-col items-center md:items-start flex-shrink-0">
          <span
            className="text-sm font-bold uppercase"
            style={{ color: C.sub, letterSpacing: "0.3em" }}
          >
            Review Test
          </span>

          <div
            className="inline-block rounded-2xl px-6 py-2.5 mt-3"
            style={{ backgroundColor: "#fff", border: `2px solid ${C.ink}` }}
          >
            <p
              className="whitespace-nowrap text-center"
              style={{
                fontSize: "clamp(1.15rem, 3vw, 1.7rem)",
                fontWeight: 800,
                letterSpacing: "-0.01em",
                color: C.ink,
              }}
            >
              {dateStr}
            </p>
          </div>

          <div
            className="flex items-center mt-8 rounded-full overflow-hidden"
            style={{ border: `2px solid ${C.ink}` }}
          >
            <button
              onClick={() => adjustDuration(-60)}
              disabled={isRunning}
              className="w-12 h-12 flex items-center justify-center disabled:opacity-30"
              style={{ color: C.ink }}
            >
              <Minus size={18} />
            </button>
            <span
              className="px-5 font-semibold text-base tabular-nums"
              style={{ color: C.ink, fontFamily: "'SF Mono', 'Menlo', 'Consolas', monospace", borderLeft: `2px solid ${C.ink}`, borderRight: `2px solid ${C.ink}` }}
            >
              {String(Math.floor(durationSec / 60)).padStart(2, "0")} MIN
            </span>
            <button
              onClick={() => adjustDuration(60)}
              disabled={isRunning}
              className="w-12 h-12 flex items-center justify-center disabled:opacity-30"
              style={{ color: C.ink }}
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3 mt-7">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="px-10 py-4 rounded-full font-bold text-lg text-white flex items-center gap-2"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${C.orange}, ${C.red})`,
                  border: `2px solid ${C.ink}`,
                }}
              >
                <Play size={19} /> Start
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="px-10 py-4 rounded-full font-bold text-lg text-white flex items-center gap-2"
                style={{ backgroundColor: C.orange, border: `2px solid ${C.ink}` }}
              >
                <Pause size={19} /> Pause
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-6 py-4 rounded-full font-semibold text-lg flex items-center gap-2"
              style={{ color: C.ink, border: `2px solid ${C.ink}` }}
            >
              <RotateCcw size={17} /> Reset
            </button>
          </div>
        </div>

        {/* 오른쪽: 색이 차오르는 스톱워치 다이얼 */}
        <div className="flex flex-col items-center flex-shrink-0">
          <svg width={260} height={260} viewBox="0 0 200 220">
            {/* 손잡이(꼭지) */}
            <rect x="86" y="6" width="28" height="16" rx="5" fill={C.ink} />
            {/* 양쪽 귀(다이아몬드) */}
            <rect x="34" y="24" width="16" height="16" rx="3" fill={C.ink} transform="rotate(45 42 32)" />
            <rect x="150" y="24" width="16" height="16" rx="3" fill={C.ink} transform="rotate(45 158 32)" />
            {/* 바깥 두꺼운 링 */}
            <circle cx={cx} cy={cy} r={faceR + 12} fill="none" stroke={C.ink} strokeWidth="11" />
            {/* 얼굴(흰 배경) */}
            <circle cx={cx} cy={cy} r={faceR} fill="#fff" stroke={C.ink} strokeWidth="2.5" />
            {/* 채워지는 파이 */}
            {piePath && <path d={piePath} fill={dialColor} style={{ transition: "d 1s linear" }} />}
            {/* 눈금 */}
            {ticks}
            {/* 바늘 */}
            <line x1={cx} y1={cy} x2={needleEnd.x} y2={needleEnd.y} stroke={C.ink} strokeWidth="4.5" strokeLinecap="round" />
            {/* 중심점 */}
            <circle cx={cx} cy={cy} r="6" fill={C.ink} />
          </svg>
          <span
            className="tabular-nums mt-2"
            style={{
              fontFamily: "'SF Mono', 'Menlo', 'Consolas', monospace",
              fontSize: 40,
              fontWeight: 600,
              color: isLast10 ? C.red : C.ink,
              animation: isLast10 ? "pulseGlow 1s ease-in-out infinite" : "none",
            }}
          >
            {mm}:{ss}
          </span>
          <span className="mt-1 text-xs font-bold uppercase" style={{ color: C.gray, letterSpacing: "0.22em" }}>
            {isRunning ? "Running" : hasStarted ? "Paused" : "Ready"}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}

/* ================= Halloween Escape Room ================= */
const DEFAULT_WORDS = "PUMPKIN\nSKELETON\nMONSTER";
const DEFAULT_SENTENCES =
  "THE GHOST IS HIDING BEHIND THE DOOR\nWE MUST FIND THE HIDDEN KEY\nDONT LOOK BEHIND YOU";
const DEFAULT_QUIZ =
  "What is the past tense of 'see'?|saw|seed|seen\nI ___ scared of ghosts. (Choose the correct word)|am|is|are\nWhat do you call a witch's broom?|broomstick|broom stick|broomer";

function parseWordList(text) {
  return text.split("\n").map((w) => w.trim().toUpperCase()).filter(Boolean);
}
function parseSentenceList(text) {
  return text.split("\n").map((s) => s.trim()).filter(Boolean);
}
function parseQuizList(text) {
  return text
    .split("\n")
    .map((line) => {
      const parts = line.split("|").map((p) => p.trim());
      if (parts.length < 3) return null;
      const [question, correct, ...wrongs] = parts;
      return { question, correct, options: shuffleArray([correct, ...wrongs]) };
    })
    .filter(Boolean);
}
function fmtClock(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function HalloweenEvent() {
  const [phase, setPhase] = useState("intro"); // intro | playing | success
  const [showEdit, setShowEdit] = useState(false);
  const [wordsText, setWordsText] = useState(DEFAULT_WORDS);
  const [sentencesText, setSentencesText] = useState(DEFAULT_SENTENCES);
  const [quizText, setQuizText] = useState(DEFAULT_QUIZ);

  const [stageIdx, setStageIdx] = useState(0); // 0 unscramble, 1 sentence, 2 quiz, 3 keypad
  const [code, setCode] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  const [wordIdx, setWordIdx] = useState(0);
  const [letterBank, setLetterBank] = useState([]);
  const [answerLetters, setAnswerLetters] = useState([]);
  const [wordShake, setWordShake] = useState(false);

  const [sentIdx, setSentIdx] = useState(0);
  const [wordBank, setWordBank] = useState([]);
  const [placedWords, setPlacedWords] = useState([]);
  const [sentShake, setSentShake] = useState(false);

  const [quizIdx, setQuizIdx] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState(null);

  const [keypadInput, setKeypadInput] = useState("");
  const [keypadError, setKeypadError] = useState(false);

  const words = parseWordList(wordsText);
  const sentences = parseSentenceList(sentencesText);
  const quiz = parseQuizList(quizText);

  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const setupWordTiles = (idx, list) => {
    const w = list[idx] || "";
    setLetterBank(shuffleArray(w.split("").map((c, i) => ({ id: `${idx}-${i}-${Math.random()}`, char: c }))));
    setAnswerLetters([]);
  };
  const setupSentenceTiles = (idx, list) => {
    const s = list[idx] || "";
    const arr = s.split(" ");
    setWordBank(shuffleArray(arr.map((t, i) => ({ id: `${idx}-${i}-${Math.random()}`, text: t }))));
    setPlacedWords([]);
  };

  const startGame = () => {
    const digits = shuffleArray(["1", "2", "3", "4", "5", "6", "7", "8", "9"]).slice(0, 3);
    setCode(digits);
    setStageIdx(0);
    setWordIdx(0);
    setSentIdx(0);
    setQuizIdx(0);
    setKeypadInput("");
    setElapsed(0);
    setupWordTiles(0, words);
    setupSentenceTiles(0, sentences);
    setPhase("playing");
  };

  // --- Stage 0: unscramble ---
  const tapLetter = (tile) => {
    setAnswerLetters((prev) => [...prev, tile]);
    setLetterBank((prev) => prev.filter((t) => t.id !== tile.id));
  };
  const returnLetter = (tile) => {
    setAnswerLetters((prev) => prev.filter((t) => t.id !== tile.id));
    setLetterBank((prev) => [...prev, tile]);
  };
  useEffect(() => {
    if (phase !== "playing" || stageIdx !== 0) return;
    const current = words[wordIdx];
    if (!current || answerLetters.length !== current.length) return;
    const guess = answerLetters.map((t) => t.char).join("");
    if (guess === current) {
      setTimeout(() => {
        if (wordIdx + 1 < words.length) {
          const next = wordIdx + 1;
          setWordIdx(next);
          setupWordTiles(next, words);
        } else {
          setStageIdx(1);
        }
      }, 450);
    } else {
      setWordShake(true);
      setTimeout(() => {
        setWordShake(false);
        setupWordTiles(wordIdx, words);
      }, 550);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerLetters]);

  // --- Stage 1: sentence builder (drag & drop + tap) ---
  const placeWord = (tile) => {
    setPlacedWords((prev) => [...prev, tile]);
    setWordBank((prev) => prev.filter((t) => t.id !== tile.id));
  };
  const returnWord = (tile) => {
    setPlacedWords((prev) => prev.filter((t) => t.id !== tile.id));
    setWordBank((prev) => [...prev, tile]);
  };
  useEffect(() => {
    if (phase !== "playing" || stageIdx !== 1) return;
    const current = sentences[sentIdx];
    if (!current) return;
    const target = current.split(" ");
    if (placedWords.length !== target.length) return;
    const guess = placedWords.map((t) => t.text).join(" ");
    if (guess === current) {
      setTimeout(() => {
        if (sentIdx + 1 < sentences.length) {
          const next = sentIdx + 1;
          setSentIdx(next);
          setupSentenceTiles(next, sentences);
        } else {
          setStageIdx(2);
        }
      }, 450);
    } else {
      setSentShake(true);
      setTimeout(() => {
        setSentShake(false);
        setupSentenceTiles(sentIdx, sentences);
      }, 550);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placedWords]);

  // --- Stage 2: quiz ---
  const answerQuiz = (opt) => {
    if (quizFeedback) return;
    const q = quiz[quizIdx];
    if (opt === q.correct) {
      setQuizFeedback("correct");
      setTimeout(() => {
        setQuizFeedback(null);
        if (quizIdx + 1 < quiz.length) setQuizIdx((i) => i + 1);
        else setStageIdx(3);
      }, 500);
    } else {
      setQuizFeedback("wrong");
      setTimeout(() => setQuizFeedback(null), 500);
    }
  };

  // --- Stage 3: keypad ---
  const pressDigit = (d) => {
    if (keypadInput.length >= code.length) return;
    setKeypadInput((prev) => prev + d);
  };
  const backspace = () => setKeypadInput((prev) => prev.slice(0, -1));
  useEffect(() => {
    if (stageIdx !== 3 || keypadInput.length !== code.length || code.length === 0) return;
    if (keypadInput === code.join("")) {
      clearInterval(timerRef.current);
      setPhase("success");
    } else {
      setKeypadError(true);
      setTimeout(() => {
        setKeypadError(false);
        setKeypadInput("");
      }, 700);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keypadInput]);

  const revealedCode = code.slice(0, stageIdx);
  const stageLabels = ["🔤 저주받은 단어", "🧩 유령의 문장", "🦇 박쥐의 선택", "🔐 마지막 문"];

  return (
    <div style={{ backgroundColor: C.hbg }} className="w-full inline-block">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {phase === "intro" && (
          <div className="text-center">
            <div className="text-9xl mb-5">🎃👻🦇</div>
            <h2
              className="font-black text-5xl sm:text-7xl mb-5"
              style={{ color: C.hred, textShadow: `0 0 22px ${C.hred}88` }}
            >
              Haunted Classroom Escape
            </h2>
            <p className="text-2xl sm:text-3xl mb-10 leading-relaxed" style={{ color: "#c9c9cc" }}>
              교실에 갇혔다! 배운 내용을 이용해 암호 3개를 모두 찾아<br />
              마지막 문을 열고 탈출하자. 약 20~30분 소요돼요.
            </p>

            <button
              onClick={startGame}
              className="px-14 py-6 rounded-full font-black text-3xl flex items-center gap-3 mx-auto"
              style={{ backgroundColor: C.hred, color: "#0b0b0d" }}
            >
              <Ghost size={34} /> 게임 시작
            </button>

            <button
              onClick={() => setShowEdit(!showEdit)}
              className="mt-9 text-lg font-bold flex items-center gap-2 mx-auto"
              style={{ color: "#c9c9cc" }}
            >
              <Settings2 size={20} /> 콘텐츠 편집 (배운 단어·문장·퀴즈로 바꾸기)
            </button>

            {showEdit && (
              <div className="mt-6 text-left space-y-5 max-w-3xl mx-auto">
                <div className="rounded-2xl p-5" style={{ backgroundColor: C.hcard, border: `1px solid ${C.hborder}` }}>
                  <p className="text-base font-black mb-2" style={{ color: C.hred }}>Stage 1 · 언스크램블 단어 (한 줄에 하나)</p>
                  <textarea
                    value={wordsText}
                    onChange={(e) => setWordsText(e.target.value)}
                    rows={3}
                    className="w-full text-lg rounded-lg px-4 py-3 outline-none"
                    style={{ backgroundColor: "#0b0b0d", color: "#eee", border: `1px solid ${C.hborder}` }}
                  />
                </div>
                <div className="rounded-2xl p-5" style={{ backgroundColor: C.hcard, border: `1px solid ${C.hborder}` }}>
                  <p className="text-base font-black mb-2" style={{ color: C.hred }}>Stage 2 · 드래그로 완성할 문장 (한 줄에 하나)</p>
                  <textarea
                    value={sentencesText}
                    onChange={(e) => setSentencesText(e.target.value)}
                    rows={3}
                    className="w-full text-lg rounded-lg px-4 py-3 outline-none"
                    style={{ backgroundColor: "#0b0b0d", color: "#eee", border: `1px solid ${C.hborder}` }}
                  />
                </div>
                <div className="rounded-2xl p-5" style={{ backgroundColor: C.hcard, border: `1px solid ${C.hborder}` }}>
                  <p className="text-base font-black mb-2" style={{ color: C.hred }}>Stage 3 · 퀴즈 (질문|정답|오답1|오답2)</p>
                  <textarea
                    value={quizText}
                    onChange={(e) => setQuizText(e.target.value)}
                    rows={3}
                    className="w-full text-lg rounded-lg px-4 py-3 outline-none"
                    style={{ backgroundColor: "#0b0b0d", color: "#eee", border: `1px solid ${C.hborder}` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {phase === "playing" && (
          <div>
            {/* Status bar */}
            <div className="flex items-center justify-between mb-9">
              <span className="text-xl sm:text-2xl font-black" style={{ color: "#c9c9cc" }}>
                Stage {stageIdx + 1}/4 · {stageLabels[stageIdx]}
              </span>
              <span className="text-xl sm:text-2xl font-black tabular-nums" style={{ color: "#c9c9cc" }}>
                ⏱ {fmtClock(elapsed)}
              </span>
            </div>
            <div className="flex items-center justify-center gap-4 mb-12">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-20 h-24 rounded-2xl flex items-center justify-center font-black text-5xl"
                  style={{
                    border: `3px solid ${C.hred}`,
                    color: C.hred,
                    backgroundColor: C.hcard,
                  }}
                >
                  {revealedCode[i] || "?"}
                </div>
              ))}
            </div>

            {/* Stage 0: unscramble */}
            {stageIdx === 0 && (
              <div className="text-center">
                <p className="text-2xl sm:text-3xl mb-8" style={{ color: "#c9c9cc" }}>
                  글자를 순서대로 탭해서 단어를 완성하세요 ({wordIdx + 1}/{words.length})
                </p>
                <div
                  className="flex items-center justify-center gap-3 mb-10 min-h-[100px] flex-wrap"
                  style={{ animation: wordShake ? "shake 0.4s" : "none" }}
                >
                  {answerLetters.length === 0 && (
                    <span className="text-xl" style={{ color: "#555" }}>여기에 글자가 놓여요</span>
                  )}
                  {answerLetters.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => returnLetter(t)}
                      className="w-20 h-20 rounded-2xl font-black text-4xl"
                      style={{ backgroundColor: C.hred, color: "#0b0b0d" }}
                    >
                      {t.char}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {letterBank.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => tapLetter(t)}
                      className="w-20 h-20 rounded-2xl font-black text-4xl"
                      style={{ backgroundColor: C.hcard, color: "#eee", border: `2px solid ${C.hborder}` }}
                    >
                      {t.char}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stage 1: sentence builder */}
            {stageIdx === 1 && (
              <div className="text-center">
                <p className="text-2xl sm:text-3xl mb-8" style={{ color: "#c9c9cc" }}>
                  단어를 드래그하거나 탭해서 문장을 완성하세요 ({sentIdx + 1}/{sentences.length})
                </p>
                <div
                  className="flex items-center justify-center gap-3 mb-10 min-h-[100px] flex-wrap p-5 rounded-2xl"
                  style={{ border: `2px dashed ${C.hborder}`, animation: sentShake ? "shake 0.4s" : "none" }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const id = e.dataTransfer.getData("text/plain");
                    const tile = wordBank.find((t) => t.id === id);
                    if (tile) placeWord(tile);
                  }}
                >
                  {placedWords.length === 0 && (
                    <span className="text-xl" style={{ color: "#555" }}>여기로 드래그하세요</span>
                  )}
                  {placedWords.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => returnWord(t)}
                      className="px-6 py-4 rounded-2xl font-bold text-2xl"
                      style={{ backgroundColor: C.hred, color: "#0b0b0d" }}
                    >
                      {t.text}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {wordBank.map((t) => (
                    <button
                      key={t.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("text/plain", t.id)}
                      onClick={() => placeWord(t)}
                      className="px-6 py-4 rounded-2xl font-bold text-2xl cursor-grab"
                      style={{ backgroundColor: C.hcard, color: "#eee", border: `2px solid ${C.hborder}` }}
                    >
                      {t.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stage 2: quiz */}
            {stageIdx === 2 && quiz[quizIdx] && (
              <div className="text-center">
                <p className="text-xl sm:text-2xl mb-2" style={{ color: "#c9c9cc" }}>
                  질문 {quizIdx + 1}/{quiz.length}
                </p>
                <p className="font-bold text-3xl sm:text-4xl mb-10" style={{ color: "#eee" }}>
                  🦇 {quiz[quizIdx].question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
                  {quiz[quizIdx].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => answerQuiz(opt)}
                      className="px-8 py-6 rounded-2xl font-bold text-2xl"
                      style={{
                        backgroundColor:
                          quizFeedback && opt === quiz[quizIdx].correct ? "#1e5c2f" :
                          quizFeedback === "wrong" ? C.hcard : C.hcard,
                        color: "#eee",
                        border: `2px solid ${quizFeedback === "correct" && opt === quiz[quizIdx].correct ? "#2ecc71" : C.hborder}`,
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stage 3: keypad */}
            {stageIdx === 3 && (
              <div className="text-center">
                <p className="text-2xl sm:text-3xl mb-8 flex items-center justify-center gap-2" style={{ color: "#c9c9cc" }}>
                  <KeyRound size={26} /> 모은 암호 {code.length}자리를 순서대로 입력하세요
                </p>
                <div
                  className="flex items-center justify-center gap-4 mb-10"
                  style={{ animation: keypadError ? "shake 0.4s" : "none" }}
                >
                  {Array.from({ length: code.length }).map((_, i) => (
                    <div
                      key={i}
                      className="w-24 h-28 rounded-2xl flex items-center justify-center font-black text-5xl"
                      style={{ border: `3px solid ${keypadError ? "#666" : C.hred}`, color: C.hred, backgroundColor: C.hcard }}
                    >
                      {keypadInput[i] || ""}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 max-w-[440px] mx-auto">
                  {["1","2","3","4","5","6","7","8","9"].map((d) => (
                    <button
                      key={d}
                      onClick={() => pressDigit(d)}
                      className="h-24 rounded-2xl font-black text-4xl"
                      style={{ backgroundColor: C.hcard, color: "#eee", border: `2px solid ${C.hborder}` }}
                    >
                      {d}
                    </button>
                  ))}
                  <button onClick={backspace} className="h-24 rounded-2xl flex items-center justify-center" style={{ backgroundColor: C.hcard, color: "#eee", border: `2px solid ${C.hborder}` }}>
                    <Delete size={30} />
                  </button>
                  <button
                    onClick={() => pressDigit("0")}
                    className="h-24 rounded-2xl font-black text-4xl"
                    style={{ backgroundColor: C.hcard, color: "#eee", border: `2px solid ${C.hborder}` }}
                  >
                    0
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {phase === "success" && (
          <div className="text-center py-16">
            <div className="text-9xl mb-6">🎉🎃👻</div>
            <h2 className="font-black text-6xl mb-4" style={{ color: C.hred }}>ESCAPED!</h2>
            <p className="text-2xl mb-2" style={{ color: "#c9c9cc" }}>탈출 성공! 유령들을 물리쳤어요.</p>
            <p className="text-2xl mb-10 font-bold" style={{ color: "#eee" }}>총 소요 시간: {fmtClock(elapsed)}</p>
            <button
              onClick={() => setPhase("intro")}
              className="px-10 py-5 rounded-full font-black text-2xl flex items-center gap-3 mx-auto"
              style={{ backgroundColor: C.hred, color: "#0b0b0d" }}
            >
              <RotateCcw size={24} /> 다시 하기
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}

/* ================= 화면에 꽉 차게 자동 축소하는 래퍼 (스크롤 방지) ================= */
function FitToScreen({ children }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const recalc = () => {
      if (!outerRef.current || !innerRef.current) return;
      const availH = outerRef.current.clientHeight;
      const availW = outerRef.current.clientWidth;
      innerRef.current.style.transform = "scale(1)";
      const naturalH = innerRef.current.scrollHeight;
      const naturalW = innerRef.current.scrollWidth;
      if (!naturalH || !naturalW) return;
      const s = Math.min(1, availH / naturalH, availW / naturalW);
      setScale(s);
    };
    recalc();
    const ro = new ResizeObserver(recalc);
    if (outerRef.current) ro.observe(outerRef.current);
    if (innerRef.current) ro.observe(innerRef.current);
    window.addEventListener("resize", recalc);
    return () => { ro.disconnect(); window.removeEventListener("resize", recalc); };
  }, [children]);

  return (
    <div ref={outerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
      <div ref={innerRef} style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}>
        {children}
      </div>
    </div>
  );
}

/* ================= App shell ================= */
const HASH_TO_TAB = { "#activity": "activity", "#review": "review", "#halloween": "halloween" };
const TAB_TO_HASH = { activity: "#activity", review: "#review", halloween: "#halloween" };

export default function App() {
  const [tab, setTab] = useState(() => HASH_TO_TAB[window.location.hash] || "activity");

  useEffect(() => {
    const onHashChange = () => {
      const next = HASH_TO_TAB[window.location.hash];
      if (next) setTab(next);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const changeTab = (id) => {
    setTab(id);
    window.location.hash = TAB_TO_HASH[id];
  };

  const isHalloween = tab === "halloween";

  return (
    <div className="h-screen overflow-hidden flex flex-col" style={{ backgroundColor: isHalloween ? C.hbg : C.bg, fontFamily: "'Pretendard', -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif" }}>
      <header className="max-w-3xl mx-auto px-4 pt-6 pb-4 flex items-center justify-end flex-shrink-0 w-full">
        <a
          href="../index.html#inclass"
          className="flex items-center gap-1 text-sm font-bold px-3 py-2 rounded-full"
          style={{ color: isHalloween ? "#c9c9cc" : C.sub, border: `1px solid ${isHalloween ? "#2a2a2e" : C.border}` }}
        >
          ← 처음으로
        </a>
      </header>

      <div className="flex-1 min-h-0">
        {tab === "activity" && <div className="h-full overflow-y-auto"><ActivityTool /></div>}
        {tab === "review" && <FitToScreen><ReviewTest /></FitToScreen>}
        {tab === "halloween" && <FitToScreen><HalloweenEvent /></FitToScreen>}
      </div>
    </div>
  );
}
