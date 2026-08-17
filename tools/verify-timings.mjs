// Verifies what per-verse alignment ACTUALLY landed in R2.
//
// A green align job is not proof of full coverage: align-book.mjs
// deliberately keeps partial books (it only fails when zero chapters align),
// because a book missing three chapters is still worth shipping. So the job
// status alone can't answer "is the whole Bible aligned?" — this reads the
// published timings back and counts them against the canon.
//
// Reports per-book gaps and an overall chapter/verse total. Exits non-zero
// only if NOTHING is aligned; partial coverage is reported, not failed,
// since that is a legitimate end state.

const BASE = process.env.TIMINGS_BASE
  || 'https://swrv-on-bs-bible.swrvonthego.workers.dev/data/bsb-timings/';

const BOOKS = [
  ['Genesis',50],['Exodus',40],['Leviticus',27],['Numbers',36],['Deuteronomy',34],
  ['Joshua',24],['Judges',21],['Ruth',4],['1Samuel',31],['2Samuel',24],
  ['1Kings',22],['2Kings',25],['1Chronicles',29],['2Chronicles',36],['Ezra',10],
  ['Nehemiah',13],['Esther',10],['Job',42],['Psalms',150],['Proverbs',31],
  ['Ecclesiastes',12],['SongofSolomon',8],['Isaiah',66],['Jeremiah',52],
  ['Lamentations',5],['Ezekiel',48],['Daniel',12],['Hosea',14],['Joel',3],
  ['Amos',9],['Obadiah',1],['Jonah',4],['Micah',7],['Nahum',3],['Habakkuk',3],
  ['Zephaniah',3],['Haggai',2],['Zechariah',14],['Malachi',4],
  ['Matthew',28],['Mark',16],['Luke',24],['John',21],['Acts',28],['Romans',16],
  ['1Corinthians',16],['2Corinthians',13],['Galatians',6],['Ephesians',6],
  ['Philippians',4],['Colossians',4],['1Thessalonians',5],['2Thessalonians',3],
  ['1Timothy',6],['2Timothy',4],['Titus',3],['Philemon',1],['Hebrews',13],
  ['James',5],['1Peter',5],['2Peter',3],['1John',5],['2John',1],['3John',1],
  ['Jude',1],['Revelation',22],
];

let booksPresent = 0, chaptersAligned = 0, versesAligned = 0;
const expectedChapters = BOOKS.reduce((a, [, n]) => a + n, 0);
const problems = [];

for (const [book, expected] of BOOKS) {
  let data;
  try {
    const res = await fetch(BASE + encodeURIComponent(book) + '.json');
    if (res.status === 404) { problems.push(`${book}: MISSING entirely`); continue; }
    if (!res.ok) { problems.push(`${book}: HTTP ${res.status}`); continue; }
    data = await res.json();
  } catch (err) {
    problems.push(`${book}: fetch failed — ${err.message}`);
    continue;
  }
  booksPresent++;
  const chapters = Object.keys(data.chapters || {}).map(Number).sort((a, b) => a - b);
  chaptersAligned += chapters.length;
  for (const ch of chapters) versesAligned += (data.chapters[String(ch)] || []).length;
  if (chapters.length !== expected) {
    const missing = [];
    for (let i = 1; i <= expected; i++) if (!data.chapters[String(i)]) missing.push(i);
    problems.push(`${book}: ${chapters.length}/${expected} chapters — missing ${missing.slice(0, 15).join(',')}${missing.length > 15 ? ` (+${missing.length - 15})` : ''}`);
  }
}

console.log('='.repeat(64));
console.log(`books with timings : ${booksPresent}/${BOOKS.length}`);
console.log(`chapters aligned   : ${chaptersAligned}/${expectedChapters}`);
console.log(`verses aligned     : ${versesAligned}`);
console.log('='.repeat(64));
if (problems.length) {
  console.log('GAPS (these chapters fall back to plain playback):');
  for (const p of problems) console.log('  ' + p);
} else {
  console.log('COMPLETE — every book and chapter has per-verse timings.');
}
if (booksPresent === 0) { console.log('NOTHING ALIGNED'); process.exit(1); }
