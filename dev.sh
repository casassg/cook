#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

# shellcheck disable=SC1091
. ./bin/activate-hermit

# Tailwind is compiled by Hugo via css.TailwindCSS (the pinned bin/tailwindcss
# is discovered on PATH), so a single Hugo server is all we need.
exec hugo server --buildDrafts --disableFastRender
