
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePayment } from "@/contexts/PaymentContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const campaignSchema = z.object({
  campaignId: z.string(),
  name: z.string().min(3, { message: "Campaign name must be at least 3 characters" }),
  budget: z.coerce.number().min(1000, { message: "Minimum budget is ₹1000" }),
  paymentMethodId: z.string(),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

interface CampaignPaymentFormProps {
  campaignId?: string;
  campaignName?: string;
  onPaymentSuccess?: () => void;
}

export default function CampaignPaymentForm({ campaignId = "", campaignName = "", onPaymentSuccess }: CampaignPaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { payForCampaign, savedPaymentMethods } = usePayment();

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      campaignId: campaignId,
      name: campaignName,
      budget: 1000,
      paymentMethodId: savedPaymentMethods.length > 0 ? savedPaymentMethods[0].id : "",
    },
  });

  const onSubmit = async (data: CampaignFormValues) => {
    setIsSubmitting(true);
    try {
      const success = await payForCampaign(data.campaignId, data.budget);
      if (success && onPaymentSuccess) {
        onPaymentSuccess();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Payment</CardTitle>
        <CardDescription>Set up your campaign budget and payment details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Summer Sale 2025" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Budget (₹)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="5000" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="paymentMethodId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {savedPaymentMethods.length > 0 ? (
                        savedPaymentMethods.map((method) => (
                          <SelectItem key={method.id} value={method.id}>
                            {method.label}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value="none">
                          No payment methods available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full mt-4" 
              disabled={isSubmitting || savedPaymentMethods.length === 0}
            >
              {isSubmitting ? "Processing..." : "Pay Now"}
            </Button>

            {savedPaymentMethods.length === 0 && (
              <p className="text-sm text-destructive text-center mt-2">
                Please add a payment method before proceeding
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
