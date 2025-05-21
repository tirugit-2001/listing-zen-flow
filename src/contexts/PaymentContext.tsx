
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface PaymentContextType {
  // Subscription statuses
  currentPlan: SubscriptionPlan | null;
  isSubscribed: boolean;
  subscriptionEndDate: Date | null;
  
  // Payment methods
  savedPaymentMethods: PaymentMethod[];
  
  // Actions
  subscribeToPlan: (planId: string) => Promise<boolean>;
  cancelSubscription: () => Promise<boolean>;
  addPaymentMethod: (paymentMethod: PaymentMethod) => Promise<boolean>;
  removePaymentMethod: (paymentMethodId: string) => Promise<boolean>;
  payForService: (serviceId: string, amount: number) => Promise<boolean>;
  payForCampaign: (campaignId: string, budget: number) => Promise<boolean>;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "monthly" | "annual";
  features: string[];
  popular?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "wallet" | "netbanking";
  label: string;
  last4?: string;
  expiryDate?: string;
  upiId?: string;
  walletName?: string;
  isDefault: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  budget: number;
  spent: number;
  status: "active" | "paused" | "completed";
  startDate: Date;
  endDate: Date;
}

// Create the context
const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Mock subscription plans for demo purposes
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Essential tools for new vendors",
    price: 499,
    interval: "monthly",
    features: [
      "10 product photos per month",
      "Basic branding template",
      "2 promotions per month",
      "Standard analytics"
    ]
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Grow your business with advanced tools",
    price: 999,
    interval: "monthly",
    popular: true,
    features: [
      "30 product photos per month",
      "Advanced branding templates",
      "5 promotions per month",
      "Priority support",
      "Advanced analytics"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    description: "Enterprise-grade tools for scaling businesses",
    price: 1999,
    interval: "monthly",
    features: [
      "Unlimited product photos",
      "Custom branding solutions",
      "Unlimited promotions",
      "Dedicated account manager",
      "AI-powered campaign recommendations",
      "Premium analytics with forecasting"
    ]
  }
];

// Provider component
export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<Date | null>(null);
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<PaymentMethod[]>([
    // Mock data for demo
    {
      id: "pm-1",
      type: "card",
      label: "Visa ending in 4242",
      last4: "4242",
      expiryDate: "12/25",
      isDefault: true
    },
    {
      id: "pm-2",
      type: "upi",
      label: "UPI",
      upiId: "vendor@okaxis",
      isDefault: false
    }
  ]);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // In a real app, this would fetch subscription data from backend
    // For demo purposes, we're using mock data
    if (user) {
      // Mock subscription data - in production this would come from an API
      const mockSubscription = {
        planId: "advanced",
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      };
      
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === mockSubscription.planId) || null;
      setCurrentPlan(plan);
      setIsSubscribed(!!plan);
      setSubscriptionEndDate(mockSubscription.endDate);
    } else {
      setCurrentPlan(null);
      setIsSubscribed(false);
      setSubscriptionEndDate(null);
    }
  }, [user]);

  const subscribeToPlan = async (planId: string): Promise<boolean> => {
    try {
      // This would normally be an API call to a payment processor
      // For demo purposes, we're simulating a successful subscription
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
      if (!plan) {
        throw new Error("Plan not found");
      }
      
      setCurrentPlan(plan);
      setIsSubscribed(true);
      setSubscriptionEndDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); // 30 days from now
      
      toast({
        title: "Subscription successful!",
        description: `You are now subscribed to the ${plan.name} plan.`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "An error occurred while processing your subscription.",
        variant: "destructive",
      });
      return false;
    }
  };

  const cancelSubscription = async (): Promise<boolean> => {
    try {
      // This would normally be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubscribed(false);
      
      toast({
        title: "Subscription cancelled",
        description: `Your ${currentPlan?.name} subscription has been cancelled.`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error cancelling subscription",
        description: error instanceof Error ? error.message : "An error occurred while cancelling your subscription.",
        variant: "destructive",
      });
      return false;
    }
  };

  const addPaymentMethod = async (paymentMethod: PaymentMethod): Promise<boolean> => {
    try {
      // This would normally be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSavedPaymentMethods(prev => [...prev, paymentMethod]);
      
      toast({
        title: "Payment method added",
        description: `Your payment method has been added successfully.`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error adding payment method",
        description: error instanceof Error ? error.message : "An error occurred while adding your payment method.",
        variant: "destructive",
      });
      return false;
    }
  };

  const removePaymentMethod = async (paymentMethodId: string): Promise<boolean> => {
    try {
      // This would normally be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSavedPaymentMethods(prev => prev.filter(pm => pm.id !== paymentMethodId));
      
      toast({
        title: "Payment method removed",
        description: `Your payment method has been removed successfully.`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error removing payment method",
        description: error instanceof Error ? error.message : "An error occurred while removing your payment method.",
        variant: "destructive",
      });
      return false;
    }
  };

  const payForService = async (serviceId: string, amount: number): Promise<boolean> => {
    try {
      // This would normally be an API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      toast({
        title: "Payment successful",
        description: `You have successfully paid ₹${amount} for the service.`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : "An error occurred while processing your payment.",
        variant: "destructive",
      });
      return false;
    }
  };

  const payForCampaign = async (campaignId: string, budget: number): Promise<boolean> => {
    try {
      // This would normally be an API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      toast({
        title: "Campaign budget set",
        description: `You have successfully allocated ₹${budget} for your campaign.`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : "An error occurred while processing your campaign budget.",
        variant: "destructive",
      });
      return false;
    }
  };

  const value = {
    currentPlan,
    isSubscribed,
    subscriptionEndDate,
    savedPaymentMethods,
    subscribeToPlan,
    cancelSubscription,
    addPaymentMethod,
    removePaymentMethod,
    payForService,
    payForCampaign,
  };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
};

// Custom hook to use the payment context
export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
