import { useState, useEffect } from "react";
import { callClaude, buildWBPrompt, buildPRFAQText, parseWBSections } from "../../lib/claude";
import { WB_ICONS } from "../../lib/constants";

export default function Output({ data, onReset }) {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    generate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setOutput(null);
    try {
      const prompt = buildWBPrompt(data);
      const reply = await callClaude(
        [{ role: "user", content: prompt }],
        "You are a senior AWS Solutions Architect and Amazon Working Backwards expert. Be specific, practical, and grounded. Use ## headers exactly as instructed.",
        2000
      );
      setOutput(reply);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const copyPRFAQ = () => navigator.clipboard.writeText(buildPRFAQText(data)).catch(() => {});
  const copyWB    = () => output && navigator.clipboard.writeText(output).catch(() => {});
  const copyBoth  = () => output && navigator.clipboard.writeText(buildPRFAQText(data) + "\n\n---\n\n" + output).catch(() => {});

  const sections = parseWBSections(output || "");

  return (
    <div>
      <div className="step-eyebrow">Working Backwards Framework</div>
      <h2 className="step-headline">Art of the Possible</h2>
      <p className="step-description">
        Your complete Working Backwards framework — specific to &ldquo;{data.projectName}&rdquo;.
        Use this as a team starting point, not a finished plan.
      </p>

      <div className="wb-output">
        <div className="wb-header">
          <div className="wb-header-title">{data.projectName}</div>
          <div className="wb-header-sub">
            {loading ? "Generating framework…" : "Working Backwards Framework — Art of the Possible"}
          </div>
        </div>

        {loading && (
          <div className="wb-loading">
            <div className="spinner" />
            <span>Claude is building your framework — Obsession Stack mapping, pilot design, scorecard, and 90-day roadmap…</span>
          </div>
        )}

        {error && (
          <div className="wb-error">
            <strong>Generation failed:</strong> {error}
            <button className="btn-outline" style={{ marginTop: "1rem" }} onClick={generate}>Retry</button>
          </div>
        )}

        {output && !loading && (
          <div className="wb-body">
            {sections.length > 0
              ? sections.map((s, i) => (
                  <div className="wb-section" key={i}>
                    <div className="wb-section-title">
                      <span className="wb-icon">{WB_ICONS[s.title] || "◆"}</span>
                      {s.title}
                    </div>
                    <div className="wb-content">{s.content}</div>
                  </div>
                ))
              : <div className="wb-content">{output}</div>
            }
          </div>
        )}

        {output && !loading && (
          <div className="export-bar">
            <span className="export-label">Export</span>
            <div className="export-btns">
              <button className="btn-outline" onClick={copyPRFAQ}>⎘ Copy PRFAQ</button>
              <button className="btn-outline" onClick={copyWB}>⎘ Copy Framework</button>
              <button className="btn-outline" onClick={copyBoth}>⎘ Copy Both</button>
              <button className="btn-primary" onClick={onReset}>Start New PRFAQ</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
