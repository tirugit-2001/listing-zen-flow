
import { Proposal, ProposalStatus } from "@/lib/models/proposal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, EyeIcon, FileEdit, Mail, CheckCircle, XCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProposalsListProps {
  proposals: Proposal[];
  filterStatus?: ProposalStatus;
}

export default function ProposalsList({ proposals, filterStatus }: ProposalsListProps) {
  const navigate = useNavigate();
  
  const filteredProposals = filterStatus 
    ? proposals.filter(p => p.status === filterStatus) 
    : proposals;

  const getStatusColor = (status: ProposalStatus) => {
    switch(status) {
      case "draft": return "bg-gray-200 text-gray-800 hover:bg-gray-300";
      case "sent": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "approved": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "rejected": return "bg-red-100 text-red-800 hover:bg-red-200";
    }
  };

  const getStatusIcon = (status: ProposalStatus) => {
    switch(status) {
      case "draft": return <FileEdit className="h-3.5 w-3.5 mr-1" />;
      case "sent": return <Mail className="h-3.5 w-3.5 mr-1" />;
      case "approved": return <CheckCircle className="h-3.5 w-3.5 mr-1" />;
      case "rejected": return <XCircle className="h-3.5 w-3.5 mr-1" />;
    }
  };

  const handleViewProposal = (id: string) => {
    navigate(`/proposals/${id}`);
  };

  if (filteredProposals.length === 0) {
    return (
      <div className="p-4 text-center border rounded-md bg-muted/20">
        <p className="text-muted-foreground">No proposals found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredProposals.map((proposal) => (
        <div 
          key={proposal.id} 
          className="border rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-muted/10 transition-colors" 
        >
          <div>
            <div className="flex items-center mb-1">
              <h3 className="font-medium mr-2">{proposal.title}</h3>
              <Badge className={getStatusColor(proposal.status)}>
                {getStatusIcon(proposal.status)}
                {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
              </Badge>
              {proposal.isOfflineOrder && (
                <Badge variant="outline" className="ml-2 text-xs">
                  Offline Order
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
              <span>ID: {proposal.id}</span>
              <span>Client: {proposal.client.company}</span>
              <span>Created: {proposal.createdAt}</span>
              <span>
                Value: ₹{proposal.pricing.total.toLocaleString('en-IN', {maximumFractionDigits: 0})}
              </span>
            </div>
          </div>
          <div className="flex gap-2 mt-3 sm:mt-0">
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center"
              onClick={() => handleViewProposal(proposal.id)}
            >
              <EyeIcon className="mr-1 h-4 w-4" />
              View
            </Button>
            <Button size="sm" className="flex items-center">
              {proposal.status === "draft" ? (
                <>Send <ArrowRight className="ml-1 h-4 w-4" /></>
              ) : proposal.status === "sent" ? (
                <>Follow up <Clock className="ml-1 h-4 w-4" /></>
              ) : (
                <>Edit <FileEdit className="ml-1 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
