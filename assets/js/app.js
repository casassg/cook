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
  if (document.visibilityState === "visible") wake.request();
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
    focus: false,
    pos: 0,

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

  Alpine.data("timer", (dur) => ({
    total: parseDuration(dur),
    remaining: parseDuration(dur),
    running: false,
    iv: null,
    lastTap: 0,
    get display() {
      return this.running || this.remaining !== this.total ? clock(this.remaining) : humanDuration(dur);
    },
    tap() {
      const now = Date.now();
      if (now - this.lastTap < 350) {
        this.pause();
        this.remaining = this.total;
        this.lastTap = 0;
        return;
      }
      this.lastTap = now;
      this.toggle();
    },
    toggle() {
      if (this.remaining <= 0) {
        this.remaining = this.total;
        return;
      }
      this.running ? this.pause() : this.start();
    },
    start() {
      if (this.running) return;
      this.running = true;
      wake.acquire();
      this.iv = setInterval(() => {
        this.remaining--;
        if (this.remaining <= 0) {
          this.remaining = 0;
          this.pause();
          this.ring();
        }
      }, 1000);
    },
    pause() {
      if (this.iv) clearInterval(this.iv);
      this.iv = null;
      const wasRunning = this.running;
      this.running = false;
      if (wasRunning) wake.release();
    },
    ring() {
      try {
        const ac = new (window.AudioContext || window.webkitAudioContext)();
        const o = ac.createOscillator();
        o.connect(ac.destination);
        o.frequency.value = 880;
        o.start();
        setTimeout(() => {
          o.stop();
          ac.close();
        }, 500);
      } catch (e) {}
      if (navigator.vibrate) navigator.vibrate(400);
    },
  }));

  Alpine.data("recipeList", (hints = []) => ({
    q: "",
    open: false,
    hints: hints,
    get suggestions() {
      if (!this.q) return [];
      const q = this.q.toLowerCase();
      return this.hints.filter((h) => h.l.includes(q)).slice(0, 8);
    },
    match(el) {
      if (!this.q) return true;
      return (el.dataset.search || "").includes(this.q.toLowerCase());
    },
  }));
});
