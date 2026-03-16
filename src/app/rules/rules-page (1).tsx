"use client";
import { useState } from "react";

const rules = [
  {
    num: "01",
    icon: "📋",
    title: "Account Must Be Purchased",
    short: "Purchase Required",
    desc: "Every student must purchase an account ($12 one-time) before they can receive tasks, submit work, or access the student dashboard. Free training is available to all, but task participation requires a paid account.",
    consequence: "Access Denied",
    consequenceColor: "#f4a97f",
    detail: "Attempting to access task content without a purchased account will result in immediate redirection to the payment page. Sharing or borrowing another student's login also violates this rule.",
    level: "hard",
  },
  {
    num: "02",
    icon: "🚫",
    title: "No Plagiarism or Copied Work",
    short: "Original Work Only",
    desc: "Every submission must be entirely your own original writing. Copying from the internet, books, AI tools, or other students is strictly forbidden. ScriptGuard AI scans every submission for originality before it reaches your teacher.",
    consequence: "Permanent Ban",
    consequenceColor: "#e74c3c",
    detail: "First offence: submission voided, formal warning issued. Second offence: account permanently banned with no refund. AI-generated submissions are treated as plagiarism.",
    level: "critical",
  },
  {
    num: "03",
    icon: "🤐",
    title: "No Abusive or Offensive Language",
    short: "Respectful Communication",
    desc: "All communication on ScriptMaster — including submissions, feedback responses, and any community features — must be respectful and professional. Offensive, threatening, or discriminatory language of any kind is not tolerated.",
    consequence: "Warning → Ban",
    consequenceColor: "#e8c87d",
    detail: "First offence: formal warning and content removal. Second offence: 14-day account suspension. Third offence: permanent ban. Severe cases (threats, hate speech) result in immediate permanent ban.",
    level: "high",
  },
  {
    num: "04",
    icon: "🔒",
    title: "No Sharing Task Answers",
    short: "Keep Answers Private",
    desc: "Task prompts, answers, and submissions must never be shared publicly, privately, or via any platform. Sharing task content with other students — whether past or present — undermines the learning process and violates academic integrity.",
    consequence: "Account Restricted",
    consequenceColor: "#b8a9e8",
    detail: "First offence: task grade voided and 7-day restriction from new tasks. Second offence: account suspended for 30 days. Third offence: permanent ban. Receiving shared answers carries the same penalty as sharing them.",
    level: "high",
  },
  {
    num: "05",
    icon: "👤",
    title: "One Account Per Student Only",
    short: "No Duplicate Accounts",
    desc: "Each student is permitted exactly one account. Creating multiple accounts — whether to bypass a suspension, share access, or for any other reason — is a serious violation. ScriptGuard AI cross-checks device fingerprints and IP addresses to detect duplicates.",
    consequence: "All Accounts Banned",
    consequenceColor: "#e74c3c",
    detail: "All duplicate accounts will be permanently banned immediately, including any previously active accounts. No refunds are issued for banned duplicate accounts.",
    level: "critical",
  },
];

const levelBadge: Record<string, { label: string; bg: string; color: string }> = {
  hard:     { label: "Enforced",      bg: "rgba(244,169,127,0.12)", color: "#f4a97f" },
  high:     { label: "Strictly Enforced", bg: "rgba(232,200,125,0.12)", color: "#e8c87d" },
  critical: { label: "Zero Tolerance", bg: "rgba(231,76,60,0.12)",  color: "#e74c3c" },
};

export default function RulesPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="rl-root">
      {/* BG */}
      <div className="rl-bg" aria-hidden="true">
        <div className="rl-orb rl-orb--1" />
        <div className="rl-orb rl-orb--2" />
      </div>

      {/* HEADER */}
      <header className="rl-header">
        <a href="/" className="rl-logo">
          <span className="rl-logo__mark">✦</span>
          <span>ScriptMaster</span>
        </a>
        <nav className="rl-nav">
          <a href="/">Home</a>
          <a href="/#pricing">Pricing</a>
          <a href="/register">Register</a>
        </nav>
        <a href="/register" className="rl-btn rl-btn--gold rl-btn--sm">Buy Account →</a>
      </header>

      <main className="rl-main">
        {/* PAGE TITLE */}
        <div className="rl-hero">
          <div className="rl-hero__icon">📜</div>
          <div className="rl-section-label">✦ ScriptMaster Community</div>
          <h1 className="rl-title">Student Rules &amp; Code of Conduct</h1>
          <p className="rl-subtitle">
            These rules apply to every student on ScriptMaster. Violations are
            detected and enforced automatically by <strong>ScriptGuard AI</strong>{" "}
            — operating 24 hours a day, 7 days a week.
          </p>
          <div className="rl-hero__badges">
            <span className="rl-badge rl-badge--red">🤖 AI Enforced 24/7</span>
            <span className="rl-badge rl-badge--gold">5 Core Rules</span>
            <span className="rl-badge rl-badge--green">Automatic Bans</span>
          </div>
        </div>

        {/* RULES LIST */}
        <div className="rl-rules">
          {rules.map((rule, i) => {
            const badge = levelBadge[rule.level];
            const open = expanded === i;
            return (
              <div
                key={i}
                className={`rl-rule ${open ? "rl-rule--open" : ""} rl-rule--${rule.level}`}
                onClick={() => setExpanded(open ? null : i)}
              >
                <div className="rl-rule__top">
                  <div className="rl-rule__left">
                    <div className="rl-rule__num">{rule.num}</div>
                    <div className="rl-rule__icon">{rule.icon}</div>
                    <div className="rl-rule__text">
                      <h3>{rule.title}</h3>
                      <p>{rule.desc}</p>
                    </div>
                  </div>
                  <div className="rl-rule__right">
                    <span
                      className="rl-consequence"
                      style={{ background: `${rule.consequenceColor}18`, color: rule.consequenceColor, borderColor: `${rule.consequenceColor}40` }}
                    >
                      {rule.consequence}
                    </span>
                    <span
                      className="rl-level-badge"
                      style={{ background: badge.bg, color: badge.color }}
                    >
                      {badge.label}
                    </span>
                    <span className="rl-expand-icon">{open ? "−" : "+"}</span>
                  </div>
                </div>
                {open && (
                  <div className="rl-rule__detail">
                    <div className="rl-rule__detail-inner">
                      <strong>🤖 Enforcement Detail:</strong> {rule.detail}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CONSEQUENCES TABLE */}
        <div className="rl-table-section">
          <h2 className="rl-section-title">Consequence Summary</h2>
          <div className="rl-table">
            <div className="rl-table__head">
              <span>Violation</span>
              <span>1st Offence</span>
              <span>2nd Offence</span>
              <span>3rd Offence</span>
            </div>
            {[
              ["Unpurchased account access", "Redirected to payment", "Redirected to payment", "IP flagged"],
              ["Plagiarism / copied work",   "Warning + grade void", "Permanent ban",         "—"],
              ["Abusive language",           "Warning + removal",    "14-day suspension",     "Permanent ban"],
              ["Sharing task answers",       "Grade void + 7-day restriction", "30-day suspension", "Permanent ban"],
              ["Duplicate account",          "All accounts banned",  "—",                     "—"],
            ].map((row, i) => (
              <div className="rl-table__row" key={i}>
                {row.map((cell, j) => (
                  <span
                    key={j}
                    className={
                      cell === "Permanent ban" || cell === "All accounts banned"
                        ? "rl-cell--ban"
                        : cell === "—" ? "rl-cell--none" : ""
                    }
                  >
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* APPEAL SECTION */}
        <div className="rl-appeal">
          <div className="rl-appeal__icon">⚖️</div>
          <div>
            <h3>Appeal a Ban or Restriction</h3>
            <p>
              If you believe a ban or restriction was applied in error, you may
              submit a formal appeal within <strong>7 days</strong> of the action.
              Appeals are reviewed by a human moderator within 3 business days.
              Permanent bans for plagiarism and duplicate accounts are generally
              non-reversible.
            </p>
            <a href="mailto:appeals@scriptmaster.com" className="rl-btn rl-btn--ghost rl-btn--sm" style={{marginTop:"1rem",display:"inline-flex"}}>
              Submit an Appeal →
            </a>
          </div>
        </div>

        {/* AGREE + CTA */}
        <div className="rl-agree-section">
          <div className="rl-agree-card">
            <h2>Ready to join ScriptMaster?</h2>
            <p>By purchasing an account you confirm that you have read, understood, and agree to all 5 community rules above. Violations will be enforced automatically.</p>
            <label className="rl-checkbox-label">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="rl-checkbox"
              />
              <span>I have read and agree to all ScriptMaster Community Rules</span>
            </label>
            <a
              href={agreed ? "/register" : "#"}
              className={`rl-btn rl-btn--gold rl-btn--lg rl-btn--full ${!agreed ? "rl-btn--disabled" : ""}`}
              onClick={(e) => { if (!agreed) e.preventDefault(); }}
            >
              Continue to Registration →
            </a>
            <a href="/" className="rl-back-link">← Back to homepage</a>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="rl-footer">
        <span>© 2025 ScriptMaster.</span>
        <span>🤖 Enforced by ScriptGuard AI</span>
        <span><a href="/">Home</a> · <a href="/register">Register</a> · <a href="/teacher">Teacher Login</a></span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

        .rl-root{font-family:'DM Sans',sans-serif;background:#071524;color:#d8e4ec;min-height:100vh;overflow-x:hidden;position:relative;}

        .rl-bg{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
        .rl-orb{position:absolute;border-radius:50%;filter:blur(90px);}
        .rl-orb--1{width:500px;height:500px;background:#0f3050;top:-150px;right:-150px;opacity:0.7;}
        .rl-orb--2{width:350px;height:350px;background:#1a1a3a;bottom:10%;left:-100px;opacity:0.5;}

        .rl-header{position:sticky;top:0;z-index:100;display:flex;align-items:center;gap:2rem;padding:1.1rem 3rem;background:rgba(7,21,36,0.92);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,0.06);}
        .rl-logo{display:flex;align-items:center;gap:0.5rem;text-decoration:none;margin-right:auto;}
        .rl-logo__mark{color:#e8c87d;}
        .rl-logo span:last-child{font-family:'Lora',serif;font-size:1.15rem;font-weight:700;color:#e8c87d;}
        .rl-nav{display:flex;gap:1.8rem;}
        .rl-nav a{color:#6a8090;font-size:0.88rem;text-decoration:none;transition:color 0.18s;}
        .rl-nav a:hover{color:#e8c87d;}

        .rl-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.4rem;padding:0.55rem 1.3rem;border-radius:7px;font-size:0.88rem;font-weight:500;text-decoration:none;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all 0.18s;}
        .rl-btn--sm{padding:0.42rem 1rem;font-size:0.82rem;}
        .rl-btn--lg{padding:0.85rem 1.9rem;font-size:1rem;border-radius:9px;}
        .rl-btn--full{width:100%;justify-content:center;}
        .rl-btn--gold{background:#e8c87d;color:#1a0e05;font-weight:600;}
        .rl-btn--gold:hover{background:#f0d698;box-shadow:0 6px 20px rgba(232,200,125,0.3);}
        .rl-btn--ghost{background:transparent;color:#8aa5b8;border:1px solid rgba(255,255,255,0.15);}
        .rl-btn--ghost:hover{border-color:#e8c87d;color:#e8c87d;}
        .rl-btn--disabled{opacity:0.4;cursor:not-allowed;}
        .rl-btn--disabled:hover{background:#e8c87d;box-shadow:none;}

        .rl-main{position:relative;z-index:1;max-width:860px;margin:0 auto;padding:3rem 2rem 4rem;}

        .rl-hero{text-align:center;margin-bottom:3.5rem;}
        .rl-hero__icon{font-size:3rem;margin-bottom:1rem;}
        .rl-section-label{font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:#e8c87d;margin-bottom:0.75rem;}
        .rl-title{font-family:'Lora',serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:#f0ece4;margin-bottom:1rem;line-height:1.2;}
        .rl-subtitle{font-size:1rem;color:#6a8090;line-height:1.75;max-width:600px;margin:0 auto 1.5rem;}
        .rl-subtitle strong{color:#d8e4ec;}
        .rl-hero__badges{display:flex;justify-content:center;gap:0.75rem;flex-wrap:wrap;}
        .rl-badge{font-size:0.78rem;font-weight:600;padding:0.32rem 0.85rem;border-radius:100px;}
        .rl-badge--red{background:rgba(231,76,60,0.12);color:#e74c3c;border:1px solid rgba(231,76,60,0.3);}
        .rl-badge--gold{background:rgba(232,200,125,0.12);color:#e8c87d;border:1px solid rgba(232,200,125,0.3);}
        .rl-badge--green{background:rgba(158,207,184,0.12);color:#9ecfb8;border:1px solid rgba(158,207,184,0.3);}

        .rl-rules{display:flex;flex-direction:column;gap:0.75rem;margin-bottom:3rem;}
        .rl-rule{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:1.4rem 1.6rem;cursor:pointer;transition:all 0.2s;position:relative;overflow:hidden;}
        .rl-rule::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:transparent;transition:background 0.2s;}
        .rl-rule--critical::before{background:#e74c3c;}
        .rl-rule--high::before{background:#e8c87d;}
        .rl-rule--hard::before{background:#f4a97f;}
        .rl-rule:hover{border-color:rgba(232,200,125,0.25);transform:translateX(2px);}
        .rl-rule--open{border-color:rgba(232,200,125,0.3);}
        .rl-rule__top{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;}
        .rl-rule__left{display:flex;align-items:flex-start;gap:1rem;flex:1;min-width:0;}
        .rl-rule__num{font-family:'Lora',serif;font-size:1.4rem;font-weight:700;color:rgba(255,255,255,0.1);flex-shrink:0;line-height:1;padding-top:3px;}
        .rl-rule__icon{font-size:1.5rem;flex-shrink:0;}
        .rl-rule__text h3{font-size:1rem;font-weight:600;color:#f0ece4;margin-bottom:0.35rem;}
        .rl-rule__text p{font-size:0.83rem;color:#5a7a8e;line-height:1.6;}
        .rl-rule__right{display:flex;align-items:center;gap:0.6rem;flex-shrink:0;flex-wrap:wrap;justify-content:flex-end;}
        .rl-consequence{font-size:0.72rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:6px;border:1px solid;letter-spacing:0.03em;white-space:nowrap;}
        .rl-level-badge{font-size:0.7rem;font-weight:600;padding:0.22rem 0.6rem;border-radius:6px;white-space:nowrap;}
        .rl-expand-icon{font-size:1.2rem;color:#4a6070;font-weight:300;margin-left:0.25rem;flex-shrink:0;}
        .rl-rule__detail{margin-top:1.2rem;padding-top:1.2rem;border-top:1px solid rgba(255,255,255,0.06);}
        .rl-rule__detail-inner{font-size:0.84rem;color:#8aa5b8;line-height:1.7;background:rgba(255,255,255,0.03);border-radius:8px;padding:0.9rem 1.1rem;}
        .rl-rule__detail-inner strong{color:#e8c87d;}

        .rl-section-title{font-family:'Lora',serif;font-size:1.6rem;font-weight:700;color:#f0ece4;margin-bottom:1.5rem;}

        .rl-table-section{margin-bottom:3rem;}
        .rl-table{background:#0a1e2e;border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:hidden;}
        .rl-table__head{display:grid;grid-template-columns:1.8fr 1fr 1fr 1fr;gap:1rem;padding:0.9rem 1.4rem;background:rgba(232,200,125,0.08);font-size:0.78rem;font-weight:600;color:#e8c87d;text-transform:uppercase;letter-spacing:0.06em;}
        .rl-table__row{display:grid;grid-template-columns:1.8fr 1fr 1fr 1fr;gap:1rem;padding:0.85rem 1.4rem;border-top:1px solid rgba(255,255,255,0.05);font-size:0.82rem;color:#8aa5b8;align-items:center;transition:background 0.15s;}
        .rl-table__row:hover{background:rgba(255,255,255,0.02);}
        .rl-table__row span:first-child{color:#c8d8e4;}
        .rl-cell--ban{color:#e74c3c;font-weight:600;}
        .rl-cell--none{color:#2a3a48;}

        .rl-appeal{display:flex;align-items:flex-start;gap:1.5rem;background:#0a1e2e;border:1px solid rgba(184,169,232,0.2);border-radius:16px;padding:2rem;margin-bottom:3rem;}
        .rl-appeal__icon{font-size:2.5rem;flex-shrink:0;}
        .rl-appeal h3{font-size:1.1rem;font-weight:600;color:#f0ece4;margin-bottom:0.5rem;}
        .rl-appeal p{font-size:0.86rem;color:#6a8090;line-height:1.7;}
        .rl-appeal strong{color:#d8e4ec;}

        .rl-agree-section{display:flex;justify-content:center;}
        .rl-agree-card{background:#0a1e2e;border:1px solid rgba(232,200,125,0.25);border-radius:20px;padding:2.5rem;max-width:520px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);}
        .rl-agree-card h2{font-family:'Lora',serif;font-size:1.6rem;font-weight:700;color:#f0ece4;margin-bottom:0.6rem;}
        .rl-agree-card>p{font-size:0.88rem;color:#5a7a8e;line-height:1.65;margin-bottom:1.5rem;}
        .rl-checkbox-label{display:flex;align-items:flex-start;gap:0.8rem;text-align:left;cursor:pointer;font-size:0.88rem;color:#8aa5b8;margin-bottom:1.5rem;}
        .rl-checkbox{width:18px;height:18px;border-radius:5px;accent-color:#e8c87d;flex-shrink:0;margin-top:1px;}
        .rl-back-link{display:block;margin-top:1rem;font-size:0.82rem;color:#3a5060;text-decoration:none;transition:color 0.18s;}
        .rl-back-link:hover{color:#e8c87d;}

        .rl-footer{position:relative;z-index:1;display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;align-items:center;padding:1.5rem 3rem;border-top:1px solid rgba(255,255,255,0.05);font-size:0.78rem;color:#2a3a48;}
        .rl-footer a{color:#3a5060;text-decoration:none;transition:color 0.18s;}
        .rl-footer a:hover{color:#e8c87d;}

        @media(max-width:700px){
          .rl-header{padding:1rem 1.2rem;}
          .rl-nav{display:none;}
          .rl-main{padding:2rem 1.2rem 3rem;}
          .rl-rule__right{display:none;}
          .rl-table__head,.rl-table__row{grid-template-columns:1.5fr 1fr;}
          .rl-table__head span:nth-child(3),.rl-table__head span:nth-child(4),
          .rl-table__row span:nth-child(3),.rl-table__row span:nth-child(4){display:none;}
          .rl-footer{padding:1.2rem;flex-direction:column;text-align:center;}
        }
      `}</style>
    </div>
  );
}
