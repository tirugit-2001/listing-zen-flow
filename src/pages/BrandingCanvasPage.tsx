
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import BrandingCanvas from "@/components/BrandingCanvas";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories, Category } from "@/lib/schema";
import { Badge } from "@/components/ui/badge";
import { BrandingZone } from "@/lib/product-form-schema";
import { AlertCircle, Info, Save } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";

export default function BrandingCanvasPage() {
  const [category, setCategory] = useState<Category>("bottles");
  const [productImage, setProductImage] = useState<string>("/placeholder.svg");
  const [mode, setMode] = useState<"wyshkit" | "basecamp" | "crosslisting">("wyshkit");
  const [savedZones, setSavedZones] = useState<BrandingZone[]>([]);
  const [isTemplateMode, setIsTemplateMode] = useState<boolean>(false);
  const [placeholderOptions] = useState([
    { label: "Bottle", url: "https://images.unsplash.com/photo-1581093587793-9a64230a0eaa" },
    { label: "T-Shirt", url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27" },
    { label: "Diary", url: "https://images.unsplash.com/photo-1589454292599-bf103f59fb6e" },
    { label: "Mug", url: "https://images.unsplash.com/photo-1577716043849-8a18f91a38cc" }
  ]);
  
  // Handle saving branding zones
  const handleSaveZones = (zones: BrandingZone[]) => {
    setSavedZones(zones);
    toast({
      title: "Branding zones saved",
      description: `${zones.length} branding zones have been saved for this product.`
    });
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Branding Canvas</h1>
              <p className="text-muted-foreground">
                Add branding zones and preview branding methods on your products
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Tabs 
                defaultValue="wyshkit" 
                className="w-[400px]"
                onValueChange={(value) => setMode(value as "wyshkit" | "basecamp" | "crosslisting")}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="wyshkit">WyshKit</TabsTrigger>
                  <TabsTrigger value="basecamp">BaseCampMart</TabsTrigger>
                  <TabsTrigger value="crosslisting">Cross-listing</TabsTrigger>
                </TabsList>
                <TabsContent value="wyshkit">
                  <Card>
                    <CardContent className="pt-4">
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Define branding zones for standard WyshKit products.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="basecamp">
                  <Card>
                    <CardContent className="pt-4">
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Define branding zones for BaseCampMart exclusive products.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="crosslisting">
                  <Card>
                    <CardContent className="pt-4">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Cross-listing mode for CGCs adding branding to existing products.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Select your product category and upload images</CardDescription>
            </CardHeader>
            <CardContent className="p-4 flex flex-wrap items-center gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Category</label>
                <Select 
                  defaultValue={category} 
                  onValueChange={(value) => setCategory(value as Category)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter(cat => cat !== "digital_products")
                      .map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-grow">
                <label className="text-sm font-medium mb-1.5 block">Product Image</label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Image URL" 
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                  />
                  <Select
                    onValueChange={(url) => setProductImage(url)}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Templates" />
                    </SelectTrigger>
                    <SelectContent>
                      {placeholderOptions.map((option) => (
                        <SelectItem key={option.url} value={option.url}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-2 flex items-center w-full">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => setIsTemplateMode(!isTemplateMode)}
                  >
                    {isTemplateMode ? "Exit Template Mode" : "Save as Template"}
                  </Button>
                  
                  {isTemplateMode && (
                    <Badge variant="outline" className="ml-2">Template Mode Active</Badge>
                  )}
                </div>
                
                {mode === "crosslisting" && (
                  <Alert className="ml-auto w-auto">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      In cross-listing mode, only branding-related changes are allowed
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t">
              <div className="text-sm text-muted-foreground">
                {savedZones.length > 0 ? (
                  <span>
                    {savedZones.length} branding zone{savedZones.length !== 1 ? 's' : ''} defined
                  </span>
                ) : (
                  <span>No branding zones defined yet</span>
                )}
              </div>
              <Button 
                className="ml-auto" 
                size="sm"
                disabled={savedZones.length === 0}
                onClick={() => {
                  toast({
                    title: "Branding configuration saved",
                    description: `${savedZones.length} branding zones saved to the product listing.`,
                  });
                }}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
            </CardFooter>
          </Card>
          
          <BrandingCanvas 
            category={category} 
            initialImage={productImage}
            isCrossListing={mode === "crosslisting"} 
            isTemplateMode={isTemplateMode}
            onSaveZones={handleSaveZones}
          />
        </div>
      </div>
    </Layout>
  );
}
