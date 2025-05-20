import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Category, categories, subcategories, brandingMethods, gstRates } from "@/lib/schema";
import { 
  getFullProductSchema, 
  getInitialValues, 
  getFormSections, 
  ProductFormValues, 
  BrandingZone
} from "@/lib/product-form-schema";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ImageUploader } from "@/components/product/ImageUploader";
import { BrandingZoneEditor } from "@/components/product/BrandingZoneEditor";

export default function AddProductForm() {
  const [category, setCategory] = useState<Category>("bottles");
  const [activeTab, setActiveTab] = useState("core");
  const [isCrossListed, setIsCrossListed] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [productType, setProductType] = useState<"Physical" | "Digital" | "Combo" | "Hamper">("Physical");

  // Initialize form with schema based on selected category
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(getFullProductSchema(category)),
    defaultValues: getInitialValues(category),
    mode: "onChange",
  });
  
  const { watch, setValue, getValues, control, formState } = form;
  
  // Watch key fields for conditional logic
  const watchBrandingAvailable = watch("brandingAvailable");
  const watchProductImages = watch("productImages");
  const watchCategory = watch("category") as Category;
  const watchPricingModel = watch("pricingModel");
  const watchInsertCompatible = watch("insertCompatible");
  const watchCertificationRequired = watch("certificationRequired");
  
  // Effect to update subcategory when category changes
  const onCategoryChange = (newCategory: string) => {
    setCategory(newCategory as Category);
    
    // Reset subcategory
    if (subcategories[newCategory as Category]) {
      setValue("subcategory", subcategories[newCategory as Category][0]);
    }
    
    // Reset branding methods based on new category
    if (brandingMethods[newCategory as Category]) {
      setValue("brandingMethods", []);
    }
    
    // Update category-specific fields with default values
    setValue("categorySpecific", getInitialValues(newCategory as Category).categorySpecific);
  };
  
  // Calculate GST amount based on price and rate
  const calculateTotalWithGST = (basePrice: number, gstRate: number) => {
    return basePrice * (1 + gstRate / 100);
  };
  
  const onBasePriceChange = (value: number) => {
    const gstRate = getValues("gstRate");
    setValue("totalPriceWithGST", calculateTotalWithGST(value, gstRate));
  };
  
  const onGSTRateChange = (value: number) => {
    const basePrice = getValues("basePriceWithoutGST");
    setValue("totalPriceWithGST", calculateTotalWithGST(basePrice, value));
  };
  
  // Handle form submission
  const onSubmit = (data: ProductFormValues) => {
    // In a real app, you'd send this to an API
    console.log("Form submitted:", data);
    
    // Validation checks
    if (data.brandingAvailable === "Yes" && (!data.brandingMethods || data.brandingMethods.length === 0)) {
      toast.error("Please select at least one branding method");
      return;
    }
    
    if (watchProductImages.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }
    
    // A/B test insights: MRP + GST + branding logic enforcement
    if (data.brandingAvailable === "Yes" && data.brandingCost) {
      const totalCost = data.basePriceWithoutGST + data.brandingCost;
      if (totalCost > data.totalPriceWithGST) {
        toast.error("Total cost (base price + branding) exceeds the MRP");
        return;
      }
    }
    
    toast.success("Product added successfully!");
    // Reset form or redirect
  };
  
  // Get sections based on current category and cross-listing status
  const formSections = getFormSections(category, isCrossListed);
  
  // Navigate to the next tab
  const goToNextTab = () => {
    const currentSectionIndex = formSections.findIndex(section => section.id === activeTab);
    if (currentSectionIndex < formSections.length - 1) {
      setActiveTab(formSections[currentSectionIndex + 1].id);
    }
  };
  
  // Navigate to the previous tab
  const goToPrevTab = () => {
    const currentSectionIndex = formSections.findIndex(section => section.id === activeTab);
    if (currentSectionIndex > 0) {
      setActiveTab(formSections[currentSectionIndex - 1].id);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar navigation */}
          <div className="lg:w-64">
            <div className="sticky top-6">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-1">
                  {formSections.map((section) => (
                    <Button
                      key={section.id}
                      type="button"
                      variant={activeTab === section.id ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start text-left",
                        section.disabled && "opacity-50 cursor-not-allowed"
                      )}
                      disabled={section.disabled}
                      onClick={() => setActiveTab(section.id)}
                    >
                      {section.title}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="hidden">
                {formSections.map((section) => (
                  <TabsTrigger key={section.id} value={section.id}>
                    {section.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Core fields section */}
              <TabsContent value="core" className="space-y-6 mt-0">
                <div className="grid gap-6">
                  {/* Product Type Selection */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <FormLabel>Product Type</FormLabel>
                        <RadioGroup
                          value={productType}
                          onValueChange={(value) => setProductType(value as typeof productType)}
                          className="flex flex-wrap gap-4"
                        >
                          {["Physical", "Digital", "Combo", "Hamper"].map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <RadioGroupItem value={type} id={`type-${type}`} />
                              <FormLabel htmlFor={`type-${type}`} className="font-normal">
                                {type}
                              </FormLabel>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Cross-listing toggle */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <FormLabel>Cross-Listing Mode</FormLabel>
                          <FormDescription>
                            Enable if you're listing a product from another vendor
                          </FormDescription>
                        </div>
                        <Switch
                          checked={isCrossListed}
                          onCheckedChange={setIsCrossListed}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Basic Details */}
                  <Card>
                    <CardContent className="pt-6 grid gap-4">
                      <FormField
                        control={form.control}
                        name="productName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter product name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select
                                disabled={isCrossListed}
                                value={field.value}
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  onCategoryChange(value);
                                }}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subcategory"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subcategory</FormLabel>
                              <Select
                                disabled={isCrossListed}
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select subcategory" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {subcategories[watchCategory]?.map((subcat) => (
                                    <SelectItem key={subcat} value={subcat}>
                                      {subcat}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter product description"
                                className="min-h-24"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Describe your product in detail. This will be used for SEO and product pages.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Product Images */}
                  <Card>
                    <CardContent className="pt-6">
                      <FormField
                        control={form.control}
                        name="productImages"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Images</FormLabel>
                            <FormControl>
                              <ImageUploader
                                images={field.value || []}
                                onChange={field.onChange}
                                maxImages={5}
                                minWidth={1000}
                                minHeight={1000}
                              />
                            </FormControl>
                            <FormDescription>
                              Upload studio-quality product images with white background.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end">
                  <Button type="button" onClick={goToNextTab}>
                    Next: Category Details
                  </Button>
                </div>
              </TabsContent>
              
              {/* Category-specific fields */}
              <TabsContent value="categorySpecific" className="space-y-6 mt-0">
                <Card>
                  <CardContent className="pt-6">
                    {category === "bottles" && (
                      <div className="grid gap-4">
                        <FormField
                          control={form.control}
                          name="categorySpecific.material"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Material</FormLabel>
                              <Select
                                disabled={isCrossListed}
                                value={field.value as string}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select material" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {["Stainless Steel", "Plastic", "Glass"].map((material) => (
                                    <SelectItem key={material} value={material}>
                                      {material}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="categorySpecific.capacity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Capacity (ml)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Capacity in ml"
                                  value={field.value as number}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="categorySpecific.insulation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Insulation</FormLabel>
                              <Select
                                disabled={isCrossListed}
                                value={field.value as string}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select insulation type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {["Single Wall", "Double Wall", "None"].map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {category === "apparel" && (
                      <div className="grid gap-4">
                        <FormField
                          control={form.control}
                          name="categorySpecific.material"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Material</FormLabel>
                              <Select
                                disabled={isCrossListed}
                                value={field.value as string}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select material" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {["Cotton", "Polyester", "Blend"].map((material) => (
                                    <SelectItem key={material} value={material}>
                                      {material}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Size checkboxes would be implemented here */}
                      </div>
                    )}
                    
                    {category === "diaries" && (
                      <div className="grid gap-4">
                        <FormField
                          control={form.control}
                          name="categorySpecific.coverType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cover Type</FormLabel>
                              <Select
                                disabled={isCrossListed}
                                value={field.value as string}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select cover type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {["Hardcover", "Softcover", "Leather"].map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="categorySpecific.pageCount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Page Count</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Number of pages"
                                  value={field.value as number}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Other category-specific fields would be added here */}
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPrevTab}>
                    Back
                  </Button>
                  <Button type="button" onClick={goToNextTab}>
                    Next: Pricing
                  </Button>
                </div>
              </TabsContent>
              
              {/* Pricing Section */}
              <TabsContent value="pricing" className="space-y-6 mt-0">
                <Card>
                  <CardContent className="pt-6 grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="basePriceWithoutGST"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Base Price (without GST)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0.00"
                                {...field}
                                onChange={(e) => {
                                  const value = Number(e.target.value);
                                  field.onChange(value);
                                  onBasePriceChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="gstRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GST Rate (%)</FormLabel>
                            <Select
                              disabled={isCrossListed}
                              value={field.value.toString()}
                              onValueChange={(value) => {
                                const numValue = Number(value);
                                field.onChange(numValue);
                                onGSTRateChange(numValue);
                              }}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select GST rate" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {gstRates.map((rate) => (
                                  <SelectItem key={rate} value={rate.toString()}>
                                    {rate}%
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="totalPriceWithGST"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>MRP (with GST)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0.00"
                                {...field}
                                readOnly
                              />
                            </FormControl>
                            <FormDescription>
                              Auto-calculated based on base price and GST rate
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="moq"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Order Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="1"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="samplePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sample Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0.00"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Price for a single sample unit (optional)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="pricingModel"
                      render={({ field }) => (
                        <FormItem>
                          <div className="mb-2">
                            <FormLabel>Pricing Model</FormLabel>
                          </div>
                          <FormControl>
                            <RadioGroup
                              disabled={isCrossListed}
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Flat" id="flat" />
                                <FormLabel htmlFor="flat" className="font-normal">Flat Price</FormLabel>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Tiered" id="tiered" />
                                <FormLabel htmlFor="tiered" className="font-normal">Tiered Pricing</FormLabel>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {watchPricingModel === "Tiered" && (
                      <div className="space-y-4">
                        <FormLabel>Tiered Pricing</FormLabel>
                        <div className="space-y-2">
                          {/* Tiered pricing controls would be implemented here */}
                          <div className="text-sm text-muted-foreground">
                            Tiered pricing implementation would go here
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="leadTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lead Time</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., 7-10 days"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="pricingValidity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pricing Valid Until</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPrevTab}>
                    Back
                  </Button>
                  <Button type="button" onClick={goToNextTab}>
                    Next: Logistics
                  </Button>
                </div>
              </TabsContent>
              
              {/* Logistics Section */}
              <TabsContent value="logistics" className="space-y-6 mt-0">
                <Card>
                  <CardContent className="pt-6 grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight (grams)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Weight in grams"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="dimensions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dimensions (L×B×H in cm)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., 10×5×2"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Format: Length × Breadth × Height
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="dispatchSLA"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dispatch SLA (days)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Days to dispatch"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="countryOfOrigin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country of Origin</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., India"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPrevTab}>
                    Back
                  </Button>
                  <Button type="button" onClick={goToNextTab}>
                    Next: Branding
                  </Button>
                </div>
              </TabsContent>
              
              {/* Branding Section */}
              <TabsContent value="branding" className="space-y-6 mt-0">
                <Card>
                  <CardContent className="pt-6 grid gap-6">
                    <FormField
                      control={form.control}
                      name="brandingAvailable"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <div>
                              <FormLabel>Branding Available</FormLabel>
                              <FormDescription>
                                Can this product be customized with branding?
                              </FormDescription>
                            </div>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Yes" id="branding-yes" />
                                  <FormLabel htmlFor="branding-yes" className="font-normal">Yes</FormLabel>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="No" id="branding-no" />
                                  <FormLabel htmlFor="branding-no" className="font-normal">No</FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {watchBrandingAvailable === "Yes" && (
                      <>
                        <FormField
                          control={form.control}
                          name="brandingMethods"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Branding Methods</FormLabel>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                {brandingMethods[watchCategory]?.map((method) => (
                                  <FormItem
                                    key={method}
                                    className="flex items-center space-x-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={(field.value || []).includes(method)}
                                        onCheckedChange={(checked) => {
                                          const currentValues = field.value || [];
                                          const newValues = checked
                                            ? [...currentValues, method]
                                            : currentValues.filter((value) => value !== method);
                                          field.onChange(newValues);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{method}</FormLabel>
                                  </FormItem>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="brandingCost"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Branding Cost (per unit)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="0.00"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="brandingGstRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Branding GST Rate (%)</FormLabel>
                              <Select
                                value={field.value.toString()}
                                onValueChange={(value) => field.onChange(Number(value))}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select GST rate" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {gstRates.map((rate) => (
                                    <SelectItem key={rate} value={rate.toString()}>
                                      {rate}%
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Default is 18% for most branding services
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {watchProductImages.length > 0 && (
                          <div className="space-y-4">
                            <div>
                              <FormLabel>Branding Zones</FormLabel>
                              <FormDescription>
                                Define areas where branding can be applied to your product
                              </FormDescription>
                            </div>
                            
                            {/* Image selection tabs */}
                            {watchProductImages.length > 1 && (
                              <div className="flex space-x-2 overflow-x-auto pb-2">
                                {watchProductImages.map((img, idx) => (
                                  <Button
                                    key={idx}
                                    type="button"
                                    variant={selectedImageIndex === idx ? "default" : "outline"}
                                    size="sm"
                                    className="flex-shrink-0"
                                    onClick={() => setSelectedImageIndex(idx)}
                                  >
                                    Image {idx + 1}
                                  </Button>
                                ))}
                              </div>
                            )}
                            
                            <FormField
                              control={form.control}
                              name="brandingZones"
                              render={({ field }) => {
                                // Ensure all branding zones have an ID
                                const ensureZonesHaveIds = (zones: Partial<BrandingZone>[]): BrandingZone[] => {
                                  return (zones || []).map((zone) => ({
                                    id: zone.id || uuidv4(),
                                    label: zone.label || "",
                                    x: zone.x || 0,
                                    y: zone.y || 0,
                                    width: zone.width || 100,
                                    height: zone.height || 100,
                                    method: zone.method || "",
                                    logoFile: zone.logoFile,
                                    brandedMockupUrl: zone.brandedMockupUrl,
                                    appliedOn: zone.appliedOn
                                  }));
                                };
                                
                                return (
                                  <FormItem>
                                    <FormControl>
                                      <BrandingZoneEditor
                                        imageUrl={watchProductImages[selectedImageIndex] || ""}
                                        category={watchCategory}
                                        zones={ensureZonesHaveIds(field.value || [])}
                                        onChange={(zones) => {
                                          field.onChange(ensureZonesHaveIds(zones));
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPrevTab}>
                    Back
                  </Button>
                  <Button type="button" onClick={goToNextTab}>
                    Next: Packaging
                  </Button>
                </div>
              </TabsContent>
              
              {/* Packaging Section */}
              <TabsContent value="packaging" className="space-y-6 mt-0">
                <Card>
                  <CardContent className="pt-6 grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="internalPackagingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Internal Packaging Type</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Box, Pouch, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="internalDimensions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Internal Dimensions (L×B×H in cm)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., 10×5×2"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="insertCompatible"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div>
                              <FormLabel>Insert Compatible</FormLabel>
                              <FormDescription>
                                Can this product include marketing inserts?
                              </FormDescription>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {watchInsertCompatible && (
                      <FormField
                        control={form.control}
                        name="insertType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Insert Types</FormLabel>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {["Manual", "Gift Card", "Sticker", "Thank You Note", "Other"].map((type) => (
                                <FormItem
                                  key={type}
                                  className="flex items-center space-x-2"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={(field.value || []).includes(type)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = field.value || [];
                                        const newValues = checked
                                          ? [...currentValues, type]
                                          : currentValues.filter((value) => value !== type);
                                        field.onChange(newValues);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{type}</FormLabel>
                                </FormItem>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="externalPackagingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>External Packaging Type</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Corrugated Box, Mailer"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="externalDimensions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>External Dimensions (L×B×H in cm)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., 15×10×5"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="fragileHandling"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div>
                              <FormLabel>Fragile Handling Required</FormLabel>
                              <FormDescription>
                                Does this product require special handling?
                              </FormDescription>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPrevTab}>
                    Back
                  </Button>
                  <Button type="button" onClick={goToNextTab}>
                    Next: Certification
                  </Button>
                </div>
              </TabsContent>
              
              {/* Certification Section */}
              <TabsContent value="certification" className="space-y-6 mt-0">
                <Card>
                  <CardContent className="pt-6 grid gap-6">
                    <FormField
                      control={form.control}
                      name="certificationRequired"
                      render={({ field }) => (
                        <FormItem>
                          <div className="mb-2">
                            <FormLabel>Certification Required</FormLabel>
                          </div>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="cert-yes" />
                                <FormLabel htmlFor="cert-yes" className="font-normal">Yes</FormLabel>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="cert-no" />
                                <FormLabel htmlFor="cert-no" className="font-normal">No</FormLabel>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {watchCertificationRequired === "Yes" && (
                      <>
                        <FormField
                          control={form.control}
                          name="certificateType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Certificate Type</FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select certificate type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {["ISO", "FSSAI", "BIS", "RoHS", "CE", "FDA", "Other"].map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="certificateUpload"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Upload Certificate</FormLabel>
                              <FormControl>
                                <Input
                                  type="file"
                                  accept=".pdf"
                                  onChange={(e) => {
                                    // In a real app, you'd handle the file upload
                                    if (e.target.files?.[0]) {
                                      field.onChange(e.target.files[0].name);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormDescription>
                                Upload PDF file (max 10MB)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPrevTab}>
                    Back
                  </Button>
                  <Button type="button" onClick={goToNextTab}>
                    Next: Cross-Listing
                  </Button>
                </div>
              </TabsContent>
              
              {/* Cross-Listing Section - Only shown when cross-listing is enabled */}
              <TabsContent value="crossListing" className="space-y-6 mt-0">
                <Card>
                  <CardContent className="pt-6 grid gap-6">
                    <FormField
                      control={form.control}
                      name="originalVendorId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Original Vendor ID</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter vendor ID"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cgcsCustomBranding"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div>
                              <FormLabel>Custom Branding</FormLabel>
                              <FormDescription>
                                Are you offering custom branding on this cross-listed product?
                              </FormDescription>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="crosslistBrandingPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branding Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Your branding service price for this cross-listed product
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPrevTab}>
                    Back
                  </Button>
                  <Button type="submit">
                    Submit Listing
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Final submission button (only shown on the last section if not cross-listing) */}
            {activeTab !== "crossListing" && activeTab === formSections[formSections.length - 1].id && (
              <div className="flex justify-end mt-6">
                <Button type="submit">
                  Submit Listing
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
