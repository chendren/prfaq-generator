/**
 * Claude API helper — all calls go through /api/chat (Vercel proxy).
 * The proxy uses the server-side ANTHROPIC_API_KEY env var if set,
 * or falls back to the user's own key passed as x-user-api-key.
 * No API key is ever bundled into client code.
 */

const PROXY = "/api/chat";

export async function callClaude(messages, systemPrompt, maxTokens = 1800) {
  const userKey = sessionStorage.getItem("userApiKey") || "";

  const headers = { "Content-Type": "application/json" };
  if (userKey) headers["x-user-api-key"] = userKey;

  const res = await fetch(PROXY, {
    method: "POST",
    headers,
    body: JSON.stringify({ messages, system: systemPrompt, max_tokens: maxTokens }),
  });

  const data = await res.json();

  if (!res.ok) {
    // Proxy returns { error, code }
    if (data.code === "NO_KEY") throw new KeyRequiredError();
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return data.content?.map((b) => b.text || "").join("") ?? "";
}

/** Thrown when no key is available on server or client */
export class KeyRequiredError extends Error {
  constructor() {
    super("API key required");
    this.name = "KeyRequiredError";
  }
}

/** Store user's key for this session only */
export function saveUserKey(key) {
  if (key && key.trim()) {
    sessionStorage.setItem("userApiKey", key.trim());
  }
}

/** Clear user's key */
export function clearUserKey() {
  sessionStorage.removeItem("userApiKey");
}

/** Check if a user key is stored in this session */
export function hasUserKey() {
  return !!sessionStorage.getItem("userApiKey");
}

export function buildCoachSystem(data, stepId) {
  return `You are an expert coach in Amazon's Working Backwards methodology and the PRFAQ process, helping build a customer-obsessed AI initiative PRFAQ.

CURRENT DRAFT:
Project: ${data.projectName || "(not set)"}
Headline: ${data.headline || "(not set)"}
Problem: ${data.problem || "(not set)"}
Solution: ${data.solution || "(not set)"}
Benefits: ${data.benefits || "(not set)"}
Exec Quote: ${data.executiveQuote || "(not set)"}
Customer Quote: ${data.customerQuote || "(not set)"}
Current step: ${stepId}

Rules: Be direct. No filler. When suggesting rewrites, write the actual text. Max 220 words. Ground advice in Amazon Working Backwards principles.`;
}

export function buildWBPrompt(data) {
  return `You are a senior AWS Solutions Architect and Amazon Working Backwards expert.

Generate a complete, specific Working Backwards framework for the PRFAQ below. Every section must be specific to THIS initiative — no generic advice.

PRFAQ:
${buildPRFAQText(data)}

Generate exactly these 6 sections using ## headers:

## OBSESSION STACK MAPPING
For each of the 8 Obsession Stack layers (Voice, Sensing, Intelligence, Reasoning, Safety, Memory, Action, Orchestration): what it does for THIS initiative, which AWS service powers it, one concrete implementation note.

## TWO-WAY DOOR ANALYSIS
5-6 specific decisions from this PRFAQ. For each: One-Way or Two-Way Door, why, who owns it.

## 30-DAY PILOT DESIGN
Specific pilot: customer segment with size/criteria, 3 success metrics with numeric thresholds, what triggers scale vs. pause at Day 30, Week 1 and Week 4 milestones.

## CUSTOMER OBSESSION SCORECARD
6 metrics specific to this initiative. For each: name, what it measures, target range, measurement method, leading or lagging.

## 90-DAY ROADMAP
Each phase: 3 actions, 1 customer milestone, 1 go/no-go decision.
Phase 1 (Days 1-30), Phase 2 (Days 31-60), Phase 3 (Days 61-90).

## RISKS AND MITIGATIONS
Top 4 risks. For each: description, probability (H/M/L), impact (H/M/L), one specific mitigation.`;
}

export function buildPRFAQText(data) {
  const cFaqs = data.faqs
    .filter((f) => f.type === "customer" && f.q.trim())
    .map((f) => `Q: ${f.q}\nA: ${f.a}`)
    .join("\n\n");
  const iFaqs = data.faqs
    .filter((f) => f.type === "internal" && f.q.trim())
    .map((f) => `Q: ${f.q}\nA: ${f.a}`)
    .join("\n\n");

  return [
    "FOR IMMEDIATE RELEASE",
    "",
    data.headline,
    data.subheadline ? `\n${data.subheadline}` : null,
    data.dateline    ? `\n${data.dateline}` : null,
    "",
    "THE PROBLEM",
    data.problem,
    "",
    "THE SOLUTION",
    data.solution,
    "",
    "KEY BENEFITS",
    data.benefits,
    "",
    `"${data.executiveQuote}"`,
    `— ${data.executiveName}, ${data.executiveTitle}`,
    "",
    `"${data.customerQuote}"`,
    `— ${data.customerName}`,
    "",
    "CUSTOMER FAQs",
    cFaqs || "(none)",
    "",
    "INTERNAL FAQs",
    iFaqs || "(none)",
  ]
    .filter((l) => l !== null && l !== undefined)
    .join("\n")
    .trim();
}

export function parseWBSections(text) {
  if (!text) return [];
  const regex = /^##\s+(.+)$/gm;
  const positions = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    positions.push({ title: m[1].trim(), end: m.index, contentStart: m.index + m[0].length });
  }
  return positions.map((pos, i) => ({
    title:   pos.title,
    content: text.slice(pos.contentStart, i < positions.length - 1 ? positions[i + 1].end : text.length).trim(),
  }));
}
