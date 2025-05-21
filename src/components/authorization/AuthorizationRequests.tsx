
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription, 
  DialogFooter
} from "@/components/ui/dialog";
import { Check, Filter, SearchIcon, X } from "lucide-react";

interface AuthRequest {
  id: string;
  businessName: string;
  email: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
}

// Mock data
const requestsData: AuthRequest[] = [
  {
    id: "req1",
    businessName: "Premier Distributors",
    email: "contact@premierdist.com",
    requestDate: "2025-05-15",
    status: "pending",
    message: "We would like to distribute your eco-friendly office supplies line."
  },
  {
    id: "req2",
    businessName: "MarketReach Solutions",
    email: "sales@marketreach.com",
    requestDate: "2025-05-10",
    status: "pending",
    message: "Interested in cross-listing your premium electronics for the corporate gifting market."
  },
  {
    id: "req3",
    businessName: "GiftPro Enterprises",
    email: "partnerships@giftpro.com",
    requestDate: "2025-05-03",
    status: "approved",
    message: "Looking to add your branded merchandise to our corporate catalog."
  },
  {
    id: "req4",
    businessName: "Retail Connect",
    email: "business@retailconnect.com",
    requestDate: "2025-04-28",
    status: "rejected",
    message: "We specialize in eco-friendly promotional products and would like to feature your sustainable items."
  }
];

interface AuthorizationRequestsProps {
  viewAs: "brand" | "distributor";
}

export default function AuthorizationRequests({ viewAs }: AuthorizationRequestsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<AuthRequest | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { toast } = useToast();

  const filteredRequests = requestsData.filter(request => 
    request.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (id: string) => {
    toast({
      title: "Request approved",
      description: "The authorization request has been approved successfully."
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Request rejected",
      description: "The authorization request has been rejected."
    });
  };

  const viewDetails = (request: AuthRequest) => {
    setSelectedRequest(request);
    setDetailsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${viewAs === "brand" ? "distributor" : "brand"} requests...`}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{viewAs === "brand" ? "Distributor Name" : "Brand Name"}</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No requests found
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.businessName}</TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>
                    <Badge variant={
                      request.status === "approved" ? "default" : 
                      request.status === "pending" ? "secondary" : "destructive"
                    }>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => viewDetails(request)}
                      >
                        View Details
                      </Button>
                      
                      {viewAs === "brand" && request.status === "pending" && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleApprove(request.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleReject(request.id)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle>Authorization Request Details</DialogTitle>
                <DialogDescription>
                  Request from {selectedRequest.businessName}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Business Name</h4>
                    <p>{selectedRequest.businessName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                    <p>{selectedRequest.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Request Date</h4>
                    <p>{selectedRequest.requestDate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                    <Badge variant={
                      selectedRequest.status === "approved" ? "default" : 
                      selectedRequest.status === "pending" ? "secondary" : "destructive"
                    }>
                      {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Message</h4>
                  <p className="mt-1 p-3 bg-muted/30 rounded-md">{selectedRequest.message || "No message provided."}</p>
                </div>
              </div>
              
              <DialogFooter>
                {viewAs === "brand" && selectedRequest.status === "pending" ? (
                  <>
                    <Button variant="outline" onClick={() => setDetailsOpen(false)}>Cancel</Button>
                    <Button 
                      onClick={() => handleReject(selectedRequest.id)}
                      variant="destructive"
                    >
                      Reject
                    </Button>
                    <Button 
                      onClick={() => handleApprove(selectedRequest.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setDetailsOpen(false)}>Close</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
