import { useState, useEffect, useRef } from "react";

const ARTICLES = [
  {
    id: 1,
    category: "Cycle Science",
    title: "The Four Phases of Your Cycle and What They Actually Mean",
    author: "Lunara Editorial",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    excerpt: "Your cycle is not just your period. It is a full monthly rhythm with four distinct phases.",
    content: `Your menstrual cycle is one of the most sophisticated biological rhythms in the human body.

**Phase 1: Menstruation (Days 1 to 5)**
This is when the uterine lining sheds. Estrogen and progesterone are at their lowest. Rest, reflect, and be gentle with yourself.

**Phase 2: The Follicular Phase (Days 6 to 13)**
Estrogen rises as your ovaries prepare to release an egg. Energy and creativity surge. Use this window well.

**Phase 3: Ovulation (Around Day 14)**
A surge of luteinizing hormone triggers egg release. Most people feel their most vibrant and communicative now.

**Phase 4: The Luteal Phase (Days 15 to 28)**
Progesterone rises. If no fertilization occurs, both hormones drop and PMS symptoms may emerge. Your cycle is completing, not failing you.`,
  },
  {
    id: 2,
    category: "Body Intel",
    title: "What Your Flow Is Actually Telling You",
    author: "Lunara Editorial",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80",
    excerpt: "Color, consistency, heaviness. Your period gives you more health information than most people realize.",
    content: `Period blood is one of the most informative health signals your body produces.

**Bright red blood** means fresh healthy flow on your heaviest days.

**Dark red or brown blood** at the start or end is older blood. Completely normal.

**Pink spotting** can indicate lower estrogen or appear around ovulation.

**Heavy flow** soaking through protection hourly for several hours can be linked to fibroids, polyps, or thyroid issues worth discussing with a doctor.

**Clots** smaller than a quarter are normal. Larger ones appearing regularly deserve medical attention.`,
  },
  {
    id: 3,
    category: "Real Talk",
    title: "PMS Is Real and Here Is the Science Behind It",
    author: "Lunara Editorial",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=80",
    excerpt: "For decades PMS was dismissed as drama. The science says otherwise.",
    content: `Premenstrual syndrome affects up to 90 percent of people who menstruate. PMS is real, it is hormonal, and it is manageable.

**What is happening:**
The drop in estrogen and progesterone before your period causes serotonin to fall too. That is why irritability, sadness, and anxiety cluster in the days before bleeding.

**PMDD:**
Premenstrual Dysphoric Disorder is a severe form affecting 3 to 8 percent of menstruating people. It is listed in the DSM-5 and is treatable.

**What helps:**
Aerobic exercise, reducing caffeine and sugar in the luteal phase, and magnesium supplementation all have clinical evidence behind them.`,
  },
  {
    id: 4,
    category: "Fertility",
    title: "Ovulation: The Part of Your Cycle Nobody Talks About Enough",
    author: "Lunara Editorial",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    excerpt: "Ovulation is not just a fertility event. It is a full body experience every single month.",
    content: `Ovulation happens around the middle of your cycle when a surge of LH triggers your ovary to release an egg.

**Physical signs:**
Cervical mucus becomes clear and stretchy like egg whites. Some people feel mild one-sided cramping. Basal body temperature rises slightly after ovulation.

**Why this matters beyond fertility:**
Regular ovulation signals healthy hormone production. If you are not ovulating regularly, it can point to PCOS, thyroid dysfunction, or other conditions worth investigating.`,
  },
  {
    id: 5,
    category: "Wellness",
    title: "Eating With Your Cycle: The Food and Hormone Connection",
    author: "Lunara Editorial",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    excerpt: "What you eat affects how your hormones behave across all four phases.",
    content: `Your hormones and nutrition are in constant conversation.

**Menstruation:** Prioritize iron from lentils, spinach, and red meat. Omega-3s from salmon and walnuts reduce cramping.

**Follicular Phase:** Fermented foods support estrogen metabolism. Cruciferous vegetables help the liver clear excess estrogen.

**Ovulation:** High quality protein and zinc from pumpkin seeds support egg maturation.

**Luteal Phase:** Magnesium from dark chocolate and avocado eases bloating and mood dips. Reducing caffeine makes a measurable difference.`,
  },
];

const SYMPTOMS = [
  { id: "cramps", label: "Cramps" },
  { id: "bloating", label: "Bloating" },
  { id: "headache", label: "Headache" },
  { id: "fatigue", label: "Fatigue" },
  { id: "mood_swings", label: "Mood Swings" },
  { id: "acne", label: "Acne" },
  { id: "breast_tenderness", label: "Breast Tenderness" },
  { id: "backache", label: "Backache" },
  { id: "nausea", label: "Nausea" },
  { id: "insomnia", label: "Insomnia" },
  { id: "cravings", label: "Cravings" },
  { id: "spotting", label: "Spotting" },
];

const MOODS = [
  { id: "happy", label: "Happy", color: "#FFD166" },
  { id: "calm", label: "Calm", color: "#06D6A0" },
  { id: "anxious", label: "Anxious", color: "#EF476F" },
  { id: "irritable", label: "Irritable", color: "#F4845F" },
  { id: "sad", label: "Sad", color: "#4CC9F0" },
  { id: "energetic", label: "Energetic", color: "#7B2D8B" },
];

const PERSONAS = [
  {
    id: "teen",
    label: "Teen",
    age: "Ages 13 to 17",
    desc: "Just starting out and want to understand your body better",
    color: "#FF6B9D",
  },
  {
    id: "young",
    label: "Young Adult",
    age: "Ages 18 to 25",
    desc: "Building your routine and taking charge of your wellness",
    color: "#9B5DE5",
  },
  {
    id: "adult",
    label: "Adult",
    age: "Ages 26 and up",
    desc: "Tracking with purpose, whether for health, family, or balance",
    color: "#F72585",
  },
];

const FLOW_LEVELS = ["Spotting", "Light", "Moderate", "Heavy", "Very Heavy"];

function TeenChar() {
  return (
    <svg viewBox="0 0 120 160" width="80" height="80" fill="none">
      <circle cx="60" cy="40" r="28" fill="#FDDCB5" />
      <rect x="38" y="68" width="44" height="52" rx="12" fill="#FF6B9D" />
      <ellipse cx="48" cy="40" r="4" fill="#2D2D2D" />
      <ellipse cx="72" cy="40" r="4" fill="#2D2D2D" />
      <path d="M50 52 Q60 60 70 52" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M32 20 Q60 0 88 20 Q88 8 60 8 Q32 8 32 20Z" fill="#8B4513" />
      <rect x="25" y="72" width="10" height="32" rx="5" fill="#FDDCB5" />
      <rect x="85" y="72" width="10" height="32" rx="5" fill="#FDDCB5" />
      <rect x="42" y="120" width="14" height="32" rx="7" fill="#FFD6E7" />
      <rect x="64" y="120" width="14" height="32" rx="7" fill="#FFD6E7" />
    </svg>
  );
}

function YoungChar() {
  return (
    <svg viewBox="0 0 120 160" width="80" height="80" fill="none">
      <circle cx="60" cy="40" r="28" fill="#F5CBA7" />
      <rect x="36" y="68" width="48" height="54" rx="14" fill="#9B5DE5" />
      <ellipse cx="49" cy="40" r="4.5" fill="#1A1A2E" />
      <ellipse cx="71" cy="40" r="4.5" fill="#1A1A2E" />
      <path d="M50 53 Q60 62 70 53" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M32 18 Q60 2 88 18 Q88 6 60 6 Q32 6 32 18Z" fill="#5C3317" />
      <rect x="24" y="72" width="12" height="34" rx="6" fill="#F5CBA7" />
      <rect x="84" y="72" width="12" height="34" rx="6" fill="#F5CBA7" />
      <rect x="40" y="122" width="16" height="30" rx="8" fill="#D8BFD8" />
      <rect x="64" y="122" width="16" height="30" rx="8" fill="#D8BFD8" />
    </svg>
  );
}

function AdultChar() {
  return (
    <svg viewBox="0 0 120 170" width="80" height="80" fill="none">
      <circle cx="60" cy="42" r="28" fill="#DBA882" />
      <rect x="34" y="70" width="52" height="56" rx="16" fill="#F72585" />
      <ellipse cx="49" cy="42" r="5" fill="#0D0D0D" />
      <ellipse cx="71" cy="42" r="5" fill="#0D0D0D" />
      <path d="M49 55 Q60 65 71 55" stroke="#0D0D0D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M38 20 Q60 8 82 20 L82 14 Q60 2 38 14Z" fill="#2C1503" />
      <rect x="22" y="74" width="12" height="36" rx="6" fill="#DBA882" />
      <rect x="86" y="74" width="12" height="36" rx="6" fill="#DBA882" />
      <rect x="38" y="126" width="18" height="32" rx="9" fill="#FFB3D1" />
      <rect x="64" y="126" width="18" height="32" rx="9" fill="#FFB3D1" />
    </svg>
  );
}

const PersonaCharacters = { teen: TeenChar, young: YoungChar, adult: AdultChar };

export default function Lunara() {
  const [screen, setScreen] = useState("landing");
  const [persona, setPersona] = useState(null);
  const [user, setUser] = useState(null);
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", persona: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [coreDetails, setCoreDetails] = useState({ lastPeriod: "", cycleLength: "28", periodDuration: "5", birthDate: "" });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Hi! I am Luna, your cycle companion. Ask me anything about your period, hormones, symptoms, or cycle health. I am here for you." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [todayLog, setTodayLog] = useState({ flow: "", symptoms: [], mood: "", notes: "" });
  const [logSaved, setLogSaved] = useState(false);
  const [authError, setAuthError] = useState("");
  const chatEndRef = useRef(null);

  const accentColor = persona
    ? PERSONAS.find((p) => p.id === persona)?.color || "#F72585"
    : "#F72585";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  function getDaysUntilNextPeriod() {
    if (!coreDetails.lastPeriod) return null;
    const last = new Date(coreDetails.lastPeriod);
    const cycleLen = parseInt(coreDetails.cycleLength) || 28;
    const next = new Date(last);
    next.setDate(next.getDate() + cycleLen);
    const diff = Math.round((next - new Date()) / (1000 * 60 * 60 * 24));
    return diff;
  }

  function getOvulationDay() {
    if (!coreDetails.lastPeriod) return null;
    const last = new Date(coreDetails.lastPeriod);
    const cycleLen = parseInt(coreDetails.cycleLength) || 28;
    const ovDay = new Date(last);
    ovDay.setDate(ovDay.getDate() + cycleLen - 14);
    return ovDay;
  }

  function getFertileWindow() {
    const ov = getOvulationDay();
    if (!ov) return null;
    const start = new Date(ov);
    start.setDate(start.getDate() - 5);
    return { start, end: ov };
  }

  function formatDate(d) {
    if (!d) return "";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  function getCyclePhase() {
    if (!coreDetails.lastPeriod) return "Unknown";
    const last = new Date(coreDetails.lastPeriod);
    const dayInCycle = Math.round((new Date() - last) / (1000 * 60 * 60 * 24)) + 1;
    const period = parseInt(coreDetails.periodDuration) || 5;
    if (dayInCycle <= period) return "Menstruation";
    if (dayInCycle <= 13) return "Follicular";
    if (dayInCycle <= 16) return "Ovulation";
    return "Luteal";
  }

  const phaseColors = {
    Menstruation: "#EF476F",
    Follicular: "#06D6A0",
    Ovulation: "#FFD166",
    Luteal: "#9B5DE5",
    Unknown: "#aaa",
  };

  async function sendChat() {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setChatLoading(true);

    const personaData = PERSONAS.find((p) => p.id === persona);
    const systemPrompt = `You are Luna, a highly knowledgeable menstrual and reproductive health companion inside a period tracking app called Lunara. You are speaking with a ${personaData ? personaData.label + " aged " + personaData.age : "user"}.

Your core rules:
- Always give accurate, well researched, science-backed answers drawn from medical knowledge about menstrual health, hormones, reproductive biology, gynecology, and related wellness topics
- Every response must contain specific, useful, real information. Never give vague or generic replies
- Adapt your language to the user: for teens be warm and simple like an older sister, for young adults and adults be informed and direct like a knowledgeable peer
- Never use emojis or em dashes in any response
- Structure your response in 2 to 4 short paragraphs with clear helpful information
- If the question is about symptoms, explain what causes them biologically and what helps
- If the question is about the cycle, give specific day ranges, hormone names, and physical changes
- If the question is about fertility or ovulation, give accurate biological detail
- If the question is about pain or health concerns, acknowledge them seriously and give evidence-based suggestions while always recommending a doctor for diagnosis
- Never repeat the same opening line twice across the conversation
- Always end with one practical tip or encouraging sentence
- Only answer questions about menstrual health, hormones, reproductive wellness, period tracking, fertility, and related topics
- If asked something unrelated, gently redirect back to your area of expertise`;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system: systemPrompt,
          messages: [
            ...chatMessages.slice(1).map((m) => ({
              role: m.role === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: userMsg },
          ],
        }),
      });

      const data = await response.json();
      const reply = data.reply || "I am here for you. Could you rephrase that?";
      setChatMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      setChatMessages((prev) => [...prev, { role: "assistant", text: "I am having a moment. Please try again in a few seconds." }]);
    } finally {
      setChatLoading(false);
    }
  }

  function handleSignup() {
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.persona) {
      setAuthError("Please fill in all fields and choose your life stage.");
      return;
    }
    setPersona(signupData.persona);
    setUser({ name: signupData.name, email: signupData.email, persona: signupData.persona });
    setAuthError("");
    setScreen("details");
  }

  function handleLogin() {
    if (!loginData.email || !loginData.password) {
      setAuthError("Please enter your email and password.");
      return;
    }
    setPersona("young");
    setUser({ name: "Friend", email: loginData.email, persona: "young" });
    setAuthError("");
    setScreen("app");
  }

  function handleDetails() {
    if (!coreDetails.lastPeriod) {
      setAuthError("Please enter your last period date.");
      return;
    }
    setAuthError("");
    setScreen("app");
  }

  const CharComp = persona ? (PersonaCharacters[persona] || YoungChar) : YoungChar;
  const phase = getCyclePhase();
  const daysUntil = getDaysUntilNextPeriod();
  const ovDay = getOvulationDay();
  const fertile = getFertileWindow();

  const appStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff0f5 0%, #f5e6ff 50%, #ffe0f0 100%)",
    fontFamily: "'DM Sans', sans-serif",
  };

  const cardStyle = {
    background: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    boxShadow: "0 2px 12px rgba(155,93,229,0.08)",
  };

  const btnPrimary = {
    width: "100%",
    padding: "16px",
    borderRadius: 50,
    background: `linear-gradient(135deg, ${accentColor}, #9B5DE5)`,
    color: "white",
    border: "none",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "2px solid #E8DCF0",
    background: "white",
    fontSize: 15,
    outline: "none",
    color: "#2D1B4E",
    fontFamily: "'DM Sans', sans-serif",
    marginBottom: 16,
  };

  const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#4A3560",
    marginBottom: 6,
  };

  if (screen === "landing") {
    return (
      <div style={appStyle}>
        <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #F72585, #9B5DE5)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 8px 32px rgba(247,37,133,0.3)" }}>
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="8" fill="white" opacity="0.9" />
              <path d="M16 4 Q20 10 28 16 Q20 22 16 28 Q12 22 4 16 Q12 10 16 4Z" fill="white" opacity="0.4" />
            </svg>
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 700, background: "linear-gradient(135deg, #F72585, #9B5DE5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1, marginBottom: 12, fontFamily: "'Playfair Display', serif" }}>
            Lunara
          </h1>
          <p style={{ fontSize: 16, color: "#7B6B8D", lineHeight: 1.7, marginBottom: 40, maxWidth: 320 }}>
            Your personal cycle companion. Track, understand, and celebrate your body at every stage of life.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 320 }}>
            <button onClick={() => { setScreen("signup"); setAuthError(""); }} style={btnPrimary}>
              Get Started
            </button>
            <button onClick={() => { setScreen("login"); setAuthError(""); }} style={{ ...btnPrimary, background: "white", color: "#F72585", border: "2px solid #F72585" }}>
              Sign In
            </button>
          </div>
          <div style={{ marginTop: 48, display: "flex", gap: 32, justifyContent: "center" }}>
            {[["Private", "Your data, always yours"], ["Science", "Evidence-based insights"], ["Kind", "No judgment, ever"]].map(([t, d]) => (
              <div key={t}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#F72585", marginBottom: 4 }}>{t}</div>
                <div style={{ fontSize: 11, color: "#9B8AAA", maxWidth: 80 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (screen === "signup") {
    return (
      <div style={appStyle}>
        <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", padding: "32px 24px", overflowY: "auto" }}>
          <button onClick={() => setScreen("landing")} style={{ background: "none", border: "none", color: "#9B5DE5", fontSize: 14, cursor: "pointer", marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>
            Back
          </button>
          <h2 style={{ fontSize: 32, color: "#2D1B4E", marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>Join Lunara</h2>
          <p style={{ color: "#9B8AAA", fontSize: 14, marginBottom: 28 }}>Your safe space to understand your cycle</p>
          <label style={labelStyle}>Choose your life stage</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {PERSONAS.map((p) => {
              const PC = PersonaCharacters[p.id];
              return (
                <div
                  key={p.id}
                  onClick={() => setSignupData({ ...signupData, persona: p.id })}
                  style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: 16, border: `2px solid ${signupData.persona === p.id ? p.color : "#E8DCF0"}`, background: signupData.persona === p.id ? p.color + "15" : "white", cursor: "pointer" }}
                >
                  <div style={{ width: 52, height: 52, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PC />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#2D1B4E", fontSize: 15 }}>{p.label}</div>
                    <div style={{ fontSize: 12, color: p.color, fontWeight: 500 }}>{p.age}</div>
                    <div style={{ fontSize: 12, color: "#9B8AAA", marginTop: 2 }}>{p.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <label style={labelStyle}>Your Name</label>
          <input type="text" placeholder="What should we call you?" value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} style={inputStyle} />
          <label style={labelStyle}>Email</label>
          <input type="email" placeholder="your@email.com" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} style={inputStyle} />
          <label style={labelStyle}>Password</label>
          <input type="password" placeholder="Create a password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} style={inputStyle} />
          {authError && (
            <div style={{ color: "#EF476F", fontSize: 13, marginBottom: 12, padding: "10px 14px", background: "#FFF0F3", borderRadius: 10 }}>
              {authError}
            </div>
          )}
          <button onClick={handleSignup} style={btnPrimary}>Create My Account</button>
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#9B8AAA" }}>
            Already have an account?{" "}
            <span onClick={() => setScreen("login")} style={{ color: "#F72585", cursor: "pointer", fontWeight: 600 }}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (screen === "login") {
    return (
      <div style={appStyle}>
        <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", padding: "32px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <button onClick={() => setScreen("landing")} style={{ background: "none", border: "none", color: "#9B5DE5", fontSize: 14, cursor: "pointer", marginBottom: 32, width: "fit-content", fontFamily: "'DM Sans', sans-serif" }}>
            Back
          </button>
          <h2 style={{ fontSize: 36, color: "#2D1B4E", marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>Welcome back</h2>
          <p style={{ color: "#9B8AAA", fontSize: 14, marginBottom: 40 }}>Your cycle does not take days off, and neither do we.</p>
          <label style={labelStyle}>Email</label>
          <input type="email" placeholder="your@email.com" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} style={inputStyle} />
          <label style={labelStyle}>Password</label>
          <input type="password" placeholder="Your password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} style={inputStyle} />
          {authError && (
            <div style={{ color: "#EF476F", fontSize: 13, marginBottom: 12, padding: "10px 14px", background: "#FFF0F3", borderRadius: 10 }}>
              {authError}
            </div>
          )}
          <button onClick={handleLogin} style={btnPrimary}>Sign In</button>
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#9B8AAA" }}>
            New here?{" "}
            <span onClick={() => setScreen("signup")} style={{ color: "#F72585", cursor: "pointer", fontWeight: 600 }}>
              Create an account
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (screen === "details") {
    return (
      <div style={appStyle}>
        <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", padding: "32px 24px", overflowY: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "inline-block", marginBottom: 12 }}>
              <CharComp />
            </div>
            <h2 style={{ fontSize: 28, color: "#2D1B4E", marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>
              Hi {user?.name}!
            </h2>
            <p style={{ color: "#9B8AAA", fontSize: 14 }}>
              Let us set up your cycle profile so we can give you accurate predictions.
            </p>
          </div>
          <div style={cardStyle}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#2D1B4E", marginBottom: 20 }}>Your Cycle Details</h3>
            <label style={labelStyle}>First day of your last period</label>
            <input type="date" value={coreDetails.lastPeriod} onChange={(e) => setCoreDetails({ ...coreDetails, lastPeriod: e.target.value })} style={inputStyle} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Cycle length</label>
                <select
                  value={coreDetails.cycleLength}
                  onChange={(e) => setCoreDetails({ ...coreDetails, cycleLength: e.target.value })}
                  style={{ width: "100%", padding: "14px 12px", borderRadius: 12, border: "2px solid #E8DCF0", background: "white", fontSize: 14, outline: "none", color: "#2D1B4E", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {Array.from({ length: 20 }, (_, i) => i + 21).map((d) => (
                    <option key={d} value={d}>{d} days</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Period duration</label>
                <select
                  value={coreDetails.periodDuration}
                  onChange={(e) => setCoreDetails({ ...coreDetails, periodDuration: e.target.value })}
                  style={{ width: "100%", padding: "14px 12px", borderRadius: 12, border: "2px solid #E8DCF0", background: "white", fontSize: 14, outline: "none", color: "#2D1B4E", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{d} days</option>
                  ))}
                </select>
              </div>
            </div>
            <label style={labelStyle}>Date of birth (optional)</label>
            <input type="date" value={coreDetails.birthDate} onChange={(e) => setCoreDetails({ ...coreDetails, birthDate: e.target.value })} style={{ ...inputStyle, marginBottom: 0 }} />
          </div>
          {authError && (
            <div style={{ color: "#EF476F", fontSize: 13, marginBottom: 12, padding: "10px 14px", background: "#FFF0F3", borderRadius: 10 }}>
              {authError}
            </div>
          )}
          <button onClick={handleDetails} style={btnPrimary}>Take Me to Lunara</button>
        </div>
      </div>
    );
  }

  if (selectedArticle) {
    const art = ARTICLES.find((a) => a.id === selectedArticle);
    return (
      <div style={appStyle}>
        <div style={{ maxWidth: 640, margin: "0 auto", minHeight: "100vh", overflowY: "auto" }}>
          <div style={{ position: "relative" }}>
            <img src={art.image} alt={art.title} style={{ width: "100%", height: 240, objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7))" }} />
            <button
              onClick={() => setSelectedArticle(null)}
              style={{ position: "absolute", top: 16, left: 16, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: 50, width: 40, height: 40, cursor: "pointer", fontSize: 18, color: "#2D1B4E", fontFamily: "'DM Sans', sans-serif" }}
            >
              x
            </button>
          </div>
          <div style={{ padding: "28px 24px 80px" }}>
            <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 50, background: accentColor + "20", color: accentColor, fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
              {art.category}
            </span>
            <h1 style={{ fontSize: 28, color: "#2D1B4E", lineHeight: 1.3, marginBottom: 12, fontFamily: "'Playfair Display', serif" }}>
              {art.title}
            </h1>
            <div style={{ display: "flex", gap: 16, marginBottom: 28, color: "#9B8AAA", fontSize: 13 }}>
              <span>{art.author}</span>
              <span>{art.readTime}</span>
            </div>
            <div style={{ color: "#4A3560", lineHeight: 1.9, fontSize: 15 }}>
              {art.content.split("\n\n").map((para, i) =>
                para.startsWith("**") ? (
                  <p key={i} style={{ fontWeight: 700, color: "#2D1B4E", fontSize: 16, marginBottom: 12, marginTop: 24, fontFamily: "'Playfair Display', serif" }}>
                    {para.replace(/\*\*/g, "")}
                  </p>
                ) : (
                  <p key={i} style={{ marginBottom: 16 }}>{para}</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabItems = [
    { id: "dashboard", label: "Home", path: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
    { id: "log", label: "Log", path: "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" },
    { id: "articles", label: "Learn", path: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z" },
    { id: "luna", label: "Luna AI", path: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
  ];

  return (
    <div style={appStyle}>
      <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
        <div style={{ padding: "20px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 13, color: "#9B8AAA" }}>Good day,</p>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#2D1B4E", fontFamily: "'Playfair Display', serif" }}>{user?.name}</h2>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${accentColor}, #9B5DE5)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden" }}>
            <CharComp />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 100px" }}>

          {activeTab === "dashboard" && (
            <div>
              <div style={{ background: `linear-gradient(135deg, ${phaseColors[phase]}, ${accentColor})`, borderRadius: 24, padding: 24, marginBottom: 16, color: "white", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                <p style={{ fontSize: 11, opacity: 0.85, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Current Phase</p>
                <h2 style={{ fontSize: 32, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 4 }}>{phase}</h2>
                <p style={{ fontSize: 13, opacity: 0.85 }}>
                  {phase === "Menstruation" && "Rest and replenish. Your body is working hard."}
                  {phase === "Follicular" && "Energy is rising. Great time to start new things."}
                  {phase === "Ovulation" && "Peak vitality. You may feel your most vibrant."}
                  {phase === "Luteal" && "Wind down and be gentle with yourself."}
                  {phase === "Unknown" && "Add your last period date to see your phase."}
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[
                  ["Next Period", daysUntil !== null ? (daysUntil <= 0 ? "Today" : daysUntil + " days") : "--", "#F72585"],
                  ["Ovulation", ovDay ? formatDate(ovDay) : "--", "#9B5DE5"],
                  ["Fertile", fertile ? formatDate(fertile.start) : "--", "#06D6A0"],
                ].map(([label, val, color]) => (
                  <div key={label} style={{ background: "white", borderRadius: 16, padding: "14px 12px", textAlign: "center", boxShadow: "0 2px 12px rgba(155,93,229,0.08)" }}>
                    <p style={{ fontSize: 10, color: "#9B8AAA", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color }}>{val}</p>
                  </div>
                ))}
              </div>

              <div style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#2D1B4E" }}>Cycle Overview</h3>
                  <span style={{ fontSize: 12, color: accentColor, fontWeight: 600 }}>{coreDetails.cycleLength} day cycle</span>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {[
                    { label: "Period", days: parseInt(coreDetails.periodDuration), color: "#EF476F" },
                    { label: "Follicular", days: 13 - parseInt(coreDetails.periodDuration), color: "#06D6A0" },
                    { label: "Ovulation", days: 2, color: "#FFD166" },
                    { label: "Luteal", days: parseInt(coreDetails.cycleLength) - 15, color: "#9B5DE5" },
                  ].map((seg) => (
                    <div key={seg.label} style={{ flex: seg.days, height: 8, borderRadius: 4, background: seg.color }} />
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
                  {[["Period", "#EF476F"], ["Follicular", "#06D6A0"], ["Ovulation", "#FFD166"], ["Luteal", "#9B5DE5"]].map(([l, c]) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                      <span style={{ fontSize: 11, color: "#9B8AAA" }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "linear-gradient(135deg, #f5e6ff, #ffe0f0)", borderRadius: 20, padding: 20 }}>
                <p style={{ fontSize: 12, color: accentColor, fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Phase Tip</p>
                <p style={{ fontSize: 14, color: "#4A3560", lineHeight: 1.7 }}>
                  {phase === "Menstruation" && "Iron-rich foods like lentils and leafy greens help replenish what your body loses during your period."}
                  {phase === "Follicular" && "Rising estrogen makes this a great time for brainstorming and starting new projects."}
                  {phase === "Ovulation" && "Your communication skills peak during ovulation. Great time for important conversations."}
                  {phase === "Luteal" && "Magnesium from dark chocolate and avocado can ease PMS symptoms like bloating and mood dips."}
                  {phase === "Unknown" && "Log your last period date to get personalized phase tips."}
                </p>
              </div>
            </div>
          )}

          {activeTab === "log" && (
            <div>
              <h2 style={{ fontSize: 28, color: "#2D1B4E", marginBottom: 4, fontFamily: "'Playfair Display', serif" }}>Today's Log</h2>
              <p style={{ fontSize: 14, color: "#9B8AAA", marginBottom: 24 }}>
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
              <div style={cardStyle}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1B4E", marginBottom: 14 }}>Flow Level</h3>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {FLOW_LEVELS.map((f) => (
                    <button
                      key={f}
                      onClick={() => setTodayLog({ ...todayLog, flow: f })}
                      style={{ padding: "8px 14px", borderRadius: 50, border: `2px solid ${todayLog.flow === f ? accentColor : "#E8DCF0"}`, background: todayLog.flow === f ? accentColor : "white", color: todayLog.flow === f ? "white" : "#4A3560", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div style={cardStyle}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1B4E", marginBottom: 14 }}>How are you feeling?</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {MOODS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setTodayLog({ ...todayLog, mood: m.id })}
                      style={{ padding: "12px 8px", borderRadius: 14, border: `2px solid ${todayLog.mood === m.id ? m.color : "#E8DCF0"}`, background: todayLog.mood === m.id ? m.color + "20" : "white", color: todayLog.mood === m.id ? m.color : "#4A3560", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={cardStyle}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1B4E", marginBottom: 14 }}>Symptoms</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {SYMPTOMS.map((s) => {
                    const active = todayLog.symptoms.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        onClick={() => setTodayLog({ ...todayLog, symptoms: active ? todayLog.symptoms.filter((x) => x !== s.id) : [...todayLog.symptoms, s.id] })}
                        style={{ padding: "10px 14px", borderRadius: 12, border: `2px solid ${active ? accentColor : "#E8DCF0"}`, background: active ? accentColor + "15" : "white", color: active ? accentColor : "#4A3560", fontSize: 13, fontWeight: active ? 600 : 400, cursor: "pointer", textAlign: "left", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div style={cardStyle}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2D1B4E", marginBottom: 12 }}>Notes</h3>
                <textarea
                  value={todayLog.notes}
                  onChange={(e) => setTodayLog({ ...todayLog, notes: e.target.value })}
                  placeholder="Anything you want to remember about today..."
                  style={{ width: "100%", height: 100, padding: "12px 14px", borderRadius: 12, border: "2px solid #E8DCF0", background: "#FAFAFA", fontSize: 14, resize: "none", outline: "none", color: "#2D1B4E", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
              {logSaved && (
                <div style={{ background: "#EFFFFA", border: "2px solid #06D6A0", borderRadius: 12, padding: "12px 16px", marginBottom: 16, color: "#059669", fontSize: 14, fontWeight: 500 }}>
                  Log saved. Well done for taking care of yourself today.
                </div>
              )}
              <button onClick={() => { setLogSaved(true); setTimeout(() => setLogSaved(false), 3000); }} style={btnPrimary}>
                Save Today's Log
              </button>
            </div>
          )}

          {activeTab === "articles" && (
            <div>
              <h2 style={{ fontSize: 28, color: "#2D1B4E", marginBottom: 4, fontFamily: "'Playfair Display', serif" }}>Body Intelligence</h2>
              <p style={{ fontSize: 14, color: "#9B8AAA", marginBottom: 24 }}>Real science, honest talk, written for you.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {ARTICLES.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArticle(art.id)}
                    style={{ background: "white", borderRadius: 20, overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 16px rgba(155,93,229,0.08)" }}
                  >
                    <img src={art.image} alt={art.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                    <div style={{ padding: "16px 18px 20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ padding: "3px 10px", borderRadius: 50, background: accentColor + "20", color: accentColor, fontSize: 11, fontWeight: 600 }}>{art.category}</span>
                        <span style={{ fontSize: 11, color: "#9B8AAA" }}>{art.readTime}</span>
                      </div>
                      <h3 style={{ fontSize: 18, color: "#2D1B4E", lineHeight: 1.3, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>{art.title}</h3>
                      <p style={{ fontSize: 13, color: "#7B6B8D", lineHeight: 1.6 }}>{art.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "luna" && (
            <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 180px)" }}>
              <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${accentColor}, #9B5DE5)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="8" fill="white" opacity="0.9" />
                    <path d="M16 4 Q20 10 28 16 Q20 22 16 28 Q12 22 4 16 Q12 10 16 4Z" fill="white" opacity="0.4" />
                  </svg>
                </div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#2D1B4E", fontFamily: "'Playfair Display', serif" }}>Luna</h2>
                  <p style={{ fontSize: 12, color: "#06D6A0", fontWeight: 500 }}>Online and here for you</p>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: "auto", marginBottom: 12, display: "flex", flexDirection: "column", gap: 12 }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{ maxWidth: "82%", padding: "12px 16px", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: msg.role === "user" ? `linear-gradient(135deg, ${accentColor}, #9B5DE5)` : "white", color: msg.role === "user" ? "white" : "#2D1B4E", fontSize: 14, lineHeight: 1.7, boxShadow: msg.role === "user" ? `0 4px 16px ${accentColor}40` : "0 2px 12px rgba(155,93,229,0.08)", whiteSpace: "pre-wrap" }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ padding: "16px 20px", borderRadius: "18px 18px 18px 4px", background: "white", boxShadow: "0 2px 12px rgba(155,93,229,0.08)", display: "flex", gap: 5, alignItems: "center" }}>
                      {[0, 1, 2].map((i) => (
                        <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: accentColor, opacity: 0.6 + i * 0.2 }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div style={{ display: "flex", gap: 10, paddingBottom: 8 }}>
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendChat()}
                  placeholder="Ask Luna anything about your cycle..."
                  style={{ flex: 1, padding: "14px 18px", borderRadius: 50, border: "2px solid #E8DCF0", background: "white", fontSize: 14, outline: "none", color: "#2D1B4E", fontFamily: "'DM Sans', sans-serif" }}
                />
                <button
                  onClick={sendChat}
                  disabled={chatLoading}
                  style={{ width: 48, height: 48, borderRadius: "50%", background: chatLoading ? "#E8DCF0" : `linear-gradient(135deg, ${accentColor}, #9B5DE5)`, border: "none", cursor: chatLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "rgba(255,255,255,0.96)", borderTop: "1px solid #F0E8FA", padding: "12px 24px 20px", display: "flex", justifyContent: "space-around" }}>
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: "4px 12px" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={activeTab === tab.id ? accentColor : "#C4B5D8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={tab.path} />
              </svg>
              <span style={{ fontSize: 11, fontWeight: activeTab === tab.id ? 700 : 400, color: activeTab === tab.id ? accentColor : "#C4B5D8", fontFamily: "'DM Sans', sans-serif" }}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}