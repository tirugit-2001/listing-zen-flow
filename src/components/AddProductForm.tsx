
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImagePlus, RefreshCw, Check, Upload, Calendar, Brain } from "lucide-react";
import { categories, subcategories, productNature, Category } from "@/lib/schema";
import { mockApi, GPTSuggestion } from "@/lib/mock-api";

export default function AddProductForm() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("core");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<Category | "">("");
  const [subcategory, setSubcategory] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [brandingAvailable, setBrandingAvailable] = useState(false);
  const [certificationRequired, setCertificationRequired] = useState(false);
  const [isDigital, setIsDigital] = useState(false);
  const [images, setImages] = useState<string[]>(["/placeholder.svg"]);
  const [suggestions, setSuggestions] = useState<Record<string, GPTSuggestion[]>>({});
  const [isGettingSuggestions, setIsGettingSuggestions] = useState(false);
  
  const handleCategoryChange = (value: string) => {
    const selectedCategory = value as Category;
    setCategory(selectedCategory);
    setSubcategory("");
    
    // Set product nature based on selected category
    if (selectedCategory && productNature[selectedCategory] === "digital") {
      setIsDigital(true);
    } else {
      setIsDigital(false);
    }
  };
  
  const handleAddFeature = () => {
    if (newFeature.trim() === "") return;
    
    setFeatures([...features, newFeature]);
    setNewFeature("");
  };
  
  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };
  
  const handleGetSuggestions = async (field: string) => {
    setIsGettingSuggestions(true);
    
    try {
      let prompt = "";
      
      switch (field) {
        case "productName":
          prompt = `Suggest a product name for a ${category || "product"} in the ${subcategory || "general"} subcategory`;
          break;
        case "description":
          prompt = `Write a product description for ${productName || `a ${category || "product"}`} in the ${subcategory || "general"} subcategory`;
          break;
        case "features":
          prompt = `List 5 key features for ${productName || `a ${category || "product"}`} in the ${subcategory || "general"} subcategory`;
          break;
        default:
          prompt = `Provide suggestions for ${field} for a ${category || "product"}`;
      }
      
      const suggestionsData = await mockApi.fetchGPTSuggestions(prompt, field);
      
      setSuggestions({
        ...suggestions,
        [field]: suggestionsData
      });
      
      toast({
        title: "AI Suggestions Ready",
        description: `We've generated suggestions for ${field}`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get AI suggestions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGettingSuggestions(false);
    }
  };
  
  const handleApplySuggestion = (field: string, suggestion: string) => {
    switch (field) {
      case "productName":
        setProductName(suggestion);
        break;
      case "description":
        setDescription(suggestion);
        break;
      case "features":
        // This would split the suggestion if it's a comma-separated list
        const featureItems = suggestion.split(',').map(f => f.trim());
        if (featureItems.length > 1) {
          setFeatures([...features, ...featureItems]);
        } else {
          setFeatures([...features, suggestion]);
        }
        break;
    }
    
    toast({
      title: "Suggestion Applied",
      description: `The AI suggestion for ${field} has been applied.`,
    });
  };
  
  const handleDetectCategory = async () => {
    if (images.length === 0) {
      toast({
        title: "No Image Available",
        description: "Please upload an image first to detect category.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await mockApi.detectCategory(images[0]);
      
      setCategory(result.category as Category);
      
      toast({
        title: "Category Detected",
        description: `Detected category: ${result.category} (${Math.round(result.confidence * 100)}% confidence)`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to detect category. Please select manually.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = () => {
    if (!productName || !category || !subcategory) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Product Added",
        description: "Your product has been added successfully!",
      });
      
      // Reset form or redirect
    }, 1500);
  };
  
  const renderTabButton = (value: string, label: string, icon?: React.ReactNode) => (
    <TabsTrigger value={value} className="flex items-center gap-2">
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </TabsTrigger>
  );
  
  return (
    <div className="container py-8 max-w-5xl">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground">
            Create a new product listing with AI-assisted suggestions
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 md:grid-cols-5">
            {renderTabButton("core", "Core Details", <span>1</span>)}
            {renderTabButton("ai", "AI Insights", <Brain className="h-4 w-4" />)}
            {renderTabButton("logistics", "Logistics", <span>3</span>)}
            {!isDigital && renderTabButton("branding", "Branding", <span>4</span>)}
            {renderTabButton("category", "Category", <span>{isDigital ? "4" : "5"}</span>)}
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="core">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Core Product Details</h2>
                
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <FormItem>
                        <FormLabel>Product Images <span className="text-red-500">*</span></FormLabel>
                        <div className="grid grid-cols-2 gap-4">
                          {images.map((image, index) => (
                            <div 
                              key={index} 
                              className="border rounded-md aspect-square overflow-hidden relative group"
                            >
                              <img 
                                src={image} 
                                alt={`Product image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button size="sm" variant="ghost" className="text-white">
                                  <Upload className="h-4 w-4 mr-2" />
                                  Replace
                                </Button>
                              </div>
                            </div>
                          ))}
                          
                          <div className="border border-dashed rounded-md aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                            <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                            <span className="text-sm text-muted-foreground">
                              Add Image
                            </span>
                          </div>
                        </div>
                        <FormDescription>
                          Upload product images (JPEG/PNG, min 1000x1000px)
                        </FormDescription>
                      </FormItem>
                    </div>
                    
                    <div className="space-y-6">
                      <FormItem>
                        <FormLabel>Product Name <span className="text-red-500">*</span></FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input 
                              placeholder="Enter product name" 
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                            />
                          </FormControl>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleGetSuggestions("productName")}
                            disabled={isGettingSuggestions}
                          >
                            {isGettingSuggestions ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Brain className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        {suggestions.productName && (
                          <div className="mt-2">
                            <p className="text-xs text-muted-foreground mb-1">AI Suggestions:</p>
                            <div className="flex flex-wrap gap-2">
                              {suggestions.productName.map((suggestion, index) => (
                                <Badge 
                                  key={index}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-primary/10 flex items-center gap-1"
                                  onClick={() => handleApplySuggestion("productName", suggestion.text)}
                                >
                                  {suggestion.text}
                                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1">
                                    <Check className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormItem>
                          <FormLabel>Category <span className="text-red-500">*</span></FormLabel>
                          <div className="flex gap-2">
                            <Select value={category} onValueChange={handleCategoryChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((cat) => (
                                  <SelectItem key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={handleDetectCategory}
                              disabled={isLoading || images.length === 0}
                            >
                              {isLoading ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <Brain className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                        
                        <FormItem>
                          <FormLabel>Subcategory <span className="text-red-500">*</span></FormLabel>
                          <Select 
                            value={subcategory} 
                            onValueChange={setSubcategory}
                            disabled={!category}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select subcategory" />
                            </SelectTrigger>
                            <SelectContent>
                              {category && subcategories[category as Category]?.map((sub) => (
                                <SelectItem key={sub} value={sub}>
                                  {sub}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button onClick={() => setActiveTab("ai")}>
                      Next: AI Insights
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">AI-Enhanced Insights</h2>
                
                <div className="grid gap-6">
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Textarea 
                          placeholder="Enter product description" 
                          className="resize-none h-32"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </FormControl>
                      <div>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleGetSuggestions("description")}
                          disabled={isGettingSuggestions}
                        >
                          {isGettingSuggestions ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Brain className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    {suggestions.description && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground mb-1">AI Suggestions:</p>
                        <ScrollArea className="h-32 border rounded-md p-2">
                          {suggestions.description.map((suggestion, index) => (
                            <div 
                              key={index}
                              className="mb-2 p-2 border rounded-md hover:bg-primary/10 cursor-pointer"
                              onClick={() => handleApplySuggestion("description", suggestion.text)}
                            >
                              <div className="flex justify-between items-start">
                                <p className="text-sm">{suggestion.text}</p>
                                <Button variant="ghost" size="icon" className="h-6 w-6 p-1 ml-2 flex-shrink-0">
                                  <Check className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </ScrollArea>
                      </div>
                    )}
                  </FormItem>
                  
                  <FormItem>
                    <FormLabel>Product Features</FormLabel>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a product feature"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddFeature();
                            }
                          }}
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleAddFeature}
                        >
                          Add
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleGetSuggestions("features")}
                          disabled={isGettingSuggestions}
                        >
                          {isGettingSuggestions ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Brain className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      
                      {features.length > 0 && (
                        <div className="border rounded-md p-3">
                          <ul className="space-y-2">
                            {features.map((feature, index) => (
                              <li key={index} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <span className="mr-2">•</span>
                                  <span>{feature}</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleRemoveFeature(index)}
                                  className="h-6 w-6"
                                >
                                  <span className="sr-only">Remove</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {suggestions.features && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground mb-1">AI Suggestions:</p>
                          <div className="flex flex-wrap gap-2">
                            {suggestions.features.map((suggestion, index) => (
                              <Badge 
                                key={index}
                                variant="outline"
                                className="cursor-pointer hover:bg-primary/10 flex items-center gap-1"
                                onClick={() => handleApplySuggestion("features", suggestion.text)}
                              >
                                {suggestion.text}
                                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1">
                                  <Check className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </FormItem>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <Input placeholder="e.g., outdoor, camping, sports" />
                      <FormDescription>
                        Comma-separated tags for better searchability
                      </FormDescription>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>HSN Code</FormLabel>
                      <Input placeholder="Enter HSN code" />
                      <FormDescription>
                        Harmonized System Nomenclature code for your product
                      </FormDescription>
                    </FormItem>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setActiveTab("core")}>
                      Back
                    </Button>
                    <Button onClick={() => setActiveTab("logistics")}>
                      Next: Logistics
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="logistics">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Logistics & Pricing</h2>
                
                {isDigital ? (
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormItem>
                        <FormLabel>Delivery Method <span className="text-red-500">*</span></FormLabel>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select delivery method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="download">Download Link</SelectItem>
                            <SelectItem value="cloud">Cloud Access</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Access URL</FormLabel>
                        <Input placeholder="https://" />
                        <FormDescription>
                          URL where the digital product can be accessed
                        </FormDescription>
                      </FormItem>
                    </div>
                    
                    <FormItem>
                      <FormLabel>Downloadable File</FormLabel>
                      <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                        <p className="font-medium mb-1">Upload File</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          PDF or ZIP file, max 50MB
                        </p>
                        <Button size="sm">Browse Files</Button>
                      </div>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>License Key</FormLabel>
                      <Input placeholder="Enter license key or template" />
                      <FormDescription>
                        Template or actual license key for digital access
                      </FormDescription>
                    </FormItem>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormItem>
                        <FormLabel>Country of Origin <span className="text-red-500">*</span></FormLabel>
                        <Input placeholder="e.g., India" />
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Dimensions <span className="text-red-500">*</span></FormLabel>
                        <Input placeholder="L×B×H (cm)" />
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Weight <span className="text-red-500">*</span></FormLabel>
                        <Input type="number" placeholder="Weight in grams" />
                      </FormItem>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormItem>
                        <FormLabel>Inventory Management <span className="text-red-500">*</span></FormLabel>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Managed by Vendor</SelectItem>
                            <SelectItem value="no">Managed by BaseCampMart</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Pickup Pincode</FormLabel>
                        <Input placeholder="6-digit pincode" />
                      </FormItem>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormItem>
                        <FormLabel>Minimum Order Quantity <span className="text-red-500">*</span></FormLabel>
                        <Input type="number" placeholder="MOQ" min="1" />
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Sample Price <span className="text-red-500">*</span></FormLabel>
                        <Input placeholder="Price in ₹" />
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Dispatch SLA <span className="text-red-500">*</span></FormLabel>
                        <Input type="number" placeholder="Days" min="1" />
                      </FormItem>
                    </div>
                    
                    <FormItem>
                      <FormLabel>Tiered Pricing <span className="text-red-500">*</span></FormLabel>
                      <div className="border rounded-md p-4">
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <div>
                            <label className="text-xs text-muted-foreground">Quantity Range</label>
                            <Input placeholder="e.g., 1-99" />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Price (₹)</label>
                            <Input placeholder="e.g., 499" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <div>
                            <Input placeholder="e.g., 100-499" />
                          </div>
                          <div>
                            <Input placeholder="e.g., 450" />
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Tier
                        </Button>
                      </div>
                    </FormItem>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormItem>
                        <FormLabel>Lead Time <span className="text-red-500">*</span></FormLabel>
                        <Input placeholder="e.g., 3-5 days for 1-99 units" />
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Pricing Validity <span className="text-red-500">*</span></FormLabel>
                        <div className="flex">
                          <Input type="date" />
                          <Button variant="outline" size="icon" className="ml-2">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormItem>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={() => setActiveTab("ai")}>
                    Back
                  </Button>
                  <Button onClick={() => setActiveTab(isDigital ? "category" : "branding")}>
                    {isDigital ? "Next: Category Details" : "Next: Branding"}
                  </Button>
                </div>
              </Card>
            </TabsContent>
            
            {!isDigital && (
              <TabsContent value="branding">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Branding Options</h2>
                  
                  <div className="grid gap-6">
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Branding Available</FormLabel>
                        <FormDescription>
                          Enable if this product can be branded with logos
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={brandingAvailable}
                          onCheckedChange={setBrandingAvailable}
                        />
                      </FormControl>
                    </FormItem>
                    
                    {brandingAvailable && (
                      <div className="space-y-4">
                        <FormItem>
                          <FormLabel>Branding Methods</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {category && brandingMethods && (
                              <>
                                <label className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                                  <input type="checkbox" className="rounded" />
                                  <span>UV Print</span>
                                </label>
                                <label className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                                  <input type="checkbox" className="rounded" />
                                  <span>Screen</span>
                                </label>
                                <label className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                                  <input type="checkbox" className="rounded" />
                                  <span>Embroidery</span>
                                </label>
                                <label className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                                  <input type="checkbox" className="rounded" />
                                  <span>Sticker</span>
                                </label>
                                <label className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                                  <input type="checkbox" className="rounded" />
                                  <span>Foil</span>
                                </label>
                                <label className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                                  <input type="checkbox" className="rounded" />
                                  <span>Laser</span>
                                </label>
                              </>
                            )}
                          </div>
                        </FormItem>
                        
                        <div className="bg-brand-yellow/10 border-brand-yellow border rounded-md p-4">
                          <h3 className="font-medium flex items-center mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-5 w-5 mr-2 text-brand-yellow"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                              />
                            </svg>
                            Branding Zone Definition
                          </h3>
                          <p className="text-sm mb-4">
                            Use our interactive Branding Canvas to define zones and preview branding methods on your product.
                          </p>
                          <Button variant="secondary">
                            Open Branding Canvas
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Certification Required</FormLabel>
                        <FormDescription>
                          Enable if this product requires certification
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={certificationRequired}
                          onCheckedChange={setCertificationRequired}
                        />
                      </FormControl>
                    </FormItem>
                    
                    {certificationRequired && (
                      <div className="space-y-4">
                        <FormItem>
                          <FormLabel>Certificate Type</FormLabel>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select certificate type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="iso">ISO</SelectItem>
                              <SelectItem value="fssai">FSSAI</SelectItem>
                              <SelectItem value="bis">BIS</SelectItem>
                              <SelectItem value="rohs">RoHS</SelectItem>
                              <SelectItem value="ce">CE</SelectItem>
                              <SelectItem value="fda">FDA</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                        
                        <FormItem>
                          <FormLabel>Certificate Upload</FormLabel>
                          <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm font-medium mb-1">Upload Certificate</p>
                            <p className="text-xs text-muted-foreground mb-3">
                              PDF format, max 10MB
                            </p>
                            <Button size="sm" variant="outline">Browse Files</Button>
                          </div>
                        </FormItem>
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setActiveTab("logistics")}>
                        Back
                      </Button>
                      <Button onClick={() => setActiveTab("category")}>
                        Next: Category Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            )}
            
            <TabsContent value="category">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Category-Specific Details</h2>
                
                {category === "bottles" && (
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormItem>
                        <FormLabel>Material <span className="text-red-500">*</span></FormLabel>
                        <Select defaultValue="stainless">
                          <SelectTrigger>
                            <SelectValue placeholder="Select material" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="stainless">Stainless Steel</SelectItem>
                            <SelectItem value="plastic">Plastic</SelectItem>
                            <SelectItem value="glass">Glass</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Capacity <span className="text-red-500">*</span></FormLabel>
                        <Select defaultValue="500">
                          <SelectTrigger>
                            <SelectValue placeholder="Select capacity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="250">250 ml</SelectItem>
                            <SelectItem value="500">500 ml</SelectItem>
                            <SelectItem value="750">750 ml</SelectItem>
                            <SelectItem value="1000">1000 ml</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Insulation</FormLabel>
                        <Select defaultValue="none">
                          <SelectTrigger>
                            <SelectValue placeholder="Select insulation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single Wall</SelectItem>
                            <SelectItem value="double">Double Wall</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    </div>
                  </div>
                )}
                
                {category === "apparel" && (
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormItem>
                        <FormLabel>Material <span className="text-red-500">*</span></FormLabel>
                        <Select defaultValue="cotton">
                          <SelectTrigger>
                            <SelectValue placeholder="Select material" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cotton">Cotton</SelectItem>
                            <SelectItem value="polyester">Polyester</SelectItem>
                            <SelectItem value="blend">Blend</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                      
                      <div>
                        <FormLabel>Sizes <span className="text-red-500">*</span></FormLabel>
                        <div className="grid grid-cols-3 gap-2">
                          <label className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                            <input type="checkbox" className="rounded" />
                            <span>XS</span>
                          </label>
                          <label className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                            <input type="checkbox" className="rounded" />
                            <span>S</span>
                          </label>
                          <label className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                            <input type="checkbox" className="rounded" />
                            <span>M</span>
                          </label>
                          <label className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                            <input type="checkbox" className="rounded" />
                            <span>L</span>
                          </label>
                          <label className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                            <input type="checkbox" className="rounded" />
                            <span>XL</span>
                          </label>
                          <label className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                            <input type="checkbox" className="rounded" />
                            <span>XXL</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {category === "diaries" && (
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormItem>
                        <FormLabel>Cover Type <span className="text-red-500">*</span></FormLabel>
                        <Select defaultValue="hardcover">
                          <SelectTrigger>
                            <SelectValue placeholder="Select cover type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hardcover">Hardcover</SelectItem>
                            <SelectItem value="softcover">Softcover</SelectItem>
                            <SelectItem value="leather">Leather</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Page Count <span className="text-red-500">*</span></FormLabel>
                        <Select defaultValue="200">
                          <SelectTrigger>
                            <SelectValue placeholder="Select page count" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100">100 pages</SelectItem>
                            <SelectItem value="200">200 pages</SelectItem>
                            <SelectItem value="300">300 pages</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    </div>
                  </div>
                )}
                
                {category === "digital_products" && (
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormItem>
                        <FormLabel>File Format <span className="text-red-500">*</span></FormLabel>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select file format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="zip">ZIP</SelectItem>
                            <SelectItem value="mp4">MP4</SelectItem>
                            <SelectItem value="exe">EXE</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Version</FormLabel>
                        <Input placeholder="e.g., 1.0.0" />
                      </FormItem>
                    </div>
                  </div>
                )}
                
                {!category && (
                  <div className="py-8 text-center text-muted-foreground">
                    <p>Please select a category in the Core Details step first.</p>
                  </div>
                )}
                
                <div className="flex justify-end gap-2 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab(isDigital ? "logistics" : "branding")}
                  >
                    Back
                  </Button>
                  <Button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Product"
                    )}
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
