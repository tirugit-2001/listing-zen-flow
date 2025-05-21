
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Filter, Link, SearchIcon, Tag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  isCrossListed: boolean;
  canBeAuthorized: boolean;
  imageUrl: string;
}

// Mock data
const productsData: Product[] = [
  {
    id: "p1",
    name: "Premium Metal Water Bottle",
    brand: "EcoThrive Products",
    category: "bottles",
    price: "₹850",
    isCrossListed: true,
    canBeAuthorized: true,
    imageUrl: "https://placehold.co/300x300"
  },
  {
    id: "p2",
    name: "Organic Cotton Tote Bag",
    brand: "EcoThrive Products",
    category: "bags",
    price: "₹450",
    isCrossListed: false,
    canBeAuthorized: true,
    imageUrl: "https://placehold.co/300x300"
  },
  {
    id: "p3",
    name: "Wireless Charger Pad",
    brand: "TechGadgetry",
    category: "electronics",
    price: "₹1,200",
    isCrossListed: true,
    canBeAuthorized: true,
    imageUrl: "https://placehold.co/300x300"
  },
  {
    id: "p4",
    name: "Bamboo Notebook & Pen Set",
    brand: "Wellness Essentials",
    category: "stationery",
    price: "₹680",
    isCrossListed: false,
    canBeAuthorized: true,
    imageUrl: "https://placehold.co/300x300"
  },
  {
    id: "p5",
    name: "Smart Travel Mug",
    brand: "TechGadgetry",
    category: "bottles",
    price: "₹1,500",
    isCrossListed: false,
    canBeAuthorized: false,
    imageUrl: "https://placehold.co/300x300"
  },
  {
    id: "p6",
    name: "Eco-Friendly Gift Hamper",
    brand: "Premium Office Supplies",
    category: "hampers",
    price: "₹2,800",
    isCrossListed: false,
    canBeAuthorized: false,
    imageUrl: "https://placehold.co/300x300"
  }
];

interface CrossListingProductsProps {
  userRole: "brand" | "distributor";
}

export default function CrossListingProducts({ userRole }: CrossListingProductsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [crossListDialogOpen, setCrossListDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredProducts = productsData.filter(product => 
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === "all" || product.category === selectedCategory)
  );

  const handleCrossListProduct = () => {
    toast({
      title: "Product cross-listed",
      description: "The product has been successfully cross-listed to your catalog."
    });
    setCrossListDialogOpen(false);
  };

  const handleAuthorizeProduct = () => {
    toast({
      title: "Product authorized",
      description: "This product is now available for distributors to cross-list."
    });
    setAuthDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="bottles">Bottles</SelectItem>
              <SelectItem value="bags">Bags</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="stationery">Stationery</SelectItem>
              <SelectItem value="hampers">Hampers</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No products found
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isCrossListed && (
                  <Badge className="absolute top-2 right-2 bg-green-600">
                    <Link className="h-3 w-3 mr-1" /> Cross-Listed
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <div className="flex justify-between items-center mt-2">
                  <Badge variant="outline">{product.category}</Badge>
                  <span className="font-medium">{product.price}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                {userRole === "distributor" && (
                  <Button 
                    className="w-full" 
                    disabled={!product.canBeAuthorized || product.isCrossListed}
                    onClick={() => {
                      setSelectedProduct(product);
                      setCrossListDialogOpen(true);
                    }}
                  >
                    {product.isCrossListed ? "Already Listed" : "Cross-List Product"}
                  </Button>
                )}
                {userRole === "brand" && (
                  <Button 
                    className="w-full"
                    variant={product.canBeAuthorized ? "outline" : "default"}
                    onClick={() => {
                      setSelectedProduct(product);
                      setAuthDialogOpen(true);
                    }}
                  >
                    {product.canBeAuthorized ? "Manage Authorization" : "Authorize for Cross-Listing"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Cross-List Dialog */}
      <Dialog open={crossListDialogOpen} onOpenChange={setCrossListDialogOpen}>
        <DialogContent>
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>Cross-List Product</DialogTitle>
                <DialogDescription>
                  Add this product to your catalog with your own pricing and details.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex gap-4">
                  <img 
                    src={selectedProduct.imageUrl} 
                    alt={selectedProduct.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-medium">{selectedProduct.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Brand: {selectedProduct.brand}
                    </p>
                    <p className="text-sm">
                      Original Price: <span className="font-medium">{selectedProduct.price}</span>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">Your Selling Price</label>
                  <div className="flex items-center">
                    <span className="mr-2">₹</span>
                    <Input 
                      id="price"
                      type="text"
                      placeholder="Enter your selling price"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="inventory" className="text-sm font-medium">Available Inventory</label>
                  <Input 
                    id="inventory"
                    type="number"
                    placeholder="Enter available quantity"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setCrossListDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCrossListProduct}>
                  <Link className="h-4 w-4 mr-2" />
                  Cross-List Now
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Authorization Dialog */}
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent>
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.canBeAuthorized ? "Manage Authorization" : "Authorize Product"}</DialogTitle>
                <DialogDescription>
                  {selectedProduct.canBeAuthorized 
                    ? "Control which distributors can cross-list this product"
                    : "Allow distributors to cross-list this product on BaseCampMart"}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex gap-4">
                  <img 
                    src={selectedProduct.imageUrl} 
                    alt={selectedProduct.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-medium">{selectedProduct.name}</h3>
                    <p className="text-sm">
                      Price: <span className="font-medium">{selectedProduct.price}</span>
                    </p>
                    <Badge variant="outline" className="mt-1">{selectedProduct.category}</Badge>
                  </div>
                </div>
                
                {selectedProduct.canBeAuthorized ? (
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Authorized Distributors</h4>
                    <div className="border rounded-md p-2 max-h-[200px] overflow-y-auto">
                      <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
                        <span>AceDistributors</span>
                        <Button variant="ghost" size="sm">Remove</Button>
                      </div>
                      <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
                        <span>PromoElite</span>
                        <Button variant="ghost" size="sm">Remove</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Add Distributor</h4>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a distributor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="merch-hub">MerchandiseHub</SelectItem>
                          <SelectItem value="gift-corp">GiftCorp Solutions</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="w-full">Add Distributor</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="all-distributors"
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="all-distributors" className="text-sm font-medium">
                        Allow all authorized distributors
                      </label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      When enabled, all your currently authorized distributors will be able to cross-list this product.
                    </p>
                    
                    <div className="pt-2">
                      <h4 className="text-sm font-medium mb-2">Pricing Rules</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-sm">Minimum selling price:</span>
                        <div className="flex items-center flex-1">
                          <span className="mr-1">₹</span>
                          <Input type="text" placeholder="Min price" className="max-w-[150px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setAuthDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAuthorizeProduct}>
                  {selectedProduct.canBeAuthorized ? "Save Changes" : "Authorize Product"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
