// Judges whether a forced-alignment result is actually usable, rather than
// just "the aligner exited 0".
//
// A bad alignment fails quietly: fragments still come back, they're just
// wrong. The checks below are the ones that catch real breakage —
// off-by-one fragment counts, non-monotonic or zero-length spans, a huge
// unexplained gap at the head (a spoken chapter announcement the text
// doesn't contain), and coverage that stops well short of the audio.
//
// Usage: node tools/validate-alignment.mjs <alignment.json> <verses.txt> <duration-seconds>

import { readFileSync } from 'node:fs';

const [alignPath, versesPath, durationArg] = process.argv.slice(2);
if (!alignPath || !versesPath) {
  console.error('usage: validate-alignment.mjs <alignment.json> <verses.txt> <duration>');
  process.exit(2);
}

const duration = Number(durationArg);
const expected = readFileSync(versesPath, 'utf8').split('\n').filter(l => l.trim()).length;
const raw = JSON.parse(readFileSync(alignPath, 'utf8'));

// aeneas emits {fragments:[{begin,end,lines,...}]}
const frags = (raw.fragments || []).map(f => ({
  begin: Number(f.begin),
  end: Number(f.end),
  text: Array.isArray(f.lines) ? f.lines.join(' ') : (f.lines || ''),
})).filter(f => f.text.trim().length > 0 || Number.isFinite(f.begin));

let problems = 0;
const fail = (msg) => { console.log('  FAIL  ' + msg); problems++; };
const ok = (msg) => console.log('  ok    ' + msg);

console.log(`fragments returned: ${frags.length}   expected verses: ${expected}`);
if (frags.length !== expected) fail(`fragment count ${frags.length} != verse count ${expected} — every later verse would be shifted`);
else ok('fragment count matches verse count exactly');

// monotonic, non-overlapping, non-empty
let nonMono = 0, empty = 0;
for (let i = 0; i < frags.length; i++) {
  if (!(frags[i].end > frags[i].begin)) empty++;
  if (i > 0 && frags[i].begin + 1e-6 < frags[i - 1].end) nonMono++;
}
if (nonMono) fail(`${nonMono} fragment(s) start before the previous one ends`); else ok('all fragments strictly ordered');
if (empty) fail(`${empty} zero-or-negative-length fragment(s)`); else ok('no zero-length fragments');

// head gap: a spoken "Genesis chapter one" intro is not in the text and
// would push everything late if the aligner absorbed it into verse 1.
const head = frags.length ? frags[0].begin : 0;
console.log(`head offset before verse 1: ${head.toFixed(2)}s`);
if (head > 12) fail(`head offset ${head.toFixed(2)}s is large — likely an unmatched spoken intro`);
else ok('head offset plausible');

// coverage against real audio duration
if (Number.isFinite(duration) && duration > 0 && frags.length) {
  const last = frags[frags.length - 1].end;
  const cov = last / duration;
  console.log(`audio duration: ${duration.toFixed(2)}s   last verse ends: ${last.toFixed(2)}s   coverage: ${(cov * 100).toFixed(1)}%`);
  if (cov < 0.85) fail(`alignment covers only ${(cov * 100).toFixed(1)}% of the audio`);
  else ok('alignment covers the audio');
  if (last > duration + 1) fail('last fragment ends past the end of the audio');
}

// pacing sanity: characters-per-second per verse should cluster. Wild
// outliers mean the aligner mapped a verse to the wrong span of audio.
const rates = frags.map(f => f.text.replace(/\s+/g, ' ').trim().length / Math.max(f.end - f.begin, 0.01));
const sorted = [...rates].sort((a, b) => a - b);
const median = sorted[Math.floor(sorted.length / 2)] || 0;
const wild = rates.filter(r => r > median * 3 || r < median / 3).length;
console.log(`median chars/sec: ${median.toFixed(1)}   outlier verses: ${wild}`);
if (wild > Math.max(2, frags.length * 0.1)) fail(`${wild} verses have implausible pacing`);
else ok('per-verse pacing consistent');

console.log(problems === 0 ? '\nALIGNMENT LOOKS GOOD' : `\nALIGNMENT HAS ${problems} PROBLEM(S)`);
process.exit(problems === 0 ? 0 : 1);
