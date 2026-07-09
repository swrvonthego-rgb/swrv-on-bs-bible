# Cloudflare Workers Deployment

This project deploys as a **Cloudflare Worker with static assets** via `wrangler.jsonc`.

## Configuration

- **Worker script**: `worker.js` (handles `/api/tts`, `/api/groq`, `/api/health`)
- **Static assets**: served from `.` via the `ASSETS` binding
- **Config file**: `wrangler.jsonc`

## Deploy

```bash
npx wrangler deploy
```

## Required secrets (set once via CLI)

```bash
npx wrangler secret put ELEVENLABS_API_KEY
npx wrangler secret put GROQ_API_KEY
```

## Routes

| Path | Handler |
|------|---------|
| `/api/tts` | Worker → ElevenLabs TTS relay |
| `/api/groq` | Worker → Groq AI relay |
| `/api/health` | Worker → JSON health check |
| `/*` | `env.ASSETS.fetch()` → static files |
