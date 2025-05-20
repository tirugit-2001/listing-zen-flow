
import Layout from "@/components/layout/Layout";
import AddProductForm from "@/components/AddProductForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AddProductPage() {
  return (
    <Layout>
      <div className="container py-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Product</CardTitle>
            <CardDescription>
              Fill out the form below to add a new product to your inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddProductForm />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
