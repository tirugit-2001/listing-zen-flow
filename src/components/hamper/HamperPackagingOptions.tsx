
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ArrowRight, Check, Box, Sparkles } from "lucide-react";

interface PackagingData {
  packageType: string;
  customPackaging: boolean;
  brandingOptions: string[];
}

interface HamperPackagingOptionsProps {
  packagingData: PackagingData;
  updatePackagingData: (data: PackagingData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function HamperPackagingOptions({
  packagingData,
  updatePackagingData,
  onNext,
  onPrevious,
}: HamperPackagingOptionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Local state for form values
  const [selectedPackageType, setSelectedPackageType] = useState(packagingData.packageType);
  const [customPackaging, setCustomPackaging] = useState(packagingData.customPackaging);
  const [brandingOptions, setBrandingOptions] = useState<string[]>(packagingData.brandingOptions || []);
  
  // Package type options with pricing
  const packageTypes = [
    {
      id: "standard",
      name: "Standard Box",
      description: "Sturdy cardboard box with tissue paper",
      price: "₹120",
      image: "https://placehold.co/300x200?text=Standard+Box",
    },
    {
      id: "premium",
      name: "Premium Box",
      description: "Magnetic closure box with foam inserts",
      price: "₹250",
      image: "https://placehold.co/300x200?text=Premium+Box",
    },
    {
      id: "luxury",
      name: "Luxury Gift Box",
      description: "High-end presentation box with satin liner",
      price: "₹450",
      image: "https://placehold.co/300x200?text=Luxury+Box",
    },
    {
      id: "eco",
      name: "Eco-Friendly",
      description: "Sustainable packaging made from recycled materials",
      price: "₹180",
      image: "https://placehold.co/300x200?text=Eco+Box",
    },
  ];

  // Branding options
  const brandingOptionsList = [
    { id: "logo-printing", label: "Logo Printing on Box", price: "₹80" },
    { id: "custom-labels", label: "Custom Product Labels", price: "₹50" },
    { id: "custom-ribbon", label: "Custom Ribbon", price: "₹40" },
    { id: "custom-card", label: "Custom Message Card", price: "₹30" },
    { id: "custom-tissue", label: "Branded Tissue Paper", price: "₹25" },
  ];

  // Handle branding option change
  const handleBrandingOptionChange = (id: string, checked: boolean) => {
    if (checked) {
      setBrandingOptions([...brandingOptions, id]);
    } else {
      setBrandingOptions(brandingOptions.filter(option => option !== id));
    }
  };

  // Handle form submission
  const handleNext = () => {
    setIsLoading(true);
    
    // Update packaging data with form values
    updatePackagingData({
      packageType: selectedPackageType,
      customPackaging: customPackaging,
      brandingOptions: brandingOptions,
    });
    
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 500);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Packaging Options</h2>
      
      {/* Package Type Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Select Package Type</h3>
        <RadioGroup 
          value={selectedPackageType} 
          onValueChange={setSelectedPackageType}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {packageTypes.map((packageType) => (
            <div key={packageType.id} className="relative">
              <RadioGroupItem
                value={packageType.id}
                id={`package-${packageType.id}`}
                className="sr-only"
              />
              <Label
                htmlFor={`package-${packageType.id}`}
                className={`
                  cursor-pointer flex flex-col border rounded-lg overflow-hidden
                  ${selectedPackageType === packageType.id ? "border-primary ring-2 ring-primary ring-opacity-50" : "border-border"}
                `}
              >
                <div className="h-40 bg-muted">
                  <img 
                    src={packageType.image}
                    alt={packageType.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{packageType.name}</div>
                    <div className="font-medium">{packageType.price}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{packageType.description}</p>
                </CardContent>
                {selectedPackageType === packageType.id && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      {/* Custom Packaging Option */}
      <div className="mb-8 border rounded-md p-4">
        <div className="flex items-start space-x-2">
          <Switch
            id="custom-packaging"
            checked={customPackaging}
            onCheckedChange={setCustomPackaging}
          />
          <div className="grid gap-1.5">
            <Label htmlFor="custom-packaging" className="font-medium">
              Custom Packaging Requirements
            </Label>
            <p className="text-sm text-muted-foreground">
              Specify any special requirements for your hamper packaging
            </p>
          </div>
        </div>
        
        {customPackaging && (
          <div className="mt-4">
            <Label htmlFor="packaging-notes">Special Packaging Instructions</Label>
            <Input
              id="packaging-notes"
              placeholder="Describe your custom packaging needs..."
              className="mt-1"
            />
          </div>
        )}
      </div>
      
      {/* Branding Options */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Sparkles className="text-amber-500 mr-2 h-5 w-5" />
          Branding Options
        </h3>
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Enhance your hamper with these branding options:
            </p>
            
            <div className="space-y-4">
              {brandingOptionsList.map((option) => (
                <div key={option.id} className="flex items-center justify-between">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={brandingOptions.includes(option.id)}
                      onCheckedChange={(checked) => 
                        handleBrandingOptionChange(option.id, checked as boolean)
                      }
                    />
                    <div className="grid gap-1">
                      <Label 
                        htmlFor={option.id}
                        className="font-medium cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{option.price}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous: Products
        </Button>
        <Button
          onClick={handleNext}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Next: Upload Images"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
