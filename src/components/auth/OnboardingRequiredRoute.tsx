
import { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface OnboardingRequiredRouteProps {
  children: ReactNode;
}

export default function OnboardingRequiredRoute({ children }: OnboardingRequiredRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { toast } = useToast();
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);
  
  // Check if onboarding is complete (in a real app, this would fetch from API)
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // Mock checking onboarding status - replace with real API call
      const checkOnboardingStatus = () => {
        // This is a placeholder - in a real app, you'd check the user's onboarding status from backend
        const mockIsComplete = false; // Set to false for testing - change to check actual status
        setOnboardingComplete(mockIsComplete);
        
        if (!mockIsComplete) {
          toast({
            title: "Onboarding Required",
            description: "Please complete your onboarding process before accessing this feature.",
            variant: "destructive",
          });
        }
      };
      
      checkOnboardingStatus();
    }
  }, [isAuthenticated, isLoading, toast]);

  // Wait for loading to complete
  if (isLoading || onboardingComplete === null) {
    return <div className="container py-8 flex items-center justify-center">Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Redirect to onboarding if not complete
  if (!onboardingComplete) {
    return <Navigate to="/vendor-onboarding" />;
  }

  // Render children if authenticated and onboarding complete
  return <>{children}</>;
}
