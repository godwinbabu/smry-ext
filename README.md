# 13ft Chrome Extension

13ft jumps over paywalls by redirecting the current page to a reader-friendly summary provider. With a single click or shortcut you can get back to the article content without the subscription prompt.

## Features
- **One-click summarization** – trigger from the toolbar button, context menu, or keyboard shortcut to open the cleaned-up version of the current tab.
- **Configurable open mode** – choose whether summaries replace the current tab or launch in a new one via the options page.
- **Service worker friendly** – background logic runs in a Manifest V3 service worker and stays idle until an action needs handling.
- **Syncs across Chrome** – preference storage uses `chrome.storage.sync`, so your open-mode setting follows you to every signed-in browser.
- **Built for extension surfaces** – shares helpers across background and options scripts to keep behavior consistent as more summarizer backends are added.

## Getting Started
1. Install dependencies with `npm install`.
2. Build the extension bundle via `npm run build` (outputs into `dist/`).
3. Load the unpacked extension in Chrome: `chrome://extensions` → Enable Developer Mode → Load unpacked… → select the `dist/` folder.

## Daily Workflow
- `npm run dev` keeps TypeScript compiling in watch mode while you iterate on background or options code.
- Re-run `npm run build` whenever static files in `public/` or assets change before testing in Chrome.

## Usage Tips
- Toolbar icon: click to open the summarized version of the active page.
- Context menu: right-click anywhere on a page and choose **13ft • Summarize**.
- Keyboard shortcut: press `Ctrl+Shift+S` (`⌘⇧S` on macOS) to trigger the summary.
- Options page: visit the extension’s options to pick the open mode that suits your workflow.
- Behind the scenes: the extension currently redirects to smry.ai by default, and the architecture is ready to support additional paywall-bypassing providers.

## Project Layout
```
public/         # Manifest, options UI, static assets copied into dist/
src/background  # Service worker entry point
src/options     # Options page script
src/shared.ts   # Cross-surface helpers (storage, types)
assets/         # Icons copied during build
```

## Contributing
- Follow Conventional Commits (`feat:`, `fix:`, `chore:`) for commit messages.
- Keep background code side-effect free outside Chrome event handlers so the service worker can suspend cleanly.
- Prefer explicit return types on exported functions and 2-space indentation to match project style.

## Testing & Verification
- Automated testing is not set up yet; Vitest is recommended for future specs.
- Smoke-test manually by loading `dist/` in Chrome, verifying the toolbar action, context menu entry, and keyboard shortcut.

## License
This project is licensed under the ISC License. See `LICENSE` for details.
