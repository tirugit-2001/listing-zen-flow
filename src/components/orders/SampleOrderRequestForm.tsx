
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { SearchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  productId: z.string().min(1, "Please select a product"),
  quantity: z.string().min(1, "Quantity is required"),
  primaryReason: z.enum(["quality_check", "branding_test", "client_presentation", "other"], {
    required_error: "Please select a reason",
  }),
  customizations: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),
  shippingAddress: z.string().min(1, "Shipping address is required"),
  urgencyLevel: z.enum(["standard", "urgent"], {
    required_error: "Please select an urgency level",
  }),
});

// Mock product data
const products = [
  {
    id: "prod-1",
    name: "Premium Metal Water Bottle",
    vendor: "EcoThrive Products",
    imageUrl: "https://placehold.co/100x100",
    sampleAvailable: true,
    price: "₹850",
  },
  {
    id: "prod-2",
    name: "Organic Cotton Tote Bag",
    vendor: "EcoThrive Products",
    imageUrl: "https://placehold.co/100x100",
    sampleAvailable: true,
    price: "₹450",
  },
  {
    id: "prod-3",
    name: "Wireless Charger Pad",
    vendor: "TechGadgetry",
    imageUrl: "https://placehold.co/100x100",
    sampleAvailable: true,
    price: "₹1,200",
  },
  {
    id: "prod-4",
    name: "Bamboo Notebook & Pen Set",
    vendor: "Wellness Essentials",
    imageUrl: "https://placehold.co/100x100",
    sampleAvailable: true,
    price: "₹680",
  }
];

export default function SampleOrderRequestForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: "1",
      primaryReason: "quality_check",
      customizations: [],
      additionalNotes: "",
      shippingAddress: "",
      urgencyLevel: "standard",
    },
  });
  
  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    toast({
      title: "Sample Request Submitted",
      description: "Your sample order request has been sent to the vendor for approval.",
    });
    
    // Reset form
    form.reset();
    setSelectedProduct(null);
  };
  
  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    form.setValue("productId", product.id);
  };
  
  return (
    <div className="space-y-6">
      {!selectedProduct ? (
        <div className="space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for products..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => handleProductSelect(product)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-14 h-14 shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.vendor}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm">{product.price}</p>
                      {product.sampleAvailable ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          Sample Available
                        </Badge>
                      ) : (
                        <Badge variant="outline">No Sample</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="col-span-2 text-center py-8 text-muted-foreground">
                No products found matching your search
              </div>
            )}
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-muted/40 p-4 rounded-lg border flex items-center gap-3">
              <div className="w-14 h-14 shrink-0">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div>
                <h4 className="font-medium">{selectedProduct.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedProduct.vendor}</p>
                <p className="text-sm">Price: {selectedProduct.price}</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-auto"
                onClick={() => setSelectedProduct(null)}
              >
                Change
              </Button>
            </div>
            
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sample Quantity</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quantity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the number of samples you need
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="primaryReason"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Primary Reason for Sample</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="quality_check" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Quality Check
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="branding_test" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Branding/Customization Test
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="client_presentation" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Client Presentation
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Other
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
              name="customizations"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Customizations</FormLabel>
                    <FormDescription>
                      Select the customizations you want to test with this sample
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Branding", "Colors", "Materials", "Packaging"].map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="customizations"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.toLowerCase())}
                                  onCheckedChange={(checked) => {
                                    const value = item.toLowerCase();
                                    return checked
                                      ? field.onChange([...(field.value || []), value])
                                      : field.onChange(
                                          field.value?.filter(
                                            (val) => val !== value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any specific requirements or details for this sample order"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include any special instructions for the vendor
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter full shipping address for the samples"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide the complete address where you want to receive the samples
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="urgencyLevel"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Urgency Level</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="standard" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Standard (7-10 days)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="urgent" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Urgent (2-3 days)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Urgent requests may incur additional shipping fees
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Submit Sample Request</Button>
          </form>
        </Form>
      )}
    </div>
  );
}
