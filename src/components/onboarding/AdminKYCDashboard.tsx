
import React, { useState } from 'react';
import { 
  AlertCircle, 
  Check, 
  X, 
  Search, 
  Filter, 
  Download, 
  Eye
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PendingVerification {
  id: string;
  businessName: string;
  applicationType: string;
  submittedDate: string;
  status: string;
  documents: number;
}

export interface AdminKYCDashboardProps {
  pendingVerifications: PendingVerification[];
}

export default function AdminKYCDashboard({ pendingVerifications }: AdminKYCDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Filter verifications based on search term and status
  const filteredVerifications = pendingVerifications.filter((verification) => {
    const matchesSearch = 
      verification.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verification.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === "all" || 
      verification.status.toLowerCase().includes(filterStatus.toLowerCase());
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Review":
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Pending Review</Badge>;
      case "Documents Missing":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Documents Missing</Badge>;
      case "Approved":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Approved</Badge>;
      case "Rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-amber-100 text-amber-600 p-2 rounded-full mb-3">
                <AlertCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">Pending Verifications</h3>
              <p className="text-2xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 text-green-600 p-2 rounded-full mb-3">
                <Check className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">Approved Today</h3>
              <p className="text-2xl font-bold">5</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 text-red-600 p-2 rounded-full mb-3">
                <X className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">Rejected Today</h3>
              <p className="text-2xl font-bold">2</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Pending Verifications</CardTitle>
          <CardDescription>
            Review and approve vendor applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search vendors..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor ID</TableHead>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Application Type</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVerifications.length > 0 ? (
                  filteredVerifications.map((verification) => (
                    <TableRow key={verification.id}>
                      <TableCell className="font-medium">{verification.id}</TableCell>
                      <TableCell>{verification.businessName}</TableCell>
                      <TableCell>{verification.applicationType}</TableCell>
                      <TableCell>{verification.submittedDate}</TableCell>
                      <TableCell>{getStatusBadge(verification.status)}</TableCell>
                      <TableCell>{verification.documents} files</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No pending verifications found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Recent verification actions taken by admin team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 border-b pb-4">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Vendor approved: Organic Foods Ltd</p>
                <p className="text-sm text-muted-foreground">Approved by Admin1 • Today, 10:30 AM</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 border-b pb-4">
              <div className="bg-red-100 text-red-600 p-2 rounded-full">
                <X className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Vendor rejected: Quick Supplies</p>
                <p className="text-sm text-muted-foreground">Rejected by Admin2 • Today, 9:15 AM</p>
                <p className="text-sm mt-1">Reason: Incomplete documentation</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Vendor approved: Tech Gadgets Inc</p>
                <p className="text-sm text-muted-foreground">Approved by Admin1 • Yesterday, 4:45 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
