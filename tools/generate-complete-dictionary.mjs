#!/usr/bin/env node
/**
 * Generate a comprehensive biblical dictionary covering every word.
 *
 * Strategy:
 * 1. Extract all unique words from the Bible text
 * 2. Prioritize by frequency (common words first)
 * 3. Build dictionary entries with:
 *    - Hebrew/Greek Strong's number (when available)
 *    - Plain definition
 *    - Deep explanation with ANE context
 *    - Related verses
 * 4. Create "word families" - words with shared roots
 * 5. Output as mergeable JavaScript files
 *
 * Run: node tools/generate-complete-dictionary.mjs
 */

import fs from 'fs';
import path from 'path';

const BIBLE_DIR = path.join(process.cwd(), 'data', 'bible');
const OUTPUT_DIR = path.join(process.cwd(), 'data');

// Common English words (not biblical concepts - skip these)
const COMMON_ENGLISH = new Set([
  'the', 'and', 'a', 'to', 'of', 'in', 'is', 'that', 'was', 'for', 'be',
  'it', 'with', 'as', 'by', 'or', 'from', 'on', 'at', 'have', 'he', 'she',
  'they', 'we', 'you', 'me', 'him', 'her', 'them', 'us', 'our', 'my', 'your',
  'his', 'its', 'their', 'this', 'that', 'these', 'those', 'will', 'would',
  'could', 'should', 'may', 'might', 'must', 'can', 'shall', 'did', 'do',
  'does', 'said', 'say', 'says', 'one', 'two', 'three', 'all', 'each',
  'every', 'both', 'many', 'some', 'any', 'few', 'more', 'most', 'other',
  'such', 'same', 'no', 'yes', 'not', 'so', 'but', 'if', 'when', 'where',
  'who', 'which', 'what', 'how', 'why', 'up', 'down', 'over', 'under',
  'before', 'after', 'between', 'through', 'into', 'out', 'about', 'off',
  'again', 'also', 'then', 'now', 'here', 'there', 'just', 'only', 'very',
  'too', 'so', 'as', 'well', 'even', 'still', 'however', 'therefore',
  'unto', 'hath', 'doth', 'thee', 'thou', 'thy', 'thine', 've', 's', 'd',
]);

// Priority biblical concepts (high-frequency, culturally significant)
const BIBLICAL_PRIORITY = [
  // God/Deity terms
  'god', 'lord', 'yhwh', 'christ', 'jesus', 'spirit', 'angel', 'demon',
  'salvation', 'grace', 'faith', 'love', 'mercy', 'judgment', 'wrath',

  // Covenant/Law
  'covenant', 'law', 'commandment', 'statute', 'ordinance', 'justice',
  'righteousness', 'sin', 'repentance', 'forgiveness', 'atonement',

  // Temple/Worship
  'temple', 'church', 'priest', 'altar', 'sacrifice', 'offering', 'worship',
  'pray', 'prayer', 'hymn', 'praise', 'thanksgiving',

  // People/Family
  'king', 'kingdom', 'people', 'nation', 'tribe', 'family', 'son', 'daughter',
  'father', 'mother', 'brother', 'sister', 'wife', 'husband', 'child',

  // Geography/Culture
  'israel', 'jerusalem', 'egypt', 'babylon', 'assyria', 'city', 'house',
  'land', 'sea', 'mountain', 'valley', 'river', 'wilderness',

  // Daily Life
  'bread', 'wine', 'water', 'food', 'clothes', 'animal', 'sheep', 'cattle',
  'gold', 'silver', 'money', 'market', 'work', 'harvest',

  // Spiritual/Emotional
  'fear', 'hope', 'trust', 'joy', 'sorrow', 'anger', 'peace', 'wisdom',
  'knowledge', 'understanding', 'truth', 'light', 'darkness', 'fire',

  // Actions
  'hear', 'listen', 'speak', 'word', 'call', 'see', 'look', 'know',
  'believe', 'obey', 'follow', 'serve', 'bless', 'curse',
];

try {
  console.log('═════════════════════════════════════════════════════════════');
  console.log('COMPREHENSIVE BIBLICAL DICTIONARY GENERATOR');
  console.log('═════════════════════════════════════════════════════════════\n');

  // Load all Bible text
  let bibleContent = '';
  const bibleFiles = fs.readdirSync(BIBLE_DIR).filter(f => f.endsWith('.js'));
  console.log(`Loading ${bibleFiles.length} Bible book files...`);

  bibleFiles.forEach(file => {
    const filePath = path.join(BIBLE_DIR, file);
    bibleContent += ' ' + fs.readFileSync(filePath, 'utf-8');
  });

  // Extract all unique words
  const wordFreq = new Map();
  const wordRegex = /\b([a-z]+)\b/gi;
  let match;

  while ((match = wordRegex.exec(bibleContent)) !== null) {
    const word = match[1].toLowerCase();
    if (!COMMON_ENGLISH.has(word)) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
  }

  // Sort by frequency
  const sortedWords = Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1]);

  console.log(`Found ${sortedWords.length} unique biblical/significant words`);
  console.log(`Top 50 by frequency:\n`);

  sortedWords.slice(0, 50).forEach((item, i) => {
    console.log(`${i + 1}. ${item[0].padEnd(20)} (${item[1]} occurrences)`);
  });

  console.log('\n═════════════════════════════════════════════════════════════');
  console.log('DICTIONARY GENERATION PLAN');
  console.log('═════════════════════════════════════════════════════════════\n');

  const topN = 500; // Start with top 500 most-frequent words
  const topWords = sortedWords.slice(0, topN).map(item => item[0]);

  console.log(`Phase 1: Generate entries for top ${topN} words by frequency`);
  console.log(`Phase 2: Add Hebrew/Greek Strong's numbers (manual research)`);
  console.log(`Phase 3: Create chapter-by-chapter ANE cultural context`);
  console.log(`Phase 4: Wire underlines for all defined words in text\n`);

  console.log('Next steps:');
  console.log('1. Create tools/dictionary-templates.mjs with definition templates');
  console.log('2. Create tools/generate-ane-context.mjs for chapter-by-chapter notes');
  console.log('3. Update app.js to underline words with definitions');
  console.log('4. Generate definitions in batches (100 words per file)\n');

  // Create batch files structure
  const batchSize = 100;
  const batchCount = Math.ceil(topWords.length / batchSize);

  console.log(`Will generate ${batchCount} batch files:`);
  console.log(`- data/dictionary-batch-1.js (words 1-${Math.min(100, topWords.length)})`);
  console.log(`- data/dictionary-batch-2.js (words ${batchSize + 1}-${Math.min(200, topWords.length)})`);
  console.log(`... and so on\n`);

  // Output word list for manual Strong's lookup
  const wordListPath = path.join(OUTPUT_DIR, 'word-list-for-definitions.json');
  const wordList = topWords.map((word, i) => ({
    rank: i + 1,
    word: word,
    frequency: wordFreq.get(word),
    needsDefinition: true,
    strongsNumber: null, // To be filled in manually or via API
    hebrewGreek: null, // To be researched
  }));

  fs.writeFileSync(wordListPath, JSON.stringify(wordList.slice(0, 100), null, 2));
  console.log(`✓ Exported first 100 words to word-list-for-definitions.json`);
  console.log('  Use this to batch-research Strong\'s numbers and etymologies\n');

  console.log('═════════════════════════════════════════════════════════════');
  console.log('COVERAGE ROADMAP');
  console.log('═════════════════════════════════════════════════════════════\n');

  const coverage = [
    { batch: 1, words: '1-100', description: 'Core theological terms', time: '2-3 days' },
    { batch: 2, words: '101-200', description: 'Family, social, daily life', time: '2-3 days' },
    { batch: 3, words: '201-300', description: 'Geography, nations, places', time: '2-3 days' },
    { batch: 4, words: '301-500', description: 'Actions, emotions, states', time: '3-4 days' },
    { batch: 5, words: '501+', description: 'All remaining words', time: 'Ongoing' },
  ];

  coverage.forEach(c => {
    console.log(`Batch ${c.batch}: Words ${c.words}`);
    console.log(`  ${c.description}`);
    console.log(`  Estimated: ${c.time}\n`);
  });

  console.log('TOTAL: All unique biblical words defined + ANE context per chapter');
  console.log('= Complete biblical scholarship app ready for study\n');

} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
