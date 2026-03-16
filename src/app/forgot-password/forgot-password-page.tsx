/* ═══════════════════════════════════════════
   FORGOT PASSWORD — app/forgot-password/page.tsx
═══════════════════════════════════════════ */
"use client";
import { useState } from "react";

type FPStep = "email" | "code" | "reset" | "done";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<FPStep>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["","","","","",""]);
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmail = () => {
    if (!email.includes("@")) { setError("Enter a valid email address."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); setStep("code"); }, 1200);
  };

  const handleCode = () => {
    const full = code.join("");
    if (full.length < 6) { setError("Enter the full 6-digit code."); return; }
    if (full !== "123456") { setError("Invalid code. Try 123456 for this demo."); return; }
    setError(""); setStep("reset");
  };

  const handleReset = () => {
    if (newPwd.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (newPwd !== confirmPwd) { setError("Passwords do not match."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); setStep("done"); }, 1400);
  };

  const handleCodeInput = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code]; next[i] = val; setCode(next);
    if (val && i < 5) {
      const el = document.getElementById(`fp-code-${i+1}`);
      el?.focus();
    }
  };

  return (
    <div className="fp-root">
      <div className="fp-bg"><div className="fp-orb fp-orb--1"/><div className="fp-orb fp-orb--2"/></div>
      <header className="fp-header">
        <a href="/" className="fp-logo"><span>✦</span><span>ScriptMaster</span></a>
        <a href="/login" className="fp-back-link">← Back to Login</a>
      </header>
      <main className="fp-main">
        <div className="fp-progress">
          {[{l:"Email",i:"📧"},{l:"Verify Code",i:"🔢"},{l:"New Password",i:"🔒"},{l:"Done",i:"✅"}].map((s,idx) => {
            const steps: FPStep[] = ["email","code","reset","done"];
            const cur = steps.indexOf(step);
            return (
              <div key={s.l} className={`fp-prog-step ${idx<=cur?"done":""} ${idx===cur?"active":""}`}>
                <div className="fp-prog-circle">{idx<cur?"✓":s.i}</div>
                <span>{s.l}</span>
                {idx<3&&<div className="fp-prog-line"/>}
              </div>
            );
          })}
        </div>

        {step === "email" && (
          <div className="fp-card fp-anim">
            <div className="fp-card__icon">📧</div>
            <h2>Reset Your Password</h2>
            <p className="fp-card__sub">Enter your registered email and we'll send you a 6-digit reset code.</p>
            <div className="fp-field"><label>Email Address</label><input className="fp-input" type="email" placeholder="you@example.com" value={email} onChange={e=>{setEmail(e.target.value);setError("");}}/></div>
            {error && <div className="fp-error">{error}</div>}
            <button className="fp-btn fp-btn--gold fp-btn--full" onClick={handleEmail} disabled={loading}>
              {loading?<><span className="fp-spin"/>Sending code…</>:"Send Reset Code →"}
            </button>
            <a href="/login" className="fp-btn fp-btn--ghost fp-btn--full">Cancel</a>
          </div>
        )}

        {step === "code" && (
          <div className="fp-card fp-anim">
            <div className="fp-card__icon">🔢</div>
            <h2>Enter Verification Code</h2>
            <p className="fp-card__sub">A 6-digit code was sent to <strong style={{color:"#e8c87d"}}>{email}</strong>. Enter it below. (Use 123456 for this demo.)</p>
            <div className="fp-code-row">
              {code.map((c,i) => (
                <input key={i} id={`fp-code-${i}`} className="fp-code-input" type="text" maxLength={1} value={c} onChange={e=>handleCodeInput(i,e.target.value)} onKeyDown={e=>{if(e.key==="Backspace"&&!c&&i>0){document.getElementById(`fp-code-${i-1}`)?.focus();}}}/>
              ))}
            </div>
            {error && <div className="fp-error">{error}</div>}
            <button className="fp-btn fp-btn--gold fp-btn--full" onClick={handleCode}>Verify Code →</button>
            <button className="fp-btn fp-btn--ghost fp-btn--full" onClick={()=>setStep("email")}>← Change Email</button>
          </div>
        )}

        {step === "reset" && (
          <div className="fp-card fp-anim">
            <div className="fp-card__icon">🔒</div>
            <h2>Create New Password</h2>
            <p className="fp-card__sub">Choose a strong password for your ScriptMaster account.</p>
            <div className="fp-field"><label>New Password</label><input className="fp-input" type="password" placeholder="At least 6 characters" value={newPwd} onChange={e=>{setNewPwd(e.target.value);setError("");}}/></div>
            <div className="fp-field"><label>Confirm Password</label><input className="fp-input" type="password" placeholder="Repeat new password" value={confirmPwd} onChange={e=>{setConfirmPwd(e.target.value);setError("");}}/></div>
            {error && <div className="fp-error">{error}</div>}
            <button className="fp-btn fp-btn--gold fp-btn--full" onClick={handleReset} disabled={loading}>
              {loading?<><span className="fp-spin"/>Updating…</>:"Set New Password →"}
            </button>
          </div>
        )}

        {step === "done" && (
          <div className="fp-card fp-success fp-anim">
            <div className="fp-success-icon">🎉</div>
            <h2>Password Updated!</h2>
            <p>Your password has been successfully reset. You can now log in with your new password.</p>
            <a href="/login" className="fp-btn fp-btn--gold fp-btn--full">Go to Login →</a>
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .fp-root{font-family:'DM Sans',sans-serif;background:#071524;color:#d8e4ec;min-height:100vh;display:flex;flex-direction:column;position:relative;overflow-x:hidden;}
        .fp-bg{position:fixed;inset:0;pointer-events:none;z-index:0;}
        .fp-orb{position:absolute;border-radius:50%;filter:blur(90px);}
        .fp-orb--1{width:500px;height:500px;background:#0f3050;top:-150px;right:-100px;opacity:0.6;}
        .fp-orb--2{width:350px;height:350px;background:#1a1a40;bottom:10%;left:-80px;opacity:0.4;}
        .fp-header{display:flex;align-items:center;justify-content:space-between;padding:1rem 3rem;background:rgba(7,21,36,0.9);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,0.06);position:sticky;top:0;z-index:100;}
        .fp-logo{display:flex;align-items:center;gap:0.5rem;text-decoration:none;font-family:'Lora',serif;font-size:1.1rem;font-weight:700;color:#e8c87d;}
        .fp-back-link{font-size:0.82rem;color:#4a6070;text-decoration:none;transition:color 0.15s;}
        .fp-back-link:hover{color:#e8c87d;}
        .fp-main{flex:1;display:flex;flex-direction:column;align-items:center;padding:2.5rem 1.5rem 4rem;position:relative;z-index:1;}
        .fp-progress{display:flex;align-items:center;justify-content:center;margin-bottom:2.5rem;flex-wrap:wrap;gap:0;}
        .fp-prog-step{display:flex;align-items:center;gap:0.5rem;}
        .fp-prog-circle{width:36px;height:36px;border-radius:50%;border:2px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:0.82rem;color:#3a5060;background:#071524;transition:all 0.3s;flex-shrink:0;}
        .fp-prog-step.done .fp-prog-circle{border-color:#9ecfb8;background:rgba(158,207,184,0.1);color:#9ecfb8;}
        .fp-prog-step.active .fp-prog-circle{border-color:#e8c87d;background:rgba(232,200,125,0.12);color:#e8c87d;}
        .fp-prog-step span{font-size:0.75rem;color:#3a5060;white-space:nowrap;}
        .fp-prog-step.active span{color:#e8c87d;}
        .fp-prog-line{width:42px;height:1px;background:rgba(255,255,255,0.08);margin:0 0.5rem;}
        .fp-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:2.2rem;width:100%;max-width:440px;box-shadow:0 20px 60px rgba(0,0,0,0.35);}
        .fp-anim{animation:fadeUp 0.3s ease;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .fp-card__icon{font-size:2.2rem;text-align:center;margin-bottom:0.6rem;}
        .fp-card h2{font-family:'Lora',serif;font-size:1.55rem;font-weight:700;color:#f0ece4;text-align:center;margin-bottom:0.4rem;}
        .fp-card__sub{font-size:0.83rem;color:#4a6070;text-align:center;margin-bottom:1.5rem;line-height:1.65;}
        .fp-field{display:flex;flex-direction:column;gap:0.38rem;margin-bottom:0.9rem;}
        .fp-field label{font-size:0.78rem;font-weight:500;color:#7a9ab8;}
        .fp-input{background:#071524;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:0.65rem 0.9rem;color:#d8e4ec;font-size:0.88rem;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.18s;width:100%;}
        .fp-input:focus{border-color:#e8c87d;}
        .fp-error{background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);color:#e74c3c;font-size:0.78rem;padding:0.5rem 0.75rem;border-radius:7px;margin-bottom:0.75rem;}
        .fp-code-row{display:flex;gap:0.6rem;justify-content:center;margin-bottom:1.2rem;}
        .fp-code-input{width:46px;height:56px;background:#071524;border:2px solid rgba(255,255,255,0.1);border-radius:10px;color:#f0ece4;font-size:1.5rem;font-weight:700;text-align:center;outline:none;font-family:'DM Sans',sans-serif;transition:border-color 0.18s;}
        .fp-code-input:focus{border-color:#e8c87d;}
        .fp-btn{display:flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.65rem 1.3rem;border-radius:8px;font-size:0.9rem;font-weight:600;text-decoration:none;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all 0.18s;}
        .fp-btn--full{width:100%;margin-bottom:0.6rem;}
        .fp-btn--gold{background:#e8c87d;color:#1a0e05;}
        .fp-btn--gold:hover:not(:disabled){background:#f0d698;}
        .fp-btn--gold:disabled{opacity:0.6;cursor:not-allowed;}
        .fp-btn--ghost{background:transparent;color:#8aa5b8;border:1px solid rgba(255,255,255,0.12);}
        .fp-btn--ghost:hover{border-color:#e8c87d;color:#e8c87d;}
        .fp-spin{width:14px;height:14px;border:2px solid rgba(26,14,5,0.3);border-top-color:#1a0e05;border-radius:50%;animation:spin 0.7s linear infinite;}
        @keyframes spin{to{transform:rotate(360deg)}}
        .fp-success{text-align:center;border-color:rgba(158,207,184,0.3);}
        .fp-success-icon{font-size:3rem;margin-bottom:0.75rem;animation:pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;}
        @keyframes pop{from{transform:scale(0)}to{transform:scale(1)}}
        .fp-success h2{font-family:'Lora',serif;font-size:1.6rem;color:#f0ece4;margin-bottom:0.5rem;}
        .fp-success p{font-size:0.85rem;color:#5a7a8e;margin-bottom:1.5rem;line-height:1.65;}
        @media(max-width:500px){.fp-header{padding:1rem;}.fp-prog-line{width:20px;}.fp-prog-step span{display:none;}.fp-code-input{width:38px;height:48px;font-size:1.2rem;}}
      `}</style>
    </div>
  );
}
