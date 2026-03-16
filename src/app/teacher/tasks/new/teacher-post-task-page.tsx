"use client";
import { useState } from "react";

const TASK_TYPES = ["Essay","Story","Report","Review","Research Paper","Letter","Speech","Poem"];

type RubricRow = { criterion: string; points: string };

export default function PostTaskPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Essay");
  const [prompt, setPrompt] = useState("");
  const [minWords, setMinWords] = useState("400");
  const [maxWords, setMaxWords] = useState("700");
  const [points, setPoints] = useState("100");
  const [dueDate, setDueDate] = useState("");
  const [rubric, setRubric] = useState<RubricRow[]>([
    { criterion:"Structure & Organisation", points:"25" },
    { criterion:"Argument & Ideas", points:"30" },
    { criterion:"Language & Vocabulary", points:"25" },
    { criterion:"Grammar & Mechanics", points:"20" },
  ]);
  const [notes, setNotes] = useState("");
  const [tab, setTab] = useState<"form"|"preview">("form");
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateRubric = (i: number, key: keyof RubricRow, val: string) => {
    setRubric((p) => p.map((r, idx) => idx === i ? { ...r, [key]: val } : r));
  };
  const addRubricRow = () => setRubric((p) => [...p, { criterion: "", points: "0" }]);
  const removeRubricRow = (i: number) => setRubric((p) => p.filter((_, idx) => idx !== i));
  const rubricTotal = rubric.reduce((a, r) => a + (parseInt(r.points) || 0), 0);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Task title is required.";
    if (!prompt.trim() || prompt.length < 30) e.prompt = "Prompt must be at least 30 characters.";
    if (!dueDate) e.dueDate = "Due date is required.";
    if (parseInt(minWords) >= parseInt(maxWords)) e.words = "Min words must be less than max words.";
    if (rubricTotal !== parseInt(points)) e.rubric = `Rubric total (${rubricTotal}) must equal task points (${points}).`;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePublish = async () => {
    if (!validate()) return;
    setPublishing(true);
    await new Promise((r) => setTimeout(r, 1800));
    setPublishing(false);
    setPublished(true);
  };

  if (published) return (
    <div className="pt-root">
      <div className="pt-bg"/>
      <div className="pt-success-wrap">
        <div className="pt-success">
          <div className="pt-success__icon">🎉</div>
          <h2>Task Published!</h2>
          <p>Your task has been posted and is now visible to all active students.</p>
          <div className="pt-success__details">
            <div className="pt-srow"><span>Task</span><strong>{title}</strong></div>
            <div className="pt-srow"><span>Type</span><strong>{type}</strong></div>
            <div className="pt-srow"><span>Due Date</span><strong>{dueDate}</strong></div>
            <div className="pt-srow"><span>Points</span><strong>{points}</strong></div>
            <div className="pt-srow"><span>Word Count</span><strong>{minWords}–{maxWords} words</strong></div>
          </div>
          <div className="pt-success__actions">
            <a href="/teacher/tasks" className="pt-btn pt-btn--gold">View All Tasks →</a>
            <button className="pt-btn pt-btn--ghost" onClick={() => { setPublished(false); setTitle(""); setPrompt(""); setDueDate(""); }}>Post Another Task</button>
          </div>
        </div>
      </div>
      <style>{STYLES}</style>
    </div>
  );

  return (
    <div className="pt-root">
      <div className="pt-bg"/>

      <header className="pt-header">
        <a href="/teacher" className="pt-logo"><span>✦</span><span>ScriptMaster</span></a>
        <div className="pt-header__nav">
          <a href="/teacher" className="pt-nav-link">← Dashboard</a>
          <a href="/teacher/tasks" className="pt-nav-link">All Tasks</a>
          <a href="/teacher/grading" className="pt-nav-link">Grading</a>
        </div>
      </header>

      <main className="pt-main">
        <div className="pt-page-header">
          <div><h1 className="pt-title">Post New Task</h1><p className="pt-sub">Create a writing assignment for your students. All fields below are required.</p></div>
          <div className="pt-tabs">
            <button className={`pt-tab ${tab==="form"?"active":""}`} onClick={() => setTab("form")}>✏️ Edit</button>
            <button className={`pt-tab ${tab==="preview"?"active":""}`} onClick={() => setTab("preview")}>👁 Preview</button>
          </div>
        </div>

        {tab === "form" && (
          <div className="pt-layout">
            <div className="pt-form-col">
              {/* TITLE */}
              <div className="pt-section">
                <div className="pt-section-title">📝 Task Details</div>
                <div className="pt-field">
                  <label>Task Title <span className="req">*</span></label>
                  <input className={`pt-input ${errors.title?"err":""}`} placeholder="e.g. The Impact of Social Media on Youth Mental Health" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120}/>
                  {errors.title && <div className="pt-field-err">{errors.title}</div>}
                  <div className="pt-char-count">{title.length}/120</div>
                </div>
                <div className="pt-row">
                  <div className="pt-field">
                    <label>Task Type <span className="req">*</span></label>
                    <select className="pt-input" value={type} onChange={(e) => setType(e.target.value)}>
                      {TASK_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="pt-field">
                    <label>Total Points <span className="req">*</span></label>
                    <input className="pt-input" type="number" min="10" max="200" value={points} onChange={(e) => setPoints(e.target.value)}/>
                  </div>
                  <div className="pt-field">
                    <label>Due Date <span className="req">*</span></label>
                    <input className={`pt-input ${errors.dueDate?"err":""}`} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                    {errors.dueDate && <div className="pt-field-err">{errors.dueDate}</div>}
                  </div>
                </div>
              </div>

              {/* PROMPT */}
              <div className="pt-section">
                <div className="pt-section-title">📋 Task Prompt</div>
                <div className="pt-field">
                  <label>Writing Prompt <span className="req">*</span></label>
                  <textarea className={`pt-input pt-textarea ${errors.prompt?"err":""}`} rows={5} placeholder="Write a detailed prompt that explains exactly what students must do. Be specific about requirements, structure, and expectations…" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
                  {errors.prompt && <div className="pt-field-err">{errors.prompt}</div>}
                  <div className="pt-char-count">{prompt.length} characters</div>
                </div>
                <div className="pt-row">
                  <div className="pt-field">
                    <label>Minimum Words <span className="req">*</span></label>
                    <input className="pt-input" type="number" min="50" value={minWords} onChange={(e) => setMinWords(e.target.value)}/>
                  </div>
                  <div className="pt-field">
                    <label>Maximum Words <span className="req">*</span></label>
                    <input className="pt-input" type="number" min="100" value={maxWords} onChange={(e) => setMaxWords(e.target.value)}/>
                  </div>
                </div>
                {errors.words && <div className="pt-field-err">{errors.words}</div>}
              </div>

              {/* RUBRIC */}
              <div className="pt-section">
                <div className="pt-section-header">
                  <div className="pt-section-title">📐 Marking Rubric</div>
                  <span className={`pt-rubric-total ${rubricTotal !== parseInt(points)?"mismatch":""}`}>Total: {rubricTotal}/{points} pts</span>
                </div>
                {errors.rubric && <div className="pt-field-err" style={{marginBottom:"0.75rem"}}>{errors.rubric}</div>}
                <div className="pt-rubric-rows">
                  {rubric.map((r, i) => (
                    <div key={i} className="pt-rubric-row">
                      <input className="pt-input pt-rubric-crit" placeholder="Criterion name" value={r.criterion} onChange={(e) => updateRubric(i, "criterion", e.target.value)}/>
                      <input className="pt-input pt-rubric-pts" type="number" min="0" max="200" value={r.points} onChange={(e) => updateRubric(i, "points", e.target.value)}/>
                      <span className="pt-rubric-pts-label">pts</span>
                      {rubric.length > 1 && (
                        <button className="pt-rubric-del" onClick={() => removeRubricRow(i)}>✕</button>
                      )}
                    </div>
                  ))}
                </div>
                <button className="pt-add-row" onClick={addRubricRow}>+ Add criterion</button>
              </div>

              {/* NOTES */}
              <div className="pt-section">
                <div className="pt-section-title">📌 Teacher Notes (optional)</div>
                <div className="pt-field">
                  <label>Private notes visible only to teachers</label>
                  <textarea className="pt-input pt-textarea" rows={3} placeholder="Additional context, marking notes, or reminders for yourself…" value={notes} onChange={(e) => setNotes(e.target.value)}/>
                </div>
              </div>

              <div className="pt-form-actions">
                <button className="pt-btn pt-btn--ghost" onClick={() => setTab("preview")}>Preview Task →</button>
                <button className="pt-btn pt-btn--gold" onClick={handlePublish} disabled={publishing}>
                  {publishing ? <><span className="pt-spin"/>Publishing…</> : "Publish Task to Students →"}
                </button>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="pt-sidebar-col">
              <div className="pt-side-panel">
                <div className="pt-side-panel__title">📋 Checklist</div>
                {[
                  ["Task title filled in", !!title],
                  ["Task type selected", !!type],
                  ["Prompt written (30+ chars)", prompt.length >= 30],
                  ["Word range set", !!minWords && !!maxWords],
                  ["Due date chosen", !!dueDate],
                  ["Rubric adds up to points", rubricTotal === parseInt(points)],
                ].map(([label, done]) => (
                  <div key={label as string} className="pt-check-row">
                    <span className={done ? "pt-check-icon done" : "pt-check-icon"}>{done ? "✅" : "○"}</span>
                    <span style={{color: done ? "#9ecfb8" : "#4a6070"}}>{label as string}</span>
                  </div>
                ))}
              </div>
              <div className="pt-side-panel pt-side-panel--warn">
                <div className="pt-side-panel__title">🤖 ScriptGuard AI</div>
                <p>Every student submission for this task will be automatically scanned for AI-generated content and plagiarism before reaching your grading queue.</p>
                <div className="pt-detect-tags">
                  <span>✓ ChatGPT detection</span>
                  <span>✓ Plagiarism check</span>
                  <span>✓ Copy-paste scan</span>
                </div>
              </div>
              <div className="pt-side-panel">
                <div className="pt-side-panel__title">💡 Writing Task Tips</div>
                <div className="pt-tip">Be specific in your prompt — vague instructions lead to vague writing.</div>
                <div className="pt-tip">Set word ranges that match the task depth. Essays need more words than reviews.</div>
                <div className="pt-tip">Ensure rubric points add up to the total points exactly.</div>
              </div>
            </div>
          </div>
        )}

        {tab === "preview" && (
          <div className="pt-preview">
            <div className="pt-preview__badge">Student View — Preview</div>
            <div className="pt-preview-card">
              <div className="pt-preview-card__top">
                <span className="pt-preview-type">{type}</span>
                <span className="pt-preview-due">{dueDate ? `📅 Due ${new Date(dueDate).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}` : "No due date set"}</span>
                <span className="pt-preview-pts">⭐ {points} pts</span>
              </div>
              <h2 className="pt-preview-title">{title || "No title yet"}</h2>
              <div className="pt-preview-words">Word count: {minWords}–{maxWords} words</div>
              <div className="pt-preview-prompt">
                <div className="pt-preview-prompt__label">📋 Your Task</div>
                <p>{prompt || "No prompt written yet."}</p>
              </div>
              <div className="pt-preview-rubric">
                <div className="pt-preview-rubric__label">📐 How You Will Be Marked</div>
                {rubric.map((r, i) => (
                  <div key={i} className="pt-preview-rub-row">
                    <span>{r.criterion || "Unnamed criterion"}</span>
                    <span>{r.points} pts</span>
                  </div>
                ))}
                <div className="pt-preview-rub-total"><span>Total</span><span>{rubricTotal} pts</span></div>
              </div>
              <div className="pt-preview-action">
                <div className="pt-preview-action-btn">Start Writing →</div>
                <p className="pt-preview-note">🤖 Your submission will be scanned by ScriptGuard AI before reaching your teacher.</p>
              </div>
            </div>
            <button className="pt-btn pt-btn--ghost" style={{marginTop:"1.5rem"}} onClick={() => setTab("form")}>← Back to Editing</button>
          </div>
        )}
      </main>

      <style>{STYLES}</style>
    </div>
  );
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  .pt-root{font-family:'DM Sans',sans-serif;background:#071524;color:#d8e4ec;min-height:100vh;position:relative;}
  .pt-bg{position:fixed;inset:0;pointer-events:none;background:radial-gradient(ellipse 60% 50% at 70% 0%,rgba(15,48,80,0.65),transparent 60%),radial-gradient(ellipse 40% 40% at 5% 90%,rgba(10,30,50,0.5),transparent 55%);}
  .pt-header{position:sticky;top:0;z-index:100;display:flex;align-items:center;gap:2rem;padding:1rem 3rem;background:rgba(7,21,36,0.92);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,0.06);}
  .pt-logo{display:flex;align-items:center;gap:0.5rem;text-decoration:none;font-family:'Lora',serif;font-size:1.1rem;font-weight:700;color:#e8c87d;margin-right:auto;}
  .pt-header__nav{display:flex;gap:1.5rem;}
  .pt-nav-link{font-size:0.84rem;color:#4a6070;text-decoration:none;transition:color 0.15s;}
  .pt-nav-link:hover{color:#e8c87d;}
  .pt-main{position:relative;z-index:1;padding:2.5rem 3rem 5rem;}
  .pt-page-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:2rem;gap:1rem;}
  .pt-title{font-family:'Lora',serif;font-size:1.8rem;font-weight:700;color:#f0ece4;margin-bottom:0.3rem;}
  .pt-sub{font-size:0.83rem;color:#3a5060;}
  .pt-tabs{display:flex;background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:9px;padding:0.25rem;gap:0.25rem;}
  .pt-tab{padding:0.45rem 1.1rem;border-radius:6px;font-size:0.84rem;background:transparent;border:none;color:#4a6070;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;}
  .pt-tab.active{background:#e8c87d;color:#1a0e05;font-weight:600;}
  .pt-layout{display:grid;grid-template-columns:1fr 280px;gap:1.75rem;align-items:start;}
  .pt-form-col{display:flex;flex-direction:column;gap:1.25rem;}
  .pt-section{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:1.5rem;}
  .pt-section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.1rem;}
  .pt-section-title{font-size:0.72rem;text-transform:uppercase;letter-spacing:0.1em;color:#e8c87d;margin-bottom:1.1rem;}
  .pt-section .pt-section-title{margin-bottom:1.1rem;}
  .pt-field{display:flex;flex-direction:column;gap:0.38rem;margin-bottom:0.9rem;}
  .pt-field:last-child{margin-bottom:0;}
  .pt-field label{font-size:0.78rem;font-weight:500;color:#7a9ab8;}
  .req{color:#e74c3c;}
  .pt-input{background:#071524;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:0.65rem 0.9rem;color:#d8e4ec;font-size:0.88rem;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.18s;width:100%;}
  .pt-input:focus{border-color:#e8c87d;}
  .pt-input.err{border-color:#e74c3c;}
  .pt-textarea{resize:vertical;line-height:1.65;}
  .pt-field-err{font-size:0.75rem;color:#e74c3c;margin-top:0.2rem;}
  .pt-char-count{font-size:0.72rem;color:#2a3a48;text-align:right;margin-top:0.2rem;}
  .pt-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.9rem;}
  .pt-rubric-rows{display:flex;flex-direction:column;gap:0.5rem;margin-bottom:0.75rem;}
  .pt-rubric-row{display:flex;align-items:center;gap:0.5rem;}
  .pt-rubric-crit{flex:1;}
  .pt-rubric-pts{width:70px;flex-shrink:0;text-align:center;}
  .pt-rubric-pts-label{font-size:0.78rem;color:#4a6070;flex-shrink:0;width:20px;}
  .pt-rubric-del{background:none;border:none;color:#3a5060;cursor:pointer;font-size:0.9rem;padding:0.2rem;transition:color 0.15s;flex-shrink:0;}
  .pt-rubric-del:hover{color:#e74c3c;}
  .pt-rubric-total{font-size:0.82rem;font-weight:600;}
  .pt-rubric-total.mismatch{color:#e74c3c;}
  .pt-add-row{background:none;border:1px dashed rgba(255,255,255,0.12);color:#4a6070;font-size:0.8rem;padding:0.45rem 0.9rem;border-radius:7px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;width:100%;}
  .pt-add-row:hover{border-color:#e8c87d;color:#e8c87d;}
  .pt-form-actions{display:flex;justify-content:flex-end;gap:0.75rem;margin-top:0.5rem;}
  .pt-btn{display:inline-flex;align-items:center;gap:0.5rem;padding:0.68rem 1.4rem;border-radius:8px;font-size:0.9rem;font-weight:600;text-decoration:none;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all 0.18s;}
  .pt-btn--gold{background:#e8c87d;color:#1a0e05;}
  .pt-btn--gold:hover:not(:disabled){background:#f0d698;box-shadow:0 6px 20px rgba(232,200,125,0.3);}
  .pt-btn--gold:disabled{opacity:0.55;cursor:not-allowed;}
  .pt-btn--ghost{background:transparent;color:#8aa5b8;border:1px solid rgba(255,255,255,0.12);}
  .pt-btn--ghost:hover{border-color:#e8c87d;color:#e8c87d;}
  .pt-spin{width:15px;height:15px;border:2px solid rgba(26,14,5,0.3);border-top-color:#1a0e05;border-radius:50%;animation:spin 0.7s linear infinite;flex-shrink:0;}
  @keyframes spin{to{transform:rotate(360deg)}}
  .pt-sidebar-col{display:flex;flex-direction:column;gap:1rem;}
  .pt-side-panel{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:13px;padding:1.2rem;}
  .pt-side-panel--warn{border-color:rgba(231,76,60,0.18);}
  .pt-side-panel__title{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.08em;color:#e8c87d;margin-bottom:0.9rem;}
  .pt-check-row{display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0;font-size:0.8rem;}
  .pt-check-icon{font-size:0.85rem;flex-shrink:0;}
  .pt-check-icon.done{color:#9ecfb8;}
  .pt-side-panel p{font-size:0.78rem;color:#5a7a8e;line-height:1.65;margin-bottom:0.75rem;}
  .pt-detect-tags{display:flex;flex-direction:column;gap:0.3rem;}
  .pt-detect-tags span{font-size:0.72rem;color:#9ecfb8;background:rgba(158,207,184,0.07);border:1px solid rgba(158,207,184,0.18);border-radius:5px;padding:0.16rem 0.5rem;}
  .pt-tip{font-size:0.78rem;color:#5a7a8e;line-height:1.6;padding:0.4rem 0;border-bottom:1px solid rgba(255,255,255,0.05);}
  .pt-tip:last-child{border-bottom:none;}
  .pt-preview{max-width:680px;margin:0 auto;}
  .pt-preview__badge{font-size:0.72rem;font-weight:600;color:#b8a9e8;background:rgba(184,169,232,0.1);border:1px solid rgba(184,169,232,0.25);padding:0.3rem 0.85rem;border-radius:100px;display:inline-block;margin-bottom:1.25rem;}
  .pt-preview-card{background:#0a1e2e;border:1px solid rgba(232,200,125,0.2);border-radius:16px;padding:2rem;}
  .pt-preview-card__top{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;}
  .pt-preview-type{font-size:0.7rem;font-weight:600;color:#e8c87d;background:rgba(232,200,125,0.1);padding:0.18rem 0.5rem;border-radius:4px;text-transform:uppercase;}
  .pt-preview-due,.pt-preview-pts{font-size:0.78rem;color:#5a7a8e;}
  .pt-preview-title{font-family:'Lora',serif;font-size:1.5rem;font-weight:700;color:#f0ece4;margin-bottom:0.5rem;line-height:1.3;}
  .pt-preview-words{font-size:0.78rem;color:#4a6070;margin-bottom:1.25rem;}
  .pt-preview-prompt{background:#071524;border-radius:10px;padding:1.1rem;margin-bottom:1.25rem;border-left:3px solid #e8c87d;}
  .pt-preview-prompt__label{font-size:0.68rem;text-transform:uppercase;letter-spacing:0.08em;color:#e8c87d;margin-bottom:0.5rem;}
  .pt-preview-prompt p{font-size:0.87rem;color:#8aa5b8;line-height:1.7;}
  .pt-preview-rubric{background:#071524;border-radius:10px;padding:1.1rem;margin-bottom:1.25rem;}
  .pt-preview-rubric__label{font-size:0.68rem;text-transform:uppercase;letter-spacing:0.08em;color:#e8c87d;margin-bottom:0.75rem;}
  .pt-preview-rub-row{display:flex;justify-content:space-between;font-size:0.82rem;color:#7a9ab8;padding:0.3rem 0;border-bottom:1px solid rgba(255,255,255,0.05);}
  .pt-preview-rub-total{display:flex;justify-content:space-between;font-size:0.85rem;font-weight:600;color:#f0ece4;padding-top:0.5rem;}
  .pt-preview-action{text-align:center;padding-top:0.5rem;}
  .pt-preview-action-btn{display:inline-block;background:#e8c87d;color:#1a0e05;padding:0.7rem 2rem;border-radius:8px;font-weight:600;font-size:0.92rem;margin-bottom:0.75rem;opacity:0.6;}
  .pt-preview-note{font-size:0.75rem;color:#3a5060;}
  .pt-success-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;position:relative;z-index:1;}
  .pt-success{background:#0a1e2e;border:1px solid rgba(158,207,184,0.3);border-radius:20px;padding:2.5rem;max-width:480px;width:100%;text-align:center;}
  .pt-success__icon{font-size:3rem;margin-bottom:0.75rem;}
  .pt-success h2{font-family:'Lora',serif;font-size:1.7rem;color:#f0ece4;margin-bottom:0.5rem;}
  .pt-success>p{font-size:0.85rem;color:#5a7a8e;margin-bottom:1.5rem;}
  .pt-success__details{background:#071524;border-radius:10px;padding:1rem;margin-bottom:1.5rem;text-align:left;}
  .pt-srow{display:flex;justify-content:space-between;font-size:0.82rem;padding:0.35rem 0;border-bottom:1px solid rgba(255,255,255,0.05);}
  .pt-srow:last-child{border-bottom:none;}
  .pt-srow span{color:#4a6070;}
  .pt-srow strong{color:#d8e4ec;}
  .pt-success__actions{display:flex;gap:0.75rem;justify-content:center;}
  @media(max-width:860px){.pt-layout{grid-template-columns:1fr;}.pt-sidebar-col{display:none;}.pt-main{padding:1.5rem;}.pt-row{grid-template-columns:1fr 1fr;}}
`;
