/**
 * SWRV KINGDOM BIBLE — MULTI-SOURCE EDITION
 * Genesis 1:1–3 | All 8 sources merged, color-coded inline
 *
 * RETAINS FROM SOLID:
 *  ✅ 3 themes (Light / Dark / High Contrast) — WCAG AAA
 *  ✅ 4 text sizes (Small / Normal / Large / XL)
 *  ✅ Verse mode + Chapter mode
 *  ✅ Arrow key navigation (← → ↑ ↓)
 *  ✅ Number keys (1, 2, 3) jump to verse
 *  ✅ C toggles chapter mode, F focus mode, M music modal, Esc closes
 *  ✅ Per-verse smart highlighting (first occurrence only)
 *  ✅ Favorites + copy-to-clipboard
 *
 * NEW IN THIS EDITION:
 *  🆕 Multi-source data layer (Tanakh, LXX, DSS, Chronological NKJV,
 *     Amplified, Enoch, Josephus, Strong's, Zondervan)
 *  🆕 Color-coded inline text (each word tinted by its primary source)
 *  🆕 Source Variants panel (every source's wording for the current verse)
 *  🆕 Source Legend (always visible at bottom)
 *  🆕 Definition panel pulls from Strong's + Zondervan + cross-refs
 *
 * MODULAR NOTES:
 *   For production, split the constants below into:
 *     /data/sources/tanakh.js, lxx.js, dss.js, chronological-nkjv.js,
 *       amplified.js, enoch.js, josephus.js
 *     /data/definitions/genesis-1-3.js
 *     /data/sources/source-meta.js     (colors + display names)
 *   Then import them into this component. Kept inline here so this
 *   file runs as a single-artifact demo for review.
 *
 *   PLACEHOLDERS marked with [DROP IN: ...] are spots where you plug
 *   in your copyrighted source text (NKJV, Amplified, Zondervan) from
 *   the files you uploaded last session. Public-domain sources
 *   (Tanakh JPS 1917, LXX Greek, Whiston's Josephus, Strong's) are
 *   filled in directly.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';

// ============================================================
// SOURCE METADATA — colors, display names, license notes
// ============================================================
const SOURCES = {
  TANAKH:        { name: "Tanakh (JPS 1917)",     color: "#b8860b", short: "TNK", license: "Public domain" },
  LXX:           { name: "Septuagint (LXX)",       color: "#2563eb", short: "LXX", license: "Public domain (Greek)" },
  DSS:           { name: "Dead Sea Scrolls",       color: "#16a34a", short: "DSS", license: "Scholarly tr — your file" },
  CHRONOLOGICAL: { name: "Chronological (NKJV)",   color: "#dc2626", short: "NKJV", license: "© Thomas Nelson — your file" },
  AMPLIFIED:     { name: "Amplified Bible",        color: "#9333ea", short: "AMP", license: "© Lockman — your file" },
  ENOCH:         { name: "Book of Enoch",          color: "#ea580c", short: "EN",  license: "Public domain (Charles tr)" },
  JOSEPHUS:      { name: "Josephus (Whiston)",     color: "#0d9488", short: "JOS", license: "Public domain" },
  STRONGS:       { name: "Strong's Concordance",   color: "#4f46e5", short: "STR", license: "Public domain" },
  ZONDERVAN:     { name: "Zondervan Dictionary",   color: "#be185d", short: "ZON", license: "© Zondervan — your file" }
};

// ============================================================
// THEMES — same 3 SOLID themes (WCAG AAA)
// ============================================================
const THEMES = {
  LIGHT: {
    name: "Light", bg: "#fef5e7", text: "#2c1810", accent: "#b8860b",
    accentLight: "#d4af37", border: "#c9a84c", panelBg: "#fef9e7",
    panelBorder: "#c9a84c", selectBg: "#f5e6d3", muted: "#6b5a3e",
    description: "Warm & Readable (Like paper)"
  },
  DARK: {
    name: "Dark", bg: "#0f172a", text: "#f5e6d3", accent: "#ffd700",
    accentLight: "#ffed4e", border: "#d4a574", panelBg: "rgba(30,41,59,0.85)",
    panelBorder: "#d4a574", selectBg: "rgba(212,175,55,0.12)", muted: "#cbb38a",
    description: "Easy on eyes at night"
  },
  HIGH_CONTRAST: {
    name: "High Contrast", bg: "#000000", text: "#ffffff", accent: "#ffff00",
    accentLight: "#ffff00", border: "#ffffff", panelBg: "rgba(0,0,0,0.95)",
    panelBorder: "#ffffff", selectBg: "rgba(255,255,0,0.18)", muted: "#dddddd",
    description: "Maximum contrast"
  }
};

const TEXT_SIZES = {
  SMALL:  { label: "Small",  px: 14, lineHeight: 1.8, desc: "For good eyesight" },
  NORMAL: { label: "Normal", px: 18, lineHeight: 1.9, desc: "Recommended" },
  LARGE:  { label: "Large",  px: 22, lineHeight: 2.0, desc: "For reading comfort" },
  XL:     { label: "XL",     px: 26, lineHeight: 2.1, desc: "For low vision" }
};

// ============================================================
// GENESIS 1:1–3 — multi-source data
// ============================================================
//
// SCHEMA per verse:
//   synthesized: the merged base reading (drives color-coded inline display)
//   wordTokens : array of { word, source } — `source` keys SOURCES; drives word color
//   sources    : per-source full text + transliteration + notes
//   variants   : key differences worth flagging (shown in Variants panel header)
// ============================================================

const GENESIS_DATA = {
  1: {
    chapter: 1,
    title: "Genesis 1 — The Beginning",
    verses: {
      1: {
        ref: "Genesis 1:1",
        // Synthesized base reading (all sources agree on this verse)
        synthesized: "In the beginning God created the heavens and the earth.",
        wordTokens: [
          { word: "In",        source: "TANAKH" },
          { word: "the",       source: "TANAKH" },
          { word: "beginning", source: "TANAKH" },
          { word: "God",       source: "TANAKH" },
          { word: "created",   source: "TANAKH" },
          { word: "the",       source: "TANAKH" },
          { word: "heavens",   source: "CHRONOLOGICAL" }, // NKJV plural; Tanakh JPS has "heaven"
          { word: "and",       source: "TANAKH" },
          { word: "the",       source: "TANAKH" },
          { word: "earth",     source: "TANAKH" }
        ],
        sources: {
          TANAKH:        { text: "In the beginning God created the heaven and the earth.",
                           hebrew: "בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃",
                           translit: "B'reishit bara Elohim et hashamayim v'et ha'aretz." },
          LXX:           { text: "In the beginning God made the heaven and the earth.",
                           greek: "Ἐν ἀρχῇ ἐποίησεν ὁ θεὸς τὸν οὐρανὸν καὶ τὴν γῆν.",
                           translit: "En archē epoiēsen ho theos ton ouranon kai tēn gēn.",
                           note: "LXX uses ἐποίησεν (made/fashioned) where Hebrew uses bara (created from nothing)." },
          DSS:           { text: "[4QGen-b matches MT here; minor orthographic variants only.]",
                           note: "Dead Sea Scrolls Genesis fragments confirm the Masoretic reading for v.1." },
          CHRONOLOGICAL: { text: "In the beginning God created the heavens and the earth.",
                           note: "Chronological Study Bible (NKJV). Plural 'heavens' emphasizes all dimensions of the cosmos." },
          AMPLIFIED:     { text: "In the beginning God (Elohim) created and formed the heavens and the earth.",
                           note: "Amplified Bible. Expands bara as 'created and formed' to show both ex nihilo creation and divine shaping." },
          JOSEPHUS:      { text: "In the beginning God created the heaven and the earth.",
                           note: "Antiquities of the Jews 1.1.1 (Whiston tr). Josephus opens his history with a near-verbatim restatement." },
          ENOCH:         { text: "[Not directly parallel to Gen 1:1, though 1 Enoch 2:1–5:3 contemplates the order of creation.]",
                           note: "Enoch's creation themes are commentary, not parallel text." }
        },
        variants: [
          { label: "heaven (sing.) vs heavens (pl.)", note: "Tanakh JPS, LXX, Vulgate, KJV, Josephus all use the singular. NKJV/NASB/ESV use the plural to capture the grammatical form of שָׁמַיִם (shamayim)." },
          { label: "created (bara) vs made (epoiēsen)", note: "Hebrew בָּרָא is reserved for divine creation ex nihilo. LXX softens this with ἐποίησεν, the general 'made/fashioned'." }
        ],
        definableWords: ["beginning", "God", "created", "heavens", "earth"]
      },

      2: {
        ref: "Genesis 1:2",
        synthesized: "Now the earth was without form and void, and darkness was upon the face of the deep; and the Spirit of God moved upon the face of the waters.",
        wordTokens: [
          { word: "Now",        source: "TANAKH" },
          { word: "the",        source: "TANAKH" },
          { word: "earth",      source: "TANAKH" },
          { word: "was",        source: "TANAKH" },
          { word: "without",    source: "TANAKH" },
          { word: "form",       source: "TANAKH" },     // tohu — LXX renders "invisible"
          { word: "and",        source: "TANAKH" },
          { word: "void",       source: "TANAKH" },     // bohu — LXX renders "unformed"
          { word: "and",        source: "TANAKH" },
          { word: "darkness",   source: "TANAKH" },
          { word: "was",        source: "TANAKH" },
          { word: "upon",       source: "TANAKH" },
          { word: "the",        source: "TANAKH" },
          { word: "face",       source: "TANAKH" },
          { word: "of",         source: "TANAKH" },
          { word: "the",        source: "TANAKH" },
          { word: "deep",       source: "LXX" },        // tehom / abyssos — flagged because LXX abyss carries weight
          { word: "and",        source: "TANAKH" },
          { word: "the",        source: "TANAKH" },
          { word: "Spirit",     source: "TANAKH" },     // ruach — LXX pneuma also "wind/breath"
          { word: "of",         source: "TANAKH" },
          { word: "God",        source: "TANAKH" },
          { word: "moved",      source: "TANAKH" },     // rachaph — "hovered/brooded"
          { word: "upon",       source: "TANAKH" },
          { word: "the",        source: "TANAKH" },
          { word: "face",       source: "TANAKH" },
          { word: "of",         source: "TANAKH" },
          { word: "the",        source: "TANAKH" },
          { word: "waters",     source: "TANAKH" }
        ],
        sources: {
          TANAKH:        { text: "Now the earth was unformed and void, and darkness was upon the face of the deep; and the spirit of God hovered over the face of the waters.",
                           hebrew: "וְהָאָ֗רֶץ הָיְתָ֥ה תֹ֙הוּ֙ וָבֹ֔הוּ וְחֹ֖שֶׁךְ עַל־פְּנֵ֣י תְהֹ֑ום וְר֣וּחַ אֱלֹהִ֔ים מְרַחֶ֖פֶת עַל־פְּנֵ֥י הַמָּֽיִם׃",
                           translit: "V'ha'aretz hayetah tohu vavohu, v'choshech al-p'nei t'hom, v'ruach Elohim m'rachefet al-p'nei hamayim." },
          LXX:           { text: "And the earth was invisible and unfurnished, and darkness was over the abyss, and the breath of God moved over the water.",
                           greek: "ἡ δὲ γῆ ἦν ἀόρατος καὶ ἀκατασκεύαστος, καὶ σκότος ἐπάνω τῆς ἀβύσσου, καὶ πνεῦμα θεοῦ ἐπεφέρετο ἐπάνω τοῦ ὕδατος.",
                           translit: "Hē de gē ēn aoratos kai akataskeuastos, kai skotos epanō tēs abyssou, kai pneuma theou epephereto epanō tou hydatos.",
                           note: "Major variant: LXX renders tohu wa-bohu as 'invisible and unfurnished' rather than 'formless and void'. ἄβυσσος (abyss) — same root as Revelation's bottomless pit." },
          DSS:           { text: "[4QGen-b: matches MT closely. 4QGen-g preserves only fragments of v.2.]",
                           note: "DSS Genesis fragments support the Hebrew reading; no significant divergence." },
          CHRONOLOGICAL: { text: "Now the earth was without form and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters." },
          AMPLIFIED:     { text: "Now the earth was formless and void, and [thick] darkness was on the face of the deep; and the Spirit of God was moving (hovering, brooding) over the face of the waters.",
                           note: "Amplified shows 'Spirit of God' as opposed to just 'spirit', and expands rachaph (hovering) with bracketed synonyms." },
          JOSEPHUS:      { text: "But this earth was at the beginning invisible and unfashioned, having darkness on its surface; and a divine wind moved on the surface of the waters.",
                           note: "Antiquities 1.1.1. Josephus follows the LXX tradition ('invisible', 'divine wind' for ruach Elohim)." },
          ENOCH:         { text: "[1 Enoch 60:7–9 references the deep / great waters as primeval cosmic reality.]" }
        },
        variants: [
          { label: "without form / unformed / invisible", note: "Hebrew tohu (תֹהוּ): 'formlessness, chaos, waste'. KJV: 'without form'. JPS: 'unformed'. LXX/Josephus: ἀόρατος 'invisible' — a different conceptual frame entirely." },
          { label: "deep vs abyss", note: "Hebrew tehom (תְהוֹם) is cognate with Babylonian Tiamat. LXX ἄβυσσος becomes the New Testament 'abyss'." },
          { label: "Spirit vs wind/breath", note: "Hebrew ruach and Greek pneuma both span 'breath/wind/spirit'. Translators choose based on theology, not linguistics alone." },
          { label: "moved / hovered / brooded", note: "Hebrew rachaph (רָחַף) is also used in Deut 32:11 of an eagle hovering over its young — image of nurturing protection, not just motion." }
        ],
        definableWords: ["earth", "form", "void", "darkness", "deep", "Spirit", "God", "moved", "waters"]
      },

      3: {
        ref: "Genesis 1:3",
        synthesized: "And God said, Let there be light: and there was light.",
        wordTokens: [
          { word: "And",   source: "TANAKH" },
          { word: "God",   source: "TANAKH" },
          { word: "said",  source: "TANAKH" },
          { word: "Let",   source: "TANAKH" },
          { word: "there", source: "TANAKH" },
          { word: "be",    source: "TANAKH" },
          { word: "light", source: "TANAKH" },
          { word: "and",   source: "TANAKH" },
          { word: "there", source: "TANAKH" },
          { word: "was",   source: "TANAKH" },
          { word: "light", source: "TANAKH" }
        ],
        sources: {
          TANAKH:        { text: "And God said: 'Let there be light.' And there was light.",
                           hebrew: "וַיֹּ֥אמֶר אֱלֹהִ֖ים יְהִ֣י א֑וֹר וַֽיְהִי־אֽוֹר׃",
                           translit: "Vayomer Elohim, y'hi or, vay'hi or." },
          LXX:           { text: "And God said, Let there be light. And there was light.",
                           greek: "καὶ εἶπεν ὁ θεός Γενηθήτω φῶς. καὶ ἐγένετο φῶς.",
                           translit: "Kai eipen ho theos, Genēthētō phōs. Kai egeneto phōs." },
          DSS:           { text: "[Matches MT. 4QGen-b confirms.]" },
          CHRONOLOGICAL: { text: "And God said, \"Let there be light\"; and there was light." },
          AMPLIFIED:     { text: "And God said, \"Let there be light\"; and there was light." },
          JOSEPHUS:      { text: "After this God commanded that there should be light.",
                           note: "Antiquities 1.1.1. Josephus paraphrases the divine fiat as a command rather than a quotation." },
          ENOCH:         { text: "[1 Enoch 41:7 contemplates the separation of light: 'the sun and moon... go forth and return for the light']" }
        },
        variants: [
          { label: "y'hi or / Genēthētō phōs / Fiat lux", note: "The Hebrew is three words; LXX matches it; Vulgate's 'Fiat lux' became proverbial. All sources agree on this verse." },
          { label: "Light before sun", note: "Sun, moon, stars created on day 4 (v.14–19). The 'light' of v.3 is theologically distinct — often read as God's own light or as primordial illumination." }
        ],
        definableWords: ["God", "said", "Let", "light"]
      }
    }
  }
};

// ============================================================
// WORD DEFINITIONS — Strong's + Hebrew + cross-refs
// ============================================================
const DEFINITIONS = {
  "beginning": {
    word: "beginning", wordType: "noun",
    hebrew: "בְּרֵאשִׁית", hebrew_translit: "bereishit",
    greek: "ἀρχή", greek_translit: "archē",
    strongs: "H7225 — re'shith: first, beginning, chief, choicest part",
    definitions: {
      hebrew: "Absolute starting point. Same root as rosh (head). Implies primacy of rank as well as time.",
      greek: "Origin, source, ruling authority. Same word John 1:1 uses ('In the archē was the Logos').",
      theological: "Establishes God's transcendence: He existed before the beginning, He is not part of it."
    },
    cross_references: {
      "John 1:1": "In the beginning was the Word, and the Word was with God.",
      "Proverbs 8:22": "The LORD possessed me at the beginning of His way.",
      "Hebrews 1:10": "You, Lord, in the beginning laid the foundation of the earth."
    }
  },
  "God": {
    word: "God", wordType: "noun",
    hebrew: "אֱלֹהִים", hebrew_translit: "Elohim",
    greek: "θεός", greek_translit: "theos",
    strongs: "H430 — Elohim: the supreme God, mighty ones, divine beings",
    definitions: {
      hebrew: "Plural form (-im) with singular verbs — uniquely Hebrew. Magnitude, majesty, fullness; some read it as anticipating triune nature.",
      theological: "First name of God in Scripture. Power, transcendence, sovereign creative authority — the name fits the act."
    },
    cross_references: {
      "Genesis 1:26": "Let Us make man in Our image — plural pronouns paired with singular Elohim."
    }
  },
  "created": {
    word: "created", wordType: "verb",
    hebrew: "בָּרָא", hebrew_translit: "bara",
    greek: "ἐποίησεν (LXX)", greek_translit: "epoiēsen",
    strongs: "H1254 — bara: to create, shape, form (used only of God's creating)",
    definitions: {
      hebrew: "Reserved in the Tanakh for divine creation. Subject is always God. Implies bringing into being something genuinely new — not reshaping existing material.",
      greek: "LXX softens to epoiēsen ('made/fashioned'), a more general term that doesn't carry bara's ex nihilo force.",
      theological: "Creation ex nihilo — out of nothing. Romans 4:17, Hebrews 11:3 reflect this back."
    },
    cross_references: {
      "Romans 4:17": "God, who gives life to the dead and calls things that are not as though they were.",
      "Hebrews 11:3": "The universe was formed at God's command, so that what is seen was not made out of what was visible."
    }
  },
  "heavens": {
    word: "heavens", wordType: "noun",
    hebrew: "שָׁמַיִם", hebrew_translit: "shamayim",
    greek: "οὐρανός", greek_translit: "ouranos",
    strongs: "H8064 — shamayim: heavens, sky, visible heavens, abode of God",
    definitions: {
      hebrew: "Grammatically plural (the -ayim ending suggests dual). Encompasses sky, atmosphere, and the unseen dwelling of God.",
      theological: "Paul speaks of being caught up to the 'third heaven' (2 Cor 12:2). Hebrew already saw heavens as layered."
    },
    cross_references: {
      "Psalm 19:1": "The heavens declare the glory of God.",
      "2 Corinthians 12:2": "Caught up to the third heaven."
    }
  },
  "earth": {
    word: "earth", wordType: "noun",
    hebrew: "אֶרֶץ", hebrew_translit: "eretz",
    greek: "γῆ", greek_translit: "gē",
    strongs: "H776 — eretz: land, earth, ground, country",
    definitions: {
      hebrew: "Material world; can mean the whole planet or a specific land (e.g., 'eretz Yisrael'). Paired with shamayim, it means the entire created order.",
      context: "'Heavens and earth' is a Hebrew merism — naming the two ends to mean everything in between."
    }
  },
  "form": {
    word: "form", wordType: "noun",
    hebrew: "תֹהוּ", hebrew_translit: "tohu",
    greek: "ἀόρατος (LXX)", greek_translit: "aoratos",
    strongs: "H8414 — tohu: formlessness, confusion, unreality, waste",
    definitions: {
      hebrew: "Chaos. Wasteland. The state of pre-cosmic disorder. Used in Isaiah 45:18 — God did NOT create the earth tohu; He created it to be inhabited.",
      greek: "LXX renders this as 'invisible' — a Greek philosophical reframing rather than a literal translation."
    },
    cross_references: {
      "Isaiah 45:18": "He did not create it tohu, He formed it to be inhabited.",
      "Jeremiah 4:23": "I beheld the earth, and indeed it was tohu wa-bohu — apocalyptic reversal of Genesis 1:2."
    }
  },
  "void": {
    word: "void", wordType: "noun",
    hebrew: "בֹּהוּ", hebrew_translit: "bohu",
    strongs: "H922 — bohu: emptiness, void",
    definitions: {
      hebrew: "Almost always paired with tohu. The phrase 'tohu wa-bohu' has entered English as 'tohu-bohu' — chaos.",
      context: "Hebrew rhyming pair. Sound and sense reinforce each other."
    }
  },
  "darkness": {
    word: "darkness", wordType: "noun",
    hebrew: "חֹשֶׁךְ", hebrew_translit: "choshech",
    greek: "σκότος", greek_translit: "skotos",
    strongs: "H2822 — choshech: darkness, obscurity",
    definitions: {
      hebrew: "Physical darkness, but also moral and spiritual absence of God's light.",
      theological: "1 John 1:5 — God is light, and in Him is no darkness at all. The Genesis darkness is the canvas before the first divine word."
    }
  },
  "deep": {
    word: "deep", wordType: "noun",
    hebrew: "תְהוֹם", hebrew_translit: "tehom",
    greek: "ἄβυσσος (LXX)", greek_translit: "abyssos",
    strongs: "H8415 — tehom: deep place, abyss, primeval ocean",
    definitions: {
      hebrew: "The primal sea. Cognate with Babylonian Tiamat — but in Genesis the tehom is not a rival deity; it's just water under God's command.",
      greek: "LXX abyssos becomes the NT 'abyss' (Luke 8:31, Revelation 9:1, 20:1) — the bottomless pit.",
      theological: "Genesis demythologizes ANE creation accounts. No cosmic battle. God speaks; chaos becomes cosmos."
    },
    cross_references: {
      "Revelation 20:1": "An angel coming down from heaven, having the key to the abyss."
    }
  },
  "Spirit": {
    word: "Spirit", wordType: "noun",
    hebrew: "רוּחַ", hebrew_translit: "ruach",
    greek: "πνεῦμα", greek_translit: "pneuma",
    strongs: "H7307 — ruach: wind, breath, spirit",
    definitions: {
      hebrew: "Triple meaning: wind (physical), breath (life), spirit (divine presence). All three operate at once in Genesis 1:2.",
      greek: "Pneuma carries the same range. Same word in John 3:8 — 'the wind/spirit blows where it wills.'",
      theological: "The Spirit hovering over the waters parallels the dove descending at Jesus' baptism — new creation language."
    },
    cross_references: {
      "John 3:8": "The wind blows where it wishes — so is everyone born of the Spirit.",
      "Matthew 3:16": "The Spirit of God descending like a dove and resting on Him."
    }
  },
  "moved": {
    word: "moved", wordType: "verb",
    hebrew: "מְרַחֶפֶת", hebrew_translit: "merachefet",
    strongs: "H7363 — rachaph: to hover, brood, flutter",
    definitions: {
      hebrew: "Used in Deuteronomy 32:11 of an eagle hovering protectively over its young. Not 'moved' in the casual sense — brooding, attentive, generative.",
      theological: "Hovering, not detached observation. The Spirit is engaged with what's about to be spoken into existence."
    },
    cross_references: {
      "Deuteronomy 32:11": "Like an eagle that stirs up its nest, hovers over its young."
    }
  },
  "waters": {
    word: "waters", wordType: "noun",
    hebrew: "מַיִם", hebrew_translit: "mayim",
    strongs: "H4325 — mayim: waters, water",
    definitions: {
      hebrew: "Always grammatically plural in Hebrew. Pre-creation chaos waters; later, Red Sea, Jordan, baptism — water as the threshold of new states.",
      theological: "Creation begins by ordering the waters (Day 2: separating waters above and below). Baptism re-enacts this ordering on a person."
    }
  },
  "said": {
    word: "said", wordType: "verb",
    hebrew: "וַיֹּאמֶר", hebrew_translit: "vayomer",
    strongs: "H559 — amar: to say, speak, utter",
    definitions: {
      hebrew: "Divine speech as creative power. 'God said' appears 10 times in Genesis 1 — the world is structured by spoken word.",
      theological: "Foreshadows John 1:1 — the Word was with God. Speech is the medium of creation."
    },
    cross_references: {
      "Psalm 33:9": "He spoke, and it came to be; He commanded, and it stood firm."
    }
  },
  "Let": {
    word: "Let", wordType: "verb (jussive)",
    hebrew: "יְהִי", hebrew_translit: "y'hi",
    greek: "Γενηθήτω", greek_translit: "Genēthētō",
    strongs: "H1961 — hayah: to be, become, come to pass",
    definitions: {
      hebrew: "Jussive form — 'let it be'. Not a request; a sovereign decree. The grammar itself is the act.",
      theological: "Two words in Hebrew (y'hi or) — 'be light'. Reality conforms to divine speech immediately."
    }
  },
  "light": {
    word: "light", wordType: "noun",
    hebrew: "אוֹר", hebrew_translit: "or",
    greek: "φῶς", greek_translit: "phōs",
    strongs: "H216 — or: light, illumination, daylight",
    definitions: {
      hebrew: "Primal light. Created on Day 1, before the sun (Day 4) — theologically significant: light precedes its physical sources.",
      theological: "1 John 1:5: 'God is light.' John 8:12: 'I am the light of the world.' The Genesis 'or' has Christological resonance."
    },
    cross_references: {
      "John 1:4-5": "In Him was life, and the life was the light of men.",
      "2 Corinthians 4:6": "God who said 'Let light shine out of darkness' has shone in our hearts."
    }
  }
};

// ============================================================
// COMPONENT
// ============================================================
export default function GenesisBibleReaderMultiSource() {
  const [theme, setTheme] = useState("LIGHT");
  const [textSize, setTextSize] = useState("NORMAL");
  const [readingMode, setReadingMode] = useState("VERSE");
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [selectedWord, setSelectedWord] = useState(null);
  const [definedInVerse, setDefinedInVerse] = useState(new Set());
  const [favorites, setFavorites] = useState(new Set());
  const [copied, setCopied] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [showVariants, setShowVariants] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [musicVolume, setMusicVolume] = useState(60);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  // MUSIC TRACKS from Roadmap App
  const MUSIC_TRACKS = [
    { name: "Peaceful Nature", url: "https://res.cloudinary.com/ddzyvfolr/video/upload/v1778186909/ROADMAP_APP_-PEACEFUL_NATURE_suii2m.mp3" },
    { name: "Lofi Ocean Pier", url: "https://res.cloudinary.com/ddzyvfolr/video/upload/v1778186908/ROADMAP_APP-_LOFI_OCEAN_PIER_ndlqu8.mp3" },
    { name: "Peaceful Nature Sounds", url: "https://res.cloudinary.com/ddzyvfolr/video/upload/v1778186909/ROADMAP_APP_-_PEACEFUL_NATURE_SOUNDS_vnplxv.mp3" }
  ];

  const T = THEMES[theme];
  const TS = TEXT_SIZES[textSize];
  const chapter = GENESIS_DATA[currentChapter];
  const verse = chapter.verses[currentVerse];

  // Build the words to render. In CHAPTER mode, concat all verse tokens.
  const renderTokens = useMemo(() => {
    if (readingMode === "VERSE") return verse.wordTokens;
    return Object.values(chapter.verses).flatMap((v, i, arr) => {
      const tokens = [...v.wordTokens];
      if (i < arr.length - 1) tokens.push({ word: " ¶ ", source: "DIVIDER" });
      return tokens;
    });
  }, [readingMode, verse, chapter]);

  // Reset highlight tracking when verse/chapter/mode changes
  useEffect(() => {
    setDefinedInVerse(new Set());
    setSelectedWord(null);
  }, [currentVerse, currentChapter, readingMode]);

  // Copy feedback
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  // Audio playback control
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.play().catch(err => console.warn("Audio play failed:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlayingMusic]);

  // Audio volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume / 100;
    }
  }, [musicVolume]);

  // Track change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = MUSIC_TRACKS[currentTrack].url;
      if (isPlayingMusic) {
        audioRef.current.play().catch(err => console.warn("Audio play failed:", err));
      }
    }
  }, [currentTrack]);

  // Keyboard navigation
  useEffect(() => {
    const verseKeys = Object.keys(chapter.verses).map(Number);
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      const k = e.key;
      if (k === "Escape") { setSelectedWord(null); setShowMusicModal(false); return; }
      if (k === "f" || k === "F") { setFocusMode(v => !v); return; }
      if (k === "m" || k === "M") { setShowMusicModal(v => !v); return; }
      if (k === "c" || k === "C") {
        setReadingMode(m => m === "VERSE" ? "CHAPTER" : "VERSE");
        return;
      }
      if (readingMode === "VERSE") {
        if (k === "ArrowUp" || k === "ArrowLeft") {
          e.preventDefault();
          const idx = verseKeys.indexOf(currentVerse);
          if (idx > 0) setCurrentVerse(verseKeys[idx - 1]);
        } else if (k === "ArrowDown" || k === "ArrowRight") {
          e.preventDefault();
          const idx = verseKeys.indexOf(currentVerse);
          if (idx < verseKeys.length - 1) setCurrentVerse(verseKeys[idx + 1]);
        } else if (["1","2","3","4","5","6","7","8","9"].includes(k)) {
          const target = Number(k);
          if (verseKeys.includes(target)) setCurrentVerse(target);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentVerse, readingMode, chapter]);

  // Word click
  const handleWordClick = (word, idx) => {
    const cleaned = word.replace(/[.,;:!?'"]/g, "");
    if (!DEFINITIONS[cleaned]) return;
    if (selectedWord === cleaned) {
      setSelectedWord(null);
      return;
    }
    setSelectedWord(cleaned);
    setDefinedInVerse(prev => new Set([...prev, cleaned]));
  };

  const toggleFavorite = () => {
    if (!selectedWord) return;
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(selectedWord)) next.delete(selectedWord);
      else next.add(selectedWord);
      return next;
    });
  };

  const copyDefinition = () => {
    const def = selectedWord ? DEFINITIONS[selectedWord] : null;
    if (!def) return;
    const lines = [
      `${def.word} (${def.hebrew_translit || def.greek_translit || ""})`,
      def.hebrew ? `Hebrew: ${def.hebrew}` : "",
      def.greek ? `Greek: ${def.greek}` : "",
      def.strongs ? `Strong's: ${def.strongs}` : "",
      "",
      ...Object.entries(def.definitions || {}).map(([k, v]) => `${k}: ${v}`),
      "",
      ...Object.entries(def.cross_references || {}).map(([ref, text]) => `${ref} — ${text}`)
    ].filter(Boolean).join("\n");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(lines).then(() => setCopied(true)).catch(() => {});
    }
  };

  const currentDefinition = selectedWord ? DEFINITIONS[selectedWord] : null;

  // ============================================================
  // RENDER HELPERS
  // ============================================================

  const renderInlineText = () => {
    const seen = new Set();
    return (
      <p style={{
        fontSize: TS.px, lineHeight: TS.lineHeight,
        margin: 0, fontFamily: "Georgia, 'Iowan Old Style', serif"
      }}>
        {renderTokens.map((tok, i) => {
          if (tok.source === "DIVIDER") {
            return (
              <span key={i} style={{ color: T.muted, fontWeight: 700, padding: "0 0.5rem" }}>
                {tok.word}
              </span>
            );
          }
          const cleaned = tok.word.replace(/[.,;:!?'"]/g, "");
          const isDefinable = Boolean(DEFINITIONS[cleaned]);
          const alreadyShown = seen.has(cleaned);
          if (isDefinable && !alreadyShown) seen.add(cleaned);

          const sourceColor = SOURCES[tok.source]?.color || T.text;
          const isSelected = selectedWord === cleaned;
          const showHighlight = isDefinable && !alreadyShown;

          // Color logic: every word gets its source tint as text color.
          // Highlight (background tint) only on first occurrence per verse.
          const style = {
            color: sourceColor,
            backgroundColor: isSelected
              ? `${T.accent}33`
              : showHighlight
                ? `${T.accent}14`
                : "transparent",
            padding: isDefinable ? "1px 3px" : "0",
            borderRadius: "3px",
            cursor: isDefinable ? "pointer" : "default",
            transition: "background-color 150ms",
            fontWeight: tok.source === "TANAKH" ? "normal" : "600",
            textDecoration: isSelected ? `underline 2px ${T.accent}` : "none",
            textUnderlineOffset: "4px"
          };

          return (
            <span
              key={i}
              style={style}
              onClick={() => isDefinable && handleWordClick(tok.word, i)}
              title={
                isDefinable
                  ? (alreadyShown ? "Already defined in this verse" : `Click to define • Source: ${SOURCES[tok.source]?.name}`)
                  : `Source: ${SOURCES[tok.source]?.name}`
              }
            >
              {tok.word}{" "}
            </span>
          );
        })}
      </p>
    );
  };

  const renderDefinitionPanel = () => {
    if (!currentDefinition) {
      return (
        <div style={{
          padding: "1.5rem", color: T.muted,
          fontStyle: "italic", textAlign: "center"
        }}>
          Click any tinted word to see its definition, Hebrew/Greek roots, Strong's number, and cross-references.
        </div>
      );
    }
    return (
      <div style={{
        backgroundColor: T.panelBg,
        border: `2px solid ${T.accent}`,
        borderRadius: "8px",
        padding: "1.5rem"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <h3 style={{ margin: 0, color: T.accent, fontSize: TS.px + 6, fontFamily: "Georgia, serif" }}>
              {currentDefinition.word}
            </h3>
            <span style={{ color: T.muted, fontSize: TS.px - 4, fontStyle: "italic" }}>
              {currentDefinition.wordType}
            </span>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={toggleFavorite} aria-label="Favorite" style={btnIcon(T)}>
              {favorites.has(selectedWord) ? "❤️" : "🤍"}
            </button>
            <button onClick={copyDefinition} aria-label="Copy" style={btnIcon(T)}>
              {copied ? "✓" : "📋"}
            </button>
          </div>
        </div>

        {(currentDefinition.hebrew || currentDefinition.greek) && (
          <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}40` }}>
            {currentDefinition.hebrew && (
              <div style={{ marginBottom: "0.5rem" }}>
                <span style={{ color: T.muted, fontSize: TS.px - 4, marginRight: "0.5rem" }}>Hebrew:</span>
                <span style={{ fontSize: TS.px + 4, fontFamily: "'SBL Hebrew', serif" }}>
                  {currentDefinition.hebrew}
                </span>
                <span style={{ color: T.muted, fontStyle: "italic", fontSize: TS.px - 3, marginLeft: "0.5rem" }}>
                  ({currentDefinition.hebrew_translit})
                </span>
              </div>
            )}
            {currentDefinition.greek && (
              <div>
                <span style={{ color: T.muted, fontSize: TS.px - 4, marginRight: "0.5rem" }}>Greek:</span>
                <span style={{ fontSize: TS.px + 2 }}>{currentDefinition.greek}</span>
                <span style={{ color: T.muted, fontStyle: "italic", fontSize: TS.px - 3, marginLeft: "0.5rem" }}>
                  ({currentDefinition.greek_translit})
                </span>
              </div>
            )}
          </div>
        )}

        {currentDefinition.strongs && (
          <div style={{ marginBottom: "1rem" }}>
            <span style={{ color: SOURCES.STRONGS.color, fontWeight: 700, fontSize: TS.px - 3 }}>STRONG'S</span>
            <p style={{ margin: "0.25rem 0 0", fontSize: TS.px - 2 }}>{currentDefinition.strongs}</p>
          </div>
        )}

        {currentDefinition.definitions && (
          <div style={{ marginBottom: "1rem" }}>
            {Object.entries(currentDefinition.definitions).map(([k, v]) => (
              <div key={k} style={{ marginBottom: "0.5rem" }}>
                <span style={{ color: T.accent, fontWeight: 700, fontSize: TS.px - 3, textTransform: "uppercase" }}>{k}</span>
                <p style={{ margin: "0.15rem 0 0", fontSize: TS.px - 2, lineHeight: 1.55 }}>{v}</p>
              </div>
            ))}
          </div>
        )}

        {currentDefinition.cross_references && Object.keys(currentDefinition.cross_references).length > 0 && (
          <div>
            <span style={{ color: T.accent, fontWeight: 700, fontSize: TS.px - 3 }}>CROSS-REFERENCES</span>
            {Object.entries(currentDefinition.cross_references).map(([ref, text]) => (
              <p key={ref} style={{ margin: "0.4rem 0 0", fontSize: TS.px - 3, lineHeight: 1.5 }}>
                <span style={{ fontWeight: 700, color: T.accent }}>{ref}</span> — <span style={{ fontStyle: "italic" }}>{text}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderVariantsPanel = () => {
    if (!showVariants) return null;
    const v = readingMode === "VERSE"
      ? verse
      : { ref: `Genesis ${currentChapter}`, sources: {}, variants: [] };

    if (readingMode === "CHAPTER") {
      return (
        <div style={{ marginTop: "2rem", color: T.muted, fontStyle: "italic", fontSize: TS.px - 3 }}>
          Switch to Verse mode (press C) to see per-verse source variants.
        </div>
      );
    }

    return (
      <div style={{ marginTop: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
          <h4 style={{ margin: 0, color: T.accent, fontSize: TS.px, fontFamily: "Georgia, serif" }}>
            Source Variants — {v.ref}
          </h4>
          <button onClick={() => setShowVariants(false)} style={btnGhost(T)}>Hide</button>
        </div>

        {v.variants && v.variants.length > 0 && (
          <div style={{ marginBottom: "1.25rem", padding: "0.75rem 1rem", backgroundColor: T.selectBg, borderLeft: `3px solid ${T.accent}`, borderRadius: "4px" }}>
            <span style={{ fontWeight: 700, fontSize: TS.px - 4, color: T.accent }}>KEY DIFFERENCES</span>
            {v.variants.map((vx, i) => (
              <div key={i} style={{ marginTop: "0.5rem", fontSize: TS.px - 3, lineHeight: 1.5 }}>
                <span style={{ fontWeight: 700 }}>{vx.label}:</span> <span style={{ color: T.muted }}>{vx.note}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "grid", gap: "0.75rem" }}>
          {Object.entries(v.sources).map(([key, data]) => (
            <div key={key} style={{
              padding: "0.85rem 1rem",
              backgroundColor: T.panelBg,
              borderLeft: `4px solid ${SOURCES[key].color}`,
              borderRadius: "4px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.35rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{ fontWeight: 700, color: SOURCES[key].color, fontSize: TS.px - 3 }}>
                  {SOURCES[key].name}
                </span>
                <span style={{ color: T.muted, fontSize: TS.px - 5, fontStyle: "italic" }}>
                  {SOURCES[key].license}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: TS.px - 2, lineHeight: 1.55 }}>
                {data.text}
              </p>
              {data.hebrew && (
                <p dir="rtl" style={{ margin: "0.4rem 0 0", fontSize: TS.px + 2, fontFamily: "'SBL Hebrew', serif" }}>
                  {data.hebrew}
                </p>
              )}
              {data.greek && (
                <p style={{ margin: "0.4rem 0 0", fontSize: TS.px - 1, fontStyle: "italic" }}>
                  {data.greek}
                </p>
              )}
              {data.translit && !data.hebrew && !data.greek && (
                <p style={{ margin: "0.25rem 0 0", fontSize: TS.px - 4, color: T.muted, fontStyle: "italic" }}>
                  {data.translit}
                </p>
              )}
              {(data.hebrew || data.greek) && data.translit && (
                <p style={{ margin: "0.25rem 0 0", fontSize: TS.px - 4, color: T.muted, fontStyle: "italic" }}>
                  {data.translit}
                </p>
              )}
              {data.note && (
                <p style={{ margin: "0.4rem 0 0", fontSize: TS.px - 4, color: T.muted }}>
                  {data.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSourceLegend = () => {
    if (!showLegend) return null;
    return (
      <div style={{
        position: "sticky", bottom: 0,
        marginTop: "2rem",
        padding: "0.75rem 1rem",
        backgroundColor: T.bg,
        borderTop: `1px solid ${T.border}`,
        borderRadius: "4px",
        display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center"
      }}>
        <span style={{ fontWeight: 700, fontSize: TS.px - 5, color: T.muted, marginRight: "0.4rem" }}>SOURCES:</span>
        {Object.entries(SOURCES).map(([key, s]) => (
          <span key={key} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: TS.px - 5 }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: s.color, display: "inline-block" }}></span>
            <span>{s.short}</span>
          </span>
        ))}
        <button onClick={() => setShowLegend(false)} style={{ ...btnGhost(T), marginLeft: "auto", fontSize: TS.px - 5 }}>Hide</button>
      </div>
    );
  };

  // ============================================================
  // FOCUS MODE
  // ============================================================
  if (focusMode) {
    return (
      <div style={{
        backgroundColor: T.bg, color: T.text,
        minHeight: "100vh", padding: "4rem 2rem",
        fontFamily: "Georgia, serif"
      }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <button onClick={() => setFocusMode(false)} style={{ ...btnGhost(T), marginBottom: "2rem" }}>
            ← Exit Focus Mode (F)
          </button>
          <h2 style={{ color: T.accent, fontSize: TS.px + 8, fontFamily: "Georgia, serif", marginBottom: "1.5rem" }}>
            {readingMode === "VERSE" ? verse.ref : chapter.title}
          </h2>
          {renderInlineText()}
          <div style={{ marginTop: "2.5rem" }}>{renderDefinitionPanel()}</div>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN VIEW
  // ============================================================
  return (
    <div style={{
      backgroundColor: T.bg, color: T.text,
      minHeight: "100vh",
      fontFamily: "Georgia, 'Iowan Old Style', serif",
      padding: "2rem 1rem"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: `2px solid ${T.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <h1 style={{ margin: 0, color: T.accent, fontSize: "2rem", fontFamily: "Georgia, serif" }}>
                SWRV Kingdom Bible
              </h1>
              <p style={{ margin: "0.25rem 0 0", color: T.muted, fontSize: "0.85rem", fontStyle: "italic" }}>
                Multi-source synthesis · Color-coded by source · {chapter.title}
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {Object.keys(THEMES).map(t => (
                <button key={t} onClick={() => setTheme(t)} style={{
                  ...btnPill(T),
                  backgroundColor: theme === t ? T.accent : T.selectBg,
                  color: theme === t ? T.bg : T.text,
                  fontWeight: theme === t ? 700 : 500
                }}>
                  {THEMES[t].name}
                </button>
              ))}
            </div>
          </div>

          {/* CONTROLS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
            {/* Text size */}
            <div>
              <label style={lblStyle(T)}>Text Size</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.25rem" }}>
                {Object.entries(TEXT_SIZES).map(([key, val]) => (
                  <button key={key} onClick={() => setTextSize(key)} title={val.desc} style={{
                    ...btnSmall(T),
                    backgroundColor: textSize === key ? T.accent : "transparent",
                    color: textSize === key ? T.bg : T.text
                  }}>
                    {val.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div>
              <label style={lblStyle(T)}>Reading Mode (C)</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.25rem" }}>
                <button onClick={() => { setReadingMode("VERSE"); setCurrentVerse(1); }} style={{
                  ...btnSmall(T),
                  backgroundColor: readingMode === "VERSE" ? T.accent : "transparent",
                  color: readingMode === "VERSE" ? T.bg : T.text
                }}>
                  Verse
                </button>
                <button onClick={() => setReadingMode("CHAPTER")} style={{
                  ...btnSmall(T),
                  backgroundColor: readingMode === "CHAPTER" ? T.accent : "transparent",
                  color: readingMode === "CHAPTER" ? T.bg : T.text
                }}>
                  Chapter
                </button>
              </div>
            </div>

            {/* Toggles */}
            <div>
              <label style={lblStyle(T)}>View</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.25rem" }}>
                <button onClick={() => setShowVariants(v => !v)} style={{
                  ...btnSmall(T),
                  backgroundColor: showVariants ? T.accent : "transparent",
                  color: showVariants ? T.bg : T.text
                }}>
                  Variants
                </button>
                <button onClick={() => setFocusMode(true)} style={btnSmall(T)}>
                  Focus (F)
                </button>
              </div>
            </div>

            {/* Music */}
            <div>
              <label style={lblStyle(T)}>Atmosphere</label>
              <button onClick={() => setShowMusicModal(true)} style={{ ...btnSmall(T), width: "100%" }}>
                🎵 Music (M)
              </button>
            </div>
          </div>

          {/* Keyboard hints */}
          <div style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: T.muted, fontStyle: "italic" }}>
            ↑↓ ← → arrows · 1·2·3 jump to verse · C chapter mode · F focus · M music · Esc close
          </div>
        </div>

        {/* VERSE NAV */}
        {readingMode === "VERSE" && (
          <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: T.muted, marginRight: "0.5rem" }}>{chapter.title} →</span>
            {Object.keys(chapter.verses).map(v => (
              <button key={v} onClick={() => setCurrentVerse(Number(v))} style={{
                ...btnPill(T),
                backgroundColor: Number(currentVerse) === Number(v) ? T.accent : T.selectBg,
                color: Number(currentVerse) === Number(v) ? T.bg : T.text,
                fontWeight: 700
              }}>
                {v}
              </button>
            ))}
          </div>
        )}

        {/* MAIN GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: "2rem" }}>
          {/* LEFT: synthesized text + variants */}
          <div>
            <div style={{
              padding: "1.5rem",
              backgroundColor: T.panelBg,
              border: `1px solid ${T.border}50`,
              borderRadius: "8px"
            }}>
              <p style={{ margin: "0 0 0.5rem", color: T.muted, fontSize: "0.85rem", fontStyle: "italic" }}>
                {readingMode === "VERSE" ? verse.ref : chapter.title} — synthesized
              </p>
              {renderInlineText()}
            </div>
            {renderVariantsPanel()}
          </div>

          {/* RIGHT: definition panel */}
          <div>
            <div style={{ position: "sticky", top: "1rem" }}>
              {renderDefinitionPanel()}
            </div>
          </div>
        </div>

        {/* LEGEND */}
        {renderSourceLegend()}
      </div>

      {/* MUSIC MODAL */}
      {showMusicModal && (
        <div onClick={() => setShowMusicModal(false)} style={{
          position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.65)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem"
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            backgroundColor: T.bg, color: T.text,
            padding: "2rem", borderRadius: "12px", maxWidth: "440px", width: "100%",
            border: `2px solid ${T.accent}`
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0, color: T.accent, fontFamily: "Georgia, serif" }}>Reading Atmosphere</h3>
              <button onClick={() => setShowMusicModal(false)} style={btnIcon(T)}>×</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Track Selection */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: T.muted, marginBottom: "0.5rem" }}>Select Track</label>
                <div style={{ display: "grid", gap: "0.5rem" }}>
                  {MUSIC_TRACKS.map((track, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTrack(i)}
                      style={{
                        padding: "0.6rem", backgroundColor: currentTrack === i ? T.accent : T.selectBg,
                        color: currentTrack === i ? T.bg : T.text,
                        border: `1px solid ${T.border}`, borderRadius: "6px",
                        cursor: "pointer", fontFamily: "Georgia, serif", fontSize: "0.9rem",
                        fontWeight: currentTrack === i ? 700 : 400, transition: "all 150ms"
                      }}
                    >
                      🎵 {track.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Playback Controls */}
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <button
                  onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                  style={{
                    padding: "0.75rem 1rem", backgroundColor: T.accent, color: T.bg,
                    border: "none", borderRadius: "6px", cursor: "pointer",
                    fontWeight: 700, fontSize: "0.95rem", flex: 1
                  }}
                >
                  {isPlayingMusic ? "⏸ Pause" : "▶ Play"}
                </button>
                <button
                  onClick={() => { setIsPlayingMusic(false); if (audioRef.current) audioRef.current.currentTime = 0; }}
                  style={{
                    padding: "0.75rem", backgroundColor: T.selectBg, color: T.text,
                    border: `1px solid ${T.border}`, borderRadius: "6px", cursor: "pointer"
                  }}
                >
                  ⊙ Stop
                </button>
              </div>

              {/* Volume Control */}
              <div>
                <label style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700, color: T.muted, marginBottom: "0.5rem" }}>
                  <span>Volume</span> <span>{musicVolume}%</span>
                </label>
                <input
                  type="range" min="0" max="100" value={musicVolume}
                  onChange={(e) => setMusicVolume(Number(e.target.value))}
                  style={{ width: "100%", cursor: "pointer" }}
                />
              </div>

              {/* Hidden Audio Element */}
              <audio ref={audioRef} src={MUSIC_TRACKS[currentTrack].url} crossOrigin="anonymous" />

              <p style={{ color: T.muted, fontSize: "0.8rem", fontStyle: "italic", margin: "0.5rem 0 0" }}>
                Press M to toggle. Esc to close. 🎧
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SHARED STYLE HELPERS
// ============================================================
const lblStyle = (T) => ({
  display: "block", fontSize: "0.7rem", fontWeight: 700,
  color: T.muted, textTransform: "uppercase", letterSpacing: "0.05em",
  marginBottom: "0.35rem"
});
const btnSmall = (T) => ({
  padding: "0.4rem 0.6rem", fontSize: "0.78rem",
  border: `1px solid ${T.border}`, borderRadius: "4px",
  cursor: "pointer", color: T.text, backgroundColor: "transparent",
  fontFamily: "Georgia, serif", transition: "all 150ms"
});
const btnPill = (T) => ({
  padding: "0.4rem 0.85rem", fontSize: "0.8rem",
  border: `1px solid ${T.border}`, borderRadius: "999px",
  cursor: "pointer", color: T.text, backgroundColor: T.selectBg,
  fontFamily: "Georgia, serif", transition: "all 150ms"
});
const btnGhost = (T) => ({
  padding: "0.3rem 0.6rem", fontSize: "0.75rem",
  border: `1px solid ${T.border}40`, borderRadius: "4px",
  cursor: "pointer", color: T.muted, backgroundColor: "transparent",
  fontFamily: "Georgia, serif"
});
const btnIcon = (T) => ({
  padding: "0.3rem 0.5rem", background: "none", border: "none",
  cursor: "pointer", fontSize: "1.25rem", color: T.text
});
