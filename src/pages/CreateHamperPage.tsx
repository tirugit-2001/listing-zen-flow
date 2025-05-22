
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, Save, SendHorizonal, Package, ShoppingCart } from "lucide-react";
import HamperDetailsForm from "@/components/hamper/HamperDetailsForm";
import HamperProductsSelector from "@/components/hamper/HamperProductsSelector";
import HamperPackagingOptions from "@/components/hamper/HamperPackagingOptions";
import HamperImageUploader from "@/components/hamper/HamperImageUploader";
import HamperPreview from "@/components/hamper/HamperPreview";
import { useToast } from "@/hooks/use-toast";

export default function CreateHamperPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<string>("details");
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for hamper data
  const [hamperData, setHamperData] = useState({
    title: "",
    category: "",
    description: "",
    products: [],
    packageType: "standard",
    customPackaging: false,
    brandingOptions: [],
    images: [],
    price: {
      base: 0,
      discount: 0,
      final: 0
    },
    status: "draft"
  });
  
  const handleSaveAsDraft = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Hamper saved as draft",
        description: "You can continue editing or submit for approval later."
      });
      setIsSaving(false);
    }, 1000);
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Validate required fields
    if (!hamperData.title || !hamperData.category || !hamperData.description || hamperData.products.length === 0 || hamperData.images.length === 0) {
      toast({
        title: "Unable to submit",
        description: "Please fill all required fields before submitting for approval.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Hamper submitted for approval",
        description: "You will be notified once your hamper is approved."
      });
      setIsSubmitting(false);
      navigate("/hamper-management");
    }, 1500);
  };
  
  const updateHamperData = (field: string, value: any) => {
    setHamperData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold tracking-tight">Create New Hamper</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={handleSaveAsDraft}
                disabled={isSaving || isSubmitting}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save as Draft"}
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSaving || isSubmitting}
              >
                <SendHorizonal className="mr-2 h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit for Approval"}
              </Button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left section: Forms */}
            <div className="lg:col-span-2">
              <Tabs value={currentStep} onValueChange={setCurrentStep}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="packaging">Packaging</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>
                
                <Card className="mt-4 border-t-0 rounded-t-none">
                  <CardContent className="pt-6">
                    <TabsContent value="details" className="mt-0">
                      <HamperDetailsForm 
                        hamperData={hamperData}
                        updateHamperData={updateHamperData}
                        onNext={() => setCurrentStep("products")}
                      />
                    </TabsContent>
                    
                    <TabsContent value="products" className="mt-0">
                      <HamperProductsSelector 
                        selectedProducts={hamperData.products}
                        updateSelectedProducts={(products) => updateHamperData("products", products)}
                        onNext={() => setCurrentStep("packaging")}
                        onPrevious={() => setCurrentStep("details")}
                      />
                    </TabsContent>
                    
                    <TabsContent value="packaging" className="mt-0">
                      <HamperPackagingOptions
                        packagingData={{
                          packageType: hamperData.packageType,
                          customPackaging: hamperData.customPackaging,
                          brandingOptions: hamperData.brandingOptions
                        }}
                        updatePackagingData={(data) => {
                          updateHamperData("packageType", data.packageType);
                          updateHamperData("customPackaging", data.customPackaging);
                          updateHamperData("brandingOptions", data.brandingOptions);
                        }}
                        onNext={() => setCurrentStep("images")}
                        onPrevious={() => setCurrentStep("products")}
                      />
                    </TabsContent>
                    
                    <TabsContent value="images" className="mt-0">
                      <HamperImageUploader
                        images={hamperData.images}
                        updateImages={(images) => updateHamperData("images", images)}
                        onPrevious={() => setCurrentStep("packaging")}
                      />
                    </TabsContent>
                  </CardContent>
                </Card>
              </Tabs>
            </div>
            
            {/* Right section: Preview */}
            <div className="lg:col-span-1">
              <h2 className="text-lg font-semibold mb-4">Hamper Preview</h2>
              <HamperPreview hamperData={hamperData} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
