"use client";
import { useState, useEffect, useRef } from "react";

type TaskStatus = "pending" | "in-progress" | "submitted" | "graded";
type ScanResult = "scanning" | "clean" | "ai-detected" | "plagiarism";

interface Task {
  id: number; title: string; type: string; prompt: string;
  minWords: number; maxWords: number; dueDate: string;
  points: number; status: TaskStatus; grade?: string; feedback?: string;
}

const TASKS: Task[] = [
  { id: 1, title: "The Impact of Social Media on Youth Mental Health", type: "Essay", prompt: "Discuss both the positive and negative effects of social media on teenagers. Support your argument with at least two credible sources and include real-world examples. Your response should have a clear introduction, body paragraphs with evidence, and a conclusion.", minWords: 600, maxWords: 900, dueDate: "2025-03-07", points: 100, status: "pending" },
  { id: 2, title: "A Night the Town Stood Still", type: "Story", prompt: "Write a short story set in your hometown during an unusual event. Focus on vivid sensory details, dialogue between at least two characters, and a clear narrative arc with beginning, middle, and end.", minWords: 400, maxWords: 700, dueDate: "2025-03-14", points: 80, status: "in-progress" },
  { id: 3, title: "Book Review: The Alchemist", type: "Review", prompt: "Write a critical review of 'The Alchemist' by Paulo Coelho. Address the main theme, evaluate the author's writing style, and share the personal impact the book had on you.", minWords: 500, maxWords: 800, dueDate: "2025-02-28", points: 90, status: "graded", grade: "A", feedback: "Excellent analysis! Your observations about recurring motifs were very insightful. Work on varying sentence structure in future." },
];

const AI_PHRASES = ["as an ai","i am an ai","language model","chatgpt","as a large language","it is important to note","furthermore, it is worth noting","in today's society, it is undeniable","delve into","it is crucial to","as we navigate","in conclusion, it is clear that","from various walks of life"];
const PLAGIARISM_PHRASES = ["according to wikipedia","copy paste","from the internet","taken from","source:","http://","https://","search results show"];

function detectContent(text: string) {
  const lower = text.toLowerCase();
  for (const p of AI_PHRASES) if (lower.includes(p)) return { result: "ai-detected" as ScanResult, score: 94 + Math.floor(Math.random()*5), reason: `AI-generated phrase detected: "${p}"` };
  for (const p of PLAGIARISM_PHRASES) if (lower.includes(p)) return { result: "plagiarism" as ScanResult, score: 89 + Math.floor(Math.random()*8), reason: `Plagiarism indicator found: "${p}"` };
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().split(" ").length > 5);
  if (sentences.length >= 5) {
    const lens = sentences.map((s) => s.trim().split(" ").length);
    const avg = lens.reduce((a, b) => a + b, 0) / lens.length;
    const variance = lens.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / lens.length;
    if (variance < 1.5) return { result: "ai-detected" as ScanResult, score: 76, reason: "Suspiciously uniform sentence lengths — possible AI generation." };
  }
  return { result: "clean" as ScanResult, score: 88 + Math.floor(Math.random() * 10), reason: "No AI or plagiarism patterns detected. Content appears original." };
}

const wc = (t: string) => t.trim() === "" ? 0 : t.trim().split(/\s+/).length;

export default function StudentWorkspace() {
  const [tasks, setTasks] = useState<Task[]>(TASKS);
  const [active, setActive] = useState<Task | null>(null);
  const [writing, setWriting] = useState("");
  const [view, setView] = useState<"board" | "editor">("board");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanScore, setScanScore] = useState(0);
  const [scanReason, setScanReason] = useState("");
  const [scanning, setScanning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [accountHeld, setAccountHeld] = useState(false);
  const [holdReason, setHoldReason] = useState("");
  const [filterTab, setFilterTab] = useState<"all"|"pending"|"in-progress"|"graded">("all");
  const [lastSaved, setLastSaved] = useState<string|null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout>|null>(null);

  const words = wc(writing);
  const wcOk = active ? words >= active.minWords && words <= active.maxWords : false;

  useEffect(() => {
    if (view !== "editor" || !writing) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setLastSaved(new Date().toLocaleTimeString()), 2000);
  }, [writing, view]);

  const openTask = (task: Task) => {
    if (accountHeld) return;
    setActive(task); setWriting(""); setScanResult(null); setScanScore(0); setScanReason(""); setSubmitted(false); setView("editor");
  };

  const handleSubmit = async () => {
    if (!active || !wcOk || accountHeld) return;
    setScanning(true); setScanResult("scanning");
    await new Promise((r) => setTimeout(r, 3000));
    const { result, score, reason } = detectContent(writing);
    setScanning(false); setScanResult(result); setScanScore(score); setScanReason(reason);
    if (result === "ai-detected" || result === "plagiarism") {
      setAccountHeld(true);
      setHoldReason(result === "ai-detected"
        ? "AI-generated content was detected in your submission. This violates our academic integrity policy. Your submission has been cancelled and your account is on hold pending review by a human moderator."
        : "Plagiarised content was detected. Copying from external sources is strictly prohibited. Your submission has been cancelled and your account is on hold.");
      setTasks((p) => p.map((t) => t.id === active.id ? { ...t, status: "pending" } : t));
    } else {
      setSubmitted(true);
      setTasks((p) => p.map((t) => t.id === active.id ? { ...t, status: "submitted" } : t));
    }
  };

  const filtered = filterTab === "all" ? tasks : tasks.filter((t) => t.status === filterTab);
  const statusColor: Record<TaskStatus, string> = { pending:"#b8a9e8","in-progress":"#e8c87d",submitted:"#9ecfb8",graded:"#f4a97f" };

  return (
    <div className="sw-root">
      <div className="sw-bg"><div className="sw-orb sw-orb--1"/><div className="sw-orb sw-orb--2"/></div>

      {accountHeld && (
        <div className="sw-held-banner">
          <span>🚫</span>
          <div><strong>Account Held — Submission Cancelled by ScriptGuard AI</strong><p>{holdReason}</p></div>
          <span className="sw-held-chip">ACCOUNT ON HOLD</span>
        </div>
      )}

      <aside className="sw-sidebar">
        <div className="sw-logo"><span className="sw-logo-mark">✦</span><span>ScriptMaster</span></div>
        <nav className="sw-nav">
          {[["📋","My Tasks"],["📊","Progress"],["🏆","Certificates"],["📚","Training"],["⚙️","Settings"]].map(([icon,label]) => (
            <a key={label as string} className={`sw-nav-item ${label==="My Tasks"?"sw-nav-item--active":""}`} href="#"><span>{icon}</span>{label}</a>
          ))}
        </nav>
        <div className="sw-sidebar__bot">
          <div className="sw-bot-pill"><span className="sw-bot-dot"/>ScriptGuard Active</div>
        </div>
        <div className="sw-profile">
          <div className="sw-avatar">A</div>
          <div><strong>Amara Osei</strong><span>Student</span></div>
        </div>
      </aside>

      <main className="sw-main">
        {view === "board" && (
          <>
            <div className="sw-page-header">
              <div><h1 className="sw-title">My Task Board</h1><p className="sw-sub">Every submission is scanned by ScriptGuard AI before reaching your teacher.</p></div>
              <div className="sw-ai-live-badge"><span className="sw-ai-dot"/>AI Detection Active</div>
            </div>

            <div className="sw-stats">
              {[{l:"Total",v:tasks.length,i:"📋",c:"#e8c87d"},{l:"Pending",v:tasks.filter(t=>t.status==="pending"||t.status==="in-progress").length,i:"⏳",c:"#b8a9e8"},{l:"Submitted",v:tasks.filter(t=>t.status==="submitted").length,i:"📥",c:"#9ecfb8"},{l:"Graded",v:tasks.filter(t=>t.status==="graded").length,i:"⭐",c:"#f4a97f"}].map((s,i) => (
                <div key={i} className="sw-stat" style={{"--sc":s.c} as React.CSSProperties}><span>{s.i}</span><strong>{s.v}</strong><span>{s.l}</span><div className="sw-stat-bar"/></div>
              ))}
            </div>

            <div className="sw-detect-box">
              <span className="sw-detect-box__icon">🤖</span>
              <div>
                <strong>ScriptGuard AI scans every submission before it reaches your teacher</strong>
                <p>Using ChatGPT, Gemini, Copilot, or copying from the internet will immediately cancel your submission and place your account on hold. Always write in your own words.</p>
              </div>
              <div className="sw-detect-tags"><span>✓ AI detection</span><span>✓ Plagiarism scan</span><span>✓ Copy-paste check</span></div>
            </div>

            <div className="sw-filter-tabs">
              {(["all","pending","in-progress","graded"] as const).map((tab) => (
                <button key={tab} className={`sw-ftab ${filterTab===tab?"active":""}`} onClick={() => setFilterTab(tab)}>
                  {tab === "all" ? "All" : tab === "in-progress" ? "In Progress" : tab.charAt(0).toUpperCase()+tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="sw-task-grid">
              {filtered.map((task) => (
                <div key={task.id} className={`sw-task-card ${accountHeld?"locked":""}`}>
                  <div className="sw-task-card__top">
                    <span className="sw-task-tag">{task.type}</span>
                    <span className="sw-task-status" style={{background:`${statusColor[task.status]}18`,color:statusColor[task.status],borderColor:`${statusColor[task.status]}40`}}>{task.status.replace("-"," ")}</span>
                  </div>
                  <h3>{task.title}</h3>
                  <p className="sw-task-prompt">{task.prompt.slice(0,110)}…</p>
                  <div className="sw-task-meta"><span>📅 {new Date(task.dueDate).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</span><span>📝 {task.minWords}–{task.maxWords}w</span><span>⭐ {task.points}pts</span></div>
                  {task.status === "graded" && <div className="sw-grade-box"><span className="sw-grade-chip">Grade: {task.grade}</span><p>{task.feedback}</p></div>}
                  {task.status !== "graded" && task.status !== "submitted" && (
                    <button className={`sw-btn sw-btn--gold sw-btn--full ${accountHeld?"sw-btn--disabled":""}`} onClick={() => !accountHeld && openTask(task)}>
                      {accountHeld ? "🚫 Account on Hold" : task.status === "in-progress" ? "Continue Writing →" : "Start Writing →"}
                    </button>
                  )}
                  {task.status === "submitted" && <div className="sw-sub-tag">✅ Submitted — Awaiting grade</div>}
                </div>
              ))}
            </div>
          </>
        )}

        {view === "editor" && active && (
          <>
            <div className="sw-editor-topbar">
              <button className="sw-back" onClick={() => setView("board")}>← Back to Board</button>
              <div className="sw-editor-info">
                <h1 className="sw-title">{active.title}</h1>
                <div className="sw-editor-meta"><span>{active.type}</span><span>📝 {active.minWords}–{active.maxWords} words</span><span>⭐ {active.points}pts</span><span>📅 Due {new Date(active.dueDate).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span></div>
              </div>
              {lastSaved && !submitted && <span className="sw-save-label">💾 Saved {lastSaved}</span>}
            </div>

            {!submitted && !accountHeld && (
              <div className="sw-warn-bar"><span>⚠️</span><span><strong>Original work only.</strong> ScriptGuard AI scans your submission for AI-generated content and plagiarism. Violations will cancel your submission and hold your account.</span></div>
            )}

            {accountHeld && (
              <div className="sw-held-card">
                <div className="sw-held-card__icon">🚫</div>
                <h2>Submission Cancelled — Account on Hold</h2>
                <div className="sw-held-card__finding"><strong>🔍 ScriptGuard Finding:</strong> {scanReason}</div>
                <p>{holdReason}</p>
                <div className="sw-scan-meter"><span>Detection confidence</span><div className="sw-meter-track"><div className="sw-meter-fill sw-meter-fill--danger" style={{width:`${scanScore}%`}}/></div><span className="danger-text">{scanScore}%</span></div>
                <div className="sw-held-card__actions">
                  <a href="mailto:appeals@scriptmaster.com" className="sw-btn sw-btn--ghost">Submit Appeal →</a>
                  <button className="sw-btn sw-btn--ghost" onClick={() => setView("board")}>Return to Board</button>
                </div>
              </div>
            )}

            {submitted && (
              <div className="sw-success-card">
                <div className="sw-success-card__icon">🎉</div>
                <h2>Submission Accepted!</h2>
                <div className="sw-scan-meter sw-scan-meter--ok"><span>✅ Originality score</span><div className="sw-meter-track"><div className="sw-meter-fill sw-meter-fill--clean" style={{width:`${scanScore}%`}}/></div><span className="clean-text">{scanScore}%</span></div>
                <p>Your work passed all ScriptGuard checks and has been sent to your teacher.</p>
                <button className="sw-btn sw-btn--gold" onClick={() => setView("board")}>Back to Task Board →</button>
              </div>
            )}

            {!accountHeld && !submitted && (
              <div className="sw-editor-layout">
                <div className="sw-editor-main">
                  <div className="sw-prompt-card"><div className="sw-prompt-card__label">📋 Prompt</div><p>{active.prompt}</p></div>

                  <div className="sw-write-card">
                    <div className="sw-write-card__header">
                      <span>Your Response</span>
                      <span className={`sw-wc-badge ${words < active.minWords ? "low" : words > active.maxWords ? "over" : "ok"}`}>
                        {words} words {words < active.minWords ? `(need ${active.minWords - words} more)` : words > active.maxWords ? `(${words - active.maxWords} over)` : "✓"}
                      </span>
                    </div>
                    <textarea
                      className="sw-write-textarea"
                      placeholder={`Write your ${active.type.toLowerCase()} here. Be original — ScriptGuard will scan before submission.\n\n• No ChatGPT or AI tools\n• No copy-paste from web\n• Your own words only`}
                      value={writing}
                      onChange={(e) => setWriting(e.target.value)}
                      onPaste={(e) => { if (e.clipboardData.getData("text").length > 300) { /* flag large paste silently */ } }}
                    />
                    <div className="sw-wc-progress">
                      <div className="sw-wc-track">
                        <div className="sw-wc-fill" style={{width:`${Math.min((words/active.maxWords)*100,100)}%`,background:words>active.maxWords?"#e74c3c":words>=active.minWords?"#9ecfb8":"#e8c87d"}}/>
                        <div className="sw-wc-min-line" style={{left:`${(active.minWords/active.maxWords)*100}%`}}/>
                      </div>
                      <div className="sw-wc-labels"><span>0</span><span style={{position:"absolute",left:`${(active.minWords/active.maxWords)*100}%`,transform:"translateX(-50%)"}}>{active.minWords} min</span><span>{active.maxWords} max</span></div>
                    </div>
                  </div>

                  {scanning && (
                    <div className="sw-scanning-card">
                      <span className="sw-scanning-spin"/><div><strong>ScriptGuard AI scanning your submission…</strong><p>Analysing for AI-generated patterns, plagiarism, and copy-paste. Please wait.</p></div>
                    </div>
                  )}

                  {scanResult && scanResult !== "scanning" && !scanning && (
                    <div className={`sw-scan-card ${scanResult}`}>
                      <div className="sw-scan-card__head">
                        <span>{scanResult==="clean"?"✅":"🚫"}</span>
                        <strong>{scanResult==="clean"?"Content is Original — Passed":"Violation Detected — Submission Blocked"}</strong>
                      </div>
                      <p className="sw-scan-reason">{scanReason}</p>
                      <div className="sw-scan-meter"><span>{scanResult==="clean"?"Originality":"Detection confidence"}</span><div className="sw-meter-track"><div className={`sw-meter-fill ${scanResult==="clean"?"sw-meter-fill--clean":"sw-meter-fill--danger"}`} style={{width:`${scanScore}%`}}/></div><span className={scanResult==="clean"?"clean-text":"danger-text"}>{scanScore}%</span></div>
                    </div>
                  )}

                  {!scanning && scanResult !== "ai-detected" && scanResult !== "plagiarism" && (
                    <button className={`sw-btn sw-btn--gold sw-btn--submit ${!wcOk?"sw-btn--disabled":""}`} disabled={!wcOk || scanning} onClick={handleSubmit}>
                      {`Submit for Grading — ${active.points} pts →`}
                    </button>
                  )}
                  {!wcOk && <p className="sw-wc-warn">{words < active.minWords ? `Minimum ${active.minWords} words required (${words} written)` : `Maximum ${active.maxWords} words exceeded (${words} written)`}</p>}
                </div>

                <div className="sw-editor-panel-col">
                  <div className="sw-panel"><div className="sw-panel-title">📐 Rubric</div>{[["Structure",25],["Argument",30],["Language",25],["Grammar",20]].map(([n,p]) => <div key={n as string} className="sw-rub-row"><span>{n as string}</span><span>{p as number}pts</span></div>)}<div className="sw-rub-total"><span>Total</span><span>{active.points}pts</span></div></div>
                  <div className="sw-panel sw-panel--rules"><div className="sw-panel-title">🤖 ScriptGuard Rules</div>{["No AI-generated content","No ChatGPT / Gemini","No internet copy-paste","Original writing only","Meet word count requirement"].map((r) => <div key={r} className="sw-rule-row"><span>⚠️</span><span>{r}</span></div>)}</div>
                  <div className="sw-panel"><div className="sw-panel-title">📊 Word Count</div>{[["Written",words,"#e8c87d"],["Minimum",active.minWords,words>=active.minWords?"#9ecfb8":"#e74c3c"],["Maximum",active.maxWords,words>active.maxWords?"#e74c3c":"#5a7a8e"]].map(([l,v,c]) => <div key={l as string} className="sw-wc-row"><span>{l as string}</span><strong style={{color:c as string}}>{v as number}</strong></div>)}</div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .sw-root{font-family:'DM Sans',sans-serif;background:#071524;color:#d8e4ec;min-height:100vh;display:flex;flex-direction:column;position:relative;overflow-x:hidden;}
        .sw-bg{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
        .sw-orb{position:absolute;border-radius:50%;filter:blur(90px);}
        .sw-orb--1{width:500px;height:500px;background:#0f3050;top:-100px;right:-100px;opacity:0.55;}
        .sw-orb--2{width:350px;height:350px;background:#1a1a40;bottom:8%;left:-80px;opacity:0.4;}
        .sw-held-banner{position:sticky;top:0;z-index:300;display:flex;align-items:flex-start;gap:1rem;background:#180808;border-bottom:2px solid #e74c3c;padding:0.9rem 1.5rem;font-size:0.83rem;}
        .sw-held-banner>span:first-child{font-size:1.3rem;flex-shrink:0;}
        .sw-held-banner strong{display:block;color:#e74c3c;margin-bottom:0.2rem;}
        .sw-held-banner p{color:#c09090;line-height:1.5;font-size:0.78rem;}
        .sw-held-chip{margin-left:auto;font-size:0.65rem;font-weight:700;letter-spacing:0.08em;background:rgba(231,76,60,0.15);color:#e74c3c;border:1px solid rgba(231,76,60,0.4);padding:0.2rem 0.6rem;border-radius:5px;white-space:nowrap;align-self:center;flex-shrink:0;}
        .sw-sidebar{width:215px;flex-shrink:0;background:#0a1e2e;border-right:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;}
        .sw-logo{display:flex;align-items:center;gap:0.5rem;padding:1.3rem 1.3rem 1.6rem;font-family:'Lora',serif;font-size:1.1rem;font-weight:700;color:#e8c87d;border-bottom:1px solid rgba(255,255,255,0.06);}
        .sw-logo-mark{font-size:0.85rem;}
        .sw-nav{display:flex;flex-direction:column;gap:0.12rem;padding:1rem 0.5rem;flex:1;}
        .sw-nav-item{display:flex;align-items:center;gap:0.65rem;padding:0.58rem 0.75rem;border-radius:7px;font-size:0.86rem;color:#4a6070;text-decoration:none;transition:all 0.15s;}
        .sw-nav-item:hover{background:rgba(255,255,255,0.04);color:#d8e4ec;}
        .sw-nav-item--active{background:rgba(232,200,125,0.1);color:#e8c87d;font-weight:500;}
        .sw-sidebar__bot{padding:0.5rem 0.9rem;}
        .sw-bot-pill{display:flex;align-items:center;gap:0.45rem;font-size:0.72rem;color:#4a6070;background:rgba(158,207,184,0.05);border:1px solid rgba(158,207,184,0.12);border-radius:8px;padding:0.4rem 0.65rem;}
        .sw-bot-dot{width:6px;height:6px;border-radius:50%;background:#9ecfb8;animation:blink 2s ease-in-out infinite;flex-shrink:0;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        .sw-profile{display:flex;align-items:center;gap:0.65rem;padding:0.8rem 1rem;border-top:1px solid rgba(255,255,255,0.06);margin-top:0.4rem;}
        .sw-avatar{width:30px;height:30px;border-radius:50%;background:#e8c87d;color:#1a0e05;font-size:0.78rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .sw-profile strong{display:block;font-size:0.82rem;color:#d8e4ec;}
        .sw-profile span{font-size:0.7rem;color:#3a5060;}
        .sw-main{margin-left:215px;padding:2rem 2.5rem;position:relative;z-index:1;min-height:100vh;}
        .sw-page-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.5rem;gap:1rem;}
        .sw-title{font-family:'Lora',serif;font-size:1.75rem;font-weight:700;color:#f0ece4;margin-bottom:0.3rem;}
        .sw-sub{font-size:0.82rem;color:#3a5060;}
        .sw-ai-live-badge{display:flex;align-items:center;gap:0.5rem;font-size:0.76rem;font-weight:600;background:rgba(231,76,60,0.1);color:#e74c3c;border:1px solid rgba(231,76,60,0.3);padding:0.38rem 0.85rem;border-radius:100px;white-space:nowrap;flex-shrink:0;}
        .sw-ai-dot{width:6px;height:6px;border-radius:50%;background:#e74c3c;animation:blink 1.5s ease-in-out infinite;flex-shrink:0;}
        .sw-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0.9rem;margin-bottom:1.25rem;}
        .sw-stat{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:11px;padding:1rem 1.1rem;display:flex;flex-direction:column;gap:0.2rem;position:relative;overflow:hidden;transition:transform 0.15s;}
        .sw-stat:hover{transform:translateY(-2px);}
        .sw-stat>span:first-child{font-size:1.2rem;}
        .sw-stat strong{font-family:'Lora',serif;font-size:1.8rem;font-weight:700;color:var(--sc);line-height:1;}
        .sw-stat>span:last-child{font-size:0.73rem;color:#3a5060;}
        .sw-stat-bar{position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--sc);opacity:0.4;}
        .sw-detect-box{display:flex;align-items:flex-start;gap:1rem;background:#0d1810;border:1px solid rgba(231,76,60,0.2);border-radius:13px;padding:1.1rem 1.3rem;margin-bottom:1.25rem;}
        .sw-detect-box__icon{font-size:1.8rem;flex-shrink:0;}
        .sw-detect-box strong{display:block;color:#f0ece4;font-size:0.9rem;margin-bottom:0.3rem;}
        .sw-detect-box p{font-size:0.8rem;color:#5a7a8e;line-height:1.65;}
        .sw-detect-tags{display:flex;flex-direction:column;gap:0.3rem;margin-left:auto;flex-shrink:0;}
        .sw-detect-tags span{font-size:0.7rem;color:#9ecfb8;background:rgba(158,207,184,0.08);border:1px solid rgba(158,207,184,0.18);border-radius:5px;padding:0.16rem 0.5rem;white-space:nowrap;}
        .sw-filter-tabs{display:flex;gap:0.35rem;margin-bottom:1.1rem;border-bottom:1px solid rgba(255,255,255,0.07);}
        .sw-ftab{padding:0.52rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#3a5060;font-size:0.84rem;cursor:pointer;font-family:'DM Sans',sans-serif;margin-bottom:-1px;transition:all 0.15s;}
        .sw-ftab:hover{color:#d8e4ec;}
        .sw-ftab.active{color:#e8c87d;border-bottom-color:#e8c87d;}
        .sw-task-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.1rem;}
        .sw-task-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:13px;padding:1.3rem;display:flex;flex-direction:column;gap:0.7rem;transition:transform 0.18s,border-color 0.18s;}
        .sw-task-card:hover{transform:translateY(-3px);border-color:rgba(232,200,125,0.2);}
        .sw-task-card.locked{opacity:0.5;pointer-events:none;}
        .sw-task-card__top{display:flex;justify-content:space-between;align-items:center;}
        .sw-task-tag{font-size:0.7rem;font-weight:600;color:#e8c87d;background:rgba(232,200,125,0.1);padding:0.16rem 0.5rem;border-radius:4px;text-transform:uppercase;letter-spacing:0.05em;}
        .sw-task-status{font-size:0.68rem;font-weight:600;padding:0.18rem 0.55rem;border-radius:5px;border:1px solid;text-transform:capitalize;}
        .sw-task-card h3{font-family:'Lora',serif;font-size:1rem;font-weight:600;color:#f0ece4;line-height:1.35;}
        .sw-task-prompt{font-size:0.78rem;color:#3a5060;line-height:1.6;}
        .sw-task-meta{display:flex;gap:0.65rem;flex-wrap:wrap;font-size:0.73rem;color:#2a3a48;}
        .sw-grade-box{background:rgba(244,169,127,0.07);border:1px solid rgba(244,169,127,0.2);border-radius:7px;padding:0.7rem;}
        .sw-grade-chip{display:inline-block;font-size:0.78rem;font-weight:700;color:#f4a97f;margin-bottom:0.35rem;}
        .sw-grade-box p{font-size:0.76rem;color:#7a9ab8;line-height:1.55;}
        .sw-sub-tag{text-align:center;font-size:0.78rem;color:#9ecfb8;background:rgba(158,207,184,0.07);border:1px solid rgba(158,207,184,0.2);border-radius:6px;padding:0.45rem;}
        .sw-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.45rem;padding:0.62rem 1.2rem;border-radius:8px;font-size:0.88rem;font-weight:600;text-decoration:none;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all 0.18s;}
        .sw-btn--gold{background:#e8c87d;color:#1a0e05;}
        .sw-btn--gold:hover:not(.sw-btn--disabled){background:#f0d698;box-shadow:0 5px 18px rgba(232,200,125,0.28);}
        .sw-btn--ghost{background:transparent;color:#8aa5b8;border:1px solid rgba(255,255,255,0.12);}
        .sw-btn--ghost:hover{border-color:#e8c87d;color:#e8c87d;}
        .sw-btn--full{width:100%;}
        .sw-btn--disabled{opacity:0.45;cursor:not-allowed;}
        .sw-btn--submit{width:100%;padding:0.82rem;font-size:0.94rem;}
        .sw-editor-topbar{margin-bottom:0.9rem;}
        .sw-back{background:none;border:none;color:#e8c87d;font-size:0.8rem;cursor:pointer;padding:0;font-family:'DM Sans',sans-serif;margin-bottom:0.45rem;transition:opacity 0.15s;}
        .sw-back:hover{opacity:0.7;}
        .sw-editor-info{display:flex;flex-direction:column;gap:0.25rem;}
        .sw-editor-meta{display:flex;gap:1rem;flex-wrap:wrap;font-size:0.75rem;color:#3a5060;}
        .sw-save-label{font-size:0.72rem;color:#2a3a48;margin-top:0.3rem;}
        .sw-warn-bar{display:flex;align-items:flex-start;gap:0.65rem;background:#180d0d;border:1px solid rgba(231,76,60,0.28);border-radius:9px;padding:0.8rem 0.95rem;margin-bottom:1.1rem;font-size:0.8rem;color:#b09090;line-height:1.6;}
        .sw-warn-bar strong{color:#e74c3c;}
        .sw-editor-layout{display:grid;grid-template-columns:1fr 240px;gap:1.25rem;align-items:start;}
        .sw-editor-main{display:flex;flex-direction:column;gap:0.9rem;}
        .sw-prompt-card{background:#0a1e2e;border:1px solid rgba(232,200,125,0.18);border-radius:11px;padding:1.1rem;}
        .sw-prompt-card__label{font-size:0.68rem;text-transform:uppercase;letter-spacing:0.08em;color:#e8c87d;margin-bottom:0.5rem;}
        .sw-prompt-card p{font-size:0.85rem;color:#7a9ab8;line-height:1.7;}
        .sw-write-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:11px;overflow:hidden;}
        .sw-write-card__header{display:flex;justify-content:space-between;align-items:center;padding:0.7rem 0.95rem;border-bottom:1px solid rgba(255,255,255,0.06);font-size:0.78rem;color:#4a6070;}
        .sw-wc-badge{font-size:0.73rem;font-weight:500;}
        .sw-wc-badge.ok{color:#9ecfb8;}
        .sw-wc-badge.low{color:#e8c87d;}
        .sw-wc-badge.over{color:#e74c3c;}
        .sw-write-textarea{width:100%;min-height:360px;background:transparent;border:none;outline:none;padding:1.1rem;color:#d8e4ec;font-size:0.9rem;font-family:'DM Sans',sans-serif;line-height:1.78;resize:vertical;}
        .sw-write-textarea::placeholder{color:#1e2e3a;line-height:1.9;}
        .sw-wc-progress{padding:0.65rem 0.95rem;border-top:1px solid rgba(255,255,255,0.06);}
        .sw-wc-track{position:relative;height:5px;background:rgba(255,255,255,0.07);border-radius:3px;margin-bottom:0.35rem;overflow:visible;}
        .sw-wc-fill{height:100%;border-radius:3px;transition:width 0.18s,background 0.18s;}
        .sw-wc-min-line{position:absolute;top:-3px;width:1.5px;height:11px;background:rgba(255,255,255,0.18);border-radius:1px;}
        .sw-wc-labels{position:relative;display:flex;justify-content:space-between;font-size:0.67rem;color:#1e2e3a;}
        .sw-wc-warn{font-size:0.76rem;color:#e8c87d;text-align:center;}
        .sw-scanning-card{display:flex;align-items:center;gap:1rem;background:#0a1a0a;border:1px solid rgba(158,207,184,0.22);border-radius:11px;padding:1.1rem;}
        .sw-scanning-spin{width:26px;height:26px;border:3px solid rgba(158,207,184,0.18);border-top-color:#9ecfb8;border-radius:50%;animation:spin 0.8s linear infinite;flex-shrink:0;}
        @keyframes spin{to{transform:rotate(360deg)}}
        .sw-scanning-card strong{display:block;color:#9ecfb8;font-size:0.88rem;margin-bottom:0.2rem;}
        .sw-scanning-card p{font-size:0.78rem;color:#3a5060;}
        .sw-scan-card{border-radius:11px;padding:1.1rem;border:1px solid;}
        .sw-scan-card.clean{background:rgba(158,207,184,0.05);border-color:rgba(158,207,184,0.22);}
        .sw-scan-card.ai-detected,.sw-scan-card.plagiarism{background:rgba(231,76,60,0.06);border-color:rgba(231,76,60,0.28);}
        .sw-scan-card__head{display:flex;align-items:center;gap:0.6rem;margin-bottom:0.45rem;font-size:0.88rem;}
        .sw-scan-card__head strong{color:#f0ece4;}
        .sw-scan-reason{font-size:0.78rem;color:#6a8090;margin-bottom:0.7rem;line-height:1.55;}
        .sw-scan-meter{display:flex;align-items:center;gap:0.7rem;font-size:0.76rem;color:#4a6070;}
        .sw-scan-meter--ok{}
        .sw-meter-track{flex:1;height:6px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden;}
        .sw-meter-fill{height:100%;border-radius:3px;transition:width 0.5s ease;}
        .sw-meter-fill--clean{background:#9ecfb8;}
        .sw-meter-fill--danger{background:#e74c3c;}
        .clean-text{color:#9ecfb8;font-weight:600;white-space:nowrap;}
        .danger-text{color:#e74c3c;font-weight:600;white-space:nowrap;}
        .sw-held-card{background:#180808;border:1px solid rgba(231,76,60,0.32);border-radius:16px;padding:2rem;text-align:center;}
        .sw-held-card__icon{font-size:3rem;margin-bottom:0.7rem;}
        .sw-held-card h2{font-family:'Lora',serif;font-size:1.4rem;color:#f0ece4;margin-bottom:0.75rem;}
        .sw-held-card__finding{background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.2);border-radius:8px;padding:0.75rem;margin-bottom:0.8rem;font-size:0.81rem;color:#c09090;text-align:left;line-height:1.6;}
        .sw-held-card__finding strong{color:#e74c3c;display:block;margin-bottom:0.25rem;}
        .sw-held-card p{font-size:0.84rem;color:#6a8090;line-height:1.65;margin-bottom:1.2rem;}
        .sw-held-card .sw-scan-meter{margin-bottom:1.5rem;justify-content:center;}
        .sw-held-card__actions{display:flex;gap:0.7rem;justify-content:center;}
        .sw-success-card{background:#0a180a;border:1px solid rgba(158,207,184,0.28);border-radius:16px;padding:2rem;text-align:center;}
        .sw-success-card__icon{font-size:3rem;margin-bottom:0.7rem;}
        .sw-success-card h2{font-family:'Lora',serif;font-size:1.4rem;color:#f0ece4;margin-bottom:0.75rem;}
        .sw-success-card .sw-scan-meter{justify-content:center;margin-bottom:0.85rem;}
        .sw-success-card p{font-size:0.84rem;color:#5a7a8e;margin-bottom:1.5rem;}
        .sw-editor-panel-col{display:flex;flex-direction:column;gap:0.9rem;}
        .sw-panel{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:11px;padding:1rem;}
        .sw-panel--rules{border-color:rgba(231,76,60,0.18);}
        .sw-panel-title{font-size:0.68rem;text-transform:uppercase;letter-spacing:0.08em;color:#e8c87d;margin-bottom:0.7rem;}
        .sw-rub-row{display:flex;justify-content:space-between;font-size:0.8rem;padding:0.3rem 0;border-bottom:1px solid rgba(255,255,255,0.04);color:#6a8090;}
        .sw-rub-total{display:flex;justify-content:space-between;font-size:0.83rem;font-weight:600;color:#f0ece4;padding-top:0.45rem;}
        .sw-rule-row{display:flex;align-items:center;gap:0.45rem;font-size:0.76rem;color:#8aa5b8;padding:0.28rem 0;}
        .sw-wc-row{display:flex;justify-content:space-between;font-size:0.8rem;padding:0.3rem 0;border-bottom:1px solid rgba(255,255,255,0.04);}
        .sw-wc-row span{color:#4a6070;}
        @media(max-width:860px){.sw-sidebar{display:none;}.sw-main{margin-left:0;padding:1.5rem;}.sw-stats{grid-template-columns:1fr 1fr;}.sw-editor-layout{grid-template-columns:1fr;}.sw-editor-panel-col{display:none;}.sw-detect-box{flex-direction:column;}.sw-detect-tags{flex-direction:row;flex-wrap:wrap;margin-left:0;}}
      `}</style>
    </div>
  );
}
