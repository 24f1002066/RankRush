/* ═══════════════════════════════════════════════════════════════
   RKMS DEOGHAR PORTAL — SHARED BEHAVIOUR
   Include this AFTER rkms-data.js on every /rkms/*.html page.
   ═══════════════════════════════════════════════════════════════ */

let REDUCED_MOTION = false;
try {
  REDUCED_MOTION = typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
} catch (e) { /* matchMedia unsupported — default to animations on */ }

/* ------------------------------------------------------------------
   NAV — hamburger + scrolled state (same behaviour as rest of site)
------------------------------------------------------------------ */
function rkInitNav() {
  const nav = document.getElementById('rr-nav');
  const hamburger = document.getElementById('rr-hamburger');
  const mobileMenu = document.getElementById('rr-mobile-menu');

  window.addEventListener('scroll', () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }
}

/* ------------------------------------------------------------------
   SCROLL REVEAL — add class "rk-reveal" to any element
------------------------------------------------------------------ */
function rkInitScrollReveal() {
  const items = document.querySelectorAll('.rk-reveal');
  if (!items.length) return;
  if (REDUCED_MOTION || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}

/* ------------------------------------------------------------------
   COUNT-UP — animate a number from 0 to data-count
------------------------------------------------------------------ */
function rkInitCountUp() {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (REDUCED_MOTION) { el.textContent = target; return; }
    let start = 0;
    const dur = 900;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    nums.forEach(el => io.observe(el));
  } else {
    nums.forEach(animate);
  }
}

/* ------------------------------------------------------------------
   LOCAL PROGRESS TRACKING (no login system exists yet on RankRush,
   so progress is stored per-device in localStorage under a single
   namespaced key. Structure is deliberately close to what a future
   backend/user-account API would return, so swapping this out later
   is a drop-in replacement rather than a redesign.)
------------------------------------------------------------------ */
const RKMS_PROGRESS_KEY = 'rkmsProgressV1';

function rkGetProgress() {
  try {
    const raw = localStorage.getItem(RKMS_PROGRESS_KEY);
    if (!raw) return rkDefaultProgress();
    const parsed = JSON.parse(raw);
    return Object.assign(rkDefaultProgress(), parsed);
  } catch (e) {
    return rkDefaultProgress();
  }
}

function rkDefaultProgress() {
  const subjects = {};
  RKMS_SUBJECTS.forEach(s => { subjects[s.id] = { attempted: 0, totalScorePct: 0 }; });
  return {
    testsAttempted: 0,
    totalScorePct: 0,
    highestScorePct: 0,
    questionsSolved: 0,
    correct: 0,
    streak: 0,
    lastAttemptDate: null,
    subjects,
    history: [] // { date, setKey, subject, scorePct, correct, wrong, skipped, timeSec }
  };
}

function rkSaveProgress(p) {
  try { localStorage.setItem(RKMS_PROGRESS_KEY, JSON.stringify(p)); } catch (e) { /* storage unavailable */ }
}

/* Call this from the test engine after a submission */
function rkRecordTestResult({ setKey, subject, scorePct, correct, wrong, skipped, timeSec }) {
  const p = rkGetProgress();
  const today = new Date().toISOString().slice(0, 10);

  p.testsAttempted += 1;
  p.questionsSolved += (correct + wrong + skipped);
  p.correct += correct;
  p.totalScorePct = Math.round(((p.totalScorePct * (p.testsAttempted - 1)) + scorePct) / p.testsAttempted);
  p.highestScorePct = Math.max(p.highestScorePct, scorePct);

  if (subject && p.subjects[subject]) {
    const s = p.subjects[subject];
    const prevTotal = s.totalScorePct * s.attempted;
    s.attempted += 1;
    s.totalScorePct = Math.round((prevTotal + scorePct) / s.attempted);
  }

  // Streak: increments once per calendar day, resets if a day is skipped
  if (p.lastAttemptDate) {
    const prev = new Date(p.lastAttemptDate);
    const now = new Date(today);
    const diffDays = Math.round((now - prev) / 86400000);
    if (diffDays === 1) p.streak += 1;
    else if (diffDays > 1) p.streak = 1;
    // diffDays === 0 → same day, streak unchanged
  } else {
    p.streak = 1;
  }
  p.lastAttemptDate = today;

  p.history.unshift({ date: today, setKey, subject, scorePct, correct, wrong, skipped, timeSec });
  p.history = p.history.slice(0, 50);

  rkSaveProgress(p);
  return p;
}

function rkResetProgress() {
  localStorage.removeItem(RKMS_PROGRESS_KEY);
}

/* ------------------------------------------------------------------
   RENDER: Subject cards (used on index.html)
------------------------------------------------------------------ */
function rkRenderSubjectCards(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const progress = rkGetProgress();

  el.innerHTML = RKMS_SUBJECTS.map(s => {
    const livePct = progress.subjects[s.id] ? progress.subjects[s.id].totalScorePct : 0;
    const pct = livePct || s.progress || 0;
    const topicChips = s.topics.slice(0, 4).map(t => `<span class="rk-topic-chip">${t}</span>`).join('');
    return `
    <div class="rk-subject-card rk-reveal">
      <div class="rk-subject-top">
        <div class="rk-subject-name">${s.name}</div>
        <div class="rk-subject-icon" style="background:${s.color}22;color:${s.color};">
          <i class="fas ${s.icon}"></i>
        </div>
      </div>
      <div>
        <div class="rk-progress-row"><span>Progress</span><span>${pct}%</span></div>
        <div class="rk-progress-track"><div class="rk-progress-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="rk-subject-stats">
        <span><b>${s.topics.length}</b> Topics</span>
        <span><b>${s.testsCount}</b> Tests</span>
        <span><b>${s.notesCount}</b> Notes</span>
      </div>
      <div class="rk-subject-topics">${topicChips}</div>
      <a class="btn-ghost btn-sm" href="tests.html?subject=${s.id}">Continue <i class="fas fa-arrow-right"></i></a>
    </div>`;
  }).join('');

  rkInitScrollReveal();
}

/* ------------------------------------------------------------------
   RENDER: Tip of the day (random tip, rotates every 12s)
------------------------------------------------------------------ */
function rkInitTipOfDay(containerId) {
  const el = document.getElementById(containerId);
  if (!el || !RKMS_TIPS.length) return;
  let idx = Math.floor(Math.random() * RKMS_TIPS.length);

  const paint = () => {
    const tip = RKMS_TIPS[idx];
    el.innerHTML = `
      <div class="rk-tip-icon">${tip.icon}</div>
      <div>
        <div class="rk-tip-label">RKMS Preparation Tip</div>
        <div class="rk-tip-text">"${tip.text}"</div>
      </div>`;
  };
  paint();
  if (!REDUCED_MOTION) {
    setInterval(() => { idx = (idx + 1) % RKMS_TIPS.length; paint(); }, 12000);
  }
}

/* ------------------------------------------------------------------
   RENDER: Updates / notices
------------------------------------------------------------------ */
function rkRenderUpdates(containerId, limit) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const items = limit ? RKMS_UPDATES.slice(0, limit) : RKMS_UPDATES;
  el.innerHTML = items.map(u => {
    const style = RKMS_UPDATE_CAT_STYLE[u.category] || { bg: 'rgba(255,255,255,0.06)', color: '#94a3b8', label: u.category };
    const dateStr = new Date(u.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    return `
    <div class="rk-update-card rk-reveal">
      <div class="rk-update-top">
        <span class="rk-update-cat" style="background:${style.bg};color:${style.color};">${style.label}</span>
        <span class="rk-update-date">${dateStr}</span>
      </div>
      <div class="rk-update-title">${u.title}</div>
      <div class="rk-update-desc">${u.desc}</div>
    </div>`;
  }).join('');
  rkInitScrollReveal();
}

/* ------------------------------------------------------------------
   RENDER: Roadmap timeline (click a week to expand tasks)
------------------------------------------------------------------ */
function rkRenderRoadmap(listId, detailId) {
  const listEl = document.getElementById(listId);
  const detailEl = document.getElementById(detailId);
  if (!listEl || !detailEl) return;

  listEl.innerHTML = RKMS_ROADMAP.map((w, i) => `
    <div class="rk-week-card rk-reveal" data-idx="${i}">
      <div class="rk-week-range">${w.range}</div>
      <div class="rk-week-phase">${w.phase}</div>
      <div style="font-size:0.78rem;color:var(--text-2);">${w.tasks.length} tasks</div>
    </div>`).join('');

  const showWeek = (idx) => {
    const w = RKMS_ROADMAP[idx];
    detailEl.classList.add('show');
    detailEl.innerHTML = `
      <div class="rk-week-range">${w.range}</div>
      <div class="rk-week-phase" style="font-size:1.2rem;">${w.phase}</div>
      <ul>${w.tasks.map(t => `<li><i class="fas fa-check-circle"></i>${t}</li>`).join('')}</ul>`;
    listEl.querySelectorAll('.rk-week-card').forEach(c => c.classList.remove('active'));
    listEl.querySelector(`[data-idx="${idx}"]`).classList.add('active');
  };

  listEl.querySelectorAll('.rk-week-card').forEach(card => {
    card.addEventListener('click', () => showWeek(parseInt(card.dataset.idx, 10)));
  });

  showWeek(0);
  rkInitScrollReveal();
}

/* ------------------------------------------------------------------
   RENDER: Gallery grid with lightbox (keyboard + swipe supported)
------------------------------------------------------------------ */
function rkInitGallery(gridId, tabsId, lightboxId) {
  const grid = document.getElementById(gridId);
  const tabsEl = document.getElementById(tabsId);
  const lightbox = document.getElementById(lightboxId);
  if (!grid) return;

  let activeCategory = 'all';
  let currentIndex = 0;
  let visibleItems = [];

  function filteredItems() {
    return activeCategory === 'all' ? RKMS_GALLERY : RKMS_GALLERY.filter(g => g.category === activeCategory);
  }

  function renderGrid() {
    visibleItems = filteredItems();
    grid.innerHTML = visibleItems.map((g, i) => `
      <div class="rk-gallery-item rk-reveal" data-idx="${i}" tabindex="0" role="button" aria-label="Open ${g.caption} photo">
        <img src="${g.src}" alt="${g.alt}" loading="lazy">
        <div class="rk-gallery-caption">${g.caption}</div>
      </div>`).join('');

    grid.querySelectorAll('.rk-gallery-item').forEach(item => {
      item.addEventListener('click', () => openLightbox(parseInt(item.dataset.idx, 10)));
      item.addEventListener('keypress', (e) => { if (e.key === 'Enter') openLightbox(parseInt(item.dataset.idx, 10)); });
    });
    rkInitScrollReveal();
  }

  function renderTabs() {
    if (!tabsEl) return;
    tabsEl.innerHTML = RKMS_GALLERY_CATEGORIES.map(c =>
      `<button class="rk-tab-btn ${c.id === activeCategory ? 'active' : ''}" data-cat="${c.id}">${c.label}</button>`
    ).join('');
    tabsEl.querySelectorAll('.rk-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        tabsEl.querySelectorAll('.rk-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGrid();
      });
    });
  }

  function openLightbox(idx) {
    if (!lightbox) return;
    currentIndex = idx;
    paintLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function paintLightbox() {
    const item = visibleItems[currentIndex];
    if (!item) return;
    const img = lightbox.querySelector('.rk-lightbox-img');
    const cap = lightbox.querySelector('.rk-lightbox-cap');
    img.src = item.src;
    img.alt = item.alt;
    cap.textContent = item.caption;
  }
  function step(delta) {
    currentIndex = (currentIndex + delta + visibleItems.length) % visibleItems.length;
    paintLightbox();
  }

  if (lightbox) {
    lightbox.querySelector('.rk-lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.rk-lightbox-prev').addEventListener('click', () => step(-1));
    lightbox.querySelector('.rk-lightbox-next').addEventListener('click', () => step(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });

    // Basic touch-swipe support
    let touchStartX = null;
    lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) step(dx > 0 ? -1 : 1);
      touchStartX = null;
    }, { passive: true });
  }

  renderTabs();
  renderGrid();
}

/* ------------------------------------------------------------------
   RENDER: Leaderboard (demo data, structured for a live-feed swap)
------------------------------------------------------------------ */
function rkRenderLeaderboard(bodyId, rows) {
  const el = document.getElementById(bodyId);
  if (!el) return;
  const data = rows || RKMS_LEADERBOARD_DEMO;
  const medals = ['🥇', '🥈', '🥉'];
  el.innerHTML = data.map((r, i) => `
    <tr>
      <td><span class="rk-rank-medal">${medals[i] || (i + 1)}</span></td>
      <td>${r.name}</td>
      <td>${r.tests}</td>
      <td>${r.avg}%</td>
      <td>${r.best}%</td>
    </tr>`).join('');
}

/* Auto-init the pieces present on every page */
document.addEventListener('DOMContentLoaded', () => {
  rkInitNav();
  rkInitScrollReveal();
  rkInitCountUp();
});
