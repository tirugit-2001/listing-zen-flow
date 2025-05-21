
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Input } from "@/components/ui/input";
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
  Upload, 
  FileText, 
  Download, 
  AlertCircle, 
  Check, 
  ArrowLeft, 
  Search,
  Users,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function ReturnGiftBatchPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock batch processing data
  const batches = [
    { id: "B001", name: "May Onboarding Gifts", recipients: 120, status: "ready", date: "2025-05-15" },
    { id: "B002", name: "Conference Attendees", recipients: 85, status: "processing", date: "2025-05-18" },
    { id: "B003", name: "Tech Summit Gifts", recipients: 200, status: "scheduled", date: "2025-05-25" },
    { id: "B004", name: "Customer Appreciation Q2", recipients: 150, status: "draft", date: "2025-06-01" },
  ];

  // Mock upload history
  const uploadHistory = [
    { id: "UL001", filename: "may_recipients.csv", records: 120, date: "2025-05-10", status: "validated" },
    { id: "UL002", filename: "conference_list.xlsx", records: 85, date: "2025-05-12", status: "validated" }, 
    { id: "UL003", filename: "summit_attendees.csv", records: 205, date: "2025-05-14", status: "errors" },
    { id: "UL004", filename: "q2_customers.xlsx", records: 150, date: "2025-05-16", status: "processing" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "ready":
        return <Badge variant="default">Ready</Badge>;
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Scheduled</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      case "validated":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Validated</Badge>;
      case "errors":
        return <Badge variant="destructive">Errors</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleFileUpload = () => {
    toast({
      title: "Upload Started",
      description: "Your recipient file is being processed.",
    });
  };

  const handleCreateBatch = () => {
    toast({
      title: "New Batch Created",
      description: "Return gift batch has been created successfully.",
    });
  };

  const filteredBatches = batches.filter(batch => 
    batch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    batch.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <h1 className="text-2xl font-bold tracking-tight flex items-center">
                <Gift className="mr-2 h-6 w-6" />
                Return Gift Batch Management
              </h1>
              <p className="text-muted-foreground">Manage recipient batches for efficient return gift campaigns</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCreateBatch}>
              <Gift className="mr-2 h-4 w-4" />
              New Batch
            </Button>
            <Button variant="outline" onClick={handleFileUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Recipients
            </Button>
          </div>
        </div>

        <Tabs defaultValue="batches">
          <TabsList className="mb-6">
            <TabsTrigger value="batches">Batches</TabsTrigger>
            <TabsTrigger value="uploads">Upload History</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="batches">
            <div className="flex mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search batches..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Return Gift Batches</CardTitle>
                <CardDescription>
                  Create and manage recipient batches for bulk return gift processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Batch Name</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBatches.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell className="font-medium">{batch.id}</TableCell>
                        <TableCell>{batch.name}</TableCell>
                        <TableCell>{batch.recipients}</TableCell>
                        <TableCell>{batch.date}</TableCell>
                        <TableCell>{getStatusBadge(batch.status)}</TableCell>
                        <TableCell>
                          {batch.status === "processing" && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-blue-600 h-2.5 rounded-full w-[45%]"></div>
                            </div>
                          )}
                          {batch.status === "ready" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                          {batch.status === "scheduled" && <Clock className="h-4 w-4 text-blue-600" />}
                          {batch.status === "draft" && <span className="text-sm text-muted-foreground">Not started</span>}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Process</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredBatches.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No batches found matching your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Recipients Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Recipients</span>
                    <span className="font-medium">555</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Processed</span>
                    <span className="font-medium">120</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Pending</span>
                    <span className="font-medium">435</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="h-5 w-5 mr-2" />
                    Batch Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Ready</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800">1</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Processing</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">1</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Scheduled</span>
                    <Badge variant="outline">1</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Draft</span>
                    <Badge variant="outline">1</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Recipients
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export All Batches
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="uploads">
            <Card>
              <CardHeader>
                <CardTitle>Upload History</CardTitle>
                <CardDescription>
                  Recent recipient file uploads and their processing status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Filename</TableHead>
                      <TableHead>Records</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadHistory.map((upload) => (
                      <TableRow key={upload.id}>
                        <TableCell className="font-medium">{upload.id}</TableCell>
                        <TableCell>{upload.filename}</TableCell>
                        <TableCell>{upload.records}</TableCell>
                        <TableCell>{upload.date}</TableCell>
                        <TableCell>
                          {getStatusBadge(upload.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            {upload.status === "errors" && (
                              <Button variant="ghost" size="sm">
                                <AlertCircle className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                            {upload.status === "validated" && (
                              <Button variant="ghost" size="sm">
                                <Check className="h-4 w-4 text-green-600" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button onClick={handleFileUpload} className="ml-auto">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New File
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Upload Guidelines</CardTitle>
                <CardDescription>
                  Follow these guidelines to ensure successful recipient file uploads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Supported File Formats</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload files in CSV or Excel (.xlsx) format with the required columns.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Required Columns</h3>
                    <p className="text-sm text-muted-foreground">
                      Your file must include: Full Name, Email Address, Phone Number (optional), 
                      Shipping Address, City, State, Postal Code, and Country.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Maximum File Size</h3>
                    <p className="text-sm text-muted-foreground">
                      Files must be under 10MB. For larger recipient lists, please split into multiple files.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Sample Template
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Standard Template</CardTitle>
                  <CardDescription>
                    Basic template with essential recipient fields
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Includes name, email, phone, and complete shipping address fields.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Fields:</span>
                      <span>8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span>2025-04-15</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Template
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Extended Template</CardTitle>
                  <CardDescription>
                    Enhanced template with additional recipient data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Includes standard fields plus department, employee ID, and gift preferences.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Fields:</span>
                      <span>12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span>2025-04-20</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Template
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>International Template</CardTitle>
                  <CardDescription>
                    Template optimized for international recipients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enhanced for international shipping with country-specific address formats.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Fields:</span>
                      <span>10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span>2025-05-01</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Template
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Create Custom Template</CardTitle>
                <CardDescription>
                  Build a custom recipient import template to match your specific needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Select the fields you need in your custom template:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Basic Information</h3>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <input type="checkbox" id="field-name" className="mr-2" checked disabled />
                        <label htmlFor="field-name" className="text-sm">Full Name</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="field-email" className="mr-2" checked disabled />
                        <label htmlFor="field-email" className="text-sm">Email Address</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="field-phone" className="mr-2" />
                        <label htmlFor="field-phone" className="text-sm">Phone Number</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Shipping Information</h3>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <input type="checkbox" id="field-address" className="mr-2" checked disabled />
                        <label htmlFor="field-address" className="text-sm">Street Address</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="field-city" className="mr-2" checked disabled />
                        <label htmlFor="field-city" className="text-sm">City</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="field-state" className="mr-2" checked disabled />
                        <label htmlFor="field-state" className="text-sm">State/Province</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="field-postal" className="mr-2" checked disabled />
                        <label htmlFor="field-postal" className="text-sm">Postal Code</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="field-country" className="mr-2" checked disabled />
                        <label htmlFor="field-country" className="text-sm">Country</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Additional Information</h3>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <input type="checkbox" id="field-company" className="mr-2" />
                        <label htmlFor="field-company" className="text-sm">Company</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="field-department" className="mr-2" />
                        <label htmlFor="field-department" className="text-sm">Department</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="field-employee-id" className="mr-2" />
                        <label htmlFor="field-employee-id" className="text-sm">Employee ID</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="field-gift-pref" className="mr-2" />
                        <label htmlFor="field-gift-pref" className="text-sm">Gift Preference</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="field-notes" className="mr-2" />
                        <label htmlFor="field-notes" className="text-sm">Special Notes</label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">
                  Create Custom Template
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
