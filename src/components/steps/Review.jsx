import { buildPRFAQText } from "../../lib/claude";

export default function Review({ data, onBack, onFinalize }) {
  const copy = () => navigator.clipboard.writeText(buildPRFAQText(data)).catch(() => {});

  return (
    <div>
      <div className="step-eyebrow">Review — Full PRFAQ Draft</div>
      <h2 className="step-headline">Review Your PRFAQ</h2>
      <p className="step-description">
        Read it as a journalist would. Use the AI coach on the right to critique any section.
        When satisfied, finalize and generate your Working Backwards framework.
      </p>

      <div className="review-panel">
        <div className="review-section-title">PRESS RELEASE</div>
        <p className="review-stamp">FOR IMMEDIATE RELEASE</p>
        <h2 className="pr-headline">{data.headline || "(no headline)"}</h2>
        {data.subheadline && <p className="pr-sub">{data.subheadline}</p>}
        {data.dateline && <p className="pr-date">{data.dateline}</p>}

        <div className="review-field">
          <div className="review-field-label">The Problem</div>
          <div className="review-field-value">{data.problem || "(not filled)"}</div>
        </div>
        <div className="review-field">
          <div className="review-field-label">The Solution</div>
          <div className="review-field-value">{data.solution || "(not filled)"}</div>
        </div>
        <div className="review-field">
          <div className="review-field-label">Key Benefits</div>
          <div className="review-field-value">{data.benefits || "(not filled)"}</div>
        </div>
        <div className="review-field">
          <div className="review-field-label">Executive Quote</div>
          <div className="review-field-value">
            &ldquo;{data.executiveQuote}&rdquo;
            <br />
            <span className="review-attr">— {data.executiveName}, {data.executiveTitle}</span>
          </div>
        </div>
        <div className="review-field">
          <div className="review-field-label">Customer Quote</div>
          <div className="review-field-value">
            &ldquo;{data.customerQuote}&rdquo;
            <br />
            <span className="review-attr">— {data.customerName}</span>
          </div>
        </div>
      </div>

      {data.faqs.some((f) => f.q.trim()) && (
        <div className="review-panel">
          <div className="review-section-title">FREQUENTLY ASKED QUESTIONS</div>
          {["customer", "internal"].map((type) => {
            const items = data.faqs.filter((f) => f.type === type && f.q.trim());
            if (!items.length) return null;
            return (
              <div key={type}>
                <div className="faq-section-label">{type} FAQs</div>
                {items.map((f, i) => (
                  <div key={i} className="review-faq">
                    <div className="review-faq-q">Q: {f.q}</div>
                    <div className="review-faq-a">A: {f.a}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      <div className="btn-row">
        <button className="btn-outline" onClick={onBack}>← Edit FAQs</button>
        <button className="btn-outline" onClick={copy}>⎘ Copy PRFAQ</button>
        <button className="btn-gold" onClick={onFinalize}>✦ Finalize &amp; Generate Framework</button>
      </div>
    </div>
  );
}
