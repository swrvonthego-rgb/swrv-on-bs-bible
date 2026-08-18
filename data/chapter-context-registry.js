/**
 * SWRV chapter-context registry.
 *
 * Every chapter of every book gets an Ancient-Near-East / Greco-Roman context
 * card explaining, for a reader with no background: what is happening, what
 * the surrounding culture believed or practised, and why it matters.
 *
 * The per-book data files (chapter-context-01..06.js) each call
 * SWRV_REGISTER_CHAPTER_CONTEXT with a plain object keyed "BookSlug Chapter".
 * This file MUST load before them (script order in index.html).
 *
 * Entry shape: { t: title, h: what's happening, c: cultural context, w: why it matters }
 */
window.SWRV_CHAPTER_CONTEXT = window.SWRV_CHAPTER_CONTEXT || {};

window.SWRV_REGISTER_CHAPTER_CONTEXT = function (obj) {
  if (!obj || typeof obj !== 'object') return;
  var target = window.SWRV_CHAPTER_CONTEXT;
  for (var k in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
    var e = obj[k];
    if (!e) continue;
    // Later registrations win, but never let a thinner entry blank out a
    // richer one that is already present.
    var prev = target[k];
    if (prev) {
      target[k] = {
        t: e.t || prev.t, h: e.h || prev.h,
        c: e.c || prev.c, w: e.w || prev.w
      };
    } else {
      target[k] = e;
    }
  }
};

/**
 * Adapter for the three earlier ANE files, which used snake_case keys
 * ("genesis_1") and a different field layout. They were previously loaded but
 * never read by any code — this folds their content into the same registry so
 * it actually reaches the page. Registered first, so the full per-chapter
 * files above take precedence where both cover a chapter.
 */
window.SWRV_ADOPT_LEGACY_ANE = function (legacy) {
  if (!legacy || typeof legacy !== 'object') return;
  var slugs = (window.BIBLE_INDEX || []).map(function (b) { return b.slug; });
  var bySquashed = {};
  slugs.forEach(function (s) { bySquashed[s.toLowerCase().replace(/[^a-z0-9]/g, '')] = s; });

  var target = window.SWRV_CHAPTER_CONTEXT;
  for (var key in legacy) {
    if (!Object.prototype.hasOwnProperty.call(legacy, key)) continue;
    var m = String(key).match(/^([a-z0-9]+)_(\d+)/i);
    if (!m) continue;
    var slug = bySquashed[m[1].toLowerCase()];
    if (!slug) continue;
    var v = legacy[key] || {};
    var k = slug + ' ' + parseInt(m[2], 10);
    var cur = target[k];
    // Gap-fill only: the per-chapter files are the primary source and must
    // never be overwritten by these older, sparser entries.
    if (!cur) {
      target[k] = {
        t: v.title || '', h: v.summary || '',
        c: v.aneContext || v.culture || '', w: v.theology || ''
      };
    } else {
      if (!cur.t) cur.t = v.title || '';
      if (!cur.h) cur.h = v.summary || '';
      if (!cur.c) cur.c = v.aneContext || v.culture || '';
      if (!cur.w) cur.w = v.theology || '';
    }
  }
};
