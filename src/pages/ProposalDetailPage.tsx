import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, Download, Edit, Send, Eye, Copy, 
  CheckCircle, XCircle, FileText, MessageSquare, 
  ClipboardList, Info 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Proposal, ProposalStatus } from "@/lib/models/proposal";

// Mock data for a single proposal
const mockProposal: Proposal = {
  id: "PROP-001",
  title: "TechCorp Holiday Gift Kit",
  client: {
    id: "CLIENT-001",
    name: "John Smith",
    email: "john@techcorp.com",
    phone: "+91 98765 43210",
    company: "TechCorp Inc.",
    address: "123 Tech Park, Bangalore",
    previousOrders: 3
  },
  products: [
    {
      id: "PROD-001",
      name: "Premium Gift Box",
      thumbnail: "/placeholder.svg",
      quantity: 30,
      unitPrice: 5000,
      totalPrice: 150000,
      brandingOptions: [
        {
          type: "logo",
          position: "top",
          logoUrl: "/placeholder.svg",
          additionalCost: 1500,
        }
      ]
    },
    {
      id: "PROD-002",
      name: "Custom Water Bottle",
      thumbnail: "/placeholder.svg",
      quantity: 30,
      unitPrice: 1500,
      totalPrice: 45000,
      brandingOptions: [
        {
          type: "logo",
          position: "side",
          logoUrl: "/placeholder.svg",
          additionalCost: 500,
        }
      ]
    },
    {
      id: "PROD-003",
      name: "Branded Notebook",
      thumbnail: "/placeholder.svg",
      quantity: 30,
      unitPrice: 800,
      totalPrice: 24000,
      brandingOptions: [
        {
          type: "logo",
          position: "front",
          logoUrl: "/placeholder.svg",
          additionalCost: 300,
        }
      ]
    }
  ],
  branding: [
    {
      type: "logo",
      position: "multiple",
      logoUrl: "/placeholder.svg",
      additionalCost: 15000,
      notes: "Client logo to be printed on all items"
    }
  ],
  packaging: {
    type: "premium",
    description: "Premium gift box with custom insert",
    cost: 7500
  },
  discounts: [
    {
      type: "percentage",
      value: 10,
      description: "Volume discount"
    }
  ],
  terms: {
    paymentTerms: "50% advance, 50% upon delivery",
    deliveryTerms: "3 weeks from order confirmation",
    validUntil: "2025-06-21",
    additionalNotes: "Free delivery for orders above ₹200,000"
  },
  pricing: {
    subtotal: 219000,
    brandingCost: 15000,
    packagingCost: 7500,
    discountAmount: 21900,
    taxAmount: 39528,
    taxRate: 18,
    total: 259128
  },
  status: "sent",
  createdAt: "2025-05-20T10:30:00Z",
  updatedAt: "2025-05-20T14:45:00Z",
  sentAt: "2025-05-20T15:00:00Z",
  expiresAt: "2025-06-21T23:59:59Z",
  notes: "Follow up with client on June 1st if no response",
  isOfflineOrder: false
};

// Mock timeline data
const timeline = [
  { date: "2025-05-20", time: "10:30 AM", event: "Proposal created", user: "You" },
  { date: "2025-05-20", time: "11:45 AM", event: "Added product suggestions from AI", user: "You" },
  { date: "2025-05-20", time: "02:15 PM", event: "Updated pricing and discounts", user: "You" },
  { date: "2025-05-20", time: "03:00 PM", event: "Proposal sent to client", user: "You" },
  { date: "2025-05-21", time: "09:30 AM", event: "Client viewed proposal", user: "System" }
];

export default function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeStatus, setActiveStatus] = useState<ProposalStatus>(mockProposal.status);
  
  // In a real implementation, we would fetch the proposal data based on the ID
  const proposal = mockProposal;
  
  const getStatusBadge = (status: ProposalStatus) => {
    switch (status) {
      case "draft":
        return <Badge>Draft</Badge>;
      case "sent":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Sent</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      case "expired":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          {/* Header with navigation and actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link to="/proposals">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{proposal.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{proposal.id}</span>
                  <span>•</span>
                  {getStatusBadge(activeStatus)}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              
              {activeStatus === "draft" && (
                <Button size="sm" onClick={() => setActiveStatus("sent")}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Proposal
                </Button>
              )}
              
              {activeStatus === "sent" && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() => setActiveStatus("rejected")}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Mark Rejected
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                    onClick={() => setActiveStatus("approved")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Approved
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content - 2/3 width on large screens */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">
                    <FileText className="mr-2 h-4 w-4" />
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="preview">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="activity">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Activity
                  </TabsTrigger>
                  <TabsTrigger value="comments">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Comments
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Client Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Company</h3>
                          <p className="font-medium">{proposal.client.company}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Contact Person</h3>
                          <p className="font-medium">{proposal.client.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                          <p>{proposal.client.email}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone</h3>
                          <p>{proposal.client.phone}</p>
                        </div>
                        {proposal.client.previousOrders && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Previous Orders</h3>
                            <p>{proposal.client.previousOrders}</p>
                          </div>
                        )}
                        {proposal.isOfflineOrder && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Order Type</h3>
                            <Badge variant="outline">Offline Order</Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Products & Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="divide-y">
                        {proposal.products.map((product) => (
                          <div key={product.id} className="py-4 first:pt-0 last:pb-0">
                            <div className="flex items-start gap-4">
                              <div className="h-16 w-16 flex-shrink-0 rounded bg-muted overflow-hidden">
                                <img src={product.thumbnail} alt={product.name} className="h-full w-full object-cover" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium">{product.name}</h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                                  <span>Qty: {product.quantity}</span>
                                  <span>Unit Price: ₹{product.unitPrice.toLocaleString('en-IN')}</span>
                                </div>
                                
                                {product.brandingOptions && product.brandingOptions.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs font-medium">Branding Options:</p>
                                    <ul className="mt-1 text-xs text-muted-foreground">
                                      {product.brandingOptions.map((option, idx) => (
                                        <li key={idx}>
                                          {option.type === "logo" && `Logo (${option.position})`}
                                          {option.type === "text" && `Custom Text (${option.text})`}
                                          {option.type === "engraving" && "Engraving"}
                                          {option.additionalCost > 0 && ` - ₹${option.additionalCost.toLocaleString('en-IN')}`}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                              
                              <div className="text-right">
                                <p className="font-medium">₹{product.totalPrice.toLocaleString('en-IN')}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-6 border-t">
                        <h3 className="font-medium mb-4">Packaging</h3>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{proposal.packaging.type.charAt(0).toUpperCase() + proposal.packaging.type.slice(1)} Packaging</p>
                            <p className="text-sm text-muted-foreground">{proposal.packaging.description}</p>
                          </div>
                          <p>₹{proposal.packaging.cost.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Pricing & Terms</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Products Subtotal</span>
                          <span>₹{proposal.pricing.subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Branding Cost</span>
                          <span>₹{proposal.pricing.brandingCost.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Packaging Cost</span>
                          <span>₹{proposal.pricing.packagingCost.toLocaleString('en-IN')}</span>
                        </div>
                        
                        {proposal.discounts && proposal.discounts.length > 0 && (
                          <div className="flex justify-between">
                            <span>
                              Discount ({proposal.discounts[0].type === "percentage" ? `${proposal.discounts[0].value}%` : `₹${proposal.discounts[0].value.toLocaleString('en-IN')}`})
                            </span>
                            <span className="text-red-500">-₹{proposal.pricing.discountAmount.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        
                        <Separator className="my-2" />
                        
                        <div className="flex justify-between font-medium">
                          <span>Subtotal</span>
                          <span>₹{(proposal.pricing.subtotal + proposal.pricing.brandingCost + proposal.pricing.packagingCost - proposal.pricing.discountAmount).toLocaleString('en-IN')}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Tax ({proposal.pricing.taxRate}% GST)</span>
                          <span>₹{proposal.pricing.taxAmount.toLocaleString('en-IN')}</span>
                        </div>
                        
                        <Separator className="my-2" />
                        
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span>₹{proposal.pricing.total.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-3">Terms & Conditions</h3>
                        <div className="space-y-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground">Payment Terms</h4>
                              <p>{proposal.terms.paymentTerms}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground">Delivery Terms</h4>
                              <p>{proposal.terms.deliveryTerms}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground">Valid Until</h4>
                              <p>{formatDate(proposal.terms.validUntil)}</p>
                            </div>
                          </div>
                          
                          {proposal.terms.additionalNotes && (
                            <div className="pt-2">
                              <h4 className="text-sm font-medium text-muted-foreground">Additional Notes</h4>
                              <p>{proposal.terms.additionalNotes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Proposal Preview</CardTitle>
                      <CardDescription>
                        This is how your proposal appears to clients
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          This is a placeholder for the proposal preview.
                          In the full implementation, you would see a complete formatted preview of the proposal.
                        </AlertDescription>
                      </Alert>
                      
                      <div className="mt-4 p-6 border rounded-lg">
                        <div className="max-w-3xl mx-auto">
                          <div className="border-b pb-6 mb-6">
                            <h2 className="text-xl font-bold">{proposal.title}</h2>
                            <p className="text-sm text-muted-foreground">Proposal for {proposal.client.company}</p>
                            
                            <div className="mt-6 grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">From</h3>
                                <p className="font-medium">Your Company Name</p>
                                <p className="text-sm">your@email.com</p>
                                <p className="text-sm">+91 12345 67890</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">To</h3>
                                <p className="font-medium">{proposal.client.company}</p>
                                <p className="text-sm">{proposal.client.email}</p>
                                <p className="text-sm">{proposal.client.phone}</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Rest of the preview content would go here */}
                          <div className="text-center py-8 text-muted-foreground">
                            Full proposal preview content would be displayed here
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="activity">
                  <Card>
                    <CardHeader>
                      <CardTitle>Activity Timeline</CardTitle>
                      <CardDescription>
                        Track all activities related to this proposal
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {timeline.map((item, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="w-14 flex-shrink-0 text-sm text-muted-foreground">
                              {item.time}
                            </div>
                            <div>
                              <div className="h-full w-px bg-border absolute left-20 top-0 bottom-0 z-[-1]"></div>
                              <div className="relative flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                                <div className="h-2 w-2 rounded-full bg-foreground"></div>
                              </div>
                            </div>
                            <div className="flex-1 pb-6">
                              <p className="font-medium">{item.event}</p>
                              <p className="text-sm text-muted-foreground">
                                By {item.user} on {item.date}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="comments">
                  <Card>
                    <CardHeader>
                      <CardTitle>Comments</CardTitle>
                      <CardDescription>
                        Internal discussion about this proposal
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-muted-foreground">
                        <MessageSquare className="mx-auto h-8 w-8 opacity-50 mb-2" />
                        <p>No comments yet</p>
                        <p className="text-sm">Add the first comment to start a discussion</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar - 1/3 width on large screens */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Proposal Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <div className="mt-1">{getStatusBadge(activeStatus)}</div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                    <p>{formatDate(proposal.createdAt)}</p>
                  </div>
                  
                  {proposal.sentAt && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Sent</h3>
                      <p>{formatDate(proposal.sentAt)}</p>
                    </div>
                  )}
                  
                  {proposal.expiresAt && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Expires</h3>
                      <p>{formatDate(proposal.expiresAt)}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total Value</h3>
                    <p className="text-xl font-bold">₹{proposal.pricing.total.toLocaleString('en-IN')}</p>
                  </div>
                  
                  {proposal.isOfflineOrder && (
                    <div className="bg-yellow-50 text-yellow-800 p-3 rounded-md text-sm">
                      <p className="font-medium">Offline Order</p>
                      <p className="mt-1">This proposal is for an offline order that will be processed manually.</p>
                    </div>
                  )}
                  
                  {proposal.notes && (
                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Internal Notes</h3>
                      <p className="text-sm">{proposal.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm">
                    <p className="font-medium">Conversion Probability: High (85%)</p>
                    <p className="mt-1">Based on client history and proposal content</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Recommendations</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Follow up within 3 days for higher conversion rate</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Consider offering extended payment terms (Net 45)</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Client typically responds faster to phone calls than emails</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Similar Successful Proposals</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>PROP-023: Acme Solutions (Approved)</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>PROP-042: Globex Corp (Approved)</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeStatus === "draft" && (
                    <Button className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Proposal
                    </Button>
                  )}
                  
                  {activeStatus === "sent" && (
                    <>
                      <Button className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Follow-up
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          className="border-green-200 text-green-700 hover:bg-green-50"
                          onClick={() => setActiveStatus("approved")}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Approved
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-red-200 text-red-700 hover:bg-red-50"
                          onClick={() => setActiveStatus("rejected")}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Mark Rejected
                        </Button>
                      </div>
                    </>
                  )}
                  
                  {activeStatus === "approved" && (
                    <Button className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Create Order
                    </Button>
                  )}
                  
                  {(activeStatus === "rejected" || activeStatus === "expired") && (
                    <Button className="w-full">
                      <Copy className="mr-2 h-4 w-4" />
                      Create New Version
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
