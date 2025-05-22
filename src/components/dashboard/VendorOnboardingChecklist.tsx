
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { CheckCircle2, CircleDashed, ArrowRight } from "lucide-react";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";

export default function VendorOnboardingChecklist() {
  const { isLoading, progress, requiredSteps } = useOnboardingStatus();
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Complete Your Onboarding</CardTitle>
          <CardDescription>Loading your progress...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const allComplete = requiredSteps.every(step => step.completed);
  
  if (allComplete) {
    return null; // Don't show the checklist if all steps are complete
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Complete Your Onboarding</CardTitle>
        <CardDescription>
          Complete these steps to access all seller features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="space-y-3">
          {requiredSteps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center justify-between p-3 rounded-md border ${
                step.completed ? "bg-green-50 border-green-100" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                {step.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <CircleDashed className="h-5 w-5 text-muted-foreground" />
                )}
                <span className="font-medium">{step.name}</span>
              </div>
              
              <Button
                variant={step.completed ? "outline" : "default"}
                size="sm"
                asChild
              >
                <Link to={step.route}>
                  {step.completed ? "Review" : "Complete"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Need help? Contact our support team for assistance with your onboarding process.
        </p>
      </CardFooter>
    </Card>
  );
}
