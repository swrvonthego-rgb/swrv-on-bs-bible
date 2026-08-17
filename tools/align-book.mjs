// Forced-aligns every chapter of ONE book and writes its per-verse timings.
//
// Run per book (the alignment workflow matrixes over all 66) so a single
// failure is contained to one book, and so ~86 hours of audio can be worked
// through in parallel rather than serially.
//
// Audio comes over HTTPS from the already-public /api/audio-bible/ route
// rather than through wrangler: wrangler costs ~1s of process startup per
// object, which across 1,189 chapters is ~20 minutes of pure overhead.
//
// Usage: node tools/align-book.mjs <BookKey> [outDir]

import { writeFileSync, mkdirSync, existsSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { chapterVerses } from './extract-verse-text.mjs';

const BASE = process.env.AUDIO_BASE
  || 'https://swrv-on-bs-bible.swrvonthego.workers.dev';
const MANIFEST_URL = `${BASE}/data/bsb-audio-manifest.json`;

const book = process.argv[2];
const outDir = process.argv[3] || 'bsb-timings';
if (!book) { console.error('usage: node tools/align-book.mjs <BookKey> [outDir]'); process.exit(2); }

const TMP_AUDIO = 'chapter.tmp.mp3';
const TMP_TEXT = 'chapter.tmp.txt';
const TMP_ALIGN = 'chapter.tmp.json';

async function fetchWithRetry(url, tries = 4) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (err) {
      lastErr = err;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
  throw lastErr;
}

const manifest = await (await fetch(MANIFEST_URL)).json();
const entry = manifest.books?.[book];
if (!entry) { console.error(`no manifest entry for ${book}`); process.exit(1); }

const chapters = Object.keys(entry.chapters).map(Number).sort((a, b) => a - b);
console.log(`${book}: ${chapters.length} chapters to align`);

const result = { book, code: entry.code, testament: entry.testament, chapters: {} };
const failures = [];
let alignedChapters = 0, alignedVerses = 0;

for (const ch of chapters) {
  const key = entry.chapters[String(ch)];
  let verses;
  try {
    verses = chapterVerses(book, ch);
  } catch (err) {
    failures.push(`${book} ${ch}: text extraction failed (${err.message})`);
    continue;
  }
  if (!verses.length) { failures.push(`${book} ${ch}: no verse text`); continue; }

  try {
    const audio = await fetchWithRetry(`${BASE}/api/audio-bible/${key.split('/').map(encodeURIComponent).join('/')}`);
    writeFileSync(TMP_AUDIO, audio);
    writeFileSync(TMP_TEXT, verses.map(v => v.text).join('\n'));

    execFileSync('python', [
      '-m', 'aeneas.tools.execute_task',
      TMP_AUDIO, TMP_TEXT,
      'task_language=eng|is_text_type=plain|os_task_file_format=json',
      TMP_ALIGN,
    ], { stdio: ['ignore', 'ignore', 'pipe'], timeout: 15 * 60 * 1000 });

    const frags = JSON.parse(execFileSync('cat', [TMP_ALIGN]).toString()).fragments || [];
    // A count mismatch means every later verse is shifted — that is worse
    // than having no timings for the chapter, so reject rather than ship it.
    if (frags.length !== verses.length) {
      failures.push(`${book} ${ch}: ${frags.length} fragments vs ${verses.length} verses`);
      continue;
    }
    const rows = frags.map(f => [Math.round(Number(f.begin) * 100) / 100, Math.round(Number(f.end) * 100) / 100]);
    // Cheap ordering guard; a non-monotonic result signals a bad align.
    let bad = false;
    for (let i = 0; i < rows.length; i++) {
      if (!(rows[i][1] > rows[i][0])) bad = true;
      if (i > 0 && rows[i][0] + 0.01 < rows[i - 1][1]) bad = true;
    }
    if (bad) { failures.push(`${book} ${ch}: non-monotonic or empty spans`); continue; }

    result.chapters[String(ch)] = rows;
    alignedChapters++;
    alignedVerses += rows.length;
    if (alignedChapters % 10 === 0) console.log(`  ...${alignedChapters}/${chapters.length} chapters`);
  } catch (err) {
    const msg = (err.stderr && err.stderr.toString().trim().split('\n').pop()) || err.message;
    failures.push(`${book} ${ch}: ${String(msg).slice(0, 160)}`);
  } finally {
    for (const f of [TMP_AUDIO, TMP_TEXT, TMP_ALIGN]) if (existsSync(f)) unlinkSync(f);
  }
}

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/${book}.json`, JSON.stringify(result));

console.log(`${book}: aligned ${alignedChapters}/${chapters.length} chapters, ${alignedVerses} verses`);
if (failures.length) {
  console.log(`${book}: ${failures.length} chapter(s) not aligned:`);
  for (const f of failures.slice(0, 25)) console.log('  ' + f);
}
// A book with zero aligned chapters is a real failure; partial coverage is
// acceptable and the client simply falls back to plain playback there.
process.exit(alignedChapters === 0 ? 1 : 0);
