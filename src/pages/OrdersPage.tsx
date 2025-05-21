
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingCart, Filter, ArrowDown, ArrowUp, Download, Package } from "lucide-react";

export default function OrdersPage() {
  const orderStatuses = [
    { label: "All Orders", value: "all", count: 31 },
    { label: "New", value: "new", count: 7 },
    { label: "Processing", value: "processing", count: 12 },
    { label: "Shipped", value: "shipped", count: 8 },
    { label: "Delivered", value: "delivered", count: 4 },
  ];

  const orders = [
    { id: "10001", date: "2025-05-15", customer: "TechCorp Inc.", items: 5, total: "₹25,000", status: "new" },
    { id: "10002", date: "2025-05-14", customer: "Acme Solutions", items: 2, total: "₹8,400", status: "processing" },
    { id: "10003", date: "2025-05-12", customer: "Globex Corp", items: 10, total: "₹48,500", status: "processing" },
    { id: "10004", date: "2025-05-10", customer: "Initech", items: 1, total: "₹3,600", status: "shipped" },
    { id: "10005", date: "2025-05-08", customer: "Umbrella Corp", items: 3, total: "₹15,200", status: "shipped" },
    { id: "10006", date: "2025-05-05", customer: "Wayne Enterprises", items: 8, total: "₹32,400", status: "delivered" },
    { id: "10007", date: "2025-05-02", customer: "Stark Industries", items: 4, total: "₹19,800", status: "delivered" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge>New</Badge>;
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      case "shipped":
        return <Badge variant="outline">Shipped</Badge>;
      case "delivered":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Delivered</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center">
              <ShoppingCart className="mr-2 h-6 w-6" />
              Orders Management
            </h1>
            <p className="text-muted-foreground">View and manage all your customer orders</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            {orderStatuses.map((status) => (
              <TabsTrigger key={status.value} value={status.value}>
                {status.label} ({status.count})
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>Showing all orders from all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Similar content structure for other tabs */}
          {["new", "processing", "shipped", "delivered"].map((status) => (
            <TabsContent key={status} value={status}>
              <Card>
                <CardHeader>
                  <CardTitle>{orderStatuses.find(s => s.value === status)?.label}</CardTitle>
                  <CardDescription>Showing {status} orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders
                        .filter(order => order.status === status)
                        .map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">#{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>{order.total}</TableCell>
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
