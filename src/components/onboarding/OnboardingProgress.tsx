
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";

type StepStatus = "completed" | "in-progress" | "pending" | "rejected";

interface OnboardingStep {
  id: string;
  name: string;
  status: StepStatus;
  description: string;
  completedAt?: Date;
  errorMessage?: string;
}

interface OnboardingProgressProps {
  steps: OnboardingStep[];
  currentStepId: string;
  overallProgress: number;
}

export default function OnboardingProgress({ 
  steps, 
  currentStepId, 
  overallProgress 
}: OnboardingProgressProps) {
  const getStatusIcon = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };
  
  const getStatusBadge = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Completed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            In Progress
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline">
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            Rejected
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Onboarding Progress</h3>
          <span className="text-sm font-medium">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </div>
      
      <div className="space-y-4">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`p-4 border rounded-lg ${currentStepId === step.id ? 'border-primary/50 bg-primary/5' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(step.status)}
                <span className={`font-medium ${currentStepId === step.id ? 'text-primary' : ''}`}>
                  {step.name}
                </span>
              </div>
              {getStatusBadge(step.status)}
            </div>
            
            <p className="mt-1 text-sm text-muted-foreground">
              {step.description}
            </p>
            
            {step.status === "completed" && step.completedAt && (
              <p className="mt-2 text-xs text-muted-foreground">
                Completed on {step.completedAt.toLocaleDateString()} at {step.completedAt.toLocaleTimeString()}
              </p>
            )}
            
            {step.status === "rejected" && step.errorMessage && (
              <div className="mt-2 flex items-start gap-2 p-2 bg-red-50 border border-red-100 rounded">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                <p className="text-xs text-red-700">
                  {step.errorMessage}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
