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
    wake: null,

    init() {
      this.$watch("variant", () => {
        if (this.pos > this.total - 1) this.pos = Math.max(0, this.total - 1);
      });
      this._onVis = () => {
        if (this.focus && document.visibilityState === "visible") this.lock();
      };
      document.addEventListener("visibilitychange", this._onVis);
    },
    destroy() {
      document.removeEventListener("visibilitychange", this._onVis);
      this.release();
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
      await this.lock();
    },
    exitFocus() {
      this.focus = false;
      document.body.style.overflow = "";
      this.release();
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
    get display() {
      return this.running || this.remaining !== this.total ? clock(this.remaining) : humanDuration(dur);
    },
    toggle() {
      if (this.remaining <= 0) {
        this.remaining = this.total;
        return;
      }
      this.running ? this.pause() : this.start();
    },
    start() {
      this.running = true;
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
      this.running = false;
      if (this.iv) clearInterval(this.iv);
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
