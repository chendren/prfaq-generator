import { FieldGroup, TextArea, TextInput } from "../FieldGroup";

export default function Headline({ data, set, onBack, onNext }) {
  return (
    <div>
      <div className="step-eyebrow">Step 01 of 06 — Press Release</div>
      <h2 className="step-headline">The Headline</h2>
      <p className="step-description">
        Write the headline as if this has already launched and a journalist is covering it.
        Lead with what the customer gains — not what you built.
      </p>
      <div className="notice-box">
        <strong>Amazon standard:</strong> "[Company] Launches [What], Giving [Customer] the Ability to [Outcome]."
        The headline should be instantly clear to someone who knows nothing about your project.
      </div>
      <FieldGroup label="Main Headline" hint="Bold, specific, customer-benefit-first. No internal jargon.">
        <TextArea value={data.headline} onChange={(v) => set("headline", v)}
          placeholder="[Company] Launches [Product] That Gives [Customer Segment] the Ability to [Concrete Benefit] Without [Previous Pain]" />
      </FieldGroup>
      <FieldGroup label="Subheadline" hint="One sentence expanding on the headline — add a number or specificity.">
        <TextArea value={data.subheadline} onChange={(v) => set("subheadline", v)}
          placeholder="The new service, launching [timeframe] for [eligibility], [does X], with no [barrier] required." />
      </FieldGroup>
      <FieldGroup label="Dateline" hint="City, Date format.">
        <TextInput value={data.dateline} onChange={(v) => set("dateline", v)}
          placeholder="BELLEVUE, Wash. — February 2026 —" />
      </FieldGroup>
      <div className="btn-row">
        <button className="btn-outline" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onNext} disabled={!data.headline.trim()}>Next: Problem →</button>
      </div>
    </div>
  );
}
