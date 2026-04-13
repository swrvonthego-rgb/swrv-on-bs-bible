import { useState, useEffect, useRef, useCallback } from 'react'
import { CROSS_REFS, TIMELINE, SOURCE_META } from './data/crossrefs.js'

// ── STYLES ──────────────────────────────────────────────────────────────────
const css = `
  :root {
    --bg:       #0d0d0f;
    --surface:  #16161a;
    --card:     #1e1e24;
    --border:   rgba(255,255,255,0.07);
    --border2:  rgba(255,255,255,0.12);
    --gold:     #c9a84c;
    --gold-dim: #a07c30;
    --text:     #f0ede8;
    --text2:    #a09890;
    --text3:    #605850;
    --radius:   16px;
    --radius-sm:10px;
  }
  * { box-sizing:border-box; margin:0; padding:0; -webkit-tap-highlight-color:transparent; }
  body { background:var(--bg); color:var(--text); font-family:'DM Sans',system-ui,sans-serif; }

  /* scrollbars */
  ::-webkit-scrollbar { width:4px; height:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.12); border-radius:4px; }

  /* layout */
  .app { display:flex; flex-direction:column; min-height:100vh; max-width:430px; margin:0 auto; position:relative; }
  @media(min-width:900px){ .app { max-width:100%; flex-direction:row; } }

  /* nav */
  .bottom-nav {
    position:fixed; bottom:0; left:50%; transform:translateX(-50%);
    width:100%; max-width:430px;
    background:rgba(13,13,15,0.92);
    backdrop-filter:blur(20px);
    border-top:1px solid var(--border);
    display:flex; z-index:100;
    padding-bottom:env(safe-area-inset-bottom);
  }
  @media(min-width:900px){
    .bottom-nav { 
      position:fixed; left:0; top:0; transform:none;
      width:72px; max-width:72px; height:100vh;
      flex-direction:column; border-top:none; border-right:1px solid var(--border);
      padding-bottom:0; padding-top:env(safe-area-inset-top);
    }
  }
  .nav-btn {
    flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center;
    gap:3px; padding:10px 4px 8px; border:none; background:transparent;
    color:var(--text3); cursor:pointer; transition:color 0.2s;
    font-family:'DM Sans',sans-serif; font-size:10px; font-weight:500;
  }
  .nav-btn.active { color:var(--gold); }
  .nav-btn svg { width:22px; height:22px; }
  @media(min-width:900px){
    .nav-btn { flex:0; padding:18px 0; font-size:9px; }
  }

  /* main content */
  .main { flex:1; overflow-y:auto; padding-bottom:80px; }
  @media(min-width:900px){ .main { margin-left:72px; padding-bottom:0; padding:0 0 0 0; } }

  /* header */
  .page-header {
    padding:56px 20px 16px;
    padding-top:calc(56px + env(safe-area-inset-top));
    background:linear-gradient(180deg, rgba(201,168,76,0.08) 0%, transparent 100%);
    border-bottom:1px solid var(--border);
  }
  .page-header h1 { 
    font-family:'DM Serif Display',Georgia,serif;
    font-size:28px; color:var(--gold); letter-spacing:-0.5px; line-height:1.1;
  }
  .page-header p { color:var(--text2); font-size:13px; margin-top:4px; }

  /* cards */
  .card {
    background:var(--card); border-radius:var(--radius);
    border:1px solid var(--border); overflow:hidden;
    transition:border-color 0.2s;
  }
  .card:active { border-color:var(--border2); }

  /* source badge */
  .source-badge {
    display:inline-flex; align-items:center; gap:5px;
    padding:3px 8px; border-radius:20px;
    font-size:10px; font-weight:600; letter-spacing:0.04em;
    border:1px solid currentColor;
  }

  /* timeline pill */
  .timeline-pill {
    display:inline-flex; align-items:center; gap:6px;
    padding:5px 12px; border-radius:20px; cursor:pointer;
    font-size:12px; font-weight:500; border:1px solid var(--border);
    background:var(--card); color:var(--text2);
    transition:all 0.2s; white-space:nowrap;
  }
  .timeline-pill.active { border-color:var(--gold); color:var(--gold); background:rgba(201,168,76,0.08); }

  /* search */
  .search-wrap { position:relative; }
  .search-input {
    width:100%; padding:12px 16px 12px 44px;
    background:var(--card); border:1px solid var(--border);
    border-radius:var(--radius-sm); color:var(--text);
    font-size:15px; font-family:'DM Sans',sans-serif;
    outline:none; transition:border-color 0.2s;
  }
  .search-input:focus { border-color:var(--gold); }
  .search-input::placeholder { color:var(--text3); }
  .search-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text3); }

  /* ref card */
  .ref-card {
    background:var(--card); border-radius:var(--radius-sm);
    border:1px solid var(--border); padding:14px;
    margin-bottom:10px; cursor:pointer; transition:all 0.2s;
  }
  .ref-card:hover { border-color:var(--border2); transform:translateY(-1px); }
  .ref-card-source { font-size:10px; font-weight:600; letter-spacing:0.06em; margin-bottom:6px; }
  .ref-card-ref { font-size:14px; font-weight:600; color:var(--text); margin-bottom:4px; }
  .ref-card-note { font-size:12px; color:var(--text2); line-height:1.5; }

  /* AI panel */
  .ai-panel {
    background:linear-gradient(135deg, rgba(201,168,76,0.06), rgba(201,168,76,0.02));
    border:1px solid rgba(201,168,76,0.2); border-radius:var(--radius);
    padding:16px; margin-bottom:16px;
  }
  .ai-label { font-size:10px; font-weight:700; letter-spacing:0.1em; color:var(--gold); margin-bottom:8px; }
  .ai-text { font-size:14px; line-height:1.65; color:var(--text2); }
  .ai-loading { display:flex; gap:4px; align-items:center; padding:8px 0; }
  .ai-dot { width:6px; height:6px; border-radius:50%; background:var(--gold); animation:pulse 1.2s infinite; }
  .ai-dot:nth-child(2) { animation-delay:0.2s; }
  .ai-dot:nth-child(3) { animation-delay:0.4s; }
  @keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }

  /* book selector */
  .book-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; padding:0 16px 16px; }
  @media(min-width:600px){ .book-grid { grid-template-columns:repeat(4,1fr); } }
  .book-tile {
    background:var(--card); border:1px solid var(--border);
    border-radius:var(--radius-sm); padding:12px 8px;
    text-align:center; cursor:pointer; transition:all 0.2s;
  }
  .book-tile:active { transform:scale(0.96); }
  .book-tile-num { font-size:9px; color:var(--text3); font-weight:600; letter-spacing:0.06em; }
  .book-tile-name { font-size:12px; font-weight:600; color:var(--text); margin-top:2px; }
  .book-tile-count { font-size:9px; color:var(--gold); margin-top:3px; }

  /* passage view */
  .passage-header {
    display:flex; align-items:center; gap:12px;
    padding:16px; border-bottom:1px solid var(--border);
  }
  .back-btn {
    width:32px; height:32px; border-radius:50%; border:1px solid var(--border);
    background:var(--card); display:flex; align-items:center; justify-content:center;
    cursor:pointer; color:var(--text2); flex-shrink:0;
  }
  .passage-title { font-family:'DM Serif Display',serif; font-size:18px; color:var(--gold); }

  /* source tabs */
  .source-tabs { display:flex; gap:8px; padding:12px 16px; overflow-x:auto; }
  .source-tab {
    padding:6px 14px; border-radius:20px; border:1px solid var(--border);
    background:var(--card); font-size:11px; font-weight:600;
    cursor:pointer; white-space:nowrap; transition:all 0.2s; color:var(--text2);
  }
  .source-tab.active { border-color:currentColor; }

  /* ai studio input */
  .ai-input-wrap { padding:16px; }
  .ai-input {
    width:100%; padding:14px 16px; background:var(--card);
    border:1px solid var(--border); border-radius:var(--radius-sm);
    color:var(--text); font-size:14px; font-family:'DM Sans',sans-serif;
    resize:none; outline:none; min-height:80px; transition:border-color 0.2s;
    line-height:1.5;
  }
  .ai-input:focus { border-color:var(--gold); }
  .ai-submit {
    margin-top:8px; width:100%; padding:13px;
    background:var(--gold); color:#0d0d0f; border:none;
    border-radius:var(--radius-sm); font-size:14px; font-weight:700;
    cursor:pointer; font-family:'DM Sans',sans-serif; letter-spacing:0.02em;
    transition:opacity 0.2s;
  }
  .ai-submit:active { opacity:0.85; }
  .ai-submit:disabled { opacity:0.4; cursor:not-allowed; }

  /* settings */
  .settings-row {
    display:flex; align-items:center; justify-content:space-between;
    padding:14px 16px; border-bottom:1px solid var(--border);
  }
  .settings-label { font-size:14px; color:var(--text); }
  .settings-sub { font-size:12px; color:var(--text2); margin-top:2px; }
  .toggle {
    width:44px; height:26px; border-radius:13px; background:var(--card);
    border:1px solid var(--border); position:relative; cursor:pointer;
    transition:background 0.2s;
  }
  .toggle.on { background:var(--gold); border-color:var(--gold); }
  .toggle::after {
    content:''; position:absolute; top:3px; left:3px;
    width:18px; height:18px; border-radius:50%; background:#fff;
    transition:transform 0.2s; box-shadow:0 1px 3px rgba(0,0,0,0.3);
  }
  .toggle.on::after { transform:translateX(18px); }

  /* key input */
  .key-input {
    width:100%; padding:11px 14px; background:var(--card);
    border:1px solid var(--border); border-radius:var(--radius-sm);
    color:var(--text); font-size:13px; font-family:'DM Sans',sans-serif;
    outline:none; margin-top:6px; transition:border-color 0.2s;
  }
  .key-input:focus { border-color:var(--gold); }

  /* fade in */
  .fade-in { animation:fadeIn 0.3s ease; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

  /* section label */
  .section-label {
    font-size:10px; font-weight:700; letter-spacing:0.1em;
    color:var(--text3); padding:16px 16px 8px; text-transform:uppercase;
  }

  /* gold divider */
  .gold-line { height:1px; background:linear-gradient(90deg,transparent,var(--gold),transparent); margin:4px 16px; opacity:0.3; }

  /* about screen */
  .about-hero {
    padding:40px 20px 24px; text-align:center;
    background:linear-gradient(180deg,rgba(201,168,76,0.1) 0%,transparent 100%);
    border-bottom:1px solid var(--border);
  }
  .about-logo { 
    font-family:'DM Serif Display',serif; font-size:36px;
    color:var(--gold); letter-spacing:-1px; line-height:1;
  }
  .about-sub { color:var(--text2); font-size:13px; margin-top:8px; line-height:1.5; }
  .stat-row { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--border); margin:16px; border-radius:var(--radius); overflow:hidden; }
  .stat-cell { background:var(--card); padding:16px 8px; text-align:center; }
  .stat-num { font-size:22px; font-weight:700; color:var(--gold); font-family:'DM Serif Display',serif; }
  .stat-lbl { font-size:10px; color:var(--text3); margin-top:2px; font-weight:600; letter-spacing:0.04em; }
`

// ── SYSTEM PROMPT ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the SWRV Kingdom Historical Bible Study Assistant — built to help people understand the Bible accurately, in its original historical and cultural context, without religious agenda, political distortion, or man-made tradition getting in the way. You have access to 8 primary sources: the Dead Sea Scrolls (García Martínez), JPS Tanakh 1917, Complete Book of Enoch (Jay Winter), Amplified Study Bible, NKJV Chronological Study Bible, Brenton Septuagint with Apocrypha (1851), Complete Works of Josephus (Whiston), and the Zondervan Illustrated Bible Dictionary.

SOURCES NOT USED — and why:
- Philo of Alexandria: imposed Greek Platonic philosophy onto Hebrew text, was not a believer in Jesus Christ, had no relationship with the Holy Spirit
- Jewish Annotated New Testament (Levine & Brettler): neither editor believes Jesus is the Messiah. Their commentary reads the NT as literary critics, not believers. The actual Scripture they reference is valid — the commentary interpreting it is not authoritative

When any question references the NT, use the NKJV Chronological Study Bible and the Amplified — both are Spirit-breathed translations. Cross-reference with the Septuagint when NT writers quote the OT.

RULES — never break these:
- Scripture is the final authority. Every source in this library exists to illuminate what Scripture says — not to contradict or replace it.
- Always tell the user what the ORIGINAL AUDIENCE understood — first-century Jews, Second Temple Israelites, Hebrew covenant people. Not modern Western readers filtered through centuries of tradition.
- Flag every known mistranslation, political agenda, whitewashing, colonial distortion, or denominational spin that has obscured the text's actual meaning.
- SEPTUAGINT (LXX) RULE: The Septuagint is not a backup translation — it is the Bible the NT writers used. When NT writers quote the OT, they are almost always quoting the LXX, not the Hebrew. Flag every place the LXX differs from the Hebrew Masoretic text and explain why it matters. The LXX translation of almah as parthenos (virgin) in Isaiah 7:14 was not a mistake — it was the Holy Spirit preparing the translation for the New Covenant. The LXX reading of 'angels of God' in Genesis 6:2 preserves the supernatural reading the Hebrew carries. Never dismiss a LXX variant without explaining its significance.
- ZONDERVAN RULE: The Zondervan Illustrated Bible Dictionary is a tool for word studies and cultural background — not a theological authority. Use it to unpack what Hebrew and Greek words actually mean in their original context, what ancient Near Eastern culture looked like, and where denominational tradition has introduced distortion. The dictionary illuminates the text. Scripture is always the final word.
- AMPLIFIED RULE: The Amplified Study Bible unpacks the range of meaning that single English words carry from the original Hebrew and Greek. Use it to show the depth of a word, not to replace the text. When the Amplified adds bracketed expansions, those expansions represent the full semantic range — they do not add to Scripture but reveal what was already there.
- NT passages: always read through first-century Second Temple Jewish lens. Jesus, Paul, Peter, and John were Jews. Their words were saturated with Torah, Prophets, Psalms, and the apocalyptic tradition.
- For Genesis 1-11: always cross-reference the Book of Enoch and Dead Sea Scrolls — Watcher story, Nephilim, divine council. This was the standard Jewish interpretive framework of Jesus' day.
- For angels, divine council, Nephilim, supernatural beings: give the full biblical and Second Temple picture. Do not flatten the supernatural into metaphor or symbolism.
- For kingship, temple, priesthood, covenant: explain the ancient Near Eastern context — tselem (image), abad and shamar (serve and guard), suzerainty treaty structure, temple as cosmic mountain.
- Cite Josephus for historical confirmation only. He was an eyewitness Jewish historian who was not a believer. His value is his record of facts, geography, and culture — not his theology.
- Isaiah 7:14 — present near/far fulfillment as the correct framework. The virgin birth prophecy is genuine. The LXX's parthenos was Holy Spirit preparation, not mistranslation.
- Revelation — the Dragon is Satan, the ancient serpent, not merely Rome. The cosmic war is real. The Woman is the covenant people through whom Messiah came. Do not reduce this to political commentary.
- Be honest about what is historically confirmed vs. debated — but never let academic uncertainty undermine what Scripture plainly states.
- Keep responses clear and readable on mobile. Use sections. No walls of text.`

// ── BOOKS DATA ────────────────────────────────────────────────────────────────
const BOOKS = [
  // Torah
  { id:"GEN", name:"Genesis", abbr:"Gen", group:"Torah", refs:["GEN.1","GEN.2","GEN.3","GEN.4","GEN.5","GEN.6","GEN.12","GEN.14","GEN.22"] },
  { id:"EXO", name:"Exodus", abbr:"Exo", group:"Torah", refs:["EXO.3","EXO.20"] },
  { id:"LEV", name:"Leviticus", abbr:"Lev", group:"Torah", refs:[] },
  { id:"NUM", name:"Numbers", abbr:"Num", group:"Torah", refs:[] },
  { id:"DEU", name:"Deuteronomy", abbr:"Deu", group:"Torah", refs:["DEU.6"] },
  // History
  { id:"JOS", name:"Joshua", abbr:"Jos", group:"History", refs:[] },
  { id:"JDG", name:"Judges", abbr:"Jdg", group:"History", refs:[] },
  { id:"RUT", name:"Ruth", abbr:"Rut", group:"History", refs:[] },
  { id:"1SA", name:"1 Samuel", abbr:"1Sa", group:"History", refs:[] },
  { id:"2SA", name:"2 Samuel", abbr:"2Sa", group:"History", refs:[] },
  { id:"1KI", name:"1 Kings", abbr:"1Ki", group:"History", refs:[] },
  { id:"2KI", name:"2 Kings", abbr:"2Ki", group:"History", refs:[] },
  // Wisdom
  { id:"JOB", name:"Job", abbr:"Job", group:"Wisdom", refs:["JOB.1"] },
  { id:"PSA", name:"Psalms", abbr:"Psa", group:"Wisdom", refs:["PSA.82"] },
  { id:"PRO", name:"Proverbs", abbr:"Pro", group:"Wisdom", refs:[] },
  { id:"ECC", name:"Ecclesiastes", abbr:"Ecc", group:"Wisdom", refs:[] },
  // Prophets
  { id:"ISA", name:"Isaiah", abbr:"Isa", group:"Prophets", refs:["ISA.7"] },
  { id:"JER", name:"Jeremiah", abbr:"Jer", group:"Prophets", refs:[] },
  { id:"EZE", name:"Ezekiel", abbr:"Eze", group:"Prophets", refs:["EZE.28"] },
  { id:"DAN", name:"Daniel", abbr:"Dan", group:"Prophets", refs:["DAN.7","DAN.9"] },
  // NT
  { id:"MAT", name:"Matthew", abbr:"Mat", group:"Gospels", refs:[] },
  { id:"MRK", name:"Mark", abbr:"Mrk", group:"Gospels", refs:[] },
  { id:"LUK", name:"Luke", abbr:"Luk", group:"Gospels", refs:[] },
  { id:"JHN", name:"John", abbr:"Jhn", group:"Gospels", refs:["JHN.1"] },
  { id:"ACT", name:"Acts", abbr:"Act", group:"NT", refs:["ACT.2"] },
  { id:"ROM", name:"Romans", abbr:"Rom", group:"NT", refs:[] },
  { id:"1CO", name:"1 Corinthians", abbr:"1Co", group:"NT", refs:[] },
  { id:"HEB", name:"Hebrews", abbr:"Heb", group:"NT", refs:[] },
  { id:"REV", name:"Revelation", abbr:"Rev", group:"NT", refs:["REV.12"] },
  // Extra-canonical
  { id:"ENO", name:"Book of Enoch", abbr:"Eno", group:"Extra-canonical", refs:[] },
  { id:"APO", name:"Apocrypha", abbr:"Apo", group:"Extra-canonical", refs:[] },
]

// ── ICONS ─────────────────────────────────────────────────────────────────────
const Icon = {
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  book: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  timeline: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  ai: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
  info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,18 9,12 15,6"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  send: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>,
  copy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
}

// ── GEMINI API CALL ───────────────────────────────────────────────────────────
async function callGemini(apiKey, userMessage, context = '') {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`
  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ 
      role: 'user', 
      parts: [{ text: context ? `Context: ${context}\n\n${userMessage}` : userMessage }] 
    }],
    generationConfig: { temperature: 0.4, maxOutputTokens: 1200 }
  }
  const res = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.'
}

// ── HOME SCREEN ───────────────────────────────────────────────────────────────
function HomeScreen({ onNavigate, apiKey }) {
  const featured = [
    { key:"GEN.6", label:"Genesis 6 — The Watchers", desc:"Where the divine beings descended. What Enoch, the DSS, and Josephus all say happened.", tag:"MOST REFERENCED" },
    { key:"DAN.7", label:"Daniel 7 — Son of Man", desc:"The preexistent heavenly figure Jesus claimed to be. What Enoch 46-48 adds to the story.", tag:"KEY PASSAGE" },
    { key:"PSA.82", label:"Psalm 82 — Divine Council", desc:"The divine assembly of the Most High. How Jesus used this text. What the DSS confirms.", tag:"MISUNDERSTOOD" },
    { key:"JHN.1", label:"John 1 — The Word Made Flesh", desc:"Rooted in Proverbs 8, Psalm 33, and the Hebrew Wisdom tradition. The eternal creative Word of God that spoke creation into existence entered creation in person.", tag:"THE INCARNATION" },
  ]
  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>SWRV Kingdom</h1>
        <p>Historical Bible Study Library — No Religion. Just History.</p>
      </div>

      <div className="section-label">Featured Passages</div>
      <div style={{padding:'0 16px'}}>
        {featured.map(f => (
          <div key={f.key} className="ref-card" onClick={() => onNavigate('passage', f.key)} style={{marginBottom:10}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
              <div className="ref-card-ref">{f.label}</div>
              <span style={{fontSize:9,fontWeight:700,color:'var(--gold)',letterSpacing:'0.06em',background:'rgba(201,168,76,0.1)',padding:'2px 7px',borderRadius:10,whiteSpace:'nowrap',marginLeft:8}}>{f.tag}</span>
            </div>
            <div className="ref-card-note">{f.desc}</div>
            <div style={{marginTop:8,display:'flex',gap:6,flexWrap:'wrap'}}>
              {(CROSS_REFS[f.key]||[]).slice(0,3).map((r,i) => (
                <span key={i} className="source-badge" style={{color:SOURCE_META[r.source]?.color,borderColor:SOURCE_META[r.source]?.color+'44',fontSize:9}}>
                  {SOURCE_META[r.source]?.short}
                </span>
              ))}
              {(CROSS_REFS[f.key]||[]).length > 3 && (
                <span style={{fontSize:9,color:'var(--text3)'}}>+{CROSS_REFS[f.key].length-3} more</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="section-label">The 10 Sources</div>
      <div style={{padding:'0 16px 16px',display:'flex',flexDirection:'column',gap:6}}>
        {Object.entries(SOURCE_META).map(([key, meta]) => (
          <div key={key} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',background:'var(--card)',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)'}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:meta.color,flexShrink:0}} />
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{meta.label}</div>
            </div>
            <span className="source-badge" style={{color:meta.color,borderColor:meta.color+'44'}}>{meta.short}</span>
          </div>
        ))}
      </div>

      <div style={{margin:'0 16px 16px',padding:16,background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:'var(--radius)'}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.1em',color:'var(--gold)',marginBottom:8}}>THE FOUNDATIONAL RULE</div>
        <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.6,fontStyle:'italic'}}>
          "You cannot understand what a text means until you understand what it meant. Every text was written by someone, to someone, about something specific — before it was ever written to you."
        </div>
      </div>
    </div>
  )
}

// ── BOOKS SCREEN ──────────────────────────────────────────────────────────────
function BooksScreen({ onNavigate }) {
  const [search, setSearch] = useState('')
  const groups = [...new Set(BOOKS.map(b => b.group))]
  const filtered = BOOKS.filter(b => b.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Books</h1>
        <p>Select any book to see cross-references across all 8 sources</p>
      </div>
      <div style={{padding:'12px 16px'}}>
        <div className="search-wrap">
          <span className="search-icon">{Icon.search}</span>
          <input className="search-input" placeholder="Search books..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
      </div>
      {groups.map(group => {
        const groupBooks = filtered.filter(b => b.group === group)
        if (!groupBooks.length) return null
        return (
          <div key={group}>
            <div className="section-label">{group}</div>
            <div className="book-grid">
              {groupBooks.map(book => (
                <div key={book.id} className="book-tile" onClick={() => onNavigate('book', book.id)}
                  style={book.refs.length ? {borderColor:'rgba(201,168,76,0.2)'} : {}}>
                  <div className="book-tile-num">{book.group}</div>
                  <div className="book-tile-name">{book.name}</div>
                  {book.refs.length > 0 && (
                    <div className="book-tile-count">{book.refs.length} cross-refs</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── BOOK DETAIL SCREEN ────────────────────────────────────────────────────────
function BookScreen({ bookId, onNavigate, onBack }) {
  const book = BOOKS.find(b => b.id === bookId)
  if (!book) return null

  return (
    <div className="fade-in">
      <div className="passage-header">
        <button className="back-btn" onClick={onBack}>{Icon.back}</button>
        <div>
          <div className="passage-title">{book.name}</div>
          <div style={{fontSize:12,color:'var(--text2)'}}>{book.group}</div>
        </div>
      </div>

      {book.refs.length === 0 ? (
        <div style={{padding:32,textAlign:'center'}}>
          <div style={{fontSize:14,color:'var(--text3)'}}>Cross-references coming soon</div>
          <div style={{fontSize:12,color:'var(--text3)',marginTop:8}}>Use the AI tab to ask about any passage in {book.name}</div>
        </div>
      ) : (
        <>
          <div className="section-label">Available Passages</div>
          <div style={{padding:'0 16px'}}>
            {book.refs.map(refKey => {
              const refs = CROSS_REFS[refKey] || []
              const chap = refKey.split('.').slice(1).join('.')
              return (
                <div key={refKey} className="ref-card" onClick={() => onNavigate('passage', refKey)}>
                  <div className="ref-card-ref">{book.name} {chap}</div>
                  <div className="ref-card-note">{refs.length} parallel sources found</div>
                  <div style={{marginTop:8,display:'flex',gap:5,flexWrap:'wrap'}}>
                    {refs.map((r,i) => (
                      <span key={i} className="source-badge" style={{color:SOURCE_META[r.source]?.color,borderColor:SOURCE_META[r.source]?.color+'44',fontSize:9}}>
                        {SOURCE_META[r.source]?.short}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

// ── PASSAGE SCREEN ────────────────────────────────────────────────────────────
function PassageScreen({ passageKey, onBack, apiKey }) {
  const [activeSource, setActiveSource] = useState('all')
  const [aiContext, setAiContext] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const refs = CROSS_REFS[passageKey] || []
  const parts = passageKey.split('.')
  const bookId = parts[0]
  const chap = parts.slice(1).join('.')
  const book = BOOKS.find(b => b.id === bookId)
  const filtered = activeSource === 'all' ? refs : refs.filter(r => r.source === activeSource)
  const sources = [...new Set(refs.map(r => r.source))]

  useEffect(() => {
    if (apiKey && refs.length > 0) {
      setAiLoading(true)
      const context = refs.map(r => `${SOURCE_META[r.source]?.label}: ${r.ref} — ${r.note}`).join('\n')
      callGemini(apiKey,
        `Give me a 150-word historical overview of ${book?.name} chapter ${chap}. What is the most important thing the original audience understood that modern readers miss? Be direct and specific.`,
        context
      ).then(text => { setAiContext(text); setAiLoading(false) })
       .catch(() => setAiLoading(false))
    }
  }, [passageKey, apiKey])

  return (
    <div className="fade-in">
      <div className="passage-header">
        <button className="back-btn" onClick={onBack}>{Icon.back}</button>
        <div>
          <div className="passage-title">{book?.name} {chap}</div>
          <div style={{fontSize:12,color:'var(--text2)'}}>{refs.length} parallel sources</div>
        </div>
      </div>

      {/* AI Context */}
      {(aiLoading || aiContext) && (
        <div style={{padding:'12px 16px 0'}}>
          <div className="ai-panel">
            <div className="ai-label">⚡ HISTORICAL CONTEXT</div>
            {aiLoading ? (
              <div className="ai-loading">
                <div className="ai-dot"/><div className="ai-dot"/><div className="ai-dot"/>
                <span style={{fontSize:12,color:'var(--text3)',marginLeft:4}}>Analyzing sources...</span>
              </div>
            ) : (
              <div className="ai-text">{aiContext}</div>
            )}
          </div>
        </div>
      )}

      {/* Source filter tabs */}
      <div className="source-tabs">
        <button className={`source-tab ${activeSource==='all'?'active':''}`}
          style={activeSource==='all'?{borderColor:'var(--gold)',color:'var(--gold)'}:{}}
          onClick={() => setActiveSource('all')}>
          All ({refs.length})
        </button>
        {sources.map(s => (
          <button key={s} className={`source-tab ${activeSource===s?'active':''}`}
            style={activeSource===s?{borderColor:SOURCE_META[s]?.color,color:SOURCE_META[s]?.color}:{}}
            onClick={() => setActiveSource(s)}>
            {SOURCE_META[s]?.short}
          </button>
        ))}
      </div>

      {/* Reference cards */}
      <div style={{padding:'0 16px 16px'}}>
        {filtered.map((ref, i) => (
          <div key={i} className="ref-card" style={{borderLeft:`3px solid ${SOURCE_META[ref.source]?.color}44`}}>
            <div className="ref-card-source" style={{color:SOURCE_META[ref.source]?.color}}>
              {SOURCE_META[ref.source]?.label}
            </div>
            <div className="ref-card-ref">{ref.ref}</div>
            <div className="ref-card-note">{ref.note}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{padding:24,textAlign:'center',color:'var(--text3)',fontSize:13}}>No references for this source</div>
        )}
      </div>
    </div>
  )
}

// ── TIMELINE SCREEN ───────────────────────────────────────────────────────────
function TimelineScreen({ onNavigate }) {
  const [active, setActive] = useState(null)

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Timeline</h1>
        <p>Navigate Scripture by historical period — all sources aligned</p>
      </div>

      <div style={{padding:'0 16px 16px',display:'flex',flexDirection:'column',gap:12}}>
        {TIMELINE.map(era => {
          const isActive = active === era.id
          const eraRefs = era.books.flatMap(b => CROSS_REFS[b] || [])
          const eraSources = [...new Set(eraRefs.map(r => r.source))]
          return (
            <div key={era.id}>
              <div
                style={{
                  background:isActive?`${era.color}22`:'var(--card)',
                  border:`1px solid ${isActive?era.color+'66':'var(--border)'}`,
                  borderRadius:'var(--radius)', overflow:'hidden', cursor:'pointer'
                }}
                onClick={() => setActive(isActive ? null : era.id)}
              >
                <div style={{padding:'14px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div>
                    <div style={{fontSize:15,fontWeight:700,color:'var(--text)',fontFamily:"'DM Serif Display',serif"}}>{era.label}</div>
                    <div style={{fontSize:11,color:'var(--text3)',marginTop:2}}>{era.period}</div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:6}}>
                    <div style={{display:'flex',gap:4}}>
                      {eraSources.slice(0,4).map(s => (
                        <div key={s} style={{width:8,height:8,borderRadius:'50%',background:SOURCE_META[s]?.color}} />
                      ))}
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      style={{color:'var(--text3)',transform:isActive?'rotate(180deg)':'none',transition:'transform 0.2s'}}>
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>

                {isActive && (
                  <div style={{borderTop:'1px solid var(--border)',padding:'12px 16px'}}>
                    <div style={{fontSize:11,color:'var(--text3)',fontWeight:600,letterSpacing:'0.06em',marginBottom:10}}>PASSAGES IN THIS PERIOD</div>
                    {era.books.map(b => {
                      const bRefs = CROSS_REFS[b] || []
                      if (!bRefs.length) return null
                      const bParts = b.split('.')
                      const bId = bParts[0]
                      const bChap = bParts.slice(1).join('.')
                      const bBook = BOOKS.find(x => x.id === bId)
                      return (
                        <div key={b} onClick={e => { e.stopPropagation(); onNavigate('passage', b) }}
                          style={{padding:'10px 12px',background:'rgba(0,0,0,0.3)',borderRadius:'var(--radius-sm)',marginBottom:6,cursor:'pointer'}}>
                          <div style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{bBook?.name} {bChap}</div>
                          <div style={{fontSize:11,color:'var(--text2)',marginTop:2}}>{bRefs.length} parallel sources</div>
                        </div>
                      )
                    })}
                    <div style={{marginTop:10,display:'flex',gap:6,flexWrap:'wrap'}}>
                      {eraSources.map(s => (
                        <span key={s} className="source-badge" style={{color:SOURCE_META[s]?.color,borderColor:SOURCE_META[s]?.color+'44',fontSize:9}}>
                          {SOURCE_META[s]?.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── AI STUDIO SCREEN ──────────────────────────────────────────────────────────
function AIScreen({ apiKey, setApiKey }) {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [copied, setCopied] = useState(false)

  const suggestions = [
    "What did the original audience of Genesis 6 understand about the sons of God?",
    "How does the Septuagint differ from the Hebrew in Isaiah 7:14 and why does it matter?",
    "What does Proverbs 8, Psalm 33, and the Aramaic Targum say about the Word of God that John 1 is building on?",
    "What did the Dead Sea Scrolls community believe about Melchizedek?",
    "How did first-century Jews understand the Kingdom of God?",
    "What does Josephus say about the Pharisees and Sadducees that the NT assumes we know?",
    "What is the divine council and what does it mean for monotheism?",
    "What did the Book of Enoch teach about fallen angels that Paul's readers knew?",
  ]

  const ask = async () => {
    if (!question.trim() || !apiKey) return
    setLoading(true)
    const q = question.trim()
    setQuestion('')
    try {
      const answer = await callGemini(apiKey, q)
      setHistory(h => [{q, a:answer}, ...h])
      setResponse(answer)
    } catch(e) {
      setResponse('Error: ' + e.message + '. Check your API key in Settings.')
    }
    setLoading(false)
  }

  const copy = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>AI Scholar</h1>
        <p>Ask anything — powered by the full 10-source library</p>
      </div>

      {!apiKey && (
        <div style={{margin:'12px 16px',padding:14,background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:'var(--radius)'}}>
          <div style={{fontSize:12,fontWeight:700,color:'var(--gold)',marginBottom:6}}>ADD YOUR GEMINI API KEY</div>
          <div style={{fontSize:12,color:'var(--text2)',marginBottom:10,lineHeight:1.5}}>Free at aistudio.google.com — get a key in under 2 minutes. Then paste it in Settings.</div>
          <div style={{fontSize:11,color:'var(--text3)'}}>Your key is stored locally on your device only.</div>
        </div>
      )}

      <div className="ai-input-wrap">
        <textarea
          className="ai-input"
          placeholder="Ask about any passage, person, place, or historical context..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => { if(e.key==='Enter' && (e.metaKey||e.ctrlKey)) ask() }}
        />
        <button className="ai-submit" onClick={ask} disabled={loading || !question.trim() || !apiKey}>
          {loading ? 'Consulting sources...' : 'Ask the Scholar →'}
        </button>
      </div>

      {/* Suggestions */}
      {!response && !loading && (
        <>
          <div className="section-label">Try These Questions</div>
          <div style={{padding:'0 16px',display:'flex',flexDirection:'column',gap:8}}>
            {suggestions.map((s,i) => (
              <div key={i} onClick={() => setQuestion(s)}
                style={{padding:'10px 14px',background:'var(--card)',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',cursor:'pointer',fontSize:13,color:'var(--text2)',lineHeight:1.4}}>
                {s}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Response */}
      {(loading || response) && (
        <div style={{padding:'0 16px 16px'}}>
          <div className="ai-panel">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <div className="ai-label">SCHOLAR RESPONSE</div>
              {response && (
                <button onClick={copy} style={{background:'none',border:'none',color:'var(--text3)',cursor:'pointer',display:'flex',alignItems:'center',gap:4,fontSize:11}}>
                  {Icon.copy} {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            {loading ? (
              <div className="ai-loading">
                <div className="ai-dot"/><div className="ai-dot"/><div className="ai-dot"/>
                <span style={{fontSize:12,color:'var(--text3)',marginLeft:4}}>Consulting 8 sources...</span>
              </div>
            ) : (
              <div className="ai-text" style={{whiteSpace:'pre-wrap'}}>{response}</div>
            )}
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 1 && (
        <>
          <div className="section-label">Previous Questions</div>
          <div style={{padding:'0 16px 80px',display:'flex',flexDirection:'column',gap:8}}>
            {history.slice(1).map((h,i) => (
              <div key={i} onClick={() => setResponse(h.a)}
                style={{padding:'10px 14px',background:'var(--card)',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',cursor:'pointer'}}>
                <div style={{fontSize:12,fontWeight:600,color:'var(--text)',marginBottom:4}}>{h.q}</div>
                <div style={{fontSize:11,color:'var(--text3)',overflow:'hidden',maxHeight:36,lineHeight:1.5}}>{h.a.substring(0,100)}...</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ── ABOUT SCREEN ──────────────────────────────────────────────────────────────
function AboutScreen({ apiKey, setApiKey }) {
  const [key, setKey] = useState(apiKey)
  const [saved, setSaved] = useState(false)

  const saveKey = () => {
    setApiKey(key)
    localStorage.setItem('gemini_key', key)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="fade-in">
      <div className="about-hero">
        <div className="about-logo">SWRV on B.S.</div>
        <div style={{fontSize:14,color:'var(--gold)',fontWeight:600,marginTop:6}}>The Kingdom Historical Bible Study Library</div>
        <div className="about-sub">Most people have never read the Bible. They've read someone else's version of it — filtered through denominations, shaped by political agendas, softened by translators with something to protect. This library exists to change that. Free forever.</div>
      </div>

      <div className="stat-row">
        <div className="stat-cell"><div className="stat-num">8</div><div className="stat-lbl">Sources</div></div>
        <div className="stat-cell"><div className="stat-num">8,154</div><div className="stat-lbl">Pages</div></div>
        <div className="stat-cell"><div className="stat-num">0</div><div className="stat-lbl">Cost</div></div>
      </div>

      <div className="section-label">Gemini API Key</div>
      <div style={{padding:'0 16px'}}>
        <div style={{fontSize:12,color:'var(--text2)',marginBottom:8,lineHeight:1.5}}>
          Get a free key at <span style={{color:'var(--gold)'}}>aistudio.google.com</span> — enables the AI Scholar to answer questions about all 8 sources. Stored locally on your device only.
        </div>
        <input
          className="key-input"
          type="password"
          placeholder="Paste your Gemini API key here..."
          value={key}
          onChange={e => setKey(e.target.value)}
        />
        <button className="ai-submit" style={{marginTop:8}} onClick={saveKey}>
          {saved ? '✓ Saved' : 'Save Key'}
        </button>
      </div>

      <div className="section-label">Curated By</div>
      <div style={{padding:'0 16px 16px'}}>
        <div style={{padding:'14px',background:'var(--card)',borderRadius:'var(--radius)',border:'1px solid var(--border)'}}>
          <div style={{fontSize:15,fontWeight:700,color:'var(--text)'}}>Zion Birdsong</div>
          <div style={{fontSize:12,color:'var(--gold)',marginTop:2}}>SWRV On-The-Go</div>
          <div style={{fontSize:12,color:'var(--text2)',marginTop:8,lineHeight:1.6}}>
            "This information should have never been sold. I want people to have the knowledge because I love them. The truth about these texts belongs to everyone."
          </div>
          <div style={{fontSize:11,color:'var(--text3)',marginTop:8}}>swrvonthego.pro</div>
        </div>
      </div>

      <div className="section-label">The 10 Sources</div>
      <div style={{padding:'0 16px 100px',display:'flex',flexDirection:'column',gap:1}}>
        {Object.entries(SOURCE_META).map(([key, meta]) => (
          <div key={key} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',background:'var(--card)',borderBottom:'1px solid var(--border)'}}>
            <div style={{width:10,height:10,borderRadius:'50%',background:meta.color,flexShrink:0}} />
            <div style={{fontSize:13,color:'var(--text)',flex:1}}>{meta.label}</div>
            <span className="source-badge" style={{color:meta.color,borderColor:meta.color+'33',fontSize:9}}>{meta.short}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState('home')
  const [view, setView] = useState(null) // {type:'passage'|'book', id:'...'}
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_key') || '')

  const navigate = (type, id) => setView({type, id})
  const goBack = () => setView(null)

  const tabs = [
    { id:'home',     label:'Home',     icon: Icon.home },
    { id:'books',    label:'Books',    icon: Icon.book },
    { id:'timeline', label:'Timeline', icon: Icon.timeline },
    { id:'ai',       label:'Scholar',  icon: Icon.ai },
    { id:'about',    label:'About',    icon: Icon.info },
  ]

  // Inject styles
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const renderContent = () => {
    // Sub-views (passage detail, book detail)
    if (view) {
      if (view.type === 'passage') return <PassageScreen passageKey={view.id} onBack={goBack} apiKey={apiKey} />
      if (view.type === 'book') return <BookScreen bookId={view.id} onNavigate={navigate} onBack={goBack} />
    }
    // Main tabs
    switch(tab) {
      case 'home':     return <HomeScreen onNavigate={(t,id) => { navigate(t,id) }} apiKey={apiKey} />
      case 'books':    return <BooksScreen onNavigate={navigate} />
      case 'timeline': return <TimelineScreen onNavigate={navigate} />
      case 'ai':       return <AIScreen apiKey={apiKey} setApiKey={setApiKey} />
      case 'about':    return <AboutScreen apiKey={apiKey} setApiKey={setApiKey} />
      default:         return null
    }
  }

  return (
    <div className="app">
      <main className="main">{renderContent()}</main>
      <nav className="bottom-nav">
        {tabs.map(t => (
          <button key={t.id} className={`nav-btn ${tab===t.id&&!view?'active':''}`}
            onClick={() => { setView(null); setTab(t.id) }}>
            {t.icon}
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
