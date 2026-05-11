// SWRV Kingdom Genesis — main application logic
// Depends on all data files + enrichments.js (loaded before this).
// Bootstraps with loadChapter() at the end of the file.


const TRACKS = [
  {name:"Peaceful Nature",url:"https://res.cloudinary.com/ddzyvfolr/video/upload/v1778186909/ROADMAP_APP_-_PEACEFUL_NATURE_suii2m.mp3"},
  {name:"Lofi Ocean Pier",url:"https://res.cloudinary.com/ddzyvfolr/video/upload/v1778186908/ROADMAP_APP_-_LOFI_OCEAN_PIER_ndlqu8.mp3"},
  {name:"Peaceful Nature Sounds",url:"https://res.cloudinary.com/ddzyvfolr/video/upload/v1778186909/ROADMAP_APP_-_PEACEFUL_NATURE_SOUNDS_vnplxv.mp3"}
];
let trackIdx=0;
const audio=document.getElementById('audio'),playBtn=document.getElementById('playBtn'),trackName=document.getElementById('trackName');
audio.preload='auto';
let _wantPlay=false;

audio.addEventListener('error',function(){
  const err=audio.error;
  let msg='Track unavailable';
  if(err){
    if(err.code===1)msg='Loading aborted';
    else if(err.code===2)msg='Network error - check connection';
    else if(err.code===3)msg='Audio file corrupted';
    else if(err.code===4)msg='Format not supported or URL blocked';
  }
  if(trackName){
    trackName.textContent='⚠ '+msg+' - tap folder for your own';
    trackName.style.color='var(--warning)';
  }
  playBtn.textContent='▶';
});

audio.addEventListener('canplay',function(){
  if(trackName){
    trackName.textContent=TRACKS[trackIdx]?TRACKS[trackIdx].name:'Music';
    trackName.style.color='';
  }
  if(_wantPlay){
    _wantPlay=false;
    const p=audio.play();
    if(p&&p.catch)p.catch(function(err){
      console.warn('Play failed:',err);
      if(trackName){trackName.textContent='Tap play again or use folder';trackName.style.color='var(--warning)';}
      playBtn.textContent='▶';
    });
  }
});

audio.addEventListener('playing',function(){playBtn.textContent='❚❚';});
audio.addEventListener('pause',function(){playBtn.textContent='▶';});


// === GLOSSARY — terms and abbreviations used throughout the app ===
window.GLOSSARY = {
  "ANE": {
    term: "Ancient Near East",
    body: "The geographic and cultural region where the Bible was written and originally read: ancient Mesopotamia (modern Iraq, Syria), Canaan (Israel/Palestine/Lebanon), Egypt, Cush (Sudan/Ethiopia), Arabia, and Anatolia (modern Turkey). The Bible's stories, laws, language, and theology all assume this regional context. Reading the Bible 'through ANE eyes' means understanding it the way its original Afro-Asiatic Semitic audience would have."
  },
  "KJV": {term:"King James Version",body:"The 1611 English translation of the Bible commissioned by King James I of England. Public domain. Used throughout this app as the base English text because it is faithful, public-domain, and widely familiar."},
  "LXX": {term:"Septuagint",body:"The Greek translation of the Hebrew Old Testament, produced approximately 250-100 BC by 70 (Latin: septuaginta) Jewish scholars in Alexandria. Used by the writers of the New Testament — most quotations of the OT in the NT match the LXX wording, not the Hebrew. Brenton's 1851 English of the LXX is in the public domain and is the version this app references."},
  "BDB": {term:"Brown-Driver-Briggs Hebrew Lexicon",body:"The 1906 unabridged Hebrew lexicon by Francis Brown, S.R. Driver, and Charles Briggs. ~9,345 entries with full etymology, comparative Semitic linguistics, and biblical citation. Standard scholarly Hebrew reference in the Christian and Jewish academic world. Public domain."},
  "TNK": {term:"Tanakh",body:"The Jewish three-part name for what Christians call the Old Testament: Torah (Law), Nevi'im (Prophets), Ketuvim (Writings). T-N-K = TaNaKh. This app uses the 1917 JPS (Jewish Publication Society) Tanakh as one of its primary reference translations."},
  "DSS": {term:"Dead Sea Scrolls",body:"Ancient Jewish manuscripts discovered between 1947 and 1956 in caves near Qumran by the Dead Sea. Date from roughly 250 BC to 70 AD. Include the oldest known biblical manuscripts — over 1,000 years older than any complete Masoretic Hebrew text. Translations by García Martínez and others are referenced in this app's approved library."},
  "AMP": {term:"Amplified Bible",body:"Modern translation by The Lockman Foundation (1965+) that expands key Hebrew and Greek words into their full meaning-range in English. NOTE: This app's AMP-style verses are NOT the Lockman AMP — they are ORIGINAL Hebrew-audited paraphrases written for this study, marked clearly as such."},
  "NT": {term:"New Testament",body:"The 27 books of the Christian Bible written in Greek between ~50 AD and ~100 AD: the four Gospels, Acts, 21 letters (epistles), and Revelation."},
  "OT": {term:"Old Testament",body:"The 39 books of the Christian Bible (same content as the Jewish Tanakh, different book divisions and order): the Torah, the historical books, the wisdom literature, and the prophets. Written in Hebrew (with small Aramaic sections) roughly 1400 BC to 400 BC."},
  "BC / BCE": {term:"Before Christ / Before Common Era",body:"BC ('Before Christ') and BCE ('Before Common Era') refer to the same period — the time before the traditional birth-year of Jesus. BCE is the religiously-neutral form. Used identically in scholarly literature."},
  "AD / CE": {term:"Anno Domini / Common Era",body:"AD ('Anno Domini' = 'in the year of the Lord') and CE ('Common Era') refer to the time from the traditional birth-year of Jesus forward. CE is the religiously-neutral form."},
  "theophany": {term:"Theophany",body:"A physical appearance of God to a human being. Examples: the burning bush (Exodus 3), Sinai (Exodus 19-20), the man who wrestles with Jacob (Genesis 32), the seraphim of Isaiah 6, the chariot vision of Ezekiel 1. Theophanies are always partial — no one sees God's face and lives (Exodus 33:20)."},
  "typology": {term:"Typology",body:"Reading Old Testament events, people, and rituals as foreshadowings (types) of New Testament realities (antitypes). For example: the Passover lamb (Exodus 12) is a type; Christ the Lamb of God is the antitype. Hebrews 8-10 explicitly works through Old Testament typology and its fulfillment in Christ."},
  "polemic": {term:"Polemic",body:"A piece of writing or speech that argues forcefully against an opposing position. The ten plagues of Exodus are a polemic against Egyptian polytheism — each plague targets a specific named Egyptian god to publicly demonstrate that YHWH alone is God."},
  "suzerain-vassal treaty": {term:"Suzerain-Vassal Treaty",body:"A formal ancient Near Eastern treaty structure between a great king (suzerain) and a lesser king (vassal). Has six parts: preamble, historical prologue, stipulations, witnesses, blessings/curses, and storage provision. The Sinai covenant (Exodus 20-24, Deuteronomy) follows this exact structure — confirming Hebrew faith is built on covenant, not philosophy."},
  "chiasm": {term:"Chiasm / Chiastic Structure",body:"A literary pattern in which the second half mirrors the first in reverse order — A-B-C-B'-A'. Common in Hebrew poetry and narrative. Often used to highlight the central element as the key point of the passage."},
  "inclusio": {term:"Inclusio",body:"A literary technique where a passage begins and ends with the same word, phrase, or theme — framing the material in between. Common in Hebrew prose and the Psalms."},
  "hapax legomenon": {term:"Hapax Legomenon",body:"Greek for 'spoken once.' A word that appears only once in a given body of text. The Hebrew Bible has hundreds of these — they are difficult to translate precisely because their meaning has to be inferred from context and comparative Semitic languages."},
  "Watchers": {term:"The Watchers",body:"Hebrew 'irin' / Aramaic 'in'. A class of angelic beings mentioned in Daniel 4 and described in detail in 1 Enoch and the Dead Sea Scrolls. In 1 Enoch's narrative, 200 Watchers led by Semjaza descended on Mount Hermon in the days of Jared (Genesis 5:18), took human wives, and fathered the giants of Genesis 6:1-4. Their leader Azazel taught humanity weapons, cosmetics, and forbidden arts. The Watchers tradition is the standard early Jewish reading of Genesis 6:1-4."},
  "Tetragrammaton": {term:"The Tetragrammaton",body:"Greek for 'four letters.' The four Hebrew letters יהוה (YHWH) that form God's personal covenant name (Exodus 3:15, 6:3). Pronunciation likely 'Yahweh' (scholars debate). Jewish tradition reads 'Adonai' (Lord) instead of pronouncing the Name out of reverence. Most English Bibles render it 'LORD' in small caps."},
  "Yom Kippur": {term:"Yom Kippur — Day of Atonement",body:"The annual climactic Levitical ritual (Leviticus 16). The high priest enters the holy of holies once a year with the blood of atoning sacrifices, atoning for the sins of the whole nation. The scapegoat carries Israel's sins into the wilderness. Christ's death is read in the New Testament as the fulfillment of Yom Kippur (Hebrews 9-10)."},
  "Passover / Pesach": {term:"Passover / Pesach",body:"The annual Jewish feast (Exodus 12) commemorating the night God 'passed over' (pasach) Israelite households whose doorposts were marked with the blood of a sacrificed lamb, while striking the firstborn of Egypt. The original founding event of the Jewish faith. Christ called 'our Passover' in 1 Corinthians 5:7."},
  "Shema": {term:"The Shema",body:"Hebrew 'shema Yisrael — Hear, O Israel.' Israel's central confession of faith, Deuteronomy 6:4-9. Recited every morning and evening by observant Jews to this day. Begins: 'Hear, O Israel — YHWH our God, YHWH is one.'"},
  "covenant": {term:"Covenant",body:"Hebrew 'brit.' A formal, blood-sealed, irrevocable relationship between God and people. The Bible has several major covenants: Noahic (Genesis 9), Abrahamic (Genesis 15, 17), Mosaic (Exodus 19-24), Davidic (2 Samuel 7), and the New Covenant (Jeremiah 31:31-34 / Luke 22:20). 'Covenant' is the Bible's central theological framework."},
  "ephod / breastplate": {term:"Ephod / Breastplate",body:"Garments of the Israelite High Priest (Exodus 28). The ephod is a shoulder-vestment; the breastplate is a square cloth pouch fastened over the chest, holding twelve precious stones (one for each tribe) and the Urim and Thummim — the means of discerning God's will. The high priest entered God's presence bearing the names of all twelve tribes ON HIS SHOULDERS and OVER HIS HEART."},
  "Urim and Thummim": {term:"Urim and Thummim",body:"Hebrew approximately 'Lights and Perfections.' Objects kept in the high priest's breastplate (Exodus 28:30) used to discern God's will on specific matters. Mentioned in Numbers 27:21, 1 Samuel 28:6, Ezra 2:63. The exact form is debated — possibly two stones, possibly engraved tablets — but they functioned as a yes/no oracle."},
  "Sheol": {term:"Sheol",body:"Hebrew for the realm of the dead — both righteous and unrighteous. The grave, the underworld, the place of the departed. NOT 'hell' in the later New Testament sense — Sheol is morally neutral. Greek Bible (LXX) translates it as 'Hades.' Jesus uses Hades language similarly in Luke 16. Distinct from Gehenna (the final place of judgment)."},
  "Gehenna": {term:"Gehenna",body:"From Hebrew 'Gei-Hinnom' — the Valley of Hinnom outside Jerusalem. In Old Testament times, used for child sacrifice to Moloch (2 Kings 23:10, Jeremiah 7:31). By Jesus' day, the valley was used as Jerusalem's trash dump, where fires burned continually. Jesus uses 'Gehenna' as the picture of final judgment (Matthew 5:22, 5:29-30, 10:28). Distinct from Sheol/Hades."},
  "Hesed / Chesed": {term:"Hesed (Chesed) — Covenant Love",body:"Hebrew word for steadfast love, covenant loyalty, faithful kindness — the love that doesn't quit because of relationship. The MOST important word in the Old Testament's love vocabulary. Used 245 times. Appears 26 times in Psalm 136 as the refrain 'His chesed endures forever.' Often paired with emet (truth/faithfulness)."},
  "shekinah": {term:"Shekinah",body:"Rabbinic Hebrew for 'the Dwelling.' Used in Jewish tradition for the visible, manifest presence of God among His people — the cloud filling the tabernacle (Exodus 40:34), the glory at Solomon's temple dedication (1 Kings 8:11), the glory departing in Ezekiel 10. Although the word itself does not appear in the Hebrew Bible, the concept is biblical throughout."},
  "Aaronic blessing": {term:"Aaronic Blessing / Priestly Blessing",body:"Numbers 6:24-26 — the blessing God commanded Aaron and his sons to pronounce over Israel: 'YHWH bless you and keep you; YHWH make His face shine upon you and be gracious to you; YHWH lift up His countenance upon you and give you peace.' Recited at the end of every synagogue service still today."}
};

function showGlossary(){
  showModal('glossary');
}

// Modal body-scroll-lock helpers (mobile-safe)
function _lockBodyScroll(){
  if(document.body.classList.contains('modal-open'))return;
  const y = window.scrollY || window.pageYOffset;
  document.body.dataset.scrollY = String(y);
  document.body.style.top = -y + 'px';
  document.body.classList.add('modal-open');
}
function _unlockBodyScroll(){
  if(!document.body.classList.contains('modal-open'))return;
  const y = parseInt(document.body.dataset.scrollY||'0',10);
  document.body.classList.remove('modal-open');
  document.body.style.top = '';
  delete document.body.dataset.scrollY;
  window.scrollTo(0, y);
}

function loadTrack(autoPlay){
  if(!TRACKS[trackIdx])return;
  _wantPlay=!!autoPlay;
  if(trackName){
    trackName.textContent='Loading: '+TRACKS[trackIdx].name+'...';
    trackName.style.color='';
  }
  audio.src=TRACKS[trackIdx].url;
  audio.load();
}

function loadUserAudio(input){
  const file=input.files[0];if(!file)return;
  _wantPlay=true;
  audio.src=URL.createObjectURL(file);
  if(trackName){trackName.textContent='Loading: '+file.name+'...';trackName.style.color='';}
  audio.load();
  setTimeout(function(){if(trackName)trackName.textContent='♪ '+file.name;},300);
}

function togglePlay(){
  if(!audio.src){loadTrack(true);return;}
  if(audio.paused){
    const p=audio.play();
    if(p&&p.catch)p.catch(function(err){
      console.warn('Play failed:',err);
      _wantPlay=true;
      audio.load();
    });
  }else{audio.pause();}
}

function nextTrack(){trackIdx=(trackIdx+1)%TRACKS.length;loadTrack(true);}

audio.addEventListener('ended',nextTrack);

const THEMES=['vintage','luxe','cyberpunk','earth','sonic'];
let themeIdx=0;
function cycleTheme(){themeIdx=(themeIdx+1)%THEMES.length;document.body.dataset.theme=THEMES[themeIdx];localStorage.setItem('swrv_theme',THEMES[themeIdx])}
const savedTheme=localStorage.getItem('swrv_theme');
if(savedTheme){themeIdx=THEMES.indexOf(savedTheme);document.body.dataset.theme=savedTheme}

let currentChapter=parseInt(localStorage.getItem('swrv_chapter'))||1;
let currentVerse=parseInt(localStorage.getItem('swrv_verse'))||1;
let mode=localStorage.getItem('swrv_mode')||'chapter';
let currentBook=localStorage.getItem('swrv_book')||'Genesis';
window.currentBook = currentBook; // expose for enrichments
const _bookScriptLoaded={Genesis:true}; // Genesis is bundled in genesis.js
function _getCurrentBookData(){
  if(currentBook==='Genesis')return window.GENESIS;
  return (window.BIBLE&&window.BIBLE[currentBook])||null;
}
function _getBookInfo(slug){
  if(!window.BIBLE_INDEX)return null;
  return window.BIBLE_INDEX.find(function(b){return b.slug===slug;});
}
function _loadBookScript(slug, cb){
  if(_bookScriptLoaded[slug]||(window.BIBLE&&window.BIBLE[slug])){cb();return;}
  const s=document.createElement('script');
  s.src='data/bible/'+slug+'.js';
  s.onload=function(){_bookScriptLoaded[slug]=true;cb();};
  s.onerror=function(){console.warn('Failed to load '+slug);cb();};
  document.head.appendChild(s);
}

const chapterSelect=document.getElementById('chapterSelect');
const bookSelect=document.getElementById('bookSelect');


function goRandomVerse(){
  if(!window.BIBLE_INDEX)return;
  const books=window.BIBLE_INDEX;
  const book=books[Math.floor(Math.random()*books.length)];
  _loadBookScript(book.slug,function(){
    const ch=Math.floor(Math.random()*book.chapters)+1;
    currentBook=book.slug;window.currentBook=book.slug;localStorage.setItem('swrv_book',book.slug);
    if(bookSelect)bookSelect.value=book.slug;
    populateChapterSelect();
    _loadChapterCore(ch);
  });
}

function populateBookSelect(){
  if(!bookSelect||!window.BIBLE_INDEX)return;
  bookSelect.innerHTML='';
  let lastTestament='';
  let currentGroup=null;
  for(const b of window.BIBLE_INDEX){
    if(b.testament!==lastTestament){
      currentGroup=document.createElement('optgroup');
      currentGroup.label=b.testament==='OT'?'Old Testament':'New Testament';
      bookSelect.appendChild(currentGroup);
      lastTestament=b.testament;
    }
    const opt=document.createElement('option');
    opt.value=b.slug;
    opt.textContent=b.display+(b.isDeep?' (deep)':'');
    if(b.slug===currentBook)opt.selected=true;
    if(currentGroup)currentGroup.appendChild(opt);
    else bookSelect.appendChild(opt);
  }
}

function populateChapterSelect(){
  if(!chapterSelect)return;
  chapterSelect.innerHTML='';
  const info=_getBookInfo(currentBook);
  const count=info?info.chapters:50;
  const bookData=_getCurrentBookData();
  for(let i=1;i<=count;i++){
    const opt=document.createElement('option');
    opt.value=i;
    let label='Chapter '+i;
    if(bookData&&bookData[i]){
      const t=(bookData[i].title||'').replace(new RegExp('^'+(info?info.display:currentBook)+' '+i+'\\s*[—-]?\\s*','i'),'');
      if(t)label='Ch '+i+' — '+t;
      else label=(info?info.display:currentBook)+' '+i;
    }else{
      label=(info?info.display:currentBook)+' '+i;
    }
    if(i===currentChapter)opt.selected=true;
    opt.textContent=label;
    chapterSelect.appendChild(opt);
  }
}

populateBookSelect();
populateChapterSelect();

function loadBook(slug){
  if(!slug||slug===currentBook&&_getCurrentBookData())return;
  _loadBookScript(slug,function(){
    currentBook=slug;window.currentBook=slug;
    localStorage.setItem('swrv_book',slug);
    currentChapter=1;
    localStorage.setItem('swrv_chapter',1);
    populateChapterSelect();
    _loadChapterCore(1);
  });
}
function prevChapter(){if(currentChapter>1){loadChapter(currentChapter-1);}else{
  // Jump to previous book's last chapter
  const idx=window.BIBLE_INDEX?window.BIBLE_INDEX.findIndex(function(b){return b.slug===currentBook;}):-1;
  if(idx>0){const prev=window.BIBLE_INDEX[idx-1];_loadBookScript(prev.slug,function(){currentBook=prev.slug;window.currentBook=prev.slug;localStorage.setItem('swrv_book',prev.slug);currentChapter=prev.chapters;localStorage.setItem('swrv_chapter',prev.chapters);if(bookSelect)bookSelect.value=prev.slug;populateChapterSelect();_loadChapterCore(prev.chapters);});}
}}
function nextChapter(){
  const info=_getBookInfo(currentBook);
  const max=info?info.chapters:50;
  if(currentChapter<max){loadChapter(currentChapter+1);}else{
    const idx=window.BIBLE_INDEX?window.BIBLE_INDEX.findIndex(function(b){return b.slug===currentBook;}):-1;
    if(idx>=0&&idx<window.BIBLE_INDEX.length-1){const nxt=window.BIBLE_INDEX[idx+1];_loadBookScript(nxt.slug,function(){currentBook=nxt.slug;window.currentBook=nxt.slug;localStorage.setItem('swrv_book',nxt.slug);currentChapter=1;localStorage.setItem('swrv_chapter',1);if(bookSelect)bookSelect.value=nxt.slug;populateChapterSelect();_loadChapterCore(1);});}
  }
}

function escapeHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

function renderVerseText(text,definables,peopleNames){
  const wordSet=new Set(definables);
  const lowerSet=new Set(definables.map(w=>w.toLowerCase()));
  const peopleSet=new Set(peopleNames||[]);
  return text.split(/(\s+)/).map(token=>{
    if(!token.trim())return token;
    const cleaned=token.replace(/[.,;:!?'"`'`'—()]/g,'');
    if(peopleSet.has(cleaned)){
      return '<span class="person-name" onclick="showPerson(\''+cleaned+'\')">'+escapeHtml(token)+'</span>';
    }
    const isDefinable=wordSet.has(cleaned)||lowerSet.has(cleaned.toLowerCase());
    if(isDefinable){
      const defKey=wordSet.has(cleaned)?cleaned:cleaned.toLowerCase();
      return '<span class="definable" onclick="showDef(\''+defKey+'\')">'+escapeHtml(token)+'</span>';
    }
    return escapeHtml(token);
  }).join('');
}

function renderVerse(v){
  const verseHtml=[];
  const refId=v.ref.replace(/[^a-z0-9]/gi,'_');
  verseHtml.push('<div class="verse" id="'+refId+'">');
  const vNum=v.ref.match(/:(\d+)$/)[1];
  verseHtml.push('<span class="verse-num">'+vNum+'</span>');
  verseHtml.push('<span class="verse-text">'+renderVerseText(v.synthesized,v.definableWords,v.peopleInVerse)+'</span>');
  if(v.numberingNote)verseHtml.push('<div class="numbering-note">📖 '+escapeHtml(v.numberingNote)+'</div>');
  verseHtml.push('<div class="sources">');
  const sourceKeys=Object.keys(v.sources);
  for(const key of sourceKeys){
    const meta=window.SOURCES[key];
    if(!meta)continue;
    const cls=key==='AMPLIFIED'?'amp':'';
    verseHtml.push('<button class="source-tab '+cls+'" data-src="'+key+'" data-ref="'+refId+'" onclick="toggleSource(this)">'+meta.short+'</button>');
  }
  verseHtml.push('</div>');
  for(const key of sourceKeys){
    if(key==='TANAKH')continue;
    const text=v.sources[key].text;
    let cls='';
    if(key==='AMPLIFIED')cls='amp';
    else if(key==='LXX_GREEK')cls='greek';
    else if(key==='HEBREW')cls='hebrew';
    verseHtml.push('<div class="source-content '+cls+'" data-src="'+key+'-'+refId+'" style="display:none;">'+escapeHtml(text)+'</div>');
  }
  if(v.kingdomLens){
    verseHtml.push('<div class="kingdom-lens">');
    verseHtml.push('<div class="kingdom-lens-label">⚜ KINGDOM LENS</div>');
    verseHtml.push('<div class="kingdom-lens-text">'+escapeHtml(v.kingdomLens)+'</div>');
    verseHtml.push('</div>');
  }
  if(v.cultural){
    verseHtml.push('<div class="cultural-panel">');
    verseHtml.push('<div class="cultural-label">🌍 CULTURAL CONTEXT</div>');
    verseHtml.push('<div class="cultural-title">'+escapeHtml(v.cultural.title)+'</div>');
    verseHtml.push('<div class="cultural-detail">'+escapeHtml(v.cultural.detail)+'</div>');
    if(v.cultural.sources)verseHtml.push('<div class="cultural-source">Sources: '+escapeHtml(v.cultural.sources)+'</div>');
    verseHtml.push('</div>');
  }
  if(v.variants&&v.variants.length>0){
    for(const variant of v.variants){
      verseHtml.push('<div class="translation-flag">');
      verseHtml.push('<span class="flag-label">⚠ TRANSLATION LOSS</span>');
      verseHtml.push('<div class="flag-title">'+escapeHtml(variant.label)+'</div>');
      verseHtml.push('<div class="flag-note">'+escapeHtml(variant.note)+'</div>');
      verseHtml.push('</div>');
    }
  }
  const xrefId=refId+'_xref';
  if(v.enochRef||v.josephusRef){
    verseHtml.push('<div class="crossrefs">');
    if(v.enochRef)verseHtml.push('<button class="xref-pill" onclick="toggleXref(\''+xrefId+'_enoch\')">📖 1 Enoch</button>');
    if(v.josephusRef)verseHtml.push('<button class="xref-pill josephus" onclick="toggleXref(\''+xrefId+'_jos\')">📜 Josephus</button>');
    verseHtml.push('</div>');
    if(v.enochRef)verseHtml.push('<div class="xref-content" id="'+xrefId+'_enoch"><b>1 Enoch:</b> '+escapeHtml(v.enochRef)+'</div>');
    if(v.josephusRef)verseHtml.push('<div class="xref-content josephus" id="'+xrefId+'_jos"><b>Josephus, Antiquities:</b> '+escapeHtml(v.josephusRef)+'</div>');
  }
  verseHtml.push('</div>');
  // Genesis 1-4 enrichments (Pre-history, plot panels, heartbeat, culture deep)
  try{
    const vnum=parseInt(v.ref.match(/:(\d+)$/)[1]);
    const ch=parseInt(v.ref.match(/^Genesis (\d+)/i)[1]||v.ref.match(/^Gen (\d+)/i)[1]||0);
    if(ch>=1&&ch<=4){
      const enrichments=renderGen14Enrichments(ch,vnum);
      if(enrichments)return verseHtml.join('')+enrichments;
    }
  }catch(e){console.warn('Gen 1-4 enrichment error:',e);}
  return verseHtml.join('');
}

function setMode(m){
  mode=m;localStorage.setItem('swrv_mode',m);
  document.getElementById('modeChapterBtn').classList.toggle('active',m==='chapter');
  document.getElementById('modeVerseBtn').classList.toggle('active',m==='verse');
  document.body.classList.toggle('verse-mode',m==='verse');
  loadChapter(currentChapter);
}

function loadChapter(n, direction){
  _loadChapterCore(n);
}
function _loadChapterCore(n){
  const sel=document.getElementById('chapterSelect');if(sel)sel.value=n;
  currentChapter=n;localStorage.setItem('swrv_chapter',n);
  const bookData=_getCurrentBookData();
  const ch=bookData&&bookData[n];
  if(!ch){
    const main=document.getElementById('mainContent');
    if(main)main.innerHTML='<p style="padding:30px;color:var(--fg-mute);">Loading '+currentBook+' '+n+'...</p>';
    return;
  }
  document.querySelectorAll('.ch-link').forEach((el,i)=>{el.classList.toggle('active',i+1===n)});
  const main=document.getElementById('mainContent');
  const verseNums=Object.keys(ch.verses).map(Number).sort((a,b)=>a-b);
  if(mode==='chapter'){
    const html=['<h1 class="chapter-title">'+escapeHtml(ch.title)+'</h1>'];
    for(const v of verseNums)html.push(renderVerse(ch.verses[v]));
    main.innerHTML=html.join('');
  }else{
    if(!verseNums.includes(currentVerse))currentVerse=verseNums[0]||1;
    renderVerseMode(ch,verseNums);
  }
  window.scrollTo(0,0);
}

function renderVerseMode(ch,verseNums){
  const main=document.getElementById('mainContent');
  const idx=verseNums.indexOf(currentVerse);
  const v=ch.verses[currentVerse];
  if(!v){main.innerHTML='<p>Verse not found.</p>';return}
  const html=[];
  html.push('<h1 class="chapter-title">'+escapeHtml(ch.title)+'</h1>');
  html.push('<div class="verse-jump"><select onchange="jumpToVerse(parseInt(this.value))">');
  for(const vn of verseNums){const sel=vn===currentVerse?' selected':'';html.push('<option value="'+vn+'"'+sel+'>Verse '+vn+'</option>')}
  html.push('</select></div>');
  html.push('<div class="verse-mode-controls">');
  html.push('<button class="nav-btn" onclick="prevVerse()" '+(idx===0&&currentChapter===1?'disabled':'')+'>← Prev</button>');
  html.push('<div class="verse-counter"><span class="verse-counter-num">'+currentChapter+':'+currentVerse+'</span><span class="verse-counter-meta">Verse '+(idx+1)+' of '+verseNums.length+' · Chapter '+currentChapter+' of 50</span></div>');
  html.push('<button class="nav-btn" onclick="nextVerse()" '+(idx===verseNums.length-1&&currentChapter===50?'disabled':'')+'>Next →</button>');
  html.push('</div>');
  html.push(renderVerse(v));
  html.push('<div class="verse-mode-controls" style="margin-top:30px;">');
  html.push('<button class="nav-btn" onclick="prevVerse()" '+(idx===0&&currentChapter===1?'disabled':'')+'>← Prev</button>');
  html.push('<div class="verse-counter"><span class="verse-counter-num">'+currentChapter+':'+currentVerse+'</span></div>');
  html.push('<button class="nav-btn" onclick="nextVerse()" '+(idx===verseNums.length-1&&currentChapter===50?'disabled':'')+'>Next →</button>');
  html.push('</div>');
  main.innerHTML=html.join('');
}

function prevVerse(){
  const ch=window.GENESIS[currentChapter];
  const verseNums=Object.keys(ch.verses).map(Number).sort((a,b)=>a-b);
  const idx=verseNums.indexOf(currentVerse);
  if(idx>0){currentVerse=verseNums[idx-1]}
  else if(currentChapter>1){
    currentChapter--;
    const prevCh=window.GENESIS[currentChapter];
    const prevVerseNums=Object.keys(prevCh.verses).map(Number).sort((a,b)=>a-b);
    currentVerse=prevVerseNums[prevVerseNums.length-1];
    localStorage.setItem('swrv_chapter',currentChapter);
  }
  localStorage.setItem('swrv_verse',currentVerse);loadChapter(currentChapter);
}

function nextVerse(){
  const ch=window.GENESIS[currentChapter];
  const verseNums=Object.keys(ch.verses).map(Number).sort((a,b)=>a-b);
  const idx=verseNums.indexOf(currentVerse);
  if(idx<verseNums.length-1){currentVerse=verseNums[idx+1]}
  else if(currentChapter<50){
    currentChapter++;
    const nextCh=window.GENESIS[currentChapter];
    const nextVerseNums=Object.keys(nextCh.verses).map(Number).sort((a,b)=>a-b);
    currentVerse=nextVerseNums[0];
    localStorage.setItem('swrv_chapter',currentChapter);
  }
  localStorage.setItem('swrv_verse',currentVerse);loadChapter(currentChapter);
}

function jumpToVerse(n){currentVerse=n;localStorage.setItem('swrv_verse',n);loadChapter(currentChapter)}

function toggleSource(btn){
  const src=btn.dataset.src;const ref=btn.dataset.ref;
  if(src==='TANAKH')return;
  const target=document.querySelector('[data-src="'+src+'-'+ref+'"]');
  if(!target)return;
  const isShown=target.style.display!=='none';
  target.style.display=isShown?'none':'block';
  btn.classList.toggle('active',!isShown);
}

function toggleXref(id){const el=document.getElementById(id);if(el)el.classList.toggle('show')}

function showDef(word){
  _lockBodyScroll();
  let def=window.DEFINITIONS[word]||window.DEFINITIONS[word.toLowerCase()];
  if(!def)return;
  if(def.see&&window.DEFINITIONS[def.see])def=window.DEFINITIONS[def.see];
  const popup=document.getElementById('defPopup');
  popup.classList.remove('people','strongs');
  const html=[];
  html.push('<div class="def-word">'+escapeHtml(word)+'</div>');
  if(def.hebrew)html.push('<div class="def-hebrew">'+def.hebrew+'</div>');
  if(def.translit)html.push('<div class="def-translit">'+escapeHtml(def.translit)+'</div>');
  if(def.strongs){
    const sId=def.strongs.match(/H\d+/)?.[0];
    if(sId)html.push('<div class="def-strongs" onclick="showStrongs(\''+sId+'\')" title="Tap for full Strong\'s entry">Strong\'s '+escapeHtml(def.strongs)+' →</div>');
    else html.push('<div class="def-strongs">Strong\'s '+escapeHtml(def.strongs)+'</div>');
  }
  if(def.root)html.push('<div class="def-section"><div class="def-section-label">Root</div><div class="def-section-text">'+escapeHtml(def.root)+'</div></div>');
  if(def.senses&&def.senses.length){
    html.push('<div class="def-section"><div class="def-section-label">Full Semantic Range (Rule 09 / Rule 08)</div><ul class="def-list">');
    for(const s of def.senses)html.push('<li>'+escapeHtml(s)+'</li>');
    html.push('</ul></div>');
  }
  if(def.def)html.push('<div class="def-section"><div class="def-section-label">Definition (Rule 09)</div><div class="def-section-text">'+escapeHtml(def.def)+'</div></div>');
  if(def.visual)html.push('<div class="def-section"><div class="def-section-label">Visual / Concrete Meaning</div><div class="def-section-text">'+escapeHtml(def.visual)+'</div></div>');
  if(def.ane)html.push('<div class="def-section"><div class="def-section-label">Ancient Near East Context (Rule 10)</div><div class="def-section-text">'+escapeHtml(def.ane)+'</div></div>');
  if(def.kingdom)html.push('<div class="def-section kingdom-section"><div class="def-section-label">⚜ Kingdom Significance (Rule 12)</div><div class="def-section-text">'+escapeHtml(def.kingdom)+'</div></div>');
  if(def.theology)html.push('<div class="def-section"><div class="def-section-label">Theological Depth</div><div class="def-section-text">'+escapeHtml(def.theology)+'</div></div>');
  if(def.psychology)html.push('<div class="def-section"><div class="def-section-label">Inner Faculties Framework</div><div class="def-section-text">'+escapeHtml(def.psychology)+'</div></div>');
  if(def.warning)html.push('<div class="def-section warning-section"><div class="def-section-label">⚠ Translation Warning</div><div class="def-section-text">'+escapeHtml(def.warning)+'</div></div>');
  if(def.greek)html.push('<div class="def-section"><div class="def-section-label">Greek (LXX/NT)</div><div class="def-section-text">'+escapeHtml(def.greek)+'</div></div>');
  if(def.aramaic)html.push('<div class="def-section"><div class="def-section-label">Aramaic</div><div class="def-section-text">'+escapeHtml(def.aramaic)+'</div></div>');
  // BDB + Strong's enrichment
  if(def.strongs){
    const sId=def.strongs.match(/H\d+/)?.[0];
    if(sId){
      const bdbResults=lookupBDB(sId);
      if(bdbResults.length>0){
        html.push('<div class="def-section strongs-section">');
        html.push('<div class="def-section-label">📖 BDB Lexicon — '+(bdbResults.length>1?bdbResults.length+' Senses':'Definition')+'</div>');
        for(const r of bdbResults){
          if(bdbResults.length>1)html.push('<div style="margin-top:6px;color:var(--gold);font-weight:700;font-size:12px;">'+r.key+(r.entry.gloss?' — "'+escapeHtml(r.entry.gloss)+'"':'')+'</div>');
          if(r.entry.def){
            const dd=r.entry.def.replace(/<[^>]*>/g,'').replace(/\s*\|\s*/g,'<br>');
            html.push('<div class="def-section-text" style="margin-top:4px;">'+dd+'</div>');
          }
        }
        html.push('</div>');
      }
    }
  }
  if(def.strongsData){
    const sd=def.strongsData;
    html.push('<div class="def-section">');
    html.push('<div class="def-section-label">📚 Strong\'s Concise (1894)</div>');
    if(sd.strongs_def)html.push('<div class="def-section-text">'+escapeHtml(sd.strongs_def)+'</div>');
    if(sd.kjv_def)html.push('<div class="def-section-text" style="margin-top:6px;font-size:12px;color:var(--fg-mute);"><b>KJV renderings:</b> <i>'+escapeHtml(sd.kjv_def)+'</i></div>');
    html.push('</div>');
  }
  if(def.cross)html.push('<div class="def-section"><div class="def-section-label">Cross-References</div><div class="def-section-text">'+escapeHtml(def.cross)+'</div></div>');
  document.getElementById('defContent').innerHTML=html.join('');
  popup.classList.add('show');
  _lockBodyScroll();document.getElementById('defOverlay').classList.add('show');
}

function showPerson(name){
  const p=window.PEOPLES[name];
  if(!p)return;
  const popup=document.getElementById('defPopup');
  popup.classList.remove('strongs');
  popup.classList.add('people');
  const html=[];
  html.push('<div class="def-word">👤 '+escapeHtml(name)+'</div>');
  if(p.altName&&p.altName!=='-')html.push('<div class="def-translit">Also: '+escapeHtml(p.altName)+'</div>');
  if(p.biblical)html.push('<div class="def-section"><div class="def-section-label">Biblical Identity</div><div class="def-section-text">'+escapeHtml(p.biblical)+'</div></div>');
  if(p.region)html.push('<div class="def-section"><div class="def-section-label">Region / Origin (Rule 10)</div><div class="def-section-text">'+escapeHtml(p.region)+'</div></div>');
  if(p.appearance)html.push('<div class="def-section"><div class="def-section-label">Appearance — ANE Eyes (Rule 12)</div><div class="def-section-text">'+escapeHtml(p.appearance)+'</div></div>');
  if(p.diet)html.push('<div class="def-section"><div class="def-section-label">Diet & Daily Life</div><div class="def-section-text">'+escapeHtml(p.diet)+'</div></div>');
  if(p.notable)html.push('<div class="def-section"><div class="def-section-label">Notable</div><div class="def-section-text">'+escapeHtml(p.notable)+'</div></div>');
  if(p.sources)html.push('<div class="def-section"><div class="def-section-label">Sources (Rule 13)</div><div class="def-section-text"><i>'+escapeHtml(p.sources)+'</i></div></div>');
  document.getElementById('defContent').innerHTML=html.join('');
  popup.classList.add('show');
  _lockBodyScroll();document.getElementById('defOverlay').classList.add('show');
}

function lookupBDB(id){
  // Smart lookup: try exact match first, then try a/b/c disambiguated senses
  const results=[];
  if(window.BDB_HEB[id])results.push({key:id,entry:window.BDB_HEB[id]});
  for(const suffix of ['a','b','c','d','e']){
    if(window.BDB_HEB[id+suffix])results.push({key:id+suffix,entry:window.BDB_HEB[id+suffix]});
  }
  return results;
}

function showStrongs(id){
  const entry=window.STRONGS_HEB[id];
  const bdbResults=lookupBDB(id);
  if(!entry&&bdbResults.length===0){alert('Strong\'s '+id+' not found.');return}
  const popup=document.getElementById('defPopup');
  popup.classList.remove('people');
  popup.classList.add('strongs');
  const html=[];
  html.push('<div class="def-word">Strong\'s '+escapeHtml(id)+'</div>');
  // Hebrew lemma - prefer BDB (with vowel pointing) but fall back to Strong's
  const lemma=(bdbResults[0]?.entry?.lemma)||entry?.lemma;
  if(lemma)html.push('<div class="def-hebrew">'+lemma+'</div>');
  const xlit=entry?.xlit||bdbResults[0]?.entry?.xlit;
  if(xlit)html.push('<div class="def-translit">'+escapeHtml(xlit)+(entry?.pron?' — pronounced: '+escapeHtml(entry.pron):'')+'</div>');
  // BDB Senses
  if(bdbResults.length>0){
    html.push('<div class="def-section strongs-section">');
    html.push('<div class="def-section-label">📖 BDB Hebrew Lexicon — '+(bdbResults.length>1?bdbResults.length+' senses':'definition')+'</div>');
    for(const r of bdbResults){
      if(bdbResults.length>1)html.push('<div style="margin-top:8px;color:var(--gold);font-weight:700;font-size:13px;">'+r.key+(r.entry.gloss?' — "'+escapeHtml(r.entry.gloss)+'"':'')+'</div>');
      else if(r.entry.gloss)html.push('<div style="color:var(--gold);font-weight:600;font-size:13px;margin-bottom:4px;">"'+escapeHtml(r.entry.gloss)+'"</div>');
      if(r.entry.morph)html.push('<div style="font-size:11px;color:var(--fg-dim);font-family:-apple-system,sans-serif;">'+escapeHtml(r.entry.morph)+'</div>');
      if(r.entry.def){
        // Format the pipe-separated definition list
        const def=r.entry.def.replace(/<[^>]*>/g,'').replace(/\s*\|\s*/g,'<br>').replace(/§/g,'§');
        html.push('<div class="def-section-text" style="margin-top:6px;line-height:1.6;">'+def+'</div>');
      }
    }
    html.push('</div>');
  }
  // Strong's
  if(entry){
    html.push('<div class="def-section">');
    html.push('<div class="def-section-label">📚 Strong\'s (1894) — concise definition</div>');
    if(entry.derivation)html.push('<div class="def-section-text"><b>Derivation:</b> '+escapeHtml(entry.derivation)+'</div>');
    if(entry.strongs_def)html.push('<div class="def-section-text" style="margin-top:6px;">'+escapeHtml(entry.strongs_def)+'</div>');
    if(entry.kjv_def)html.push('<div class="def-section-text" style="margin-top:6px;font-size:12px;color:var(--fg-mute);"><b>KJV renders as:</b> <i>'+escapeHtml(entry.kjv_def)+'</i></div>');
    html.push('</div>');
  }
  html.push('<div class="def-section"><div class="def-section-label">Sources</div><div class="def-section-text" style="font-size:11px;"><i>Brown-Driver-Briggs Hebrew-English Lexicon (1906) via STEPBible/Tyndale House (CC BY 4.0). Strong\'s Concise Dictionary of the Hebrew Bible (1894) via openscriptures.org. Both public domain.</i></div></div>');
  document.getElementById('defContent').innerHTML=html.join('');
  popup.classList.add('show');
  _lockBodyScroll();document.getElementById('defOverlay').classList.add('show');
}

function closeDef(){
  _unlockBodyScroll();
  document.getElementById('defPopup').classList.remove('show','people','strongs');
  document.getElementById('defOverlay').classList.remove('show');
}

const STORY_SECTIONS = {
  who: {
    title: 'Who Were These People?',
    body: '<div class="story-section">'+
'<p class="story-intro"><b>Before we read one verse, we need to see the people clearly.</b> The folks in Genesis were not European. They were not white. They lived between Africa and Asia — what scholars call the <i>Afro-Asiatic</i> world. Their skin was brown. Their language was Semitic. Their faces, their food, their music — closer to a Yemeni, Bedouin, or East African elder today than to any image you have seen in a stained-glass window.</p>'+
'<h4>Where exactly did Genesis happen?</h4>'+
'<p>The map runs from <b>Mesopotamia</b> (modern Iraq) through <b>Canaan</b> (Israel/Palestine/Lebanon/Jordan/Syria) down into <b>Egypt</b> and <b>Cush</b> (Sudan/Ethiopia). Every person in Genesis is from this region. There are no Europeans in this book. None.</p>'+
'<h4>What did they look like?</h4>'+
'<p>Modern scholarship (genetic, archaeological, and the Bible\'s own descriptions) consistently shows the ancient Israelites and surrounding peoples — Canaanites, Edomites, Moabites, Egyptians, Cushites, Midianites — as <b>Afro-Asiatic Semitic peoples with brown skin</b>, dark eyes, dark hair. The Egyptians depicted Semitic neighbors in tomb paintings with the same skin tones as their own — varying shades of brown, with Cushites painted darker still.</p>'+
'<p>The Hebrew word <b>אדם (adam)</b> — translated "man" — comes from <b>אדמה (adamah)</b>, "red earth / ruddy ground." It is literally a description of skin pulled from the soil. <i>Adam means earth-colored.</i></p>'+
'<h4>What language did they speak?</h4>'+
'<p>Genesis was written in <b>Biblical Hebrew</b>, a Semitic language in the same family as Arabic, Aramaic, Amharic (Ethiopian), and ancient Akkadian. The script reads right-to-left. The words have triliteral roots (three-consonant cores). When you hear Hebrew chanted today, you are hearing something close to how the patriarchs actually spoke — not Latin, not Greek, not English.</p>'+
'<h4>Why does this matter?</h4>'+
'<p>For two thousand years, European Christians painted these stories with European faces. White Jesus. White Moses. White Adam and Eve. <b>That was an imagination, not a reading.</b> When the actual text says "Adam," it does not picture a Renaissance Italian. It pictures a brown-skinned person standing in red Middle Eastern dirt.</p>'+
'<p>If you are a young reader of color picking up the Bible — the people in this book look like you. That is not a metaphor. That is the historical record.</p>'+
'<p class="story-source"><b>Sources:</b> Genesis 2:7 (adam from adamah); Egyptian tomb paintings of Semites at Beni Hasan (~1900 BCE); modern population genetics of Levantine and East African populations; standard ANE archaeology. <i>Per Rule 05 (No Whitewashing) and Rule 12 (Read Through ANE Eyes).</i></p>'+
'</div>'
  },
  editors: {
    title: 'Who Edited This Bible?',
    body: '<div class="story-section">'+
'<p class="story-intro"><b>The Bible you hold did not fall out of the sky in English.</b> Every translation is a chain of choices made by specific people in specific places with specific agendas. You should know who handled the text before it reached you.</p>'+
'<h4>The original writers — Semitic Hebrew scribes</h4>'+
'<p>Genesis was written down in Hebrew by <b>Israelite scribes</b> — Semitic people from the Levant. The earliest manuscripts we have are the <b>Dead Sea Scrolls</b> (~250 BCE - 70 CE), copied by Jewish communities in the Judean desert. These are the people closest to the source. They were brown-skinned, Hebrew-speaking, Middle Eastern.</p>'+
'<h4>The Septuagint (LXX) — Hellenistic Jews in Egypt</h4>'+
'<p>Around <b>250 BCE in Alexandria, Egypt</b>, a community of Greek-speaking Jews translated the Hebrew into Greek. This is the LXX. The translators were Jews living in a major African city — Mediterranean, Egyptian, mixed populations. Many early Christians used the LXX, not the Hebrew.</p>'+
'<h4>The Masoretic Text (MT) — Medieval Jewish scribes</h4>'+
'<p>From about <b>500 to 1000 CE</b>, Jewish scribes in Babylon and the Galilee called the <b>Masoretes</b> standardized the Hebrew text and added vowel marks (Hebrew was originally consonants only). The Masoretic Text is the basis of almost every modern Hebrew Bible.</p>'+
'<h4>The Latin Vulgate — Jerome, 4th century</h4>'+
'<p><b>Jerome</b> translated the Bible into Latin around 400 CE. For the next 1,000+ years, the Catholic Church used this Latin version. Most European Christians never read Hebrew or Greek — they read Latin filtered through Jerome.</p>'+
'<h4>The KJV (1611) — 47 English Anglican scholars</h4>'+
'<p>The King James Version was produced by <b>47 English Protestant scholars</b> commissioned by King James I in 1604-1611. They were Oxford and Cambridge churchmen — entirely white, entirely English, working under royal authority. They translated brilliantly but they brought their world with them: monarchy, Anglican theology, English class structure. When they wrote "Lord," they pictured an English lord.</p>'+
'<h4>What got softened in translation?</h4>'+
'<ul>'+
'<li><b>Adam\'s "rib"</b> — Hebrew <i>tsela</i> means "side" everywhere else in the Bible. "Rib" is a Western tradition, not the strongest reading.</li>'+
'<li><b>"Helper" (ezer)</b> — used elsewhere for God as warrior-rescuer. English "helper" makes it sound like an assistant. The Hebrew is closer to "strong counterpart."</li>'+
'<li><b>"Soul" (nephesh)</b> — Hebrew nephesh = throat, neck, breath, life, whole self. Greek "psyche" introduced the idea of a detachable soul. English "soul" carries the Greek lens.</li>'+
'<li><b>"Lord"</b> — covers Adonai (master), YHWH (the name), El (deity). Three different Hebrew words flattened into one English word.</li>'+
'</ul>'+
'<p class="story-source"><b>Sources:</b> Tov, <i>Textual Criticism of the Hebrew Bible</i>; Masoretic tradition documented in BHS; Dead Sea Scrolls (Garcia Martinez); LXX history (Brenton 1851 introduction); KJV translator records (Norton). <i>Per Rule 11 (Flag Translation Loss) and Rule 13 (Source or Silence).</i></p>'+
'</div>'
  },
  arc: {
    title: 'The Genesis Story Arc — For Modern Readers',
    body: '<div class="story-section">'+
'<p class="story-intro">Genesis is not a science book and not a fairy tale. It is a <b>founding story</b> — the kind every ancient people had — but with one massive twist: instead of starting with gods fighting each other, it starts with one God making humans into rulers. Here is the whole 50-chapter arc, in plain American English.</p>'+
'<h4>Part 1 — The Creation Week (Genesis 1-2)</h4>'+
'<p>One God speaks the world into order. Light, sky, sea, land, plants, animals — six days. On the sixth day, He makes humans <b>male and female together</b>, calls them His <i>image</i>, and hands them the planet to rule. On the seventh day, He rests. Then a second, closer-up account: a garden in Eden, a man formed from red earth, a woman built from his side. They are naked, unashamed, married, in charge.</p>'+
'<p><b>Why it matters:</b> In every other ANE creation myth, humans were made as <i>slaves to the gods</i>. Genesis flips it. Humans are <i>royal vice-regents</i>. That is a radical claim about your worth.</p>'+
'<h4>Part 2 — The Break (Genesis 3-5)</h4>'+
'<p>A serpent gets the woman to doubt the one rule. The man is right there with her. They eat. Shame enters the world. They get exiled from Eden. Their first son <b>Cain</b> murders his brother <b>Abel</b>. Humanity multiplies, and so does violence. By chapter 6, the planet is full of corruption.</p>'+
'<h4>Part 3 — The Flood and Reset (Genesis 6-11)</h4>'+
'<p><b>Noah</b>, one righteous man, builds an ark. God floods the earth and starts over with Noah\'s family. After the flood, God makes a <i>covenant</i> — a binding promise — never to flood again. The rainbow is the receipt.</p>'+
'<p>Humanity spreads out. At <b>Babel</b>, they try to build a tower to make a name for themselves. God scatters them and confuses their language. From this point, the human family branches into the nations of the ancient world — including the African and Asian peoples descended from <b>Ham, Shem, and Japheth</b>. <i>Note: Cush, ancestor of Nubian and Ethiopian peoples, is Ham\'s son. Mizraim, ancestor of Egypt, is also Ham\'s son. The Bible names Africa\'s foundational peoples in the family tree.</i></p>'+
'<h4>Part 4 — Abraham, the Promise Begins (Genesis 12-25)</h4>'+
'<p>God calls <b>Abram</b> (later renamed <b>Abraham</b>), a Semitic man from <b>Ur</b> (modern Iraq), and promises to make him a great nation. Abraham migrates to <b>Canaan</b>. He and his wife <b>Sarah</b> are old and childless. God promises a son. They wait 25 years. Sarah finally has <b>Isaac</b>.</p>'+
'<p>Along the way: <b>Hagar</b>, an Egyptian woman, bears Abraham\'s first son <b>Ishmael</b> — ancestor of many Arab peoples. God blesses Ishmael too. Abraham circumcises every male in his household as the sign of covenant. He nearly sacrifices Isaac at God\'s word — then God stops him and provides a ram. Sarah dies. Abraham buys a burial plot — the first piece of the Promised Land he actually owns.</p>'+
'<h4>Part 5 — Isaac, Jacob, and the Twelve Sons (Genesis 25-36)</h4>'+
'<p>Isaac\'s twin sons <b>Esau and Jacob</b> wrestle even in the womb. <b>Jacob</b> tricks his older brother out of the birthright and his blessing. He runs away, works 14 years for his uncle <b>Laban</b>, marries two sisters (<b>Leah</b> and <b>Rachel</b>), and has 12 sons and a daughter by four different women. On his way home, he wrestles with God all night and gets renamed <b>Israel</b> — "wrestles with God."</p>'+
'<p>Those twelve sons become the <b>twelve tribes of Israel</b>.</p>'+
'<h4>Part 6 — Joseph in Egypt (Genesis 37-50)</h4>'+
'<p>Jacob\'s favorite son <b>Joseph</b> gets sold into slavery by his jealous brothers. He ends up in <b>Egypt</b>, falsely accused, thrown in prison, then raised to second-in-command of all Egypt because he interprets Pharaoh\'s dreams. When famine hits, his brothers come to Egypt looking for food. Joseph reveals himself, forgives them, and the whole family moves to Egypt to survive.</p>'+
'<p>Genesis ends with Israel\'s family — 70 people — living in Egypt under Joseph\'s protection. <i>This is the setup for Exodus, where their descendants become a nation of slaves and God raises up Moses to bring them out.</i></p>'+
'<p class="story-source"><i>Plain-English narrative summary per Rule 09 (Define) and Rule 04 (No Opinions — facts of the storyline only). For verse-by-verse study, return to the chapter view.</i></p>'+
'</div>'
  },
  life: {
    title: 'Daily Life in Genesis',
    body: '<div class="story-section">'+
'<p class="story-intro">What did normal Tuesday look like for Abraham? What were people wearing? What did they eat? What music did they hear? Here is the texture of daily life in the world of Genesis.</p>'+
'<h4>Clothing</h4>'+
'<p>Long tunics of <b>wool, linen, or goat hair</b>, often white or undyed. Belted at the waist with a leather or fabric sash. Outer cloak (Hebrew <i>simlah</i>) doubled as a blanket at night — Israelite law later forbade keeping a poor man\'s cloak overnight as collateral, because he needed it to sleep. Head wrap or veil for sun protection. <b>Sandals</b> of leather, slipped off when entering a house or sacred ground. Wealthy men wore embroidered robes; Joseph\'s "coat of many colors" was a long-sleeved princely tunic, not a rainbow.</p>'+
'<h4>Food</h4>'+
'<p>Bread — <b>flat round loaves</b> baked on hot stones or in clay ovens. Cheese, yogurt (called <i>leben</i>), curds, milk from goats and sheep. Lentils, beans, chickpeas (Esau sold his birthright for <b>lentil stew</b> — Gen 25:34). Olives and olive oil. Dates, figs, pomegranates, grapes (fresh and as wine). Honey from wild bees. Meat was special-occasion — a guest arriving meant slaughtering a young goat or calf (Abraham did this for the three visitors in Gen 18). Fish in Egypt. Locusts were eaten by some peoples in the region.</p>'+
'<h4>Work</h4>'+
'<p>The patriarchs were <b>semi-nomadic pastoralists</b> — they moved with their herds of sheep, goats, donkeys, and camels between seasonal pastures and wells. Abraham was wealthy in livestock, silver, and gold (Gen 13:2). Jacob worked 14 years tending Laban\'s flocks. Joseph rose to administer Egypt\'s grain reserves. Other peoples in the region were settled farmers (wheat, barley), city-dwellers (Sodom, Ur, Egyptian cities), or specialists — Tubal-Cain forged bronze and iron (Gen 4:22), Jubal "was the father of all who play the lyre and pipe" (Gen 4:21).</p>'+
'<h4>Music and Worship</h4>'+
'<p>Genesis names two instruments by chapter 4: the <b>kinnor</b> (a small lyre or harp) and the <b>ugab</b> (a wind instrument — flute or pipe). Singing was woven into daily life, work, celebration, and worship. Lamech composed a song in Gen 4:23-24. Laban complained that Jacob slipped away "with songs and tambourines and lyre" (Gen 31:27). Worship in Genesis was simple — building stone altars, offering animals or grain, calling on the name of YHWH. There was no temple yet, no priesthood, no synagogue. Each patriarch was his own priest for his household.</p>'+
'<h4>Family Structure</h4>'+
'<p>Extended clan, not nuclear family. Multiple generations, multiple wives sometimes, servants, herders, all under one patriarch. Inheritance went to the firstborn son (<b>bekor</b>) — which is why so much drama in Genesis is about <i>who gets the birthright</i>. Women had limited public power but enormous influence inside the family — Sarah, Rebekah, Rachel, and Leah all shape the storyline decisively.</p>'+
'<h4>Religion of the Neighbors</h4>'+
'<p>Most peoples around Israel were <b>polytheists</b>. Egypt had Ra, Osiris, Isis. Canaan had El (the high god), Baal (storm god), Asherah (mother goddess). Mesopotamia had Marduk, Inanna, and dozens more. <b>Genesis is a deliberate counter-story:</b> there is one God, not many; humans are royal, not slaves; the universe is good, not a battlefield of gods. Every Genesis claim is a quiet polemic against the surrounding mythology.</p>'+
'<p class="story-source"><b>Sources:</b> Edersheim, <i>Sketches of Jewish Social Life</i>; archaeological record of Late Bronze Age Levantine settlements; Zondervan Bible Dictionary entries on clothing, food, music, daily life; specific Genesis verses cited inline. <i>Per Rule 10 (ANE Context) and Rule 13 (Source or Silence).</i></p>'+
'</div>'
  },
  peoples: {
    title: 'The Peoples of Genesis — Full Profiles',
    body: '<div class="story-section">'+
'<p class="story-intro">Here are the major peoples named in Genesis, with their actual ancestry, language family, and likely appearance. The Bible tracks the human family tree carefully in chapter 10 (the <b>Table of Nations</b>). Most of these people were shades of brown.</p>'+
'<div class="people-grid">'+
'<div class="people-box"><h4>Hebrews / Israelites</h4><p><b>Ancestor:</b> Abraham &rarr; Isaac &rarr; Jacob (Israel)<br><b>Region:</b> Canaan, originally Ur in Mesopotamia<br><b>Language:</b> Biblical Hebrew (Semitic)<br><b>Skin:</b> Brown / olive — Afro-Asiatic Semitic, similar to modern Yemeni Jews, Mizrahi Jews, and Bedouins<br><b>Worship:</b> Monotheist — YHWH alone, no images</p></div>'+
'<div class="people-box"><h4>Egyptians (Mizraim)</h4><p><b>Ancestor:</b> Mizraim, son of Ham (Gen 10:6)<br><b>Region:</b> Nile Valley (Egypt and Sudan)<br><b>Language:</b> Ancient Egyptian (Afro-Asiatic)<br><b>Skin:</b> Brown — varied from lighter in the Nile Delta to darker in Upper Egypt. Egyptian art depicted themselves clearly as a brown-skinned African people.<br><b>Worship:</b> Polytheist — Ra, Osiris, Isis</p></div>'+
'<div class="people-box"><h4>Cushites (Sons of Cush)</h4><p><b>Ancestor:</b> Cush, son of Ham (Gen 10:6-8)<br><b>Region:</b> Modern Sudan, Ethiopia, Eritrea<br><b>Language:</b> Cushitic languages (Afro-Asiatic)<br><b>Skin:</b> Black — consistently described and depicted as the darkest-skinned peoples of the ancient world. Jeremiah uses "Can the Cushite change his skin?" (Jer 13:23).<br><b>Famous descendants:</b> Nimrod the great hunter; Queen of Sheba; Tirhakah the Cushite pharaoh; the Ethiopian eunuch in Acts 8<br><i>Cush is named before any European nation. Black African peoples are foundational, not peripheral.</i></p></div>'+
'<div class="people-box"><h4>Canaanites</h4><p><b>Ancestor:</b> Canaan, son of Ham (Gen 10:6)<br><b>Region:</b> Modern Israel/Palestine, Lebanon, parts of Syria/Jordan<br><b>Language:</b> Canaanite (Semitic) — close to Hebrew<br><b>Skin:</b> Brown — same Levantine phenotype as the Israelites who later displaced them<br><b>Worship:</b> Polytheist — El, Baal, Asherah, Mot, Anat</p></div>'+
'<div class="people-box"><h4>Ishmaelites / Arabs</h4><p><b>Ancestor:</b> Ishmael, son of Abraham and Hagar the Egyptian<br><b>Region:</b> Northern Arabian Peninsula<br><b>Language:</b> Early Arabic dialects (Semitic)<br><b>Skin:</b> Brown — mixed Semitic-Egyptian heritage<br><b>Twelve sons</b> listed in Gen 25:13-15 — became the twelve Arab tribes</p></div>'+
'<div class="people-box"><h4>Edomites</h4><p><b>Ancestor:</b> Esau (renamed Edom, meaning "red")<br><b>Region:</b> South of the Dead Sea (modern southern Jordan)<br><b>Language:</b> Edomite (Semitic, close to Hebrew)<br><b>Skin:</b> Brown / ruddy — Esau was red-haired and hairy at birth (Gen 25:25)<br><b>Note:</b> Esau and Jacob were twin brothers. Edomites and Israelites are cousins.</p></div>'+
'<div class="people-box"><h4>Moabites and Ammonites</h4><p><b>Ancestor:</b> Moab and Ben-Ammi, sons of Lot<br><b>Region:</b> East of the Dead Sea (modern central Jordan)<br><b>Language:</b> Moabite, Ammonite (Semitic)<br><b>Skin:</b> Brown — Levantine phenotype<br><b>Famous descendant:</b> Ruth the Moabitess — great-grandmother of King David</p></div>'+
'<div class="people-box"><h4>Mesopotamians</h4><p><b>Ancestors:</b> Sons of Shem and Ham<br><b>Region:</b> Modern Iraq, parts of Syria and Iran<br><b>Languages:</b> Akkadian, Sumerian, Aramaic<br><b>Skin:</b> Brown — Middle Eastern phenotype<br><b>Note:</b> Abraham was born in Ur of the Chaldeans — he was Mesopotamian by birth before becoming the father of the Hebrews.</p></div>'+
'</div>'+
'<p class="story-source"><b>Sources:</b> Genesis 10 (Table of Nations); Genesis 25:13-18 (sons of Ishmael); Zondervan Bible Dictionary entries on each people; modern population genetics; Egyptian and Mesopotamian art and inscriptions. <i>Per Rule 05 (No Whitewashing), Rule 12 (ANE Eyes), and Rule 13 (Source or Silence).</i></p>'+
'</div>'
  }
};

function showStorySection(btn, key){
  document.querySelectorAll('.story-tab').forEach(function(t){t.classList.remove('active');});
  if(btn)btn.classList.add('active');
  const sec=STORY_SECTIONS[key];
  if(!sec)return;
  document.getElementById('storyContent').innerHTML='<h3 style="color:var(--gold);margin-top:0;font-size:22px;font-family:var(--font-display,inherit);">'+sec.title+'</h3>'+sec.body;
}

function strongsLookup(){
  const input=document.getElementById('strongsInput');
  const query=input.value.trim().toUpperCase();
  const result=document.getElementById('strongsLookupResult');
  if(!query){result.innerHTML='';return;}
  // Push current to history before drilling in
  if(!window._strongsHistory)window._strongsHistory=[];
  if(result.innerHTML.trim() && !result.innerHTML.includes('strongs-back-btn-marker')){
    window._strongsHistory.push({input:input.value,html:result.innerHTML});
  }
  let id=query.startsWith('H')?query:'H'+query;
  if(!/^H\d+$/.test(id)){
    result.innerHTML=renderStrongsBackButton()+'<div style="color:var(--warning);">Enter a number (e.g., 7287) or H-number (e.g., H7287). Or use the word search above.</div>';
    return;
  }
  const num=id.slice(1);
  const heb=window.STRONGS_HEB&&window.STRONGS_HEB[num];
  const bdb=window.BDB_HEB&&window.BDB_HEB[num];
  if(!heb&&!bdb){
    result.innerHTML=renderStrongsBackButton()+'<div style="color:var(--warning);">No entry found for '+id+'.</div>';
    return;
  }
  let h=renderStrongsBackButton();
  h+='<div class="strongs-result" style="border-left-width:4px;">';
  if(heb){
    h+='<div style="display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;">';
    h+='<span style="font-size:32px;color:var(--gold);font-weight:600;">'+(heb.heb||'')+'</span>';
    h+='<span style="font-size:18px;color:var(--fg-mute);font-style:italic;">'+(heb.xlit||'')+'</span>';
    h+='<span style="margin-left:auto;font-size:13px;color:var(--strongs);font-weight:600;">'+id+'</span>';
    h+='</div>';
    if(heb.pron)h+='<div style="color:var(--fg-dim);font-size:13px;margin-top:4px;">pronunciation: '+heb.pron+'</div>';
    if(heb.def)h+='<div style="color:var(--fg);margin-top:10px;line-height:1.6;">'+escapeHtml(heb.def)+'</div>';
  }
  if(bdb){
    h+='<div style="margin-top:14px;padding-top:14px;border-top:1px dashed var(--line);">';
    h+='<div style="font-weight:700;color:var(--strongs);font-size:12px;letter-spacing:0.05em;margin-bottom:6px;">BDB LEXICON</div>';
    if(bdb.def){
      const cleaned=bdb.def.replace(/<[^>]*>/g,'').replace(/\s*\|\s*/g,' • ');
      h+='<div style="color:var(--fg);line-height:1.65;font-size:14px;">'+escapeHtml(cleaned)+'</div>';
    }
    h+='</div>';
  }
  h+='</div>';
  result.innerHTML=h;
}


function _populateSuggestionChips(){
  const el = document.getElementById('suggestionChips');
  if(!el || !window.DEFINITIONS) return;
  // Curated list of keys we want to feature IF they exist. We then verify each is present.
  // Plus we add random keys from window.DEFINITIONS to fill out the list.
  const wanted = ['love','light','covenant','holy','image','heart','spirit','peace','life','glory','grace','truth','chesed','shalom','yeshuah','ruach','kavod','tzelem','YHWH','agape','logos','tevah','ehyeh asher ehyeh','dam ha-brit','rachum','mishkan','kapporet','olah','korban','aseret hadibrot','segulah','manna','sabbath','shabbat'];
  const allKeys = Object.keys(window.DEFINITIONS).filter(k => k && typeof window.DEFINITIONS[k] === 'object');
  const lower = {};
  allKeys.forEach(k => { lower[k.toLowerCase()] = k; });
  // Curated keys that actually exist
  const verified = [];
  for(const w of wanted){
    const key = lower[w.toLowerCase()];
    if(key && !verified.includes(key)) verified.push(key);
    if(verified.length >= 14) break;
  }
  // If we have fewer than 14, fill with random keys from the dictionary
  if(verified.length < 14){
    const shuffled = allKeys.slice().sort(() => Math.random() - 0.5);
    for(const k of shuffled){
      if(verified.length >= 14) break;
      if(!verified.includes(k)) verified.push(k);
    }
  }
  let html = '<div style="font-weight:600;color:var(--fg);margin-bottom:6px;">Try a suggested word:</div>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:6px;">';
  for(const k of verified){
    const escaped = k.replace(/'/g,"\\'").replace(/"/g,'&quot;');
    html += '<button class="suggestion-chip" onclick="document.getElementById(\'strongsInput\').value=\''+escaped+'\';strongsSmartLookup()" style="background:var(--bg-3);border:1px solid var(--line);color:var(--fg);padding:4px 10px;border-radius:14px;cursor:pointer;font-size:11px;font-family:inherit;">'+escapeHtml(k)+'</button>';
  }
  html += '</div>';
  el.innerHTML = html;
}

function strongsSmartLookup(){
  const q=document.getElementById('strongsInput').value.trim();
  const out=document.getElementById('strongsLookupResult');
  if(!q){out.innerHTML='';return;}
  window._strongsHistory=[];
  // Number? route to direct lookup (G or H)
  const grkMatch=q.match(/^[Gg](\d{1,4})$/);
  const hebMatch=q.match(/^[Hh](\d{1,4})$/);
  const bareNum=q.match(/^(\d{1,4})$/);
  if(grkMatch){document.getElementById('strongsInput').value='G'+grkMatch[1];renderStrongsEntry('G',grkMatch[1]);return;}
  if(hebMatch){document.getElementById('strongsInput').value=hebMatch[1];strongsLookup();return;}
  if(bareNum){document.getElementById('strongsInput').value=bareNum[1];strongsLookup();return;}
  // Word search across Hebrew + Greek + Deep Definitions
  const word=q.toLowerCase();
  const results=[];
  const wordRe=new RegExp('\\b'+word.replace(/[.*+?^$()|[\]\\]/g,'\\$&')+'\\b','i');
  // Search Hebrew Strong's
  if(window.STRONGS_HEB){
    for(const num in window.STRONGS_HEB){
      const e=window.STRONGS_HEB[num];
      const def=(e.def||'').toLowerCase();
      const xlit=(e.xlit||'').toLowerCase();
      if(def.includes(word)||xlit.includes(word)){
        let score=10;
        if(wordRe.test(e.def||''))score=100;
        else if(def.split(/[\s,;]+/).some(function(t){return t.startsWith(word);}))score=50;
        if(xlit===word)score+=200;
        else if(xlit.startsWith(word))score+=100;
        results.push({lang:'H',num:num,e:e,score:score});
      }
    }
  }
  // Search Greek Strong's
  if(window.STRONGS_GRK){
    for(const num in window.STRONGS_GRK){
      const e=window.STRONGS_GRK[num];
      const def=(e.def||'').toLowerCase();
      const kjv=(e.kjv_def||'').toLowerCase();
      const xlit=(e.xlit||'').toLowerCase();
      if(def.includes(word)||xlit.includes(word)||kjv.includes(word)){
        let score=10;
        if(wordRe.test(e.def||'')||wordRe.test(e.kjv_def||''))score=100;
        else if(def.split(/[\s,;]+/).some(function(t){return t.startsWith(word);}))score=50;
        if(xlit===word)score+=200;
        else if(xlit.startsWith(word))score+=100;
        results.push({lang:'G',num:num,e:e,score:score});
      }
    }
  }
  // Search deep DEFINITIONS (user's curated entries)
  if(window.DEFINITIONS){
    for(const key in window.DEFINITIONS){
      const d=window.DEFINITIONS[key];
      if(!d||typeof d!=='object')continue;
      const blob=(key+' '+(d.translit||'')+' '+(d.senses?d.senses.join(' '):'')+' '+(d.theology||'')+' '+(d.visual||'')+' '+(d.kingdom||'')).toLowerCase();
      if(blob.includes(word)){
        let score=30;
        if(key.toLowerCase()===word)score=300;
        else if(key.toLowerCase().startsWith(word))score=150;
        else if(d.translit&&d.translit.toLowerCase()===word)score=250;
        results.push({lang:'D',key:key,e:d,score:score});
      }
    }
  }
  results.sort(function(a,b){return b.score-a.score;});
  if(results.length===0){
    out.innerHTML='<p style="color:var(--fg-mute);padding:14px;">No matches for "'+escapeHtml(q)+'". Try one of the suggested words above — they\'re all in the dictionary.</p>';
    return;
  }
  let h='<p style="font-size:12px;color:var(--fg-dim);margin:8px 0;">'+results.length+' match'+(results.length===1?'':'es')+' for "<b>'+escapeHtml(q)+'</b>" - click any to see full entry</p>';
  const top=results.slice(0,30);
  for(const r of top){
    if(r.lang==='D'){
      // Deep definition
      h+='<div class="strongs-result strongs-clickable" data-deep="'+escapeHtml(r.key)+'" style="border-left-color:var(--gold);">';
      h+='<div style="display:flex;align-items:baseline;gap:10px;">';
      if(r.e.hebrew)h+='<span style="font-size:20px;color:var(--gold);font-weight:600;">'+r.e.hebrew+'</span>';
      h+='<span style="color:var(--fg);font-weight:700;">'+escapeHtml(r.key)+'</span>';
      if(r.e.translit&&r.e.translit!==r.key)h+='<span style="color:var(--fg-mute);font-style:italic;">('+escapeHtml(r.e.translit)+')</span>';
      h+='<span style="margin-left:auto;font-size:11px;color:var(--gold);font-weight:600;">DEEP ENTRY</span>';
      h+='</div>';
      if(r.e.senses&&r.e.senses.length)h+='<div style="color:var(--fg);margin-top:4px;font-size:14px;">'+escapeHtml(r.e.senses[0])+'</div>';
      h+='</div>';
    }else{
      h+='<div class="strongs-result strongs-clickable" data-lang="'+r.lang+'" data-num="'+r.num+'">';
      h+='<div style="display:flex;align-items:baseline;gap:10px;">';
      const origLetter=r.lang==='G'?'grk':'heb';
      const original=r.e[origLetter]||r.e.heb||r.e.grk||'';
      h+='<span style="font-size:20px;color:var(--gold);font-weight:600;">'+original+'</span>';
      h+='<span style="color:var(--fg-mute);font-style:italic;">'+(r.e.xlit||'')+'</span>';
      const langLabel=r.lang==='G'?'GREEK':'HEBREW';
      h+='<span style="margin-left:auto;font-size:11px;color:var(--strongs);font-weight:600;">'+r.lang+r.num+' '+langLabel+'</span>';
      h+='</div>';
      const showDef=r.e.def||r.e.kjv_def||'';
      h+='<div style="color:var(--fg);margin-top:4px;font-size:14px;">'+escapeHtml(showDef)+'</div>';
      h+='</div>';
    }
  }
  if(results.length>30)h+='<p style="color:var(--fg-dim);font-size:12px;padding:8px;text-align:center;">Showing top 30 of '+results.length+'. Refine your search.</p>';
  out.innerHTML=h;
  // Bind clicks
  out.querySelectorAll('.strongs-clickable').forEach(function(el){
    el.addEventListener('click',function(){
      if(el.dataset.deep){
        // Open deep word popover
        showDef(el.dataset.deep);
      }else if(el.dataset.lang==='G'){
        renderStrongsEntry('G',el.dataset.num);
      }else{
        document.getElementById('strongsInput').value=el.dataset.num;
        strongsLookup();
      }
    });
  });
}

function renderStrongsEntry(lang,num){
  const result=document.getElementById('strongsLookupResult');
  if(!window._strongsHistory)window._strongsHistory=[];
  if(result.innerHTML.trim()&&!result.innerHTML.includes('strongs-back-btn-marker')){
    window._strongsHistory.push({input:document.getElementById('strongsInput').value,html:result.innerHTML});
  }
  if(lang==='G'){
    const e=window.STRONGS_GRK&&window.STRONGS_GRK[num];
    if(!e){result.innerHTML=renderStrongsBackButton()+'<div style="color:var(--warning);">No Greek entry for G'+num+'.</div>';return;}
    let h=renderStrongsBackButton();
    h+='<div class="strongs-result" style="border-left-width:4px;">';
    h+='<div style="display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;">';
    h+='<span style="font-size:32px;color:var(--gold);font-weight:600;">'+(e.grk||'')+'</span>';
    h+='<span style="font-size:18px;color:var(--fg-mute);font-style:italic;">'+(e.xlit||'')+'</span>';
    h+='<span style="margin-left:auto;font-size:13px;color:var(--strongs);font-weight:600;">G'+num+' GREEK</span>';
    h+='</div>';
    if(e.pron)h+='<div style="color:var(--fg-dim);font-size:13px;margin-top:4px;">pronunciation: '+e.pron+'</div>';
    if(e.def)h+='<div style="color:var(--fg);margin-top:10px;line-height:1.6;"><b>Strong\'s definition:</b> '+escapeHtml(e.def)+'</div>';
    if(e.kjv_def)h+='<div style="color:var(--fg);margin-top:8px;line-height:1.6;"><b>KJV usage:</b> '+escapeHtml(e.kjv_def)+'</div>';
    if(e.derivation)h+='<div style="color:var(--fg-mute);margin-top:8px;font-size:13px;"><i>Derivation:</i> '+escapeHtml(e.derivation)+'</div>';
    h+='</div>';
    result.innerHTML=h;
  }else{
    document.getElementById('strongsInput').value=num;
    strongsLookup();
  }
}

function renderStrongsBackButton(){
  if(!window._strongsHistory||window._strongsHistory.length===0)return '<span style="display:none;" class="strongs-back-btn-marker"></span>';
  return '<button class="strongs-back-btn strongs-back-btn-marker" onclick="strongsBack()">← Back to previous results</button>';
}

function strongsBack(){
  if(!window._strongsHistory||window._strongsHistory.length===0)return;
  const prev=window._strongsHistory.pop();
  document.getElementById('strongsInput').value=prev.input||'';
  document.getElementById('strongsLookupResult').innerHTML=prev.html;
  document.querySelectorAll('.strongs-clickable').forEach(function(el){
    el.addEventListener('click',function(){
      document.getElementById('strongsInput').value=el.dataset.num;
      strongsLookup();
    });
  });
}

// Source search state
let SOURCE_CACHE={};
let CURRENT_SOURCE=null;

async function openSourceSearch(key){
  const m=window.SOURCES_MANIFEST[key];
  if(!m)return;
  CURRENT_SOURCE=key;
  const title=document.getElementById('modalTitle');
  const body=document.getElementById('modalBody');
  title.textContent='📖 '+m.title;
  let h='<div style="font-size:12px;color:var(--fg-dim);margin-bottom:12px;">'+escapeHtml(m.author)+' · '+escapeHtml(m.year)+' · '+escapeHtml(m.license)+'</div>';
  h+='<div class="strongs-search">';
  h+='<input type="text" id="sourceQuery" placeholder="Search this source (e.g., circumcision, sabbath, priest)..." onkeydown="if(event.key===\'Enter\')searchSource()">';
  h+='<button onclick="searchSource()">Search</button>';
  h+='</div>';
  h+='<div style="margin-bottom:8px;"><button class="icon-btn" onclick="showModal(\'sources\')">← Back to all sources</button></div>';
  h+='<div id="sourceResults"><div style="color:var(--fg-dim);padding:20px;text-align:center;">Loading source text into memory...</div></div>';
  body.innerHTML=h;
  setTimeout(()=>document.getElementById('sourceQuery')?.focus(),100);
  // Lazy load the text
  if(!SOURCE_CACHE[key]){
    try{
      const resp=await fetch(m.file);
      if(!resp.ok)throw new Error('HTTP '+resp.status);
      SOURCE_CACHE[key]=await resp.text();
      const sizeKB=Math.round(SOURCE_CACHE[key].length/1024);
      document.getElementById('sourceResults').innerHTML='<div style="color:var(--fg-mute);padding:14px;background:var(--bg-3);border-radius:6px;font-size:13px;">✓ Loaded <b>'+sizeKB.toLocaleString()+' KB</b> of '+escapeHtml(m.title)+'. Type a search term and tap Search.</div>';
    }catch(err){
      document.getElementById('sourceResults').innerHTML='<div style="color:var(--warning);padding:14px;background:var(--warning-bg);border-radius:6px;">Could not load source file. Make sure /sources/'+escapeHtml(m.file.split("/").pop())+' exists in your repo. Error: '+escapeHtml(err.message)+'</div>';
    }
  }else{
    document.getElementById('sourceResults').innerHTML='<div style="color:var(--fg-mute);padding:14px;background:var(--bg-3);border-radius:6px;font-size:13px;">✓ Source ready. Type a search term and tap Search.</div>';
  }
}

function searchSource(){
  if(!CURRENT_SOURCE)return;
  const text=SOURCE_CACHE[CURRENT_SOURCE];
  if(!text){document.getElementById('sourceResults').innerHTML='<div style="color:var(--warning);">Source not loaded yet — try again in a moment.</div>';return}
  const query=document.getElementById('sourceQuery').value.trim();
  if(query.length<2){document.getElementById('sourceResults').innerHTML='<div style="color:var(--fg-dim);">Enter at least 2 characters.</div>';return}
  
  // Case-insensitive search, capture context
  const lower=text.toLowerCase();
  const q=query.toLowerCase();
  const hits=[];
  let idx=0;
  while((idx=lower.indexOf(q,idx))!==-1&&hits.length<50){
    const start=Math.max(0,idx-200);
    const end=Math.min(text.length,idx+query.length+250);
    let context=text.substring(start,end);
    // Highlight match
    const matchInContext=context.toLowerCase().indexOf(q);
    if(matchInContext>=0){
      const before=context.substring(0,matchInContext);
      const match=context.substring(matchInContext,matchInContext+query.length);
      const after=context.substring(matchInContext+query.length);
      context=escapeHtml(before)+'<mark style="background:var(--gold);color:#000;padding:2px 4px;border-radius:2px;">'+escapeHtml(match)+'</mark>'+escapeHtml(after);
    }else{
      context=escapeHtml(context);
    }
    hits.push({position:idx,context:'...'+context+'...'});
    idx+=q.length;
  }
  
  let resultHtml='<div style="font-size:12px;color:var(--fg-dim);margin-bottom:10px;">Found <b style="color:var(--gold);">'+hits.length+(hits.length===50?'+':'')+'</b> matches for "<b>'+escapeHtml(query)+'</b>"'+(hits.length===0?' — try a different term or simpler word.':'')+'</div>';
  for(const hit of hits){
    resultHtml+='<div style="background:var(--bg-3);border:1px solid var(--line);border-left:3px solid var(--gold);padding:12px;margin-bottom:8px;border-radius:6px;font-size:13px;line-height:1.6;">'+hit.context+'</div>';
  }
  document.getElementById('sourceResults').innerHTML=resultHtml;
}


// === SOURCES LIBRARY READERS ===

// Universal back button to library
function _libraryBackBtn(){
  return '<div style="margin-bottom:12px;"><button class="icon-btn" onclick="showModal(\'library\')">← Back to Library</button></div>';
}

// 1 Enoch reader
function openEnochReader(section, chapter){
  if(!window.ENOCH){alert('1 Enoch data not loaded');return;}
  const title=document.getElementById('modalTitle');
  const body=document.getElementById('modalBody');
  title.textContent='📜 1 Enoch — Book of Enoch';
  let h = _libraryBackBtn();
  
  if(!section){
    // Section selector
    h += '<div style="font-size:13px;color:var(--fg-mute);margin-bottom:12px;">Translated by R.H. Charles (1917). Public Domain. Quoted in Jude 14-15; parallels Genesis 5-6.</div>';
    h += '<div style="display:grid;gap:10px;">';
    const sections = {
      'Watchers':{icon:'👁️',blurb:'The fall of the Watchers and the giants. Parallels Gen 6:1-4.'},
      'Parables':{icon:'📚',blurb:'Visions of the Messiah, judgment, and the righteous.'},
      'Astronomy':{icon:'🌌',blurb:'The luminaries: sun, moon, stars, winds, calendar.'},
      'Dreams':{icon:'💭',blurb:'Symbolic visions of history — animals representing nations.'},
      'Epistle':{icon:'📜',blurb:'Final letter — woes against the wicked, hope for the righteous.'}
    };
    for(const sec in window.ENOCH){
      const meta = sections[sec] || {icon:'📖',blurb:''};
      const chCount = Object.keys(window.ENOCH[sec]).length;
      h += '<div class="people-card" style="border-left-color:var(--gold);cursor:pointer;" onclick="openEnochReader(\''+sec+'\')">';
      h += '<div class="people-card-name" style="color:var(--gold);">'+meta.icon+' '+escapeHtml(sec)+' — '+chCount+' chapter'+(chCount===1?'':'s')+'</div>';
      h += '<div style="color:var(--fg-dim);font-size:12px;margin-top:4px;">'+escapeHtml(meta.blurb)+'</div>';
      h += '</div>';
    }
    h += '</div>';
    body.innerHTML = h;
    return;
  }
  
  const secData = window.ENOCH[section];
  if(!secData){body.innerHTML = _libraryBackBtn()+'<p>Section not found.</p>';return;}
  
  if(!chapter){
    // Chapter list
    h += '<div style="margin-bottom:12px;"><button class="icon-btn" onclick="openEnochReader()">← All Sections</button></div>';
    h += '<h3 style="color:var(--gold);">📜 '+escapeHtml(section)+'</h3>';
    h += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:12px;">';
    for(const ch of Object.keys(secData)){
      h += '<button class="icon-btn" style="min-width:54px;" onclick="openEnochReader(\''+section+'\','+ch+')">Ch '+ch+'</button>';
    }
    h += '</div>';
    body.innerHTML = h;
    return;
  }
  
  // Chapter view
  const chData = secData[chapter];
  if(!chData){body.innerHTML = _libraryBackBtn()+'<p>Chapter not found.</p>';return;}
  h += '<div style="margin-bottom:8px;"><button class="icon-btn" onclick="openEnochReader(\''+section+'\')">← '+escapeHtml(section)+'</button></div>';
  h += '<h3 style="color:var(--gold);">1 Enoch · '+escapeHtml(section)+' · Chapter '+chapter+'</h3>';
  const verses = Object.keys(chData).map(n=>parseInt(n)).sort((a,b)=>a-b);
  for(const v of verses){
    h += '<div style="margin-bottom:14px;padding:10px 12px;background:var(--bg-3);border-left:3px solid var(--gold);border-radius:4px;">';
    h += '<span style="color:var(--gold);font-weight:700;font-size:11px;margin-right:8px;">v.'+v+'</span>';
    h += '<span style="line-height:1.6;">'+escapeHtml(chData[v]||'')+'</span>';
    h += '</div>';
  }
  // prev/next chapter nav
  const idx = verses.length;
  const chKeys = Object.keys(secData).map(n=>parseInt(n)).sort((a,b)=>a-b);
  const ci = chKeys.indexOf(parseInt(chapter));
  h += '<div style="display:flex;justify-content:space-between;margin-top:16px;">';
  if(ci > 0) h += '<button class="icon-btn" onclick="openEnochReader(\''+section+'\','+chKeys[ci-1]+')">← Ch '+chKeys[ci-1]+'</button>'; else h+='<span></span>';
  if(ci < chKeys.length-1) h += '<button class="icon-btn" onclick="openEnochReader(\''+section+'\','+chKeys[ci+1]+')">Ch '+chKeys[ci+1]+' →</button>';
  h += '</div>';
  body.innerHTML = h;
}


// === STRONG'S READER (rebuilt — input stable, list updates independently) ===
window._STRONGS_PAGE = window._STRONGS_PAGE || {H:0, G:0};
window._STRONGS_FILTER = window._STRONGS_FILTER || {H:'', G:''};
function openStrongsReader(lang, page){
  const data = lang==='H' ? window.STRONGS_HEB : window.STRONGS_GRK;
  if(!data){alert("Strong's data not loaded");return;}
  if(page !== undefined) window._STRONGS_PAGE[lang] = page;
  const title=document.getElementById('modalTitle');
  const body=document.getElementById('modalBody');
  title.textContent = lang==='H' ? "🔤 Strong's Hebrew Dictionary" : "🔤 Strong's Greek Dictionary";
  let h = _libraryBackBtn();
  h += '<div style="margin-bottom:10px;">';
  h += '<input type="text" id="strongsLibFilter_'+lang+'" placeholder="Filter — type any English word, transliteration, or number..." value="'+escapeHtml(window._STRONGS_FILTER[lang]||'')+'" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" style="width:100%;padding:10px 12px;background:var(--bg-3);border:1px solid var(--line);color:var(--fg);border-radius:5px;font-family:inherit;font-size:14px;">';
  h += '</div>';
  h += '<div id="strongsList_'+lang+'"></div>';
  body.innerHTML = h;
  const input = document.getElementById('strongsLibFilter_'+lang);
  // Debounced filter — runs render after the typing settles
  let _t = null;
  input.addEventListener('input', function(){
    window._STRONGS_FILTER[lang] = input.value;
    window._STRONGS_PAGE[lang] = 0;
    if(_t) clearTimeout(_t);
    _t = setTimeout(function(){ _renderStrongsList(lang); }, 80);
  });
  // Render once now (initial state)
  _renderStrongsList(lang);
  // restore focus and caret to end (in case of re-entry)
  setTimeout(function(){
    input.focus();
    const v = input.value;
    try{input.setSelectionRange(v.length, v.length);}catch(e){}
  }, 0);
}
function _renderStrongsList(lang){
  const data = lang==='H' ? window.STRONGS_HEB : window.STRONGS_GRK;
  const target = document.getElementById('strongsList_'+lang);
  if(!data || !target) return;
  const filter = (window._STRONGS_FILTER[lang]||'').toLowerCase().trim();
  let keys = Object.keys(data).sort((a,b)=>parseInt(a)-parseInt(b));
  if(filter){
    keys = keys.filter(k=>{
      const e = data[k];
      const blob = ((e.xlit||'')+' '+(e.def||'')+' '+(e.kjv_def||'')+' '+k+' '+(e.lemma||'')).toLowerCase();
      return blob.includes(filter);
    });
  }
  const perPage = 30;
  const totalPages = Math.max(1, Math.ceil(keys.length/perPage));
  const p = Math.min(window._STRONGS_PAGE[lang], totalPages-1);
  const start = p*perPage;
  const slice = keys.slice(start, start+perPage);
  let h = '<div style="font-size:11px;color:var(--fg-dim);margin-bottom:10px;">';
  if(filter){
    h += 'Found <b>'+keys.length+'</b> match'+(keys.length===1?'':'es')+' for "<b>'+escapeHtml(filter)+'</b>"';
  } else {
    h += 'Showing '+(start+1)+'-'+Math.min(start+perPage,keys.length)+' of '+keys.length+' entries';
  }
  h += '</div>';
  if(keys.length === 0){
    h += '<div style="padding:14px;color:var(--fg-mute);background:var(--bg-3);border-radius:5px;text-align:center;">No matches. Try a different word or clear the filter.</div>';
    target.innerHTML = h;
    return;
  }
  for(const k of slice){
    const e = data[k];
    h += '<div style="margin-bottom:10px;padding:10px;background:var(--bg-3);border-left:3px solid var(--gold);border-radius:4px;">';
    // Header row: Strong's number · Hebrew/Greek lemma · Transliteration · English short-gloss
    h += '<div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:8px;">';
    h += '<span style="font-weight:700;color:var(--gold);font-size:13px;">'+lang+k+'</span>';
    if(e.lemma) h += '<span style="font-size:16px;color:var(--fg);font-weight:600;">'+escapeHtml(e.lemma)+'</span>';
    if(e.xlit) h += '<span style="font-size:13px;color:var(--fg-mute);font-style:italic;">'+escapeHtml(e.xlit)+'</span>';
    // English short gloss — first words of kjv_def
    const eng = e.kjv_def || '';
    if(eng){
      const short = eng.length > 60 ? eng.substring(0,60)+'…' : eng;
      h += '<span style="font-size:13px;color:var(--gold);font-weight:600;">→ '+escapeHtml(short)+'</span>';
    }
    h += '</div>';
    if(e.def) h += '<div style="font-size:13px;margin-top:6px;line-height:1.5;">'+escapeHtml(e.def)+'</div>';
    if(e.kjv_def) h += '<div style="font-size:12px;margin-top:6px;color:var(--fg-mute);"><b>KJV uses:</b> '+escapeHtml(e.kjv_def)+'</div>';
    h += '</div>';
  }
  // Pagination
  h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;gap:8px;">';
  if(p>0) h += '<button class="icon-btn" onclick="window._STRONGS_PAGE[\''+lang+'\']='+(p-1)+';_renderStrongsList(\''+lang+'\')">← Prev</button>'; else h+='<span></span>';
  h += '<span style="font-size:12px;color:var(--fg-mute);">Page '+(p+1)+' / '+totalPages+'</span>';
  if(p<totalPages-1) h += '<button class="icon-btn" onclick="window._STRONGS_PAGE[\''+lang+'\']='+(p+1)+';_renderStrongsList(\''+lang+'\')">Next →</button>'; else h+='<span></span>';
  h += '</div>';
  target.innerHTML = h;
}

// === BDB READER (rebuilt — same stable-input pattern) ===
window._BDB_PAGE = window._BDB_PAGE || 0;
window._BDB_FILTER = window._BDB_FILTER || '';
function openBDBReader(page){
  if(!window.BDB_HEB){alert('BDB data not loaded');return;}
  if(page !== undefined) window._BDB_PAGE = page;
  const title=document.getElementById('modalTitle');
  const body=document.getElementById('modalBody');
  title.textContent='📚 Brown-Driver-Briggs Hebrew Lexicon';
  let h = _libraryBackBtn();
  h += '<div style="margin-bottom:10px;">';
  h += '<input type="text" id="bdbFilter" placeholder="Filter — type any English word or root..." value="'+escapeHtml(window._BDB_FILTER||'')+'" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" style="width:100%;padding:10px 12px;background:var(--bg-3);border:1px solid var(--line);color:var(--fg);border-radius:5px;font-family:inherit;font-size:14px;">';
  h += '</div>';
  h += '<div id="bdbList"></div>';
  body.innerHTML = h;
  const input = document.getElementById('bdbFilter');
  let _t = null;
  input.addEventListener('input', function(){
    window._BDB_FILTER = input.value;
    window._BDB_PAGE = 0;
    if(_t) clearTimeout(_t);
    _t = setTimeout(function(){ _renderBDBList(); }, 80);
  });
  _renderBDBList();
  setTimeout(function(){
    input.focus();
    const v = input.value;
    try{input.setSelectionRange(v.length, v.length);}catch(e){}
  }, 0);
}
function _renderBDBList(){
  if(!window.BDB_HEB) return;
  const target = document.getElementById('bdbList');
  if(!target) return;
  const filter = (window._BDB_FILTER||'').toLowerCase().trim();
  let keys = Object.keys(window.BDB_HEB).sort();
  if(filter){
    keys = keys.filter(k=>{
      const e = window.BDB_HEB[k];
      const blob = (k+' '+(e&&typeof e==='object'?JSON.stringify(e):String(e||''))).toLowerCase();
      return blob.includes(filter);
    });
  }
  const perPage = 25;
  const totalPages = Math.max(1, Math.ceil(keys.length/perPage));
  const p = Math.min(window._BDB_PAGE, totalPages-1);
  const start = p*perPage;
  const slice = keys.slice(start, start+perPage);
  let h = '<div style="font-size:11px;color:var(--fg-dim);margin-bottom:10px;">';
  if(filter){
    h += 'Found <b>'+keys.length+'</b> match'+(keys.length===1?'':'es')+' for "<b>'+escapeHtml(filter)+'</b>"';
  } else {
    h += 'Showing '+(start+1)+'-'+Math.min(start+perPage,keys.length)+' of '+keys.length+' entries';
  }
  h += '</div>';
  if(keys.length === 0){
    h += '<div style="padding:14px;color:var(--fg-mute);background:var(--bg-3);border-radius:5px;text-align:center;">No matches.</div>';
    target.innerHTML = h;
    return;
  }
  for(const k of slice){
    const e = window.BDB_HEB[k];
    h += '<div style="margin-bottom:10px;padding:10px;background:var(--bg-3);border-left:3px solid var(--gold);border-radius:4px;">';
    h += '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:baseline;">';
    h += '<span style="font-weight:700;color:var(--gold);">'+escapeHtml(k)+'</span>';
    if(e && typeof e === 'object'){
      if(e.lemma) h += '<span style="font-size:16px;color:var(--fg);font-weight:600;">'+escapeHtml(e.lemma)+'</span>';
      if(e.translit||e.xlit) h += '<span style="font-size:13px;color:var(--fg-mute);font-style:italic;">'+escapeHtml(e.translit||e.xlit)+'</span>';
      // English gloss
      let eng = '';
      if(e.gloss) eng = e.gloss;
      else if(Array.isArray(e.senses) && e.senses.length){
        eng = typeof e.senses[0] === 'string' ? e.senses[0] : (e.senses[0].def || e.senses[0].sense || '');
      } else if(e.def) eng = e.def;
      if(eng){
        const short = eng.length > 80 ? eng.substring(0,80)+'…' : eng;
        h += '<span style="font-size:13px;color:var(--gold);font-weight:600;">→ '+escapeHtml(short)+'</span>';
      }
    }
    h += '</div>';
    if(e && typeof e === 'object'){
      const defs = e.senses || e.definitions || (e.def?[e.def]:[]) || [];
      if(Array.isArray(defs)){
        for(const d of defs.slice(0,4)){
          const txt = typeof d==='string' ? d : (d.def || d.sense || JSON.stringify(d));
          h += '<div style="font-size:13px;margin-top:6px;line-height:1.5;">• '+escapeHtml(txt)+'</div>';
        }
      } else if(typeof defs === 'string'){
        h += '<div style="font-size:13px;margin-top:6px;line-height:1.5;">'+escapeHtml(defs)+'</div>';
      }
    } else if(typeof e === 'string'){
      h += '<div style="font-size:13px;margin-top:6px;line-height:1.5;">'+escapeHtml(e)+'</div>';
    }
    h += '</div>';
  }
  h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;gap:8px;">';
  if(p>0) h += '<button class="icon-btn" onclick="window._BDB_PAGE='+(p-1)+';_renderBDBList()">← Prev</button>'; else h+='<span></span>';
  h += '<span style="font-size:12px;color:var(--fg-mute);">Page '+(p+1)+' / '+totalPages+'</span>';
  if(p<totalPages-1) h += '<button class="icon-btn" onclick="window._BDB_PAGE='+(p+1)+';_renderBDBList()">Next →</button>'; else h+='<span></span>';
  h += '</div>';
  target.innerHTML = h;
}

// === DEEP DEFINITIONS READER (rebuilt — same stable-input pattern) ===
window._DEFS_PAGE = window._DEFS_PAGE || 0;
window._DEFS_FILTER = window._DEFS_FILTER || '';
function openDeepDefinitionsReader(page){
  if(!window.DEFINITIONS){alert('Deep definitions not loaded');return;}
  if(page !== undefined) window._DEFS_PAGE = page;
  const title=document.getElementById('modalTitle');
  const body=document.getElementById('modalBody');
  title.textContent='✍️ SWRV Deep Definitions Dictionary';
  let h = _libraryBackBtn();
  h += '<div style="margin-bottom:10px;">';
  h += '<input type="text" id="defsFilter" placeholder="Filter — type any word, transliteration, or theme..." value="'+escapeHtml(window._DEFS_FILTER||'')+'" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" style="width:100%;padding:10px 12px;background:var(--bg-3);border:1px solid var(--line);color:var(--fg);border-radius:5px;font-family:inherit;font-size:14px;">';
  h += '</div>';
  h += '<div id="defsList"></div>';
  body.innerHTML = h;
  const input = document.getElementById('defsFilter');
  let _t = null;
  input.addEventListener('input', function(){
    window._DEFS_FILTER = input.value;
    window._DEFS_PAGE = 0;
    if(_t) clearTimeout(_t);
    _t = setTimeout(function(){ _renderDefsList(); }, 80);
  });
  _renderDefsList();
  setTimeout(function(){
    input.focus();
    const v = input.value;
    try{input.setSelectionRange(v.length, v.length);}catch(e){}
  }, 0);
}
function _renderDefsList(){
  if(!window.DEFINITIONS) return;
  const target = document.getElementById('defsList');
  if(!target) return;
  const filter = (window._DEFS_FILTER||'').toLowerCase().trim();
  let keys = Object.keys(window.DEFINITIONS).filter(k=>{
    const d=window.DEFINITIONS[k];
    return d && typeof d==='object' && !Array.isArray(d);
  }).sort((a,b)=>a.toLowerCase().localeCompare(b.toLowerCase()));
  const seen=new Set();
  keys = keys.filter(k=>{
    const lk=k.toLowerCase();
    if(seen.has(lk))return false;
    seen.add(lk);
    return true;
  });
  if(filter){
    keys = keys.filter(k=>{
      const d = window.DEFINITIONS[k];
      const blob = (k+' '+(d.translit||'')+' '+(d.hebrew||'')+' '+(d.theology||'')+' '+(d.visual||'')+' '+(d.senses?d.senses.join(' '):'')).toLowerCase();
      return blob.includes(filter);
    });
  }
  const perPage = 20;
  const totalPages = Math.max(1, Math.ceil(keys.length/perPage));
  const p = Math.min(window._DEFS_PAGE, totalPages-1);
  const start = p*perPage;
  const slice = keys.slice(start, start+perPage);
  let h = '<div style="font-size:11px;color:var(--fg-dim);margin-bottom:10px;">'+keys.length+' entries'+(filter?' (filtered)':'')+' · Page '+(p+1)+' of '+totalPages+'</div>';
  if(keys.length === 0){
    h += '<div style="padding:14px;color:var(--fg-mute);background:var(--bg-3);border-radius:5px;text-align:center;">No matches.</div>';
    target.innerHTML = h;
    return;
  }
  for(const k of slice){
    const d = window.DEFINITIONS[k];
    h += '<div style="margin-bottom:12px;padding:12px;background:var(--bg-3);border-left:3px solid var(--gold);border-radius:4px;">';
    h += '<div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:8px;">';
    h += '<span style="font-weight:700;color:var(--gold);font-size:15px;">'+escapeHtml(k)+'</span>';
    if(d.hebrew) h += '<span style="font-size:17px;color:var(--fg);font-weight:600;">'+escapeHtml(d.hebrew)+'</span>';
    if(d.translit) h += '<span style="font-size:12px;color:var(--fg-mute);font-style:italic;">'+escapeHtml(d.translit)+'</span>';
    if(d.strongs) h += '<span style="font-size:11px;color:var(--fg-mute);">'+escapeHtml(d.strongs)+'</span>';
    h += '</div>';
    if(d.root) h += '<div style="font-size:13px;margin-top:6px;line-height:1.5;"><b>Root:</b> '+escapeHtml(d.root)+'</div>';
    if(d.senses && d.senses.length){
      h += '<div style="font-size:13px;margin-top:6px;line-height:1.5;"><b>Senses:</b>';
      h += '<ul style="margin:4px 0 0 16px;padding:0;">';
      for(const s of d.senses) h += '<li style="margin-top:2px;">'+escapeHtml(s)+'</li>';
      h += '</ul></div>';
    }
    if(d.theology) h += '<div style="font-size:13px;margin-top:8px;line-height:1.5;padding:8px;background:var(--bg-2);border-radius:4px;"><b>Theology:</b> '+escapeHtml(d.theology)+'</div>';
    if(d.cross && d.cross.length) h += '<div style="font-size:11px;color:var(--fg-dim);margin-top:6px;"><b>Cross-refs:</b> '+escapeHtml(d.cross.join(' · '))+'</div>';
    h += '</div>';
  }
  h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;gap:8px;">';
  if(p>0) h += '<button class="icon-btn" onclick="window._DEFS_PAGE='+(p-1)+';_renderDefsList()">← Prev</button>'; else h+='<span></span>';
  h += '<span style="font-size:12px;color:var(--fg-mute);">Page '+(p+1)+' / '+totalPages+'</span>';
  if(p<totalPages-1) h += '<button class="icon-btn" onclick="window._DEFS_PAGE='+(p+1)+';_renderDefsList()">Next →</button>'; else h+='<span></span>';
  h += '</div>';
  target.innerHTML = h;
}

// Source text reader (Josephus, Edersheim, etc.) — read OR search
window._SRC_PAGE = {};
window._SRC_MODE = {};  // 'read' or 'search'
async function openSourceReader(key){
  const m = window.SOURCES_MANIFEST && window.SOURCES_MANIFEST[key];
  if(!m){alert('Source not registered: '+key);return;}
  CURRENT_SOURCE = key;
  const title=document.getElementById('modalTitle');
  const body=document.getElementById('modalBody');
  title.textContent='📖 '+m.title;
  let h = _libraryBackBtn();
  h += '<div style="font-size:12px;color:var(--fg-dim);margin-bottom:12px;">'+escapeHtml(m.author)+' · '+escapeHtml(m.year)+' · '+escapeHtml(m.license||'Public Domain')+'</div>';
  
  // Mode tabs: Read | Search
  const mode = window._SRC_MODE[key] || 'read';
  h += '<div style="display:flex;gap:6px;margin-bottom:10px;">';
  h += '<button class="icon-btn"'+(mode==='read'?' style="background:var(--gold);color:#000;"':'')+' onclick="window._SRC_MODE[\''+key+'\']=\'read\';openSourceReader(\''+key+'\')">📖 Read</button>';
  h += '<button class="icon-btn"'+(mode==='search'?' style="background:var(--gold);color:#000;"':'')+' onclick="window._SRC_MODE[\''+key+'\']=\'search\';openSourceReader(\''+key+'\')">🔍 Search</button>';
  h += '</div>';
  
  if(mode === 'search'){
    h += '<div class="strongs-search" style="display:flex;gap:6px;margin-bottom:10px;">';
    h += '<input type="text" id="sourceQuery" placeholder="Search this source..." style="flex:1;padding:8px 10px;background:var(--bg-3);border:1px solid var(--line);color:var(--fg);border-radius:5px;font-family:inherit;" onkeydown="if(event.key===\'Enter\')searchSource()">';
    h += '<button class="icon-btn" onclick="searchSource()">Search</button>';
    h += '</div>';
    h += '<div id="sourceResults"><div style="color:var(--fg-dim);padding:20px;text-align:center;">Loading source...</div></div>';
    body.innerHTML = h;
    setTimeout(()=>document.getElementById('sourceQuery')?.focus(),100);
  } else {
    // Read mode — paginated by character chunks
    h += '<div id="sourceReadPane"><div style="color:var(--fg-dim);padding:20px;text-align:center;">Loading source text...</div></div>';
    body.innerHTML = h;
  }
  
  // Load source if not cached
  if(!SOURCE_CACHE[key]){
    try{
      const resp = await fetch(m.file);
      if(!resp.ok) throw new Error('HTTP '+resp.status);
      SOURCE_CACHE[key] = await resp.text();
    } catch(err){
      const target = mode==='search' ? 'sourceResults' : 'sourceReadPane';
      document.getElementById(target).innerHTML = '<div style="color:var(--warning);padding:14px;background:rgba(255,100,100,0.1);border-radius:6px;">Could not load /'+escapeHtml(m.file)+'. Error: '+escapeHtml(err.message)+'</div>';
      return;
    }
  }
  
  if(mode === 'read'){
    _renderSourceReadPage(key);
  } else {
    // search mode — show ready message
    const sizeKB = Math.round(SOURCE_CACHE[key].length/1024);
    document.getElementById('sourceResults').innerHTML = '<div style="color:var(--fg-mute);padding:14px;background:var(--bg-3);border-radius:6px;font-size:13px;">✓ Loaded '+sizeKB.toLocaleString()+' KB. Type a search term above.</div>';
  }
}

function _renderSourceReadPage(key, page){
  const text = SOURCE_CACHE[key];
  if(!text) return;
  if(page !== undefined) window._SRC_PAGE[key] = page;
  const pageSize = 6000; // chars per page, ~1.5 screens
  const totalPages = Math.max(1, Math.ceil(text.length/pageSize));
  const p = Math.min(window._SRC_PAGE[key]||0, totalPages-1);
  const start = p*pageSize;
  // try to break at a paragraph boundary
  let end = Math.min(start+pageSize, text.length);
  if(end < text.length){
    const nb = text.indexOf('\n\n', end);
    if(nb !== -1 && nb < end+1000) end = nb;
  }
  const chunk = text.substring(start, end);
  let h = '<div style="font-size:11px;color:var(--fg-dim);margin-bottom:8px;">Page '+(p+1)+' / '+totalPages+' · '+(Math.round(text.length/1024)).toLocaleString()+' KB total</div>';
  h += '<div style="white-space:pre-wrap;font-family:Georgia,serif;line-height:1.65;font-size:14px;background:var(--bg-3);padding:14px;border-radius:6px;border-left:3px solid var(--gold);">'+escapeHtml(chunk)+'</div>';
  h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;gap:8px;">';
  if(p>0) h += '<button class="icon-btn" onclick="_renderSourceReadPage(\''+key+'\','+(p-1)+')">← Prev</button>'; else h+='<span></span>';
  h += '<input type="number" min="1" max="'+totalPages+'" value="'+(p+1)+'" style="width:70px;padding:4px 6px;background:var(--bg-3);border:1px solid var(--line);color:var(--fg);text-align:center;border-radius:4px;" onchange="_renderSourceReadPage(\''+key+'\',parseInt(this.value)-1)">';
  if(p<totalPages-1) h += '<button class="icon-btn" onclick="_renderSourceReadPage(\''+key+'\','+(p+1)+')">Next →</button>'; else h+='<span></span>';
  h += '</div>';
  document.getElementById('sourceReadPane').innerHTML = h;
}


function showModal(type){
  _lockBodyScroll();
  const title=document.getElementById('modalTitle');
  const body=document.getElementById('modalBody');
  if(type==='prehistory'){
    const book = window.currentBook || 'Genesis';
    let ph = window.PRE_HISTORY;
    if(book === 'Exodus') ph = window.EXODUS_PRE_HISTORY;
    if(!ph){
      title.textContent='Backstory';
      body.innerHTML='<p style="padding:20px;color:var(--fg-mute);">No backstory primer available for '+book+' yet. Pre-history primers exist for Genesis (Watcher backstory) and Exodus (the 400-year gap). More books coming.</p>';
      return;
    }
    title.textContent=ph.title||'Before '+book+' Begins';
    let h='<div class="pre-history-modal">';
    h+='<p style="font-size:16px;line-height:1.6;color:var(--fg);font-style:italic;margin-bottom:18px;">'+ph.subtitle+'</p>';
    for(const sec of ph.sections){
      h+='<h4>'+sec.heading+'</h4>';
      h+='<p>'+sec.body.replace(/\n/g,'<br><br>')+'</p>';
      if(sec.rule_note)h+='<div class="ph-rule-note">'+sec.rule_note+'</div>';
      if(sec.watcher_story)h+='<p>'+sec.watcher_story.replace(/\n/g,'<br><br>')+'</p>';
      if(sec.enoch_verbatim_summary)h+='<p>'+sec.enoch_verbatim_summary.replace(/\n/g,'<br><br>')+'</p>';
      if(sec.what_it_means)h+='<div class="ph-meaning">'+sec.what_it_means.replace(/\n/g,'<br><br>')+'</div>';
      if(sec.what_to_carry)h+='<div class="ph-meaning">'+sec.what_to_carry.replace(/\n/g,'<br><br>')+'</div>';
      if(sec.sources)h+='<div class="ph-sources"><b>Sources:</b> '+sec.sources+'</div>';
    }
    h+='<div class="ph-rule-note" style="margin-top:24px;">'+ph.footer_note+'</div>';
    h+='</div>';
    body.innerHTML=h;
  }else if(type==='story'){
    title.textContent='The Story Behind The Story';
    let h='<div class="story-nav" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;">';
    h+='<button class="story-tab active" onclick="showStorySection(this, \'who\')">Who Were They?</button>';
    h+='<button class="story-tab" onclick="showStorySection(this, \'editors\')">Who Edited This Bible?</button>';
    h+='<button class="story-tab" onclick="showStorySection(this, \'arc\')">Genesis Story Arc</button>';
    h+='<button class="story-tab" onclick="showStorySection(this, \'life\')">Daily Life</button>';
    h+='<button class="story-tab" onclick="showStorySection(this, \'peoples\')">The Peoples</button>';
    h+='</div>';
    h+='<div id="storyContent"></div>';
    body.innerHTML=h;
    showStorySection(document.querySelector('.story-tab'), 'who');
  }else if(type==='strongs'){
    title.textContent='Word Search';
    window._strongsHistory=[];
    let h='<div class="howto-box">';
    h+='<div class="howto-label">HOW TO USE</div>';
    h+='<div style="font-size:13px;color:var(--fg);line-height:1.5;"><b>Just type any English word.</b> Searches Hebrew, Greek, and deep word entries across the whole Bible. Click any result to see the full meaning. Use <b>Back</b> to return.</div>';
    h+='<div id="suggestionChips" style="margin-top:8px;font-size:12px;color:var(--fg-dim);"></div>';
    h+='<input type="text" id="strongsInput" placeholder="Type a word (love, covenant) or number (7287)" onkeydown="if(event.key===\'Enter\')strongsSmartLookup()">';
    h+='<button onclick="strongsSmartLookup()">Search</button>';
    h+='</div>';
    h+='<div id="strongsLookupResult"></div>';
    h+='<div style="margin-top:18px;padding-top:14px;border-top:1px solid var(--line);font-size:11px;color:var(--fg-dim);">';
    h+='<b>Source:</b> James Strong, <i>A Concise Dictionary of the Words in the Hebrew Bible</i> (1894). Public domain.<br>';
    h+='Data via openscriptures.org under CC-BY-SA.';
    h+='</div>';
    body.innerHTML=h;
    setTimeout(()=>document.getElementById('strongsInput')?.focus(),100);
  }else if(type==='glossary'){
    title.textContent='📖 Glossary — Acronyms and Terms';
    let h='<p style="font-size:13px;color:var(--fg-mute);margin-bottom:14px;">Anytime you see one of these in the app, this is what it means.</p>';
    h+='<div style="margin-bottom:10px;"><input type="text" id="glossFilter" placeholder="Filter — type a term..." autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" style="width:100%;padding:10px 12px;background:var(--bg-3);border:1px solid var(--line);color:var(--fg);border-radius:5px;font-family:inherit;font-size:14px;"></div>';
    h+='<div id="glossList"></div>';
    body.innerHTML=h;
    setTimeout(function(){
      const inp = document.getElementById('glossFilter');
      if(!inp) return;
      let _t=null;
      inp.addEventListener('input',function(){
        if(_t)clearTimeout(_t);
        _t=setTimeout(_renderGlossList,80);
      });
      _renderGlossList();
      inp.focus();
    },0);
  }else if(type==='rules'){
    title.textContent='The 13 Rules — SWRV Kingdom Study Protocol';
    body.innerHTML='<p>This study tool operates under 13 absolute rules.</p><h4>RULE 01 — THE TEXT IS THE AUTHORITY</h4><p>Every answer comes directly from the source texts.</p><h4>RULE 02 — NOTHING ADDED. NOTHING REMOVED.</h4><p>Report exactly what the text says.</p><h4>RULE 03 — REPORT WHAT IS WRITTEN. NOT WHAT IS POPULAR.</h4><p>Mainstream consensus is not a source.</p><h4>RULE 04 — NO OPINIONS. ZERO.</h4><p>Report. Do not interpret beyond the text.</p><h4>RULE 05 — NO WHITEWASHING.</h4><p>Report cultural realities — including the regional appearance of biblical peoples — as documented by the library.</p><h4>RULE 06 — NO OUTSIDE SOURCES. THE LIBRARY IS CLOSED.</h4><p>Only the Approved Library may be cited.</p><h4>RULE 07 — NO GREEK PHILOSOPHY. NO PLATONISM.</h4><p>No Platonic body/soul dualism on Hebrew/Greek texts.</p><h4>RULE 08 — NO CHERRY-PICKING.</h4><p>Report the full pattern.</p><h4>RULE 09 — ALWAYS DEFINE THE ORIGINAL WORD.</h4><p>Tap any underlined word.</p><h4>RULE 10 — ALWAYS PROVIDE CULTURAL AND HISTORICAL CONTEXT.</h4><p>Cultural Context (green) and People Profiles (orange) panels apply this throughout.</p><h4>RULE 11 — FLAG EVERY TRANSLATION LOSS.</h4><p>Red boxes throughout.</p><h4>RULE 12 — READ THROUGH ANCIENT NEAR EASTERN EYES.</h4><p>Kingdom Lens (gold) and People Profiles apply this.</p><h4>RULE 13 — IF IT CANNOT BE SOURCED, IT CANNOT BE SAID.</h4><p>Every claim traceable to the Approved Library.</p>';
  }else if(type==='library'){
    title.textContent='📚 Sources Library — Read Each Source Separately';
    let h='<p style="font-size:13px;color:var(--fg-mute);margin-bottom:14px;">Every approved source is browsable here. Tap any to open the reader. All texts public domain or CC-licensed.</p>';
    h+='<h4 style="color:var(--gold);margin-top:12px;">📖 Bible Texts & Apocryphal Books</h4>';
    h+='<div style="display:grid;gap:8px;">';
    h+='<div class="people-card" style="border-left-color:var(--gold);" onclick="openEnochReader()">';
    h+='<div class="people-card-name" style="color:var(--gold);">📜 1 Enoch — Book of Enoch</div>';
    h+='<div style="color:var(--fg-mute);font-size:12px;margin-top:4px;">tr. R.H. Charles (1917) · Public Domain</div>';
    h+='<div style="color:var(--fg-dim);font-size:12px;margin-top:4px;">Watchers · Parables · Astronomy · Dreams · Epistle. Parallel to Genesis 5-6; quoted in Jude 14-15.</div>';
    h+='</div>';
    h+='</div>';
    h+='<h4 style="color:var(--gold);margin-top:18px;">🔤 Hebrew & Greek Lexicons (integrated)</h4>';
    h+='<div style="display:grid;gap:8px;">';
    h+='<div class="people-card" style="border-left-color:var(--gold);" onclick="openStrongsReader(\'H\')">';
    h+='<div class="people-card-name" style="color:var(--gold);">🔤 Strong\'s Hebrew Dictionary</div>';
    h+='<div style="color:var(--fg-mute);font-size:12px;margin-top:4px;">James Strong (1890) · 8,674 entries · Public Domain</div>';
    h+='</div>';
    h+='<div class="people-card" style="border-left-color:var(--gold);" onclick="openStrongsReader(\'G\')">';
    h+='<div class="people-card-name" style="color:var(--gold);">🔤 Strong\'s Greek Dictionary</div>';
    h+='<div style="color:var(--fg-mute);font-size:12px;margin-top:4px;">James Strong (1890) · 5,523 entries · Public Domain</div>';
    h+='</div>';
    h+='<div class="people-card" style="border-left-color:var(--gold);" onclick="openBDBReader()">';
    h+='<div class="people-card-name" style="color:var(--gold);">📚 Brown-Driver-Briggs Hebrew Lexicon</div>';
    h+='<div style="color:var(--fg-mute);font-size:12px;margin-top:4px;">Brown · Driver · Briggs (1906) · ~9,345 entries · Public Domain · via STEPBible CC BY 4.0</div>';
    h+='</div>';
    h+='<div class="people-card" style="border-left-color:var(--gold);" onclick="openDeepDefinitionsReader()">';
    h+='<div class="people-card-name" style="color:var(--gold);">✍️ SWRV Deep Definitions Dictionary</div>';
    h+='<div style="color:var(--fg-mute);font-size:12px;margin-top:4px;">Curated theological dictionary built for this study</div>';
    h+='</div>';
    h+='</div>';
    h+='<h4 style="color:var(--gold);margin-top:18px;">📖 Reference Works (full text, in /sources/)</h4>';
    h+='<div style="display:grid;gap:8px;">';
    if(window.SOURCES_MANIFEST){
      for(const [key,m] of Object.entries(window.SOURCES_MANIFEST)){
        h+='<div class="people-card" style="border-left-color:var(--gold);" onclick="openSourceReader(\''+key+'\')">';
        h+='<div class="people-card-name" style="color:var(--gold);">📖 '+escapeHtml(m.title)+'</div>';
        h+='<div style="color:var(--fg-mute);font-size:12px;margin-top:4px;">'+escapeHtml(m.author)+' · '+escapeHtml(m.year)+' · '+escapeHtml(m.license||'Public Domain')+'</div>';
        h+='<div style="color:var(--fg-dim);font-size:12px;margin-top:6px;">'+escapeHtml(m.description||'')+'</div>';
        h+='</div>';
      }
    }
    h+='</div>';
    h+='<h4 style="color:var(--gold);margin-top:18px;">👥 People & Places</h4>';
    h+='<div style="display:grid;gap:8px;">';
    h+='<div class="people-card" style="border-left-color:var(--gold);" onclick="showModal(\'peoples\')">';
    h+='<div class="people-card-name" style="color:var(--gold);">👤 Peoples Profiles</div>';
    h+='<div style="color:var(--fg-mute);font-size:12px;margin-top:4px;">Origins, regions, appearance of biblical peoples</div>';
    h+='</div>';
    h+='</div>';
    h+='<div style="margin-top:20px;padding-top:14px;border-top:1px solid var(--line);font-size:11px;color:var(--fg-dim);">All sources live in this app. Rule 06 (closed library) and Rule 13 (sourced claims only) apply.</div>';
    body.innerHTML=h;
  }else if(type==='peoples'){
    title.textContent='Peoples of Genesis — Origins, Regions, Appearance';
    let h='<p style="color:var(--people);font-weight:600;">RULE 05 (NO WHITEWASHING) + RULE 12 (ANE EYES). Tap any name for the full profile.</p>';
    const sortedNames=Object.keys(window.PEOPLES).sort();
    for(const name of sortedNames){
      const p=window.PEOPLES[name];
      h+='<div class="people-card" onclick="closeModal();showPerson(\''+name+'\')">';
      h+='<div class="people-card-name">👤 '+escapeHtml(name)+'</div>';
      h+='<div class="people-card-region">'+escapeHtml(p.region||'')+'</div>';
      h+='</div>';
    }
    body.innerHTML=h;
  }else if(type==='sources'){
    title.textContent='Approved Sources — Search & Browse';
    let h='<p>Search across the full prose source library. All texts are public domain.</p>';
    h+='<div style="display:grid;gap:10px;margin-top:14px;">';
    for(const [key,m] of Object.entries(window.SOURCES_MANIFEST)){
      h+='<div class="people-card" style="border-left-color:var(--gold);" onclick="openSourceSearch(\'\'+key+\'\')">';
      h+='<div class="people-card-name" style="color:var(--gold);">📖 '+escapeHtml(m.title)+'</div>';
      h+='<div style="color:var(--fg-mute);font-size:12px;margin-top:4px;">'+escapeHtml(m.author)+' · '+escapeHtml(m.year)+'</div>';
      h+='<div style="color:var(--fg-dim);font-size:12px;margin-top:6px;">'+escapeHtml(m.description)+'</div>';
      h+='</div>';
    }
    h+='</div>';
    h+='<div style="margin-top:18px;padding-top:14px;border-top:1px solid var(--line);font-size:11px;color:var(--fg-dim);">All sources hosted in /sources/ folder. Cached offline by service worker after first load.</div>';
    body.innerHTML=h;
  }else if(type==='audit'){
    title.textContent='Verse Audit — All 50 Chapters';
    let auditHtml='<p><b>Total verses present:</b> '+window.AUDIT_TOTAL+' (full Hebrew Genesis)</p>';
    auditHtml+='<p style="font-size:12px;color:var(--fg-dim);">JPS follows Hebrew Masoretic numbering. Christian Bible Genesis 31:55 = our Genesis 32:1.</p>';
    auditHtml+='<table><thead><tr><th>Ch</th><th>Verses</th><th>Title</th></tr></thead><tbody>';
    for(let i=1;i<=50;i++){
      const ch=window.GENESIS[i];
      const title=ch?ch.title.replace(/^Genesis \d+ — /,''):'';
      auditHtml+='<tr><td>'+i+'</td><td>'+window.AUDIT[i]+'</td><td>'+escapeHtml(title)+'</td></tr>';
    }
    auditHtml+='</tbody></table>';
    body.innerHTML=auditHtml;
  }
  document.getElementById('modal').classList.add('show');
  setTimeout(_populateSuggestionChips, 0);
}
function closeModal(){
  _unlockBodyScroll();document.getElementById('modal').classList.remove('show')}

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeDef();closeModal()}
  if(mode==='verse'){
    if(e.key==='ArrowLeft')prevVerse();
    if(e.key==='ArrowRight')nextVerse();
  }else{
    if(e.key==='ArrowLeft'&&currentChapter>1)loadChapter(currentChapter-1);
    if(e.key==='ArrowRight'&&currentChapter<50)loadChapter(currentChapter+1);
  }
});

if(mode==='verse'){
  document.body.classList.add('verse-mode');
  document.getElementById('modeChapterBtn').classList.remove('active');
  document.getElementById('modeVerseBtn').classList.add('active');
}

loadChapter(currentChapter);


// ============================================================
// Keyboard arrow navigation only (swipe removed - vertical scroll preserved)
(function(){
  document.addEventListener('keydown',function(e){
    if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
    const modal=document.getElementById('modal');
    if(modal && modal.classList.contains('show'))return;
    if(e.key==='ArrowLeft'){prevChapter();e.preventDefault();}
    if(e.key==='ArrowRight'){nextChapter();e.preventDefault();}
  });
})();

function _renderGlossList(){
  if(!window.GLOSSARY) return;
  const target = document.getElementById('glossList');
  if(!target) return;
  const inp = document.getElementById('glossFilter');
  const filter = (inp?inp.value:'').toLowerCase().trim();
  const keys = Object.keys(window.GLOSSARY).sort();
  const filtered = filter
    ? keys.filter(k=>{
        const g = window.GLOSSARY[k];
        return (k+' '+(g.term||'')+' '+(g.body||'')).toLowerCase().includes(filter);
      })
    : keys;
  let h = '<div style="font-size:11px;color:var(--fg-dim);margin-bottom:10px;">'+filtered.length+' term'+(filtered.length===1?'':'s')+(filter?' (filtered)':'')+'</div>';
  if(filtered.length===0){
    h += '<div style="padding:14px;color:var(--fg-mute);background:var(--bg-3);border-radius:5px;text-align:center;">No matches.</div>';
    target.innerHTML = h;
    return;
  }
  for(const k of filtered){
    const g = window.GLOSSARY[k];
    h += '<div style="margin-bottom:12px;padding:12px;background:var(--bg-3);border-left:3px solid var(--gold);border-radius:4px;">';
    h += '<div style="font-weight:700;color:var(--gold);font-size:14px;">'+escapeHtml(k)+(g.term && g.term!==k?' — '+escapeHtml(g.term):'')+'</div>';
    if(g.body) h += '<div style="font-size:13px;margin-top:6px;line-height:1.55;">'+escapeHtml(g.body)+'</div>';
    h += '</div>';
  }
  target.innerHTML = h;
}
