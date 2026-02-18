# PRFAQ Working Backwards Builder

### A companion tool to *Customer Obsession: The Nucleus Principle* by Chad Hendren

---

An AI-powered web application that guides individuals and teams through Amazon's Working Backwards methodology — from blank page to a complete Press Release and FAQ document, with an expert AI coach at every step, and a fully generated Working Backwards framework waiting at the end.

**Live demo:** [prfaq-generator.vercel.app](https://prfaq-generator.vercel.app) *(deploy your own in minutes — see below)*

---

## Table of Contents

1. [The Story Behind This Tool](#the-story-behind-this-tool)
2. [What Amazon's Working Backwards Methodology Is](#what-amazons-working-backwards-methodology-is)
3. [What the PRFAQ Document Is](#what-the-prfaq-document-is)
4. [The Obsession Stack: What the Framework Generates](#the-obsession-stack-what-the-framework-generates)
5. [How We Built This Tool While Writing the Book](#how-we-built-this-tool-while-writing-the-book)
6. [What the Application Does](#what-the-application-does)
7. [A Complete Walkthrough](#a-complete-walkthrough)
8. [How to Run It Locally](#how-to-run-it-locally)
9. [How to Deploy It](#how-to-deploy-it)
10. [API Key Setup and Security Model](#api-key-setup-and-security-model)
11. [Project Structure and Architecture](#project-structure-and-architecture)
12. [For Teams and Organizations](#for-teams-and-organizations)
13. [References and Further Reading](#references-and-further-reading)

---

## The Story Behind This Tool

This tool exists because of a problem that kept appearing while writing *Customer Obsession: The Nucleus Principle*.

The book makes a straightforward argument: the most important thing an organization can do before deploying AI in customer experience is to write clearly, in plain language, about what the customer will actually experience. Not what the technology does. Not what the architecture looks like. Not what the business case projects. What the *customer* experiences, in the moment they need help, when the system works exactly as intended.

Amazon figured this out in the early 2000s, when Jeff Bezos banned PowerPoint in product planning meetings. The problem with slides, he observed, was that bullet points allow presenters to hide weak thinking behind impressive formatting. A well-formatted slide deck can make a bad idea look like a good one, at least long enough to get budget approved and development started. By the time the weakness in the thinking is exposed, the organization has sunk months of engineering time into the wrong product.

The replacement was the PRFAQ: a written narrative, structured as a press release announcing the product's launch, followed by a FAQ section addressing both customer questions and internal stakeholder questions. The press release had to be written as if the product already existed and a journalist was covering its launch. It had to be clear, compelling, and free of jargon. If the customer benefit wasn't obvious to a first-time reader, the idea wasn't ready.

Colin Bryar and Bill Carr, both former senior Amazon executives, described this methodology in detail in *Working Backwards: Insights, Stories, and Secrets from Inside Amazon* (St. Martin's Press, 2021). They called the PRFAQ process "perhaps the most important element of the Working Backwards process" because it prevents teams from falling in love with a solution before confirming the problem exists.

As *Customer Obsession* developed through Chapters Five, Six, Seven, and Appendix C, it became clear that explaining this methodology in prose was not enough. Readers needed to *do* it. And doing it is harder than it sounds: most people, when asked to write a press release for a product that doesn't exist yet, either write an internal memo dressed up with marketing language, or produce something so vague it could describe any product in any industry. The discipline of the PRFAQ — customer first, benefit first, specific and concrete — is a skill that requires practice, feedback, and a structure that keeps you honest.

That's what this tool is: the practice, the feedback, and the structure, delivered by an AI coach trained on the Working Backwards methodology, available to every reader, every team, and every organization that picks up the book.

---

## What Amazon's Working Backwards Methodology Is

Working Backwards is, at its core, a discipline of starting from the customer outcome you want to create and engineering backward to the technology, process, and organization required to deliver it.

Most organizations work the other direction. They start with a capability — a technology they've acquired, a platform they've built, a vendor relationship they've established — and then ask: what can we do with this? The result is products designed around what's convenient to build rather than what's meaningful to receive. AI deployments that deflect instead of help. Contact center systems optimized for average handle time rather than customer resolution. Digital channels designed to reduce headcount rather than improve experience.

Working Backwards inverts the process. Before any architecture is drawn, before any vendor is selected, before any budget is approved, you write the press release. You describe, in plain language, the customer who is served, the problem they had, the solution that was built, and the outcome they experienced. You write the quotes — what did your executive say about why this mattered, and what did your customer say when it worked? You write the FAQs — what will customers ask when they encounter this, and what are the hard questions your legal, finance, and engineering teams are going to ask in the room?

If you can't write a compelling press release, the idea isn't ready. No amount of technical sophistication can compensate for a product that doesn't solve a genuine customer problem. The press release is the forcing function that surfaces weak thinking before it becomes expensive engineering.

Amazon applied this process to Kindle, Prime, AWS, Alexa, and hundreds of other products before a single line of code was written. It is now so deeply embedded in Amazon's product development culture that new employees learn PRFAQ writing as a core competency, the way lawyers learn to write briefs or surgeons learn to scrub.

---

## What the PRFAQ Document Is

A PRFAQ has two parts: the Press Release and the FAQ. Together they form a complete picture of the product from two angles — the customer's experience of it, and the organization's understanding of it.

**The Press Release** is written in the past tense, as if the product has already launched and a journalist from a major publication is covering it. It contains:

- **Headline** — A single sentence that announces the customer benefit with the clarity of a news story. Not "Company Launches AI Platform." Something like: "[Carrier] Reaches Customers Before They Reach for the Cancel Button, Preventing Silent Churn with Behavioral AI."
- **Subheadline** — One additional sentence that adds a specific data point, timeframe, or scope that makes the headline concrete.
- **Dateline** — City and date of the fictional launch announcement.
- **Problem paragraph** — A description of the pain the customer experienced before this product existed. Written in the customer's voice, from the customer's perspective.
- **Solution paragraph** — What was built, described in plain language that a customer who doesn't work in technology would immediately understand.
- **Benefits section** — Specific, measurable outcomes that customers experience. Not "improved satisfaction" but "73% of customers contacted proactively accepted a retention offer, and follow-up surveys showed a 22-point NPS increase."
- **Executive quote** — What the executive responsible for this initiative says about why it matters. Should articulate the organizational vision, not the product features.
- **Customer quote** — What a real customer (written as a composite or persona) says about their experience. Should be emotional, specific, and human — not a marketing testimonial.

**The FAQ** addresses two audiences:

- **Customer FAQ** — The questions customers will actually ask: How does it know about me? Can I opt out? What does it cost? How do I get help if it's wrong? These questions force you to confront the experience from the customer's seat.
- **Internal Stakeholder FAQ** — The questions your leadership team, legal counsel, finance department, and engineering leads will ask: What platform does this run on? How do we ensure offers are financially sound? What's the expected ROI? Is this a one-way door or a two-way door? (More on two-way doors below.)

In Appendix C of *Customer Obsession*, there is a fully worked example of a PRFAQ for "Proactive Retention for Silent Churn" — a scenario involving Marcus, an eleven-year telecom customer whose behavioral signals indicate he is quietly drifting toward a competitor. The PRFAQ is written before any code exists. It describes what Marcus experienced, what the system detected, what the organization did, and why it mattered — all before the architecture was specified. That example is the template this tool uses.

---

## The Obsession Stack: What the Framework Generates

Chapter Five of *Customer Obsession* introduces the Obsession Stack: an eight-layer AI architecture for building systems that genuinely serve customers rather than merely process them. Each layer maps to a human capability — the way an exceptional human service professional reads a room, recalls a relationship, thinks through a problem, and takes action on someone's behalf — but delivered at scale, across millions of simultaneous interactions.

When you complete your PRFAQ in this tool, Claude generates a complete Working Backwards framework that maps your specific initiative to all eight layers. Here is what each layer means:

**Layer 1 — Voice: First Impression at Machine Speed.** The customer's first interaction sets the emotional tone for everything that follows. In an increasingly voice-first world, that first impression is auditory. This layer addresses how your AI initiative presents itself to the customer: the modality, the tone, the latency, the sense of genuine attention. Powered by technologies like Amazon Nova Sonic for speech-to-speech processing.

**Layer 2 — Intelligence: The Organization's Memory Made Accessible.** The information a customer service representative carries in their head — account history, interaction context, policy knowledge, product details — must be available to an AI agent at the moment of need. This is Retrieval Augmented Generation (RAG): the ability to retrieve precise, current information from organizational knowledge bases and present it accurately. Powered by Amazon Bedrock Knowledge Bases and similar retrieval systems.

**Layer 3 — Reasoning: Where Determinism Meets Intelligence.** This is the layer that separates responsible AI from reckless AI. Reasoning isn't just "the model thinks about the problem." It's the use of Automated Reasoning — mathematical verification — to ensure that the AI's conclusions are provably correct when correctness matters. When an AI agent tells a customer their billing adjustment is valid, or that their insurance claim is covered, or that their prescription can be refilled, that assertion must be *verified*, not inferred. Powered by Amazon Bedrock Automated Reasoning.

**Layer 4 — Safety: Guardrails as an Act of Customer Love.** Safety is not a constraint on the AI. It is the architectural expression of the organization's values. Guardrails prevent PII from being exposed in inappropriate contexts, block content that could harm vulnerable customers, enforce communication compliance regulations, and ensure the AI never takes an action it cannot justify. The organization that builds safety into the architecture demonstrates, at the technical level, that the customer's wellbeing is the organizing principle. Powered by Amazon Bedrock Guardrails.

**Layer 5 — Sensing: Reading the Room at Scale.** Human service professionals adapt continuously. A skilled agent can tell from the tone of a customer's voice whether they're frustrated or confused, whether they're open to a retention offer or just want to end the call, whether they need empathy or efficiency. The Sensing Layer brings this capability to AI: real-time sentiment analysis, behavioral signal processing, churn indicator detection, and emotional state inference, all feeding back into the Reasoning and Action layers to calibrate responses. Powered by Amazon Connect Contact Lens and behavioral analytics platforms.

**Layer 6 — Action: Large Action Models and Deterministic Outcomes.** This is where the stack moves from language to action. An LLM can *discuss* a billing discrepancy. The Action Layer *fixes* it. It can *explain* a return policy. The Action Layer *processes* the return. The difference between an AI that talks about what it could do and an AI that does it is the Action Layer — Large Action Models that take verified, deterministic actions in the customer's interest. Powered by Amazon Bedrock AgentCore and API integration frameworks.

**Layer 7 — Orchestration: The Conductor's Score.** No single layer operates in isolation. The Voice Layer feeds the Sensing Layer. The Sensing Layer informs the Reasoning Layer. The Reasoning Layer governs the Action Layer. Making these layers work together — in real time, at the speed of a live customer conversation — is the job of the Orchestration Layer. Think of it as the conductor who ensures every instrument plays in time and in key, even though no instrument is aware of all the others. Powered by Amazon Bedrock multi-agent collaboration and the Strands Agents SDK.

**Layer 8 — Memory: The Compound Interest of Knowing.** Every interaction the customer has with your organization should feed a persistent, continuously updated understanding of who that customer is, what they've experienced, and what they're likely to need next. Memory is the layer that makes the stack compound over time: the organization that starts building genuine customer memory today will have an advantage that is nearly impossible for a competitor to replicate in five years, because trust, once compounded, is extraordinarily difficult to reconstruct from scratch. Powered by Amazon Connect customer profiles and longitudinal interaction history.

The Working Backwards framework this tool generates maps each of these eight layers to *your specific initiative* — with the specific AWS service, the specific implementation note, and the specific customer outcome that applies to the PRFAQ you just wrote. It does not produce generic architecture diagrams. It produces a starting point your team can actually use.

---

## How We Built This Tool While Writing the Book

The honest answer is that this tool was built the same way the PRFAQ it teaches was designed to be written: starting from the customer outcome and working backwards to the implementation.

The customer outcome was clear: a reader who finishes Chapter Five or Appendix C of *Customer Obsession* should be able to immediately *do* Working Backwards, not just understand it abstractly. The PRFAQ methodology is simple enough to explain in a chapter, but applying it for the first time on a real initiative is genuinely hard. The most common failure mode is writing a press release that sounds like an internal memo with better grammar — it describes the features and the technology, but it never quite captures what the customer *experiences*, never quite makes you feel what it would mean to be Marcus, the eleven-year customer who got a call before he ever thought about leaving.

Working backwards from that outcome, the tool needed:

1. **Structure** — Not a blank text box, but a guided sequence that mirrors the PRFAQ's own structure: Headline, Problem, Solution, Benefits, Quotes, FAQs.
2. **Feedback** — A coach who knows the methodology and can push back on vague language, suggest rewrites, and surface the questions the team isn't asking itself.
3. **Output** — Something actionable at the end: not just a completed PRFAQ document, but a Working Backwards framework that maps the initiative to the Obsession Stack and gives the team a concrete 90-day starting point.

The technical implementation was built iteratively using Claude as both the coaching engine and the framework generation engine — the AI model whose underlying methodology gave the book much of its architecture is also the engine that powers the tool the book ships with. The application is built on React 19 and Vite, with all AI calls proxied through a Vercel serverless function so no API key is ever exposed in client-side code.

The design system draws directly from the book's visual identity: Playfair Display for editorial headings, IBM Plex Mono for labels and data, Source Serif 4 for body text, and a palette of navy, gold, and cream that mirrors the book's cover and interior typographic system. The intent was that the tool should feel continuous with the reading experience — not a separate app you navigate to, but an extension of the book itself.

The prompts that drive the AI coach and the framework generator were written, tested, and refined against the actual PRFAQ examples in the book. The Working Backwards framework output was designed to match the structure that appears in Appendix C: Obsession Stack Mapping, Two-Way Door Analysis, 30-Day Pilot Design, Customer Obsession Scorecard, 90-Day Roadmap, and Risks and Mitigations. Every section the tool generates corresponds to a section of the book that explains why that section matters.

---

## What the Application Does

The application guides users through nine screens in sequence. The first is a setup screen. Six are the PRFAQ writing steps. One is a full-document review. The last generates the Working Backwards framework.

**Throughout the entire process, a live AI coaching panel runs in the right sidebar.** The coach knows the full PRFAQ draft at every step — it can see what you've written in previous sections, it knows which step you're on, and it adapts its guidance accordingly. You can ask it anything: "Is this headline specific enough?" "Rewrite my problem paragraph from the customer's perspective." "What's the hardest internal FAQ question I'm avoiding?" It responds with direct, specific feedback grounded in the Working Backwards methodology — no filler, no congratulations, no generic advice.

**Each step also has Quick Prompt buttons** — pre-written questions that surface the most common coaching needs for that step. At the Headline step, you can ask: "Make it bolder," "Sharpen the customer benefit," "Add urgency," "Make it newsworthy." At the Problem step: "Add emotional stakes," "Quantify the pain," "Who is most affected?" These are not shortcuts. They are starting points for the conversation.

**The Review step** renders your complete PRFAQ as a formatted press release document, exactly as it would appear in a printed publication. Read it. Read it out loud. Ask the coach to critique it. When you're satisfied, you finalize it.

**The Output step** sends your complete PRFAQ to Claude, which generates the full Working Backwards framework. This takes 15–30 seconds. The output is specific to your initiative — not a template with your name inserted, but a genuine synthesis of the Obsession Stack applied to the customer outcome, problem, and solution you described. Every section names specific AWS services, specific metrics with numeric thresholds, specific decisions about reversibility, specific risks with probability and impact ratings.

You can copy the PRFAQ, copy the framework, or copy both together as a single document — formatted for immediate use in a planning session, a pitch to leadership, or a project kickoff.

---

## A Complete Walkthrough

### Screen 0 — Start

Name your initiative. This is the only thing required to proceed, and it matters more than it looks: giving the initiative a name forces you to define its scope before you start writing. "AI for Customer Service" is not a name. "Proactive Discharge Follow-Up for At-Risk Patients" is a name.

### Screen 1 — Headline

Write the press release headline. This is the hardest part and the most important. The headline should be written as if a journalist at a major business publication is covering the launch. It should announce the customer benefit, not the technology. It should be specific enough that someone who knows nothing about your organization can understand what changed for customers.

**The tool provides Amazon's standard structure:** "[Company] [Verb] [What], Giving [Customer] the Ability to [Outcome]." But the best headlines break this formula while honoring its spirit. The goal is a sentence that makes a first-time reader say: *that sounds real, that sounds valuable, and I want to know more.*

Write the subheadline and dateline here too. The subheadline adds a specific number, timeframe, or scope that makes the headline concrete. The dateline grounds the press release in time and place.

### Screen 2 — Problem

Describe the pain your customers experience today. Write this in the customer's voice, not the organization's voice. The organization's voice says: "There is an opportunity to improve retention metrics through proactive engagement strategies." The customer's voice says: "Marcus has been with us for eleven years. He is not going to call. He is going to quietly compare plans online, convince himself the grass is greener, and switch carriers without ever telling us why."

The difference between those two framings is the difference between a project that gets funded and shelved and a project that changes how the organization serves people. Use data where you have it. Name the consequence of inaction. Include what has failed before.

### Screen 3 — Solution

Describe what you built from the customer's perspective. Not the architecture. Not the vendor stack. Not the project phases. What does the customer *experience*? How is it different from what they experienced before? What can they do now that they couldn't do before, or what happens for them now that used to require their effort?

Tie technology references to the customer benefit they create. "We deployed Amazon Bedrock AgentCore" is not a customer benefit. "The system reaches customers on their preferred channel, at the optimal time, with a message personalized to their specific situation — with no hold time and no callback required" is a customer benefit.

### Screen 4 — Benefits

List the concrete, measurable outcomes. This section becomes the proof points in the body of the press release. Weak benefits are vague: "improved satisfaction," "faster resolution." Strong benefits are specific: "73% of customers contacted proactively accepted a retention offer"; "22-point NPS increase in the contacted cohort versus control group"; "billing adjustments processed in under 90 seconds with mathematical verification."

Aim for 3–6 benefits. Include at least one with a specific number, timeframe, or percentage. If you don't have real data, use credible projections — but be honest that they are projections, and know that the strongest internal PRFAQs are the ones that say "we don't know yet" and design a pilot to find out.

### Screen 5 — Quotes

The press release needs two voices beyond the narrative: an executive who speaks to the organizational vision, and a customer who speaks to the human experience.

The executive quote should articulate *why this matters* — not "we're excited to announce" but the underlying principle the initiative embodies. In the Marcus example from the book: *"For too long, the telecommunications industry has treated retention as a reactive exercise: wait for the customer to call and threaten to cancel, then offer a discount. Proactive Customer Care changes the fundamental dynamic."* That quote expresses a point of view, not a product feature.

The customer quote should sound like something a real human being would actually say. It should be specific, emotional, and tied to a moment. Give the customer a name and context. The goal is not a testimonial; it is a window into a real experience.

### Screen 6 — FAQs

Write at least two customer FAQs and two internal FAQs. The tool provides separate fields for each type and lets you add or remove questions dynamically.

**Customer FAQs** are the questions that reflect genuine customer concerns, skepticism, or confusion: How do you know I'm unhappy? Can I opt out? What if the AI makes a wrong offer? Will this affect my pricing? Don't write the easy questions. Write the ones that make you uncomfortable.

**Internal FAQs** are the questions that will be asked in the room by the people who control budget, legal approval, engineering resources, and risk tolerance: What platform does this run on? How do we validate offer accuracy? What's the financial model? How do we measure success? And the most important one, from Amazon's vocabulary: Is this a one-way door or a two-way door?

A **one-way door** is an irreversible decision — a platform commitment, an architectural choice, a public announcement that cannot be walked back without significant cost. A **two-way door** is a reversible decision — a pilot, a configuration choice, a segment selection that can be adjusted based on what you learn. Amazon's principle is to make two-way door decisions quickly and at the lowest appropriate level of authority, while slowing down and escalating one-way door decisions to ensure they receive the scrutiny they deserve.

### Screen 7 — Review

Read the full PRFAQ as a formatted press release. Use the AI coach to critique specific sections. Ask it to identify the weakest part, the most missing piece, or the FAQ question you're most afraid of. When you are satisfied — not when it's perfect, but when it's honest and specific and grounded in a real customer outcome — finalize it.

### Screen 8 — Working Backwards Framework

Claude generates six sections of your Working Backwards framework, all specific to the initiative you described:

**Obsession Stack Mapping** — All eight layers (Voice, Sensing, Intelligence, Reasoning, Safety, Memory, Action, Orchestration) mapped to your initiative, with the specific AWS service that powers each layer and one concrete implementation note per layer.

**Two-Way Door Analysis** — Five or six specific decisions your initiative requires, each labeled as a One-Way Door (irreversible, requires full authority and scrutiny) or Two-Way Door (reversible, can be made quickly and corrected based on learning), with an explanation and a recommended owner.

**30-Day Pilot Design** — A specific pilot you can run in the next 30 days: which customer segment, what size, what three success metrics with numeric thresholds, what triggers scale versus pause at Day 30, and what Week 1 and Week 4 milestones look like.

**Customer Obsession Scorecard** — Six metrics specific to your initiative, each with what it measures, a target range, how to measure it, and whether it is a leading indicator (predicts future outcomes) or a lagging indicator (confirms past outcomes). The distinction matters: lagging indicators tell you what happened; leading indicators tell you what is about to happen.

**90-Day Roadmap** — Three phases. Phase 1 (Days 1–30): foundation. Phase 2 (Days 31–60): pilot. Phase 3 (Days 61–90): scale or reconfigure. Each phase has three specific actions, one customer milestone, and one go/no-go decision with a stated threshold.

**Risks and Mitigations** — The four most significant risks to your initiative, each with a probability rating (High, Medium, Low), an impact rating (High, Medium, Low), and one specific mitigation action that your team can take before the risk materializes.

---

## How to Run It Locally

### Prerequisites

- Node.js 18 or higher
- An Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com))

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/chendren/prfaq-generator.git
cd prfaq-generator

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

When the app loads, it will detect that no server-side API key is configured and prompt you to enter your Anthropic API key. Enter your `sk-ant-...` key, which is validated through the proxy and stored in your browser session only. It is cleared when you close the tab.

### Local development with your own key as the server key

If you want to skip the key-entry modal during development:

```bash
# Create a local environment file (this file is gitignored)
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env.local

# Then run the dev server
npm run dev
```

Note: Vite's dev server does not run the Vercel serverless function locally. For full local proxy testing, use the Vercel CLI:

```bash
npm install -g vercel
vercel dev
```

This runs both the React app and the `/api/chat` serverless function exactly as they run in production.

---

## How to Deploy It

### Deploy to Vercel (recommended, free tier works)

```bash
# Install Vercel CLI if you haven't
npm install -g vercel

# From the project directory
vercel
```

Follow the prompts. When deployment is complete, go to your Vercel dashboard:

1. Select the project
2. Go to **Settings → Environment Variables**
3. Add a variable named `ANTHROPIC_API_KEY` with your Anthropic key as the value
4. Redeploy (Vercel dashboard → Deployments → Redeploy)

Once the environment variable is set, users who visit your deployed URL will not see the key-entry modal — the server key is used transparently. Your API key never appears in the client-side JavaScript bundle.

### Deploy to Netlify

Netlify supports serverless functions through their Functions feature, but the `api/chat.js` file is written for Vercel's runtime. To deploy on Netlify:

1. Convert `api/chat.js` to a Netlify Function (place in `netlify/functions/chat.js` and adjust the export format)
2. Set `ANTHROPIC_API_KEY` in Netlify's environment variables
3. Update the proxy URL in `src/lib/claude.js` from `/api/chat` to `/.netlify/functions/chat`

### Deploy as a static site (no server key)

If you want to deploy without a server-side key — meaning every user provides their own — run:

```bash
npm run build
```

Deploy the `dist/` folder to any static host (GitHub Pages, Cloudflare Pages, AWS S3 + CloudFront). When users visit, they will be prompted to enter their own Anthropic key. Their key is stored in session storage only and sent through the proxy on each request.

---

## API Key Setup and Security Model

This tool was designed from the start so that no API key is ever bundled into client-side JavaScript — a common mistake in React applications that use the `VITE_` prefix to expose environment variables to the browser bundle.

### How the proxy works

Every call from the React application goes to `/api/chat`, a Vercel serverless function. The serverless function:

1. Checks for `ANTHROPIC_API_KEY` in the server environment (set in Vercel dashboard)
2. If not present, checks for `x-user-api-key` in the request headers (the user's own key, sent from the browser)
3. If neither is present, returns a `401` with code `NO_KEY`
4. If a key is available, forwards the request to `https://api.anthropic.com/v1/messages` and returns the response

The client-side JavaScript never calls Anthropic directly. You can inspect the built bundle and find no `sk-ant-` string anywhere in it.

### How user keys are handled

When no server key is configured, the app shows a key-entry modal on first load. The user enters their `sk-ant-...` key:

1. The key is immediately validated with a 1-token call through the proxy
2. If validation succeeds, the key is stored in `sessionStorage` — not `localStorage`, meaning it is cleared when the browser tab is closed
3. On every subsequent API call, the key is sent as an `x-user-api-key` request header to the proxy
4. The proxy forwards it to Anthropic, receives the response, and returns it — no logging, no storage, no database

Users can clear their key at any time by clicking the "🔑 Key active" button in the application header, which removes it from session storage and shows the key-entry modal again.

### Two deployment modes at a glance

| Mode | Configuration | User experience |
|---|---|---|
| **Owner-hosted (shared key)** | Set `ANTHROPIC_API_KEY` in Vercel dashboard | Users see no key prompt. They just use the tool. Your key pays for all usage. |
| **Open deployment (user keys)** | Leave `ANTHROPIC_API_KEY` unset | Users are prompted to enter their own `sk-ant-` key on first visit. Each user pays for their own usage. |

---

## Project Structure and Architecture

```
prfaq-generator/
│
├── api/
│   └── chat.js               — Vercel serverless proxy. Holds server key.
│                               Accepts user key as x-user-api-key header.
│                               Never exposes keys to the client.
│
├── src/
│   ├── App.jsx               — Root component. Manages step state, key-ready
│   │                           state, and the startup probe to detect whether
│   │                           a server key exists.
│   │
│   ├── App.css               — All component styles. Design tokens matching
│   │                           the book's visual identity system.
│   │
│   ├── index.css             — Global reset and Google Fonts import.
│   │
│   ├── lib/
│   │   ├── claude.js         — All API calls (via proxy). Prompt builders for
│   │   │                       the coach and the WB framework generator.
│   │   │                       PRFAQ text formatter. Section parser for the
│   │   │                       ## header format Claude returns. Key management
│   │   │                       helpers (saveUserKey, clearUserKey, hasUserKey).
│   │   │                       KeyRequiredError class for clean error handling.
│   │   │
│   │   └── constants.js      — Step definitions. Quick prompt library by step.
│   │                           Working Backwards section icons. Initial data
│   │                           shape for a blank PRFAQ.
│   │
│   └── components/
│       ├── Header.jsx        — Sticky header with project name, step count,
│       │                       and key status indicator.
│       │
│       ├── ProgressBar.jsx   — Step navigation strip. Completed steps are
│       │                       clickable for backward navigation.
│       │
│       ├── AICoach.jsx       — Right-panel chat interface. Context-aware:
│       │                       sends the full current PRFAQ draft on every
│       │                       message. Step-specific welcome messages and
│       │                       quick prompt buttons. Handles KeyRequiredError.
│       │
│       ├── ApiKeyModal.jsx   — First-run key entry. Validates key with a
│       │                       live call before accepting. Security explanation
│       │                       built into the UI.
│       │
│       ├── FieldGroup.jsx    — Reusable form primitives: label, hint, input,
│       │                       textarea with character count.
│       │
│       └── steps/
│           ├── Welcome.jsx   — Project naming and methodology overview.
│           ├── Headline.jsx  — Headline, subheadline, dateline fields.
│           ├── Problem.jsx   — Customer problem statement.
│           ├── Solution.jsx  — Solution description in customer language.
│           ├── Benefits.jsx  — Measurable customer outcomes.
│           ├── Quotes.jsx    — Executive quote and customer quote.
│           ├── FAQs.jsx      — Dynamic customer and internal FAQ entry.
│           ├── Review.jsx    — Full PRFAQ rendered as press release.
│           └── Output.jsx    — Calls Claude for WB framework generation.
│                               Parses and renders all six sections.
│                               Copy/export functions.
│
├── vercel.json               — Routing: /api/* to serverless, /* to SPA.
├── .env.example              — Template showing ANTHROPIC_API_KEY variable.
├── package.json              — React 19, Vite 7, react-markdown.
└── vite.config.js            — Standard Vite React config.
```

### Design decisions worth noting

**No CSS framework.** The application uses hand-written CSS with CSS custom properties (design tokens). This was a deliberate choice: the visual system needed to match the book's typography and color palette precisely, and utility-class frameworks like Tailwind make that kind of tight, opinionated design harder to control. The tradeoff is more CSS to maintain; the payoff is a design that feels continuous with the book.

**No router.** The application is a linear flow with one branching condition (key modal vs. main app). A router would add complexity without adding value. Step state is a single integer managed in `App.jsx`.

**AI calls are not streamed.** Streaming would improve perceived performance for the framework generation step, where Claude writes 2,000 tokens. This is a deliberate simplification for the initial release — the loading indicator communicates progress, and streaming would require more complex state management in the Output component. A future version may add streaming.

**The Working Backwards framework prompt is explicit.** Claude is given precise instructions on what each section should contain, including the number of items, the specific attributes per item (e.g., "probability (H/M/L), impact (H/M/L)"), and the exact section names in `## header` format that the parser expects. This explicitness produces consistent output that parses reliably — at the cost of some flexibility in how Claude structures its response.

---

## For Teams and Organizations

This tool is designed for individual use, but Working Backwards is inherently a team discipline. Here is how organizations have gotten the most value from PRFAQ exercises:

**Workshop format.** Run the PRFAQ builder as a 90-minute workshop. A facilitator drives the screen; the team debates each section before the words are entered. The AI coach is visible to everyone and used as a sparring partner. The most valuable part of the workshop is usually the FAQ section, where the internal questions surface assumptions the team has been carrying without examining.

**Pre-alignment for AI initiatives.** Before any architecture review, any vendor selection, or any budget request, require the team to complete and share a PRFAQ. The test: can the team articulate the customer benefit without referencing the technology? If not, the initiative is not ready.

**Leadership review.** The PRFAQ format was designed to be read by senior leaders in five minutes. The press release should be immediately comprehensible to an executive who knows nothing about the project. If it requires context or footnotes to be understood, it needs another revision.

**Iteration.** A PRFAQ is not a contract. It is a hypothesis. Write it, run the pilot, compare what the customer experienced against what the press release promised, and revise. The organizations that get the most from Working Backwards are the ones that treat the PRFAQ as a living document that is updated as they learn, not an artifact that is filed away after the initiative is approved.

---

## References and Further Reading

**Primary source for the Working Backwards methodology:**
Bryar, Colin and Bill Carr. *Working Backwards: Insights, Stories, and Secrets from Inside Amazon.* St. Martin's Press, 2021.

**The book this tool accompanies:**
Hendren, Chad. *Customer Obsession: The Nucleus Principle.* 2026.

**Chapter and appendix references within the book:**
- Chapter Five: "The Obsession Stack" — the eight-layer AI architecture and its application to customer experience
- Chapter Six: "The Human Layer" — how exceptional human service informs the design of customer-obsessed AI
- Chapter Seven: Extended case studies including Marcus (telecom), Evelyn (healthcare discharge), and the Cleveland Clinic Neurological Institute scenario
- Appendix C: "Working Backwards from the Micro-Moment" — the complete PRFAQ example this tool is based on, with annotations explaining each section's purpose

**AWS services referenced in the Obsession Stack:**
- [Amazon Bedrock](https://aws.amazon.com/bedrock/) — Foundation models and agent infrastructure
- [Amazon Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/) — Agent runtime, memory, and action execution
- [Amazon Bedrock Automated Reasoning](https://aws.amazon.com/bedrock/automated-reasoning/) — Mathematical verification for AI-generated assertions
- [Amazon Bedrock Guardrails](https://aws.amazon.com/bedrock/guardrails/) — Safety and compliance controls
- [Amazon Connect Contact Lens](https://aws.amazon.com/connect/contact-lens/) — Real-time sentiment and behavioral analytics
- [Amazon Nova Sonic](https://aws.amazon.com/ai/nova/) — Speech-to-speech AI for voice interactions
- [Strands Agents SDK](https://strandsagents.com) — Multi-agent orchestration framework

**The Anthropic Claude API:**
- [console.anthropic.com](https://console.anthropic.com) — Get your API key
- [docs.anthropic.com](https://docs.anthropic.com) — API documentation
- This tool uses `claude-sonnet-4-20250514`

---

*Customer Obsession: The Nucleus Principle* — Chad Hendren, Principal Solutions Architect and Global AI Lead for Customer Experience, Amazon Web Services, 2026.

*"The most important question you can ask before you deploy AI in customer experience is not 'what can this technology do?' It is 'what does the customer need this to do, and how will we know when we've done it?' Working Backwards is the discipline that keeps you honest."*
