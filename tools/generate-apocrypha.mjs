#!/usr/bin/env node
/**
 * generate-apocrypha.mjs
 *
 * Downloads the Brenton Septuagint Translation (1851, public domain) from
 * eBible.org in USFM format, then writes:
 *
 *   data/apocrypha-wisdom.js   — Wisdom of Solomon (19 chapters)
 *   data/apocrypha-sirach.js   — Sirach / Ecclesiasticus (prologue + 51 chapters)
 *
 * Usage (run from the project root):
 *   node tools/generate-apocrypha.mjs
 *
 * Requirements: Node 18+, system `unzip` command.
 * No npm packages needed.
 *
 * Source: https://ebible.org/Scriptures/eng-Brenton_usfm.zip
 * License: Brenton LXX 1851 — public domain
 */

import {
  createWriteStream, existsSync, mkdirSync,
  readFileSync, writeFileSync,
} from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { pipeline } from 'stream/promises';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..');
const DATA  = join(ROOT, 'data');
const CACHE = join(ROOT, '.apocrypha-cache');

const USFM_ZIP_URL = 'https://ebible.org/Scriptures/eng-Brenton_usfm.zip';

// ─────────────────────────────────────────────────────────────────────────────
// 1. Download
// ─────────────────────────────────────────────────────────────────────────────

async function downloadZip(url, destPath) {
  console.log(`Downloading ${url} …`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const fileStream = createWriteStream(destPath);
  await pipeline(res.body, fileStream);
  console.log(`Saved to ${destPath}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Extract USFM files for WIS and SIR
// ─────────────────────────────────────────────────────────────────────────────

function extractBooks(zipPath, outDir, bookCodes) {
  mkdirSync(outDir, { recursive: true });
  const listing = execSync(`unzip -l "${zipPath}"`, { encoding: 'utf8' });

  for (const code of bookCodes) {
    const re    = new RegExp(`(\\S*${code}\\S*\\.usfm)`, 'i');
    const match = listing.match(re);
    if (!match) {
      throw new Error(
        `Cannot find ${code}.usfm inside ${zipPath}.\nZip contents:\n${listing}`
      );
    }
    const nameInZip = match[1];
    execSync(`unzip -o "${zipPath}" "${nameInZip}" -d "${outDir}"`, { stdio: 'pipe' });
    console.log(`Extracted: ${nameInZip}`);
  }
}

function findExtracted(outDir, code) {
  const files = execSync(`ls "${outDir}"`, { encoding: 'utf8' })
    .trim().split('\n');
  const f = files.find(n => n.toUpperCase().includes(code.toUpperCase()));
  if (!f) throw new Error(`Cannot find ${code} USFM file in ${outDir}. Files: ${files.join(', ')}`);
  return join(outDir, f);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. USFM parser
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Strip inline character-style markup (\nd, \wj, \add, etc.) while keeping
 * the wrapped text. Closing markers end with *.
 */
function stripCharStyles(s) {
  return s
    .replace(/\\[a-z]+\d*\s/g, '')   // opening: \nd , \wj , etc.
    .replace(/\\[a-z]+\d*\*/g, '');  // closing: \nd* \wj* etc.
}

/**
 * Parse a USFM file into:
 *   { "1": { "1": "verse text", "2": "...", … }, "2": { … }, … }
 *
 * Handles \c, \v, paragraph/poetry markers, and continuation lines.
 */
function parseUsfm(text) {
  const result  = {};
  const lines   = text.replace(/\r\n/g, '\n').split('\n');

  let chapter = null;
  let verse   = null;
  let buf     = '';

  function flush() {
    if (chapter !== null && verse !== null) {
      const clean = buf.trim().replace(/\s+/g, ' ');
      if (clean) {
        if (!result[chapter]) result[chapter] = {};
        result[chapter][verse] = clean;
      }
    }
    buf = '';
  }

  for (const raw of lines) {
    const line = raw.trim();

    // Chapter marker
    const cMatch = line.match(/^\\c\s+(\d+)/);
    if (cMatch) {
      flush();
      chapter = cMatch[1];
      verse   = null;
      continue;
    }

    // Verse marker — may carry inline text after the number
    const vMatch = line.match(/^\\v\s+(\d+)\s*(.*)/);
    if (vMatch) {
      flush();
      verse = vMatch[1];
      buf   = stripCharStyles(vMatch[2]);
      continue;
    }

    // Block-level markers (\p, \m, \q1, \q2, \li, \b …) carry no text
    // themselves but signal a layout break; we insert a space so words
    // that continue on the next content line don't merge with the prior word.
    if (/^\\(p|m|pi\d?|q\d?|b|li\d?)\s*$/.test(line)) {
      if (verse !== null) buf += ' ';
      continue;
    }

    // Any other marker line (\s1, \ms, \r, \d …): if we are inside a verse
    // and the line has non-marker text, accumulate it.
    if (line.startsWith('\\')) {
      if (verse !== null) {
        const rest = stripCharStyles(line.replace(/^\\[a-z]+\d*\s*/, ''));
        if (rest.trim()) buf += ' ' + rest;
      }
      continue;
    }

    // Plain continuation text
    if (verse !== null && line) {
      buf += ' ' + stripCharStyles(line);
    }
  }
  flush();

  return result;
}

/**
 * Sirach has a prose Prologue before \c 1.
 * In the eBible Brenton USFM it is marked with \v numbers; if not, we split
 * it into sentences and number them ourselves.
 */
function parseSirach(text) {
  const c1Pos  = text.search(/\\c\s+1\b/);
  const before = c1Pos > 0 ? text.slice(0, c1Pos) : '';
  const after  = c1Pos > 0 ? text.slice(c1Pos)    : text;

  const main = parseUsfm(after);

  // Try to find \v markers inside the prologue section
  const vMatches = [...before.matchAll(/\\v\s+(\d+)\s+([\s\S]*?)(?=\\v\s+\d+|\\c\s+\d+|$)/g)];

  const prologueVerses = {};
  if (vMatches.length > 0) {
    for (const m of vMatches) {
      const num  = m[1];
      const vtxt = stripCharStyles(m[2])
        .replace(/\\[a-z]+\d*\s*/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (vtxt) prologueVerses[num] = vtxt;
    }
  } else if (before.trim()) {
    // No \v markers — strip all USFM from prologue and treat as prose
    const clean = before
      .replace(/\\[a-z]+\d*\*/g, '')
      .replace(/\\[a-z]+\d*\s*/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (clean) prologueVerses['1'] = clean;
  }

  const result = {};
  if (Object.keys(prologueVerses).length > 0) {
    result['prologue'] = prologueVerses;
  }
  Object.assign(result, main);
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. JS emitter
// ─────────────────────────────────────────────────────────────────────────────

function escapeStr(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function emitJs(windowVar, comment, data) {
  const out      = [];
  const chapters = Object.keys(data);

  out.push(`// ${comment}`);
  out.push(`window.${windowVar} = {`);

  chapters.forEach((ch, ci) => {
    const verses     = data[ch];
    const verseKeys  = Object.keys(verses);
    const chTrail    = ci < chapters.length - 1 ? ',' : '';

    out.push(`  "${ch}": {`);
    verseKeys.forEach((v, vi) => {
      const trail = vi < verseKeys.length - 1 ? ',' : '';
      out.push(`    "${v}": "${escapeStr(verses[v])}"${trail}`);
    });
    out.push(`  }${chTrail}`);
  });

  out.push('};');
  return out.join('\n') + '\n';
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Main
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  mkdirSync(CACHE, { recursive: true });

  const zipPath = join(CACHE, 'brenton.zip');
  if (existsSync(zipPath)) {
    console.log(`Using cached zip: ${zipPath}`);
  } else {
    await downloadZip(USFM_ZIP_URL, zipPath);
  }

  const usfmDir = join(CACHE, 'usfm');
  extractBooks(zipPath, usfmDir, ['WIS', 'SIR']);

  const wisPath = findExtracted(usfmDir, 'WIS');
  const sirPath = findExtracted(usfmDir, 'SIR');

  console.log('Parsing Wisdom of Solomon …');
  const wisData = parseUsfm(readFileSync(wisPath, 'utf8'));

  console.log('Parsing Sirach …');
  const sirData = parseSirach(readFileSync(sirPath, 'utf8'));

  // Sanity checks
  const wisChapters = Object.keys(wisData).filter(k => k !== 'prologue');
  const sirChapters = Object.keys(sirData).filter(k => k !== 'prologue');
  console.log(`  Wisdom: ${wisChapters.length} chapters`);
  console.log(`  Sirach: ${sirChapters.length} chapters` +
    (sirData.prologue
      ? ` + prologue (${Object.keys(sirData.prologue).length} verse-blocks)`
      : ''));

  if (wisChapters.length !== 19)
    console.warn(`  ⚠  Expected 19 chapters for Wisdom, got ${wisChapters.length}`);
  if (sirChapters.length !== 51)
    console.warn(`  ⚠  Expected 51 chapters for Sirach, got ${sirChapters.length}`);

  // Emit
  const wisJs = emitJs(
    'WISDOM',
    'Wisdom of Solomon — Brenton Septuagint Translation (1851, public domain)',
    wisData
  );
  const sirJs = emitJs(
    'SIRACH',
    'Sirach (Ecclesiasticus) — Brenton Septuagint Translation (1851, public domain)',
    sirData
  );

  const wisOut = join(DATA, 'apocrypha-wisdom.js');
  const sirOut = join(DATA, 'apocrypha-sirach.js');

  writeFileSync(wisOut, wisJs, 'utf8');
  writeFileSync(sirOut, sirJs, 'utf8');

  console.log(`\nWrote: ${wisOut}`);
  console.log(`Wrote: ${sirOut}`);
  console.log('\nSpot-check a few verses before deploying.');
}

main().catch(err => {
  console.error('\nFATAL:', err.message);
  process.exit(1);
});
