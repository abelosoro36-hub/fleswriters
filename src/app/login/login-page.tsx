"use client";
import { useState, useRef } from "react";

type AuthStep = "credentials" | "captcha" | "typing-test" | "done";

const MATH_QUESTIONS = [
  { q: "What is 8 + 5?", a: "13" },
  { q: "What is 12 − 4?", a: "8" },
  { q: "What is 3 × 7?", a: "21" },
  { q: "What is 18 ÷ 2?", a: "9" },
];

const IMAGE_GRID = [
  { emoji: "🚗", isTarget: true },
  { emoji: "🌳", isTarget: false },
  { emoji: "🚕", isTarget: true },
  { emoji: "🐶", isTarget: false },
  { emoji: "🚙", isTarget: true },
  { emoji: "🏠", isTarget: false },
  { emoji: "🌺", isTarget: false },
  { emoji: "🚐", isTarget: true },
  { emoji: "🐱", isTarget: false },
];

const TYPING_PHRASE = "I confirm I am a human student using ScriptMaster";

export default function LoginPage() {
  const [step, setStep] = useState<AuthStep>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credError, setCredError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  // Captcha
  const [mathIdx] = useState(() => Math.floor(Math.random() * MATH_QUESTIONS.length));
  const [mathAnswer, setMathAnswer] = useState("");
  const [mathError, setMathError] = useState("");
  const [captchaStage, setCaptchaStage] = useState<"math" | "image">("math");
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [imageError, setImageError] = useState("");

  // Typing test
  const [typed, setTyped] = useState("");
  const [typingTimes, setTypingTimes] = useState<number[]>([]);
  const lastKeyTime = useRef<number>(0);
  const [typingScore, setTypingScore] = useState<null | "human" | "bot">(null);
  const [typingError, setTypingError] = useState("");

  const handleCredentials = () => {
    if (!email.includes("@")) { setCredError("Enter a valid email address."); return; }
    if (password.length < 6) { setCredError("Password must be at least 6 characters."); return; }
    setCredError(""); setLoading(true);
    setTimeout(() => { setLoading(false); setStep("captcha"); }, 1000);
  };

  const handleMath = () => {
    if (mathAnswer.trim() !== MATH_QUESTIONS[mathIdx].a) {
      setMathError("Incorrect. Try again."); setMathAnswer(""); return;
    }
    setMathError(""); setCaptchaStage("image");
  };

  const toggleImage = (i: number) => {
    setSelectedImages((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
    setImageError("");
  };

  const handleImageVerify = () => {
    const correct = IMAGE_GRID.map((img, i) => img.isTarget ? i : -1).filter((i) => i !== -1);
    const ok = correct.every((i) => selectedImages.includes(i)) && selectedImages.every((i) => IMAGE_GRID[i].isTarget);
    if (!ok) { setImageError("Please select ALL cars. Try again."); setSelectedImages([]); return; }
    setStep("typing-test");
  };

  const handleTyping = (val: string) => {
    const now = Date.now();
    if (lastKeyTime.current > 0) setTypingTimes((p) => [...p, now - lastKeyTime.current]);
    lastKeyTime.current = now;
    setTyped(val); setTypingError("");
  };

  const analyzeTyping = () => {
    if (typed !== TYPING_PHRASE) { setTypingError("Type the phrase exactly as shown."); return; }
    if (typingTimes.length < 10) { setTypingError("Please type naturally — do not paste."); return; }
    const avg = typingTimes.reduce((a, b) => a + b, 0) / typingTimes.length;
    const variance = typingTimes.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / typingTimes.length;
    const isHuman = variance > 200;
    setTypingScore(isHuman ? "human" : "bot");
    if (isHuman) { setLoading(true); setTimeout(() => { setLoading(false); setStep("done"); }, 1500); }
  };

  const STEPS: AuthStep[] = ["credentials", "captcha", "typing-test", "done"];
  const stepIdx = STEPS.indexOf(step);

  return (
    <div className="lg-root">
      <div className="lg-bg"><div className="lg-orb lg-orb--1" /><div className="lg-orb lg-orb--2" /></div>

      <header className="lg-header">
        <a href="/" className="lg-logo"><span className="lg-logo__mark">✦</span><span>ScriptMaster</span></a>
        <span className="lg-secure-tag">🔒 Secure Human Verification</span>
      </header>

      <main className="lg-main">
        {/* PROGRESS */}
        <div className="lg-progress">
          {[{label:"Login",icon:"🔑"},{label:"Verify Human",icon:"🧠"},{label:"Typing Test",icon:"⌨️"},{label:"Access Granted",icon:"✅"}].map((s, i) => (
            <div key={i} className={`lg-prog-step ${i < stepIdx ? "done" : ""} ${i === stepIdx ? "active" : ""}`}>
              <div className="lg-prog-circle">{i < stepIdx ? "✓" : s.icon}</div>
              <span>{s.label}</span>
              {i < 3 && <div className="lg-prog-line" />}
            </div>
          ))}
        </div>

        {/* STEP 1: CREDENTIALS */}
        {step === "credentials" && (
          <div className="lg-card lg-anim">
            <div className="lg-card__icon">🔑</div>
            <h2>Welcome back</h2>
            <p className="lg-card__sub">Sign in to your student account. Human verification follows.</p>
            <div className="lg-field">
              <label>Email Address</label>
              <input className="lg-input" type="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setCredError(""); }} />
            </div>
            <div className="lg-field">
              <label>Password</label>
              <div className="lg-input-wrap">
                <input className="lg-input" type={showPwd ? "text" : "password"} placeholder="Your password" value={password} onChange={(e) => { setPassword(e.target.value); setCredError(""); }} />
                <button className="lg-eye" onClick={() => setShowPwd(!showPwd)}>{showPwd ? "🙈" : "👁️"}</button>
              </div>
            </div>
            {credError && <div className="lg-error">{credError}</div>}
            <button className="lg-btn lg-btn--gold lg-btn--full" onClick={handleCredentials} disabled={loading}>
              {loading ? <><span className="lg-spin" /> Verifying…</> : "Continue →"}
            </button>
            <div className="lg-divider"><span>No account yet?</span></div>
            <a href="/register" className="lg-btn lg-btn--ghost lg-btn--full">Buy Student Account — $12</a>
            <div className="lg-info-box"><span>🤖</span><span>After login you'll complete a <strong>human verification challenge</strong> to prove you're not a bot. This protects the community.</span></div>
          </div>
        )}

        {/* STEP 2: CAPTCHA */}
        {step === "captcha" && (
          <div className="lg-card lg-anim">
            <div className="lg-card__icon">🧠</div>
            <h2>Prove you're human</h2>
            <p className="lg-card__sub">Complete both challenges. Automated systems cannot pass this.</p>

            {captchaStage === "math" && (
              <>
                <div className="lg-challenge-tag">Challenge 1 of 2 — Mental Maths</div>
                <div className="lg-math-box">{MATH_QUESTIONS[mathIdx].q}</div>
                <input className="lg-input lg-input--center" placeholder="Your answer" value={mathAnswer}
                  onChange={(e) => { setMathAnswer(e.target.value); setMathError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleMath()} autoFocus />
                {mathError && <div className="lg-error">{mathError}</div>}
                <button className="lg-btn lg-btn--gold lg-btn--full" style={{marginTop:"0.75rem"}} onClick={handleMath}>Check Answer →</button>
                <p className="lg-caption">Automated scripts cannot reliably solve simple maths problems.</p>
              </>
            )}

            {captchaStage === "image" && (
              <>
                <div className="lg-challenge-tag">Challenge 2 of 2 — Image Recognition ✓ Maths passed</div>
                <p className="lg-img-instruction">Click <strong>all images</strong> that contain a <em className="lg-highlight">car</em>, then press Verify.</p>
                <div className="lg-img-grid">
                  {IMAGE_GRID.map((img, i) => (
                    <button key={i} className={`lg-img-tile ${selectedImages.includes(i) ? "selected" : ""}`} onClick={() => toggleImage(i)}>
                      <span className="lg-img-emoji">{img.emoji}</span>
                      {selectedImages.includes(i) && <span className="lg-img-tick">✓</span>}
                    </button>
                  ))}
                </div>
                {imageError && <div className="lg-error">{imageError}</div>}
                <button className="lg-btn lg-btn--gold lg-btn--full" onClick={handleImageVerify}>Verify Selection →</button>
              </>
            )}
          </div>
        )}

        {/* STEP 3: TYPING TEST */}
        {step === "typing-test" && (
          <div className="lg-card lg-anim">
            <div className="lg-card__icon">⌨️</div>
            <h2>Typing behaviour test</h2>
            <p className="lg-card__sub">Type the phrase naturally. ScriptGuard analyses your keystroke rhythm — bots type too uniformly and are blocked automatically.</p>
            <div className="lg-phrase-box">"{TYPING_PHRASE}"</div>
            <div className="lg-field">
              <label>Type the exact phrase above (no pasting)</label>
              <textarea className="lg-input lg-textarea" rows={3} placeholder="Start typing here…" value={typed}
                onChange={(e) => handleTyping(e.target.value)}
                onPaste={(e) => { e.preventDefault(); setTypingError("⚠️ Pasting is not allowed. Type manually."); }} />
              <div className="lg-typing-prog">
                <div className="lg-typing-track"><div className="lg-typing-fill" style={{ width: `${Math.min((typed.length / TYPING_PHRASE.length) * 100, 100)}%` }} /></div>
                <span>{typed.length}/{TYPING_PHRASE.length}</span>
              </div>
            </div>
            {typingScore === "bot" && (
              <div className="lg-bot-warn">
                <span>🚫</span>
                <div><strong>Bot-like typing detected.</strong><p>Your keystrokes are too uniform. Type naturally, character by character. Do not use auto-fill or browser extensions.</p></div>
              </div>
            )}
            {typingError && <div className="lg-error">{typingError}</div>}
            <button className="lg-btn lg-btn--gold lg-btn--full" onClick={analyzeTyping} disabled={loading}>
              {loading ? <><span className="lg-spin" /> Analysing…</> : "Analyse & Confirm →"}
            </button>
            <div className="lg-info-box" style={{marginTop:"0.75rem"}}><span>🔬</span><span>Inter-keystroke timing variance, rhythm, and speed are all measured. Humans have natural inconsistency — bots don't.</span></div>
          </div>
        )}

        {/* DONE */}
        {step === "done" && (
          <div className="lg-card lg-success lg-anim">
            <div className="lg-success__icon">✅</div>
            <h2>Human Verified!</h2>
            <p>All three checks passed. Welcome back.</p>
            <div className="lg-checks">
              {["Credentials verified ✓","Mental maths passed ✓","Image challenge passed ✓","Typing: Human confirmed ✓"].map((c, i) => (
                <div key={i} className="lg-check-row">{c}</div>
              ))}
            </div>
            <a href="/student" className="lg-btn lg-btn--gold lg-btn--full">Go to My Task Dashboard →</a>
            <p className="lg-caption" style={{marginTop:"1rem"}}>🤖 ScriptGuard AI is now monitoring your session.</p>
          </div>
        )}
      </main>

      <footer className="lg-footer">
        <span>© 2025 ScriptMaster</span>
        <span>🔒 Human verification by ScriptGuard AI</span>
        <span><a href="/rules">Rules</a> · <a href="/">Home</a></span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .lg-root{font-family:'DM Sans',sans-serif;background:#071524;color:#d8e4ec;min-height:100vh;display:flex;flex-direction:column;position:relative;overflow-x:hidden;}
        .lg-bg{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
        .lg-orb{position:absolute;border-radius:50%;filter:blur(90px);}
        .lg-orb--1{width:500px;height:500px;background:#0f3050;top:-150px;right:-100px;opacity:0.6;}
        .lg-orb--2{width:350px;height:350px;background:#1a3020;bottom:10%;left:-80px;opacity:0.45;}
        .lg-header{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1rem 3rem;background:rgba(7,21,36,0.92);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,0.06);}
        .lg-logo{display:flex;align-items:center;gap:0.5rem;text-decoration:none;}
        .lg-logo__mark,.lg-logo span:last-child{color:#e8c87d;}
        .lg-logo span:last-child{font-family:'Lora',serif;font-size:1.2rem;font-weight:700;}
        .lg-secure-tag{font-size:0.78rem;color:#9ecfb8;background:rgba(158,207,184,0.1);border:1px solid rgba(158,207,184,0.25);padding:0.28rem 0.75rem;border-radius:100px;}
        .lg-main{flex:1;display:flex;flex-direction:column;align-items:center;padding:2.5rem 1.5rem 4rem;position:relative;z-index:1;}
        .lg-progress{display:flex;align-items:center;justify-content:center;margin-bottom:2.5rem;gap:0;}
        .lg-prog-step{display:flex;align-items:center;gap:0.5rem;}
        .lg-prog-circle{width:36px;height:36px;border-radius:50%;border:2px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:0.82rem;color:#3a5060;background:#071524;transition:all 0.3s;flex-shrink:0;}
        .lg-prog-step.done .lg-prog-circle{border-color:#9ecfb8;background:rgba(158,207,184,0.1);color:#9ecfb8;}
        .lg-prog-step.active .lg-prog-circle{border-color:#e8c87d;background:rgba(232,200,125,0.12);color:#e8c87d;}
        .lg-prog-step span{font-size:0.75rem;color:#3a5060;white-space:nowrap;}
        .lg-prog-step.active span{color:#e8c87d;}
        .lg-prog-step.done span{color:#9ecfb8;}
        .lg-prog-line{width:45px;height:1px;background:rgba(255,255,255,0.08);margin:0 0.5rem;}
        .lg-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:2.2rem;width:100%;max-width:460px;box-shadow:0 20px 60px rgba(0,0,0,0.35);}
        .lg-anim{animation:lgFade 0.3s ease;}
        @keyframes lgFade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .lg-card__icon{font-size:2.2rem;text-align:center;margin-bottom:0.6rem;}
        .lg-card h2{font-family:'Lora',serif;font-size:1.55rem;font-weight:700;color:#f0ece4;text-align:center;margin-bottom:0.4rem;}
        .lg-card__sub{font-size:0.84rem;color:#4a6070;text-align:center;margin-bottom:1.6rem;line-height:1.6;}
        .lg-field{display:flex;flex-direction:column;gap:0.4rem;margin-bottom:1rem;}
        .lg-field label{font-size:0.8rem;font-weight:500;color:#7a9ab8;}
        .lg-input{background:#071524;border:1px solid rgba(255,255,255,0.1);border-radius:9px;padding:0.68rem 0.9rem;color:#d8e4ec;font-size:0.9rem;font-family:'DM Sans',sans-serif;transition:border-color 0.18s;outline:none;width:100%;}
        .lg-input:focus{border-color:#e8c87d;}
        .lg-input--center{text-align:center;font-size:1.3rem;letter-spacing:0.05em;}
        .lg-input-wrap{position:relative;}
        .lg-eye{position:absolute;right:0.8rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:1rem;}
        .lg-textarea{resize:none;line-height:1.6;}
        .lg-error{background:rgba(231,76,60,0.1);border:1px solid rgba(231,76,60,0.3);color:#e74c3c;font-size:0.8rem;padding:0.5rem 0.75rem;border-radius:7px;margin-bottom:0.75rem;}
        .lg-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.7rem 1.4rem;border-radius:9px;font-size:0.92rem;font-weight:600;text-decoration:none;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all 0.18s;white-space:nowrap;}
        .lg-btn--full{width:100%;margin-bottom:0.6rem;}
        .lg-btn--gold{background:#e8c87d;color:#1a0e05;}
        .lg-btn--gold:hover:not(:disabled){background:#f0d698;box-shadow:0 6px 20px rgba(232,200,125,0.28);}
        .lg-btn--gold:disabled{opacity:0.65;cursor:not-allowed;}
        .lg-btn--ghost{background:transparent;color:#8aa5b8;border:1px solid rgba(255,255,255,0.12);}
        .lg-btn--ghost:hover{border-color:#e8c87d;color:#e8c87d;}
        .lg-divider{text-align:center;font-size:0.78rem;color:#2a3a48;margin:0.2rem 0;}
        .lg-info-box{display:flex;align-items:flex-start;gap:0.6rem;background:rgba(184,169,232,0.06);border:1px solid rgba(184,169,232,0.18);border-radius:9px;padding:0.7rem;font-size:0.76rem;color:#7a8aaa;line-height:1.6;}
        .lg-info-box strong{color:#b8a9e8;}
        .lg-spin{width:14px;height:14px;border:2px solid rgba(26,14,5,0.3);border-top-color:#1a0e05;border-radius:50%;animation:spin 0.7s linear infinite;flex-shrink:0;}
        @keyframes spin{to{transform:rotate(360deg)}}
        .lg-challenge-tag{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:#e8c87d;margin-bottom:1rem;}
        .lg-math-box{font-family:'Lora',serif;font-size:2rem;font-weight:700;color:#f0ece4;text-align:center;background:#071524;border-radius:12px;padding:1.5rem;margin-bottom:1rem;}
        .lg-img-instruction{font-size:0.86rem;color:#7a9ab8;margin-bottom:0.9rem;line-height:1.6;}
        .lg-img-instruction strong{color:#f0ece4;}
        .lg-highlight{color:#e8c87d;font-style:normal;font-weight:600;}
        .lg-img-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0.55rem;margin-bottom:0.9rem;}
        .lg-img-tile{position:relative;background:#071524;border:2px solid rgba(255,255,255,0.07);border-radius:10px;padding:1.1rem 0.5rem;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.18s;}
        .lg-img-tile:hover{border-color:rgba(232,200,125,0.35);}
        .lg-img-tile.selected{border-color:#9ecfb8;background:rgba(158,207,184,0.1);}
        .lg-img-emoji{font-size:2rem;}
        .lg-img-tick{position:absolute;top:4px;right:6px;font-size:0.7rem;color:#9ecfb8;font-weight:700;}
        .lg-caption{font-size:0.73rem;color:#2a3a48;text-align:center;margin-top:0.6rem;line-height:1.5;}
        .lg-phrase-box{font-family:'Lora',serif;font-size:0.98rem;font-style:italic;color:#f0ece4;background:#071524;border-left:3px solid #e8c87d;padding:1rem 1.1rem;border-radius:6px;margin-bottom:1.2rem;line-height:1.6;}
        .lg-typing-prog{display:flex;align-items:center;gap:0.7rem;margin-top:0.4rem;}
        .lg-typing-track{flex:1;height:5px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden;}
        .lg-typing-fill{height:100%;background:#e8c87d;border-radius:3px;transition:width 0.1s;}
        .lg-typing-prog span{font-size:0.72rem;color:#3a5060;white-space:nowrap;}
        .lg-bot-warn{display:flex;gap:0.7rem;background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.25);border-radius:10px;padding:0.9rem;margin-bottom:0.75rem;font-size:0.82rem;}
        .lg-bot-warn span:first-child{font-size:1.2rem;flex-shrink:0;}
        .lg-bot-warn strong{display:block;color:#e74c3c;margin-bottom:0.2rem;}
        .lg-bot-warn p{color:#7a9ab8;line-height:1.5;}
        .lg-success{text-align:center;border-color:rgba(158,207,184,0.3);}
        .lg-success__icon{font-size:3.5rem;animation:pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;margin-bottom:0.75rem;}
        @keyframes pop{from{transform:scale(0)}to{transform:scale(1)}}
        .lg-success h2{font-family:'Lora',serif;font-size:1.7rem;color:#f0ece4;margin-bottom:0.5rem;}
        .lg-success>p{font-size:0.87rem;color:#5a7a8e;margin-bottom:1.5rem;}
        .lg-checks{display:flex;flex-direction:column;gap:0.4rem;margin-bottom:1.5rem;}
        .lg-check-row{background:rgba(158,207,184,0.07);border:1px solid rgba(158,207,184,0.2);border-radius:8px;padding:0.5rem 0.85rem;font-size:0.83rem;color:#9ecfb8;text-align:left;}
        .lg-footer{position:relative;z-index:1;display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;padding:1.2rem 3rem;border-top:1px solid rgba(255,255,255,0.05);font-size:0.75rem;color:#2a3a48;}
        .lg-footer a{color:#3a5060;text-decoration:none;}
        .lg-footer a:hover{color:#e8c87d;}
        @media(max-width:580px){.lg-header{padding:0.9rem 1rem;}.lg-prog-line{width:22px;}.lg-prog-step span{display:none;}.lg-footer{padding:1rem;flex-direction:column;text-align:center;}}
      `}</style>
    </div>
  );
}