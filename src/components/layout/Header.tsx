
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Package } from "lucide-react";

export default function Header() {
  const { toast } = useToast();

  return (
    <header className="border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-brand-yellow p-2 rounded-md">
              <Package className="h-6 w-6 text-brand-dark" />
            </div>
            <span className="text-xl font-bold">BaseCampMart</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 ml-6">
            <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/add-product" className="text-sm font-medium hover:text-primary transition-colors">
              Add Product
            </Link>
            <Link to="/branding-canvas" className="text-sm font-medium hover:text-primary transition-colors">
              Branding Canvas
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => {
              toast({
                title: "Coming Soon",
                description: "Bulk import functionality is coming soon!",
              });
            }}
          >
            Bulk Import
          </Button>
          <Button>View Dashboard</Button>
        </div>
      </div>
    </header>
  );
}
