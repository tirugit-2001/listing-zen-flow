
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ProductList from "@/components/product/ProductList";
import BulkImport from "@/components/product/BulkImport";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, Category } from "@/lib/schema";
import { Link } from "react-router-dom";
import { PlusCircle, Filter, Search, Download, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showBulkImport, setShowBulkImport] = useState(false);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowBulkImport(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Bulk Import
              </Button>
              <Button asChild size="sm">
                <Link to="/add-product">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Product
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select 
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <ProductList />
          
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                1
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                2
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Import Dialog */}
      <Dialog open={showBulkImport} onOpenChange={setShowBulkImport}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Bulk Import Products</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => setShowBulkImport(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Import multiple products at once using a CSV, XLS, or XLSX file
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="upload" className="mt-4">
            <TabsList className="mb-4">
              <TabsTrigger value="upload">Upload File</TabsTrigger>
              <TabsTrigger value="template">Download Template</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <BulkImport />
            </TabsContent>

            <TabsContent value="template">
              <div className="space-y-4 p-4">
                <p>Download a template file to help you prepare your data for bulk import.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 flex flex-col gap-2">
                    <h3 className="font-medium">Physical Products Template</h3>
                    <p className="text-sm text-muted-foreground">For bottles, apparel, diaries, etc.</p>
                    <Button variant="outline" className="mt-2">
                      <Download className="h-4 w-4 mr-2" />
                      Download CSV
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-4 flex flex-col gap-2">
                    <h3 className="font-medium">Digital Products Template</h3>
                    <p className="text-sm text-muted-foreground">For software, e-books, courses, etc.</p>
                    <Button variant="outline" className="mt-2">
                      <Download className="h-4 w-4 mr-2" />
                      Download CSV
                    </Button>
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-md p-4 mt-6">
                  <h3 className="font-medium mb-2">Template Instructions</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Fill in all required fields (marked with an asterisk *)</li>
                    <li>Use image URLs that are at least 1000×1000px resolution</li>
                    <li>Include certification information for regulated categories</li>
                    <li>Add GST details for proper invoice generation</li>
                    <li>Save the file as CSV (UTF-8 encoding) or Excel format</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
