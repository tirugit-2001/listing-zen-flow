
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OnboardingProgress from "@/components/onboarding/OnboardingProgress";
import { Stepper } from "@/components/onboarding/Stepper";
import KYCForm, { KYCData } from "@/components/onboarding/KYCForm";
import BusinessDetailsForm, { BusinessData } from "@/components/onboarding/BusinessDetailsForm";
import DocumentVerificationForm, { DocumentDataType } from "@/components/onboarding/DocumentVerificationForm";
import BankDetailsForm, { BankData } from "@/components/onboarding/BankDetailsForm";
import AdminKYCDashboard, { PendingVerification } from "@/components/onboarding/AdminKYCDashboard";
import { Clock, ArrowLeft, Save, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import OnboardingChecklist, { OnboardingStep } from "@/components/onboarding/OnboardingChecklist";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Define onboarding steps
const steps = [
  { id: "business", title: "Business Info" },
  { id: "kyc", title: "KYC" },
  { id: "documents", title: "Documents" },
  { id: "bank", title: "Bank Details" },
  { id: "review", title: "Review" },
];

// Mock onboarding progress steps
const progressSteps = [
  {
    id: "business_details",
    name: "Business Information",
    status: "completed" as const,
    description: "Company profile and business details",
    completedAt: new Date(2025, 4, 15, 10, 30),
  },
  {
    id: "kyc_verification",
    name: "KYC Verification",
    status: "in-progress" as const,
    description: "Identity and business verification",
  },
  {
    id: "document_verification",
    name: "Document Verification",
    status: "pending" as const,
    description: "Upload and verify business documents",
  },
  {
    id: "bank_details",
    name: "Bank Account Details",
    status: "pending" as const,
    description: "Connect your business bank account",
  },
  {
    id: "review",
    name: "Application Review",
    status: "pending" as const,
    description: "Final review by BaseCampMart team",
  },
];

// Mock business data
const initialBusinessData: BusinessData = {
  businessName: "Mutations Design",
  businessType: "Private Limited",
  registrationNumber: "ABCDE12345",
  yearEstablished: "2020",
  gstNumber: "22AAAAA0000A1Z5",
  address: {
    street: "123 Main St",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    postalCode: "400001",
  },
  contactPerson: {
    name: "Rahul Sharma",
    email: "rahul@mutationsdesign.com",
    phone: "+91 98765 43210",
  }
};

// Mock document data (empty initially)
const initialDocumentData: DocumentDataType = {
  gstCertificate: null,
  panCard: null,
  businessRegistration: null,
  cancelledCheque: null,
  addressProof: null,
  signatureProof: null
};

// Mock bank data
const initialBankData: BankData = {
  accountName: "Mutations Design Pvt Ltd",
  accountNumber: "1234567890",
  ifscCode: "ABCD0001234",
  bankName: "ICICI Bank",
  bankBranch: "Andheri East",
  accountType: "Current"
};

// Mock pending verifications for AdminKYCDashboard
const pendingVerifications: PendingVerification[] = [
  {
    id: "vendor-001",
    businessName: "EcoGoods Trading",
    applicationType: "New Vendor",
    submittedDate: "2025-05-18",
    status: "Pending Review",
    documents: 6
  },
  {
    id: "vendor-002",
    businessName: "Tech Innovations Ltd",
    applicationType: "New Vendor",
    submittedDate: "2025-05-17",
    status: "Documents Missing",
    documents: 4
  },
  {
    id: "vendor-003", 
    businessName: "Artisan Crafts Co",
    applicationType: "New Vendor",
    submittedDate: "2025-05-15",
    status: "Pending Review",
    documents: 6
  }
];

// Mock kyc data
const initialKycData: KYCData = {
  gstin: "",
  pan: "",
  gstRegistrationType: "",
  legalName: "",
  tradeName: ""
};

export default function VendorOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessData, setBusinessData] = useState<BusinessData>(initialBusinessData);
  const [documentData, setDocumentData] = useState<DocumentDataType>(initialDocumentData);
  const [bankData, setBankData] = useState<BankData>(initialBankData);
  const [kycData, setKycData] = useState<KYCData>(initialKycData);
  const [viewMode, setViewMode] = useState<"vendor" | "admin">("vendor");
  const [isSaving, setIsSaving] = useState(false);
  const [overallProgress, setOverallProgress] = useState(20);
  const [currentStepId, setCurrentStepId] = useState("business_details");
  const [activeTab, setActiveTab] = useState("onboarding");
  
  const { toast } = useToast();
  const { user } = useAuth();

  // Calculate completion statuses
  const isBusinessComplete = !!businessData.businessName;
  const isKycComplete = !!kycData.gstin && !!kycData.pan;
  const isDocumentsComplete = !!documentData.gstCertificate && !!documentData.panCard;
  const isBankComplete = !!bankData.accountNumber;
  
  // Define checklist steps
  const checklistSteps: OnboardingStep[] = [
    {
      id: "business",
      title: "Business Information",
      completed: isBusinessComplete,
      route: "/vendor-onboarding",
    },
    {
      id: "kyc",
      title: "KYC Verification",
      completed: isKycComplete,
      route: "/vendor-onboarding",
    },
    {
      id: "documents",
      title: "Document Verification",
      completed: isDocumentsComplete,
      route: "/vendor-onboarding",
    },
    {
      id: "bank",
      title: "Bank Account Details",
      completed: isBankComplete,
      route: "/vendor-onboarding",
    },
    {
      id: "subscription",
      title: "Choose Subscription",
      completed: false,
      route: "/subscriptions",
    }
  ];
  
  // Update progress when steps are completed
  useEffect(() => {
    let completedSteps = 0;
    if (isBusinessComplete) completedSteps++;
    if (isKycComplete) completedSteps++;
    if (isDocumentsComplete) completedSteps++;
    if (isBankComplete) completedSteps++;
    
    setOverallProgress(Math.round((completedSteps / 5) * 100));
    
    // Update currentStepId for progress indicator
    if (!isBusinessComplete) {
      setCurrentStepId("business_details");
    } else if (!isKycComplete) {
      setCurrentStepId("kyc_verification");
    } else if (!isDocumentsComplete) {
      setCurrentStepId("document_verification");
    } else if (!isBankComplete) {
      setCurrentStepId("bank_details");
    } else {
      setCurrentStepId("review");
    }
  }, [isBusinessComplete, isKycComplete, isDocumentsComplete, isBankComplete]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call to save progress
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Progress Saved",
      description: "Your onboarding progress has been saved. You can continue later.",
    });
    
    setIsSaving(false);
  };
  
  const handleSubmit = async () => {
    setIsSaving(true);
    
    // In a real implementation, this would submit the onboarding data to the backend
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Application Submitted",
      description: "Your vendor application has been submitted successfully!",
    });
    
    setIsSaving(false);
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Vendor Onboarding</h1>
            <p className="text-muted-foreground">
              Complete your profile to start selling on BaseCampMart
            </p>
          </div>
          
          <div className="flex items-center">
            <Button 
              variant={viewMode === "vendor" ? "default" : "outline"} 
              onClick={() => setViewMode("vendor")}
              className="mr-2"
            >
              Vendor View
            </Button>
            <Button 
              variant={viewMode === "admin" ? "default" : "outline"} 
              onClick={() => setViewMode("admin")}
            >
              Admin View
            </Button>
          </div>
        </div>
        
        {viewMode === "vendor" ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="onboarding">Onboarding Process</TabsTrigger>
              <TabsTrigger value="checklist">Checklist View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="onboarding">
              <div className="mb-6">
                <Stepper 
                  steps={steps} 
                  currentStep={currentStep} 
                  onStepClick={(step) => setCurrentStep(step)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8">
                  <Card className="mb-6">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex justify-between mb-6">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={handleBack}
                          disabled={currentStep === 0}
                          className="flex items-center"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleSave}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <>
                              <Clock className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Progress
                            </>
                          )}
                        </Button>
                      </div>
                      
                      {currentStep === 0 && (
                        <BusinessDetailsForm 
                          data={businessData}
                          onUpdate={(data) => {
                            setBusinessData(data);
                            handleNext();
                          }}
                        />
                      )}
                      
                      {currentStep === 1 && (
                        <KYCForm 
                          data={kycData}
                          onUpdate={(data) => {
                            setKycData(data);
                            handleNext();
                          }}
                        />
                      )}
                      
                      {currentStep === 2 && (
                        <DocumentVerificationForm 
                          data={documentData}
                          onUpdate={(data) => {
                            setDocumentData(data);
                            handleNext();
                          }}
                        />
                      )}
                      
                      {currentStep === 3 && (
                        <BankDetailsForm 
                          data={bankData}
                          onUpdate={(data) => {
                            setBankData(data);
                            handleNext();
                          }}
                        />
                      )}
                      
                      {currentStep === 4 && (
                        <div>
                          <h2 className="text-xl font-semibold mb-4">Review and Submit</h2>
                          <p className="mb-6 text-muted-foreground">
                            Please review all the information you've provided before submitting your application.
                          </p>
                          
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium mb-2">Business Information</h3>
                              <div className="bg-muted p-4 rounded-md">
                                <pre className="whitespace-pre-wrap text-sm">
                                  {JSON.stringify(businessData, null, 2)}
                                </pre>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium mb-2">KYC Details</h3>
                              <div className="bg-muted p-4 rounded-md">
                                <pre className="whitespace-pre-wrap text-sm">
                                  {JSON.stringify(kycData, null, 2)}
                                </pre>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium mb-2">Bank Details</h3>
                              <div className="bg-muted p-4 rounded-md">
                                <pre className="whitespace-pre-wrap text-sm">
                                  {JSON.stringify(bankData, null, 2)}
                                </pre>
                              </div>
                            </div>
                            
                            <Alert className="bg-blue-50 border-blue-100 text-blue-800">
                              <CheckCircle2 className="h-4 w-4 text-blue-500" />
                              <AlertTitle>Ready to Submit</AlertTitle>
                              <AlertDescription>
                                After submitting your application, our team will review your information.
                                This process typically takes 1-2 business days.
                              </AlertDescription>
                            </Alert>
                            
                            <div className="pt-4 flex justify-between">
                              <Button type="button" variant="outline" onClick={handleBack}>
                                Back
                              </Button>
                              <Button 
                                type="button" 
                                onClick={handleSubmit} 
                                disabled={isSaving}
                              >
                                {isSaving ? (
                                  <>
                                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                  </>
                                ) : (
                                  "Submit Application"
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-4">
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-4">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <h3 className="text-sm font-medium">Estimated Completion Time</h3>
                        </div>
                        <p className="text-2xl font-bold">15-20 minutes</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          You can save and continue later at any point
                        </p>
                      </CardContent>
                    </Card>
                    
                    <OnboardingProgress
                      steps={progressSteps}
                      currentStepId={currentStepId}
                      overallProgress={overallProgress}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="checklist">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8">
                  <Card className="mb-6">
                    <CardContent className="pt-6 pb-6">
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold">Onboarding Checklist</h2>
                        <p className="text-muted-foreground">
                          Complete all steps to activate your vendor account
                        </p>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Overall Completion</span>
                          <span className="text-sm font-medium">{overallProgress}%</span>
                        </div>
                        <Progress value={overallProgress} className="h-2" />
                      </div>
                      
                      <OnboardingChecklist steps={checklistSteps} variant="compact" showProgress={false} />
                    </CardContent>
                  </Card>
                  
                  <Alert className="mb-6">
                    <AlertTitle>You're making progress!</AlertTitle>
                    <AlertDescription>
                      Once all steps are complete, your vendor account will be activated within 24-48 hours.
                    </AlertDescription>
                  </Alert>
                </div>
                
                <div className="md:col-span-4">
                  <div className="space-y-6">
                    <OnboardingProgress
                      steps={progressSteps}
                      currentStepId={currentStepId}
                      overallProgress={overallProgress}
                    />
                    
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-medium mb-2">Need help?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Our support team is available to assist you with your onboarding process.
                        </p>
                        <Button variant="outline" className="w-full">Contact Support</Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <AdminKYCDashboard pendingVerifications={pendingVerifications} />
        )}
      </div>
    </Layout>
  );
}
