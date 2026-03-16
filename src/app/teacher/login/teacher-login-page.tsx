"use client";
import { useState, useRef, useEffect } from "react";

type TStep = "credentials" | "access-code" | "done";

const DEMO_TEACHERS = [
  { email: "adaeze@scriptmaster.com", password: "teacher123", name: "Ms. Adaeze Okonkwo", role: "Lead Writing Instructor", initials: "AO", subject: "Essay & Reviews", students: 24, color: "#e8c87d" },
  { email: "kimani@scriptmaster.com", password: "teacher123", name: "Mr. Samuel Kimani", role: "Report & Research Tutor", initials: "SK", subject: "Reports & Research", students: 18, color: "#9ecfb8" },
];

const VALID_ACCESS_CODE = "SCRIPT-2025";

export default function TeacherLoginPage() {
  const [step, setStep] = useState<TStep>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [credError, setCredError] = useState("");
  const [loading, setLoading] = useState(false);
  const [matchedTeacher, setMatchedTeacher] = useState<typeof DEMO_TEACHERS[0] | null>(null);

  // Access code — 11 chars split into groups: SCRIPT - 2025
  const [codeInput, setCodeInput] = useState(["","","","","","","","","","",""]);
  const [codeError, setCodeError] = useState("");

  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === "access-code") {
      setTimeout(() => codeRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  const handleCredentials = async () => {
    if (!email.trim()) { setCredError("Please enter your teacher email address."); return; }
    if (!email.includes("@")) { setCredError("Enter a valid email address."); return; }
    if (!password) { setCredError("Please enter your password."); return; }
    if (password.length < 6) { setCredError("Password must be at least 6 characters."); return; }

    setCredError(""); setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);

    const teacher = DEMO_TEACHERS.find(t => t.email === email.toLowerCase() && t.password === password);
    if (!teacher) {
      setCredError("Invalid email or password. Try adaeze@scriptmaster.com / teacher123");
      return;
    }
    setMatchedTeacher(teacher);
    setStep("access-code");
  };

  const handleCodeInput = (i: number, val: string) => {
    if (i === 6 && val === "-") { return; } // skip dash position
    const allowed = /^[A-Za-z0-9]?$/;
    if (!allowed.test(val)) return;
    const next = [...codeInput];
    next[i] = val.toUpperCase();
    setCodeInput(next);
    setCodeError("");
    // Auto-advance
    const nextIdx = i === 5 ? 7 : i + 1; // skip dash at index 6
    if (val && nextIdx <= 10) codeRefs.current[nextIdx]?.focus();
  };

  const handleCodeKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codeInput[i]) {
      const prevIdx = i === 7 ? 5 : i - 1;
      if (prevIdx >= 0) {
        const next = [...codeInput]; next[prevIdx] = "";
        setCodeInput(next);
        codeRefs.current[prevIdx]?.focus();
      }
    }
  };

  const handleCodeVerify = async () => {
    const entered = [
      ...codeInput.slice(0,6),
      "-",
      ...codeInput.slice(7,11)
    ].join("");
    const clean = codeInput.slice(0,6).join("") + "-" + codeInput.slice(7,11).join("");
    if (clean !== VALID_ACCESS_CODE) {
      setCodeError(`Invalid access code. Use ${VALID_ACCESS_CODE} for this demo.`);
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setStep("done");
  };

  const pasteCode = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/-/g,"").toUpperCase().slice(0,10);
    const next = ["","","","","","","","","","",""];
    for (let i = 0; i < 6 && i < pasted.length; i++) next[i] = pasted[i];
    for (let i = 0; i < 4 && i+6 < pasted.length; i++) next[i+7] = pasted[i+6];
    setCodeInput(next);
  };

  return (
    <div className="tl-root">
      {/* Rich background */}
      <div className="tl-bg">
        <div className="tl-mesh"/>
        <div className="tl-beam tl-beam--1"/>
        <div className="tl-beam tl-beam--2"/>
        {/* Watermark desk figure */}
        <svg className="tl-wm" viewBox="0 0 180 260" fill="none">
          <defs><linearGradient id="wmg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2a5070" stopOpacity="0.35"/><stop offset="100%" stopColor="#0a1e2e" stopOpacity="0.12"/></linearGradient></defs>
          <ellipse cx="90" cy="38" rx="26" ry="28" fill="url(#wmg)"/>
          <path d="M52 74 Q68 62 90 62 Q112 62 128 74 L132 165 Q90 174 48 165Z" fill="url(#wmg)"/>
          <path d="M52 95 Q30 107 22 130" stroke="url(#wmg)" strokeWidth="18" strokeLinecap="round" fill="none"/>
          <path d="M128 95 Q150 107 158 135" stroke="url(#wmg)" strokeWidth="16" strokeLinecap="round" fill="none"/>
          <rect x="18" y="170" width="144" height="10" rx="5" fill="url(#wmg)"/>
          <rect x="26" y="150" width="128" height="72" rx="6" fill="url(#wmg)" opacity="0.75"/>
          <rect x="36" y="162" width="64" height="5" rx="2.5" fill="#e8c87d" opacity="0.35"/>
          <rect x="36" y="173" width="92" height="4" rx="2" fill="#e8c87d" opacity="0.25"/>
          <rect x="36" y="183" width="48" height="4" rx="2" fill="#e8c87d" opacity="0.18"/>
          <rect x="36" y="193" width="76" height="4" rx="2" fill="#e8c87d" opacity="0.15"/>
          <rect x="148" y="138" width="4" height="30" rx="2" fill="#e8c87d" opacity="0.55" transform="rotate(22 150 150)"/>
        </svg>
        <div className="tl-dot-grid">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="tdots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#e8c87d" opacity="0.1"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#tdots)"/>
          </svg>
        </div>
        <div className="tl-glow"/>
      </div>

      {/* HEADER */}
      <header className="tl-header">
        <a href="/" className="tl-logo"><span className="tl-logo__mark">✦</span><span>ScriptMaster</span></a>
        <div className="tl-header__right">
          <span className="tl-role-tag">👩‍🏫 Teacher Portal</span>
          <a href="/login" className="tl-student-link">Student login →</a>
        </div>
      </header>

      <main className="tl-main">

        {/* STEP INDICATOR */}
        <div className="tl-steps">
          {[
            { label:"Credentials", icon:"🔑", key:"credentials" },
            { label:"Access Code", icon:"🔐", key:"access-code" },
            { label:"Dashboard",   icon:"✅", key:"done" },
          ].map((s, i) => {
            const stepOrder: TStep[] = ["credentials","access-code","done"];
            const cur = stepOrder.indexOf(step);
            const idx = stepOrder.indexOf(s.key as TStep);
            return (
              <div key={s.key} className={`tl-step ${idx < cur ? "done" : ""} ${idx === cur ? "active" : ""}`}>
                <div className="tl-step__circle">{idx < cur ? "✓" : s.icon}</div>
                <span>{s.label}</span>
                {i < 2 && <div className="tl-step__line"/>}
              </div>
            );
          })}
        </div>

        {/* ── STEP 1: CREDENTIALS ── */}
        {step === "credentials" && (
          <div className="tl-card tl-card--anim">
            <div className="tl-card__badge">
              <span>👩‍🏫</span> Teacher Authentication
            </div>
            <h1 className="tl-card__title">Welcome back,<br/><em>Educator.</em></h1>
            <p className="tl-card__sub">Sign in with your ScriptMaster teacher credentials. This portal is for instructors only.</p>

            <div className="tl-field">
              <label>Teacher Email</label>
              <div className="tl-input-wrap">
                <span className="tl-input-icon">✉️</span>
                <input
                  className="tl-input"
                  type="email"
                  placeholder="yourname@scriptmaster.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setCredError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleCredentials()}
                />
              </div>
            </div>

            <div className="tl-field">
              <label>Password</label>
              <div className="tl-input-wrap">
                <span className="tl-input-icon">🔒</span>
                <input
                  className="tl-input"
                  type={showPwd ? "text" : "password"}
                  placeholder="Your teacher password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setCredError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleCredentials()}
                />
                <button className="tl-eye" onClick={() => setShowPwd(!showPwd)}>
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>
              <a href="/forgot-password" className="tl-forgot">Forgot password?</a>
            </div>

            {credError && <div className="tl-error"><span>⚠️</span> {credError}</div>}

            <button className="tl-btn tl-btn--gold tl-btn--full" onClick={handleCredentials} disabled={loading}>
              {loading ? <><span className="tl-spin"/>Verifying credentials…</> : "Continue to Access Code →"}
            </button>

            <div className="tl-divider"><span>Teacher accounts are assigned by ScriptMaster admin</span></div>

            <div className="tl-demo-hint">
              <div className="tl-demo-hint__label">🔧 Demo Credentials</div>
              <div className="tl-demo-row" onClick={() => { setEmail("adaeze@scriptmaster.com"); setPassword("teacher123"); setCredError(""); }}>
                <span>adaeze@scriptmaster.com</span><span className="tl-demo-copy">Use →</span>
              </div>
              <div className="tl-demo-row" onClick={() => { setEmail("kimani@scriptmaster.com"); setPassword("teacher123"); setCredError(""); }}>
                <span>kimani@scriptmaster.com</span><span className="tl-demo-copy">Use →</span>
              </div>
              <div className="tl-demo-note">Password for both: teacher123</div>
            </div>

            <div className="tl-security-note">
              <span>🛡️</span>
              <span>Teacher login requires a <strong>second-factor access code</strong> after credentials. This prevents unauthorised access to student data.</span>
            </div>
          </div>
        )}

        {/* ── STEP 2: ACCESS CODE ── */}
        {step === "access-code" && matchedTeacher && (
          <div className="tl-card tl-card--anim">
            {/* Teacher welcome strip */}
            <div className="tl-teacher-strip">
              <div className="tl-teacher-av" style={{background:matchedTeacher.color}}>
                {matchedTeacher.initials}
              </div>
              <div>
                <strong>{matchedTeacher.name}</strong>
                <span>{matchedTeacher.role}</span>
              </div>
              <span className="tl-teacher-strip__check">✓ Verified</span>
            </div>

            <h2 className="tl-code-title">Enter Your Access Code</h2>
            <p className="tl-code-sub">
              Every teacher has a unique platform access code issued by ScriptMaster admin. 
              Enter yours below. Format: <strong>XXXXXX-XXXX</strong>
            </p>

            <div className="tl-code-group" onPaste={pasteCode}>
              <div className="tl-code-segment">
                {[0,1,2,3,4,5].map(i => (
                  <input
                    key={i}
                    ref={el => { codeRefs.current[i] = el; }}
                    className="tl-code-box"
                    type="text"
                    maxLength={1}
                    value={codeInput[i]}
                    onChange={e => handleCodeInput(i, e.target.value)}
                    onKeyDown={e => handleCodeKeyDown(i, e)}
                  />
                ))}
              </div>
              <div className="tl-code-dash">–</div>
              <div className="tl-code-segment tl-code-segment--short">
                {[7,8,9,10].map(i => (
                  <input
                    key={i}
                    ref={el => { codeRefs.current[i] = el; }}
                    className="tl-code-box"
                    type="text"
                    maxLength={1}
                    value={codeInput[i]}
                    onChange={e => handleCodeInput(i, e.target.value)}
                    onKeyDown={e => handleCodeKeyDown(i, e)}
                  />
                ))}
              </div>
            </div>

            <div className="tl-code-demo-hint">
              Demo code: <strong>SCRIPT-2025</strong>
              <button className="tl-autofill-btn" onClick={() => {
                setCodeInput(["S","C","R","I","P","T","","2","0","2","5"]);
                setCodeError("");
              }}>Auto-fill →</button>
            </div>

            {codeError && <div className="tl-error"><span>⚠️</span> {codeError}</div>}

            <button
              className="tl-btn tl-btn--gold tl-btn--full"
              onClick={handleCodeVerify}
              disabled={loading || codeInput.slice(0,6).join("").length < 6 || codeInput.slice(7,11).join("").length < 4}
            >
              {loading ? <><span className="tl-spin"/>Verifying access…</> : "Verify & Enter Dashboard →"}
            </button>

            <button className="tl-btn tl-btn--ghost tl-btn--full" onClick={() => { setStep("credentials"); setCodeInput(Array(11).fill("")); setCodeError(""); }}>
              ← Back to Credentials
            </button>

            <div className="tl-security-note">
              <span>🔐</span>
              <span>Access codes are issued by ScriptMaster admin and rotate periodically. Contact admin if your code has expired.</span>
            </div>
          </div>
        )}

        {/* ── DONE ── */}
        {step === "done" && matchedTeacher && (
          <div className="tl-card tl-card--success tl-card--anim">
            <div className="tl-success-ring">
              <div className="tl-success-av" style={{background:matchedTeacher.color}}>
                {matchedTeacher.initials}
              </div>
            </div>
            <h2 className="tl-success-title">Welcome back,<br/>{matchedTeacher.name.split(" ")[1]}!</h2>
            <p className="tl-success-sub">Both authentication steps passed. You're now signed in to the teacher portal.</p>

            <div className="tl-success-checks">
              <div className="tl-check-row">✓ Teacher credentials verified</div>
              <div className="tl-check-row">✓ Access code confirmed</div>
              <div className="tl-check-row">✓ ScriptGuard monitoring active</div>
            </div>

            <div className="tl-teacher-info-grid">
              <div><span>Role</span><strong>{matchedTeacher.role}</strong></div>
              <div><span>Subject</span><strong>{matchedTeacher.subject}</strong></div>
              <div><span>Students</span><strong>{matchedTeacher.students} active</strong></div>
              <div><span>Status</span><strong style={{color:"#9ecfb8"}}>✅ Active</strong></div>
            </div>

            <a href="/teacher" className="tl-btn tl-btn--gold tl-btn--full tl-btn--lg">
              Enter Teacher Dashboard →
            </a>

            <div className="tl-quick-links">
              <a href="/teacher/grading">✏️ Go to Grading</a>
              <a href="/teacher/tasks/new">📋 Post New Task</a>
              <a href="/teacher/students">👥 View Students</a>
            </div>
          </div>
        )}

      </main>

      <footer className="tl-footer">
        <span>© 2025 ScriptMaster</span>
        <span>🛡️ Secure Teacher Portal · Two-Factor Authentication</span>
        <span><a href="/">Home</a> · <a href="/login">Student Login</a> · <a href="/contact">Support</a></span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

        .tl-root{font-family:'DM Sans',sans-serif;background:#06101c;color:#d8e4ec;min-height:100vh;display:flex;flex-direction:column;position:relative;overflow-x:hidden;}

        /* ── Background ── */
        .tl-bg{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
        .tl-mesh{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 75% 5%,rgba(20,60,100,0.9) 0%,transparent 55%),radial-gradient(ellipse 55% 45% at 5% 85%,rgba(12,38,62,0.8) 0%,transparent 55%),radial-gradient(ellipse 40% 35% at 95% 80%,rgba(10,28,50,0.5) 0%,transparent 50%),linear-gradient(155deg,#020a14 0%,#06101c 45%,#0a1a28 80%,#040d18 100%);}
        .tl-beam{position:absolute;pointer-events:none;transform-origin:top center;}
        .tl-beam--1{width:2px;height:85vh;left:22%;top:0;background:linear-gradient(to bottom,rgba(232,200,125,0.06),transparent);filter:blur(6px);animation:beamSway 14s ease-in-out infinite;}
        .tl-beam--2{width:1.5px;height:70vh;right:28%;top:0;background:linear-gradient(to bottom,rgba(158,207,184,0.05),transparent);filter:blur(5px);animation:beamSway 11s ease-in-out infinite 5s;}
        @keyframes beamSway{0%,100%{transform:skewX(0deg)}50%{transform:skewX(2.5deg)}}
        .tl-wm{position:absolute;width:200px;right:-20px;top:18%;opacity:0.5;animation:wmFloat 10s ease-in-out infinite;}
        @keyframes wmFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        .tl-dot-grid{position:absolute;inset:0;opacity:0.7;}
        .tl-glow{position:absolute;width:800px;height:800px;top:-250px;right:-200px;background:radial-gradient(ellipse at center,rgba(25,75,125,0.2) 0%,transparent 65%);border-radius:50%;animation:glowPulse 12s ease-in-out infinite;}
        @keyframes glowPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}

        /* ── Header ── */
        .tl-header{position:sticky;top:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:1rem 3.5rem;background:rgba(6,16,28,0.92);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.06);}
        .tl-logo{display:flex;align-items:center;gap:0.5rem;text-decoration:none;}
        .tl-logo__mark{color:#e8c87d;font-size:0.9rem;}
        .tl-logo span:last-child{font-family:'Lora',serif;font-size:1.2rem;font-weight:700;color:#e8c87d;}
        .tl-header__right{display:flex;align-items:center;gap:1.25rem;}
        .tl-role-tag{font-size:0.76rem;font-weight:600;color:#b8a9e8;background:rgba(184,169,232,0.1);border:1px solid rgba(184,169,232,0.25);padding:0.28rem 0.75rem;border-radius:100px;}
        .tl-student-link{font-size:0.8rem;color:#4a6070;text-decoration:none;transition:color 0.15s;}
        .tl-student-link:hover{color:#e8c87d;}

        /* ── Main ── */
        .tl-main{flex:1;display:flex;flex-direction:column;align-items:center;padding:2.5rem 1.5rem 4rem;position:relative;z-index:1;}

        /* ── Steps ── */
        .tl-steps{display:flex;align-items:center;justify-content:center;margin-bottom:2.5rem;gap:0;}
        .tl-step{display:flex;align-items:center;gap:0.5rem;}
        .tl-step__circle{width:38px;height:38px;border-radius:50%;border:2px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:0.85rem;color:#2a3a48;background:#06101c;transition:all 0.3s;flex-shrink:0;}
        .tl-step.done .tl-step__circle{border-color:#9ecfb8;background:rgba(158,207,184,0.1);color:#9ecfb8;}
        .tl-step.active .tl-step__circle{border-color:#e8c87d;background:rgba(232,200,125,0.12);color:#e8c87d;box-shadow:0 0 0 4px rgba(232,200,125,0.08);}
        .tl-step span{font-size:0.75rem;color:#2a3a48;white-space:nowrap;}
        .tl-step.active span{color:#e8c87d;}
        .tl-step.done span{color:#9ecfb8;}
        .tl-step__line{width:52px;height:1px;background:rgba(255,255,255,0.07);margin:0 0.6rem;}

        /* ── Card ── */
        .tl-card{background:rgba(10,20,34,0.9);border:1px solid rgba(255,255,255,0.08);border-radius:22px;padding:2.4rem 2.2rem;width:100%;max-width:500px;box-shadow:0 24px 80px rgba(0,0,0,0.5);backdrop-filter:blur(20px);}
        .tl-card--anim{animation:cardIn 0.35s cubic-bezier(0.34,1.2,0.64,1);}
        @keyframes cardIn{from{opacity:0;transform:translateY(16px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}
        .tl-card--success{border-color:rgba(158,207,184,0.28);background:rgba(8,20,14,0.92);}

        /* ── Card badge ── */
        .tl-card__badge{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(184,169,232,0.1);border:1px solid rgba(184,169,232,0.25);color:#b8a9e8;font-size:0.75rem;font-weight:600;padding:0.3rem 0.85rem;border-radius:100px;margin-bottom:1.2rem;}
        .tl-card__title{font-family:'Lora',serif;font-size:2rem;font-weight:700;color:#f0ece4;line-height:1.2;margin-bottom:0.5rem;}
        .tl-card__title em{font-style:italic;color:#e8c87d;}
        .tl-card__sub{font-size:0.84rem;color:#4a6070;line-height:1.65;margin-bottom:1.8rem;}

        /* ── Fields ── */
        .tl-field{display:flex;flex-direction:column;gap:0.38rem;margin-bottom:1rem;}
        .tl-field label{font-size:0.78rem;font-weight:600;color:#6a8aaa;letter-spacing:0.02em;}
        .tl-input-wrap{position:relative;display:flex;align-items:center;}
        .tl-input-icon{position:absolute;left:0.9rem;font-size:1rem;pointer-events:none;z-index:1;}
        .tl-input{background:#040c18;border:1.5px solid rgba(255,255,255,0.08);border-radius:10px;padding:0.72rem 0.9rem 0.72rem 2.6rem;color:#d8e4ec;font-size:0.9rem;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.2s,box-shadow 0.2s;width:100%;}
        .tl-input:focus{border-color:#e8c87d;box-shadow:0 0 0 3px rgba(232,200,125,0.08);}
        .tl-eye{position:absolute;right:0.85rem;background:none;border:none;cursor:pointer;font-size:1rem;color:#3a5060;transition:color 0.15s;padding:0;}
        .tl-eye:hover{color:#d8e4ec;}
        .tl-forgot{font-size:0.75rem;color:#3a5060;text-decoration:none;text-align:right;margin-top:0.1rem;transition:color 0.15s;}
        .tl-forgot:hover{color:#e8c87d;}

        /* ── Error ── */
        .tl-error{display:flex;align-items:flex-start;gap:0.5rem;background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.28);color:#e07060;font-size:0.8rem;padding:0.6rem 0.85rem;border-radius:9px;margin-bottom:0.85rem;line-height:1.5;}

        /* ── Buttons ── */
        .tl-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.72rem 1.5rem;border-radius:10px;font-size:0.92rem;font-weight:600;text-decoration:none;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all 0.2s;white-space:nowrap;}
        .tl-btn--full{width:100%;margin-bottom:0.65rem;}
        .tl-btn--lg{padding:0.85rem 2rem;font-size:1rem;}
        .tl-btn--gold{background:linear-gradient(135deg,#e8c87d,#d4a850);color:#1a0e05;}
        .tl-btn--gold:hover:not(:disabled){background:linear-gradient(135deg,#f0d698,#e8c87d);box-shadow:0 8px 28px rgba(232,200,125,0.35);transform:translateY(-1px);}
        .tl-btn--gold:disabled{opacity:0.5;cursor:not-allowed;transform:none;}
        .tl-btn--ghost{background:transparent;color:#6a8090;border:1.5px solid rgba(255,255,255,0.1);}
        .tl-btn--ghost:hover{border-color:rgba(232,200,125,0.35);color:#e8c87d;}
        .tl-spin{width:16px;height:16px;border:2.5px solid rgba(26,14,5,0.3);border-top-color:#1a0e05;border-radius:50%;animation:spin 0.7s linear infinite;flex-shrink:0;}
        @keyframes spin{to{transform:rotate(360deg)}}

        /* ── Divider ── */
        .tl-divider{text-align:center;font-size:0.75rem;color:#1e2e3a;margin:0.25rem 0 1rem;padding:0 1rem;}

        /* ── Demo hint ── */
        .tl-demo-hint{background:#040c18;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:0.9rem;margin-bottom:0.9rem;}
        .tl-demo-hint__label{font-size:0.68rem;text-transform:uppercase;letter-spacing:0.08em;color:#3a5060;margin-bottom:0.5rem;}
        .tl-demo-row{display:flex;justify-content:space-between;align-items:center;padding:0.35rem 0;border-bottom:1px solid rgba(255,255,255,0.04);cursor:pointer;transition:all 0.15s;}
        .tl-demo-row:last-of-type{border-bottom:none;}
        .tl-demo-row:hover{opacity:0.75;}
        .tl-demo-row span:first-child{font-size:0.78rem;color:#6a8090;font-family:monospace;}
        .tl-demo-copy{font-size:0.72rem;color:#e8c87d;font-weight:600;}
        .tl-demo-note{font-size:0.72rem;color:#2a3a48;margin-top:0.4rem;}

        /* ── Security note ── */
        .tl-security-note{display:flex;align-items:flex-start;gap:0.6rem;background:rgba(184,169,232,0.05);border:1px solid rgba(184,169,232,0.14);border-radius:9px;padding:0.7rem;font-size:0.76rem;color:#6a8090;line-height:1.6;margin-top:0.5rem;}
        .tl-security-note strong{color:#b8a9e8;}

        /* ── Teacher strip ── */
        .tl-teacher-strip{display:flex;align-items:center;gap:0.85rem;background:#040c18;border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:0.9rem 1rem;margin-bottom:1.5rem;}
        .tl-teacher-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.88rem;font-weight:700;color:#1a0e05;flex-shrink:0;}
        .tl-teacher-strip strong{display:block;font-size:0.9rem;color:#f0ece4;margin-bottom:0.1rem;}
        .tl-teacher-strip span{font-size:0.75rem;color:#4a6070;}
        .tl-teacher-strip__check{margin-left:auto;font-size:0.72rem;font-weight:700;color:#9ecfb8;background:rgba(158,207,184,0.1);border:1px solid rgba(158,207,184,0.25);padding:0.2rem 0.55rem;border-radius:5px;flex-shrink:0;}

        /* ── Access code ── */
        .tl-code-title{font-family:'Lora',serif;font-size:1.5rem;font-weight:700;color:#f0ece4;margin-bottom:0.5rem;}
        .tl-code-sub{font-size:0.83rem;color:#4a6070;line-height:1.65;margin-bottom:1.5rem;}
        .tl-code-sub strong{color:#d8e4ec;}
        .tl-code-group{display:flex;align-items:center;justify-content:center;gap:0.5rem;margin-bottom:0.75rem;}
        .tl-code-segment{display:flex;gap:0.35rem;}
        .tl-code-box{width:44px;height:56px;background:#040c18;border:2px solid rgba(255,255,255,0.1);border-radius:10px;color:#f0ece4;font-size:1.4rem;font-weight:700;text-align:center;outline:none;font-family:'DM Sans',sans-serif;letter-spacing:0.02em;transition:border-color 0.18s,box-shadow 0.18s;}
        .tl-code-box:focus{border-color:#e8c87d;box-shadow:0 0 0 3px rgba(232,200,125,0.12);}
        .tl-code-dash{font-size:1.8rem;color:#2a3a48;font-weight:300;padding:0 0.1rem;}
        .tl-code-demo-hint{display:flex;align-items:center;gap:0.75rem;font-size:0.78rem;color:#3a5060;margin-bottom:1.1rem;justify-content:center;}
        .tl-code-demo-hint strong{color:#e8c87d;}
        .tl-autofill-btn{background:rgba(232,200,125,0.1);border:1px solid rgba(232,200,125,0.25);color:#e8c87d;font-size:0.72rem;font-weight:600;padding:0.2rem 0.65rem;border-radius:6px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;}
        .tl-autofill-btn:hover{background:rgba(232,200,125,0.2);}

        /* ── Success ── */
        .tl-success-ring{display:flex;justify-content:center;margin-bottom:1rem;}
        .tl-success-av{width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:700;color:#1a0e05;animation:pop 0.5s cubic-bezier(0.34,1.56,0.64,1);}
        @keyframes pop{from{transform:scale(0)}to{transform:scale(1)}}
        .tl-success-title{font-family:'Lora',serif;font-size:1.7rem;font-weight:700;color:#f0ece4;text-align:center;margin-bottom:0.5rem;line-height:1.25;}
        .tl-success-sub{font-size:0.84rem;color:#4a6070;text-align:center;margin-bottom:1.4rem;line-height:1.65;}
        .tl-success-checks{display:flex;flex-direction:column;gap:0.4rem;margin-bottom:1.4rem;}
        .tl-check-row{font-size:0.82rem;color:#9ecfb8;background:rgba(158,207,184,0.07);border:1px solid rgba(158,207,184,0.18);border-radius:8px;padding:0.5rem 0.85rem;}
        .tl-teacher-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.65rem;margin-bottom:1.5rem;}
        .tl-teacher-info-grid>div{background:#040c18;border:1px solid rgba(255,255,255,0.06);border-radius:9px;padding:0.7rem;}
        .tl-teacher-info-grid span{display:block;font-size:0.7rem;color:#3a5060;margin-bottom:0.18rem;}
        .tl-teacher-info-grid strong{font-size:0.84rem;color:#d8e4ec;}
        .tl-quick-links{display:flex;justify-content:center;gap:1.25rem;margin-top:0.5rem;flex-wrap:wrap;}
        .tl-quick-links a{font-size:0.78rem;color:#5a7a8e;text-decoration:none;transition:color 0.15s;}
        .tl-quick-links a:hover{color:#e8c87d;}

        /* ── Footer ── */
        .tl-footer{position:relative;z-index:1;display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;padding:1.2rem 3.5rem;border-top:1px solid rgba(255,255,255,0.05);font-size:0.74rem;color:#1e2e3a;}
        .tl-footer a{color:#2a3a48;text-decoration:none;transition:color 0.15s;}
        .tl-footer a:hover{color:#e8c87d;}

        @media(max-width:600px){
          .tl-header{padding:0.9rem 1.2rem;}
          .tl-main{padding:1.5rem 1rem 3rem;}
          .tl-step__line{width:28px;}
          .tl-step span{display:none;}
          .tl-card{padding:1.8rem 1.3rem;}
          .tl-code-box{width:36px;height:48px;font-size:1.1rem;}
          .tl-footer{padding:1rem;flex-direction:column;text-align:center;}
        }
      `}</style>
    </div>
  );
}
