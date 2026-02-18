import { useState, useEffect } from "react";
import Header       from "./components/Header";
import ProgressBar  from "./components/ProgressBar";
import AICoach      from "./components/AICoach";
import ApiKeyModal  from "./components/ApiKeyModal";
import Welcome      from "./components/steps/Welcome";
import Headline     from "./components/steps/Headline";
import Problem      from "./components/steps/Problem";
import Solution     from "./components/steps/Solution";
import Benefits     from "./components/steps/Benefits";
import Quotes       from "./components/steps/Quotes";
import FAQs         from "./components/steps/FAQs";
import Review       from "./components/steps/Review";
import Output       from "./components/steps/Output";
import { STEPS, INITIAL_DATA } from "./lib/constants";
import { hasUserKey, clearUserKey } from "./lib/claude";
import "./App.css";

// The app checks at startup whether a server key exists (via a lightweight
// probe to /api/chat). If not, users must supply their own.
async function probeServerKey() {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages:   [{ role: "user", content: "ping" }],
        system:     "Reply: pong",
        max_tokens: 5,
      }),
    });
    // 401 with NO_KEY means no server key — user must provide their own
    if (res.status === 401) {
      const data = await res.json().catch(() => ({}));
      return data.code !== "NO_KEY"; // false = no server key
    }
    return res.ok; // 200 = server key present and working
  } catch {
    return false;
  }
}

export default function App() {
  const [stepIdx, setStepIdx]       = useState(0);
  const [data, setData]             = useState(INITIAL_DATA);
  const [keyReady, setKeyReady]     = useState(false);  // true once key confirmed
  const [showModal, setShowModal]   = useState(false);
  const [probing, setProbing]       = useState(true);

  // On mount: check if server key exists or user already has one in session
  useEffect(() => {
    (async () => {
      const serverHasKey = await probeServerKey();
      if (serverHasKey || hasUserKey()) {
        setKeyReady(true);
      } else {
        setShowModal(true);
      }
      setProbing(false);
    })();
  }, []);

  const handleKeySet = () => {
    setKeyReady(true);
    setShowModal(false);
  };

  const handleClearKey = () => {
    clearUserKey();
    setKeyReady(false);
    setShowModal(true);
  };

  const set    = (field, value) => setData((d) => ({ ...d, [field]: value }));
  const next   = () => setStepIdx((i) => Math.min(i + 1, STEPS.length - 1));
  const back   = () => setStepIdx((i) => Math.max(i - 1, 0));
  const reset  = () => { setData(INITIAL_DATA); setStepIdx(0); };
  const finalize = () => setStepIdx(STEPS.length - 1);

  const stepId = STEPS[stepIdx].id;

  const renderStep = () => {
    switch (stepId) {
      case "welcome":  return <Welcome  data={data} set={set} onNext={next} />;
      case "headline": return <Headline data={data} set={set} onBack={back} onNext={next} />;
      case "problem":  return <Problem  data={data} set={set} onBack={back} onNext={next} />;
      case "solution": return <Solution data={data} set={set} onBack={back} onNext={next} />;
      case "benefits": return <Benefits data={data} set={set} onBack={back} onNext={next} />;
      case "quotes":   return <Quotes   data={data} set={set} onBack={back} onNext={next} />;
      case "faqs":     return <FAQs     data={data} setData={setData} onBack={back} onNext={next} />;
      case "review":   return <Review   data={data} onBack={back} onFinalize={finalize} />;
      case "output":   return <Output   data={data} onReset={reset} />;
      default: return null;
    }
  };

  if (probing) {
    return (
      <div className="app-shell app-loading">
        <div className="spinner" style={{ width: 28, height: 28, borderWidth: 3 }} />
        <span style={{ color: "var(--text-muted)", fontStyle: "italic", fontSize: "0.9rem" }}>
          Connecting…
        </span>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {showModal && <ApiKeyModal onKeySet={handleKeySet} />}

      <Header
        projectName={data.projectName}
        currentStep={stepIdx}
        totalSteps={STEPS.length}
        keyReady={keyReady}
        onClearKey={handleClearKey}
      />
      <ProgressBar stepIdx={stepIdx} setStepIdx={setStepIdx} />

      <div className="main-layout">
        <main className="step-panel">
          {keyReady ? renderStep() : (
            <div style={{ padding: "3rem", color: "var(--text-muted)", fontStyle: "italic" }}>
              Waiting for API key…
            </div>
          )}
        </main>

        {stepIdx > 0 && keyReady && (
          <AICoach data={data} stepId={stepId} />
        )}
      </div>
    </div>
  );
}
