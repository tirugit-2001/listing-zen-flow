import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, PlusCircle, Info } from "lucide-react";
import { ProposalStatus } from "@/lib/models/proposal";

const proposalSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  clientName: z.string().min(2, { message: "Client name is required." }),
  clientEmail: z.string().email({ message: "Valid email is required." }),
  clientPhone: z.string().optional(),
  clientCompany: z.string().min(2, { message: "Company name is required." }),
  isOfflineOrder: z.boolean().default(false),
  proposalType: z.enum(["standard", "custom"]),
  notes: z.string().optional(),
});

export default function CreateProposalForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof proposalSchema>>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      title: "",
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      clientCompany: "",
      isOfflineOrder: false,
      proposalType: "standard",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof proposalSchema>) {
    setIsLoading(true);
    console.log(values);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
    }, 1000);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Create New Proposal</h2>
          <p className="text-muted-foreground mt-1">
            Set up the basics for your new client proposal
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button 
            disabled={currentStep !== 1 || isLoading} 
            onClick={form.handleSubmit(onSubmit)}
          >
            {isLoading ? "Saving..." : "Next: Select Products"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="details" disabled={currentStep !== 1}>Basic Details</TabsTrigger>
          <TabsTrigger value="products" disabled={currentStep < 2}>Product Selection</TabsTrigger>
          <TabsTrigger value="branding" disabled={currentStep < 3}>Branding Options</TabsTrigger>
          <TabsTrigger value="pricing" disabled={currentStep < 4}>Pricing & Discounts</TabsTrigger>
          <TabsTrigger value="preview" disabled={currentStep < 5}>Preview & Send</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Proposal Details</CardTitle>
              <CardDescription>
                Enter the basic information about your proposal and client
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proposal Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a descriptive title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Client Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="clientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Full name of contact person" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="clientEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client Email*</FormLabel>
                            <FormControl>
                              <Input placeholder="client@company.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="clientPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 98765 43210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="clientCompany"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Client's company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Proposal Type</h3>
                    
                    <FormField
                      control={form.control}
                      name="isOfflineOrder"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Offline Order</FormLabel>
                            <FormDescription>
                              Mark if this is an offline order that will be processed manually
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="proposalType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Proposal Template</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="standard" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Standard Proposal
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="custom" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Custom Proposal (Advanced options)
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Internal Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Add any notes for your team (not visible to clients)"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={form.handleSubmit(onSubmit)}>
                {isLoading ? "Saving..." : "Next: Select Products"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <ProductSelectionStep onNext={() => setCurrentStep(3)} />
        </TabsContent>
        
        <TabsContent value="branding">
          <BrandingOptionsStep onNext={() => setCurrentStep(4)} />
        </TabsContent>
        
        <TabsContent value="pricing">
          <PricingDiscountsStep onNext={() => setCurrentStep(5)} />
        </TabsContent>
        
        <TabsContent value="preview">
          <ProposalPreviewStep />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Placeholder for FormDescription component - implement if needed
function FormDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

// Placeholder for other steps - these would be implemented as separate components
function ProductSelectionStep({ onNext }: { onNext: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Products</CardTitle>
        <CardDescription>
          Choose products to include in this proposal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This is a placeholder for the product selection interface. 
            In the full implementation, you would see a searchable product catalog with AI recommendations.
          </AlertDescription>
        </Alert>
        
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">AI Recommendations</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Based on this client's profile and purchase history, we recommend including these products:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video bg-muted/50"></div>
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm">Recommended Product {i}</h4>
                  <p className="text-xs text-muted-foreground">₹12,500 per unit</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Selected Products (3)</h3>
          <div className="divide-y">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded"></div>
                  <div>
                    <h4 className="font-medium">Product {i}</h4>
                    <p className="text-sm text-muted-foreground">₹12,500 × 10 units</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹125,000</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button variant="outline">Add More Products</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button onClick={onNext}>
            Next: Branding Options
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function BrandingOptionsStep({ onNext }: { onNext: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Branding Options</CardTitle>
        <CardDescription>
          Add custom branding and packaging options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This is a placeholder for the branding options interface.
            In the full implementation, you would see interactive branding tools with live previews.
          </AlertDescription>
        </Alert>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Logo Placement</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Logo Position</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="front">Front</SelectItem>
                      <SelectItem value="back">Back</SelectItem>
                      <SelectItem value="sleeve">Sleeve</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Logo Size</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (5cm)</SelectItem>
                      <SelectItem value="medium">Medium (10cm)</SelectItem>
                      <SelectItem value="large">Large (15cm)</SelectItem>
                      <SelectItem value="custom">Custom Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Upload Logo</label>
                <div className="mt-1 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <PlusCircle className="mx-auto h-8 w-8 text-muted-foreground/50" />
                    <p className="mt-1 text-sm text-muted-foreground">
                      Drag and drop your logo, or click to browse
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>Text Customization</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Custom Text</label>
                  <Input placeholder="Enter text to be printed" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Font</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arial">Arial</SelectItem>
                        <SelectItem value="times">Times New Roman</SelectItem>
                        <SelectItem value="calibri">Calibri</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Color</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Position</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="front">Front</SelectItem>
                        <SelectItem value="back">Back</SelectItem>
                        <SelectItem value="sleeve">Sleeve</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>Packaging Options</AccordionTrigger>
            <AccordionContent>
              <RadioGroup defaultValue="standard" className="space-y-3">
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="standard" id="standard" />
                  <label htmlFor="standard" className="flex-1">
                    <div className="font-medium">Standard Packaging</div>
                    <div className="text-sm text-muted-foreground">Basic cardboard box with product protection</div>
                  </label>
                  <div className="font-medium">Free</div>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="premium" id="premium" />
                  <label htmlFor="premium" className="flex-1">
                    <div className="font-medium">Premium Gift Box</div>
                    <div className="text-sm text-muted-foreground">Elegant branded box with ribbon</div>
                  </label>
                  <div className="font-medium">₹250/unit</div>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="custom" id="custom" />
                  <label htmlFor="custom" className="flex-1">
                    <div className="font-medium">Luxury Packaging</div>
                    <div className="text-sm text-muted-foreground">Handcrafted wooden box with custom engraving</div>
                  </label>
                  <div className="font-medium">₹750/unit</div>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="rounded-lg border overflow-hidden">
          <div className="bg-muted px-4 py-3 font-medium">Branding Preview</div>
          <div className="p-4 flex justify-center">
            <div className="bg-muted/30 p-8 text-center rounded-lg">
              <p className="text-sm text-muted-foreground mb-4">Interactive 3D preview would appear here</p>
              <div className="bg-muted aspect-video w-full max-w-md rounded"></div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={onNext}>
          Next: Pricing & Discounts
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function PricingDiscountsStep({ onNext }: { onNext: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing & Discounts</CardTitle>
        <CardDescription>
          Set final pricing, discounts and payment terms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This is a placeholder for the pricing and discounts interface.
            In the full implementation, you would see dynamic pricing calculations and discount options.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium">Discounts</h3>
            
            <div>
              <label className="text-sm font-medium">Discount Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select discount type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage Discount</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                  <SelectItem value="bulk">Bulk Pricing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Discount Value</label>
              <Input type="number" placeholder="Enter value" />
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">AI Pricing Recommendations</h4>
              <p className="text-sm text-muted-foreground">
                Based on this client's profile and order size, we recommend:
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• 10% volume discount (typical for this order size)</li>
                <li>• Free premium packaging (increases conversion rate)</li>
                <li>• 30-day payment terms (aligns with client history)</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Payment Terms</h3>
            
            <div>
              <label className="text-sm font-medium">Payment Schedule</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full payment upfront</SelectItem>
                  <SelectItem value="50-50">50% advance, 50% on delivery</SelectItem>
                  <SelectItem value="30-days">Net 30 days</SelectItem>
                  <SelectItem value="custom">Custom terms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Proposal Validity</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select validity period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 days</SelectItem>
                  <SelectItem value="15days">15 days</SelectItem>
                  <SelectItem value="30days">30 days</SelectItem>
                  <SelectItem value="custom">Custom period</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Additional Terms (Optional)</label>
              <Textarea placeholder="Enter any additional terms or conditions" />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="bg-muted/10 border rounded-lg p-4">
          <h3 className="font-medium mb-4">Price Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Products Subtotal</span>
              <span>₹375,000</span>
            </div>
            <div className="flex justify-between">
              <span>Branding Cost</span>
              <span>₹15,000</span>
            </div>
            <div className="flex justify-between">
              <span>Packaging Cost</span>
              <span>₹7,500</span>
            </div>
            <div className="flex justify-between">
              <span>Discount (10%)</span>
              <span className="text-red-500">-₹37,500</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>₹360,000</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (18% GST)</span>
              <span>₹64,800</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹424,800</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={onNext}>
          Next: Preview & Send
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProposalPreviewStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Proposal Preview</CardTitle>
        <CardDescription>
          Review your proposal before sending it to the client
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This is a placeholder for the proposal preview.
            In the full implementation, you would see a complete formatted preview of the proposal.
          </AlertDescription>
        </Alert>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted px-4 py-3 font-medium">Preview</div>
          <div className="p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-sm border rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">TechCorp Holiday Gift Kit</h2>
                <p className="text-sm text-muted-foreground">Proposal for TechCorp Inc.</p>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">From</h3>
                    <p className="font-medium">Your Company Name</p>
                    <p className="text-sm">your@email.com</p>
                    <p className="text-sm">+91 12345 67890</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">To</h3>
                    <p className="font-medium">TechCorp Inc.</p>
                    <p className="text-sm">client@techcorp.com</p>
                    <p className="text-sm">+91 98765 43210</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-b">
                <h3 className="font-medium mb-4">Proposed Items</h3>
                <table className="w-full text-sm">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="text-left p-2">Item</th>
                      <th className="text-right p-2">Qty</th>
                      <th className="text-right p-2">Unit Price</th>
                      <th className="text-right p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-2">Premium Gift Box</td>
                      <td className="text-right p-2">30</td>
                      <td className="text-right p-2">₹5,000</td>
                      <td className="text-right p-2">₹150,000</td>
                    </tr>
                    <tr>
                      <td className="p-2">Custom Water Bottle</td>
                      <td className="text-right p-2">30</td>
                      <td className="text-right p-2">₹1,500</td>
                      <td className="text-right p-2">₹45,000</td>
                    </tr>
                    <tr>
                      <td className="p-2">Branded Notebook</td>
                      <td className="text-right p-2">30</td>
                      <td className="text-right p-2">₹800</td>
                      <td className="text-right p-2">₹24,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="p-6 border-b">
                <h3 className="font-medium mb-4">Pricing</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Products Subtotal</span>
                    <span>₹219,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Branding</span>
                    <span>₹15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Premium Packaging</span>
                    <span>₹7,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount (10%)</span>
                    <span className="text-red-500">-₹21,900</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span>₹219,600</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18% GST)</span>
                    <span>₹39,528</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹259,128</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-medium mb-4">Terms & Conditions</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Payment Terms: 50% advance, 50% upon delivery</li>
                  <li>Delivery Timeline: 3 weeks from order confirmation</li>
                  <li>Proposal Valid Until: June 21, 2025</li>
                  <li>Free delivery for orders above ₹200,000</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Email Message</h3>
          <Textarea 
            className="min-h-[150px]"
            defaultValue="Dear Client,

I'm pleased to present our proposal for the TechCorp Holiday Gift Kit as discussed. The attached proposal includes all the custom branding options we talked about, with premium packaging included at the discounted rate.

Please review the proposal and let me know if you have any questions or would like any adjustments made.

Looking forward to your feedback!

Best regards,
Your Name"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button variant="outline">Download PDF</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Preview</Button>
          <Button>Send Proposal</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
