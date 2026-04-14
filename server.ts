import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log("Starting server...");
  console.log("GEMINI_API_KEY present:", !!process.env.GEMINI_API_KEY);

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      databaseLoaded: !!CROSS_REFS,
      envKeys: Object.keys(process.env).filter(k => !k.includes('SECRET') && !k.includes('KEY') && !k.includes('TOKEN')),
      geminiKeyPrefix: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 5) : "none"
    });
  });

  // Import data for grounding
  // We'll import it dynamically to avoid issues with Vite/TSX
  console.log("Importing database for grounding...");
  const { CROSS_REFS, SOURCE_META } = await import("./src/data/crossrefs.js");
  console.log("Database imported successfully. Entries:", Object.keys(CROSS_REFS).length);

  // AI Scholar Endpoint
  app.post("/api/scholar", async (req, res) => {
    console.log("Received Scholar Request:", req.body.prompt);
    const { prompt, systemPrompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY");
      return res.status(500).json({ error: "Gemini API Key not configured on server." });
    }

    try {
      // 1. Grounding: Find relevant context from CROSS_REFS
      console.log("Starting grounding search...");
      let context = "";
      const query = prompt.toLowerCase();
      
      if (!CROSS_REFS) {
        console.error("CROSS_REFS is not loaded");
        throw new Error("Database not loaded");
      }
      const relevantEntries = [];
      for (const [key, refs] of Object.entries(CROSS_REFS)) {
        const bookName = key.split('.')[0].toLowerCase();
        // Check if book name or specific ref is mentioned
        if (query.includes(bookName) || query.includes(key.toLowerCase())) {
          relevantEntries.push(...refs);
        } else {
          // Check notes for keywords
          for (const ref of refs) {
            if (query.split(' ').some(word => word.length > 3 && ref.note.toLowerCase().includes(word))) {
              relevantEntries.push(ref);
            }
          }
        }
      }

      // Format context
      if (relevantEntries.length > 0) {
        context = "RELEVANT DATA FROM OUR LIBRARY DATABASE:\n";
        relevantEntries.slice(0, 15).forEach((entry, i) => {
          const sourceLabel = SOURCE_META[entry.source]?.label || entry.source;
          context += `[${i+1}] Source: ${sourceLabel}, Ref: ${entry.ref}\nNote: ${entry.note}\n\n`;
        });
        context += "\nINSTRUCTION: Use the above database records as your primary source of truth. If the user asks for a 'Comprehensive Study', use this data to build the experience.\n";
      }

      // 2. Call Gemini
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      });

      const fullPrompt = context ? `CONTEXT FROM DATABASE:\n${context}\n\nUSER QUERY: ${prompt}` : prompt;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 8192,
        },
      });

      const response = await result.response;
      res.json({ text: response.text() });
    } catch (error) {
      console.error("Scholar API Error Details:", error);
      const message = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: `Scholar Error: ${message}` });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
