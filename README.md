# SWRV Kingdom Bible

> A whole-Bible study app: 66 books navigable, Genesis with deep Kingdom theology layer, universal word search across Hebrew + Greek + curated definitions, public-domain texts only.

## What's in the app

- **All 66 books** of the Protestant canon — Old Testament + New Testament — navigable via book + chapter dropdowns
- **Genesis deep build** (chapters 1–4 currently): plot panels per scene, covenant-heartbeat callouts, ANE culture boxes, Hebrew-audited amplified-style text, deep word entries
- **Universal Word Search**: type any English word (love, Zion, covenant, light, heart) — searches Hebrew Strong's (8,674 entries), Greek Strong's (5,523 entries), and the curated deep entries
- **Cultural-honesty Story Modal**: Who Were These People (Afro-Asiatic Semitic origins), Who Edited This Bible (Hebrew scribes → LXX → Masoretes → KJV chain), Genesis Story Arc (plain English), Daily Life, the Peoples
- **5 themes**: Vintage paper (default), Luxe, Cyberpunk, Earth, Sonic — each with its own font family
- **Music player** with built-in ambient tracks + upload-your-own audio
- **Pre-history primer**: Watcher backstory from 1 Enoch, Jubilees, Jude, 2 Peter
- **Vertical scroll only**: chapter navigation via arrows and dropdowns, no horizontal page-flip

## Approved Library — Rule 06

Everything below is public domain (no copyrighted material is reproduced anywhere in the app):

- Tanakh JPS 1917 · Hebrew Masoretic · King James Version (1611) · Septuagint Brenton 1851
- Book of 1 Enoch (R.H. Charles 1917) · Book of Jubilees · Josephus Antiquities (Whiston)
- Strong's Hebrew Lexicon (1890, 8,674 entries) · Strong's Greek Dictionary (1890, 5,523 entries)
- Brown-Driver-Briggs Hebrew Lexicon (1906)
- Zondervan Bible Dictionary (reference only — context, not reproduced)

Amplified-style verses in Genesis are **original Hebrew-audited paraphrase** clearly labeled as such — not the copyrighted Lockman Amplified Bible.

## Architecture

```
.
├── index.html                  # Shell — loads everything in correct order
├── css/styles.css              # 5 themes + UI styles
├── data/                       # Pure data modules (window.* globals)
│   ├── genesis.js              # Genesis (multi-source synthesized verses)
│   ├── definitions.js          # 290 curated deep entries
│   ├── strongs-hebrew.js       # 8,674 Hebrew entries
│   ├── strongs-greek.js        # 5,523 Greek entries
│   ├── bdb-hebrew.js           # Full BDB Hebrew lexicon
│   ├── enoch.js                # Book of 1 Enoch
│   ├── peoples.js              # Peoples profiles
│   ├── sources.js              # Source registry
│   ├── audit.js                # Verse counts
│   ├── bible-index.js          # Metadata for all 66 books
│   ├── bible/                  # KJV per-book files (lazy-loaded)
│   │   ├── Exodus.js
│   │   ├── ...
│   │   └── Revelation.js
│   ├── pre-history.js          # Watcher primer modal
│   ├── plot-panels.js          # Gen 1-4 scene-by-scene
│   ├── culture-boxes-deep.js   # Gen 1-4 ANE deep culture
│   ├── heartbeat-callouts.js   # Gen 1-4 covenant-heart
│   └── amp-style.js            # Gen 1-4 AMP-style verses
└── js/
    ├── enrichments.js          # Merges deep defs, hooks renderVerse
    └── app.js                  # Main app
```

## Load order

Strict ordering matters:

1. All `data/*.js` files (data modules — order between them doesn't matter)
2. `js/enrichments.js` — merges deep definitions into DEFINITIONS, defines renderGen14Enrichments()
3. `js/app.js` — main app, bootstraps via loadChapter()

Per-book KJV files in `data/bible/` are **lazy-loaded** when the user selects a different book — keeps initial page load fast.

## Running locally

Static files, no build step:

```bash
python3 -m http.server 8000
# or:  npx serve
```

Open http://localhost:8000

## Deployment

Connected to Cloudflare Pages → auto-deploys on every push to main. Live at the project's pages.dev URL.

## SWRV Kingdom Study Protocol — 13 Rules

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

## Roadmap

**This session shipped:**
- All 66 books with KJV base text and lazy-loaded navigation
- Universal word search across Hebrew + Greek + curated definitions
- Removed horizontal swipe gesture (vertical scroll only)

**Future sessions:**
- Deep editorial layer (plot panels + heartbeat + culture + AMP-style + deep word entries) for the remaining 65 books, one or two books per session
- Audio narration on Genesis 1:1–3 proof-of-concept, three modes (Scripture / Study / Deep)
- Hebrew + Greek per-word pronunciation overlays
- Memorization mode
- Shareable verse-clip exports

---

Built by SWRV — [swrvonthego.pro](https://swrvonthego.pro) · *"Swerve on roadblocks. Let love GPS."*
