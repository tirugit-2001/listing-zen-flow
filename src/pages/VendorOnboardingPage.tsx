
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OnboardingProgress from "@/components/onboarding/OnboardingProgress";
import { Stepper } from "@/components/onboarding/Stepper";
import KYCForm from "@/components/onboarding/KYCForm";
import BusinessDetailsForm from "@/components/onboarding/BusinessDetailsForm";
import DocumentVerificationForm from "@/components/onboarding/DocumentVerificationForm";
import BankDetailsForm from "@/components/onboarding/BankDetailsForm";
import AdminKYCDashboard from "@/components/onboarding/AdminKYCDashboard";
import { Clock } from "lucide-react";

// Define onboarding steps
const steps = [
  { id: "business", title: "Business Info" },
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
    id: "document_verification",
    name: "Document Verification",
    status: "completed" as const,
    description: "Upload and verify business documents",
    completedAt: new Date(2025, 4, 15, 11, 45),
  },
  {
    id: "bank_details",
    name: "Bank Account Details",
    status: "in-progress" as const,
    description: "Connect your business bank account",
  },
  {
    id: "review",
    name: "Application Review",
    status: "pending" as const,
    description: "Final review by BaseCampMart team",
  },
  {
    id: "kyc_verification",
    name: "KYC Verification",
    status: "pending" as const,
    description: "Identity and business verification",
  },
];

// Define types to match component interfaces
interface BusinessDataType {
  businessName: string;
  businessType: string;
  registrationNumber: string;
  yearEstablished: string;
  gstNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  contactPerson: {
    name: string;
    email: string;
    phone: string;
  };
}

interface DocumentDataType {
  gstCertificate: null | string;
  panCard: null | string;
  businessRegistration: null | string;
  cancelledCheque: null | string;
  addressProof: null | string;
  signatureProof: null | string;
}

interface BankDataType {
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  bankBranch?: string;
  branchName?: string;
  accountType: string;
}

// Mock business data
const initialBusinessData: BusinessDataType = {
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
const initialBankData: BankDataType = {
  accountName: "Mutations Design Pvt Ltd",
  accountNumber: "1234567890",
  ifscCode: "ABCD0001234",
  bankName: "ICICI Bank",
  bankBranch: "Andheri East",
  accountType: "Current"
};

// Mock pending verifications for AdminKYCDashboard
const pendingVerifications = [
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

export default function VendorOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessData, setBusinessData] = useState(initialBusinessData);
  const [documentData, setDocumentData] = useState(initialDocumentData);
  const [bankData, setBankData] = useState(initialBankData);
  const [viewMode, setViewMode] = useState<"vendor" | "admin">("vendor");
  
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
  
  const handleSubmit = () => {
    // In a real implementation, this would submit the onboarding data to the backend
    console.log("Submitting onboarding data:", { businessData, bankData });
    // Show success message or redirect to dashboard
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
          <>
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
                    {currentStep === 0 && (
                      <BusinessDetailsForm 
                        data={businessData}
                        onUpdate={(data) => {
                          setBusinessData(data as any);
                          handleNext();
                        }}
                      />
                    )}
                    
                    {currentStep === 1 && (
                      <DocumentVerificationForm 
                        data={documentData}
                        onUpdate={(data) => {
                          setDocumentData(data);
                          handleNext();
                        }}
                      />
                    )}
                    
                    {currentStep === 2 && (
                      <BankDetailsForm 
                        data={bankData}
                        onUpdate={(data) => {
                          setBankData(data as any);
                          handleNext();
                        }}
                      />
                    )}
                    
                    {currentStep === 3 && (
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
                            <h3 className="text-lg font-medium mb-2">Bank Details</h3>
                            <div className="bg-muted p-4 rounded-md">
                              <pre className="whitespace-pre-wrap text-sm">
                                {JSON.stringify(bankData, null, 2)}
                              </pre>
                            </div>
                          </div>
                          
                          <div className="pt-4 flex justify-between">
                            <Button type="button" variant="outline" onClick={handleBack}>
                              Back
                            </Button>
                            <Button type="button" onClick={handleSubmit}>
                              Submit Application
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
                    currentStepId="bank_details"
                    overallProgress={40}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <AdminKYCDashboard pendingVerifications={pendingVerifications} />
        )}
      </div>
    </Layout>
  );
}
