
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePayment, PaymentMethod } from "@/contexts/PaymentContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const paymentSchema = z.object({
  paymentType: z.enum(["card", "upi", "wallet", "netbanking"]),
  
  // Card fields
  cardNumber: z.string().optional().refine(
    (val) => !val || /^\d{16}$/.test(val),
    { message: "Card number must be 16 digits" }
  ),
  cardName: z.string().optional(),
  cardExpiry: z.string().optional().refine(
    (val) => !val || /^(0[1-9]|1[0-2])\/\d{2}$/.test(val),
    { message: "Expiry date must be in MM/YY format" }
  ),
  cardCvc: z.string().optional().refine(
    (val) => !val || /^\d{3,4}$/.test(val),
    { message: "CVC must be 3 or 4 digits" }
  ),
  
  // UPI fields
  upiId: z.string().optional().refine(
    (val) => !val || /^[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z._]{2,49}$/.test(val),
    { message: "Enter a valid UPI ID" }
  ),
  
  // Wallet fields
  walletProvider: z.enum(["paytm", "phonepe", "googlepay", "amazonpay"]).optional(),
  
  // Net banking fields
  bankName: z.string().optional(),
});

type PaymentSchemaType = z.infer<typeof paymentSchema>;

export default function AddPaymentMethodForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addPaymentMethod } = usePayment();
  
  const form = useForm<PaymentSchemaType>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentType: "card",
      cardNumber: "",
      cardName: "",
      cardExpiry: "",
      cardCvc: "",
      upiId: "",
      walletProvider: "paytm",
      bankName: "",
    },
  });

  const paymentType = form.watch("paymentType");

  const onSubmit = async (data: PaymentSchemaType) => {
    setIsLoading(true);
    
    try {
      // Create a payment method based on the type
      let newPaymentMethod: PaymentMethod;
      
      switch (data.paymentType) {
        case "card":
          newPaymentMethod = {
            id: `pm-card-${Date.now()}`,
            type: "card",
            label: `${data.cardName} (${data.cardNumber?.slice(-4)})`,
            last4: data.cardNumber?.slice(-4) || "",
            expiryDate: data.cardExpiry || "",
            isDefault: false,
          };
          break;
          
        case "upi":
          newPaymentMethod = {
            id: `pm-upi-${Date.now()}`,
            type: "upi",
            label: "UPI",
            upiId: data.upiId || "",
            isDefault: false,
          };
          break;
          
        case "wallet":
          newPaymentMethod = {
            id: `pm-wallet-${Date.now()}`,
            type: "wallet",
            label: data.walletProvider || "Wallet",
            walletName: data.walletProvider,
            isDefault: false,
          };
          break;
          
        case "netbanking":
          newPaymentMethod = {
            id: `pm-netbank-${Date.now()}`,
            type: "netbanking",
            label: `Net Banking (${data.bankName})`,
            isDefault: false,
          };
          break;
          
        default:
          throw new Error("Invalid payment method type");
      }
      
      const success = await addPaymentMethod(newPaymentMethod);
      if (success) {
        form.reset();
        onSuccess();
      }
    } catch (error) {
      toast.error("Failed to add payment method");
      console.error("Payment method error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="paymentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="card" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Credit/Debit Card</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="upi" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">UPI</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="wallet" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Wallet</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="netbanking" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Net Banking</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {paymentType === "card" && (
          <>
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 5678 9012 3456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name on card" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cardExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardCvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        {paymentType === "upi" && (
          <FormField
            control={form.control}
            name="upiId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UPI ID</FormLabel>
                <FormControl>
                  <Input placeholder="name@upi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {paymentType === "wallet" && (
          <FormField
            control={form.control}
            name="walletProvider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet Provider</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a wallet provider" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="paytm">Paytm</SelectItem>
                    <SelectItem value="phonepe">PhonePe</SelectItem>
                    <SelectItem value="googlepay">Google Pay</SelectItem>
                    <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {paymentType === "netbanking" && (
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your bank name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : "Add Payment Method"}
        </Button>
      </form>
    </Form>
  );
}
