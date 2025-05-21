
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

export interface StepProps {
  id: string;
  title: string;
}

interface StepperProps {
  steps: StepProps[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export function Step({
  isActive,
  isCompleted,
  title,
  stepNumber,
  onClick,
  isClickable = false
}: {
  isActive: boolean;
  isCompleted: boolean;
  title: string;
  stepNumber: number;
  onClick?: () => void;
  isClickable?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        disabled={!isClickable}
        onClick={isClickable ? onClick : undefined}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
          isActive
            ? "border-primary bg-primary text-primary-foreground"
            : isCompleted
            ? "border-primary bg-primary/20 text-primary-foreground"
            : "border-muted-foreground bg-background text-muted-foreground",
          isClickable && !isActive && "cursor-pointer hover:bg-muted"
        )}
      >
        {isCompleted ? (
          <CheckCircle className="h-5 w-5 text-primary" />
        ) : (
          <span>{stepNumber + 1}</span>
        )}
      </button>
      <p
        className={cn(
          "mt-2 text-xs font-medium",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {title}
      </p>
    </div>
  );
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full max-w-3xl items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <Step
              isActive={currentStep === index}
              isCompleted={index < currentStep}
              title={step.title}
              stepNumber={index}
              onClick={() => onStepClick?.(index)}
              isClickable={index <= currentStep || index < steps.length}
            />
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-px w-full flex-1 bg-muted-foreground mx-3",
                  index < currentStep && "bg-primary"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
