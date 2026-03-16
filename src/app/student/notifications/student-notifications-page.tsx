"use client";
import { useState } from "react";

type NType = "grade" | "task" | "violation" | "system" | "certificate";

interface Notification {
  id: number; type: NType; title: string; body: string;
  time: string; read: boolean; action?: string; actionHref?: string;
}

const INITIAL: Notification[] = [
  { id:1, type:"grade", title:"New Grade: Social Media Essay — A", body:"Your teacher Ms. Adaeze O. has graded your essay on Social Media and Youth Mental Health. You received an A (92/100). See feedback below.", time:"2 hours ago", read:false, action:"View Grade", actionHref:"/student/dashboard" },
  { id:2, type:"task", title:"New Task Assigned: Climate Change Essay", body:"A new writing task has been posted by Ms. Adaeze O. Essay: 'Climate Change: Individual vs. Corporate Responsibility'. Due March 21, 2025. Word count: 600–900 words. 100 points.", time:"5 hours ago", read:false, action:"Start Writing", actionHref:"/student" },
  { id:3, type:"grade", title:"New Grade: Book Review — A-", body:"Your teacher has graded your Book Review of The Alchemist. Grade: A- (86/90). 'Strong thematic analysis. Your personal connection to the text was genuine.'", time:"Yesterday", read:false, action:"View Grade", actionHref:"/student/dashboard" },
  { id:4, type:"certificate", title:"🏆 Certificate Earned: Writing Fundamentals", body:"Congratulations! You have completed the Writing Fundamentals track and earned your certificate. You can download and share it on your profile.", time:"3 days ago", read:true, action:"Download Certificate", actionHref:"/certificate" },
  { id:5, type:"task", title:"Reminder: Story Task Due in 3 Days", body:"Don't forget: 'A Night the Town Stood Still' is due on March 14, 2025. You have started writing but haven't submitted yet. Required: 400–700 words.", time:"3 days ago", read:true, action:"Continue Writing", actionHref:"/student" },
  { id:6, type:"system", title:"ScriptGuard AI: Submission Scan Complete", body:"Your essay 'The Impact of Social Media' was scanned by ScriptGuard AI. Result: ✅ Clean — Originality score: 94%. Your submission has been passed to your teacher for grading.", time:"1 week ago", read:true },
  { id:7, type:"grade", title:"New Grade: Story — B+", body:"Your story 'A Night the Town Stood Still' has been graded. Grade: B+ (82/80 pts). 'Vivid sensory details and good pacing. Dialogue felt natural. The ending could be stronger.'", time:"1 week ago", read:true, action:"View Grade", actionHref:"/student/dashboard" },
  { id:8, type:"system", title:"Account Verified Successfully", body:"Welcome to ScriptMaster! Your student account has been activated. You now have full access to submit tasks, receive feedback, and earn certificates. Good luck!", time:"2 weeks ago", read:true },
  { id:9, type:"task", title:"New Task Assigned: Book Review", body:"A new writing task has been posted. Review: 'Book Review: The Alchemist' by Paulo Coelho. Due February 28, 2025. Word count: 500–800 words. 90 points.", time:"3 weeks ago", read:true, action:"Start Writing", actionHref:"/student" },
  { id:10, type:"system", title:"Community Rules Reminder", body:"Remember: ScriptGuard AI monitors all submissions for AI-generated content, plagiarism, and rule violations. Stay original — write in your own words. Your account depends on it.", time:"1 month ago", read:true, action:"Review Rules", actionHref:"/rules" },
];

const TYPE_META: Record<NType, { icon: string; color: string; label: string }> = {
  grade:       { icon:"⭐", color:"#e8c87d",  label:"Grade" },
  task:        { icon:"📋", color:"#b8a9e8",  label:"Task" },
  violation:   { icon:"🚫", color:"#e74c3c",  label:"Violation" },
  system:      { icon:"🤖", color:"#9ecfb8",  label:"System" },
  certificate: { icon:"🏆", color:"#f4a97f",  label:"Certificate" },
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL);
  const [filter, setFilter] = useState<"all"|NType>("all");

  const unread = notifs.filter((n) => !n.read).length;

  const markRead = (id: number) => setNotifs((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifs((p) => p.map((n) => ({ ...n, read: true })));
  const deleteNotif = (id: number) => setNotifs((p) => p.filter((n) => n.id !== id));

  const filtered = filter === "all" ? notifs : notifs.filter((n) => n.type === filter);

  return (
    <div className="nf-root">
      <div className="nf-bg"><div className="nf-orb nf-orb--1"/><div className="nf-orb nf-orb--2"/></div>

      <aside className="nf-sidebar">
        <div className="nf-logo"><span>✦</span><span>ScriptMaster</span></div>
        <nav className="nf-nav">
          {[["📋","My Tasks","/student"],["📊","Progress","/student/dashboard"],["🔔","Notifications","/student/notifications"],["🏆","Certificates","/certificate"],["📚","Training","/training"],["⚙️","Settings","/settings"]].map(([icon,label,href]) => (
            <a key={label as string} href={href as string} className={`nf-nav-item ${label==="Notifications"?"active":""}`}>
              <span>{icon as string}</span>{label as string}
              {label === "Notifications" && unread > 0 && <span className="nf-nav-badge">{unread}</span>}
            </a>
          ))}
        </nav>
        <div className="nf-profile">
          <div className="nf-avatar">A</div>
          <div><strong>Amara Osei</strong><span>Student</span></div>
        </div>
      </aside>

      <main className="nf-main">
        <div className="nf-page-header">
          <div>
            <h1 className="nf-title">Notifications {unread > 0 && <span className="nf-unread-badge">{unread} new</span>}</h1>
            <p className="nf-sub">All platform alerts, grades, task reminders, and system messages.</p>
          </div>
          {unread > 0 && (
            <button className="nf-btn nf-btn--ghost" onClick={markAllRead}>Mark all as read</button>
          )}
        </div>

        {/* FILTER TABS */}
        <div className="nf-filter-tabs">
          {([
            ["all","All"],
            ["grade","Grades"],
            ["task","Tasks"],
            ["certificate","Certificates"],
            ["system","System"],
            ["violation","Violations"],
          ] as ["all"|NType, string][]).map(([key, label]) => (
            <button key={key} className={`nf-ftab ${filter===key?"active":""}`} onClick={() => setFilter(key)}>
              {key !== "all" && <span>{TYPE_META[key as NType]?.icon}</span>}
              {label}
              {key !== "all" && <span className="nf-ftab-count">{notifs.filter(n=>n.type===key).length}</span>}
            </button>
          ))}
        </div>

        {/* NOTIFICATIONS LIST */}
        <div className="nf-list">
          {filtered.length === 0 && (
            <div className="nf-empty"><span>🔔</span><p>No notifications in this category.</p></div>
          )}
          {filtered.map((n) => {
            const meta = TYPE_META[n.type];
            return (
              <div key={n.id} className={`nf-item ${!n.read ? "unread" : ""}`} onClick={() => markRead(n.id)}>
                <div className="nf-item__icon" style={{background:`${meta.color}18`,borderColor:`${meta.color}30`}}>
                  <span>{meta.icon}</span>
                </div>
                <div className="nf-item__content">
                  <div className="nf-item__top">
                    <span className="nf-item__type" style={{color:meta.color}}>{meta.label}</span>
                    <span className="nf-item__time">{n.time}</span>
                  </div>
                  <div className="nf-item__title">{!n.read && <span className="nf-dot"/>}{n.title}</div>
                  <p className="nf-item__body">{n.body}</p>
                  {n.action && n.actionHref && (
                    <a href={n.actionHref} className="nf-item__cta" onClick={(e) => e.stopPropagation()}>{n.action} →</a>
                  )}
                </div>
                <button className="nf-item__del" onClick={(e) => { e.stopPropagation(); deleteNotif(n.id); }} title="Dismiss">✕</button>
              </div>
            );
          })}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .nf-root{font-family:'DM Sans',sans-serif;background:#071524;color:#d8e4ec;min-height:100vh;display:flex;overflow-x:hidden;}
        .nf-bg{position:fixed;inset:0;pointer-events:none;z-index:0;}
        .nf-orb{position:absolute;border-radius:50%;filter:blur(90px);}
        .nf-orb--1{width:500px;height:500px;background:#0f3050;top:-100px;right:-100px;opacity:0.55;}
        .nf-orb--2{width:350px;height:350px;background:#1a1a40;bottom:10%;left:-80px;opacity:0.4;}
        .nf-sidebar{width:215px;flex-shrink:0;background:#0a1e2e;border-right:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;}
        .nf-logo{display:flex;align-items:center;gap:0.5rem;padding:1.3rem 1.3rem 1.6rem;font-family:'Lora',serif;font-size:1.1rem;font-weight:700;color:#e8c87d;border-bottom:1px solid rgba(255,255,255,0.06);}
        .nf-nav{display:flex;flex-direction:column;gap:0.1rem;padding:1rem 0.5rem;flex:1;}
        .nf-nav-item{display:flex;align-items:center;gap:0.65rem;padding:0.58rem 0.75rem;border-radius:7px;font-size:0.86rem;color:#4a6070;text-decoration:none;transition:all 0.15s;position:relative;}
        .nf-nav-item:hover{background:rgba(255,255,255,0.04);color:#d8e4ec;}
        .nf-nav-item.active{background:rgba(232,200,125,0.1);color:#e8c87d;font-weight:500;}
        .nf-nav-badge{margin-left:auto;font-size:0.65rem;font-weight:700;background:#e74c3c;color:white;border-radius:100px;padding:0.1rem 0.42rem;min-width:18px;text-align:center;}
        .nf-profile{display:flex;align-items:center;gap:0.65rem;padding:0.8rem 1rem;border-top:1px solid rgba(255,255,255,0.06);margin-top:auto;}
        .nf-avatar{width:30px;height:30px;border-radius:50%;background:#e8c87d;color:#1a0e05;font-size:0.78rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .nf-profile strong{display:block;font-size:0.82rem;color:#d8e4ec;}
        .nf-profile span{font-size:0.7rem;color:#3a5060;}
        .nf-main{margin-left:215px;padding:2rem 2.5rem;position:relative;z-index:1;min-height:100vh;flex:1;}
        .nf-page-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.5rem;gap:1rem;flex-wrap:wrap;}
        .nf-title{font-family:'Lora',serif;font-size:1.75rem;font-weight:700;color:#f0ece4;display:flex;align-items:center;gap:0.75rem;margin-bottom:0.3rem;}
        .nf-unread-badge{font-family:'DM Sans',sans-serif;font-size:0.72rem;font-weight:700;background:rgba(231,76,60,0.15);color:#e74c3c;border:1px solid rgba(231,76,60,0.3);padding:0.2rem 0.6rem;border-radius:100px;}
        .nf-sub{font-size:0.82rem;color:#3a5060;}
        .nf-btn{display:inline-flex;align-items:center;padding:0.55rem 1.1rem;border-radius:7px;font-size:0.84rem;font-weight:600;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all 0.15s;}
        .nf-btn--ghost{background:transparent;color:#8aa5b8;border:1px solid rgba(255,255,255,0.12);}
        .nf-btn--ghost:hover{border-color:#e8c87d;color:#e8c87d;}
        .nf-filter-tabs{display:flex;gap:0.35rem;margin-bottom:1.5rem;flex-wrap:wrap;}
        .nf-ftab{display:flex;align-items:center;gap:0.4rem;padding:0.45rem 0.9rem;background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:100px;font-size:0.78rem;color:#4a6070;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;}
        .nf-ftab:hover{border-color:rgba(232,200,125,0.3);color:#d8e4ec;}
        .nf-ftab.active{background:rgba(232,200,125,0.1);color:#e8c87d;border-color:rgba(232,200,125,0.35);}
        .nf-ftab-count{font-size:0.65rem;color:inherit;opacity:0.7;}
        .nf-list{display:flex;flex-direction:column;gap:0.6rem;max-width:760px;}
        .nf-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4rem 2rem;color:#2a3a48;gap:0.75rem;text-align:center;}
        .nf-empty span{font-size:2.5rem;}
        .nf-empty p{font-size:0.88rem;}
        .nf-item{display:flex;align-items:flex-start;gap:1rem;background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:13px;padding:1.1rem 1.2rem;cursor:pointer;transition:all 0.18s;position:relative;}
        .nf-item:hover{border-color:rgba(255,255,255,0.12);background:#0d2235;}
        .nf-item.unread{border-color:rgba(232,200,125,0.18);background:#0d2235;}
        .nf-item__icon{width:40px;height:40px;border-radius:10px;border:1px solid;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;}
        .nf-item__content{flex:1;min-width:0;}
        .nf-item__top{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem;gap:0.5rem;}
        .nf-item__type{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;}
        .nf-item__time{font-size:0.72rem;color:#2a3a48;flex-shrink:0;}
        .nf-item__title{font-size:0.88rem;font-weight:600;color:#f0ece4;margin-bottom:0.35rem;display:flex;align-items:center;gap:0.5rem;}
        .nf-dot{width:7px;height:7px;border-radius:50%;background:#e8c87d;flex-shrink:0;}
        .nf-item__body{font-size:0.8rem;color:#5a7a8e;line-height:1.65;margin-bottom:0.6rem;}
        .nf-item__cta{font-size:0.78rem;font-weight:600;color:#e8c87d;text-decoration:none;transition:opacity 0.15s;}
        .nf-item__cta:hover{opacity:0.75;}
        .nf-item__del{background:none;border:none;color:#2a3a48;cursor:pointer;font-size:0.9rem;padding:0.2rem;flex-shrink:0;transition:color 0.15s;align-self:flex-start;}
        .nf-item__del:hover{color:#e74c3c;}
        @media(max-width:860px){.nf-sidebar{display:none;}.nf-main{margin-left:0;padding:1.5rem;}}
      `}</style>
    </div>
  );
}
