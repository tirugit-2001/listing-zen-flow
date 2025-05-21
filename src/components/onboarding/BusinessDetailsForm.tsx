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
import { useForm } from "react-hook-form";

// Updated interface to match the structure in VendorOnboardingPage
interface BusinessData {
  businessName: string;
  businessType: string;
  registrationNumber: string;
  yearEstablished: string;
  address?: string | {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  contactPerson?: string | {
    name: string;
    email: string;
    phone: string;
  };
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  pincode?: string;
  website?: string;
  gstNumber?: string;
  [key: string]: any; // Allow for additional properties
}

export interface BusinessDetailsFormProps {
  data: BusinessData;
  onUpdate: (data: BusinessData) => void;
}

export default function BusinessDetailsForm({ data, onUpdate }: BusinessDetailsFormProps) {
  const form = useForm({
    defaultValues: {
      businessName: data.businessName || "",
      businessType: data.businessType || "",
      registrationNumber: data.registrationNumber || "",
      yearEstablished: data.yearEstablished || "",
      contactPerson: typeof data.contactPerson === 'object' ? data.contactPerson.name : (data.contactPerson || ""),
      email: typeof data.contactPerson === 'object' ? data.contactPerson.email : (data.email || ""),
      phone: typeof data.contactPerson === 'object' ? data.contactPerson.phone : (data.phone || ""),
      address: typeof data.address === 'object' ? data.address.street : (data.address || ""),
      city: typeof data.address === 'object' ? data.address.city : (data.city || ""),
      state: typeof data.address === 'object' ? data.address.state : (data.state || ""),
      pincode: typeof data.address === 'object' ? data.address.postalCode : (data.pincode || ""),
      website: data.website || "",
      gstNumber: data.gstNumber || ""
    }
  });
  
  const onSubmit = (values: any) => {
    // Transform form values back into the expected structure
    const formattedData: BusinessData = {
      businessName: values.businessName,
      businessType: values.businessType,
      registrationNumber: values.registrationNumber,
      yearEstablished: values.yearEstablished,
      contactPerson: {
        name: values.contactPerson,
        email: values.email,
        phone: values.phone
      },
      address: {
        street: values.address,
        city: values.city,
        state: values.state,
        postalCode: values.pincode,
        country: "India" // Default country
      },
      website: values.website,
      gstNumber: values.gstNumber
    };

    onUpdate(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your business name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="proprietorship">Sole Proprietorship</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="llp">LLP</SelectItem>
                      <SelectItem value="pvt_ltd">Private Limited</SelectItem>
                      <SelectItem value="public_ltd">Public Limited</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Business registration number" {...field} />
                  </FormControl>
                  <FormDescription>
                    CIN, LLPIN, or other registration number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="yearEstablished"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Established</FormLabel>
                  <FormControl>
                    <Input placeholder="Year of establishment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <h3 className="text-lg font-medium pt-2">Primary Contact Information</h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name of primary contact" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Business email address" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="10-digit mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Company website URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <h3 className="text-lg font-medium pt-2">Business Address</h3>
        
        <div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="Street address, building, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="andhra_pradesh">Andhra Pradesh</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="tamil_nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="telangana">Telangana</SelectItem>
                      <SelectItem value="uttar_pradesh">Uttar Pradesh</SelectItem>
                      <SelectItem value="west_bengal">West Bengal</SelectItem>
                      {/* More states would be added here */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="6-digit pincode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <FormField
              control={form.control}
              name="gstNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GST Number</FormLabel>
                  <FormControl>
                    <Input placeholder="GST Registration Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">Save Business Details</Button>
        </div>
      </form>
    </Form>
  );
}
