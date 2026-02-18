import { FieldGroup, TextArea } from "../FieldGroup";

export default function Solution({ data, set, onBack, onNext }) {
  return (
    <div>
      <div className="step-eyebrow">Step 03 of 06 — Press Release</div>
      <h2 className="step-headline">The Solution</h2>
      <p className="step-description">
        Describe what you built from the customer&apos;s perspective. How does it work at a high level?
        What does the customer experience? Why is this meaningfully better?
      </p>
      <FieldGroup label="Solution Description"
        hint="2–4 paragraphs. Describe the experience, not the architecture. Tie any technology references to the customer benefit they create. Avoid acronyms.">
        <TextArea tall value={data.solution} onChange={(v) => set("solution", v)}
          placeholder="[Company] today announced [product/feature], which [does what] for [who]. Unlike [existing approach], [product] [how it works simply] — meaning [customer benefit]. The service [key capability], [key capability], and [key capability], all without [barrier the customer previously faced]…" />
      </FieldGroup>
      <div className="btn-row">
        <button className="btn-outline" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onNext} disabled={!data.solution.trim()}>Next: Benefits →</button>
      </div>
    </div>
  );
}
