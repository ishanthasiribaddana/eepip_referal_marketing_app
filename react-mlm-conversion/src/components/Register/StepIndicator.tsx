interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

export default function StepIndicator({ currentStep, totalSteps, stepNames }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {stepNames.map((name, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isUpcoming = stepNum > currentStep;

          return (
            <div key={stepNum} className="flex-1 flex items-center">
              {/* Circle */}
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${isCurrent ? 'bg-primary-500 text-white' : ''}
                  ${isUpcoming ? 'bg-gray-200 text-gray-500' : ''}
                `}
              >
                {isCompleted ? '✓' : stepNum}
              </div>

              {/* Label */}
              <div className="ml-3 hidden sm:block">
                <p className={`text-sm font-medium ${isCurrent ? 'text-primary-600' : isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                  {name}
                </p>
              </div>

              {/* Connector line */}
              {stepNum < totalSteps && (
                <div
                  className={`
                    flex-1 h-0.5 mx-4
                    ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile step indicator */}
      <div className="sm:hidden text-center">
        <p className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}: <span className="font-semibold text-primary-600">{stepNames[currentStep - 1]}</span>
        </p>
      </div>
    </div>
  );
}
