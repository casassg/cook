# AGENTS.md

Guidance for agents working on Cook, a Hugo recipe book at [cook.gerard.space](https://cook.gerard.space/).

## Stack

- **Hugo** 0.152.2 (extended), **Tailwind CSS** v4.3.3, **Alpine.js** 3.14 (CDN). Pinned via Hermit in `bin/`.
- Tailwind is compiled by Hugo through `css.TailwindCSS`, which invokes the pinned `bin/tailwindcss` found on PATH. **Do not upgrade Hugo past 0.160**: 0.161+ drops standalone-binary support and would require the npm `@tailwindcss/cli`. `assets/css/main.css` uses `@source "../../layouts"` and `@source "../../content"` for class scanning.
- Runtime JS is intentionally tiny: Alpine only powers serving scaling, variant switching, the guided focus mode, timers, and the ingredient/tool popovers. Pages render fully static and work without JS. No htmx, no build step beyond Hugo.

## Commands

- `./dev.sh` or `hugo server` (after `. ./bin/activate-hermit`).
- `hugo --gc --minify` is the production build and the only build verification. Always run it after changes.
- `./bin/uv run scripts/validate_recipes.py` validates recipes. Runs in CI (`.github/workflows/hugo-pages.yml`) before build+deploy.

## Recipe model

One leaf bundle per recipe under `content/recipes/<slug>/`, one file per language: `index.md` (required, canonical English) + optional `index.ca.md`, `index.es.md`. Hugo links translations by path, no `translationKey` needed. Missing translations fall back to English on listings.

- **`index.md`** holds ALL structure and name translations. Front matter: `title`, `description`, `image`, `categories`, `portion` (`{type: servings|units|area, value, unit}`), optional `author`, `defaultVariant`, `variants` (`[{key, name}]`), `tools` (`[{id, icon?, name, note?}]`), and `ingredients` (`[{id, emoji?, amount, unit, item, note?, group?, onlyForVariation?}]`). The text fields `item`, `note`, tool `name`, tool `note`, `group`, and variant `name` are either a plain string or an `{en, ca, es}` map (English required, others fall back to it). Notes are Markdown and may contain links. Ingredient groups render as section headers in first-encounter order; ungrouped ingredients are headerless. The `icon` on a tool defaults to `🔧`.
- **Translation files** (`index.ca.md`, `index.es.md`) carry ONLY `title`, `description`, and the translated steps body. They must NOT repeat structure.
- **Steps** live in the body as a numbered list, one step per line. Inline refs use link syntax:
  - `[label](i:<ingredientId>)` scaled ingredient highlight (amount pulled from the English structure).
  - `[label](tool:<toolId>)` tool reference.
  - `[label](t:<dur>)` **non-interactive** duration label (`10m`, `1h30m`, `90s`); the tappable countdown lives only in the focus-mode panel, never inline.
  - `[label](/recipes/<slug>)` crosslink to another recipe, resolved at build time via Hugo's `.GetPage` (language-aware, fails the build if the slug is invalid). Renders as a navigating link, not a popover.
  - Trailing `{variant: <key>}` scopes the whole step to a variant. Ingredient-level `onlyForVariation` scopes chips automatically.
- Ingredient emoji resolution: if the ingredient has an `emoji` field, that unicode character is used directly. Otherwise Hugo's `emojify ":<id>:"` auto-resolves the id (works for gemoji names like `tomato`, `garlic`, `salt`). Every ingredient MUST resolve to an emoji through one of these paths (validated).
- `schema/recipe.schema.json` is the contract; the validator also checks ref ids, timer format, variant keys, ingredient emoji resolution, and cross-language step parity (same step count and ref ids, only prose differs).

### Authoring rules (for agents writing/editing recipes)

- Timers ONLY for passive waits (simmer, bake, rest, chill, proof) of roughly 1 minute or more. Never add a timer for active work (chopping, mixing, blending) or for "until done" judgement calls — describe those in prose instead.
- One action per step. Split steps that mix prep + cook, or that chain two unrelated actions; each step should read as a single imperative sentence.
- Ingredient ids MUST resolve to an emoji: prefer picking an id that is itself a gemoji name (e.g. use id `fish` for swordfish, not `swordfish`). When two distinct ingredients in the same recipe would otherwise share a gemoji name, keep the ids unique and descriptive and set each ingredient's `emoji` field to the shared gemoji key (e.g. two fish ingredients get ids `swordfish`/`cod`, both with `emoji: fish`). For ids that don't auto-resolve (e.g. `olive_oil`, `brown_sugar`), set `emoji` to the actual unicode character (e.g. `emoji: "🫒"`).

## Rendering internals

- `layouts/_default/_markup/render-link.html` turns `i:`/`tool:` into hover/click **popovers** (emoji + live-scaled amount + Markdown-rendered note, or the tool name + note) and `t:` into a plain duration label, reading id indexes built in `layouts/recipes/single.html` and stored on `.Store`. Popovers open on click on the page but on hover only in focus mode; this is gated on `recipe().focus` because the same step HTML renders in both the static list and the overlay. Non-prefixed destinations are resolved via `.GetPage` first (language-aware internal links with build-time validation), falling back to a raw `<a>` for external URLs.
- `single.html` resolves the English source page via `.AllTranslations`, localizes names with `partials/localize.html`, parses steps from `.RawContent` (ingredient refs + per-step timer durations), and renders them through `.RenderString` (so the hook fires) for both the static list and the focus overlay. Ingredient emoji is resolved inline: direct `emoji` field wins, else Hugo `emojify` on the id. Timer emoji is always ⏳. The focus panel (left on desktop, bottom on mobile) shows the current step's timers + ingredients.
- Scaling is DOM-driven: scalable numbers carry `data-base` and Alpine's `recipe()` multiplies by `servings/baseServings`. Variant scoping uses `data-only` + `x-show="showVar(...)"`.
- `partials/recipe-jsonld.html` emits schema.org/Recipe (`jsonify | safeJS`, since a `<script>` context re-escapes a bare string). Home also outputs `/index.json` (`layouts/index.json`).

## Styling

- Palette lives as CSS variables in `assets/css/main.css` and flips under `[data-theme="dark"]`; `assets/js/theme-init.js` sets the attribute pre-paint (stored choice or system preference). They are exposed via `@theme inline` as semantic Tailwind utilities: `bg-bg`, `bg-surface`, `text-body`, `text-heading`, `text-muted`, `border-line`, and `text-/bg-accent` (+ `accent-hover`). Use these, they auto-flip, so do NOT add `dark:` color variants or hardcode colors. Opacity modifiers (`bg-accent/10`) work.
- Font is Roboto (Google Fonts in `partials/head.html`); body weight 300, headings 600. Aesthetic mirrors casassg/blog.

## Conventions

- UI strings and unit/category labels live in `i18n/{en,ca,es}.yaml` (keys `unit_*`, `cat_*`). Recipe content lives in content files.
- Keep changes minimal and static-first. Verify with `hugo --gc --minify` and the validator before committing.
- Deploy: push to `main`, GitHub Actions builds and deploys to Pages. `static/CNAME` holds the custom domain.
