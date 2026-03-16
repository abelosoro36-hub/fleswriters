"use client";
import { useState } from "react";

const SUBS = [
  { id:1, student:"Amara Osei", initials:"AO", task:"The Impact of Social Media on Youth Mental Health", type:"Essay", submitted:"Mar 1, 2025", words:784, scanScore:94, status:"pending", content:"Social media has fundamentally transformed the way teenagers interact, communicate, and perceive themselves and the world around them. While platforms like Instagram, Twitter, and TikTok have created unprecedented opportunities for connection and self-expression, they have simultaneously introduced serious risks to adolescent mental health that demand our urgent attention.\n\nThe positive effects are real and measurable. Research from the Pew Research Center indicates that 81% of teens say social media makes them feel more connected to their friends. For isolated or marginalised young people — those living in rural communities or belonging to minority groups — these platforms can provide vital community and belonging.\n\nHowever, the negative consequences are equally documented. The constant exposure to carefully curated images of peers creates what psychologists call 'social comparison theory' — a destructive cycle where teenagers measure their worth against highlight reels that are inherently unrealistic. Instagram's own internal research revealed that the platform worsens body image issues in 32% of teenage girls.\n\nIn conclusion, social media is a powerful tool that demands responsible use. Schools, parents, and platforms themselves must collaborate to create healthier digital environments for young people." },
  { id:2, student:"Brian Kimani", initials:"BK", task:"A Night the Town Stood Still", type:"Story", submitted:"Mar 2, 2025", words:612, scanScore:91, status:"pending", content:"The electricity had been gone for six hours when my grandmother finally stopped pretending everything was fine.\n\nShe sat across from me at the kitchen table, the stub of a candle between us casting shadows that made her face look older than I remembered. Outside, Nakuru was unusually quiet — no matatus honking, no music bleeding from the bars on Kenyatta Avenue. Just wind, and the occasional distant bark of a dog.\n\n'You know,' she said, cupping her tea in both hands even though it had long gone cold, 'the last time the whole town went dark like this was 1982.'\n\nI had heard the story before. The coup attempt. The radio broadcasts. Her first husband — not my grandfather — running through the streets to warn their neighbours. But that night, by candlelight, with the whole world holding its breath outside, the story felt different.\n\n'Were you scared?' I asked.\n\nShe laughed, and the shadows laughed with her. 'Terrified,' she said. 'But fear is interesting, isn't it? It makes everything sharper. The tea tasted better. The darkness felt softer.'" },
  { id:3, student:"Fatima Musa", initials:"FM", task:"Book Review: The Alchemist", type:"Review", submitted:"Feb 28, 2025", words:698, scanScore:96, status:"graded", grade:"A", score:92, rubricScores:{structure:24,argument:28,language:24,grammar:16}, feedback:"Exceptional work, Fatima. Your analysis of the Personal Legend theme was insightful and your writing voice was confident throughout. Keep writing with this level of authenticity." },
];

type GradeKey = "A"|"A-"|"B+"|"B"|"B-"|"C+"|"C"|"F";
const gradeOpts: GradeKey[] = ["A","A-","B+","B","B-","C+","C","F"];
const gradeColors: Record<GradeKey,string> = { A:"#9ecfb8","A-":"#9ecfb8","B+":"#e8c87d",B:"#e8c87d","B-":"#f4a97f","C+":"#f4a97f",C:"#f4a97f",F:"#e74c3c" };

export default function TeacherGrading() {
  const [sel, setSel] = useState(0);
  const [grades, setGrades] = useState<Record<number,{grade:GradeKey|"",score:string,structure:string,argument:string,language:string,grammar:string,feedback:string}>>({});
  const [saved, setSaved] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string|null>(null);

  const sub = SUBS[sel];
  const g = grades[sub.id] || { grade:"" as GradeKey|"", score:"", structure:"", argument:"", language:"", grammar:"", feedback:"" };
  const upd = (key: string, val: string) => setGrades(p=>({...p,[sub.id]:{...g,[key]:val}}));

  const rubricTotal = [g.structure,g.argument,g.language,g.grammar].reduce((a,v)=>a+(parseInt(v)||0),0);

  const showToast = (msg:string) => { setToast(msg); setTimeout(()=>setToast(null),3000); };

  const handleSubmit = async () => {
    if (!g.grade||!g.score||!g.feedback) { showToast("Fill in grade, score, and feedback."); return; }
    setSubmitting(true);
    await new Promise(r=>setTimeout(r,1200));
    setSubmitting(false);
    setSaved(p=>[...p,sub.id]);
    showToast(`✅ Grade submitted for ${sub.student}.`);
  };

  const pending = SUBS.filter(s=>s.status==="pending"&&!saved.includes(s.id));
  const graded  = SUBS.filter(s=>s.status==="graded"||saved.includes(s.id));

  return (
    <div className="tg-root">
      <div className="tg-bg"><div className="tg-orb tg-orb--1"/><div className="tg-orb tg-orb--2"/></div>
      {toast && <div className="tg-toast">{toast}</div>}

      <aside className="tg-sidebar">
        <div className="tg-logo"><span>✦</span><span>ScriptMaster</span></div>
        <nav className="tg-nav">
          {[["📊","Dashboard","/teacher"],["📋","Tasks","/teacher/tasks"],["✏️","Grading","/teacher/grading"],["👥","Students","/teacher/students"],["📈","Analytics","/teacher/analytics"]].map(([icon,label,href]) => (
            <a key={label as string} href={href as string} className={`tg-nav-item ${label==="Grading"?"active":""}`}><span>{icon as string}</span>{label as string}</a>
          ))}
        </nav>
        <div className="tg-profile"><div className="tg-avatar">A</div><div><strong>Ms. Adaeze O.</strong><span>Teacher</span></div></div>
      </aside>

      <main className="tg-main">
        <div className="tg-page-header">
          <div><h1 className="tg-title">Grading Queue</h1><p className="tg-sub">{pending.length} pending · {graded.length} graded</p></div>
        </div>
        <div className="tg-layout">
          {/* QUEUE */}
          <div className="tg-queue">
            <div className="tg-queue-section-title">⏳ Pending ({pending.length})</div>
            {SUBS.filter(s=>s.status==="pending").map((s,i) => {
              const isGraded = saved.includes(s.id);
              return (
                <div key={s.id} className={`tg-queue-item ${sel===i?"active":""} ${isGraded?"graded":""}`} onClick={() => setSel(i)}>
                  <div className="tg-qi-av">{s.initials}</div>
                  <div className="tg-qi-info">
                    <strong>{s.student}</strong>
                    <span>{s.type} · {s.words}w</span>
                  </div>
                  {isGraded ? <span className="tg-qi-done">✓</span> : <span className="tg-qi-new">New</span>}
                </div>
              );
            })}
            <div className="tg-queue-section-title" style={{marginTop:"1rem"}}>✅ Graded ({graded.length})</div>
            {SUBS.filter(s=>s.status==="graded").map((s,i) => (
              <div key={s.id} className="tg-queue-item graded" onClick={() => setSel(SUBS.indexOf(s))}>
                <div className="tg-qi-av">{s.initials}</div>
                <div className="tg-qi-info"><strong>{s.student}</strong><span>{s.grade}</span></div>
                <span className="tg-qi-done">✓</span>
              </div>
            ))}
          </div>

          {/* READER + GRADER */}
          <div className="tg-reader">
            {/* Submission header */}
            <div className="tg-reader-header">
              <div className="tg-reader-av-lg">{sub.initials}</div>
              <div>
                <h2 className="tg-reader-student">{sub.student}</h2>
                <div className="tg-reader-meta"><span>{sub.type}</span><span>{sub.task.slice(0,50)}…</span><span>📅 {sub.submitted}</span><span>📝 {sub.words}w</span></div>
              </div>
              <div className="tg-scan-pill">
                <span>🤖</span>
                <span>ScriptGuard: ✅ Clean</span>
                <span className="tg-scan-score">{sub.scanScore}%</span>
              </div>
            </div>

            {/* Content */}
            <div className="tg-content-box">
              <div className="tg-content-label">Student's Submission</div>
              {sub.content.split("\n\n").map((para,i) => (
                <p key={i} className="tg-content-para">{para}</p>
              ))}
            </div>
          </div>

          {/* GRADING FORM */}
          <div className="tg-grade-col">
            {saved.includes(sub.id) || sub.status==="graded" ? (
              <div className="tg-already-graded">
                <div className="tg-ag-grade" style={{color:gradeColors[((sub.grade||(grades[sub.id]?.grade)) as GradeKey)||"A"]}}>
                  {sub.grade || grades[sub.id]?.grade}
                </div>
                <div className="tg-ag-score">{sub.score || grades[sub.id]?.score}/100</div>
                <div className="tg-ag-label">Grade Submitted</div>
                <div className="tg-ag-feedback">{sub.feedback || grades[sub.id]?.feedback}</div>
              </div>
            ) : (
              <>
                <div className="tg-grade-section-title">⭐ Assign Grade</div>
                <div className="tg-grade-btns">
                  {gradeOpts.map(gr => (
                    <button key={gr} className={`tg-grade-btn ${g.grade===gr?"active":""}`} style={g.grade===gr?{background:gradeColors[gr],color:"#071524",borderColor:gradeColors[gr]}:{}} onClick={() => upd("grade",gr)}>{gr}</button>
                  ))}
                </div>
                <div className="tg-grade-section-title" style={{marginTop:"1rem"}}>📐 Rubric Scores</div>
                {[["structure","Structure",25],["argument","Argument",30],["language","Language",25],["grammar","Grammar",20]].map(([key,label,max]) => (
                  <div key={key as string} className="tg-rubric-row">
                    <span>{label as string}</span>
                    <input className="tg-rubric-input" type="number" min="0" max={max as number} placeholder={`/${max}`} value={(g as Record<string,string>)[key as string]||""} onChange={e=>upd(key as string,e.target.value)}/>
                    <span className="tg-rubric-max">/{max as number}</span>
                  </div>
                ))}
                <div className="tg-rubric-total"><span>Total</span><strong style={{color:rubricTotal===100?"#9ecfb8":rubricTotal>100?"#e74c3c":"#e8c87d"}}>{rubricTotal}/100</strong></div>
                <div className="tg-grade-section-title" style={{marginTop:"1rem"}}>💬 Feedback</div>
                <textarea className="tg-feedback-area" rows={5} placeholder="Write personal, constructive feedback for the student. Be specific about what they did well and how to improve." value={g.feedback} onChange={e=>upd("feedback",e.target.value)}/>
                <div className="tg-feedback-count">{g.feedback.length} characters</div>
                <button className="tg-submit-btn" onClick={handleSubmit} disabled={submitting}>
                  {submitting?<><span className="tg-spin"/>Submitting…</>:"Submit Grade →"}
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .tg-root{font-family:'DM Sans',sans-serif;background:#071524;color:#d8e4ec;min-height:100vh;display:flex;overflow-x:hidden;}
        .tg-bg{position:fixed;inset:0;pointer-events:none;z-index:0;}
        .tg-orb{position:absolute;border-radius:50%;filter:blur(90px);}
        .tg-orb--1{width:500px;height:500px;background:#0f3050;top:-100px;right:-100px;opacity:0.5;}
        .tg-orb--2{width:350px;height:350px;background:#1a1a40;bottom:10%;left:-80px;opacity:0.38;}
        .tg-toast{position:fixed;top:1.5rem;right:1.5rem;z-index:999;background:#0a1e2e;border:1px solid rgba(158,207,184,0.3);color:#9ecfb8;padding:0.65rem 1.2rem;border-radius:8px;font-size:0.84rem;font-weight:500;box-shadow:0 8px 30px rgba(0,0,0,0.4);animation:fadeIn 0.3s ease;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .tg-sidebar{width:215px;flex-shrink:0;background:#0a1e2e;border-right:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;}
        .tg-logo{display:flex;align-items:center;gap:0.5rem;padding:1.3rem 1.3rem 1.6rem;font-family:'Lora',serif;font-size:1.1rem;font-weight:700;color:#e8c87d;border-bottom:1px solid rgba(255,255,255,0.06);}
        .tg-nav{display:flex;flex-direction:column;gap:0.1rem;padding:1rem 0.5rem;flex:1;}
        .tg-nav-item{display:flex;align-items:center;gap:0.65rem;padding:0.58rem 0.75rem;border-radius:7px;font-size:0.86rem;color:#4a6070;text-decoration:none;transition:all 0.15s;}
        .tg-nav-item:hover{background:rgba(255,255,255,0.04);color:#d8e4ec;}
        .tg-nav-item.active{background:rgba(232,200,125,0.1);color:#e8c87d;font-weight:500;}
        .tg-profile{display:flex;align-items:center;gap:0.65rem;padding:0.8rem 1rem;border-top:1px solid rgba(255,255,255,0.06);margin-top:auto;}
        .tg-avatar{width:30px;height:30px;border-radius:50%;background:#e8c87d;color:#1a0e05;font-size:0.78rem;font-weight:700;display:flex;align-items:center;justify-content:center;}
        .tg-profile strong{display:block;font-size:0.82rem;color:#d8e4ec;}
        .tg-profile span{font-size:0.7rem;color:#3a5060;}
        .tg-main{margin-left:215px;padding:2rem 2rem 3rem;position:relative;z-index:1;min-height:100vh;flex:1;}
        .tg-page-header{margin-bottom:1.25rem;}
        .tg-title{font-family:'Lora',serif;font-size:1.75rem;font-weight:700;color:#f0ece4;margin-bottom:0.25rem;}
        .tg-sub{font-size:0.82rem;color:#3a5060;}
        .tg-layout{display:grid;grid-template-columns:200px 1fr 240px;gap:1.25rem;align-items:start;}
        .tg-queue{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:13px;padding:0.75rem;position:sticky;top:1.5rem;}
        .tg-queue-section-title{font-size:0.68rem;text-transform:uppercase;letter-spacing:0.08em;color:#e8c87d;padding:0.25rem 0.5rem;margin-bottom:0.35rem;}
        .tg-queue-item{display:flex;align-items:center;gap:0.6rem;padding:0.6rem 0.5rem;border-radius:8px;cursor:pointer;transition:all 0.15s;}
        .tg-queue-item:hover{background:rgba(255,255,255,0.04);}
        .tg-queue-item.active{background:rgba(232,200,125,0.1);}
        .tg-queue-item.graded{opacity:0.55;}
        .tg-qi-av{width:28px;height:28px;border-radius:50%;background:#1e3d54;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:700;color:#9ecfb8;flex-shrink:0;}
        .tg-qi-info{flex:1;min-width:0;}
        .tg-qi-info strong{display:block;font-size:0.78rem;color:#d8e4ec;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .tg-qi-info span{font-size:0.7rem;color:#3a5060;}
        .tg-qi-new{font-size:0.6rem;font-weight:700;color:#e8c87d;background:rgba(232,200,125,0.1);border:1px solid rgba(232,200,125,0.3);padding:0.1rem 0.38rem;border-radius:4px;flex-shrink:0;}
        .tg-qi-done{font-size:0.72rem;color:#9ecfb8;flex-shrink:0;}
        .tg-reader{display:flex;flex-direction:column;gap:1rem;}
        .tg-reader-header{display:flex;align-items:flex-start;gap:0.9rem;background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:1.1rem;}
        .tg-reader-av-lg{width:40px;height:40px;border-radius:50%;background:#e8c87d;color:#1a0e05;font-size:0.85rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .tg-reader-student{font-family:'Lora',serif;font-size:1.1rem;font-weight:700;color:#f0ece4;margin-bottom:0.3rem;}
        .tg-reader-meta{display:flex;gap:0.75rem;flex-wrap:wrap;font-size:0.75rem;color:#4a6070;}
        .tg-scan-pill{display:flex;align-items:center;gap:0.4rem;margin-left:auto;background:rgba(158,207,184,0.08);border:1px solid rgba(158,207,184,0.2);border-radius:7px;padding:0.35rem 0.7rem;font-size:0.73rem;color:#9ecfb8;flex-shrink:0;}
        .tg-scan-score{font-weight:700;}
        .tg-content-box{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:1.4rem;max-height:480px;overflow-y:auto;}
        .tg-content-label{font-size:0.68rem;text-transform:uppercase;letter-spacing:0.08em;color:#e8c87d;margin-bottom:1rem;}
        .tg-content-para{font-size:0.87rem;color:#8aa5b8;line-height:1.8;margin-bottom:1rem;}
        .tg-content-para:last-child{margin-bottom:0;}
        .tg-grade-col{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:13px;padding:1.1rem;position:sticky;top:1.5rem;}
        .tg-grade-section-title{font-size:0.68rem;text-transform:uppercase;letter-spacing:0.08em;color:#e8c87d;margin-bottom:0.65rem;}
        .tg-grade-btns{display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:0.5rem;}
        .tg-grade-btn{padding:0.3rem 0.6rem;border-radius:6px;font-size:0.8rem;font-weight:600;background:#071524;border:1px solid rgba(255,255,255,0.1);color:#4a6070;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;}
        .tg-grade-btn:hover{border-color:rgba(232,200,125,0.4);color:#d8e4ec;}
        .tg-rubric-row{display:flex;align-items:center;gap:0.5rem;padding:0.4rem 0;border-bottom:1px solid rgba(255,255,255,0.04);}
        .tg-rubric-row span:first-child{font-size:0.78rem;color:#7a9ab8;flex:1;}
        .tg-rubric-input{width:48px;background:#071524;border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:0.3rem 0.4rem;color:#d8e4ec;font-size:0.82rem;text-align:center;outline:none;font-family:'DM Sans',sans-serif;}
        .tg-rubric-input:focus{border-color:#e8c87d;}
        .tg-rubric-max{font-size:0.72rem;color:#3a5060;flex-shrink:0;}
        .tg-rubric-total{display:flex;justify-content:space-between;font-size:0.82rem;padding-top:0.5rem;}
        .tg-rubric-total span{color:#4a6070;}
        .tg-rubric-total strong{font-weight:700;}
        .tg-feedback-area{width:100%;background:#071524;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:0.65rem;color:#d8e4ec;font-size:0.82rem;font-family:'DM Sans',sans-serif;resize:vertical;outline:none;line-height:1.65;}
        .tg-feedback-area:focus{border-color:#e8c87d;}
        .tg-feedback-count{font-size:0.7rem;color:#2a3a48;text-align:right;margin-bottom:0.75rem;}
        .tg-submit-btn{width:100%;background:#e8c87d;color:#1a0e05;border:none;border-radius:8px;padding:0.72rem;font-size:0.88rem;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:0.5rem;transition:all 0.18s;}
        .tg-submit-btn:hover:not(:disabled){background:#f0d698;}
        .tg-submit-btn:disabled{opacity:0.6;cursor:not-allowed;}
        .tg-spin{width:14px;height:14px;border:2px solid rgba(26,14,5,0.3);border-top-color:#1a0e05;border-radius:50%;animation:spin 0.7s linear infinite;}
        @keyframes spin{to{transform:rotate(360deg)}}
        .tg-already-graded{text-align:center;padding:0.5rem;}
        .tg-ag-grade{font-family:'Lora',serif;font-size:3.5rem;font-weight:700;line-height:1;}
        .tg-ag-score{font-size:1rem;color:#d8e4ec;margin-bottom:0.25rem;}
        .tg-ag-label{font-size:0.72rem;color:#9ecfb8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:1rem;}
        .tg-ag-feedback{background:#071524;border-radius:8px;padding:0.85rem;font-size:0.78rem;color:#7a9ab8;line-height:1.65;text-align:left;font-style:italic;}
        @media(max-width:1000px){.tg-layout{grid-template-columns:1fr;}.tg-queue,.tg-grade-col{position:static;}}
        @media(max-width:760px){.tg-sidebar{display:none;}.tg-main{margin-left:0;padding:1.5rem;}}
      `}</style>
    </div>
  );
}
