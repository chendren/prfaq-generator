import { FieldGroup, TextArea } from "../FieldGroup";

export default function Benefits({ data, set, onBack, onNext }) {
  return (
    <div>
      <div className="step-eyebrow">Step 04 of 06 — Press Release</div>
      <h2 className="step-headline">Key Benefits</h2>
      <p className="step-description">
        List the concrete benefits customers will experience. These become the proof points
        in the press release body. Be specific and measurable.
      </p>
      <FieldGroup label="Customer Benefits"
        hint="3–6 benefits, each tying to a customer outcome. Include at least one with a specific number, timeframe, or percentage.">
        <TextArea tall value={data.benefits} onChange={(v) => set("benefits", v)}
          placeholder={"• [Benefit 1]: Customers [specific action] in [timeframe], without [previous friction].\n• [Benefit 2]: [Customer segment] can now [capability] with no [barrier].\n• [Benefit 3]: [X]% [metric] improvement based on [evidence]."} />
      </FieldGroup>
      <div className="btn-row">
        <button className="btn-outline" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onNext} disabled={!data.benefits.trim()}>Next: Quotes →</button>
      </div>
    </div>
  );
}
