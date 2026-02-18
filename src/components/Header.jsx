export default function Header({ projectName, currentStep, totalSteps, keyReady, onClearKey }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <span className="header-title">Working Backwards</span>
        <span className="header-sub">PRFAQ Builder</span>
      </div>
      <div className="header-right">
        {projectName && <span className="header-project">{projectName}</span>}
        {currentStep > 0 && currentStep < totalSteps - 1 && (
          <span className="header-progress">Step {currentStep} of {totalSteps - 2}</span>
        )}
        {keyReady ? (
          <button
            className="key-status key-status-ok"
            onClick={onClearKey}
            title="API key active — click to change"
          >
            🔑 Key active
          </button>
        ) : (
          <span className="key-status key-status-missing">⚠ No key</span>
        )}
      </div>
    </header>
  );
}
