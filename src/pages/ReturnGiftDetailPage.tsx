
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Gift, 
  Users, 
  Package, 
  ArrowLeft, 
  FileText, 
  Send, 
  Download, 
  Copy, 
  CheckCircle, 
  Clock, 
  Calendar,
  Truck,
  PenLine
} from "lucide-react";

export default function ReturnGiftDetailPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock gift data
  const gift = {
    id: id || "RG-001",
    client: "TechCorp Inc.",
    title: "Customer Appreciation Gift",
    description: "End of year customer appreciation gift for loyal clients",
    recipients: 50,
    budget: "₹45,000",
    date: "2025-05-25",
    status: "active",
    platform: "wyshkit",
    contactPerson: "Rahul Sharma",
    email: "rahul@techcorp.com",
    phone: "+91 98765 43210",
    createdAt: "2025-04-15",
    updatedAt: "2025-05-01",
  };

  // Mock recipients data
  const recipients = [
    { id: 1, name: "Aditya Patel", email: "aditya@example.com", status: "pending", trackingId: null },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", status: "shipped", trackingId: "IND12345678" },
    { id: 3, name: "Vikram Singh", email: "vikram@example.com", status: "delivered", trackingId: "IND87654321" },
    { id: 4, name: "Neha Gupta", email: "neha@example.com", status: "pending", trackingId: null },
    { id: 5, name: "Rajesh Kumar", email: "rajesh@example.com", status: "pending", trackingId: null },
  ];

  // Mock products data
  const products = [
    { id: "P001", name: "Branded Notebook", quantity: 50, unitPrice: "₹450", total: "₹22,500", status: "in stock" },
    { id: "P002", name: "Custom Pen Set", quantity: 50, unitPrice: "₹250", total: "₹12,500", status: "in stock" },
    { id: "P003", name: "Gift Box Packaging", quantity: 50, unitPrice: "₹200", total: "₹10,000", status: "in stock" },
  ];

  // Mock timeline data
  const timeline = [
    { date: "2025-04-15", event: "Campaign created", icon: <FileText className="h-4 w-4" /> },
    { date: "2025-04-20", event: "Products selected", icon: <Package className="h-4 w-4" /> },
    { date: "2025-04-25", event: "Recipients imported", icon: <Users className="h-4 w-4" /> },
    { date: "2025-05-01", event: "Branding approved", icon: <CheckCircle className="h-4 w-4" /> },
    { date: "2025-05-10", event: "Production started", icon: <Clock className="h-4 w-4" /> },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      case "shipped":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Shipped</Badge>;
      case "delivered":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Delivered</Badge>;
      case "in stock":
        return <Badge variant="outline" className="bg-emerald-100 text-emerald-800">In Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case "wyshkit":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">WyshKit</Badge>;
      case "basecamp":
        return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">BaseCampMart</Badge>;
      default:
        return null;
    }
  };

  const copyTrackingLink = () => {
    toast({
      title: "Tracking Link Copied",
      description: "The tracking link has been copied to your clipboard.",
    });
  };

  const sendReminders = () => {
    toast({
      title: "Reminders Sent",
      description: "Reminder emails have been sent to all pending recipients.",
    });
  };

  const downloadReport = () => {
    toast({
      title: "Report Download Started",
      description: "Your return gift report is being generated and will download shortly.",
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link to="/return-gifts">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  {gift.title}
                </h1>
                {getStatusBadge(gift.status)}
                {getPlatformBadge(gift.platform)}
              </div>
              <p className="text-muted-foreground flex items-center gap-1">
                <Gift className="h-4 w-4" />
                Return Gift ID: {gift.id} • Client: {gift.client}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send Updates
            </Button>
            <Button variant="outline">
              <PenLine className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recipients">Recipients ({recipients.length})</TabsTrigger>
            <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                  <CardDescription>Details about this return gift campaign</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Campaign Title</p>
                      <p>{gift.title}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Client</p>
                      <p>{gift.client}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                      <p>{getStatusBadge(gift.status)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Platform</p>
                      <p>{getPlatformBadge(gift.platform)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Scheduled Date</p>
                      <p>{gift.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Recipients</p>
                      <p>{gift.recipients}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Budget</p>
                      <p>{gift.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Created</p>
                      <p>{gift.createdAt}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm font-medium mb-2">Description</p>
                    <p className="text-sm text-muted-foreground">{gift.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Contact Person</p>
                    <p>{gift.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                    <p>{gift.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Phone</p>
                    <p>{gift.phone}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Contact Client</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Recipients Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pending</span>
                      <Badge variant="outline">{recipients.filter(r => r.status === "pending").length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Shipped</span>
                      <Badge variant="outline" className="bg-blue-100">{recipients.filter(r => r.status === "shipped").length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Delivered</span>
                      <Badge variant="outline" className="bg-green-100">{recipients.filter(r => r.status === "delivered").length}</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" onClick={sendReminders}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Reminders
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {products.map((product, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm truncate" title={product.name}>{product.name}</span>
                        <span className="text-sm">{product.quantity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <Package className="h-4 w-4 mr-2" />
                    View All Products
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full" onClick={copyTrackingLink}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Tracking Link
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" onClick={downloadReport}>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Updates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="recipients">
            <Card>
              <CardHeader>
                <CardTitle>Recipients List</CardTitle>
                <CardDescription>
                  Manage all recipients for this return gift campaign
                </CardDescription>
                <div className="flex justify-between mt-2">
                  <Button size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Add Recipients
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={sendReminders}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Reminders
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tracking</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipients.map((recipient) => (
                      <TableRow key={recipient.id}>
                        <TableCell>#{recipient.id}</TableCell>
                        <TableCell>{recipient.name}</TableCell>
                        <TableCell>{recipient.email}</TableCell>
                        <TableCell>{getStatusBadge(recipient.status)}</TableCell>
                        <TableCell>
                          {recipient.trackingId ? recipient.trackingId : 
                            <span className="text-muted-foreground text-sm">Not shipped yet</span>
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            {recipient.status === "pending" && (
                              <Button variant="ghost" size="sm">
                                <Truck className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {recipients.length} recipients
                </div>
                <Button variant="outline" size="sm">
                  View All Recipients
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Products included in this return gift campaign
                </CardDescription>
                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm">
                    <Package className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.unitPrice}</TableCell>
                        <TableCell>{product.total}</TableCell>
                        <TableCell>{getStatusBadge(product.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} className="text-right font-medium">Total</TableCell>
                      <TableCell colSpan={3} className="font-medium">₹45,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Timeline</CardTitle>
                <CardDescription>
                  History and upcoming events for this return gift campaign
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute h-full w-0.5 bg-muted left-2.5 top-0"></div>
                  <div className="space-y-6">
                    {timeline.map((item, index) => (
                      <div key={index} className="flex gap-4 relative">
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center z-10">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium">{item.event}</p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-4 opacity-50">
                      <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center z-10">
                        <Truck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Shipping begins</p>
                        <p className="text-sm text-muted-foreground">2025-05-20 (Upcoming)</p>
                      </div>
                    </div>
                    <div className="flex gap-4 opacity-50">
                      <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center z-10">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Campaign completion</p>
                        <p className="text-sm text-muted-foreground">2025-06-10 (Upcoming)</p>
                      </div>
                    </div>
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
