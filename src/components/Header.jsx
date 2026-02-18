export default function Header({ projectName, currentStep, totalSteps }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <span className="header-title">Working Backwards</span>
        <span className="header-sub">PRFAQ Builder</span>
      </div>
      <div className="header-right">
        {projectName && <span className="header-project">{projectName}</span>}
        {currentStep > 0 && (
          <span className="header-progress">
            Step {currentStep} of {totalSteps - 2}
          </span>
        )}
      </div>
    </header>
  );
}
