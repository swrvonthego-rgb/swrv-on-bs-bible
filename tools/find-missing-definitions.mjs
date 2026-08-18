#!/usr/bin/env node
/**
 * Find high-value biblical terms appearing frequently in the text but lacking
 * dictionary entries. Prioritize words that have cultural/ANE significance or
 * are commonly misunderstood in modern contexts.
 *
 * Run: node tools/find-missing-definitions.mjs
 */

import fs from 'fs';
import path from 'path';

const BIBLE_DIR = path.join(process.cwd(), 'data', 'bible');
const DICTIONARY_PATH = path.join(process.cwd(), 'data', 'english-bible-dictionary.js');

// High-priority words that appear frequently and deserve definitions.
// These are words that appear dozens or hundreds of times in scripture,
// have ANE cultural significance, or are commonly misunderstood.
const PRIORITY_WORDS = [
  // Religious/temple terms
  'church', 'synagogue', 'temple', 'priest', 'Levite', 'altar', 'sacrifice',
  'offering', 'covenant', 'law', 'commandment', 'prophet', 'apostle',
  'disciple', 'angel', 'demon', 'spirit', 'soul', 'flesh',

  // Social/political terms
  'king', 'kingdom', 'elder', 'judge', 'slave', 'servant', 'master',
  'authority', 'power', 'throne', 'rule', 'reign',

  // Cultural/daily life
  'bread', 'wine', 'water', 'fire', 'light', 'darkness', 'blood',
  'family', 'son', 'daughter', 'father', 'mother', 'brother', 'sister',
  'house', 'city', 'sea', 'mountain', 'valley', 'wilderness',

  // Abstract/theological
  'sin', 'repentance', 'forgiveness', 'salvation', 'redemption',
  'righteousness', 'justice', 'mercy', 'love', 'faith', 'hope',
  'truth', 'wisdom', 'knowledge', 'understanding', 'fear', 'worship',

  // ANE-specific concepts
  'sheol', 'hades', 'resurrection', 'eternal', 'salvation', 'judgment',
  'wrath', 'curse', 'blessing', 'election', 'inheritance', 'firstborn',
  'stranger', 'foreigner', 'sojourner', 'widow', 'orphan',

  // Relational terms
  'love', 'hate', 'jealousy', 'envy', 'anger', 'patience', 'gentleness',
  'humility', 'pride', 'honor', 'shame', 'glory', 'boast',
];

// Words to skip (too common or already covered)
const SKIP_WORDS = new Set([
  'the', 'and', 'is', 'to', 'be', 'of', 'a', 'in', 'that', 'it', 'for',
  'was', 'with', 'are', 'this', 'as', 'by', 'or', 'from', 'on', 'at',
  'will', 'not', 'have', 'had', 'has', 'do', 'does', 'did', 'can', 'could',
  'would', 'should', 'may', 'might', 'must', 'shall', 'said', 'say',
  'one', 'two', 'three', 'all', 'each', 'every', 'some', 'any', 'many',
  'more', 'most', 'other', 'even', 'also', 'but', 'so', 'if', 'when',
  'where', 'who', 'which', 'what', 'how', 'why', 'which', 'whom',
  'him', 'her', 'his', 'hers', 'me', 'you', 'us', 'we', 'our', 'your',
  'them', 'their', 'my', 'mine', 'he', 'she', 'i', 'they',
  'up', 'down', 'out', 'in', 'over', 'under', 'before', 'after', 'between',
  'through', 'into', 'out', 'about', 'off', 'again', 'further', 'then',
  'now', 'here', 'there', 'than', 'too', 'just', 'only', 'very', 'no',
  'yes', 'neither', 'nor', 'either', 'until', 'while', 'during', 'within',
  'unto', 'unto', 'hath', 'doth', 'thee', 'thou', 'thy', 'thine', 've',
]);

try {
  // Load all Bible book texts
  let bibleContent = '';
  const bibleFiles = fs.readdirSync(BIBLE_DIR).filter(f => f.endsWith('.js'));
  bibleFiles.forEach(file => {
    const filePath = path.join(BIBLE_DIR, file);
    bibleContent += ' ' + fs.readFileSync(filePath, 'utf-8');
  });

  // Load dictionary to see what's already defined
  let dictContent = fs.readFileSync(DICTIONARY_PATH, 'utf-8');
  const definedWords = new Set();

  // Extract defined words from the dictionary file
  const dictMatches = dictContent.match(/"([a-z]+)":\s*\{/gi);
  if (dictMatches) {
    dictMatches.forEach(m => {
      const word = m.match(/"([a-z]+)"/i)[1].toLowerCase();
      definedWords.add(word);
    });
  }

  // Count word frequencies in Bible text
  const wordFreq = new Map();
  const wordRegex = /\b([a-z]+)\b/gi;

  let match;
  while ((match = wordRegex.exec(bibleContent)) !== null) {
    const word = match[1].toLowerCase();
    if (!SKIP_WORDS.has(word)) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
  }

  // Find priority words that lack definitions
  const missing = [];
  PRIORITY_WORDS.forEach(word => {
    if (!definedWords.has(word.toLowerCase())) {
      const count = wordFreq.get(word.toLowerCase()) || 0;
      if (count > 0) {
        missing.push({ word, count });
      }
    }
  });

  // Sort by frequency
  missing.sort((a, b) => b.count - a.count);

  console.log('═════════════════════════════════════════════════════════════');
  console.log('HIGH-VALUE WORDS MISSING DEFINITIONS (sorted by frequency)');
  console.log('═════════════════════════════════════════════════════════════\n');

  if (missing.length === 0) {
    console.log('✓ All priority words have definitions!\n');
  } else {
    missing.slice(0, 20).forEach((item, i) => {
      console.log(`${i + 1}. ${item.word.padEnd(20)} (${item.count} occurrences)`);
    });
    console.log(`\n... and ${missing.length - 20} more\n`);

    console.log('Next steps:');
    console.log('1. Add definitions to data/english-bible-dictionary.js');
    console.log('2. Include Hebrew/Greek originals with Strong\'s numbers');
    console.log('3. Add ANE cultural context explaining the word\'s significance');
    console.log('4. Include relatedVerses showing key passages where it appears');
    console.log('5. Run this tool again to verify new additions\n');
  }

  // Also report current dictionary coverage
  console.log('═════════════════════════════════════════════════════════════');
  console.log('CURRENT DICTIONARY COVERAGE');
  console.log('═════════════════════════════════════════════════════════════\n');
  console.log(`Defined words: ${definedWords.size}`);
  console.log(`Total unique words in Bible: ${wordFreq.size}`);
  console.log(`Coverage: ${((definedWords.size / wordFreq.size) * 100).toFixed(1)}%\n`);

} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
