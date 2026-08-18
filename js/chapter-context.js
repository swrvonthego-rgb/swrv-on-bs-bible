/**
 * Renders the per-chapter cultural-context card.
 *
 * app.js's renderChapterDeepStudyBanner() delegates here, so the card appears
 * at the top of every chapter in both chapter mode and verse mode.
 *
 * Collapsed by default on first read of a session so it never buries the text,
 * but the "what's happening" line is always visible so a reader who knows
 * nothing about the chapter still gets oriented before verse 1.
 */
(function () {
  'use strict';

  var OPEN_KEY = 'swrv_ctx_open';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function isOpen() {
    try { return localStorage.getItem(OPEN_KEY) !== '0'; } catch (e) { return true; }
  }

  window._swrvToggleChapterContext = function (el) {
    var card = el && el.closest ? el.closest('.chapter-context-card') : null;
    if (!card) return;
    var open = card.classList.toggle('is-open');
    var body = card.querySelector('.cc-body');
    if (body) body.hidden = !open;
    el.setAttribute('aria-expanded', open ? 'true' : 'false');
    var caret = card.querySelector('.cc-caret');
    if (caret) caret.textContent = open ? '▾' : '▸';
    try { localStorage.setItem(OPEN_KEY, open ? '1' : '0'); } catch (e) {}
  };

  window._renderChapterANEContext = function (book, chapterNum) {
    var reg = window.SWRV_CHAPTER_CONTEXT;
    if (!reg || !book || !chapterNum) return '';
    var e = reg[book + ' ' + chapterNum];
    if (!e) return '';
    var hasBody = !!(e.c || e.w);
    if (!e.h && !hasBody) return '';

    var open = isOpen();
    var h = '<section class="chapter-context-card' + (open ? ' is-open' : '') +
            '" aria-label="Cultural context for this chapter">';

    h += '<button type="button" class="cc-head" aria-expanded="' + (open ? 'true' : 'false') +
         '" onclick="_swrvToggleChapterContext(this)">' +
         '<span class="cc-kicker">Context</span>' +
         (e.t ? '<span class="cc-title">' + esc(e.t) + '</span>' : '') +
         '<span class="cc-caret" aria-hidden="true">' + (open ? '▾' : '▸') + '</span>' +
         '</button>';

    if (e.h) h += '<p class="cc-lede">' + esc(e.h) + '</p>';

    if (hasBody) {
      h += '<div class="cc-body"' + (open ? '' : ' hidden') + '>';
      if (e.c) {
        h += '<div class="cc-block"><span class="cc-label">In their world</span>' +
             '<p>' + esc(e.c) + '</p></div>';
      }
      if (e.w) {
        h += '<div class="cc-block"><span class="cc-label">Why it matters</span>' +
             '<p>' + esc(e.w) + '</p></div>';
      }
      h += '</div>';
    }

    h += '</section>';
    return h;
  };

  // Fold the three older ANE files into the registry once everything has
  // loaded. They only ever set a global that nothing read; this gap-fills any
  // chapter the per-chapter files left thin.
  function adoptLegacy() {
    if (typeof window.SWRV_ADOPT_LEGACY_ANE !== 'function') return;
    [window.GENESIS_ANE_CONTEXT, window.TORAH_ANE_CONTEXT, window.ANE_CONTEXT_COMPLETE]
      .forEach(function (src) { if (src) window.SWRV_ADOPT_LEGACY_ANE(src); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', adoptLegacy);
  } else {
    adoptLegacy();
  }
})();
