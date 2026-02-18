import { STEPS } from "../lib/constants";

export default function ProgressBar({ stepIdx, setStepIdx }) {
  return (
    <nav className="progress-strip">
      {STEPS.map((s, i) => (
        <button
          key={s.id}
          className={[
            "progress-step",
            i === stepIdx ? "active" : "",
            i < stepIdx ? "done" : "",
          ].join(" ")}
          onClick={() => { if (i < stepIdx) setStepIdx(i); }}
          disabled={i > stepIdx}
          title={i < stepIdx ? `Go back to ${s.label}` : s.label}
        >
          <span className="progress-step-num">{i < stepIdx ? "✓" : String(i).padStart(2, "0")}</span>
          <span className="progress-step-label">{s.label}</span>
        </button>
      ))}
    </nav>
  );
}
