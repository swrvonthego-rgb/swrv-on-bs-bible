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

// --- STYLES ---
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display&display=swap');

  :root {
    --bg: #0d0d0f;
    --surface: #16161a;
    --card: #1e1e24;
    --accent: #c9a84c;
    --text: #ffffff;
    --text-dim: rgba(255, 255, 255, 0.6);
    --border: rgba(255, 255, 255, 0.07);
    --border-active: rgba(255, 255, 255, 0.12);
    --safe-top: env(safe-area-inset-top);
    --safe-bottom: env(safe-area-inset-bottom);
  }

  [data-theme="light"] {
    --bg: #f5f5f7;
    --surface: #ffffff;
    --card: #ffffff;
    --accent: #c9a84c;
    --text: #1d1d1f;
    --text-dim: rgba(0, 0, 0, 0.5);
    --border: rgba(0, 0, 0, 0.05);
    --border-active: rgba(0, 0, 0, 0.1);
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    margin: 0;
    padding: 0;
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, .serif {
    font-family: 'DM Serif Display', serif;
    font-weight: 400;
  }

  .app-container {
    max-width: 500px;
    margin: 0 auto;
    min-height: 100vh;
    padding-bottom: calc(80px + var(--safe-bottom));
    position: relative;
    background: var(--bg);
  }

  .hero-banner {
    width: 100%;
    height: 240px;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, var(--bg) 100%), url('https://res.cloudinary.com/dvyigk3sp/image/upload/v1776104453/IMG_1033_qmkp0q.png');
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
  }

  .hero-title {
    font-size: 36px;
    color: var(--accent);
    margin: 0;
    text-shadow: 0 2px 10px rgba(0,0,0,0.8);
  }

  .screen {
    padding: 20px;
    padding-top: calc(40px + var(--safe-top));
  }

  /* Navigation */
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(70px + var(--safe-bottom));
    background: rgba(22, 22, 26, 0.8);
    backdrop-filter: blur(20px);
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: var(--safe-bottom);
    z-index: 1000;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: var(--text-dim);
    font-size: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    flex: 1;
  }

  .nav-item.active {
    color: var(--accent);
  }

  /* Cards */
  .card {
    background: var(--card);
    border-radius: 16px;
    padding: 20px;
    border: 1px solid var(--border);
    margin-bottom: 16px;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  .card:active {
    transform: scale(0.98);
    border-color: var(--border-active);
  }

  /* Badges */
  .badge {
    padding: 4px 10px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: inline-block;
  }

  /* Buttons */
  .btn-primary {
    background: var(--accent);
    color: #000;
    border: none;
    border-radius: 12px;
    padding: 14px 20px;
    font-weight: 700;
    font-size: 15px;
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .btn-secondary {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px 16px;
    font-weight: 500;
    cursor: pointer;
  }

  /* Inputs */
  .input-group {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .input-group input {
    background: transparent;
    border: none;
    color: white;
    font-size: 16px;
    width: 100%;
    outline: none;
  }

  /* Grid */
  .book-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .book-item {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 8px;
    text-align: center;
    cursor: pointer;
  }

  .book-item span {
    display: block;
    font-size: 12px;
    font-weight: 700;
  }

  /* AI Scholar */
  .chat-bubble {
    padding: 16px;
    border-radius: 16px;
    margin-bottom: 16px;
    line-height: 1.6;
    font-size: 15px;
  }

  .chat-user {
    background: var(--accent);
    color: #000;
    align-self: flex-end;
    margin-left: 40px;
    border-bottom-right-radius: 4px;
  }

  .chat-ai {
    background: var(--surface);
    color: var(--text);
    align-self: flex-start;
    margin-right: 40px;
    border-bottom-left-radius: 4px;
    border: 1px solid var(--border);
  }

  /* Source Tabs */
  .source-tabs {
    display: flex;
    overflow-x: auto;
    gap: 8px;
    padding-bottom: 12px;
    scrollbar-width: none;
  }

  .source-tabs::-webkit-scrollbar { display: none; }

  .source-tab {
    padding: 8px 16px;
    border-radius: 20px;
    background: var(--surface);
    border: 1px solid var(--border);
    white-space: nowrap;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  }

  .source-tab.active {
    background: var(--accent);
    color: #000;
    border-color: var(--accent);
  }

  /* Timeline */
  .timeline-item {
    position: relative;
    padding-left: 30px;
    margin-bottom: 30px;
    border-left: 2px solid var(--border);
  }

  .timeline-dot {
    position: absolute;
    left: -7px;
    top: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
  }
`;

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

const SYSTEM_PROMPT = `Scholar treats Bible as historical-literary document. Zero religious framing. Always surfaces original audience understanding. Flags mistranslations, colonial distortions, whitewashing. Reads NT through first-century Second Temple Jewish lens. Cites Josephus. Cross-references Septuagint vs Hebrew MT differences. Covers Watcher tradition, divine council, Nephilim with full Second Temple framework.`;

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
  const [geminiKey, setGeminiKey] = useState(localStorage.getItem('gemini_key') || '');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [readingChapter, setReadingChapter] = useState(1);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [compareSources, setCompareSources] = useState([]);

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = STYLES;
    document.head.appendChild(styleTag);
    
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarks(savedBookmarks);

    document.documentElement.setAttribute('data-theme', theme);

    return () => document.head.removeChild(styleTag);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const saveGeminiKey = (key) => {
    setGeminiKey(key);
    localStorage.setItem('gemini_key', key);
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
    if (!geminiKey) return "Please add your Gemini API Key in the About screen.";
    setIsAiLoading(true);
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 1200 }
        })
      });
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      setAiHistory(prev => [...prev, { role: 'user', text: prompt }, { role: 'ai', text }]);
      return text;
    } catch (err) {
      return "Error connecting to AI Scholar. Check your key and connection.";
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- SCREENS ---

  const HomeScreen = () => (
    <ScreenTransition>
      <div className="hero-banner">
        <h1 className="hero-title">SWRV Kingdom</h1>
        <p style={{ color: 'var(--text-dim)', margin: '4px 0 0 0', fontSize: 14 }}>Historical Bible Study Library</p>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 30, marginTop: 20 }}>
          <button className="btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => setScreen('search')}>
            <Search size={18} /> Search Notes
          </button>
          <button className="btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => setTab('scholar')}>
            <Sparkles size={18} /> Ask Scholar
          </button>
        </div>

        <h2 style={{ fontSize: 20, marginBottom: 16 }}>Featured Passages</h2>
        {Object.keys(CROSS_REFS).slice(0, 4).map(id => (
          <div key={id} className="card" onClick={() => { setSelectedPassage(id); setScreen('passage'); }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 18 }}>{id.replace('.', ' ')}</h3>
              <span className="badge" style={{ background: 'rgba(201, 168, 76, 0.1)', color: 'var(--accent)' }}>
                {CROSS_REFS[id].length} Sources
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-dim)', marginTop: 8, lineHeight: 1.4 }}>
              Explore parallel historical contexts from {CROSS_REFS[id].slice(0, 3).map(r => SOURCE_META[r.source].label).join(', ')}...
            </p>
          </div>
        ))}

        <h2 style={{ fontSize: 20, marginTop: 30, marginBottom: 16 }}>The 10 Sources</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
          {Object.entries(SOURCE_META).map(([key, meta]) => (
            <div key={key} className="card" style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: meta.color }}></div>
                <h3 style={{ margin: 0, fontSize: 16 }}>{meta.label}</h3>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 8, lineHeight: 1.4 }}>{meta.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ margin: '30px 0', padding: 20, background: 'rgba(201, 168, 76, 0.05)', border: '1px solid rgba(201, 168, 76, 0.15)', borderRadius: 'var(--radius)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 8 }}>THE FOUNDATIONAL RULE</div>
          <div style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, fontStyle: 'italic' }}>
            "You cannot understand what a text means until you understand what it meant. Every text was written by someone, to someone, about something specific."
          </div>
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

    return (
      <ScreenTransition>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ArrowLeft onClick={() => setScreen('book')} style={{ cursor: 'pointer' }} />
            <h1 style={{ fontSize: 24, margin: 0 }}>{selectedBook.name} {readingChapter}</h1>
          </div>
        </div>

        <div className="card" style={{ minHeight: '40vh', background: 'var(--surface)', fontSize: 18, lineHeight: 1.8 }}>
          <p style={{ opacity: 0.5, fontSize: 14 }}>Full text for {selectedBook.name} {readingChapter} is being integrated. Use parallel sources below for historical context.</p>
        </div>

        <h2 style={{ fontSize: 18, marginTop: 30, marginBottom: 16 }}>Parallel Sources</h2>
        {refs.length > 0 ? refs.map((ref, i) => (
          <div key={i} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="badge" style={{ background: SOURCE_META[ref.source].color, color: '#000' }}>
                {SOURCE_META[ref.source].label}
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{ref.ref}</span>
            </div>
            <p style={{ margin: 0, lineHeight: 1.6, fontSize: 15 }}>{ref.note}</p>
          </div>
        )) : (
          <p style={{ color: 'var(--text-dim)', textAlign: 'center' }}>No parallel sources for this chapter yet.</p>
        )}

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

        {eraPassages.map(p => (
          <div key={p.id} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, borderBottom: '1px solid var(--border)', paddingBottom: 8, marginBottom: 16 }}>{p.id.replace('.', ' ')}</h2>
            {p.refs.map((ref, i) => (
              <div key={i} className="card" style={{ background: 'transparent', padding: '0 0 20px 0', border: 'none', borderBottom: '1px solid var(--border)', borderRadius: 0 }}>
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
        ))}
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
              color={bookmarks.includes(selectedPassage) ? "var(--accent)" : "white"}
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
          <div className="card" style={{ background: 'linear-gradient(135deg, #1e1e24 0%, #16161a 100%)', border: '1px solid rgba(201, 168, 76, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Sparkles size={18} color="var(--accent)" />
              <h3 style={{ margin: 0, fontSize: 16, color: 'var(--accent)' }}>Scholar Context</h3>
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>{aiContext}</p>
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

    const handleSend = async () => {
      if (!input.trim()) return;
      const q = input;
      setInput('');
      await callGemini(q);
    };

    useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [aiHistory]);

    return (
      <ScreenTransition>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>AI Scholar</h1>
        <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>Ask about historical context, original languages, or Second Temple traditions.</p>

        <div style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', paddingBottom: 100 }}>
          {aiHistory.length === 0 && (
            <div style={{ marginTop: 'auto', marginBottom: 'auto', textAlign: 'center', opacity: 0.5 }}>
              <Sparkles size={48} style={{ marginBottom: 16 }} />
              <p>Try: "What is the divine council in Psalm 82?"</p>
            </div>
          )}
          
          {aiHistory.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.role === 'user' ? 'chat-user' : 'chat-ai'}`}>
              {msg.text}
              {msg.role === 'ai' && (
                <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
                  <button className="btn-secondary" style={{ padding: '4px 8px', fontSize: 11 }} onClick={() => navigator.clipboard.writeText(msg.text)}>
                    <Copy size={12} /> Copy
                  </button>
                </div>
              )}
            </div>
          ))}
          {isAiLoading && <div className="chat-bubble chat-ai">Scholar is thinking...</div>}
          <div ref={chatEndRef} />
        </div>

        <div style={{ position: 'fixed', bottom: 90, left: 20, right: 20, maxWidth: 460, margin: '0 auto' }}>
          <div className="input-group" style={{ marginBottom: 0, background: 'var(--card)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <input 
              placeholder="Ask the Scholar..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <div onClick={handleSend} style={{ background: 'var(--accent)', padding: 8, borderRadius: 8, cursor: 'pointer' }}>
              <ChevronRight size={20} color="#000" />
            </div>
          </div>
        </div>
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
      
      <div className="card">
        <h3 style={{ margin: '0 0 12px 0' }}>Gemini API Key</h3>
        <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 16 }}>
          To use the AI Scholar, enter your free Gemini API key from Google AI Studio.
        </p>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Enter API Key..." 
            value={geminiKey}
            onChange={(e) => saveGeminiKey(e.target.value)}
          />
        </div>
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
                style={{ background: 'var(--surface)', border: '1px solid var(--accent)', color: 'var(--accent)', cursor: 'pointer' }}
                onClick={() => { setSelectedPassage(b); setScreen('passage'); setTab('books'); }}
              >
                {b.replace('.', ' ')}
              </div>
            ))}
          </div>
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
