# AGENTS.md

## Commands

```bash
npm run dev        # Start Vite dev server
npm run typecheck  # tsc --noEmit (strict, noUnusedLocals/Parameters)
npm run build      # tsc -b && vite build — required before deploy
npm run deploy     # gh-pages -d dist
```

- No test suite, no linter, no CI.
- Deploy is manual: `npm run deploy` builds and pushes `dist/` to the `gh-pages` branch.
- The site is served at `https://salmanahmd.github.io/salman-ahmed-portfolio/` — the Vite `base` and `package.json` `homepage` are both set to `/salman-ahmed-portfolio/`.

## Architecture

Single-page React 18 + TypeScript + Tailwind app. No routing library for sections — the page uses anchor links (`#/about`, `#/work`, `#/experience`, `#/engineering`, `#/notes`). `react-router-dom` is a dependency but sections are anchors.

## Content

All site content (bio, journey, experience, projects, blog posts, stack) lives in `src/data/content.ts` as typed constants. Edit there — do not hardcode copy into components.

## Conventions

- Tailwind design tokens: `ink`, `paper`, `line`, `panel`, `accent` color families (see `tailwind.config.js`). Use these, not arbitrary hex values.
- Typography: Inter (sans), Instrument Serif (serif), JetBrains Mono (mono) — loaded in `index.html`.
- Reveal animations: wrap sections in `<Reveal>` from `./components/Reveal`.
