
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Wallet, Clock } from "lucide-react";

export default function OrderFinancingPage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <Layout>
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Order Financing</h1>
          <p className="text-muted-foreground">
            Access working capital and order financing to grow your business
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Quick Stats */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full mb-3">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Available Credit</h3>
                <p className="text-2xl font-bold">₹8,00,000</p>
                <Badge variant="outline" className="mt-1">Pre-approved</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 text-green-600 p-2 rounded-full mb-3">
                  <Wallet className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Financing</h3>
                <p className="text-2xl font-bold">₹2,45,000</p>
                <Badge variant="outline" className="mt-1">3 active loans</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-amber-100 text-amber-600 p-2 rounded-full mb-3">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Next Payment</h3>
                <p className="text-2xl font-bold">₹24,500</p>
                <Badge variant="outline" className="mt-1">Due in 7 days</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="apply">Apply</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="integration">Inventory</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Financing Overview</CardTitle>
                <CardDescription>
                  View your active loans, payment schedules, and credit status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-muted-foreground">Detailed financing information will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="apply">
            <Card>
              <CardHeader>
                <CardTitle>Apply for Financing</CardTitle>
                <CardDescription>
                  Apply for order financing or working capital loans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-muted-foreground">Financing application form will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Financing History</CardTitle>
                <CardDescription>
                  View your past loans and repayment history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-muted-foreground">Your financing history will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integration">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Integration</CardTitle>
                <CardDescription>
                  Connect your inventory management system to improve financing options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-muted-foreground">Inventory integration options will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
