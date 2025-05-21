
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, AlertCircle, Clock, FileText, MoreHorizontal, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VendorVerification {
  id: string;
  businessName: string;
  submittedDate: string;
  status: "pending" | "in_progress" | "approved" | "rejected" | "flagged";
  documents: number;
  kycScore?: number;
}

interface AdminKYCDashboardProps {
  pendingVerifications: VendorVerification[];
}

export default function AdminKYCDashboard({ pendingVerifications }: AdminKYCDashboardProps) {
  const [selectedVendor, setSelectedVendor] = useState<VendorVerification | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  
  const getStatusBadge = (status) => {
    switch(status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Pending</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">In Progress</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Rejected</Badge>;
      case "flagged":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Flagged</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getStatusIcon = (status) => {
    switch(status) {
      case "pending":
        return <Clock className="h-4 w-4 text-amber-600" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
      case "flagged":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };
  
  const getKYCScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <>
      <Table>
        <TableCaption>List of pending vendor verifications that require review</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Business Name</TableHead>
            <TableHead>Submitted Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead>KYC Score</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingVerifications.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium">{vendor.businessName}</TableCell>
              <TableCell>{new Date(vendor.submittedDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(vendor.status)}
                  {getStatusBadge(vendor.status)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.documents}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${getKYCScoreColor(vendor.kycScore)}`}>
                    {vendor.kycScore}%
                  </span>
                  <Progress value={vendor.kycScore} className="h-2 w-14" />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedVendor(vendor);
                        setIsViewOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Reject
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Vendor Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Vendor Verification Details</DialogTitle>
            <DialogDescription>
              Review vendor KYC details and documents
            </DialogDescription>
          </DialogHeader>
          
          {selectedVendor && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Business Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Business Name:</span>
                      <span className="font-medium">{selectedVendor.businessName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Submitted Date:</span>
                      <span>{new Date(selectedVendor.submittedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span>{getStatusBadge(selectedVendor.status)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">KYC Score:</span>
                      <span className={`font-medium ${getKYCScoreColor(selectedVendor.kycScore)}`}>
                        {selectedVendor.kycScore}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Document Verification</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        GST Certificate
                      </span>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        PAN Card
                      </span>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Business Registration
                      </span>
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Cancelled Cheque
                      </span>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Verified</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Verification Notes</h3>
                <p className="text-sm text-muted-foreground">
                  Business registration document needs manual review. There appears to be a 
                  discrepancy between the business name in the registration document and the GST certificate.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline">Request More Documents</Button>
            <Button variant="destructive">Reject</Button>
            <Button>Approve Vendor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
