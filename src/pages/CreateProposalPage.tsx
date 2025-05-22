
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CreateProposalForm from "@/components/proposals/CreateProposalForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function CreateProposalPage() {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container py-6">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate("/seller-central")}>Seller Central</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate("/proposals")}>Proposals</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Create New Proposal</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="flex justify-between items-center mb-6">
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
            <h1 className="text-2xl font-bold tracking-tight">Create New Proposal</h1>
            <p className="text-muted-foreground">Create a customized proposal for your client</p>
          </div>
        </div>
        
        <CreateProposalForm />
      </div>
    </Layout>
  );
}
