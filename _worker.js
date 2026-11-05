// Cloudflare Pages "Advanced Mode" entry point.
//
// This repo is connected to a Cloudflare Pages project (swrv-on-bs-bible-site)
// that auto-deploys on every push to main. Pages uses this file as the
// server-side entry point when it finds _worker.js at the root.
//
// Pages and Workers share the same static-assets interface (env.ASSETS),
// so re-exporting the real worker gives the Pages deployment the identical
// routes, including /api/audio-bible/. That route needs the R2 binding
// (env.LIBRARY_BUCKET) added in the Pages project dashboard settings.

import realWorker from './worker.js';

// Pages IS the canonical deployment -- pass all requests straight through.
export default realWorker;
