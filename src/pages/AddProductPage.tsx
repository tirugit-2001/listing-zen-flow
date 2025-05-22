
import Layout from "@/components/layout/Layout";
import AddProductForm from "@/components/AddProductForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddProductPage() {
  return (
    <Layout>
      <div className="container py-6">
        <Tabs defaultValue="product">
          <TabsList className="mb-4">
            <TabsTrigger value="product" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add Product
            </TabsTrigger>
            <TabsTrigger value="hamper" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Create Hamper
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="product">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Add New Product</CardTitle>
                <CardDescription>
                  Fill out the form below to add a new product to your inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AddProductForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hamper">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create New Hamper</CardTitle>
                <CardDescription>
                  Combine products into a customized gift hamper
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-medium">Create a Custom Hamper</h3>
                    <p className="text-muted-foreground mt-1">
                      Combine your products into attractive gift hampers with custom packaging options.
                    </p>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Card className="overflow-hidden">
                      <div className="aspect-video bg-muted/20 flex items-center justify-center">
                        <Package className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium">Custom Hamper</h4>
                        <p className="text-sm text-muted-foreground mt-1">Create a completely customized hamper with your choice of products</p>
                      </CardContent>
                      <div className="p-4 pt-0">
                        <Button asChild className="w-full">
                          <Link to="/create-hamper">Create Custom Hamper</Link>
                        </Button>
                      </div>
                    </Card>
                    
                    <Card className="overflow-hidden">
                      <div className="aspect-video bg-muted/20 flex items-center justify-center">
                        <Package className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium">Themed Hamper</h4>
                        <p className="text-sm text-muted-foreground mt-1">Create hampers based on popular themes and occasions</p>
                      </CardContent>
                      <div className="p-4 pt-0">
                        <Button asChild variant="outline" className="w-full">
                          <Link to="/create-hamper?template=themed">Create Themed Hamper</Link>
                        </Button>
                      </div>
                    </Card>
                    
                    <Card className="overflow-hidden">
                      <div className="aspect-video bg-muted/20 flex items-center justify-center">
                        <Package className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium">Manage Hampers</h4>
                        <p className="text-sm text-muted-foreground mt-1">View and manage all your created hampers</p>
                      </CardContent>
                      <div className="p-4 pt-0">
                        <Button asChild variant="secondary" className="w-full">
                          <Link to="/hamper-management">View Hampers</Link>
                        </Button>
                      </div>
                    </Card>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Benefits of Creating Hampers</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Increase average order value by bundling related products</li>
                      <li>Create seasonal and themed offerings for special occasions</li>
                      <li>Use cross-listed products to create unique combinations</li>
                      <li>Offer premium packaging options for gifting purposes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
