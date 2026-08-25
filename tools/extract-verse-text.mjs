// Extracts the BSB verse text for a given book+chapter, in verse order.
//
// Alignment only works if the text handed to the aligner is the text that was
// actually SPOKEN. The audio is BSB throughout, so this deliberately reads
// v.sources.BSB.text and nothing else — falling back to the app's display
// text would feed JPS 1917 wording against BSB audio for the whole Old
// Testament and produce silently garbage timings.
//
// Usage: node tools/extract-verse-text.mjs <BookKey> <chapter> [--plain]
//   default   -> JSON {book, chapter, verses:[{n, text}]}
//   --plain   -> one verse per line (the fragment format aligners expect)

import { readFileSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';

const ROOT = new URL('..', import.meta.url).pathname;

export function loadBook(bookKey) {
  const file = bookKey === 'Genesis'
    ? `${ROOT}data/genesis.js`
    : `${ROOT}data/bible/${bookKey}.js`;
  const src = readFileSync(file, 'utf8');
  const sandbox = { window: {} };
  createContext(sandbox);
  runInContext(src, sandbox, { filename: bookKey });
  return bookKey === 'Genesis' ? sandbox.window.GENESIS : sandbox.window.BIBLE[bookKey];
}

// Spoken-form normalization. The narrator reads words, not typography — so
// collapse the things that would otherwise be handed to a TTS front-end as
// literal characters and skew the DTW alignment.
export function spokenText(raw) {
  return String(raw || '')
    .replace(/\[[^\]]*\]/g, ' ')   // editorial brackets are not read aloud
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/—/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function chapterVerses(bookKey, chapter) {
  const book = loadBook(bookKey);
  const ch = book?.[String(chapter)];
  if (!ch) throw new Error(`no chapter ${chapter} in ${bookKey}`);
  const nums = Object.keys(ch.verses || {}).map(Number).sort((a, b) => a - b);
  const out = [];
  for (const n of nums) {
    const v = ch.verses[String(n)];
    const bsb = v?.sources?.BSB?.text;
    // A verse with no BSB text is one the BSB translation omits outright
    // (e.g. Mark 9:44/46, Acts 8:37 — the well-known critical-text
    // omissions) — the BSB audio narration never speaks it either. Feeding
    // the aligner a fallback (KJV/synthesized) line for a verse that isn't
    // actually in the recording used to be the fix here, but that's exactly
    // backwards: it hands the aligner text for audio that doesn't exist,
    // which silently shifts every subsequent verse's timing by one for the
    // rest of the chapter. Skip it — buildRows() below carries the real
    // verse number `n` alongside each timing, so a gap here no longer
    // corrupts anything downstream.
    if (!bsb) continue;
    const text = spokenText(bsb);
    if (!text) continue;
    out.push({ n, text, bsb: true });
  }
  return out;
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const [bookKey, chapter, flag] = process.argv.slice(2);
  if (!bookKey || !chapter) {
    console.error('usage: node tools/extract-verse-text.mjs <BookKey> <chapter> [--plain]');
    process.exit(2);
  }
  const verses = chapterVerses(bookKey, Number(chapter));
  if (flag === '--plain') {
    console.log(verses.map(v => v.text).join('\n'));
  } else {
    console.log(JSON.stringify({ book: bookKey, chapter: Number(chapter), verses }));
  }
}
