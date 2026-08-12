# Working rules for this repo

## Protected — never touch without an explicit, separate request
- `css/styles.css` (all colors, fonts, themes, spacing)
- Font-family stacks, font-loading strategy, and any `--font-*` / `--*-ink` / theme CSS custom properties, wherever they're set (CSS or JS)
- Color values of any kind (button colors, theme palettes, contrast overrides)

If a task requires touching any of the above as a side effect (e.g. a bug fix that happens to live near styling code), **stop and ask first** — even if it seems small, obviously correct, or like part of "auditing for the same bug." Fixing what was asked does not include auditing or fixing adjacent things that weren't asked for. A "while I was in there, I also fixed/audited X" change to protected files is exactly what this rule exists to prevent, no matter how well-reasoned it seemed at the time.

## Scope discipline
Match changes to exactly what was requested. Don't proactively expand a bug-fix task into a broader audit of "related" code unless asked to audit. If broader problems are spotted along the way, mention them and ask before acting — don't just fix them.

## Deploy reality check
This repo has **two separate live deployments** that both auto-deploy from `main`: a Cloudflare Workers deployment and a Cloudflare Pages deployment (see `_worker.js` for why Pages needs its own entry point). Before telling the user something is fixed, confirm it's actually merged into `main` — a fix sitting in an open, unmerged PR branch is not live anywhere, and saying otherwise is misleading.
