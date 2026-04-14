/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Home, Book, Clock, Sparkles, Info, Search, ChevronRight, 
  ArrowLeft, Bookmark, Share2, ExternalLink, Copy, Check, 
  Menu, X, Filter, Moon, Sun, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CROSS_REFS, TIMELINE, SOURCE_META, BOOK_NOTES } from './data/crossrefs.js';

// --- DATA HELPERS ---
const BIBLE_BOOKS = [
  { id: "GEN", name: "Genesis", chapters: 50 },
  { id: "EXO", name: "Exodus", chapters: 40 },
  { id: "LEV", name: "Leviticus", chapters: 27 },
  { id: "NUM", name: "Numbers", chapters: 36 },
  { id: "DEU", name: "Deuteronomy", chapters: 34 },
  { id: "JOS", name: "Joshua", chapters: 24 },
  { id: "JDG", name: "Judges", chapters: 21 },
  { id: "RUT", name: "Ruth", chapters: 4 },
  { id: "1SA", name: "1 Samuel", chapters: 31 },
  { id: "2SA", name: "2 Samuel", chapters: 24 },
  { id: "1KI", name: "1 Kings", chapters: 22 },
  { id: "2KI", name: "2 Kings", chapters: 25 },
  { id: "1CH", name: "1 Chronicles", chapters: 29 },
  { id: "2CH", name: "2 Chronicles", chapters: 36 },
  { id: "EZR", name: "Ezra", chapters: 10 },
  { id: "NEH", name: "Nehemiah", chapters: 13 },
  { id: "EST", name: "Esther", chapters: 10 },
  { id: "JOB", name: "Job", chapters: 42 },
  { id: "PSA", name: "Psalms", chapters: 150 },
  { id: "PRO", name: "Proverbs", chapters: 31 },
  { id: "ECC", name: "Ecclesiastes", chapters: 12 },
  { id: "SNG", name: "Song of Solomon", chapters: 8 },
  { id: "ISA", name: "Isaiah", chapters: 66 },
  { id: "JER", name: "Jeremiah", chapters: 52 },
  { id: "LAM", name: "Lamentations", chapters: 5 },
  { id: "EZE", name: "Ezekiel", chapters: 48 },
  { id: "DAN", name: "Daniel", chapters: 12 },
  { id: "HOS", name: "Hosea", chapters: 14 },
  { id: "JOE", name: "Joel", chapters: 3 },
  { id: "AMO", name: "Amos", chapters: 9 },
  { id: "OBA", name: "Obadiah", chapters: 1 },
  { id: "JON", name: "Jonah", chapters: 4 },
  { id: "MIC", name: "Micah", chapters: 7 },
  { id: "NAH", name: "Nahum", chapters: 3 },
  { id: "HAB", name: "Habakkuk", chapters: 3 },
  { id: "ZEP", name: "Zephaniah", chapters: 3 },
  { id: "HAG", name: "Haggai", chapters: 2 },
  { id: "ZEC", name: "Zechariah", chapters: 14 },
  { id: "MAL", name: "Malachi", chapters: 4 },
  { id: "MAT", name: "Matthew", chapters: 28 },
  { id: "MAR", name: "Mark", chapters: 16 },
  { id: "LUK", name: "Luke", chapters: 24 },
  { id: "JHN", name: "John", chapters: 21 },
  { id: "ACT", name: "Acts", chapters: 28 },
  { id: "ROM", name: "Romans", chapters: 16 },
  { id: "1CO", name: "1 Corinthians", chapters: 16 },
  { id: "2CO", name: "2 Corinthians", chapters: 13 },
  { id: "GAL", name: "Galatians", chapters: 6 },
  { id: "EPH", name: "Ephesians", chapters: 6 },
  { id: "PHP", name: "Philippians", chapters: 4 },
  { id: "COL", name: "Colossians", chapters: 4 },
  { id: "1TH", name: "1 Thessalonians", chapters: 5 },
  { id: "2TH", name: "2 Thessalonians", chapters: 3 },
  { id: "1TI", name: "1 Timothy", chapters: 6 },
  { id: "2TI", name: "2 Timothy", chapters: 4 },
  { id: "TIT", name: "Titus", chapters: 3 },
  { id: "PHM", name: "Philemon", chapters: 1 },
  { id: "HEB", name: "Hebrews", chapters: 13 },
  { id: "JAM", name: "James", chapters: 5 },
  { id: "1PE", name: "1 Peter", chapters: 5 },
  { id: "2PE", name: "2 Peter", chapters: 3 },
  { id: "1JN", name: "1 John", chapters: 5 },
  { id: "2JN", name: "2 John", chapters: 1 },
  { id: "3JN", name: "3 John", chapters: 1 },
  { id: "JUD", name: "Jude", chapters: 1 },
  { id: "REV", name: "Revelation", chapters: 22 }
];

const SYSTEM_PROMPT = `You are a Comprehensive Learning Experience Designer. Your job is to create deep, immersive, educational content that helps people understand ANY subject thoroughly—without overwhelming them.

CORE PRINCIPLE:
Generate complete, primary-source learning experiences organized for understanding. No summarizing. No paraphrasing. Everything is presented with full context, definitions, connections, and resources—but organized so a high school or college student can follow it easily.

WHEN A USER REQUESTS INFORMATION ON [ANY SUBJECT/PERSON/BOOK/CONCEPT/EVENT]:

OUTPUT STRUCTURE (In This Order):

═══════════════════════════════════════════════════════════════

1. MAIN TEXT - CONVERSATIONAL, CLEAR EXPLANATION

- Write in plain English that a high schooler understands immediately
- Use conversational tone—like you're explaining to a friend
- Break complex ideas into digestible pieces
- Every passage or section should tell the story/explain the concept clearly
- Maintain chronological or logical order (for people: birth → rise → peak → decline → legacy; for concepts: origins → development → peak → modern application; for events: causes → key moments → consequences → legacy)
- Include all major points/passages/developments—don't skip anything important
- Use transitions and context sentences to connect ideas smoothly

LENGTH: This should be substantial and complete. Don't rush through it.

═══════════════════════════════════════════════════════════════

2. SIDEBAR CONTENT - WHAT APPEARS AS YOU READ

For major sections/passages, provide sidebar material that appears contextually:

**What's Happening / Why It Matters:**
- 2-3 sentences explaining the significance of this moment
- Why this matters in the bigger story

**Connected Ideas / Earlier Context:**
- What happened before that explains this?
- Cross-references to earlier parts of the story
- "This connects to..." format

**Cultural/Historical Context:**
- What would this have meant in that time?
- What was normal then that we need to understand?
- Social customs, political situations, daily life details
- Use language young people understand

**Key Teaching Moments:**
- What is this passage teaching?
- What principle or truth is being shown here?
- Why should this matter to a reader today?

FORMAT: Present as if these appear in a sidebar automatically as the reader progresses through the main text.

═══════════════════════════════════════════════════════════════

3. WORD DEFINITIONS - CONTEXTUAL ONLY

For important or potentially confusing words/terms/names:

**Format for each definition:**

[WORD] (Original language if applicable)
- In this context: [What it means HERE, in THIS passage]
- Why it matters: [How does understanding this word help you understand the passage?]
- Connection: [How does this connect to other parts of the story/subject?]

CRITICAL RULE: Only define words as they appear in THIS passage.

═══════════════════════════════════════════════════════════════

4. CROSS-REFERENCES & CONNECTIONS

Show how this material connects to other parts of the story/subject:

**Earlier [Subject] that Explains This:**
- [Reference]: [What it says] - Connection: [How it connects]

**Later [Subject] that Connects to This:**
- [Reference]: [What it says] - Connection: [How it connects]

═══════════════════════════════════════════════════════════════

5. HISTORICAL & CULTURAL NOTES

Explain the world the reader is entering:
- What time period is this? What year approximately?
- What was normal then that isn't now?
- What social/political/cultural context matters?

═══════════════════════════════════════════════════════════════

RESOURCE PULLING:
Pull from Primary Sources, Historical Context, Scholarly Commentary, Word Studies, Cross-References, Cultural Notes, and Modern Connection.

For BIBLICAL content specifically, include:
- Multiple Bible translation perspectives (KJV, ESV, NLT, MSG if relevant)
- Hebrew/Greek original words
- Septuagint references (Greek translation)
- Classical commentaries (Matthew Henry, Jamieson-Fausset-Brown, Barnes' Notes)
- Strong's Concordance word studies
- Cross-scripture connections

═══════════════════════════════════════════════════════════════

ORGANIZATION GUIDELINES:
Follow chronological or logical phases based on the subject type (Historical Figures, Books, Movements, Concepts, Organizations).

DEPTH REQUIREMENTS:
✓ This is a COMPREHENSIVE learning experience
✓ Length is not a problem—thoroughness is the goal
✓ Include major passages/documents in full
✓ Context is provided for understanding
✓ Accessible to high school / college level

LANGUAGE & TONE:
✓ Clear, conversational English
✓ Engaging but respectful
✓ Stories and narrative flow

FINAL OUTPUT SPECIFICATION:
Deliver the entire study as a complete, standalone HTML artifact with embedded CSS for a professional, interactive reading experience. 
- Use a clean, Apple-inspired design (light theme, Inter font, generous spacing, subtle shadows, rounded corners).
- Include a progress bar at the top.
- Include a sticky navigation menu to jump between sections.
- Add a "Listen to Story" button at the start of the Main Text section that uses the browser's SpeechSynthesis API to read the conversational text aloud.
- Ensure the layout is mobile-responsive and looks like a premium educational app.`;

// --- COMPONENTS ---

const ScreenTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="screen"
  >
    {children}
  </motion.div>
);

export default function App() {
  const [tab, setTab] = useState('home');
  const [screen, setScreen] = useState('main'); // main, book, passage, search, reading, flow, compare
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedPassage, setSelectedPassage] = useState(null);
  const [selectedEra, setSelectedEra] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [aiHistory, setAiHistory] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [readingChapter, setReadingChapter] = useState(1);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [compareSources, setCompareSources] = useState([]);
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarks(savedBookmarks);

    const savedHighlights = JSON.parse(localStorage.getItem('highlights') || '[]');
    setHighlights(savedHighlights);

    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleHighlight = (id) => {
    const newHighlights = highlights.includes(id)
      ? highlights.filter(h => h !== id)
      : [...highlights, id];
    setHighlights(newHighlights);
    localStorage.setItem('highlights', JSON.stringify(newHighlights));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleBookmark = (passageId) => {
    const newBookmarks = bookmarks.includes(passageId)
      ? bookmarks.filter(b => b !== passageId)
      : [...bookmarks, passageId];
    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  const sharePassage = (passageId) => {
    const refs = CROSS_REFS[passageId] || [];
    let text = `SWRV Kingdom: ${passageId.replace('.', ' ')}\n\n`;
    refs.forEach(r => {
      text += `[${SOURCE_META[r.source].label}] ${r.ref}\n${r.note}\n\n`;
    });
    text += `Read more at swrvbirdsong.netlify.app`;
    
    if (navigator.share) {
      navigator.share({ title: `SWRV Kingdom: ${passageId}`, text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  const callGemini = async (prompt) => {
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/scholar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          systemPrompt: SYSTEM_PROMPT
        })
      });
      
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const text = data.text;
      setAiHistory(prev => [...prev, { role: 'user', text: prompt }, { role: 'ai', text }]);
      return text;
    } catch (err) {
      const errorMsg = "The AI Scholar is currently unavailable. Please try again later.";
      setAiHistory(prev => [...prev, { role: 'user', text: prompt }, { role: 'ai', text: errorMsg, isError: true }]);
      return errorMsg;
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- SCREENS ---

  const HomeScreen = () => (
    <ScreenTransition>
      <div className="hero-banner" style={{ borderRadius: '0 0 32px 32px', overflow: 'hidden', marginBottom: 24, height: 'auto', minHeight: 300 }}>
        <img src="https://res.cloudinary.com/dvyigk3sp/image/upload/v1776104453/IMG_1033_qmkp0q.png" 
             alt="Cover" 
             style={{ width: '100%', height: 'auto', display: 'block' }} 
             referrerPolicy="no-referrer" />
        <div style={{ padding: 24, paddingBottom: 32, background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
          <h1 className="hero-title" style={{ color: 'var(--text)', fontSize: 42, margin: 0 }}>SWRV Kingdom</h1>
          <p style={{ color: 'var(--text-dim)', margin: '8px 0 0 0', fontSize: 16, fontWeight: 500 }}>Historical Bible Study Library</p>
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          <button className="btn-secondary" style={{ flex: 1, borderRadius: 16, padding: '16px' }} onClick={() => setScreen('search')}>
            <Search size={20} /> Search
          </button>
          <button className="btn-primary" style={{ flex: 1, borderRadius: 16, padding: '16px' }} onClick={() => setTab('scholar')}>
            <Sparkles size={20} /> Ask AI
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 22, margin: 0 }}>Featured Study</h2>
          <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setTab('timeline')}>View Timeline</span>
        </div>

        {Object.keys(CROSS_REFS).slice(0, 3).map(id => (
          <div key={id} className="card" onClick={() => { setSelectedPassage(id); setScreen('passage'); }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 19 }}>{id.replace('.', ' ')}</h3>
              <ChevronRight size={20} color="var(--text-dim)" />
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-dim)', marginTop: 10, lineHeight: 1.5 }}>
              Parallel insights from {CROSS_REFS[id].slice(0, 2).map(r => SOURCE_META[r.source].label).join(' & ')}...
            </p>
          </div>
        ))}

        <div style={{ margin: '40px 0', padding: 24, background: 'rgba(0, 122, 255, 0.05)', border: '1px solid rgba(0, 122, 255, 0.1)', borderRadius: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 12, textTransform: 'uppercase' }}>The Zion Vision</div>
          <div style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.6, fontStyle: 'italic', fontWeight: 500 }}>
            "You cannot understand what a text means until you understand what it meant."
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 12, margin: '12px 0 0 0' }}>— Zion Birdsong</p>
        </div>
      </div>
    </ScreenTransition>
  );

  const SearchScreen = () => {
    const results = useMemo(() => {
      if (!globalSearchQuery) return [];
      const matches = [];
      Object.entries(CROSS_REFS).forEach(([passage, refs]) => {
        refs.forEach(ref => {
          if (ref.note.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
              ref.ref.toLowerCase().includes(globalSearchQuery.toLowerCase())) {
            matches.push({ passage, ...ref });
          }
        });
      });
      return matches;
    }, [globalSearchQuery]);

    return (
      <ScreenTransition>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <ArrowLeft onClick={() => setScreen('main')} style={{ cursor: 'pointer' }} />
          <h1 style={{ fontSize: 28, margin: 0 }}>Search Notes</h1>
        </div>
        <div className="input-group">
          <Search size={20} color="var(--text-dim)" />
          <input 
            placeholder="Search all cross-reference notes..." 
            value={globalSearchQuery}
            autoFocus
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
          />
        </div>
        
        {results.length > 0 ? results.map((res, i) => (
          <div key={i} className="card" onClick={() => { setSelectedPassage(res.passage); setScreen('passage'); }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 14 }}>{res.passage.replace('.', ' ')}</span>
              <span className="badge" style={{ background: SOURCE_META[res.source].color, color: '#000' }}>{SOURCE_META[res.source].label}</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>{res.note}</p>
          </div>
        )) : globalSearchQuery && (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', marginTop: 40 }}>No notes found matching "{globalSearchQuery}"</p>
        )}
      </ScreenTransition>
    );
  };

  const BooksScreen = () => {
    const filteredBooks = BIBLE_BOOKS.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return (
      <ScreenTransition>
        <h1 style={{ fontSize: 28, marginBottom: 20 }}>Library</h1>
        <div className="input-group">
          <Search size={20} color="var(--text-dim)" />
          <input 
            placeholder="Search books..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="book-grid">
          {filteredBooks.map(book => (
            <div key={book.id} className="book-item" onClick={() => { setSelectedBook(book); setScreen('book'); }}>
              <span style={{ color: 'var(--accent)', fontSize: 10, marginBottom: 4 }}>{book.id}</span>
              <span>{book.name}</span>
            </div>
          ))}
        </div>
      </ScreenTransition>
    );
  };

  const BookDetailScreen = () => {
    const passages = Object.keys(CROSS_REFS).filter(p => p.startsWith(selectedBook.id));
    const note = BOOK_NOTES[selectedBook.id];
    
    return (
      <ScreenTransition>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <ArrowLeft onClick={() => setScreen('main')} style={{ cursor: 'pointer' }} />
          <h1 style={{ fontSize: 28, margin: 0 }}>{selectedBook.name}</h1>
        </div>

        {note && (
          <div className="card" style={{ background: 'var(--surface)', borderStyle: 'dashed' }}>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.5 }}>
              {note}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="btn-primary" style={{ flex: 1 }} onClick={() => { setReadingChapter(1); setScreen('reading'); }}>
            <BookOpen size={18} /> Reading Mode
          </button>
        </div>

        <h2 style={{ fontSize: 18, marginTop: 24, marginBottom: 16 }}>Available Passages</h2>
        {passages.length > 0 ? passages.map(id => (
          <div key={id} className="card" onClick={() => { setSelectedPassage(id); setScreen('passage'); }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 17 }}>{id.replace('.', ' ')}</h3>
              <ChevronRight size={20} color="var(--text-dim)" />
            </div>
          </div>
        )) : (
          <p style={{ color: 'var(--text-dim)', textAlign: 'center', marginTop: 40 }}>
            No cross-references added for this book yet.
          </p>
        )}
      </ScreenTransition>
    );
  };

  const ReadingModeScreen = () => {
    const passageId = `${selectedBook.id}.${readingChapter}`;
    const refs = CROSS_REFS[passageId] || [];
    const [viewMode, setViewMode] = useState('list'); // list, parallel

    return (
      <ScreenTransition>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ArrowLeft onClick={() => setScreen('book')} style={{ cursor: 'pointer' }} />
            <h1 style={{ fontSize: 24, margin: 0 }}>{selectedBook.name} {readingChapter}</h1>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button 
              className="btn-secondary" 
              style={{ padding: '6px 12px', fontSize: 12 }}
              onClick={() => setViewMode(viewMode === 'list' ? 'parallel' : 'list')}
            >
              {viewMode === 'list' ? 'Parallel View' : 'List View'}
            </button>
          </div>
        </div>

        <div className="card" style={{ minHeight: '20vh', background: 'var(--surface)', fontSize: 18, lineHeight: 1.8, borderStyle: 'dashed' }}>
          <p style={{ opacity: 0.5, fontSize: 14 }}>
            Full text integration in progress. Tap any source below to highlight it for your study.
          </p>
        </div>

        <h2 style={{ fontSize: 18, marginTop: 30, marginBottom: 16 }}>Parallel Sources</h2>
        
        <div className={viewMode === 'parallel' ? 'parallel-view' : ''}>
          {refs.length > 0 ? refs.map((ref, i) => {
            const highlightId = `${passageId}-${ref.source}-${i}`;
            const isHighlighted = highlights.includes(highlightId);
            
            return (
              <div 
                key={i} 
                className={`card ${isHighlighted ? 'highlighted' : ''}`}
                onClick={() => toggleHighlight(highlightId)}
                style={{ 
                  cursor: 'pointer',
                  borderLeft: isHighlighted ? '4px solid gold' : '1px solid var(--border)',
                  background: isHighlighted ? 'rgba(255, 215, 0, 0.05)' : 'var(--card)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span className="badge" style={{ background: SOURCE_META[ref.source].color, color: '#000' }}>
                    {SOURCE_META[ref.source].label}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{ref.ref}</span>
                </div>
                <p style={{ margin: 0, lineHeight: 1.6, fontSize: 15 }}>{ref.note}</p>
              </div>
            );
          }) : (
            <p style={{ color: 'var(--text-dim)', textAlign: 'center' }}>No parallel sources for this chapter yet.</p>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
          <button 
            className="btn-secondary" 
            style={{ flex: 1 }} 
            disabled={readingChapter === 1}
            onClick={() => setReadingChapter(prev => prev - 1)}
          >Previous</button>
          <button 
            className="btn-secondary" 
            style={{ flex: 1 }} 
            disabled={readingChapter === selectedBook.chapters}
            onClick={() => setReadingChapter(prev => prev + 1)}
          >Next</button>
        </div>
      </ScreenTransition>
    );
  };

  const ChronologicalFlowScreen = () => {
    const era = selectedEra;
    const eraPassages = era.books.map(id => ({ id, refs: CROSS_REFS[id] || [] }));

    return (
      <ScreenTransition>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <ArrowLeft onClick={() => setScreen('main')} style={{ cursor: 'pointer' }} />
          <h1 style={{ fontSize: 24, margin: 0 }}>{era.label}</h1>
        </div>
        <p style={{ color: 'var(--accent)', fontWeight: 700, marginBottom: 30 }}>{era.period}</p>

        <div className="parallel-view">
          {eraPassages.map(p => (
            <div key={p.id} style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 8, marginBottom: 16 }}>
                <h2 style={{ fontSize: 20, margin: 0 }}>{p.id.replace('.', ' ')}</h2>
                <button 
                  className="btn-secondary" 
                  style={{ padding: '4px 12px', fontSize: 11 }}
                  onClick={() => {
                    const bookId = p.id.split('.')[0];
                    const chapter = parseInt(p.id.split('.')[1]) || 1;
                    setSelectedBook(BIBLE_BOOKS.find(b => b.id === bookId));
                    setReadingChapter(chapter);
                    setScreen('reading');
                    setTab('books');
                  }}
                >
                  Full Chapter
                </button>
              </div>
              {p.refs.map((ref, i) => {
                const highlightId = `flow-${p.id}-${ref.source}-${i}`;
                const isHighlighted = highlights.includes(highlightId);

                return (
                  <div 
                    key={i} 
                    className={`card ${isHighlighted ? 'highlighted' : ''}`} 
                    onClick={() => toggleHighlight(highlightId)}
                    style={{ 
                      background: isHighlighted ? 'rgba(255, 215, 0, 0.05)' : 'transparent', 
                      padding: '16px', 
                      border: '1px solid var(--border)', 
                      borderRadius: '12px',
                      marginBottom: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span className="badge" style={{ background: SOURCE_META[ref.source].color, color: '#000' }}>
                        {SOURCE_META[ref.source].label}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{ref.ref}</span>
                    </div>
                    <p style={{ margin: 0, lineHeight: 1.6, fontSize: 15 }}>{ref.note}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </ScreenTransition>
    );
  };

  const CompareScreen = () => {
    const refs = CROSS_REFS[selectedPassage] || [];
    const source1 = refs.find(r => r.source === compareSources[0]);
    const source2 = refs.find(r => r.source === compareSources[1]);

    return (
      <ScreenTransition>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <ArrowLeft onClick={() => setScreen('passage')} style={{ cursor: 'pointer' }} />
          <h1 style={{ fontSize: 24, margin: 0 }}>Compare Sources</h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="card" style={{ padding: 12 }}>
            <span className="badge" style={{ background: SOURCE_META[source1.source].color, color: '#000', marginBottom: 8 }}>{SOURCE_META[source1.source].label}</span>
            <p style={{ fontSize: 13, lineHeight: 1.6 }}>{source1.note}</p>
          </div>
          <div className="card" style={{ padding: 12 }}>
            <span className="badge" style={{ background: SOURCE_META[source2.source].color, color: '#000', marginBottom: 8 }}>{SOURCE_META[source2.source].label}</span>
            <p style={{ fontSize: 13, lineHeight: 1.6 }}>{source2.note}</p>
          </div>
        </div>
      </ScreenTransition>
    );
  };

  const PassageScreen = () => {
    const refs = CROSS_REFS[selectedPassage] || [];
    const [activeFilter, setActiveFilter] = useState('all');
    const [aiContext, setAiContext] = useState('');

    const filteredRefs = activeFilter === 'all' ? refs : refs.filter(r => r.source === activeFilter);

    useEffect(() => {
      if (geminiKey && !aiContext) {
        callGemini(`Explain the historical and Second Temple context of ${selectedPassage.replace('.', ' ')} briefly.`).then(setAiContext);
      }
    }, [selectedPassage]);

    return (
      <ScreenTransition>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ArrowLeft onClick={() => setScreen('book')} style={{ cursor: 'pointer' }} />
            <h1 style={{ fontSize: 24, margin: 0 }}>{selectedPassage.replace('.', ' ')}</h1>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {refs.length >= 2 && (
              <Filter 
                size={22} 
                onClick={() => {
                  setCompareSources([refs[0].source, refs[1].source]);
                  setScreen('compare');
                }}
                style={{ cursor: 'pointer' }}
              />
            )}
            <Bookmark 
              size={22} 
              fill={bookmarks.includes(selectedPassage) ? "var(--accent)" : "none"} 
              color={bookmarks.includes(selectedPassage) ? "var(--accent)" : "var(--text)"}
              onClick={() => toggleBookmark(selectedPassage)}
              style={{ cursor: 'pointer' }}
            />
            <Share2 size={22} onClick={() => sharePassage(selectedPassage)} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        <div className="source-tabs">
          <div 
            className={`source-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >All Sources</div>
          {refs.map(r => (
            <div 
              key={r.source}
              className={`source-tab ${activeFilter === r.source ? 'active' : ''}`}
              onClick={() => setActiveFilter(r.source)}
            >
              {SOURCE_META[r.source].label}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          {filteredRefs.map((ref, i) => (
            <div key={i} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className="badge" style={{ background: SOURCE_META[ref.source].color, color: '#000' }}>
                  {SOURCE_META[ref.source].label}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{ref.ref}</span>
              </div>
              <p style={{ margin: 0, lineHeight: 1.6, fontSize: 15 }}>{ref.note}</p>
            </div>
          ))}
        </div>

        {aiContext && (
          <div className="card" style={{ background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)', border: '1px solid rgba(0, 122, 255, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Sparkles size={18} color="var(--accent)" />
              <h3 style={{ margin: 0, fontSize: 16, color: 'var(--accent)' }}>Scholar Context</h3>
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--text)' }}>{aiContext}</p>
          </div>
        )}
      </ScreenTransition>
    );
  };

  const TimelineScreen = () => (
    <ScreenTransition>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Historical Timeline</h1>
      {TIMELINE.map(era => (
        <div key={era.id} className="timeline-item">
          <div className="timeline-dot" style={{ background: era.color, boxShadow: `0 0 10px ${era.color}` }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div onClick={() => { setSelectedEra(era); setScreen('flow'); }} style={{ cursor: 'pointer' }}>
              <h3 style={{ margin: 0, fontSize: 18, color: era.color }}>{era.label}</h3>
              <p style={{ margin: '4px 0 12px 0', fontSize: 12, fontWeight: 700, opacity: 0.6 }}>{era.period}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {era.books.map(b => (
              <div 
                key={b} 
                className="badge" 
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer' }}
                onClick={() => { setSelectedPassage(b); setScreen('passage'); }}
              >
                {b.replace('.', ' ')}
              </div>
            ))}
          </div>
        </div>
      ))}
    </ScreenTransition>
  );

  const AIScreen = () => {
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);
    const [showArtifact, setShowArtifact] = useState(null);

    const handleSend = async (customPrompt) => {
      const q = customPrompt || input;
      if (!q.trim() || isAiLoading) return;
      setInput('');
      const response = await callGemini(q);
      if (response && (response.includes('<!DOCTYPE html>') || response.includes('<html'))) {
        setShowArtifact(response);
      } else if (response && response.startsWith('Error')) {
        // Error is already added to history by callGemini in a way, 
        // but callGemini returns the text. Let's ensure it's visible.
      }
    };

    useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [aiHistory]);

    const suggestions = [
      { label: "Life of David", icon: <BookOpen size={16} /> },
      { label: "The Exodus", icon: <Clock size={16} /> },
      { label: "Second Temple History", icon: <Info size={16} /> },
      { label: "The Dead Sea Scrolls", icon: <Search size={16} /> }
    ];

    return (
      <ScreenTransition>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {showArtifact && <ArrowLeft onClick={() => setShowArtifact(null)} style={{ cursor: 'pointer' }} />}
            <h1 style={{ fontSize: 28, margin: 0 }}>AI Scholar</h1>
          </div>
          {!showArtifact && aiHistory.length > 0 && (
            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: 12, borderRadius: 10 }} onClick={() => setAiHistory([])}>
              Clear
            </button>
          )}
        </div>

        {showArtifact ? (
          <div style={{ height: 'calc(100vh - 220px)', border: '1px solid var(--border)', borderRadius: 24, overflow: 'hidden', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}>
            <iframe 
              srcDoc={showArtifact} 
              style={{ width: '100%', height: '100%', border: 'none' }} 
              title="AI Experience"
            />
          </div>
        ) : (
          <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', paddingBottom: 120 }}>
            {aiHistory.length === 0 ? (
              <div style={{ marginTop: 20 }}>
                <div className="card" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #5856D6 100%)', border: 'none', color: 'white', padding: 24 }}>
                  <Sparkles size={32} style={{ marginBottom: 16 }} />
                  <h2 style={{ fontSize: 22, margin: '0 0 8px 0', color: 'white' }}>Welcome to the Library</h2>
                  <p style={{ fontSize: 15, opacity: 0.9, lineHeight: 1.5, margin: 0 }}>
                    I can assemble comprehensive, chronological studies on any historical subject. Ask me to "Show me everything on..." a person, event, or concept.
                  </p>
                </div>

                <h3 style={{ fontSize: 17, margin: '24px 0 12px 0' }}>Suggested Topics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {suggestions.map((s, i) => (
                    <div key={i} className="card" style={{ marginBottom: 0, padding: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }} onClick={() => handleSend(`Show me everything on ${s.label}`)}>
                      <div style={{ color: 'var(--accent)' }}>{s.icon}</div>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {aiHistory.map((msg, i) => (
                  <div key={i} className={`chat-bubble ${msg.role === 'user' ? 'chat-user' : 'chat-ai'}`} style={{ maxWidth: '90%', border: msg.isError ? '1px solid #ff3b30' : 'none' }}>
                    {msg.text.includes('<html') ? (
                      <div style={{ textAlign: 'center', padding: '10px 0' }}>
                        <div style={{ fontSize: 13, marginBottom: 12, opacity: 0.8 }}>Experience Assembled Successfully</div>
                        <button className="btn-primary" style={{ width: '100%', borderRadius: 12 }} onClick={() => setShowArtifact(msg.text)}>
                          <ExternalLink size={18} /> Open Study Experience
                        </button>
                      </div>
                    ) : (
                      <div style={{ fontSize: 15, lineHeight: 1.5 }}>{msg.text}</div>
                    )}
                    {msg.role === 'ai' && !msg.text.includes('<html') && (
                      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                        <button className="btn-secondary" style={{ padding: '6px 10px', fontSize: 11, borderRadius: 8 }} onClick={() => navigator.clipboard.writeText(msg.text)}>
                          <Copy size={12} /> Copy Text
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {isAiLoading && (
              <div className="chat-bubble chat-ai" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Sparkles size={18} color="var(--accent)" />
                </motion.div>
                <span>Assembling primary sources...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        {!showArtifact && (
          <div style={{ position: 'fixed', bottom: 90, left: 20, right: 20, maxWidth: 460, margin: '0 auto', zIndex: 10 }}>
            <div className="input-group" style={{ marginBottom: 0, background: 'var(--card)', boxShadow: 'var(--shadow)', borderRadius: 16, padding: '4px 8px 4px 16px' }}>
              <input 
                placeholder="Ask for a study (e.g. 'Life of Paul')" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                style={{ fontSize: 16 }}
              />
              <div onClick={() => handleSend()} style={{ background: 'var(--accent)', padding: 10, borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={20} color="#fff" />
              </div>
            </div>
          </div>
        )}
      </ScreenTransition>
    );
  };

  const AboutScreen = () => (
    <ScreenTransition>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, margin: 0 }}>Settings</h1>
        <div onClick={toggleTheme} style={{ padding: 10, background: 'var(--surface)', borderRadius: 12, cursor: 'pointer', border: '1px solid var(--border)' }}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <img src="https://res.cloudinary.com/dvyigk3sp/image/upload/v1776104453/IMG_1033_qmkp0q.png" 
             alt="SWRV Kingdom" 
             style={{ width: 120, height: 120, borderRadius: 24, marginBottom: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} 
             referrerPolicy="no-referrer" />
        <h2 className="serif" style={{ fontSize: 24, margin: 0, color: 'var(--accent)' }}>SWRV Kingdom</h2>
        <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4 }}>Historical Bible Study Library</p>
      </div>
      
      <div className="card" onClick={() => sharePassage('GENERAL')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: 0 }}>Share SWRV Kingdom</h3>
          <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4 }}>Invite others to study history.</p>
        </div>
        <Share2 size={20} color="var(--accent)" />
      </div>

      {bookmarks.length > 0 && (
        <div className="card">
          <h3 style={{ margin: '0 0 12px 0' }}>Bookmarks</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {bookmarks.map(b => (
              <div 
                key={b} 
                className="badge" 
                style={{ background: 'var(--bg)', border: '1px solid var(--accent)', color: 'var(--accent)', cursor: 'pointer' }}
                onClick={() => { setSelectedPassage(b); setScreen('passage'); setTab('books'); }}
              >
                {b.replace('.', ' ')}
              </div>
            ))}
          </div>
        </div>
      )}

      {highlights.length > 0 && (
        <div className="card">
          <h3 style={{ margin: '0 0 12px 0' }}>Your Highlights</h3>
          <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12 }}>You have {highlights.length} highlighted passages.</p>
          <button className="btn-secondary" style={{ width: 'auto', padding: '8px 16px', fontSize: 13 }} onClick={() => { setHighlights([]); localStorage.removeItem('highlights'); }}>
            Clear All Highlights
          </button>
        </div>
      )}

      <div className="card">
        <h3 style={{ margin: '0 0 12px 0' }}>App Stats</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 10 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>{Object.keys(CROSS_REFS).length}</div>
            <div style={{ fontSize: 11, opacity: 0.6 }}>Passages</div>
          </div>
          <div style={{ background: 'var(--surface)', padding: 12, borderRadius: 10 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>10</div>
            <div style={{ fontSize: 11, opacity: 0.6 }}>Sources</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ background: 'rgba(201, 168, 76, 0.05)', borderColor: 'rgba(201, 168, 76, 0.2)' }}>
        <h3 style={{ margin: '0 0 12px 0', color: 'var(--accent)' }}>Zion's Vision</h3>
        <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>
          "This information should have never been sold. I want people to have knowledge because I love them. Everything flows in historical order, free forever."
        </p>
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-dim)', marginTop: 40 }}>
        Curated by Zion Birdsong • v1.0.0
      </p>
    </ScreenTransition>
  );

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {tab === 'home' && (
          screen === 'main' ? <HomeScreen key="home" /> :
          screen === 'search' ? <SearchScreen key="search" /> :
          <PassageScreen key="passage" />
        )}
        {tab === 'books' && (
          screen === 'main' ? <BooksScreen key="books" /> :
          screen === 'book' ? <BookDetailScreen key="book-detail" /> :
          screen === 'reading' ? <ReadingModeScreen key="reading" /> :
          screen === 'compare' ? <CompareScreen key="compare" /> :
          <PassageScreen key="passage" />
        )}
        {tab === 'timeline' && (
          screen === 'main' ? <TimelineScreen key="timeline" /> :
          screen === 'flow' ? <ChronologicalFlowScreen key="flow" /> :
          <PassageScreen key="passage" />
        )}
        {tab === 'scholar' && <AIScreen key="scholar" />}
        {tab === 'about' && <AboutScreen key="about" />}
      </AnimatePresence>

      <nav className="bottom-nav">
        <div className={`nav-item ${tab === 'home' ? 'active' : ''}`} onClick={() => { setTab('home'); setScreen('main'); }}>
          <Home size={24} />
          <span>Home</span>
        </div>
        <div className={`nav-item ${tab === 'books' ? 'active' : ''}`} onClick={() => { setTab('books'); setScreen('main'); }}>
          <Book size={24} />
          <span>Books</span>
        </div>
        <div className={`nav-item ${tab === 'timeline' ? 'active' : ''}`} onClick={() => { setTab('timeline'); setScreen('main'); }}>
          <Clock size={24} />
          <span>Timeline</span>
        </div>
        <div className={`nav-item ${tab === 'scholar' ? 'active' : ''}`} onClick={() => { setTab('scholar'); setScreen('main'); }}>
          <Sparkles size={24} />
          <span>Scholar</span>
        </div>
        <div className={`nav-item ${tab === 'about' ? 'active' : ''}`} onClick={() => { setTab('about'); setScreen('main'); }}>
          <Info size={24} />
          <span>About</span>
        </div>
      </nav>
    </div>
  );
}
