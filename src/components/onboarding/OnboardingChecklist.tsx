
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, ArrowRight, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export interface OnboardingStep {
  id: string;
  title: string;
  completed: boolean;
  route: string;
  description?: string;
  error?: boolean;
  errorMessage?: string;
}

interface OnboardingChecklistProps {
  steps: OnboardingStep[];
  title?: string;
  description?: string;
  showProgress?: boolean;
  variant?: "default" | "compact" | "card";
}

export default function OnboardingChecklist({ 
  steps, 
  title = "Complete Your Setup", 
  description = "Follow these steps to complete your onboarding",
  showProgress = true,
  variant = "default" 
}: OnboardingChecklistProps) {
  // Override steps to show all as completed for testing
  const completedSteps = steps.length;
  const totalSteps = steps.length;
  const progress = 100; // 100% complete for testing

  // Map all steps to completed for testing
  const modifiedSteps = steps.map(step => ({
    ...step,
    completed: true
  }));

  const checklistContent = (
    <div className="space-y-4">
      {showProgress && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {modifiedSteps.map((step, index) => (
        <div
          key={step.id}
          className={`flex items-center justify-between p-3 rounded-md border ${
            step.error ? "bg-red-50 border-red-100" : 
            "bg-green-50 border-green-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {step.error ? (
                <AlertCircle className="h-6 w-6 text-red-500" />
              ) : (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              )}
            </div>
            <div>
              <h4 className="font-medium">{`${index + 1}. ${step.title}`}</h4>
              {step.description && (
                <p className="text-xs text-muted-foreground">{step.description}</p>
              )}
              {step.error && step.errorMessage && (
                <p className="text-xs text-red-500">{step.errorMessage}</p>
              )}
              {!step.error && (
                <p className="text-xs text-green-500">
                  Completed
                </p>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <Link to={step.route}>
              Review <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );

  if (variant === "card") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {checklistContent}
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Complete all steps to unlock all platform features
          </p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {variant === "default" && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      )}
      {checklistContent}
    </div>
  );
}
