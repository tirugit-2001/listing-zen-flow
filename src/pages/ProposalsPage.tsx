
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
import { FileText, Plus, ArrowRight, Filter, Download } from "lucide-react";

export default function ProposalsPage() {
  const proposalStatuses = [
    { label: "All Proposals", value: "all", count: 24 },
    { label: "Draft", value: "draft", count: 8 },
    { label: "Sent", value: "sent", count: 10 },
    { label: "Approved", value: "approved", count: 4 },
    { label: "Rejected", value: "rejected", count: 2 },
  ];

  const proposals = [
    { id: "PROP-001", client: "TechCorp Inc.", title: "TechCorp Holiday Gift Kit", items: 12, total: "₹85,000", date: "2025-05-20", status: "draft" },
    { id: "PROP-002", client: "Acme Solutions", title: "Acme Welcome Kit", items: 5, total: "₹32,000", date: "2025-05-18", status: "sent" },
    { id: "PROP-003", client: "Globex Corp", title: "Globex Anniversary Gifts", items: 8, total: "₹54,000", date: "2025-05-15", status: "sent" },
    { id: "PROP-004", client: "Initech", title: "Initech Employee Welcome Kit", items: 3, total: "₹15,600", date: "2025-05-12", status: "approved" },
    { id: "PROP-005", client: "Umbrella Corp", title: "Umbrella Corp Conference Gifts", items: 10, total: "₹92,400", date: "2025-05-10", status: "approved" },
    { id: "PROP-006", client: "Wayne Enterprises", title: "Wayne Enterprises Gift Set", items: 7, total: "₹48,200", date: "2025-05-05", status: "rejected" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge>Draft</Badge>;
      case "sent":
        return <Badge variant="outline">Sent</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
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
              <FileText className="mr-2 h-6 w-6" />
              Proposals Management
            </h1>
            <p className="text-muted-foreground">Create and manage client proposals</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Proposal
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
            {proposalStatuses.map((status) => (
              <TabsTrigger key={status.value} value={status.value}>
                {status.label} ({status.count})
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Proposals</CardTitle>
                <CardDescription>View all client proposals</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {proposals.map((proposal) => (
                      <TableRow key={proposal.id}>
                        <TableCell className="font-medium">{proposal.id}</TableCell>
                        <TableCell>{proposal.client}</TableCell>
                        <TableCell>{proposal.title}</TableCell>
                        <TableCell>{proposal.items}</TableCell>
                        <TableCell>{proposal.total}</TableCell>
                        <TableCell>{proposal.date}</TableCell>
                        <TableCell>{getStatusBadge(proposal.status)}</TableCell>
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
          {["draft", "sent", "approved", "rejected"].map((status) => (
            <TabsContent key={status} value={status}>
              <Card>
                <CardHeader>
                  <CardTitle>{proposalStatuses.find(s => s.value === status)?.label}</CardTitle>
                  <CardDescription>Proposals with status: {status}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {proposals
                        .filter(proposal => proposal.status === status)
                        .map((proposal) => (
                          <TableRow key={proposal.id}>
                            <TableCell className="font-medium">{proposal.id}</TableCell>
                            <TableCell>{proposal.client}</TableCell>
                            <TableCell>{proposal.title}</TableCell>
                            <TableCell>{proposal.items}</TableCell>
                            <TableCell>{proposal.total}</TableCell>
                            <TableCell>{proposal.date}</TableCell>
                            <TableCell>{getStatusBadge(proposal.status)}</TableCell>
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
