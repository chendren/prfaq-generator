/**
 * /api/chat — Vercel serverless proxy for Anthropic API
 *
 * Key priority:
 *   1. ANTHROPIC_API_KEY env var (set in Vercel dashboard — never exposed to client)
 *   2. x-user-api-key request header (user's own key, entered in the app UI)
 *
 * The client never calls Anthropic directly. All requests go through here.
 */

export default async function handler(req, res) {
  // Only POST allowed
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Resolve which key to use
  const serverKey = process.env.ANTHROPIC_API_KEY;
  const userKey   = req.headers["x-user-api-key"];
  const apiKey    = serverKey || userKey;

  if (!apiKey) {
    return res.status(401).json({
      error: "No API key available. Please enter your Anthropic API key.",
      code:  "NO_KEY",
    });
  }

  // Validate body
  const { messages, system, max_tokens } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type":         "application/json",
        "x-api-key":            apiKey,
        "anthropic-version":    "2023-06-01",
      },
      body: JSON.stringify({
        model:      "claude-sonnet-4-20250514",
        max_tokens: max_tokens || 1800,
        system,
        messages,
      }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      // Surface Anthropic's error message but never echo the key
      return res.status(upstream.status).json({
        error: data?.error?.message || "Upstream API error",
        code:  data?.error?.type   || "API_ERROR",
      });
    }

    // Return only what the client needs
    return res.status(200).json({ content: data.content });

  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ error: "Proxy request failed", code: "PROXY_ERROR" });
  }
}
