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

interface BankData {
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  bankBranch?: string;
  branchName?: string;
  accountType: string;
  [key: string]: any; // Allow for additional properties
}

interface BankDetailsFormProps {
  data: BankData;
  onUpdate: (data: BankData) => void;
}

export default function BankDetailsForm({ data, onUpdate }: BankDetailsFormProps) {
  const form = useForm({
    defaultValues: {
      accountName: data.accountName || "",
      accountNumber: data.accountNumber || "",
      ifscCode: data.ifscCode || "",
      bankName: data.bankName || "",
      bankBranch: data.bankBranch || data.branchName || "",
      accountType: data.accountType || ""
    }
  });
  
  const onSubmit = (values: BankData) => {
    onUpdate(values);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-1">Why are banking details required?</h3>
        <p className="text-xs text-blue-700">
          Your bank account details are required to process payments for your sales on BaseCampMart. 
          We only support business bank accounts that match your business name.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Holder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name as per bank records" {...field} />
                    </FormControl>
                    <FormDescription>
                      Must match your registered business name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div>
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="current">Current Account</SelectItem>
                        <SelectItem value="savings">Savings Account</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      We recommend using a current account for business
                    </FormDescription>
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
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Bank account number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div>
              <FormField
                control={form.control}
                name="ifscCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IFSC Code</FormLabel>
                    <FormControl>
                      <Input placeholder="11-character IFSC code" {...field} />
                    </FormControl>
                    <FormDescription>
                      11-character code identifying the bank branch
                    </FormDescription>
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
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of the bank" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div>
              <FormField
                control={form.control}
                name="bankBranch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Branch</FormLabel>
                    <FormControl>
                      <Input placeholder="Branch name or location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">Save Bank Details</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
