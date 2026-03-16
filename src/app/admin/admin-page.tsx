"use client";
import { useState } from "react";

type AdminTab = "overview" | "accounts" | "violations" | "appeals" | "tasks" | "revenue";

const STATS = [
  { label:"Total Students", val:"1,284", change:"+38 this week", icon:"👥", color:"#e8c87d" },
  { label:"Active Accounts", val:"1,061", change:"82% activation rate", icon:"✅", color:"#9ecfb8" },
  { label:"Violations Today", val:"7", change:"3 held, 4 warned", icon:"🚫", color:"#e74c3c" },
  { label:"Revenue (Month)", val:"$1,548", change:"+$324 vs last month", icon:"💰", color:"#f4a97f" },
  { label:"Submissions Today", val:"143", change:"12 flagged by AI", icon:"📥", color:"#b8a9e8" },
  { label:"Open Appeals", val:"4", change:"2 pending review", icon:"⚖️", color:"#e8c87d" },
];

const ACCOUNTS = [
  { id:"#1041", name:"Amara Osei", email:"amara@gmail.com", joined:"Mar 1, 2025", status:"active", tasks:6, violations:0 },
  { id:"#1042", name:"Brian Kimani", email:"brian.k@mail.com", joined:"Mar 1, 2025", status:"active", tasks:4, violations:0 },
  { id:"#1043", name:"Tunde Bello", email:"tunde@yahoo.com", joined:"Mar 2, 2025", status:"held", tasks:2, violations:1 },
  { id:"#1044", name:"Grace Wanjiru", email:"grace.w@gmail.com", joined:"Mar 2, 2025", status:"active", tasks:8, violations:0 },
  { id:"#1045", name:"Kwame Asante", email:"kwame@hotmail.com", joined:"Mar 3, 2025", status:"banned", tasks:1, violations:3 },
  { id:"#1046", name:"Fatima Musa", email:"fatima.m@gmail.com", joined:"Mar 3, 2025", status:"active", tasks:5, violations:0 },
  { id:"#1047", name:"David Otieno", email:"d.otieno@mail.com", joined:"Mar 4, 2025", status:"held", tasks:3, violations:1 },
  { id:"#1048", name:"Chinwe Ada", email:"chinwe@gmail.com", joined:"Mar 4, 2025", status:"active", tasks:7, violations:0 },
];

const VIOLATIONS = [
  { id:"V-201", student:"Tunde Bello", email:"tunde@yahoo.com", type:"AI-Generated Content", task:"Social Media Essay", detected:"Mar 5, 2025 14:23", confidence:"97%", status:"held", action:"Account on hold" },
  { id:"V-202", student:"Kwame Asante", email:"kwame@hotmail.com", type:"Plagiarism", task:"Book Review", detected:"Mar 4, 2025 09:11", confidence:"91%", status:"banned", action:"Account banned" },
  { id:"V-203", student:"David Otieno", email:"d.otieno@mail.com", type:"AI-Generated Content", task:"Climate Essay", detected:"Mar 5, 2025 18:44", confidence:"88%", status:"held", action:"Account on hold" },
  { id:"V-204", student:"Sade Lawal", email:"sade@gmail.com", type:"Abusive Language", task:"Community Forum", detected:"Mar 6, 2025 10:02", confidence:"—", status:"warned", action:"Warning issued" },
  { id:"V-205", student:"Emre Yilmaz", email:"emre@mail.com", type:"Duplicate Account", task:"—", detected:"Mar 6, 2025 11:33", confidence:"99%", status:"banned", action:"Both accounts banned" },
  { id:"V-206", student:"Priya Nair", email:"priya@gmail.com", type:"Answer Sharing", task:"Essay Task #8", detected:"Mar 6, 2025 15:20", confidence:"82%", status:"warned", action:"Warning issued" },
];

const APPEALS = [
  { id:"APL-018", student:"Tunde Bello", email:"tunde@yahoo.com", violation:"AI-Generated Content", submitted:"Mar 6, 2025", message:"I did not use ChatGPT. My writing style has always been formal as I studied in a British curriculum school. Please review my previous submissions as evidence.", status:"pending" },
  { id:"APL-019", student:"David Otieno", email:"d.otieno@mail.com", violation:"AI-Generated Content", submitted:"Mar 6, 2025", message:"The flagged phrases are common in academic writing. I would like the teacher to personally review my work. I have receipts showing I submitted original work.", status:"pending" },
  { id:"APL-016", student:"Aminu Danjuma", email:"aminu@gmail.com", violation:"Plagiarism", submitted:"Mar 2, 2025", message:"The passage marked as plagiarism is a properly cited quote. I included attribution in the footnotes which may not have been scanned.", status:"reviewing" },
  { id:"APL-014", student:"Blessing Okoro", email:"blessing@mail.com", violation:"Duplicate Account", submitted:"Feb 28, 2025", message:"I created a second account because I forgot my password. I did not know this was against the rules. I am willing to forfeit the second account.", status:"approved" },
];

const REVENUE = [
  { month:"March 2025", accounts:129, amount:"$1,548", status:"current" },
  { month:"February 2025", accounts:102, amount:"$1,224", status:"settled" },
  { month:"January 2025", accounts:88, amount:"$1,056", status:"settled" },
  { month:"December 2024", accounts:74, amount:"$888", status:"settled" },
  { month:"November 2024", accounts:61, amount:"$732", status:"settled" },
  { month:"October 2024", accounts:49, amount:"$588", status:"settled" },
];

const statusColor: Record<string,string> = {
  active:"#9ecfb8", held:"#e8c87d", banned:"#e74c3c", warned:"#f4a97f",
  pending:"#b8a9e8", reviewing:"#e8c87d", approved:"#9ecfb8", rejected:"#e74c3c",
  current:"#e8c87d", settled:"#9ecfb8",
};

export default function AdminDashboard() {
  const [tab, setTab] = useState<AdminTab>("overview");
  const [appealAction, setAppealAction] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [searchAccounts, setSearchAccounts] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAppeal = (id: string, decision: string) => {
    setAppealAction((p) => ({ ...p, [id]: decision }));
    showToast(decision === "approve" ? `✅ Appeal ${id} approved — account restored.` : `🚫 Appeal ${id} rejected.`);
  };

  const filteredAccounts = ACCOUNTS.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(searchAccounts.toLowerCase()) || a.email.toLowerCase().includes(searchAccounts.toLowerCase());
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="ad-root">
      <div className="ad-bg" />

      {toast && <div className="ad-toast">{toast}</div>}

      {/* SIDEBAR */}
      <aside className="ad-sidebar">
        <div className="ad-logo"><span>✦</span><span>ScriptMaster</span><span className="ad-logo-tag">Admin</span></div>
        <nav className="ad-nav">
          {([
            ["overview","📊","Overview"],
            ["accounts","👥","Accounts"],
            ["violations","🚫","Violations"],
            ["appeals","⚖️","Appeals"],
            ["tasks","📋","Task Manager"],
            ["revenue","💰","Revenue"],
          ] as [AdminTab,string,string][]).map(([key,icon,label]) => (
            <button key={key} className={`ad-nav-item ${tab===key?"active":""}`} onClick={() => setTab(key)}>
              <span>{icon}</span>{label}
              {key === "violations" && <span className="ad-nav-badge">7</span>}
              {key === "appeals" && <span className="ad-nav-badge ad-nav-badge--purple">4</span>}
            </button>
          ))}
        </nav>
        <div className="ad-sidebar-footer">
          <div className="ad-scriptguard-pill"><span className="ad-sg-dot"/>ScriptGuard Active</div>
          <a href="/" className="ad-nav-item" style={{marginTop:"0.5rem"}}><span>🏠</span>View Site</a>
        </div>
      </aside>

      {/* MAIN */}
      <main className="ad-main">

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <>
            <div className="ad-page-header">
              <div><h1 className="ad-title">Platform Overview</h1><p className="ad-sub">Real-time snapshot of ScriptMaster activity</p></div>
              <div className="ad-live-badge"><span className="ad-live-dot"/>Live Data</div>
            </div>
            <div className="ad-stat-grid">
              {STATS.map((s,i) => (
                <div key={i} className="ad-stat" style={{"--sc":s.color} as React.CSSProperties}>
                  <div className="ad-stat__top"><span className="ad-stat__icon">{s.icon}</span><div className="ad-stat__bar"/></div>
                  <div className="ad-stat__val">{s.val}</div>
                  <div className="ad-stat__label">{s.label}</div>
                  <div className="ad-stat__change">{s.change}</div>
                </div>
              ))}
            </div>

            {/* Recent violations + recent signups side by side */}
            <div className="ad-overview-grid">
              <div className="ad-panel">
                <div className="ad-panel-title">🚫 Recent Violations</div>
                {VIOLATIONS.slice(0,4).map((v) => (
                  <div key={v.id} className="ad-list-row">
                    <div className="ad-list-row__left">
                      <div className="ad-list-avatar" style={{background:"#1a3245"}}>{v.student.split(" ").map(n=>n[0]).join("")}</div>
                      <div><strong>{v.student}</strong><span>{v.type}</span></div>
                    </div>
                    <span className="ad-chip" style={{background:`${statusColor[v.status]}18`,color:statusColor[v.status],borderColor:`${statusColor[v.status]}40`}}>{v.status}</span>
                  </div>
                ))}
                <button className="ad-see-all" onClick={() => setTab("violations")}>See all violations →</button>
              </div>
              <div className="ad-panel">
                <div className="ad-panel-title">👥 Recent Sign-ups</div>
                {ACCOUNTS.slice(0,4).map((a) => (
                  <div key={a.id} className="ad-list-row">
                    <div className="ad-list-row__left">
                      <div className="ad-list-avatar" style={{background:"#1e3d54"}}>{a.name.split(" ").map(n=>n[0]).join("")}</div>
                      <div><strong>{a.name}</strong><span>{a.email}</span></div>
                    </div>
                    <span className="ad-chip" style={{background:`${statusColor[a.status]}18`,color:statusColor[a.status],borderColor:`${statusColor[a.status]}40`}}>{a.status}</span>
                  </div>
                ))}
                <button className="ad-see-all" onClick={() => setTab("accounts")}>See all accounts →</button>
              </div>
            </div>

            {/* AI Scanner Stats */}
            <div className="ad-scanner-card">
              <div className="ad-scanner-card__left">
                <div className="ad-scanner-card__icon">🤖</div>
                <div>
                  <strong>ScriptGuard AI — Today's Summary</strong>
                  <p>143 submissions scanned · 12 flagged · 7 actions taken · 99.1% compliance rate</p>
                </div>
              </div>
              <div className="ad-scanner-bars">
                {[["Scanned",143,143,"#4a6070"],["Passed",131,143,"#9ecfb8"],["Flagged",12,143,"#e8c87d"],["Actioned",7,143,"#e74c3c"]].map(([l,v,max,c]) => (
                  <div key={l as string} className="ad-scanner-bar-row">
                    <span>{l as string}</span>
                    <div className="ad-mini-track"><div className="ad-mini-fill" style={{width:`${((v as number)/(max as number))*100}%`,background:c as string}}/></div>
                    <strong style={{color:c as string}}>{v as number}</strong>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── ACCOUNTS ── */}
        {tab === "accounts" && (
          <>
            <div className="ad-page-header">
              <div><h1 className="ad-title">Account Management</h1><p className="ad-sub">View, filter, and manage all student accounts</p></div>
              <div className="ad-header-actions">
                <input className="ad-search" placeholder="Search name or email…" value={searchAccounts} onChange={(e) => setSearchAccounts(e.target.value)} />
                <select className="ad-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="held">Held</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
            </div>
            <div className="ad-table-wrap">
              <table className="ad-table">
                <thead><tr><th>ID</th><th>Student</th><th>Email</th><th>Joined</th><th>Status</th><th>Tasks</th><th>Violations</th><th>Actions</th></tr></thead>
                <tbody>
                  {filteredAccounts.map((a) => (
                    <tr key={a.id}>
                      <td className="ad-id">{a.id}</td>
                      <td><div className="ad-name-cell"><div className="ad-mini-avatar">{a.name.split(" ").map(n=>n[0]).join("")}</div>{a.name}</div></td>
                      <td className="ad-muted">{a.email}</td>
                      <td className="ad-muted">{a.joined}</td>
                      <td><span className="ad-chip" style={{background:`${statusColor[a.status]}18`,color:statusColor[a.status],borderColor:`${statusColor[a.status]}40`}}>{a.status}</span></td>
                      <td className="ad-center">{a.tasks}</td>
                      <td className="ad-center" style={{color:a.violations>0?"#e74c3c":"#3a5060"}}>{a.violations}</td>
                      <td>
                        <div className="ad-action-btns">
                          {a.status === "held" && <button className="ad-act-btn ad-act-btn--green" onClick={() => showToast(`✅ ${a.name}'s account restored.`)}>Restore</button>}
                          {a.status === "active" && <button className="ad-act-btn ad-act-btn--red" onClick={() => showToast(`🚫 ${a.name}'s account held.`)}>Hold</button>}
                          {a.status !== "banned" && <button className="ad-act-btn ad-act-btn--red" onClick={() => showToast(`🚫 ${a.name} permanently banned.`)}>Ban</button>}
                          {a.status === "banned" && <button className="ad-act-btn ad-act-btn--green" onClick={() => showToast(`✅ ${a.name} unbanned.`)}>Unban</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── VIOLATIONS ── */}
        {tab === "violations" && (
          <>
            <div className="ad-page-header">
              <div><h1 className="ad-title">Violations Log</h1><p className="ad-sub">All AI-detected and manually reported violations</p></div>
              <div className="ad-ai-badge"><span className="ad-ai-dot"/>ScriptGuard AI Active</div>
            </div>
            <div className="ad-table-wrap">
              <table className="ad-table">
                <thead><tr><th>ID</th><th>Student</th><th>Violation</th><th>Task</th><th>Detected</th><th>Confidence</th><th>Status</th><th>Action Taken</th></tr></thead>
                <tbody>
                  {VIOLATIONS.map((v) => (
                    <tr key={v.id}>
                      <td className="ad-id">{v.id}</td>
                      <td><div className="ad-name-cell"><div className="ad-mini-avatar">{v.student.split(" ").map(n=>n[0]).join("")}</div><div><span style={{color:"#d8e4ec"}}>{v.student}</span><span style={{display:"block",fontSize:"0.72rem",color:"#3a5060"}}>{v.email}</span></div></div></td>
                      <td><span className="ad-violation-type">{v.type}</span></td>
                      <td className="ad-muted" style={{maxWidth:"180px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.task}</td>
                      <td className="ad-muted" style={{fontSize:"0.76rem"}}>{v.detected}</td>
                      <td style={{color:v.confidence!=="—"?"#e74c3c":"#3a5060",fontWeight:600}}>{v.confidence}</td>
                      <td><span className="ad-chip" style={{background:`${statusColor[v.status]}18`,color:statusColor[v.status],borderColor:`${statusColor[v.status]}40`}}>{v.status}</span></td>
                      <td className="ad-muted" style={{fontSize:"0.76rem"}}>{v.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── APPEALS ── */}
        {tab === "appeals" && (
          <>
            <div className="ad-page-header">
              <div><h1 className="ad-title">Appeals Queue</h1><p className="ad-sub">Review and decide on student appeals against violations</p></div>
              <span className="ad-pending-count">{APPEALS.filter(a=>a.status==="pending").length} pending decisions</span>
            </div>
            <div className="ad-appeals-list">
              {APPEALS.map((a) => {
                const decision = appealAction[a.id];
                const resolved = decision || (a.status !== "pending" && a.status !== "reviewing");
                return (
                  <div key={a.id} className={`ad-appeal-card ${resolved?"resolved":""}`}>
                    <div className="ad-appeal-card__top">
                      <div className="ad-appeal-card__id">{a.id}</div>
                      <div className="ad-appeal-student">
                        <div className="ad-mini-avatar">{a.student.split(" ").map(n=>n[0]).join("")}</div>
                        <div><strong>{a.student}</strong><span>{a.email}</span></div>
                      </div>
                      <span className="ad-chip" style={{background:`${statusColor[decision??(a.status)]}18`,color:statusColor[decision??(a.status)],borderColor:`${statusColor[decision??(a.status)]}40`,marginLeft:"auto"}}>
                        {decision === "approve" ? "approved" : decision === "reject" ? "rejected" : a.status}
                      </span>
                    </div>
                    <div className="ad-appeal-violation">🚫 Violation: <strong>{a.violation}</strong> · Submitted {a.submitted}</div>
                    <div className="ad-appeal-message">
                      <div className="ad-appeal-message__label">Student's Statement:</div>
                      <p>"{a.message}"</p>
                    </div>
                    {!resolved && (
                      <div className="ad-appeal-actions">
                        <button className="ad-act-btn ad-act-btn--green ad-act-btn--lg" onClick={() => handleAppeal(a.id,"approve")}>✅ Approve Appeal — Restore Account</button>
                        <button className="ad-act-btn ad-act-btn--red ad-act-btn--lg" onClick={() => handleAppeal(a.id,"reject")}>🚫 Reject Appeal — Keep Ban</button>
                      </div>
                    )}
                    {resolved && (
                      <div className="ad-appeal-resolved">
                        {(decision || a.status) === "approved" || (decision) === "approve"
                          ? "✅ Appeal approved — account has been restored."
                          : "🚫 Appeal rejected — account remains banned."}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── TASKS ── */}
        {tab === "tasks" && (
          <>
            <div className="ad-page-header">
              <div><h1 className="ad-title">Task Manager</h1><p className="ad-sub">Monitor all tasks posted across the platform</p></div>
              <a href="/teacher/tasks/new" className="ad-btn ad-btn--gold">+ Post New Task</a>
            </div>
            <div className="ad-table-wrap">
              <table className="ad-table">
                <thead><tr><th>Task Title</th><th>Type</th><th>Posted By</th><th>Due</th><th>Submissions</th><th>Avg Grade</th><th>Status</th></tr></thead>
                <tbody>
                  {[
                    { title:"The Impact of Social Media on Youth Mental Health", type:"Essay", teacher:"Ms. Adaeze O.", due:"Mar 7", subs:"18/24", avg:"B+", status:"active" },
                    { title:"A Night the Town Stood Still", type:"Story", teacher:"Ms. Adaeze O.", due:"Mar 14", subs:"9/24", avg:"—", status:"active" },
                    { title:"Book Review: The Alchemist", type:"Review", teacher:"Mr. Kimani S.", due:"Feb 28", subs:"24/24", avg:"A-", status:"closed" },
                    { title:"Climate Change: Individual vs. Corporate Responsibility", type:"Essay", teacher:"Ms. Adaeze O.", due:"Mar 21", subs:"3/24", avg:"—", status:"draft" },
                    { title:"Monthly Progress Report — Q1", type:"Report", teacher:"Mr. Kimani S.", due:"Mar 28", subs:"0/24", avg:"—", status:"draft" },
                  ].map((t,i) => (
                    <tr key={i}>
                      <td style={{color:"#d8e4ec",fontWeight:500,maxWidth:"260px"}}>{t.title}</td>
                      <td><span className="ad-type-tag">{t.type}</span></td>
                      <td className="ad-muted">{t.teacher}</td>
                      <td className="ad-muted">{t.due}</td>
                      <td style={{color:"#8aa5b8"}}>{t.subs}</td>
                      <td style={{color:"#e8c87d",fontWeight:600}}>{t.avg}</td>
                      <td><span className="ad-chip" style={{background:t.status==="active"?"rgba(158,207,184,0.12)":t.status==="closed"?"rgba(58,80,96,0.2)":"rgba(232,200,125,0.1)",color:t.status==="active"?"#9ecfb8":t.status==="closed"?"#3a5060":"#e8c87d",borderColor:t.status==="active"?"rgba(158,207,184,0.3)":t.status==="closed"?"rgba(58,80,96,0.3)":"rgba(232,200,125,0.3)"}}>{t.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── REVENUE ── */}
        {tab === "revenue" && (
          <>
            <div className="ad-page-header">
              <div><h1 className="ad-title">Revenue</h1><p className="ad-sub">Monthly account sales — $12 per student, one-time</p></div>
              <div className="ad-revenue-total"><span>Total All-Time</span><strong>$6,036</strong></div>
            </div>
            <div className="ad-revenue-cards">
              {REVENUE.map((r) => (
                <div key={r.month} className={`ad-revenue-card ${r.status==="current"?"current":""}`}>
                  <div className="ad-revenue-card__top">
                    <span className="ad-revenue-month">{r.month}</span>
                    <span className="ad-chip" style={{background:`${statusColor[r.status]}18`,color:statusColor[r.status],borderColor:`${statusColor[r.status]}40`}}>{r.status}</span>
                  </div>
                  <div className="ad-revenue-amount">{r.amount}</div>
                  <div className="ad-revenue-accounts">{r.accounts} new accounts × $12</div>
                  <div className="ad-revenue-bar-wrap">
                    <div className="ad-revenue-track"><div className="ad-revenue-fill" style={{width:`${(r.accounts/129)*100}%`}}/></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="ad-revenue-summary">
              <div className="ad-rev-sum-item"><span>Total Students</span><strong>1,284</strong></div>
              <div className="ad-rev-sum-item"><span>Activated Accounts</span><strong>1,061</strong></div>
              <div className="ad-rev-sum-item"><span>Revenue Rate</span><strong>$12 per student</strong></div>
              <div className="ad-rev-sum-item"><span>All-Time Revenue</span><strong style={{color:"#e8c87d"}}>$12,732</strong></div>
            </div>
          </>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .ad-root{font-family:'DM Sans',sans-serif;background:#06101c;color:#d8e4ec;min-height:100vh;display:flex;overflow-x:hidden;}
        .ad-bg{position:fixed;inset:0;pointer-events:none;background:radial-gradient(ellipse 60% 50% at 70% 0%,rgba(15,48,80,0.7),transparent 60%),radial-gradient(ellipse 40% 40% at 10% 90%,rgba(10,30,50,0.6),transparent 55%);}

        .ad-toast{position:fixed;top:1.5rem;right:1.5rem;z-index:999;background:#0a1e2e;border:1px solid rgba(158,207,184,0.3);color:#9ecfb8;padding:0.65rem 1.2rem;border-radius:8px;font-size:0.84rem;font-weight:500;box-shadow:0 8px 30px rgba(0,0,0,0.4);animation:toastIn 0.3s ease;}
        @keyframes toastIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}

        .ad-sidebar{width:220px;flex-shrink:0;background:#0a1e2e;border-right:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;overflow-y:auto;}
        .ad-logo{display:flex;align-items:center;gap:0.5rem;padding:1.4rem 1.2rem 1.8rem;font-family:'Lora',serif;font-size:1.05rem;font-weight:700;color:#e8c87d;border-bottom:1px solid rgba(255,255,255,0.06);}
        .ad-logo-tag{font-family:'DM Sans',sans-serif;font-size:0.62rem;font-weight:700;letter-spacing:0.08em;background:rgba(231,76,60,0.15);color:#e74c3c;border:1px solid rgba(231,76,60,0.3);padding:0.15rem 0.45rem;border-radius:4px;margin-left:auto;}
        .ad-nav{display:flex;flex-direction:column;gap:0.1rem;padding:1rem 0.5rem;flex:1;}
        .ad-nav-item{display:flex;align-items:center;gap:0.65rem;padding:0.58rem 0.75rem;border-radius:7px;font-size:0.85rem;color:#4a6070;background:none;border:none;cursor:pointer;text-decoration:none;font-family:'DM Sans',sans-serif;transition:all 0.15s;text-align:left;position:relative;}
        .ad-nav-item:hover{background:rgba(255,255,255,0.04);color:#d8e4ec;}
        .ad-nav-item.active{background:rgba(232,200,125,0.1);color:#e8c87d;font-weight:500;}
        .ad-nav-badge{margin-left:auto;font-size:0.65rem;font-weight:700;background:rgba(231,76,60,0.2);color:#e74c3c;border-radius:100px;padding:0.1rem 0.45rem;min-width:20px;text-align:center;}
        .ad-nav-badge--purple{background:rgba(184,169,232,0.15);color:#b8a9e8;}
        .ad-sidebar-footer{padding:0.6rem 0.7rem 0.8rem;border-top:1px solid rgba(255,255,255,0.06);margin-top:auto;}
        .ad-scriptguard-pill{display:flex;align-items:center;gap:0.45rem;font-size:0.72rem;color:#4a6070;background:rgba(158,207,184,0.05);border:1px solid rgba(158,207,184,0.12);border-radius:8px;padding:0.4rem 0.65rem;margin-bottom:0.3rem;}
        .ad-sg-dot{width:6px;height:6px;border-radius:50%;background:#9ecfb8;animation:blink 2s ease-in-out infinite;flex-shrink:0;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}

        .ad-main{margin-left:220px;padding:2rem 2.5rem;position:relative;z-index:1;min-height:100vh;flex:1;}
        .ad-page-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.75rem;gap:1rem;flex-wrap:wrap;}
        .ad-title{font-family:'Lora',serif;font-size:1.75rem;font-weight:700;color:#f0ece4;margin-bottom:0.3rem;}
        .ad-sub{font-size:0.82rem;color:#3a5060;}
        .ad-live-badge{display:flex;align-items:center;gap:0.45rem;font-size:0.75rem;font-weight:600;background:rgba(158,207,184,0.08);color:#9ecfb8;border:1px solid rgba(158,207,184,0.25);padding:0.38rem 0.85rem;border-radius:100px;}
        .ad-live-dot,.ad-ai-dot{width:6px;height:6px;border-radius:50%;background:currentColor;animation:blink 1.5s ease-in-out infinite;}
        .ad-ai-badge{display:flex;align-items:center;gap:0.45rem;font-size:0.75rem;font-weight:600;background:rgba(231,76,60,0.08);color:#e74c3c;border:1px solid rgba(231,76,60,0.25);padding:0.38rem 0.85rem;border-radius:100px;}
        .ad-header-actions{display:flex;gap:0.75rem;align-items:center;}
        .ad-search{background:#0a1e2e;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:0.55rem 0.9rem;color:#d8e4ec;font-size:0.84rem;font-family:'DM Sans',sans-serif;outline:none;width:220px;}
        .ad-search:focus{border-color:#e8c87d;}
        .ad-select{background:#0a1e2e;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:0.55rem 0.8rem;color:#d8e4ec;font-size:0.84rem;font-family:'DM Sans',sans-serif;outline:none;cursor:pointer;}

        .ad-stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.75rem;}
        .ad-stat{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:13px;padding:1.2rem;position:relative;overflow:hidden;transition:transform 0.15s;}
        .ad-stat:hover{transform:translateY(-2px);}
        .ad-stat__top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem;}
        .ad-stat__icon{font-size:1.3rem;}
        .ad-stat__bar{width:40px;height:3px;background:var(--sc);border-radius:2px;opacity:0.6;}
        .ad-stat__val{font-family:'Lora',serif;font-size:1.9rem;font-weight:700;color:var(--sc);line-height:1;margin-bottom:0.2rem;}
        .ad-stat__label{font-size:0.8rem;color:#f0ece4;font-weight:500;margin-bottom:0.15rem;}
        .ad-stat__change{font-size:0.73rem;color:#3a5060;}

        .ad-overview-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.5rem;}
        .ad-panel{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:1.3rem;}
        .ad-panel-title{font-size:0.78rem;text-transform:uppercase;letter-spacing:0.08em;color:#e8c87d;margin-bottom:1rem;}
        .ad-list-row{display:flex;align-items:center;justify-content:space-between;padding:0.6rem 0;border-bottom:1px solid rgba(255,255,255,0.05);}
        .ad-list-row:last-child{border-bottom:none;}
        .ad-list-row__left{display:flex;align-items:center;gap:0.7rem;}
        .ad-list-avatar{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:#d8e4ec;flex-shrink:0;}
        .ad-list-row__left strong{display:block;font-size:0.83rem;color:#d8e4ec;}
        .ad-list-row__left span{font-size:0.73rem;color:#3a5060;}
        .ad-see-all{background:none;border:none;color:#e8c87d;font-size:0.78rem;cursor:pointer;padding:0.5rem 0 0;font-family:'DM Sans',sans-serif;transition:opacity 0.15s;}
        .ad-see-all:hover{opacity:0.7;}

        .ad-chip{font-size:0.68rem;font-weight:600;padding:0.18rem 0.55rem;border-radius:5px;border:1px solid;text-transform:capitalize;white-space:nowrap;}

        .ad-scanner-card{display:flex;align-items:center;gap:1.5rem;background:#0d1a0d;border:1px solid rgba(158,207,184,0.18);border-radius:14px;padding:1.4rem 1.6rem;flex-wrap:wrap;}
        .ad-scanner-card__left{display:flex;align-items:center;gap:1rem;flex:1;}
        .ad-scanner-card__icon{font-size:2rem;flex-shrink:0;}
        .ad-scanner-card__left strong{display:block;color:#f0ece4;font-size:0.9rem;margin-bottom:0.2rem;}
        .ad-scanner-card__left p{font-size:0.78rem;color:#4a6070;}
        .ad-scanner-bars{display:flex;flex-direction:column;gap:0.5rem;min-width:240px;}
        .ad-scanner-bar-row{display:flex;align-items:center;gap:0.75rem;font-size:0.76rem;color:#4a6070;}
        .ad-scanner-bar-row span{width:60px;flex-shrink:0;}
        .ad-scanner-bar-row strong{width:28px;text-align:right;flex-shrink:0;}
        .ad-mini-track{flex:1;height:5px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden;}
        .ad-mini-fill{height:100%;border-radius:3px;transition:width 0.5s ease;}

        .ad-table-wrap{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:auto;}
        .ad-table{width:100%;border-collapse:collapse;font-size:0.82rem;}
        .ad-table thead tr{border-bottom:1px solid rgba(255,255,255,0.08);}
        .ad-table th{padding:0.85rem 1rem;color:#4a6070;font-weight:500;text-align:left;white-space:nowrap;}
        .ad-table td{padding:0.8rem 1rem;border-bottom:1px solid rgba(255,255,255,0.04);}
        .ad-table tr:last-child td{border-bottom:none;}
        .ad-table tr:hover td{background:rgba(255,255,255,0.02);}
        .ad-id{color:#3a5060;font-size:0.75rem;font-family:monospace;}
        .ad-muted{color:#4a6070;}
        .ad-center{text-align:center;}
        .ad-name-cell{display:flex;align-items:center;gap:0.6rem;}
        .ad-mini-avatar{width:28px;height:28px;border-radius:50%;background:#1e3d54;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:700;color:#9ecfb8;flex-shrink:0;}
        .ad-violation-type{font-size:0.76rem;color:#f4a97f;background:rgba(244,169,127,0.1);padding:0.18rem 0.5rem;border-radius:4px;border:1px solid rgba(244,169,127,0.25);}
        .ad-type-tag{font-size:0.72rem;color:#e8c87d;background:rgba(232,200,125,0.1);padding:0.18rem 0.5rem;border-radius:4px;}

        .ad-action-btns{display:flex;gap:0.4rem;flex-wrap:wrap;}
        .ad-act-btn{padding:0.28rem 0.65rem;border-radius:5px;font-size:0.72rem;font-weight:600;cursor:pointer;border:1px solid;font-family:'DM Sans',sans-serif;transition:all 0.15s;}
        .ad-act-btn--green{background:rgba(158,207,184,0.1);color:#9ecfb8;border-color:rgba(158,207,184,0.3);}
        .ad-act-btn--green:hover{background:rgba(158,207,184,0.2);}
        .ad-act-btn--red{background:rgba(231,76,60,0.1);color:#e74c3c;border-color:rgba(231,76,60,0.3);}
        .ad-act-btn--red:hover{background:rgba(231,76,60,0.2);}
        .ad-act-btn--lg{padding:0.5rem 1rem;font-size:0.82rem;}

        .ad-pending-count{font-size:0.82rem;color:#b8a9e8;background:rgba(184,169,232,0.1);border:1px solid rgba(184,169,232,0.25);padding:0.4rem 0.9rem;border-radius:8px;}
        .ad-appeals-list{display:flex;flex-direction:column;gap:1.1rem;}
        .ad-appeal-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:1.4rem;transition:opacity 0.3s;}
        .ad-appeal-card.resolved{opacity:0.6;}
        .ad-appeal-card__top{display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;flex-wrap:wrap;}
        .ad-appeal-card__id{font-size:0.72rem;color:#3a5060;font-family:monospace;}
        .ad-appeal-student{display:flex;align-items:center;gap:0.6rem;}
        .ad-appeal-student strong{display:block;font-size:0.85rem;color:#d8e4ec;}
        .ad-appeal-student span{font-size:0.73rem;color:#3a5060;}
        .ad-appeal-violation{font-size:0.78rem;color:#6a8090;margin-bottom:0.75rem;}
        .ad-appeal-violation strong{color:#f4a97f;}
        .ad-appeal-message{background:#071524;border-radius:8px;padding:0.85rem 1rem;margin-bottom:1rem;}
        .ad-appeal-message__label{font-size:0.68rem;text-transform:uppercase;letter-spacing:0.08em;color:#e8c87d;margin-bottom:0.4rem;}
        .ad-appeal-message p{font-size:0.83rem;color:#8aa5b8;line-height:1.65;font-style:italic;}
        .ad-appeal-actions{display:flex;gap:0.75rem;flex-wrap:wrap;}
        .ad-appeal-resolved{font-size:0.82rem;color:#6a8090;padding:0.6rem 0.8rem;background:rgba(255,255,255,0.03);border-radius:7px;}

        .ad-revenue-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem;}
        .ad-revenue-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:13px;padding:1.3rem;transition:transform 0.15s;}
        .ad-revenue-card:hover{transform:translateY(-2px);}
        .ad-revenue-card.current{border-color:rgba(232,200,125,0.25);}
        .ad-revenue-card__top{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;}
        .ad-revenue-month{font-size:0.83rem;color:#d8e4ec;font-weight:500;}
        .ad-revenue-amount{font-family:'Lora',serif;font-size:2rem;font-weight:700;color:#e8c87d;margin-bottom:0.2rem;}
        .ad-revenue-accounts{font-size:0.75rem;color:#3a5060;margin-bottom:0.75rem;}
        .ad-revenue-track{height:4px;background:rgba(255,255,255,0.07);border-radius:2px;overflow:hidden;}
        .ad-revenue-fill{height:100%;background:#e8c87d;border-radius:2px;}
        .ad-revenue-total{text-align:right;}
        .ad-revenue-total span{display:block;font-size:0.75rem;color:#3a5060;margin-bottom:0.2rem;}
        .ad-revenue-total strong{font-family:'Lora',serif;font-size:1.6rem;color:#e8c87d;}
        .ad-revenue-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}
        .ad-rev-sum-item{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:1rem;}
        .ad-rev-sum-item span{display:block;font-size:0.75rem;color:#3a5060;margin-bottom:0.3rem;}
        .ad-rev-sum-item strong{font-size:1.1rem;color:#d8e4ec;}

        .ad-btn{display:inline-flex;align-items:center;justify-content:center;padding:0.6rem 1.3rem;border-radius:8px;font-size:0.86rem;font-weight:600;text-decoration:none;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all 0.18s;}
        .ad-btn--gold{background:#e8c87d;color:#1a0e05;}
        .ad-btn--gold:hover{background:#f0d698;}

        @media(max-width:900px){.ad-sidebar{display:none;}.ad-main{margin-left:0;padding:1.5rem;}.ad-stat-grid{grid-template-columns:1fr 1fr;}.ad-overview-grid{grid-template-columns:1fr;}.ad-revenue-cards{grid-template-columns:1fr 1fr;}.ad-revenue-summary{grid-template-columns:1fr 1fr;}}
      `}</style>
    </div>
  );
}
