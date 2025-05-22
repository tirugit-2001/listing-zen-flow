
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Package, 
  PlusCircle, 
  Image, 
  Tag, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  FileCheck,
  CreditCard,
  Settings,
  TrendingUp
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import OnboardingChecklist from "@/components/onboarding/OnboardingChecklist";

export default function Index() {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [onboardingProgress, setOnboardingProgress] = useState(30);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  // Mock data for onboarding status
  const onboardingSteps = [
    { id: "vendor_verification", title: "Complete Verification", completed: true, route: "/vendor-onboarding" },
    { id: "kyc_documents", title: "Submit KYC Documents", completed: true, route: "/vendor-onboarding" },
    { id: "subscription_plan", title: "Select Subscription Plan", completed: false, route: "/subscriptions" },
    { id: "business_profile", title: "Setup Business Profile", completed: false, route: "/account-settings" },
    { id: "payment_setup", title: "Setup Payment Methods", completed: false, route: "/subscriptions/payment-methods" }
  ];

  // Check if onboarding is complete
  useEffect(() => {
    // In a real app, this would fetch from API
    const isComplete = onboardingSteps.every(step => step.completed);
    setOnboardingComplete(isComplete);
    
    // Calculate progress percentage
    const completedSteps = onboardingSteps.filter(step => step.completed).length;
    setOnboardingProgress(Math.floor((completedSteps / onboardingSteps.length) * 100));
  }, []);

  const handleRestrictedAccess = () => {
    toast({
      title: "Action Required",
      description: "Please complete the onboarding process before accessing this feature.",
      variant: "destructive"
    });
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="bg-brand-yellow p-4 rounded-full">
            <Package className="h-12 w-12 text-brand-dark" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">BaseCampMart</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            The world's most efficient AI-enabled product listing system
          </p>
          
          {isAuthenticated && !onboardingComplete && (
            <div className="w-full max-w-md mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Onboarding Progress</span>
                <span>{onboardingProgress}%</span>
              </div>
              <Progress value={onboardingProgress} className="h-2" />
            </div>
          )}
        </div>

        {/* Onboarding Required Section - Show when logged in but onboarding incomplete */}
        {isAuthenticated && !onboardingComplete && (
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <CardTitle>Complete Your Onboarding</CardTitle>
              </div>
              <CardDescription>
                Complete these required steps before you can start listing products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OnboardingChecklist steps={onboardingSteps} />
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/vendor-onboarding">Continue Onboarding</Link>
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Main Action Cards - Conditionally show based on onboarding status */}
        {(!isAuthenticated || onboardingComplete) ? (
          <div className="flex gap-4 justify-center mb-8">
            <Button asChild size="lg">
              <Link to={onboardingComplete ? "/add-product" : "/vendor-onboarding"}>
                <PlusCircle className="mr-2 h-5 w-5" />
                {isAuthenticated ? "Add New Product" : "Get Started"}
              </Link>
            </Button>
            {isAuthenticated && (
              <Button asChild variant="outline" size="lg">
                <Link to="/products">
                  View Products
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="flex gap-4 justify-center mb-8">
            <Button size="lg" onClick={handleRestrictedAccess}>
              <PlusCircle className="mr-2 h-5 w-5" />
              Add New Product
            </Button>
            <Button variant="outline" size="lg" onClick={handleRestrictedAccess}>
              View Products
            </Button>
          </div>
        )}

        {/* Feature Cards - Show different cards based on onboarding status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {isAuthenticated && !onboardingComplete ? (
            <>
              <Card className="hover-scale">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <ShieldCheck className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Vendor Verification</h3>
                  <p className="text-muted-foreground">
                    Complete your KYC and business verification to start selling on BaseCampMart.
                  </p>
                  <Button asChild variant="outline" className="mt-2">
                    <Link to="/vendor-onboarding">Complete Verification</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="bg-purple-100 p-4 rounded-full">
                    <CreditCard className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold">Subscription Plans</h3>
                  <p className="text-muted-foreground">
                    Choose a subscription plan that best fits your business needs.
                  </p>
                  <Button asChild variant="outline" className="mt-2">
                    <Link to="/subscriptions">Select Plan</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="bg-green-100 p-4 rounded-full">
                    <FileCheck className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">Business Profile</h3>
                  <p className="text-muted-foreground">
                    Setup your business profile and preferences for better visibility.
                  </p>
                  <Button asChild variant="outline" className="mt-2">
                    <Link to="/account-settings">Setup Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="hover-scale">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="bg-brand-yellow/10 p-4 rounded-full">
                    <PlusCircle className="h-8 w-8 text-brand-yellow" />
                  </div>
                  <h3 className="text-xl font-bold">Product Management</h3>
                  <p className="text-muted-foreground">
                    {isAuthenticated ? 
                      "Create and manage product listings with AI assistance." : 
                      "Create a new product listing in under 4 minutes with AI assistance."}
                  </p>
                  {isAuthenticated && onboardingComplete ? (
                    <Button asChild variant="outline" className="mt-2">
                      <Link to="/add-product">Add Product</Link>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={isAuthenticated ? handleRestrictedAccess : undefined}
                      asChild={!isAuthenticated}
                    >
                      {!isAuthenticated ? (
                        <Link to="/login">Sign In to Start</Link>
                      ) : (
                        "Complete Onboarding First"
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="bg-brand-yellow/10 p-4 rounded-full">
                    <Image className="h-8 w-8 text-brand-yellow" />
                  </div>
                  <h3 className="text-xl font-bold">Branding Canvas</h3>
                  <p className="text-muted-foreground">
                    Add branding zones and preview branding methods on your products.
                  </p>
                  {isAuthenticated && onboardingComplete ? (
                    <Button asChild variant="outline" className="mt-2">
                      <Link to="/branding-canvas">Open Canvas</Link>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={isAuthenticated ? handleRestrictedAccess : undefined}
                      asChild={!isAuthenticated}
                    >
                      {!isAuthenticated ? (
                        <Link to="/login">Sign In to Access</Link>
                      ) : (
                        "Complete Onboarding First"
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card className="hover-scale">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="bg-brand-yellow/10 p-4 rounded-full">
                    <Tag className="h-8 w-8 text-brand-yellow" />
                  </div>
                  <h3 className="text-xl font-bold">Product Catalog</h3>
                  <p className="text-muted-foreground">
                    View, edit, and manage your product catalog with bulk actions.
                  </p>
                  {isAuthenticated && onboardingComplete ? (
                    <Button asChild variant="outline" className="mt-2">
                      <Link to="/products">View Products</Link>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={isAuthenticated ? handleRestrictedAccess : undefined}
                      asChild={!isAuthenticated}
                    >
                      {!isAuthenticated ? (
                        <Link to="/login">Sign In to View</Link>
                      ) : (
                        "Complete Onboarding First"
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
        
        {/* Platform Benefits Section */}
        <div className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-lg p-6 md:p-8 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              60-70% Effort Reduction with AI
            </h2>
            <p className="text-lg mb-6">
              BaseCampMart uses AI to automate product listing, reducing vendor effort by 60-70%.
              Add images, and let AI suggest product details, features, and branding zones.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-brand-dark">
                  &lt; 4 min
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete product listing
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-brand-dark">
                  &lt; 2 min
                </div>
                <p className="text-sm text-muted-foreground">
                  Branding canvas workflow
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-brand-dark">
                  100%
                </div>
                <p className="text-sm text-muted-foreground">
                  Zero design dependency
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services and Subscriptions Section */}
        {isAuthenticated && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Available Services</CardTitle>
              <CardDescription>
                Subscribe to these services to enhance your product listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Product Photography</CardTitle>
                      <Badge>Premium</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Professional product photography services with AI-enhanced editing
                    </p>
                    <ul className="space-y-1">
                      <li className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span>High-resolution images</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span>Multiple angles</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/subscriptions">Subscribe</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Branding Services</CardTitle>
                      <Badge variant="outline">Basic Included</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Logo placement, branding zones, and digital mockups
                    </p>
                    <ul className="space-y-1">
                      <li className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span>Logo placement</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span>Digital mockups</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/subscriptions">Upgrade</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Product Promotion</CardTitle>
                      <Badge variant="secondary">Add-on</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Promote your products on BaseCampMart platform
                    </p>
                    <ul className="space-y-1">
                      <li className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span>Featured listings</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span>Sponsored products</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/marketing">Learn More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Getting Started Resources */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Getting Started Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vendor Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn how to get the most out of BaseCampMart's platform with our comprehensive vendor guide.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0">
                  Read the Guide →
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Watch step-by-step video tutorials on product listing, branding, and more.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0">
                  Watch Tutorials →
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
