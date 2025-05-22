
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  FileText, Plus, Filter, Download, Search, 
  ArrowUpDown, Calendar, Users
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProposalsList from "@/components/proposals/ProposalsList";
import { Proposal, ProposalStatus } from "@/lib/models/proposal";

// Mock data for proposals
const mockProposals: Proposal[] = [
  { 
    id: "PROP-001", 
    title: "TechCorp Holiday Gift Kit", 
    client: { 
      id: "CLIENT-001", 
      name: "John Smith", 
      email: "john@techcorp.com", 
      company: "TechCorp Inc." 
    },
    products: Array(12).fill({
      id: "PROD-001",
      name: "Product Name",
      thumbnail: "/placeholder.svg",
      quantity: 10,
      unitPrice: 8500,
      totalPrice: 85000
    }),
    packaging: { type: "premium", description: "Premium box", cost: 5000 },
    terms: { 
      paymentTerms: "50% advance", 
      deliveryTerms: "3 weeks", 
      validUntil: "2025-06-20" 
    },
    pricing: { 
      subtotal: 85000, 
      brandingCost: 0, 
      packagingCost: 5000, 
      discountAmount: 0, 
      taxAmount: 16200, 
      taxRate: 18, 
      total: 106200 
    },
    status: "draft", 
    createdAt: "2025-05-20", 
    updatedAt: "2025-05-20",
    isOfflineOrder: false
  },
  { 
    id: "PROP-002", 
    title: "Acme Welcome Kit", 
    client: { 
      id: "CLIENT-002", 
      name: "Jane Doe", 
      email: "jane@acme.com", 
      company: "Acme Solutions" 
    },
    products: Array(5).fill({
      id: "PROD-002",
      name: "Product Name",
      thumbnail: "/placeholder.svg",
      quantity: 10,
      unitPrice: 3200,
      totalPrice: 32000
    }),
    packaging: { type: "standard", description: "Standard box", cost: 0 },
    terms: { 
      paymentTerms: "Net 30", 
      deliveryTerms: "2 weeks", 
      validUntil: "2025-06-18" 
    },
    pricing: { 
      subtotal: 32000, 
      brandingCost: 0, 
      packagingCost: 0, 
      discountAmount: 0, 
      taxAmount: 5760, 
      taxRate: 18, 
      total: 37760 
    },
    status: "sent", 
    createdAt: "2025-05-18", 
    updatedAt: "2025-05-18",
    sentAt: "2025-05-18",
    expiresAt: "2025-06-18",
    isOfflineOrder: false
  },
  { 
    id: "PROP-003", 
    title: "Globex Anniversary Gifts", 
    client: { 
      id: "CLIENT-003", 
      name: "Robert Brown", 
      email: "robert@globex.com", 
      company: "Globex Corp" 
    },
    products: Array(8).fill({
      id: "PROD-003",
      name: "Product Name",
      thumbnail: "/placeholder.svg",
      quantity: 10,
      unitPrice: 5400,
      totalPrice: 54000
    }),
    packaging: { type: "premium", description: "Premium box", cost: 4000 },
    terms: { 
      paymentTerms: "50% advance", 
      deliveryTerms: "4 weeks", 
      validUntil: "2025-06-15" 
    },
    pricing: { 
      subtotal: 54000, 
      brandingCost: 6000, 
      packagingCost: 4000, 
      discountAmount: 0, 
      taxAmount: 11520, 
      taxRate: 18, 
      total: 75520 
    },
    status: "sent", 
    createdAt: "2025-05-15", 
    updatedAt: "2025-05-15",
    sentAt: "2025-05-15",
    expiresAt: "2025-06-15",
    isOfflineOrder: true
  },
  { 
    id: "PROP-004", 
    title: "Initech Employee Welcome Kit", 
    client: { 
      id: "CLIENT-004", 
      name: "Michael Scott", 
      email: "michael@initech.com", 
      company: "Initech" 
    },
    products: Array(3).fill({
      id: "PROD-004",
      name: "Product Name",
      thumbnail: "/placeholder.svg",
      quantity: 5,
      unitPrice: 3120,
      totalPrice: 15600
    }),
    packaging: { type: "eco", description: "Eco-friendly box", cost: 3000 },
    terms: { 
      paymentTerms: "Net 15", 
      deliveryTerms: "1 week", 
      validUntil: "2025-06-12" 
    },
    pricing: { 
      subtotal: 15600, 
      brandingCost: 2000, 
      packagingCost: 3000, 
      discountAmount: 0, 
      taxAmount: 3708, 
      taxRate: 18, 
      total: 24308 
    },
    status: "approved", 
    createdAt: "2025-05-12", 
    updatedAt: "2025-05-14",
    sentAt: "2025-05-12",
    expiresAt: "2025-06-12",
    isOfflineOrder: false
  },
  { 
    id: "PROP-005", 
    title: "Umbrella Corp Conference Gifts", 
    client: { 
      id: "CLIENT-005", 
      name: "Albert Wesker", 
      email: "wesker@umbrella.com", 
      company: "Umbrella Corp" 
    },
    products: Array(10).fill({
      id: "PROD-005",
      name: "Product Name",
      thumbnail: "/placeholder.svg",
      quantity: 12,
      unitPrice: 7700,
      totalPrice: 92400
    }),
    packaging: { type: "luxury", description: "Luxury custom box", cost: 12000 },
    terms: { 
      paymentTerms: "Full advance", 
      deliveryTerms: "2 weeks", 
      validUntil: "2025-06-10" 
    },
    pricing: { 
      subtotal: 92400, 
      brandingCost: 15000, 
      packagingCost: 12000, 
      discountAmount: 0, 
      taxAmount: 21492, 
      taxRate: 18, 
      total: 140892 
    },
    status: "approved", 
    createdAt: "2025-05-10", 
    updatedAt: "2025-05-11",
    sentAt: "2025-05-10",
    expiresAt: "2025-06-10",
    isOfflineOrder: true
  },
  { 
    id: "PROP-006", 
    title: "Wayne Enterprises Gift Set", 
    client: { 
      id: "CLIENT-006", 
      name: "Bruce Wayne", 
      email: "bruce@wayne.com", 
      company: "Wayne Enterprises" 
    },
    products: Array(7).fill({
      id: "PROD-006",
      name: "Product Name",
      thumbnail: "/placeholder.svg",
      quantity: 6,
      unitPrice: 8033,
      totalPrice: 48200
    }),
    packaging: { type: "premium", description: "Premium box", cost: 6000 },
    terms: { 
      paymentTerms: "50% advance", 
      deliveryTerms: "3 weeks", 
      validUntil: "2025-06-05" 
    },
    pricing: { 
      subtotal: 48200, 
      brandingCost: 7000, 
      packagingCost: 6000, 
      discountAmount: 0, 
      taxAmount: 11016, 
      taxRate: 18, 
      total: 72216 
    },
    status: "rejected", 
    createdAt: "2025-05-05", 
    updatedAt: "2025-05-07",
    sentAt: "2025-05-05",
    expiresAt: "2025-06-05",
    isOfflineOrder: false
  },
];

export default function ProposalsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const proposalStatuses: { label: string; value: ProposalStatus | "all"; count: number }[] = [
    { label: "All Proposals", value: "all", count: mockProposals.length },
    { label: "Draft", value: "draft", count: mockProposals.filter(p => p.status === "draft").length },
    { label: "Sent", value: "sent", count: mockProposals.filter(p => p.status === "sent").length },
    { label: "Approved", value: "approved", count: mockProposals.filter(p => p.status === "approved").length },
    { label: "Rejected", value: "rejected", count: mockProposals.filter(p => p.status === "rejected").length },
  ];

  const handleCreateProposal = () => {
    navigate("/proposals/new");
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
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCreateProposal}>
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

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹457,098</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2 days</div>
              <p className="text-xs text-muted-foreground">
                -0.5 days from last month
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +3 from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search proposals..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="newest">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="highest">Highest value</SelectItem>
              <SelectItem value="lowest">Lowest value</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All proposals</SelectItem>
              <SelectItem value="online">Online orders</SelectItem>
              <SelectItem value="offline">Offline orders</SelectItem>
            </SelectContent>
          </Select>
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
                <ProposalsList proposals={mockProposals} />
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
                  <ProposalsList 
                    proposals={mockProposals} 
                    filterStatus={status as ProposalStatus} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
