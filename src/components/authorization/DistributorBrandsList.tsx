
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Filter, Link, Package, SearchIcon } from "lucide-react";

interface Brand {
  id: string;
  name: string;
  email: string;
  status: "active" | "pending" | "expired";
  productsAvailable: number;
  productsCrossListed: number;
  authorizationDate: string;
}

// Mock data
const brands: Brand[] = [
  {
    id: "b1",
    name: "EcoThrive Products",
    email: "partners@ecothrive.com",
    status: "active",
    productsAvailable: 56,
    productsCrossListed: 42,
    authorizationDate: "2025-02-18"
  },
  {
    id: "b2",
    name: "TechGadgetry",
    email: "wholesale@techgadgetry.com",
    status: "active",
    productsAvailable: 83,
    productsCrossListed: 29,
    authorizationDate: "2025-03-25"
  },
  {
    id: "b3",
    name: "Wellness Essentials",
    email: "distribution@wellnessessentials.com",
    status: "pending",
    productsAvailable: 47,
    productsCrossListed: 0,
    authorizationDate: "2025-05-10"
  },
  {
    id: "b4",
    name: "Premium Office Supplies",
    email: "vendors@premiumoffice.com",
    status: "expired",
    productsAvailable: 32,
    productsCrossListed: 18,
    authorizationDate: "2024-11-05"
  }
];

export default function DistributorBrandsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [brandRequest, setBrandRequest] = useState({
    email: "",
    name: "",
    message: ""
  });
  const { toast } = useToast();

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequestAuthorization = () => {
    toast({
      title: "Authorization request sent",
      description: `Your request to ${brandRequest.name} has been submitted successfully.`
    });
    setRequestDialogOpen(false);
    setBrandRequest({ email: "", name: "", message: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search brands..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={() => setRequestDialogOpen(true)}>
            Request Authorization
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Products Available</TableHead>
              <TableHead>Products Cross-Listed</TableHead>
              <TableHead>Authorization Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBrands.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No brands found
                </TableCell>
              </TableRow>
            ) : (
              filteredBrands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>
                    <Badge variant={
                      brand.status === "active" ? "default" : 
                      brand.status === "pending" ? "secondary" : "outline"
                    }>
                      {brand.status.charAt(0).toUpperCase() + brand.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{brand.productsAvailable}</TableCell>
                  <TableCell>{brand.productsCrossListed}</TableCell>
                  <TableCell>{brand.authorizationDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Package className="h-4 w-4 mr-2" />
                        View Products
                      </Button>
                      <Button size="sm" disabled={brand.status !== "active"}>
                        <Link className="h-4 w-4 mr-2" />
                        Cross-List
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Brand Authorization</DialogTitle>
            <DialogDescription>
              Request permission to cross-list products from a brand on BaseCampMart.
              The brand will review your request and respond accordingly.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="brandName" className="text-sm font-medium">Brand Name</label>
              <Input 
                id="brandName"
                value={brandRequest.name}
                onChange={(e) => setBrandRequest(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter brand's business name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="brandEmail" className="text-sm font-medium">Brand Email</label>
              <Input 
                id="brandEmail"
                type="email"
                value={brandRequest.email}
                onChange={(e) => setBrandRequest(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter brand's contact email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message (Optional)</label>
              <textarea
                id="message"
                className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                value={brandRequest.message}
                onChange={(e) => setBrandRequest(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Explain why you would like to distribute their products"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRequestDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRequestAuthorization}>Send Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
