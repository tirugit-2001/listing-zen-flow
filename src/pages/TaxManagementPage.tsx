
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, FileText, AlertCircle, CheckCircle, Search, Filter, Plus, FileEdit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock GST invoice data
const gstInvoices = [
  {
    id: "INV001",
    date: "2025-05-15",
    customer: "Tech Solutions Pvt Ltd",
    amount: 45000,
    gstAmount: 8100,
    status: "filed",
    gstType: "CGST+SGST",
    gstNumber: "27AADCB2230M1ZT"
  },
  {
    id: "INV002",
    date: "2025-05-10",
    customer: "Global Innovations Ltd",
    amount: 78500,
    gstAmount: 14130,
    status: "pending",
    gstType: "IGST",
    gstNumber: "07AAACP3682N1ZD"
  },
  {
    id: "INV003",
    date: "2025-05-02",
    customer: "Karnataka Enterprises",
    amount: 32000,
    gstAmount: 5760,
    status: "filed",
    gstType: "CGST+SGST",
    gstNumber: "29AABCU9603R1ZP"
  },
  {
    id: "INV004",
    date: "2025-04-28",
    customer: "Delhi Distributors",
    amount: 15000,
    gstAmount: 2700,
    status: "error",
    gstType: "CGST+SGST",
    gstNumber: "07AADFD1234R1ZP"
  },
  {
    id: "INV005",
    date: "2025-04-15",
    customer: "Mumbai Retail Solutions",
    amount: 96000,
    gstAmount: 17280,
    status: "filed",
    gstType: "CGST+SGST",
    gstNumber: "27AAIPM5948M1ZV"
  }
];

// Mock GST filing data
const gstFilings = [
  {
    period: "Apr 2025",
    dueDate: "2025-05-20",
    status: "pending",
    gstType: "GSTR-1",
    centralTax: 24580,
    stateTax: 24580,
    integratedTax: 35690
  },
  {
    period: "Mar 2025",
    dueDate: "2025-04-20",
    status: "filed",
    gstType: "GSTR-1",
    centralTax: 22145,
    stateTax: 22145,
    integratedTax: 31250,
    filedDate: "2025-04-18"
  },
  {
    period: "Feb 2025",
    dueDate: "2025-03-20",
    status: "filed",
    gstType: "GSTR-1",
    centralTax: 19870,
    stateTax: 19870,
    integratedTax: 28650,
    filedDate: "2025-03-19"
  },
  {
    period: "Jan 2025",
    dueDate: "2025-02-20",
    status: "filed",
    gstType: "GSTR-1",
    centralTax: 26420,
    stateTax: 26420,
    integratedTax: 32180,
    filedDate: "2025-02-15"
  }
];

export default function TaxManagementPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("invoices");

  // Filter invoices based on search and status filter
  const filteredInvoices = gstInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.gstNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Format currency with ₹ symbol
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  // Format date to Indian format (DD/MM/YYYY)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Function to get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'filed':
        return <Badge className="bg-green-100 text-green-800">Filed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleFileGST = () => {
    toast({
      title: "GST Filing Initiated",
      description: "Your GST filing process has been started. You'll be notified when it's ready for review.",
    });
  };

  // Calculate days until due date (with type check)
  const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const differenceInTime = due.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    return differenceInDays;
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center">
              <FileText className="mr-2 h-6 w-6" />
              GST & Tax Management
            </h1>
            <p className="text-muted-foreground">
              Manage your GST invoices, filings, and compliance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowAddInvoice(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Invoice
            </Button>
            <Button variant="outline" onClick={handleFileGST}>
              <Upload className="mr-2 h-4 w-4" />
              File GST Return
            </Button>
          </div>
        </div>

        <Tabs defaultValue="invoices" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="invoices">GST Invoices</TabsTrigger>
            <TabsTrigger value="filings">GST Filings</TabsTrigger>
            <TabsTrigger value="settings">GST Settings</TabsTrigger>
          </TabsList>

          {/* GST Invoices Tab */}
          <TabsContent value="invoices">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices, customers, GSTIN..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="filed">Filed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>GSTIN</TableHead>
                      <TableHead>GST Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">GST Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{formatDate(invoice.date)}</TableCell>
                        <TableCell>{invoice.customer}</TableCell>
                        <TableCell>{invoice.gstNumber}</TableCell>
                        <TableCell>{invoice.gstType}</TableCell>
                        <TableCell className="text-right">{formatCurrency(invoice.amount)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(invoice.gstAmount)}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* GST Filings Tab */}
          <TabsContent value="filings">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full mb-3">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Monthly Average</h3>
                    <p className="text-2xl font-bold">{formatCurrency(85000)}</p>
                    <p className="text-xs text-green-600">+12% vs. last quarter</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 text-green-600 p-2 rounded-full mb-3">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">On-time Filings</h3>
                    <p className="text-2xl font-bold">96%</p>
                    <p className="text-xs text-green-600">+2% vs. last quarter</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-amber-100 text-amber-600 p-2 rounded-full mb-3">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Pending</h3>
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-xs">Due in 5 days</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-full mb-3">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total Tax</h3>
                    <p className="text-2xl font-bold">{formatCurrency(412000)}</p>
                    <p className="text-xs text-muted-foreground">Year to date</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>GST Return Filings</CardTitle>
                <CardDescription>Track and manage your GST return filings</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>GST Type</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Central Tax</TableHead>
                      <TableHead className="text-right">State Tax</TableHead>
                      <TableHead className="text-right">Integrated Tax</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gstFilings.map((filing) => (
                      <TableRow key={filing.period}>
                        <TableCell className="font-medium">{filing.period}</TableCell>
                        <TableCell>{filing.gstType}</TableCell>
                        <TableCell>{formatDate(filing.dueDate)}</TableCell>
                        <TableCell>
                          {filing.status === 'filed' ? (
                            <Badge className="bg-green-100 text-green-800">
                              Filed on {formatDate(filing.filedDate)}
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-800">
                              Due in {getDaysUntilDue(filing.dueDate)} days
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(filing.centralTax)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(filing.stateTax)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(filing.integratedTax)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {filing.status === 'filed' ? (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            ) : (
                              <Button size="sm">
                                <Upload className="h-4 w-4 mr-1" />
                                File Return
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* GST Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Details</CardTitle>
                  <CardDescription>Your registered business information for GST</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-2">
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input id="business-name" value="YourCompany Private Limited" readOnly />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <Label htmlFor="gstin">GSTIN</Label>
                      <Input id="gstin" value="27AADCJ4906D1ZL" readOnly />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <Label htmlFor="pan">PAN</Label>
                      <Input id="pan" value="AADCJ4906D" readOnly />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <Label htmlFor="address">Registered Address</Label>
                      <Input id="address" value="123 Business Park, Andheri East" readOnly />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" value="Mumbai" readOnly />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" value="Maharashtra" readOnly />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input id="pincode" value="400093" readOnly />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="state-code">State Code</Label>
                        <Input id="state-code" value="27" readOnly />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="ml-auto">
                    <FileEdit className="mr-2 h-4 w-4" />
                    Edit Details
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>GST Configuration</CardTitle>
                  <CardDescription>Configure your GST filing preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="filing-frequency">Filing Frequency</Label>
                      <Select defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue placeholder="Select filing frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="default-tax-rate">Default GST Rate</Label>
                      <Select defaultValue="18">
                        <SelectTrigger>
                          <SelectValue placeholder="Select default GST rate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0% (Exempt)</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="12">12%</SelectItem>
                          <SelectItem value="18">18%</SelectItem>
                          <SelectItem value="28">28%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <Label>Automatic Filing</Label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Enable Reminders</span>
                        <div className="flex h-5 items-center">
                          <input
                            id="reminder"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            defaultChecked
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto-generate GSTR-1</span>
                        <div className="flex h-5 items-center">
                          <input
                            id="auto-generate"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            defaultChecked
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">E-way Bill Integration</span>
                        <div className="flex h-5 items-center">
                          <input
                            id="eway-bill"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            defaultChecked
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid gap-2">
                      <Label htmlFor="ca-details">CA/Tax Consultant Details</Label>
                      <Input id="ca-details" placeholder="Enter CA details" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Settings</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Invoice Dialog */}
      <Dialog open={showAddInvoice} onOpenChange={setShowAddInvoice}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add GST Invoice</DialogTitle>
            <DialogDescription>
              Enter the invoice details to add a new GST invoice.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="invoice-id">Invoice Number</Label>
                <Input id="invoice-id" placeholder="INV-0001" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="invoice-date">Invoice Date</Label>
                <Input id="invoice-date" type="date" />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input id="customer-name" placeholder="Enter customer name" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="gstin">GSTIN</Label>
              <Input id="gstin" placeholder="22AAAAA0000A1Z5" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="gst-type">GST Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select GST type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cgst-sgst">CGST + SGST</SelectItem>
                    <SelectItem value="igst">IGST</SelectItem>
                    <SelectItem value="exempt">Exempt/Zero-rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gst-rate">GST Rate</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select GST rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                    <SelectItem value="18">18%</SelectItem>
                    <SelectItem value="28">28%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount (before GST)</Label>
                <Input id="amount" type="number" placeholder="0.00" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gst-amount">GST Amount</Label>
                <Input id="gst-amount" type="number" placeholder="0.00" />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setShowAddInvoice(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowAddInvoice(false);
              toast({
                title: "Invoice Added",
                description: "The GST invoice has been added successfully.",
              });
            }}>
              Add Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
