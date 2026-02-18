import { FieldGroup, TextInput } from "../FieldGroup";

const CARDS = [
  { n:"01", name:"Headline",  desc:"The press release lede — customer benefit in one sentence." },
  { n:"02", name:"Problem",   desc:"What pain exists today? Who feels it and what have they tried?" },
  { n:"03", name:"Solution",  desc:"What you built, described in plain customer language." },
  { n:"04", name:"Benefits",  desc:"Concrete, measurable outcomes for customers." },
  { n:"05", name:"Quotes",    desc:"Executive vision + authentic customer voice." },
  { n:"06", name:"FAQs",      desc:"Customer and internal questions, answered honestly." },
];

export default function Welcome({ data, set, onNext }) {
  return (
    <div className="welcome-screen">
      <div className="step-eyebrow">Amazon Working Backwards</div>
      <h1 className="step-headline">Build Your PRFAQ</h1>
      <p className="step-description">
        Write your initiative's Press Release and FAQ before a line of code is written.
        AI coaching at every step. A complete Working Backwards framework at the end.
      </p>

      <div className="notice-box">
        <strong>How this works:</strong> Complete 6 guided sections. The AI coach helps you
        strengthen each one. When you finalize, Claude generates a full Working Backwards
        framework — Obsession Stack mapping, pilot design, scorecard, and 90-day roadmap —
        specific to your initiative.
      </div>

      <FieldGroup
        label="Project / Initiative Name"
        hint='e.g. "Proactive Churn Prevention" or "AI-Powered Discharge Follow-Up"'
      >
        <TextInput
          value={data.projectName}
          onChange={(v) => set("projectName", v)}
          placeholder="Name your initiative…"
          autoFocus
        />
      </FieldGroup>

      <div className="welcome-cards">
        {CARDS.map((c) => (
          <div className="welcome-card" key={c.n}>
            <div className="welcome-card-num">STEP {c.n}</div>
            <div className="welcome-card-name">{c.name}</div>
            <div className="welcome-card-desc">{c.desc}</div>
          </div>
        ))}
      </div>

      <div className="btn-row">
        <button className="btn-gold" onClick={onNext} disabled={!data.projectName.trim()}>
          Begin PRFAQ{data.projectName ? ` → "${data.projectName}"` : ""}
        </button>
      </div>
    </div>
  );
}
