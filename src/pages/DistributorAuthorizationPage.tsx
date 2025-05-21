
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BrandDistributorsList from "@/components/authorization/BrandDistributorsList";
import DistributorBrandsList from "@/components/authorization/DistributorBrandsList";
import CrossListingProducts from "@/components/authorization/CrossListingProducts";
import AuthorizationRequests from "@/components/authorization/AuthorizationRequests";
import { Building2, Users, PackageCheck, ClipboardCheck, Link } from "lucide-react";

export default function DistributorAuthorizationPage() {
  const [userRole] = useState<"brand" | "distributor">("brand");
  
  return (
    <Layout>
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Distributor Authorization</h1>
          <p className="text-muted-foreground">
            Manage which distributors can sell your products or see which brands have authorized you
          </p>
        </div>
        
        <Tabs defaultValue={userRole === "brand" ? "my-distributors" : "authorized-brands"} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-3xl">
            {userRole === "brand" ? (
              <>
                <TabsTrigger value="my-distributors" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">My Distributors</span>
                </TabsTrigger>
                <TabsTrigger value="requests" className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Authorization Requests</span>
                </TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="authorized-brands" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Authorized Brands</span>
                </TabsTrigger>
                <TabsTrigger value="requests" className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Authorization Requests</span>
                </TabsTrigger>
              </>
            )}
            <TabsTrigger value="cross-listing" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <span className="hidden sm:inline">Cross-Listing</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <PackageCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
          </TabsList>
          
          {userRole === "brand" ? (
            <>
              <TabsContent value="my-distributors">
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Distributors</CardTitle>
                    <CardDescription>
                      Authorize distributors to sell your products on BaseCampMart
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BrandDistributorsList />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="requests">
                <Card>
                  <CardHeader>
                    <CardTitle>Authorization Requests</CardTitle>
                    <CardDescription>
                      Review and manage requests from distributors to sell your products
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AuthorizationRequests viewAs="brand" />
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent value="authorized-brands">
                <Card>
                  <CardHeader>
                    <CardTitle>Authorized Brands</CardTitle>
                    <CardDescription>
                      Brands that have authorized you to sell their products
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DistributorBrandsList />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="requests">
                <Card>
                  <CardHeader>
                    <CardTitle>Authorization Requests</CardTitle>
                    <CardDescription>
                      Track your requests to sell products from different brands
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AuthorizationRequests viewAs="distributor" />
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
          
          <TabsContent value="cross-listing">
            <Card>
              <CardHeader>
                <CardTitle>Cross-List Products</CardTitle>
                <CardDescription>
                  {userRole === "brand" 
                    ? "Manage which products distributors can cross-list" 
                    : "Cross-list products from brands that have authorized you"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CrossListingProducts userRole={userRole} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Authorized Products</CardTitle>
                <CardDescription>
                  {userRole === "brand" 
                    ? "Products that are available for distributors to cross-list"
                    : "Products you are authorized to sell from various brands"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Product list will be displayed here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
