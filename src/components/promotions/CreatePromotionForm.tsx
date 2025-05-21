
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

// Form schema for the promotion creation
const promotionFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  type: z.enum(["discount", "bundle", "coupon", "flash_sale"], {
    required_error: "Please select a promotion type",
  }),
  discountType: z.enum(["percentage", "fixed_amount", "buy_x_get_y"], {
    required_error: "Please select a discount type",
  }),
  discountValue: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Discount value must be a number",
  }),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  applyTo: z.enum(["all", "category", "specific"], {
    required_error: "Please select where to apply the promotion",
  }),
  minPurchase: z.string().optional(),
  maxDiscount: z.string().optional(),
  description: z.string().optional(),
  termsAndConditions: z.string().optional(),
});

type FormValues = z.infer<typeof promotionFormSchema>;

interface CreatePromotionFormProps {
  onSubmit: (data: FormValues) => void;
}

export default function CreatePromotionForm({ onSubmit }: CreatePromotionFormProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(promotionFormSchema),
    defaultValues: {
      name: "",
      type: "discount",
      discountType: "percentage",
      discountValue: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      applyTo: "all",
      minPurchase: "",
      maxDiscount: "",
      description: "",
      termsAndConditions: ""
    }
  });
  
  const formType = form.watch("type");
  const applyTo = form.watch("applyTo");
  const discountType = form.watch("discountType");
  
  const handleFormSubmit = (data: FormValues) => {
    onSubmit({
      ...data,
      // Add selected products if using specific product selection
      ...(applyTo === "specific" && { products: selectedProducts })
    });
  };
  
  // Mock function for product selection - in real app would use a modal or dropdown
  const addMockProduct = () => {
    const mockProducts = ["Stainless Steel Bottle", "Corporate Diary", "Laptop Bag", "Power Bank"];
    const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
    
    if (!selectedProducts.includes(randomProduct)) {
      setSelectedProducts([...selectedProducts, randomProduct]);
    }
  };
  
  const removeProduct = (product: string) => {
    setSelectedProducts(selectedProducts.filter(p => p !== product));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card className="p-6 space-y-6">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <Separator />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Promotion Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Summer Sale 2025" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Promotion Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a promotion type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="discount">Discount</SelectItem>
                      <SelectItem value="bundle">Bundle Deal</SelectItem>
                      <SelectItem value="coupon">Coupon</SelectItem>
                      <SelectItem value="flash_sale">Flash Sale</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your promotion"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
          
          {/* Discount Configuration */}
          <Card className="p-6 space-y-6">
            <h3 className="text-lg font-medium">Discount Configuration</h3>
            <Separator />
            
            <FormField
              control={form.control}
              name="discountType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Discount Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="percentage" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Percentage discount
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="fixed_amount" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Fixed amount discount
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="buy_x_get_y" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Buy X get Y free
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {discountType === "percentage" 
                      ? "Discount Percentage" 
                      : discountType === "fixed_amount" 
                        ? "Discount Amount (₹)" 
                        : "Buy X quantity"}
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    {discountType === "percentage" 
                      ? "Enter percentage value (e.g., 15 for 15%)" 
                      : discountType === "fixed_amount" 
                        ? "Enter fixed amount in ₹"
                        : "Enter quantity to buy"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="minPurchase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Purchase (₹)</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Optional minimum purchase amount
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="maxDiscount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Discount (₹)</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Optional maximum discount cap
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        </div>
        
        {/* Product Selection */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-6">Apply Promotion To</h3>
          <Separator className="mb-6" />
          
          <FormField
            control={form.control}
            name="applyTo"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="all" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        All products
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="category" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Specific categories
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="specific" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Specific products
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {applyTo === "category" && (
            <div className="mt-4">
              <FormLabel>Select Categories</FormLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bottles">Bottles</SelectItem>
                  <SelectItem value="diaries">Diaries</SelectItem>
                  <SelectItem value="apparel">Apparel</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {applyTo === "specific" && (
            <div className="mt-4 space-y-4">
              <div>
                <FormLabel>Select Products</FormLabel>
                <div className="flex gap-2 mt-2">
                  <Button type="button" variant="outline" onClick={addMockProduct}>
                    Add Product
                  </Button>
                </div>
              </div>
              
              {selectedProducts.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Selected Products:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProducts.map(product => (
                      <Badge key={product} variant="secondary" className="px-3 py-1">
                        {product}
                        <button 
                          type="button" 
                          className="ml-2 text-muted-foreground hover:text-foreground"
                          onClick={() => removeProduct(product)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
        
        {/* Terms and Conditions */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-6">Terms & Conditions</h3>
          <Separator className="mb-6" />
          
          <FormField
            control={form.control}
            name="termsAndConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terms & Conditions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter terms and conditions for this promotion"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Specify any usage restrictions, limitations, or terms for this promotion
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
        
        <div className="flex justify-end">
          <Button type="submit">Create Promotion</Button>
        </div>
      </form>
    </Form>
  );
}
