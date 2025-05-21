
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
import { Package, Gift, Plus, Filter, Download, ArrowRight } from "lucide-react";

export default function ReturnGiftsPage() {
  const giftStatuses = [
    { label: "All Return Gifts", value: "all", count: 15 },
    { label: "Active", value: "active", count: 8 },
    { label: "Pending", value: "pending", count: 4 },
    { label: "Completed", value: "completed", count: 3 },
  ];

  const returnGifts = [
    { id: "RG-001", client: "TechCorp Inc.", title: "Customer Appreciation Gift", recipients: 50, budget: "₹45,000", date: "2025-05-25", status: "active" },
    { id: "RG-002", client: "Acme Solutions", title: "Conference Return Gift", recipients: 25, budget: "₹22,500", date: "2025-05-20", status: "active" },
    { id: "RG-003", client: "Globex Corp", title: "Employee Recognition", recipients: 100, budget: "₹90,000", date: "2025-05-18", status: "active" },
    { id: "RG-004", client: "Initech", title: "Client Appreciation", recipients: 15, budget: "₹13,500", date: "2025-05-15", status: "pending" },
    { id: "RG-005", client: "Umbrella Corp", title: "Event Follow-up Gift", recipients: 30, budget: "₹27,000", date: "2025-05-10", status: "completed" },
    { id: "RG-006", client: "Wayne Enterprises", title: "VIP Customer Gift", recipients: 10, budget: "₹15,000", date: "2025-05-05", status: "completed" },
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
            <Button>
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

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            {giftStatuses.map((status) => (
              <TabsTrigger key={status.value} value={status.value}>
                {status.label} ({status.count})
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
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {returnGifts.map((gift) => (
                      <TableRow key={gift.id}>
                        <TableCell className="font-medium">{gift.id}</TableCell>
                        <TableCell>{gift.client}</TableCell>
                        <TableCell>{gift.title}</TableCell>
                        <TableCell>{gift.recipients}</TableCell>
                        <TableCell>{gift.budget}</TableCell>
                        <TableCell>{gift.date}</TableCell>
                        <TableCell>{getStatusBadge(gift.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Similar content structure for other tabs */}
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
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {returnGifts
                        .filter(gift => gift.status === status)
                        .map((gift) => (
                          <TableRow key={gift.id}>
                            <TableCell className="font-medium">{gift.id}</TableCell>
                            <TableCell>{gift.client}</TableCell>
                            <TableCell>{gift.title}</TableCell>
                            <TableCell>{gift.recipients}</TableCell>
                            <TableCell>{gift.budget}</TableCell>
                            <TableCell>{gift.date}</TableCell>
                            <TableCell>{getStatusBadge(gift.status)}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                                <ArrowRight className="h-4 w-4" />
                              </Button>
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
