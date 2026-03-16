"use client";
import { useState } from "react";

const grades = [
  { task:"The Impact of Social Media on Youth Mental Health", type:"Essay", grade:"A", score:92, pts:92, max:100, feedback:"Excellent structure and compelling argument. Your use of real-world examples was outstanding. Consider varying sentence length for more dynamic prose.", date:"Feb 28", teacher:"Ms. Adaeze O.", color:"#9ecfb8" },
  { task:"Book Review: The Alchemist", type:"Review", grade:"A-", score:86, pts:77, max:90, feedback:"Strong thematic analysis. Your personal connection to the text was genuine. Expand critique of writing style next time.", date:"Feb 14", teacher:"Ms. Adaeze O.", color:"#9ecfb8" },
  { task:"A Night the Town Stood Still", type:"Story", grade:"B+", score:82, pts:66, max:80, feedback:"Vivid sensory details and good pacing. Dialogue felt natural. The ending could be stronger — aim for a more satisfying resolution.", date:"Jan 31", teacher:"Ms. Adaeze O.", color:"#e8c87d" },
];

const upcoming = [
  { task:"Climate Change: Individual vs Corporate Responsibility", type:"Essay", due:"Mar 21", pts:100, words:"600–900", urgency:"soon" },
  { task:"A Day in the Life — Personal Narrative", type:"Story", due:"Mar 14", pts:80, words:"400–700", urgency:"urgent" },
  { task:"Monthly Progress Report Q1", type:"Report", due:"Mar 28", pts:75, words:"400–650", urgency:"later" },
];

const activity = [
  { icon:"⭐", msg:"Grade received: A on Social Media Essay", time:"2 days ago", color:"#e8c87d" },
  { icon:"✅", msg:"Submission passed ScriptGuard AI scan", time:"3 days ago", color:"#9ecfb8" },
  { icon:"📋", msg:"New task: Climate Change Essay assigned", time:"5 days ago", color:"#b8a9e8" },
  { icon:"⭐", msg:"Grade received: A- on Book Review", time:"1 week ago", color:"#e8c87d" },
  { icon:"🏆", msg:"Certificate earned: Writing Fundamentals", time:"2 weeks ago", color:"#f4a97f" },
  { icon:"✅", msg:"Submission accepted: Book Review", time:"2 weeks ago", color:"#9ecfb8" },
  { icon:"⭐", msg:"Grade received: B+ on Story", time:"3 weeks ago", color:"#e8c87d" },
  { icon:"🤖", msg:"ScriptGuard scan: Clean — 94% originality", time:"3 weeks ago", color:"#b8a9e8" },
];

const totalPts = grades.reduce((a,g) => a + g.pts, 0);
const maxPts   = grades.reduce((a,g) => a + g.max, 0);
const avg      = Math.round(grades.reduce((a,g) => a + g.score, 0) / grades.length);

export default function StudentDashboard() {
  const [expanded, setExpanded] = useState<number|null>(null);

  return (
    <div className="sd-root">
      <div className="sd-bg"><div className="sd-orb sd-orb--1"/><div className="sd-orb sd-orb--2"/></div>

      {/* SIDEBAR */}
      <aside className="sd-sidebar">
        <div className="sd-logo"><span className="sd-logo__mark">✦</span><span>ScriptMaster</span></div>
        <nav className="sd-nav">
          {[["📋","My Tasks","/student"],["📊","Progress","/student/dashboard"],["🔔","Notifications","/student/notifications"],["🏆","Certificates","/certificate"],["📚","Training","/training"],["⚙️","Settings","/settings"]].map(([icon,label,href]) => (
            <a key={label as string} href={href as string} className={`sd-nav-item ${label==="Progress"?"active":""}`}><span>{icon as string}</span>{label as string}</a>
          ))}
        </nav>
        <div className="sd-sidebar__bot"><div className="sd-bot-pill"><span className="sd-bot-dot"/>ScriptGuard Active</div></div>
        <div className="sd-profile"><div className="sd-avatar">A</div><div><strong>Amara Osei</strong><span>Student</span></div></div>
      </aside>

      <main className="sd-main">
        <div className="sd-header">
          <div>
            <h1 className="sd-title">My Progress Dashboard</h1>
            <p className="sd-sub">Track your grades, performance, and upcoming tasks.</p>
          </div>
          <a href="/certificate" className="sd-cert-btn">🏆 View My Certificate</a>
        </div>

        {/* STATS ROW */}
        <div className="sd-stats">
          {[
            {icon:"📝",label:"Tasks Completed",val:"3",sub:"of 6 assigned",color:"#e8c87d"},
            {icon:"⭐",label:"Average Score",val:`${avg}%`,sub:"across all grades",color:"#9ecfb8"},
            {icon:"🏅",label:"Total Points",val:`${totalPts}`,sub:`of ${maxPts} possible`,color:"#b8a9e8"},
            {icon:"🏆",label:"Certificates",val:"1",sub:"Writing Fundamentals",color:"#f4a97f"},
          ].map((s,i) => (
            <div key={i} className="sd-stat" style={{"--sc":s.color} as React.CSSProperties}>
              <span className="sd-stat__icon">{s.icon}</span>
              <span className="sd-stat__val">{s.val}</span>
              <span className="sd-stat__label">{s.label}</span>
              <span className="sd-stat__sub">{s.sub}</span>
              <div className="sd-stat__accent"/>
            </div>
          ))}
        </div>

        {/* OVERALL PROGRESS BAR */}
        <div className="sd-progress-card">
          <div className="sd-progress-card__header">
            <strong>Overall Performance</strong>
            <span className="sd-grade-overall">Average: {avg}% — {avg >= 90 ? "A" : avg >= 80 ? "B+" : avg >= 70 ? "B" : "C"}</span>
          </div>
          <div className="sd-overall-bar">
            <div className="sd-overall-fill" style={{width:`${avg}%`}}/>
          </div>
          <div className="sd-overall-labels">
            <span>0</span><span style={{position:"absolute",left:"50%",transform:"translateX(-50%)"}}>50% — Pass</span><span>100%</span>
          </div>
        </div>

        <div className="sd-two-col">
          {/* GRADES */}
          <div>
            <h2 className="sd-section-title">📊 Grade History</h2>
            <div className="sd-grades-list">
              {grades.map((g,i) => (
                <div key={i} className="sd-grade-card">
                  <div className="sd-grade-card__top" onClick={() => setExpanded(expanded===i?null:i)} style={{cursor:"pointer"}}>
                    <div className="sd-grade-card__left">
                      <span className="sd-grade-type-tag">{g.type}</span>
                      <div>
                        <div className="sd-grade-task">{g.task}</div>
                        <div className="sd-grade-meta">{g.teacher} · {g.date}</div>
                      </div>
                    </div>
                    <div className="sd-grade-card__right">
                      <span className="sd-grade-badge" style={{color:g.color,background:`${g.color}14`,borderColor:`${g.color}30`}}>{g.grade}</span>
                      <span className="sd-grade-score">{g.score}%</span>
                      <span className="sd-expand-toggle">{expanded===i?"▲":"▼"}</span>
                    </div>
                  </div>
                  {/* Score bar */}
                  <div className="sd-score-bar">
                    <div className="sd-score-fill" style={{width:`${(g.pts/g.max)*100}%`,background:g.color}}/>
                  </div>
                  <div className="sd-score-pts">{g.pts}/{g.max} pts</div>
                  {expanded===i && (
                    <div className="sd-feedback-box">
                      <div className="sd-feedback-box__label">Teacher Feedback:</div>
                      <p>"{g.feedback}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="sd-right-col">
            {/* UPCOMING */}
            <h2 className="sd-section-title">⏳ Upcoming Tasks</h2>
            <div className="sd-upcoming-list">
              {upcoming.map((u,i) => (
                <div key={i} className="sd-upcoming-card">
                  <div className="sd-upcoming-card__top">
                    <span className="sd-grade-type-tag">{u.type}</span>
                    <span className={`sd-urgency-badge ${u.urgency}`}>{u.urgency === "urgent" ? "🔴 Due soon" : u.urgency === "soon" ? "🟡 Coming up" : "🟢 Later"}</span>
                  </div>
                  <div className="sd-upcoming-task">{u.task}</div>
                  <div className="sd-upcoming-meta"><span>📅 {u.due}</span><span>📝 {u.words}w</span><span>⭐ {u.pts}pts</span></div>
                  <a href="/student" className="sd-start-btn">Start Writing →</a>
                </div>
              ))}
            </div>

            {/* ACTIVITY FEED */}
            <h2 className="sd-section-title" style={{marginTop:"1.75rem"}}>🕐 Recent Activity</h2>
            <div className="sd-activity">
              {activity.map((a,i) => (
                <div key={i} className="sd-activity-row">
                  <div className="sd-activity-icon" style={{background:`${a.color}14`,borderColor:`${a.color}25`}}>{a.icon}</div>
                  <div className="sd-activity-content"><span>{a.msg}</span><span className="sd-activity-time">{a.time}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .sd-root{font-family:'DM Sans',sans-serif;background:#071524;color:#d8e4ec;min-height:100vh;display:flex;overflow-x:hidden;}
        .sd-bg{position:fixed;inset:0;pointer-events:none;z-index:0;}
        .sd-orb{position:absolute;border-radius:50%;filter:blur(90px);}
        .sd-orb--1{width:500px;height:500px;background:#0f3050;top:-120px;right:-100px;opacity:0.55;}
        .sd-orb--2{width:350px;height:350px;background:#1a1a40;bottom:10%;left:-80px;opacity:0.4;}
        .sd-sidebar{width:215px;flex-shrink:0;background:#0a1e2e;border-right:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;}
        .sd-logo{display:flex;align-items:center;gap:0.5rem;padding:1.3rem 1.3rem 1.6rem;font-family:'Lora',serif;font-size:1.1rem;font-weight:700;color:#e8c87d;border-bottom:1px solid rgba(255,255,255,0.06);}
        .sd-logo__mark{font-size:0.85rem;}
        .sd-nav{display:flex;flex-direction:column;gap:0.1rem;padding:1rem 0.5rem;flex:1;}
        .sd-nav-item{display:flex;align-items:center;gap:0.65rem;padding:0.58rem 0.75rem;border-radius:7px;font-size:0.86rem;color:#4a6070;text-decoration:none;transition:all 0.15s;}
        .sd-nav-item:hover{background:rgba(255,255,255,0.04);color:#d8e4ec;}
        .sd-nav-item.active{background:rgba(232,200,125,0.1);color:#e8c87d;font-weight:500;}
        .sd-sidebar__bot{padding:0.5rem 0.9rem;}
        .sd-bot-pill{display:flex;align-items:center;gap:0.45rem;font-size:0.72rem;color:#4a6070;background:rgba(158,207,184,0.05);border:1px solid rgba(158,207,184,0.12);border-radius:8px;padding:0.4rem 0.65rem;}
        .sd-bot-dot{width:6px;height:6px;border-radius:50%;background:#9ecfb8;animation:blink 2s ease-in-out infinite;flex-shrink:0;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        .sd-profile{display:flex;align-items:center;gap:0.65rem;padding:0.8rem 1rem;border-top:1px solid rgba(255,255,255,0.06);margin-top:0.4rem;}
        .sd-avatar{width:30px;height:30px;border-radius:50%;background:#e8c87d;color:#1a0e05;font-size:0.78rem;font-weight:700;display:flex;align-items:center;justify-content:center;}
        .sd-profile strong{display:block;font-size:0.82rem;color:#d8e4ec;}
        .sd-profile span{font-size:0.7rem;color:#3a5060;}
        .sd-main{margin-left:215px;padding:2rem 2.5rem;position:relative;z-index:1;min-height:100vh;}
        .sd-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.5rem;gap:1rem;flex-wrap:wrap;}
        .sd-title{font-family:'Lora',serif;font-size:1.75rem;font-weight:700;color:#f0ece4;margin-bottom:0.3rem;}
        .sd-sub{font-size:0.82rem;color:#3a5060;}
        .sd-cert-btn{display:flex;align-items:center;gap:0.4rem;background:rgba(244,169,127,0.1);border:1px solid rgba(244,169,127,0.3);color:#f4a97f;padding:0.5rem 1rem;border-radius:8px;font-size:0.82rem;font-weight:600;text-decoration:none;transition:all 0.18s;white-space:nowrap;}
        .sd-cert-btn:hover{background:rgba(244,169,127,0.18);}
        .sd-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;}
        .sd-stat{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:13px;padding:1.1rem;position:relative;overflow:hidden;transition:transform 0.15s;}
        .sd-stat:hover{transform:translateY(-2px);}
        .sd-stat__icon{display:block;font-size:1.2rem;margin-bottom:0.4rem;}
        .sd-stat__val{display:block;font-family:'Lora',serif;font-size:1.8rem;font-weight:700;color:var(--sc);line-height:1;}
        .sd-stat__label{display:block;font-size:0.78rem;color:#d8e4ec;font-weight:500;margin:0.2rem 0 0.1rem;}
        .sd-stat__sub{display:block;font-size:0.72rem;color:#3a5060;}
        .sd-stat__accent{position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--sc);opacity:0.45;}
        .sd-progress-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:13px;padding:1.2rem 1.4rem;margin-bottom:1.75rem;}
        .sd-progress-card__header{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.85rem;}
        .sd-progress-card__header strong{font-size:0.9rem;color:#f0ece4;}
        .sd-grade-overall{font-size:0.82rem;color:#e8c87d;font-weight:600;}
        .sd-overall-bar{height:8px;background:rgba(255,255,255,0.07);border-radius:4px;overflow:hidden;margin-bottom:0.35rem;}
        .sd-overall-fill{height:100%;background:linear-gradient(90deg,#9ecfb8,#e8c87d);border-radius:4px;transition:width 1s ease;}
        .sd-overall-labels{position:relative;display:flex;justify-content:space-between;font-size:0.7rem;color:#2a3a48;}
        .sd-two-col{display:grid;grid-template-columns:1fr 360px;gap:1.75rem;align-items:start;}
        .sd-section-title{font-family:'Lora',serif;font-size:1.05rem;font-weight:700;color:#f0ece4;margin-bottom:1rem;}
        .sd-grades-list{display:flex;flex-direction:column;gap:0.85rem;}
        .sd-grade-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:13px;padding:1.1rem 1.2rem;transition:border-color 0.18s;}
        .sd-grade-card:hover{border-color:rgba(232,200,125,0.2);}
        .sd-grade-card__top{display:flex;justify-content:space-between;align-items:flex-start;gap:0.75rem;margin-bottom:0.75rem;}
        .sd-grade-card__left{display:flex;align-items:flex-start;gap:0.7rem;}
        .sd-grade-type-tag{font-size:0.68rem;font-weight:600;color:#e8c87d;background:rgba(232,200,125,0.1);padding:0.16rem 0.5rem;border-radius:4px;text-transform:uppercase;letter-spacing:0.04em;white-space:nowrap;flex-shrink:0;margin-top:2px;}
        .sd-grade-task{font-size:0.86rem;color:#d8e4ec;font-weight:500;line-height:1.4;}
        .sd-grade-meta{font-size:0.73rem;color:#3a5060;margin-top:0.2rem;}
        .sd-grade-card__right{display:flex;align-items:center;gap:0.6rem;flex-shrink:0;}
        .sd-grade-badge{font-size:0.78rem;font-weight:700;padding:0.22rem 0.6rem;border-radius:5px;border:1px solid;}
        .sd-grade-score{font-size:0.85rem;font-weight:600;color:#d8e4ec;}
        .sd-expand-toggle{font-size:0.68rem;color:#3a5060;cursor:pointer;}
        .sd-score-bar{height:4px;background:rgba(255,255,255,0.07);border-radius:2px;overflow:hidden;margin-bottom:0.22rem;}
        .sd-score-fill{height:100%;border-radius:2px;transition:width 0.5s ease;}
        .sd-score-pts{font-size:0.72rem;color:#3a5060;}
        .sd-feedback-box{background:#071524;border-radius:8px;padding:0.85rem;margin-top:0.75rem;border-left:3px solid #e8c87d;}
        .sd-feedback-box__label{font-size:0.68rem;text-transform:uppercase;letter-spacing:0.08em;color:#e8c87d;margin-bottom:0.4rem;}
        .sd-feedback-box p{font-size:0.8rem;color:#7a9ab8;line-height:1.65;font-style:italic;}
        .sd-right-col{display:flex;flex-direction:column;}
        .sd-upcoming-list{display:flex;flex-direction:column;gap:0.7rem;margin-bottom:0.5rem;}
        .sd-upcoming-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:1rem;}
        .sd-upcoming-card__top{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;}
        .sd-urgency-badge{font-size:0.68rem;font-weight:600;}
        .sd-upcoming-task{font-size:0.83rem;color:#d8e4ec;font-weight:500;margin-bottom:0.45rem;line-height:1.4;}
        .sd-upcoming-meta{display:flex;gap:0.75rem;font-size:0.72rem;color:#3a5060;margin-bottom:0.65rem;}
        .sd-start-btn{display:inline-block;font-size:0.78rem;font-weight:600;color:#e8c87d;text-decoration:none;transition:opacity 0.15s;}
        .sd-start-btn:hover{opacity:0.75;}
        .sd-activity{display:flex;flex-direction:column;gap:0.5rem;}
        .sd-activity-row{display:flex;align-items:flex-start;gap:0.7rem;}
        .sd-activity-icon{width:30px;height:30px;border-radius:8px;border:1px solid;display:flex;align-items:center;justify-content:center;font-size:0.85rem;flex-shrink:0;}
        .sd-activity-content{display:flex;flex-direction:column;gap:0.12rem;}
        .sd-activity-content span:first-child{font-size:0.78rem;color:#8aa5b8;line-height:1.5;}
        .sd-activity-time{font-size:0.7rem;color:#2a3a48;}
        @media(max-width:1000px){.sd-two-col{grid-template-columns:1fr;}.sd-right-col{order:-1;}.sd-stats{grid-template-columns:1fr 1fr;}}
        @media(max-width:760px){.sd-sidebar{display:none;}.sd-main{margin-left:0;padding:1.5rem;}.sd-stats{grid-template-columns:1fr 1fr;}}
      `}</style>
    </div>
  );
}
