"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTask, setActiveTask] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const testimonialTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    testimonialTimer.current = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % testimonials.length);
    }, 4500);
    return () => { if (testimonialTimer.current) clearInterval(testimonialTimer.current); };
  }, []);

  const goTestimonial = (i: number) => {
    setTestimonialIdx(i);
    if (testimonialTimer.current) clearInterval(testimonialTimer.current);
    testimonialTimer.current = setInterval(() => {
      setTestimonialIdx((idx) => (idx + 1) % testimonials.length);
    }, 4500);
  };

  const tasks = [
    { label: "Essay", icon: "📝", color: "#e8c87d" },
    { label: "Report", icon: "📊", color: "#9ecfb8" },
    { label: "Story", icon: "📖", color: "#f4a97f" },
    { label: "Review", icon: "✍️", color: "#b8a9e8" },
  ];

  const testimonials = [
    { name: "Amara Osei", role: "Student, Accra", text: "I honestly thought this was a scam at first. My friend sent me the link and I almost ignored it. Then I tried the free training and was blown away — the tasks are real, the feedback is personal. I've improved so much.", initials: "AO", color: "#e8c87d", stars: 5 },
    { name: "Brian Kimani", role: "Freelance Writer, Nairobi", text: "ScriptMaster seemed too good to be true. $12 one-time? I bought it expecting nothing. Three weeks later I had completed 6 tasks and received genuine grades. This is the real deal.", initials: "BK", color: "#9ecfb8", stars: 5 },
    { name: "Fatima Musa", role: "University Student, Lagos", text: "My classmates and I were skeptical. We did our own research before buying. When we saw actual student reviews and tried the free lessons, we went ahead. Best decision — completely legit.", initials: "FM", color: "#f4a97f", stars: 5 },
    { name: "David Otieno", role: "High School Teacher, Kisumu", text: "I recommend ScriptMaster to all my students now. I was cautious at first because there are many fake sites. But the platform is professional, the AI moderation keeps it clean and fair.", initials: "DO", color: "#b8a9e8", stars: 5 },
    { name: "Chinwe Adaeze", role: "Content Creator, Enugu", text: "When I first heard 'pay for an account' I thought here we go again. But the free training let me see exactly what I'd get before spending a cent. I paid confidently and it delivered everything promised.", initials: "CA", color: "#e8c87d", stars: 5 },
    { name: "Samuel Njoroge", role: "Student, Mombasa", text: "I tested this for two weeks on free training. The tasks, the interface, the teacher feedback — nothing felt fake. I bought my account and I've been submitting work ever since. Truly legit.", initials: "SN", color: "#9ecfb8", stars: 5 },
    { name: "Grace Wanjiru", role: "Writing Tutor, Nakuru", text: "As a tutor I was professionally skeptical. I stress-tested the platform. The AI bot that handles rule violations is transparent and fair. Students know exactly what's expected. Very impressed.", initials: "GW", color: "#f4a97f", stars: 5 },
    { name: "Emeka Chukwu", role: "Graduate Student, Abuja", text: "I signed up thinking I'd ask for a refund in a week. Instead I'm still here six months later. The certificate I earned is something I'm genuinely proud of. Wasn't a scam — it's a real skill builder.", initials: "EC", color: "#b8a9e8", stars: 5 },
    { name: "Aisha Bello", role: "Journalist, Kano", text: "My editor actually suggested I try ScriptMaster to sharpen my writing. I was doubtful — journalists don't trust easily. But the platform's transparency and real-teacher interaction sold me immediately.", initials: "AB", color: "#e8c87d", stars: 5 },
    { name: "Kofi Mensah", role: "Entrepreneur, Kumasi", text: "I tried three other 'writing platforms' that were pure scams. ScriptMaster is different — you can see the training for free before you commit. The AI moderation keeps the community respectful. Worth every cent.", initials: "KM", color: "#9ecfb8", stars: 5 },
  ];

  const plans = [
    { name: "Free Training", price: "$0", period: "forever", desc: "Access all lessons and writing guides at no cost", features: ["All training videos & lessons", "Writing guides & templates", "Sample tasks to practice", "Community board access"], accent: "#9ecfb8", cta: "Start Learning Free", ctaClass: "wp-btn--plan-ghost" },
    { name: "Student Account", price: "$12", period: "one-time", desc: "Full access — pay once, yours forever", features: ["Everything in Free Training", "Receive & submit real tasks", "Personal teacher feedback", "Progress tracking dashboard", "Completion certificate", "Lifetime access"], accent: "#e8c87d", featured: true, cta: "Buy Your Account →", ctaClass: "wp-btn--gold" },
    { name: "Class Bundle", price: "$89", period: "per class", desc: "For teachers enrolling a full group", features: ["Up to 10 student accounts", "Bulk task assignment", "Class analytics dashboard", "Teacher grading tools", "Priority support"], accent: "#f4a97f", cta: "Buy for Your Class", ctaClass: "wp-btn--plan-ghost" },
  ];

  return (
    <div className="wp-root">

      {/* ══════════ MODERN BACKGROUND CANVAS ══════════ */}
      <div className="wp-bg-canvas" aria-hidden="true">

        {/* ── Mesh gradient base ── */}
        <div className="wp-bg-mesh" />

        {/* ── Cinematic light beams ── */}
        <div className="wp-beam wp-beam--1" />
        <div className="wp-beam wp-beam--2" />
        <div className="wp-beam wp-beam--3" />

        {/* ── Radial spotlight ── */}
        <div className="wp-spotlight" />

        {/* ── Subtle dot grid ── */}
        <svg className="wp-dot-grid" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#e8c87d" opacity="0.12"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>

        {/* ══ REAL PHOTO WATERMARKS ══ */}

        {/* Photo 1 — Teacher + students with tablets (far left, tall) */}
        <div className="wp-wm wp-wm--1">
          <img src="/images/student_4.jpg" alt="" />
          <div className="wp-wm__tint wp-wm__tint--blue"/>
          <div className="wp-wm__edge wp-wm__edge--left"/>
        </div>

        {/* Photo 2 — Hands on laptops close-up (right side, large) */}
        <div className="wp-wm wp-wm--2">
          <img src="/images/student_3.jpg" alt="" />
          <div className="wp-wm__tint wp-wm__tint--dark"/>
          <div className="wp-wm__edge wp-wm__edge--right"/>
        </div>

        {/* Photo 3 — Group of students at laptop (bottom left) */}
        <div className="wp-wm wp-wm--3">
          <img src="/images/student_1.jpg" alt="" />
          <div className="wp-wm__tint wp-wm__tint--teal"/>
          <div className="wp-wm__edge wp-wm__edge--bottom"/>
        </div>

        {/* Photo 4 — Smiling student at computer (bottom right) */}
        <div className="wp-wm wp-wm--4">
          <img src="/images/image_5.jpg" alt="" />
          <div className="wp-wm__tint wp-wm__tint--gold"/>
          <div className="wp-wm__edge wp-wm__edge--right"/>
        </div>

        {/* Photo 5 — Laptops wide banner (top center strip, ultra faint) */}
        <div className="wp-wm wp-wm--5">
          <img src="/images/student_3.jpg" alt="" />
          <div className="wp-wm__tint wp-wm__tint--dark"/>
        </div>

        {/* Photo 6 — Teacher classroom (mid left repeat, smaller) */}
        <div className="wp-wm wp-wm--6">
          <img src="/images/student_4.jpg" alt="" />
          <div className="wp-wm__tint wp-wm__tint--blue"/>
          <div className="wp-wm__edge wp-wm__edge--left"/>
        </div>

        {/* ── Animated floating notification pills ── */}
        <div className="wp-pill wp-pill--1">✦ New Task Posted</div>
        <div className="wp-pill wp-pill--2">⭐ Grade: A+  •  Well done!</div>
        <div className="wp-pill wp-pill--3">📥 18/24 submitted</div>
        <div className="wp-pill wp-pill--4">🤖 ScriptGuard: Clean ✓</div>
        <div className="wp-pill wp-pill--5">🏆 Certificate earned!</div>
        <div className="wp-pill wp-pill--6">✍️ Task due Friday</div>

        {/* ── Animated particles ── */}
        {[...Array(18)].map((_,i) => (
          <div key={i} className={`wp-particle wp-particle--${i+1}`}/>
        ))}

        {/* ── Gold accent lines ── */}
        <div className="wp-accent-line wp-accent-line--1"/>
        <div className="wp-accent-line wp-accent-line--2"/>
        <div className="wp-accent-line wp-accent-line--3"/>

        {/* ── Bottom gradient fade ── */}
        <div className="wp-bg-fade"/>
      </div>

      {/* ══════════ HEADER / NAV ══════════ */}
      <header className={`wp-header ${scrolled ? "wp-header--scrolled" : ""}`}>
        <a href="/" className="wp-logo">
          <span className="wp-logo__mark">✦</span>
          <span className="wp-logo__text">ScriptMaster</span>
        </a>
        <nav className={`wp-nav ${menuOpen ? "wp-nav--open" : ""}`}>
          <a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#tasks" onClick={() => setMenuOpen(false)}>Tasks</a>
          <a href="#ai-bot" onClick={() => setMenuOpen(false)}>AI Moderation</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
        </nav>
        <div className="wp-header__actions">
          <a href="/teacher" className="wp-btn wp-btn--ghost wp-btn--sm">Teacher Login</a>
          <a href="#pricing" className="wp-btn wp-btn--gold wp-btn--sm">Buy Account</a>
        </div>
        <button className="wp-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </header>

      {/* ══════════ HERO ══════════ */}
      <section className="wp-hero">
        <div className="wp-hero__content">
          <div className="wp-hero__badge">
            <span className="wp-badge__dot" />
            Training is Free — Your Account Unlocks Everything
          </div>
          <h1 className="wp-hero__title">
            Learn. Write.<br />
            <em>Get Certified.</em>
          </h1>
          <p className="wp-hero__sub">
            Access all writing lessons and training completely free. When you're
            ready for real tasks, personal teacher feedback, and your
            certificate — buy your account once and keep it forever.
          </p>
          <div className="wp-hero__cta-row">
            <a href="#pricing" className="wp-btn wp-btn--gold wp-btn--lg">
              Buy Account — $12 One-Time →
            </a>
            <a href="#how" className="wp-btn wp-btn--outline wp-btn--lg">
              Explore Free Training
            </a>
          </div>
          <div className="wp-hero__trust">
            <div className="wp-trust-avatars">
              {["AO","BK","FM","DO","CA"].map((i,idx) => (
                <div key={idx} className="wp-trust-av" style={{left:`${idx*22}px`}}>{i}</div>
              ))}
            </div>
            <div className="wp-trust-text">
              <strong>940+ students</strong> already enrolled
              <span className="wp-trust-stars">★★★★★</span>
            </div>
          </div>
        </div>

        {/* Hero illustration */}
        <div className="wp-hero__visual">
          <div className="wp-hero__visual-glow" />
          <svg viewBox="0 0 540 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="wp-hero__svg">
            {/* Ground shadow */}
            <ellipse cx="270" cy="420" rx="210" ry="30" fill="#0d2235" opacity="0.5"/>
            {/* Desk */}
            <rect x="70" y="318" width="370" height="16" rx="5" fill="#1e3d54"/>
            <rect x="100" y="332" width="12" height="60" rx="3" fill="#162d3f"/>
            <rect x="408" y="332" width="12" height="60" rx="3" fill="#162d3f"/>

            {/* Laptop */}
            <rect x="170" y="228" width="188" height="94" rx="7" fill="#132638"/>
            <rect x="176" y="234" width="176" height="84" rx="5" fill="#0a1e2e"/>
            <rect x="180" y="238" width="168" height="76" rx="4" fill="#0f2d40" opacity="0.9"/>
            <rect x="188" y="246" width="88" height="5" rx="2.5" fill="#e8c87d" opacity="0.75"/>
            <rect x="188" y="256" width="120" height="4" rx="2" fill="#9ecfb8" opacity="0.65"/>
            <rect x="188" y="265" width="70" height="4" rx="2" fill="#f4a97f" opacity="0.55"/>
            <rect x="188" y="274" width="100" height="4" rx="2" fill="#9ecfb8" opacity="0.65"/>
            <rect x="188" y="283" width="60" height="4" rx="2" fill="#b8a9e8" opacity="0.55"/>
            <rect x="188" y="292" width="108" height="4" rx="2" fill="#e8c87d" opacity="0.5"/>
            <rect x="148" y="320" width="228" height="8" rx="4" fill="#1a3245"/>
            <rect x="238" y="318" width="56" height="4" rx="2" fill="#132638"/>

            {/* STUDENT on laptop */}
            <ellipse cx="264" cy="242" rx="24" ry="26" fill="#dba882"/>
            <path d="M241 232 Q243 210 264 209 Q285 210 287 232 Q282 220 264 221 Q246 220 241 232Z" fill="#2c1a0e"/>
            <ellipse cx="257" cy="240" rx="3" ry="3.5" fill="#1a0e08"/>
            <ellipse cx="271" cy="240" rx="3" ry="3.5" fill="#1a0e08"/>
            <ellipse cx="258" cy="239" rx="1" ry="1.2" fill="white"/>
            <ellipse cx="272" cy="239" rx="1" ry="1.2" fill="white"/>
            <path d="M258 248 Q264 253 270 248" stroke="#b07040" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <rect x="240" y="258" width="48" height="68" rx="14" fill="#2c5580"/>
            <rect x="214" y="296" width="44" height="16" rx="8" fill="#dba882" transform="rotate(-18 214 296)"/>
            <rect x="278" y="296" width="44" height="16" rx="8" fill="#dba882" transform="rotate(18 278 296)"/>
            <path d="M241 228 Q241 213 264 213 Q287 213 287 228" stroke="#1a0e08" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <rect x="237" y="226" width="8" height="12" rx="4" fill="#e8c87d"/>
            <rect x="283" y="226" width="8" height="12" rx="4" fill="#e8c87d"/>

            {/* WHITEBOARD */}
            <rect x="22" y="118" width="138" height="106" rx="7" fill="#f5f0e6"/>
            <rect x="27" y="123" width="128" height="96" rx="5" fill="#fffcf4"/>
            <rect x="36" y="134" width="75" height="5" rx="2.5" fill="#3d5a73" opacity="0.65"/>
            <rect x="36" y="145" width="58" height="4" rx="2" fill="#3d5a73" opacity="0.45"/>
            <rect x="36" y="155" width="92" height="4" rx="2" fill="#3d5a73" opacity="0.45"/>
            <rect x="36" y="165" width="46" height="4" rx="2" fill="#e8c87d" opacity="0.75"/>
            <rect x="36" y="175" width="76" height="4" rx="2" fill="#3d5a73" opacity="0.45"/>
            <rect x="36" y="185" width="62" height="4" rx="2" fill="#9ecfb8" opacity="0.75"/>
            <rect x="36" y="195" width="82" height="4" rx="2" fill="#3d5a73" opacity="0.35"/>
            <rect x="85" y="222" width="6" height="30" rx="3" fill="#2e5068"/>
            <rect x="72" y="250" width="34" height="6" rx="3" fill="#2e5068"/>

            {/* TEACHER */}
            <ellipse cx="430" cy="218" rx="25" ry="27" fill="#f0be8a"/>
            <path d="M406 208 Q408 188 430 186 Q452 188 454 208 L450 203 Q430 197 410 203Z" fill="#5a2d0c"/>
            <ellipse cx="430" cy="188" rx="14" ry="10" fill="#5a2d0c"/>
            <ellipse cx="423" cy="216" rx="3" ry="3.5" fill="#1a0e08"/>
            <ellipse cx="437" cy="216" rx="3" ry="3.5" fill="#1a0e08"/>
            <ellipse cx="424" cy="215" rx="1" ry="1.2" fill="white"/>
            <ellipse cx="438" cy="215" rx="1" ry="1.2" fill="white"/>
            <rect x="418" y="211" width="12" height="9" rx="4" fill="none" stroke="#3d5a73" strokeWidth="1.5"/>
            <rect x="432" y="211" width="12" height="9" rx="4" fill="none" stroke="#3d5a73" strokeWidth="1.5"/>
            <line x1="430" y1="215" x2="432" y2="215" stroke="#3d5a73" strokeWidth="1.5"/>
            <path d="M424 225 Q430 230 436 225" stroke="#b07040" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <rect x="405" y="242" width="52" height="72" rx="14" fill="#3d5a73"/>
            <rect x="426" y="244" width="10" height="50" rx="3" fill="#e8c87d" opacity="0.4"/>
            <path d="M405 262 Q382 250 352 240" stroke="#f0be8a" strokeWidth="14" strokeLinecap="round" fill="none"/>
            <circle cx="348" cy="238" r="8" fill="#f0be8a"/>
            <rect x="454" y="264" width="38" height="14" rx="7" fill="#f0be8a" transform="rotate(22 454 264)"/>

            {/* STUDENT LEFT SMALL */}
            <ellipse cx="132" cy="286" rx="18" ry="19" fill="#c8784a"/>
            <path d="M115 278 Q117 263 132 262 Q147 263 149 278 Q144 270 132 271 Q120 270 115 278Z" fill="#1a0e05"/>
            <ellipse cx="127" cy="284" rx="2.5" ry="3" fill="#1a0e05"/>
            <ellipse cx="137" cy="284" rx="2.5" ry="3" fill="#1a0e05"/>
            <path d="M128 291 Q132 296 136 291" stroke="#904030" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            <rect x="116" y="303" width="32" height="44" rx="10" fill="#c0392b"/>
            <rect x="106" y="311" width="46" height="30" rx="4" fill="#fffcf4"/>
            <rect x="111" y="317" width="30" height="3" rx="1.5" fill="#3d5a73" opacity="0.5"/>
            <rect x="111" y="324" width="24" height="3" rx="1.5" fill="#3d5a73" opacity="0.4"/>
            <rect x="111" y="331" width="32" height="3" rx="1.5" fill="#3d5a73" opacity="0.35"/>

            {/* STUDENT RIGHT SMALL */}
            <ellipse cx="352" cy="284" rx="17" ry="18" fill="#ba8c60"/>
            <path d="M336 276 Q338 263 352 262 Q366 263 368 276 Q363 269 352 270 Q341 269 336 276Z" fill="#2c1a0e"/>
            <ellipse cx="347" cy="282" rx="2.5" ry="3" fill="#1a0e05"/>
            <ellipse cx="357" cy="282" rx="2.5" ry="3" fill="#1a0e05"/>
            <path d="M348 290 Q352 295 356 290" stroke="#8a5830" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            <rect x="337" y="300" width="30" height="44" rx="10" fill="#1a7a5e"/>
            <rect x="328" y="308" width="42" height="28" rx="4" fill="#2c4a68"/>
            <rect x="333" y="313" width="28" height="3" rx="1.5" fill="#e8c87d" opacity="0.7"/>
            <rect x="333" y="320" width="22" height="3" rx="1.5" fill="white" opacity="0.4"/>
            <rect x="333" y="327" width="30" height="3" rx="1.5" fill="white" opacity="0.4"/>

            {/* Floating UI cards */}
            <g className="wp-hero-float-1">
              <rect x="376" y="72" width="120" height="56" rx="10" fill="#e8c87d" opacity="0.96"/>
              <text x="389" y="94" fontSize="11" fill="#2c1a0e" fontWeight="bold">✦ New Task Posted</text>
              <text x="389" y="108" fontSize="9" fill="#2c1a0e" opacity="0.7">Essay: Climate Change</text>
              <text x="389" y="120" fontSize="9" fill="#2c1a0e" opacity="0.6">Due: Friday · 100pts</text>
            </g>
            <g className="wp-hero-float-2">
              <rect x="16" y="46" width="110" height="52" rx="10" fill="#9ecfb8" opacity="0.96"/>
              <text x="28" y="67" fontSize="11" fill="#0d2e1e" fontWeight="bold">📊 Progress</text>
              <text x="28" y="81" fontSize="9" fill="#0d2e1e" opacity="0.8">19/24 submitted</text>
              <rect x="28" y="87" width="70" height="5" rx="2.5" fill="#0d2e1e" opacity="0.15"/>
              <rect x="28" y="87" width="55" height="5" rx="2.5" fill="#0d2e1e" opacity="0.55"/>
            </g>
            <g className="wp-hero-float-3">
              <rect x="198" y="36" width="128" height="48" rx="10" fill="#3d5a73" opacity="0.97"/>
              <text x="212" y="57" fontSize="11" fill="#e8c87d" fontWeight="bold">⭐ Graded: A+</text>
              <text x="212" y="71" fontSize="9" fill="white" opacity="0.75">Great structure & argument!</text>
              <text x="212" y="79" fontSize="8" fill="white" opacity="0.45">— Ms. Adaeze O.</text>
            </g>
            <g className="wp-hero-float-4">
              <rect x="360" y="370" width="138" height="46" rx="10" fill="#0d2235" opacity="0.97" stroke="#e8c87d" strokeWidth="1" strokeOpacity="0.3"/>
              <text x="373" y="390" fontSize="10" fill="#e8c87d" fontWeight="bold">🤖 AI Moderator</text>
              <text x="373" y="406" fontSize="8.5" fill="#9ecfb8" opacity="0.85">Community rules enforced ✓</text>
            </g>
          </svg>
        </div>
      </section>

      {/* ══════════ FREE vs PAID STRIP ══════════ */}
      <div className="wp-model-strip">
        <div className="wp-model-item">
          <span className="wp-model-icon">🎓</span>
          <div>
            <strong>Training — Always Free</strong>
            <p>Watch all lessons, practice tasks, read guides. Zero cost, no account needed.</p>
          </div>
          <span className="wp-model-tag wp-model-tag--free">FREE</span>
        </div>
        <div className="wp-model-arrow">→</div>
        <div className="wp-model-item">
          <span className="wp-model-icon">🏆</span>
          <div>
            <strong>Student Account — Buy Once</strong>
            <p>Get real tasks from your teacher, submit work, earn a certificate.</p>
          </div>
          <span className="wp-model-tag wp-model-tag--paid">$12 ONE-TIME</span>
        </div>
        <div className="wp-model-arrow">→</div>
        <div className="wp-model-item">
          <span className="wp-model-icon">🤖</span>
          <div>
            <strong>AI Moderation — Always On</strong>
            <p>Our AI bot monitors all activity and enforces community rules 24/7.</p>
          </div>
          <span className="wp-model-tag wp-model-tag--ai">AUTOMATED</span>
        </div>
      </div>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="wp-section wp-how" id="how">
        <div className="wp-section-label">✦ How it works</div>
        <h2 className="wp-section-title">From training to certificate<br />in four clear steps</h2>
        <div className="wp-steps">
          {[
            { num:"01", icon:"🎓", title:"Watch Free Training", desc:"Browse all lessons, guides and sample tasks completely free. No account required. Learn at your own pace.", color:"#9ecfb8" },
            { num:"02", icon:"🛒", title:"Buy Your Account", desc:"Pay $12 once. Your account is activated instantly and gives you lifetime access to real tasks and teacher feedback.", color:"#e8c87d" },
            { num:"03", icon:"✍️", title:"Receive & Submit Tasks", desc:"Your teacher assigns writing tasks to you. Use the clean writing interface to craft and submit your work.", color:"#f4a97f" },
            { num:"04", icon:"🏆", title:"Get Graded & Certified", desc:"Receive detailed feedback, earn your grade, and collect your completion certificate to share with employers.", color:"#b8a9e8" },
          ].map((step, i) => (
            <div className="wp-step" key={i} style={{"--accent":step.color} as React.CSSProperties}>
              <div className="wp-step__num">{step.num}</div>
              <div className="wp-step__icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              <div className="wp-step__line" />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ TASK SHOWCASE ══════════ */}
      <section className="wp-section wp-tasks" id="tasks">
        <div className="wp-tasks__left">
          <div className="wp-section-label">✦ Task library</div>
          <h2 className="wp-section-title wp-section-title--left">Every writing genre,<br />covered.</h2>
          <p className="wp-tasks__desc">Purpose-built task types with smart rubrics for every writing style — from argumentative essays to creative fiction.</p>
          <div className="wp-task-pills">
            {tasks.map((t, i) => (
              <button key={i} className={`wp-task-pill ${activeTask===i?"active":""}`} style={{"--pa":t.color} as React.CSSProperties} onClick={() => setActiveTask(i)}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="wp-tasks__right">
          <div className="wp-task-card">
            <div className="wp-task-card__hd">
              <span className="wp-task-type">{tasks[activeTask].icon} {tasks[activeTask].label}</span>
              <span className="wp-task-badge">Template</span>
            </div>
            <h3 className="wp-task-title">{["The Impact of Social Media on Youth Mental Health","Monthly Progress Report — Q3","A Night the Town Stood Still","Book Review: The Alchemist"][activeTask]}</h3>
            <div className="wp-task-meta">
              <span>📅 Due: Fri, Mar 7</span><span>📝 600–900 words</span><span>⭐ 100 pts</span>
            </div>
            <div className="wp-task-prompt">
              <strong>Prompt:</strong>{" "}
              {["Discuss both the positive and negative effects of social media on teenagers. Support your argument with at least two credible sources.","Summarize key metrics, achievements, and challenges from Q3. Include a forward-looking section for Q4.","Write a short story set in your hometown during an unusual event. Focus on vivid sensory details and character emotion.","Write a critical review of 'The Alchemist' by Paulo Coelho, addressing theme, writing style, and personal impact."][activeTask]}
            </div>
            <div className="wp-task-rubric">
              {["Structure","Argument","Language","Sources"].map((r,i) => (
                <div className="wp-rub-row" key={i}>
                  <span>{r}</span>
                  <div className="wp-rub-bar"><div className="wp-rub-fill" style={{width:`${[85,90,75,80][i]}%`,background:tasks[activeTask].color}}/></div>
                  <span>{[25,30,25,20][i]}pts</span>
                </div>
              ))}
            </div>
            <button className="wp-btn wp-btn--gold wp-btn--full">Use This Template →</button>
          </div>
        </div>
      </section>

      {/* ══════════ AI MODERATION BOT ══════════ */}
      <section className="wp-section wp-aibot" id="ai-bot">
        <div className="wp-aibot__left">
          <div className="wp-section-label">✦ AI Moderation</div>
          <h2 className="wp-section-title wp-section-title--left">Meet ScriptGuard,<br /><em>your 24/7 AI bot.</em></h2>
          <p className="wp-aibot__desc">ScriptGuard monitors all student activity in real time. When a student violates community rules — plagiarism, abuse, or academic dishonesty — ScriptGuard acts instantly: issuing warnings, restricting access, or banning the account permanently.</p>
          <div className="wp-aibot__rules">
            <div className="wp-section-label" style={{marginBottom:"0.75rem"}}>Community Rules Enforced</div>
            {[
              { icon:"🚫", rule:"No plagiarism or copied content", level:"Ban" },
              { icon:"🤐", rule:"No abusive or offensive language", level:"Warning → Ban" },
              { icon:"📋", rule:"No sharing task answers publicly", level:"Restriction" },
              { icon:"🔒", rule:"One account per student only", level:"Ban" },
              { icon:"⏰", rule:"Submissions must be own original work", level:"Grade void" },
            ].map((r,i) => (
              <div className="wp-rule-row" key={i}>
                <span className="wp-rule-icon">{r.icon}</span>
                <span className="wp-rule-text">{r.rule}</span>
                <span className={`wp-rule-badge ${r.level==="Ban"?"danger":r.level.includes("Ban")?"warn":"info"}`}>{r.level}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="wp-aibot__right">
          {/* Bot UI card */}
          <div className="wp-bot-card">
            <div className="wp-bot-card__header">
              <div className="wp-bot-avatar">🤖</div>
              <div>
                <div className="wp-bot-name">ScriptGuard AI</div>
                <div className="wp-bot-status"><span className="wp-bot-dot" />Active — Monitoring 24/7</div>
              </div>
              <div className="wp-bot-live">LIVE</div>
            </div>
            <div className="wp-bot-feed">
              {[
                { type:"ok",  time:"2m ago",  msg:"Submission reviewed — no issues detected. ✓" },
                { type:"warn",time:"14m ago", msg:"Warning issued: suspected copied paragraph. Student notified." },
                { type:"ok",  time:"28m ago", msg:"18 submissions scanned — all clear. ✓" },
                { type:"ban", time:"1h ago",  msg:"Account banned: duplicate account detected for user #4821." },
                { type:"ok",  time:"2h ago",  msg:"Task #7 submissions checked — originality scores all above 85%." },
              ].map((log,i) => (
                <div className={`wp-bot-log wp-bot-log--${log.type}`} key={i}>
                  <span className="wp-bot-log__icon">{log.type==="ok"?"✅":log.type==="warn"?"⚠️":"🚫"}</span>
                  <span className="wp-bot-log__msg">{log.msg}</span>
                  <span className="wp-bot-log__time">{log.time}</span>
                </div>
              ))}
            </div>
            <div className="wp-bot-stats">
              <div className="wp-bot-stat"><strong>2,841</strong><span>Submissions scanned</span></div>
              <div className="wp-bot-stat"><strong>99.2%</strong><span>Compliance rate</span></div>
              <div className="wp-bot-stat"><strong>23</strong><span>Violations actioned</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="wp-section wp-testimonials" id="testimonials">
        <div className="wp-section-label">✦ Real student reviews</div>
        <h2 className="wp-section-title">They thought it was a scam.<br /><em>Then they tried it.</em></h2>
        <p className="wp-test-sub">10 honest reviews from students who were skeptical before joining.</p>

        {/* Main sliding card */}
        <div className="wp-test-stage">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`wp-test-card ${i===testimonialIdx?"active":i===(testimonialIdx-1+testimonials.length)%testimonials.length?"prev":"next"}`}
            >
              <div className="wp-test-stars">{"★".repeat(t.stars)}</div>
              <p className="wp-test-quote">"{t.text}"</p>
              <div className="wp-test-author">
                <div className="wp-test-av" style={{background:t.color}}>{t.initials}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
                <div className="wp-test-verified">✓ Verified Student</div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots nav */}
        <div className="wp-test-dots">
          {testimonials.map((_,i) => (
            <button key={i} className={`wp-test-dot ${i===testimonialIdx?"active":""}`} onClick={() => goTestimonial(i)} aria-label={`Review ${i+1}`}/>
          ))}
        </div>

        {/* Prev/Next arrows */}
        <div className="wp-test-arrows">
          <button className="wp-test-arrow" onClick={() => goTestimonial((testimonialIdx-1+testimonials.length)%testimonials.length)}>←</button>
          <span className="wp-test-counter">{testimonialIdx+1} / {testimonials.length}</span>
          <button className="wp-test-arrow" onClick={() => goTestimonial((testimonialIdx+1)%testimonials.length)}>→</button>
        </div>

        {/* Thumbnail row */}
        <div className="wp-test-thumbs">
          {testimonials.map((t,i) => (
            <button key={i} className={`wp-test-thumb ${i===testimonialIdx?"active":""}`} onClick={() => goTestimonial(i)} style={{"--tc":t.color} as React.CSSProperties}>
              <div className="wp-test-thumb-av" style={{background:t.color}}>{t.initials}</div>
              <span>{t.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════ PRICING ══════════ */}
      <section className="wp-section wp-pricing" id="pricing">
        <div className="wp-section-label">✦ Pricing</div>
        <h2 className="wp-section-title">Training is free.<br/>Accounts are affordable.</h2>
        <p className="wp-pricing__sub">Learn everything at no cost. Buy your account when you're ready.</p>
        <div className="wp-plans">
          {plans.map((plan, i) => (
            <div className={`wp-plan ${plan.featured?"wp-plan--featured":""}`} key={i} style={{"--pa":plan.accent} as React.CSSProperties}>
              {plan.featured && <div className="wp-plan__badge">Best Value</div>}
              <div className="wp-plan__name">{plan.name}</div>
              <div className="wp-plan__price"><span className="wp-plan__amount">{plan.price}</span><span className="wp-plan__period"> {plan.period}</span></div>
              <p className="wp-plan__desc">{plan.desc}</p>
              <ul className="wp-plan__features">{plan.features.map((f,j) => <li key={j}><span>✓</span>{f}</li>)}</ul>
              <a href="#" className={`wp-btn wp-btn--full ${plan.ctaClass}`}>{plan.cta}</a>
            </div>
          ))}
        </div>
        <div className="wp-pricing__note">
          🤖 All accounts are protected by ScriptGuard AI moderation. Violations result in automatic warnings or bans per our community rules.
        </div>
      </section>

      {/* ══════════ CTA BANNER ══════════ */}
      <section className="wp-cta-banner">
        <div className="wp-cta-banner__deco wp-cta-banner__deco--1"/>
        <div className="wp-cta-banner__deco wp-cta-banner__deco--2"/>
        <div className="wp-cta-banner__inner">
          <h2>Ready to go beyond free training?</h2>
          <p>Join 940+ students — buy your account once, keep it forever.</p>
          <a href="#pricing" className="wp-btn wp-btn--gold wp-btn--lg">Buy Account — $12 One-Time →</a>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="wp-footer">
        <div className="wp-footer__top">
          <div className="wp-footer__brand">
            <a href="/" className="wp-logo">
              <span className="wp-logo__mark">✦</span>
              <span className="wp-logo__text">ScriptMaster</span>
            </a>
            <p>The professional writing platform for serious students and educators. Train free, buy once, grow forever.</p>
            <div className="wp-footer__social">
              {["Facebook","Twitter","Instagram","LinkedIn"].map((s) => (
                <a key={s} href="#" className="wp-social-btn">{s[0]}</a>
              ))}
            </div>
          </div>
          <div className="wp-footer__cols">
            <div className="wp-footer__col">
              <strong>Platform</strong>
              <a href="#how">How It Works</a>
              <a href="#tasks">Task Library</a>
              <a href="#ai-bot">AI Moderation</a>
              <a href="/teacher">Teacher Dashboard</a>
            </div>
            <div className="wp-footer__col">
              <strong>Account</strong>
              <a href="#pricing">Buy Account</a>
              <a href="#">Free Training</a>
              <a href="#">Sign In</a>
              <a href="#">My Dashboard</a>
            </div>
            <div className="wp-footer__col">
              <strong>Legal</strong>
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Community Rules</a>
              <a href="#">Refund Policy</a>
            </div>
            <div className="wp-footer__col">
              <strong>Support</strong>
              <a href="#">Contact Us</a>
              <a href="#">Help Centre</a>
              <a href="#">Report a Bug</a>
              <a href="#">Appeal a Ban</a>
            </div>
          </div>
        </div>
        <div className="wp-footer__bottom">
          <span>© 2025 ScriptMaster. All rights reserved.</span>
          <span>🤖 Powered by ScriptGuard AI Moderation</span>
          <span>Made with ✦ for writing students everywhere</span>
        </div>
      </footer>

      {/* ══════════ ALL STYLES ══════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}

        .wp-root{
          font-family:'DM Sans',sans-serif;
          background:#071524;
          color:#d8e4ec;
          overflow-x:hidden;
          position:relative;
        }

        /* ══════════════════════════════════════════
           MODERN BACKGROUND SYSTEM
        ══════════════════════════════════════════ */
        .wp-bg-canvas{
          position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;
        }

        /* ── Rich mesh gradient base ── */
        .wp-bg-mesh{
          position:absolute;inset:0;
          background:
            radial-gradient(ellipse 80% 60% at 70% 10%, rgba(20,60,100,0.85) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 10% 80%, rgba(15,45,70,0.75) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 75%, rgba(10,30,50,0.6) 0%, transparent 50%),
            radial-gradient(ellipse 70% 30% at 50% 50%, rgba(18,40,65,0.4) 0%, transparent 65%),
            linear-gradient(160deg, #040d18 0%, #071524 40%, #0a1e2e 70%, #06101c 100%);
          animation:meshShift 18s ease-in-out infinite alternate;
        }
        @keyframes meshShift{
          0%{background-position:0% 0%,100% 100%,0% 100%,50% 50%;}
          100%{background-position:5% 8%,95% 92%,8% 95%,55% 45%;}
        }

        /* ── Light beams ── */
        .wp-beam{
          position:absolute;pointer-events:none;
          background:linear-gradient(to bottom,rgba(232,200,125,0.04) 0%,transparent 100%);
          transform-origin:top center;
          animation:beamSway 12s ease-in-out infinite;
        }
        .wp-beam--1{width:3px;height:90vh;left:18%;top:0;filter:blur(8px);animation-delay:0s;opacity:0.8;}
        .wp-beam--2{width:2px;height:70vh;left:55%;top:0;filter:blur(6px);animation-delay:4s;opacity:0.5;background:linear-gradient(to bottom,rgba(158,207,184,0.05),transparent);}
        .wp-beam--3{width:2px;height:80vh;right:22%;top:0;filter:blur(7px);animation-delay:8s;opacity:0.6;}
        @keyframes beamSway{0%,100%{transform:skewX(0deg) scaleY(1)}50%{transform:skewX(2deg) scaleY(0.92)}}

        /* ── Spotlight ── */
        .wp-spotlight{
          position:absolute;
          width:900px;height:900px;
          top:-200px;right:-100px;
          background:radial-gradient(ellipse at center, rgba(30,80,130,0.18) 0%, rgba(20,60,100,0.08) 40%, transparent 70%);
          border-radius:50%;
          animation:spotPulse 10s ease-in-out infinite;
        }
        @keyframes spotPulse{0%,100%{transform:scale(1);opacity:0.8}50%{transform:scale(1.12);opacity:1}}

        /* ── Dot grid overlay ── */
        .wp-dot-grid{position:absolute;inset:0;opacity:0.6;}

        /* ══════════════════════════════════════════
           PHOTO WATERMARKS
        ══════════════════════════════════════════ */
        .wp-wm{
          position:absolute;pointer-events:none;overflow:hidden;border-radius:18px;
        }
        .wp-wm img{
          width:100%;height:100%;object-fit:cover;
          filter:grayscale(85%) contrast(0.9) brightness(0.7);
          display:block;
        }

        /* Per-photo colour tint overlay */
        .wp-wm__tint{
          position:absolute;inset:0;border-radius:inherit;mix-blend-mode:color;
        }
        .wp-wm__tint--blue{background:rgba(15,50,90,0.85);}
        .wp-wm__tint--dark{background:rgba(5,15,30,0.8);}
        .wp-wm__tint--teal{background:rgba(10,45,55,0.82);}
        .wp-wm__tint--gold{background:rgba(40,30,8,0.75);}

        /* Soft edge fade so photos blend seamlessly into background */
        .wp-wm__edge{
          position:absolute;inset:0;border-radius:inherit;
        }
        .wp-wm__edge--left{
          background:linear-gradient(to right,rgba(7,21,36,0.9) 0%,transparent 40%,transparent 60%,rgba(7,21,36,0.9) 100%),
                     linear-gradient(to bottom,rgba(7,21,36,0.85) 0%,transparent 20%,transparent 80%,rgba(7,21,36,0.95) 100%);
        }
        .wp-wm__edge--right{
          background:linear-gradient(to left,rgba(7,21,36,0.9) 0%,transparent 40%,transparent 60%,rgba(7,21,36,0.9) 100%),
                     linear-gradient(to bottom,rgba(7,21,36,0.85) 0%,transparent 20%,transparent 80%,rgba(7,21,36,0.95) 100%);
        }
        .wp-wm__edge--bottom{
          background:linear-gradient(to bottom,rgba(7,21,36,0.6) 0%,transparent 30%,transparent 60%,rgba(7,21,36,0.98) 100%),
                     linear-gradient(to right,rgba(7,21,36,0.8) 0%,transparent 25%,transparent 75%,rgba(7,21,36,0.8) 100%);
        }

        /* Photo 1 — classroom row (left edge, tall portrait) */
        .wp-wm--1{
          width:260px;height:360px;
          left:-40px;top:8%;
          opacity:0.55;
          animation:wmFloat1 9s ease-in-out infinite;
        }

        /* Photo 2 — laptop hands (right edge, large landscape) */
        .wp-wm--2{
          width:380px;height:240px;
          right:-60px;top:18%;
          opacity:0.48;
          border-radius:20px;
          animation:wmFloat2 11s ease-in-out infinite 1.5s;
        }

        /* Photo 3 — group at laptop (bottom left) */
        .wp-wm--3{
          width:300px;height:200px;
          left:4%;bottom:12%;
          opacity:0.42;
          animation:wmFloat1 8s ease-in-out infinite 3s;
        }

        /* Photo 4 — smiling student (bottom right) */
        .wp-wm--4{
          width:220px;height:290px;
          right:2%;bottom:6%;
          opacity:0.38;
          animation:wmFloat2 10s ease-in-out infinite 2s;
        }

        /* Photo 5 — laptop hands wide strip (top center, ultra faint) */
        .wp-wm--5{
          width:700px;height:200px;
          left:50%;transform:translateX(-50%);
          top:-30px;
          opacity:0.14;
          border-radius:0;
          animation:wmFade 14s ease-in-out infinite;
        }
        .wp-wm--5 img{filter:grayscale(100%) contrast(0.7) brightness(0.5);}

        /* Photo 6 — classroom repeat (mid right, small) */
        .wp-wm--6{
          width:180px;height:240px;
          right:17%;top:52%;
          opacity:0.28;
          animation:wmFloat1 7s ease-in-out infinite 4s;
        }

        @keyframes wmFloat1{0%,100%{transform:translateY(0) rotate(0deg)}40%{transform:translateY(-16px) rotate(0.4deg)}80%{transform:translateY(-8px) rotate(-0.3deg)}}
        @keyframes wmFloat2{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes wmFade{0%,100%{opacity:0.14}50%{opacity:0.22}}

        /* ══════════════════════════════════════════
           FLOATING NOTIFICATION PILLS
        ══════════════════════════════════════════ */
        .wp-pill{
          position:absolute;
          background:rgba(7,21,36,0.78);
          border:1px solid rgba(232,200,125,0.28);
          color:#e8c87d;font-size:0.72rem;font-weight:600;
          padding:0.38rem 0.85rem;border-radius:100px;
          backdrop-filter:blur(12px);white-space:nowrap;
          box-shadow:0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(232,200,125,0.06);
          animation:pillDrift 7s ease-in-out infinite;
          letter-spacing:0.01em;
        }
        .wp-pill--1{left:4%;top:22%;animation-delay:0s;}
        .wp-pill--2{right:5%;top:16%;animation-delay:1.8s;color:#9ecfb8;border-color:rgba(158,207,184,0.28);}
        .wp-pill--3{left:8%;top:52%;animation-delay:3.2s;}
        .wp-pill--4{right:8%;top:58%;animation-delay:0.9s;color:#9ecfb8;border-color:rgba(158,207,184,0.28);}
        .wp-pill--5{left:5%;top:78%;animation-delay:2.5s;color:#b8a9e8;border-color:rgba(184,169,232,0.28);}
        .wp-pill--6{right:12%;top:72%;animation-delay:4s;}
        @keyframes pillDrift{
          0%,100%{transform:translateY(0) rotate(-0.5deg);opacity:0.75}
          50%{transform:translateY(-12px) rotate(0.5deg);opacity:1}
        }

        /* ══════════════════════════════════════════
           PARTICLES
        ══════════════════════════════════════════ */
        .wp-particle{
          position:absolute;border-radius:50%;
          background:#e8c87d;
          animation:particleDrift linear infinite;
        }
        .wp-particle--1{width:3px;height:3px;left:12%;top:30%;opacity:0.4;animation-duration:6s;animation-delay:0s;}
        .wp-particle--2{width:2px;height:2px;left:28%;top:45%;opacity:0.3;animation-duration:8s;animation-delay:1s;background:#9ecfb8;}
        .wp-particle--3{width:4px;height:4px;left:45%;top:20%;opacity:0.35;animation-duration:7s;animation-delay:2s;}
        .wp-particle--4{width:2px;height:2px;left:62%;top:60%;opacity:0.25;animation-duration:9s;animation-delay:0.5s;background:#b8a9e8;}
        .wp-particle--5{width:3px;height:3px;left:78%;top:35%;opacity:0.4;animation-duration:6.5s;animation-delay:3s;}
        .wp-particle--6{width:2px;height:2px;left:90%;top:50%;opacity:0.3;animation-duration:7.5s;animation-delay:1.5s;background:#9ecfb8;}
        .wp-particle--7{width:3px;height:3px;left:5%;top:68%;opacity:0.35;animation-duration:8.5s;animation-delay:2.5s;}
        .wp-particle--8{width:2px;height:2px;left:38%;top:80%;opacity:0.28;animation-duration:6s;animation-delay:4s;background:#f4a97f;}
        .wp-particle--9{width:4px;height:4px;left:55%;top:88%;opacity:0.32;animation-duration:9s;animation-delay:0.8s;}
        .wp-particle--10{width:2px;height:2px;left:72%;top:18%;opacity:0.38;animation-duration:7s;animation-delay:3.5s;background:#9ecfb8;}
        .wp-particle--11{width:3px;height:3px;left:18%;top:88%;opacity:0.3;animation-duration:8s;animation-delay:1.2s;background:#b8a9e8;}
        .wp-particle--12{width:2px;height:2px;left:85%;top:80%;opacity:0.35;animation-duration:6.5s;animation-delay:2s;}
        .wp-particle--13{width:2px;height:2px;left:33%;top:12%;opacity:0.3;animation-duration:7.5s;animation-delay:3s;background:#f4a97f;}
        .wp-particle--14{width:3px;height:3px;left:50%;top:40%;opacity:0.25;animation-duration:8s;animation-delay:0s;}
        .wp-particle--15{width:2px;height:2px;left:65%;top:72%;opacity:0.38;animation-duration:6s;animation-delay:4.5s;background:#9ecfb8;}
        .wp-particle--16{width:3px;height:3px;left:22%;top:62%;opacity:0.3;animation-duration:9s;animation-delay:2.2s;}
        .wp-particle--17{width:2px;height:2px;left:95%;top:30%;opacity:0.32;animation-duration:7s;animation-delay:1.8s;background:#b8a9e8;}
        .wp-particle--18{width:4px;height:4px;left:8%;top:15%;opacity:0.28;animation-duration:8.5s;animation-delay:3.8s;}
        @keyframes particleDrift{
          0%{transform:translateY(0) translateX(0) scale(1);opacity:0}
          10%{opacity:1}
          90%{opacity:1}
          100%{transform:translateY(-120px) translateX(20px) scale(0.5);opacity:0}
        }

        /* ══════════════════════════════════════════
           ACCENT LINES
        ══════════════════════════════════════════ */
        .wp-accent-line{
          position:absolute;pointer-events:none;
          background:linear-gradient(90deg, transparent, rgba(232,200,125,0.15), transparent);
          height:1px;
          animation:lineScan 8s ease-in-out infinite;
        }
        .wp-accent-line--1{width:40%;left:0;top:35%;animation-delay:0s;}
        .wp-accent-line--2{width:25%;right:0;top:58%;animation-delay:3s;background:linear-gradient(90deg,transparent,rgba(158,207,184,0.12),transparent);}
        .wp-accent-line--3{width:35%;left:30%;top:75%;animation-delay:6s;}
        @keyframes lineScan{0%,100%{opacity:0;transform:scaleX(0.3)}50%{opacity:1;transform:scaleX(1)}}

        /* ── Bottom fade ── */
        .wp-bg-fade{
          position:absolute;bottom:0;left:0;right:0;height:300px;
          background:linear-gradient(to bottom, transparent, #071524);
          pointer-events:none;
        }

        /* ── HEADER ── */
        .wp-header{
          position:fixed;top:0;left:0;right:0;z-index:200;
          display:flex;align-items:center;gap:2rem;
          padding:1.2rem 4rem;
          transition:background 0.3s,backdrop-filter 0.3s,box-shadow 0.3s;
        }
        .wp-header--scrolled{
          background:rgba(7,21,36,0.94);
          backdrop-filter:blur(14px);
          box-shadow:0 2px 40px rgba(0,0,0,0.4);
          border-bottom:1px solid rgba(255,255,255,0.06);
        }
        .wp-logo{display:flex;align-items:center;gap:0.5rem;text-decoration:none;margin-right:auto;}
        .wp-logo__mark{color:#e8c87d;font-size:0.95rem;}
        .wp-logo__text{font-family:'Lora',serif;font-size:1.25rem;font-weight:700;color:#e8c87d;}
        .wp-nav{display:flex;gap:2rem;align-items:center;}
        .wp-nav a{color:#8aa5b8;font-size:0.9rem;text-decoration:none;transition:color 0.2s;}
        .wp-nav a:hover{color:#e8c87d;}
        .wp-header__actions{display:flex;gap:0.6rem;align-items:center;}
        .wp-hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px;}
        .wp-hamburger span{display:block;width:22px;height:2px;background:#d8e4ec;border-radius:2px;transition:all 0.2s;}

        /* ── BUTTONS ── */
        .wp-btn{
          display:inline-flex;align-items:center;justify-content:center;gap:0.4rem;
          padding:0.55rem 1.3rem;border-radius:7px;
          font-size:0.88rem;font-weight:500;
          text-decoration:none;cursor:pointer;border:none;
          font-family:'DM Sans',sans-serif;
          transition:all 0.18s;white-space:nowrap;
        }
        .wp-btn--sm{padding:0.45rem 1rem;font-size:0.84rem;}
        .wp-btn--lg{padding:0.85rem 1.9rem;font-size:1rem;border-radius:9px;}
        .wp-btn--gold{background:#e8c87d;color:#1a0e05;font-weight:600;}
        .wp-btn--gold:hover{background:#f0d698;transform:translateY(-1px);box-shadow:0 6px 20px rgba(232,200,125,0.35);}
        .wp-btn--ghost{background:transparent;color:#8aa5b8;border:1px solid rgba(255,255,255,0.15);}
        .wp-btn--ghost:hover{border-color:#e8c87d;color:#e8c87d;}
        .wp-btn--outline{background:transparent;color:#d8e4ec;border:1.5px solid rgba(216,228,236,0.3);}
        .wp-btn--outline:hover{border-color:#d8e4ec;background:rgba(216,228,236,0.06);}
        .wp-btn--plan-ghost{background:transparent;color:#3d5a73;border:1.5px solid #3d5a73;}
        .wp-btn--plan-ghost:hover{background:#3d5a73;color:white;}
        .wp-btn--full{width:100%;margin-top:1.2rem;padding:0.8rem;}

        /* ── HERO ── */
        .wp-hero{
          min-height:100vh;display:grid;grid-template-columns:1fr 1fr;
          align-items:center;padding:8rem 4rem 4rem;gap:3rem;
          position:relative;z-index:1;
        }
        .wp-hero__badge{
          display:inline-flex;align-items:center;gap:0.6rem;
          background:rgba(232,200,125,0.1);border:1px solid rgba(232,200,125,0.3);
          color:#e8c87d;padding:0.4rem 1rem;border-radius:100px;
          font-size:0.8rem;font-weight:500;margin-bottom:1.5rem;
          animation:fadeInUp 0.6s ease both;
        }
        .wp-badge__dot{width:7px;height:7px;border-radius:50%;background:#9ecfb8;animation:blink 2s ease-in-out infinite;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        .wp-hero__title{
          font-family:'Lora',serif;
          font-size:clamp(2.8rem,5vw,4.2rem);
          line-height:1.12;font-weight:700;color:#f0ece4;
          margin-bottom:1.2rem;
          animation:fadeInUp 0.6s 0.1s ease both;
        }
        .wp-hero__title em{font-style:italic;color:#e8c87d;}
        .wp-hero__sub{
          font-size:1.05rem;color:#8aa5b8;line-height:1.75;
          max-width:480px;margin-bottom:2rem;
          animation:fadeInUp 0.6s 0.2s ease both;
        }
        .wp-hero__cta-row{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2.5rem;animation:fadeInUp 0.6s 0.3s ease both;}
        .wp-hero__trust{display:flex;align-items:center;gap:1rem;animation:fadeInUp 0.6s 0.4s ease both;}
        .wp-trust-avatars{position:relative;width:120px;height:34px;}
        .wp-trust-av{
          position:absolute;top:0;width:34px;height:34px;border-radius:50%;
          background:#e8c87d;color:#1a0e05;font-size:0.65rem;font-weight:700;
          display:flex;align-items:center;justify-content:center;
          border:2px solid #071524;
        }
        .wp-trust-text{font-size:0.85rem;color:#8aa5b8;}
        .wp-trust-text strong{color:#f0ece4;display:block;}
        .wp-trust-stars{color:#e8c87d;font-size:0.8rem;letter-spacing:1px;}
        .wp-hero__visual{position:relative;animation:fadeInUp 0.6s 0.3s ease both;}
        .wp-hero__visual-glow{
          position:absolute;top:10%;left:10%;right:10%;bottom:10%;
          background:radial-gradient(ellipse at center,rgba(61,90,115,0.3),transparent 70%);
          filter:blur(30px);pointer-events:none;
        }
        .wp-hero__svg{width:100%;max-width:560px;filter:drop-shadow(0 20px 60px rgba(0,0,0,0.4));}
        .wp-hero-float-1{animation:hFloat1 3s ease-in-out infinite;}
        .wp-hero-float-2{animation:hFloat2 3.8s ease-in-out infinite 0.5s;}
        .wp-hero-float-3{animation:hFloat3 3.2s ease-in-out infinite 1s;}
        .wp-hero-float-4{animation:hFloat1 4s ease-in-out infinite 1.8s;}
        @keyframes hFloat1{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes hFloat2{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes hFloat3{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}

        /* ── MODEL STRIP ── */
        .wp-model-strip{
          position:relative;z-index:1;
          background:#0a1e2e;
          border-top:1px solid rgba(232,200,125,0.12);
          border-bottom:1px solid rgba(232,200,125,0.12);
          display:flex;align-items:center;justify-content:center;
          gap:1.5rem;padding:2rem 4rem;flex-wrap:wrap;
        }
        .wp-model-item{display:flex;align-items:center;gap:1rem;flex:1;min-width:260px;max-width:340px;}
        .wp-model-icon{font-size:1.8rem;flex-shrink:0;}
        .wp-model-item strong{display:block;font-size:0.95rem;color:#f0ece4;margin-bottom:0.2rem;}
        .wp-model-item p{font-size:0.8rem;color:#5a7a8e;line-height:1.5;}
        .wp-model-arrow{font-size:1.5rem;color:rgba(232,200,125,0.35);flex-shrink:0;}
        .wp-model-tag{flex-shrink:0;font-size:0.72rem;font-weight:700;padding:0.28rem 0.65rem;border-radius:6px;letter-spacing:0.04em;margin-left:auto;}
        .wp-model-tag--free{background:rgba(158,207,184,0.12);color:#9ecfb8;border:1px solid rgba(158,207,184,0.3);}
        .wp-model-tag--paid{background:rgba(232,200,125,0.12);color:#e8c87d;border:1px solid rgba(232,200,125,0.3);}
        .wp-model-tag--ai{background:rgba(184,169,232,0.12);color:#b8a9e8;border:1px solid rgba(184,169,232,0.3);}

        /* ── SECTIONS ── */
        .wp-section{padding:6rem 4rem;position:relative;z-index:1;}
        .wp-section-label{display:inline-block;font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:#e8c87d;margin-bottom:0.9rem;}
        .wp-section-title{font-family:'Lora',serif;font-size:clamp(2rem,3.5vw,2.8rem);color:#f0ece4;font-weight:700;line-height:1.25;margin-bottom:3.5rem;text-align:center;}
        .wp-section-title--left{text-align:left;margin-bottom:1.2rem;}
        .wp-section-title em{font-style:italic;color:#e8c87d;}

        /* ── HOW IT WORKS ── */
        .wp-how{background:#0a1e2e;text-align:center;}
        .wp-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;max-width:1100px;margin:0 auto;}
        .wp-step{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:2rem;text-align:left;position:relative;overflow:hidden;transition:transform 0.2s,box-shadow 0.2s;}
        .wp-step:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,0.3);}
        .wp-step__num{font-family:'Lora',serif;font-size:2.8rem;font-weight:700;color:var(--accent);opacity:0.18;line-height:1;margin-bottom:0.5rem;}
        .wp-step__icon{font-size:1.8rem;margin-bottom:0.7rem;}
        .wp-step h3{font-size:1rem;font-weight:600;color:#f0ece4;margin-bottom:0.5rem;}
        .wp-step p{font-size:0.83rem;color:#6a8090;line-height:1.65;}
        .wp-step__line{position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--accent);opacity:0;transform:scaleX(0);transform-origin:left;transition:transform 0.3s,opacity 0.3s;}
        .wp-step:hover .wp-step__line{transform:scaleX(1);opacity:0.7;}

        /* ── TASKS ── */
        .wp-tasks{background:#071524;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
        .wp-tasks__desc{color:#6a8090;font-size:0.95rem;line-height:1.7;margin-bottom:1.5rem;max-width:420px;}
        .wp-task-pills{display:flex;flex-wrap:wrap;gap:0.6rem;}
        .wp-task-pill{padding:0.48rem 1.1rem;border-radius:100px;border:1.5px solid rgba(255,255,255,0.1);background:transparent;color:#8aa5b8;font-size:0.86rem;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.18s;}
        .wp-task-pill:hover{border-color:var(--pa);color:var(--pa);}
        .wp-task-pill.active{background:var(--pa);color:#071524;border-color:var(--pa);font-weight:600;}
        .wp-task-card{background:#0a1e2e;border:1px solid rgba(232,200,125,0.2);border-radius:16px;padding:1.8rem;box-shadow:0 20px 60px rgba(0,0,0,0.3);}
        .wp-task-card__hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:0.9rem;}
        .wp-task-type{font-size:0.8rem;color:#6a8090;}
        .wp-task-badge{font-size:0.7rem;padding:0.18rem 0.55rem;background:rgba(232,200,125,0.12);color:#e8c87d;border-radius:4px;font-weight:500;}
        .wp-task-title{font-family:'Lora',serif;font-size:1.2rem;color:#f0ece4;font-weight:600;margin-bottom:0.7rem;line-height:1.4;}
        .wp-task-meta{display:flex;gap:1rem;flex-wrap:wrap;font-size:0.78rem;color:#5a7a8e;margin-bottom:0.9rem;}
        .wp-task-prompt{font-size:0.85rem;color:#6a8090;line-height:1.65;padding:0.8rem;background:rgba(255,255,255,0.03);border-radius:8px;margin-bottom:1.1rem;border-left:3px solid #e8c87d;}
        .wp-task-prompt strong{color:#e8c87d;}
        .wp-task-rubric{display:flex;flex-direction:column;gap:0.5rem;margin-bottom:0.5rem;}
        .wp-rub-row{display:flex;align-items:center;gap:0.7rem;font-size:0.8rem;}
        .wp-rub-row>span:first-child{width:65px;color:#6a8090;}
        .wp-rub-row>span:last-child{width:35px;text-align:right;color:#5a7a8e;font-size:0.75rem;}
        .wp-rub-bar{flex:1;height:5px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden;}
        .wp-rub-fill{height:100%;border-radius:3px;transition:width 0.5s ease;}

        /* ── AI BOT ── */
        .wp-aibot{background:#0a1e2e;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;}
        .wp-aibot__desc{color:#6a8090;font-size:0.95rem;line-height:1.75;margin-bottom:2rem;max-width:440px;}
        .wp-aibot__rules{display:flex;flex-direction:column;gap:0.6rem;}
        .wp-rule-row{display:flex;align-items:center;gap:0.75rem;padding:0.65rem 0.9rem;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:9px;}
        .wp-rule-icon{font-size:1rem;flex-shrink:0;}
        .wp-rule-text{flex:1;font-size:0.85rem;color:#a8b8c8;}
        .wp-rule-badge{font-size:0.7rem;font-weight:700;padding:0.18rem 0.55rem;border-radius:5px;flex-shrink:0;}
        .wp-rule-badge.danger{background:rgba(231,76,60,0.15);color:#e74c3c;border:1px solid rgba(231,76,60,0.3);}
        .wp-rule-badge.warn{background:rgba(232,200,125,0.15);color:#e8c87d;border:1px solid rgba(232,200,125,0.3);}
        .wp-rule-badge.info{background:rgba(158,207,184,0.12);color:#9ecfb8;border:1px solid rgba(158,207,184,0.3);}
        .wp-bot-card{background:#071524;border:1px solid rgba(184,169,232,0.25);border-radius:16px;padding:1.5rem;box-shadow:0 20px 60px rgba(0,0,0,0.35);}
        .wp-bot-card__header{display:flex;align-items:center;gap:0.9rem;padding-bottom:1.2rem;border-bottom:1px solid rgba(255,255,255,0.06);margin-bottom:1.1rem;}
        .wp-bot-avatar{font-size:2rem;width:48px;height:48px;background:#0d2235;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .wp-bot-name{font-size:0.95rem;font-weight:600;color:#f0ece4;}
        .wp-bot-status{font-size:0.78rem;color:#6a8090;display:flex;align-items:center;gap:0.4rem;margin-top:0.2rem;}
        .wp-bot-dot{width:6px;height:6px;border-radius:50%;background:#9ecfb8;animation:blink 2s ease-in-out infinite;}
        .wp-bot-live{margin-left:auto;font-size:0.65rem;font-weight:700;letter-spacing:0.08em;background:rgba(231,76,60,0.15);color:#e74c3c;border:1px solid rgba(231,76,60,0.35);padding:0.2rem 0.55rem;border-radius:5px;}
        .wp-bot-feed{display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1.2rem;}
        .wp-bot-log{display:flex;align-items:flex-start;gap:0.65rem;padding:0.65rem 0.8rem;border-radius:8px;border:1px solid transparent;}
        .wp-bot-log--ok{background:rgba(158,207,184,0.06);border-color:rgba(158,207,184,0.15);}
        .wp-bot-log--warn{background:rgba(232,200,125,0.06);border-color:rgba(232,200,125,0.2);}
        .wp-bot-log--ban{background:rgba(231,76,60,0.06);border-color:rgba(231,76,60,0.2);}
        .wp-bot-log__icon{font-size:0.85rem;flex-shrink:0;margin-top:1px;}
        .wp-bot-log__msg{flex:1;font-size:0.8rem;color:#a8b8c8;line-height:1.45;}
        .wp-bot-log__time{font-size:0.7rem;color:#3a5060;flex-shrink:0;white-space:nowrap;}
        .wp-bot-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;padding-top:1.2rem;border-top:1px solid rgba(255,255,255,0.06);}
        .wp-bot-stat{text-align:center;}
        .wp-bot-stat strong{display:block;font-size:1.3rem;font-weight:700;color:#b8a9e8;font-family:'Lora',serif;}
        .wp-bot-stat span{font-size:0.72rem;color:#4a6070;}

        /* ── TESTIMONIALS ── */
        .wp-testimonials{background:#071524;text-align:center;}
        .wp-test-sub{color:#5a7a8e;font-size:0.95rem;margin-top:-2.5rem;margin-bottom:3rem;}
        .wp-test-stage{position:relative;height:280px;max-width:700px;margin:0 auto 2rem;}
        .wp-test-card{
          position:absolute;inset:0;
          background:#0a1e2e;border:1px solid rgba(255,255,255,0.08);
          border-radius:20px;padding:2.5rem;
          display:flex;flex-direction:column;justify-content:space-between;
          transition:all 0.55s cubic-bezier(0.4,0,0.2,1);
          opacity:0;transform:translateX(60px) scale(0.96);pointer-events:none;
        }
        .wp-test-card.active{opacity:1;transform:translateX(0) scale(1);pointer-events:auto;box-shadow:0 20px 60px rgba(0,0,0,0.35);}
        .wp-test-card.prev{opacity:0;transform:translateX(-60px) scale(0.96);}
        .wp-test-stars{color:#e8c87d;font-size:1rem;letter-spacing:3px;margin-bottom:0.8rem;}
        .wp-test-quote{font-family:'Lora',serif;font-style:italic;font-size:1.05rem;color:#c8d8e4;line-height:1.7;flex:1;}
        .wp-test-author{display:flex;align-items:center;gap:0.9rem;margin-top:1.2rem;}
        .wp-test-av{width:42px;height:42px;border-radius:50%;color:#071524;font-size:0.85rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .wp-test-author strong{display:block;font-size:0.9rem;color:#f0ece4;}
        .wp-test-author span{font-size:0.78rem;color:#5a7a8e;}
        .wp-test-verified{margin-left:auto;font-size:0.7rem;color:#9ecfb8;background:rgba(158,207,184,0.1);border:1px solid rgba(158,207,184,0.25);padding:0.18rem 0.55rem;border-radius:5px;flex-shrink:0;}
        .wp-test-arrows{display:flex;align-items:center;justify-content:center;gap:1.5rem;margin-bottom:1.5rem;}
        .wp-test-arrow{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#d8e4ec;width:38px;height:38px;border-radius:50%;cursor:pointer;font-size:1rem;transition:all 0.18s;display:flex;align-items:center;justify-content:center;}
        .wp-test-arrow:hover{background:rgba(232,200,125,0.15);border-color:#e8c87d;color:#e8c87d;}
        .wp-test-counter{font-size:0.82rem;color:#4a6070;}
        .wp-test-dots{display:flex;justify-content:center;gap:0.5rem;margin-bottom:1rem;}
        .wp-test-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.15);border:none;cursor:pointer;transition:all 0.2s;}
        .wp-test-dot.active{background:#e8c87d;width:24px;border-radius:4px;}
        .wp-test-thumbs{display:flex;justify-content:center;gap:0.75rem;flex-wrap:wrap;margin-top:2rem;}
        .wp-test-thumb{display:flex;flex-direction:column;align-items:center;gap:0.4rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:0.6rem 0.8rem;cursor:pointer;transition:all 0.18s;}
        .wp-test-thumb:hover,.wp-test-thumb.active{background:rgba(255,255,255,0.07);border-color:var(--tc);}
        .wp-test-thumb-av{width:32px;height:32px;border-radius:50%;color:#071524;font-size:0.7rem;font-weight:700;display:flex;align-items:center;justify-content:center;}
        .wp-test-thumb span{font-size:0.7rem;color:#5a7a8e;}
        .wp-test-thumb.active span{color:#e8c87d;}

        /* ── PRICING ── */
        .wp-pricing{background:#0a1e2e;text-align:center;}
        .wp-pricing__sub{color:#5a7a8e;font-size:0.95rem;margin-top:-2.5rem;margin-bottom:3rem;}
        .wp-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;max-width:980px;margin:0 auto;}
        .wp-plan{background:#071524;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:2rem;text-align:left;position:relative;transition:transform 0.2s;}
        .wp-plan:hover{transform:translateY(-4px);}
        .wp-plan--featured{background:#0d2235;border-color:#e8c87d;box-shadow:0 20px 60px rgba(232,200,125,0.12);}
        .wp-plan__badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#e8c87d;color:#1a0e05;font-size:0.72rem;font-weight:700;padding:0.22rem 0.9rem;border-radius:100px;}
        .wp-plan__name{font-size:0.82rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--pa);font-weight:600;margin-bottom:0.5rem;}
        .wp-plan__price{display:flex;align-items:baseline;gap:0.2rem;margin-bottom:0.4rem;}
        .wp-plan__amount{font-family:'Lora',serif;font-size:2.4rem;font-weight:700;color:#f0ece4;}
        .wp-plan__period{color:#5a7a8e;font-size:0.88rem;}
        .wp-plan__desc{font-size:0.8rem;color:#5a7a8e;margin-bottom:1.4rem;}
        .wp-plan__features{list-style:none;display:flex;flex-direction:column;gap:0.55rem;margin-bottom:0.5rem;}
        .wp-plan__features li{font-size:0.85rem;color:#a8b8c8;display:flex;gap:0.6rem;}
        .wp-plan__features li span{color:var(--pa);font-weight:700;}
        .wp-pricing__note{max-width:680px;margin:2.5rem auto 0;font-size:0.82rem;color:#3a5060;background:rgba(184,169,232,0.06);border:1px solid rgba(184,169,232,0.15);border-radius:10px;padding:0.9rem 1.4rem;}

        /* ── CTA BANNER ── */
        .wp-cta-banner{position:relative;overflow:hidden;background:#1a3d5c;padding:5rem 4rem;text-align:center;z-index:1;}
        .wp-cta-banner__inner{position:relative;z-index:1;}
        .wp-cta-banner h2{font-family:'Lora',serif;font-size:2.4rem;font-weight:700;color:#f0ece4;margin-bottom:0.75rem;}
        .wp-cta-banner p{color:#6a8090;margin-bottom:2rem;font-size:1rem;}
        .wp-cta-banner__deco{position:absolute;border-radius:50%;pointer-events:none;}
        .wp-cta-banner__deco--1{width:450px;height:450px;background:#e8c87d;opacity:0.05;top:-180px;right:-120px;}
        .wp-cta-banner__deco--2{width:320px;height:320px;background:#9ecfb8;opacity:0.06;bottom:-130px;left:-90px;}

        /* ── FOOTER ── */
        .wp-footer{background:#040c14;position:relative;z-index:1;}
        .wp-footer__top{display:grid;grid-template-columns:280px 1fr;gap:4rem;padding:4rem 4rem 3rem;}
        .wp-footer__brand p{font-size:0.85rem;color:#3a5060;line-height:1.65;margin:1rem 0 1.5rem;}
        .wp-footer__social{display:flex;gap:0.6rem;}
        .wp-social-btn{width:34px;height:34px;border-radius:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#6a8090;display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;text-decoration:none;transition:all 0.18s;}
        .wp-social-btn:hover{background:rgba(232,200,125,0.1);border-color:#e8c87d;color:#e8c87d;}
        .wp-footer__cols{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;}
        .wp-footer__col{display:flex;flex-direction:column;gap:0.75rem;}
        .wp-footer__col strong{font-size:0.82rem;text-transform:uppercase;letter-spacing:0.08em;color:#8aa5b8;margin-bottom:0.25rem;}
        .wp-footer__col a{font-size:0.84rem;color:#3a5060;text-decoration:none;transition:color 0.18s;}
        .wp-footer__col a:hover{color:#e8c87d;}
        .wp-footer__bottom{display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;align-items:center;padding:1.5rem 4rem;border-top:1px solid rgba(255,255,255,0.05);font-size:0.78rem;color:#2a3a48;}

        @keyframes fadeInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

        /* ── RESPONSIVE ── */
        @media(max-width:1024px){
          .wp-steps{grid-template-columns:repeat(2,1fr);}
          .wp-footer__top{grid-template-columns:1fr;gap:2.5rem;}
          .wp-footer__cols{grid-template-columns:repeat(2,1fr);}
        }
        @media(max-width:860px){
          .wp-hero{grid-template-columns:1fr;padding:7rem 2rem 3rem;}
          .wp-hero__visual{order:-1;}
          .wp-section{padding:4rem 1.5rem;}
          .wp-tasks{grid-template-columns:1fr;}
          .wp-aibot{grid-template-columns:1fr;}
          .wp-plans{grid-template-columns:1fr;max-width:420px;}
          .wp-header{padding:1rem 1.5rem;}
          .wp-nav{display:none;position:fixed;inset:0;top:60px;background:rgba(7,21,36,0.97);flex-direction:column;align-items:center;justify-content:center;gap:2.5rem;font-size:1.2rem;}
          .wp-nav--open{display:flex;}
          .wp-hamburger{display:flex;}
          .wp-header__actions{display:none;}
          .wp-model-strip{padding:1.5rem;flex-direction:column;align-items:flex-start;}
          .wp-model-arrow{transform:rotate(90deg);}
          .wp-footer__top{padding:2.5rem 1.5rem;}
          .wp-footer__bottom{padding:1.5rem;flex-direction:column;text-align:center;}
          .wp-cta-banner{padding:3.5rem 1.5rem;}
          .wp-test-stage{height:340px;}
          .wp-test-thumbs{gap:0.4rem;}
          .wp-steps{grid-template-columns:1fr;}
        }
      `}</style>
    </div>
  );
}