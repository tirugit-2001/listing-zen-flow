
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

        // Mock status data - in a real app, this would come from the backend
        const mockStatus: OnboardingStatus = {
          isComplete: false,
          currentStep: "business_details",
          progress: 25,
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
              completed: false,
              route: "/vendor-onboarding"
            },
            {
              id: "bank_details",
              name: "Bank Details",
              completed: false,
              route: "/vendor-onboarding"
            },
            {
              id: "subscription",
              name: "Select Subscription",
              completed: false,
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
    
    // Only re-run this effect if the user changes or toast function changes
  }, [user, toast]);

  return {
    status,
    isLoading,
    isComplete: status?.isComplete || false,
    currentStep: status?.currentStep || "",
    progress: status?.progress || 0,
    requiredSteps: status?.requiredSteps || []
  };
};
