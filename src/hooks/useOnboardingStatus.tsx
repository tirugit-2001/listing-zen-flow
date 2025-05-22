
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export type OnboardingStatus = {
  isComplete: boolean;
  currentStep: string;
  progress: number;
  requiredSteps: {
    id: string;
    name: string;
    completed: boolean;
    route: string;
  }[];
};

export const useOnboardingStatus = () => {
  const [status, setStatus] = useState<OnboardingStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Skip the effect if there's no user (prevents unnecessary API calls)
    if (!user) {
      setStatus(null);
      setIsLoading(false);
      return;
    }

    const fetchOnboardingStatus = async () => {
      try {
        setIsLoading(true);
        
        // In a real implementation, this would be an API call
        // For now, we'll simulate it with a timeout
        await new Promise(resolve => setTimeout(resolve, 500));

        // For testing purposes, set onboarding as complete
        const mockStatus: OnboardingStatus = {
          isComplete: true, // Changed to true to allow access to all pages
          currentStep: "completed",
          progress: 100, // Set to 100% complete
          requiredSteps: [
            {
              id: "business_details",
              name: "Business Information",
              completed: true,
              route: "/vendor-onboarding"
            },
            {
              id: "kyc_verification",
              name: "KYC Verification",
              completed: true,
              route: "/vendor-onboarding"
            },
            {
              id: "bank_details",
              name: "Bank Details",
              completed: true,
              route: "/vendor-onboarding"
            },
            {
              id: "subscription",
              name: "Select Subscription",
              completed: true,
              route: "/subscriptions"
            }
          ]
        };

        setStatus(mockStatus);
      } catch (error) {
        toast({
          title: "Failed to fetch onboarding status",
          description: "Please try again or contact support",
          variant: "destructive"
        });
        console.error("Error fetching onboarding status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOnboardingStatus();
    
  }, [user, toast]);

  return {
    status,
    isLoading,
    isComplete: status?.isComplete || true, // Default to true for testing
    currentStep: status?.currentStep || "completed",
    progress: status?.progress || 100,
    requiredSteps: status?.requiredSteps || []
  };
};
