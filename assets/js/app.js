// Alpine components for Cook. Registered on alpine:init so load order with the
// Alpine CDN bundle does not matter. Runtime JS is intentionally tiny: the pages
// render fully static from Hugo, Alpine only adds serving scaling, variant
// switching, the guided focus mode, and timers.

function parseDuration(str) {
  // "10m", "1h30m", "90s" -> seconds
  let s = 0;
  const m = String(str).match(/(\d+)\s*h/);
  const mm = String(str).match(/(\d+)\s*m(?!s)/);
  const ss = String(str).match(/(\d+)\s*s/);
  if (m) s += parseInt(m[1], 10) * 3600;
  if (mm) s += parseInt(mm[1], 10) * 60;
  if (ss) s += parseInt(ss[1], 10);
  return s;
}

function humanDuration(str) {
  const total = parseDuration(str);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const parts = [];
  if (h) parts.push(h + "h");
  if (m) parts.push(m + "m");
  if (s) parts.push(s + "s");
  return parts.join(" ") || "0s";
}

function clock(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m + ":" + String(s).padStart(2, "0");
}

function formatAmount(n) {
  if (!isFinite(n)) return "";
  const r = Math.round(n * 100) / 100;
  return String(r);
}

// --- US unit conversion ---
const FRACTIONS = [[0.125,"⅛"],[0.25,"¼"],[0.333,"⅓"],[0.5,"½"],[0.667,"⅔"],[0.75,"¾"]];

function formatUS(n) {
  if (!isFinite(n) || n <= 0) return "";
  const whole = Math.floor(n);
  const frac = n - whole;
  // Snap to nearest fraction if within 5%
  for (const [val, glyph] of FRACTIONS) {
    if (Math.abs(frac - val) < 0.05) {
      return whole ? whole + " " + glyph : glyph;
    }
  }
  if (frac < 0.03) return String(whole || "");
  // No fraction match: show rounded decimal
  return String(Math.round(n * 100) / 100);
}

function usLabel(labels, unit, amount) {
  if ((unit === "cup" || unit === "qt") && amount > 1.05) {
    return labels?.[unit === "cup" ? "cups" : "qts"] ?? unit;
  }
  return labels?.[unit] ?? unit;
}

function usVolume(ml, labels) {
  const tsp = Math.round((ml / 4.929) * 4) / 4;
  const units = [
    ["gal", 768],
    ["qt", 192],
    ["cup", 48],
  ];
  const head = units.find(([, size]) => tsp >= size) || (tsp >= 3 ? ["tbsp", 3] : ["tsp", 1]);
  const [unit, size] = head;
  const amount = tsp / size;
  const whole = Math.floor(amount);
  const frac = amount - whole;
  const snapped = FRACTIONS.find(([value]) => Math.abs(frac - value) < 0.05);
  const label = usLabel(labels, unit, amount);

  if (snapped || frac < 0.03) return formatUS(amount) + " " + label;

  const lower = { gal: ["qt", 48], qt: ["cup", 12], cup: ["tbsp", 3], tbsp: ["tsp", 1] }[unit];
  const remainderTsp = tsp - whole * size;
  if (!lower) return formatUS(amount) + " " + label;

  let [lowerUnit, lowerSize] = lower;
  let lowerAmount = remainderTsp / lowerSize;
  if (lowerUnit === "cup" || lowerUnit === "qt") {
    const lowerFraction = lowerAmount - Math.floor(lowerAmount);
    if (lowerFraction >= 0.03 && !FRACTIONS.some(([value]) => Math.abs(lowerFraction - value) < 0.05)) {
      lowerUnit = "tbsp";
      lowerSize = 3;
      lowerAmount = remainderTsp / lowerSize;
      lowerAmount = Math.round(lowerAmount * 2) / 2;
    }
  } else {
    lowerAmount = Math.round(lowerAmount * 2) / 2;
  }
  if (lowerAmount < 0.5) return formatUS(amount) + " " + label;
  return whole + " " + label + " + " + formatUS(lowerAmount) + " " + usLabel(labels, lowerUnit, lowerAmount);
}

function convertUS(amount, rawUnit, density, labels) {
  // Normalize: recipes may use "L" for liters
  const unit = rawUnit ? rawUnit.toLowerCase() : "";
  // Volume: ml/l → cups/tbsp/tsp
  let ml = unit === "ml" ? amount : unit === "l" ? amount * 1000 : null;
  // Weight with density: g/kg → virtual ml via density, then to cups/tbsp/tsp
  if (ml === null && (unit === "g" || unit === "kg") && density) {
    ml = (unit === "kg" ? amount * 1000 : amount) / density * 236.588;
  }
  if (ml !== null) {
    return usVolume(ml, labels);
  }
  // Weight without density: g/kg → oz/lb
  if (unit === "kg" || unit === "g") {
    const g = unit === "kg" ? amount * 1000 : amount;
    if (g >= 454) {
      const ounces = Math.round(((g % 453.59) / 28.35) * 2) / 2;
      const pounds = Math.floor(g / 453.59) + (ounces >= 16 ? 1 : 0);
      const remainder = ounces >= 16 ? 0 : ounces;
      return remainder ? [pounds, "lb", remainder] : [pounds, "lb"];
    }
    return [Math.round((g / 28.35) * 4) / 4, "oz"];
  }
  return null; // non-metric units pass through unchanged
}

function chime() {
  // Soft two-tone (E6 -> A6) chime, repeated 3x, instead of a harsh single beep.
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [1318.51, 1760.0]; // E6, A6
    const noteDur = 0.18;
    for (let rep = 0; rep < 3; rep++) {
      const start = ac.currentTime + rep * 0.5;
      notes.forEach((freq, i) => {
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.type = "sine";
        o.frequency.value = freq;
        const t0 = start + i * noteDur;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(0.3, t0 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + noteDur);
        o.connect(g);
        g.connect(ac.destination);
        o.start(t0);
        o.stop(t0 + noteDur);
      });
    }
    setTimeout(() => ac.close(), 1600);
  } catch (e) {}
  if (navigator.vibrate) navigator.vibrate(400);
}

// Request notification permission lazily on first timer start.
// Fire a notification when a timer expires so the user is alerted
// even if they switched tabs/apps (works on desktop and Android).
function notifyTimerDone(label, emoji) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  try {
    new Notification(emoji + " Timer done", { body: label, tag: "cook-timer-" + label, renotify: true });
  } catch (e) {}
}

function ensureNotificationPermission() {
  if (!("Notification" in window) || Notification.permission !== "default") return;
  Notification.requestPermission();
}

const wake = {
  count: 0,
  sentinel: null,
  requesting: null,

  async acquire() {
    this.count++;
    if (this.count === 1) await this.request();
  },

  release() {
    this.count = Math.max(0, this.count - 1);
    if (!this.count && this.sentinel) {
      this.sentinel.release();
      this.sentinel = null;
    }
  },

  async request() {
    try {
      if (this.sentinel?.released) this.sentinel = null;
      if (!this.count || this.sentinel || this.requesting || !("wakeLock" in navigator)) return;
      this.requesting = navigator.wakeLock.request("screen");
      const sentinel = await this.requesting;
      if (!this.count) {
        sentinel.release();
        return;
      }
      this.sentinel = sentinel;
      sentinel.addEventListener("release", () => {
        if (this.sentinel === sentinel) this.sentinel = null;
      });
    } catch (e) {}
    finally {
      this.requesting = null;
    }
  },
};

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    wake.request();
    // Force-recalculate running timers so display updates instantly on wake.
    try {
      const store = window.Alpine?.store("timers");
      if (store) {
        store.list.forEach((t) => {
          if (t.running && t.resumedAt) {
            const elapsed = Math.floor((Date.now() - t.resumedAt) / 1000);
            t.remaining = Math.max(0, t.snap - elapsed);
            if (t.remaining <= 0) {
              t.remaining = 0;
              store.pause(t);
              t.done = true;
              chime();
              notifyTimerDone(t.label, t.emoji);
            }
          }
        });
      }
    } catch (e) {}
  }
});

document.addEventListener("alpine:init", () => {
  const Alpine = window.Alpine;

  Alpine.data("themeToggle", () => ({
    toggle() {
      const root = document.documentElement;
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    },
  }));

  Alpine.data("recipe", (cfg = {}) => ({
    variant: cfg.defaultVariant || "",
    baseServings: cfg.servings || 1,
    servings: cfg.servings || 1,
    scalable: cfg.scalable !== false,
    stepVariants: cfg.steps || [],
    stepsHasPanel: cfg.stepsHasPanel || [],
    focus: false,
    pos: 0,
    units: localStorage.getItem("units") || "metric",

    init() {
      this.$watch("variant", () => {
        if (this.pos > this.total - 1) this.pos = Math.max(0, this.total - 1);
      });
    },
    destroy() {
      wake.release();
    },

    // --- scaling ---
    get factor() {
      return this.scalable && this.baseServings ? this.servings / this.baseServings : 1;
    },
    fmt(base) {
      return formatAmount((parseFloat(base) || 0) * this.factor);
    },
    inc() {
      this.servings = Math.round((this.servings + 1) * 100) / 100;
    },
    dec() {
      this.servings = Math.max(1, Math.round((this.servings - 1) * 100) / 100);
    },
    toggleUnits() {
      this.units = this.units === "us" ? "metric" : "us";
      try { localStorage.setItem("units", this.units); } catch (e) {}
    },
    amt(base, unit, iid) {
      const n = (parseFloat(base) || 0) * this.factor;
      if (this.units === "us") {
        const c = convertUS(n, unit, cfg.densities?.[iid], cfg.unitLabels);
        if (c) {
          if (typeof c === "string") return c;
          const label = usLabel(cfg.unitLabels, c[1], c[0]);
          const amount = c[2] ? formatUS(c[0]) + " " + label + " " + formatUS(c[2]) + " " + (cfg.unitLabels?.oz ?? "oz") : formatUS(c[0]) + " " + label;
          return amount;
        }
      }
      const lk = unit ? unit.toLowerCase() : "";
      if (lk === "g" && n >= 1000) {
        return formatAmount(n / 1000) + " " + (cfg.unitLabels?.["kg"] ?? "kg");
      }
      if (lk === "ml" && n >= 1000) {
        return formatAmount(n / 1000) + " " + (cfg.unitLabels?.["l"] ?? "l");
      }
      return formatAmount(n) + (lk ? " " + (cfg.unitLabels?.[lk] ?? unit) : "");
    },

    // --- variants ---
    showVar(only) {
      if (!only) return true;
      const list = Array.isArray(only) ? only : String(only).split(/\s+/).filter(Boolean);
      return list.length === 0 || list.includes(this.variant);
    },

    // --- focus mode ---
    get visibleSteps() {
      return this.stepVariants
        .map((only, i) => ({ only, i }))
        .filter((s) => this.showVar(s.only))
        .map((s) => s.i);
    },
    get current() {
      return this.visibleSteps[this.pos];
    },
    get total() {
      return this.visibleSteps.length;
    },
    get hasPanel() {
      return !!this.stepsHasPanel[this.current];
    },
    get progress() {
      return this.total ? Math.round(((this.pos + 1) / this.total) * 100) : 0;
    },
    isCurrent(i) {
      return this.focus && this.current === i;
    },
    async enterFocus() {
      this.pos = 0;
      this.focus = true;
      document.body.style.overflow = "hidden";
      await wake.acquire();
    },
    exitFocus() {
      this.focus = false;
      document.body.style.overflow = "";
      wake.release();
    },
    next() {
      if (this.pos < this.total - 1) this.pos++;
    },
    prev() {
      if (this.pos > 0) this.pos--;
    },
    onKey(e) {
      if (!this.focus) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        this.next();
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        this.prev();
      } else if (e.key === "Escape") {
        this.exitFocus();
      }
    },
    sx: 0, sy: 0,
    onTouchStart(e) {
      this.sx = e.changedTouches[0].clientX;
      this.sy = e.changedTouches[0].clientY;
    },
    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.sx;
      const dy = e.changedTouches[0].clientY - this.sy;
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      dx < 0 ? this.next() : this.prev();
    },
    async lock() {
      try {
        if ("wakeLock" in navigator) this.wake = await navigator.wakeLock.request("screen");
      } catch (e) {}
    },
    release() {
      try {
        if (this.wake) {
          this.wake.release();
          this.wake = null;
        }
      } catch (e) {}
    },
  }));

  // Global timer store: timers survive step navigation (the persistent bar in
  // focus mode reads $store.timers.list) and exiting focus mode does not stop
  // them, since the store lives outside the per-step markup.
  Alpine.store("timers", {
    list: [],

    find(id) {
      return this.list.find((t) => t.id === id);
    },

    // Re-tap of a running timer pauses it, tap of a paused one resumes it,
    // a double-tap (within 350ms) resets it, and a brand-new id is created
    // and started.
    start(id, label, emoji, dur) {
      if (!this.find(id)) {
        this.list.push({ id, label, emoji, dur, total: parseDuration(dur), remaining: parseDuration(dur), running: false, done: false, iv: null, lastTap: 0, resumedAt: 0, snap: 0 });
      }
      // Re-fetch (rather than reuse the object above) so `t` is the reactive
      // element Alpine tracks; mutating a freshly-created raw object directly
      // updates the data but never notifies Alpine to re-render the countdown.
      const t = this.find(id);
      const now = Date.now();
      if (now - t.lastTap < 350) {
        // Double-tap resets: drop it from the shared bar entirely rather than
        // leaving a stale idle chip behind. Tapping the same button again
        // starts a brand-new timer.
        this.dismiss(id);
        return;
      }
      t.lastTap = now;
      if (t.done) {
        this.reset(t);
      } else if (t.running) {
        this.pause(t);
      } else {
        this.resume(t);
      }
    },
    resume(t) {
      ensureNotificationPermission();
      if (t.running) return;
      t.resumedAt = Date.now();
      t.snap = t.remaining;
      t.running = true;
      wake.acquire();
      t.iv = setInterval(() => {
        const elapsed = Math.floor((Date.now() - t.resumedAt) / 1000);
        t.remaining = Math.max(0, t.snap - elapsed);
        if (t.remaining <= 0) {
          t.remaining = 0;
          this.pause(t);
          t.done = true;
          chime();
          notifyTimerDone(t.label, t.emoji);
        }
      }, 1000);
    },
    pause(t) {
      if (t.iv) clearInterval(t.iv);
      t.iv = null;
      const wasRunning = t.running;
      t.running = false;
      if (wasRunning) wake.release();
    },
    reset(t) {
      this.pause(t);
      t.remaining = t.total;
      t.snap = t.total;
      t.done = false;
    },
    dismiss(id) {
      const t = this.find(id);
      if (t) this.pause(t);
      this.list = this.list.filter((x) => x.id !== id);
    },
    display(t) {
      return t.running || t.remaining !== t.total ? clock(t.remaining) : humanDuration(t.dur);
    },
    // idle (never started / reset) = gray, running = green, paused = yellow, done = pulsing red.
    // Returns a state string rather than Tailwind classes directly, so the class
    // names stay as literal strings in the templates for Tailwind's content scan.
    state(t) {
      if (!t) return "idle";
      if (t.done) return "done";
      if (t.running) return "running";
      return t.remaining !== t.total ? "paused" : "idle";
    },
  });

  Alpine.data("recipeList", (hints = []) => ({
    q: "",
    open: false,
    sel: 0,
    hints: hints,
    get suggestions() {
      if (!this.q) return [];
      const q = this.q.toLowerCase();
      return this.hints.filter((h) => h.l.includes(q)).slice(0, 8);
    },
    pick() {
      if (this.suggestions.length) {
        this.q = this.suggestions[this.sel]?.l || this.suggestions[0].l;
        this.open = false;
      }
    },
    cap(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
    match(el) {
      if (!this.q) return true;
      return (el.dataset.search || "").includes(this.q.toLowerCase());
    },
  }));
});
