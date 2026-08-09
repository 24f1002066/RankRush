/* ═══════════════════════════════════════════════════════════════
   RKMS DEOGHAR PORTAL — DATA FILE
   ───────────────────────────────────────────────────────────────
   This is the single place to add/edit RKMS content: subjects,
   study material, tests, tips, notices and gallery photos.
   All rkms/*.html pages read from these objects at runtime.
   No build step needed — just edit the arrays below and refresh.
   ═══════════════════════════════════════════════════════════════ */

/* ------------------------------------------------------------------
   1. SUBJECTS
   `progress` here is a DEFAULT shown to logged-out / first-time users.
   Once a student attempts tests, js/rkms-common.js overrides these
   numbers using data saved in localStorage (see rkmsProgress helpers).
------------------------------------------------------------------ */
const RKMS_SUBJECTS = [
  {
    id: "hindi",
    name: "हिंदी (Hindi)",
    icon: "fa-language",
    color: "#f97316",
    progress: 0,
    topics: [
      "पद भेद एवं व्याकरणिक कोटियाँ", "शब्द परिवर्तन एवं रूप", "पर्यायवाची", "विलोम शब्द",
      "अनेक शब्दों के लिए एक शब्द", "मुहावरे एवं लोकोक्तियाँ", "शब्द भेद एवं उत्पत्ति",
      "समास", "उपसर्ग एवं प्रत्यय","रचनात्मक लेखन के विशिष्ट रूप","वाक्य रचना एवं नियम", "वाक्य शुद्धि", "अपठित गद्यांश"
    ],
    testsCount: 6,
    notesCount: 5
  },
  {
    id: "english",
    name: "English",
    icon: "fa-spell-check",
    color: "#22d3ee",
    progress: 0,
    topics: [
      "Grammar", "Vocabulary", "Spelling", "Synonyms & Antonyms",
      "Sentence Formation", "Error Detection", "Comprehension", "Writing"
    ],
    testsCount: 5,
    notesCount: 4
  },
  {
    id: "maths",
    name: "Mathematics",
    icon: "fa-square-root-variable",
    color: "#0ea5e9",
    progress: 0,
    topics: [
      "Number System", "Fractions", "Decimals", "Percentage", "Ratio & Proportion",
      "Average", "Profit & Loss", "Simple Interest", "Geometry", "Mensuration",
      "Data Handling", "Basic Algebra"
    ],
    testsCount: 8,
    notesCount: 6
  },
  {
    id: "reasoning",
    name: "Reasoning",
    icon: "fa-puzzle-piece",
    color: "#a855f7",
    progress: 0,
    topics: [
      "Analogy", "Classification", "Number Series", "Alphabet Series", "Coding-Decoding",
      "Direction Test", "Ranking", "Blood Relations", "Odd One Out", "Pattern Recognition", "Logical Reasoning"
    ],
    testsCount: 6,
    notesCount: 4
  },
  {
    id: "gk",
    name: "GK & Current Affairs",
    icon: "fa-earth-asia",
    color: "#d4af37",
    progress: 0,
    topics: [
      "India", "Jharkhand", "Important Personalities", "Science & Technology",
      "Sports", "Awards", "Important Days", "Current Affairs"
    ],
    testsCount: 5,
    notesCount: 5
  }
];

/* ------------------------------------------------------------------
   2. STUDY MATERIAL
   type: "notes" | "practice" | "concept" | "pdf" | "important" | "revision"
   fileUrl: point this to your actual Google Drive / hosted PDF link.
   A "#" placeholder opens nothing and is clearly marked TODO in the UI.
------------------------------------------------------------------ */
const RKMS_STUDY_MATERIALS = [
  { subject: "hindi", topic: "संधि", type: "notes", level: "Class 5-6", title: "संधि — नियम एवं उदाहरण", fileUrl: "#" },
  { subject: "hindi", topic: "मुहावरे एवं लोकोक्तियाँ", type: "important", level: "Class 5-6", title: "50 प्रमुख मुहावरे — Important Questions", fileUrl: "#" },
  { subject: "hindi", topic: "अपठित गद्यांश", type: "practice", level: "Class 5-6", title: "अपठित गद्यांश — Practice Set", fileUrl: "#" },
  { subject: "english", topic: "Grammar", type: "concept", level: "Class 5-6", title: "Tenses — Concept Explanation", fileUrl: "#" },
  { subject: "english", topic: "Error Detection", type: "practice", level: "Class 5-6", title: "Error Detection — 40 Questions", fileUrl: "#" },
  { subject: "english", topic: "Comprehension", type: "pdf", level: "Class 5-6", title: "Unseen Passages — PDF Set", fileUrl: "#" },
  { subject: "maths", topic: "Fractions", type: "notes", level: "Class 5-6", title: "Fractions — Complete Notes", fileUrl: "#" },
  { subject: "maths", topic: "Profit & Loss", type: "important", level: "Class 5-6", title: "Profit & Loss — Important Questions", fileUrl: "#" },
  { subject: "maths", topic: "Geometry", type: "revision", level: "Class 5-6", title: "Geometry — Quick Revision Sheet", fileUrl: "#" },
  { subject: "reasoning", topic: "Coding-Decoding", type: "concept", level: "Class 5-6", title: "Coding-Decoding — How It Works", fileUrl: "#" },
  { subject: "reasoning", topic: "Blood Relations", type: "practice", level: "Class 5-6", title: "Blood Relations — Practice Questions", fileUrl: "#" },
  { subject: "gk", topic: "Jharkhand", type: "notes", level: "Class 5-6", title: "Jharkhand GK — District & Culture Notes", fileUrl: "#" },
  { subject: "gk", topic: "Current Affairs", type: "revision", level: "Class 5-6", title: "Monthly Current Affairs — Revision Capsule", fileUrl: "#" }
];

const RKMS_MATERIAL_TYPE_LABELS = {
  notes: "📖 Notes",
  practice: "📝 Practice Questions",
  concept: "💡 Concept Explanation",
  pdf: "📄 PDF",
  important: "🎯 Important Questions",
  revision: "🔄 Revision Material"
};

/* ------------------------------------------------------------------
   3. TEST CATEGORIES
   Each test references a `setKey`. Wire real questions by adding rows
   to your Google Sheet (see CONFIG.QUESTIONS_CSV_URL in tests.html)
   with a matching "set" column, exactly like netarhat.html / jnvst.html.
------------------------------------------------------------------ */
const RKMS_TEST_CATEGORIES = [
  {
    id: "foundation", label: "Foundation Tests", badgeClass: "rk-badge-foundation",
    tests: [
      { setKey: "found1", title: "Foundation Set 1 — Mixed", questions: 20, minutes: 20, difficulty: "Easy" },
      { setKey: "found2", title: "Foundation Set 2 — Mixed", questions: 20, minutes: 20, difficulty: "Easy" }
    ]
  },
  {
    id: "subject", label: "Subject Tests", badgeClass: "rk-badge-subject",
    tests: [
      { setKey: "sub-hindi", title: "Hindi — Subject Test", questions: 30, minutes: 30, difficulty: "Medium" },
      { setKey: "sub-eng", title: "English — Subject Test", questions: 30, minutes: 30, difficulty: "Medium" },
      { setKey: "sub-maths", title: "Mathematics — Subject Test", questions: 30, minutes: 30, difficulty: "Medium" },
      { setKey: "sub-reasoning", title: "Reasoning — Subject Test", questions: 30, minutes: 30, difficulty: "Medium" }
    ]
  },
  {
    id: "advanced", label: "Advanced Tests", badgeClass: "rk-badge-advanced",
    tests: [
      { setKey: "adv1", title: "Advanced Set 1 — All Subjects", questions: 40, minutes: 40, difficulty: "Hard" },
      { setKey: "adv2", title: "Advanced Set 2 — All Subjects", questions: 40, minutes: 40, difficulty: "Hard" }
    ]
  },
  {
    id: "mock", label: "Full Mock Tests", badgeClass: "rk-badge-mock",
    tests: [
      { setKey: "mock1", title: "Full Mock Test 1", questions: 100, minutes: 90, difficulty: "Exam-level" },
      { setKey: "mock2", title: "Full Mock Test 2", questions: 100, minutes: 90, difficulty: "Exam-level" }
    ]
  },
  {
    id: "pattern", label: "Expected Pattern Tests", badgeClass: "rk-badge-pattern",
    tests: [
      { setKey: "pattern1", title: "Expected Pattern Set 1", questions: 50, minutes: 45, difficulty: "Exam-level" }
    ]
  }
];

/* Fallback demo questions used ONLY when the Google Sheet CSV in
   tests.html isn't configured yet, so the test engine is functional
   out of the box. Replace/extend by publishing your own sheet. */
const RKMS_DEMO_QUESTIONS = [
  { set: "found1", category: "maths", qEng: "What is 15% of 200?", qHin: "200 का 15% क्या है?", options: ["20", "30", "25", "35"], answer: 1, explanation: "15% of 200 = (15/100) × 200 = 30." },
  { set: "found1", category: "reasoning", qEng: "Find the odd one out: Apple, Mango, Potato, Banana", qHin: "विषम शब्द चुनें: सेब, आम, आलू, केला", options: ["Apple", "Mango", "Potato", "Banana"], answer: 2, explanation: "Potato is a vegetable; the rest are fruits." },
  { set: "found1", category: "hindi", qEng: "‘सूर्य’ का पर्यायवाची चुनें:", qHin: "‘सूर्य’ का पर्यायवाची चुनें:", options: ["चंद्र", "दिनकर", "पवन", "सागर"], answer: 1, explanation: "‘दिनकर’ सूर्य का पर्यायवाची शब्द है।" },
  { set: "found1", category: "gk", qEng: "Jharkhand was formed in the year:", qHin: "झारखंड राज्य किस वर्ष बना था?", options: ["1998", "2000", "2001", "2005"], answer: 1, explanation: "Jharkhand was carved out of Bihar on 15 November 2000." }
];

/* ------------------------------------------------------------------
   4. TIP OF THE DAY — add as many as you like, one shown at random
------------------------------------------------------------------ */
const RKMS_TIPS = [
  { icon: "💡", text: "Don't spend too much time on one difficult question. Secure the easier marks first." },
  { icon: "📖", text: "Revise formulas every morning for 10 minutes instead of one long session before the exam." },
  { icon: "✍️", text: "Practice writing Hindi answers neatly — presentation matters in descriptive sections." },
  { icon: "⏱️", text: "Time yourself on every practice set. Speed comes from repetition, not shortcuts." },
  { icon: "🧠", text: "In reasoning, draw the diagram for blood relations and direction questions — don't solve in your head." }
];

/* ------------------------------------------------------------------
   5. UPDATES / NOTICES
   category: "admission" | "exam" | "dates" | "material" | "tests" | "announcement"
------------------------------------------------------------------ */
const RKMS_UPDATES = [
  { date: "2026-08-01", category: "material", title: "New Mathematics revision sheet added", desc: "Geometry quick-revision sheet uploaded under Study Material." },
  { date: "2026-07-20", category: "tests", title: "2 new Subject Tests live", desc: "Hindi and English subject-wise tests are now available in the Test Arena." },
  { date: "2026-07-10", category: "announcement", title: "Daily Challenge streak feature added", desc: "Attempt the Daily Challenge consecutively to build your streak." },
  { date: "2026-06-28", category: "dates", title: "Check official RKMS Deoghar notice board", desc: "For exact admission and exam dates, always confirm with the official Vidyapith notice board — RankRush is an independent preparation resource." }
];

const RKMS_UPDATE_CAT_STYLE = {
  admission: { bg: "rgba(74,222,128,0.12)", color: "#4ade80", label: "Admission" },
  exam: { bg: "rgba(14,165,233,0.12)", color: "#22d3ee", label: "Examination" },
  dates: { bg: "rgba(212,175,55,0.14)", color: "#d4af37", label: "Important Date" },
  material: { bg: "rgba(224,138,30,0.14)", color: "#e08a1e", label: "Study Material" },
  tests: { bg: "rgba(168,85,247,0.12)", color: "#a855f7", label: "Test Series" },
  announcement: { bg: "rgba(248,113,113,0.12)", color: "#f87171", label: "Announcement" }
};

/* ------------------------------------------------------------------
   6. GALLERY
   Placeholder images live in /assets/rkms/images/. Replace the `src`
   with your real photographs using the SAME filenames — nothing else
   needs to change. See /assets/rkms/images/README.md for naming rules.
------------------------------------------------------------------ */
const RKMS_GALLERY = [
  { category: "campus", src: "../assets/rkms/images/rkms-campus.webp", alt: "RKMS Deoghar campus placeholder — replace with a real campus photo", caption: "Campus" },
  { category: "campus", src: "../assets/rkms/images/rkms-building.jpg", alt: "RKMS Deoghar main building placeholder", caption: "Main Building" },
  { category: "academic", src: "../assets/rkms/images/rkms-academic.jpg", alt: "RKMS Deoghar academic environment placeholder", caption: "Academic Environment" },
  { category: "students", src: "../assets/rkms/images/rkms-students.png", alt: "RKMS Deoghar students placeholder", caption: "Students at Vidyapith" },
  { category: "spiritual", src: "../assets/rkms/images/rkms-campus-life.jpg", alt: "RKMS Deoghar spiritual environment placeholder", caption: "Spiritual Environment" },
  { category: "campuslife", src: "../assets/rkms/images/rkms-environment.jpeg", alt: "RKMS Deoghar campus life placeholder", caption: "Campus Life" },
  { category: "moments", src: "../assets/rkms/images/rkms-gallery-01.jpeg", alt: "RKMS Deoghar Vidyapith moment placeholder 1", caption: "Vidyapith Moments" },
  { category: "moments", src: "../assets/rkms/images/rkms-gallery-02.jpg", alt: "RKMS Deoghar Vidyapith moment placeholder 2", caption: "Vidyapith Moments" }
];

const RKMS_GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "campus", label: "Campus" },
  { id: "academic", label: "Academic Environment" },
  { id: "students", label: "Students" },
  { id: "spiritual", label: "Spiritual Environment" },
  { id: "campuslife", label: "Campus Life" },
  { id: "moments", label: "Vidyapith Moments" }
];

/* ------------------------------------------------------------------
   7. 12-WEEK ROADMAP
------------------------------------------------------------------ */
const RKMS_ROADMAP = [
  { range: "Week 1–3", phase: "Foundation", tasks: [
    "Cover NCERT-level basics in all 5 subjects",
    "Build daily 45-min study routine",
    "Take the Foundation diagnostic test"
  ]},
  { range: "Week 4–6", phase: "Concept Building", tasks: [
    "Deep-dive Maths (Fractions, Percentage, Ratio)",
    "Hindi grammar rules (संधि, समास, उपसर्ग-प्रत्यय)",
    "Start daily 10-question challenge"
  ]},
  { range: "Week 7–9", phase: "Advanced Practice", tasks: [
    "Attempt Subject Tests for weak areas",
    "Reasoning speed drills (Series, Coding-Decoding)",
    "Revise GK & Current Affairs weekly"
  ]},
  { range: "Week 10–11", phase: "Mock Tests", tasks: [
    "2 Full Mock Tests under timed conditions",
    "Detailed question-wise review after each mock",
    "Target weakest topic from Progress dashboard"
  ]},
  { range: "Week 12", phase: "Final Revision", tasks: [
    "Revise formula sheets & important questions only",
    "Light daily practice, avoid new topics",
    "Rest well before exam day"
  ]}
];

/* ------------------------------------------------------------------
   8. LEADERBOARD — DEMO DATA
   Clearly structured so it can be swapped for a live Google Sheet /
   Apps Script feed exactly like netarhat.html's fetchLeaderboard().
   Replace RKMS_LEADERBOARD_DEMO usage in rkms-common.js with a fetch
   once you publish a CSV — the render function already accepts the
   same shape: { name, tests, avg, best }.
------------------------------------------------------------------ */
const RKMS_LEADERBOARD_DEMO = [
  { name: "Aakash R.", tests: 24, avg: 88, best: 97 },
  { name: "Priya S.", tests: 19, avg: 85, best: 94 },
  { name: "Rohit K.", tests: 22, avg: 81, best: 92 },
  { name: "Simran D.", tests: 15, avg: 78, best: 90 },
  { name: "Aman T.", tests: 18, avg: 76, best: 89 }
];
