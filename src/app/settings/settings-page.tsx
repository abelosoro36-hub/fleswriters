"use client";
import { useState } from "react";

type SettingsTab = "profile" | "notifications" | "security" | "preferences";

export default function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>("profile");
  const [saved, setSaved] = useState(false);
  const [firstName, setFirstName] = useState("Amara");
  const [lastName, setLastName] = useState("Osei");
  const [email, setEmail] = useState("amara.osei@gmail.com");
  const [phone, setPhone] = useState("+233 24 567 8901");
  const [bio, setBio] = useState("Passionate writer and lifelong learner based in Accra.");
  const [emailGrades, setEmailGrades] = useState(true);
  const [emailTasks, setEmailTasks] = useState(true);
  const [emailReminders, setEmailReminders] = useState(true);
  const [emailSystem, setEmailSystem] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwdSaved, setPwdSaved] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState("medium");
  const [language, setLanguage] = useState("English");
  const [autoSave, setAutoSave] = useState(true);
  const [showWordCount, setShowWordCount] = useState(true);

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const handlePwdChange = () => {
    if (!currentPwd) { setPwdError("Enter your current password."); return; }
    if (newPwd.length < 6) { setPwdError("New password must be at least 6 characters."); return; }
    if (newPwd !== confirmPwd) { setPwdError("New passwords do not match."); return; }
    setPwdError(""); setPwdSaved(true);
    setTimeout(() => { setPwdSaved(false); setCurrentPwd(""); setNewPwd(""); setConfirmPwd(""); }, 2500);
  };

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button className={`sg-toggle ${on ? "on" : ""}`} onClick={onToggle}><span className="sg-toggle__knob"/></button>
  );

  return (
    <div className="sg-root">
      <div className="sg-bg"><div className="sg-orb sg-orb--1"/><div className="sg-orb sg-orb--2"/></div>
      {(saved || pwdSaved) && <div className="sg-toast">{pwdSaved ? "🔒 Password updated" : "✅ Settings saved"}</div>}

      <aside className="sg-sidebar">
        <div className="sg-logo"><span>✦</span><span>ScriptMaster</span></div>
        <nav className="sg-nav">
          {[["📋","My Tasks","/student"],["📊","Progress","/student/dashboard"],["🔔","Notifications","/student/notifications"],["🏆","Certificates","/certificate"],["📚","Training","/training"],["⚙️","Settings","/settings"]].map(([icon,label,href]) => (
            <a key={label as string} href={href as string} className={`sg-nav-item ${label==="Settings"?"active":""}`}><span>{icon as string}</span>{label as string}</a>
          ))}
        </nav>
        <div className="sg-profile"><div className="sg-avatar">{firstName[0]}</div><div><strong>{firstName} {lastName}</strong><span>Student</span></div></div>
      </aside>

      <main className="sg-main">
        <div className="sg-page-header"><h1 className="sg-title">Account Settings</h1><p className="sg-sub">Manage your profile, notifications, and security.</p></div>

        <div className="sg-layout">
          <div className="sg-settings-nav">
            {([["profile","👤","Profile"],["notifications","🔔","Notifications"],["security","🔒","Security"],["preferences","🎨","Preferences"]] as [SettingsTab,string,string][]).map(([key,icon,label]) => (
              <button key={key} className={`sg-snav-item ${tab===key?"active":""}`} onClick={() => setTab(key)}><span>{icon}</span>{label}</button>
            ))}
            <div className="sg-snav-divider"/>
            <div className="sg-acct-info">
              <div className="sg-acct-row"><span>Type</span><strong>Student</strong></div>
              <div className="sg-acct-row"><span>Paid</span><strong style={{color:"#9ecfb8"}}>$12 ✓</strong></div>
              <div className="sg-acct-row"><span>Status</span><strong style={{color:"#9ecfb8"}}>Active</strong></div>
            </div>
          </div>

          <div className="sg-content">
            {tab === "profile" && (
              <div className="sg-panel">
                <div className="sg-panel__title">👤 Profile Information</div>
                <div className="sg-avatar-row">
                  <div className="sg-big-av">{firstName[0]}{lastName[0]}</div>
                  <div><p className="sg-av-name">{firstName} {lastName}</p><p className="sg-av-email">{email}</p><button className="sg-text-btn">Change photo</button></div>
                </div>
                <div className="sg-grid2">
                  <div className="sg-field"><label>First Name</label><input className="sg-input" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/></div>
                  <div className="sg-field"><label>Last Name</label><input className="sg-input" value={lastName} onChange={(e)=>setLastName(e.target.value)}/></div>
                </div>
                <div className="sg-field"><label>Email Address</label><input className="sg-input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/></div>
                <div className="sg-field"><label>Phone Number</label><input className="sg-input" value={phone} onChange={(e)=>setPhone(e.target.value)}/></div>
                <div className="sg-field"><label>Short Bio</label><textarea className="sg-input sg-textarea" rows={3} value={bio} onChange={(e)=>setBio(e.target.value)} maxLength={160}/><div className="sg-cc">{bio.length}/160</div></div>
                <div className="sg-panel-foot"><button className="sg-btn sg-btn--gold" onClick={showSaved}>Save Profile →</button></div>
              </div>
            )}

            {tab === "notifications" && (
              <div className="sg-panel">
                <div className="sg-panel__title">🔔 Email Notifications</div>
                <p className="sg-panel__sub">Choose which emails you want to receive from ScriptMaster.</p>
                {[{l:"New Grades",d:"Get notified when your teacher grades a submission",on:emailGrades,t:()=>setEmailGrades(!emailGrades)},{l:"New Tasks",d:"Get notified when a new writing task is assigned",on:emailTasks,t:()=>setEmailTasks(!emailTasks)},{l:"Task Reminders",d:"Receive reminders before task due dates",on:emailReminders,t:()=>setEmailReminders(!emailReminders)},{l:"System Alerts",d:"Platform updates, maintenance, and policy changes",on:emailSystem,t:()=>setEmailSystem(!emailSystem)}].map((item) => (
                  <div key={item.l} className="sg-toggle-row"><div><strong>{item.l}</strong><p>{item.d}</p></div><Toggle on={item.on} onToggle={item.t}/></div>
                ))}
                <div className="sg-info-box"><span>🤖</span><span><strong>Violation alerts are always on.</strong> ScriptGuard AI notifications cannot be disabled.</span></div>
                <div className="sg-panel-foot"><button className="sg-btn sg-btn--gold" onClick={showSaved}>Save →</button></div>
              </div>
            )}

            {tab === "security" && (
              <div className="sg-panel">
                <div className="sg-panel__title">🔒 Security</div>
                <div className="sg-sec-block">
                  <div className="sg-sec-block__title">Change Password</div>
                  <div className="sg-field"><label>Current Password</label><input className="sg-input" type="password" placeholder="Current password" value={currentPwd} onChange={(e)=>{setCurrentPwd(e.target.value);setPwdError("");}}/></div>
                  <div className="sg-field"><label>New Password</label><input className="sg-input" type="password" placeholder="Min 6 characters" value={newPwd} onChange={(e)=>{setNewPwd(e.target.value);setPwdError("");}}/></div>
                  <div className="sg-field"><label>Confirm Password</label><input className="sg-input" type="password" placeholder="Repeat new password" value={confirmPwd} onChange={(e)=>{setConfirmPwd(e.target.value);setPwdError("");}}/></div>
                  {pwdError && <div className="sg-err">{pwdError}</div>}
                  <button className="sg-btn sg-btn--gold" style={{marginTop:"0.5rem"}} onClick={handlePwdChange}>Update Password →</button>
                </div>
                <div className="sg-sec-block">
                  <div className="sg-sec-block__title">Account Info</div>
                  <div className="sg-sec-grid">
                    {[["Account Status","✅ Active","#9ecfb8"],["Account Type","Student — Paid","#d8e4ec"],["ScriptGuard AI","🤖 Monitoring","#b8a9e8"],["Violations","0 on record","#9ecfb8"]].map(([l,v,c])=>(
                      <div key={l as string} className="sg-sec-item"><span>{l as string}</span><strong style={{color:c as string}}>{v as string}</strong></div>
                    ))}
                  </div>
                </div>
                <div className="sg-danger-zone">
                  <div className="sg-danger-zone__title">⚠️ Danger Zone</div>
                  <div className="sg-danger-row"><div><strong>Delete Account</strong><p>Permanently delete your account and all data. Cannot be undone.</p></div><button className="sg-btn sg-btn--danger">Delete Account</button></div>
                </div>
              </div>
            )}

            {tab === "preferences" && (
              <div className="sg-panel">
                <div className="sg-panel__title">🎨 Preferences</div>
                <div className="sg-field"><label>Theme</label><div className="sg-radio-group">{["dark","light","auto"].map(t=><button key={t} className={`sg-radio-btn ${theme===t?"active":""}`} onClick={()=>setTheme(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}</div></div>
                <div className="sg-field"><label>Editor Font Size</label><div className="sg-radio-group">{["small","medium","large"].map(s=><button key={s} className={`sg-radio-btn ${fontSize===s?"active":""}`} onClick={()=>setFontSize(s)}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>)}</div></div>
                <div className="sg-field"><label>Language</label><select className="sg-input" value={language} onChange={(e)=>setLanguage(e.target.value)}>{["English","French","Swahili","Hausa","Yoruba","Igbo"].map(l=><option key={l}>{l}</option>)}</select></div>
                {[{l:"Auto-save writing",d:"Save your writing every 2 seconds automatically",on:autoSave,t:()=>setAutoSave(!autoSave)},{l:"Show live word count",d:"Display word count progress bar in the editor",on:showWordCount,t:()=>setShowWordCount(!showWordCount)}].map(item=>(
                  <div key={item.l} className="sg-toggle-row"><div><strong>{item.l}</strong><p>{item.d}</p></div><Toggle on={item.on} onToggle={item.t}/></div>
                ))}
                <div className="sg-panel-foot"><button className="sg-btn sg-btn--gold" onClick={showSaved}>Save Preferences →</button></div>
              </div>
            )}
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .sg-root{font-family:'DM Sans',sans-serif;background:#071524;color:#d8e4ec;min-height:100vh;display:flex;overflow-x:hidden;}
        .sg-bg{position:fixed;inset:0;pointer-events:none;z-index:0;}
        .sg-orb{position:absolute;border-radius:50%;filter:blur(90px);}
        .sg-orb--1{width:500px;height:500px;background:#0f3050;top:-100px;right:-100px;opacity:0.5;}
        .sg-orb--2{width:300px;height:300px;background:#1a1a40;bottom:10%;left:-80px;opacity:0.38;}
        .sg-toast{position:fixed;top:1.5rem;right:1.5rem;z-index:999;background:#0a1e2e;border:1px solid rgba(158,207,184,0.3);color:#9ecfb8;padding:0.65rem 1.2rem;border-radius:8px;font-size:0.84rem;font-weight:500;box-shadow:0 8px 30px rgba(0,0,0,0.4);animation:fadeIn 0.3s ease;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .sg-sidebar{width:215px;flex-shrink:0;background:#0a1e2e;border-right:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;}
        .sg-logo{display:flex;align-items:center;gap:0.5rem;padding:1.3rem 1.3rem 1.6rem;font-family:'Lora',serif;font-size:1.1rem;font-weight:700;color:#e8c87d;border-bottom:1px solid rgba(255,255,255,0.06);}
        .sg-nav{display:flex;flex-direction:column;gap:0.1rem;padding:1rem 0.5rem;flex:1;}
        .sg-nav-item{display:flex;align-items:center;gap:0.65rem;padding:0.58rem 0.75rem;border-radius:7px;font-size:0.86rem;color:#4a6070;text-decoration:none;transition:all 0.15s;}
        .sg-nav-item:hover{background:rgba(255,255,255,0.04);color:#d8e4ec;}
        .sg-nav-item.active{background:rgba(232,200,125,0.1);color:#e8c87d;font-weight:500;}
        .sg-profile{display:flex;align-items:center;gap:0.65rem;padding:0.8rem 1rem;border-top:1px solid rgba(255,255,255,0.06);margin-top:auto;}
        .sg-avatar{width:30px;height:30px;border-radius:50%;background:#e8c87d;color:#1a0e05;font-size:0.78rem;font-weight:700;display:flex;align-items:center;justify-content:center;}
        .sg-profile strong{display:block;font-size:0.82rem;color:#d8e4ec;}
        .sg-profile span{font-size:0.7rem;color:#3a5060;}
        .sg-main{margin-left:215px;padding:2rem 2.5rem;position:relative;z-index:1;min-height:100vh;flex:1;}
        .sg-page-header{margin-bottom:1.75rem;}
        .sg-title{font-family:'Lora',serif;font-size:1.75rem;font-weight:700;color:#f0ece4;margin-bottom:0.3rem;}
        .sg-sub{font-size:0.82rem;color:#3a5060;}
        .sg-layout{display:grid;grid-template-columns:190px 1fr;gap:1.5rem;align-items:start;}
        .sg-settings-nav{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:13px;padding:0.5rem;display:flex;flex-direction:column;gap:0.08rem;position:sticky;top:1.5rem;}
        .sg-snav-item{display:flex;align-items:center;gap:0.6rem;padding:0.58rem 0.72rem;border-radius:7px;font-size:0.84rem;color:#4a6070;background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;text-align:left;}
        .sg-snav-item:hover{background:rgba(255,255,255,0.04);color:#d8e4ec;}
        .sg-snav-item.active{background:rgba(232,200,125,0.1);color:#e8c87d;font-weight:500;}
        .sg-snav-divider{height:1px;background:rgba(255,255,255,0.06);margin:0.4rem 0;}
        .sg-acct-info{padding:0.3rem 0;}
        .sg-acct-row{display:flex;justify-content:space-between;font-size:0.73rem;padding:0.22rem 0.72rem;color:#3a5060;}
        .sg-acct-row strong{color:#6a8090;}
        .sg-panel{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:15px;padding:1.6rem;}
        .sg-panel__title{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:#e8c87d;margin-bottom:1.2rem;}
        .sg-panel__sub{font-size:0.82rem;color:#4a6070;margin-bottom:1.4rem;}
        .sg-avatar-row{display:flex;align-items:center;gap:1.1rem;margin-bottom:1.4rem;padding:0.9rem;background:#071524;border-radius:11px;}
        .sg-big-av{width:52px;height:52px;border-radius:50%;background:#e8c87d;color:#1a0e05;font-size:1rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .sg-av-name{font-size:0.95rem;font-weight:600;color:#f0ece4;margin-bottom:0.12rem;}
        .sg-av-email{font-size:0.78rem;color:#4a6070;margin-bottom:0.35rem;}
        .sg-text-btn{background:none;border:none;color:#e8c87d;font-size:0.76rem;cursor:pointer;padding:0;font-family:'DM Sans',sans-serif;}
        .sg-grid2{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
        .sg-field{display:flex;flex-direction:column;gap:0.35rem;margin-bottom:0.9rem;}
        .sg-field label{font-size:0.77rem;font-weight:500;color:#7a9ab8;}
        .sg-input{background:#071524;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:0.63rem 0.85rem;color:#d8e4ec;font-size:0.87rem;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.18s;width:100%;}
        .sg-input:focus{border-color:#e8c87d;}
        .sg-textarea{resize:none;line-height:1.6;}
        .sg-cc{font-size:0.7rem;color:#2a3a48;text-align:right;}
        .sg-panel-foot{padding-top:1rem;border-top:1px solid rgba(255,255,255,0.07);margin-top:1rem;display:flex;justify-content:flex-end;}
        .sg-btn{display:inline-flex;align-items:center;gap:0.4rem;padding:0.6rem 1.3rem;border-radius:8px;font-size:0.87rem;font-weight:600;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all 0.18s;}
        .sg-btn--gold{background:#e8c87d;color:#1a0e05;}
        .sg-btn--gold:hover{background:#f0d698;box-shadow:0 5px 18px rgba(232,200,125,0.28);}
        .sg-btn--danger{background:rgba(231,76,60,0.1);color:#e74c3c;border:1px solid rgba(231,76,60,0.3);}
        .sg-btn--danger:hover{background:rgba(231,76,60,0.18);}
        .sg-toggle-row{display:flex;justify-content:space-between;align-items:center;padding:0.85rem 0;border-bottom:1px solid rgba(255,255,255,0.05);}
        .sg-toggle-row strong{display:block;font-size:0.85rem;color:#d8e4ec;margin-bottom:0.16rem;}
        .sg-toggle-row p{font-size:0.75rem;color:#3a5060;}
        .sg-toggle{width:40px;height:23px;border-radius:100px;background:rgba(255,255,255,0.1);border:none;cursor:pointer;position:relative;transition:background 0.2s;flex-shrink:0;}
        .sg-toggle.on{background:#e8c87d;}
        .sg-toggle__knob{position:absolute;width:17px;height:17px;border-radius:50%;background:white;top:3px;left:3px;transition:transform 0.2s;box-shadow:0 1px 4px rgba(0,0,0,0.3);}
        .sg-toggle.on .sg-toggle__knob{transform:translateX(17px);}
        .sg-info-box{display:flex;align-items:flex-start;gap:0.6rem;background:rgba(184,169,232,0.06);border:1px solid rgba(184,169,232,0.18);border-radius:9px;padding:0.7rem;font-size:0.77rem;color:#7a9ab8;line-height:1.6;margin-top:1rem;}
        .sg-info-box strong{color:#b8a9e8;}
        .sg-err{font-size:0.77rem;color:#e74c3c;margin-bottom:0.5rem;}
        .sg-sec-block{padding:1.1rem 0;border-bottom:1px solid rgba(255,255,255,0.07);}
        .sg-sec-block:last-child{border-bottom:none;}
        .sg-sec-block__title{font-size:0.82rem;font-weight:600;color:#d8e4ec;margin-bottom:0.9rem;}
        .sg-sec-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.7rem;}
        .sg-sec-item{background:#071524;border-radius:8px;padding:0.72rem;}
        .sg-sec-item span{display:block;font-size:0.7rem;color:#3a5060;margin-bottom:0.18rem;}
        .sg-sec-item strong{font-size:0.84rem;}
        .sg-danger-zone{background:rgba(231,76,60,0.05);border:1px solid rgba(231,76,60,0.2);border-radius:10px;padding:1rem;margin-top:1.1rem;}
        .sg-danger-zone__title{font-size:0.77rem;font-weight:700;color:#e74c3c;margin-bottom:0.7rem;}
        .sg-danger-row{display:flex;align-items:center;justify-content:space-between;gap:1rem;}
        .sg-danger-row strong{display:block;font-size:0.85rem;color:#f0ece4;margin-bottom:0.18rem;}
        .sg-danger-row p{font-size:0.75rem;color:#5a7a8e;}
        .sg-radio-group{display:flex;gap:0.4rem;}
        .sg-radio-btn{padding:0.4rem 0.85rem;border-radius:7px;font-size:0.81rem;background:#071524;border:1px solid rgba(255,255,255,0.1);color:#4a6070;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;}
        .sg-radio-btn:hover{border-color:rgba(232,200,125,0.3);color:#d8e4ec;}
        .sg-radio-btn.active{background:rgba(232,200,125,0.12);color:#e8c87d;border-color:rgba(232,200,125,0.35);}
        @media(max-width:860px){.sg-sidebar{display:none;}.sg-main{margin-left:0;padding:1.5rem;}.sg-layout{grid-template-columns:1fr;}.sg-settings-nav{position:static;flex-direction:row;flex-wrap:wrap;}.sg-grid2{grid-template-columns:1fr;}.sg-sec-grid{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}
