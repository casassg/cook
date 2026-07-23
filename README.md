# Cook

Gerard's guided recipe book, a static Hugo site at [cook.gerard.space](https://cook.gerard.space/).

- Multilingual (English, Català, Español) with English fallback.
- Guided **focus mode**: step by step, scaled ingredients per step, tap-to-start timers, keeps the screen awake.
- Adjustable servings and recipe variants, rendered statically with a sprinkle of Alpine.js.

## Develop

```bash
. ./bin/activate-hermit   # or run tools via ./bin/<tool>
./dev.sh                  # hugo server at http://localhost:1313
```

Tooling (Hugo, Tailwind, uv) is pinned with [Hermit](https://cashapp.github.io/hermit/) in `bin/`.

## Build & validate

```bash
hugo --gc --minify                    # production build
./bin/uv run scripts/validate_recipes.py   # validate recipe files
```

## Add a recipe

Create `content/recipes/<slug>/index.md` with front matter (structure + name translations) and a numbered steps body. Add `index.ca.md` / `index.es.md` with just `title`, `description`, and translated steps. See `content/recipes/gazpacho/` and `AGENTS.md` for the full model, and `schema/recipe.schema.json` for the contract.

Push to `main` and GitHub Actions builds and deploys to GitHub Pages.
