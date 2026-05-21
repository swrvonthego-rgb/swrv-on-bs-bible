#!/usr/bin/env node
// SWRV Kingdom Bible — full-canon programmatic audit.
//
// Walks every (Bible version, book, chapter, verse, displayed token) tuple,
// calls the word-study engine, and validates the returned card against the
// 7-section rubric (Exact Word / Contextual / Full Range / Not Meant / Why
// / Sources / Confidence + Audit Status).
//
// Run:  node tools/audit-canon.mjs
// Out:  tools/audit-report.json  (machine-readable counts)
//       stdout summary
//
// Hard constraints enforced:
//   * NEVER conflates Strong's range with contextual meaning HERE.
//   * NEVER produces a card with blank Contextual Meaning, blank Why, or
//     null original/strongs/morphology values.
//   * Uses exactly the audit-status enum:
//       "context-reviewed"
//       "context-reviewed with original-word limitation"
//       "needs manual review"

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), '..');

// ---------------------------------------------------------------- bootstrap
// Build a fake window context so the data scripts (which all assign to
// window.X) can load without DOM.
const ctx = { window: {}, console };
ctx.window.window = ctx.window;
vm.createContext(ctx);

function loadScript(rel){
  const p = path.join(ROOT, rel);
  if(!fs.existsSync(p)) return false;
  const src = fs.readFileSync(p, 'utf8');
  try { vm.runInContext(src, ctx, { filename: rel }); return true; }
  catch(e){ console.error('LOAD FAIL', rel, e.message.slice(0,200)); return false; }
}

// Order matters — lexicons + dictionaries first, then books last.
const DATA_FILES = [
  'data/sources.js',
  'data/source-categories.js',
  'data/sources-manifest.js',
  'data/cross-source-map.js',
  'data/chronological-map.js',
  'data/chronological-events.js',
  'data/audio-narration.js',
  'data/parallel-passages.js',
  'data/prophecy-fulfillment.js',
  'data/places.js',
  'data/themes.js',
  'data/peoples.js',
  'data/audit.js',
  'data/definitions.js',
  'data/strongs-hebrew.js',
  'data/strongs-greek.js',
  'data/bdb-hebrew.js',
  'data/enoch.js',
  'data/bible-index.js',
  'data/english-bible-dictionary.js',
  'data/foundational-word-families.js',
  'data/concept-completeness-pack.js',
  'data/contextual-sense-notes.js',
  'data/context-sense-disambiguator.js',
  'data/cultural-context-cards.js',
  'data/instruction-classification.js',
  'data/person-context-cards.js',
  'data/group-nation-cards.js',
  'data/religion-context-cards.js',
  'data/genesis.js',
];
const PHASE1_FAILS = [];
for(const f of DATA_FILES){ if(!loadScript(f)) PHASE1_FAILS.push(f); }

// Also load every book file.
const BOOKS_DIR = path.join(ROOT, 'data/bible');
const bookFiles = fs.readdirSync(BOOKS_DIR).filter(f=>f.endsWith('.js')).sort();
for(const b of bookFiles){ loadScript('data/bible/'+b); }

// Also load the lexicon JSONs straight as fallback Strong's source so the
// audit can verify connectivity even if data/strongs-*.js is sparse.
function loadJson(rel){
  const p = path.join(ROOT, rel);
  if(!fs.existsSync(p)) return null;
  try { return JSON.parse(fs.readFileSync(p,'utf8')); } catch(e){ return null; }
}
const STRONGS_HEB_JSON = loadJson('lexicons/strongs-hebrew.json');
const STRONGS_GRK_JSON = loadJson('lexicons/strongs-greek.json');
const BDB_HEB_JSON     = loadJson('lexicons/bdb-hebrew.json');
if(STRONGS_HEB_JSON && !ctx.window.STRONGS_HEB) ctx.window.STRONGS_HEB = STRONGS_HEB_JSON;
if(STRONGS_GRK_JSON && !ctx.window.STRONGS_GRK) ctx.window.STRONGS_GRK = STRONGS_GRK_JSON;
if(BDB_HEB_JSON && !ctx.window.BDB_HEBREW)      ctx.window.BDB_HEBREW = BDB_HEB_JSON;

// ---------------------------------------------------------------- engine
// Replicate the engine logic exactly, so we audit what the browser would render.
const W = ctx.window;

function _lemmatize(word){
  // Mirrors js/app.js _lemmatize: produces a candidate set covering common
  // English inflection so curated-note lookup and dictionary lookup can
  // find the lexical base form regardless of the surface inflection.
  if(!word) return [];
  const w = String(word).toLowerCase().replace(/[.,;:!?'"]$/,'');
  const out = new Set([w]);
  const push = (s)=>{ if(s && s.length>=2) out.add(s); };
  if(w.endsWith('ies') && w.length>4) push(w.slice(0,-3)+'y');
  if(w.endsWith('ied') && w.length>4) push(w.slice(0,-3)+'y');
  if(w.endsWith('ed') && w.length>3){
    const base = w.slice(0,-2);
    push(base); push(base+'e');
    if(base.length>=2 && base[base.length-1]===base[base.length-2]) push(base.slice(0,-1));
  } else if(w.endsWith('d') && w.length>3){
    push(w.slice(0,-1));
  }
  if(w.endsWith('ing') && w.length>5){
    const base = w.slice(0,-3);
    push(base); push(base+'e');
    if(base.length>=2 && base[base.length-1]===base[base.length-2]) push(base.slice(0,-1));
  }
  if(w.endsWith('eth') && w.length>4) push(w.slice(0,-3));
  if(w.endsWith('est') && w.length>4){ push(w.slice(0,-3)); push(w.slice(0,-2)); }
  if(w.endsWith('es') && w.length>3){ push(w.slice(0,-2)); push(w.slice(0,-1)); }
  else if(w.endsWith('s') && w.length>2) push(w.slice(0,-1));
  if(w.endsWith('ly') && w.length>3) push(w.slice(0,-2));
  if(w.endsWith('ness') && w.length>5) push(w.slice(0,-4));
  return [...out];
}
function _dictLookup(word){
  const D = W.ENGLISH_BIBLE_DICT;
  if(!D) return null;
  for(const v of _lemmatize(word)){
    if(D[v]) return D[v];
    const cap = v.charAt(0).toUpperCase() + v.slice(1);
    if(D[cap]) return D[cap];
  }
  return null;
}
function _strongsLookup(sId){
  // Mirrors js/app.js _strongsLookup: normalizes the two-shape Strong's
  // bundles so callers see {lang, sId, lemma, xlit, pron, kjv_def, def}.
  // - Hebrew bundle uses keys: lemma / xlit / pron / strongs_def / kjv_def
  // - Greek  bundle uses keys: grk   /          /     / def         / kjv_def
  if(!sId) return null;
  const m = String(sId).match(/^([HG])(\d+)([a-z]?)$/);
  if(!m) return null;
  const lang = m[1]==='H' ? 'Hebrew' : 'Greek';
  const numKey = m[2] + m[3];
  if(lang==='Hebrew'){
    const heb = W.STRONGS_HEB && (W.STRONGS_HEB[sId] || W.STRONGS_HEB['H'+numKey]);
    if(!heb) return null;
    return { lang, sId, lemma:heb.lemma||'', xlit:heb.xlit||'', pron:heb.pron||'', kjv_def:heb.kjv_def||'', def:heb.strongs_def||'', derivation:heb.derivation||'' };
  } else {
    const grk = W.STRONGS_GRK && (W.STRONGS_GRK[numKey] || W.STRONGS_GRK[String(m[2])]);
    if(!grk) return null;
    return { lang, sId, lemma:grk.grk||grk.lemma||'', xlit:grk.translit||grk.xlit||'', pron:grk.pron||'', kjv_def:grk.kjv_def||'', def:grk.def||grk.strongs_def||'', derivation:grk.derivation||'' };
  }
}
function _wordInKjvDef(ew, kjv){
  if(!kjv) return false;
  const toks = String(kjv).toLowerCase().split(/[^a-z]+/);
  return toks.indexOf(ew) >= 0;
}
function _passageNotes(ref){
  return (W.CONTEXTUAL_SENSE_NOTES && W.CONTEXTUAL_SENSE_NOTES[ref]) || null;
}
function _bookContextNote(book){
  if(!book) return '';
  const NT = ['Matthew','Mark','Luke','John','Acts','Romans','1Corinthians','2Corinthians','Galatians','Ephesians','Philippians','Colossians','1Thessalonians','2Thessalonians','1Timothy','2Timothy','Titus','Philemon','Hebrews','James','1Peter','2Peter','1John','2John','3John','Jude','Revelation'];
  if(NT.includes(book)) return 'NT book — original language is Koine Greek.';
  return 'OT book — original language is Hebrew (with some Aramaic in Daniel and Ezra).';
}
function _bookGenreSummary(book){
  const meta = (W.BIBLE_INDEX||[]).find(b=>b.slug===book);
  if(!meta) return '';
  const T = meta.testament || (meta.section==='NT'?'NT':'OT');
  const G = (meta.genre||'').toLowerCase();
  const map = {
    torah:'Torah / Pentateuch — covenant foundation, narrative + law.',
    history:'Historical narrative — covenant in the life of Israel.',
    wisdom:'Wisdom literature — proverbs, poetry, lament, reflection.',
    poetry:'Hebrew poetry — parallelism, imagery, devotional.',
    prophets:'Prophets — covenant lawsuit and restoration oracles.',
    gospels:'Gospel narrative — Jesus the Messiah, kingdom announced.',
    acts:'Apostolic narrative — kingdom spreading via the Spirit.',
    epistles:'Apostolic letter — pastoral / doctrinal instruction to churches.',
    apocalypse:'Apocalyptic — symbolic vision of consummation.'
  };
  return (map[G]||'') + ' (' + T + ')';
}
function _phraseContext(verse, englishWord){
  if(!verse) return '';
  const text = String(verse.synthesized||verse.text||(verse.sources&&verse.sources.KJV&&verse.sources.KJV.text)||'');
  if(!text) return '';
  const w = String(englishWord||'').toLowerCase();
  const words = text.split(/\s+/);
  const wi = words.findIndex(t=>t.toLowerCase().replace(/[^a-z]/g,'')===w.replace(/[^a-z]/g,''));
  if(wi<0) return text.slice(0,140);
  const a = Math.max(0, wi-4), b = Math.min(words.length, wi+5);
  return words.slice(a,b).join(' ');
}
function resolveContextualWordSense(v, englishWord){
  const ew = String(englishWord||'').toLowerCase().replace(/[.,;:!?]$/,'');
  const result = {
    englishWord: ew,
    confidence: 'unavailable',
    exactTag: null, exactLex: null, alternates: [], family: [],
    verseSnippet: String(v.synthesized||v.text||'').slice(0,180),
    reason: ''
  };
  const tags = Array.isArray(v.strongsTags) ? v.strongsTags : [];
  if(!tags.length){
    result.reason = 'No strongsTags on this verse.';
    return result;
  }
  const matches = [];
  for(const t of tags){
    if(!t || !t.sId) continue;
    const lex = _strongsLookup(t.sId);
    if(!lex) continue;
    if(_wordInKjvDef(ew, lex.kjv_def) || _wordInKjvDef(ew, lex.def)){
      matches.push({tag:t, lex:lex});
    }
  }
  if(matches.length===1){
    result.confidence = 'directly-tagged';
    result.exactTag = matches[0].tag; result.exactLex = matches[0].lex;
    return result;
  }
  if(matches.length>1){
    const dict = _dictLookup(ew);
    let pick = null, preferredRank = null;
    if(dict && Array.isArray(dict.originals)){
      const knownOrder = dict.originals.map(o=>{const m=(o.strongs||'').match(/[HG]\d+/);return m?m[0]:null;}).filter(Boolean);
      for(const m of matches){
        const ms = (m.tag.sId||'').match(/[HG]\d+/); const msId = ms?ms[0]:null;
        if(!msId) continue;
        const rank = knownOrder.indexOf(msId);
        if(rank>=0 && (preferredRank===null || rank<preferredRank)){ preferredRank=rank; pick=m; }
      }
    }
    const ranked = pick!==null;
    if(!pick) pick = matches[0];
    result.confidence = ranked ? 'directly-tagged' : 'multiple-candidates';
    result.exactTag = pick.tag; result.exactLex = pick.lex;
    return result;
  }
  const dict = _dictLookup(ew);
  if(dict && Array.isArray(dict.originals)){
    for(const o of dict.originals){
      const m = (o.strongs||'').match(/[HG]\d+/); const sId = m?m[0]:null;
      if(!sId) continue;
      const tagMatch = tags.find(t=>{const mm=(t.sId||'').match(/[HG]\d+/);return mm && mm[0]===sId;});
      if(tagMatch){
        const lex = _strongsLookup(tagMatch.sId);
        result.confidence = 'inferred-from-family';
        result.exactTag = tagMatch; result.exactLex = lex;
        return result;
      }
    }
  }
  result.confidence = 'unavailable';
  return result;
}

function getWordStudyData(opts){
  const v = opts.verse;
  const ew = String(opts.englishWord||'').toLowerCase();
  const ref = opts.ref || '';
  const book = opts.book || '';
  const sense = v ? resolveContextualWordSense(v, ew) : {confidence:'unavailable'};
  const passageNote = _passageNotes(ref);
  let passageWordNote = null;
  if(passageNote){
    const orig = String(opts.englishWord||'');
    const cap = orig.charAt(0).toUpperCase() + orig.slice(1).toLowerCase();
    passageWordNote = passageNote[ew] || passageNote[orig] || passageNote[cap];
  }
  const dict = _dictLookup(ew);
  const phrase = _phraseContext(v, ew);

  const hasOriginal = !!(sense && sense.exactLex && sense.exactLex.lemma);
  const exact = {
    english: opts.englishWord || '',
    original: hasOriginal ? sense.exactLex.lemma : 'Exact original-word mapping unavailable in current tagged data',
    strongs:  hasOriginal && sense.exactTag ? (((sense.exactTag.sId||'').match(/[HG]\d+/)||[])[0]||'Unavailable') : 'Unavailable',
    morphology: (sense && sense.exactTag && sense.exactTag.m) ? sense.exactTag.m : 'Unavailable',
    phrase: phrase || ''
  };
  if(hasOriginal){
    if(sense.exactLex.lang) exact.language = sense.exactLex.lang;
    if(sense.exactLex.xlit) exact.transliteration = sense.exactLex.xlit;
  }

  const hasCurated = !!(passageWordNote && passageWordNote.sense);
  // Full word range
  let fullWordRange = [];
  if(dict && Array.isArray(dict.rangeOfMeaning) && dict.rangeOfMeaning.length){
    fullWordRange = dict.rangeOfMeaning.slice();
  } else if(dict && Array.isArray(dict.originals) && dict.originals.length){
    fullWordRange = dict.originals.map(o=>[o.translit||o.word||'', o.note||''].filter(Boolean).join(' — ').slice(0,180));
  } else if(sense.exactLex && sense.exactLex.kjv_def){
    fullWordRange = String(sense.exactLex.kjv_def)
      .replace(/[()\[\]+]/g,' ').replace(/-/g,' ').split(/[,;.]/)
      .map(s=>s.trim()).filter(Boolean);
  }
  const notMeantHere = passageWordNote && passageWordNote.notMeant
    ? [passageWordNote.notMeant]
    : (dict && (dict.notMean||dict.misunderstood) ? [dict.notMean||dict.misunderstood] : []);

  // Honest contextual fallback (NOT a Strong's-def restatement)
  function _honestContextual(){
    const genre = _bookGenreSummary(book);
    const parts = [];
    parts.push('In ' + (ref||'this verse') + ' the word "' + ew + '" is read inside the phrase "' + (phrase||'…') + '" ('+(opts.bibleVersion||'KJV')+').');
    if(genre) parts.push(genre);
    if(hasOriginal){
      parts.push('The exact original word here is tagged ('+exact.original+', '+exact.strongs+'), so the contextual sense is constrained by that lemma — see Full Word Range for the broader lexical span and Why-This-Meaning-Fits for the in-context narrowing.');
    } else {
      parts.push('No exact original-word tag is available for this token in the current data, so the contextual sense here is provisional — drawn from the surface English, the verse phrase, and the book\'s genre rather than from a verified original-language lemma. Treat as a guide, not a definitive lexical claim.');
    }
    return parts.join(' ');
  }
  function _honestWhy(){
    const bits = [];
    if(phrase) bits.push('The immediate phrase "'+phrase+'" anchors the meaning to its grammatical neighbours.');
    if(hasOriginal) bits.push('The tagged lemma narrows the lexical possibilities and rules out senses that belong to other word families.');
    else bits.push('Without an exact lemma tag, we lean on the verse phrase, the sentence flow, and the book\'s genre to filter which dictionary sense is in play.');
    bits.push('See Full Word Range for the broader lexical span this English word can carry across Scripture, and Not-Meant-Here for senses that the verse-level context rules out.');
    return bits.join(' ');
  }

  const contextualMeaningHere = hasCurated ? passageWordNote.sense : _honestContextual();
  const whyThisMeaningFits = hasCurated && (passageWordNote.matters||passageWordNote.why)
    ? (passageWordNote.matters||passageWordNote.why)
    : _honestWhy();

  let confidence = 'low';
  if(hasCurated && hasOriginal) confidence = 'high';
  else if(hasCurated || hasOriginal) confidence = 'medium';

  let auditStatus;
  if(hasCurated && hasOriginal) auditStatus = 'context-reviewed';
  else if(hasCurated || hasOriginal) auditStatus = 'context-reviewed with original-word limitation';
  else auditStatus = 'needs manual review';

  const sources = [];
  if(hasOriginal){
    sources.push('Strong\'s Concordance (project-bundled '+(exact.strongs.charAt(0)==='H'?'Hebrew':'Greek')+' index, '+exact.strongs+')');
    if(sense.exactLex && sense.exactLex.lang==='Hebrew') sources.push('BDB Hebrew Lexicon (data/bdb-hebrew.js + sources/bdb-hebrew-lexicon-full.txt)');
    else if(sense.exactLex && sense.exactLex.lang==='Greek') sources.push('Thayer\'s Greek Lexicon (sources/thayers-greek-lexicon.txt)');
  }
  if(dict && Array.isArray(dict.sources)) for(const s of dict.sources) if(s && sources.indexOf(s)<0) sources.push(s);
  if(hasCurated) sources.push('SWRV Curated Passage Note (data/contextual-sense-notes.js)');
  if(!sources.length) sources.push('Contextual fallback based on displayed Bible version and passage context (no verified original-word mapping in current tagged data)');

  return {
    bibleVersion: opts.bibleVersion||'KJV',
    exactWordUsedHere: exact,
    contextualMeaningHere, fullWordRange, notMeantHere, whyThisMeaningFits,
    sources, confidence, auditStatus,
    _hasCurated: hasCurated, _hasOriginal: hasOriginal,
    sense
  };
}

function validateDefinitionCard(card){
  const fails = [];
  if(!card) { fails.push('card is null'); return {ok:false, fails}; }
  if(!card.exactWordUsedHere) fails.push('missing exactWordUsedHere');
  else {
    const x = card.exactWordUsedHere;
    if(!x.english || !String(x.english).trim()) fails.push('exactWordUsedHere.english is empty');
    if(typeof x.original==='undefined' || x.original===null) fails.push('exactWordUsedHere.original is null');
    if(typeof x.strongs ==='undefined' || x.strongs===null)  fails.push('exactWordUsedHere.strongs is null');
    if(typeof x.morphology==='undefined' || x.morphology===null) fails.push('exactWordUsedHere.morphology is null');
    if(typeof x.phrase==='undefined' || x.phrase===null) fails.push('exactWordUsedHere.phrase is null');
  }
  if(!card.contextualMeaningHere || !String(card.contextualMeaningHere).trim()) fails.push('contextualMeaningHere is blank');
  else {
    const lex = card.sense && card.sense.exactLex;
    if(lex && lex.def && String(card.contextualMeaningHere).trim()===String(lex.def).trim()) fails.push('contextualMeaningHere equals Strong\'s def');
    if(lex && lex.kjv_def && String(card.contextualMeaningHere).trim()===String(lex.kjv_def).trim()) fails.push('contextualMeaningHere equals Strong\'s KJV def');
  }
  if(card.exactWordUsedHere && (!card.fullWordRange||!card.fullWordRange.length)){
    const ew = (card.exactWordUsedHere.english||'').toLowerCase();
    const dict = _dictLookup(ew);
    const isMulti = dict && Array.isArray(dict.originals) && dict.originals.length>1;
    if(isMulti) fails.push('fullWordRange empty for multi-meaning word');
  }
  if(!Array.isArray(card.fullWordRange)) fails.push('fullWordRange not array');
  if(!Array.isArray(card.notMeantHere))  fails.push('notMeantHere not array');
  if(!Array.isArray(card.sources))       fails.push('sources not array');
  if(card.sources && !card.sources.length) fails.push('sources empty');
  if(!card.whyThisMeaningFits || !String(card.whyThisMeaningFits).trim()) fails.push('whyThisMeaningFits blank');
  if(!card.confidence) fails.push('confidence missing');
  else if(['high','medium','low'].indexOf(card.confidence)<0) fails.push('confidence value invalid');
  if(!card.auditStatus) fails.push('auditStatus missing');
  else if(['context-reviewed','context-reviewed with original-word limitation','needs manual review'].indexOf(card.auditStatus)<0) fails.push('auditStatus value invalid');
  return { ok: fails.length===0, fails };
}

// --------------------------------------------------------------- inventory
const BIBLE = W.BIBLE || {};
const GENESIS = W.GENESIS || null;
const BIBLE_INDEX = W.BIBLE_INDEX || [];
const SUPPORTED_VERSIONS = ['KJV']; // Project ships one canonical surface version; per-verse sources include BSB/TANAKH/HEBREW/GREEK_NT/LXX/AMP layers checked separately.
// Detect translation layers actually present per verse.
const LAYER_KEYS = new Set();

const counts = {
  bibleVersionsAudited: SUPPORTED_VERSIONS.length,
  booksAudited: 0,
  booksMissing: [],
  chaptersAudited: 0,
  versesAudited: 0,
  versesMissingText: 0,
  versesWithoutStrongsTags: 0,
  versesWithoutDefinableWords: 0,
  displayedTokens: 0,
  studiableWords: 0,
  studiableWordsValidated: 0,
  studiableWordsFailed: 0,
  studiableWordsWithCurated: 0,
  studiableWordsWithOriginalTag: 0,
  cardsByAuditStatus: {
    'context-reviewed': 0,
    'context-reviewed with original-word limitation': 0,
    'needs manual review': 0
  },
  cardsByConfidence: { high:0, medium:0, low:0 },
  // Translation/Bible-version layer counts (each verse may carry multiple).
  translationLayerCoverage: {},  // layerKey -> verseCount

  // Dictionary, lexicon, Strong's, glossary, family entries
  dictionaryEntries: 0,
  lexiconEntries: 0,
  strongsHebrewEntries: 0,
  strongsGreekEntries: 0,
  bdbEntries: 0,
  morphologyEntries: 0, // morphology lives inside strongsTags[].m where present
  glossaryEntries: 0,   // SCRIPT_DEFINITIONS or DEFINITIONS
  wordFamilyEntries: 0, // FOUNDATIONAL_WORD_FAMILIES (merged into ENGLISH_BIBLE_DICT)

  // Curated passage notes
  curatedPassageNotes: 0,
  curatedWordNotes: 0,

  // Orphan / connection diagnostics
  curatedNotesOrphanCount: 0,    // a (ref, word) note that does NOT match a verse word
  curatedNotesOrphanList: [],

  // Failures collected
  failuresSample: [],
  uniqueFailureModes: {},
  // Total token visit count is bounded — we collect a sample of failures
  // to keep memory sane, but failure mode counts are exact.
};
const STARTED = Date.now();

// Token-extraction helpers
function _verseTextOf(v){
  return String(v.synthesized || v.text || (v.sources && v.sources.KJV && v.sources.KJV.text) || '');
}
function _tokensOf(v){
  if(Array.isArray(v.wordTokens) && v.wordTokens.length){
    return v.wordTokens.map(t=>t.word).filter(Boolean);
  }
  return _verseTextOf(v).split(/\s+/).filter(Boolean);
}
function _allLayerTokensOf(v){
  // For the orphan check: curated notes may use KJV vocabulary (carnal,
  // charity, works) even when v.synthesized renders BSB (worldly, love,
  // deeds). Collect tokens from EVERY translation layer attached to the
  // verse so a curated KJV key still matches.
  const set = new Set();
  function add(text){
    if(!text) return;
    for(const t of String(text).split(/\s+/)){
      const cleaned = t.replace(/[.,;:!?()\[\]"'“”‘’—–]/g,'');
      if(cleaned) set.add(cleaned.toLowerCase());
    }
  }
  add(v.synthesized); add(v.text);
  if(v.sources) for(const k of Object.keys(v.sources)){
    const node = v.sources[k];
    if(node && node.text) add(node.text);
  }
  return [...set];
}
function _studiableWordsOf(v){
  if(Array.isArray(v.definableWords) && v.definableWords.length) return v.definableWords;
  // Genesis uses wordTokens for every token — treat content words as studiable
  // (skip stop-words to avoid generating ~30k useless card validations per
  // Genesis chapter; we still walk every token for display-coverage counting).
  if(Array.isArray(v.wordTokens) && v.wordTokens.length){
    const STOP = new Set(['a','an','the','and','or','of','to','for','in','on','at','by','with','from','as','is','was','were','be','been','being','am','are','it','its','this','that','these','those','he','she','him','his','her','they','them','their','we','us','our','i','you','your','my','me','not','no','nor','but','if','then','so','than','when','where','which','who','whom','what','how','why','also','all','any','some','one','two','three','said','say','says','unto','upon','out','up','down','over','under','into','him.','her.','it.','them.','us.']);
    const seen = new Set();
    const out = [];
    for(const t of v.wordTokens){
      const w = String(t.word||'').replace(/[.,;:!?()\[\]"']/g,'').toLowerCase();
      if(!w) continue;
      if(STOP.has(w)) continue;
      if(seen.has(w)) continue;
      seen.add(w);
      out.push(t.word.replace(/[.,;:!?]$/,''));
    }
    return out;
  }
  return [];
}

function _trackFailureMode(reason){
  counts.uniqueFailureModes[reason] = (counts.uniqueFailureModes[reason]||0) + 1;
}

// --------------------------------------------------------------- walk canon
function walkBook(book, bookData){
  if(!bookData) { counts.booksMissing.push(book); return; }
  counts.booksAudited++;
  const chapters = Object.keys(bookData).filter(k=>/^\d+$/.test(k)).sort((a,b)=>Number(a)-Number(b));
  for(const chNum of chapters){
    const ch = bookData[chNum];
    if(!ch || !ch.verses) continue;
    counts.chaptersAudited++;
    const verseNums = Object.keys(ch.verses).filter(k=>/^\d+$/.test(k)).sort((a,b)=>Number(a)-Number(b));
    for(const vn of verseNums){
      const v = ch.verses[vn];
      if(!v) continue;
      counts.versesAudited++;
      const txt = _verseTextOf(v);
      if(!txt) counts.versesMissingText++;
      if(!Array.isArray(v.strongsTags) || !v.strongsTags.length) counts.versesWithoutStrongsTags++;
      if(!Array.isArray(v.definableWords) || !v.definableWords.length){
        if(!Array.isArray(v.wordTokens) || !v.wordTokens.length){
          counts.versesWithoutDefinableWords++;
        }
      }
      // Translation layer coverage
      if(v.sources){
        for(const k of Object.keys(v.sources)){
          counts.translationLayerCoverage[k] = (counts.translationLayerCoverage[k]||0) + 1;
          LAYER_KEYS.add(k);
        }
      }
      // Tokens (display count) + studiable words (validation count)
      const tokens = _tokensOf(v);
      counts.displayedTokens += tokens.length;
      // Morphology — verse-level Strong's tags with `.m` field
      if(Array.isArray(v.strongsTags)){
        for(const t of v.strongsTags){ if(t && t.m) counts.morphologyEntries++; }
      }
      const ref = v.ref || (book + ' ' + chNum + ':' + vn);
      const words = _studiableWordsOf(v);
      for(const w of words){
        counts.studiableWords++;
        const card = getWordStudyData({verse:v, englishWord:w, ref:ref, book:book, bibleVersion:'KJV'});
        if(card._hasCurated) counts.studiableWordsWithCurated++;
        if(card._hasOriginal) counts.studiableWordsWithOriginalTag++;
        counts.cardsByAuditStatus[card.auditStatus] = (counts.cardsByAuditStatus[card.auditStatus]||0) + 1;
        counts.cardsByConfidence[card.confidence] = (counts.cardsByConfidence[card.confidence]||0) + 1;
        const res = validateDefinitionCard(card);
        if(res.ok){ counts.studiableWordsValidated++; }
        else {
          counts.studiableWordsFailed++;
          for(const f of res.fails) _trackFailureMode(f);
          if(counts.failuresSample.length<50){
            counts.failuresSample.push({ref, word:w, fails:res.fails});
          }
        }
      }
    }
  }
}

// Genesis first (special-cased)
if(GENESIS){ walkBook('Genesis', GENESIS); }
// Then everything else
for(const b of Object.keys(BIBLE)) walkBook(b, BIBLE[b]);

// --------------------------------------------------------------- entry counts
counts.dictionaryEntries  = W.ENGLISH_BIBLE_DICT ? Object.keys(W.ENGLISH_BIBLE_DICT).length : 0;
counts.strongsHebrewEntries = W.STRONGS_HEB ? Object.keys(W.STRONGS_HEB).length : 0;
counts.strongsGreekEntries  = W.STRONGS_GRK ? Object.keys(W.STRONGS_GRK).length : 0;
counts.lexiconEntries = counts.strongsHebrewEntries + counts.strongsGreekEntries;
counts.bdbEntries = W.BDB_HEBREW ? Object.keys(W.BDB_HEBREW).length : 0;
counts.glossaryEntries = (W.DEFINITIONS ? Object.keys(W.DEFINITIONS).length : 0);
counts.wordFamilyEntries = counts.dictionaryEntries; // foundational-word-families merges into ENGLISH_BIBLE_DICT
// Curated notes
if(W.CONTEXTUAL_SENSE_NOTES){
  const passages = Object.keys(W.CONTEXTUAL_SENSE_NOTES);
  counts.curatedPassageNotes = passages.length;
  let wnotes = 0;
  for(const p of passages){
    const node = W.CONTEXTUAL_SENSE_NOTES[p];
    wnotes += Object.keys(node).length;
  }
  counts.curatedWordNotes = wnotes;
}

// Orphan diagnostic: every curated (ref, word) note should correspond to a
// verse token under the same lemmatizer rules the engine uses at runtime
// (love ↔ loved, sin ↔ sinned, body ↔ bodies, charity ↔ charity, etc.).
function _tokenMatchesCuratedWord(curated, verseTokens){
  const cs = _lemmatize(curated);
  for(const tok of verseTokens){
    const ts = _lemmatize(tok);
    for(const a of cs) for(const b of ts) if(a===b) return true;
  }
  return false;
}
if(W.CONTEXTUAL_SENSE_NOTES){
  for(const ref of Object.keys(W.CONTEXTUAL_SENSE_NOTES)){
    const m = ref.match(/^(.+?)\s+(\d+):(\d+)$/);
    if(!m) { counts.curatedNotesOrphanCount++; counts.curatedNotesOrphanList.push({ref, reason:'ref-format'}); continue; }
    const slug = m[1].replace(/\s+/g,'');
    const ch = m[2], vn = m[3];
    const bd = (slug==='Genesis' && GENESIS) ? GENESIS : (BIBLE[slug]);
    const cv = bd && bd[ch] && bd[ch].verses && bd[ch].verses[vn];
    if(!cv){ counts.curatedNotesOrphanCount++; counts.curatedNotesOrphanList.push({ref, reason:'verse-not-found'}); continue; }
    const tokens = _allLayerTokensOf(cv);
    const wordKeys = Object.keys(W.CONTEXTUAL_SENSE_NOTES[ref]);
    for(const wk of wordKeys){
      if(!_tokenMatchesCuratedWord(wk, tokens)){
        counts.curatedNotesOrphanCount++;
        counts.curatedNotesOrphanList.push({ref, word:wk, reason:'word-not-in-any-translation-layer'});
      }
    }
  }
}

// --------------------------------------------------------------- placeholder sweep
const PLACEHOLDER_NEEDLES = [
  'No curated passage-specific note', // legacy phrase
  'no curated',
  'unavailable for this verse',
  'mapping unavailable',
  'not available',
  'no note yet',
  'coming soon',
  'placeholder',
  'TODO',
  'undefined',
  'TBD'
];
const PLACEHOLDER_HITS = {};
function _scanForPlaceholders(){
  const FILES = [];
  function rec(d){
    for(const e of fs.readdirSync(d, {withFileTypes:true})){
      if(e.name.startsWith('.')) continue;
      const p = path.join(d, e.name);
      if(e.isDirectory()){ if(e.name==='node_modules'||e.name==='tools') continue; rec(p); }
      else if(/\.(js|html|css|md)$/.test(e.name)) FILES.push(p);
    }
  }
  rec(ROOT);
  for(const f of FILES){
    let src = '';
    try { src = fs.readFileSync(f,'utf8'); } catch(e){ continue; }
    for(const needle of PLACEHOLDER_NEEDLES){
      const re = new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'gi');
      const matches = src.match(re);
      if(matches && matches.length){
        const rel = path.relative(ROOT, f);
        PLACEHOLDER_HITS[needle] = PLACEHOLDER_HITS[needle] || {};
        PLACEHOLDER_HITS[needle][rel] = (PLACEHOLDER_HITS[needle][rel]||0) + matches.length;
      }
    }
  }
}
_scanForPlaceholders();

// --------------------------------------------------------------- report
const REPORT = {
  schema: 'swrv-canon-audit/v1',
  startedAt: new Date(STARTED).toISOString(),
  durationMs: Date.now() - STARTED,
  phase1LoadFails: PHASE1_FAILS,
  supportedVersions: SUPPORTED_VERSIONS,
  translationLayersDetected: [...LAYER_KEYS],
  counts,
  placeholderHits: PLACEHOLDER_HITS
};
const OUT_PATH = path.join(ROOT, 'tools/audit-report.json');
fs.writeFileSync(OUT_PATH, JSON.stringify(REPORT, null, 2));

// Stdout summary
const c = counts;
const pad = (s,n)=>String(s).padStart(n,' ');
console.log('\n========== SWRV CANON AUDIT v1 ==========');
console.log('Started: ' + new Date(STARTED).toISOString());
console.log('Duration: ' + REPORT.durationMs + 'ms');
console.log('-----------------------------------------');
console.log('Bible versions audited:        ' + pad(c.bibleVersionsAudited,8));
console.log('Translation layers detected:   ' + REPORT.translationLayersDetected.join(', '));
console.log('Books audited:                 ' + pad(c.booksAudited,8) + (c.booksMissing.length?(' (missing: '+c.booksMissing.join(',')+')'):''));
console.log('Chapters audited:              ' + pad(c.chaptersAudited,8));
console.log('Verses audited:                ' + pad(c.versesAudited,8));
console.log('  verses missing text:         ' + pad(c.versesMissingText,8));
console.log('  verses w/o strongsTags:      ' + pad(c.versesWithoutStrongsTags,8));
console.log('  verses w/o definableWords:   ' + pad(c.versesWithoutDefinableWords,8));
console.log('Displayed tokens (every word): ' + pad(c.displayedTokens,8));
console.log('Studiable words (audited):     ' + pad(c.studiableWords,8));
console.log('  validated OK:                ' + pad(c.studiableWordsValidated,8));
console.log('  failed validation:           ' + pad(c.studiableWordsFailed,8));
console.log('  with curated passage note:   ' + pad(c.studiableWordsWithCurated,8));
console.log('  with exact Strong\'s tag:    ' + pad(c.studiableWordsWithOriginalTag,8));
console.log('-----------------------------------------');
console.log('Cards by audit status:');
for(const k of Object.keys(c.cardsByAuditStatus)) console.log('  ' + k.padEnd(50,' ') + pad(c.cardsByAuditStatus[k],8));
console.log('Cards by confidence:');
for(const k of Object.keys(c.cardsByConfidence)) console.log('  ' + k.padEnd(50,' ') + pad(c.cardsByConfidence[k],8));
console.log('-----------------------------------------');
console.log('Dictionary entries:            ' + pad(c.dictionaryEntries,8));
console.log('Word-family entries (merged):  ' + pad(c.wordFamilyEntries,8));
console.log('Lexicon entries (total):       ' + pad(c.lexiconEntries,8));
console.log('  Strong\'s Hebrew:            ' + pad(c.strongsHebrewEntries,8));
console.log('  Strong\'s Greek:             ' + pad(c.strongsGreekEntries,8));
console.log('  BDB Hebrew (full lexicon):   ' + pad(c.bdbEntries,8));
console.log('Morphology entries (tagged):   ' + pad(c.morphologyEntries,8));
console.log('Glossary entries:              ' + pad(c.glossaryEntries,8));
console.log('Curated passage notes:         ' + pad(c.curatedPassageNotes,8));
console.log('Curated (passage,word) notes:  ' + pad(c.curatedWordNotes,8));
console.log('Curated notes orphaned:        ' + pad(c.curatedNotesOrphanCount,8));
console.log('-----------------------------------------');
console.log('Translation-layer coverage (verses with that layer):');
const layers = Object.keys(c.translationLayerCoverage).sort();
for(const L of layers) console.log('  ' + L.padEnd(20,' ') + pad(c.translationLayerCoverage[L],8));
console.log('-----------------------------------------');
console.log('Placeholder needle hits (file -> count):');
for(const n of Object.keys(PLACEHOLDER_HITS)){
  const fs2 = PLACEHOLDER_HITS[n];
  const tot = Object.values(fs2).reduce((a,b)=>a+b,0);
  console.log('  ['+n+']: '+tot+' hits across '+Object.keys(fs2).length+' files');
}
console.log('-----------------------------------------');
console.log('Unique failure modes (count):');
const modes = Object.entries(c.uniqueFailureModes).sort((a,b)=>b[1]-a[1]);
for(const [k,vv] of modes) console.log('  ' + k.padEnd(60,' ') + pad(vv,8));
console.log('-----------------------------------------');
if(c.failuresSample.length){
  console.log('Sample failures (first 5):');
  for(const s of c.failuresSample.slice(0,5)){
    console.log('  ' + s.ref + ' [' + s.word + ']: ' + s.fails.join('; '));
  }
}
console.log('-----------------------------------------');
console.log('Full report written to: ' + path.relative(ROOT, OUT_PATH));
console.log('=========================================\n');
process.exit(c.studiableWordsFailed > 0 ? 1 : 0);
