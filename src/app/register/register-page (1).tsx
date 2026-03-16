"use client";
import { useState } from "react";

type Step = 1 | 2 | 3 | 4;

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    password: "", confirm: "",
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: string, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v: string) =>
    v.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    if (!agreed) e.agreed = "You must agree to the rules";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.cardName.trim()) e.cardName = "Required";
    if (form.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Enter a valid 16-digit card number";
    if (form.expiry.length < 5) e.expiry = "Enter valid expiry MM/YY";
    if (form.cvv.length < 3) e.cvv = "Enter valid CVV";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) {
      setLoading(true);
      setTimeout(() => { setLoading(false); setStep(3); }, 2200);
    }
  };

  return (
    <div className="rg-root">
      {/* BG */}
      <div className="rg-bg" aria-hidden="true">
        <div className="rg-orb rg-orb--1" />
        <div className="rg-orb rg-orb--2" />
        <div className="rg-orb rg-orb--3" />
      </div>

      {/* HEADER */}
      <header className="rg-header">
        <a href="/" className="rg-logo">
          <span className="rg-logo__mark">✦</span>
          <span>ScriptMaster</span>
        </a>
        <div className="rg-header__right">
          <span className="rg-secure-badge">🔒 Secure Checkout</span>
          <a href="/" className="rg-link">← Back to site</a>
        </div>
      </header>

      <main className="rg-main">
        {/* PROGRESS STEPS */}
        <div className="rg-progress">
          {[
            { n: 1, label: "Your Details" },
            { n: 2, label: "Payment" },
            { n: 3, label: "Confirmed" },
          ].map((s) => (
            <div key={s.n} className={`rg-step ${step >= s.n ? "done" : ""} ${step === s.n ? "active" : ""}`}>
              <div className="rg-step__circle">
                {step > s.n ? "✓" : s.n}
              </div>
              <span>{s.label}</span>
              {s.n < 3 && <div className="rg-step__line" />}
            </div>
          ))}
        </div>

        <div className="rg-layout">
          {/* ── LEFT: FORM ── */}
          <div className="rg-form-col">

            {/* STEP 1: Details */}
            {step === 1 && (
              <div className="rg-card rg-anim-in">
                <h2 className="rg-card__title">Create your account</h2>
                <p className="rg-card__sub">Fill in your details below. You'll pay on the next step.</p>

                <div className="rg-row">
                  <div className="rg-field">
                    <label>First Name <span className="rg-req">*</span></label>
                    <input className={`rg-input ${errors.firstName ? "rg-input--err" : ""}`} placeholder="Amara" value={form.firstName} onChange={(e) => set("firstName", e.target.value)}/>
                    {errors.firstName && <span className="rg-err">{errors.firstName}</span>}
                  </div>
                  <div className="rg-field">
                    <label>Last Name <span className="rg-req">*</span></label>
                    <input className={`rg-input ${errors.lastName ? "rg-input--err" : ""}`} placeholder="Osei" value={form.lastName} onChange={(e) => set("lastName", e.target.value)}/>
                    {errors.lastName && <span className="rg-err">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="rg-field">
                  <label>Email Address <span className="rg-req">*</span></label>
                  <input type="email" className={`rg-input ${errors.email ? "rg-input--err" : ""}`} placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)}/>
                  {errors.email && <span className="rg-err">{errors.email}</span>}
                </div>

                <div className="rg-field">
                  <label>Phone Number <span className="rg-optional">(optional)</span></label>
                  <input type="tel" className="rg-input" placeholder="+254 700 000 000" value={form.phone} onChange={(e) => set("phone", e.target.value)}/>
                </div>

                <div className="rg-row">
                  <div className="rg-field">
                    <label>Password <span className="rg-req">*</span></label>
                    <input type="password" className={`rg-input ${errors.password ? "rg-input--err" : ""}`} placeholder="Min. 6 characters" value={form.password} onChange={(e) => set("password", e.target.value)}/>
                    {errors.password && <span className="rg-err">{errors.password}</span>}
                  </div>
                  <div className="rg-field">
                    <label>Confirm Password <span className="rg-req">*</span></label>
                    <input type="password" className={`rg-input ${errors.confirm ? "rg-input--err" : ""}`} placeholder="Repeat password" value={form.confirm} onChange={(e) => set("confirm", e.target.value)}/>
                    {errors.confirm && <span className="rg-err">{errors.confirm}</span>}
                  </div>
                </div>

                <div className={`rg-rules-agree ${errors.agreed ? "rg-rules-agree--err" : ""}`}>
                  <label className="rg-checkbox-label">
                    <input type="checkbox" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); setErrors((er) => ({ ...er, agreed: "" })); }} className="rg-checkbox"/>
                    <span>I have read and agree to the <a href="/rules" target="_blank">ScriptMaster Community Rules</a> including the automatic ban policy for violations.</span>
                  </label>
                  {errors.agreed && <span className="rg-err">{errors.agreed}</span>}
                </div>

                <button className="rg-btn rg-btn--gold rg-btn--full" onClick={handleNext}>
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* STEP 2: Payment */}
            {step === 2 && (
              <div className="rg-card rg-anim-in">
                <h2 className="rg-card__title">Complete your purchase</h2>
                <p className="rg-card__sub">One-time payment of <strong className="rg-price-inline">$12</strong>. No subscriptions, no hidden fees.</p>

                <div className="rg-payment-icons">
                  {["VISA","MC","AMEX","PayPal"].map((p) => (
                    <span key={p} className="rg-pay-icon">{p}</span>
                  ))}
                </div>

                <div className="rg-field">
                  <label>Name on Card <span className="rg-req">*</span></label>
                  <input className={`rg-input ${errors.cardName ? "rg-input--err" : ""}`} placeholder="AMARA OSEI" value={form.cardName} onChange={(e) => set("cardName", e.target.value.toUpperCase())}/>
                  {errors.cardName && <span className="rg-err">{errors.cardName}</span>}
                </div>

                <div className="rg-field">
                  <label>Card Number <span className="rg-req">*</span></label>
                  <div className="rg-input-icon-wrap">
                    <input className={`rg-input ${errors.cardNumber ? "rg-input--err" : ""}`} placeholder="0000 0000 0000 0000" value={form.cardNumber} onChange={(e) => set("cardNumber", formatCard(e.target.value))} maxLength={19}/>
                    <span className="rg-input-icon">💳</span>
                  </div>
                  {errors.cardNumber && <span className="rg-err">{errors.cardNumber}</span>}
                </div>

                <div className="rg-row">
                  <div className="rg-field">
                    <label>Expiry Date <span className="rg-req">*</span></label>
                    <input className={`rg-input ${errors.expiry ? "rg-input--err" : ""}`} placeholder="MM/YY" value={form.expiry} onChange={(e) => set("expiry", formatExpiry(e.target.value))} maxLength={5}/>
                    {errors.expiry && <span className="rg-err">{errors.expiry}</span>}
                  </div>
                  <div className="rg-field">
                    <label>CVV <span className="rg-req">*</span></label>
                    <input className={`rg-input ${errors.cvv ? "rg-input--err" : ""}`} placeholder="123" type="password" value={form.cvv} onChange={(e) => set("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))} maxLength={4}/>
                    {errors.cvv && <span className="rg-err">{errors.cvv}</span>}
                  </div>
                </div>

                <div className="rg-total-row">
                  <span>Student Account — Lifetime Access</span>
                  <span className="rg-total-amt">$12.00</span>
                </div>

                <button className="rg-btn rg-btn--gold rg-btn--full" onClick={handleNext} disabled={loading}>
                  {loading ? (
                    <><span className="rg-spinner" /> Processing payment…</>
                  ) : "Pay $12 & Activate Account →"}
                </button>

                <div className="rg-secure-note">
                  🔒 Your payment is encrypted and secure. We never store card details.
                </div>

                <button className="rg-back-btn" onClick={() => setStep(1)}>← Back to details</button>
              </div>
            )}

            {/* STEP 3: Success */}
            {step === 3 && (
              <div className="rg-card rg-success rg-anim-in">
                <div className="rg-success__icon">🎉</div>
                <h2>Account Activated!</h2>
                <p>Welcome to ScriptMaster, <strong>{form.firstName}!</strong> Your account is live and ready. A confirmation email has been sent to <strong>{form.email}</strong>.</p>

                <div className="rg-success__details">
                  <div className="rg-success__row">
                    <span>Account type</span>
                    <strong>Student — Lifetime Access</strong>
                  </div>
                  <div className="rg-success__row">
                    <span>Amount paid</span>
                    <strong style={{color:"#9ecfb8"}}>$12.00 ✓</strong>
                  </div>
                  <div className="rg-success__row">
                    <span>Rules agreed</span>
                    <strong style={{color:"#9ecfb8"}}>Yes — Binding ✓</strong>
                  </div>
                  <div className="rg-success__row">
                    <span>AI Moderation</span>
                    <strong style={{color:"#b8a9e8"}}>ScriptGuard Active 🤖</strong>
                  </div>
                </div>

                <div className="rg-success__reminder">
                  <strong>⚠️ Remember:</strong> Your account is protected by ScriptGuard AI. Any community rule violation will result in automatic warnings or a permanent ban. Stay honest, stay respectful.
                </div>

                <div className="rg-success__actions">
                  <a href="/student" className="rg-btn rg-btn--gold rg-btn--lg">Go to My Dashboard →</a>
                  <a href="/" className="rg-btn rg-btn--ghost">Back to Homepage</a>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: ORDER SUMMARY ── */}
          {step < 3 && (
            <div className="rg-summary">
              <div className="rg-summary__card">
                <div className="rg-summary__label">✦ Order Summary</div>
                <div className="rg-summary__product">
                  <div className="rg-summary__product-icon">🎓</div>
                  <div>
                    <strong>Student Account</strong>
                    <span>Lifetime access — pay once</span>
                  </div>
                </div>
                <div className="rg-summary__lines">
                  <div className="rg-summary__line"><span>Account access</span><span>$12.00</span></div>
                  <div className="rg-summary__line"><span>Recurring fees</span><span className="rg-green">$0.00</span></div>
                  <div className="rg-summary__line rg-summary__line--total"><span>Total today</span><span>$12.00</span></div>
                </div>
                <div className="rg-summary__includes">
                  <div className="rg-summary__label" style={{marginBottom:"0.75rem"}}>What's included</div>
                  {["All free training content","Receive real writing tasks","Personal teacher feedback","Progress dashboard","Completion certificate","ScriptGuard AI protection","Lifetime access"].map((f) => (
                    <div key={f} className="rg-summary__feature"><span className="rg-check">✓</span>{f}</div>
                  ))}
                </div>
                <div className="rg-summary__rules-note">
                  <strong>📜 Rules apply:</strong> By purchasing, you agree to all{" "}
                  <a href="/rules" target="_blank">community rules</a>. Violations
                  result in automatic bans with no refund.
                </div>
              </div>

              <div className="rg-trust-badges">
                <div className="rg-trust"><span>🔒</span> SSL Encrypted</div>
                <div className="rg-trust"><span>✓</span> One-time only</div>
                <div className="rg-trust"><span>🤖</span> AI Protected</div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="rg-footer">
        <span>© 2025 ScriptMaster.</span>
        <span>🔒 Secure checkout · 🤖 ScriptGuard AI</span>
        <span>
          <a href="/rules">Community Rules</a> ·{" "}
          <a href="/">Home</a>
        </span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

        .rg-root{font-family:'DM Sans',sans-serif;background:#071524;color:#d8e4ec;min-height:100vh;overflow-x:hidden;position:relative;}

        .rg-bg{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
        .rg-orb{position:absolute;border-radius:50%;filter:blur(90px);}
        .rg-orb--1{width:550px;height:550px;background:#0f3050;top:-200px;right:-150px;opacity:0.6;}
        .rg-orb--2{width:350px;height:350px;background:#1a3020;bottom:5%;left:-80px;opacity:0.4;}
        .rg-orb--3{width:250px;height:250px;background:#e8c87d;top:50%;left:50%;opacity:0.03;}

        .rg-header{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1rem 3rem;background:rgba(7,21,36,0.92);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,0.06);}
        .rg-logo{display:flex;align-items:center;gap:0.5rem;text-decoration:none;}
        .rg-logo__mark{color:#e8c87d;}
        .rg-logo span:last-child{font-family:'Lora',serif;font-size:1.2rem;font-weight:700;color:#e8c87d;}
        .rg-header__right{display:flex;align-items:center;gap:1.5rem;}
        .rg-secure-badge{font-size:0.78rem;color:#9ecfb8;background:rgba(158,207,184,0.1);border:1px solid rgba(158,207,184,0.25);padding:0.28rem 0.7rem;border-radius:100px;}
        .rg-link{font-size:0.84rem;color:#4a6070;text-decoration:none;transition:color 0.18s;}
        .rg-link:hover{color:#e8c87d;}

        .rg-main{position:relative;z-index:1;max-width:960px;margin:0 auto;padding:2.5rem 2rem 4rem;}

        /* PROGRESS */
        .rg-progress{display:flex;align-items:center;justify-content:center;gap:0;margin-bottom:3rem;}
        .rg-step{display:flex;align-items:center;gap:0.6rem;position:relative;}
        .rg-step__circle{width:34px;height:34px;border-radius:50%;border:2px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;font-size:0.82rem;font-weight:600;color:#4a6070;background:#071524;transition:all 0.3s;flex-shrink:0;}
        .rg-step.done .rg-step__circle{border-color:#9ecfb8;background:rgba(158,207,184,0.12);color:#9ecfb8;}
        .rg-step.active .rg-step__circle{border-color:#e8c87d;background:rgba(232,200,125,0.15);color:#e8c87d;}
        .rg-step span{font-size:0.82rem;color:#4a6070;}
        .rg-step.active span{color:#e8c87d;font-weight:500;}
        .rg-step.done span{color:#9ecfb8;}
        .rg-step__line{width:80px;height:1px;background:rgba(255,255,255,0.1);margin:0 0.8rem;}

        .rg-layout{display:grid;grid-template-columns:1fr 340px;gap:2rem;align-items:start;}

        /* CARD */
        .rg-card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:2.2rem;}
        .rg-anim-in{animation:rgFadeIn 0.3s ease;}
        @keyframes rgFadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .rg-card__title{font-family:'Lora',serif;font-size:1.55rem;font-weight:700;color:#f0ece4;margin-bottom:0.4rem;}
        .rg-card__sub{font-size:0.88rem;color:#4a6070;margin-bottom:1.8rem;line-height:1.5;}

        .rg-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
        .rg-field{display:flex;flex-direction:column;gap:0.4rem;margin-bottom:1.1rem;}
        .rg-field label{font-size:0.82rem;font-weight:500;color:#7a9ab8;}
        .rg-req{color:#e8c87d;}
        .rg-optional{color:#3a5060;font-size:0.75rem;}
        .rg-input{background:#071524;border:1px solid rgba(255,255,255,0.1);border-radius:9px;padding:0.7rem 0.95rem;color:#d8e4ec;font-size:0.9rem;font-family:'DM Sans',sans-serif;transition:border-color 0.18s;outline:none;width:100%;}
        .rg-input:focus{border-color:#e8c87d;}
        .rg-input--err{border-color:#e74c3c;}
        .rg-err{font-size:0.75rem;color:#e74c3c;margin-top:-0.25rem;}
        .rg-input-icon-wrap{position:relative;}
        .rg-input-icon{position:absolute;right:0.9rem;top:50%;transform:translateY(-50%);font-size:1rem;pointer-events:none;}

        .rg-rules-agree{background:rgba(232,200,125,0.05);border:1px solid rgba(232,200,125,0.2);border-radius:10px;padding:1rem;margin-bottom:1.4rem;}
        .rg-rules-agree--err{border-color:#e74c3c;}
        .rg-checkbox-label{display:flex;align-items:flex-start;gap:0.75rem;cursor:pointer;font-size:0.85rem;color:#8aa5b8;line-height:1.6;}
        .rg-checkbox{width:17px;height:17px;accent-color:#e8c87d;flex-shrink:0;margin-top:2px;}
        .rg-checkbox-label a{color:#e8c87d;text-decoration:none;}
        .rg-checkbox-label a:hover{text-decoration:underline;}

        .rg-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.65rem 1.5rem;border-radius:9px;font-size:0.92rem;font-weight:600;text-decoration:none;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all 0.18s;}
        .rg-btn--lg{padding:0.9rem 2rem;font-size:1rem;}
        .rg-btn--full{width:100%;}
        .rg-btn--gold{background:#e8c87d;color:#1a0e05;}
        .rg-btn--gold:hover:not(:disabled){background:#f0d698;box-shadow:0 6px 24px rgba(232,200,125,0.35);transform:translateY(-1px);}
        .rg-btn--gold:disabled{opacity:0.7;cursor:not-allowed;}
        .rg-btn--ghost{background:transparent;color:#8aa5b8;border:1px solid rgba(255,255,255,0.15);}
        .rg-btn--ghost:hover{border-color:#e8c87d;color:#e8c87d;}

        .rg-payment-icons{display:flex;gap:0.5rem;margin-bottom:1.5rem;flex-wrap:wrap;}
        .rg-pay-icon{font-size:0.7rem;font-weight:700;padding:0.3rem 0.65rem;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:5px;color:#6a8090;letter-spacing:0.05em;}
        .rg-price-inline{color:#e8c87d;}

        .rg-total-row{display:flex;justify-content:space-between;align-items:center;background:rgba(232,200,125,0.08);border:1px solid rgba(232,200,125,0.2);border-radius:10px;padding:0.9rem 1.1rem;margin-bottom:1.4rem;font-size:0.9rem;color:#c8d8e4;}
        .rg-total-amt{font-size:1.2rem;font-weight:700;color:#e8c87d;font-family:'Lora',serif;}

        .rg-secure-note{font-size:0.78rem;color:#3a5060;text-align:center;margin:0.75rem 0 1rem;}
        .rg-back-btn{background:none;border:none;color:#3a5060;font-size:0.82rem;cursor:pointer;font-family:'DM Sans',sans-serif;transition:color 0.18s;padding:0;}
        .rg-back-btn:hover{color:#e8c87d;}

        .rg-spinner{width:16px;height:16px;border:2px solid rgba(26,14,5,0.3);border-top-color:#1a0e05;border-radius:50%;animation:spin 0.7s linear infinite;flex-shrink:0;}
        @keyframes spin{to{transform:rotate(360deg)}}

        /* SUCCESS */
        .rg-success{text-align:center;border-color:rgba(158,207,184,0.3);}
        .rg-success__icon{font-size:4rem;margin-bottom:1rem;}
        .rg-success h2{font-family:'Lora',serif;font-size:2rem;color:#f0ece4;margin-bottom:0.6rem;}
        .rg-success>p{font-size:0.9rem;color:#6a8090;line-height:1.7;margin-bottom:1.8rem;}
        .rg-success strong{color:#d8e4ec;}
        .rg-success__details{background:#071524;border-radius:12px;padding:1.2rem;margin-bottom:1.5rem;text-align:left;}
        .rg-success__row{display:flex;justify-content:space-between;align-items:center;padding:0.55rem 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:0.85rem;}
        .rg-success__row:last-child{border:none;}
        .rg-success__row span{color:#4a6070;}
        .rg-success__row strong{color:#d8e4ec;}
        .rg-success__reminder{background:rgba(232,200,125,0.07);border:1px solid rgba(232,200,125,0.2);border-radius:10px;padding:1rem;font-size:0.83rem;color:#8aa5b8;line-height:1.65;margin-bottom:1.8rem;text-align:left;}
        .rg-success__reminder strong{color:#e8c87d;}
        .rg-success__actions{display:flex;flex-direction:column;gap:0.75rem;}

        /* SUMMARY */
        .rg-summary__card{background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:1.5rem;margin-bottom:1rem;}
        .rg-summary__label{font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:#e8c87d;margin-bottom:1rem;}
        .rg-summary__product{display:flex;align-items:center;gap:1rem;padding-bottom:1.2rem;border-bottom:1px solid rgba(255,255,255,0.07);margin-bottom:1.2rem;}
        .rg-summary__product-icon{font-size:1.8rem;width:46px;height:46px;background:#071524;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .rg-summary__product strong{display:block;font-size:0.92rem;color:#f0ece4;margin-bottom:0.2rem;}
        .rg-summary__product span{font-size:0.78rem;color:#4a6070;}
        .rg-summary__lines{display:flex;flex-direction:column;gap:0.5rem;padding-bottom:1.2rem;border-bottom:1px solid rgba(255,255,255,0.07);margin-bottom:1.2rem;}
        .rg-summary__line{display:flex;justify-content:space-between;font-size:0.84rem;color:#6a8090;}
        .rg-summary__line--total{font-weight:600;color:#f0ece4;font-size:1rem;padding-top:0.4rem;}
        .rg-green{color:#9ecfb8;}
        .rg-summary__includes{display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1.2rem;}
        .rg-summary__feature{display:flex;align-items:center;gap:0.6rem;font-size:0.82rem;color:#8aa5b8;}
        .rg-check{color:#9ecfb8;font-weight:700;font-size:0.85rem;}
        .rg-summary__rules-note{font-size:0.76rem;color:#3a5060;background:rgba(231,76,60,0.05);border:1px solid rgba(231,76,60,0.15);border-radius:8px;padding:0.75rem;line-height:1.6;}
        .rg-summary__rules-note strong{color:#e8c87d;}
        .rg-summary__rules-note a{color:#e8c87d;text-decoration:none;}

        .rg-trust-badges{display:flex;gap:0.5rem;flex-wrap:wrap;}
        .rg-trust{display:flex;align-items:center;gap:0.4rem;font-size:0.75rem;color:#3a5060;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:7px;padding:0.4rem 0.75rem;}

        .rg-footer{position:relative;z-index:1;display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;align-items:center;padding:1.5rem 3rem;border-top:1px solid rgba(255,255,255,0.05);font-size:0.78rem;color:#2a3a48;}
        .rg-footer a{color:#3a5060;text-decoration:none;transition:color 0.18s;}
        .rg-footer a:hover{color:#e8c87d;}

        @media(max-width:760px){
          .rg-layout{grid-template-columns:1fr;}
          .rg-row{grid-template-columns:1fr;}
          .rg-header{padding:1rem 1.2rem;}
          .rg-main{padding:2rem 1.2rem 3rem;}
          .rg-step span{display:none;}
          .rg-step__line{width:40px;}
          .rg-footer{padding:1.2rem;flex-direction:column;text-align:center;}
        }
      `}</style>
    </div>
  );
}
