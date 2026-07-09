#!/usr/bin/env node
/**
 * generate-maccabees.mjs
 *
 * Downloads the Brenton Septuagint Translation (1851, public domain) from
 * eBible.org in USFM format, then writes:
 *
 *   data/apocrypha-1maccabees.js   — 1 Maccabees (16 chapters)
 *   data/apocrypha-2maccabees.js   — 2 Maccabees (15 chapters)
 *
 * Usage (run from the project root on a machine with internet access):
 *   node tools/generate-maccabees.mjs
 *
 * Requirements: Node 18+, system `unzip` command.
 * No npm packages needed.
 *
 * Source: https://ebible.org/Scriptures/eng-Brenton_usfm.zip
 * License: Brenton LXX 1851 — public domain
 *
 * Why Maccabees matters for this app:
 *   1 Maccabees covers the Maccabean revolt (167–134 BC) — the historical
 *   gap between Malachi and Matthew, essential context for the Second Temple
 *   period already present via Josephus.
 *   2 Maccabees adds theological depth: resurrection of the dead, martyrdom,
 *   and prayers for the departed — ideas that surface directly in NT texts.
 */

import {
  createWriteStream, existsSync, mkdirSync,
  readFileSync, writeFileSync, readdirSync,
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
// 2. Extract USFM files
// ─────────────────────────────────────────────────────────────────────────────

function extractBooks(zipPath, outDir, bookCodes) {
  mkdirSync(outDir, { recursive: true });
  const listing = execSync(`unzip -l "${zipPath}"`, { encoding: 'utf8' });

  for (const code of bookCodes) {
    const re    = new RegExp(`(\\S*${code}\\S*\\.usfm)`, 'i');
    const match = listing.match(re);
    if (!match) {
      console.error(`Zip contents:\n${listing}`);
      throw new Error(
        `Cannot find ${code}.usfm inside ${zipPath}. ` +
        `Try running: unzip -l "${zipPath}" | grep -i ${code}`
      );
    }
    const nameInZip = match[1];
    execSync(`unzip -o "${zipPath}" "${nameInZip}" -d "${outDir}"`, { stdio: 'pipe' });
    console.log(`Extracted: ${nameInZip}`);
  }
}

function findExtracted(outDir, code) {
  const files = readdirSync(outDir);
  // walk subdirectories too (some zips nest files)
  function search(dir) {
    for (const f of readdirSync(dir)) {
      const full = join(dir, f);
      try {
        const isDir = execSync(`test -d "${full}" && echo d || echo f`, { encoding: 'utf8' }).trim() === 'd';
        if (isDir) {
          const found = search(full);
          if (found) return found;
        } else if (f.toUpperCase().includes(code.toUpperCase()) && f.endsWith('.usfm')) {
          return full;
        }
      } catch {}
    }
    return null;
  }
  const found = search(outDir);
  if (!found) {
    throw new Error(
      `Cannot find ${code} USFM file in ${outDir}. Files: ${files.join(', ')}`
    );
  }
  return found;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. USFM parser (identical to generate-apocrypha.mjs)
// ─────────────────────────────────────────────────────────────────────────────

function stripCharStyles(s) {
  return s
    .replace(/\\[a-z]+\d*\s/g, '')
    .replace(/\\[a-z]+\d*\*/g, '');
}

function parseUsfm(text) {
  const result = {};
  const lines  = text.replace(/\r\n/g, '\n').split('\n');

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

    const cMatch = line.match(/^\\c\s+(\d+)/);
    if (cMatch) {
      flush();
      chapter = cMatch[1];
      verse   = null;
      continue;
    }

    const vMatch = line.match(/^\\v\s+(\d+)\s*(.*)/);
    if (vMatch) {
      flush();
      verse = vMatch[1];
      buf   = stripCharStyles(vMatch[2]);
      continue;
    }

    if (/^\\(p|m|pi\d?|q\d?|b|li\d?)\s*$/.test(line)) {
      if (verse !== null) buf += ' ';
      continue;
    }

    if (line.startsWith('\\')) {
      if (verse !== null) {
        const rest = stripCharStyles(line.replace(/^\\[a-z]+\d*\s*/, ''));
        if (rest.trim()) buf += ' ' + rest;
      }
      continue;
    }

    if (verse !== null && line) {
      buf += ' ' + stripCharStyles(line);
    }
  }
  flush();

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
  const chapters = Object.keys(data).sort((a, b) => {
    // numeric sort, keeping 'prologue' last if present
    const an = parseInt(a, 10);
    const bn = parseInt(b, 10);
    if (isNaN(an) && isNaN(bn)) return 0;
    if (isNaN(an)) return 1;
    if (isNaN(bn)) return -1;
    return an - bn;
  });

  out.push(`// ${comment}`);
  out.push(`window.${windowVar} = {`);

  chapters.forEach((ch, ci) => {
    const verses    = data[ch];
    const verseKeys = Object.keys(verses).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    const chTrail   = ci < chapters.length - 1 ? ',' : '';

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

  // eBible.org USFM book codes for Maccabees
  // Common codes: 1MA / 2MA  (some builds use MA1 / MA2)
  // extractBooks tries a case-insensitive substring match so either works.
  const bookCodes = ['1MA', '2MA'];
  extractBooks(zipPath, usfmDir, bookCodes);

  const ma1Path = findExtracted(usfmDir, '1MA');
  const ma2Path = findExtracted(usfmDir, '2MA');

  console.log('Parsing 1 Maccabees …');
  const ma1Data = parseUsfm(readFileSync(ma1Path, 'utf8'));

  console.log('Parsing 2 Maccabees …');
  const ma2Data = parseUsfm(readFileSync(ma2Path, 'utf8'));

  // Sanity checks
  const ma1Chs = Object.keys(ma1Data).filter(k => !isNaN(parseInt(k, 10)));
  const ma2Chs = Object.keys(ma2Data).filter(k => !isNaN(parseInt(k, 10)));
  console.log(`  1 Maccabees: ${ma1Chs.length} chapters`);
  console.log(`  2 Maccabees: ${ma2Chs.length} chapters`);

  if (ma1Chs.length !== 16)
    console.warn(`  WARNING: Expected 16 chapters for 1 Maccabees, got ${ma1Chs.length}`);
  if (ma2Chs.length !== 15)
    console.warn(`  WARNING: Expected 15 chapters for 2 Maccabees, got ${ma2Chs.length}`);

  // Count total verses
  const ma1Total = ma1Chs.reduce((n, ch) => n + Object.keys(ma1Data[ch]).length, 0);
  const ma2Total = ma2Chs.reduce((n, ch) => n + Object.keys(ma2Data[ch]).length, 0);
  console.log(`  1 Maccabees: ${ma1Total} verses`);
  console.log(`  2 Maccabees: ${ma2Total} verses`);

  // Emit
  const ma1Js = emitJs(
    'MACCABEES1',
    '1 Maccabees — Brenton Septuagint Translation (1851, public domain)',
    ma1Data
  );
  const ma2Js = emitJs(
    'MACCABEES2',
    '2 Maccabees — Brenton Septuagint Translation (1851, public domain)',
    ma2Data
  );

  const ma1Out = join(DATA, 'apocrypha-1maccabees.js');
  const ma2Out = join(DATA, 'apocrypha-2maccabees.js');

  writeFileSync(ma1Out, ma1Js, 'utf8');
  writeFileSync(ma2Out, ma2Js, 'utf8');

  console.log(`\nWrote: ${ma1Out}`);
  console.log(`Wrote: ${ma2Out}`);
  console.log('\nDone. Spot-check a few verses before deploying.');
  console.log('\nSample spot-checks:');
  console.log('  1 Macc 1:1 —', ma1Data['1']?.['1']?.slice(0, 80) + '…');
  console.log('  1 Macc 4:59 (Hanukkah) —', ma1Data['4']?.['59']?.slice(0, 80) + '…');
  console.log('  2 Macc 7:9 (resurrection) —', ma2Data['7']?.['9']?.slice(0, 80) + '…');
  console.log('  2 Macc 12:45 (prayers for dead) —', ma2Data['12']?.['45']?.slice(0, 80) + '…');
}

main().catch(err => {
  console.error('\nFATAL:', err.message);
  process.exit(1);
});
