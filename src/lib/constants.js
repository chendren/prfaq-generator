export const STEPS = [
  { id: "welcome",  label: "Start"    },
  { id: "headline", label: "Headline" },
  { id: "problem",  label: "Problem"  },
  { id: "solution", label: "Solution" },
  { id: "benefits", label: "Benefits" },
  { id: "quotes",   label: "Quotes"   },
  { id: "faqs",     label: "FAQs"     },
  { id: "review",   label: "Review"   },
  { id: "output",   label: "Framework"},
];

export const QUICK_PROMPTS = {
  headline:  ["Make it bolder", "Sharpen the customer benefit", "Add urgency", "Make it newsworthy"],
  problem:   ["Add emotional stakes", "Quantify the pain", "Who is most affected?", "What has failed before?"],
  solution:  ["Clarify the how", "Remove jargon", "What makes it unique?", "Add a differentiator"],
  benefits:  ["Prioritize these", "Add a measurable outcome", "What does the customer feel?", "Tie to ROI"],
  quotes:    ["Rewrite the exec quote", "Make the customer quote more human", "Add emotion", "Strengthen the vision"],
  faqs:      ["What is the hardest question?", "Add a privacy question", "Add a cost question", "Sharpen an answer"],
  review:    ["Overall feedback", "What is missing?", "Is this press-release ready?", "Identify the weakest section"],
};

export const WB_ICONS = {
  "OBSESSION STACK MAPPING":            "◈",
  "TWO-WAY DOOR ANALYSIS":              "⇌",
  "30-DAY PILOT DESIGN":                "◎",
  "CUSTOMER OBSESSION SCORECARD":       "◉",
  "90-DAY ROADMAP":                     "▶",
  "RISKS AND MITIGATIONS":              "△",
};

export const STEP_WELCOME_MESSAGES = {
  headline:  "I am here to help sharpen your headline. A great PRFAQ headline announces the customer benefit like a real news story — specific, compelling, and free of internal jargon. Share what you are thinking and I will help refine it.",
  problem:   "Let us define the problem your initiative solves. The strongest problem statements are written in the customer's voice — what they experience, not what the org chart says. What pain are you addressing?",
  solution:  "Now describe the solution from the customer's perspective. What did you build, how does it work at a high level, and why is it meaningfully better than what existed before?",
  benefits:  "List the concrete benefits customers will experience. Be specific and measurable. 'Customers save time' is weak. 'Customers resolve billing questions in under 90 seconds, without hold time' is strong.",
  quotes:    "Quotes bring the PRFAQ to life. The executive quote should articulate the vision. The customer quote should feel like something a real person would actually say — emotional, specific, human.",
  faqs:      "FAQs are where skeptics get answered. Customer FAQs address how does this affect me. Internal FAQs address can we actually build this and does it make financial sense. Do not avoid the hard questions.",
  review:    "You have drafted all the sections. Review the complete PRFAQ and ask me anything — I can critique it, suggest what is missing, or strengthen any section before you finalize.",
  output:    "Your PRFAQ is finalized. I generated your complete Working Backwards framework — Obsession Stack mapping, pilot design, scorecard, and 90-day roadmap — all specific to your initiative.",
};

export const INITIAL_DATA = {
  projectName:    "",
  headline:       "",
  subheadline:    "",
  dateline:       "",
  problem:        "",
  solution:       "",
  benefits:       "",
  executiveQuote: "",
  executiveName:  "",
  executiveTitle: "",
  customerQuote:  "",
  customerName:   "",
  faqs: [
    { type: "customer", q: "", a: "" },
    { type: "internal", q: "", a: "" },
  ],
};
