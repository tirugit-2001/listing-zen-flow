
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import BrandingCanvas from "@/components/BrandingCanvas";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories, Category } from "@/lib/schema";

export default function BrandingCanvasPage() {
  const [category, setCategory] = useState<Category>("bottles");
  const [productImage, setProductImage] = useState<string>("/placeholder.svg");
  const [placeholderOptions] = useState([
    { label: "Bottle", url: "https://images.unsplash.com/photo-1581093587793-9a64230a0eaa" },
    { label: "T-Shirt", url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27" },
    { label: "Diary", url: "https://images.unsplash.com/photo-1589454292599-bf103f59fb6e" },
    { label: "Mug", url: "https://images.unsplash.com/photo-1577716043849-8a18f91a38cc" }
  ]);
  
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
            
            <Card>
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
              </CardContent>
            </Card>
          </div>
          
          <BrandingCanvas category={category} initialImage={productImage} />
        </div>
      </div>
    </Layout>
  );
}
