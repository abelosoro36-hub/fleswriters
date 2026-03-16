"use client";
import { useState } from "react";

const cats = ["All","Essay Writing","Story Writing","Report Writing","Reviews","Grammar","Research Skills"];

const lessons = [
  { id:1, title:"How to Write a Compelling Essay Introduction", cat:"Essay Writing", dur:"12 min", level:"Beginner", icon:"📝", desc:"Learn the three-part formula for introductions that hook the reader, provide context, and state a clear thesis.", popular:true, completed:true },
  { id:2, title:"Structuring Your Arguments with Evidence", cat:"Essay Writing", dur:"18 min", level:"Intermediate", icon:"📝", desc:"Discover the PEEL method (Point, Evidence, Explain, Link) and how to use credible sources to strengthen every paragraph.", popular:true, completed:true },
  { id:3, title:"The Art of Storytelling: Creating Vivid Scenes", cat:"Story Writing", dur:"15 min", level:"Beginner", icon:"📖", desc:"Master sensory language, show-don't-tell techniques, and scene-setting strategies that bring your fiction to life.", popular:false, completed:false },
  { id:4, title:"Writing Dialogue That Sounds Natural", cat:"Story Writing", dur:"10 min", level:"Beginner", icon:"📖", desc:"Character voice, dialogue tags, punctuation rules, and how to use conversation to reveal character and advance plot.", popular:false, completed:false },
  { id:5, title:"Report Writing Structure and Format", cat:"Report Writing", dur:"14 min", level:"Beginner", icon:"📊", desc:"Executive summaries, headings, findings sections, and recommendations — the complete anatomy of a professional report.", popular:true, completed:true },
  { id:6, title:"Using Data and Statistics in Reports", cat:"Report Writing", dur:"16 min", level:"Intermediate", icon:"📊", desc:"How to present numbers, cite sources, create visual descriptions, and draw meaningful conclusions from data.", popular:false, completed:false },
  { id:7, title:"Writing a Critical Book Review", cat:"Reviews", dur:"11 min", level:"Beginner", icon:"✍️", desc:"How to balance summary with analysis, develop your own critical voice, and evaluate a text on its own terms.", popular:false, completed:false },
  { id:8, title:"Grammar Fundamentals: Sentences That Work", cat:"Grammar", dur:"20 min", level:"Beginner", icon:"🔤", desc:"Subject-verb agreement, sentence fragments, run-ons, and the ten most common grammar errors and how to fix them.", popular:true, completed:true },
  { id:9, title:"Punctuation Mastery: Commas, Colons, and More", cat:"Grammar", dur:"15 min", level:"Intermediate", icon:"🔤", desc:"Every punctuation mark explained with real examples — from the humble comma to the sophisticated em dash.", popular:false, completed:false },
  { id:10, title:"How to Research and Find Credible Sources", cat:"Research Skills", dur:"13 min", level:"Beginner", icon:"🔍", desc:"Evaluating websites, using academic databases, distinguishing primary from secondary sources, and citing correctly.", popular:false, completed:false },
  { id:11, title:"Transitions and Flow: Connecting Your Ideas", cat:"Essay Writing", dur:"9 min", level:"Intermediate", icon:"📝", desc:"Transition words, paragraph linking strategies, and how to create a seamless reading experience from start to finish.", popular:false, completed:false },
  { id:12, title:"Editing Your Own Work Like a Professional", cat:"Grammar", dur:"17 min", level:"Intermediate", icon:"🔤", desc:"A step-by-step self-editing process: content review, structural checks, line editing, and final proofreading techniques.", popular:true, completed:false },
];

const levelColor: Record<string,string> = { Beginner:"#9ecfb8", Intermediate:"#e8c87d", Advanced:"#f4a97f" };

export default function TrainingPage() {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<(typeof lessons)[0] | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const filtered = lessons.filter((l) => {
    const matchCat = cat === "All" || l.cat === cat;
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) || l.cat.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const completed = lessons.filter(l => l.completed).length;

  const openLesson = (l: typeof lessons[0]) => {
    setActive(l); setPlaying(false); setProgress(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlay = () => {
    setPlaying(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) { clearInterval(interval); setPlaying(false); }
    }, 200);
  };

  return (
    <div className="tr-root">
      <div className="tr-bg"><div className="tr-orb tr-orb--1"/><div className="tr-orb tr-orb--2"/></div>

      {/* SIDEBAR */}
      <aside className="tr-sidebar">
        <div className="tr-logo"><span>✦</span><span>ScriptMaster</span></div>
        <nav className="tr-nav">
          {[["📋","My Tasks","/student"],["📊","Progress","/student/dashboard"],["🔔","Notifications","/student/notifications"],["🏆","Certificates","/certificate"],["📚","Training","/training"],["⚙️","Settings","/settings"]].map(([icon,label,href]) => (
            <a key={label as string} href={href as string} className={`tr-nav-item ${label==="Training"?"active":""}`}><span>{icon as string}</span>{label as string}</a>
          ))}
        </nav>
        <div className="tr-sidebar-progress">
          <div className="tr-sp-label">Training Progress</div>
          <div className="tr-sp-bar"><div className="tr-sp-fill" style={{width:`${(completed/lessons.length)*100}%`}}/></div>
          <div className="tr-sp-count">{completed}/{lessons.length} lessons completed</div>
        </div>
        <div className="tr-profile"><div className="tr-avatar">A</div><div><strong>Amara Osei</strong><span>Student</span></div></div>
      </aside>

      <main className="tr-main">
        {/* LESSON PLAYER */}
        {active && (
          <div className="tr-player">
            <button className="tr-back-btn" onClick={() => setActive(null)}>← Back to Lessons</button>
            <div className="tr-player-layout">
              <div className="tr-player-main">
                <div className="tr-video-screen">
                  <div className="tr-video-icon">{active.icon}</div>
                  {playing ? (
                    <div className="tr-video-playing">
                      <div className="tr-play-wave"><span/><span/><span/><span/><span/></div>
                      <p>Playing lesson…</p>
                    </div>
                  ) : progress > 0 ? (
                    <div className="tr-video-done">✅ Lesson Complete!</div>
                  ) : (
                    <button className="tr-play-btn" onClick={handlePlay}>▶ Play Lesson</button>
                  )}
                  <div className="tr-video-progress">
                    <div className="tr-video-track"><div className="tr-video-fill" style={{width:`${progress}%`}}/></div>
                    <span>{Math.round(progress)}%</span>
                  </div>
                </div>
                <h2 className="tr-lesson-title">{active.title}</h2>
                <div className="tr-lesson-meta">
                  <span className="tr-cat-tag">{active.cat}</span>
                  <span className="tr-level-tag" style={{color:levelColor[active.level],background:`${levelColor[active.level]}14`,borderColor:`${levelColor[active.level]}30`}}>{active.level}</span>
                  <span>⏱ {active.dur}</span>
                </div>
                <p className="tr-lesson-desc">{active.desc}</p>
                <div className="tr-lesson-notes">
                  <div className="tr-notes-label">📋 Lesson Notes</div>
                  <p>Take notes as you watch. Writing down key points helps with retention and gives you reference material when completing tasks.</p>
                  <textarea className="tr-notes-area" placeholder="Type your notes here…" rows={5}/>
                </div>
              </div>
              <div className="tr-player-sidebar">
                <div className="tr-up-next-label">Up Next</div>
                {lessons.filter(l => l.cat === active.cat && l.id !== active.id).slice(0,4).map(l => (
                  <div key={l.id} className="tr-up-next-item" onClick={() => openLesson(l)}>
                    <span className="tr-up-icon">{l.icon}</span>
                    <div><span className="tr-up-title">{l.title}</span><span className="tr-up-dur">{l.dur}</span></div>
                    {l.completed && <span className="tr-up-done">✓</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!active && (
          <>
            <div className="tr-page-header">
              <div>
                <h1 className="tr-title">Free Training Library</h1>
                <p className="tr-sub">All lessons are completely free — no account needed to study. Buy your account to submit tasks and earn a certificate.</p>
              </div>
              <div className="tr-free-badge">🎓 All Lessons Free</div>
            </div>

            {/* PROGRESS BANNER */}
            <div className="tr-progress-banner">
              <div className="tr-pb-left">
                <strong>{completed} of {lessons.length} lessons completed</strong>
                <p>Keep going! Complete all lessons to unlock your Writing Fundamentals certificate.</p>
              </div>
              <div className="tr-pb-right">
                <div className="tr-pb-bar"><div className="tr-pb-fill" style={{width:`${(completed/lessons.length)*100}%`}}/></div>
                <span>{Math.round((completed/lessons.length)*100)}%</span>
              </div>
              <a href="/certificate" className="tr-pb-btn">View Certificate →</a>
            </div>

            {/* SEARCH + FILTER */}
            <div className="tr-controls">
              <input className="tr-search" placeholder="🔍 Search lessons…" value={search} onChange={e=>setSearch(e.target.value)}/>
              <div className="tr-cat-tabs">
                {cats.map(c => (
                  <button key={c} className={`tr-cat-tab ${cat===c?"active":""}`} onClick={() => setCat(c)}>{c}</button>
                ))}
              </div>
            </div>

            {/* RESULTS COUNT */}
            <div className="tr-results-count">{filtered.length} lesson{filtered.length!==1?"s":""} {cat!=="All"?`in ${cat}`:""}</div>

            {/* LESSONS GRID */}
            <div className="tr-grid">
              {filtered.map(l => (
                <div key={l.id} className={`tr-lesson-card ${l.completed?"completed":""}`} onClick={() => openLesson(l)}>
                  <div className="tr-lesson-card__top">
                    <div className="tr-lc-icon">{l.icon}</div>
                    <div className="tr-lc-badges">
                      {l.popular && <span className="tr-popular-badge">🔥 Popular</span>}
                      {l.completed && <span className="tr-done-badge">✓ Done</span>}
                    </div>
                  </div>
                  <h3 className="tr-lc-title">{l.title}</h3>
                  <p className="tr-lc-desc">{l.desc}</p>
                  <div className="tr-lc-footer">
                    <span className="tr-lc-cat">{l.cat}</span>
                    <span className="tr-lc-level" style={{color:levelColor[l.level]}}>{l.level}</span>
                    <span className="tr-lc-dur">⏱ {l.dur}</span>
                  </div>
                  <div className="tr-lc-action">{l.completed ? "Review Lesson" : "Start Lesson"} →</div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .tr-root{font-family:'DM Sans',sans-serif;background:#071524;color:#d8e4ec;min-height:100vh;display:flex;overflow-x:hidden;}
        .tr-bg{position:fixed;inset:0;pointer-events:none;z-index:0;}
        .tr-orb{position:absolute;border-radius:50%;filter:blur(90px);}
        .tr-orb--1{width:500px;height:500px;background:#0f3050;top:-100px;right:-100px;opacity:0.5;}
        .tr-orb--2{width:350px;height:350px;background:#1a1a40;bottom:10%;left:-80px;opacity:0.38;}
        .tr-sidebar{width:215px;flex-shrink:0;background:#0a1e2e;border-right:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;}
        .tr-logo{display:flex;align-items:center;gap:0.5rem;padding:1.3rem 1.3rem 1.6rem;font-family:'Lora',serif;font-size:1.1rem;font-weight:700;color:#e8c87d;border-bottom:1px solid rgba(255,255,255,0.06);}
        .tr-nav{display:flex;flex-direction:column;gap:0.1rem;padding:1rem 0.5rem;flex:1;}
        .tr-nav-item{display:flex;align-items:center;gap:0.65rem;padding:0.58rem 0.75rem;border-radius:7px;font-size:0.86rem;color:#4a6070;text-decoration:none;transition:all 0.15s;}
        .tr-nav-item:hover{background:rgba(255,255,255,0.04);color:#d8e4ec;}
        .tr-nav-item.active{background:rgba(232,200,125,0.1);color:#e8c87d;font-weight:500;}
        .tr-sidebar-progress{padding:0.7rem 1rem;border-top:1px solid rgba(255,255,255,0.06);}
        .tr-sp-label{font-size:0.72rem;color:#3a5060;margin-bottom:0.4rem;}
        .tr-sp-bar{height:5px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden;margin-bottom:0.3rem;}
        .tr-sp-fill{height:100%;background:#e8c87d;border-radius:3px;}
        .tr-sp-count{font-size:0.7rem;color:#4a6070;}
        .tr-profile{display:flex;align-items:center;gap:0.65rem;padding:0.8rem 1rem;border-top:1px solid rgba(255,255,255,0.06);}
        .tr-avatar{width:30px;height:30px;border-radius:50%;background:#e8c87d;color:#1a0e05;font-size:0.78rem;font-weight:700;display:flex;align-items:center;justify-content:center;}
        .tr-profile strong{display:block;font-size:0.82rem;color:#d8e4ec;}
        .tr-profile span{font-size:0.7rem;color:#3a5060;}
        .tr-main{margin-left:215px;padding:2rem 2.5rem;position:relative;z-index:1;min-height:100vh;}
        .tr-page-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.25rem;gap:1rem;flex-wrap:wrap;}
        .tr-title{font-family:'Lora',serif;font-size:1.75rem;font-weight:700;color:#f0ece4;margin-bottom:0.3rem;}
        .tr-sub{font-size:0.82rem;color:#3a5060;max-width:520px;}
        .tr-free-badge{font-size:0.78rem;font-weight:600;color:#9ecfb8;background:rgba(158,207,184,0.1);border:1px solid rgba(158,207,184,0.28);padding:0.38rem 0.85rem;border-radius:100px;white-space:nowrap;align-self:flex-start;}
        .tr-progress-banner{display:flex;align-items:center;gap:1.25rem;background:#0a1e2e;border:1px solid rgba(232,200,125,0.18);border-radius:14px;padding:1.1rem 1.4rem;margin-bottom:1.5rem;flex-wrap:wrap;}
        .tr-pb-left{flex:1;}
        .tr-pb-left strong{display:block;color:#f0ece4;font-size:0.9rem;margin-bottom:0.2rem;}
        .tr-pb-left p{font-size:0.78rem;color:#4a6070;}
        .tr-pb-right{display:flex;align-items:center;gap:0.75rem;min-width:160px;}
        .tr-pb-bar{flex:1;height:6px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden;}
        .tr-pb-fill{height:100%;background:#e8c87d;border-radius:3px;}
        .tr-pb-right span{font-size:0.78rem;color:#e8c87d;font-weight:600;white-space:nowrap;}
        .tr-pb-btn{font-size:0.78rem;font-weight:600;color:#e8c87d;text-decoration:none;border:1px solid rgba(232,200,125,0.28);padding:0.38rem 0.85rem;border-radius:7px;white-space:nowrap;transition:all 0.15s;}
        .tr-pb-btn:hover{background:rgba(232,200,125,0.1);}
        .tr-controls{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;}
        .tr-search{background:#0a1e2e;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:0.58rem 0.9rem;color:#d8e4ec;font-size:0.84rem;font-family:'DM Sans',sans-serif;outline:none;width:220px;flex-shrink:0;}
        .tr-search:focus{border-color:#e8c87d;}
        .tr-cat-tabs{display:flex;gap:0.3rem;flex-wrap:wrap;}
        .tr-cat-tab{padding:0.4rem 0.85rem;border-radius:100px;font-size:0.76rem;background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);color:#4a6070;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;}
        .tr-cat-tab:hover{border-color:rgba(232,200,125,0.3);color:#d8e4ec;}
        .tr-cat-tab.active{background:rgba(232,200,125,0.1);color:#e8c87d;border-color:rgba(232,200,125,0.35);}
        .tr-results-count{font-size:0.78rem;color:#3a5060;margin-bottom:1rem;}
        .tr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.1rem;}
        .tr-lesson-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:1.3rem;cursor:pointer;transition:all 0.18s;display:flex;flex-direction:column;gap:0.6rem;}
        .tr-lesson-card:hover{transform:translateY(-3px);border-color:rgba(232,200,125,0.25);box-shadow:0 12px 40px rgba(0,0,0,0.25);}
        .tr-lesson-card.completed{border-color:rgba(158,207,184,0.18);}
        .tr-lesson-card__top{display:flex;justify-content:space-between;align-items:flex-start;}
        .tr-lc-icon{font-size:1.5rem;}
        .tr-lc-badges{display:flex;gap:0.4rem;align-items:center;}
        .tr-popular-badge{font-size:0.65rem;color:#f4a97f;background:rgba(244,169,127,0.1);padding:0.14rem 0.45rem;border-radius:4px;font-weight:600;}
        .tr-done-badge{font-size:0.65rem;color:#9ecfb8;background:rgba(158,207,184,0.1);padding:0.14rem 0.45rem;border-radius:4px;font-weight:600;}
        .tr-lc-title{font-size:0.9rem;font-weight:600;color:#f0ece4;line-height:1.4;}
        .tr-lc-desc{font-size:0.78rem;color:#4a6070;line-height:1.65;flex:1;}
        .tr-lc-footer{display:flex;gap:0.7rem;align-items:center;flex-wrap:wrap;}
        .tr-lc-cat{font-size:0.7rem;color:#5a7a8e;}
        .tr-lc-level{font-size:0.7rem;font-weight:600;}
        .tr-lc-dur{font-size:0.7rem;color:#3a5060;margin-left:auto;}
        .tr-lc-action{font-size:0.78rem;font-weight:600;color:#e8c87d;transition:opacity 0.15s;}
        .tr-lesson-card:hover .tr-lc-action{opacity:0.75;}
        /* PLAYER */
        .tr-back-btn{background:none;border:none;color:#e8c87d;font-size:0.82rem;cursor:pointer;padding:0;font-family:'DM Sans',sans-serif;margin-bottom:1rem;transition:opacity 0.15s;}
        .tr-back-btn:hover{opacity:0.75;}
        .tr-player-layout{display:grid;grid-template-columns:1fr 260px;gap:1.5rem;align-items:start;}
        .tr-video-screen{background:#030c14;border:1px solid rgba(255,255,255,0.08);border-radius:14px;height:280px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;margin-bottom:1.2rem;position:relative;overflow:hidden;}
        .tr-video-icon{font-size:3.5rem;opacity:0.3;}
        .tr-play-btn{background:#e8c87d;color:#1a0e05;border:none;border-radius:9px;padding:0.7rem 2rem;font-size:0.95rem;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.18s;}
        .tr-play-btn:hover{background:#f0d698;transform:scale(1.04);}
        .tr-video-playing{display:flex;flex-direction:column;align-items:center;gap:0.75rem;}
        .tr-play-wave{display:flex;gap:4px;align-items:flex-end;height:30px;}
        .tr-play-wave span{width:4px;background:#e8c87d;border-radius:2px;animation:wave 1s ease-in-out infinite;}
        .tr-play-wave span:nth-child(1){animation-delay:0s;height:10px;}
        .tr-play-wave span:nth-child(2){animation-delay:0.1s;height:20px;}
        .tr-play-wave span:nth-child(3){animation-delay:0.2s;height:30px;}
        .tr-play-wave span:nth-child(4){animation-delay:0.1s;height:20px;}
        .tr-play-wave span:nth-child(5){animation-delay:0s;height:10px;}
        @keyframes wave{0%,100%{transform:scaleY(0.5)}50%{transform:scaleY(1)}}
        .tr-video-playing p{font-size:0.82rem;color:#9ecfb8;}
        .tr-video-done{font-size:1.1rem;color:#9ecfb8;font-weight:600;}
        .tr-video-progress{position:absolute;bottom:0;left:0;right:0;display:flex;align-items:center;gap:0.6rem;padding:0.6rem 1rem;background:rgba(0,0,0,0.5);}
        .tr-video-track{flex:1;height:4px;background:rgba(255,255,255,0.15);border-radius:2px;overflow:hidden;}
        .tr-video-fill{height:100%;background:#e8c87d;border-radius:2px;transition:width 0.2s;}
        .tr-video-progress span{font-size:0.72rem;color:#e8c87d;font-weight:600;white-space:nowrap;}
        .tr-lesson-title{font-family:'Lora',serif;font-size:1.4rem;font-weight:700;color:#f0ece4;margin-bottom:0.5rem;}
        .tr-lesson-meta{display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;margin-bottom:0.85rem;}
        .tr-cat-tag{font-size:0.72rem;font-weight:600;color:#e8c87d;background:rgba(232,200,125,0.1);padding:0.18rem 0.5rem;border-radius:4px;}
        .tr-level-tag{font-size:0.72rem;font-weight:600;padding:0.18rem 0.5rem;border-radius:4px;border:1px solid;}
        .tr-lesson-meta span:last-child{font-size:0.78rem;color:#3a5060;}
        .tr-lesson-desc{font-size:0.86rem;color:#6a8090;line-height:1.7;margin-bottom:1.2rem;}
        .tr-lesson-notes{background:#0a1e2e;border-radius:12px;padding:1.1rem;}
        .tr-notes-label{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.08em;color:#e8c87d;margin-bottom:0.75rem;}
        .tr-lesson-notes p{font-size:0.8rem;color:#5a7a8e;margin-bottom:0.75rem;line-height:1.6;}
        .tr-notes-area{width:100%;background:#071524;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:0.65rem 0.85rem;color:#d8e4ec;font-size:0.84rem;font-family:'DM Sans',sans-serif;resize:vertical;outline:none;}
        .tr-notes-area:focus{border-color:#e8c87d;}
        .tr-player-sidebar{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:13px;padding:1rem;position:sticky;top:1.5rem;}
        .tr-up-next-label{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.08em;color:#e8c87d;margin-bottom:0.75rem;}
        .tr-up-next-item{display:flex;align-items:center;gap:0.6rem;padding:0.6rem 0;border-bottom:1px solid rgba(255,255,255,0.05);cursor:pointer;transition:all 0.15s;}
        .tr-up-next-item:last-child{border-bottom:none;}
        .tr-up-next-item:hover{opacity:0.8;}
        .tr-up-icon{font-size:1.1rem;flex-shrink:0;}
        .tr-up-title{display:block;font-size:0.78rem;color:#d8e4ec;line-height:1.4;margin-bottom:0.1rem;}
        .tr-up-dur{font-size:0.7rem;color:#3a5060;}
        .tr-up-done{font-size:0.7rem;color:#9ecfb8;margin-left:auto;flex-shrink:0;}
        @media(max-width:900px){.tr-player-layout{grid-template-columns:1fr;}.tr-player-sidebar{display:none;}}
        @media(max-width:760px){.tr-sidebar{display:none;}.tr-main{margin-left:0;padding:1.5rem;}}
      `}</style>
    </div>
  );
}
