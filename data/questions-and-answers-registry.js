/**
 * SWRV "Questions & Answers" registry.
 *
 * Study-Bible-style Q&A boxes tied to specific chapters — the kind of thing
 * a curious reader stops and wonders about mid-passage ("wait, why does this
 * servant call the master harsh?", "does this mean X?"). Modeled on the
 * classic study-Bible sidebar box: one real question a reader might actually
 * ask, answered directly and honestly, anchored to the chapter that raises it.
 *
 * The per-book data files (data/questions-and-answers-*.js) each call
 * SWRV_REGISTER_QA with a plain object keyed "BookSlug Chapter" -> array of
 * { q, a } entries (a chapter can raise more than one question). This file
 * MUST load before them (script order in index.html).
 */
window.SWRV_QA = window.SWRV_QA || {};

window.SWRV_REGISTER_QA = function (obj) {
  if (!obj || typeof obj !== 'object') return;
  var target = window.SWRV_QA;
  for (var k in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
    var list = obj[k];
    if (!Array.isArray(list) || !list.length) continue;
    if (!target[k]) target[k] = [];
    for (var i = 0; i < list.length; i++) {
      var entry = list[i];
      if (!entry || !entry.q || !entry.a) continue;
      // Skip exact-duplicate questions if this key was already registered
      // by an earlier-loaded file.
      var dup = target[k].some(function (e) { return e.q === entry.q; });
      if (!dup) target[k].push(entry);
    }
  }
};
