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

const THEMES=['parchment','stone','hicon'];
let themeIdx=0;
function cycleTheme(){themeIdx=(themeIdx+1)%THEMES.length;document.body.dataset.theme=THEMES[themeIdx];localStorage.setItem('swrv_theme',THEMES[themeIdx])}
const savedTheme=localStorage.getItem('swrv_theme');
if(savedTheme){themeIdx=THEMES.indexOf(savedTheme);document.body.dataset.theme=savedTheme}

let currentChapter=parseInt(localStorage.getItem('swrv_chapter'))||1;
let currentVerse=parseInt(localStorage.getItem('swrv_verse'))||1;
let mode=localStorage.getItem('swrv_mode')||'chapter';

const chapterSelect=document.getElementById('chapterSelect');
for(let i=1;i<=50;i++){
  const ch=window.GENESIS[i];
  if(!ch)continue;
  const opt=document.createElement('option');
  opt.value=i;
  const title=ch.title.replace(/^Genesis \d+ — /,'');
  const verseCount=window.AUDIT[i]||0;
  opt.textContent='Genesis '+i+' — '+title+' ('+verseCount+' verses)';
  if(i===currentChapter)opt.selected=true;
  chapterSelect.appendChild(opt);
}
function prevChapter(){if(currentChapter>1){loadChapter(currentChapter-1);}}
function nextChapter(){if(currentChapter<50){loadChapter(currentChapter+1);}}

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

function loadChapter(n){
  const sel=document.getElementById('chapterSelect');if(sel)sel.value=n;
  currentChapter=n;localStorage.setItem('swrv_chapter',n);
  const ch=window.GENESIS[n];if(!ch)return;
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
  document.getElementById('defOverlay').classList.add('show');
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
  document.getElementById('defOverlay').classList.add('show');
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
  document.getElementById('defOverlay').classList.add('show');
}

function closeDef(){
  document.getElementById('defPopup').classList.remove('show','people','strongs');
  document.getElementById('defOverlay').classList.remove('show');
}

function strongsLookup(){
  const input=document.getElementById('strongsInput');
  const query=input.value.trim().toUpperCase();
  const result=document.getElementById('strongsLookupResult');
  let id=query.startsWith('H')?query:'H'+query;
  if(!/^H\d+$/.test(id)){
    result.innerHTML='<div style="color:var(--warning);">Enter a number (e.g., 7287) or H-number (e.g., H7287).</div>';
    return;
  }
  const entry=window.STRONGS_HEB[id];
  const bdbResults=lookupBDB(id);
  if(!entry&&bdbResults.length===0){
    result.innerHTML='<div style="color:var(--warning);">'+id+' not found.</div>';
    return;
  }
  let html='<div class="strongs-result">';
  html+='<div class="strongs-result-id">'+id+(bdbResults.length>1?' — '+bdbResults.length+' senses':'')+'</div>';
  const lemma=(bdbResults[0]?.entry?.lemma)||entry?.lemma;
  if(lemma)html+='<div class="strongs-result-lemma">'+lemma+'</div>';
  const xlit=entry?.xlit||bdbResults[0]?.entry?.xlit;
  if(xlit)html+='<div class="strongs-result-xlit">'+escapeHtml(xlit)+(entry?.pron?' — '+escapeHtml(entry.pron):'')+'</div>';
  if(bdbResults.length>0){
    html+='<div style="margin-top:10px;padding-top:8px;border-top:1px solid var(--line);">';
    html+='<div style="color:var(--strongs);font-weight:700;font-size:11px;font-family:-apple-system,sans-serif;letter-spacing:0.8px;margin-bottom:6px;">📖 BDB HEBREW LEXICON</div>';
    for(const r of bdbResults){
      if(bdbResults.length>1)html+='<div style="color:var(--gold);font-weight:700;font-size:12px;margin-top:6px;">'+r.key+(r.entry.gloss?' — "'+escapeHtml(r.entry.gloss)+'"':'')+'</div>';
      else if(r.entry.gloss)html+='<div style="color:var(--gold);font-weight:600;font-size:13px;">"'+escapeHtml(r.entry.gloss)+'"</div>';
      if(r.entry.def){
        const def=r.entry.def.replace(/<[^>]*>/g,'').replace(/\s*\|\s*/g,'<br>');
        html+='<div class="strongs-result-def" style="margin-top:4px;">'+def+'</div>';
      }
    }
    html+='</div>';
  }
  if(entry){
    html+='<div style="margin-top:10px;padding-top:8px;border-top:1px solid var(--line);">';
    html+='<div style="color:var(--strongs);font-weight:700;font-size:11px;font-family:-apple-system,sans-serif;letter-spacing:0.8px;margin-bottom:6px;">📚 STRONG\'S CONCISE</div>';
    if(entry.derivation)html+='<div class="strongs-result-def"><b>Derivation:</b> '+escapeHtml(entry.derivation)+'</div>';
    if(entry.strongs_def)html+='<div class="strongs-result-def" style="margin-top:4px;">'+escapeHtml(entry.strongs_def)+'</div>';
    if(entry.kjv_def)html+='<div class="strongs-result-kjv"><b>KJV:</b> '+escapeHtml(entry.kjv_def)+'</div>';
    html+='</div>';
  }
  html+='</div>';
  result.innerHTML=html;
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

function showModal(type){
  const title=document.getElementById('modalTitle');
  const body=document.getElementById('modalBody');
  if(type==='prehistory'){
    title.textContent='Before Genesis Begins';
    const ph=window.PRE_HISTORY;
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
  }else if(type==='strongs'){
    title.textContent='Strong\'s Hebrew Lexicon';
    let h='<p>Look up any Hebrew word by Strong\'s number. <b>BDB + Strong\'s combined.</b> Range: H1 – H8674.</p>';
    h+='<p style="font-size:12px;color:var(--fg-dim);">Try: 7287 (radah, two senses!), 6754 (tselem), 5731 (Eden), 1254 (bara, two senses!), 2145 (zakar), 5347 (neqebah). BDB shows multiple senses where the same Hebrew root has multiple meanings.</p>';
    h+='<div class="strongs-search">';
    h+='<input type="text" id="strongsInput" placeholder="Enter number (e.g., 7287)" onkeydown="if(event.key===\'Enter\')strongsLookup()">';
    h+='<button onclick="strongsLookup()">Look Up</button>';
    h+='</div>';
    h+='<div id="strongsLookupResult"></div>';
    h+='<div style="margin-top:18px;padding-top:14px;border-top:1px solid var(--line);font-size:11px;color:var(--fg-dim);">';
    h+='<b>Source:</b> James Strong, <i>A Concise Dictionary of the Words in the Hebrew Bible</i> (1894). Public domain.<br>';
    h+='Data via openscriptures.org under CC-BY-SA.';
    h+='</div>';
    body.innerHTML=h;
    setTimeout(()=>document.getElementById('strongsInput')?.focus(),100);
  }else if(type==='rules'){
    title.textContent='The 13 Rules — SWRV Kingdom Study Protocol';
    body.innerHTML='<p>This study tool operates under 13 absolute rules.</p><h4>RULE 01 — THE TEXT IS THE AUTHORITY</h4><p>Every answer comes directly from the source texts.</p><h4>RULE 02 — NOTHING ADDED. NOTHING REMOVED.</h4><p>Report exactly what the text says.</p><h4>RULE 03 — REPORT WHAT IS WRITTEN. NOT WHAT IS POPULAR.</h4><p>Mainstream consensus is not a source.</p><h4>RULE 04 — NO OPINIONS. ZERO.</h4><p>Report. Do not interpret beyond the text.</p><h4>RULE 05 — NO WHITEWASHING.</h4><p>Report cultural realities — including the regional appearance of biblical peoples — as documented by the library.</p><h4>RULE 06 — NO OUTSIDE SOURCES. THE LIBRARY IS CLOSED.</h4><p>Only the Approved Library may be cited.</p><h4>RULE 07 — NO GREEK PHILOSOPHY. NO PLATONISM.</h4><p>No Platonic body/soul dualism on Hebrew/Greek texts.</p><h4>RULE 08 — NO CHERRY-PICKING.</h4><p>Report the full pattern.</p><h4>RULE 09 — ALWAYS DEFINE THE ORIGINAL WORD.</h4><p>Tap any underlined word.</p><h4>RULE 10 — ALWAYS PROVIDE CULTURAL AND HISTORICAL CONTEXT.</h4><p>Cultural Context (green) and People Profiles (orange) panels apply this throughout.</p><h4>RULE 11 — FLAG EVERY TRANSLATION LOSS.</h4><p>Red boxes throughout.</p><h4>RULE 12 — READ THROUGH ANCIENT NEAR EASTERN EYES.</h4><p>Kingdom Lens (gold) and People Profiles apply this.</p><h4>RULE 13 — IF IT CANNOT BE SOURCED, IT CANNOT BE SAID.</h4><p>Every claim traceable to the Approved Library.</p>';
  }else if(type==='library'){
    title.textContent='Approved Library — Rule 06 / Rule 13';
    body.innerHTML='<p>Under Rule 06 and Rule 13, only these sources may be cited. All public domain or CC-licensed.</p><h4>📜 Primary Bible Texts</h4><p><b>Tanakh JPS 1917</b> · Primary Hebrew Bible text in English.<br><b>Hebrew Masoretic Text</b> · Original Hebrew.<br><b>King James Version 1611</b> · Foundational English translation.<br><b>Septuagint (LXX) Brenton 1851</b> · Greek translation from ~250 BC.<br><b>Amplified Bible — Zondervan</b> · Word-range expansion translation.</p><h4>🔤 Hebrew & Greek Lexicons (structured, integrated)</h4><p><b>Brown-Driver-Briggs (BDB), 1906</b> · 9,345 entries with multi-sense disambiguation. Via STEPBible (CC BY 4.0).<br><b>Strong\'s Hebrew Dictionary, 1894</b> · 8,674 entries.<br><b>Strong\'s Greek Dictionary, 1890</b> · 5,523 entries.</p><h4>📖 Reference Works (searchable text in /sources/)</h4><p><b>Thayer\'s Greek-English Lexicon, 1889</b> · J.H. Thayer unabridged.<br><b>Edersheim — Sketches of Jewish Social Life, 1876</b> · Cultural background.<br><b>Edersheim — The Temple, 1874</b> · Temple structure, priesthood, festivals.<br><b>Josephus — Antiquities of the Jews</b> (Whiston tr.) · Books I-II cover Genesis.<br><b>Book of Enoch (1 Enoch)</b> · Genesis 6 parallel.</p><h4>📚 Reference Aids</h4><p><b>Zondervan Bible Dictionary</b> · ANE context.</p>';
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
}
function closeModal(){document.getElementById('modal').classList.remove('show')}

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
