
import { useState } from "react";
import { 
  Form,
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertCircle, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const kycSchema = z.object({
  gstin: z.string()
    .min(15, { message: "GSTIN must be exactly 15 characters" })
    .max(15, { message: "GSTIN must be exactly 15 characters" })
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, { 
      message: "Please enter a valid GSTIN format" 
    }),
  pan: z.string()
    .min(10, { message: "PAN must be exactly 10 characters" })
    .max(10, { message: "PAN must be exactly 10 characters" })
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { 
      message: "Please enter a valid PAN format" 
    }),
  gstRegistrationType: z.string().min(1, { message: "Please select a GST registration type" }),
  legalName: z.string().min(3, { message: "Legal name is required" }),
  tradeName: z.string().optional(),
});

export type KYCData = z.infer<typeof kycSchema>;

export interface KYCFormProps {
  data: KYCData;
  onUpdate: (data: KYCData) => void;
}

export default function KYCForm({ data, onUpdate }: KYCFormProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [verificationMessage, setVerificationMessage] = useState("");
  const { toast } = useToast();
  
  const form = useForm<KYCData>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      gstin: data.gstin || "",
      pan: data.pan || "",
      gstRegistrationType: data.gstRegistrationType || "",
      legalName: data.legalName || "",
      tradeName: data.tradeName || ""
    }
  });
  
  const verifyGSTIN = async (gstin: string) => {
    setIsVerifying(true);
    setVerificationStatus("verifying");
    
    try {
      // In a real implementation, this would be an API call to a GSTIN verification service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock verification - in real app, this would be the API response
      if (gstin === "22AAAAA0000A1Z5") {
        setVerificationStatus("success");
        setVerificationMessage("GSTIN verified successfully");
        
        // Auto-fill PAN and Legal Name if available from GSTIN data
        form.setValue("pan", "AAAAA0000A");
        form.setValue("legalName", "Verified Company Name Pvt Ltd");
        
        toast({
          title: "GSTIN Verified",
          description: "Business details have been automatically fetched",
        });
      } else {
        setVerificationStatus("error");
        setVerificationMessage("Could not verify GSTIN. Please check and try again.");
        
        toast({
          title: "Verification Failed",
          description: "Please check the GSTIN and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      setVerificationStatus("error");
      setVerificationMessage("Verification service unavailable. Please try again later.");
      
      toast({
        title: "Verification Error",
        description: "Our verification service is currently unavailable",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };
  
  const onSubmit = (values: KYCData) => {
    onUpdate(values);
    
    toast({
      title: "KYC Information Saved",
      description: "Your KYC details have been saved successfully",
    });
  };
  
  const gstin = form.watch("gstin");

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-1">Why is KYC information required?</h3>
        <p className="text-xs text-blue-700">
          This information is required for GST compliance and to verify your business identity. 
          Your GSTIN will be used for tax purposes and invoice generation.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tax Identification</h3>
                  
                  <FormField
                    control={form.control}
                    name="gstin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GSTIN <span className="text-destructive">*</span></FormLabel>
                        <div className="flex space-x-2">
                          <FormControl>
                            <Input 
                              placeholder="22AAAAA0000A1Z5" 
                              {...field}
                              className="font-mono"
                            />
                          </FormControl>
                          <Button 
                            type="button" 
                            onClick={() => verifyGSTIN(gstin)}
                            disabled={isVerifying || !gstin || gstin.length !== 15}
                            variant="outline"
                          >
                            {isVerifying ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                                Verifying
                              </>
                            ) : "Verify GSTIN"}
                          </Button>
                        </div>
                        <FormDescription>
                          Your 15-digit Goods and Services Tax Identification Number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {verificationStatus === "success" && (
                    <Alert variant="default" className="bg-green-50 border-green-100 text-green-800">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <AlertTitle>Verification Successful</AlertTitle>
                      <AlertDescription>{verificationMessage}</AlertDescription>
                    </Alert>
                  )}
                  
                  {verificationStatus === "error" && (
                    <Alert variant="destructive" className="bg-red-50 border-red-100 text-red-800">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <AlertTitle>Verification Failed</AlertTitle>
                      <AlertDescription>{verificationMessage}</AlertDescription>
                    </Alert>
                  )}
                  
                  <FormField
                    control={form.control}
                    name="pan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PAN <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="AAAAA0000A" 
                            {...field} 
                            className="font-mono"
                          />
                        </FormControl>
                        <FormDescription>
                          Your 10-digit Permanent Account Number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gstRegistrationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GST Registration Type <span className="text-destructive">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select GST registration type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="regular">Regular</SelectItem>
                            <SelectItem value="composition">Composition</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="non_resident">Non-Resident</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Type of GST registration your business has
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Business Details</h3>
                  
                  <FormField
                    control={form.control}
                    name="legalName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Legal Business Name <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="As registered with GST" {...field} />
                        </FormControl>
                        <FormDescription>
                          Legal name as per GST registration
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tradeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trade Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Trade/Brand name of your business" {...field} />
                        </FormControl>
                        <FormDescription>
                          Trade name of your business (if different from legal name)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <h4 className="text-sm font-medium">Upload Business Registration Certificate</h4>
                    <p className="text-xs text-muted-foreground text-center">
                      Upload your business registration certificate for verification.
                      We accept PDF, JPG, or PNG formats up to 5MB.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Select File
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit">Save KYC Information</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
