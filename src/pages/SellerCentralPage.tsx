
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Package, 
  ShoppingCart, 
  FileText, 
  Boxes, 
  Clock, 
  Package as PackageIcon, 
  ArrowRight, 
  Settings, 
  User 
} from "lucide-react";

export default function SellerCentralPage() {
  const [platformMode, setPlatformMode] = useState<"wyshkit" | "basecamp">("wyshkit");

  return (
    <Layout>
      <div className="container py-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Unified Seller Central
              {platformMode === "wyshkit" ? (
                <Badge variant="default" className="ml-2 bg-blue-600">WyshKit</Badge>
              ) : (
                <Badge variant="default" className="ml-2 bg-emerald-600">BaseCampMart</Badge>
              )}
            </h1>
            <p className="text-muted-foreground">Manage your products, orders, and branding across platforms</p>
          </div>

          <Tabs 
            value={platformMode} 
            onValueChange={(value) => setPlatformMode(value as "wyshkit" | "basecamp")}
            className="w-[300px] sm:w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="wyshkit">WyshKit</TabsTrigger>
              <TabsTrigger value="basecamp">BaseCampMart</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Quick Actions</span>
                <Button variant="ghost" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Button asChild variant="outline" className="h-24 flex flex-col">
                  <Link to="/add-product">
                    <Package className="h-6 w-6 mb-1" />
                    <span>Add Product</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-24 flex flex-col">
                  <Link to="/branding-canvas">
                    <FileText className="h-6 w-6 mb-1" />
                    <span>Branding Canvas</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-24 flex flex-col">
                  <Link to="/products">
                    <Boxes className="h-6 w-6 mb-1" />
                    <span>My Products</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-24 flex flex-col">
                  <Link to="#">
                    <ShoppingCart className="h-6 w-6 mb-1" />
                    <span>Orders</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-24 flex flex-col">
                  <Link to="#">
                    <Clock className="h-6 w-6 mb-1" />
                    <span>Proposals</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-24 flex flex-col">
                  <Link to="#">
                    <PackageIcon className="h-6 w-6 mb-1" />
                    <span>Return Gifts</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
              <CardDescription>
                {platformMode === "wyshkit" 
                  ? "Your WyshKit seller account" 
                  : "Your BaseCampMart vendor account"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">Mutations Design</h3>
                  <p className="text-sm text-muted-foreground">
                    {platformMode === "wyshkit" ? "CGC Account" : "Vendor Account"}
                  </p>
                </div>
              </div>
              
              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Account Status</span>
                  <Badge variant="outline" className="text-green-600">Active</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Products</span>
                  <span>42</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pending Orders</span>
                  <span>7</span>
                </div>
              </div>
              
              <div className="pt-2">
                <Button asChild variant="ghost" size="sm" className="w-full justify-between">
                  <Link to="#">
                    <span>Account Settings</span>
                    <Settings className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Recent Orders</span>
                <Button variant="ghost" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((order) => (
                  <div key={order} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <h4 className="font-medium">Order #{10000 + order}</h4>
                      <p className="text-sm text-muted-foreground">3 items • ₹12,500</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={order === 1 ? "default" : order === 2 ? "secondary" : "outline"}>
                        {order === 1 ? "New" : order === 2 ? "Processing" : "Shipped"}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Recent Proposals</span>
                <Button variant="ghost" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((proposal) => (
                  <div key={proposal} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <h4 className="font-medium">TechCorp {proposal === 1 ? "Holiday" : proposal === 2 ? "Welcome" : "Anniversary"} Kit</h4>
                      <p className="text-sm text-muted-foreground">
                        {proposal === 1 ? "12 products" : proposal === 2 ? "5 products" : "8 products"}
                        {" • "}
                        {proposal === 1 ? "₹85,000" : proposal === 2 ? "₹32,000" : "₹54,000"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={proposal === 1 ? "default" : proposal === 2 ? "outline" : "secondary"}>
                        {proposal === 1 ? "Draft" : proposal === 2 ? "Sent" : "Approved"}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Platform Activity</CardTitle>
              <CardDescription>Products and orders across WyshKit and BaseCampMart</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-muted-foreground text-sm">Cross-Listed Products</p>
                        <h3 className="text-2xl font-bold mt-2">18</h3>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-muted-foreground text-sm">Pending Approvals</p>
                        <h3 className="text-2xl font-bold mt-2">3</h3>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-muted-foreground text-sm">Return Gifts</p>
                        <h3 className="text-2xl font-bold mt-2">12</h3>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-muted-foreground text-sm">Custom Branding</p>
                        <h3 className="text-2xl font-bold mt-2">24</h3>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Button className="w-full sm:w-auto">Cross-List New Products</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
