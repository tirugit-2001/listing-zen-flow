
import Layout from "@/components/layout/Layout";
import CreateProposalForm from "@/components/proposals/CreateProposalForm";

export default function CreateProposalPage() {
  return (
    <Layout>
      <div className="container py-6">
        <CreateProposalForm />
      </div>
    </Layout>
  );
}
