import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
  User,
  BarChart,
  TrendingUp,
  Bell,
  Calendar,
  CheckCircle,
  BadgePercent,
  BadgeDollarSign,
  Building2,
  Link as LinkIcon,
  CreditCard
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function SellerCentralPage() {
  const [platformMode, setPlatformMode] = useState<"wyshkit" | "basecamp">("wyshkit");
  const isMobile = useIsMobile();

  // Mock data for charts
  const performance = {
    totalSales: "₹2,45,000",
    pendingOrders: 7,
    proposals: 12,
    returnGiftOrders: 3,
    inventory: 42,
    sampleOrders: 3
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Seller Central Dashboard
              {platformMode === "wyshkit" ? (
                <Badge variant="default" className="ml-2 bg-blue-600">WyshKit</Badge>
              ) : (
                <Badge variant="default" className="ml-2 bg-emerald-600">BaseCampMart</Badge>
              )}
            </h1>
            <p className="text-muted-foreground">
              Welcome back, Mutations Design. Here's your seller overview for {platformMode === "wyshkit" ? "WyshKit" : "BaseCampMart"}
            </p>
          </div>

          <Tabs 
            value={platformMode} 
            onValueChange={(value) => setPlatformMode(value as "wyshkit" | "basecamp")}
            className={isMobile ? "w-full" : "w-[300px] sm:w-[400px]"}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="wyshkit">WyshKit</TabsTrigger>
              <TabsTrigger value="basecamp">BaseCampMart</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Performance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full mb-3">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Sales (30d)</h3>
                <p className="text-2xl font-bold">{performance.totalSales}</p>
                <Badge variant="outline" className="mt-1">+12% vs. last month</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-amber-100 text-amber-600 p-2 rounded-full mb-3">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Pending Orders</h3>
                <p className="text-2xl font-bold">{performance.pendingOrders}</p>
                <Button variant="link" size="sm" asChild className="mt-1 p-0 h-auto">
                  <Link to="/orders">View Orders</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 text-green-600 p-2 rounded-full mb-3">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Active Proposals</h3>
                <p className="text-2xl font-bold">{performance.proposals}</p>
                <Button variant="link" size="sm" asChild className="mt-1 p-0 h-auto">
                  <Link to="/proposals">View All</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-full mb-3">
                  <PackageIcon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Return Gift Orders</h3>
                <p className="text-2xl font-bold">{performance.returnGiftOrders}</p>
                <Button variant="link" size="sm" asChild className="mt-1 p-0 h-auto">
                  <Link to="/return-gifts">Manage</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Quick Actions */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Quick Actions</span>
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
                  <Link to="/orders">
                    <ShoppingCart className="h-6 w-6 mb-1" />
                    <span>Orders ({performance.pendingOrders})</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-24 flex flex-col">
                  <Link to="/sample-orders">
                    <PackageIcon className="h-6 w-6 mb-1" />
                    <span>Samples ({performance.sampleOrders})</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-24 flex flex-col">
                  <Link to="/products">
                    <Boxes className="h-6 w-6 mb-1" />
                    <span>Products ({performance.inventory})</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-24 flex flex-col">
                  <Link to="/order-financing">
                    <CreditCard className="h-6 w-6 mb-1" />
                    <span>Financing</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-24 flex flex-col">
                  <Link to="/branding-canvas">
                    <FileText className="h-6 w-6 mb-1" />
                    <span>Branding</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Overview */}
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
                  <span>{performance.inventory}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pending Orders</span>
                  <span>{performance.pendingOrders}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Login</span>
                  <span>Today, 10:45 AM</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-0">
              <Button asChild variant="ghost" size="sm" className="w-full justify-center">
                <Link to="/account-settings">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Account Settings</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Recent Orders</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/orders">View All</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((order) => (
                  <div key={order} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <h4 className="font-medium">Order #{10000 + order}</h4>
                      <p className="text-sm text-muted-foreground">3 items • ₹12,500</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
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
            <CardFooter className="grid grid-cols-2 gap-2">
              <Button asChild variant="outline">
                <Link to="/orders">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  All Orders
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/sample-orders">
                  <PackageIcon className="h-4 w-4 mr-2" />
                  Sample Orders
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Recent Proposals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Recent Proposals</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/proposals">View All</Link>
                </Button>
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
                      <p className="text-xs text-muted-foreground">
                        {proposal === 1 ? "Created today" : proposal === 2 ? "Updated 3 days ago" : "Updated 1 week ago"}
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
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/proposals">
                  <FileText className="h-4 w-4 mr-2" />
                  View All Proposals
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* New Features Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>New Features</CardTitle>
            <CardDescription>Explore the latest additions to BaseCampMart</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full mb-3">
                      <BadgePercent className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium mb-2">Offers & Promotions</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Create and manage discounts, coupons and flash sales
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/offers-and-promotions">
                        Explore
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full mb-3">
                      <PackageIcon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium mb-2">Sample Orders</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Request product samples before placing bulk orders
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/sample-orders">
                        Explore
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-amber-100 text-amber-600 p-2 rounded-full mb-3">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium mb-2">Order Financing</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Access working capital and inventory financing with AI-powered approvals
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/order-financing">
                        Explore
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-full mb-3">
                      <LinkIcon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium mb-2">Distributor Authorization</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Manage brands and product cross-listing permissions
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/distributor-authorization">
                        Explore
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        {/* Cross-Platform Activity */}
        <Card className="mb-6">
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
              
              <Button asChild className="w-full sm:w-auto">
                <Link to="/distributor-authorization">
                  Cross-List New Products
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity & Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-600 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Order #10001 shipped</h4>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 p-1 rounded-full mt-0.5">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">New proposal created</h4>
                    <p className="text-xs text-muted-foreground">Today, 10:45 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 text-amber-600 p-1 rounded-full mt-0.5">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">New order received</h4>
                    <p className="text-xs text-muted-foreground">Yesterday, 4:30 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-1 rounded-full mt-0.5">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">3 products added to catalog</h4>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-600 p-1 rounded-full mt-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Cross-listing approved</h4>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 p-1 rounded-full mt-0.5">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Season Catalog Refresh</h4>
                    <p className="text-xs text-muted-foreground">Tomorrow, 9:00 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 p-1 rounded-full mt-0.5">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Cross-Platform Promotions</h4>
                    <p className="text-xs text-muted-foreground">June 15, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 p-1 rounded-full mt-0.5">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Holiday Marketing Campaign</h4>
                    <p className="text-xs text-muted-foreground">July 1, 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
