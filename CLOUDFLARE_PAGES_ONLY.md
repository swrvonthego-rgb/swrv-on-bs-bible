# Cloudflare Workers Deployment

This project deploys as a **Cloudflare Worker with static assets** via `wrangler.jsonc`.

## Configuration

- **Worker script**: `worker.js` (handles `/api/audio-bible/`, `/api/groq`, `/api/health`, `/api/auth/*`, `/api/notes`, `/api/bookmarks`, `/api/progress`)
- **Static assets**: served from `.` via the `ASSETS` binding
- **Config file**: `wrangler.jsonc`

## Deploy

```bash
npx wrangler deploy
```

## Required secrets (set once via CLI)

```bash
npx wrangler secret put GROQ_API_KEY
```

## Routes

| Path | Handler |
|------|---------|
| `/api/audio-bible/<key>` | Worker → streams a real BSB audio Bible chapter from R2 (Range/seek support) |
| `/data/bsb-audio-manifest.json` | Worker → book/chapter → audio file manifest, from R2 |
| `/data/bsb-timings/<Book>.json` | Worker → per-verse timing spans for that book, from R2 |
| `/data/jubilees.js` | Worker → Book of Jubilees text, from R2 |
| `/api/groq` | Worker → Groq AI relay |
| `/api/health` | Worker → JSON health check |
| `/*` | `env.ASSETS.fetch()` → static files |
