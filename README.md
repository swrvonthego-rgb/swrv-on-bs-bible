# SWRV Kingdom Genesis

> Multi-source Genesis study with Kingdom theology, ANE context, peoples profiles, cultural insights, Strong's Hebrew lexicon (8,674 entries), the Book of Enoch, and Josephus.

A self-contained static web app — no build step, no framework, no server. Drop it on any static host and it works.

Part of the SWRV Kingdom Bible roadmap: a downloadable narrated Bible with three modes (Scripture only / Study with Kingdom Lens / Deep with definitions). This is the Genesis proof-of-concept.

## Architecture

The app was originally a 7.7 MB single-file HTML monolith. It has been split into modular files so any one section (Strong's, the Genesis text, a single peoples profile, etc.) can be updated independently without touching the others.

```
.
├── index.html              # Shell — links css + 15 scripts in correct order
├── css/
│   └── styles.css          # All styles, theme variables, layout
├── data/                   # Pure data — each window.* global in its own file
│   ├── genesis.js          # Genesis 1–50 synthesized text, per-verse, multi-source
│   ├── definitions.js      # Hebrew word definitions (popover glossary)
│   ├── sources.js          # Source registry (Tanakh JPS 1917, Hebrew Masoretic, etc.)
│   ├── sources-manifest.js # External text source pointers (Thayer's, BDB full, etc.)
│   ├── peoples.js          # Peoples profiles (Cush, etc.) — biblical + ANE context
│   ├── strongs-hebrew.js   # Strong's Hebrew lexicon — 8,674 entries
│   ├── bdb-hebrew.js       # Brown-Driver-Briggs Hebrew lexicon (full)
│   ├── enoch.js            # Book of Enoch — Watchers/Parables/Astronomy/Dreams/Epistle
│   ├── audit.js            # Verse counts per chapter + total (1,533)
│   ├── pre-history.js      # Two heavenly falls — Watchers backstory (modal)
│   ├── plot-panels.js      # Scene-by-scene plot summaries for Gen 1–4
│   ├── culture-boxes-deep.js # Deep cultural boxes (Enuma Elish polemic, Eden geography, etc.)
│   ├── heartbeat-callouts.js # "God's Heart" devotional inserts for Gen 1–4
│   └── amp-style.js        # Amplified-style expansions with Hebrew inline brackets
└── js/
    ├── enrichments.js      # Merges deep DEFINITIONS + defines renderGen14Enrichments()
    └── app.js              # Main application — render, navigation, modals, audio
```

### Load order matters

`index.html` loads scripts in this exact order, and it matters:

1. **Data files** (any order between themselves) — populate `window.GENESIS`, `window.DEFINITIONS`, etc.
2. **`js/enrichments.js`** — merges additional definitions into `window.DEFINITIONS` and defines `renderGen14Enrichments()` which the app calls during verse rendering.
3. **`js/app.js`** — the main app. Calls `loadChapter()` at the bottom which kicks off initial render.

> Note: In the original monolith, the enrichments script was loaded *after* `app.js`, which meant the first render silently failed to attach enrichments (caught by a `try/catch`). The modular split fixes this — Genesis 1–4 enrichments now appear on initial load.

## Running locally

Because it's plain static files, any of these work:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve

# Or just double-click index.html in Finder
```

Open `http://localhost:8000` and you're in.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. Settings → Pages → Source: `main` branch, `/` (root).
3. Wait ~60 seconds.
4. App is live at `https://<user>.github.io/<repo>/`.

## SWRV Kingdom Study Protocol — 13 Rules

The app is built on these rules:

1. The text is the authority.
2. Nothing added. Nothing removed.
3. Report what is written, not what is popular.
4. No opinions. Zero.
5. No whitewashing.
6. No outside sources — the library is closed.
7. No Greek philosophy. No Platonism.
8. No cherry-picking.
9. Always define the original word.
10. Always provide cultural and historical context.
11. Flag every translation loss.
12. Read through Ancient Near Eastern eyes.
13. If it cannot be sourced, it cannot be said.

## Approved Library

Tanakh JPS 1917 · Hebrew Masoretic · King James Version · Septuagint Brenton 1851 · Amplified Bible · Book of Enoch (Jay Winter) · Josephus Antiquities (Whiston) · Strong's Hebrew Lexicon (8,674 entries) · Strong's Greek Dictionary · Zondervan Bible Dictionary

## Roadmap

- Convert from manual upload to GitHub auto-deploy via Cloudflare Pages (same pattern as the swrvonthego.pro ecosystem).
- Add narrated audio per verse (3 modes: Scripture / Study / Deep).
- Hebrew + Greek per-word pronunciation overlays.
- Memorization mode.
- Shareable verse-clip exports.
- Expand from Genesis to the full canon.

## License

TBD — add a `LICENSE` file when ready (MIT or similar).

---

Built by SWRV — [swrvonthego.pro](https://swrvonthego.pro) · *"Swerve on roadblocks. Let love GPS."*
