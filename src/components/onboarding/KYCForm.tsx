
import { 
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
import { useForm } from "react-hook-form";

interface KYCData {
  gstin: string;
  pan: string;
  gstRegistrationType: string;
  legalName: string;
  tradeName: string;
}

interface KYCFormProps {
  data: KYCData;
  onUpdate: (data: KYCData) => void;
}

export default function KYCForm({ data, onUpdate }: KYCFormProps) {
  const form = useForm({
    defaultValues: {
      gstin: data.gstin || "",
      pan: data.pan || "",
      gstRegistrationType: data.gstRegistrationType || "",
      legalName: data.legalName || "",
      tradeName: data.tradeName || ""
    }
  });
  
  const onSubmit = (values) => {
    onUpdate(values);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-1">Why is KYC information required?</h3>
        <p className="text-xs text-blue-700">
          This information is required for GST compliance and to verify your business identity. 
          Your GSTIN will be used for tax purposes and invoice generation.
        </p>
      </div>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <FormField
              control={form.control}
              name="gstin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GSTIN</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter 15-digit GSTIN" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your 15-digit Goods and Services Tax Identification Number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="pan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PAN</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter 10-digit PAN" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your 10-digit Permanent Account Number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div>
          <FormField
            control={form.control}
            name="gstRegistrationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GST Registration Type</FormLabel>
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
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <FormField
              control={form.control}
              name="legalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Legal Business Name</FormLabel>
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
          </div>
          
          <div>
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
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">Save KYC Information</Button>
        </div>
      </form>
    </div>
  );
}
