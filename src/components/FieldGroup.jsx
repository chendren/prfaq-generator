export function FieldGroup({ label, hint, children }) {
  return (
    <div className="field-group">
      {label && <label className="field-label">{label}</label>}
      {hint && <p className="field-hint">{hint}</p>}
      {children}
    </div>
  );
}

export function TextInput({ value, onChange, placeholder, autoFocus }) {
  return (
    <input
      className="field-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
  );
}

export function TextArea({ value, onChange, placeholder, tall }) {
  return (
    <>
      <textarea
        className={`field-textarea${tall ? " tall" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <div className="char-count">{value.length} chars</div>
    </>
  );
}
