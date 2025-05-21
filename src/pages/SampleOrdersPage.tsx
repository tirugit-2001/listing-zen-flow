
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SampleOrderList from "@/components/orders/SampleOrderList";
import SampleOrderRequestForm from "@/components/orders/SampleOrderRequestForm";
import SampleOrderTracking from "@/components/orders/SampleOrderTracking";
import { useIsMobile } from "@/hooks/use-mobile";

export default function SampleOrdersPage() {
  const [activeTab, setActiveTab] = useState("active");
  const isMobile = useIsMobile();
  
  return (
    <Layout>
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Sample Orders</h1>
          <p className="text-muted-foreground">
            Request and manage product samples before placing bulk orders
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} w-full`}>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="request">Request Sample</TabsTrigger>
            {!isMobile && <TabsTrigger value="history">History</TabsTrigger>}
            {!isMobile && <TabsTrigger value="tracking">Tracking</TabsTrigger>}
            {isMobile && (
              <TabsTrigger value="more" className="relative">
                More
              </TabsTrigger>
            )}
          </TabsList>
          
          {isMobile && (
            <TabsContent value="more" className="space-y-4">
              <Tabs defaultValue="history">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="tracking">Tracking</TabsTrigger>
                </TabsList>
                
                <TabsContent value="history" className="pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sample Order History</CardTitle>
                      <CardDescription>
                        View your past sample orders and their status
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SampleOrderList filter="past" />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="tracking" className="pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Track Samples</CardTitle>
                      <CardDescription>
                        Track the delivery status of your sample orders
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SampleOrderTracking />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          )}
          
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Sample Requests</CardTitle>
                <CardDescription>
                  View and manage your current sample orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SampleOrderList filter="active" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="request">
            <Card>
              <CardHeader>
                <CardTitle>Request Product Samples</CardTitle>
                <CardDescription>
                  Request samples before placing bulk orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SampleOrderRequestForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          {!isMobile && (
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Sample Order History</CardTitle>
                  <CardDescription>
                    View your past sample orders and their status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SampleOrderList filter="past" />
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          {!isMobile && (
            <TabsContent value="tracking">
              <Card>
                <CardHeader>
                  <CardTitle>Track Samples</CardTitle>
                  <CardDescription>
                    Track the delivery status of your sample orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SampleOrderTracking />
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}
