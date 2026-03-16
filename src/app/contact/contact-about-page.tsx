"use client";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"contact"|"about">("contact");

  const handleSend = () => {
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    if (!message.trim() || message.length < 10) { setError("Please write a message (min 10 characters)."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1600);
  };

  return (
    <div className="ct-root">
      <div className="ct-bg"><div className="ct-orb ct-orb--1"/><div className="ct-orb ct-orb--2"/></div>

      <header className="ct-header">
        <a href="/" className="ct-logo"><span className="ct-mark">✦</span><span>ScriptMaster</span></a>
        <nav className="ct-nav">
          <a href="/#how">How It Works</a>
          <a href="/#pricing">Pricing</a>
          <a href="/rules">Rules</a>
          <a href="/training">Free Training</a>
        </nav>
        <div className="ct-header-actions">
          <a href="/login" className="ct-btn ct-btn--ghost ct-btn--sm">Login</a>
          <a href="/register" className="ct-btn ct-btn--gold ct-btn--sm">Buy Account</a>
        </div>
      </header>

      <main className="ct-main">
        <div className="ct-page-tabs">
          <button className={`ct-ptab ${tab==="contact"?"active":""}`} onClick={() => setTab("contact")}>💬 Contact Us</button>
          <button className={`ct-ptab ${tab==="about"?"active":""}`} onClick={() => setTab("about")}>📖 About ScriptMaster</button>
        </div>

        {tab === "contact" && (
          <div className="ct-layout">
            <div className="ct-form-col">
              <h1 className="ct-title">Get in Touch</h1>
              <p className="ct-sub">Questions, support, or feedback — we read every message and respond within 24 hours.</p>

              {!sent ? (
                <>
                  <div className="ct-grid-2">
                    <div className="ct-field"><label>Your Name <span>*</span></label><input className="ct-input" placeholder="Amara Osei" value={name} onChange={e=>{setName(e.target.value);setError("");}}/></div>
                    <div className="ct-field"><label>Email Address <span>*</span></label><input className="ct-input" type="email" placeholder="you@example.com" value={email} onChange={e=>{setEmail(e.target.value);setError("");}}/></div>
                  </div>
                  <div className="ct-field">
                    <label>Subject</label>
                    <select className="ct-input" value={subject} onChange={e=>setSubject(e.target.value)}>
                      {["General Inquiry","Account Support","Payment Issue","Bug Report","Appeal a Decision","Teacher Application","Other"].map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="ct-field">
                    <label>Message <span>*</span></label>
                    <textarea className="ct-input ct-textarea" rows={5} placeholder="Describe your question or issue in detail…" value={message} onChange={e=>{setMessage(e.target.value);setError("");}}/>
                    <div className="ct-char-count">{message.length} characters</div>
                  </div>
                  {error && <div className="ct-error">{error}</div>}
                  <button className="ct-btn ct-btn--gold ct-btn--submit" onClick={handleSend} disabled={loading}>
                    {loading?<><span className="ct-spin"/>Sending…</>:"Send Message →"}
                  </button>
                </>
              ) : (
                <div className="ct-sent">
                  <div className="ct-sent__icon">✅</div>
                  <h3>Message Sent!</h3>
                  <p>Thanks {name.split(" ")[0]}! We'll reply to <strong>{email}</strong> within 24 hours.</p>
                  <button className="ct-btn ct-btn--ghost" onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }}>Send Another Message</button>
                </div>
              )}
            </div>

            <div className="ct-info-col">
              <div className="ct-info-card">
                <div className="ct-info-card__title">📬 Contact Methods</div>
                {[
                  {icon:"📧", label:"General Support", val:"support@scriptmaster.com"},
                  {icon:"⚖️", label:"Appeals", val:"appeals@scriptmaster.com"},
                  {icon:"💳", label:"Payment Issues", val:"billing@scriptmaster.com"},
                  {icon:"⏱", label:"Response Time", val:"Within 24 hours"},
                ].map(c => (
                  <div key={c.label} className="ct-contact-row">
                    <span className="ct-contact-icon">{c.icon}</span>
                    <div><span className="ct-contact-label">{c.label}</span><span className="ct-contact-val">{c.val}</span></div>
                  </div>
                ))}
              </div>
              <div className="ct-info-card ct-faq-card">
                <div className="ct-info-card__title">❓ Quick Answers</div>
                {[
                  ["Is training really free?","Yes — all lessons and training materials are 100% free forever."],
                  ["How do I buy my account?","Click 'Buy Account' and pay $12 once. Access is yours for life."],
                  ["What if I'm wrongly banned?","Email appeals@scriptmaster.com within 7 days of the ban."],
                  ["How does ScriptGuard work?","AI scans every submission for AI-generated content and plagiarism."],
                ].map(([q,a]) => (
                  <div key={q as string} className="ct-faq-row">
                    <div className="ct-faq-q">{q as string}</div>
                    <div className="ct-faq-a">{a as string}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "about" && (
          <div className="ct-about">
            <div className="ct-about-hero">
              <h1 className="ct-about-title">About ScriptMaster</h1>
              <p className="ct-about-lead">A writing platform built for serious students. Learn free. Get certified. Write better.</p>
            </div>

            <div className="ct-about-grid">
              <div className="ct-about-card">
                <div className="ct-about-card__icon">🎓</div>
                <h3>Our Mission</h3>
                <p>ScriptMaster exists to make quality writing education accessible to every student — regardless of location or budget. All training is free. The $12 account is a one-time commitment that gives you access to real tasks, personal teacher feedback, and a certificate to show the world.</p>
              </div>
              <div className="ct-about-card">
                <div className="ct-about-card__icon">🤖</div>
                <h3>ScriptGuard AI</h3>
                <p>Every submission on ScriptMaster is scanned by our in-house AI moderation system before it reaches a teacher. ScriptGuard detects AI-generated content, plagiarism, and copy-paste violations — ensuring the platform remains a place for genuine learning and honest writing.</p>
              </div>
              <div className="ct-about-card">
                <div className="ct-about-card__icon">👩‍🏫</div>
                <h3>Real Human Teachers</h3>
                <p>Behind every grade is a real teacher with expertise in writing. Our instructors provide personal, detailed feedback on every submission — not just a score. That human touch is what makes ScriptMaster different from any other platform.</p>
              </div>
              <div className="ct-about-card">
                <div className="ct-about-card__icon">🌍</div>
                <h3>Built for Africa</h3>
                <p>ScriptMaster was designed with students across Africa in mind — affordable, accessible, and relevant. Our task topics and teaching examples reflect real experiences and real communities. We are proud to serve students from Lagos to Nairobi to Accra and beyond.</p>
              </div>
            </div>

            <div className="ct-stats-row">
              {[["1,284+","Students enrolled"],["$12","One-time — no subscriptions"],["940+","Certificates issued"],["99.2%","AI compliance rate"]].map(([v,l]) => (
                <div key={l as string} className="ct-stat-item">
                  <strong>{v as string}</strong>
                  <span>{l as string}</span>
                </div>
              ))}
            </div>

            <div className="ct-team">
              <h2>Our Team</h2>
              <div className="ct-team-grid">
                {[
                  {name:"Ms. Adaeze Okonkwo",role:"Lead Writing Instructor",av:"AO"},
                  {name:"Mr. Samuel Kimani",role:"Essay & Report Specialist",av:"SK"},
                  {name:"Ms. Fatima Musa",role:"Story Writing Tutor",av:"FM"},
                  {name:"Mr. David Mensah",role:"Platform Director",av:"DM"},
                ].map(t => (
                  <div key={t.name} className="ct-team-card">
                    <div className="ct-team-av">{t.av}</div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="ct-footer">
        <div className="ct-footer-row">
          <div className="ct-footer-logo"><span>✦</span><span>ScriptMaster</span></div>
          <div className="ct-footer-links">
            <a href="/">Home</a><a href="/rules">Rules</a><a href="/training">Training</a><a href="/register">Buy Account</a><a href="/contact">Contact</a>
          </div>
        </div>
        <div className="ct-footer-bottom"><span>© 2025 ScriptMaster. All rights reserved.</span><span>🤖 Powered by ScriptGuard AI</span></div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        .ct-root{font-family:'DM Sans',sans-serif;background:#071524;color:#d8e4ec;min-height:100vh;display:flex;flex-direction:column;position:relative;overflow-x:hidden;}
        .ct-bg{position:fixed;inset:0;pointer-events:none;z-index:0;}
        .ct-orb{position:absolute;border-radius:50%;filter:blur(90px);}
        .ct-orb--1{width:600px;height:600px;background:#0f3050;top:-200px;right:-150px;opacity:0.6;}
        .ct-orb--2{width:400px;height:400px;background:#1a1a40;bottom:5%;left:-100px;opacity:0.42;}
        .ct-header{display:flex;align-items:center;gap:2rem;padding:1.1rem 4rem;background:rgba(7,21,36,0.92);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,0.06);position:sticky;top:0;z-index:100;}
        .ct-logo{display:flex;align-items:center;gap:0.5rem;text-decoration:none;margin-right:auto;}
        .ct-mark{color:#e8c87d;}
        .ct-logo span:last-child{font-family:'Lora',serif;font-size:1.2rem;font-weight:700;color:#e8c87d;}
        .ct-nav{display:flex;gap:1.75rem;}
        .ct-nav a{font-size:0.88rem;color:#5a7a8e;text-decoration:none;transition:color 0.15s;}
        .ct-nav a:hover{color:#e8c87d;}
        .ct-header-actions{display:flex;gap:0.6rem;}
        .ct-main{flex:1;padding:3rem 4rem 5rem;position:relative;z-index:1;max-width:1200px;margin:0 auto;width:100%;}
        .ct-page-tabs{display:flex;gap:0.5rem;margin-bottom:2.5rem;background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:0.3rem;width:fit-content;}
        .ct-ptab{padding:0.55rem 1.3rem;border-radius:8px;font-size:0.88rem;background:transparent;border:none;color:#4a6070;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;transition:all 0.15s;}
        .ct-ptab.active{background:#e8c87d;color:#1a0e05;font-weight:600;}
        .ct-layout{display:grid;grid-template-columns:1fr 340px;gap:2.5rem;align-items:start;}
        .ct-title{font-family:'Lora',serif;font-size:2rem;font-weight:700;color:#f0ece4;margin-bottom:0.5rem;}
        .ct-sub{font-size:0.88rem;color:#4a6070;margin-bottom:2rem;line-height:1.65;}
        .ct-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
        .ct-field{display:flex;flex-direction:column;gap:0.38rem;margin-bottom:1rem;}
        .ct-field label{font-size:0.78rem;font-weight:500;color:#7a9ab8;}
        .ct-field label span{color:#e74c3c;}
        .ct-input{background:#0a1e2e;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:0.65rem 0.9rem;color:#d8e4ec;font-size:0.88rem;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.18s;width:100%;}
        .ct-input:focus{border-color:#e8c87d;}
        .ct-textarea{resize:vertical;line-height:1.65;}
        .ct-char-count{font-size:0.7rem;color:#2a3a48;text-align:right;}
        .ct-error{background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);color:#e74c3c;font-size:0.8rem;padding:0.5rem 0.75rem;border-radius:7px;margin-bottom:0.75rem;}
        .ct-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.65rem 1.3rem;border-radius:8px;font-size:0.9rem;font-weight:600;text-decoration:none;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all 0.18s;}
        .ct-btn--sm{padding:0.42rem 0.9rem;font-size:0.82rem;}
        .ct-btn--gold{background:#e8c87d;color:#1a0e05;}
        .ct-btn--gold:hover:not(:disabled){background:#f0d698;}
        .ct-btn--gold:disabled{opacity:0.6;cursor:not-allowed;}
        .ct-btn--ghost{background:transparent;color:#8aa5b8;border:1px solid rgba(255,255,255,0.12);}
        .ct-btn--ghost:hover{border-color:#e8c87d;color:#e8c87d;}
        .ct-btn--submit{width:100%;padding:0.8rem;}
        .ct-spin{width:14px;height:14px;border:2px solid rgba(26,14,5,0.3);border-top-color:#1a0e05;border-radius:50%;animation:spin 0.7s linear infinite;}
        @keyframes spin{to{transform:rotate(360deg)}}
        .ct-sent{background:#0a1e2e;border:1px solid rgba(158,207,184,0.3);border-radius:14px;padding:2rem;text-align:center;}
        .ct-sent__icon{font-size:2.5rem;margin-bottom:0.75rem;}
        .ct-sent h3{font-family:'Lora',serif;font-size:1.3rem;color:#f0ece4;margin-bottom:0.5rem;}
        .ct-sent p{font-size:0.84rem;color:#5a7a8e;margin-bottom:1.25rem;line-height:1.65;}
        .ct-sent strong{color:#e8c87d;}
        .ct-info-col{display:flex;flex-direction:column;gap:1.1rem;}
        .ct-info-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:1.3rem;}
        .ct-info-card__title{font-size:0.72rem;text-transform:uppercase;letter-spacing:0.08em;color:#e8c87d;margin-bottom:1rem;}
        .ct-contact-row{display:flex;align-items:flex-start;gap:0.7rem;padding:0.6rem 0;border-bottom:1px solid rgba(255,255,255,0.05);}
        .ct-contact-row:last-child{border-bottom:none;}
        .ct-contact-icon{font-size:1.1rem;flex-shrink:0;margin-top:2px;}
        .ct-contact-label{display:block;font-size:0.75rem;color:#4a6070;margin-bottom:0.1rem;}
        .ct-contact-val{font-size:0.82rem;color:#d8e4ec;}
        .ct-faq-row{padding:0.65rem 0;border-bottom:1px solid rgba(255,255,255,0.05);}
        .ct-faq-row:last-child{border-bottom:none;}
        .ct-faq-q{font-size:0.82rem;font-weight:600;color:#d8e4ec;margin-bottom:0.25rem;}
        .ct-faq-a{font-size:0.78rem;color:#5a7a8e;line-height:1.6;}
        /* ABOUT */
        .ct-about{max-width:900px;}
        .ct-about-hero{margin-bottom:2.5rem;}
        .ct-about-title{font-family:'Lora',serif;font-size:2.2rem;font-weight:700;color:#f0ece4;margin-bottom:0.75rem;}
        .ct-about-lead{font-size:1.05rem;color:#5a7a8e;line-height:1.75;}
        .ct-about-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:2.5rem;}
        .ct-about-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:1.5rem;}
        .ct-about-card__icon{font-size:1.8rem;margin-bottom:0.7rem;}
        .ct-about-card h3{font-family:'Lora',serif;font-size:1.05rem;font-weight:700;color:#f0ece4;margin-bottom:0.5rem;}
        .ct-about-card p{font-size:0.84rem;color:#5a7a8e;line-height:1.7;}
        .ct-stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;background:#0a1e2e;border:1px solid rgba(232,200,125,0.18);border-radius:14px;padding:1.5rem 2rem;margin-bottom:2.5rem;}
        .ct-stat-item{text-align:center;}
        .ct-stat-item strong{display:block;font-family:'Lora',serif;font-size:1.7rem;font-weight:700;color:#e8c87d;margin-bottom:0.3rem;}
        .ct-stat-item span{font-size:0.78rem;color:#4a6070;}
        .ct-team h2{font-family:'Lora',serif;font-size:1.3rem;font-weight:700;color:#f0ece4;margin-bottom:1.2rem;}
        .ct-team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}
        .ct-team-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:1.3rem;text-align:center;}
        .ct-team-av{width:44px;height:44px;border-radius:50%;background:#e8c87d;color:#1a0e05;font-size:0.88rem;font-weight:700;display:flex;align-items:center;justify-content:center;margin:0 auto 0.7rem;}
        .ct-team-card strong{display:block;font-size:0.85rem;color:#d8e4ec;margin-bottom:0.2rem;}
        .ct-team-card span{font-size:0.75rem;color:#3a5060;}
        .ct-footer{position:relative;z-index:1;padding:1.5rem 4rem;border-top:1px solid rgba(255,255,255,0.06);}
        .ct-footer-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:1rem;}
        .ct-footer-logo{display:flex;align-items:center;gap:0.5rem;font-family:'Lora',serif;font-size:1rem;font-weight:700;color:#e8c87d;}
        .ct-footer-links{display:flex;gap:1.5rem;flex-wrap:wrap;}
        .ct-footer-links a{font-size:0.82rem;color:#3a5060;text-decoration:none;transition:color 0.15s;}
        .ct-footer-links a:hover{color:#e8c87d;}
        .ct-footer-bottom{display:flex;justify-content:space-between;font-size:0.75rem;color:#2a3a48;flex-wrap:wrap;gap:0.5rem;}
        @media(max-width:860px){.ct-header{padding:1rem;}.ct-main{padding:2rem 1.5rem;}.ct-layout{grid-template-columns:1fr;}.ct-info-col{display:none;}.ct-about-grid{grid-template-columns:1fr;}.ct-stats-row{grid-template-columns:1fr 1fr;}.ct-team-grid{grid-template-columns:1fr 1fr;}.ct-footer{padding:1.2rem;}}
      `}</style>
    </div>
  );
}
