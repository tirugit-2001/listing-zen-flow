
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

interface OnboardingStep {
  id: string;
  title: string;
  completed: boolean;
  route: string;
}

interface OnboardingChecklistProps {
  steps: OnboardingStep[];
}

export default function OnboardingChecklist({ steps }: OnboardingChecklistProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`flex items-center justify-between p-3 rounded-md border ${
            step.completed ? "bg-green-50 border-green-100" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {step.completed ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <h4 className="font-medium">{`${index + 1}. ${step.title}`}</h4>
              {!step.completed && (
                <p className="text-sm text-muted-foreground">
                  {index === 0 || steps[index - 1].completed
                    ? "Ready to complete"
                    : "Complete previous steps first"}
                </p>
              )}
            </div>
          </div>
          <Button
            variant={step.completed ? "outline" : "default"}
            size="sm"
            asChild={step.completed || (index > 0 && !steps[index - 1].completed)}
            disabled={index > 0 && !steps[index - 1].completed && !step.completed}
          >
            {step.completed ? (
              <Link to={step.route}>
                Review <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            ) : index === 0 || steps[index - 1].completed ? (
              <Link to={step.route}>
                Complete <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            ) : (
              "Locked"
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}
