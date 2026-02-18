import { useState } from "react";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import AICoach from "./components/AICoach";
import Welcome  from "./components/steps/Welcome";
import Headline from "./components/steps/Headline";
import Problem  from "./components/steps/Problem";
import Solution from "./components/steps/Solution";
import Benefits from "./components/steps/Benefits";
import Quotes   from "./components/steps/Quotes";
import FAQs     from "./components/steps/FAQs";
import Review   from "./components/steps/Review";
import Output   from "./components/steps/Output";
import { STEPS, INITIAL_DATA } from "./lib/constants";
import "./App.css";

export default function App() {
  const [stepIdx, setStepIdx]   = useState(0);
  const [data, setData]         = useState(INITIAL_DATA);

  const set = (field, value) => setData((d) => ({ ...d, [field]: value }));

  const next  = () => setStepIdx((i) => Math.min(i + 1, STEPS.length - 1));
  const back  = () => setStepIdx((i) => Math.max(i - 1, 0));
  const reset = () => { setData(INITIAL_DATA); setStepIdx(0); };

  const finalize = () => {
    setStepIdx(STEPS.length - 1);
  };

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

  return (
    <div className="app-shell">
      <Header
        projectName={data.projectName}
        currentStep={stepIdx}
        totalSteps={STEPS.length}
      />
      <ProgressBar stepIdx={stepIdx} setStepIdx={setStepIdx} />

      <div className="main-layout">
        <main className="step-panel">
          {renderStep()}
        </main>

        {stepIdx > 0 && (
          <AICoach data={data} stepId={stepId} />
        )}
      </div>
    </div>
  );
}
