// Cloudflare Pages "Advanced Mode" entry point.
//
// This repo is connected to a Cloudflare Pages project that auto-deploys on
// every push to main (see README.md), completely separately from the
// Cloudflare Workers deploy in .github/workflows/deploy.yml. Pages only runs
// server-side logic if it finds a file named exactly `_worker.js` at the
// root of the deployed output — without one, Pages just serves the repo as
// static files, which is why POST /api/tts was returning 405 Method Not
// Allowed there (no route exists for it) even though the real fix already
// shipped to the Workers deployment.
//
// Pages and Workers share the same static-assets interface (env.ASSETS),
// so re-exporting the real worker gives the Pages deployment the identical
// /api/tts handler, including the FreeTTS.org and Edge TTS fallback tiers
// that need no bindings at all. Aura-2 (env.AI) and the R2 audio cache
// (env.LIBRARY_BUCKET) will no-op gracefully until those bindings are added
// in the Pages project's own dashboard settings — that's optional, not
// required for voice to work.
export { default } from './worker.js';
