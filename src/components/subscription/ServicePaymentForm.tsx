
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

const serviceSchema = z.object({
  serviceId: z.string(),
  serviceName: z.string(),
  quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1" }),
  paymentMethodId: z.string(),
  useSubscriptionCredits: z.boolean().default(false),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServicePaymentFormProps {
  serviceId?: string;
  serviceName?: string;
  price?: number;
  onPaymentSuccess?: () => void;
}

export default function ServicePaymentForm({ 
  serviceId = "", 
  serviceName = "Photography Service",
  price = 2000,
  onPaymentSuccess 
}: ServicePaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalAmount, setTotalAmount] = useState(price);
  const { payForService, savedPaymentMethods, currentPlan } = usePayment();

  const hasSubscriptionCredits = currentPlan !== null;

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceId: serviceId,
      serviceName: serviceName,
      quantity: 1,
      paymentMethodId: savedPaymentMethods.length > 0 ? savedPaymentMethods[0].id : "",
      useSubscriptionCredits: false,
    },
  });

  const quantity = form.watch("quantity");
  const useSubscriptionCredits = form.watch("useSubscriptionCredits");

  // Update total amount when quantity changes
  useState(() => {
    const calculatedTotal = useSubscriptionCredits ? 0 : price * (quantity || 1);
    setTotalAmount(calculatedTotal);
  });

  const onSubmit = async (data: ServiceFormValues) => {
    setIsSubmitting(true);
    try {
      const success = await payForService(data.serviceId, totalAmount);
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
        <CardTitle>Service Payment</CardTitle>
        <CardDescription>Complete your order for {serviceName}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4 pb-4 border-b">
              <div className="flex justify-between mb-2">
                <span>{serviceName}</span>
                <span>₹{price}</span>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={1}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        const newQuantity = parseInt(e.target.value) || 1;
                        const newTotal = useSubscriptionCredits ? 0 : price * newQuantity;
                        setTotalAmount(newTotal);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {hasSubscriptionCredits && (
              <FormField
                control={form.control}
                name="useSubscriptionCredits"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Payment Options</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          const useCredits = value === "true";
                          field.onChange(useCredits);
                          setTotalAmount(useCredits ? 0 : price * quantity);
                        }}
                        defaultValue={field.value ? "true" : "false"}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Use {currentPlan?.name} plan credits ({quantity} credits)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Pay ₹{price * quantity} (save credits for later)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {!useSubscriptionCredits && (
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
            )}

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between text-lg font-medium">
                <span>Total Amount:</span>
                <span>{useSubscriptionCredits ? '0 (Using Plan Credits)' : `₹${totalAmount}`}</span>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-4" 
              disabled={isSubmitting || (!useSubscriptionCredits && savedPaymentMethods.length === 0)}
            >
              {isSubmitting ? "Processing..." : useSubscriptionCredits ? "Use Credits & Order" : "Pay Now"}
            </Button>

            {!useSubscriptionCredits && savedPaymentMethods.length === 0 && (
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
