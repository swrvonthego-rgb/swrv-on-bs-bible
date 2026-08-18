// Cloudflare Pages "Advanced Mode" entry point.
//
// This repo is connected to a Cloudflare Pages project that auto-deploys on
// every push to main (see README.md), completely separately from the
// Cloudflare Workers deploy in .github/workflows/deploy.yml. Pages only runs
// server-side logic if it finds a file named exactly `_worker.js` at the
// root of the deployed output — without one, Pages just serves the repo as
// static files, so any /api/* route would 405 there with no route matching.
//
// Pages and Workers share the same static-assets interface (env.ASSETS),
// so re-exporting the real worker gives the Pages deployment the identical
// routes, including /api/audio-bible/. That route needs the R2 binding
// (env.LIBRARY_BUCKET) added in the Pages project's own dashboard settings
// to actually serve audio there — this file alone doesn't add the binding.
import realWorker from './worker.js';

// Two separate live deployments exist for this repo (see comment above) —
// the Pages one at *.pages.dev is a leftover duplicate that confuses users
// who land on it instead of the canonical Workers URL. Redirect it rather
// than trying to remove the Pages project itself (no dashboard access from
// here), so there is only ever one URL people actually use.
const CANONICAL_HOST = 'swrv-on-bs-bible.swrvonthego.workers.dev';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.hostname.endsWith('.pages.dev')) {
      url.hostname = CANONICAL_HOST;
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    return realWorker.fetch(request, env, ctx);
  },
};
