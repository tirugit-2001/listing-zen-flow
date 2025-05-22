
import { useState } from "react";
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
import { ArrowRight, Download, Eye } from "lucide-react";
import { Proposal, ProposalStatus } from "@/lib/models/proposal";
import { Link } from "react-router-dom";

interface ProposalsListProps {
  proposals: Proposal[];
  filterStatus?: ProposalStatus | "all";
}

export default function ProposalsList({ proposals, filterStatus = "all" }: ProposalsListProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  
  // Filter proposals if a status filter is provided
  const filteredProposals = filterStatus === "all" 
    ? proposals 
    : proposals.filter(proposal => proposal.status === filterStatus);

  const getStatusBadge = (status: ProposalStatus) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "sent":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">Sent</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100">Rejected</Badge>;
      case "expired":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-100">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="hidden md:table-cell">Items</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProposals.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
              No proposals found
            </TableCell>
          </TableRow>
        ) : (
          filteredProposals.map((proposal) => (
            <TableRow 
              key={proposal.id}
              onMouseEnter={() => setHoveredRow(proposal.id)}
              onMouseLeave={() => setHoveredRow(null)}
              className="group"
            >
              <TableCell className="font-medium">{proposal.id}</TableCell>
              <TableCell>{proposal.client.company}</TableCell>
              <TableCell>{proposal.title}</TableCell>
              <TableCell className="hidden md:table-cell">{proposal.products.length}</TableCell>
              <TableCell className="text-right">₹{proposal.pricing.total.toLocaleString('en-IN')}</TableCell>
              <TableCell className="hidden md:table-cell">{formatDate(proposal.createdAt)}</TableCell>
              <TableCell>{getStatusBadge(proposal.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {(hoveredRow === proposal.id || true) && (
                    <>
                      <Button variant="ghost" size="icon" asChild title="View">
                        <Link to={`/proposals/${proposal.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" title="Download">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" asChild title="Go to details">
                        <Link to={`/proposals/${proposal.id}`}>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
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
  );
}
