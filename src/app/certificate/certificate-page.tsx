"use client";
import { useState } from "react";

export default function CertificatePage() {
  const [downloading, setDownloading] = useState(false);
  const [shared, setShared] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => { setDownloading(false); alert("In production: PDF certificate downloads here."); }, 1800);
  };

  return (
    <div className="cc-root">
      <div className="cc-bg"><div className="cc-orb cc-orb--1"/><div className="cc-orb cc-orb--2"/></div>

      <aside className="cc-sidebar">
        <div className="cc-logo"><span>✦</span><span>ScriptMaster</span></div>
        <nav className="cc-nav">
          {[["📋","My Tasks","/student"],["📊","Progress","/student/dashboard"],["🔔","Notifications","/student/notifications"],["🏆","Certificates","/certificate"],["📚","Training","/training"],["⚙️","Settings","/settings"]].map(([icon,label,href]) => (
            <a key={label as string} href={href as string} className={`cc-nav-item ${label==="Certificates"?"active":""}`}><span>{icon as string}</span>{label as string}</a>
          ))}
        </nav>
        <div className="cc-profile"><div className="cc-avatar">A</div><div><strong>Amara Osei</strong><span>Student</span></div></div>
      </aside>

      <main className="cc-main">
        <h1 className="cc-title">My Certificates</h1>
        <p className="cc-sub">Certificates you have earned through ScriptMaster. Download and share them on LinkedIn, CV, or social media.</p>

        {/* EARNED CERTIFICATE */}
        <div className="cc-cert-showcase">
          <div className="cc-cert-frame">
            <div className="cc-cert-corner cc-cert-corner--tl"/>
            <div className="cc-cert-corner cc-cert-corner--tr"/>
            <div className="cc-cert-corner cc-cert-corner--bl"/>
            <div className="cc-cert-corner cc-cert-corner--br"/>
            <div className="cc-cert-top-bar"/>
            <div className="cc-cert-logo">✦ ScriptMaster</div>
            <div className="cc-cert-presents">This certifies that</div>
            <div className="cc-cert-name">Amara Osei</div>
            <div className="cc-cert-has">has successfully completed the</div>
            <div className="cc-cert-course">Writing Fundamentals</div>
            <div className="cc-cert-track">Professional Writing Track</div>
            <div className="cc-cert-desc">Demonstrating proficiency in essay writing, story writing, report writing, and critical reviews with a final average score of <strong>87%</strong></div>
            <div className="cc-cert-meta">
              <div><span>Issue Date</span><strong>March 2025</strong></div>
              <div className="cc-cert-seal">✦</div>
              <div><span>Certificate ID</span><strong>SM-2025-AO-1041</strong></div>
            </div>
            <div className="cc-cert-sig">
              <div><div className="cc-cert-sig-line"/><span>Ms. Adaeze O.</span><span>Lead Instructor</span></div>
              <div><div className="cc-cert-sig-line"/><span>ScriptMaster Platform</span><span>Director</span></div>
            </div>
            <div className="cc-cert-bottom-bar"/>
          </div>

          <div className="cc-cert-actions">
            <div className="cc-cert-info-grid">
              <div className="cc-cert-info-item"><span>Status</span><strong style={{color:"#9ecfb8"}}>✅ Earned</strong></div>
              <div className="cc-cert-info-item"><span>Average Score</span><strong style={{color:"#e8c87d"}}>87%</strong></div>
              <div className="cc-cert-info-item"><span>Tasks Completed</span><strong>3 / 3</strong></div>
              <div className="cc-cert-info-item"><span>Certificate ID</span><strong style={{fontSize:"0.75rem"}}>SM-2025-AO-1041</strong></div>
            </div>
            <button className="cc-btn cc-btn--gold" onClick={handleDownload} disabled={downloading}>
              {downloading ? <><span className="cc-spin"/>Generating PDF…</> : "⬇ Download Certificate PDF"}
            </button>
            <button className="cc-btn cc-btn--ghost" onClick={() => { setShared(true); setTimeout(()=>setShared(false),3000); }}>
              {shared ? "✅ Link Copied!" : "🔗 Share Certificate Link"}
            </button>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="cc-btn cc-btn--ghost">in Add to LinkedIn Profile →</a>
          </div>
        </div>

        {/* LOCKED CERTIFICATES */}
        <h2 className="cc-section-title">🔒 More Certificates to Earn</h2>
        <div className="cc-locked-grid">
          {[
            {name:"Advanced Essay Writing",desc:"Complete 3 advanced essay tasks with an average score of 80% or above.",tasks:"0/3 tasks"},
            {name:"Creative Storytelling",desc:"Complete 3 story writing tasks. Demonstrate narrative skill, vivid description, and dialogue.",tasks:"0/3 tasks"},
            {name:"Professional Reporting",desc:"Complete 3 report writing tasks with proper structure, data citation, and formatting.",tasks:"0/3 tasks"},
          ].map((c,i) => (
            <div key={i} className="cc-locked-card">
              <div className="cc-locked-icon">🔒</div>
              <div className="cc-locked-name">{c.name}</div>
              <p className="cc-locked-desc">{c.desc}</p>
              <div className="cc-locked-progress">{c.tasks}</div>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .cc-root{font-family:'DM Sans',sans-serif;background:#071524;color:#d8e4ec;min-height:100vh;display:flex;overflow-x:hidden;}
        .cc-bg{position:fixed;inset:0;pointer-events:none;z-index:0;}
        .cc-orb{position:absolute;border-radius:50%;filter:blur(90px);}
        .cc-orb--1{width:500px;height:500px;background:#0f3050;top:-100px;right:-100px;opacity:0.5;}
        .cc-orb--2{width:350px;height:350px;background:#1a1a20;bottom:10%;left:-80px;opacity:0.35;}
        .cc-sidebar{width:215px;flex-shrink:0;background:#0a1e2e;border-right:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;}
        .cc-logo{display:flex;align-items:center;gap:0.5rem;padding:1.3rem 1.3rem 1.6rem;font-family:'Lora',serif;font-size:1.1rem;font-weight:700;color:#e8c87d;border-bottom:1px solid rgba(255,255,255,0.06);}
        .cc-nav{display:flex;flex-direction:column;gap:0.1rem;padding:1rem 0.5rem;flex:1;}
        .cc-nav-item{display:flex;align-items:center;gap:0.65rem;padding:0.58rem 0.75rem;border-radius:7px;font-size:0.86rem;color:#4a6070;text-decoration:none;transition:all 0.15s;}
        .cc-nav-item:hover{background:rgba(255,255,255,0.04);color:#d8e4ec;}
        .cc-nav-item.active{background:rgba(232,200,125,0.1);color:#e8c87d;font-weight:500;}
        .cc-profile{display:flex;align-items:center;gap:0.65rem;padding:0.8rem 1rem;border-top:1px solid rgba(255,255,255,0.06);margin-top:auto;}
        .cc-avatar{width:30px;height:30px;border-radius:50%;background:#e8c87d;color:#1a0e05;font-size:0.78rem;font-weight:700;display:flex;align-items:center;justify-content:center;}
        .cc-profile strong{display:block;font-size:0.82rem;color:#d8e4ec;}
        .cc-profile span{font-size:0.7rem;color:#3a5060;}
        .cc-main{margin-left:215px;padding:2rem 2.5rem 4rem;position:relative;z-index:1;min-height:100vh;}
        .cc-title{font-family:'Lora',serif;font-size:1.75rem;font-weight:700;color:#f0ece4;margin-bottom:0.3rem;}
        .cc-sub{font-size:0.82rem;color:#3a5060;margin-bottom:2rem;}
        .cc-cert-showcase{display:grid;grid-template-columns:1fr 280px;gap:2rem;align-items:start;margin-bottom:3rem;}
        /* Certificate Frame */
        .cc-cert-frame{background:linear-gradient(135deg,#0d1e2e 0%,#091828 50%,#0d1e2e 100%);border:1px solid rgba(232,200,125,0.35);border-radius:16px;padding:3rem 2.5rem;position:relative;overflow:hidden;box-shadow:0 20px 80px rgba(0,0,0,0.5),inset 0 1px 0 rgba(232,200,125,0.15);}
        .cc-cert-corner{position:absolute;width:24px;height:24px;border-color:#e8c87d;border-style:solid;opacity:0.6;}
        .cc-cert-corner--tl{top:12px;left:12px;border-width:2px 0 0 2px;}
        .cc-cert-corner--tr{top:12px;right:12px;border-width:2px 2px 0 0;}
        .cc-cert-corner--bl{bottom:12px;left:12px;border-width:0 0 2px 2px;}
        .cc-cert-corner--br{bottom:12px;right:12px;border-width:0 2px 2px 0;}
        .cc-cert-top-bar{height:3px;background:linear-gradient(90deg,transparent,#e8c87d,transparent);margin-bottom:2rem;opacity:0.6;}
        .cc-cert-logo{font-family:'Lora',serif;font-size:1rem;font-weight:700;color:#e8c87d;text-align:center;margin-bottom:1.5rem;letter-spacing:0.05em;}
        .cc-cert-presents{font-size:0.8rem;color:#6a8090;text-align:center;margin-bottom:0.5rem;letter-spacing:0.08em;text-transform:uppercase;}
        .cc-cert-name{font-family:'Lora',serif;font-size:2.2rem;font-weight:700;color:#f0ece4;text-align:center;margin-bottom:0.5rem;font-style:italic;}
        .cc-cert-has{font-size:0.82rem;color:#6a8090;text-align:center;margin-bottom:0.5rem;}
        .cc-cert-course{font-family:'Lora',serif;font-size:1.5rem;font-weight:700;color:#e8c87d;text-align:center;margin-bottom:0.2rem;}
        .cc-cert-track{font-size:0.78rem;color:#5a7a8e;text-align:center;margin-bottom:1.2rem;letter-spacing:0.06em;text-transform:uppercase;}
        .cc-cert-desc{font-size:0.8rem;color:#6a8090;text-align:center;line-height:1.65;margin-bottom:1.5rem;max-width:380px;margin-left:auto;margin-right:auto;}
        .cc-cert-desc strong{color:#e8c87d;}
        .cc-cert-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;}
        .cc-cert-meta div span{display:block;font-size:0.68rem;color:#3a5060;margin-bottom:0.18rem;text-transform:uppercase;letter-spacing:0.06em;}
        .cc-cert-meta div strong{font-size:0.82rem;color:#d8e4ec;}
        .cc-cert-seal{font-size:2rem;color:#e8c87d;opacity:0.5;}
        .cc-cert-sig{display:flex;justify-content:space-around;margin-bottom:1.5rem;}
        .cc-cert-sig>div{display:flex;flex-direction:column;align-items:center;gap:0.25rem;}
        .cc-cert-sig-line{width:100px;height:1px;background:rgba(232,200,125,0.3);}
        .cc-cert-sig span:nth-child(2){font-size:0.8rem;color:#d8e4ec;}
        .cc-cert-sig span:nth-child(3){font-size:0.7rem;color:#3a5060;}
        .cc-cert-bottom-bar{height:3px;background:linear-gradient(90deg,transparent,#e8c87d,transparent);opacity:0.6;}
        /* Actions */
        .cc-cert-actions{display:flex;flex-direction:column;gap:0.75rem;}
        .cc-cert-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;margin-bottom:0.5rem;}
        .cc-cert-info-item{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:9px;padding:0.7rem;}
        .cc-cert-info-item span{display:block;font-size:0.7rem;color:#3a5060;margin-bottom:0.18rem;}
        .cc-cert-info-item strong{font-size:0.85rem;color:#d8e4ec;}
        .cc-btn{display:flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.65rem 1rem;border-radius:9px;font-size:0.86rem;font-weight:600;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all 0.18s;text-decoration:none;text-align:center;}
        .cc-btn--gold{background:#e8c87d;color:#1a0e05;}
        .cc-btn--gold:hover:not(:disabled){background:#f0d698;}
        .cc-btn--gold:disabled{opacity:0.6;cursor:not-allowed;}
        .cc-btn--ghost{background:transparent;color:#8aa5b8;border:1px solid rgba(255,255,255,0.12);}
        .cc-btn--ghost:hover{border-color:#e8c87d;color:#e8c87d;}
        .cc-spin{width:14px;height:14px;border:2px solid rgba(26,14,5,0.3);border-top-color:#1a0e05;border-radius:50%;animation:spin 0.7s linear infinite;}
        @keyframes spin{to{transform:rotate(360deg)}}
        .cc-section-title{font-family:'Lora',serif;font-size:1.15rem;font-weight:700;color:#f0ece4;margin-bottom:1rem;}
        .cc-locked-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
        .cc-locked-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:13px;padding:1.3rem;opacity:0.6;}
        .cc-locked-icon{font-size:1.5rem;margin-bottom:0.5rem;}
        .cc-locked-name{font-size:0.9rem;font-weight:600;color:#d8e4ec;margin-bottom:0.4rem;}
        .cc-locked-desc{font-size:0.78rem;color:#4a6070;line-height:1.65;margin-bottom:0.6rem;}
        .cc-locked-progress{font-size:0.75rem;color:#3a5060;font-weight:600;}
        @media(max-width:900px){.cc-cert-showcase{grid-template-columns:1fr;}.cc-locked-grid{grid-template-columns:1fr 1fr;}}
        @media(max-width:760px){.cc-sidebar{display:none;}.cc-main{margin-left:0;padding:1.5rem;}.cc-locked-grid{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}
