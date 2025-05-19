
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Package, PlusCircle, Image, Tag } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="bg-brand-yellow p-4 rounded-full">
            <Package className="h-12 w-12 text-brand-dark" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">BaseCampMart</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            The world's most efficient AI-enabled product listing system
          </p>
          <div className="flex gap-4 mt-6">
            <Button asChild size="lg">
              <Link to="/add-product">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Product
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/products">
                View Products
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover-scale">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="bg-brand-yellow/10 p-4 rounded-full">
                <PlusCircle className="h-8 w-8 text-brand-yellow" />
              </div>
              <h3 className="text-xl font-bold">Quick Add</h3>
              <p className="text-muted-foreground">
                Create a new product listing in under 4 minutes with AI assistance.
              </p>
              <Button asChild variant="outline" className="mt-2">
                <Link to="/add-product">Get Started</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="bg-brand-yellow/10 p-4 rounded-full">
                <Image className="h-8 w-8 text-brand-yellow" />
              </div>
              <h3 className="text-xl font-bold">Branding Canvas</h3>
              <p className="text-muted-foreground">
                Add branding zones and preview branding methods on your products.
              </p>
              <Button asChild variant="outline" className="mt-2">
                <Link to="/branding-canvas">Open Canvas</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="bg-brand-yellow/10 p-4 rounded-full">
                <Tag className="h-8 w-8 text-brand-yellow" />
              </div>
              <h3 className="text-xl font-bold">Manage Products</h3>
              <p className="text-muted-foreground">
                View, edit, and manage your product catalog with bulk actions.
              </p>
              <Button asChild variant="outline" className="mt-2">
                <Link to="/products">View Products</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-lg p-6 md:p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              60-70% Effort Reduction with AI
            </h2>
            <p className="text-lg mb-6">
              BaseCampMart uses AI to automate product listing, reducing vendor effort by 60-70%.
              Add images, and let AI suggest product details, features, and branding zones.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-brand-dark">
                  &lt; 4 min
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete product listing
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-brand-dark">
                  &lt; 2 min
                </div>
                <p className="text-sm text-muted-foreground">
                  Branding canvas workflow
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-brand-dark">
                  100%
                </div>
                <p className="text-sm text-muted-foreground">
                  Zero design dependency
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
