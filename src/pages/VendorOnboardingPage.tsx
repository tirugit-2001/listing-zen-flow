
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Stepper from "@/components/onboarding/Stepper";
import KYCForm from "@/components/onboarding/KYCForm";
import BusinessDetailsForm from "@/components/onboarding/BusinessDetailsForm";
import BankDetailsForm from "@/components/onboarding/BankDetailsForm";
import DocumentVerificationForm from "@/components/onboarding/DocumentVerificationForm";
import OnboardingProgress from "@/components/onboarding/OnboardingProgress";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Define the steps for the onboarding process
const steps = [
  { id: "business", label: "Business Details" },
  { id: "kyc", label: "KYC Information" },
  { id: "documents", label: "Document Verification" },
  { id: "bank", label: "Bank Details" }
];

// Mock data for progress tracking
const onboardingSteps = [
  {
    id: "business",
    name: "Business Details",
    status: "completed" as const,
    description: "Basic information about your business",
    completedAt: new Date(Date.now() - 86400000 * 3) // 3 days ago
  },
  {
    id: "kyc",
    name: "KYC Information",
    status: "in-progress" as const,
    description: "GSTIN and other tax-related information"
  },
  {
    id: "documents",
    name: "Document Verification",
    status: "pending" as const,
    description: "Upload required business documents"
  },
  {
    id: "bank",
    name: "Bank Details",
    status: "pending" as const,
    description: "Payment and bank account information"
  }
];

export default function VendorOnboardingPage() {
  const [activeStep, setActiveStep] = useState(1); // KYC step (0-indexed internally, 1 for display)
  const [activeTab, setActiveTab] = useState("onboarding");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Mock data for the forms
  const [businessData, setBusinessData] = useState({});
  const [kycData, setKycData] = useState({
    gstin: "",
    pan: "",
    gstRegistrationType: "",
    legalName: "",
    tradeName: ""
  });
  const [bankData, setBankData] = useState({});
  
  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
      toast({
        title: "Progress Saved",
        description: `${steps[activeStep - 1].label} information saved successfully.`
      });
    }
  };
  
  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };
  
  const handleKYCUpdate = (data: any) => {
    setKycData(data);
    
    // Simulate API call and AI verification
    setTimeout(() => {
      toast({
        title: "KYC Information Updated",
        description: "Your KYC details have been saved and are being verified."
      });
    }, 500);
  };
  
  // Calculate overall progress
  const completedSteps = onboardingSteps.filter(step => step.status === "completed").length;
  const overallProgress = Math.round((completedSteps / onboardingSteps.length) * 100);
  
  return (
    <Layout>
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Vendor Onboarding</h1>
          <p className="text-muted-foreground">
            Complete your vendor profile to start selling on BaseCampMart
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
            <TabsTrigger value="status">Status & History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="onboarding">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Vendor Registration</CardTitle>
                    <CardDescription>
                      Please complete all required information to set up your vendor account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!isMobile && (
                      <div className="mb-8">
                        <Stepper 
                          steps={steps} 
                          activeStep={activeStep} 
                          onStepClick={(step) => setActiveStep(step)}
                        />
                      </div>
                    )}
                    
                    {activeStep === 1 && (
                      <BusinessDetailsForm 
                        data={businessData} 
                        onUpdate={setBusinessData} 
                        onNext={handleNext}
                      />
                    )}
                    
                    {activeStep === 2 && (
                      <KYCForm 
                        data={kycData} 
                        onUpdate={handleKYCUpdate} 
                      />
                    )}
                    
                    {activeStep === 3 && (
                      <DocumentVerificationForm 
                        onNext={handleNext} 
                        onBack={handleBack}
                      />
                    )}
                    
                    {activeStep === 4 && (
                      <BankDetailsForm 
                        data={bankData} 
                        onUpdate={setBankData} 
                        onBack={handleBack}
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Registration Progress</CardTitle>
                    <CardDescription>
                      Track your onboarding status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OnboardingProgress
                      steps={onboardingSteps}
                      currentStepId={steps[activeStep - 1].id}
                      overallProgress={overallProgress}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="status">
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
                <CardDescription>
                  Track the status of your verification process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4 bg-amber-50">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-amber-100 p-2">
                        <Clock className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Verification in Progress</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your vendor documents are being verified by our team. This process typically takes 1-2 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Verification Timeline</h3>
                    
                    <div className="relative">
                      <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-muted" />
                      <div className="space-y-6">
                        <div className="relative pl-8">
                          <div className="absolute left-0 top-1 rounded-full bg-green-600 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium">Business Details Submitted</p>
                            <p className="text-xs text-muted-foreground">May 18, 2025 at 10:30 AM</p>
                          </div>
                        </div>
                        
                        <div className="relative pl-8">
                          <div className="absolute left-0 top-1 rounded-full bg-green-600 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium">KYC Information Submitted</p>
                            <p className="text-xs text-muted-foreground">May 19, 2025 at 3:45 PM</p>
                          </div>
                        </div>
                        
                        <div className="relative pl-8">
                          <div className="absolute left-0 top-1 rounded-full bg-amber-500 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium">Document Verification In Progress</p>
                            <p className="text-xs text-muted-foreground">Started May 20, 2025 at 9:15 AM</p>
                          </div>
                        </div>
                        
                        <div className="relative pl-8">
                          <div className="absolute left-0 top-1 rounded-full bg-muted w-4 h-4" />
                          <div>
                            <p className="text-sm text-muted-foreground font-medium">Banking Details Pending</p>
                            <p className="text-xs text-muted-foreground">Not started yet</p>
                          </div>
                        </div>
                        
                        <div className="relative pl-8">
                          <div className="absolute left-0 top-1 rounded-full bg-muted w-4 h-4" />
                          <div>
                            <p className="text-sm text-muted-foreground font-medium">Final Approval</p>
                            <p className="text-xs text-muted-foreground">Pending verification completion</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
