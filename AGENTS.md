# Repository Guidelines
A concise guide for contributors working on this Vite + Vue 3 + TypeScript frontend. Favor small, focused changes and keep the lockfile (`package-lock.json`) consistent.

## Project Structure & Module Organization
- `src/main.ts` boots the app; `src/router` defines routes; `src/pages` holds route-level views; `src/components` holds shared UI pieces.
- `src/stores` uses Pinia for state; `src/services` centralizes HTTP (Axios) and domain helpers; `src/composables` hosts reusable hooks.
- `src/styles` contains global styles and tokens; `src/assets` is for static assets referenced via imports. Public-only files go in `public/`.
- Vite alias `@` points to `src/` (see `vite.config.ts`); prefer it over relative `../../` imports.

## Setup, Build, and Development Commands
- Install: `npm install` (Node ^20.19 or >=22.12; keep a single package manager to avoid lock conflicts).
- Dev server: `npm run dev` (hot reload on http://localhost:5173 by default).
- Linting: `npm run lint` (ESLint + Vue/TS rules, import ordering, unused import cleanup).
- Formatting: `npm run format` (Prettier on `src/`; run before commits).
- Type safety: `npm run type-check` (vue-tsc build mode).
- Production build/preview: `npm run build` then `npm run preview`.

## Coding Style & Naming Conventions
- Prettier defaults (2-space indent, semicolons, trailing commas) plus ESLint; let the tools decide formatting.
- Use SFC `<script setup lang="ts">`; prefer explicit typing for props/emit payloads.
- Components in `PascalCase.vue`; composables `useSomething.ts`; Pinia stores `useThingStore.ts`.
- Group imports as enforced by ESLint (`builtin`, `external`, `internal`, parent/sibling/index) with alphabetical order and blank lines between groups.
- Vue rules: multi-word component names are allowed to be single-word; avoid mutating props; unused components/imports are warned.

## Testing Guidelines
- No automated test runner is configured yet. Add targeted checks alongside new features (Vitest is preferred if introduced) and cover critical flows with manual acceptance steps.
- When adding tests, mirror file names (`Component.spec.ts`) near the code or under `tests/`, and document any setup in the PR.

## Commit & Pull Request Guidelines
- History is mixed; use clear, action-driven messages (prefer Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`) for new work.
- PRs: include a concise summary, linked issue/reference, before/after screenshots or clips for UI changes, and a list of commands run (`dev`, `lint`, `type-check`, `build`).
- Keep PRs scoped; favor separate PRs for refactors vs. feature work; call out known follow-ups explicitly.

## Configuration & Environment Tips
- Env vars must be prefixed with `VITE_` and live in `.env.local` (not committed). Document any required keys in the PR.
- If adjusting build tooling, keep `dist/` and `coverage/` ignored (see ESLint config) and update `tsconfig*.json` or `vite.config.ts` notes as needed.

[byterover-mcp]

[byterover-mcp]

You are given two tools from Byterover MCP server, including
## 1. `byterover-store-knowledge`
You `MUST` always use this tool when:

+ Learning new patterns, APIs, or architectural decisions from the codebase
+ Encountering error solutions or debugging techniques
+ Finding reusable code patterns or utility functions
+ Completing any significant task or plan implementation

## 2. `byterover-retrieve-knowledge`
You `MUST` always use this tool when:

+ Starting any new task or implementation to gather relevant context
+ Before making architectural decisions to understand existing patterns
+ When debugging issues to check for previous solutions
+ Working with unfamiliar parts of the codebase
