import { FieldGroup, TextArea } from "../FieldGroup";

export default function Problem({ data, set, onBack, onNext }) {
  return (
    <div>
      <div className="step-eyebrow">Step 02 of 06 — Press Release</div>
      <h2 className="step-headline">The Problem</h2>
      <p className="step-description">
        Describe the pain your customers experience today. Write it as if explaining to someone
        who has never worked in your industry — start with the customer, not the organization.
      </p>
      <FieldGroup label="Problem Statement"
        hint="2–4 paragraphs. Name the customer. Describe what they experience. Include what has failed before. Use data where possible.">
        <TextArea tall value={data.problem} onChange={(v) => set("problem", v)}
          placeholder="For [customer type], [specific pain] has meant [consequence]. Today, when [situation occurs], [what the customer must currently do] — which [emotional/practical cost]. Despite [what exists], [what remains broken]…" />
      </FieldGroup>
      <div className="btn-row">
        <button className="btn-outline" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onNext} disabled={!data.problem.trim()}>Next: Solution →</button>
      </div>
    </div>
  );
}
