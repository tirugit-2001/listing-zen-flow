import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Step, Stepper } from "@/components/onboarding/Stepper";
import KYCForm from "@/components/onboarding/KYCForm";
import BusinessDetailsForm from "@/components/onboarding/BusinessDetailsForm";
import BankDetailsForm from "@/components/onboarding/BankDetailsForm";
import DocumentVerificationForm from "@/components/onboarding/DocumentVerificationForm";
import AdminKYCDashboard from "@/components/onboarding/AdminKYCDashboard";

import {
  BadgeDollarSign,
  Calendar,
  ChartBar,
  CheckCircle,
  Clock,
  FileText,
  User
} from "lucide-react";

export default function VendorOnboardingPage() {
  const [activeTab, setActiveTab] = useState("onboarding");
  const [currentStep, setCurrentStep] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false); // Toggle for admin view
  const { toast } = useToast();
  
  // Mock onboarding data
  const [onboardingData, setOnboardingData] = useState({
    businessDetails: {
      businessName: "",
      businessType: "",
      registrationNumber: "",
      yearEstablished: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      website: ""
    },
    kycDetails: {
      gstin: "",
      pan: "",
      gstRegistrationType: "",
      legalName: "",
      tradeName: ""
    },
    bankDetails: {
      accountName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      bankBranch: "",
      accountType: ""
    },
    documents: {
      gstCertificate: null,
      panCard: null,
      businessRegistration: null,
      cancelledCheque: null,
      addressProof: null,
      signatureProof: null
    },
    status: "pending",
    completedSteps: [false, false, false, false]
  });
  
  // Step management
  const steps = [
    { id: "business", title: "Business Details" },
    { id: "kyc", title: "KYC Information" },
    { id: "bank", title: "Banking Details" },
    { id: "documents", title: "Document Verification" }
  ];
  
  const handleNext = () => {
    const newCompletedSteps = [...onboardingData.completedSteps];
    newCompletedSteps[currentStep] = true;
    
    setOnboardingData({
      ...onboardingData,
      completedSteps: newCompletedSteps
    });
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the form
      handleSubmitOnboarding();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmitOnboarding = () => {
    // In a real app, this would submit the data to an API
    console.log("Submitting onboarding data:", onboardingData);
    
    toast({
      title: "Onboarding Submitted",
      description: "Your onboarding details have been submitted for verification.",
    });
    
    // Update status to under review
    setOnboardingData({
      ...onboardingData,
      status: "under_review"
    });
  };
  
  // Update form data handlers
  const updateBusinessDetails = (data) => {
    setOnboardingData({
      ...onboardingData,
      businessDetails: { ...onboardingData.businessDetails, ...data }
    });
  };
  
  const updateKycDetails = (data) => {
    setOnboardingData({
      ...onboardingData,
      kycDetails: { ...onboardingData.kycDetails, ...data }
    });
  };
  
  const updateBankDetails = (data) => {
    setOnboardingData({
      ...onboardingData,
      bankDetails: { ...onboardingData.bankDetails, ...data }
    });
  };
  
  const updateDocuments = (data) => {
    setOnboardingData({
      ...onboardingData,
      documents: { ...onboardingData.documents, ...data }
    });
  };
  
  // Mock pending vendor verification list for admin view with correct status types
  const pendingVerifications = [
    {
      id: "v-001",
      businessName: "Ace Retail Solutions",
      submittedDate: "2025-05-10",
      status: "pending" as const, // Type assertion to match the VendorVerification interface
      documents: 6,
      kycScore: 85
    },
    {
      id: "v-002",
      businessName: "Global Merchandise Ltd.",
      submittedDate: "2025-05-12",
      status: "in_progress" as const,
      documents: 4,
      kycScore: 65
    },
    {
      id: "v-003",
      businessName: "EcoWare Distributors",
      submittedDate: "2025-05-08",
      status: "flagged" as const,
      documents: 6,
      kycScore: 45
    },
    {
      id: "v-004",
      businessName: "Tech Gadgets India",
      submittedDate: "2025-05-15",
      status: "pending" as const,
      documents: 5,
      kycScore: 90
    }
  ];
  
  // Calculate onboarding progress
  const completedSteps = onboardingData.completedSteps.filter(Boolean).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <Layout>
      <div className="container py-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Vendor Onboarding & KYC
              <Badge variant="default" className="ml-2 bg-emerald-600">BaseCampMart</Badge>
            </h1>
            <p className="text-muted-foreground">
              Complete your onboarding process and KYC verification to start selling
            </p>
          </div>
          
          <div className="flex gap-2 items-center">
            <Label htmlFor="admin-toggle">Admin View</Label>
            <Switch id="admin-toggle" checked={isAdmin} onCheckedChange={setIsAdmin} />
          </div>
        </div>
        
        {isAdmin ? (
          // Admin View
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:w-[800px]">
                <TabsTrigger value="pending">Pending Verification</TabsTrigger>
                <TabsTrigger value="approved">Approved Vendors</TabsTrigger>
                <TabsTrigger value="rejected">Rejected Applications</TabsTrigger>
                <TabsTrigger value="analytics">KYC Analytics</TabsTrigger>
              </TabsList>
              
              {/* Pending Verification Tab */}
              <TabsContent value="pending" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Pending Vendor Verifications</CardTitle>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="flagged">Flagged</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Search vendors..." className="max-w-[200px]" />
                      </div>
                    </div>
                    <CardDescription>
                      Review and approve vendor KYC applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdminKYCDashboard pendingVerifications={pendingVerifications} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Other admin tabs would go here */}
              <TabsContent value="approved">
                <Card>
                  <CardHeader>
                    <CardTitle>Approved Vendors</CardTitle>
                    <CardDescription>List of vendors with completed verification</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Approved vendors list would appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="rejected">
                <Card>
                  <CardHeader>
                    <CardTitle>Rejected Applications</CardTitle>
                    <CardDescription>
                      Applications that failed verification checks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Rejected applications list would appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>KYC Analytics</CardTitle>
                    <CardDescription>
                      Analytics and insights on vendor verification process
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>KYC analytics dashboard would appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          // Vendor View
          <div className="space-y-6">
            {onboardingData.status === "approved" ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto bg-green-100 text-green-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-600 mb-2">Verification Complete</h2>
                  <p className="text-muted-foreground mb-4">
                    Your account has been fully verified. You can now start selling on BaseCampMart.
                  </p>
                  <Button className="mt-4">Go to Seller Dashboard</Button>
                </CardContent>
              </Card>
            ) : onboardingData.status === "under_review" ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto bg-blue-100 text-blue-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-600 mb-2">Verification In Progress</h2>
                  <p className="text-muted-foreground mb-4">
                    Your documents are being verified. This process typically takes 24-48 hours.
                  </p>
                  <div className="w-full max-w-md mx-auto mb-6">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Verification Progress</span>
                      <span>Estimated completion: 24-48 hours</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto text-left">
                    <h3 className="font-medium text-blue-600 mb-2">Next Steps</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        <span>Documents submitted successfully</span>
                      </li>
                      <li className="flex items-center">
                        <Clock className="h-4 w-4 text-blue-600 mr-2" />
                        <span>Automated verification in progress</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <div className="h-4 w-4 border border-blue-600 rounded-full mr-2" />
                        <span>Manual verification (if needed)</span>
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <div className="h-4 w-4 border border-blue-600 rounded-full mr-2" />
                        <span>Final approval</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Onboarding form steps
              <>
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <Stepper 
                        currentStep={currentStep}
                        steps={steps}
                        onStepClick={(step) => {
                          // Only allow navigation to completed steps
                          if (onboardingData.completedSteps[step] || step <= completedSteps) {
                            setCurrentStep(step);
                          }
                        }}
                      />
                    </div>
                    
                    <div className="my-6">
                      {currentStep === 0 && (
                        <BusinessDetailsForm 
                          data={onboardingData.businessDetails}
                          onUpdate={updateBusinessDetails}
                        />
                      )}
                      
                      {currentStep === 1 && (
                        <KYCForm 
                          data={onboardingData.kycDetails}
                          onUpdate={updateKycDetails}
                        />
                      )}
                      
                      {currentStep === 2 && (
                        <BankDetailsForm 
                          data={onboardingData.bankDetails}
                          onUpdate={updateBankDetails}
                        />
                      )}
                      
                      {currentStep === 3 && (
                        <DocumentVerificationForm 
                          data={onboardingData.documents}
                          onUpdate={updateDocuments}
                        />
                      )}
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button 
                        variant="outline" 
                        onClick={handleBack}
                        disabled={currentStep === 0}
                      >
                        Back
                      </Button>
                      <Button onClick={handleNext}>
                        {currentStep === steps.length - 1 ? "Submit for Verification" : "Continue"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Why KYC Verification is Required</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                          <FileText className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium mb-2">Legal Compliance</h3>
                        <p className="text-sm text-muted-foreground">
                          KYC is required to comply with Indian financial regulations and tax requirements.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                          <User className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium mb-2">Establish Trust</h3>
                        <p className="text-sm text-muted-foreground">
                          Verification establishes legitimacy of your business for our customers.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                          <BadgeDollarSign className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium mb-2">Secure Payments</h3>
                        <p className="text-sm text-muted-foreground">
                          Verified account details ensure secure and timely payments for your sales.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
