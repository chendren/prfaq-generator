# PRFAQ Working Backwards Builder

An AI-powered tool for building Amazon-style PRFAQ documents and generating a complete Working Backwards framework.

Built as a companion to *Customer Obsession: The Nucleus Principle* by Chad Hendren.

## What It Does

1. **Guided PRFAQ creation** — 6 structured steps: Headline, Problem, Solution, Benefits, Quotes, FAQs
2. **AI coaching** — Claude provides real-time feedback at every step via a chat panel
3. **Working Backwards framework** — After finalizing, Claude generates:
   - Obsession Stack Mapping (all 8 layers, specific to your initiative)
   - Two-Way Door Analysis (reversible vs. irreversible decisions)
   - 30-Day Pilot Design (segment, metrics, go/no-go thresholds)
   - Customer Obsession Scorecard (6 leading/lagging indicators)
   - 90-Day Roadmap (phased actions, milestones, decision gates)
   - Risks & Mitigations (top 4, with probability/impact ratings)

## Setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/prfaq-working-backwards.git
cd prfaq-working-backwards

# 2. Install dependencies
npm install

# 3. Add your API key
cp .env.example .env.local
# Edit .env.local and add: VITE_ANTHROPIC_API_KEY=your_key_here

# 4. Run locally
npm run dev
```

Then open http://localhost:5173

## Deploy

```bash
npm run build
# Deploy the dist/ folder to Vercel, Netlify, GitHub Pages, or any static host
```

For Vercel: set `VITE_ANTHROPIC_API_KEY` in your project's Environment Variables.

## Tech Stack

- **React 19** + **Vite 7**
- **Anthropic Claude API** (claude-sonnet-4-20250514)
- Custom CSS (no UI framework dependencies)
- Google Fonts: Playfair Display, IBM Plex Mono, Source Serif 4

## Project Structure

```
src/
  App.jsx              — Root component and step router
  App.css              — All styles (design tokens + components)
  index.css            — Global reset + font imports
  lib/
    claude.js          — API calls, prompt builders, parsers
    constants.js       — Steps, quick prompts, initial data
  components/
    Header.jsx
    ProgressBar.jsx
    AICoach.jsx        — Right-panel chat with Claude
    FieldGroup.jsx     — Reusable form primitives
    steps/
      Welcome.jsx
      Headline.jsx
      Problem.jsx
      Solution.jsx
      Benefits.jsx
      Quotes.jsx
      FAQs.jsx
      Review.jsx
      Output.jsx       — Generates the Working Backwards framework
```

## Based On

Amazon's Working Backwards methodology as documented in:
- Bryar, Colin and Bill Carr. *Working Backwards: Insights, Stories, and Secrets from Inside Amazon.* St. Martin's Press, 2021.

---

*Customer Obsession: The Nucleus Principle* — Chad Hendren, 2026
