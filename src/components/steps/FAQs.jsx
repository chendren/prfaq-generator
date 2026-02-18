export default function FAQs({ data, setData, onBack, onNext }) {
  const add = (type) =>
    setData((d) => ({ ...d, faqs: [...d.faqs, { type, q: "", a: "" }] }));

  const remove = (i) =>
    setData((d) => ({ ...d, faqs: d.faqs.filter((_, idx) => idx !== i) }));

  const update = (i, field, val) =>
    setData((d) => ({
      ...d,
      faqs: d.faqs.map((f, idx) => (idx === i ? { ...f, [field]: val } : f)),
    }));

  return (
    <div>
      <div className="step-eyebrow">Step 06 of 06 — FAQ</div>
      <h2 className="step-headline">Frequently Asked Questions</h2>
      <p className="step-description">
        Customer FAQs: questions your customers will actually ask. Internal FAQs: the hard questions
        your leadership, legal, and finance teams will ask. Do not avoid the uncomfortable ones.
      </p>

      {data.faqs.map((faq, i) => (
        <div className="faq-item" key={i}>
          <span className={`faq-badge ${faq.type}`}>
            {faq.type === "customer" ? "Customer FAQ" : "Internal FAQ"}
          </span>
          <button className="faq-remove" onClick={() => remove(i)} title="Remove">×</button>
          <div className="field-group" style={{ marginBottom: "0.6rem" }}>
            <label className="field-label" style={{ fontSize: "0.6rem" }}>Question</label>
            <input className="field-input" value={faq.q} onChange={(e) => update(i, "q", e.target.value)}
              placeholder={faq.type === "customer" ? "How does this affect my privacy?" : "What is the expected ROI and payback period?"} />
          </div>
          <div className="field-group" style={{ margin: 0 }}>
            <label className="field-label" style={{ fontSize: "0.6rem" }}>Answer</label>
            <textarea className="field-textarea" style={{ minHeight: "80px" }}
              value={faq.a} onChange={(e) => update(i, "a", e.target.value)}
              placeholder="Direct, complete answer. Do not hedge unnecessarily." />
          </div>
        </div>
      ))}

      <div className="two-col" style={{ marginTop: "0.5rem" }}>
        <button className="btn-add" onClick={() => add("customer")}>+ Add Customer FAQ</button>
        <button className="btn-add" onClick={() => add("internal")}>+ Add Internal FAQ</button>
      </div>

      <div className="btn-row">
        <button className="btn-outline" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onNext}>Review PRFAQ →</button>
      </div>
    </div>
  );
}
