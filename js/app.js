// SWRV Kingdom Genesis — main application logic
// Depends on all data files + enrichments.js (loaded before this).
// Bootstraps with loadChapter() at the end of the file.

// === SWRV KINGDOM BIBLE SPLASH ===
function dismissSplash(){
  const splash = document.getElementById('splashCover');
  if(!splash) return;
  splash.classList.add('dismissed');
  document.body.classList.remove('splash-active');
  setTimeout(function(){ if(splash && splash.parentNode) splash.parentNode.removeChild(splash); }, 500);
}
// Returning users skip the splash entirely — auto-dismiss immediately
(function(){
  const splash = document.getElementById('splashCover');
  if(!splash) return;
  if(localStorage.getItem('swrv_has_visited')){
    // Already visited — dismiss instantly, no ENTER button needed
    splash.style.transition='none';
    splash.style.display='none';
    document.body.classList.remove('splash-active');
    if(splash.parentNode) splash.parentNode.removeChild(splash);
  } else {
    document.body.classList.add('splash-active');
  }
})();

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
  "KJV": {term:"King James Version",body:"The 1611 English translation of the Bible commissioned by King James I of England. Public domain. Kept in this app as a comparison source tab. The primary on-screen reading text is the Berean Standard Bible (BSB) — modern, plain English, freely usable with attribution — chosen so the base text is easy to understand."},
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
  if(!window._mb_listener){
    window._mb_listener = function(ev){
      const inner = ev.target.closest && ev.target.closest('.modal-inner');
      const modal = ev.target.closest && ev.target.closest('.modal');
      if(modal && !inner){ ev.preventDefault(); }
    };
    document.addEventListener('touchmove', window._mb_listener, {passive:false});
  }
}
function _unlockBodyScroll(){
  if(!document.body.classList.contains('modal-open'))return;
  const y = parseInt(document.body.dataset.scrollY||'0',10);
  document.body.classList.remove('modal-open');
  document.body.style.top = '';
  delete document.body.dataset.scrollY;
  window.scrollTo(0, y);
}

// === BOOK-AWARE UI ===
// Updates header labels, button visibility, and other UI elements based on currentBook.
function _updateBookContext(){
  const book = window.currentBook || 'Genesis';
  // Update brand title and page title
  const bt = document.getElementById('brandTitle');
  if(bt) bt.textContent = 'Kingdom ' + book;
  document.title = 'SWRV Kingdom ' + book;
  // Header button: prehistory
  const phBtn = document.getElementById('prehistoryBtn');
  if(phBtn){
    // Different books get different button labels — and the button hides entirely for books with no primer
    const hasPrimer = (book==='Genesis' && window.PRE_HISTORY) || (book==='Exodus' && window.EXODUS_PRE_HISTORY);
    if(hasPrimer){
      phBtn.style.display = '';
      phBtn.textContent = '📜 Before '+book;
    } else {
      phBtn.style.display = 'none';
    }
  }
  // Header button: story
  const sBtn = document.getElementById('storyBtn');
  if(sBtn){
    sBtn.textContent = '📜 '+book+' Story';
  }
  // Header button: audit — full-library coverage is now global
  const aBtn = document.getElementById('auditBtn');
  if(aBtn){
    aBtn.style.display = '';
  }
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

// === PREMIUM MUSIC PLAYER ===
// Modes: 'audio' (HTML5 audio playlist) and 'embed' (iframe Spotify/YouTube/Apple Music)

// Initialize playlist with the 3 Cloudinary defaults (user can still upload their own — additive)
let _audioPlaylist = (typeof TRACKS !== 'undefined' && Array.isArray(TRACKS))
  ? TRACKS.map(t => ({ name: t.name, url: t.url, isBlob: false, isDefault: true }))
  : [];
let _audioCurrentIdx = 0;
let _audioLoopMode = 'off';  // 'off' | 'one' | 'all'
let _audioShuffle = false;

// Restore loop/shuffle state from localStorage
try {
  _audioLoopMode = localStorage.getItem('swrv_loop') || 'off';
  _audioShuffle = localStorage.getItem('swrv_shuffle') === '1';
} catch(e) {}

function setMusicTab(tab){
  const audioMode = document.getElementById('musicAudio');
  const embedMode = document.getElementById('musicEmbed');
  const audioTab = document.getElementById('musicTabAudio');
  const embedTab = document.getElementById('musicTabEmbed');
  if(tab === 'audio'){
    audioMode.style.display = '';
    embedMode.style.display = 'none';
    audioTab.classList.add('active');
    embedTab.classList.remove('active');
  } else {
    audioMode.style.display = 'none';
    embedMode.style.display = '';
    audioTab.classList.remove('active');
    embedTab.classList.add('active');
  }
}

function audioPlayerExpand(){
  document.getElementById('musicMini').classList.add('hidden');
  document.getElementById('musicFull').style.display = '';
  _renderPlaylist();
}
function audioPlayerMinimize(){
  document.getElementById('musicMini').classList.remove('hidden');
  document.getElementById('musicFull').style.display = 'none';
}
function audioPlayerClose(){
  document.getElementById('musicFull').style.display = 'none';
  document.getElementById('musicMini').classList.remove('hidden');
  // Don't actually stop audio — just collapse UI
}

function audioToggle(){
  if(!audio.src){
    if(_audioPlaylist.length > 0){
      _loadPlaylistItem(0, true);
    } else {
      audioPlayerExpand();
      return;
    }
  }
  if(audio.paused){
    const p = audio.play();
    if(p && p.catch) p.catch(()=>{});
  } else {
    audio.pause();
  }
}

function audioAddFiles(input){
  const files = Array.from(input.files || []);
  if(files.length === 0) return;
  for(const f of files){
    _audioPlaylist.push({
      name: f.name,
      url: URL.createObjectURL(f),
      isBlob: true
    });
  }
  input.value = ''; // reset so same file can be picked again
  // If nothing currently loaded, start playing the first added track
  if(!audio.src) _loadPlaylistItem(_audioPlaylist.length - files.length, true);
  _renderPlaylist();
}

function audioClearPlaylist(){
  if(!confirm('Clear the entire playlist?')) return;
  // Revoke blob URLs
  for(const item of _audioPlaylist){
    if(item.isBlob) try { URL.revokeObjectURL(item.url); } catch(e){}
  }
  _audioPlaylist = [];
  _audioCurrentIdx = 0;
  audio.pause();
  audio.removeAttribute('src');
  audio.load();
  const tn = document.getElementById('trackName');
  if(tn) tn.textContent = 'Music';
  const ftn = document.getElementById('fullTrackName');
  if(ftn) ftn.textContent = 'No track loaded — upload an audio file below.';
  _renderPlaylist();
  _updateProgress();
}

function audioRestoreDefaults(){
  // Restore the three Cloudinary defaults at the head of the playlist (additive)
  if(typeof TRACKS === 'undefined' || !Array.isArray(TRACKS)) return;
  // Remove any existing default-marked tracks to avoid duplicates
  _audioPlaylist = _audioPlaylist.filter(t => !t.isDefault);
  // Prepend defaults
  const defaults = TRACKS.map(t => ({ name: t.name, url: t.url, isBlob: false, isDefault: true }));
  _audioPlaylist = defaults.concat(_audioPlaylist);
  if(!audio.src && _audioPlaylist.length){
    _loadPlaylistItem(0, false);
  }
  _renderPlaylist();
}

function _loadPlaylistItem(idx, autoplay){
  if(idx < 0 || idx >= _audioPlaylist.length) return;
  _audioCurrentIdx = idx;
  const item = _audioPlaylist[idx];
  audio.src = item.url;
  audio.load();
  const tn = document.getElementById('trackName');
  if(tn){ tn.textContent = '♪ ' + item.name; tn.title = item.name; }
  const ftn = document.getElementById('fullTrackName');
  if(ftn) ftn.textContent = item.name;
  if(autoplay){
    audio.addEventListener('canplay', function _once(){
      audio.removeEventListener('canplay', _once);
      const p = audio.play();
      if(p && p.catch) p.catch(()=>{});
    });
  }
  _renderPlaylist();
}

function audioPrev(){
  if(_audioPlaylist.length === 0) return;
  let next;
  if(_audioShuffle){
    next = Math.floor(Math.random() * _audioPlaylist.length);
  } else {
    next = _audioCurrentIdx - 1;
    if(next < 0) next = _audioPlaylist.length - 1;
  }
  _loadPlaylistItem(next, true);
}

function audioNext(){
  if(_audioPlaylist.length === 0) return;
  let next;
  if(_audioShuffle){
    next = Math.floor(Math.random() * _audioPlaylist.length);
  } else {
    next = (_audioCurrentIdx + 1) % _audioPlaylist.length;
  }
  _loadPlaylistItem(next, true);
}

function audioRewind10(){
  if(!audio.src) return;
  audio.currentTime = Math.max(0, audio.currentTime - 10);
}
function audioForward10(){
  if(!audio.src) return;
  audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
}

function audioLoopCycle(){
  // off → one → all → off
  const next = {off:'one', one:'all', all:'off'};
  _audioLoopMode = next[_audioLoopMode] || 'off';
  try { localStorage.setItem('swrv_loop', _audioLoopMode); } catch(e) {}
  _updateLoopBtn();
}
function _updateLoopBtn(){
  const btn = document.getElementById('loopBtn');
  if(!btn) return;
  btn.classList.toggle('active', _audioLoopMode !== 'off');
  btn.textContent = _audioLoopMode === 'one' ? '🔂' : '🔁';
  btn.title = 'Loop: ' + _audioLoopMode;
}

function audioShuffleToggle(){
  _audioShuffle = !_audioShuffle;
  try { localStorage.setItem('swrv_shuffle', _audioShuffle ? '1' : '0'); } catch(e) {}
  const btn = document.getElementById('shuffleBtn');
  if(btn) btn.classList.toggle('active', _audioShuffle);
}

function audioSeek(percent){
  if(!audio.duration) return;
  audio.currentTime = (percent / 100) * audio.duration;
}

function _formatTime(t){
  if(!t || !isFinite(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return m + ':' + (s < 10 ? '0' + s : s);
}
function _updateProgress(){
  const pb = document.getElementById('progressBar');
  const ct = document.getElementById('curTime');
  const tt = document.getElementById('totalTime');
  if(pb && audio.duration){
    pb.value = (audio.currentTime / audio.duration) * 100;
  }
  if(ct) ct.textContent = _formatTime(audio.currentTime);
  if(tt) tt.textContent = _formatTime(audio.duration);
}

function _renderPlaylist(){
  const c = document.getElementById('playlistContainer');
  if(!c) return;
  if(_audioPlaylist.length === 0){
    c.innerHTML = '<div style="font-size:11px;color:var(--fg-dim);padding:8px;text-align:center;">Playlist empty. Tap "📁 Add files" to upload audio.</div>';
    return;
  }
  let h = '<div style="font-size:11px;color:var(--fg-dim);margin-bottom:4px;">'+_audioPlaylist.length+' track'+(_audioPlaylist.length===1?'':'s')+' in playlist</div>';
  for(let i = 0; i < _audioPlaylist.length; i++){
    const item = _audioPlaylist[i];
    const isActive = i === _audioCurrentIdx && audio.src;
    h += '<div class="playlist-item'+(isActive?' active':'')+'" onclick="_loadPlaylistItem('+i+',true)">';
    h += '<span style="opacity:0.6;font-size:11px;">'+(i+1)+'.</span>';
    h += '<span class="playlist-item-name">'+escapeHtml(item.name)+'</span>';
    if(isActive && !audio.paused) h += '<span style="color:var(--gold);">▶</span>';
    h += '</div>';
  }
  c.innerHTML = h;
}

// Update play button icons + progress on audio events
audio.addEventListener('play', function(){
  const pb = document.getElementById('playBtn');
  const bp = document.getElementById('bigPlayBtn');
  if(pb) pb.textContent = '⏸';
  if(bp) bp.textContent = '⏸';
  _renderPlaylist();
});
audio.addEventListener('pause', function(){
  const pb = document.getElementById('playBtn');
  const bp = document.getElementById('bigPlayBtn');
  if(pb) pb.textContent = '▶';
  if(bp) bp.textContent = '▶';
  _renderPlaylist();
});
audio.addEventListener('timeupdate', _updateProgress);
audio.addEventListener('loadedmetadata', _updateProgress);
audio.addEventListener('ended', function(){
  if(_audioLoopMode === 'one'){
    audio.currentTime = 0;
    audio.play();
    return;
  }
  if(_audioCurrentIdx >= _audioPlaylist.length - 1){
    if(_audioLoopMode === 'all'){
      _loadPlaylistItem(0, true);
    }
    // else: end of playlist, stop
    return;
  }
  audioNext();
});

// === EMBED MODE (Spotify / YouTube / Apple Music) ===
function audioLoadEmbed(){
  const inp = document.getElementById('embedUrl');
  const url = (inp.value || '').trim();
  if(!url) return;
  const embedHtml = _parseEmbedUrl(url);
  const target = document.getElementById('embedFrame');
  if(!embedHtml){
    target.innerHTML = '<div style="padding:14px;color:var(--warning);text-align:center;font-size:12px;">Could not detect Spotify/YouTube/Apple Music URL. Make sure the URL is from one of those services.</div>';
    return;
  }
  target.innerHTML = embedHtml;
  // Save URL so it reloads next session
  try { localStorage.setItem('swrv_last_embed', url); } catch(e) {}
  // Pause the local audio player if it was playing
  if(audio.src && !audio.paused) audio.pause();
}

function _parseEmbedUrl(url){
  let m;
  // === Spotify ===
  // open.spotify.com/playlist/ID, /track/ID, /album/ID, /episode/ID, /show/ID, /artist/ID
  m = url.match(/open\.spotify\.com\/(playlist|track|album|episode|show|artist)\/([A-Za-z0-9]+)/);
  if(m){
    const type = m[1], id = m[2];
    return '<iframe src="https://open.spotify.com/embed/'+type+'/'+id+'?utm_source=swrv" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write" loading="lazy"></iframe>';
  }
  // === YouTube ===
  // youtube.com/watch?v=ID  /  youtu.be/ID  /  youtube.com/playlist?list=ID  /  youtube.com/embed/ID
  m = url.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
  if(m){
    return '<iframe width="100%" height="220" src="https://www.youtube.com/embed/'+m[1]+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }
  m = url.match(/youtube\.com\/playlist\?list=([A-Za-z0-9_-]+)/);
  if(m){
    return '<iframe width="100%" height="380" src="https://www.youtube.com/embed/videoseries?list='+m[1]+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }
  m = url.match(/youtube\.com\/watch\?[^#]*v=([A-Za-z0-9_-]+)/);
  if(m){
    let listMatch = url.match(/[?&]list=([A-Za-z0-9_-]+)/);
    let src = 'https://www.youtube.com/embed/'+m[1];
    if(listMatch) src += '?list=' + listMatch[1];
    return '<iframe width="100%" height="220" src="'+src+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }
  m = url.match(/youtube\.com\/embed\/([A-Za-z0-9_-]+)/);
  if(m){
    return '<iframe width="100%" height="220" src="https://www.youtube.com/embed/'+m[1]+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }
  // === Apple Music ===
  // music.apple.com/.../album/.../id or music.apple.com/.../playlist/.../pl.xxx
  m = url.match(/music\.apple\.com\/(.+)/);
  if(m){
    return '<iframe allow="autoplay *; encrypted-media *; clipboard-write" frameborder="0" height="450" style="width:100%;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/'+m[1]+'"></iframe>';
  }
  // === SoundCloud (bonus) ===
  m = url.match(/soundcloud\.com\/(.+)/);
  if(m){
    return '<iframe width="100%" height="220" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url='+encodeURIComponent(url)+'&color=%23D4AF37&auto_play=false"></iframe>';
  }
  return null;
}

// Restore last embed URL + state on load
setTimeout(function(){
  _updateLoopBtn();
  const sb = document.getElementById('shuffleBtn');
  if(sb && _audioShuffle) sb.classList.add('active');
  try {
    const last = localStorage.getItem('swrv_last_embed');
    if(last){
      const inp = document.getElementById('embedUrl');
      if(inp) inp.value = last;
    }
  } catch(e) {}
}, 100);

const THEMES=['vintage','luxe','cyberpunk','earth','sonic'];

let themeIdx=0;
function cycleTheme(){themeIdx=(themeIdx+1)%THEMES.length;document.body.dataset.theme=THEMES[themeIdx];localStorage.setItem('swrv_theme',THEMES[themeIdx])}
const savedTheme=localStorage.getItem('swrv_theme');
if(savedTheme){themeIdx=THEMES.indexOf(savedTheme);document.body.dataset.theme=savedTheme}

let currentChapter=parseInt(localStorage.getItem('swrv_chapter'))||1;
let currentVerse=parseInt(localStorage.getItem('swrv_verse'))||1;
let mode=localStorage.getItem('swrv_mode')||'chapter';
let currentBook=localStorage.getItem('swrv_book')||'Genesis';
window.currentBook = currentBook;_updateBookContext(); // expose for enrichments
const _bookScriptLoaded={Genesis:true}; // Genesis is bundled in genesis.js
function _getCurrentBookData(){
  if(currentBook==='Genesis')return window.GENESIS;
  return (window.BIBLE&&window.BIBLE[currentBook])||null;
}
function _getBookInfo(slug){
  if(!window.BIBLE_INDEX)return null;
  return window.BIBLE_INDEX.find(function(b){return b.slug===slug;});
}

// Every book participates in the deep-study system. Genesis has the richest
// manual proof build, but every book/chapter/verse now advertises and receives
// the same universal contextual tooling.
(function _markAllBooksDeepStudy(){
  try{
    if(window.BIBLE_INDEX){
      window.BIBLE_INDEX.forEach(function(b){ b.isDeep = true; });
    }
  }catch(e){}
})();

// === SWRV DEFINITION BIBLE — supplemental semantic and regular-word layer ===
// These entries do not replace Strong's/BDB/dictionary sources. They give the
// app a source-honest bridge for regular English words and high-impact Bible
// concepts so readers are not left with a thin modern definition.
window.SWRV_TERM_SUPPLEMENTS = Object.assign({}, window.SWRV_TERM_SUPPLEMENTS || {}, {
  love:{def:'Biblical love must be read by context, not as one flat emotion. In Greek NT passages, agapē/agapaō usually stresses covenantal, self-giving love; phileō stresses affection, friendship, attachment; eros is not a common NT term but helps readers understand later discussions of desire. Hebrew love language can include covenant loyalty, affection, choice, and action.', greek:'ἀγάπη / ἀγαπάω (G26/G25), φιλέω (G5368), φίλος (G5384)', warning:'Do not assume every English “love” carries the same sense. Ask who is acting, what covenant/relationship is in view, and what the passage demands.'},
  grace:{def:'Grace is not merely a quick slogan of “unearned favor.” In the NT, charis carries gift, favor, generosity, divine enablement, and covenant kindness that produces a changed life rather than giving people a reason to boast.', greek:'χάρις (G5485)', warning:'Do not separate grace from God’s action, gift, power, and covenant purpose. Grace saves apart from boasting, then trains and empowers faithful living.'},
  kingdom:{def:'Kingdom means reign, royal authority, domain, government, inheritance, and allegiance. “Kingdom of God” language asks: whose rule is operating here, what territory/people are under that rule, and what loyalty does the King require?', greek:'βασιλεία (G932)', hebrew:'מַלְכוּת / mamlakah family', warning:'Do not reduce kingdom to “heaven after death.” In context it often means God’s active reign confronting rival powers and ordering human life.'},
  soul:{def:'Soul is not always a detachable ghost inside the body. Hebrew nephesh often means living being, life, appetite, throat, person, self. Greek psychē can mean life, person, inner life, or soul depending on context.', hebrew:'נֶפֶשׁ (nephesh)', greek:'ψυχή (G5590)', warning:'Do not force modern “mind/will/emotions” or Greek philosophical categories onto every use. Context decides.'},
  spirit:{def:'Spirit can mean breath, wind, animating life, disposition, angelic/spiritual being, or the Holy Spirit depending on context.', hebrew:'רוּחַ (ruach)', greek:'πνεῦμα (G4151)', warning:'Context must decide whether the passage means breath/wind, inner disposition, created spirit, or God’s Spirit.'},
  flesh:{def:'Flesh can mean physical body, human weakness/mortality, kinship, or fallen human orientation depending on context. Paul often uses “flesh” as a power-pattern opposed to the Spirit, not merely skin or meat.', greek:'σάρξ (G4561)', warning:'Do not read every “flesh” as the physical body being evil. The Bible’s view of the body is more careful than that.'},
  righteousness:{def:'Righteousness is right-standing and right-order according to God’s covenant standard. It can include personal integrity, justice, vindication, and covenant faithfulness.', greek:'δικαιοσύνη (G1343)', hebrew:'צֶדֶק / צְדָקָה', warning:'Do not reduce righteousness to private morality only. It is personal, relational, legal, and covenantal.'},
  justice:{def:'Justice is right judgment and covenant order in action: honest courts, protection of the vulnerable, truth, equity, and God’s standard applied publicly.', hebrew:'מִשְׁפָּט (mishpat)', warning:'Do not make justice only modern politics or only private niceness. Biblical justice is God’s order applied to people and society.'},
  holy:{def:'Holy means set apart to God, distinct, consecrated, and belonging to the realm of divine purpose. It is not merely “nice” or “religious.”', hebrew:'קָדוֹשׁ (qadosh)', greek:'ἅγιος (G40)'},
  unclean:{def:'Unclean language in Torah often refers to ritual status, boundary, mortality, impurity, and approach to holy space. It is not automatically the same thing as moral evil.', warning:'Do not flatten clean/unclean into “good people vs bad people.”'},
  covenant:{def:'Covenant is a binding relationship with legal, family, and kingdom force: oath, blood, promise, obligation, loyalty, blessing, curse, and inheritance.', hebrew:'בְּרִית (berit/brit)', warning:'Do not treat covenant as a loose religious promise.'},
  debauchery:{def:'Debauchery means abandoned excess, loss of moral restraint, sensual self-indulgence, and behavior that throws off sober order. In vice lists, it marks life governed by appetite rather than the Spirit.', greek:'often connected with ἀσέλγεια (G766) / revelry terms depending on verse', warning:'Use the verse’s original word to decide the exact sense.'},
  drunkenness:{def:'Drunkenness is intoxication that surrenders sober judgment and self-rule. In biblical vice lists it is not just “having a drink”; it is loss of disciplined, Spirit-governed life.', greek:'μέθη (G3178) and related terms'},
  harlot:{def:'Harlot/prostitute language can refer to sexual commerce, covenant betrayal, idolatry, or national unfaithfulness depending on context.', hebrew:'זֹנָה (zonah)', greek:'πόρνη (G4204)', warning:'Prophets often use this language metaphorically for covenant unfaithfulness.'},
  works:{def:'Works can mean deeds/actions, Torah observance, works as a basis for boasting, or fruit flowing from faith. Paul and James are not using every “works” phrase the same way.', greek:'ἔργον (G2041)', warning:'Ask whether the passage is talking about earning status before God or living out faithful obedience.'},
  brother:{def:'Brother can mean biological sibling, covenant kin, fellow Israelite, fellow believer, or neighbor in the faith community depending on context.', greek:'ἀδελφός (G80)', warning:'Instruction about a “brother” often concerns horizontal covenant responsibility toward another person.'}
});
window.SWRV_REGULAR_WORDS = Object.assign({}, window.SWRV_REGULAR_WORDS || {}, {
  debauchery:'Excessive indulgence, especially sensual or drunken behavior, that abandons moral restraint. Check the original Greek/Hebrew word for the exact context.',
  harlot:'Older English for prostitute; in the prophets it can also describe covenant unfaithfulness or idolatry.',
  fornication:'Older English sexual-immorality term. In Greek vice lists it often translates porneia: unlawful sexual conduct broadly, not only one modern category.',
  lasciviousness:'Older English for unrestrained sensuality, shameless conduct, or public moral looseness.',
  meek:'Strength under discipline, not weakness. Often means a person who does not seize power by violence but trusts God’s order.',
  blessed:'Favored, empowered, or declared well-positioned before God; not merely “happy.”',
  repent:'To turn, change mind/orientation, return to God’s way. Hebrew “shuv” stresses return; Greek “metanoeō” stresses transformed mind/direction.',
  gospel:'Good news/royal announcement. In the Roman world, gospel language could announce imperial victories; the NT announces Jesus as Lord and King.',
  apostle:'A sent representative/messenger with delegated authority, not merely a religious title.',
  inheritance:'Family/covenant possession passed by right, promise, or appointment. Often tied to land, kingdom, sonship, and covenant identity.'
});
(function _mergeSWRVSupplements(){
  if(!window.DEFINITIONS) window.DEFINITIONS = {};
  Object.keys(window.SWRV_TERM_SUPPLEMENTS).forEach(function(k){
    if(!window.DEFINITIONS[k]) window.DEFINITIONS[k] = window.SWRV_TERM_SUPPLEMENTS[k];
    else window.DEFINITIONS[k] = Object.assign({}, window.SWRV_TERM_SUPPLEMENTS[k], window.DEFINITIONS[k]);
  });
})();

function _getCurrentChapterVerseNums(){
  const data=_getCurrentBookData();
  const ch=data&&data[currentChapter];
  if(!ch||!ch.verses)return [];
  return Object.keys(ch.verses).map(Number).sort(function(a,b){return a-b;});
}

function populateVerseSelect(){
  if(!verseSelect)return;
  const verseNums=_getCurrentChapterVerseNums();
  verseSelect.innerHTML='';
  if(!verseNums.length){
    const opt=document.createElement('option');
    opt.value=''; opt.textContent='Verse';
    verseSelect.appendChild(opt);
    verseSelect.disabled=true;
    return;
  }
  verseSelect.disabled=false;
  if(!verseNums.includes(currentVerse)) currentVerse=verseNums[0];
  for(const vn of verseNums){
    const opt=document.createElement('option');
    opt.value=vn;
    opt.textContent='Verse '+vn;
    if(vn===currentVerse) opt.selected=true;
    verseSelect.appendChild(opt);
  }
}

function goToVerse(n){
  if(!n)return;
  currentVerse=n;
  localStorage.setItem('swrv_verse',n);
  if(typeof updateMobileNavSummary==='function') updateMobileNavSummary();
  if(mode==='verse'){
    loadChapter(currentChapter);
    return;
  }
  populateVerseSelect();
  const data=_getCurrentBookData();
  const ch=data&&data[currentChapter];
  const v=ch&&ch.verses&&ch.verses[n];
  if(!v)return;
  const refId=v.ref.replace(/[^a-z0-9]/gi,'_');
  const el=document.getElementById(refId);
  if(el){
    el.classList.add('verse-highlight');
    el.scrollIntoView({behavior:'smooth',block:'center'});
    setTimeout(function(){el.classList.remove('verse-highlight');},1800);
  }
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
const verseSelect=document.getElementById('verseSelect');

// === SWRV mobile reading controls ===
// Mobile needs maximum reading space. Keep Book/Chapter/Verse controls available,
// but collapse them into a one-line summary by default on phones. Desktop is
// unaffected — the .mobile-nav-toggle button is display:none above 680px.
function updateMobileNavSummary(){
  const summary=document.getElementById('mobileNavSummary');
  if(!summary)return;
  const info=(typeof _getBookInfo==='function')?_getBookInfo(currentBook):null;
  const bookName=(info&&info.display)||currentBook||'Genesis';
  const ch=currentChapter||1;
  const v=currentVerse||1;
  let chapterTitle='';
  const data=(typeof _getCurrentBookData==='function')?_getCurrentBookData():null;
  if(data&&data[ch]&&data[ch].title){
    chapterTitle=String(data[ch].title).replace(new RegExp('^'+bookName+'\\s+'+ch+'\\s*[—-]?\\s*','i'),'');
  }
  const shortTitle=chapterTitle ? ' — '+chapterTitle.replace(/^Ch\s*\d+\s*[—-]?\s*/i,'').slice(0,34) : '';
  summary.textContent=bookName+' '+ch+':'+v+shortTitle;
}
function setMobileNavCollapsed(collapsed){
  const bar=document.getElementById('studyNavBar');
  const btn=document.getElementById('mobileNavToggle');
  if(!bar||!btn)return;
  bar.classList.toggle('mobile-collapsed',!!collapsed);
  btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  const cue=btn.querySelector('.mobile-nav-cue');
  if(cue) cue.textContent = collapsed ? 'Controls ▾' : 'Hide ▴';
  try{localStorage.setItem('swrv_mobile_nav_collapsed', collapsed?'1':'0');}catch(e){}
  updateMobileNavSummary();
}
function toggleMobileNav(){
  const bar=document.getElementById('studyNavBar');
  if(!bar)return;
  setMobileNavCollapsed(!bar.classList.contains('mobile-collapsed'));
}
function initMobileNavState(){
  if(!window.matchMedia || !window.matchMedia('(max-width: 680px)').matches){
    updateMobileNavSummary();
    return;
  }
  let saved=null;
  try{saved=localStorage.getItem('swrv_mobile_nav_collapsed');}catch(e){}
  setMobileNavCollapsed(saved===null ? true : saved==='1');
}
window.updateMobileNavSummary=updateMobileNavSummary;
window.toggleMobileNav=toggleMobileNav;
window.setMobileNavCollapsed=setMobileNavCollapsed;

// Fully hide / unhide the entire Book / Chapter / Verse / Canonical row at any
// screen width. When hidden, a small floating "Show navigation" chip appears
// (anchored under the header) so the user can bring the row back. Persisted
// in localStorage as 'swrv_nav_hidden'.
function setNavBarHidden(hidden){
  const bar = document.getElementById('studyNavBar');
  const chip = document.getElementById('navShowChip');
  const btn = document.getElementById('navHideToggle');
  if(bar) bar.classList.toggle('nav-fully-hidden', !!hidden);
  if(chip){
    chip.classList.toggle('visible', !!hidden);
    chip.setAttribute('aria-hidden', hidden ? 'false' : 'true');
  }
  if(btn){
    btn.setAttribute('aria-pressed', hidden ? 'true' : 'false');
    btn.textContent = hidden ? '⇩ Show nav' : '⇧ Hide nav';
    btn.setAttribute('title', hidden ? 'Show the Book / Chapter / Verse / Canonical row' : 'Hide the Book / Chapter / Verse / Canonical row');
  }
  try{ localStorage.setItem('swrv_nav_hidden', hidden ? '1' : '0'); }catch(e){}
}
function toggleNavBarHidden(){
  const bar = document.getElementById('studyNavBar');
  if(!bar) return;
  setNavBarHidden(!bar.classList.contains('nav-fully-hidden'));
}
function initNavBarHiddenState(){
  let saved = null;
  try{ saved = localStorage.getItem('swrv_nav_hidden'); }catch(e){}
  setNavBarHidden(saved==='1');
}
window.setNavBarHidden = setNavBarHidden;
window.toggleNavBarHidden = toggleNavBarHidden;
// Restore the user's hide/show preference once the DOM is ready.
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', initNavBarHiddenState);
} else {
  setTimeout(initNavBarHiddenState, 0);
}

// === SWRV Reader Focus / Study Layers ===
// The study Bible has a lot of context. This toggle lets readers choose an
// uninterrupted Scripture flow or the full inline study-layer experience.
function _defaultStudyLayerMode(){
  try{
    const saved=localStorage.getItem('swrv_study_layers');
    if(saved==='read' || saved==='study') return saved;
  }catch(e){}
  // On phones, default to Read so notes don't crowd the screen. Desktop gets Study.
  const mobile = window.matchMedia && window.matchMedia('(max-width: 680px)').matches;
  return mobile ? 'read' : 'study';
}
window._studyLayerMode = _defaultStudyLayerMode();
function applyStudyLayerMode(modeName){
  window._studyLayerMode = (modeName === 'study') ? 'study' : 'read';
  try{localStorage.setItem('swrv_study_layers', window._studyLayerMode);}catch(e){}
  document.body.classList.toggle('reader-focus', window._studyLayerMode === 'read');
  document.body.classList.toggle('study-focus', window._studyLayerMode === 'study');
  const btn=document.getElementById('studyLayerToggle');
  if(btn){
    if(window._studyLayerMode === 'read'){
      btn.textContent='📖 Read';
      btn.title='Reading mode: study boxes are hidden. Tap to show inline study layers.';
      btn.setAttribute('aria-pressed','false');
    }else{
      btn.textContent='🧠 Study';
      btn.title='Study mode: inline notes and source boxes are visible. Tap for clean reading.';
      btn.setAttribute('aria-pressed','true');
    }
  }
}
function toggleStudyLayers(){
  applyStudyLayerMode(window._studyLayerMode === 'read' ? 'study' : 'read');
}
window.applyStudyLayerMode=applyStudyLayerMode;
window.toggleStudyLayers=toggleStudyLayers;

function goRandomVerse(){
  if(!window.BIBLE_INDEX)return;
  const books=window.BIBLE_INDEX;
  const book=books[Math.floor(Math.random()*books.length)];
  _loadBookScript(book.slug,function(){
    const ch=Math.floor(Math.random()*book.chapters)+1;
    currentBook=book.slug;window.currentBook=book.slug;_updateBookContext();localStorage.setItem('swrv_book',book.slug);
    if(bookSelect)bookSelect.value=book.slug;
    populateChapterSelect();
    _loadChapterCore(ch);
  });
}

// === CHRONOLOGICAL BIBLE READING ORDER (item 5) ===
// Order books per Chronological Study Bible (Thomas Nelson) approximate composition/event order.
// Job placed in patriarchal era; prophets interleaved with historical books they wrote during.
window.BIBLE_CHRONO_ORDER = [
  'Job',
  'Genesis','Exodus','Leviticus','Numbers','Deuteronomy',
  'Joshua','Judges','Ruth',
  '1Samuel','2Samuel',
  '1Kings',
  'SongofSolomon','Proverbs','Ecclesiastes',
  '2Kings',
  '1Chronicles','2Chronicles',
  'Joel','Jonah','Amos','Hosea',
  'Isaiah','Micah',
  'Nahum','Zephaniah','Habakkuk',
  'Jeremiah','Lamentations','Obadiah',
  'Ezekiel','Daniel',
  'Ezra','Haggai','Zechariah','Esther','Nehemiah','Malachi',
  'Psalms',
  'Matthew','Mark','Luke','John',
  'Acts',
  'James',
  'Galatians','1Thessalonians','2Thessalonians',
  '1Corinthians','2Corinthians','Romans',
  'Ephesians','Philippians','Colossians','Philemon',
  '1Timothy','Titus','2Timothy',
  'Hebrews','1Peter','2Peter','Jude',
  '1John','2John','3John',
  'Revelation'
];

// Persisted reading mode: 'canonical' (default) or 'chronological'
window._readingOrder = (function(){
  try { return localStorage.getItem('swrv_reading_order') || 'canonical'; } catch(e){ return 'canonical'; }
})();

function toggleReadingOrder(){
  window._readingOrder = (window._readingOrder === 'chronological') ? 'canonical' : 'chronological';
  try { localStorage.setItem('swrv_reading_order', window._readingOrder); } catch(e){}
  populateBookSelect();
  const btn = document.getElementById('readingOrderBtn');
  if(btn) btn.textContent = (window._readingOrder === 'chronological') ? '🕐 Chronological' : '📖 Canonical';
}

function populateBookSelect(){
  if(!bookSelect||!window.BIBLE_INDEX)return;
  bookSelect.innerHTML='';
  // Honor chronological reading order if toggled on
  if(window._readingOrder === 'chronological' && window.BIBLE_CHRONO_ORDER){
    const bySlug = {};
    for(const b of window.BIBLE_INDEX) bySlug[b.slug] = b;
    const grp = document.createElement('optgroup');
    grp.label = 'Chronological Order';
    bookSelect.appendChild(grp);
    for(const slug of window.BIBLE_CHRONO_ORDER){
      const b = bySlug[slug];
      if(!b) continue;
      const opt = document.createElement('option');
      opt.value = b.slug;
      opt.textContent = b.display;
      if(b.slug === currentBook) opt.selected = true;
      grp.appendChild(opt);
    }
    return;
  }
  // Canonical order (default)
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
    opt.textContent = b.display;
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
populateVerseSelect();

// Initialize chronological-order button label from saved preference (item 5)
(function(){
  const btn = document.getElementById('readingOrderBtn');
  if(btn && window._readingOrder === 'chronological'){
    btn.textContent = '🕐 Chronological';
    populateBookSelect();
  }
})();

function openVerseReference(book, chapter, verse){
  if(!book) return;
  _loadBookScript(book,function(){
    currentBook=book;
    window.currentBook=book;
    _updateBookContext();
    localStorage.setItem('swrv_book',book);
    if(bookSelect) bookSelect.value=book;
    populateChapterSelect();
    currentChapter=parseInt(chapter||1);
    currentVerse=parseInt(verse||1);
    localStorage.setItem('swrv_chapter',currentChapter);
    localStorage.setItem('swrv_verse',currentVerse);
    populateVerseSelect();
    _loadChapterCore(currentChapter);
    setTimeout(function(){
      if(currentVerse) goToVerse(currentVerse);
    },80);
  });
}

function loadBook(slug){if(!slug||slug===currentBook&&_getCurrentBookData())return;
  _loadBookScript(slug,function(){
    currentBook=slug;window.currentBook=slug;_updateBookContext();
    localStorage.setItem('swrv_book',slug);
    currentChapter=1;
    currentVerse=1;
    localStorage.setItem('swrv_chapter',1);
    localStorage.setItem('swrv_verse',1);
    populateChapterSelect();
    populateVerseSelect();
    _loadChapterCore(1);
  });
}
function prevChapter(){if(currentChapter>1){loadChapter(currentChapter-1);}else{
  // Jump to previous book's last chapter
  const idx=window.BIBLE_INDEX?window.BIBLE_INDEX.findIndex(function(b){return b.slug===currentBook;}):-1;
  if(idx>0){const prev=window.BIBLE_INDEX[idx-1];_loadBookScript(prev.slug,function(){currentBook=prev.slug;window.currentBook=prev.slug;_updateBookContext();localStorage.setItem('swrv_book',prev.slug);currentChapter=prev.chapters;currentVerse=1;localStorage.setItem('swrv_chapter',prev.chapters);localStorage.setItem('swrv_verse',1);if(bookSelect)bookSelect.value=prev.slug;populateChapterSelect();populateVerseSelect();_loadChapterCore(prev.chapters);});}
}}
function nextChapter(){
  const info=_getBookInfo(currentBook);
  const max=info?info.chapters:50;
  if(currentChapter<max){loadChapter(currentChapter+1);}else{
    const idx=window.BIBLE_INDEX?window.BIBLE_INDEX.findIndex(function(b){return b.slug===currentBook;}):-1;
    if(idx>=0&&idx<window.BIBLE_INDEX.length-1){const nxt=window.BIBLE_INDEX[idx+1];_loadBookScript(nxt.slug,function(){currentBook=nxt.slug;window.currentBook=nxt.slug;_updateBookContext();localStorage.setItem('swrv_book',nxt.slug);currentChapter=1;currentVerse=1;localStorage.setItem('swrv_chapter',1);localStorage.setItem('swrv_verse',1);if(bookSelect)bookSelect.value=nxt.slug;populateChapterSelect();populateVerseSelect();_loadChapterCore(1);});}
  }
}

function escapeHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

// Stopwords stay untagged so the reader sees helpful definitions, not noise.
const SWRV_STOP_WORDS = new Set(('a an the and or but if then than to of in on at by for from with without into unto under over as is are was were be been being have has had do does did will would shall should may might can could i you he she it we they them his her their our your my me us this that these those there here not no yes so').split(' '));

function _normalizeWordToken(token){
  return String(token||'').replace(/[.,;:!?"'`’‘“”\-—()\[\]{}]/g,'').trim();
}

function _definitionExists(word){
  if(!word||word.length<3)return false;
  if(SWRV_STOP_WORDS.has(word.toLowerCase()))return false;
  return !!(window.DEFINITIONS && (window.DEFINITIONS[word] || window.DEFINITIONS[word.toLowerCase()]));
}

function getAugmentedDefinables(v, displayText){
  const out = new Set((v.definableWords||[]).filter(Boolean));
  const text = String(displayText||'');
  // Exact word-to-definition saturation from approved in-app dictionary.
  text.split(/\s+/).forEach(function(tok){
    const cleaned=_normalizeWordToken(tok);
    if(_definitionExists(cleaned)){ out.add(cleaned); out.add(cleaned.toLowerCase()); }
  });
  // People remain clickable through the people profile layer. Places/themes are shown as chips below the verse.
  // Phrase-level terms: add source definitions whose phrase occurs in verse text.
  if(window.DEFINITIONS){
    const lower=' '+text.toLowerCase()+' ';
    Object.keys(window.DEFINITIONS).forEach(function(k){
      if(!k || k.length<4 || !/\s/.test(k) || k.length>42) return;
      if(lower.indexOf(' '+k.toLowerCase()+' ')>=0) out.add(k);
    });
  }
  return Array.from(out);
}

const SWRV_CONTEXT_RULES = [
  {id:'turn_cheek', label:'Honor / shame resistance', re:/turn.*other cheek|cheek|smite|slap/i, applies:function(v){return /Matthew 5:3[89]|Luke 6:29/.test(v.ref)||this.re.test(_verseAllText(v));}, body:'This is not a command to let evil people destroy you. In the honor/shame world, a strike could be a public insult that ranked a person beneath the striker. Jesus teaches kingdom people how to refuse retaliation without surrendering dignity or becoming like the oppressor.', avoid:'Do not reduce this to passivity. Read it inside public shame, power, and witness.', source:'Approved Library synthesis: Gospel text, Roman-era social context, Rule 10/12.'},
  {id:'prodigal', label:'Family honor and public restoration', re:/prodigal|fatted calf|far country|father.*ran|kissed him/i, applies:function(v){return /^Luke 15:/.test(v.ref)||this.re.test(_verseAllText(v));}, body:'A son who dishonored his father publicly threatened the family name and inheritance order. The father running is not only emotion; it is public protection and restoration before the village can define the son by shame.', avoid:'Do not make it only sentimental. The father absorbs shame to restore the son.', source:'Approved Library synthesis: Luke 15, ANE family/honor patterns.'},
  {id:'david_overlooked', label:'Lesser son / shepherd status', re:/David|shepherd|ruddy|anoint|Jesse|Samuel/i, applies:function(v){return /^1Samuel 16:/.test(v.ref)||this.re.test(_verseAllText(v));}, body:'In the ancient household, public attention normally fell on the older, stronger, visible sons. David being left with sheep shows how little his family expected him to matter in a royal selection scene.', avoid:'Do not read David as an obvious hero at first glance. The point is God’s sight over social ranking.', source:'Approved Library synthesis: 1 Samuel 16, kingship/family status context.'},
  {id:'grace_works', label:'Grace, works, and boasting', re:/grace|faith|works|boast|saved|salvation/i, applies:function(v){return /Ephesians 2:8|Ephesians 2:9|Romans 3:2[3-8]|Galatians 2:16|Titus 3:5|James 2:/.test(v.ref)||this.re.test(_verseAllText(v));}, body:'Biblical faith is not “earning salvation.” The New Testament distinguishes grace as God’s gift from works as the basis for boasting. Good works are fruit and witness, not the price paid to purchase rescue.', avoid:'Do not confuse obedience as fruit with works as a claim of merit.', source:'Approved Library synthesis: Pauline and apostolic text pattern.'},
  {id:'sacrifice_clean', label:'Sacrifice, holiness, and clean/unclean', re:/sacrifice|offering|altar|blood|priest|holy|unclean|clean|heifer|atonement|lamb|goat|bull/i, applies:function(v){return this.re.test(_verseAllText(v));}, body:'Sacrifice and clean/unclean categories are covenant-order language. They teach approach, boundary, life, death, impurity, and restoration—not modern superstition or mere hygiene.', avoid:'Do not flatten Levitical language into “good people vs. bad people.” It is about access, holiness, and restored order.', source:'Approved Library synthesis: Torah, priesthood, temple, Hebrews.'},
  {id:'kingdom_rule', label:'Kingdom rule and covenant authority', re:/kingdom|king|throne|rule|dominion|crown|David|Messiah|Christ|son of David/i, applies:function(v){return this.re.test(_verseAllText(v));}, body:'Kingdom language is government language: authority, rule, territory, loyalty, judgment, protection, and inheritance. The Bible is not written as modern democracy first; it often speaks in royal/covenant categories.', avoid:'Do not read kingdom language as only “going to heaven.” It means God’s reign breaking into real history.', source:'Approved Library synthesis: Kingdom Lens, covenant and kingship sources.'},
  {id:'covenant_legal', label:'Covenant / legal world', re:/covenant|oath|swear|promise|law|commandment|testimony|witness|curse|blessing|inheritance|firstborn|seed/i, applies:function(v){return this.re.test(_verseAllText(v));}, body:'Covenant language is legal-family-kingdom language. Blessing, curse, witness, oath, inheritance, and seed all belong to binding relationship and generational responsibility.', avoid:'Do not treat covenant words as loose religious poetry. They carry legal and relational force.', source:'Approved Library synthesis: Torah, prophets, covenants.'},
  {id:'god_neighbor_instruction', label:'God-facing vs neighbor-facing instruction', re:/brother|neighbor|forgive|ought|reconcile|peace|offence|trespass|command|love|one another|another/i, applies:function(v){return this.re.test(_verseAllText(v));}, body:'Some biblical commands are God-facing worship/covenant instructions; others are neighbor-facing repair instructions; many are both. When a passage names a brother, neighbor, enemy, poor person, spouse, parent, child, or community member, read it as instruction for how covenant people must handle one another under God’s rule.', avoid:'Do not assume every instruction is only about private standing with God. Many commands expose broken horizontal relationships that must be repaired in real life.', source:'Approved Library synthesis: Torah, prophets, Gospels, apostolic one-another commands.'},
  {id:'vice_lists', label:'Vice list / practices of the flesh', re:/drunkenness|debauchery|revel|revelling|witchcraft|sorcery|fornication|adultery|uncleanness|lasciviousness|envy|murder|hatred|wrath|strife|sedition|heresies/i, applies:function(v){return /Galatians 5:/.test(v.ref)||this.re.test(_verseAllText(v));}, body:'Vice lists describe practices, patterns, and powers that deform people and communities. They are not throwaway religious insults. Each term needs its own definition because English often hides the Greek range behind one quick word.', avoid:'Do not skim vice lists. Slow down and define the practice, the social damage, and the kingdom contrast.', source:'Approved Library synthesis: Greek lexicon data, Galatians 5, apostolic vice/virtue lists.'},
  {id:'body_terms', label:'Hebrew anthropology: body, breath, heart', re:/soul|spirit|flesh|heart|mind|breath|life/i, applies:function(v){return this.re.test(_verseAllText(v));}, body:'Biblical “soul,” “spirit,” “heart,” and “flesh” often function differently than modern English or Greek philosophical categories. The Bible tends to speak of embodied life before God, not a simple body-versus-soul split.', avoid:'Do not force Platonic dualism onto Hebrew/Greek texts.', source:'Approved Library synthesis: Rule 07, Hebrew/Greek word study.'},
  {id:'justice_right', label:'Justice and righteousness', re:/justice|righteous|righteousness|judgment|judge|poor|widow|orphan|stranger/i, applies:function(v){return this.re.test(_verseAllText(v));}, body:'Justice and righteousness are covenant-order words. They include right judgment, faithfulness, protection of the vulnerable, and society lined up with God’s standard.', avoid:'Do not make these terms only private morality or only politics. The biblical pattern is broader.', source:'Approved Library synthesis: Torah, prophets, wisdom, apostles.'}
];

function _verseAllText(v){
  const parts=[v.synthesized||'', v.text||'', v.ref||''];
  if(v.sources){ Object.keys(v.sources).forEach(function(k){ parts.push((v.sources[k]&&v.sources[k].text)||''); }); }
  return parts.join(' ');
}

function getAutoContextCards(v){
  return SWRV_CONTEXT_RULES.filter(function(rule){
    try{return rule.applies(v);}catch(e){return false;}
  }).slice(0,4);
}

function _getStrongLanguage(v){
  const t=(v.strongsTags&&v.strongsTags[0]&&v.strongsTags[0].sId)||'';
  return t.startsWith('G')?'Greek':(t.startsWith('H')?'Hebrew':'Original-language');
}

function renderUniversalDeepStudy(v){
  const cards=getAutoContextCards(v);
  const hasStrong=!!(v.strongsTags&&v.strongsTags.length);
  const hasDefs=!!(v.definableWords&&v.definableWords.length);
  const hasRelations=!!((v.peopleInVerse&&v.peopleInVerse.length)||(v.placesInVerse&&v.placesInVerse.length)||(v.themesInVerse&&v.themesInVerse.length));
  if(!cards.length && !hasStrong && !hasDefs && !hasRelations) return '';
  let h='<details class="universal-study-card study-layer"><summary><span>📚 Study tools</span><small>'+escapeHtml(v.ref)+' · tap to open context, definitions, original words</small></summary>';
  if(cards.length){
    h+='<div class="study-card-grid">';
    cards.forEach(function(c){
      h+='<div class="study-mini-card cultural-mini"><div class="mini-card-label">🌍 Cultural / Historical Context</div><h4>'+escapeHtml(c.label)+'</h4><p>'+escapeHtml(c.body)+'</p><div class="misunderstand"><b>⚠ Common mistake:</b> '+escapeHtml(c.avoid)+'</div><div class="source-trace">Source trace: '+escapeHtml(c.source)+'</div></div>';
    });
    h+='</div>';
  }
  if(hasStrong){
    h+='<div class="study-mini-card original-mini"><div class="mini-card-label">📔 Original Word Layer</div><p>'+v.strongsTags.length+' '+_getStrongLanguage(v)+' root'+(v.strongsTags.length===1?'':'s')+' are already attached to this verse. Tap the root chips under the verse to open Strong\'s / BDB / lexicon data where available.</p></div>';
  }
  if(hasDefs){
    h+='<div class="study-mini-card definition-mini"><div class="mini-card-label">🔎 Definitions Available</div><p>'+v.definableWords.length+' English term'+(v.definableWords.length===1?'':'s')+' are tagged here. Underlined words open source-connected definition cards.</p></div>';
  }
  if(hasRelations){
    h+='<div class="study-mini-card relation-mini"><div class="mini-card-label">🧭 People / Places / Themes</div><p>This verse is connected to the app’s relationship map so readers can follow names, locations, and repeated biblical themes across the larger story.</p></div>';
  }
  h+='</details>';
  return h;
}

function renderChapterDeepStudyBanner(ch, verseNums){
  // The whole app is now a deep-study Bible, so we no longer burn reader
  // real estate announcing that on every chapter. Deep tools remain available
  // as collapsible verse/source panels where they actually help the reading.
  return '';
}

function _isUsefulDefinitionToken(cleaned){
  if(!cleaned) return false;
  const w=cleaned.toLowerCase();
  if(w.length<4) return false;
  if(/^(that|this|with|from|unto|into|they|them|their|there|were|have|shall|will|upon|also|then|than|when|what|which|would|could|should|your|ours|hers|does|done|been|being)$/i.test(w)) return false;
  return true;
}

function _hasAnyDefinition(cleaned){
  if(!cleaned) return false;
  const key=cleaned.toLowerCase();
  return _definitionExists(cleaned) ||
    (window.GLOSSARY && (window.GLOSSARY[cleaned]||window.GLOSSARY[key]||window.GLOSSARY[cleaned.toUpperCase()])) ||
    (window.SWRV_REGULAR_WORDS && window.SWRV_REGULAR_WORDS[key]) ||
    (window.SWRV_TERM_SUPPLEMENTS && window.SWRV_TERM_SUPPLEMENTS[key]);
}

// Per-verse strongsTags lookup. Populated lazily by renderVerse so the click
// handler can pass the verse-specific tags into showDef for context-sense
// disambiguation (e.g., "love" in 1 Cor 13 vs John 21 picks different Greek words).
window.__verseStrongs = window.__verseStrongs || {};

// === SWRV Person / Appearance Context Utilities ===
// Purpose: when a biblical figure is mentioned, the reader can tap the name
// and immediately see tribe/family/geography/appearance/culture/religion context.
// Source-honest: where the exact appearance is not directly stated, the card uses
// "regional context suggests / source data limited" language instead of guessing.
function _normNameKey(s){
  return String(s||'').replace(/[_-]+/g,' ').replace(/\s+/g,' ').trim();
}
function _escapeRegex(s){
  return String(s||'').replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
}
function _getKnownPersonKeys(){
  const keys = new Set();
  if(window.PEOPLES){
    Object.keys(window.PEOPLES).forEach(function(k){
      if(k && k.length>1) keys.add(k);
      const p=window.PEOPLES[k];
      if(p && p.altName){
        String(p.altName).split(/[,;\/·]/).map(x=>x.trim()).filter(Boolean).forEach(x=>{ if(x.length>1) keys.add(x); });
      }
    });
  }
  if(window.PERSON_CONTEXT){
    Object.keys(window.PERSON_CONTEXT).forEach(function(k){ if(k && k.length>1) keys.add(k); });
  }
  // Core names that often appear before a richer PEOPLES card was manually tagged.
  ['Adam','Eve','Cain','Abel','Seth','Enoch','Noah','Abraham','Abram','Sarah','Sarai','Hagar','Ishmael','Isaac','Rebekah','Jacob','Israel','Esau','Joseph','Judah','Moses','Aaron','Miriam','Joshua','Rahab','Ruth','Boaz','Samuel','Saul','David','Solomon','Elijah','Elisha','Isaiah','Jeremiah','Ezekiel','Daniel','Nebuchadnezzar','Esther','Mordecai','Mary','Joseph','John','Jesus','Peter','Paul','Stephen','Matthew','Mark','Luke','Caesar','Herod','Pharaoh','Goliath'].forEach(k=>keys.add(k));
  return Array.from(keys).sort(function(a,b){return b.length-a.length;});
}
function detectPeopleInText(text, already){
  const found = new Set(already||[]);
  const t = ' '+String(text||'')+' ';
  _getKnownPersonKeys().forEach(function(name){
    // avoid tiny ambiguous tokens unless they were explicitly known already
    if(String(name).length<3) return;
    const re = new RegExp('(^|[^A-Za-z])'+_escapeRegex(name)+'([^A-Za-z]|$)','i');
    if(re.test(t)) found.add(name);
  });
  return Array.from(found).slice(0,8);
}
function _hasPersonContext(name){
  return !!((window.PEOPLES && (window.PEOPLES[name] || window.PEOPLES[name+'_NT'])) || (window.PERSON_CONTEXT && (window.PERSON_CONTEXT[name] || window.PERSON_CONTEXT[name.replace(/_NT$/,'')])));
}
function renderPersonContextStrip(v, text){
  const people = detectPeopleInText(text, v.peopleInVerse||[]).filter(_hasPersonContext);
  if(!people.length) return '';
  const chips = people.map(function(name){
    const safe = String(name).replace(/'/g,"\\'");
    return '<button class="context-chip person-context-chip" onclick="showPerson(\''+safe+'\')" title="Open appearance, tribe, family, culture, belief, and source context">👤 '+escapeHtml(_normNameKey(name).replace(/ NT$/,''))+'</button>';
  }).join('');
  return '<details class="verse-context-strip person-context-strip study-layer"><summary>👥 People / appearance context <small>'+people.length+' figure'+(people.length===1?'':'s')+'</small></summary><div class="context-chip-row">'+chips+'</div><div class="source-trace compact-source-trace">Information shown here is sourced. Where exact details are not recorded in historical texts, the card notes that.</div></details>';
}

function renderVerseText(text,definables,peopleNames,verseRef){
  const wordSet=new Set(definables||[]);
  const lowerSet=new Set((definables||[]).map(w=>String(w).toLowerCase()));
  const detectedPeople = detectPeopleInText(text, peopleNames||[]);
  const peopleSet=new Set(detectedPeople);
  const refEsc = verseRef ? String(verseRef).replace(/'/g,"\\'") : '';
  return text.split(/(\s+)/).map(token=>{
    if(!token.trim())return token;
    const cleaned=token.replace(/[.,;:!?\"'`‘’“”—()\[\]]/g,'');
    if(peopleSet.has(cleaned)){
      return '<span class="person-name" onclick="showPerson(\''+cleaned+'\')">'+escapeHtml(token)+'</span>';
    }
    const cleanLower=cleaned.toLowerCase();
    const isDefinable=wordSet.has(cleaned)||lowerSet.has(cleanLower)||(_isUsefulDefinitionToken(cleaned)&&_hasAnyDefinition(cleaned));
    if(isDefinable){
      const defKey=wordSet.has(cleaned)?cleaned:cleanLower;
      const onclick = refEsc
        ? "showDef('"+defKey.replace(/'/g,"\\'")+"','"+refEsc+"')"
        : "showDef('"+defKey.replace(/'/g,"\\'")+"')";
      return '<span class="definable" onclick="'+onclick+'">'+escapeHtml(token)+'</span>';
    }
    return escapeHtml(token);
  }).join('');
}

function getAmpStyleNote(v){
  if(!v || !v.ref) return null;
  const m=v.ref.match(/^(.+)\s+(\d+):(\d+)$/);
  if(!m) return null;
  const book=m[1].replace(/\s+/g,'');
  const key=m[2]+':'+m[3];
  const pools=[];
  if(book==='Genesis' && window.AMP_STYLE) pools.push(window.AMP_STYLE);
  if(book==='Exodus'){
    ['EXODUS_AMP_STYLE','EXODUS34_AMP_STYLE','EXODUS57_AMP_STYLE','EXODUS812_AMP_STYLE','EXODUS1315_AMP_STYLE','EXODUS1618_AMP_STYLE','EXODUS1924_AMP_STYLE','EXODUS2540_AMP_STYLE'].forEach(function(n){ if(window[n]) pools.push(window[n]); });
  }
  if(book==='Leviticus' && window.LEVITICUS_AMP_STYLE) pools.push(window.LEVITICUS_AMP_STYLE);
  for(const pool of pools){ if(pool && pool[key]) return pool[key]; }
  return null;
}

function renderVerse(v){
  const verseHtml=[];
  const refId=v.ref.replace(/[^a-z0-9]/gi,'_');
  verseHtml.push('<div class="verse" id="'+refId+'">');
  const vNum=v.ref.match(/:(\d+)$/)[1];
  verseHtml.push('<span class="verse-num">'+vNum+'</span>');
  // Support both rich Genesis data (v.synthesized) and plain Bible data (v.text).
  // BSB is the locked primary reading text: prefer it wherever a BSB source exists
  // (Genesis carried KJV-style wording in `synthesized`; BSB lived only in sources).
  // KJV stays available as a comparison source tab below.
  const displayText = (v.sources && v.sources.BSB && v.sources.BSB.text) || v.synthesized || v.text || '';
  const augmentedDefinables = getAugmentedDefinables(v, displayText);
  if(v.ref && v.strongsTags) window.__verseStrongs[v.ref] = v.strongsTags;
  const rlClass = (window.RED_LETTERS_SET && window.RED_LETTERS_SET.has(v.ref)) ? ' red-letter' : '';
  verseHtml.push('<span class="verse-text'+rlClass+'">'+renderVerseText(displayText,augmentedDefinables,v.peopleInVerse||[],v.ref)+'</span>');
  // Compact per-verse Study chip — visible in Read & Study modes; opens the unified Study Sheet.
  verseHtml.push('<button class="verse-study-chip" onclick="openStudySheet(\''+v.ref.replace(/\'/g,"\\\\'")+'\')" title="Open study panel for '+escapeHtml(v.ref)+'">📖 Study</button>');
  const _bRefId=v.ref.replace(/[^a-z0-9]/gi,'_');
  const _bERef=v.ref.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
  const _bEText=displayText.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,' ').substring(0,150);
  verseHtml.push('<button class="verse-study-chip verse-bm-chip" id="bm_'+_bRefId+'" onclick="toggleBookmark(\''+_bERef+'\',\''+_bEText+'\')" title="Bookmark this verse">🔖</button>');
  verseHtml.push('<button class="verse-study-chip verse-note-chip" id="note_'+_bRefId+'" onclick="openNote(\''+_bERef+'\')" title="Add a note">📝 Note</button>');

  if(v.numberingNote)verseHtml.push('<div class="numbering-note">📖 '+escapeHtml(v.numberingNote)+'</div>');
  const sourceKeys=v.sources?Object.keys(v.sources):[];
  if(sourceKeys.length>0){
    verseHtml.push('<div class="sources study-layer">');
    for(const key of sourceKeys){
      const meta=window.SOURCES[key];
      if(!meta)continue;
      const cls=key==='AMPLIFIED'?'amp':'';
      // Pull the category badge for this source (if SOURCE_CATEGORIES loaded)
      let catBadge = '';
      if(meta.category && window.SOURCE_CATEGORIES){
        const cat = Object.values(window.SOURCE_CATEGORIES).find(c => c.code === meta.category);
        if(cat) catBadge = '<span class="src-cat-badge" title="'+escapeHtml(cat.label)+' — '+escapeHtml(cat.description)+'">'+cat.badge+'</span>';
      }
      verseHtml.push('<button class="source-tab '+cls+'" data-src="'+key+'" data-ref="'+refId+'" onclick="toggleSource(this)" title="'+escapeHtml(meta.name||key)+' ('+escapeHtml(meta.license||'')+')">'+catBadge+meta.short+'</button>');
    }
    verseHtml.push('</div>');
    for(const key of sourceKeys){
      if(key==='TANAKH')continue;
      const text=v.sources[key].text;
      let cls='';
      if(key==='AMPLIFIED')cls='amp';
      else if(key==='LXX_GREEK')cls='greek';
      else if(key==='HEBREW')cls='hebrew';
      verseHtml.push('<div class="source-content study-layer '+cls+'" data-src="'+key+'-'+refId+'" style="display:none;">'+escapeHtml(text)+'</div>');
    }
  }
  // Compact people/appearance/culture context chips — collapsed by default to protect reading flow.
  verseHtml.push(renderPersonContextStrip(v, displayText));

  // AMP-style expansion cards from the approved project data when available.
  const ampNote = getAmpStyleNote(v);
  if(ampNote){
    verseHtml.push('<details class="amp-nuance-panel study-layer"><summary>🟣 Amplified / expansion note <small>'+escapeHtml(v.ref)+'</small></summary><div class="amp-note-text">'+escapeHtml(ampNote.text||'')+'</div>'+(ampNote.audit?'<div class="source-trace">Source trace: '+escapeHtml(ampNote.audit)+'</div>':'')+'</details>');
  }

  // SWRV Strong's-tagged original-language words — every Hebrew/Greek word in the verse
  if(v.strongsTags && v.strongsTags.length){
    const wordsHtml = [];
    for(const t of v.strongsTags){
      // Clean Hebrew word — remove cantillation/maqqef for cleaner display
      const cleanW = (t.w||'').replace(/[\u0591-\u05BD\u05BF-\u05C7]/g,'');
      const isGreek = t.sId && t.sId.startsWith('G');
      const lex = isGreek ? (window.STRONGS_GRK && window.STRONGS_GRK[String(t.sId).replace(/^G/, '')]) : (window.STRONGS_HEB && window.STRONGS_HEB[t.sId]);
      const gloss = lex ? (lex.kjv_def || lex.def || lex.strongs_def || lex.gloss || '') : '';
      wordsHtml.push('<button class="strongs-word-btn" onclick="showStrongs(\''+t.sId+'\')" title="'+t.sId+' — '+escapeHtml(gloss||'tap for lexicon entry')+'">'+
        '<span class="root-original" style="direction:'+(isGreek?'ltr':'rtl')+';">'+escapeHtml(cleanW||t.sId)+'</span>'+ 
        '<span class="root-id">'+t.sId+'</span>'+ 
        (gloss?'<span class="root-gloss">'+escapeHtml(String(gloss).split(/[;,]/)[0]).slice(0,42)+'</span>':'')+'</button>');
    }
    verseHtml.push('<details class="strongs-roots-panel study-layer"><summary style="cursor:pointer;font-size:11px;color:var(--gold);padding:4px 0;font-weight:600;">📔 '+v.strongsTags.length+' '+(v.strongsTags[0].sId.startsWith('G')?'Greek':'Hebrew')+' root'+(v.strongsTags.length===1?'':'s')+' in this verse — tap to explore</summary><div class="strongs-roots-words" style="margin-top:6px;padding:8px;background:var(--bg-3);border-radius:6px;display:flex;flex-wrap:wrap;gap:4px;">'+wordsHtml.join('')+'</div></details>');
  }
  if(v.kingdomLens){
    verseHtml.push('<details class="collapsible-section kingdom-lens study-layer">');
    verseHtml.push('<summary><span class="kingdom-lens-label">⚜ KINGDOM LENS</span></summary>');
    verseHtml.push('<div class="kingdom-lens-text">'+escapeHtml(v.kingdomLens)+'</div>');
    verseHtml.push('</details>');
  }
  if(v.cultural){
    verseHtml.push('<details class="collapsible-section cultural-panel study-layer">');
    verseHtml.push('<summary><span class="cultural-label">🌍 CULTURAL CONTEXT</span> <span class="collapsible-cue">'+escapeHtml(v.cultural.title||'')+'</span></summary>');
    verseHtml.push('<div class="cultural-title">'+escapeHtml(v.cultural.title)+'</div>');
    verseHtml.push('<div class="cultural-detail">'+escapeHtml(v.cultural.detail)+'</div>');
    if(v.cultural.sources)verseHtml.push('<div class="cultural-source">Sources: '+escapeHtml(v.cultural.sources)+'</div>');
    verseHtml.push('</details>');
  }
  if(v.variants&&v.variants.length>0){
    for(const variant of v.variants){
      verseHtml.push('<details class="collapsible-section translation-flag study-layer">');
      verseHtml.push('<summary><span class="flag-label">⚠ TRANSLATION LOSS</span> <span class="collapsible-cue">'+escapeHtml(variant.label||'')+'</span></summary>');
      verseHtml.push('<div class="flag-title">'+escapeHtml(variant.label)+'</div>');
      verseHtml.push('<div class="flag-note">'+escapeHtml(variant.note)+'</div>');
      verseHtml.push('</details>');
    }
  }
  const xrefId=refId+'_xref';
  if(v.enochRef||v.josephusRef){
    verseHtml.push('<div class="crossrefs study-layer">');
    if(v.enochRef)verseHtml.push('<button class="xref-pill" onclick="toggleXref(\''+xrefId+'_enoch\')">📖 1 Enoch</button>');
    if(v.josephusRef)verseHtml.push('<button class="xref-pill josephus" onclick="toggleXref(\''+xrefId+'_jos\')">📜 Josephus</button>');
    verseHtml.push('</div>');
    if(v.enochRef)verseHtml.push('<div class="xref-content study-layer" id="'+xrefId+'_enoch"><b>1 Enoch:</b> '+escapeHtml(v.enochRef)+'</div>');
    if(v.josephusRef)verseHtml.push('<div class="xref-content josephus study-layer" id="'+xrefId+'_jos"><b>Josephus, Antiquities:</b> '+escapeHtml(v.josephusRef)+'</div>');
  }
  // SWRV — Places + themes chips (additive, below cross-refs)
  if((v.placesInVerse&&v.placesInVerse.length)||(v.themesInVerse&&v.themesInVerse.length)){
    verseHtml.push('<div class="inline-relation-chips study-layer" style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px;align-items:center;font-size:11px;">');
    // Thread commentary chips — always visible (not study-layer only)
    const threadChipsHtml = renderThreadChips(v.ref, (v.sources&&v.sources.BSB&&v.sources.BSB.text)||v.synthesized||v.text||'');
    if(threadChipsHtml) verseHtml.push('</div>'+threadChipsHtml+'<div style="display:none">');
    if(v.placesInVerse&&v.placesInVerse.length){
      for(const place of v.placesInVerse){
        const escaped=place.replace(/'/g,"\\'");
        verseHtml.push('<button class="icon-btn" style="font-size:10px;padding:2px 8px;background:rgba(155,82,53,0.12);border:1px solid #9b5235;color:#9b5235;" onclick="showPlace(\''+escaped+'\')" title="View place card">📍 '+escapeHtml(place)+'</button>');
      }
    }
    if(v.themesInVerse&&v.themesInVerse.length){
      for(const themeKey of v.themesInVerse){
        const t=window.THEMES&&window.THEMES[themeKey];
        if(!t) continue;
        verseHtml.push('<button class="icon-btn" style="font-size:10px;padding:2px 8px;background:rgba(124,45,18,0.10);border:1px solid var(--line);color:var(--fg-dim);" onclick="showTheme(\''+themeKey+'\')" title="'+escapeHtml(t.description.slice(0,80))+'...">🏷️ '+escapeHtml(t.label)+'</button>');
      }
    }
    verseHtml.push('</div>');
  }
  verseHtml.push(renderUniversalDeepStudy(v));
  verseHtml.push('</div>');
  // Genesis 1-4 enrichments (Pre-history, plot panels, heartbeat, culture deep)
  if(currentBook==='Genesis'){
    try{
      const vnum=parseInt(v.ref.match(/:(\d+)$/)[1]);
      const ch=parseInt(v.ref.match(/^Genesis (\d+)/i)[1]||v.ref.match(/^Gen (\d+)/i)[1]||0);
      if(ch>=1&&ch<=4){
        const enrichments=renderGen14Enrichments(ch,vnum);
        if(enrichments)return verseHtml.join('')+enrichments;
      }
    }catch(e){console.warn('Gen 1-4 enrichment error:',e);}
  }
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

function reloadCurrentChapter(){
  var btn=document.getElementById('reloadChapterBtn');
  if(btn){btn.classList.add('spinning');setTimeout(function(){btn.classList.remove('spinning');},600);}
  var targetCh=currentChapter, targetBook=currentBook;
  // Clear the cached loaded flag so _loadBookScript re-executes the script fresh
  delete _bookScriptLoaded[targetBook];
  if(window.BIBLE) delete window.BIBLE[targetBook];
  // Silent jolt: go to adjacent chapter to kick the data load, then snap back
  var joltCh=targetCh>1?targetCh-1:targetCh+1;
  _loadChapterCore(joltCh);
  setTimeout(function(){
    _loadBookScript(targetBook,function(){
      currentChapter=targetCh;
      _loadChapterCore(targetCh);
    });
  },80);
}

// Auto-retry: if mainContent has no verses 1.5s after a chapter load, silently reload
var _autoRetryTimer=null,_autoRetryCount=0;
function _scheduleAutoRetry(){
  clearTimeout(_autoRetryTimer);
  _autoRetryCount=0;
  _autoRetryTimer=setTimeout(function _retry(){
    var main=document.getElementById('mainContent');
    if(!main) return;
    var hasContent=main.querySelector('.verse')||main.querySelector('.chapter-title');
    if(!hasContent&&_autoRetryCount<3){
      _autoRetryCount++;
      reloadCurrentChapter();
      _autoRetryTimer=setTimeout(_retry,1500);
    }
  },1500);
}
function _loadChapterCore(n){
  const sel=document.getElementById('chapterSelect');if(sel)sel.value=n;
  currentChapter=n;window.currentChapter=n;window.currentVerse=currentVerse;localStorage.setItem('swrv_chapter',n);
  const bookData=_getCurrentBookData();
  const tempCh=bookData&&bookData[n];
  if(tempCh&&tempCh.verses){
    const nums=Object.keys(tempCh.verses).map(Number).sort(function(a,b){return a-b;});
    if(!nums.includes(currentVerse)) currentVerse=nums[0]||1;
  }
  populateVerseSelect();
  if(typeof updateMobileNavSummary==='function') updateMobileNavSummary();
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
    const html=['<h1 class="chapter-title">'+escapeHtml(ch.title)+'<button class="tts-listen-btn" onclick="ttsPlayChapter()" title="Listen to this chapter aloud">🔊 Listen</button></h1>'];
    if(window._renderChapterIntro){ html.push(window._renderChapterIntro(currentBook, currentChapter)); }
    html.push(renderChapterDeepStudyBanner(ch, verseNums));
    for(const v of verseNums)html.push(renderVerse(ch.verses[v]));
    html.push(renderCompanionPassages(currentBook, currentChapter));
    html.push(renderChronologicalEvents(currentBook, currentChapter));
    html.push(renderParallelPassages(currentBook, currentChapter));
    html.push(renderProphecyLinks(currentBook, currentChapter));
    main.innerHTML=html.join('');
  }else{
    if(!verseNums.includes(currentVerse))currentVerse=verseNums[0]||1;
    renderVerseMode(ch,verseNums);
  }
  window.scrollTo(0,0);
  setTimeout(_applyUserAnnotations,0);
  _scheduleAutoRetry();
}

function renderVerseMode(ch,verseNums){
  const main=document.getElementById('mainContent');
  const idx=verseNums.indexOf(currentVerse);
  const v=ch.verses[currentVerse];
  if(!v){main.innerHTML='<p>Verse not found.</p>';return}
  const html=[];
  html.push('<h1 class="chapter-title">'+escapeHtml(ch.title)+'</h1>');
  html.push(renderChapterDeepStudyBanner(ch, verseNums));
  html.push('<div class="verse-jump"><select onchange="jumpToVerse(parseInt(this.value))">');
  for(const vn of verseNums){const sel=vn===currentVerse?' selected':'';html.push('<option value="'+vn+'"'+sel+'>Verse '+vn+'</option>')}
  html.push('</select></div>');
  html.push('<div class="verse-mode-controls">');
  html.push('<button class="nav-btn" onclick="prevVerse()" '+(idx===0&&currentChapter===1?'disabled':'')+'>← Prev</button>');
  const _bookMaxCh=(function(){const _bi=window.BIBLE_INDEX&&window.BIBLE_INDEX.find(function(b){return b.slug===currentBook;});return _bi?_bi.chapters:50;})();
  html.push('<div class="verse-counter"><span class="verse-counter-num">'+currentChapter+':'+currentVerse+'</span><span class="verse-counter-meta">Verse '+(idx+1)+' of '+verseNums.length+' · Chapter '+currentChapter+' of '+_bookMaxCh+'</span></div>');
  html.push('<button class="nav-btn" onclick="nextVerse()" '+(idx===verseNums.length-1&&currentChapter===_bookMaxCh?'disabled':'')+'>Next →</button>');
  html.push('</div>');
  html.push(renderVerse(v));
  html.push(renderCompanionPassages(currentBook, currentChapter));
  html.push(renderChronologicalEvents(currentBook, currentChapter));
  html.push(renderParallelPassages(currentBook, currentChapter));
  html.push(renderProphecyLinks(currentBook, currentChapter));
  html.push('<div class="verse-mode-controls" style="margin-top:30px;">');
  html.push('<button class="nav-btn" onclick="prevVerse()" '+(idx===0&&currentChapter===1?'disabled':'')+'>← Prev</button>');
  html.push('<div class="verse-counter"><span class="verse-counter-num">'+currentChapter+':'+currentVerse+'</span></div>');
  html.push('<button class="nav-btn" onclick="nextVerse()" '+(idx===verseNums.length-1&&currentChapter===_bookMaxCh?'disabled':'')+'>Next →</button>');
  html.push('</div>');
  main.innerHTML=html.join('');
}

function prevVerse(){
  const _bd=_getCurrentBookData();
  const ch=_bd&&_bd[currentChapter];
  if(!ch)return;
  const verseNums=Object.keys(ch.verses).map(Number).sort((a,b)=>a-b);
  const idx=verseNums.indexOf(currentVerse);
  if(idx>0){currentVerse=verseNums[idx-1]}
  else if(currentChapter>1){
    currentChapter--;
    const prevCh=_bd&&_bd[currentChapter];
    if(prevCh){const prevVerseNums=Object.keys(prevCh.verses).map(Number).sort((a,b)=>a-b);currentVerse=prevVerseNums[prevVerseNums.length-1];}
    localStorage.setItem('swrv_chapter',currentChapter);
  }
  localStorage.setItem('swrv_verse',currentVerse);populateVerseSelect();loadChapter(currentChapter);
}

function nextVerse(){
  const _bd=_getCurrentBookData();
  const _bi=window.BIBLE_INDEX&&window.BIBLE_INDEX.find(function(b){return b.slug===currentBook;});
  const _maxCh=_bi?_bi.chapters:50;
  const ch=_bd&&_bd[currentChapter];
  if(!ch)return;
  const verseNums=Object.keys(ch.verses).map(Number).sort((a,b)=>a-b);
  const idx=verseNums.indexOf(currentVerse);
  if(idx<verseNums.length-1){currentVerse=verseNums[idx+1]}
  else if(currentChapter<_maxCh){
    currentChapter++;
    const nextCh=_bd&&_bd[currentChapter];
    if(nextCh){const nextVerseNums=Object.keys(nextCh.verses).map(Number).sort((a,b)=>a-b);currentVerse=nextVerseNums[0];}
    localStorage.setItem('swrv_chapter',currentChapter);
  }
  localStorage.setItem('swrv_verse',currentVerse);populateVerseSelect();loadChapter(currentChapter);
}

function jumpToVerse(n){currentVerse=n;localStorage.setItem('swrv_verse',n);populateVerseSelect();loadChapter(currentChapter)}

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

function _findLexiconMatchesForEnglish(word, limit){
  const w=String(word||'').toLowerCase();
  const hits=[];
  function add(kind,id,e,score){ hits.push({kind:kind,id:id,e:e,score:score}); }
  if(w.length<3) return hits;
  if(window.STRONGS_GRK){
    Object.keys(window.STRONGS_GRK).forEach(function(num){
      const e=window.STRONGS_GRK[num]; if(!e) return;
      const blob=((e.def||'')+' '+(e.kjv_def||'')+' '+(e.derivation||'')).toLowerCase();
      if(blob.indexOf(w)>=0) add('Greek','G'+num,e,(e.kjv_def||'').toLowerCase().split(/,|;|\s+/).includes(w)?90:45);
    });
  }
  if(window.STRONGS_HEB){
    Object.keys(window.STRONGS_HEB).forEach(function(id){
      const e=window.STRONGS_HEB[id]; if(!e) return;
      const blob=((e.strongs_def||e.def||'')+' '+(e.kjv_def||'')+' '+(e.xlit||'')+' '+(e.pron||'')).toLowerCase();
      if(blob.indexOf(w)>=0) add('Hebrew',id,e,(e.kjv_def||'').toLowerCase().split(/,|;|\s+/).includes(w)?80:35);
    });
  }
  hits.sort(function(a,b){return b.score-a.score;});
  return hits.slice(0,limit||8);
}

function showAutoTermCard(word){
  _lockBodyScroll();
  const popup=document.getElementById('defPopup');
  popup.classList.remove('people','strongs');
  const key=String(word||'').trim();
  const lower=key.toLowerCase();
  const gloss=(window.GLOSSARY && (window.GLOSSARY[key]||window.GLOSSARY[key.toUpperCase()]||window.GLOSSARY[lower])) || null;
  const reg=window.SWRV_REGULAR_WORDS && window.SWRV_REGULAR_WORDS[lower];
  const sup=window.SWRV_TERM_SUPPLEMENTS && window.SWRV_TERM_SUPPLEMENTS[lower];
  const lex=_findLexiconMatchesForEnglish(lower,8);
  let html=[];
  html.push('<div class="def-word">'+escapeHtml(key)+'</div>');
  if(sup){
    html.push('<div class="def-section kingdom-section"><div class="def-section-label">What it means in context</div><div class="def-section-text">'+escapeHtml(sup.def||'')+'</div></div>');
    if(sup.hebrew) html.push('<div class="def-section"><div class="def-section-label">Hebrew original</div><div class="def-section-text">'+escapeHtml(sup.hebrew)+'</div></div>');
    if(sup.greek) html.push('<div class="def-section"><div class="def-section-label">Greek original</div><div class="def-section-text">'+escapeHtml(sup.greek)+'</div></div>');
    if(sup.warning) html.push('<div class="def-section warning-section"><div class="def-section-label">⚠ Common mistake</div><div class="def-section-text">'+escapeHtml(sup.warning)+'</div></div>');
  }
  if(reg){ html.push('<div class="def-section"><div class="def-section-label">Familiar English</div><div class="def-section-text">'+escapeHtml(reg)+'</div></div>'); }
  if(gloss){ html.push('<div class="def-section"><div class="def-section-label">Study term</div><div class="def-section-text">'+escapeHtml(gloss.body||gloss.term||'')+'</div></div>'); }
  if(lex.length){
    html.push('<div class="def-section strongs-section"><div class="def-section-label">Original language connections</div>');
    lex.forEach(function(hit){
      const e=hit.e||{};
      const label=hit.kind==='Greek'?(e.grk||hit.id):(e.lemma||hit.id);
      const def=e.def||e.strongs_def||e.kjv_def||'';
      html.push('<button class="lex-link-row" onclick="showStrongs(\''+hit.id+'\')"><b>'+escapeHtml(hit.id)+' '+escapeHtml(label)+'</b><span>'+escapeHtml(def).slice(0,170)+'</span></button>');
    });
    html.push('</div>');
  }
  if(!sup && !reg && !gloss && !lex.length){
    html.push('<div class="def-section warning-section"><div class="def-section-label">Still finding sources for this</div><div class="def-section-text">This word is readable English, but no project source has a dedicated card for it yet. It has been flagged for the next dictionary/source expansion pass instead of pretending.</div></div>');
  }
  html.push('<div class="def-section"><div class="def-section-label">A note on sources</div><div class="def-section-text">This app may explain and connect sources, but it must not invent doctrine. Use the lexicon/source rows where available and the verse context to decide meaning.</div></div>');
  document.getElementById('defContent').innerHTML=html.join('');
  popup.classList.add('show');
  document.getElementById('defOverlay').classList.add('show');
}

// Pull the deep English Bible-Word Dictionary entry for a given word, if present.
// Falls back gracefully when not found. Used by showDef to enrich the popup.
function _lookupEnglishBibleDict(word){
  if(!window.ENGLISH_BIBLE_DICT) return null;
  return window.ENGLISH_BIBLE_DICT[word] || window.ENGLISH_BIBLE_DICT[(word||'').toLowerCase()] || null;
}
// Find a context-sense entry matching the verse's strongsTags if any.
function _contextSenseFor(word, opts){
  if(!window.CONTEXT_SENSE) return null;
  const root = window.CONTEXT_SENSE[word] || window.CONTEXT_SENSE[(word||'').toLowerCase()];
  if(!root) return null;
  const tags = (opts && opts.strongsTags) || [];
  for(const t of tags){
    const sId = (t && t.sId) || t;
    if(sId && root.byStrongs && root.byStrongs[sId]) return Object.assign({pickedStrongs:sId}, root.byStrongs[sId]);
  }
  // Fall back to default if no tag matched
  if(root.defaultStrongs && root.byStrongs && root.byStrongs[root.defaultStrongs]){
    return Object.assign({pickedStrongs:root.defaultStrongs, isDefault:true}, root.byStrongs[root.defaultStrongs]);
  }
  return null;
}
// Render the deep-dictionary HTML block. Caller appends to popup.
function _renderEnglishDictBlock(deep){
  const out=[];
  if(deep.plain) out.push('<div class="def-section"><div class="def-section-label">Quick Meaning</div><div class="def-section-text">'+escapeHtml(deep.plain)+'</div></div>');
  if(deep.deep) out.push('<div class="def-section"><div class="def-section-label">What this word really means</div><div class="def-section-text">'+escapeHtml(deep.deep)+'</div></div>');
  if(deep.rangeOfMeaning && deep.rangeOfMeaning.length){
    out.push('<div class="def-section"><div class="def-section-label">Full range of meanings</div><ul class="def-list">');
    for(const r of deep.rangeOfMeaning) out.push('<li>'+escapeHtml(r)+'</li>');
    out.push('</ul></div>');
  }
  if(deep.notMean) out.push('<div class="def-section warning-section"><div class="def-section-label">⚠ This does NOT mean</div><div class="def-section-text">'+escapeHtml(deep.notMean)+'</div></div>');
  if(deep.misunderstood) out.push('<div class="def-section warning-section"><div class="def-section-label">⚠ Common mistake</div><div class="def-section-text">'+escapeHtml(deep.misunderstood)+'</div></div>');
  if(deep.cultural) out.push('<div class="def-section"><div class="def-section-label">Historical background</div><div class="def-section-text">'+escapeHtml(deep.cultural)+'</div></div>');
  if(deep.kingdomSignificance) out.push('<div class="def-section kingdom-section"><div class="def-section-label">⚜ Why this matters today</div><div class="def-section-text">'+escapeHtml(deep.kingdomSignificance)+'</div></div>');
  if(deep.matters) out.push('<div class="def-section"><div class="def-section-label">Why this matters</div><div class="def-section-text">'+escapeHtml(deep.matters)+'</div></div>');
  if(deep.originals && deep.originals.length){
    out.push('<div class="def-section"><div class="def-section-label">Original words — tap to explore</div>');
    for(const o of deep.originals){
      const sId=(o.strongs||'').match(/[HG]\d+/)?.[0];
      const onclick = sId ? ' onclick="showStrongs(\''+sId+'\')" style="cursor:pointer;"' : '';
      out.push('<div class="def-section-text" style="margin-top:6px;border-left:2px solid var(--gold);padding-left:8px;"'+onclick+'><b>'+escapeHtml(o.lang||'')+': '+(o.word||'')+'</b>');
      if(o.translit) out.push(' <i>('+escapeHtml(o.translit)+')</i>');
      if(o.strongs) out.push(' <span style="color:var(--gold);font-size:11px;">'+escapeHtml(o.strongs)+'</span>');
      if(o.note) out.push('<br><span style="font-size:13px;">'+escapeHtml(o.note)+'</span>');
      out.push('</div>');
    }
    out.push('</div>');
  }
  if(deep.relatedVerses && deep.relatedVerses.length){
    out.push('<div class="def-section"><div class="def-section-label">See it used in other verses</div><div class="def-section-text">'+deep.relatedVerses.map(escapeHtml).join(' · ')+'</div></div>');
  }
  if(deep.relatedWords && deep.relatedWords.length){
    out.push('<div class="def-section"><div class="def-section-label">Related words</div><div class="def-section-text">'+deep.relatedWords.map(function(w){return '<span class="definable" onclick="showDef(\''+w.replace(/\'/g,"\\'")+'\')">'+escapeHtml(w)+'</span>';}).join(' · ')+'</div></div>');
  }
  if(deep.sources && deep.sources.length){
    out.push('<div class="def-section" style="opacity:0.85;"><div class="def-section-label">Where this comes from</div><div class="def-section-text" style="font-size:12px;font-style:italic;">'+deep.sources.map(escapeHtml).join(' · ')+'</div></div>');
  }
  if(deep.confidence){
    out.push('<div class="def-section" style="opacity:0.8;font-size:11px;"><span class="def-section-label">Confidence:</span> '+escapeHtml(deep.confidence)+(deep.category?' · <span class="def-section-label">Category:</span> '+escapeHtml(deep.category):'')+'</div>');
  }
  return out.join('');
}
// Render an instruction-classification card. Caller appends to popup.
function _renderInstructionBlock(ic){
  const out=[];
  if(ic.speaker) out.push('<div class="def-section"><div class="def-section-label">Speaker</div><div class="def-section-text">'+escapeHtml(ic.speaker)+'</div></div>');
  if(ic.addressed) out.push('<div class="def-section"><div class="def-section-label">Addressed To</div><div class="def-section-text">'+escapeHtml(ic.addressed)+'</div></div>');
  if(ic.commanded) out.push('<div class="def-section"><div class="def-section-label">Commanded</div><div class="def-section-text">'+escapeHtml(ic.commanded)+'</div></div>');
  if(ic.category) out.push('<div class="def-section"><div class="def-section-label">Category</div><div class="def-section-text">'+escapeHtml(ic.category)+'</div></div>');
  if(ic.scope) out.push('<div class="def-section"><div class="def-section-label">Scope</div><div class="def-section-text">'+escapeHtml(ic.scope)+'</div></div>');
  if(ic.misunderstood) out.push('<div class="def-section warning-section"><div class="def-section-label">⚠ Common mistake</div><div class="def-section-text">'+escapeHtml(ic.misunderstood)+'</div></div>');
  if(ic.text) out.push('<div class="def-section"><div class="def-section-label">Text</div><div class="def-section-text" style="font-style:italic;">'+escapeHtml(ic.text)+'</div></div>');
  if(ic.sources && ic.sources.length) out.push('<div class="def-section" style="opacity:0.85;"><div class="def-section-label">Where this comes from</div><div class="def-section-text" style="font-size:12px;font-style:italic;">'+ic.sources.map(escapeHtml).join(' · ')+'</div></div>');
  return out.join('');
}
// Show a cultural-context passage card.
function showCulturalCard(passage){
  if(!window.CULTURAL_CARDS) return;
  const c=window.CULTURAL_CARDS[passage]; if(!c) return;
  const popup=document.getElementById('defPopup'); popup.classList.remove('people','strongs');
  const html=['<div class="def-word">🌍 '+escapeHtml(c.title||passage)+'</div>'];
  if(c.passage) html.push('<div class="def-translit">'+escapeHtml(c.passage)+'</div>');
  if(c.cultural) html.push('<div class="def-section"><div class="def-section-label">Cultural / Historical Setting</div><div class="def-section-text">'+escapeHtml(c.cultural)+'</div></div>');
  if(c.misunderstood) html.push('<div class="def-section warning-section"><div class="def-section-label">⚠ Common mistake</div><div class="def-section-text">'+escapeHtml(c.misunderstood)+'</div></div>');
  if(c.matters) html.push('<div class="def-section kingdom-section"><div class="def-section-label">⚜ Why this matters</div><div class="def-section-text">'+escapeHtml(c.matters)+'</div></div>');
  if(c.relatedVerses && c.relatedVerses.length) html.push('<div class="def-section"><div class="def-section-label">See it used in other verses</div><div class="def-section-text">'+c.relatedVerses.map(escapeHtml).join(' · ')+'</div></div>');
  if(c.sources && c.sources.length) html.push('<div class="def-section" style="opacity:0.85;"><div class="def-section-label">Where this comes from</div><div class="def-section-text" style="font-size:12px;font-style:italic;">'+c.sources.map(escapeHtml).join(' · ')+'</div></div>');
  if(c.confidence) html.push('<div class="def-section" style="opacity:0.8;font-size:11px;"><span class="def-section-label">Confidence:</span> '+escapeHtml(c.confidence)+'</div>');
  document.getElementById('defContent').innerHTML=html.join('');
  popup.classList.add('show'); _lockBodyScroll(); document.getElementById('defOverlay').classList.add('show');
}
// Show an instruction-classification card.
function showInstruction(passage){
  if(!window.INSTRUCTION_CARDS) return;
  const i=window.INSTRUCTION_CARDS[passage]; if(!i) return;
  const popup=document.getElementById('defPopup'); popup.classList.remove('people','strongs');
  const html=['<div class="def-word">📜 '+escapeHtml(i.title||passage)+'</div>'];
  if(i.passage) html.push('<div class="def-translit">'+escapeHtml(i.passage)+'</div>');
  html.push(_renderInstructionBlock(i));
  document.getElementById('defContent').innerHTML=html.join('');
  popup.classList.add('show'); _lockBodyScroll(); document.getElementById('defOverlay').classList.add('show');
}
window.showCulturalCard = showCulturalCard;
window.showInstruction = showInstruction;

function showDef(word, opts){
  _lockBodyScroll();
  // Accept either showDef(word) or showDef(word, opts) or showDef(word, 'Verse 1:2') ref-string.
  if(typeof opts === 'string'){
    const ref = opts;
    const tags = (window.__verseStrongs && window.__verseStrongs[ref]) || [];
    opts = { ref: ref, strongsTags: tags };
  }
  opts = opts || {};
  const deep = _lookupEnglishBibleDict(word);
  let def=window.DEFINITIONS[word]||window.DEFINITIONS[word.toLowerCase()];
  // If neither legacy DEFINITIONS nor the new ENGLISH_BIBLE_DICT has anything, fall back to auto-term card.
  if(!def && !deep){ showAutoTermCard(word); return; }
  if(def && def.see && window.DEFINITIONS[def.see])def=window.DEFINITIONS[def.see];
  // Allow the new deep dictionary to render even when the legacy entry is absent.
  if(!def) def={};
  const popup=document.getElementById('defPopup');
  popup.classList.remove('people','strongs');
  const html=[];
  html.push('<div class="def-word">'+escapeHtml(word)+'</div>');
  if(def.hebrew)html.push('<div class="def-hebrew">'+def.hebrew+'</div>');
  if(def.translit)html.push('<div class="def-translit">'+escapeHtml(def.translit)+'</div>');
  if(def.strongs){
    // Recognize both Hebrew (H1234) and Greek (G1234) Strong's IDs
    const hId=def.strongs.match(/H\d+/)?.[0];
    const gId=def.strongs.match(/G\d+/)?.[0];
    const sId=hId||gId;
    if(sId)html.push('<div class="def-strongs" onclick="showStrongs(\''+sId+'\')" title="Tap for full Strong\'s entry">Strong\'s '+escapeHtml(def.strongs)+' →</div>');
    else html.push('<div class="def-strongs">Strong\'s '+escapeHtml(def.strongs)+'</div>');
  }
  if(def.plain)html.push('<div class="def-section plain-section"><div class="def-section-label">In Plain English</div><div class="def-section-text plain-text">'+escapeHtml(def.plain)+'</div></div>');
  if(def.root)html.push('<div class="def-section"><div class="def-section-label">Root</div><div class="def-section-text">'+escapeHtml(def.root)+'</div></div>');
  if(def.senses&&def.senses.length){
    html.push('<div class="def-section"><div class="def-section-label">All the ways this word is used</div><ul class="def-list">');
    for(const s of def.senses)html.push('<li>'+escapeHtml(s)+'</li>');
    html.push('</ul></div>');
  }
  if(def.def)html.push('<div class="def-section"><div class="def-section-label">What it means</div><div class="def-section-text">'+escapeHtml(def.def)+'</div></div>');
  if(def.visual)html.push('<div class="def-section"><div class="def-section-label">Picture it like this</div><div class="def-section-text">'+escapeHtml(def.visual)+'</div></div>');
  if(def.ane)html.push('<div class="def-section"><div class="def-section-label">What life looked like back then</div><div class="def-section-text">'+escapeHtml(def.ane)+'</div></div>');
  if(def.kingdom)html.push('<div class="def-section kingdom-section"><div class="def-section-label">⚜ Why this matters today</div><div class="def-section-text">'+escapeHtml(def.kingdom)+'</div></div>');
  if(def.theology)html.push('<div class="def-section"><div class="def-section-label">Going deeper</div><div class="def-section-text">'+escapeHtml(def.theology)+'</div></div>');
  if(def.psychology)html.push('<div class="def-section"><div class="def-section-label">Heart, soul, and mind</div><div class="def-section-text">'+escapeHtml(def.psychology)+'</div></div>');
  if(def.warning)html.push('<div class="def-section warning-section"><div class="def-section-label">⚠ Heads up — translation issue</div><div class="def-section-text">'+escapeHtml(def.warning)+'</div></div>');
  if(def.greek)html.push('<div class="def-section"><div class="def-section-label">Greek (LXX/NT)</div><div class="def-section-text">'+escapeHtml(def.greek)+'</div></div>');
  if(def.aramaic)html.push('<div class="def-section"><div class="def-section-label">Aramaic</div><div class="def-section-text">'+escapeHtml(def.aramaic)+'</div></div>');
  // BDB + Strong's enrichment
  if(def.strongs){
    const sId=def.strongs.match(/H\d+/)?.[0];
    if(sId){
      const bdbResults=lookupBDB(sId);
      if(bdbResults.length>0){
        html.push('<div class="def-section strongs-section scholar-depth">');
        html.push('<div class="def-section-label">📖 Scholar\'s Dictionary — '+(bdbResults.length>1?bdbResults.length+' Senses':'Definition')+'</div>');
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
    if(sd.kjv_def)html.push('<div class="def-section-text" style="margin-top:6px;font-size:12px;color:var(--fg-mute);"><b>King James Version:</b> <i>'+escapeHtml(sd.kjv_def)+'</i></div>');
    html.push('</div>');
  }
  if(def.cross)html.push('<div class="def-section"><div class="def-section-label">See also in the Bible</div><div class="def-section-text">'+escapeHtml(def.cross)+'</div></div>');
  // ---- Deep English Bible Dictionary block (if available) ----
  if(deep){
    // Context-sense disambiguation: if the verse's strongsTags pick a specific
    // Hebrew/Greek variant of this word, surface it FIRST so the reader sees
    // which underlying word is operative in this verse.
    const picked = _contextSenseFor(word, opts);
    if(picked){
      const sId=(picked.strongs||'').match(/[HG]\d+/)?.[0] || picked.pickedStrongs;
      html.push('<div class="def-section kingdom-section"><div class="def-section-label">⚜ Context-Specific Meaning '+(picked.isDefault?'(default — no per-verse tag matched)':'(matched per-verse tag '+(picked.pickedStrongs||'')+')')+'</div>');
      html.push('<div class="def-section-text"');
      if(sId) html.push(' onclick="showStrongs(\''+sId+'\')" style="cursor:pointer;"');
      html.push('><b>'+escapeHtml(picked.lang||'')+': '+(picked.word||'')+'</b>');
      if(picked.translit) html.push(' <i>('+escapeHtml(picked.translit)+')</i>');
      if(picked.pickedStrongs) html.push(' <span style="color:var(--gold);font-size:11px;">'+escapeHtml(picked.pickedStrongs)+'</span>');
      html.push('<br>'+escapeHtml(picked.gloss||'')+'</div></div>');
    }
    html.push(_renderEnglishDictBlock(deep));
  }
  document.getElementById('defContent').innerHTML=html.join('');
  popup.classList.add('show');
  _lockBodyScroll();document.getElementById('defOverlay').classList.add('show');
}

// Render a Group / Nation / Tribe / Sect card from window.GROUP_NATIONS.
function showGroupCard(key){
  if(!window.GROUP_NATIONS) return;
  const g = window.GROUP_NATIONS[key]; if(!g) return;
  const popup = document.getElementById('defPopup'); popup.classList.remove('people','strongs');
  const html = ['<div class="def-word">🌐 '+escapeHtml(g.name||key)+'</div>'];
  if(g.altNames && g.altNames.length) html.push('<div class="def-translit">Also: '+g.altNames.map(escapeHtml).join(' · ')+'</div>');
  if(g.origin) html.push('<div class="def-section"><div class="def-section-label">Origin</div><div class="def-section-text">'+escapeHtml(g.origin)+'</div></div>');
  if(g.region) html.push('<div class="def-section"><div class="def-section-label">Region / Geography</div><div class="def-section-text">'+escapeHtml(g.region)+'</div></div>');
  if(g.language) html.push('<div class="def-section"><div class="def-section-label">Language / Culture</div><div class="def-section-text">'+escapeHtml(g.language)+'</div></div>');
  if(g.cities && g.cities.length) html.push('<div class="def-section"><div class="def-section-label">Major Cities / Territories</div><div class="def-section-text">'+g.cities.map(escapeHtml).join(' · ')+'</div></div>');
  if(g.political) html.push('<div class="def-section"><div class="def-section-label">Political Role</div><div class="def-section-text">'+escapeHtml(g.political)+'</div></div>');
  if(g.religion) html.push('<div class="def-section"><div class="def-section-label">Religion / Gods</div><div class="def-section-text">'+escapeHtml(g.religion)+'</div></div>');
  if(g.customs) html.push('<div class="def-section"><div class="def-section-label">Customs / Social Patterns</div><div class="def-section-text">'+escapeHtml(g.customs)+'</div></div>');
  if(g.appearance) html.push('<div class="def-section"><div class="def-section-label">Appearance — Regional / Historical Context</div><div class="def-section-text">'+escapeHtml(g.appearance)+'</div></div>');
  if(g.relationToIsrael) html.push('<div class="def-section kingdom-section"><div class="def-section-label">⚜ Relationship to Israel / Early Church</div><div class="def-section-text">'+escapeHtml(g.relationToIsrael)+'</div></div>');
  if(g.relatedPeople && g.relatedPeople.length) html.push('<div class="def-section"><div class="def-section-label">Related People</div><div class="def-section-text">'+g.relatedPeople.map(escapeHtml).join(' · ')+'</div></div>');
  if(g.relatedPlaces && g.relatedPlaces.length) html.push('<div class="def-section"><div class="def-section-label">Related Places</div><div class="def-section-text">'+g.relatedPlaces.map(escapeHtml).join(' · ')+'</div></div>');
  if(g.misunderstood) html.push('<div class="def-section warning-section"><div class="def-section-label">⚠ Common mistake</div><div class="def-section-text">'+escapeHtml(g.misunderstood)+'</div></div>');
  if(g.sources && g.sources.length) html.push('<div class="def-section" style="opacity:0.85;"><div class="def-section-label">Where this comes from</div><div class="def-section-text" style="font-size:12px;font-style:italic;">'+g.sources.map(escapeHtml).join(' · ')+'</div></div>');
  if(g.confidence) html.push('<div class="def-section" style="opacity:0.8;font-size:11px;"><span class="def-section-label">Confidence:</span> '+escapeHtml(g.confidence)+'</div>');
  document.getElementById('defContent').innerHTML=html.join('');
  popup.classList.add('show'); _lockBodyScroll(); document.getElementById('defOverlay').classList.add('show');
}
window.showGroupCard = showGroupCard;

// Render a Religion / God / Belief-system card from window.RELIGION_CARDS.
function showReligionCard(key){
  if(!window.RELIGION_CARDS) return;
  const r = window.RELIGION_CARDS[key]; if(!r) return;
  const popup = document.getElementById('defPopup'); popup.classList.remove('people','strongs');
  const html = ['<div class="def-word">⛩ '+escapeHtml(r.name||key)+'</div>'];
  if(r.altNames && r.altNames.length) html.push('<div class="def-translit">Also: '+r.altNames.map(escapeHtml).join(' · ')+'</div>');
  if(r.associated) html.push('<div class="def-section"><div class="def-section-label">Associated People / Nation</div><div class="def-section-text">'+escapeHtml(r.associated)+'</div></div>');
  if(r.references && r.references.length) html.push('<div class="def-section"><div class="def-section-label">Bible References</div><div class="def-section-text">'+r.references.map(escapeHtml).join(' · ')+'</div></div>');
  if(r.description) html.push('<div class="def-section"><div class="def-section-label">Description</div><div class="def-section-text">'+escapeHtml(r.description)+'</div></div>');
  if(r.practices) html.push('<div class="def-section"><div class="def-section-label">Worship Practices</div><div class="def-section-text">'+escapeHtml(r.practices)+'</div></div>');
  if(r.whyMatters) html.push('<div class="def-section kingdom-section"><div class="def-section-label">⚜ Why this matters In The Passage</div><div class="def-section-text">'+escapeHtml(r.whyMatters)+'</div></div>');
  if(r.contrastYHWH) html.push('<div class="def-section"><div class="def-section-label">Contrast with YHWH</div><div class="def-section-text">'+escapeHtml(r.contrastYHWH)+'</div></div>');
  if(r.misunderstood) html.push('<div class="def-section warning-section"><div class="def-section-label">⚠ Common mistake</div><div class="def-section-text">'+escapeHtml(r.misunderstood)+'</div></div>');
  if(r.sources && r.sources.length) html.push('<div class="def-section" style="opacity:0.85;"><div class="def-section-label">Where this comes from</div><div class="def-section-text" style="font-size:12px;font-style:italic;">'+r.sources.map(escapeHtml).join(' · ')+'</div></div>');
  if(r.confidence) html.push('<div class="def-section" style="opacity:0.8;font-size:11px;"><span class="def-section-label">Confidence:</span> '+escapeHtml(r.confidence)+'</div>');
  document.getElementById('defContent').innerHTML=html.join('');
  popup.classList.add('show'); _lockBodyScroll(); document.getElementById('defOverlay').classList.add('show');
}
window.showReligionCard = showReligionCard;

function showPerson(name){
  let p=window.PEOPLES[name];
  // Handle cases where a name in PEOPLES might be referenced by short form
  if(!p && name === 'Joseph') p = window.PEOPLES['Joseph_NT'];
  // Fall back to DEFINITIONS for biblical-figure terms stored there (e.g. Adam, Eve, Noah, Cain, Abel, Enoch)
  if(!p && window.DEFINITIONS && window.DEFINITIONS[name]){ showDef(name); return; }
  if(!p)return;
  // Display name (strip _NT suffix for cleaner UI)
  const displayName = name.replace(/_NT$/, '');
  const popup=document.getElementById('defPopup');
  popup.classList.remove('strongs');
  popup.classList.add('people');
  const html=[];
  html.push('<div class="def-word">👤 '+escapeHtml(displayName)+'</div>');
  if(p.altName&&p.altName!=='-')html.push('<div class="def-translit">Also: '+escapeHtml(p.altName)+'</div>');
  if(p.biblical)html.push('<div class="def-section"><div class="def-section-label">Biblical Identity</div><div class="def-section-text">'+escapeHtml(p.biblical)+'</div></div>');
  if(p.region)html.push('<div class="def-section"><div class="def-section-label">Region and origin</div><div class="def-section-text">'+escapeHtml(p.region)+'</div></div>');
  if(p.appearance)html.push('<div class="def-section"><div class="def-section-label">What historians tell us they looked like</div><div class="def-section-text">'+escapeHtml(p.appearance)+'</div></div>');
  else html.push('<div class="def-section warning-section"><div class="def-section-label">Appearance / Region Guardrail</div><div class="def-section-text">Exact skin, hair, and eye details are not directly preserved for every person. This app does not default ancient biblical people into European movie imagery. Use region, ancestry, tribe, climate, era, and source evidence when available; when source data is limited, the honest answer is marked as limited rather than invented.</div></div>');
  if(p.diet)html.push('<div class="def-section"><div class="def-section-label">Diet & Daily Life</div><div class="def-section-text">'+escapeHtml(p.diet)+'</div></div>');
  if(p.notable)html.push('<div class="def-section"><div class="def-section-label">Notable</div><div class="def-section-text">'+escapeHtml(p.notable)+'</div></div>');
  if(p.sources)html.push('<div class="def-section"><div class="def-section-label">Sources</div><div class="def-section-text"><i>'+escapeHtml(p.sources)+'</i></div></div>');
  // ---- Person Context overlay (window.PERSON_CONTEXT) — additional schema layers ----
  const ctx = (window.PERSON_CONTEXT && (window.PERSON_CONTEXT[name] || window.PERSON_CONTEXT[displayName])) || null;
  if(ctx){
    if(ctx.tribe) html.push('<div class="def-section"><div class="def-section-label">Tribe / People Group</div><div class="def-section-text">'+escapeHtml(ctx.tribe)+'</div></div>');
    if(ctx.family) html.push('<div class="def-section"><div class="def-section-label">Family Line</div><div class="def-section-text">'+escapeHtml(ctx.family)+'</div></div>');
    if(ctx.timePeriod) html.push('<div class="def-section"><div class="def-section-label">Time Period / Era</div><div class="def-section-text">'+escapeHtml(ctx.timePeriod)+'</div></div>');
    if(ctx.language) html.push('<div class="def-section"><div class="def-section-label">Language / Culture</div><div class="def-section-text">'+escapeHtml(ctx.language)+'</div></div>');
    if(ctx.beliefs) html.push('<div class="def-section"><div class="def-section-label">Beliefs / Gods / Religious World</div><div class="def-section-text">'+escapeHtml(ctx.beliefs)+'</div></div>');
    if(ctx.political) html.push('<div class="def-section"><div class="def-section-label">Political Setting</div><div class="def-section-text">'+escapeHtml(ctx.political)+'</div></div>');
    if(ctx.covenant) html.push('<div class="def-section kingdom-section"><div class="def-section-label">⚜ Covenant Relationship</div><div class="def-section-text">'+escapeHtml(ctx.covenant)+'</div></div>');
    if(ctx.whyMatters) html.push('<div class="def-section kingdom-section"><div class="def-section-label">⚜ Why They Matter</div><div class="def-section-text">'+escapeHtml(ctx.whyMatters)+'</div></div>');
    if(ctx.misunderstood) html.push('<div class="def-section warning-section"><div class="def-section-label">⚠ Common mistake</div><div class="def-section-text">'+escapeHtml(ctx.misunderstood)+'</div></div>');
    if(ctx.relatedPeople && ctx.relatedPeople.length) html.push('<div class="def-section"><div class="def-section-label">Related People</div><div class="def-section-text">'+ctx.relatedPeople.map(escapeHtml).join(' · ')+'</div></div>');
    if(ctx.relatedPlaces && ctx.relatedPlaces.length) html.push('<div class="def-section"><div class="def-section-label">Related Places</div><div class="def-section-text">'+ctx.relatedPlaces.map(escapeHtml).join(' · ')+'</div></div>');
    if(ctx.relatedThemes && ctx.relatedThemes.length) html.push('<div class="def-section"><div class="def-section-label">Related Themes</div><div class="def-section-text">'+ctx.relatedThemes.map(escapeHtml).join(' · ')+'</div></div>');
    if(ctx.confidence) html.push('<div class="def-section" style="opacity:0.8;font-size:11px;"><span class="def-section-label">Confidence:</span> '+escapeHtml(ctx.confidence)+'</div>');
  }
  document.getElementById('defContent').innerHTML=html.join('');
  popup.classList.add('show');
  _lockBodyScroll();document.getElementById('defOverlay').classList.add('show');
}

function auditPeopleContextCoverage(){
  const known = _getKnownPersonKeys();
  const withProfiles = known.filter(_hasPersonContext);
  const report = {
    knownNames: known.length,
    namesWithPeopleOrContextProfiles: withProfiles.length,
    peoplesProfiles: window.PEOPLES ? Object.keys(window.PEOPLES).length : 0,
    personContextProfiles: window.PERSON_CONTEXT ? Object.keys(window.PERSON_CONTEXT).length : 0,
    groupNationCards: window.GROUP_NATIONS ? Object.keys(window.GROUP_NATIONS).length : 0,
    religionCards: window.RELIGION_CARDS ? Object.keys(window.RELIGION_CARDS).length : 0,
    note: 'People/appearance cards use source-honest confidence language. Missing exact appearance data is shown as a source gap, not guessed.'
  };
  console.table(report);
  return report;
}
window.auditPeopleContextCoverage = auditPeopleContextCoverage;

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
  // Handle both Hebrew (H1, H2, ...) and Greek (G1, G2, ... OR raw numeric)
  let entry = null;
  let isGreek = false;
  let bdbResults = [];

  if (typeof id === 'string' && id.toUpperCase().startsWith('G')) {
    // Greek — strip G prefix and look up
    const num = id.substring(1);
    entry = (window.STRONGS_GRK && window.STRONGS_GRK[num]) || null;
    isGreek = true;
  } else if (typeof id === 'string' && id.toUpperCase().startsWith('H')) {
    // Hebrew with H prefix
    entry = window.STRONGS_HEB && window.STRONGS_HEB[id];
    bdbResults = lookupBDB(id);
  } else {
    // Try as-is (numeric or H-prefixed)
    entry = (window.STRONGS_HEB && window.STRONGS_HEB[id]) ||
            (window.STRONGS_GRK && window.STRONGS_GRK[id]);
    if (window.STRONGS_GRK && window.STRONGS_GRK[id]) isGreek = true;
    if (typeof id === 'string' && id.startsWith('H')) bdbResults = lookupBDB(id);
  }

  if(!entry && bdbResults.length === 0){alert("Strong's "+id+' not found.');return}

  const popup=document.getElementById('defPopup');
  popup.classList.remove('people');
  popup.classList.add('strongs');
  const html=[];
  html.push('<div class="def-word">Strong\'s '+escapeHtml(id)+(isGreek?' (Greek)':' (Hebrew)')+'</div>');

  if (isGreek && entry) {
    // Greek lexicon entry
    if(entry.grk) html.push('<div class="def-hebrew">'+entry.grk+'</div>');
    if(entry.translit || entry.xlit) html.push('<div class="def-translit">'+escapeHtml(entry.translit||entry.xlit||'')+'</div>');
    html.push('<div class="def-section strongs-section">');
    html.push('<div class="def-section-label">📚 Strong\'s Greek (1894)</div>');
    if(entry.def) html.push('<div class="def-section-text">'+escapeHtml(entry.def)+'</div>');
    if(entry.kjv_def) html.push('<div class="def-section-text" style="margin-top:6px;font-size:12px;color:var(--fg-mute);"><b>King James Version says:</b> <i>'+escapeHtml(entry.kjv_def)+'</i></div>');
    if(entry.derivation) html.push('<div class="def-section-text scholar-depth" style="margin-top:6px;font-size:12px;"><b>Derivation:</b> '+escapeHtml(entry.derivation)+'</div>');
    html.push('</div>');
    html.push('<div class="def-section"><div class="def-section-label">Sources</div><div class="def-section-text" style="font-size:11px;"><i>Strong\'s Concise Dictionary of the Greek New Testament (1894). Public domain.</i></div></div>');
  } else {
    // Hebrew lexicon entry (existing logic)
    const lemma=(bdbResults[0]?.entry?.lemma)||entry?.lemma;
    if(lemma)html.push('<div class="def-hebrew">'+lemma+'</div>');
    const xlit=entry?.xlit||bdbResults[0]?.entry?.xlit;
    if(xlit)html.push('<div class="def-translit">'+escapeHtml(xlit)+(entry?.pron?' — pronounced: '+escapeHtml(entry.pron):'')+'</div>');
    if(bdbResults.length>0){
      html.push('<div class="def-section strongs-section">');
      html.push('<div class="def-section-label">📖 BDB Hebrew Lexicon — '+(bdbResults.length>1?bdbResults.length+' senses':'definition')+'</div>');
      for(const r of bdbResults){
        if(bdbResults.length>1)html.push('<div style="margin-top:8px;color:var(--gold);font-weight:700;font-size:13px;">'+r.key+(r.entry.gloss?' — "'+escapeHtml(r.entry.gloss)+'"':'')+'</div>');
        else if(r.entry.gloss)html.push('<div style="color:var(--gold);font-weight:600;font-size:13px;margin-bottom:4px;">"'+escapeHtml(r.entry.gloss)+'"</div>');
        if(r.entry.morph)html.push('<div style="font-size:11px;color:var(--fg-dim);font-family:-apple-system,sans-serif;">'+escapeHtml(r.entry.morph)+'</div>');
        if(r.entry.def){
          const def=r.entry.def.replace(/<[^>]*>/g,'').replace(/\s*\|\s*/g,'<br>').replace(/§/g,'§');
          html.push('<div class="def-section-text" style="margin-top:6px;line-height:1.6;">'+def+'</div>');
        }
      }
      html.push('</div>');
    }
    if(entry){
      html.push('<div class="def-section">');
      html.push('<div class="def-section-label">📚 Strong\'s Hebrew (1894)</div>');
      if(entry.strongs_def)html.push('<div class="def-section-text">'+escapeHtml(entry.strongs_def)+'</div>');
      if(entry.kjv_def)html.push('<div class="def-section-text" style="margin-top:6px;font-size:12px;color:var(--fg-mute);"><b>King James Version says:</b> <i>'+escapeHtml(entry.kjv_def)+'</i></div>');
      if(entry.derivation)html.push('<div class="def-section-text scholar-depth" style="margin-top:6px;font-size:12px;"><b>Derivation:</b> '+escapeHtml(entry.derivation)+'</div>');
      html.push('</div>');
    }
    html.push('<div class="def-section"><div class="def-section-label">Sources</div><div class="def-section-text" style="font-size:11px;"><i>Brown-Driver-Briggs Hebrew-English Lexicon (1906) via STEPBible/Tyndale House (CC BY 4.0). Strong\'s Concise Dictionary of the Hebrew Bible (1894) via openscriptures.org. Both public domain.</i></div></div>');
  }

  document.getElementById('defContent').innerHTML=html.join('');
  popup.classList.add('show');
  _lockBodyScroll();document.getElementById('defOverlay').classList.add('show');
}

function closeDef(){
  _unlockBodyScroll();
  document.getElementById('defPopup').classList.remove('show','people','strongs');
  document.getElementById('defOverlay').classList.remove('show');
}



/* ============================================================
   BOOKMARKS / HIGHLIGHTS / NOTES
   ------------------------------------------------------------ */
function _getBookmarks(){try{return JSON.parse(localStorage.getItem('swrv_bookmarks')||'[]');}catch(e){return[];}}
function _saveBookmarks(a){localStorage.setItem('swrv_bookmarks',JSON.stringify(a));}
function _getHighlights(){try{return JSON.parse(localStorage.getItem('swrv_highlights')||'{}');}catch(e){return{};}}
function _saveHighlights(o){localStorage.setItem('swrv_highlights',JSON.stringify(o));}
function _getNotes(){try{return JSON.parse(localStorage.getItem('swrv_notes')||'{}');}catch(e){return{};}}
function _saveNotes(o){localStorage.setItem('swrv_notes',JSON.stringify(o));}

function toggleBookmark(ref,text){
  const bms=_getBookmarks();
  const idx=bms.findIndex(function(b){return b.ref===ref;});
  if(idx>=0){bms.splice(idx,1);}else{bms.push({ref:ref,text:(text||'').substring(0,150),book:currentBook,chapter:currentChapter,ts:Date.now()});}
  _saveBookmarks(bms);
  const btn=document.getElementById('bm_'+ref.replace(/[^a-z0-9]/gi,'_'));
  if(btn)btn.classList.toggle('active',idx<0);
}

function showHighlightPicker(ref,btn){
  document.querySelectorAll('.hl-picker').forEach(function(p){p.remove();});
  const colors=[{c:'yellow',l:'Yellow'},{c:'green',l:'Green'},{c:'blue',l:'Blue'},{c:'pink',l:'Pink'},{c:'',l:'Clear'}];
  const cur=(_getHighlights()[ref]||'');
  const div=document.createElement('div');
  div.className='hl-picker';
  div.innerHTML=colors.map(function(x){
    return '<button class="hl-swatch hl-'+x.c+(cur===x.c?' hl-active':'')+'" onclick="applyHighlight(\''+ref.replace(/'/g,"\\'")+'\',\''+x.c+'\')" title="'+x.l+'"></button>';
  }).join('');
  btn.closest('.verse').appendChild(div);
}
function applyHighlight(ref,color){
  const hl=_getHighlights();
  if(color){hl[ref]=color;}else{delete hl[ref];}
  _saveHighlights(hl);
  document.querySelectorAll('.hl-picker').forEach(function(p){p.remove();});
  const verse=document.getElementById(ref.replace(/[^a-z0-9]/gi,'_'));
  if(verse){
    verse.className=verse.className.replace(/\bverse-hl-\w+/g,'').trim();
    if(color)verse.classList.add('verse-hl-'+color);
  }
}

function openNote(ref){
  const notes=_getNotes();
  const existing=notes[ref]||'';
  _lockBodyScroll();
  document.getElementById('modalTitle').textContent='Note — '+ref;
  const eRef=ref.replace(/'/g,"\\'");
  document.getElementById('modalBody').innerHTML=
    '<textarea id="noteTA" style="width:100%;min-height:120px;background:var(--bg-3);border:1px solid var(--line);border-radius:6px;color:var(--fg);font-family:inherit;font-size:15px;padding:10px;resize:vertical;box-sizing:border-box;" placeholder="Write your note…">'+escapeHtml(existing)+'</textarea>'
    +'<div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;">'
    +'<button onclick="saveNote(\''+eRef+'\',document.getElementById(\'noteTA\').value)" style="background:var(--gold);color:#000;border:none;border-radius:6px;padding:10px 22px;font-weight:700;cursor:pointer;font-family:inherit;">Save</button>'
    +(existing?'<button onclick="deleteNote(\''+eRef+'\')" style="background:var(--bg-3);border:1px solid var(--line);color:var(--fg-mute);border-radius:6px;padding:10px 18px;cursor:pointer;font-family:inherit;">Delete note</button>':'')
    +'<button onclick="closeModal()" style="background:var(--bg-3);border:1px solid var(--line);color:var(--fg-mute);border-radius:6px;padding:10px 18px;cursor:pointer;font-family:inherit;">Cancel</button>'
    +'</div>';
  document.getElementById('modal').classList.add('show');
  setTimeout(function(){var t=document.getElementById('noteTA');if(t){t.focus();t.selectionStart=t.value.length;}},80);
}
function saveNote(ref,text){
  const notes=_getNotes();
  if(text&&text.trim()){notes[ref]=text.trim();}else{delete notes[ref];}
  _saveNotes(notes);
  closeModal();
  const btn=document.getElementById('note_'+ref.replace(/[^a-z0-9]/gi,'_'));
  if(btn)btn.classList.toggle('has-note',!!(text&&text.trim()));
}
function deleteNote(ref){
  const notes=_getNotes();
  delete notes[ref];
  _saveNotes(notes);
  closeModal();
  const btn=document.getElementById('note_'+ref.replace(/[^a-z0-9]/gi,'_'));
  if(btn)btn.classList.remove('has-note');
}

function _applyUserAnnotations(){
  const hl=_getHighlights();
  const notes=_getNotes();
  const bms=new Set(_getBookmarks().map(function(b){return b.ref;}));
  Object.keys(hl).forEach(function(ref){
    const v=document.getElementById(ref.replace(/[^a-z0-9]/gi,'_'));
    if(v&&hl[ref]){v.className=v.className.replace(/\bverse-hl-\w+/g,'').trim();v.classList.add('verse-hl-'+hl[ref]);}
  });
  Object.keys(notes).forEach(function(ref){
    const btn=document.getElementById('note_'+ref.replace(/[^a-z0-9]/gi,'_'));
    if(btn)btn.classList.add('has-note');
  });
  bms.forEach(function(ref){
    const btn=document.getElementById('bm_'+ref.replace(/[^a-z0-9]/gi,'_'));
    if(btn)btn.classList.add('active');
  });
  _reapplyTextHighlights();
}

function _loadSavedPosition(book,chapter){
  if(book===currentBook&&(_bookScriptLoaded[book]||(window.BIBLE&&window.BIBLE[book])||(book==='Genesis'))){
    currentChapter=chapter;
    _loadChapterCore(chapter);
  }else{
    _loadBookScript(book,function(){
      currentBook=book;window.currentBook=book;_updateBookContext();
      if(typeof bookSelect!=='undefined'&&bookSelect)bookSelect.value=book;
      populateChapterSelect();
      currentChapter=chapter;
      populateVerseSelect();
      _loadChapterCore(chapter);
    });
  }
}

/* ============================================================
   TEXT-SELECTION HIGHLIGHTING
   Users select any text in a verse → floating color toolbar appears
   → pick a color to highlight that exact phrase.
   Highlights are stored in localStorage and re-applied on chapter load.
   ------------------------------------------------------------ */
function _getTextHighlights(){try{return JSON.parse(localStorage.getItem('swrv_text_hl')||'[]');}catch(e){return[];}}
function _saveTextHighlights(a){localStorage.setItem('swrv_text_hl',JSON.stringify(a));}

// Wrap target text inside el with a <mark> and save to storage
function _wrapTextInElement(el, targetText, color, ref){
  if(!el||!targetText) return false;
  var walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  var textNodes=[],node;
  while((node=walker.nextNode())){
    var p=node.parentElement,inMark=false;
    while(p&&p!==el){if(p.tagName==='MARK'){inMark=true;break;}p=p.parentElement;}
    if(!inMark) textNodes.push(node);
  }
  var pos=0,segments=textNodes.map(function(n){var s={node:n,start:pos,end:pos+n.textContent.length};pos=s.end;return s;});
  var full=textNodes.map(function(n){return n.textContent;}).join('');
  var idx=full.indexOf(targetText);
  if(idx<0) return false;
  var end=idx+targetText.length;
  var inv=segments.filter(function(s){return s.end>idx&&s.start<end;});
  if(!inv.length) return false;
  var range=document.createRange();
  range.setStart(inv[0].node,idx-inv[0].start);
  range.setEnd(inv[inv.length-1].node,end-inv[inv.length-1].start);
  var mark=document.createElement('mark');
  mark.className='text-hl text-hl-'+color;
  mark.dataset.hlColor=color;
  mark.dataset.hlRef=ref||'';
  mark.dataset.hlText=targetText;
  try{range.surroundContents(mark);return true;}
  catch(e){try{var c=range.extractContents();mark.appendChild(c);range.insertNode(mark);return true;}catch(e2){return false;}}
}

function _reapplyTextHighlights(){
  _getTextHighlights().forEach(function(h){
    var refId=h.ref.replace(/[^a-z0-9]/gi,'_');
    var verseEl=document.getElementById(refId);
    if(!verseEl) return;
    var textEl=verseEl.querySelector('.verse-text');
    if(textEl) _wrapTextInElement(textEl,h.text,h.color,h.ref);
  });
}

// Floating toolbar shown above a text selection
// Uses selectionchange + debounce — the correct approach for iOS text handles
(function(){
  var _toolbar=null,_savedRange=null,_savedRef=null,_debounceTimer=null;

  function _refFromVerseEl(el){
    var v=el;
    while(v&&!v.classList.contains('verse')) v=v.parentElement;
    if(!v||!v.id) return null;
    var parts=v.id.split('_');
    if(parts.length<3) return null;
    var verse=parts[parts.length-1],ch=parts[parts.length-2],book=parts.slice(0,parts.length-2).join(' ');
    return book+' '+ch+':'+verse;
  }

  function _removeToolbar(){
    if(_toolbar){_toolbar.remove();_toolbar=null;}
    _savedRange=null;_savedRef=null;
  }

  function _positionToolbar(tb,rect){
    var tw=tb.offsetWidth||200,th=tb.offsetHeight||44;
    var top=rect.top+window.scrollY-th-12;
    var left=rect.left+window.scrollX+(rect.width/2)-(tw/2);
    left=Math.max(8,Math.min(left,window.innerWidth-tw-8));
    if(top<window.scrollY+60) top=rect.bottom+window.scrollY+12;
    tb.style.top=top+'px';tb.style.left=left+'px';
  }

  function _showToolbar(range,ref){
    if(_toolbar&&_savedRef===ref) return;
    _removeToolbar();
    _savedRange=range.cloneRange();_savedRef=ref;
    var tb=document.createElement('div');
    tb.id='hlFloatBar';tb.className='hl-toolbar';
    var colors=[{c:'yellow',bg:'#f5d000',l:'Yellow'},{c:'red',bg:'#ff5252',l:'Red'},{c:'green',bg:'#43d68a',l:'Green'},{c:'purple',bg:'#b47fff',l:'Purple'}];
    tb.innerHTML=colors.map(function(x){
      return '<button class="hl-tb-btn" ontouchend="event.preventDefault();window._commitHL(\''+x.c+'\')" onclick="window._commitHL(\''+x.c+'\')"><span class="hl-tb-dot" style="background:'+x.bg+';"></span>'+x.l+'</button>';
    }).join('')+'<button class="hl-tb-clear" ontouchend="event.preventDefault();window._clearHL()" onclick="window._clearHL()">Remove</button>';
    document.body.appendChild(tb);_toolbar=tb;
  }

  function _checkSelection(){
    var sel=window.getSelection();
    if(!sel||sel.isCollapsed||!sel.toString().trim()){
      // Only remove toolbar if user clicked away, not while adjusting handles
      return;
    }
    var anchor=sel.anchorNode;
    var el=anchor&&(anchor.nodeType===3?anchor.parentElement:anchor);
    while(el&&el!==document.body){
      if(el.classList&&el.classList.contains('verse-text')){
        var ref=_refFromVerseEl(el);
        if(ref){ _showToolbar(sel.getRangeAt(0),ref); return; }
      }
      el=el.parentElement;
    }
    // Selection is outside verse text — remove toolbar
    _removeToolbar();
  }

  // selectionchange fires continuously as handles move on iOS — debounce it
  document.addEventListener('selectionchange',function(){
    clearTimeout(_debounceTimer);
    _debounceTimer=setTimeout(_checkSelection,300);
  });

  // Also catch mouse selection on desktop
  document.addEventListener('mouseup',function(e){
    if(_toolbar&&_toolbar.contains(e.target)) return;
    clearTimeout(_debounceTimer);
    _debounceTimer=setTimeout(_checkSelection,50);
  });

  // Dismiss toolbar when tapping completely outside verse text AND toolbar
  document.addEventListener('touchstart',function(e){
    if(_toolbar&&_toolbar.contains(e.target)) return;
    var el=e.target;
    while(el&&el!==document.body){
      if(el.classList&&el.classList.contains('verse-text')) return; // tapping in verse — let selectionchange handle it
      el=el.parentElement;
    }
    _removeToolbar();
  },{passive:true});

  document.addEventListener('mousedown',function(e){
    if(_toolbar&&_toolbar.contains(e.target)) return;
    _removeToolbar();
  });

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){ _removeToolbar(); window.getSelection().removeAllRanges(); }
  });

  window._commitHL=function(color){
    if(!_savedRange||!_savedRef) return;
    var text=_savedRange.toString().trim();
    if(!text){_removeToolbar();return;}
    var refId=_savedRef.replace(/[^a-z0-9]/gi,'_');
    var verseEl=document.getElementById(refId);
    var textEl=verseEl&&verseEl.querySelector('.verse-text');
    if(textEl) _wrapTextInElement(textEl,text,color,_savedRef);
    var stored=_getTextHighlights().filter(function(h){return!(h.ref===_savedRef&&h.text===text);});
    stored.push({ref:_savedRef,text:text,color:color,id:Date.now()});
    _saveTextHighlights(stored);
    window.getSelection().removeAllRanges();
    _removeToolbar();
  };

  window._clearHL=function(){
    if(_savedRange){
      var container=_savedRange.commonAncestorContainer;
      var root=(container.nodeType===3?container.parentElement:container);
      var marks=Array.from(root.querySelectorAll?root.querySelectorAll('mark.text-hl'):[]);
      if(root.tagName==='MARK'&&root.classList.contains('text-hl')) marks.unshift(root);
      marks.forEach(function(mark){
        var ref=mark.dataset.hlRef,text=mark.dataset.hlText;
        if(ref&&text) _saveTextHighlights(_getTextHighlights().filter(function(h){return!(h.ref===ref&&h.text===text);}));
        var parent=mark.parentNode;
        while(mark.firstChild) parent.insertBefore(mark.firstChild,mark);
        parent.removeChild(mark);
      });
    }
    window.getSelection().removeAllRanges();
    _removeToolbar();
  };
})();

/* ============================================================
   PANEL LAYERING FIX — definition / Strong's popup always on top
   ------------------------------------------------------------
   #defPopup lives at a low CSS z-index (1000), but the study sheet
   (9000), modals (2000), layer filters (9200) and search drawer
   (9999) all sit above it. So tapping a word — or a Strong's /
   definition link from INSIDE any of those — opened the definition
   BEHIND them. This raises the popup and its overlay above every
   other layer the instant it is shown, using an ever-incrementing
   counter so the most-recently-opened element always wins.
   ============================================================ */
(function(){
  if (window.__defLayerFixInstalled) return;
  window.__defLayerFixInstalled = true;
  window.__zTop = window.__zTop || 100000; // above splash(99999) and every panel
  function raiseDefPopup(){
    var pop = document.getElementById('defPopup');
    var ov  = document.getElementById('defOverlay');
    if(!pop) return;
    if(pop.classList.contains('show')){
      if(ov) ov.style.zIndex = (++window.__zTop);
      pop.style.zIndex = (++window.__zTop); // popup one step above its overlay
    }
  }
  function install(){
    var pop = document.getElementById('defPopup');
    if(!pop) return;
    raiseDefPopup(); // handle the case where it is already open
    new MutationObserver(raiseDefPopup)
      .observe(pop, { attributes:true, attributeFilter:['class'] });
    window.__raiseDefPopup = raiseDefPopup;
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', install);
  } else {
    install();
  }
})();

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

function renderCompanionPassages(book, chapter){
  if(!window.CROSS_SOURCE_MAP) return '';
  const bookData = window.CROSS_SOURCE_MAP[book];
  if(!bookData) return '';
  const chData = bookData[String(chapter)];
  if(!chData || !chData.length) return '';
  let h = '<div class="companion-panel" style="margin-top:18px;padding:14px 16px;background:var(--bg-3);border-left:3px solid var(--gold);border-radius:6px;">';
  h += '<div style="font-size:11px;color:var(--gold);font-weight:700;letter-spacing:0.06em;margin-bottom:8px;">COMPANION PASSAGES (Approved Library)</div>';
  h += '<div style="font-size:12px;color:var(--fg-mute);margin-bottom:10px;">While reading '+escapeHtml(book)+' '+chapter+', these passages from approved external sources speak to the same period or event:</div>';
  for(const ref of chData){
    const src = ref.source;
    h += '<div style="margin:6px 0;padding:8px 10px;background:var(--bg-2);border-radius:4px;line-height:1.55;">';
    if(src === 'enoch'){
      const chListStr = (ref.chapters||[]).join(', ');
      const firstCh = (ref.chapters||[])[0];
      h += '<div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;">';
      h += '<span style="color:var(--gold);font-weight:700;font-size:12px;">1 Enoch &middot; '+escapeHtml(ref.section)+' '+escapeHtml(chListStr)+'</span>';
      if(firstCh){
        h += '<button class="icon-btn" style="font-size:10px;padding:3px 8px;" onclick="openEnochDirect(\''+ref.section+'\','+firstCh+');">Open</button>';
      }
      h += '</div>';
      if(ref.verses) h += '<div style="color:var(--fg-dim);font-size:11px;margin-top:3px;">verses '+escapeHtml(ref.verses)+'</div>';
    } else if(src === 'josephus'){
      h += '<div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;">';
      h += '<span style="color:var(--gold);font-weight:700;font-size:12px;">Josephus &middot; '+escapeHtml(ref.refs||'')+'</span>';
      h += '<button class="icon-btn" style="font-size:10px;padding:3px 8px;" onclick="openJosephusToPassage(\''+escapeHtml(ref.refs||'')+'\');">Open</button>';
      h += '</div>';
    } else if(src === 'peoples'){
      h += '<div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;">';
      h += '<span style="color:var(--people);font-weight:700;font-size:12px;">Peoples of '+escapeHtml(book)+' '+chapter+'</span>';
      h += '</div>';
      // If specific people are listed, render individual tappable buttons for each
      if(ref.people && Array.isArray(ref.people) && ref.people.length){
        h += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">';
        for(const pname of ref.people){
          h += '<button class="icon-btn" style="font-size:11px;padding:4px 10px;background:var(--bg-3);border:1px solid var(--people);color:var(--people);" onclick="showPerson(\''+pname.replace(/\x27/g,"\\\\\x27")+'\')">👤 '+escapeHtml(pname.replace('_NT',''))+'</button>';
        }
        h += '</div>';
      } else {
        h += '<div style="margin-top:6px;"><button class="icon-btn" style="font-size:10px;padding:3px 8px;" onclick="showModal(\'peoples\')">Open Peoples Index</button></div>';
      }
    }
    if(ref.note) h += '<div style="color:var(--fg);font-size:13px;margin-top:5px;">'+escapeHtml(ref.note)+'</div>';
    h += '</div>';
  }
  h += '<div style="font-size:10px;color:var(--fg-dim);margin-top:8px;font-style:italic;">Sources: 1 Enoch (Charles 1917) &middot; Josephus Antiquities (Whiston 1737) &middot; both public domain.</div>';
  h += '</div>';
  return h;
}

// SWRV Chronological Events Panel — shows events anchored to this passage
// SWRV — Place popup (similar to showPerson)
function showPlace(name){
  if(!window.PLACES) return;
  const p = window.PLACES[name];
  if(!p){ showDef(name); return; }
  _lockBodyScroll();
  const popup = document.getElementById('defPopup');
  popup.classList.remove('strongs');
  popup.classList.add('people');
  const html = [];
  html.push('<div class="def-word">📍 ' + escapeHtml(name) + '</div>');

  // Map button — opens Apple Maps on iOS, Google Maps everywhere else
  const coords = window.PLACE_COORDS && window.PLACE_COORDS[name];
  if(coords){
    const q = encodeURIComponent(name + ', biblical site');
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    // Apple Maps uses maps.apple.com; Google Maps works on all platforms
    const googleUrl = 'https://www.google.com/maps/search/?api=1&query=' + coords.lat + ',' + coords.lng + '&query_place_id=' + q;
    const appleUrl  = 'https://maps.apple.com/?q=' + q + '&ll=' + coords.lat + ',' + coords.lng + '&z=10';
    const mapUrl    = isIOS ? appleUrl : googleUrl;
    const noteText  = coords.note ? '<div class="place-map-note">' + escapeHtml(coords.note) + '</div>' : '';
    html.push(
      '<div class="place-map-row">' +
        noteText +
        '<div class="place-map-btns">' +
          '<a class="place-map-btn" href="' + googleUrl + '" target="_blank" rel="noopener">🗺 Google Maps</a>' +
          '<a class="place-map-btn apple" href="' + appleUrl + '" target="_blank" rel="noopener">🍎 Apple Maps</a>' +
        '</div>' +
      '</div>'
    );
  }

  if(p.biblical)  html.push('<div class="def-section"><div class="def-section-label">Biblical</div><div class="def-section-text">'           + escapeHtml(p.biblical)  + '</div></div>');
  if(p.region)    html.push('<div class="def-section"><div class="def-section-label">Region</div><div class="def-section-text">'             + escapeHtml(p.region)    + '</div></div>');
  if(p.geography) html.push('<div class="def-section"><div class="def-section-label">Geography</div><div class="def-section-text">'          + escapeHtml(p.geography) + '</div></div>');
  if(p.kingdom)   html.push('<div class="def-section kingdom-section"><div class="def-section-label">⚜ Kingdom Significance</div><div class="def-section-text">' + escapeHtml(p.kingdom) + '</div></div>');
  if(p.sources)   html.push('<div class="def-section"><div class="def-section-label">Sources</div><div class="def-section-text">'            + escapeHtml(p.sources)   + '</div></div>');
  document.getElementById('defContent').innerHTML = html.join('');
  popup.classList.add('show');
  document.getElementById('defOverlay').classList.add('show');
}

// SWRV — Theme popup
function showTheme(themeKey){
  if(!window.THEMES) return;
  const t = window.THEMES[themeKey];
  if(!t) return;
  _lockBodyScroll();
  const popup = document.getElementById('defPopup');
  popup.classList.remove('people','strongs');
  const html = [];
  html.push('<div class="def-word">🏷️ ' + escapeHtml(t.label) + '</div>');
  if(t.description) html.push('<div class="def-section"><div class="def-section-label">Description</div><div class="def-section-text">' + escapeHtml(t.description) + '</div></div>');
  if(t.key_passages && t.key_passages.length){
    html.push('<div class="def-section"><div class="def-section-label">Key Passages</div><div class="def-section-text">');
    for(const p of t.key_passages){
      html.push('<div style="margin:3px 0;">' + escapeHtml(p) + '</div>');
    }
    html.push('</div></div>');
  }
  document.getElementById('defContent').innerHTML = html.join('');
  popup.classList.add('show');
  document.getElementById('defOverlay').classList.add('show');
}

// SWRV — Parallel passages panel for the current chapter
function renderParallelPassages(book, chapter){
  if(!window.PASSAGE_TO_PARALLELS) return '';
  const keys = [book + ' ' + chapter, book];
  const groupIds = new Set();
  for(const k of keys){
    if(window.PASSAGE_TO_PARALLELS[k]) window.PASSAGE_TO_PARALLELS[k].forEach(id => groupIds.add(id));
  }
  // Also match range strings like "Genesis 1-2" containing current chapter
  for(const passage in window.PASSAGE_TO_PARALLELS){
    if(passage.startsWith(book + ' ') && passage.includes('-')){
      const m = passage.match(/^(.+?)\s+(\d+)-(\d+)/);
      if(m && m[1] === book){
        const start = parseInt(m[2]), end = parseInt(m[3]);
        if(chapter >= start && chapter <= end){
          window.PASSAGE_TO_PARALLELS[passage].forEach(id => groupIds.add(id));
        }
      }
    }
  }
  if(groupIds.size === 0) return '';

  let h = '<div class="companion-panel" style="margin-top:18px;padding:14px 16px;background:var(--bg-3);border-left:3px solid #0891B2;border-radius:6px;">';
  h += '<div style="font-size:11px;color:#0891B2;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">🔄 Parallel passages</div>';
  for(const id of groupIds){
    const group = window.PARALLEL_PASSAGES.find(p => p.id === id);
    if(!group) continue;
    h += '<div class="event-card">';
    h += '<div class="event-card-title">' + escapeHtml(group.title) + '</div>';
    if(group.note) h += '<div style="font-size:12px;color:var(--fg-dim);margin-bottom:6px;line-height:1.5;">' + escapeHtml(group.note) + '</div>';
    h += '<div style="font-size:12px;margin-top:6px;">';
    for(const p of group.passages){
      h += '<span style="display:inline-block;margin:2px 4px 2px 0;padding:3px 9px;background:var(--bg-3);border-radius:3px;color:var(--gold);font-weight:600;">' + escapeHtml(p) + '</span>';
    }
    h += '</div></div>';
  }
  h += '</div>';
  return h;
}

// SWRV — Prophecy/fulfillment panel for current chapter
function renderProphecyLinks(book, chapter){
  if(!window.PASSAGE_TO_PROPHECIES && !window.PASSAGE_TO_FULFILLMENTS) return '';
  const chapterKey = book + ' ' + chapter;
  const matched = new Set();
  // Match exact key + range strings + verse-specific patterns
  const checkMap = (map, asProphecy) => {
    for(const passage in map){
      // Exact chapter match
      if(passage === chapterKey || passage.startsWith(chapterKey + ':')){
        map[passage].forEach(id => matched.add(JSON.stringify({id, asProphecy})));
      }
      // Range
      const rm = passage.match(/^(.+?)\s+(\d+)-(\d+)$/);
      if(rm && rm[1] === book){
        const s = parseInt(rm[2]), e = parseInt(rm[3]);
        if(chapter >= s && chapter <= e){
          map[passage].forEach(id => matched.add(JSON.stringify({id, asProphecy})));
        }
      }
    }
  };
  checkMap(window.PASSAGE_TO_PROPHECIES || {}, true);
  checkMap(window.PASSAGE_TO_FULFILLMENTS || {}, false);

  if(matched.size === 0) return '';
  let h = '<div class="companion-panel" style="margin-top:18px;padding:14px 16px;background:var(--bg-3);border-left:3px solid #7E22CE;border-radius:6px;">';
  h += '<div style="font-size:11px;color:#7E22CE;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">⚡ Prophecy and fulfillment</div>';
  for(const entry of matched){
    const obj = JSON.parse(entry);
    const link = window.PROPHECY_FULFILLMENT.find(p => p.id === obj.id);
    if(!link) continue;
    h += '<div class="event-card">';
    h += '<div class="event-card-title">' + escapeHtml(link.topic) + '</div>';
    h += '<div style="font-size:12px;margin:6px 0;">';
    h += '<div style="margin:3px 0;"><span style="color:#B8860B;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:0.4px;">Prophecy:</span> <strong style="color:var(--gold);">' + escapeHtml(link.prophecy) + '</strong></div>';
    h += '<div style="margin:3px 0;"><span style="color:#059669;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:0.4px;">Fulfillment:</span> <strong style="color:var(--gold);">' + escapeHtml(link.fulfillment) + '</strong></div>';
    h += '</div>';
    if(link.note) h += '<div style="font-size:12px;color:var(--fg-dim);line-height:1.5;margin-top:4px;">' + escapeHtml(link.note) + '</div>';
    h += '</div>';
  }
  h += '</div>';
  return h;
}

function renderChronologicalEvents(book, chapter){
  if(!window.PASSAGE_TO_EVENTS) return '';
  // Two lookup keys: "Book Chapter" and just "Book" — events can anchor at chapter level
  const keys = [book + ' ' + chapter, book];
  const eventIds = new Set();
  for(const k of keys){
    if(window.PASSAGE_TO_EVENTS[k]){
      window.PASSAGE_TO_EVENTS[k].forEach(id => eventIds.add(id));
    }
  }
  // Also check substring match — "Genesis 1" matches an event tagged "Genesis 1-2"
  for(const passage in window.PASSAGE_TO_EVENTS){
    if(passage.startsWith(book + ' ') && passage.includes('-')){
      // Parse range "Genesis 1-2"
      const m = passage.match(/^(.+?)\s+(\d+)-(\d+)/);
      if(m && m[1] === book){
        const start = parseInt(m[2]), end = parseInt(m[3]);
        if(chapter >= start && chapter <= end){
          window.PASSAGE_TO_EVENTS[passage].forEach(id => eventIds.add(id));
        }
      }
    }
  }
  if(eventIds.size === 0) return '';

  let h = '<div class="companion-panel" style="margin-top:18px;padding:14px 16px;background:var(--bg-3);border-left:3px solid #DB2777;border-radius:6px;">';
  h += '<div style="font-size:11px;color:#DB2777;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">🕰️ Chronological events in this passage</div>';

  for(const evId of eventIds){
    const ev = window.CHRONOLOGICAL_EVENTS_BY_ID[evId];
    if(!ev) continue;
    const conf = window.CONFIDENCE_LEVELS && window.CONFIDENCE_LEVELS[ev.confidence.toUpperCase()];
    h += '<div class="event-card">';
    h += '<div class="event-card-title">' + escapeHtml(ev.title) + '</div>';
    h += '<div class="event-card-meta">';
    h += '<span class="event-card-date">' + escapeHtml(ev.date) + '</span>';
    if(conf) h += '<span class="confidence-pill confidence-' + ev.confidence + '" title="' + escapeHtml(conf.description) + '">' + conf.label + '</span>';
    h += '</div>';
    if(ev.notes) h += '<div style="font-size:13px;color:var(--fg);line-height:1.5;margin-bottom:8px;">' + escapeHtml(ev.notes) + '</div>';

    // People
    if(ev.people && ev.people.length){
      h += '<div style="margin-top:6px;font-size:11px;"><span style="color:var(--fg-dim);">People: </span>';
      for(const p of ev.people){
        h += '<button class="icon-btn" style="font-size:11px;padding:2px 8px;margin-right:4px;background:var(--bg-3);border:1px solid var(--people);color:var(--people);" onclick="showPerson(\'' + p.replace(/'/g,"\\'") + '\')">👤 ' + escapeHtml(p.replace('_NT','').replace('_Magdalene','')) + '</button>';
      }
      h += '</div>';
    }

    // Themes
    if(ev.themes && ev.themes.length){
      h += '<div class="event-themes"><span style="color:var(--fg-dim);font-size:11px;">Themes: </span>';
      for(const t of ev.themes){
        h += '<span class="event-theme">' + escapeHtml(t.replace(/_/g,' ')) + '</span>';
      }
      h += '</div>';
    }

    // Source links with category labels
    if(ev.source_links && ev.source_links.length){
      h += '<div style="margin-top:10px;padding-top:8px;border-top:1px dashed var(--line);">';
      h += '<div style="font-size:10px;color:var(--fg-dim);text-transform:uppercase;letter-spacing:0.4px;margin-bottom:6px;">Source links</div>';
      for(const link of ev.source_links){
        const catLabel = link.category ? (Object.values(window.SOURCE_CATEGORIES||{}).find(c=>c.code===link.category)) : null;
        h += '<div style="margin:4px 0;font-size:12px;">';
        if(catLabel) h += '<span style="display:inline-block;margin-right:6px;padding:1px 6px;background:var(--bg-3);border-radius:3px;font-size:10px;color:var(--fg-dim);">' + catLabel.badge + ' ' + catLabel.short + '</span>';
        h += '<strong style="color:var(--gold);">' + escapeHtml(link.source) + '</strong> ' + escapeHtml(link.ref);
        if(link.why) h += '<div style="font-size:11px;color:var(--fg-dim);margin-left:14px;margin-top:2px;">' + escapeHtml(link.why) + '</div>';
        h += '</div>';
      }
      h += '</div>';
    }

    h += '</div>';
  }
  h += '</div>';
  return h;
}

function _populateSuggestionChips(){
  const el = document.getElementById('suggestionChips');
  if(!el || !window.DEFINITIONS) return;
  const wanted = ['love','light','covenant','holy','heart','spirit','peace','life','glory','grace','truth','image','kingdom','sabbath','manna','YHWH','chesed','shalom','yeshuah','ruach','kavod','tzelem','tevah','rachum','mishkan','kapporet','olah','korban','segulah','shabbat','dabar','brit','pasach','matzah','ehyeh asher ehyeh','dam ha-brit','aseret hadibrot','el shaddai','yhwh-nissi'];
  const allKeys = Object.keys(window.DEFINITIONS).filter(k => k && typeof window.DEFINITIONS[k] === 'object');
  const lower = {};
  allKeys.forEach(k => { lower[k.toLowerCase()] = k; });
  const verified = [];
  for(const w of wanted){
    const key = lower[w.toLowerCase()];
    if(key && !verified.includes(key)) verified.push(key);
  }
  if(verified.length < 14){
    for(const k of allKeys){
      if(verified.length >= 14) break;
      if(verified.includes(k)) continue;
      const d = window.DEFINITIONS[k];
      if(d && (d.senses || d.theology || d.def || d.hebrew || d.greek)){
        verified.push(k);
      }
    }
  }
  let html = '<div style="font-weight:600;color:var(--fg);margin-bottom:6px;">Try a suggested word (every one is in this dictionary):</div>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:6px;">';
  for(const k of verified){
    const escaped = k.replace(/'/g,"\\'").replace(/"/g,'&quot;');
    html += '<button class="suggestion-chip" onclick="document.getElementById(\'strongsInput\').value=\''+escaped+'\';strongsSmartLookup()" style="background:var(--bg-3);border:1px solid var(--line);color:var(--fg);padding:4px 10px;border-radius:14px;cursor:pointer;font-size:11px;font-family:inherit;">'+escapeHtml(k)+'</button>';
  }
  html += '</div>';
  html += '<div style="margin-top:10px;font-size:11px;color:var(--fg-dim);">Or <a href="#" onclick="event.preventDefault();closeModal();showModal(\'library\');" style="color:var(--gold);text-decoration:underline;">browse the full library</a> ('+allKeys.length+' deep entries plus Strong\'s + BDB + Enoch + Josephus).</div>';
  el.innerHTML = html;
}

function strongsSmartLookup(){
  const q = document.getElementById('strongsInput').value.trim();
  const out = document.getElementById('strongsLookupResult');
  if(!q){ out.innerHTML=''; return; }
  window._strongsHistory = [];
  
  // Number routing (G/H prefix or bare)
  const grkMatch = q.match(/^[Gg](\d{1,4})$/);
  const hebMatch = q.match(/^[Hh](\d{1,4})$/);
  const bareNum = q.match(/^(\d{1,4})$/);
  if(grkMatch){ document.getElementById('strongsInput').value='G'+grkMatch[1]; renderStrongsEntry('G',grkMatch[1]); return; }
  if(hebMatch){ document.getElementById('strongsInput').value=hebMatch[1]; strongsLookup(); return; }
  if(bareNum){ document.getElementById('strongsInput').value=bareNum[1]; strongsLookup(); return; }
  
  // === UNIFIED DICTIONARY SEARCH ===
  // Searches all 4 dictionaries in parallel:
  //   1. SWRV Deep Definitions (curated, theological)
  //   2. Strong's Hebrew (~8,674 entries)
  //   3. Strong's Greek (~5,523 entries)
  //   4. BDB Hebrew (~9,345 entries)
  // Returns: Hebrew/Greek script + English pronunciation + definitions
  const word = q.toLowerCase();
  const wordRe = new RegExp('\\b' + word.replace(/[.*+?^$()|[\]\\]/g, '\\$&') + '\\b', 'i');
  const results = [];
  
  // 1) SWRV Deep Definitions (highest priority for matches — author's curated)
  if(window.DEFINITIONS){
    for(const key in window.DEFINITIONS){
      const d = window.DEFINITIONS[key];
      if(!d || typeof d !== 'object') continue;
      const blob = (key + ' ' + (d.translit||'') + ' ' + (d.senses?d.senses.join(' '):'') + ' ' + (d.theology||'') + ' ' + (d.visual||'') + ' ' + (d.kingdom||'')).toLowerCase();
      if(blob.includes(word)){
        let score = 30;
        if(key.toLowerCase()===word) score = 350;
        else if(key.toLowerCase().startsWith(word)) score = 180;
        else if(d.translit && d.translit.toLowerCase()===word) score = 280;
        results.push({lang:'D', key, e:d, score});
      }
    }
  }
  
  // 2) Strong's Hebrew — search lemma, xlit, pron, strongs_def, kjv_def
  if(window.STRONGS_HEB){
    for(const num in window.STRONGS_HEB){
      const e = window.STRONGS_HEB[num];
      const xlit = (e.xlit||'').toLowerCase();
      const pron = (e.pron||'').toLowerCase();
      const sdef = (e.strongs_def||e.def||'').toLowerCase();
      const kdef = (e.kjv_def||'').toLowerCase();
      const blob = sdef + ' ' + kdef + ' ' + xlit + ' ' + pron;
      if(blob.includes(word)){
        let score = 10;
        if(wordRe.test(e.strongs_def||e.def||'') || wordRe.test(e.kjv_def||'')) score = 90;
        if(xlit === word) score += 200;
        else if(xlit.startsWith(word)) score += 90;
        if(pron === word) score += 150;
        else if(pron.startsWith(word)) score += 60;
        results.push({lang:'H', num, e, score});
      }
    }
  }
  
  // 3) Strong's Greek
  if(window.STRONGS_GRK){
    for(const num in window.STRONGS_GRK){
      const e = window.STRONGS_GRK[num];
      const xlit = (e.xlit||'').toLowerCase();
      const pron = (e.pron||'').toLowerCase();
      const def = (e.def||'').toLowerCase();
      const kjv = (e.kjv_def||'').toLowerCase();
      const blob = def + ' ' + kjv + ' ' + xlit + ' ' + pron;
      if(blob.includes(word)){
        let score = 10;
        if(wordRe.test(e.def||'') || wordRe.test(e.kjv_def||'')) score = 90;
        if(xlit === word) score += 200;
        else if(xlit.startsWith(word)) score += 90;
        if(pron === word) score += 150;
        else if(pron.startsWith(word)) score += 60;
        results.push({lang:'G', num, e, score});
      }
    }
  }
  
  // 4) BDB Hebrew — gloss, xlit, def
  if(window.BDB_HEB){
    for(const key in window.BDB_HEB){
      const e = window.BDB_HEB[key];
      if(!e || typeof e !== 'object') continue;
      const xlit = (e.xlit||'').toLowerCase();
      const gloss = (e.gloss||'').toLowerCase();
      const def = (e.def||'').toLowerCase();
      const blob = gloss + ' ' + def + ' ' + xlit;
      if(blob.includes(word)){
        let score = 5;
        if(gloss === word) score = 80;
        else if(gloss.startsWith(word)) score = 50;
        if(xlit === word) score += 100;
        results.push({lang:'B', key, e, score});
      }
    }
  }
  
  results.sort((a,b) => b.score - a.score);
  
  if(results.length === 0){
    out.innerHTML = '<p style="color:var(--fg-mute);padding:14px;">No matches for "' + escapeHtml(q) + '" in any dictionary. Try a different word, or browse the full library.</p>';
    return;
  }
  
  // Stats by source
  const counts = {D:0, H:0, G:0, B:0};
  for(const r of results) counts[r.lang]++;
  
  let h = '<div style="font-size:12px;color:var(--fg-dim);margin:8px 0 12px;display:flex;flex-wrap:wrap;gap:8px;">';
  h += '<b>' + results.length + ' match' + (results.length===1?'':'es') + '</b> for "' + escapeHtml(q) + '"';
  if(counts.D) h += ' <span class="source-tab">SWRV Deep: ' + counts.D + '</span>';
  if(counts.H) h += ' <span class="source-tab">Strong\'s Heb: ' + counts.H + '</span>';
  if(counts.G) h += ' <span class="source-tab">Strong\'s Grk: ' + counts.G + '</span>';
  if(counts.B) h += ' <span class="source-tab">BDB: ' + counts.B + '</span>';
  h += '</div>';
  
  const top = results.slice(0, 40);
  for(const r of top){
    if(r.lang === 'D'){
      // SWRV Deep entry
      h += '<div class="strongs-result strongs-clickable" data-deep="' + escapeHtml(r.key) + '" style="border-left-color:var(--gold);">';
      h += '<div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;">';
      if(r.e.hebrew) h += '<span style="font-size:22px;color:var(--gold);font-weight:600;">' + r.e.hebrew + '</span>';
      h += '<span style="color:var(--fg);font-weight:700;font-size:15px;">' + escapeHtml(r.key) + '</span>';
      if(r.e.translit && r.e.translit !== r.key) h += '<span style="color:var(--fg-mute);font-style:italic;">' + escapeHtml(r.e.translit) + '</span>';
      h += '<span style="margin-left:auto;font-size:10px;color:var(--gold);font-weight:700;letter-spacing:0.05em;background:rgba(212,175,55,0.12);padding:2px 8px;border-radius:8px;">SWRV DEEP</span>';
      h += '</div>';
      if(r.e.senses && r.e.senses.length) h += '<div style="color:var(--fg);margin-top:6px;font-size:14px;">' + escapeHtml(r.e.senses[0]) + '</div>';
      h += '</div>';
    } else if(r.lang === 'H' || r.lang === 'G'){
      // Strong's H or G
      h += '<div class="strongs-result strongs-clickable" data-lang="' + r.lang + '" data-num="' + r.num + '">';
      h += '<div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;">';
      const original = r.lang === 'G' ? (r.e.grk || '') : (r.e.lemma || r.e.heb || '');
      h += '<span style="font-size:22px;color:var(--gold);font-weight:600;font-family:serif;">' + original + '</span>';
      if(r.e.xlit) h += '<span style="color:var(--fg);font-weight:600;font-style:italic;">' + escapeHtml(r.e.xlit) + '</span>';
      if(r.e.pron) h += '<span style="color:var(--fg-mute);font-size:12px;">/' + escapeHtml(r.e.pron) + '/</span>';
      const langLabel = r.lang === 'G' ? "STRONG'S GRK" : "STRONG'S HEB";
      h += '<span style="margin-left:auto;font-size:10px;color:var(--strongs);font-weight:700;letter-spacing:0.05em;background:rgba(155,135,210,0.12);padding:2px 8px;border-radius:8px;">' + r.lang + r.num + ' · ' + langLabel + '</span>';
      h += '</div>';
      const def = r.e.strongs_def || r.e.def || '';
      if(def) h += '<div style="color:var(--fg);margin-top:6px;font-size:14px;line-height:1.5;">' + escapeHtml(def) + '</div>';
      if(r.e.kjv_def) h += '<div style="color:var(--fg-mute);margin-top:4px;font-size:12px;"><b>KJV:</b> ' + escapeHtml(r.e.kjv_def) + '</div>';
      h += '</div>';
    } else if(r.lang === 'B'){
      // BDB entry
      h += '<div class="strongs-result strongs-clickable" data-bdb="' + escapeHtml(r.key) + '" style="border-left-color:var(--enoch);">';
      h += '<div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;">';
      if(r.e.lemma) h += '<span style="font-size:22px;color:var(--gold);font-weight:600;font-family:serif;">' + r.e.lemma + '</span>';
      if(r.e.xlit) h += '<span style="color:var(--fg);font-weight:600;font-style:italic;">' + escapeHtml(r.e.xlit) + '</span>';
      if(r.e.gloss) h += '<span style="color:var(--fg-mute);font-size:12px;">"' + escapeHtml(r.e.gloss) + '"</span>';
      h += '<span style="margin-left:auto;font-size:10px;color:var(--enoch);font-weight:700;letter-spacing:0.05em;background:rgba(0,170,200,0.12);padding:2px 8px;border-radius:8px;">' + r.key + ' · BDB</span>';
      h += '</div>';
      if(r.e.def){
        const cleaned = r.e.def.replace(/<BR>.*$/s, '').replace(/<[^>]*>/g, '').replace(/\s*\|\s*/g, ' • ');
        h += '<div style="color:var(--fg);margin-top:6px;font-size:14px;line-height:1.5;">' + escapeHtml(cleaned.substring(0, 320)) + (cleaned.length > 320 ? '...' : '') + '</div>';
      }
      h += '</div>';
    }
  }
  
  if(results.length > 40){
    h += '<div style="text-align:center;color:var(--fg-dim);font-size:12px;padding:14px;">Showing top 40 of ' + results.length + ' matches. Refine your search for more.</div>';
  }
  
  out.innerHTML = h;
  // Wire click handlers for every result card type
  out.querySelectorAll('.strongs-clickable').forEach(function(el){
    el.style.cursor = 'pointer';
    el.addEventListener('click', function(){
      const lang = el.dataset.lang;
      const num  = el.dataset.num;
      const bdb  = el.dataset.bdb;
      const deep = el.dataset.deep;
      if(lang && num){
        renderStrongsEntry(lang, num);
      } else if(bdb){
        // BDB keys are H-prefixed Strong's IDs — showStrongs handles them
        showStrongs(bdb);
      } else if(deep && window.DEFINITIONS && window.DEFINITIONS[deep]){
        // SWRV Deep entry — show via the defPopup
        const d = window.DEFINITIONS[deep];
        const popup = document.getElementById('defPopup');
        popup.classList.remove('people');
        popup.classList.add('strongs');
        const parts = [];
        parts.push('<div class="def-word">' + escapeHtml(deep) + '</div>');
        if(d.hebrew) parts.push('<div class="def-hebrew">' + d.hebrew + '</div>');
        if(d.translit) parts.push('<div class="def-translit">' + escapeHtml(d.translit) + '</div>');
        if(d.senses && d.senses.length){
          parts.push('<div class="def-section"><div class="def-section-label">Senses</div><ul style="margin:6px 0 0 16px;line-height:1.7;">' + d.senses.map(function(s){return '<li>'+escapeHtml(s)+'</li>';}).join('') + '</ul></div>');
        }
        if(d.theology) parts.push('<div class="def-section"><div class="def-section-label">Theological depth</div><div class="def-section-text">'+escapeHtml(d.theology)+'</div></div>');
        if(d.kingdom) parts.push('<div class="def-section"><div class="def-section-label">Kingdom significance</div><div class="def-section-text">'+escapeHtml(d.kingdom)+'</div></div>');
        document.getElementById('defContent').innerHTML = parts.join('');
        popup.classList.add('show');
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

// === CHRONOLOGICAL MASTER READER ===
// Renders the full library — Bible + 1 Enoch + Josephus — in narrative chronological order.
// Each entry tappable: jumps to the Bible chapter, Enoch section, or Josephus passage.
function openChronologicalReader(filterPeriod){
  if(!window.CHRONO_MAP){ alert('Chronological map not loaded'); return; }
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');
  title.textContent = 'Chronological Master — All Sources';
  let h = _libraryBackBtn();
  h += '<p style="font-size:13px;color:var(--fg-mute);margin-bottom:14px;">Every approved source in narrative order. Bible passages, 1 Enoch sections, and Josephus excerpts interleaved as the events unfolded. Reference: Chronological Study Bible (Thomas Nelson). Tap any entry to read that source at the matching point.</p>';
  
  // Period filter buttons
  const periods = [];
  for(const e of window.CHRONO_MAP){ if(!periods.includes(e.period)) periods.push(e.period); }
  h += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;padding:10px;background:var(--surface-elevated);border:0.5px solid var(--hairline);border-radius:10px;">';
  h += '<button class="icon-btn" style="font-size:11px;padding:5px 10px;'+(!filterPeriod?'background:var(--gold);color:#0e0a06;':'')+'" onclick="openChronologicalReader()">All</button>';
  for(const p of periods){
    h += '<button class="icon-btn" style="font-size:11px;padding:5px 10px;'+(filterPeriod===p?'background:var(--gold);color:#0e0a06;':'')+'" onclick="openChronologicalReader(\''+p.replace(/'/g,"\\'")+'\')">' + escapeHtml(p) + '</button>';
  }
  h += '</div>';
  
  // Render entries — group by period
  let currentPeriod = null;
  const entries = filterPeriod ? window.CHRONO_MAP.filter(e => e.period === filterPeriod) : window.CHRONO_MAP;
  for(const e of entries){
    if(e.period !== currentPeriod){
      currentPeriod = e.period;
      h += '<div style="margin-top:22px;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid var(--hairline);">';
      h += '<span style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:var(--gold);text-transform:uppercase;">' + escapeHtml(e.period) + '</span>';
      h += '</div>';
    }
    // Source icon + color
    let icon = '📖', sourceColor = 'var(--gold)';
    if(e.source === 'enoch'){ icon = '📜'; sourceColor = 'var(--gold)'; }
    else if(e.source === 'josephus'){ icon = '🏛️'; sourceColor = 'var(--enoch)'; }
    // Build the click handler based on anchor type
    let clickHandler = '';
    if(e.anchor){
      const a = e.anchor;
      if(a.type === 'bible-chapter'){
        clickHandler = 'closeModal();currentBook=\''+escapeJs(a.book)+'\';loadBook(currentBook.replace(/\\s+/g,\'\'));setTimeout(function(){if(typeof loadChapter===\'function\')loadChapter('+a.chapter+');},120);';
      } else if(a.type === 'enoch'){
        clickHandler = 'openEnochReader(\''+a.section+'\','+(a.chapter||1)+');';
      } else if(a.type === 'source'){
        const search = (a.search || '').replace(/'/g, "\\'");
        clickHandler = 'window._SRC_MODE=window._SRC_MODE||{};window._SRC_MODE[\''+a.key+'\']=\'search\';openSourceReader(\''+a.key+'\');setTimeout(function(){var i=document.getElementById(\'sourceQuery\');if(i){i.value=\''+search+'\';if(typeof searchSource===\'function\')searchSource();}},900);';
      }
    }
    h += '<div class="people-card" style="border-left-color:'+sourceColor+';margin-bottom:8px;cursor:pointer;" onclick="'+clickHandler+'">';
    h += '<div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;">';
    h += '<span style="font-size:16px;">'+icon+'</span>';
    h += '<span style="color:var(--fg);font-weight:600;font-size:14px;flex:1;">'+escapeHtml(e.label)+'</span>';
    h += '<span style="font-size:10px;color:var(--fg-dim);font-weight:600;letter-spacing:0.04em;">'+escapeHtml(e.time||'')+'</span>';
    h += '</div>';
    h += '<div style="font-size:11px;color:var(--fg-mute);margin-top:4px;font-style:italic;">'+escapeHtml(e.ref)+'</div>';
    h += '</div>';
  }
  h += '<div style="margin-top:24px;padding-top:14px;border-top:0.5px solid var(--hairline);font-size:11px;color:var(--fg-dim);">'+window.CHRONO_MAP.length+' chronological waypoints. Bible chapter dates follow standard scholarly conventions. Job placed in the patriarchal era. Prophets dated alongside the historical books they wrote during.</div>';
  body.innerHTML = h;
}

// Helper: safe JS string escape for embedding
function escapeJs(s){
  if(s == null) return '';
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
}

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

// ── Josephus page map ─────────────────────────────────────────────────────────
// Maps each cross-source-map ref string to the correct paginated page index
// (page size = 6000 chars; calculated from josephus-antiquities-full.txt).
// Genesis = Book I, Exodus = Books II-III of Antiquities.
const JOSEPHUS_PAGE_MAP = {
  // Genesis (Book I of Antiquities)
  'Antiquities I.1.1': 37, 'Antiquities I.1.2-3': 37, 'Antiquities I.1.4': 38,
  'Antiquities I.2.1': 39, 'Antiquities I.2.2': 40, 'Antiquities I.3.1': 40,
  'Antiquities I.3.2-3': 40, 'Antiquities I.3.5-6': 41, 'Antiquities I.3.7-8': 42,
  'Antiquities I.4': 43, 'Antiquities I.6': 44, 'Antiquities I.8': 45,
  'Antiquities I.10': 50, 'Antiquities I.11': 47, 'Antiquities I.13': 51,
  'Antiquities I.18': 60, 'Antiquities I.19': 55,
  // Exodus — Book II
  'Antiquities II.2': 61, 'Antiquities II.4': 63, 'Antiquities II.5': 67,
  'Antiquities II.7': 71, 'Antiquities II.8': 73,
  'Antiquities II.9.1-2': 75, 'Antiquities II.9.3-11': 77,
  'Antiquities II.12': 81, 'Antiquities II.13': 82,
  'Antiquities II.14': 85, 'Antiquities II.15-16': 85,
  // Leviticus / Numbers — Book III
  'Antiquities III.1': 89, 'Antiquities III.5': 80, 'Antiquities III.5.5-8': 95,
  'Antiquities III.5.7': 95, 'Antiquities III.6': 94, 'Antiquities III.8': 94,
  'Antiquities III.8.7': 94, 'Antiquities III.9': 102, 'Antiquities III.9.1': 102,
  'Antiquities III.9.2': 102, 'Antiquities III.9.3': 102, 'Antiquities III.9.4': 102,
  'Antiquities III.10': 106, 'Antiquities III.12': 111, 'Antiquities III.14': 109,
  // Deuteronomy — Book IV
  'Antiquities IV.2': 121, 'Antiquities IV.6': 119, 'Antiquities IV.8': 132,
  // Joshua — Book V
  'Antiquities V.1': 138, 'Antiquities V.2': 147, 'Antiquities V.5': 152,
  'Antiquities V.6': 153, 'Antiquities V.8': 157, 'Antiquities V.9': 160,
  'Antiquities V.10': 162,
  // Samuel — Book VI
  'Antiquities VI.3': 168, 'Antiquities VI.8': 172, 'Antiquities VI.9': 178,
  // David — Book VII
  'Antiquities VII.3': 200, 'Antiquities VII.4': 183, 'Antiquities VII.7': 206,
  'Antiquities VII.14': 222,
  // Solomon / Kings — Book VIII
  'Antiquities VIII.2': 230, 'Antiquities VIII.3': 234, 'Antiquities VIII.4': 238,
  'Antiquities VIII.6': 240, 'Antiquities VIII.13': 252, 'Antiquities VIII.15': 269,
  // Divided Kingdom — Book IX
  'Antiquities IX.1': 263, 'Antiquities IX.2': 266, 'Antiquities IX.4': 272,
  'Antiquities IX.8': 274, 'Antiquities IX.9': 275, 'Antiquities IX.10': 276,
  'Antiquities IX.11': 278,
  // Later Kings / Prophets — Book X
  'Antiquities X.1': 285, 'Antiquities X.4': 300, 'Antiquities X.5': 288,
  'Antiquities X.7': 306, 'Antiquities X.8': 295, 'Antiquities X.10': 308,
  // Persian period — Book XI
  'Antiquities XI.1': 299, 'Antiquities XI.4': 308, 'Antiquities XI.5': 310,
  'Antiquities XI.6': 314,
  // NT historical context — Books XVII-XX
  'Antiquities XVII.8': 497, 'Antiquities XVII.10': 500, 'Antiquities XVII.13': 502,
  'Antiquities XVIII.1': 510, 'Antiquities XVIII.3': 507, 'Antiquities XVIII.4': 505,
  'Antiquities XVIII.5': 525, 'Antiquities XIX.8': 552,
  'Antiquities XX.8': 564, 'Antiquities XX.9': 566,
};

/**
 * openJosephusToPassage(refs)
 * Opens the Josephus source reader and jumps directly to the page containing
 * the specified passage reference (e.g. "Antiquities I.1.1").
 * Falls back to page 37 (Book I, Chapter I) when the ref is unrecognised.
 */
async function openJosephusToPassage(refs) {
  _lockBodyScroll();
  document.getElementById('modal').classList.add('show');
  // Determine target page
  const page = JOSEPHUS_PAGE_MAP[refs] || JOSEPHUS_PAGE_MAP['Antiquities ' + refs] || 37;
  window._SRC_MODE['josephus'] = 'read';
  window._SRC_PAGE['josephus'] = page;
  await openSourceReader('josephus');
}

/**
 * openEnochDirect(section, chapter)
 * Opens the modal and jumps straight to the specified Enoch section + chapter,
 * without the fragile showModal('library') + setTimeout pattern.
 */
function openEnochDirect(section, chapter) {
  _lockBodyScroll();
  document.getElementById('modal').classList.add('show');
  openEnochReader(section, chapter);
}
// ─────────────────────────────────────────────────────────────────────────────
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
    const book = window.currentBook || 'Genesis';
    title.textContent = book+' — The Story Behind The Story';
    if(book === 'Genesis'){
      // Genesis has the full curated story sections
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
    } else {
      // Other books — render the per-book overview from BIBLE_INDEX + deep build metadata
      body.innerHTML = _renderBookOverview(book);
    }
  }else if(type==='strongs'){
    title.textContent='SWRV Deep Dictionary';
    window._strongsHistory=[];
    let h='<div class="howto-box">';
    h+='<div class="howto-label">HOW TO USE</div>';
    h+='<div style="font-size:13px;color:var(--fg);line-height:1.5;"><b>Type any English word.</b> Searches the whole library at once: <b>SWRV Deep</b> (curated theological dictionary), <b>Strong\'s Hebrew</b> (8,674 entries), <b>Strong\'s Greek</b> (5,523 entries), and <b>BDB Hebrew Lexicon</b> (~9,345 entries). Each result shows the Hebrew/Greek script, English pronunciation, and definitions. Click any result to see the full meaning. Use <b>Back</b> to return.</div>';
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
    // === Chronological Master entry — at the top, prominent ===
    h+='<h4 style="color:var(--gold);margin-top:12px;">⏳ Chronological Master</h4>';
    h+='<div style="display:grid;gap:8px;">';
    h+='<div class="people-card" style="border-left-color:var(--gold);background:linear-gradient(180deg,rgba(212,175,55,0.08),var(--surface-elevated));" onclick="openChronologicalReader()">';
    h+='<div class="people-card-name" style="color:var(--gold);">⏳ Read All Sources in Chronological Order</div>';
    h+='<div style="color:var(--fg-mute);font-size:12px;margin-top:4px;">100 waypoints from Pre-Creation through Revelation</div>';
    h+='<div style="color:var(--fg-dim);font-size:12px;margin-top:4px;">Bible + 1 Enoch + Josephus interleaved as events unfolded. Tap any waypoint to jump directly into that source. Reference: Chronological Study Bible (Thomas Nelson).</div>';
    h+='</div>';
    h+='</div>';
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
    // Sources has been merged into Library (v26). Redirect.
    setTimeout(function(){showModal('library');}, 0);
    return;
  }else if(type==='audit'){
    title.textContent='SWRV Kingdom Bible — Source Coverage Audit';
    let auditHtml = '';

    // === SECTION 1: Source coverage stats ===
    auditHtml += '<h4 style="color:var(--gold);margin-top:0;">📊 What is connected</h4>';
    auditHtml += '<p style="font-size:12px;color:var(--fg-dim);">Live counts across all 66 books. Every claim in this app must trace to a source in the approved library (Rule 06).</p>';

    // Count things live
    let totalVerses = 0, withBSB = 0, withKJV = 0, withClickable = 0, withPeople = 0, withKL = 0;
    let totalClickables = 0, totalPeople = 0;
    let withStrongsTags = 0, totalStrongsTags = 0;
    const allBooks = [];
    if(window.GENESIS) allBooks.push(window.GENESIS);
    if(window.BIBLE) for(const slug in window.BIBLE) allBooks.push(window.BIBLE[slug]);
    for(const bookData of allBooks){
      for(const ch in bookData){
        for(const vn in bookData[ch].verses){
          const v = bookData[ch].verses[vn];
          totalVerses++;
          if(v.sources && v.sources.BSB) withBSB++;
          if(v.sources && v.sources.KJV) withKJV++;
          if(v.definableWords && v.definableWords.length){ withClickable++; totalClickables += v.definableWords.length; }
          if(v.peopleInVerse && v.peopleInVerse.length){ withPeople++; totalPeople += v.peopleInVerse.length; }
          if(v.kingdomLens) withKL++;
          if(v.strongsTags && v.strongsTags.length){ withStrongsTags++; totalStrongsTags += v.strongsTags.length; }
        }
      }
    }
    const pct = n => (100*n/totalVerses).toFixed(1)+'%';

    auditHtml += '<div class="audit-stat-grid">';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+totalVerses.toLocaleString()+'</div><div class="audit-stat-label">Verses processed</div></div>';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+withBSB.toLocaleString()+'</div><div class="audit-stat-label">BSB modern text ('+pct(withBSB)+')</div></div>';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+withKJV.toLocaleString()+'</div><div class="audit-stat-label">KJV preserved ('+pct(withKJV)+')</div></div>';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+totalClickables.toLocaleString()+'</div><div class="audit-stat-label">Clickable terms tagged</div></div>';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+totalPeople.toLocaleString()+'</div><div class="audit-stat-label">Person tags</div></div>';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+withKL+'</div><div class="audit-stat-label">Kingdom Lens panels</div></div>';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+Object.keys(window.DEFINITIONS||{}).length+'</div><div class="audit-stat-label">Deep definitions</div></div>';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+Object.keys(window.PEOPLES||{}).length+'</div><div class="audit-stat-label">People profiles</div></div>';
    // Count cross-source entries
    let csmCount = 0;
    if(window.CROSS_SOURCE_MAP){
      for(const b in window.CROSS_SOURCE_MAP) for(const c in window.CROSS_SOURCE_MAP[b]) csmCount += window.CROSS_SOURCE_MAP[b][c].length;
    }
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+csmCount+'</div><div class="audit-stat-label">Cross-source links</div></div>';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+(window.CHRONOLOGICAL_EVENTS||[]).length+'</div><div class="audit-stat-label">Chronological events</div></div>';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+withStrongsTags.toLocaleString()+'</div><div class="audit-stat-label">Verses with Strong\'s tags ('+pct(withStrongsTags)+')</div></div>';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+totalStrongsTags.toLocaleString()+'</div><div class="audit-stat-label">Word→Strong\'s links</div></div>';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+(window.PARALLEL_PASSAGES||[]).length+'</div><div class="audit-stat-label">Parallel passage groups</div></div>';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+(window.PROPHECY_FULFILLMENT||[]).length+'</div><div class="audit-stat-label">Prophecy/fulfillment pairs</div></div>';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+Object.keys(window.PLACES||{}).length+'</div><div class="audit-stat-label">Places database</div></div>';
    auditHtml += '<div class="audit-stat"><div class="audit-stat-num"><span class="audit-stat-check">✓</span>'+Object.keys(window.THEMES||{}).length+'</div><div class="audit-stat-label">Biblical themes</div></div>';
    auditHtml += '</div>';

    // === SECTION 2: Source category breakdown ===
    auditHtml += '<h4 style="color:var(--gold);margin-top:24px;">🏷️ Source categories in use (Rule 06 — no blurring)</h4>';
    auditHtml += '<p style="font-size:12px;color:var(--fg-dim);">Every source declares its category. Canonical Scripture is the spine; everything else is supporting material.</p>';
    auditHtml += '<table style="margin-top:12px;"><thead><tr><th>Badge</th><th>Category</th><th>Sources</th><th>License</th></tr></thead><tbody>';
    if(window.SOURCE_CATEGORIES && window.SOURCES){
      for(const catKey in window.SOURCE_CATEGORIES){
        const cat = window.SOURCE_CATEGORIES[catKey];
        const sources = Object.entries(window.SOURCES).filter(([k,v]) => v.category === cat.code);
        if(sources.length === 0) continue;
        auditHtml += '<tr>';
        auditHtml += '<td style="font-size:18px;">'+cat.badge+'</td>';
        auditHtml += '<td><strong style="color:var(--gold);">'+cat.label+'</strong><div style="font-size:11px;color:var(--fg-dim);margin-top:2px;">'+escapeHtml(cat.description)+'</div></td>';
        auditHtml += '<td>'+sources.map(([k,v])=>v.short).join(', ')+'</td>';
        auditHtml += '<td style="font-size:10px;color:var(--fg-dim);">'+sources.map(([k,v])=>escapeHtml(v.license||'—')).join('<br><br>')+'</td>';
        auditHtml += '</tr>';
      }
    }
    auditHtml += '</tbody></table>';

    // === SECTION 3: BSB attribution ===
    auditHtml += '<h4 style="color:var(--gold);margin-top:24px;">📜 BSB attribution (per license)</h4>';
    auditHtml += '<p style="font-size:12px;background:var(--bg-3);padding:10px 14px;border-radius:6px;line-height:1.5;">'+escapeHtml(window.BSB_ATTRIBUTION || '')+'</p>';

    // === SECTION 4: Chronological events list ===
    auditHtml += '<h4 style="color:var(--gold);margin-top:24px;">🕰️ Chronological events with confidence labels</h4>';
    auditHtml += '<p style="font-size:12px;color:var(--fg-dim);">Each event anchored to canonical passages, with date confidence and source links.</p>';
    auditHtml += '<table><thead><tr><th>Event</th><th>Date</th><th>Confidence</th><th>Passages</th></tr></thead><tbody>';
    for(const ev of (window.CHRONOLOGICAL_EVENTS||[])){
      auditHtml += '<tr>';
      auditHtml += '<td><strong>'+escapeHtml(ev.title)+'</strong></td>';
      auditHtml += '<td style="font-size:11px;">'+escapeHtml(ev.date)+'</td>';
      auditHtml += '<td><span class="confidence-pill confidence-'+ev.confidence+'">'+ev.confidence+'</span></td>';
      auditHtml += '<td style="font-size:11px;">'+(ev.passages||[]).join(', ')+'</td>';
      auditHtml += '</tr>';
    }
    auditHtml += '</tbody></table>';

    // === SECTION 5: Per-book verse count (the original Genesis audit, preserved) ===
    auditHtml += '<h4 style="color:var(--gold);margin-top:24px;">📖 Genesis verse count (original deep build)</h4>';
    auditHtml += '<p style="font-size:12px;color:var(--fg-dim);">JPS follows Hebrew Masoretic numbering. Christian Bible Genesis 31:55 = our Genesis 32:1.</p>';
    auditHtml += '<p><b>Total verses in Genesis:</b> '+(window.AUDIT_TOTAL||'—')+' (full Hebrew Genesis)</p>';
    auditHtml += '<table><thead><tr><th>Ch</th><th>Verses</th><th>Title</th></tr></thead><tbody>';
    for(let i=1;i<=50;i++){
      const ch=window.GENESIS && window.GENESIS[i];
      const chTitle=ch?ch.title.replace(/^Genesis \d+ — /,''):'';
      auditHtml+='<tr><td>'+i+'</td><td>'+((window.AUDIT||{})[i]||'—')+'</td><td>'+escapeHtml(chTitle)+'</td></tr>';
    }
    auditHtml += '</tbody></table>';

    body.innerHTML=auditHtml;
  }
  if(type==='memory'){
    title.textContent='📌 Memory';
    const bms=_getBookmarks();
    const notesObj=_getNotes();
    const noteEntries=Object.entries(notesObj);
    let h='<div style="display:flex;gap:0;margin-bottom:16px;border-bottom:1px solid var(--line);">';
    h+='<button id="memTabBtnBm" onclick="document.getElementById(\'memTabBm\').style.display=\'\';document.getElementById(\'memTabNotes\').style.display=\'none\';document.getElementById(\'memTabBtnBm\').classList.add(\'mem-tab-active\');document.getElementById(\'memTabBtnNotes\').classList.remove(\'mem-tab-active\');" class="mem-tab mem-tab-active">🔖 Bookmarks ('+bms.length+')</button>';
    h+='<button id="memTabBtnNotes" onclick="document.getElementById(\'memTabBm\').style.display=\'none\';document.getElementById(\'memTabNotes\').style.display=\'\';document.getElementById(\'memTabBtnNotes\').classList.add(\'mem-tab-active\');document.getElementById(\'memTabBtnBm\').classList.remove(\'mem-tab-active\');" class="mem-tab">📝 Notes ('+noteEntries.length+')</button>';
    h+='</div>';
    h+='<div id="memTabBm">';
    if(!bms.length){h+='<div style="padding:12px 0;"><p style="color:var(--fg);font-size:14px;margin-bottom:10px;">Nothing saved yet.</p><div style="background:var(--bg-3);border-radius:8px;padding:14px 16px;font-size:13px;color:var(--fg-mute);line-height:1.7;"><b style="color:var(--fg);">To bookmark a verse:</b><br>Scroll to any verse → tap the <b style="color:var(--gold);">🔖</b> button beneath it. It turns gold when saved. Tap again to remove.<br><br><b style="color:var(--fg);">To highlight text:</b><br>Long-press any word in a verse → drag the handles to select a phrase → a color bar appears above your selection → tap a color.<br><br><b style="color:var(--fg);">To add a note:</b><br>Tap the <b>📝 Note</b> button beneath any verse → type your note → Save.</div></div>';}

    else{bms.slice().reverse().forEach(function(bm){
      h+='<div class="mem-item" onclick="closeModal();_loadSavedPosition(\''+bm.book.replace(/'/g,"\\'")+'\','+bm.chapter+');">';
      h+='<div class="mem-item-ref">'+escapeHtml(bm.ref)+'</div>';
      h+='<div class="mem-item-text">'+escapeHtml((bm.text||'').substring(0,110))+'…</div>';
      h+='</div>';
    });}
    h+='</div>';
    h+='<div id="memTabNotes" style="display:none;">';
    if(!noteEntries.length){h+='<p style="color:var(--fg-mute);padding:8px 0;">No notes yet. Beneath any verse tap <b>📝 Note</b> → write your note → Save. It will appear here.</p>';}
    else{noteEntries.forEach(function(entry){
      const nRef=entry[0],nText=entry[1];
      h+='<div class="mem-item" onclick="closeModal();openNote(\''+nRef.replace(/'/g,"\\'")+'\');">';
      h+='<div class="mem-item-ref">'+escapeHtml(nRef)+'</div>';
      h+='<div class="mem-item-text">'+escapeHtml(nText.substring(0,120))+'</div>';
      h+='</div>';
    });}
    h+='</div>';
    body.innerHTML=h;
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

if(typeof applyStudyLayerMode==='function') applyStudyLayerMode(window._studyLayerMode);
// Smart init: new users start at Genesis 1. Returning users resume instantly.
// Always route through _loadBookScript so data is guaranteed loaded before render.
(function(){
  var _firstVisit=!localStorage.getItem('swrv_has_visited');
  if(_firstVisit){
    localStorage.setItem('swrv_has_visited','1');
    currentBook='Genesis';window.currentBook='Genesis';
    if(typeof _updateBookContext==='function')_updateBookContext();
    currentChapter=1;currentVerse=1;
    if(bookSelect)bookSelect.value='Genesis';
    if(typeof populateChapterSelect==='function')populateChapterSelect();
    if(typeof populateVerseSelect==='function')populateVerseSelect();
    _loadChapterCore(1);
    return;
  }
  // Returning user — show a resume pill while loading
  var _resumeBookInfo=window.BIBLE_INDEX&&window.BIBLE_INDEX.find(function(b){return b.slug===currentBook;});
  var _resumeLabel=(_resumeBookInfo&&_resumeBookInfo.display||currentBook)+' '+currentChapter;
  var _pill=document.createElement('div');
  _pill.id='resumePill';
  _pill.innerHTML='<span>📖 Resuming <b>'+_resumeLabel+'</b>…</span>';
  _pill.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--bg-2);border:1px solid var(--gold);border-radius:999px;padding:10px 20px;font-size:13px;color:var(--fg);z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.5);pointer-events:none;transition:opacity .4s;white-space:nowrap;';
  document.body.appendChild(_pill);
  function _dismissPill(){ _pill.style.opacity='0'; setTimeout(function(){if(_pill.parentNode)_pill.parentNode.removeChild(_pill);},400); }

  // Update nav controls then load the book script (guaranteed async-safe)
  if(bookSelect)bookSelect.value=currentBook;
  if(typeof populateChapterSelect==='function')populateChapterSelect();
  if(typeof populateVerseSelect==='function')populateVerseSelect();

  _loadBookScript(currentBook,function(){
    if(typeof _updateBookContext==='function'){window.currentBook=currentBook;_updateBookContext();}
    _loadChapterCore(currentChapter);
    _dismissPill();
  });
})();
// Initialize mobile nav state: on phone widths, collapse the Book/Chapter/Verse
// controls into a one-line summary; on desktop, this is a no-op.
if(typeof initMobileNavState==='function') initMobileNavState();

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

function _renderBookOverview(book){
  const meta = (window.BIBLE_INDEX||[]).find(b=>b.slug===book);
  if(!meta) return '<p>Book metadata not found.</p>';
  let h = '<div style="line-height:1.65;">';
  h += '<div style="font-size:13px;color:var(--fg-mute);margin-bottom:14px;">'+escapeHtml(meta.testament==='OT'?'Old Testament':'New Testament')+' · '+meta.chapters+' chapter'+(meta.chapters===1?'':'s')+'</div>';
  
  // Per-book overview text — short curated where available, generic where not
  const overviews = {
    'Exodus': "Exodus picks up the day after Genesis ends. Joseph's body lies in Egypt. The 70 souls of his family have multiplied into a nation under a new pharaoh who didn't know Joseph. The book covers four hundred years of bondage, the rise of Moses, the ten plagues against Egypt's pantheon, the Passover lamb, the parting of the Red Sea, the giving of the Ten Commandments at Sinai, the golden calf, and the building of the tabernacle. By the last chapter, God's glory fills the tent. He has come down to live with His people. The story of God dwelling with humans, from this point forward, will be the story the rest of the Bible tells.",
    'Leviticus': "Leviticus is the priest's manual. It opens the day after Exodus ends. The tabernacle is built. God's glory has filled it. Now the people need to know how to approach Him without dying. The five offerings (burnt, grain, peace, sin, trespass), the consecration of Aaron's priesthood, the laws of clean and unclean, the climactic Day of Atonement (Yom Kippur), the Holiness Code, the feasts, the Sabbath year, the Year of Jubilee, the blessings and curses. Hebrews 9-10 reads the whole book as a shadow of Christ's once-for-all sacrifice. The word 'kadosh' (holy) appears in Leviticus more than any other book.",
    'Numbers': "Numbers covers Israel's forty years in the wilderness between Sinai and the borders of the promised land. The book is named for the two military censuses (numbering) of the people that bookend it. In between: the daily march, the manna, the murmuring, the rebellions, the bronze serpent, Balaam's blessing instead of curse, and the slow generational replacement of the unbelieving wilderness generation by the children who will actually enter the land. Hebrews 3-4 reads Numbers as a warning against unbelief.",
    'Deuteronomy': "Deuteronomy is Moses' farewell sermon to the next generation — the children of the wilderness generation, about to cross the Jordan into the land. Moses reviews the law, retells the history, restates the Ten Commandments, gives the Shema ('Hear, O Israel — YHWH our God, YHWH is one'), lays out the blessings of obedience and the curses of disobedience, sees the land from Mount Nebo, and dies. The most quoted Old Testament book in the New Testament. Jesus quotes Deuteronomy three times against Satan in the wilderness temptation."
  };
  
  if(overviews[book]){
    h += '<p style="margin-bottom:14px;">'+overviews[book]+'</p>';
  } else {
    h += '<p style="margin-bottom:14px;color:var(--fg-mute);">A curated story overview for '+escapeHtml(book)+' is queued for the build. For now, this book is fully readable verse-by-verse. Use the chapter selector or book selector to navigate.</p>';
  }
  
  // List chapters
  h += '<h4 style="color:var(--gold);margin-top:18px;">Chapters in '+escapeHtml(book)+'</h4>';
  h += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">';
  for(let i=1; i<=meta.chapters; i++){
    h += '<button class="icon-btn" style="min-width:50px;font-size:12px;" onclick="closeModal();_loadBookScript(\''+book+'\',function(){loadChapter('+i+');})">Ch '+i+'</button>';
  }
  h += '</div>';
  
  h += '</div>';
  return h;
}

// ====================================================================
// SWRV UX OVERHAUL — Reading Modes + Unified Study Sheet + Layer Filters
// ====================================================================
// Three-mode reading model:
//   read    = clean Bible text only; inline study boxes hidden; verses
//             get a small [Study] chip; tap chip opens the study sheet.
//   study   = default for desktop; study chips visible; inline cards still
//             hidden by default; study sheet is the primary depth surface.
//   scholar = inline cards visible too; for maximum source depth.
//
// The sheet renders as a bottom drawer on mobile (≤680px) and a side panel
// on desktop. Same DOM, swapped by CSS. Eight tabs sourced from existing
// project data (no new content needed; no duplication of cards).

(function(){
  const RM_KEY = 'swrv_reading_mode';
  const LF_KEY = 'swrv_layer_filters';
  // Default layer-filter state. Keys map to study-sheet tab/section IDs.
  const LF_DEFAULTS = {
    define:true, original:true, translations:true, culture:true,
    kingdom:true, people:true, sources:true, crossrefs:true,
    amp:true, lxx:true, tanakh:true, josephus:true, enoch:true,
    instruction:true, appearance:true
  };

  function getReadingMode(){
    try { return localStorage.getItem(RM_KEY) || _defaultReadingMode(); } catch(e){ return _defaultReadingMode(); }
  }
  function _defaultReadingMode(){
    const isMobile = window.matchMedia && window.matchMedia('(max-width: 680px)').matches;
    return isMobile ? 'read' : 'study';
  }
  function getLayerFilters(){
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(LF_KEY)||'null'); } catch(e){}
    return Object.assign({}, LF_DEFAULTS, saved||{});
  }
  function saveLayerFilters(lf){
    try { localStorage.setItem(LF_KEY, JSON.stringify(lf)); } catch(e){}
  }

  function setReadingMode(mode){
    if(!['read','study','scholar'].includes(mode)) mode='study';
    try { localStorage.setItem(RM_KEY, mode); } catch(e){}
    document.body.setAttribute('data-reading-mode', mode);
    // Keep legacy classes synced so older CSS still works
    document.body.classList.toggle('reader-focus', mode==='read');
    document.body.classList.toggle('study-focus', mode==='study' || mode==='scholar');
    document.body.classList.toggle('scholar-focus', mode==='scholar');
    // Mark the mode button
    ['read','study','scholar'].forEach(m=>{
      const b = document.getElementById('readingMode'+m.charAt(0).toUpperCase()+m.slice(1));
      if(b){ b.classList.toggle('active', m===mode); b.setAttribute('aria-pressed', m===mode?'true':'false'); }
    });
  }
  window.setReadingMode = setReadingMode;
  // Keep legacy toggleStudyLayers as a 2-state shortcut between read and study.
  window.toggleStudyLayers = function(){
    setReadingMode(document.body.getAttribute('data-reading-mode')==='read' ? 'study' : 'read');
  };

  // ---------- Layer filters popover ----------
  function renderLayerFiltersList(){
    const lf = getLayerFilters();
    const list = document.getElementById('layerFiltersList');
    if(!list) return;
    const items = [
      ['define','Definitions'],
      ['original','Original Language'],
      ['translations','Translation Comparison'],
      ['amp','AMP'],
      ['tanakh','Tanakh'],
      ['lxx','LXX'],
      ['josephus','Josephus'],
      ['enoch','Enoch'],
      ['culture','Cultural Context'],
      ['kingdom','Kingdom Lens'],
      ['people','People / Places'],
      ['appearance','Appearance / Geography'],
      ['sources','Outside Sources'],
      ['crossrefs','Cross References'],
      ['instruction','Instruction Classification']
    ];
    list.innerHTML = items.map(function(it){
      const checked = lf[it[0]]!==false;
      return '<label class="layer-filter-row"><input type="checkbox" data-lf="'+it[0]+'" '+(checked?'checked':'')+'> '+it[1]+'</label>';
    }).join('');
    list.querySelectorAll('input[data-lf]').forEach(function(cb){
      cb.addEventListener('change', function(){
        const cur = getLayerFilters();
        cur[cb.getAttribute('data-lf')] = cb.checked;
        saveLayerFilters(cur);
        // If the sheet is open, re-render the current tab so changes take effect.
        if(document.body.classList.contains('study-sheet-open')){
          const active = document.querySelector('.study-tab.active');
          if(active) switchStudyTab(active.getAttribute('data-tab'));
        }
      });
    });
  }
  window.toggleLayerFilters = function(){
    const pop = document.getElementById('layerFiltersPopover');
    const bd = document.getElementById('layerFiltersBackdrop');
    if(!pop) return;
    const open = pop.getAttribute('aria-hidden')==='false';
    if(open){
      pop.setAttribute('aria-hidden','true'); pop.classList.remove('open');
      if(bd){ bd.classList.remove('open'); bd.setAttribute('aria-hidden','true'); }
    } else {
      renderLayerFiltersList();
      pop.setAttribute('aria-hidden','false'); pop.classList.add('open');
      if(bd){ bd.classList.add('open'); bd.setAttribute('aria-hidden','false'); }
    }
  };
  // Close Layers on Escape; close on click-outside the popover (already
  // handled by the backdrop's onclick, but covers desktop top-right popover).
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape'){
      const pop = document.getElementById('layerFiltersPopover');
      if(pop && pop.classList.contains('open')) window.toggleLayerFilters();
    }
  });
  document.addEventListener('click', function(e){
    const pop = document.getElementById('layerFiltersPopover');
    const trigger = document.getElementById('layerFiltersBtn');
    if(!pop || !pop.classList.contains('open')) return;
    // Don't close if the click is inside the popover or on its trigger button.
    if(pop.contains(e.target) || (trigger && trigger.contains(e.target))) return;
    // Don't close if the click hit the backdrop (the backdrop has its own onclick).
    const bd = document.getElementById('layerFiltersBackdrop');
    if(bd && bd.contains(e.target)) return;
    window.toggleLayerFilters();
  });
  window.resetLayerFilters = function(){
    saveLayerFilters(Object.assign({}, LF_DEFAULTS));
    renderLayerFiltersList();
  };
  // Bulk toggles required by the audit spec. Each layer-filter key is a
  // boolean; `selectAll` sets every known layer to true, `deselectAll` to
  // false. Re-renders the popover so the checkboxes reflect new state.
  function _applyLayerFiltersBulk(value){
    const list = document.getElementById('layerFiltersList');
    if(!list) return;
    const next = getLayerFilters();
    const keys = ['define','original','translations','amp','tanakh','lxx','josephus','enoch','culture','kingdom','people','appearance','sources','crossrefs','instruction'];
    for(const k of keys) next[k] = value;
    saveLayerFilters(next);
    renderLayerFiltersList();
    if(document.body.classList.contains('study-sheet-open')){
      const active = document.querySelector('.study-tab.active');
      if(active) switchStudyTab(active.getAttribute('data-tab'));
    }
  }
  window.selectAllLayerFilters = function(){ _applyLayerFiltersBulk(true); };
  window.deselectAllLayerFilters = function(){ _applyLayerFiltersBulk(false); };

  // ---------- Study Sheet ----------
  // Holds the currently-open verse context. Populated by openStudySheet.
  window._studySheetState = { ref:null, book:null, chapter:null, verse:null, verseData:null, focusWord:null };

  function _getVerseData(book, ch, vn){
    // Genesis lives in window.GENESIS; everything else in window.BIBLE[slug].
    if(book==='Genesis' && window.GENESIS) return (window.GENESIS[ch] && window.GENESIS[ch].verses) ? window.GENESIS[ch].verses[vn] : null;
    if(window.BIBLE && window.BIBLE[book] && window.BIBLE[book][ch] && window.BIBLE[book][ch].verses) return window.BIBLE[book][ch].verses[vn];
    return null;
  }

  function parseRef(ref){
    // "Galatians 5:21" → {book:'Galatians', ch:5, v:21}
    if(!ref) return null;
    const m = ref.match(/^(.+)\s+(\d+):(\d+)$/);
    if(!m) return null;
    return { book: m[1].replace(/\s+/g,''), ch: parseInt(m[2],10), v: parseInt(m[3],10) };
  }

  function _tabHasData(tab, state, v){
    if(!v) return false;
    const tryKeys = [state.ref, state.book+' '+state.chapter+':'+state.verse, state.book+' '+state.chapter];
    function keyHit(obj){ if(!obj) return false; for(var k in obj){ for(var i=0;i<tryKeys.length;i++){ if(_keyMatchesRef(k,tryKeys[i])) return true; } } return false; }
    switch(tab){
      case 'culture':
        return !!(v.cultural || (v.variants&&v.variants.length) || keyHit(window.CULTURAL_CARDS));
      case 'kingdom':
        return !!(v.kingdomLens || keyHit(window.INSTRUCTION_CARDS));
      case 'people':
        return !!((v.peopleInVerse&&v.peopleInVerse.length) || (v.placesInVerse&&v.placesInVerse.length));
      case 'sources':
        if(v.enochRef||v.josephusRef) return true;
        if(window.CROSS_SOURCE_MAP&&window.CROSS_SOURCE_MAP[state.book]&&window.CROSS_SOURCE_MAP[state.book][state.chapter]) return true;
        return false;
      case 'crossrefs':
        if(Array.isArray(window.PARALLEL_PASSAGES)){
          for(var i=0;i<window.PARALLEL_PASSAGES.length;i++){
            var p=window.PARALLEL_PASSAGES[i];
            if(Array.isArray(p.passages)&&p.passages.some(function(s){return s.indexOf(state.book)===0;})) return true;
          }
        }
        if(Array.isArray(window.PROPHECY_FULFILLMENT)){
          for(var j=0;j<window.PROPHECY_FULFILLMENT.length;j++){
            var pf=window.PROPHECY_FULFILLMENT[j];
            if((pf.prophecy&&pf.prophecy.indexOf(state.book)===0)||(pf.fulfillment&&pf.fulfillment.indexOf(state.book)===0)) return true;
          }
        }
        return false;
      default: return true;
    }
  }

  function _updateTabVisibility(state, v){
    var dataTabs = ['culture','kingdom','people','sources','crossrefs'];
    document.querySelectorAll('.study-tab[data-tab]').forEach(function(btn){
      var tab = btn.getAttribute('data-tab');
      if(dataTabs.indexOf(tab) === -1){ btn.style.display = ''; return; }
      btn.style.display = _tabHasData(tab, state, v) ? '' : 'none';
    });
  }

  function openStudySheet(verseRef, opts){
    opts = opts || {};
    const parsed = parseRef(verseRef);
    if(!parsed) return;
    const vData = _getVerseData(parsed.book, parsed.ch, parsed.v);
    window._studySheetState = { ref: verseRef, book: parsed.book, chapter: parsed.ch, verse: parsed.v, verseData: vData, focusWord: opts.word||null };
    const sheet = document.getElementById('studySheet');
    if(!sheet) return;
    sheet.setAttribute('aria-hidden','false');
    sheet.classList.add('open');
    document.body.classList.add('study-sheet-open');
    document.getElementById('studySheetRef').textContent = verseRef;
    _updateTabVisibility(window._studySheetState, vData);
    // Pick initial tab; if it's hidden fall back to 'define'
    var initialTab = opts.tab || 'define';
    var tabBtn = document.querySelector('.study-tab[data-tab="'+initialTab+'"]');
    if(tabBtn && tabBtn.style.display === 'none') initialTab = 'define';
    switchStudyTab(initialTab);
  }
  window.openStudySheet = openStudySheet;

  function closeStudySheet(){
    const sheet = document.getElementById('studySheet');
    if(!sheet) return;
    sheet.setAttribute('aria-hidden','true');
    sheet.classList.remove('open');
    document.body.classList.remove('study-sheet-open');
  }
  window.closeStudySheet = closeStudySheet;

  function switchStudyTab(tab){
    document.querySelectorAll('.study-tab').forEach(function(t){
      const active = t.getAttribute('data-tab')===tab;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active?'true':'false');
    });
    const body = document.getElementById('studySheetBody');
    if(!body) return;
    const lf = getLayerFilters();
    const state = window._studySheetState;
    const v = state.verseData;
    if(!v){ body.innerHTML = '<div class="sheet-empty">No verse data loaded.</div>'; return; }
    let html = '';
    switch(tab){
      case 'define': html = renderTabDefine(state, v, lf); break;
      case 'original': html = renderTabOriginal(state, v, lf); break;
      case 'translations': html = renderTabTranslations(state, v, lf); break;
      case 'culture': html = renderTabCulture(state, v, lf); break;
      case 'kingdom': html = renderTabKingdom(state, v, lf); break;
      case 'people': html = renderTabPeople(state, v, lf); break;
      case 'sources': html = renderTabSources(state, v, lf); break;
      case 'crossrefs': html = renderTabCrossRefs(state, v, lf); break;
      default: html = '<div class="sheet-empty">Unknown tab.</div>';
    }
    body.innerHTML = html;
    body.scrollTop = 0;
  }
  window.switchStudyTab = switchStudyTab;

  // ---------- Tab renderers ----------
  function _escape(s){ return escapeHtml(String(s==null?'':s)); }

  // ============================================================
  // CONTEXTUAL WORD-SENSE RESOLVER
  // ============================================================
  // Given a verse object + a tapped English word, identify the specific
  // Hebrew/Greek/Aramaic word ACTUALLY USED in that verse (not just a
  // generic family member). Strategy:
  //   1. Pull the verse's strongsTags array (positional original-language
  //      tokens with Strong's IDs).
  //   2. For each tag, look up the Strong's lexicon's kjv_def (KJV renderings)
  //      and def/strongs_def, and check whether the tapped English word is
  //      among the words that Strong's records as a translation of this lemma.
  //   3. If exactly one tag matches → confidence "directly-tagged".
  //   4. If multiple match → cross-reference ENGLISH_BIBLE_DICT[word].originals
  //      to pick the canonical one, then label the rest as alternates.
  //   5. If no tag matches → fall back to ENGLISH_BIBLE_DICT for the family
  //      view, but label confidence "exact verse mapping unavailable" and
  //      DO NOT claim a specific tag is "used here".
  // The resolver never invents — it cites the verse's actual data or says
  // honestly that the verse data does not preserve that mapping.
  function _strongsLookup(sId){
    if(!sId) return null;
    const m = String(sId).match(/^([HG])(\d+)([a-z]?)$/);
    if(!m) return null;
    const lang = m[1]==='H' ? 'Hebrew' : 'Greek';
    const numKey = m[2] + m[3];
    if(lang==='Hebrew'){
      const heb = window.STRONGS_HEB && (window.STRONGS_HEB[sId] || window.STRONGS_HEB['H'+numKey]);
      if(!heb) return null;
      return { lang:'Hebrew', sId:sId, lemma:heb.lemma||'', xlit:heb.xlit||'', pron:heb.pron||'', kjv_def:heb.kjv_def||'', def:heb.strongs_def||'', derivation:heb.derivation||'' };
    } else {
      const grk = window.STRONGS_GRK && (window.STRONGS_GRK[numKey] || window.STRONGS_GRK[String(m[2])]);
      if(!grk) return null;
      return { lang:'Greek', sId:sId, lemma:grk.grk||'', xlit:grk.translit||grk.xlit||'', pron:grk.pron||'', kjv_def:grk.kjv_def||'', def:grk.def||grk.strongs_def||'', derivation:grk.derivation||'' };
    }
  }
  function _wordInKjvDef(englishWord, kjvDef){
    if(!englishWord || !kjvDef) return false;
    // KJV def is like "carnal(-ly, + -ly minded), flesh(-ly)." — find the
    // English word as a whole token, tolerating KJV's parenthesized suffixes
    // and English inflectional endings (-ed, -ing, -s, -eth, etc.).
    const ew = String(englishWord).toLowerCase().replace(/[.,;:!?]$/,'');
    // Normalize the kjv_def: strip parens, brackets, plus signs; collapse
    // hyphens to spaces so "love(-ed)" becomes "love ed" and tokens are findable.
    const norm = String(kjvDef).toLowerCase()
      .replace(/[()[\]+,;.{}]/g, ' ')
      .replace(/-/g, ' ')
      .replace(/\s+/g, ' ');
    // (1) Direct token match.
    const escEw = ew.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if(new RegExp('\\b'+escEw+'\\b').test(norm)) return true;
    // (2) Suffix-stemming: if the tapped word ends with a common English
    // inflection, try the stem against the normalized def.
    const suffixes = ['ed','d','ing','eth','est','ly','ness','s','es'];
    for(const suf of suffixes){
      if(ew.endsWith(suf) && ew.length > suf.length + 2){
        const stem = ew.slice(0, -suf.length).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if(new RegExp('\\b'+stem+'\\b').test(norm)) return true;
      }
    }
    return false;
  }
  // Lemmatize an English word for ENGLISH_BIBLE_DICT lookup. Generates a
  // candidate set covering common English inflection:
  //   loved   -> {loved, lov, love}
  //   loving  -> {loving, lov, love}
  //   bodies  -> {bodies, bodie, body}
  //   sinned  -> {sinned, sinn, sin}     (double-consonant collapse)
  //   blessed -> {blessed, bless}
  //   wishes  -> {wishes, wishe, wish}
  // Cheap, source-honest: not a full stemmer — just enough variants for the
  // dictionary and curated-note lookups to land on the lexical base form.
  function _lemmatize(word){
    if(!word) return [];
    const w = String(word).toLowerCase().replace(/[.,;:!?'"]$/,'');
    const out = new Set([w]);
    const push = (s)=>{ if(s && s.length>=2) out.add(s); };
    // y-stem variants
    if(w.endsWith('ies') && w.length>4) push(w.slice(0,-3)+'y'); // bodies -> body
    if(w.endsWith('ied') && w.length>4) push(w.slice(0,-3)+'y'); // tried -> try
    // -ed / -d
    if(w.endsWith('ed') && w.length>3){
      const base = w.slice(0,-2);
      push(base);
      push(base+'e'); // loved -> lov -> love
      // double-consonant collapse: sinned -> sin
      if(base.length>=2 && base[base.length-1]===base[base.length-2]) push(base.slice(0,-1));
    } else if(w.endsWith('d') && w.length>3){
      push(w.slice(0,-1));
    }
    // -ing
    if(w.endsWith('ing') && w.length>5){
      const base = w.slice(0,-3);
      push(base);
      push(base+'e'); // loving -> lov -> love
      if(base.length>=2 && base[base.length-1]===base[base.length-2]) push(base.slice(0,-1));
    }
    // -eth / -est (KJV) and -er / -or
    if(w.endsWith('eth') && w.length>4) push(w.slice(0,-3));
    if(w.endsWith('est') && w.length>4){ push(w.slice(0,-3)); push(w.slice(0,-2)); }
    // -es / -s
    if(w.endsWith('es') && w.length>3){ push(w.slice(0,-2)); push(w.slice(0,-1)); }
    else if(w.endsWith('s') && w.length>2) push(w.slice(0,-1));
    // -ly / -ness
    if(w.endsWith('ly') && w.length>3) push(w.slice(0,-2));
    if(w.endsWith('ness') && w.length>5) push(w.slice(0,-4));
    return [...out];
  }
  function _keyMatchesRef(cardKey, lookupKey){
    // Require word-boundary match so "Genesis 1" does NOT match "Genesis 15".
    if(!cardKey.startsWith(lookupKey)) return false;
    const rest = cardKey.slice(lookupKey.length);
    return rest==='' || /^[:\s–—\-]/.test(rest);
  }
  function _splitRespectingParens(text){
    // Split on comma/semicolon only outside parentheses or brackets.
    const items=[];let depth=0,cur='';
    for(const ch of String(text)){
      if(ch==='('||ch==='['){depth++;cur+=ch;}
      else if(ch===')'||ch===']'){depth=Math.max(0,depth-1);cur+=ch;}
      else if(depth===0&&(ch===','||ch===';')){if(cur.trim())items.push(cur.trim());cur='';}
      else{cur+=ch;}
    }
    if(cur.trim())items.push(cur.trim());
    return items;
  }
  function _parseKjvDefToRange(kjvDef, strongs_def){
    // Smart parser: respects parentheses, drops [idiom] markers and suffix
    // fragments, deduplicates, filters items shorter than 3 chars.
    const out=[];
    // strongs_def (prose) goes in first as a cleaned bullet.
    if(strongs_def){
      const prose=String(strongs_def).replace(/\{|\}/g,'').trim();
      if(prose.length>10) out.push(prose);
    }
    if(!kjvDef) return out;
    const items=_splitRespectingParens(String(kjvDef));
    for(const item of items){
      const cleaned=item
        .replace(/\[.*?\]/g,'')     // remove [idiom], [phrase], etc.
        .replace(/\(.*?\)/g,'')     // remove (suffix-groups) like (-dess, -ly)
        .replace(/[+[\]{}]/g,'')
        .replace(/\s+/g,' ')
        .trim();
      if(cleaned.length<3) continue;
      if(/^\d+$/.test(cleaned)) continue;
      if(/^[-–—\s]+$/.test(cleaned)) continue;
      const lower=cleaned.toLowerCase();
      if(out.some(function(x){return x.toLowerCase()===lower;})) continue;
      out.push(cleaned);
    }
    return out;
  }
  function _parseBdbDef(def){
    // Parses BDB's pipe-separated numbered senses into a clean bullet array.
    // Input: "1) meaning | 1a) sub-meaning | 2) meaning2"
    // Output: ["meaning","sub-meaning","meaning2"]
    if(!def) return [];
    const raw = String(def).split('|');
    const out = [];
    for(const part of raw){
      const cleaned = part.trim()
        .replace(/^\d+[a-z]{0,2}\)\s*/,'')   // strip "1)" "1a)" "1a1)" etc.
        .replace(/<BR>/gi,' ')
        .replace(/<i>|<\/i>/g,'')             // strip <i> tags
        .replace(/<[^>]+>/g,'')               // strip other HTML tags
        .replace(/\s+/g,' ')
        .trim();
      // Skip cross-refs, Aramaic notes, and trivially short entries
      if(cleaned.length>4 && !/^(Also means:|Aramaic|§|See H|see H|see G|Aramaic of)/.test(cleaned)){
        out.push(cleaned);
      }
    }
    return out;
  }

  // ─── Morphology decoder ──────────────────────────────────────────────────
  // Converts machine codes (V-PAP-NMS, H-Ncmsa) to readable English.
  function _decodeMorph(code){
    if(!code || typeof code !== 'string') return null;
    if(code.toLowerCase().includes('not present') || code.toLowerCase().includes('unavailable')) return null;
    const c = code.trim();
    // Greek Robinson-style: POS-Tense+Voice+Mood-Case+Num+Gender
    const GRK_POS = {V:'Verb',N:'Noun',A:'Adjective',P:'Pronoun',R:'Relative Pronoun',C:'Reciprocal Pronoun',D:'Demonstrative Pronoun',T:'Definite Article',K:'Correlative Pronoun',I:'Interrogative Pronoun',X:'Indefinite Pronoun',Q:'Correlative/Interrogative Pronoun',F:'Reflexive Pronoun',S:'Possessive Pronoun',ADV:'Adverb',CONJ:'Conjunction',COND:'Conditional Particle',PRT:'Particle',INJ:'Interjection',ARAM:'Aramaic',HEB:'Hebrew'};
    const GRK_TENSE={P:'Present',I:'Imperfect',F:'Future',A:'Aorist',X:'Perfect',Y:'Pluperfect'};
    const GRK_VOICE={A:'Active',M:'Middle',P:'Passive',D:'Middle-Deponent',O:'Passive-Deponent',N:'Middle or Passive',E:'Either Middle or Passive',Q:'Middle, Passive or either'};
    const GRK_MOOD={I:'Indicative',S:'Subjunctive',O:'Optative',D:'Imperative',N:'Infinitive',P:'Participle'};
    const GRK_CASE={N:'Nom',G:'Gen',D:'Dat',A:'Acc',V:'Voc'};
    const GRK_NUM={S:'Sing',P:'Plur'};
    const GRK_GEN={M:'Masc',F:'Fem',N:'Neut'};
    const GRK_PER={1:'1st',2:'2nd',3:'3rd'};

    // Greek patterns: V-PAP-NMS  or  N-NSM  or  ADV
    const grkMatch = c.match(/^([A-Z]+)-([A-Z0-9]*)(?:-([A-Z0-9]*))?$/);
    if(grkMatch && GRK_POS[grkMatch[1]]){
      const pos = GRK_POS[grkMatch[1]];
      const seg2 = grkMatch[2]||'';
      const seg3 = grkMatch[3]||'';
      const parts=[pos];
      if(grkMatch[1]==='V'){
        // Verb: seg2 = Tense+Voice+Mood, seg3 = Case+Num+Gender or Person+Num
        if(seg2.length>=1 && GRK_TENSE[seg2[0]]) parts.push(GRK_TENSE[seg2[0]]);
        if(seg2.length>=2 && GRK_VOICE[seg2[1]]) parts.push(GRK_VOICE[seg2[1]]);
        if(seg2.length>=3 && GRK_MOOD[seg2[2]]) parts.push(GRK_MOOD[seg2[2]]);
        // Participle: seg3 = CaseNumGender
        if(seg3.length===3 && GRK_CASE[seg3[0]] && GRK_GEN[seg3[2]] && GRK_NUM[seg3[1]])
          parts.push(GRK_CASE[seg3[0]]+'/'+GRK_GEN[seg3[2]]+'/'+GRK_NUM[seg3[1]]);
        else if(seg3.length===2 && GRK_PER[seg3[0]] && GRK_NUM[seg3[1]])
          parts.push(GRK_PER[seg3[0]]+' pers / '+GRK_NUM[seg3[1]]);
      } else {
        // Noun/adj/pronoun: seg2 = CaseNumGender or CaseNum
        const s = seg2;
        if(s.length>=1 && GRK_CASE[s[0]]) parts.push(GRK_CASE[s[0]]);
        if(s.length>=2 && GRK_NUM[s[1]]) parts.push(GRK_NUM[s[1]]);
        if(s.length>=3 && GRK_GEN[s[2]]) parts.push(GRK_GEN[s[2]]);
      }
      return parts.join(' · ');
    }
    // Hebrew OpenScriptures style: HNcmsa, Vqp3ms, etc.
    const HEB_POS={'N':'Noun','V':'Verb','A':'Adjective','D':'Adverb','P':'Preposition','C':'Conjunction','T':'Particle','R':'Pronoun','S':'Suffix','M':'Numerical'};
    const HEB_STEM={q:'Qal',n:'Niphal',p:'Piel',u:'Pual',h:'Hiphil',H:'Hophal',t:'Hithpael',o:'Polel',r:'Polal',m:'Poel',k:'Poal',z:'Pilpel',K:'Palpal',f:'Pealal',b:'Hishtaphel',N:'Nithpael'};
    const HEB_ASPECT={p:'Perfect',q:'Imperfect',v:'Imperative',i:'Infinitive construct',a:'Infinitive absolute',r:'Active participle',s:'Passive participle'};
    const HEB_PERSON={'1':'1st','2':'2nd','3':'3rd'};
    const HEB_NUM={s:'Sing',p:'Plur',d:'Dual'};
    const HEB_GEN={m:'Masc',f:'Fem',c:'Common'};
    const HEB_STATE={a:'Absolute',c:'Construct',d:'Determined'};

    const hebMatch = c.match(/^H([NVADPCTRSM])(.*)$/i);
    if(hebMatch){
      const pos = HEB_POS[hebMatch[1].toUpperCase()]||hebMatch[1];
      const rest = hebMatch[2]||'';
      const parts=[pos];
      if(hebMatch[1].toUpperCase()==='V'){
        // Verb: stem, aspect, person, number, gender
        if(rest[0] && HEB_STEM[rest[0]]) parts.push(HEB_STEM[rest[0]]);
        if(rest[1] && HEB_ASPECT[rest[1]]) parts.push(HEB_ASPECT[rest[1]]);
        if(rest[2] && HEB_PERSON[rest[2]]) parts.push(HEB_PERSON[rest[2]]+' pers');
        if(rest[3] && HEB_NUM[rest[3]]) parts.push(HEB_NUM[rest[3]]);
        if(rest[4] && HEB_GEN[rest[4]]) parts.push(HEB_GEN[rest[4]]);
      } else {
        // Noun/adj: type, gender, number, state
        if(rest[0] && (rest[0]==='c'||rest[0]==='p'||rest[0]==='g')) {/* skip type letter */}
        const offset = (rest[0]==='c'||rest[0]==='p'||rest[0]==='g') ? 1 : 0;
        if(rest[offset] && HEB_GEN[rest[offset]]) parts.push(HEB_GEN[rest[offset]]);
        if(rest[offset+1] && HEB_NUM[rest[offset+1]]) parts.push(HEB_NUM[rest[offset+1]]);
        if(rest[offset+2] && HEB_STATE[rest[offset+2]]) parts.push(HEB_STATE[rest[offset+2]]);
      }
      return parts.join(' · ');
    }
    // Fallback — return original code, cleaned up, as-is
    return c;
  }

  // ─── Contextual meaning text formatter ───────────────────────────────────
  // Bolds the English study word, italicises the original language word
  // when they appear in the text. Returns safe HTML.
  function _formatContextualText(text, engWord, original, translit){
    if(!text) return '';
    let html = escapeHtml(text);
    // Bold: the English word (case-insensitive, word-boundary)
    if(engWord && engWord.length > 1){
      const esc = escapeHtml(engWord).replace(/[.*+?^$()|[\]\\]/g,'\\$&');
      html = html.replace(new RegExp('\\b(' + esc + '(?:s|ed|ing|\'s)?)\\b','gi'),
        '<strong style="color:var(--gold);">$1</strong>');
    }
    // Italicise: transliteration (e.g. "sarx", "basar", "nephesh")
    if(translit && translit.length > 2){
      const esc = escapeHtml(translit).replace(/[.*+?^$()|[\]\\]/g,'\\$&');
      html = html.replace(new RegExp('\\b(' + esc + ')\\b','gi'),
        '<em style="color:var(--enoch);">$1</em>');
    }
    // Italicise Strong's IDs when they appear inline
    html = html.replace(/\b([HG]\d{1,5})\b/g,'<em style="color:var(--strongs);font-size:0.9em;">$1</em>');
    return html;
  }

  function _buildDeepContext(opts, card, verse, dict){
    // Assembles the deepContext section from rich dictionary and DEFINITIONS data.
    const word=(opts&&opts.englishWord)||'';
    const ref=(opts&&opts.ref)||'';
    const book=(opts&&opts.book)||'';
    const phrase=_phraseContext(verse,word);
    const _wLower=word.toLowerCase();const _wCap=_wLower.charAt(0).toUpperCase()+_wLower.slice(1);
    const oldDef=window.DEFINITIONS&&(window.DEFINITIONS[word]||window.DEFINITIONS[_wLower]||window.DEFINITIONS[_wCap]);
    const parts=[];
    if(dict&&dict.deep) parts.push(dict.deep);
    if(dict&&dict.cultural) parts.push('Cultural background: '+dict.cultural);
    if(dict&&dict.kingdomSignificance) parts.push('Kingdom significance: '+dict.kingdomSignificance);
    if(oldDef){
      if(oldDef.ane&&!parts.some(function(p){return p.includes(String(oldDef.ane).slice(0,40));})) parts.push('Ancient-world context: '+oldDef.ane);
      if(oldDef.theology) parts.push(oldDef.theology);
      if(oldDef.kingdom&&!parts.some(function(p){return p.includes(String(oldDef.kingdom).slice(0,40));})) parts.push('Kingdom significance: '+oldDef.kingdom);
    }
    // STRONGS_SENSE_MAP: deep contextual sense for this Strong's ID
    const _sId = card && card.exactWordUsedHere && card.exactWordUsedHere.strongs;
    if(_sId && _sId!=='Unavailable'){
      const _ssm = window.STRONGS_SENSE_MAP && window.STRONGS_SENSE_MAP[_sId];
      if(_ssm){
        if(_ssm.etymology && !parts.some(function(p){return p.includes((_ssm.etymology||'').slice(0,30));}))
          parts.push('Etymology: '+_ssm.etymology);
        if(_ssm.contextNote && !parts.some(function(p){return p.includes((_ssm.contextNote||'').slice(0,30));}))
          parts.push(_ssm.contextNote);
        if(Array.isArray(_ssm.senses) && _ssm.senses.length && !parts.some(function(p){return p.includes('Lexical senses:');}))
          parts.push('Lexical senses: '+_ssm.senses.join(' | '));
      }
      // BDB for Hebrew: numbered senses give the full semantic range
      if(_sId.charAt(0)==='H' && window.BDB_HEB){
        const _bdb = window.BDB_HEB[_sId];
        if(_bdb && _bdb.def){
          const _bdbSenses = _parseBdbDef(_bdb.def);
          if(_bdbSenses.length && !parts.some(function(p){return p.includes('BDB lexical senses:');}))
            parts.push('BDB lexical senses: '+_bdbSenses.slice(0,6).join(' | '));
        }
      }
      // Strong's Greek def for Greek words
      if(_sId.charAt(0)==='G' && window.STRONGS_GRK){
        const _gNum=_sId.replace(/^G/,'');
        const _grk=window.STRONGS_GRK[_gNum];
        if(_grk && !parts.some(function(p){return p.includes('Greek lexical range:');})){
          const _gDef=String(_grk.strongs_def||_grk.def||'').replace(/\{|\}/g,'').trim();
          if(_gDef.length>10) parts.push('Greek lexical range: '+_gDef);
        }
      }
    }
    if(!parts.length){
      const genre=_bookGenreSummary(book);
      if(phrase) parts.push('In this passage, "'+word+'" appears within the phrase "'+phrase+'".');
      if(genre) parts.push('This verse is part of '+genre+'.');
      parts.push('A fuller study of this word benefits from examining the original-language term and its range of use across the biblical corpus.');
    }
    return parts.join('\n\n');
  }
  // Look up ENGLISH_BIBLE_DICT for a word, trying inflectional variants
  // ("loved" → also try "love"; "kingdoms" → also try "kingdom") so the
  // family-fallback step has the best chance of finding a curated entry.
  function _dictLookup(word){
    const D = window.ENGLISH_BIBLE_DICT;
    if(!D) return null;
    for(const v of _lemmatize(word)){
      if(D[v]) return D[v];
      const cap = v.charAt(0).toUpperCase() + v.slice(1);
      if(D[cap]) return D[cap];
    }
    return null;
  }
  function resolveContextualWordSense(v, englishWord){
    const ew = String(englishWord||'').toLowerCase().replace(/[.,;:!?]$/,'');
    const result = {
      englishWord: ew,
      confidence: 'unavailable',
      exactTag: null,
      exactLex: null,
      alternates: [],
      family: [],
      verseSnippet: (v.synthesized || v.text || '').slice(0,180),
      reason: ''
    };
    const tags = Array.isArray(v.strongsTags) ? v.strongsTags : [];
    if(!tags.length){
      result.reason = 'This verse has no Strong\'s tag data attached. Exact original-word mapping is unavailable.';
      return result;
    }
    // Step 1: find tags whose lexicon kjv_def actually contains the tapped word.
    const matches = [];
    for(const t of tags){
      if(!t || !t.sId) continue;
      const lex = _strongsLookup(t.sId);
      if(!lex) continue;
      if(_wordInKjvDef(ew, lex.kjv_def) || _wordInKjvDef(ew, lex.def)){
        matches.push({ tag:t, lex:lex });
      }
    }
    if(matches.length===1){
      result.confidence = 'directly-tagged';
      result.exactTag = matches[0].tag;
      result.exactLex = matches[0].lex;
      result.alternates = tags.filter(t=>t!==matches[0].tag);
      result.reason = 'The verse\'s Strong\'s tag for "'+ew+'" resolves to this single original word.';
      return result;
    }
    if(matches.length>1){
      // Multiple verse tags match the tapped English word. Rank by canonical
      // order in ENGLISH_BIBLE_DICT[word].originals[] — the curated dictionary
      // lists the primary original first (e.g., for "soul" the order is
      // nephesh H5315, psyche G5590, neshamah H5397 — so if both H5397 and
      // H5315 match, prefer H5315). If no dict order applies, fall back to
      // verse-position order.
      const dict = _dictLookup(ew);
      let pick = null, preferredRank = null;
      if(dict && Array.isArray(dict.originals)){
        const knownOrder = dict.originals.map(o=>(o.strongs||'').match(/[HG]\d+/)?.[0]).filter(Boolean);
        for(const m of matches){
          const ms = (m.tag.sId||'').match(/[HG]\d+/)?.[0];
          if(!ms) continue;
          const rank = knownOrder.indexOf(ms);
          if(rank>=0 && (preferredRank===null || rank<preferredRank)){
            preferredRank = rank; pick = m;
          }
        }
      }
      const directlyRanked = pick !== null;
      if(!pick) pick = matches[0];
      result.confidence = directlyRanked ? 'directly-tagged' : 'multiple-candidates';
      result.exactTag = pick.tag;
      result.exactLex = pick.lex;
      result.alternates = matches.filter(m=>m!==pick).map(m=>m.tag);
      result.reason = directlyRanked
        ? 'Multiple Strong\'s tags in this verse list "'+ew+'" as a translation; the canonical word-family mapping ranks this one first.'
        : 'Multiple Strong\'s tags in this verse list "'+ew+'" as a translation. The word family does not yet rank one over another for this verse — showing the first match for transparency.';
      return result;
    }
    // Step 2: no tag's lexicon mentions the English word. Try lemma variants
    // ("loved" -> "love", "kingdoms" -> "kingdom") against the curated
    // ENGLISH_BIBLE_DICT family, and see if any of its known Strong's IDs
    // appears among the verse's tags.
    const dict = _dictLookup(ew);
    if(dict && Array.isArray(dict.originals)){
      for(const o of dict.originals){
        const sId = (o.strongs||'').match(/[HG]\d+/)?.[0];
        if(!sId) continue;
        const tagMatch = tags.find(t=>(t.sId||'').match(/[HG]\d+/)?.[0]===sId);
        if(tagMatch){
          const lex = _strongsLookup(tagMatch.sId);
          result.confidence = 'inferred-from-family';
          result.exactTag = tagMatch;
          result.exactLex = lex;
          result.alternates = tags.filter(t=>t!==tagMatch);
          result.reason = 'The curated word family for "'+ew+'" identifies '+sId+', which is tagged in this verse. The verse\'s lexicon does not list "'+ew+'" as a direct KJV rendering, but the family mapping points here.';
          return result;
        }
      }
    }
    // Step 3: honest "unavailable" path.
    result.confidence = 'unavailable';
    result.reason = 'Exact lemma not in current tagged data for "'+ew+'" at this verse. The verse\'s tagged originals do not list "'+ew+'" as a KJV rendering, and the word-family map does not match any tag here. Engine falls back to phrase + genre context.';
    return result;
  }
  window.resolveContextualWordSense = resolveContextualWordSense;

  function _bookContextNote(book){
    if(!book) return '';
    const NT = ['Matthew','Mark','Luke','John','Acts','Romans','1Corinthians','2Corinthians','Galatians','Ephesians','Philippians','Colossians','1Thessalonians','2Thessalonians','1Timothy','2Timothy','Titus','Philemon','Hebrews','James','1Peter','2Peter','1John','2John','3John','Jude','Revelation'];
    if(NT.includes(book)) return 'NT book — original language is Koine Greek.';
    return 'OT book — original language is Hebrew (with some Aramaic in Daniel and Ezra).';
  }
  function _passageNotes(ref){
    return (window.CONTEXTUAL_SENSE_NOTES && window.CONTEXTUAL_SENSE_NOTES[ref]) || null;
  }

  // ============================================================
  // getContextualMeaning(opts) — public API per definition-audit spec.
  // Returns a structured object separating exact verse word, contextual
  // meaning HERE, full word range, what's not meant here, and the rationale.
  // The engine NEVER conflates lexical range (Strong's/lexicon possible
  // meanings) with contextual meaning HERE. If no curated passage note
  // exists for this exact verse+word, contextualMeaningHere is null and
  // confidence is "low" — the UI then says so honestly instead of
  // pretending the Strong's def is the contextual meaning.
  // ============================================================
  function getContextualMeaning(opts){
    const v = opts && opts.verse;
    const ew = (opts && opts.englishWord || '').toLowerCase();
    const ref = (opts && opts.ref) || '';
    const sense = v ? resolveContextualWordSense(v, ew) : {confidence:'unavailable'};
    const passageNote = _passageNotes(ref);
    // Case-insensitive AND lemma-aware curated-note lookup. Passage notes are
    // often keyed in KJV vocabulary (carnal, charity, works) even when the
    // displayed translation renders the same Greek/Hebrew word differently
    // (worldly, love, deeds in BSB). So:
    //   1. Try direct key matches: lower, original, capitalized.
    //   2. Try all lemmatized variants of the tapped word against the note keys.
    //   3. Try lemmatized variants of each note key against the tapped word.
    // Returns the first matching note.
    let passageWordNote = null;
    if(passageNote){
      const orig = String(opts&&opts.englishWord||'');
      const cap = orig.charAt(0).toUpperCase() + orig.slice(1).toLowerCase();
      passageWordNote = passageNote[ew] || passageNote[orig] || passageNote[cap];
      if(!passageWordNote){
        const tappedLemmas = new Set(_lemmatize(ew).map(s=>s.toLowerCase()));
        for(const noteKey of Object.keys(passageNote)){
          const keyLemmas = _lemmatize(noteKey).map(s=>s.toLowerCase());
          for(const a of keyLemmas){
            if(tappedLemmas.has(a)){ passageWordNote = passageNote[noteKey]; break; }
          }
          if(passageWordNote) break;
        }
      }
    }
    const dict = _dictLookup(ew);

    // Full word range comes from ENGLISH_BIBLE_DICT.rangeOfMeaning (deep
    // curated list), or from the dict.originals list, or from the lexicon
    // entry's KJV def split into tokens. Never from a single Strong's def
    // string used as if it were "the meaning here."
    let fullWordRange = [];
    if(dict && Array.isArray(dict.rangeOfMeaning) && dict.rangeOfMeaning.length){
      fullWordRange = dict.rangeOfMeaning.slice();
    } else if(dict && Array.isArray(dict.originals) && dict.originals.length){
      fullWordRange = dict.originals.map(function(o){
        return [o.translit||o.word||'', o.note||''].filter(Boolean).join(' — ').slice(0,180);
      });
    } else if(sense.exactLex && (sense.exactLex.kjv_def || sense.exactLex.def)){
      fullWordRange = _parseKjvDefToRange(sense.exactLex.kjv_def, sense.exactLex.def);
    }
    // Augment fullWordRange from STRONGS_SENSE_MAP, BDB (Hebrew), and Strong's Greek.
    if(sense.exactTag){
      const _augId=((sense.exactTag.sId||'').match(/[HG]\d+/)||[])[0];
      if(_augId){
        // STRONGS_SENSE_MAP: deep contextual senses for key vocabulary
        const _ssm = window.STRONGS_SENSE_MAP && window.STRONGS_SENSE_MAP[_augId];
        if(_ssm && Array.isArray(_ssm.senses)){
          for(const _s of _ssm.senses){
            if(_s && !fullWordRange.some(function(x){return x.toLowerCase()===String(_s).toLowerCase();}))
              fullWordRange.push(String(_s));
          }
        }
        // BDB: full Hebrew numbered senses
        if(_augId.charAt(0)==='H' && window.BDB_HEB){
          const _bdb=window.BDB_HEB[_augId];
          if(_bdb && _bdb.def){
            const _bdbSenses=_parseBdbDef(_bdb.def);
            for(const _s of _bdbSenses){
              if(!fullWordRange.some(function(x){return x.toLowerCase()===_s.toLowerCase();}))
                fullWordRange.push(_s);
            }
          }
        }
        // Strong's Greek strongs_def for Greek words
        if(_augId.charAt(0)==='G' && window.STRONGS_GRK){
          const _gNum=_augId.replace(/^G/,'');
          const _grk=window.STRONGS_GRK[_gNum];
          if(_grk){
            const _gDef=String(_grk.strongs_def||_grk.def||'').replace(/\{|\}/g,'').trim();
            if(_gDef.length>10 && !fullWordRange.some(function(x){return x.toLowerCase()===_gDef.toLowerCase();}))
              fullWordRange.push(_gDef);
          }
        }
      }
    }

    // Confidence rules:
    //   high   — verse has Strong's-tagged exact word AND a curated passage
    //            note giving the contextual meaning here.
    //   medium — verse has Strong's-tagged exact word but no curated note;
    //            we can show the word but cannot claim contextual meaning.
    //   low    — no exact-word tagging available for this verse+word.
    let confidence = 'low';
    if((sense.confidence==='directly-tagged'||sense.confidence==='multiple-candidates'||sense.confidence==='inferred-from-family')){
      confidence = (passageWordNote && passageWordNote.sense) ? 'high' : 'medium';
    }

    return {
      exactWordUsedHere: {
        english: ew,
        original: sense.exactLex ? sense.exactLex.lemma : null,
        language: sense.exactLex ? sense.exactLex.lang : null,
        transliteration: sense.exactLex ? sense.exactLex.xlit : null,
        strongs: sense.exactTag ? ((sense.exactTag.sId||'').match(/[HG]\d+/)||[])[0] : null,
        phrase: sense.verseSnippet || ''
      },
      contextualMeaningHere: passageWordNote && passageWordNote.sense ? passageWordNote.sense : null,
      fullWordRange: fullWordRange,
      notMeantHere: passageWordNote && passageWordNote.notMeant ? [passageWordNote.notMeant] : (dict && (dict.notMean||dict.misunderstood) ? [dict.notMean||dict.misunderstood] : []),
      whyThisMeaningFits: passageWordNote && (passageWordNote.matters || passageWordNote.why) ? (passageWordNote.matters || passageWordNote.why) : null,
      confidence: confidence,
      auditStatus: passageWordNote && passageWordNote.auditStatus ? passageWordNote.auditStatus : (passageWordNote ? 'context-reviewed' : 'no-passage-note'),
      bookContextNote: _bookContextNote(opts && opts.book),
      sense: sense
    };
  }
  window.getContextualMeaning = getContextualMeaning;

  // ============================================================
  // getWordStudyData(opts) — full-spec word-study API.
  // Strict contract enforced for the canon-wide audit:
  //
  //   {
  //     bibleVersion: string,
  //     exactWordUsedHere: {
  //       english: string,
  //       original: string | "Exact original-word mapping unavailable in current tagged data",
  //       strongs:  string | "Unavailable",
  //       morphology: string | "Unavailable",
  //       phrase: string
  //     },
  //     contextualMeaningHere: string,         // never empty — falls back to honest prose
  //     fullWordRange: string[],               // possibly empty
  //     notMeantHere: string[],                // possibly empty
  //     whyThisMeaningFits: string,            // never empty — falls back to honest prose
  //     sources: string[],                     // always populated
  //     confidence: "high" | "medium" | "low",
  //     auditStatus: "context-reviewed"
  //                | "context-reviewed with original-word limitation"
  //                | "needs manual review"
  //   }
  //
  // This NEVER conflates Strong's range with contextual meaning. When no
  // curated note exists, contextualMeaningHere is an honest contextual
  // fallback built from book/testament/genre context — explicitly NOT a
  // Strong's-def restatement. The Strong's range remains in fullWordRange.
  // ============================================================
  function _bookGenreSummary(book){
    const meta = (window.BIBLE_INDEX||[]).find(function(b){return b.slug===book;});
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
    // Window of ~6 words around the target word
    const lower = text.toLowerCase();
    const w = (englishWord||'').toLowerCase();
    const idx = lower.indexOf(w);
    if(idx<0) return text.slice(0,140);
    const words = text.split(/\s+/);
    const wi = words.findIndex(function(t){return t.toLowerCase().replace(/[^a-z]/g,'')===w.replace(/[^a-z]/g,'');});
    if(wi<0) return text.slice(Math.max(0,idx-30), idx+w.length+40);
    const a = Math.max(0, wi-4), b = Math.min(words.length, wi+5);
    return words.slice(a,b).join(' ');
  }
  function _honestContextualFallback(opts, card, verse){
    const word = (opts&&opts.englishWord)||'';
    const ref  = (opts&&opts.ref)||'';
    const book = (opts&&opts.book)||'';
    const ver  = (opts&&opts.bibleVersion)||'KJV';
    const phrase = _phraseContext(verse, word);
    const genre = _bookGenreSummary(book);
    const dict = _dictLookup(word);
    const _wL=word.toLowerCase();const _wC=_wL.charAt(0).toUpperCase()+_wL.slice(1);
    const oldDef = window.DEFINITIONS&&(window.DEFINITIONS[word]||window.DEFINITIONS[_wL]||window.DEFINITIONS[_wC]);
    const hasOriginal = card && card.exactWordUsedHere && card.exactWordUsedHere.original
      && card.exactWordUsedHere.original!=='Exact original-word mapping unavailable in current tagged data';
    // 1. Prefer rich curated dictionary plain meaning + verse anchor
    if(dict && dict.plain){
      let text = dict.plain;
      if(phrase) text += ' In '+ref+', the word appears in the phrase: "'+phrase+'."';
      else if(ref) text += ' ('+ref+')';
      return text;
    }
    // 2. Fall back to old-style DEFINITIONS entry
    if(oldDef){
      const sense = oldDef.def || (Array.isArray(oldDef.senses)&&oldDef.senses[0]) || '';
      if(sense){
        let text = '"'+word+'" — '+sense;
        if(phrase) text += ' (in the phrase: "'+phrase+'")';
        return text;
      }
    }
    // 2b. STRONGS_SENSE_MAP: deep primary sense for this Strong's ID
    const _stn = card && card.exactWordUsedHere && card.exactWordUsedHere.strongs;
    if(_stn && _stn!=='Unavailable'){
      const _ssmE = window.STRONGS_SENSE_MAP && window.STRONGS_SENSE_MAP[_stn];
      if(_ssmE && _ssmE.primarySense){
        let text = '"'+word+'" ('+_stn+') — '+_ssmE.primarySense;
        if(_ssmE.contextNote) text += ' '+_ssmE.contextNote;
        if(phrase) text += ' In '+ref+', it appears in the phrase: "'+phrase+'."';
        return text;
      }
      // 2c. BDB gloss + first senses for Hebrew words
      if(_stn.charAt(0)==='H' && window.BDB_HEB){
        const _bdbE = window.BDB_HEB[_stn];
        if(_bdbE){
          const _bdbS = _parseBdbDef(_bdbE.def);
          let text = '"'+word+'" translates the Hebrew '+(_bdbE.lemma||'')+' ('+(_bdbE.xlit||_stn)+')';
          if(_bdbE.gloss) text += ', meaning "'+_bdbE.gloss+'"';
          if(_bdbS.length) text += '. '+_bdbS.slice(0,3).join('; ')+'.';
          if(phrase) text += ' In '+ref+', it appears in: "'+phrase+'."';
          return text;
        }
      }
      // 2d. Strong's Greek def for Greek words
      if(_stn.charAt(0)==='G' && window.STRONGS_GRK){
        const _gN=_stn.replace(/^G/,'');
        const _grkE=window.STRONGS_GRK[_gN];
        if(_grkE && (_grkE.strongs_def||_grkE.def)){
          const _gDef=String(_grkE.strongs_def||_grkE.def||'').replace(/\{|\}/g,'').trim();
          let text = '"'+word+'" translates the Greek '+(_grkE.grk||'')
            +' ('+_stn+')';
          if(_gDef) text += ', meaning: '+_gDef;
          if(phrase) text += ' In '+ref+', it appears in: "'+phrase+'."';
          return text;
        }
      }
    }
    // 3. Build clean prose from context (no developer-speak)
    const parts = [];
    if(phrase) parts.push('In the phrase "'+phrase+'" ('+ver+'), "'+word+'"');
    else parts.push('"'+word+'" in '+(ref||'this verse'));
    if(genre) parts.push('is used in '+genre);
    if(hasOriginal){
      parts.push('translating '+card.exactWordUsedHere.original+
        (card.exactWordUsedHere.strongs&&card.exactWordUsedHere.strongs!=='Unavailable'?' ('+card.exactWordUsedHere.strongs+')':''));
    }
    parts.push('— see the Full Word Range below for the complete lexical range and the Sources tab for original-language data.');
    return parts.join(' ');
  }
  function _honestWhyFallback(opts, card, verse){
    const word = (opts&&opts.englishWord)||'';
    const phrase = _phraseContext(verse, word);
    const dict = _dictLookup(word);
    const hasOriginal = card && card.exactWordUsedHere && card.exactWordUsedHere.original
      && card.exactWordUsedHere.original!=='Exact original-word mapping unavailable in current tagged data';
    const bits = [];
    if(phrase) bits.push('The surrounding phrase "'+phrase+'" establishes the context for this word\'s sense in this verse.');
    if(hasOriginal){
      bits.push('The original-language term ('+card.exactWordUsedHere.original+
        (card.exactWordUsedHere.strongs&&card.exactWordUsedHere.strongs!=='Unavailable'?', '+card.exactWordUsedHere.strongs:'')
        +') has a defined range of meanings; the verse context narrows it to this sense.');
    } else {
      bits.push('The exact original word is not tagged in the current data for this verse; the sense is drawn from the English context, the surrounding passage, and the book\'s genre and purpose.');
    }
    if(dict&&dict.matters) bits.push(dict.matters);
    return bits.join(' ');
  }
  function _collectSources(opts, card, dict){
    const out = [];
    const _stn2 = card && card.exactWordUsedHere && card.exactWordUsedHere.strongs;
    if(_stn2 && _stn2!=='Unavailable'){
      out.push('Strong\'s Concordance (project-bundled '+(_stn2.charAt(0)==='H'?'Hebrew':'Greek')+' index, '+_stn2+')');
      // BDB for Hebrew
      if(_stn2.charAt(0)==='H' && window.BDB_HEB && window.BDB_HEB[_stn2])
        out.push('Brown-Driver-Briggs Hebrew Lexicon (data/bdb-hebrew.js — BDB '+_stn2+')');
      // Thayer's / Strong's Greek for Greek
      if(_stn2.charAt(0)==='G') out.push("Strong's Greek Lexicon (data/strongs-greek.js — "+_stn2+')');
      // STRONGS_SENSE_MAP when present
      if(window.STRONGS_SENSE_MAP && window.STRONGS_SENSE_MAP[_stn2])
        out.push('SWRV Curated Word Sense Map (data/strongs-sense-map.js — '+_stn2+')');
    }
    if(card && card.sense && card.sense.exactLex){
      const lex = card.sense.exactLex;
      if(lex.lang==='Hebrew' && !out.some(function(s){return s.includes('BDB');}))
        out.push('BDB Hebrew Lexicon (data/bdb-hebrew.js + sources/bdb-hebrew-lexicon-full.txt)');
      else if(lex.lang==='Greek' && !out.some(function(s){return s.includes('Strong\'s Greek')||s.includes('Thayer');}))
        out.push('Thayer\'s Greek Lexicon (sources/thayers-greek-lexicon.txt)');
    }
    if(dict && Array.isArray(dict.sources)){
      for(const s of dict.sources) if(s && out.indexOf(s)<0) out.push(s);
    }
    const passageNote = _passageNotes((opts&&opts.ref)||'');
    if(passageNote){
      out.push('SWRV Curated Passage Note (data/contextual-sense-notes.js)');
    }
    if(!out.length){
      out.push('Contextual fallback based on displayed Bible version and passage context (no verified original-word mapping in current tagged data)');
    }
    return out;
  }
  function _normalizeAuditStatus(card, hasOriginal, hasCurated){
    if(hasCurated && hasOriginal) return 'context-reviewed';
    if(hasCurated && !hasOriginal) return 'context-reviewed with original-word limitation';
    if(!hasCurated && hasOriginal) return 'context-reviewed with original-word limitation';
    // No curated, no original — honest "needs manual review" state.
    return 'needs manual review';
  }
  function getWordStudyData(opts){
    opts = opts || {};
    // Reuse the contextual-meaning engine but normalize to strict contract.
    const inner = getContextualMeaning(opts);
    const verse = opts.verse || null;
    const ew    = String(opts.englishWord||'').toLowerCase();
    const dict  = _dictLookup(ew);
    const phrase = _phraseContext(verse, ew);

    const hasOriginal = !!(inner && inner.exactWordUsedHere && inner.exactWordUsedHere.original && String(inner.exactWordUsedHere.original).trim());
    const exact = {
      english: opts.englishWord || '',
      original: hasOriginal ? inner.exactWordUsedHere.original : 'Exact original-word mapping unavailable in current tagged data',
      strongs:  hasOriginal && inner.exactWordUsedHere.strongs ? inner.exactWordUsedHere.strongs : 'Unavailable',
      morphology: (inner.sense && inner.sense.exactTag && inner.sense.exactTag.m) ? inner.sense.exactTag.m : 'Morphology not present in current tagged morphology dataset',
      phrase: phrase || (inner.exactWordUsedHere && inner.exactWordUsedHere.phrase) || ''
    };
    if(hasOriginal){
      if(inner.exactWordUsedHere.language) exact.language = inner.exactWordUsedHere.language;
      if(inner.exactWordUsedHere.transliteration) exact.transliteration = inner.exactWordUsedHere.transliteration;
    }

    const hasCurated = !!(inner && inner.contextualMeaningHere);
    // CONTEXT_SENSE disambiguation: when we have a specific Strong's ID, use the
    // sense-specific gloss (more precise than the generic dict.plain fallback).
    const _csEntry = window.CONTEXT_SENSE && window.CONTEXT_SENSE[ew];
    const _csGloss = exact.strongs && exact.strongs!=='Unavailable' && _csEntry && _csEntry.byStrongs
      ? (_csEntry.byStrongs[exact.strongs] && _csEntry.byStrongs[exact.strongs].gloss) : null;
    const contextualMeaningHere = hasCurated
      ? inner.contextualMeaningHere
      : _csGloss
        ? (_csGloss + (phrase ? ' In '+(opts.ref||'this verse')+', the word appears in the phrase: "'+phrase+'."' : ''))
        : _honestContextualFallback(opts, {exactWordUsedHere:exact, sense:inner.sense}, verse);

    const whyThisMeaningFits = (inner && inner.whyThisMeaningFits)
      ? inner.whyThisMeaningFits
      : _honestWhyFallback(opts, {exactWordUsedHere:exact, sense:inner.sense}, verse);

    const fullWordRange = (inner && Array.isArray(inner.fullWordRange)) ? inner.fullWordRange.slice() : [];
    const notMeantHere  = (inner && Array.isArray(inner.notMeantHere))  ? inner.notMeantHere.slice()  : [];

    // Honest confidence ladder: high requires both curated and tagged.
    let confidence = 'low';
    if(hasCurated && hasOriginal) confidence = 'high';
    else if(hasCurated || hasOriginal) confidence = 'medium';

    const auditStatus = _normalizeAuditStatus({}, hasOriginal, hasCurated);
    const sources = _collectSources(opts, {exactWordUsedHere:exact, sense:inner.sense}, dict);

    const deepContext = _buildDeepContext(opts, {exactWordUsedHere:exact, sense:inner.sense}, verse, dict);
    return {
      bibleVersion: opts.bibleVersion || 'KJV',
      exactWordUsedHere: exact,
      contextualMeaningHere: contextualMeaningHere,
      deepContext: deepContext,
      fullWordRange: fullWordRange,
      notMeantHere: notMeantHere,
      whyThisMeaningFits: whyThisMeaningFits,
      sources: sources,
      confidence: confidence,
      auditStatus: auditStatus,
      // Carry-throughs for renderer convenience (non-contract fields, ignored by audit):
      bookContextNote: inner.bookContextNote,
      sense: inner.sense,
      _hasCurated: hasCurated,
      _hasOriginal: hasOriginal
    };
  }
  window.getWordStudyData = getWordStudyData;

  // ============================================================
  // validateDefinitionCard(card) — automated regression guard.
  // A rendered card must pass these structural checks. The validator
  // returns a list of failures; the audit harness uses it to flag
  // entries that fall back to broad lexical data as contextual meaning.
  // ============================================================
  function validateDefinitionCard(card){
    const fails = [];
    if(!card) { fails.push('card is null'); return {ok:false, fails:fails}; }
    if(!card.exactWordUsedHere) fails.push('missing exactWordUsedHere');
    else {
      const x = card.exactWordUsedHere;
      if(!x.english || !String(x.english).trim()) fails.push('exactWordUsedHere.english is empty');
      if(typeof x.original==='undefined' || x.original===null) fails.push('exactWordUsedHere.original is null/undefined (should be a string or fallback sentinel)');
      if(typeof x.strongs ==='undefined' || x.strongs===null)  fails.push('exactWordUsedHere.strongs is null/undefined (should be string or "Unavailable")');
      if(typeof x.morphology==='undefined' || x.morphology===null) fails.push('exactWordUsedHere.morphology is null/undefined (should be string or "Unavailable")');
      if(typeof x.phrase==='undefined' || x.phrase===null) fails.push('exactWordUsedHere.phrase is null/undefined');
    }
    // Contextual meaning here must be a non-empty string and must NOT be
    // a Strong's-def restatement.
    if(!card.contextualMeaningHere || !String(card.contextualMeaningHere).trim()){
      fails.push('contextualMeaningHere is blank');
    } else {
      const lex = card.sense && card.sense.exactLex;
      if(lex && lex.def && String(card.contextualMeaningHere).trim()===String(lex.def).trim()){
        fails.push('contextualMeaningHere is identical to Strong\'s def');
      }
      if(lex && lex.kjv_def && String(card.contextualMeaningHere).trim()===String(lex.kjv_def).trim()){
        fails.push('contextualMeaningHere is identical to Strong\'s KJV def');
      }
      if(String(card.contextualMeaningHere).length > 1800){
        fails.push('contextualMeaningHere is too long for a contextual note (>1800 chars)');
      }
    }
    // Full word range required only for true multi-meaning words.
    if(card.exactWordUsedHere && (!card.fullWordRange || !card.fullWordRange.length)){
      const ew = (card.exactWordUsedHere.english||'').toLowerCase();
      const dict = (typeof window!=='undefined' ? window.ENGLISH_BIBLE_DICT : null) && (window.ENGLISH_BIBLE_DICT[ew] || (typeof _dictLookup==='function' ? _dictLookup(ew) : null));
      const isMultiMeaning = dict && Array.isArray(dict.originals) && dict.originals.length>1;
      if(isMultiMeaning){
        fails.push('fullWordRange is empty for a multi-meaning word');
      }
    }
    if(!Array.isArray(card.fullWordRange))  fails.push('fullWordRange is not an array');
    if(!Array.isArray(card.notMeantHere))   fails.push('notMeantHere is not an array');
    if(!Array.isArray(card.sources))        fails.push('sources is not an array');
    if(card.sources && !card.sources.length) fails.push('sources is empty');
    if(!card.whyThisMeaningFits || !String(card.whyThisMeaningFits).trim()) fails.push('whyThisMeaningFits is blank');
    if(!card.confidence) fails.push('confidence is missing');
    else if(['high','medium','low'].indexOf(card.confidence)<0) fails.push('confidence value not in {high,medium,low}');
    if(!card.auditStatus) fails.push('auditStatus is missing');
    else if(['context-reviewed','context-reviewed with original-word limitation','needs manual review','restored from previous build and reviewed'].indexOf(card.auditStatus)<0){
      fails.push('auditStatus value "'+card.auditStatus+'" not in allowed enum');
    }
    return { ok: fails.length===0, fails: fails };
  }
  window.validateDefinitionCard = validateDefinitionCard;

  function renderTabDefine(state, v, lf){
    if(lf.define===false) return '<div class="sheet-empty">Definitions layer is off. Enable via 🎛 Layers.</div>';
    const word = state.focusWord;
    let html = '';
    if(word){
      // Use the full-spec engine; it returns the strict 7-section contract
      // with honest fallbacks instead of nulls. Renderer trusts the contract.
      const card = getWordStudyData({ verse:v, englishWord:word, ref:state.ref, book:state.book, bibleVersion:state.bibleVersion||'KJV' });
      const dict = _dictLookup(word);
      const ew = word.toLowerCase();

      // ===== SECTION 1: EXACT WORD USED HERE =====
      html += '<div class="sheet-section sheet-used">';
      html += '<div class="sheet-section-label sheet-section-headline">EXACT WORD USED HERE</div>';
      html += '<div class="used-row"><b>English:</b> '+_escape(word)+'</div>';
      const x = card.exactWordUsedHere;
      const _hasOriginal = x.original && x.original!=='Exact original-word mapping unavailable in current tagged data';
      if(_hasOriginal){
        html += '<div class="used-row"><b>'+_escape(x.language||'')+':</b> '+_escape(x.original)+'</div>';
        if(x.transliteration) html += '<div class="used-row"><b>Transliteration:</b> '+_escape(x.transliteration)+'</div>';
        html += '<div class="used-row"><b>Strong\'s:</b> <button class="lex-pill" onclick="showStrongs(\''+_escape(x.strongs)+'\')">'+_escape(x.strongs)+'</button></div>';
        const _morphDecoded = _decodeMorph(x.morphology);
        if(_morphDecoded){
          html += '<div class="used-row"><b>Morphology:</b> <span style="font-family:monospace;font-size:11px;color:var(--fg-dim);">'+_escape(x.morphology)+'</span> <span style="color:var(--fg-mute);font-size:12px;">→ '+_escape(_morphDecoded)+'</span></div>';
        } else {
          html += '<div class="used-row" style="color:var(--fg-dim);font-size:12px;"><b>Morphology:</b> <span style="opacity:0.5;">— not tagged for this verse</span></div>';
        }
      } else {
        html += '<div class="used-row used-warn"><b>⚠ '+_escape(x.original)+'</b></div>';
        const _morphFallback = _decodeMorph(x.morphology);
        html += '<div class="used-row" style="font-size:12px;">Strong\'s: '+_escape(x.strongs)+(_morphFallback?' · Morphology: '+_escape(_morphFallback):'')+'</div>';
        if(card.sense && card.sense.reason) html += '<div class="used-row" style="font-size:12px;">'+_escape(card.sense.reason)+'</div>';
      }
      html += '<div class="used-row used-confidence"><b>Bible version:</b> '+_escape(card.bibleVersion||'KJV')+' · <b>Confidence:</b> '+_escape(card.confidence)+' · <b>Audit:</b> '+_escape(card.auditStatus)+'</div>';
      html += '<div class="used-row used-snippet"><b>Exact phrase here:</b> <i>'+_escape(x.phrase)+'</i></div>';
      html += '</div>';

      // ===== SECTION 2: CONTEXTUAL MEANING HERE =====
      // The engine returns an honest contextual fallback prose when no
      // curated note exists — never null, never a Strong's-def restatement.
      html += '<div class="sheet-section sheet-sense">';
      html += '<div class="sheet-section-label sheet-section-headline">CONTEXTUAL MEANING HERE</div>';
      html += '<div class="sheet-text">'+_formatContextualText(card.contextualMeaningHere, word, x && x.original, x && x.transliteration)+'</div>';
      if(card.bookContextNote) html += '<div class="sheet-source-trace" style="margin-top:8px;font-style:italic;">'+_escape(card.bookContextNote)+'</div>';
      html += '</div>';

      // ===== SECTION 2b: DEEP CONTEXT =====
      if(card.deepContext && card.deepContext.trim()){
        html += '<div class="sheet-section sheet-deep-context">';
        html += '<div class="sheet-section-label sheet-section-headline">DEEP CONTEXT</div>';
        // Section label → icon + accent color + background pill
        const _DC_LABELS = [
          {prefix:'Etymology:',          icon:'🔤', accent:'var(--enoch)',   bg:'rgba(0,170,200,0.09)'},
          {prefix:'Cultural background:',icon:'🌍', accent:'#5aad7a',       bg:'rgba(90,173,122,0.09)'},
          {prefix:'Kingdom significance:',icon:'👑',accent:'var(--gold)',   bg:'rgba(212,175,55,0.09)'},
          {prefix:'Ancient-world context:',icon:'🏺',accent:'#c87a2a',     bg:'rgba(200,120,42,0.09)'},
          {prefix:'Lexical senses:',     icon:'📖', accent:'var(--strongs)',bg:'rgba(155,135,210,0.09)'},
          {prefix:'BDB lexical senses:', icon:'📚', accent:'var(--enoch)',  bg:'rgba(0,170,200,0.07)'},
          {prefix:'Greek lexical range:',icon:'🇬🇷',accent:'var(--strongs)',bg:'rgba(155,135,210,0.07)'},
        ];
        const paragraphs = card.deepContext.split(/\n\n+/);
        for(const p of paragraphs){
          const txt = p.trim();
          if(!txt) continue;
          let matched = false;
          for(const lbl of _DC_LABELS){
            if(txt.startsWith(lbl.prefix)){
              const body = txt.slice(lbl.prefix.length).trim();
              html += '<div style="margin-top:8px;border-left:3px solid '+lbl.accent+';padding:8px 10px;border-radius:0 6px 6px 0;background:'+lbl.bg+';">';
              html += '<div style="font-size:10px;font-weight:700;letter-spacing:0.07em;color:'+lbl.accent+';margin-bottom:4px;">'+lbl.icon+' '+_escape(lbl.prefix.replace(':','').toUpperCase())+'</div>';
              // Lexical senses: render as bulleted list, not pipe-separated
              if(lbl.prefix.includes('senses') || lbl.prefix.includes('range')){
                const items = body.split(/\s*\|\s*/);
                html += '<ul style="margin:0 0 0 12px;padding:0;line-height:1.8;font-size:13px;">';
                for(const item of items){
                  if(item.trim()) html += '<li>'+_formatContextualText(item.trim(), word, x&&x.original, x&&x.transliteration)+'</li>';
                }
                html += '</ul>';
              } else {
                html += '<div style="font-size:13px;line-height:1.7;color:var(--fg);">'+_formatContextualText(body, word, x&&x.original, x&&x.transliteration)+'</div>';
              }
              html += '</div>';
              matched = true;
              break;
            }
          }
          if(!matched){
            // Unlabelled paragraph — plain card
            html += '<div style="margin-top:8px;padding:8px 10px;border-radius:6px;background:var(--bg-2);font-size:13px;line-height:1.7;color:var(--fg);">'+_formatContextualText(txt, word, x&&x.original, x&&x.transliteration)+'</div>';
          }
        }
        html += '</div>';
      }

      // ===== SECTION 3: WHY THIS MEANING FITS =====
      html += '<div class="sheet-section sheet-matters">';
      html += '<div class="sheet-section-label sheet-section-headline">WHY THIS MEANING FITS</div>';
      html += '<div class="sheet-text">'+_escape(card.whyThisMeaningFits)+'</div>';
      html += '</div>';

      // ===== SECTION 4: FULL WORD RANGE =====
      // This is where broad lexical data lives — NOT in Contextual Meaning Here.
      if(card.fullWordRange && card.fullWordRange.length){
        html += '<div class="sheet-section sheet-deep">';
        html += '<div class="sheet-section-label sheet-section-headline">FULL WORD RANGE</div>';
        html += '<div class="sheet-help" style="font-size:11px;color:var(--fg-mute);margin-bottom:8px;">The full lexical range of what this word can mean across Scripture. NOT all of these apply in this verse — see <b>Contextual Meaning Here</b> above for what is meant in this passage.</div>';
        html += '<ul class="sheet-list">';
        for(const r of card.fullWordRange) html += '<li>'+_escape(r)+'</li>';
        html += '</ul>';
        if(card.sense.exactLex && card.sense.exactLex.def){
          html += '<div class="sheet-source-trace" style="margin-top:8px;"><b>Strong\'s lexicon:</b> <i>'+_escape(card.sense.exactLex.def)+'</i></div>';
        }
        html += '</div>';
      }

      // ===== SECTION 5: NOT MEANT HERE =====
      if(card.notMeantHere && card.notMeantHere.length){
        html += '<div class="sheet-section sheet-warn-section">';
        html += '<div class="sheet-section-label sheet-section-headline">⚠ NOT MEANT HERE</div>';
        for(const n of card.notMeantHere) html += '<div class="sheet-warn">'+_escape(n)+'</div>';
        html += '</div>';
      }

      // ===== SECTION 6: RELATED WORD FAMILY =====
      if(dict && Array.isArray(dict.originals) && dict.originals.length>1){
        html += '<div class="sheet-section sheet-family">';
        html += '<div class="sheet-section-label sheet-section-headline">RELATED WORD FAMILY</div>';
        html += '<div class="sheet-help" style="font-size:11px;color:var(--fg-mute);margin-bottom:8px;">Related original-language words for "'+_escape(word)+'" — appearing elsewhere in Scripture, not necessarily in this verse.</div>';
        html += '<div class="sheet-chips">';
        const exactSid = x.strongs;
        for(const o of dict.originals){
          const sId = (o.strongs||'').match(/[HG]\d+/)?.[0];
          const isHere = exactSid && sId===exactSid;
          const note = isHere ? '✓ used in this verse' : 'related — not in this verse';
          html += '<button class="lex-pill '+(isHere?'lex-pill-active':'')+'" '+(sId?'onclick="showStrongs(\''+_escape(sId)+'\')"':'')+' title="'+_escape(note+' — '+(o.note||''))+'">'+_escape(o.translit||o.word||sId||'')+(sId?' <span style="font-size:10px;opacity:0.7;">'+_escape(sId)+'</span>':'')+'</button>';
        }
        html += '</div>';
        html += '</div>';
      }

      // ===== SECTION 7: SOURCES =====
      if(Array.isArray(card.sources) && card.sources.length){
        html += '<div class="sheet-section sheet-sources">';
        html += '<div class="sheet-section-label sheet-section-headline">SOURCES</div>';
        html += '<div style="display:flex;flex-direction:column;gap:5px;margin-top:4px;">';
        for(const src of card.sources){
          // Extract Strong's ID if present so we can make it clickable.
          // BDB sources are rendered as plain text — their content is already
          // included inside the Strong's popup, so a duplicate button would open the same thing.
          const _sidMatch = String(src).match(/\b([HG]\d{1,5})\b/);
          const _sid = _sidMatch ? _sidMatch[1] : null;
          const _isBDB = /brown.driver.briggs|bdb/i.test(String(src));
          if(_sid && !_isBDB){
            html += '<button onclick="showStrongs(\''+_escape(_sid)+'\')" style="text-align:left;background:var(--bg-2);border:1px solid var(--line);border-radius:6px;padding:6px 10px;cursor:pointer;font-size:12px;color:var(--fg);font-family:inherit;line-height:1.4;">'
              + '<span style="color:var(--strongs);font-weight:700;font-size:10px;margin-right:6px;">'+_escape(_sid)+'</span>'
              + '<i style="color:var(--fg-mute);">'+_escape(src)+'</i>'
              + ' <span style="float:right;color:var(--fg-dim);font-size:10px;">tap to open →</span>'
              + '</button>';
          } else {
            html += '<div style="font-size:12px;color:var(--fg-mute);padding:4px 2px;font-style:italic;">'+_escape(src)+'</div>';
          }
        }
        html += '</div>';
        if(dict && dict.confidence) html += '<div class="sheet-source-trace" style="opacity:0.7;margin-top:6px;font-size:11px;">Dictionary confidence: '+_escape(dict.confidence)+'</div>';
        html += '</div>';
      }
    } else {
      // No word focused — list the verse's definable words as taps.
      html += '<div class="sheet-section sheet-used"><div class="sheet-section-label">Tap a word in the verse to define it</div>';
      const defs = Array.isArray(v.definableWords) ? v.definableWords : [];
      if(defs.length){
        html += '<div class="sheet-chips">';
        for(const w of defs){ html += '<button class="lex-pill" onclick="openStudySheet(\''+_escape(state.ref)+'\',{word:\''+_escape(w)+'\',tab:\'define\'})">'+_escape(w)+'</button>'; }
        html += '</div>';
      } else {
        html += '<div class="sheet-empty">No definable terms tagged for this verse. Try the Original tab.</div>';
      }
      html += '</div>';
    }
    return html;
  }

  function renderTabOriginal(state, v, lf){
    if(lf.original===false) return '<div class="sheet-empty">Original-language layer is off. Enable via 🎛 Layers.</div>';
    if(!Array.isArray(v.strongsTags) || !v.strongsTags.length) return '<div class="sheet-empty">No original-language tags for this verse.</div>';
    const isGrk = v.strongsTags[0].sId && v.strongsTags[0].sId.startsWith('G');
    let html = '<div class="sheet-section"><div class="sheet-section-label">'+v.strongsTags.length+' '+(isGrk?'Greek':'Hebrew')+' root'+(v.strongsTags.length===1?'':'s')+'</div>';
    html += '<div class="sheet-chips">';
    for(const t of v.strongsTags){
      const cleanW = (t.w||'').replace(/[֑-ֽֿ-ׇ]/g,'');
      const greek = t.sId && t.sId.startsWith('G');
      const lex = greek ? (window.STRONGS_GRK && window.STRONGS_GRK[String(t.sId).replace(/^G/,'')]) : (window.STRONGS_HEB && window.STRONGS_HEB[t.sId]);
      const gloss = lex ? (lex.kjv_def || lex.def || lex.strongs_def || '') : '';
      html += '<button class="lex-pill lex-pill-big" onclick="showStrongs(\''+_escape(t.sId)+'\')" title="'+_escape(gloss).slice(0,160)+'">';
      html += '<span class="lex-pill-word" style="direction:'+(greek?'ltr':'rtl')+'">'+_escape(cleanW||t.sId)+'</span>';
      html += '<span class="lex-pill-id">'+_escape(t.sId)+'</span>';
      if(gloss) html += '<span class="lex-pill-gloss">'+_escape(String(gloss).split(/[;,]/)[0].slice(0,40))+'</span>';
      html += '</button>';
    }
    html += '</div></div>';
    return html;
  }

  function renderTabTranslations(state, v, lf){
    if(lf.translations===false) return '<div class="sheet-empty">Translation layer is off. Enable via 🎛 Layers.</div>';
    const sources = v.sources || {};
    const keys = Object.keys(sources);
    if(!keys.length) return '<div class="sheet-empty">No translation layers for this verse.</div>';
    const order = ['KJV','BSB','TANAKH','HEBREW','GREEK_NT','LXX_ENG','LXX_GREEK','AMP'];
    const sorted = keys.slice().sort(function(a,b){ const ia=order.indexOf(a), ib=order.indexOf(b); return (ia<0?99:ia)-(ib<0?99:ib); });
    const meta = (window.SOURCES_META && window.SOURCES_META) || {
      KJV:{name:'King James Version', short:'KJV'},
      BSB:{name:'Berean Standard Bible', short:'BSB'},
      TANAKH:{name:'Tanakh JPS 1917', short:'TNK'},
      HEBREW:{name:'Hebrew Masoretic', short:'HEB'},
      GREEK_NT:{name:'Greek NT', short:'GRC'},
      LXX_ENG:{name:'Septuagint (English)', short:'LXX'},
      LXX_GREEK:{name:'Septuagint (Greek)', short:'LXX-G'},
      AMP:{name:'Amplified', short:'AMP'}
    };
    let html = '<div class="sheet-section"><div class="sheet-section-label">Translation comparison</div>';
    for(const k of sorted){
      const m = meta[k] || {name:k, short:k};
      const filterKey = (k==='AMP'?'amp':(k==='LXX_ENG'||k==='LXX_GREEK'?'lxx':(k==='TANAKH'?'tanakh':null)));
      if(filterKey && lf[filterKey]===false) continue;
      const t = sources[k] && sources[k].text;
      if(!t) continue;
      html += '<div class="sheet-trans"><div class="sheet-trans-label">'+_escape(m.short)+' <span style="font-weight:400;color:var(--fg-dim);">'+_escape(m.name)+'</span></div><div class="sheet-trans-text">'+_escape(t)+'</div></div>';
    }
    html += '</div>';
    // AMP-style nuance note (project original commentary)
    if(typeof getAmpStyleNote==='function'){
      const ampNote = getAmpStyleNote(v);
      if(ampNote && lf.amp!==false){
        html += '<div class="sheet-section"><div class="sheet-section-label">🟣 AMP-Style — Hebrew-Audited Rendering</div>';
        html += '<div class="sheet-text">'+_escape(ampNote.text||'')+'</div>';
        if(ampNote.audit) html += '<div class="sheet-source-trace"><b>Audit:</b> '+_escape(ampNote.audit)+'</div>';
        html += '</div>';
      }
    }
    return html;
  }

  function renderTabCulture(state, v, lf){
    if(lf.culture===false) return '<div class="sheet-empty">Cultural context layer is off. Enable via 🎛 Layers.</div>';
    let html = '';
    // Verse-level cultural data (Genesis-style)
    if(v.cultural){
      html += '<div class="sheet-section"><div class="sheet-section-label">🌍 Cultural Context</div>';
      if(v.cultural.title) html += '<div class="sheet-text" style="font-weight:700;">'+_escape(v.cultural.title)+'</div>';
      if(v.cultural.detail) html += '<div class="sheet-text" style="margin-top:6px;">'+_escape(v.cultural.detail)+'</div>';
      if(v.cultural.sources) html += '<div class="sheet-source-trace"><b>Sources:</b> '+_escape(v.cultural.sources)+'</div>';
      html += '</div>';
    }
    // Cross-ref cultural cards by passage key
    if(window.CULTURAL_CARDS){
      const tryKeys = [state.ref, state.book+' '+state.chapter+':'+state.verse, state.book+' '+state.chapter];
      const seen = new Set();
      for(const k in window.CULTURAL_CARDS){
        for(const tk of tryKeys){
          if(_keyMatchesRef(k,tk) && !seen.has(k)){
            seen.add(k);
            const c = window.CULTURAL_CARDS[k];
            html += '<div class="sheet-section"><div class="sheet-section-label">🌍 '+_escape(c.title||k)+'</div>';
            if(c.cultural) html += '<div class="sheet-text">'+_escape(c.cultural)+'</div>';
            if(c.misunderstood) html += '<div class="sheet-warn"><b>⚠ Misunderstanding:</b> '+_escape(c.misunderstood)+'</div>';
            if(c.matters) html += '<div class="sheet-text" style="margin-top:6px;color:var(--gold);"><b>⚜ Why:</b> '+_escape(c.matters)+'</div>';
            if(Array.isArray(c.sources)&&c.sources.length) html += '<div class="sheet-source-trace"><b>Sources:</b> '+c.sources.map(_escape).join(' · ')+'</div>';
            html += '</div>';
          }
        }
      }
    }
    // Translation-loss variants
    if(Array.isArray(v.variants)){
      for(const variant of v.variants){
        html += '<div class="sheet-section"><div class="sheet-section-label">⚠ Translation Loss — '+_escape(variant.label||'')+'</div>';
        if(variant.note) html += '<div class="sheet-text">'+_escape(variant.note)+'</div>';
        html += '</div>';
      }
    }
    if(!html) html = '<div class="sheet-empty">No cultural-context data tagged for this verse yet.</div>';
    return html;
  }

  function renderTabKingdom(state, v, lf){
    if(lf.kingdom===false) return '<div class="sheet-empty">Kingdom Lens layer is off. Enable via 🎛 Layers.</div>';
    let html = '';
    if(v.kingdomLens){
      html += '<div class="sheet-section"><div class="sheet-section-label">⚜ Kingdom Lens</div><div class="sheet-text">'+_escape(v.kingdomLens)+'</div></div>';
    }
    // Instruction classification cards keyed by passage
    if(window.INSTRUCTION_CARDS && lf.instruction!==false){
      const tryKeys = [state.ref, state.book+' '+state.chapter+':'+state.verse, state.book+' '+state.chapter];
      for(const k in window.INSTRUCTION_CARDS){
        for(const tk of tryKeys){
          if(_keyMatchesRef(k,tk)){
            const ic = window.INSTRUCTION_CARDS[k];
            html += '<div class="sheet-section"><div class="sheet-section-label">📜 '+_escape(ic.title||k)+' — Instruction</div>';
            if(ic.speaker) html += '<div class="sheet-text"><b>Speaker:</b> '+_escape(ic.speaker)+'</div>';
            if(ic.addressed) html += '<div class="sheet-text"><b>Addressed:</b> '+_escape(ic.addressed)+'</div>';
            if(ic.commanded) html += '<div class="sheet-text" style="margin-top:6px;"><b>Commanded:</b> '+_escape(ic.commanded)+'</div>';
            if(ic.category) html += '<div class="sheet-text"><b>Category:</b> '+_escape(ic.category)+'</div>';
            if(ic.misunderstood) html += '<div class="sheet-warn"><b>⚠ Misunderstanding:</b> '+_escape(ic.misunderstood)+'</div>';
            html += '</div>';
          }
        }
      }
    }
    if(!html) html = '<div class="sheet-empty">No Kingdom-Lens or Instruction data tagged for this verse yet.</div>';
    return html;
  }

  function renderTabPeople(state, v, lf){
    if(lf.people===false) return '<div class="sheet-empty">People / Places layer is off. Enable via 🎛 Layers.</div>';
    let html = '';
    const people = (v.peopleInVerse||[]).slice();
    const places = (v.placesInVerse||[]).slice();
    if(people.length){
      html += '<div class="sheet-section"><div class="sheet-section-label">👤 People in this verse</div><div class="sheet-chips">';
      for(const p of people){
        html += '<button class="lex-pill" onclick="showPerson(\''+_escape(p)+'\')">'+_escape(p)+'</button>';
      }
      html += '</div></div>';
    }
    if(places.length){
      html += '<div class="sheet-section"><div class="sheet-section-label">📍 Places in this verse</div><div class="sheet-chips">';
      for(const p of places){ html += '<button class="lex-pill" onclick="showPlace(\''+_escape(p)+'\')">'+_escape(p)+'</button>'; }
      html += '</div></div>';
    }
    // Group/nation cards relevant to mentioned peoples (Levite→Levites, Philistine→Philistines, etc.)
    if(window.GROUP_NATIONS && people.length){
      for(const p of people){
        const guesses = [p, p+'s', p+'es'];
        for(const g of guesses){
          if(window.GROUP_NATIONS[g]){
            const grp = window.GROUP_NATIONS[g];
            html += '<div class="sheet-section"><div class="sheet-section-label">🌐 '+_escape(grp.name||g)+' — Group / Nation</div>';
            if(grp.origin) html += '<div class="sheet-text"><b>Origin:</b> '+_escape(grp.origin)+'</div>';
            if(grp.region) html += '<div class="sheet-text"><b>Region:</b> '+_escape(grp.region)+'</div>';
            if(grp.religion) html += '<div class="sheet-text"><b>Religion:</b> '+_escape(grp.religion)+'</div>';
            if(grp.appearance && lf.appearance!==false) html += '<div class="sheet-text"><b>Appearance / regional context:</b> '+_escape(grp.appearance)+'</div>';
            if(grp.relationToIsrael) html += '<div class="sheet-text"><b>Relation to Israel:</b> '+_escape(grp.relationToIsrael)+'</div>';
            if(grp.confidence) html += '<div class="sheet-source-trace">Confidence: '+_escape(grp.confidence)+'</div>';
            html += '</div>';
            break;
          }
        }
      }
    }
    if(!html) html = '<div class="sheet-empty">No people or places tagged for this verse.</div>';
    return html;
  }

  function renderTabSources(state, v, lf){
    if(lf.sources===false) return '<div class="sheet-empty">Outside Sources layer is off. Enable via 🎛 Layers.</div>';
    let html = '';
    if(v.enochRef && lf.enoch!==false) html += '<div class="sheet-section"><div class="sheet-section-label">📖 1 Enoch</div><div class="sheet-text">'+_escape(v.enochRef)+'</div></div>';
    if(v.josephusRef && lf.josephus!==false) html += '<div class="sheet-section"><div class="sheet-section-label">📜 Josephus, Antiquities</div><div class="sheet-text">'+_escape(v.josephusRef)+'</div></div>';
    // Cross-source map (chapter-level Enoch/Josephus links)
    if(window.CROSS_SOURCE_MAP && window.CROSS_SOURCE_MAP[state.book] && window.CROSS_SOURCE_MAP[state.book][state.chapter]){
      const refs = window.CROSS_SOURCE_MAP[state.book][state.chapter];
      for(const r of refs){
        if(r.type==='enoch' && lf.enoch===false) continue;
        if(r.type==='josephus' && lf.josephus===false) continue;
        const badge = r.type==='enoch'?'📖 1 Enoch':(r.type==='josephus'?'📜 Josephus':'📚 Companion');
        html += '<div class="sheet-section"><div class="sheet-section-label">'+badge+' — '+_escape(r.ref||'')+'</div>';
        if(r.summary||r.note) html += '<div class="sheet-text">'+_escape(r.summary||r.note)+'</div>';
        html += '</div>';
      }
    }
    if(!html) html = '<div class="sheet-empty">No outside-source references tagged for this verse.</div>';
    return html;
  }

  function renderTabCrossRefs(state, v, lf){
    if(lf.crossrefs===false) return '<div class="sheet-empty">Cross References layer is off. Enable via 🎛 Layers.</div>';
    let html = '';
    // Parallel passages
    if(Array.isArray(window.PARALLEL_PASSAGES)){
      for(const p of window.PARALLEL_PASSAGES){
        if(Array.isArray(p.passages) && p.passages.some(function(s){return s.indexOf(state.book)===0;})){
          html += '<div class="sheet-section"><div class="sheet-section-label">🔗 Parallel — '+_escape(p.title||p.id)+'</div>';
          html += '<div class="sheet-text">'+p.passages.map(_escape).join(' · ')+'</div></div>';
        }
      }
    }
    // Prophecy fulfillment
    if(Array.isArray(window.PROPHECY_FULFILLMENT)){
      for(const p of window.PROPHECY_FULFILLMENT){
        if((p.prophecy && p.prophecy.indexOf(state.book)===0) || (p.fulfillment && p.fulfillment.indexOf(state.book)===0)){
          html += '<div class="sheet-section"><div class="sheet-section-label">📜 Prophecy → Fulfillment</div>';
          if(p.prophecy) html += '<div class="sheet-text"><b>Prophecy:</b> '+_escape(p.prophecy)+'</div>';
          if(p.fulfillment) html += '<div class="sheet-text"><b>Fulfillment:</b> '+_escape(p.fulfillment)+'</div>';
          if(p.summary) html += '<div class="sheet-text" style="margin-top:4px;">'+_escape(p.summary)+'</div>';
          html += '</div>';
        }
      }
    }
    if(!html) html = '<div class="sheet-empty">No parallel or prophecy links tagged for this verse.</div>';
    return html;
  }

  // ---------- Bootstrap on load ----------
  function bootUx(){
    setReadingMode(getReadingMode());
    // Close sheet on Escape
    document.addEventListener('keydown', function(e){
      if(e.key==='Escape'){
        const sheet = document.getElementById('studySheet');
        if(sheet && sheet.classList.contains('open')) closeStudySheet();
      }
    });
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', bootUx); } else { bootUx(); }
})();

// Word-tap-from-verse should route to the Study Sheet on the Define tab ONLY
// — not also pop up the legacy modal definition card. (Earlier this wrapper
// called both, which produced two overlapping definition surfaces visible at
// the same time.) The legacy showDef popup is still reachable for non-verse
// callers: related-word chips inside the sheet, search-result taps on
// definition entries, theme/people cards, etc.
(function(){
  const _origShowDef = window.showDef;
  if(typeof _origShowDef !== 'function') return;
  window.showDef = function(word, opts){
    // If opts is a verse-ref string, open the Study Sheet on Define and STOP.
    // Do not also open the legacy popup — the sheet is the canonical surface
    // in Study/Scholar mode, and Read mode shouldn't surface inline study
    // content automatically anyway.
    if(typeof opts === 'string' && /\d+:\d+/.test(opts)){
      try { window.openStudySheet(opts, {word:word, tab:'define'}); } catch(e){}
      return;
    }
    // All other callers (related-words, search results, theme/people cards
    // that fall through to showDef, etc.) keep the legacy popup behavior.
    _origShowDef.apply(this, arguments);
  };
})();

/* ============================================================
   NEW READER MODE — beginner-friendly definition panel
   In 'read' mode: hide BDB/ANE deep dives, show only plain English + basic definition.
   In 'study' mode: show everything except raw BDB block.
   In 'scholar' mode: show absolutely everything.
   ============================================================ */
(function(){
  const style = document.createElement('style');
  style.textContent = `
    /* New Reader mode: hide scholarly-depth sections in the def popup */
    body[data-reading-mode="read"] .strongs-section,
    body[data-reading-mode="read"] .scholar-depth {
      display: none !important;
    }
    /* Study mode: show strongs but still hide raw BDB dump */
    body[data-reading-mode="study"] .scholar-depth {
      display: none !important;
    }
    /* Plain English section: always show prominently */
    .plain-section {
      order: -1;
    }
    /* New Reader mode: plain section gets extra breathing room */
    body[data-reading-mode="read"] .plain-section {
      border-left-width: 5px;
      padding: 14px 16px;
    }
    body[data-reading-mode="read"] .plain-text {
      font-size: 18px;
    }
    /* In New Reader mode soften the strong's pill in verse to just show word */
    body[data-reading-mode="read"] .root-id,
    body[data-reading-mode="read"] .root-original { font-size: 11px; }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   CHAPTER INTRO CARDS — plain-English story setup before each chapter.
   Automatically renders before chapter 1 content for every book,
   and before each Genesis chapter. Beginner-facing, always visible.
   ============================================================ */
window.CHAPTER_INTROS = {
  'Genesis': {
    book: 'Genesis means "In the beginning." This is the first book of the Bible — it tells the story of how everything started: the universe, humanity, sin, and the promise of a rescue. It follows the first family and the first nation God chose to work through.',
    chapters: {
      1: 'God creates everything — light, sky, land, sea, plants, animals, and finally human beings — out of nothing, in six days. On the seventh day He rests. Every living thing is called "good." Humans are made in God\'s image and given charge over the earth.',
      2: 'A closer look at the sixth day. God forms the man from the dust and breathes life into him. He plants a garden called Eden. He creates the woman from the man\'s side. The two are joined as one — the first marriage.',
      3: 'The first choice that broke everything. A serpent twists God\'s words. The woman and the man eat the one fruit God said not to touch. Shame enters the world. God confronts them, pronounces consequences — and in the middle of judgment, gives the first promise of rescue.',
      4: 'The first murder. Cain kills his brother Abel out of jealousy. Cain is sent away. Eve has another son — Seth — and through his line, people begin to call on God\'s name.',
      5: 'Ten generations from Adam to Noah. A genealogy — but hidden in it is Enoch, who walked so closely with God that God simply took him.',
      6: 'The world fills with evil. God grieves. He chooses one man — Noah — who walked with God. God tells Noah to build an ark. The corruption that filled the earth is going to be addressed.',
      7: 'The flood. Rain falls for forty days and nights. Every living thing outside the ark dies. Noah, his family, and the animals ride it out. The same water that judges also saves — the ark stays afloat.',
      8: 'The water recedes. Noah sends out a raven, then a dove. The dove returns with an olive branch — land is drying out. God tells Noah to leave the ark. Noah builds an altar and worships. God commits to never flooding the whole earth again.',
      9: 'God makes a covenant with Noah and all living creatures. The sign: a rainbow. God restates the charge to fill the earth. Noah plants a vineyard. An incident with his sons sets up the future of three people-groups.',
      10: 'The Table of Nations — the 70 peoples who descended from Noah\'s three sons. This is the ancient world\'s genealogy of nations.',
      11: 'Babel. All humanity speaks one language and builds a tower to make themselves great. God confuses their language and scatters them. Then the line narrows to focus: Shem\'s descendants lead to Terah, who leads to Abram.',
      12: 'Everything changes. God calls Abram out of his homeland with an extraordinary promise: "I will make you a great nation. Through you all families of the earth will be blessed." Abram obeys without knowing where he\'s going.',
      13: 'Abram and his nephew Lot part ways because their flocks are too large to share the land. Lot chooses the Jordan valley. Abram stays in Canaan. God repeats the land promise.',
      14: 'Four kings attack five. Lot gets captured in the battle. Abram takes 318 trained men and rescues him. On the way back he meets Melchizedek — a mysterious king-priest who gives bread and wine and blesses Abram.',
      15: 'The covenant cut in darkness. Abram asks God how he can know the promises are real. God tells him to count the stars — that\'s how many descendants he\'ll have. Abram believes, and God declares him righteous. Then God passes through the sacrifice alone — the whole weight of the covenant is on God.',
      16: 'Sarai can\'t get pregnant. She gives her servant Hagar to Abram as a surrogate. Hagar conceives and despises Sarai. Hagar flees. God meets her in the wilderness — the only person in the Bible who gives God a name: "You are the God who sees me."',
      17: 'God changes Abram\'s name to Abraham ("father of many") and Sarai\'s to Sarah. He institutes circumcision as the covenant sign. He promises a son — Isaac — from Sarah within a year. Abraham is 99.',
      18: 'Three visitors arrive at Abraham\'s tent. One is God. He tells Abraham that Sarah will have a son. Sarah laughs. Then God tells Abraham he\'s going to investigate Sodom — and Abraham intercedes, bargaining God down to: "Will you spare the city for 10 righteous people?"',
      19: 'Two angels arrive in Sodom. The men of the city surround Lot\'s house and demand access to the visitors. The angels blind them. At dawn, the angels drag Lot\'s family out. Fire and brimstone destroy Sodom and Gomorrah. Lot\'s wife looks back and becomes a pillar of salt.',
      20: 'Abraham moves to Gerar and again calls Sarah his sister. King Abimelech takes her — but God warns him in a dream. Abimelech returns her. Abraham prays for him. The pattern from Egypt (ch. 12) repeats.',
      21: 'Finally — the promised son is born. Sarah laughs again, but now with joy. They name him Isaac ("he laughs"). Hagar and Ishmael are sent away. God provides water in the wilderness. Abraham makes a treaty with Abimelech at Beersheba.',
      22: 'The hardest test in Genesis. God tells Abraham to offer Isaac — his only son, the son of the promise — as a sacrifice on Mount Moriah. Abraham obeys. At the last moment God stops him and provides a ram caught in a thicket. God swears the covenant oath with His own name.',
      23: 'Sarah dies at 127. Abraham mourns, then negotiates to buy a burial plot — the cave of Machpelah in Hebron. He pays full price, refusing gifts, to own the land legally. It becomes the first piece of the Promised Land in Abraham\'s possession.',
      24: 'The longest chapter in Genesis. Abraham sends his servant to find a wife for Isaac from his own people. The servant prays for a specific sign. Rebekah appears and fulfills it exactly. She agrees to go. Isaac sees her in the field at evening and she becomes his wife.',
      25: 'Abraham dies and is buried with Sarah. Isaac and Ishmael bury him together. Then the story shifts: Rebekah is pregnant with twins. They struggle in the womb. God says two nations are inside her. Esau comes out first, Jacob second — grabbing Esau\'s heel. Esau sells his birthright for a bowl of stew.',
      26: 'Isaac repeats his father\'s patterns — calling Rebekah his sister, re-digging Abraham\'s wells, making a covenant with Abimelech. God blesses him just as He blessed Abraham. The promise continues to the second generation.',
      27: 'Isaac is old and nearly blind. He asks Esau to hunt game for a blessing meal. Rebekah overhears and schemes with Jacob to steal the blessing first. Jacob impersonates Esau and receives the firstborn blessing. When Esau arrives, the blessing is gone. Esau weeps and vows to kill Jacob.',
      28: 'Jacob flees to his uncle Laban. On the way, he sleeps with a stone for a pillow and dreams of a stairway to heaven with angels ascending and descending. God speaks from the top: same promise He gave Abraham and Isaac. Jacob wakes up and calls the place Bethel — "house of God."',
      29: 'Jacob meets Rachel at a well and falls in love immediately. He works seven years for her — "they seemed like only a few days because of his love for her." Laban tricks him on the wedding night, giving him Leah instead. Jacob works another seven years for Rachel.',
      30: 'The competition between Leah and Rachel produces ten sons and a daughter. Then God opens Rachel\'s womb — she has Joseph. Jacob negotiates with Laban for his own flocks, and through a series of breeding schemes, becomes wealthy.',
      31: 'Jacob quietly leaves with his wives, children, and flocks. Rachel steals her father\'s household gods. Laban chases and catches them. They argue. God has been with Jacob, not Laban. They part with a covenant pile of stones as witness.',
      32: 'Jacob is terrified Esau will attack. He sends gifts ahead and divides his camp. Then at night, a man wrestles with him until dawn — won\'t let go. The man is God. Jacob demands a blessing and gets one — and a new name: Israel, "one who struggles with God." His hip is dislocated.',
      33: 'The reunion. Jacob bows seven times approaching Esau. Esau runs to meet him and embraces him. It\'s not the confrontation Jacob feared — it\'s restoration. Jacob settles at Shechem.',
      34: 'Dinah, Jacob\'s daughter, is violated by Shechem the prince. He wants to marry her. Her brothers Simeon and Levi agree — if every male in the city is circumcised. On the third day, when the men are in pain, they attack and kill them all. Jacob is horrified.',
      35: 'God tells Jacob to return to Bethel. He puts away foreign gods and the whole household is purified. God confirms the name Israel and repeats the covenant promise. Rachel dies giving birth to Benjamin. Isaac dies.',
      36: 'Esau\'s descendants and the kings of Edom. The line that doesn\'t carry the covenant — but still accounted for.',
      37: 'Joseph is seventeen and his father\'s favorite. Jacob gives him a special robe. Joseph has two dreams that imply his family will bow to him. His brothers hate him. They throw him in a pit and sell him to Ishmaelite traders going to Egypt for 20 pieces of silver. They bring back the robe soaked in goat\'s blood.',
      38: 'A break in Joseph\'s story. Judah, one of the brothers, has three sons. The first two die. He refuses to give his daughter-in-law Tamar his third son. She disguises herself as a prostitute, sleeps with Judah, and gets pregnant. Judah\'s hypocrisy exposed. Tamar gives birth to twins — one of whom is in the Messianic line.',
      39: 'Joseph is bought by Potiphar, an Egyptian official. God is with Joseph and everything he touches prospers. Potiphar puts him in charge of everything. Potiphar\'s wife tries to seduce him. He refuses. She accuses him falsely. He\'s thrown in prison.',
      40: 'In prison, Joseph meets Pharaoh\'s cupbearer and baker. Both have dreams. Joseph interprets them — the cupbearer will be restored, the baker will die. Three days later, exactly as Joseph said. The cupbearer forgets to mention Joseph to Pharaoh.',
      41: 'Two years later Pharaoh has two dreams. Nobody can interpret them. The cupbearer finally remembers Joseph. Joseph is brought out of prison. He interprets: seven years of abundance followed by seven years of famine. Pharaoh makes Joseph second in command over all Egypt. Joseph is 30.',
      42: 'The famine reaches Canaan. Jacob sends his ten oldest sons to Egypt to buy grain — except Benjamin. They bow before Joseph without recognizing him. He recognizes them. He tests them, accuses them of spying, demands they bring Benjamin.',
      43: 'The famine gets worse. Jacob finally lets Benjamin go. The brothers return to Egypt. Joseph seats them in exact birth order at dinner — they are stunned. He gives Benjamin five times as much food.',
      44: 'Joseph\'s final test. He plants his silver cup in Benjamin\'s sack. His steward overtakes them on the road. Judah — the same brother who suggested selling Joseph — now offers himself as a slave in Benjamin\'s place to protect his father.',
      45: 'Joseph can\'t hold it together anymore. He sends everyone out and weeps so loudly that Egypt hears. He reveals himself: "I am Joseph your brother." He reassures them — God sent him ahead to save lives. "It was not you who sent me here, but God."',
      46: 'Jacob packs everything and moves to Egypt. God speaks to him in a vision on the road: "Do not be afraid to go down to Egypt — I will go with you, and I will bring you back." 70 people go down into Egypt.',
      47: 'Joseph presents his family to Pharaoh. The famine is severe. People trade their money, then their livestock, then their land, then themselves for food. Only the priests\' land is not sold. Jacob lives in Egypt 17 years. As he\'s dying, he makes Joseph swear to bury him in Canaan.',
      48: 'Jacob is dying. He adopts Joseph\'s two sons — Manasseh and Ephraim — as his own sons, giving Joseph a double portion. He crosses his hands to bless the younger (Ephraim) above the older (Manasseh). The pattern of the younger chosen over the older continues.',
      49: 'Jacob blesses each of his twelve sons with prophetic words. The most important: "The scepter will not depart from Judah...until he to whom it belongs shall come." The Messianic promise narrows to one tribe.',
      50: 'Jacob dies. Joseph weeps over him. His body is embalmed and carried back to Canaan for burial in the cave of Machpelah. His brothers fear Joseph will take revenge now. He weeps again and reassures them: "You intended to harm me, but God intended it for good." Joseph lives 110 years. His last words: "God will surely come to your aid. Carry my bones up from here."'
    }
  }
};

// Render chapter intro card before chapter content
window._renderChapterIntro = function(book, chapterNum) {
  const bookData = window.CHAPTER_INTROS && window.CHAPTER_INTROS[book];
  if (!bookData) return '';
  const chText = bookData.chapters && bookData.chapters[chapterNum];
  const bookText = chapterNum === 1 ? bookData.book : null;
  if (!chText && !bookText) return '';
  let h = '<div class="chapter-intro-card">';
  if (bookText) {
    h += '<div class="chapter-intro-book">' + escapeHtml(bookText) + '</div>';
  }
  if (chText) {
    h += '<div class="chapter-intro-label">Chapter ' + chapterNum + '</div>';
    h += '<div class="chapter-intro-text">' + escapeHtml(chText) + '</div>';
  }
  h += '</div>';
  return h;
};

/* ============================================================
   FIRST-LAUNCH ONBOARDING — 3-card swipe shown once to new users.
   Explains chapters/verses, word-tapping, and reading modes.
   Stored in localStorage so it only shows once.
   ============================================================ */
(function(){
  const KEY = 'swrv_onboarded_v1';
  function alreadyOnboarded(){
    try { return localStorage.getItem(KEY) === '1'; } catch(e){ return true; }
  }
  function markOnboarded(){
    try { localStorage.setItem(KEY, '1'); } catch(e){}
  }

  function buildOnboarding(){
    const cards = [
      {
        icon: '📚',
        title: 'Welcome to the SWRV Kingdom Study Bible',
        body: 'The Bible is a library of 66 books. Each book is broken into chapters, and each chapter into verses. A verse address like "Genesis 1:1" means Book: Genesis, Chapter 1, Verse 1. Use the navigation at the top to move between books and chapters.'
      },
      {
        icon: '👆',
        title: 'Tap any underlined word',
        body: 'Every underlined word in the text has a definition you can explore. Tap it to see what the original Hebrew or Greek word means, where it comes from, and why it matters. Start with words like "created," "covenant," or "grace."'
      },
      {
        icon: '📖',
        title: 'Three reading modes',
        body: 'Use the buttons at the top to switch modes. New Reader gives you clean text with plain-English definitions. Study adds more context. Scholar unlocks the full library depth. Start on New Reader and move up when you\'re ready.'
      }
    ];

    const overlay = document.createElement('div');
    overlay.id = 'swrvOnboarding';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;padding:20px;';

    let current = 0;

    function render(){
      const c = cards[current];
      overlay.innerHTML = `
        <div style="max-width:420px;width:100%;background:var(--bg-2,#1a1209);border:1px solid rgba(212,175,55,0.4);border-top:4px solid var(--gold,#d4af37);border-radius:18px;padding:32px 28px;text-align:center;">
          <div style="font-size:48px;margin-bottom:16px;">${c.icon}</div>
          <div style="font-size:20px;font-weight:800;color:var(--gold,#d4af37);margin-bottom:14px;line-height:1.3;">${c.title}</div>
          <div style="font-size:15px;line-height:1.65;color:var(--fg,#f0e8d8);margin-bottom:28px;">${c.body}</div>
          <div style="display:flex;gap:8px;justify-content:center;margin-bottom:20px;">
            ${cards.map((_,i)=>`<div style="width:8px;height:8px;border-radius:50%;background:${i===current?'var(--gold,#d4af37)':'rgba(212,175,55,0.3)'};"></div>`).join('')}
          </div>
          <button id="swrvOnboardNext" style="background:var(--gold,#d4af37);color:#0a0604;border:none;border-radius:50px;padding:14px 32px;font-size:16px;font-weight:800;cursor:pointer;width:100%;letter-spacing:0.04em;">
            ${current < cards.length - 1 ? "Next →" : "Let's go →"}
          </button>
          <div style="margin-top:12px;font-size:12px;color:var(--fg-dim,#8a7a60);cursor:pointer;" id="swrvOnboardSkip">Skip intro</div>
        </div>
      `;
      document.getElementById('swrvOnboardNext').onclick = function(){
        if(current < cards.length - 1){ current++; render(); }
        else { dismiss(); }
      };
      document.getElementById('swrvOnboardSkip').onclick = dismiss;
    }

    function dismiss(){
      markOnboarded();
      overlay.remove();
    }

    render();
    document.body.appendChild(overlay);
  }

  // Show after a short delay so the app loads first
  if(!alreadyOnboarded()){
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', function(){ setTimeout(buildOnboarding, 800); });
    } else {
      setTimeout(buildOnboarding, 800);
    }
  }
})();

/* ============================================================
   TYPOGRAPHY PANEL — Word/Pages-style font size + family picker
   Tap the Aa button to open a floating panel with:
   - Clickable size buttons (10–32 pt range)
   - +/- stepper
   - Direct number input
   - Font family selector (4 curated families)
   Saves to localStorage: swrv_font_size_v2, swrv_font_family
   ============================================================ */
(function(){
  const SIZE_KEY   = 'swrv_font_size_v2';
  const FAMILY_KEY = 'swrv_font_family';
  const MIN_SIZE   = 10;
  const MAX_SIZE   = 36;
  const PRESET_SIZES = [11, 13, 15, 17, 19, 22, 26, 32];
  const FAMILIES = [
    { id:'serif',   label:'Serif',    stack:"'Iowan Old Style','Palatino Linotype',Georgia,serif" },
    { id:'garamond',label:'Garamond', stack:"'Cormorant Garamond','Crimson Pro',Georgia,serif" },
    { id:'sans',    label:'Clean',    stack:"-apple-system,'Helvetica Neue',Arial,sans-serif" },
    { id:'mono',    label:'Mono',     stack:"'Courier New',Courier,monospace" }
  ];

  let currentSize   = 17;
  let currentFamily = 'serif';
  let panelOpen     = false;
  let _panel        = null;

  function applyTypography(){
    document.documentElement.style.setProperty('--bible-text-size', currentSize+'px');
    document.documentElement.style.setProperty('--bible-line-height', Math.max(1.45, 1.78 - (currentSize-17)*0.012).toFixed(3));
    const fam = FAMILIES.find(function(f){ return f.id===currentFamily; }) || FAMILIES[0];
    document.documentElement.style.setProperty('--font-body', fam.stack);
    const btn = document.getElementById('fontSizeBtn');
    if(btn) btn.textContent = 'Aa ' + currentSize;
    try {
      localStorage.setItem(SIZE_KEY, currentSize);
      localStorage.setItem(FAMILY_KEY, currentFamily);
    } catch(e){}
    _syncPanel();
  }

  function _syncPanel(){
    if(!_panel) return;
    var inp = _panel.querySelector('#typo-size-input');
    if(inp) inp.value = currentSize;
    _panel.querySelectorAll('.typo-preset').forEach(function(b){
      b.classList.toggle('active', parseInt(b.dataset.sz)===currentSize);
    });
    _panel.querySelectorAll('.typo-family-btn').forEach(function(b){
      b.classList.toggle('active', b.dataset.fid===currentFamily);
    });
  }

  function setSize(sz){
    currentSize = Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.round(sz)));
    applyTypography();
  }

  function _buildPanel(){
    var el = document.createElement('div');
    el.id = 'typographyPanel';
    el.className = 'typo-panel';
    var presetsHtml = PRESET_SIZES.map(function(s){
      return '<button class="typo-preset'+(s===currentSize?' active':'') +'" data-sz="'+s+'" onclick="window._typoSetSize('+s+')">'+s+'</button>';
    }).join('');
    var familiesHtml = FAMILIES.map(function(f){
      return '<button class="typo-family-btn'+(f.id===currentFamily?' active':'') +'" data-fid="'+f.id+'" style="font-family:'+f.stack+'" onclick="window._typoSetFamily(\''+f.id+'\')">'+f.label+'</button>';
    }).join('');
    el.innerHTML =
      '<div class="typo-panel-header">'+
        '<span class="typo-panel-title">Typography</span>'+
        '<button class="typo-close" onclick="window._typoClose()">✕</button>'+
      '</div>'+
      '<div class="typo-section-label">Size</div>'+
      '<div class="typo-stepper">'+
        '<button class="typo-step-btn" onclick="window._typoStep(-1)">−</button>'+
        '<input id="typo-size-input" class="typo-size-input" type="number" min="'+MIN_SIZE+'" max="'+MAX_SIZE+'" value="'+currentSize+'" '+
          'oninput="window._typoInputSize(this.value)" onchange="window._typoInputSize(this.value)">'+
        '<span class="typo-size-unit">pt</span>'+
        '<button class="typo-step-btn" onclick="window._typoStep(1)">+</button>'+
      '</div>'+
      '<div class="typo-presets">'+presetsHtml+'</div>'+
      '<div class="typo-section-label">Font</div>'+
      '<div class="typo-families">'+familiesHtml+'</div>';
    document.body.appendChild(el);
    _panel = el;
    setTimeout(function(){el.classList.add('open');},10);
  }

  function _closePanel(){
    if(!_panel) return;
    _panel.classList.remove('open');
    setTimeout(function(){ if(_panel){_panel.remove();_panel=null;} },220);
    panelOpen = false;
  }

  window._typoSetSize    = function(sz){ setSize(sz); };
  window._typoStep       = function(d){ setSize(currentSize+d); };
  window._typoInputSize  = function(v){ var n=parseInt(v,10); if(!isNaN(n)) setSize(n); };
  window._typoSetFamily  = function(fid){ currentFamily=fid; applyTypography(); };
  window._typoClose      = function(){ _closePanel(); };

  function togglePanel(){
    if(panelOpen){ _closePanel(); return; }
    panelOpen = true;
    _buildPanel();
  }

  // Close when tapping outside
  document.addEventListener('pointerdown', function(e){
    if(!_panel || !panelOpen) return;
    if(!_panel.contains(e.target) && e.target.id!=='fontSizeBtn') _closePanel();
  }, true);

  function init(){
    try {
      var savedSz = localStorage.getItem(SIZE_KEY);
      if(savedSz !== null){ var n=parseInt(savedSz,10); if(n>=MIN_SIZE && n<=MAX_SIZE) currentSize=n; }
      var savedFam = localStorage.getItem(FAMILY_KEY);
      if(savedFam && FAMILIES.some(function(f){return f.id===savedFam;})) currentFamily=savedFam;
    } catch(e){}
    applyTypography();
    var btn = document.getElementById('fontSizeBtn');
    if(btn) btn.onclick = togglePanel;
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();

/* ============================================================
   THREAD COMMENTARY — verse chips + panel + browser
   ============================================================ */

// Build a fast lookup: verse ref → array of thread entry keys
window.__threadIndex = null;
function _buildThreadIndex(){
  if(window.__threadIndex) return;
  window.__threadIndex = {};
  if(!window.THREAD_COMMENTARY) return;
  // Direct verse-ref keys e.g. "Matthew 5:39"
  Object.keys(window.THREAD_COMMENTARY).forEach(function(k){
    const ref = k.replace(/["']/g,'').trim();
    if(!window.__threadIndex[ref]) window.__threadIndex[ref] = [];
    window.__threadIndex[ref].push(k);
  });
  // Also index by book+chapter so chapter-level entries show on verse 1
  Object.keys(window.THREAD_COMMENTARY).forEach(function(k){
    const e = window.THREAD_COMMENTARY[k];
    if(e.chapterRef){
      const r = e.chapterRef;
      if(!window.__threadIndex[r]) window.__threadIndex[r] = [];
      window.__threadIndex[r].push(k);
    }
  });
}

// Get thread entries for a verse ref, also matching by word keys (Sheol, Hades etc.)
function getThreadEntries(ref, verseText){
  _buildThreadIndex();
  const results = [];
  const seen = new Set();
  // Direct ref match
  if(window.__threadIndex[ref]){
    window.__threadIndex[ref].forEach(function(k){ if(!seen.has(k)){seen.add(k);results.push(k);} });
  }
  // Word match — check if verse text contains a word that is a thread key
  if(verseText && window.THREAD_COMMENTARY){
    const words = verseText.match(/[A-Za-z']+/g)||[];
    words.forEach(function(w){
      if(window.THREAD_COMMENTARY[w] && !seen.has(w)){
        seen.add(w); results.push(w);
      }
    });
  }
  return results;
}

// Render thread chips for a verse
function renderThreadChips(ref, verseText){
  if(!window.THREAD_COMMENTARY) return '';
  const keys = getThreadEntries(ref, verseText);
  if(!keys.length) return '';
  const meta = window.THREAD_METADATA || {};
  const chips = keys.map(function(k){
    const e = window.THREAD_COMMENTARY[k];
    if(!e) return '';
    const m = meta[e.tag] || {icon:'📌', label:e.tag, color:'#d4af37'};
    return '<button class="thread-chip" onclick="openThreadPanel(\''+k.replace(/'/g,"\\'")+'\')" style="border-color:'+m.color+';color:'+m.color+'" title="'+escapeHtml(e.title)+'">'+m.icon+' '+escapeHtml(e.title.length>30?e.title.slice(0,30)+'…':e.title)+'</button>';
  }).join('');
  return '<div class="thread-chips-row">'+chips+'</div>';
}

// Open the thread panel for a specific entry
window.openThreadPanel = function(key){
  if(!window.THREAD_COMMENTARY) return;
  const e = window.THREAD_COMMENTARY[key];
  if(!e) return;
  const meta = (window.THREAD_METADATA||{})[e.tag] || {icon:'📌', label:e.tag, color:'#d4af37'};

  // Build related entries in same thread
  const threadKeys = Object.keys(window.THREAD_COMMENTARY)
    .filter(function(k){ return window.THREAD_COMMENTARY[k].thread === e.thread; })
    .sort(function(a,b){ return (window.THREAD_COMMENTARY[a].threadOrder||99)-(window.THREAD_COMMENTARY[b].threadOrder||99); });

  const relatedHtml = threadKeys.length > 1
    ? '<div class="thread-panel-related"><div class="thread-panel-related-label">'+meta.icon+' Follow this thread ('+threadKeys.length+' entries)</div>'
      + threadKeys.map(function(k){
          const te=window.THREAD_COMMENTARY[k];
          const active=k===key?'active':'';
          return '<button class="thread-nav-pill '+active+'" onclick="openThreadPanel(\''+k.replace(/'/g,"\\'")+'\')" >'+escapeHtml(te.title)+'</button>';
        }).join('')+'</div>'
    : '';

  const relVersesHtml = (e.relatedVerses&&e.relatedVerses.length)
    ? '<div class="thread-panel-section"><div class="thread-panel-section-label">Connected verses</div><div style="display:flex;flex-wrap:wrap;gap:6px;">'
      + e.relatedVerses.map(function(r){
          return '<button class="xref-chip" onclick="navigateToRef(\''+r+'\')">'+escapeHtml(r)+'</button>';
        }).join('') + '</div></div>'
    : '';

  const deeperHtml = e.deeperDive
    ? '<details class="thread-panel-deeper"><summary>Go deeper — scholar notes</summary><div class="thread-panel-deeper-body">'+escapeHtml(e.deeperDive)+'</div></details>'
    : '';

  const sourcesHtml = e.sources
    ? '<div class="thread-panel-sources">Sources: '+escapeHtml(e.sources)+'</div>'
    : '';

  const html = '<div class="thread-panel-inner">'
    + '<div class="thread-panel-tag" style="color:'+meta.color+';border-color:'+meta.color+'">'+meta.icon+' '+meta.label+'</div>'
    + '<h2 class="thread-panel-title">'+escapeHtml(e.title)+'</h2>'
    + '<div class="thread-panel-plain">'+escapeHtml(e.plain)+'</div>'
    + '<div class="thread-panel-body">'+escapeHtml(e.body).replace(/\\n\\n/g,'</p><p>').replace(/^/,'<p>').replace(/$/,'</p>')+'</div>'
    + deeperHtml
    + relVersesHtml
    + sourcesHtml
    + relatedHtml
    + '</div>';

  // Reuse def popup infrastructure for the thread panel
  const popup = document.getElementById('defPopup');
  const overlay = document.getElementById('defOverlay');
  if(!popup||!overlay) return;
  popup.innerHTML = '<button class="close-btn" onclick="closeDef()" aria-label="Close">✕</button>' + html;
  popup.classList.add('show','thread-panel');
  overlay.classList.add('show');
  if(window.__raiseDefPopup) window.__raiseDefPopup();
};

// Open the full thread browser for a thread category
window.openThreadBrowser = function(threadTag){
  if(!window.THREAD_COMMENTARY) return;
  const meta = (window.THREAD_METADATA||{})[threadTag] || {icon:'📌', label:threadTag, color:'#d4af37', desc:''};
  const entries = Object.keys(window.THREAD_COMMENTARY)
    .filter(function(k){ return window.THREAD_COMMENTARY[k].thread===threadTag||window.THREAD_COMMENTARY[k].tag===threadTag; })
    .sort(function(a,b){
      return (window.THREAD_COMMENTARY[a].threadOrder||99)-(window.THREAD_COMMENTARY[b].threadOrder||99);
    });

  const listHtml = entries.map(function(k,i){
    const e=window.THREAD_COMMENTARY[k];
    return '<div class="thread-browser-item" onclick="openThreadPanel(\''+k.replace(/'/g,"\\'")+'\')">'
      +'<div class="thread-browser-num" style="color:'+meta.color+'">'+(i+1)+'</div>'
      +'<div class="thread-browser-content">'
      +'<div class="thread-browser-item-title">'+escapeHtml(e.title)+'</div>'
      +'<div class="thread-browser-item-plain">'+escapeHtml(e.plain)+'</div>'
      +'</div><div class="thread-browser-arrow" style="color:'+meta.color+'">›</div>'
      +'</div>';
  }).join('');

  const html = '<div class="thread-panel-inner">'
    +'<div class="thread-panel-tag" style="color:'+meta.color+';border-color:'+meta.color+'">'+meta.icon+' '+meta.label+'</div>'
    +'<div class="thread-panel-desc">'+escapeHtml(meta.desc)+'</div>'
    +'<div class="thread-browser-list">'+listHtml+'</div>'
    +'</div>';

  const popup = document.getElementById('defPopup');
  const overlay = document.getElementById('defOverlay');
  if(!popup||!overlay) return;
  popup.innerHTML = '<button class="close-btn" onclick="closeDef()" aria-label="Close">✕</button>' + html;
  popup.classList.add('show','thread-panel');
  overlay.classList.add('show');
  if(window.__raiseDefPopup) window.__raiseDefPopup();
};

// Navigate to a verse reference string
window.navigateToRef = function(ref){
  if(!ref) return;
  const parts = ref.match(/^(.+)\s+(\d+):(\d+)$/);
  if(!parts) return;
  const book=parts[1], ch=parseInt(parts[2]), vs=parseInt(parts[3]);
  closeDef();
  if(window.loadBook) loadBook(book, ch, vs);
};

// All-threads browser — the entry point from the header button
window.openAllThreadsBrowser = function(){
  if(!window.THREAD_METADATA) return;
  const popup = document.getElementById('defPopup');
  const overlay = document.getElementById('defOverlay');
  if(!popup||!overlay) return;

  const cards = Object.keys(window.THREAD_METADATA).map(function(tag){
    const m=window.THREAD_METADATA[tag];
    const count=Object.keys(window.THREAD_COMMENTARY||{}).filter(function(k){
      const e=window.THREAD_COMMENTARY[k];
      return e.thread===tag||e.tag===tag;
    }).length;
    return '<div class="thread-category-card" onclick="openThreadBrowser(\''+tag+'\')" style="border-color:'+m.color+'">'
      +'<div class="thread-category-icon" style="color:'+m.color+'">'+m.icon+'</div>'
      +'<div class="thread-category-content">'
      +'<div class="thread-category-label" style="color:'+m.color+'">'+escapeHtml(m.label)+'</div>'
      +'<div class="thread-category-desc">'+escapeHtml(m.desc)+'</div>'
      +'<div class="thread-category-count">'+count+' entries</div>'
      +'</div>'
      +'<div class="thread-category-arrow" style="color:'+m.color+'">›</div>'
      +'</div>';
  }).join('');

  const html = '<div class="thread-panel-inner">'
    +'<div class="thread-panel-title" style="font-size:20px;margin-bottom:4px;">🧵 Deep Study Threads</div>'
    +'<div class="thread-panel-desc" style="margin-bottom:18px;">Each thread follows one continuous storyline across the whole Bible. Tap a thread to explore it in order.</div>'
    +'<div class="thread-categories">'+cards+'</div>'
    +'</div>';

  popup.innerHTML = '<button class="close-btn" onclick="closeDef()" aria-label="Close">✕</button>' + html;
  popup.classList.add('show','thread-panel');
  overlay.classList.add('show');
  if(window.__raiseDefPopup) window.__raiseDefPopup();
};

/* ============================================================
   FONT SIZE CONTROL
   ============================================================ */
(function(){
  var STEPS = [70, 80, 90, 100, 110, 120, 135, 150];
  var idx = 3; // default = 100%
  function apply(){
    var pct = STEPS[idx];
    document.documentElement.style.setProperty('--user-font-scale', pct/100);
    // Apply directly to key reading elements
    var base = pct / 100;
    document.documentElement.style.fontSize = (16 * base) + 'px';
    var el = document.getElementById('fontSizeCurrent');
    if(el) el.textContent = pct + '%';
    try{ localStorage.setItem('swrv_font_idx', idx); } catch(e){}
  }
  try{
    var saved = parseInt(localStorage.getItem('swrv_font_idx'));
    if(!isNaN(saved) && saved >= 0 && saved < STEPS.length) idx = saved;
  } catch(e){}
  window.changeFontSize = function(dir){
    idx = Math.max(0, Math.min(STEPS.length - 1, idx + dir));
    apply();
  };
  window.resetFontSize = function(){
    idx = 3;
    apply();
  };
  window.toggleFontSizePopover = function(){
    var pop = document.getElementById('fontSizePopover');
    if(pop) pop.classList.toggle('open');
  };
  document.addEventListener('click', function(e){
    var pop = document.getElementById('fontSizePopover');
    var btn = document.getElementById('fontSizeBtn');
    if(pop && pop.classList.contains('open') && !pop.contains(e.target) && e.target !== btn){
      pop.classList.remove('open');
    }
  });
  // Apply saved preference immediately
  if(idx !== 3) apply();
})();

/* ============================================================
   TEXT-TO-SPEECH (TTS)
   ============================================================ */
(function(){
  var synth = window.speechSynthesis;
  if(!synth){ console.warn('TTS: speechSynthesis not supported'); return; }

  var _verses = [];      // [{num, text}] for current chapter
  var _cursor = 0;       // current verse index
  var _speed = 1.0;
  var _paused = false;
  var _active = false;
  var _speeds = [0.7, 0.85, 1.0, 1.15, 1.3, 1.5];
  var _speedIdx = 2;

  function _bar(){ return document.getElementById('ttsBar'); }
  function _pp(){ return document.getElementById('ttsPlayPause'); }
  function _verseEl(){ return document.getElementById('ttsBarVerse'); }
  function _speedEl(){ return document.getElementById('ttsSpeedBtn'); }

  function _getVerses(){
    var els = document.querySelectorAll('.verse');
    var out = [];
    els.forEach(function(el){
      var numEl = el.querySelector('.verse-num, [class*="verse-num"]');
      var textEl = el.querySelector('.verse-text, [class*="verse-text"]');
      if(!textEl) return;
      var num = numEl ? numEl.textContent.trim() : '';
      // Strip red-letter spans, study chips etc — get clean text
      var clone = textEl.cloneNode(true);
      clone.querySelectorAll('.verse-study-chip,.verse-bm-chip,.verse-note-chip').forEach(function(c){ c.remove(); });
      var text = clone.textContent.trim();
      if(text) out.push({num: num, text: text, el: el});
    });
    return out;
  }

  function _highlightVerse(idx){
    document.querySelectorAll('.verse-tts-active').forEach(function(el){ el.classList.remove('verse-tts-active'); });
    if(_verses[idx] && _verses[idx].el){
      _verses[idx].el.classList.add('verse-tts-active');
      _verses[idx].el.scrollIntoView({behavior:'smooth', block:'center'});
    }
    var vEl = _verseEl();
    if(vEl) vEl.textContent = _verses[idx] ? (_verses[idx].num ? 'v. '+_verses[idx].num : '') : '';
  }

  function _speakVerse(idx){
    if(!_active || idx >= _verses.length){ _done(); return; }
    _cursor = idx;
    _highlightVerse(idx);
    synth.cancel();
    var utt = new SpeechSynthesisUtterance(_verses[idx].text);
    utt.rate = _speed;
    utt.onend = function(){ if(_active && !_paused) _speakVerse(_cursor + 1); };
    utt.onerror = function(){ if(_active) _speakVerse(_cursor + 1); };
    synth.speak(utt);
    _pp() && (_pp().textContent = '⏸');
  }

  function _done(){
    _active = false;
    _paused = false;
    synth.cancel();
    document.querySelectorAll('.verse-tts-active').forEach(function(el){ el.classList.remove('verse-tts-active'); });
    _bar() && _bar().classList.remove('active');
  }

  window.ttsPlayChapter = function(){
    _verses = _getVerses();
    if(!_verses.length){ alert('No verse text found on this page.'); return; }
    _active = true;
    _paused = false;
    _bar() && _bar().classList.add('active');
    _speakVerse(0);
  };

  window.ttsToggle = function(){
    if(!_active){ ttsPlayChapter(); return; }
    if(synth.paused){
      synth.resume();
      _paused = false;
      _pp() && (_pp().textContent = '⏸');
    } else {
      synth.pause();
      _paused = true;
      _pp() && (_pp().textContent = '▶');
    }
  };

  window.ttsStop = function(){
    _done();
  };

  window.ttsRestart = function(){
    _active = true;
    _paused = false;
    _speakVerse(0);
  };

  window.ttsSkipVerse = function(dir){
    var next = _cursor + dir;
    if(next < 0) next = 0;
    _active = true;
    _paused = false;
    _speakVerse(next);
  };

  window.ttsPrevChapter = function(){
    ttsStop();
    if(typeof prevChapter === 'function') prevChapter();
    setTimeout(function(){ ttsPlayChapter(); }, 400);
  };

  window.ttsNextChapter = function(){
    ttsStop();
    if(typeof nextChapter === 'function') nextChapter();
    setTimeout(function(){ ttsPlayChapter(); }, 400);
  };

  window.ttsCycleSpeed = function(){
    _speedIdx = (_speedIdx + 1) % _speeds.length;
    _speed = _speeds[_speedIdx];
    var label = _speed === 1.0 ? '1×' : _speed + '×';
    _speedEl() && (_speedEl().textContent = label);
    // Restart current verse at new speed
    if(_active && !_paused) _speakVerse(_cursor);
  };

  // Stop TTS if user navigates away
  document.addEventListener('swrv-chapter-change', function(){ _done(); });
})();
