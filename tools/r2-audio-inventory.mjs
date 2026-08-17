// BSB audio Bible inventory checker.
//
// Walks every page of the Worker's /api/debug/r2-list route for both audio
// prefixes and prints a COMPACT report — one line per book plus a summary —
// instead of dumping ~2,000 raw keys into the job log. Verifies each book's
// chapter count against the standard Protestant canon and reports the exact
// missing chapter numbers when a book is short, so a partial or failed
// upload is obvious rather than something that silently ships broken.
//
// Run from the deploy workflow (see .github/workflows/deploy.yml). Temporary,
// same lifetime as the /api/debug/r2-list route it calls.

const BASE = process.env.INVENTORY_BASE
  || 'https://swrv-on-bs-bible.swrvonthego.workers.dev/api/debug/r2-list';
const PREFIXES = ['ENGBERO1DA/', 'ENGBERN1DA/'];

// Standard Protestant canon chapter counts, keyed by the 3-letter code
// Faith Comes By Hearing uses in its filenames, in canonical order. OT codes
// below were taken from the actual uploaded files, not assumed.
const OT_BOOKS = [
  ['GEN', 50], ['EXO', 40], ['LEV', 27], ['NUM', 36], ['DEU', 34], ['JOS', 24],
  ['JDG', 21], ['RUT', 4], ['1SA', 31], ['2SA', 24], ['1KI', 22], ['2KI', 25],
  ['1CH', 29], ['2CH', 36], ['EZR', 10], ['NEH', 13], ['EST', 10], ['JOB', 42],
  ['PSA', 150], ['PRO', 31], ['ECC', 12], ['SNG', 8], ['ISA', 66], ['JER', 52],
  ['LAM', 5], ['EZK', 48], ['DAN', 12], ['HOS', 14], ['JOL', 3], ['AMO', 9],
  ['OBA', 1], ['JON', 4], ['MIC', 7], ['NAM', 3], ['HAB', 3], ['ZEP', 3],
  ['HAG', 2], ['ZEC', 14], ['MAL', 4],
];
const NT_BOOKS = [
  ['MAT', 28], ['MRK', 16], ['LUK', 24], ['JHN', 21], ['ACT', 28], ['ROM', 16],
  ['1CO', 16], ['2CO', 13], ['GAL', 6], ['EPH', 6], ['PHP', 4], ['COL', 4],
  ['1TH', 5], ['2TH', 3], ['1TI', 6], ['2TI', 4], ['TIT', 3], ['PHM', 1],
  ['HEB', 13], ['JAS', 5], ['1PE', 5], ['2PE', 3], ['1JN', 5], ['2JN', 1],
  ['3JN', 1], ['JUD', 1], ['REV', 22],
];
const EXPECTED = Object.fromEntries([...OT_BOOKS, ...NT_BOOKS]);

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

function analyze(objects) {
  const books = new Map();
  const unparsed = [];
  let bytes = 0;
  for (const o of objects) {
    bytes += o.size || 0;
    const m = /_([AB]\d\d)_([A-Z0-9]{3})_(\d+)\.mp3$/.exec(o.key);
    if (!m) { if (!o.key.endsWith('/')) unparsed.push(o.key); continue; }
    const [, num, code, ch] = m;
    const key = `${num}:${code}`;
    if (!books.has(key)) books.set(key, { num, code, chapters: new Set() });
    books.get(key).chapters.add(Number(ch));
  }
  return { books, unparsed, bytes };
}

function missingFrom(found, expected) {
  const gaps = [];
  for (let i = 1; i <= expected; i++) if (!found.has(i)) gaps.push(i);
  return gaps;
}

let problems = 0;
for (const prefix of PREFIXES) {
  console.log('='.repeat(64));
  console.log(`FOLDER ${prefix}`);
  console.log('='.repeat(64));

  let objects;
  try {
    objects = await listAll(prefix);
  } catch (err) {
    console.log(`  ERROR: ${err.message}`);
    problems++;
    continue;
  }

  const { books, unparsed, bytes } = analyze(objects);
  const testaments = new Set([...books.values()].map(b => b.num[0]));
  console.log(`  files: ${objects.length}   size: ${(bytes / 1e9).toFixed(2)} GB   books: ${books.size}`);
  console.log(`  testament letters present: ${[...testaments].join(', ') || '(none)'}`);

  const sorted = [...books.values()].sort((a, b) => a.num.localeCompare(b.num));
  for (const b of sorted) {
    const expected = EXPECTED[b.code];
    const found = b.chapters.size;
    if (expected === undefined) {
      console.log(`  ${b.num} ${b.code.padEnd(3)}  ${found} chapters  UNRECOGNIZED BOOK CODE`);
      problems++;
      continue;
    }
    if (found === expected) continue; // complete books stay quiet
    const gaps = missingFrom(b.chapters, expected);
    console.log(`  ${b.num} ${b.code.padEnd(3)}  ${found}/${expected} chapters  MISSING: ${gaps.slice(0, 20).join(',')}${gaps.length > 20 ? ` (+${gaps.length - 20} more)` : ''}`);
    problems++;
  }

  // A book that's entirely absent never appears in `books` at all, so it has
  // to be checked against the expected canon rather than against what was
  // found — otherwise a whole missing testament reads as "no problems here",
  // which is exactly how a folder holding zero New Testament files first got
  // mistaken for a complete upload.
  const present = new Set(sorted.map(b => b.code));
  const expectedSets = [];
  if (testaments.has('A')) expectedSets.push(['Old Testament', OT_BOOKS]);
  if (testaments.has('B')) expectedSets.push(['New Testament', NT_BOOKS]);
  for (const [label, list] of expectedSets) {
    const absent = list.filter(([code]) => !present.has(code)).map(([code]) => code);
    if (absent.length) {
      console.log(`  ${label}: ${absent.length} book(s) COMPLETELY ABSENT: ${absent.join(', ')}`);
      problems++;
    }
  }
  if (!expectedSets.length) {
    console.log('  WARNING: no recognizable A## (OT) or B## (NT) book files in this folder at all');
    problems++;
  }

  const complete = sorted.filter(b => EXPECTED[b.code] !== undefined && b.chapters.size === EXPECTED[b.code]).length;
  console.log(`  complete books: ${complete}/${books.size}`);
  if (unparsed.length) {
    console.log(`  unparsed keys (${unparsed.length}): ${unparsed.slice(0, 5).join(', ')}`);
    problems++;
  }
}

console.log('='.repeat(64));
console.log(problems === 0
  ? 'INVENTORY OK — every book present with its full chapter count.'
  : `INVENTORY FOUND ${problems} issue(s) — see above.`);
