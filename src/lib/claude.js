/**
 * Claude API helper
 * Set VITE_ANTHROPIC_API_KEY in .env.local for local dev
 */
export async function callClaude(messages, systemPrompt, maxTokens = 1800) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  const headers = { "Content-Type": "application/json" };
  if (apiKey) headers["x-api-key"] = apiKey;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages,
    }),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status}: ${txt}`);
  }
  const data = await res.json();
  return data.content?.map((b) => b.text || "").join("") ?? "";
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
    data.subheadline && `\n${data.subheadline}`,
    data.dateline && `\n${data.dateline}`,
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
    .filter((l) => l !== false && l !== undefined)
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
    title: pos.title,
    content: text.slice(pos.contentStart, i < positions.length - 1 ? positions[i + 1].end : text.length).trim(),
  }));
}
