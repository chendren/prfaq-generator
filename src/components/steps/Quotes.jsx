import { FieldGroup, TextArea, TextInput } from "../FieldGroup";

export default function Quotes({ data, set, onBack, onNext }) {
  return (
    <div>
      <div className="step-eyebrow">Step 05 of 06 — Press Release</div>
      <h2 className="step-headline">Quotes</h2>
      <p className="step-description">
        The executive quote should articulate the vision. The customer quote should feel
        like something a real human would actually say — not a marketing line.
      </p>
      <FieldGroup label="Executive Quote" hint="Vision, why this matters, and the customer-obsession thesis. 2–4 sentences.">
        <TextArea value={data.executiveQuote} onChange={(v) => set("executiveQuote", v)}
          placeholder="For too long, [industry] has [problem framing]. With [product], we are [vision statement] — reaching [customer] with [benefit] at [the moment they need it], rather than [old approach]." />
      </FieldGroup>
      <div className="two-col">
        <FieldGroup label="Executive Name">
          <TextInput value={data.executiveName} onChange={(v) => set("executiveName", v)} placeholder="Jane Smith" />
        </FieldGroup>
        <FieldGroup label="Executive Title">
          <TextInput value={data.executiveTitle} onChange={(v) => set("executiveTitle", v)} placeholder="Chief Customer Officer, Acme Corp." />
        </FieldGroup>
      </div>
      <FieldGroup label="Customer Quote" hint="Specific, emotional, human. A real customer name and context. Not a testimonial cliché.">
        <TextArea value={data.customerQuote} onChange={(v) => set("customerQuote", v)}
          placeholder="I had no idea anyone was even paying attention. When [company] reached out, I [what happened]. I did not have to [pain]. That was [emotional response]." />
      </FieldGroup>
      <FieldGroup label="Customer Name / Context">
        <TextInput value={data.customerName} onChange={(v) => set("customerName", v)} placeholder="Marcus T., 11-year customer, Portland, OR" />
      </FieldGroup>
      <div className="btn-row">
        <button className="btn-outline" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onNext} disabled={!data.executiveQuote.trim()}>Next: FAQs →</button>
      </div>
    </div>
  );
}
