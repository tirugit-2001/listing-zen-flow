
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
import { 
  Package, 
  Gift, 
  Plus, 
  Filter, 
  Download, 
  ArrowRight, 
  Calendar, 
  Users, 
  Box,
  FileText 
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ReturnGiftsPage() {
  const { toast } = useToast();
  const [platformFilter, setPlatformFilter] = useState<"all" | "wyshkit" | "basecamp">("all");
  
  const giftStatuses = [
    { label: "All Return Gifts", value: "all", count: 15 },
    { label: "Active", value: "active", count: 8 },
    { label: "Pending", value: "pending", count: 4 },
    { label: "Completed", value: "completed", count: 3 },
  ];

  const returnGifts = [
    { id: "RG-001", client: "TechCorp Inc.", title: "Customer Appreciation Gift", recipients: 50, budget: "₹45,000", date: "2025-05-25", status: "active", platform: "wyshkit" },
    { id: "RG-002", client: "Acme Solutions", title: "Conference Return Gift", recipients: 25, budget: "₹22,500", date: "2025-05-20", status: "active", platform: "basecamp" },
    { id: "RG-003", client: "Globex Corp", title: "Employee Recognition", recipients: 100, budget: "₹90,000", date: "2025-05-18", status: "active", platform: "wyshkit" },
    { id: "RG-004", client: "Initech", title: "Client Appreciation", recipients: 15, budget: "₹13,500", date: "2025-05-15", status: "pending", platform: "basecamp" },
    { id: "RG-005", client: "Umbrella Corp", title: "Event Follow-up Gift", recipients: 30, budget: "₹27,000", date: "2025-05-10", status: "completed", platform: "wyshkit" },
    { id: "RG-006", client: "Wayne Enterprises", title: "VIP Customer Gift", recipients: 10, budget: "₹15,000", date: "2025-05-05", status: "completed", platform: "basecamp" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
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
  
  const filteredGifts = returnGifts.filter(gift => 
    platformFilter === "all" || gift.platform === platformFilter
  );

  const createNewGift = () => {
    toast({
      title: "Create New Return Gift",
      description: "Opening return gift creation workflow",
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center">
              <Gift className="mr-2 h-6 w-6" />
              Return Gifts Management
            </h1>
            <p className="text-muted-foreground">Create and manage branded return gifts for your clients</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={createNewGift}>
              <Plus className="mr-2 h-4 w-4" />
              New Return Gift
            </Button>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <Card className="col-span-1 lg:col-span-3">
            <CardHeader className="pb-3">
              <CardTitle>Platform Filter</CardTitle>
              <CardDescription>View return gifts by platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={platformFilter === "all" ? "default" : "outline"}
                  onClick={() => setPlatformFilter("all")}
                >
                  All Platforms
                </Button>
                <Button 
                  variant={platformFilter === "wyshkit" ? "default" : "outline"}
                  onClick={() => setPlatformFilter("wyshkit")}
                  className="border-blue-200"
                >
                  WyshKit
                </Button>
                <Button 
                  variant={platformFilter === "basecamp" ? "default" : "outline"}
                  onClick={() => setPlatformFilter("basecamp")}
                  className="border-emerald-200"
                >
                  BaseCampMart
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Gifts</span>
                <Badge variant="outline" className="bg-green-100">{giftStatuses.find(s => s.value === "active")?.count}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Recipients</span>
                <span className="font-medium">230</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Budget Utilized</span>
                <span className="font-medium">₹2,13,000</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            {giftStatuses.map((status) => (
              <TabsTrigger key={status.value} value={status.value}>
                {status.label} ({status.value === "all" ? filteredGifts.length : filteredGifts.filter(g => g.status === status.value).length})
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Return Gifts</CardTitle>
                <CardDescription>Manage all return gift campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGifts.map((gift) => (
                      <TableRow key={gift.id}>
                        <TableCell className="font-medium">{gift.id}</TableCell>
                        <TableCell>{gift.client}</TableCell>
                        <TableCell>{gift.title}</TableCell>
                        <TableCell>{gift.recipients}</TableCell>
                        <TableCell>{gift.budget}</TableCell>
                        <TableCell>{gift.date}</TableCell>
                        <TableCell>{getPlatformBadge(gift.platform)}</TableCell>
                        <TableCell>{getStatusBadge(gift.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredGifts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center">
                          No return gifts found for the selected filter.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab content for other statuses */}
          {["active", "pending", "completed"].map((status) => (
            <TabsContent key={status} value={status}>
              <Card>
                <CardHeader>
                  <CardTitle>{giftStatuses.find(s => s.value === status)?.label}</CardTitle>
                  <CardDescription>Return gift campaigns with status: {status}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Recipients</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGifts
                        .filter(gift => gift.status === status)
                        .map((gift) => (
                          <TableRow key={gift.id}>
                            <TableCell className="font-medium">{gift.id}</TableCell>
                            <TableCell>{gift.client}</TableCell>
                            <TableCell>{gift.title}</TableCell>
                            <TableCell>{gift.recipients}</TableCell>
                            <TableCell>{gift.budget}</TableCell>
                            <TableCell>{gift.date}</TableCell>
                            <TableCell>{getPlatformBadge(gift.platform)}</TableCell>
                            <TableCell>{getStatusBadge(gift.status)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      {filteredGifts.filter(gift => gift.status === status).length === 0 && (
                        <TableRow>
                          <TableCell colSpan={9} className="h-24 text-center">
                            No {status} return gifts found for the selected filter.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Return Gifts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-3">
                <div className="font-medium">TechCorp Inc.</div>
                <div className="text-sm text-muted-foreground">Customer Appreciation • May 25, 2025</div>
              </div>
              <div className="border-b pb-3">
                <div className="font-medium">Acme Solutions</div>
                <div className="text-sm text-muted-foreground">Conference Return Gift • May 20, 2025</div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Top Clients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <span>TechCorp Inc.</span>
                <Badge variant="outline">₹45,000</Badge>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <span>Globex Corp</span>
                <Badge variant="outline">₹90,000</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Umbrella Corp</span>
                <Badge variant="outline">₹27,000</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Box className="h-5 w-5 mr-2" />
                Popular Gift Types
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <span>Tech Accessories</span>
                <Badge variant="outline">42%</Badge>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <span>Drinkware</span>
                <Badge variant="outline">28%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Stationery</span>
                <Badge variant="outline">15%</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-center" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                View Full Report
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
