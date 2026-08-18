// Scans every verse in the Bible for words that ARE headwords in the
// dictionary (window.DEFINITIONS / window.ENGLISH_BIBLE_DICT) but wouldn't
// get underlined for that verse — either the static v.definableWords list
// nor the app's own live-augmentation pass (see getAugmentedDefinables in
// js/app.js) would catch them, most commonly because the Bible text uses an
// inflected form ("loved") of a dictionary lemma ("love"). This never blocks
// a deploy (see deploy.yml's continue-on-error on this step) — it just
// writes a report so overlooked words surface instead of staying silent.
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = { window: {}, console };
vm.createContext(sandbox);

function loadIntoSandbox(file) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
}

loadIntoSandbox(path.join(root, 'data/definitions.js'));
loadIntoSandbox(path.join(root, 'data/english-bible-dictionary.js'));

const bibleDir = path.join(root, 'data/bible');
for (const f of fs.readdirSync(bibleDir).filter((f) => f.endsWith('.js'))) {
  loadIntoSandbox(path.join(bibleDir, f));
}

const DEFINITIONS = sandbox.window.DEFINITIONS || {};
const DICT = sandbox.window.ENGLISH_BIBLE_DICT || {};
const BIBLE = sandbox.window.BIBLE || {};

// Mirrors js/app.js's SWRV_STOP_WORDS / _normalizeWordToken / _definitionExists
// / _deepDictHeadword — same rules the app itself uses to decide "is this
// word definable", so this audit reports the same thing the app would.
const STOP = new Set(
  'a an the and or but if then than to of in on at by for from with without into unto under over as is are was were be been being have has had do does did will would shall should may might can could i you he she it we they them his her their our your my me us this that these those there here not no yes so'.split(
    ' '
  )
);

function normalize(tok) {
  return String(tok || '')
    .replace(/[.,;:!?"'`’‘“”\-—()[\]{}]/g, '')
    .trim();
}
function definitionExists(word) {
  if (!word || word.length < 3) return false;
  if (STOP.has(word.toLowerCase())) return false;
  return !!(DEFINITIONS[word] || DEFINITIONS[word.toLowerCase()]);
}
function deepDictHeadword(word) {
  if (!word) return false;
  if (STOP.has(String(word).toLowerCase())) return false;
  const e = DICT[word] || DICT[String(word).toLowerCase()];
  if (!e) return false;
  return String(e.word || '').toLowerCase() === String(word).toLowerCase();
}
function isDirectlyDefinable(word) {
  return definitionExists(word) || deepDictHeadword(word);
}

// Common English suffixes stripped so an inflected Bible-text word can be
// matched back to the dictionary's lemma-shaped headword.
function lemmaCandidates(word) {
  const w = word.toLowerCase();
  const out = new Set();
  if (/ies$/.test(w)) out.add(w.slice(0, -3) + 'y');
  if (/ed$/.test(w)) {
    out.add(w.slice(0, -2));
    out.add(w.slice(0, -1));
  }
  if (/ing$/.test(w)) {
    out.add(w.slice(0, -3));
    out.add(w.slice(0, -3) + 'e');
  }
  if (/es$/.test(w)) out.add(w.slice(0, -2));
  if (/s$/.test(w) && w.length > 3) out.add(w.slice(0, -1));
  out.delete(w);
  return Array.from(out);
}

let versesScanned = 0;
let liveMatchedTokens = 0;
let overlookedTokens = 0;
const overlookedWordCounts = {};
const sampleReferences = [];

for (const book of Object.keys(BIBLE)) {
  const chapters = BIBLE[book];
  for (const chNum of Object.keys(chapters)) {
    const verses = chapters[chNum].verses || {};
    for (const vNum of Object.keys(verses)) {
      const v = verses[vNum];
      versesScanned++;
      const text = String(v.synthesized || v.text || '');
      const already = new Set((v.definableWords || []).filter(Boolean).map(String));
      const tokens = text.split(/\s+/).map(normalize).filter(Boolean);
      for (const tok of tokens) {
        if (already.has(tok) || already.has(tok.toLowerCase())) continue;
        if (isDirectlyDefinable(tok)) {
          liveMatchedTokens++;
          continue;
        }
        let matchedLemma = null;
        for (const cand of lemmaCandidates(tok)) {
          if (isDirectlyDefinable(cand)) {
            matchedLemma = cand;
            break;
          }
        }
        if (matchedLemma) {
          overlookedTokens++;
          overlookedWordCounts[matchedLemma] = (overlookedWordCounts[matchedLemma] || 0) + 1;
          if (sampleReferences.length < 300) {
            sampleReferences.push({ ref: v.ref, word: tok, matchedLemma });
          }
        }
      }
    }
  }
}

const topOverlookedWords = Object.entries(overlookedWordCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 60);

const report = {
  generatedAt: new Date().toISOString(),
  versesScanned,
  liveMatchedTokens,
  overlookedTokens,
  topOverlookedWords,
  sampleReferences,
};

fs.writeFileSync(path.join(root, 'dictionary-coverage-report.json'), JSON.stringify(report, null, 2));

console.log(
  `Dictionary coverage: ${versesScanned} verses scanned, ${liveMatchedTokens} tokens directly definable, ` +
    `${overlookedTokens} likely-overlooked inflected tokens (see dictionary-coverage-report.json).`
);
if (topOverlookedWords.length) {
  console.log('Top overlooked lemmas: ' + topOverlookedWords.slice(0, 15).map(([w, c]) => `${w}:${c}`).join(', '));
}
