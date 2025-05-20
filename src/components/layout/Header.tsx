
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Package, Upload } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BulkImport from "@/components/product/BulkImport";

export default function Header() {
  const { toast } = useToast();
  const [showBulkImport, setShowBulkImport] = useState(false);

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
            onClick={() => setShowBulkImport(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Bulk Import
          </Button>
          <Button>View Dashboard</Button>
        </div>
      </div>

      <Dialog open={showBulkImport} onOpenChange={setShowBulkImport}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bulk Import Products</DialogTitle>
            <DialogDescription>
              Upload a CSV file to import multiple products at once.
            </DialogDescription>
          </DialogHeader>
          <BulkImport onClose={() => setShowBulkImport(false)} />
        </DialogContent>
      </Dialog>
    </header>
  );
}
