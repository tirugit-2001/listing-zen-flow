
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { Loader } from "lucide-react";

interface OnboardingRequiredRouteProps {
  children: ReactNode;
}

export default function OnboardingRequiredRoute({ children }: OnboardingRequiredRouteProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { isLoading: statusLoading, isComplete, currentStep } = useOnboardingStatus();
  
  // Show loading state while checking authentication or onboarding status
  if (authLoading || statusLoading) {
    return (
      <div className="container py-8 flex flex-col items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Verifying account status...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Redirect to onboarding if not complete
  if (!isComplete) {
    // Determine the right route based on current step
    let targetRoute = "/vendor-onboarding";
    
    if (currentStep === "subscription") {
      targetRoute = "/subscriptions";
    }
    
    return <Navigate to={targetRoute} />;
  }

  // Render children if authenticated and onboarding complete
  return <>{children}</>;
}
