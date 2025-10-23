# Repository Guidelines

## Project Structure & Module Organization
- Source files live in `src/` with `src/background/` for the 13ft service worker, `src/options/` for the options UI script, and `src/shared.ts` for cross-surface helpers.
- Static extension artifacts (manifest, HTML, styling) are stored in `public/`; placeholder icons sit in `assets/icons/` and are copied during builds.
- The TypeScript compiler emits into `dist/`; never commit the folder and re-run `npm run build` before loading the unpacked extension.

## Build, Test, and Development Commands
- `npm install` provisions the TypeScript toolchain and Chrome typings; rerun after pulling dependency updates.
- `npm run build` cleans `dist/`, compiles TypeScript, and copies `public/` + `assets/` for packaging.
- `npm run dev` starts `tsc --watch` to rebuild background/options scripts as you work; rerun `npm run build` when static files change.
- `npm run test` currently echoes a placeholder—add real tests before relying on it.

## Coding Style & Naming Conventions
- Write strict TypeScript with ES2020 modules and 2-space indentation; prefer explicit return types on exported functions.
- Name modules by surface (`background`, `options`, `shared`) and export named symbols to keep tree-shaking predictable when bundling later.
- Keep background scripts side-effect free outside Chrome event hooks so they stay service-worker friendly.

## Testing Guidelines
- There is no test suite yet; prefer Vitest for future specs and mirror runtime folders (e.g., `tests/background/openSmry.test.ts`).
- Focus tests on protocol handling, storage preferences, and branching logic (same-tab vs new-tab).
- Until automation exists, smoke-test manually by loading `dist/` in Chrome and verifying action, context menu, and keyboard shortcuts.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat:`, `fix:`, `chore:`) with imperative subjects under ~60 characters.
- Squash WIP commits before raising a PR, describe behavioural changes, list manual test steps, and attach screenshots or screen recordings for UI tweaks.

## Security & Configuration Tips
- Never commit personalised SMRY credentials; if API keys are introduced, load them via `.env.local` and document expected names in `README.md`.
- Flag reviewers whenever manifest permissions change or when you add host permissions beyond the current `tabs` scope.
- Consider replacing the placeholder icons in `assets/icons/` before publishing to the Chrome Web Store.
