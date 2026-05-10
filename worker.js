/**
 * SWRV on the Go — Hybrid Worker
 * 
 * Serves static assets (Bible study tool, lexicons, sources)
 * AND provides API endpoints for The Roadmap Experience (Groq AI).
 * 
 * Routes:
 *   /api/groq         -> POST: relay to Groq API with server-side key
 *   /api/health       -> GET: health check
 *   /*                -> static assets (HTML, JSON, TXT files)
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS — allow your own domains
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // ============= API ROUTES =============
    
    // Health check
    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({
        status: 'ok',
        hasGroqKey: !!env.GROQ_API_KEY,
        timestamp: new Date().toISOString()
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // Groq AI relay — Roadmap Experience uses this
    if (url.pathname === '/api/groq' && request.method === 'POST') {
      if (!env.GROQ_API_KEY) {
        return new Response(JSON.stringify({
          error: 'GROQ_API_KEY not configured on Worker'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
      
      try {
        const body = await request.json();
        
        // Sane defaults — caller can override
        const payload = {
          model: body.model || 'llama-3.3-70b-versatile',
          messages: body.messages || [],
          temperature: body.temperature ?? 0.7,
          max_tokens: body.max_tokens || 1024,
        };
        
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        
        const data = await groqResponse.json();
        return new Response(JSON.stringify(data), {
          status: groqResponse.status,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      } catch (err) {
        return new Response(JSON.stringify({
          error: 'Groq relay failed',
          detail: err.message
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }
    
    // ============= STATIC ASSETS =============
    // Fall through to Cloudflare's static asset binding
    return env.ASSETS.fetch(request);
  }
};
