
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Send, Edit, CheckCircle, XCircle, Clock, FileText, User, Building, Box, Calendar } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Proposal } from "@/lib/models/proposal";
import { formatCurrency } from "@/lib/utils";

// Mock data - in a real app, this would be fetched based on the ID
const mockProposal: Proposal = {
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
};

// Helper function to get status badge color
const getStatusBadgeColor = (status: string) => {
  switch(status) {
    case 'draft': return "bg-gray-200 text-gray-800";
    case 'sent': return "bg-blue-100 text-blue-800";
    case 'approved': return "bg-green-100 text-green-800";
    case 'rejected': return "bg-red-100 text-red-800";
    default: return "bg-gray-200 text-gray-800";
  }
};

export default function ProposalDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // In a real app, we'd fetch the proposal by id
  const proposal = mockProposal;
  
  return (
    <Layout>
      <div className="container py-6">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink to="/seller-central" onClick={() => navigate("/seller-central")}>
                  Seller Central
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink to="/proposals" onClick={() => navigate("/proposals")}>
                  Proposals
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink to="#">{proposal.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/proposals")}
              className="mb-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Proposals
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">{proposal.title}</h1>
            <p className="text-muted-foreground">Proposal #{proposal.id}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send to Client
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <User className="mr-2 h-4 w-4" /> 
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">Name</dt>
                  <dd className="font-medium">{proposal.client.name}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="font-medium">{proposal.client.email}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Company</dt>
                  <dd className="font-medium">{proposal.client.company}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Clock className="mr-2 h-4 w-4" /> 
                Proposal Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="text-muted-foreground text-sm">Status</span>
                  <div className="mt-1">
                    <Badge className={getStatusBadgeColor(proposal.status)}>
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Created</span>
                  <div className="font-medium">{proposal.createdAt}</div>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Valid Until</span>
                  <div className="font-medium">{proposal.terms.validUntil}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <FileText className="mr-2 h-4 w-4" /> 
                Pricing Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-medium">{formatCurrency(proposal.pricing.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Branding</dt>
                  <dd className="font-medium">{formatCurrency(proposal.pricing.brandingCost)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Packaging</dt>
                  <dd className="font-medium">{formatCurrency(proposal.pricing.packagingCost)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Tax ({proposal.pricing.taxRate}%)</dt>
                  <dd className="font-medium">{formatCurrency(proposal.pricing.taxAmount)}</dd>
                </div>
                <div className="flex justify-between pt-2 font-bold border-t">
                  <dt>Total</dt>
                  <dd>{formatCurrency(proposal.pricing.total)}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="products" className="w-full">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="products" className="pt-4">
            <Card>
              <CardContent className="pt-6">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground text-sm">
                      <th className="pb-3">Product</th>
                      <th className="pb-3 text-right">Qty</th>
                      <th className="pb-3 text-right">Unit Price</th>
                      <th className="pb-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposal.products.slice(0, 5).map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 flex items-center">
                          <div className="w-10 h-10 mr-3 bg-muted rounded" />
                          <span className="font-medium">{product.name}</span>
                        </td>
                        <td className="py-3 text-right">{product.quantity}</td>
                        <td className="py-3 text-right">{formatCurrency(product.unitPrice)}</td>
                        <td className="py-3 text-right">{formatCurrency(product.totalPrice)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={4} className="pt-3 text-center text-muted-foreground">
                        {proposal.products.length > 5 && (
                          <span>+ {proposal.products.length - 5} more products</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div>
                  <span className="text-sm text-muted-foreground">Packaging:</span> 
                  <span className="ml-2 font-medium">{proposal.packaging.description}</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Cost:</span> 
                  <span className="ml-2 font-medium">{formatCurrency(proposal.packaging.cost)}</span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="terms" className="pt-4">
            <Card>
              <CardContent className="pt-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="font-medium">Payment Terms</dt>
                    <dd className="mt-1 text-muted-foreground">{proposal.terms.paymentTerms}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Delivery Terms</dt>
                    <dd className="mt-1 text-muted-foreground">{proposal.terms.deliveryTerms}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Validity</dt>
                    <dd className="mt-1 text-muted-foreground">
                      This proposal is valid until {proposal.terms.validUntil}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history" className="pt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 mt-0.5">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Proposal created</p>
                      <p className="text-sm text-muted-foreground">{proposal.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-0.5">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <Edit className="h-4 w-4 text-gray-600" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Last modified</p>
                      <p className="text-sm text-muted-foreground">{proposal.updatedAt}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Personalized suggestions to improve this proposal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md bg-blue-50 flex items-start">
                <div className="mr-4 mt-0.5">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Pricing</Badge>
                </div>
                <div>
                  <h4 className="font-medium">Consider volume discount</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    This client has ordered similar quantities in the past. Offering a 5% volume discount may increase chances of approval.
                  </p>
                </div>
              </div>
              <div className="p-4 border rounded-md bg-green-50 flex items-start">
                <div className="mr-4 mt-0.5">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Packaging</Badge>
                </div>
                <div>
                  <h4 className="font-medium">Branded unboxing experience</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    TechCorp has shown interest in enhanced unboxing experiences. Consider adding customized tissue paper for +₹1,200.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
