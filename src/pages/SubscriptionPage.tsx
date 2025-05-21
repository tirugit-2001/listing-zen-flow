
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePayment, SUBSCRIPTION_PLANS } from "@/contexts/PaymentContext";
import { useAuth } from "@/contexts/AuthContext";
import PlanCard from "@/components/subscription/PlanCard";
import PaymentMethodCard from "@/components/subscription/PaymentMethodCard";
import AddPaymentMethodForm from "@/components/subscription/AddPaymentMethodForm";
import SubscriptionBreadcrumb from "@/components/subscription/SubscriptionBreadcrumb";
import { AlertCircle, Calendar, CreditCard, Receipt, Package } from "lucide-react";
import { format } from "date-fns";

export default function SubscriptionPage() {
  const [tab, setTab] = useState<string>("plans");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isRemovingPaymentMethod, setIsRemovingPaymentMethod] = useState(false);
  const [addPaymentDialogOpen, setAddPaymentDialogOpen] = useState(false);
  
  const { currentPlan, isSubscribed, subscriptionEndDate, subscribeToPlan, cancelSubscription, savedPaymentMethods, removePaymentMethod } = usePayment();
  const { isAuthenticated } = useAuth();
  const isMobile = useIsMobile();

  // Mock billing history data
  const billingHistory = [
    {
      id: "inv-001",
      date: new Date("2025-05-01"),
      amount: 999,
      description: "Advanced plan - Monthly",
      status: "paid"
    },
    {
      id: "inv-002",
      date: new Date("2025-04-01"),
      amount: 999,
      description: "Advanced plan - Monthly",
      status: "paid"
    },
    {
      id: "inv-003",
      date: new Date("2025-03-01"),
      amount: 499,
      description: "Basic plan - Monthly",
      status: "paid"
    }
  ];

  const handleSelectPlan = async (planId: string) => {
    setIsSubscribing(true);
    try {
      await subscribeToPlan(planId);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleCancelSubscription = async () => {
    setIsCancelling(true);
    try {
      await cancelSubscription();
    } finally {
      setIsCancelling(false);
    }
  };

  const handleRemovePaymentMethod = async (id: string) => {
    setIsRemovingPaymentMethod(true);
    try {
      await removePaymentMethod(id);
    } finally {
      setIsRemovingPaymentMethod(false);
    }
  };

  const handleMakeDefaultPaymentMethod = async (id: string) => {
    // In a real app, this would update the default payment method
    console.log("Make default payment method:", id);
  };

  const handleAddPaymentMethodSuccess = () => {
    setAddPaymentDialogOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container py-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-center">Sign In Required</CardTitle>
                <CardDescription className="text-center">
                  Please sign in to manage your subscriptions and payment methods.
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Button asChild>
                  <a href="/login">Sign In</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-6">
        <SubscriptionBreadcrumb />
        
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Subscriptions & Billing</h1>
          <p className="text-muted-foreground">
            Manage your subscription plan, payment methods, and view billing history
          </p>
        </div>

        {/* Current Subscription Status */}
        {isSubscribed && currentPlan && (
          <Card className="mb-6 border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="default">Active</Badge>
                  <CardTitle>Your {currentPlan.name} Plan</CardTitle>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                >
                  {isCancelling ? "Processing..." : "Cancel Subscription"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Billing</p>
                    <p className="font-medium">₹{currentPlan.price}/{currentPlan.interval}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 text-amber-600 p-2 rounded-full">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Billing Date</p>
                    <p className="font-medium">{subscriptionEndDate ? format(subscriptionEndDate, 'dd MMM yyyy') : 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 text-green-600 p-2 rounded-full">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Features</p>
                    <p className="font-medium">{currentPlan.features.length} services included</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg mt-4">
                <div className="flex gap-2 items-start">
                  <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Your subscription will automatically renew on {subscriptionEndDate ? format(subscriptionEndDate, 'dd MMM yyyy') : 'N/A'}. 
                    You can cancel anytime before the renewal date.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="billing-history">Billing History</TabsTrigger>
          </TabsList>
          
          {/* Subscription Plans Tab */}
          <TabsContent value="plans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <PlanCard 
                  key={plan.id}
                  plan={plan}
                  isCurrentPlan={currentPlan?.id === plan.id}
                  onSelectPlan={handleSelectPlan}
                  isLoading={isSubscribing}
                />
              ))}
            </div>
            
            <div className="mt-8 bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">About Subscription Plans</h3>
              <p className="text-sm text-muted-foreground">
                All plans include access to BaseCampMart's vendor dashboard, inventory management, and basic analytics.
                Higher-tier plans include more product photography credits, promotion options, and advanced features.
                For custom enterprise solutions, please contact our sales team.
              </p>
            </div>
          </TabsContent>
          
          {/* Payment Methods Tab */}
          <TabsContent value="payment-methods">
            <div className="flex justify-between items-center my-6">
              <h2 className="text-lg font-medium">Your Payment Methods</h2>
              <Dialog open={addPaymentDialogOpen} onOpenChange={setAddPaymentDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add Payment Method</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                    <DialogDescription>
                      Add a new payment method to your account.
                    </DialogDescription>
                  </DialogHeader>
                  <AddPaymentMethodForm onSuccess={handleAddPaymentMethodSuccess} />
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedPaymentMethods.length > 0 ? (
                savedPaymentMethods.map((paymentMethod) => (
                  <PaymentMethodCard
                    key={paymentMethod.id}
                    paymentMethod={paymentMethod}
                    onRemove={handleRemovePaymentMethod}
                    onMakeDefault={handleMakeDefaultPaymentMethod}
                    isRemoving={isRemovingPaymentMethod}
                  />
                ))
              ) : (
                <Card className="col-span-full">
                  <CardHeader>
                    <CardTitle>No Payment Methods</CardTitle>
                    <CardDescription>
                      You haven't added any payment methods yet.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Add a payment method to subscribe to a plan or pay for services.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          {/* Billing History Tab */}
          <TabsContent value="billing-history">
            <div className="mt-6">
              <h2 className="text-lg font-medium mb-4">Transaction History</h2>
              
              <div className="space-y-4">
                {billingHistory.map((invoice) => (
                  <Card key={invoice.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{invoice.description}</CardTitle>
                        <Badge variant={invoice.status === "paid" ? "outline" : "default"}>
                          {invoice.status === "paid" ? "Paid" : "Pending"}
                        </Badge>
                      </div>
                      <CardDescription>{format(invoice.date, 'dd MMM yyyy')}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Receipt className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Invoice #{invoice.id}</span>
                        </div>
                        <span className="font-medium">₹{invoice.amount}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Download Invoice
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
