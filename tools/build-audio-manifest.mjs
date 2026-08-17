// Validates the BSB audio Bible in R2 and builds the manifest the app reads.
//
// Runs in the deploy workflow. Lists every real object key (via the Worker's
// /api/debug/r2-list route — Wrangler has no `r2 object list`), verifies each
// book against the standard Protestant canon, then emits
// bsb-audio-manifest.json mapping app book name -> chapter -> R2 key.
//
// The manifest is built from ACTUAL keys, never from an assumed filename
// pattern, so a naming difference between the two testament packages can't
// silently produce a manifest full of URLs that 404.
//
// Exits non-zero on any validation failure so a broken/partial upload can't
// quietly produce a manifest that looks fine.

import { writeFileSync } from 'node:fs';

const BASE = process.env.INVENTORY_BASE
  || 'https://swrv-on-bs-bible.swrvonthego.workers.dev/api/debug/r2-list';
const PREFIXES = ['ENGBERO1DA/', 'ENGBERN1DA/'];
const OUT = process.env.MANIFEST_OUT || 'bsb-audio-manifest.json';

// [FCBH 3-letter code, chapter count, app's own book key]. The app keys match
// window.BIBLE / data/bible/*.js exactly, so wiring playback to the reader is
// a direct lookup rather than another name-normalizing layer.
const OT_BOOKS = [
  ['GEN', 50, 'Genesis'], ['EXO', 40, 'Exodus'], ['LEV', 27, 'Leviticus'],
  ['NUM', 36, 'Numbers'], ['DEU', 34, 'Deuteronomy'], ['JOS', 24, 'Joshua'],
  ['JDG', 21, 'Judges'], ['RUT', 4, 'Ruth'], ['1SA', 31, '1Samuel'],
  ['2SA', 24, '2Samuel'], ['1KI', 22, '1Kings'], ['2KI', 25, '2Kings'],
  ['1CH', 29, '1Chronicles'], ['2CH', 36, '2Chronicles'], ['EZR', 10, 'Ezra'],
  ['NEH', 13, 'Nehemiah'], ['EST', 10, 'Esther'], ['JOB', 42, 'Job'],
  ['PSA', 150, 'Psalms'], ['PRO', 31, 'Proverbs'], ['ECC', 12, 'Ecclesiastes'],
  ['SNG', 8, 'SongofSolomon'], ['ISA', 66, 'Isaiah'], ['JER', 52, 'Jeremiah'],
  ['LAM', 5, 'Lamentations'], ['EZK', 48, 'Ezekiel'], ['DAN', 12, 'Daniel'],
  ['HOS', 14, 'Hosea'], ['JOL', 3, 'Joel'], ['AMO', 9, 'Amos'],
  ['OBA', 1, 'Obadiah'], ['JON', 4, 'Jonah'], ['MIC', 7, 'Micah'],
  ['NAM', 3, 'Nahum'], ['HAB', 3, 'Habakkuk'], ['ZEP', 3, 'Zephaniah'],
  ['HAG', 2, 'Haggai'], ['ZEC', 14, 'Zechariah'], ['MAL', 4, 'Malachi'],
];
const NT_BOOKS = [
  ['MAT', 28, 'Matthew'], ['MRK', 16, 'Mark'], ['LUK', 24, 'Luke'],
  ['JHN', 21, 'John'], ['ACT', 28, 'Acts'], ['ROM', 16, 'Romans'],
  ['1CO', 16, '1Corinthians'], ['2CO', 13, '2Corinthians'], ['GAL', 6, 'Galatians'],
  ['EPH', 6, 'Ephesians'], ['PHP', 4, 'Philippians'], ['COL', 4, 'Colossians'],
  ['1TH', 5, '1Thessalonians'], ['2TH', 3, '2Thessalonians'], ['1TI', 6, '1Timothy'],
  ['2TI', 4, '2Timothy'], ['TIT', 3, 'Titus'], ['PHM', 1, 'Philemon'],
  ['HEB', 13, 'Hebrews'], ['JAS', 5, 'James'], ['1PE', 5, '1Peter'],
  ['2PE', 3, '2Peter'], ['1JN', 5, '1John'], ['2JN', 1, '2John'],
  ['3JN', 1, '3John'], ['JUD', 1, 'Jude'], ['REV', 22, 'Revelation'],
];
const BY_CODE = new Map([...OT_BOOKS, ...NT_BOOKS].map(([c, n, app]) => [c, { chapters: n, app }]));

async function listAll(prefix) {
  const objects = [];
  let cursor = '';
  for (let page = 0; page < 40; page++) {
    let url = `${BASE}?prefix=${encodeURIComponent(prefix)}`;
    if (cursor) url += `&cursor=${encodeURIComponent(cursor)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`listing failed for ${prefix}: HTTP ${res.status}`);
    const data = await res.json();
    objects.push(...(data.objects || []));
    if (!data.truncated) return objects;
    cursor = data.cursor;
  }
  throw new Error(`listing for ${prefix} did not terminate within the page cap`);
}

let problems = 0;
const books = new Map(); // app book name -> { code, testament, chapters: {n: {key,size}} }
let totalBytes = 0;

for (const prefix of PREFIXES) {
  console.log('='.repeat(64));
  console.log(`FOLDER ${prefix}`);
  const objects = await listAll(prefix);
  const seenCodes = new Set();
  let bytes = 0;
  let unparsed = 0;

  for (const o of objects) {
    if (o.key.endsWith('/')) continue; // folder placeholder object
    const m = /_([AB])(\d\d)_([A-Z0-9]{3})_(\d+)\.mp3$/.exec(o.key);
    if (!m) { unparsed++; continue; }
    const [, letter, , code, ch] = m;
    const meta = BY_CODE.get(code);
    if (!meta) { console.log(`  UNRECOGNIZED BOOK CODE: ${o.key}`); problems++; continue; }
    seenCodes.add(code);
    bytes += o.size || 0;
    if (!books.has(meta.app)) {
      books.set(meta.app, { code, testament: letter === 'A' ? 'OT' : 'NT', chapters: {} });
    }
    const entry = books.get(meta.app);
    const n = Number(ch);
    if (entry.chapters[n]) {
      console.log(`  DUPLICATE chapter ${meta.app} ${n}: ${entry.chapters[n].key} vs ${o.key}`);
      problems++;
    }
    entry.chapters[n] = { key: o.key, size: o.size || 0 };
  }

  totalBytes += bytes;
  console.log(`  files: ${objects.length}  size: ${(bytes / 1e9).toFixed(2)} GB  books: ${seenCodes.size}`);
  if (unparsed) { console.log(`  unparsed keys: ${unparsed}`); problems++; }
}

// Validate against the canon: every book present, every chapter present.
console.log('='.repeat(64));
for (const [code, meta] of BY_CODE) {
  const entry = books.get(meta.app);
  if (!entry) { console.log(`  MISSING ENTIRELY: ${meta.app} (${code})`); problems++; continue; }
  const gaps = [];
  for (let i = 1; i <= meta.chapters; i++) if (!entry.chapters[i]) gaps.push(i);
  const extra = Object.keys(entry.chapters).map(Number).filter(n => n > meta.chapters);
  if (gaps.length) { console.log(`  ${meta.app}: missing chapters ${gaps.slice(0, 20).join(',')}`); problems++; }
  if (extra.length) { console.log(`  ${meta.app}: unexpected chapters ${extra.join(',')}`); problems++; }
}

const manifest = {
  translation: 'Berean Standard Bible (BSB)',
  license: 'Public Domain',
  source: 'Faith Comes By Hearing',
  // The app's OT text is JPS 1917 while this audio is BSB, so OT audio lines
  // up at chapter level only. NT text and audio are both BSB and match
  // word-for-word. Recorded here so the sync layer can't assume otherwise.
  textAlignment: { OT: 'chapter-level (app OT text is JPS 1917, audio is BSB)', NT: 'word-for-word (both BSB)' },
  totalBooks: books.size,
  totalChapters: [...books.values()].reduce((a, b) => a + Object.keys(b.chapters).length, 0),
  totalBytes,
  books: Object.fromEntries([...books].map(([app, v]) => [app, {
    code: v.code,
    testament: v.testament,
    chapterCount: Object.keys(v.chapters).length,
    chapters: Object.fromEntries(
      Object.keys(v.chapters).map(Number).sort((a, b) => a - b).map(n => [n, v.chapters[n].key])
    ),
  }])),
};

console.log(`  books: ${manifest.totalBooks}/66   chapters: ${manifest.totalChapters}/1189   size: ${(totalBytes / 1e9).toFixed(2)} GB`);

if (problems) {
  console.log(`MANIFEST NOT WRITTEN — ${problems} validation problem(s) above.`);
  process.exit(1);
}
writeFileSync(OUT, JSON.stringify(manifest));
console.log(`MANIFEST OK — wrote ${OUT}`);
