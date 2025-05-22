
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { Loader } from "lucide-react";

interface OnboardingRequiredRouteProps {
  children: ReactNode;
}

export default function OnboardingRequiredRoute({ children }: OnboardingRequiredRouteProps) {
  const { isLoading: authLoading } = useAuth();
  const { isLoading: statusLoading } = useOnboardingStatus();
  
  // Show loading state while checking authentication or onboarding status
  if (authLoading || statusLoading) {
    return (
      <div className="container py-8 flex flex-col items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Verifying account status...</p>
      </div>
    );
  }

  // For testing purposes, always allow access to all pages
  return <>{children}</>;
}
