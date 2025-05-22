
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Search, Package, X, Filter, Tag, Plus } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dummy product data
const dummyProducts = [
  {
    id: "product-1",
    name: "Premium Stainless Steel Bottle",
    thumbnail: "https://placehold.co/200x200?text=Bottle",
    category: "bottles",
    price: 799,
    inventory: 45,
    crossListed: false
  },
  {
    id: "product-2",
    name: "Organic Cotton T-Shirt",
    thumbnail: "https://placehold.co/200x200?text=T-Shirt",
    category: "apparel",
    price: 599,
    inventory: 120,
    crossListed: false
  },
  {
    id: "product-3",
    name: "Leather-bound Journal",
    thumbnail: "https://placehold.co/200x200?text=Journal",
    category: "diaries",
    price: 450,
    inventory: 80,
    crossListed: false
  },
  {
    id: "product-4",
    name: "Aromatic Candle Set",
    thumbnail: "https://placehold.co/200x200?text=Candles",
    category: "home",
    price: 899,
    inventory: 35,
    crossListed: true
  },
  {
    id: "product-5",
    name: "Gourmet Chocolate Box",
    thumbnail: "https://placehold.co/200x200?text=Chocolates",
    category: "food",
    price: 650,
    inventory: 60,
    crossListed: true
  },
  {
    id: "product-6",
    name: "Wireless Earbuds",
    thumbnail: "https://placehold.co/200x200?text=Earbuds",
    category: "electronics",
    price: 1999,
    inventory: 25,
    crossListed: true
  },
  {
    id: "product-7",
    name: "Bamboo Cutlery Set",
    thumbnail: "https://placehold.co/200x200?text=Cutlery",
    category: "home",
    price: 350,
    inventory: 90,
    crossListed: false
  },
  {
    id: "product-8",
    name: "Travel Pouch",
    thumbnail: "https://placehold.co/200x200?text=Pouch",
    category: "accessories",
    price: 299,
    inventory: 110,
    crossListed: false
  }
];

interface SelectedProduct {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  quantity: number;
  crossListed: boolean;
}

interface HamperProductsSelectorProps {
  selectedProducts: SelectedProduct[];
  updateSelectedProducts: (products: SelectedProduct[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function HamperProductsSelector({ 
  selectedProducts, 
  updateSelectedProducts,
  onNext,
  onPrevious 
}: HamperProductsSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCrossListedOnly, setShowCrossListedOnly] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("your-products");
  const [isLoading, setIsLoading] = useState(false);

  // Apply filters when search, category, or cross-listed filter changes
  useEffect(() => {
    let filtered = [...dummyProducts];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Filter by cross-listed flag
    if (showCrossListedOnly) {
      filtered = filtered.filter(p => p.crossListed);
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, showCrossListedOnly]);

  // Add product to selected list
  const addProduct = (product: any) => {
    const existingIndex = selectedProducts.findIndex(p => p.id === product.id);
    
    if (existingIndex >= 0) {
      // Product already exists, update quantity
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingIndex] = {
        ...updatedProducts[existingIndex],
        quantity: updatedProducts[existingIndex].quantity + 1
      };
      updateSelectedProducts(updatedProducts);
    } else {
      // Add new product with quantity 1
      updateSelectedProducts([
        ...selectedProducts, 
        {
          id: product.id,
          name: product.name,
          thumbnail: product.thumbnail,
          price: product.price,
          quantity: 1,
          crossListed: product.crossListed
        }
      ]);
    }
    
    setDialogOpen(false);
  };

  // Remove product from selected list
  const removeProduct = (productId: string) => {
    updateSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  // Update product quantity
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedProducts = selectedProducts.map(p => 
      p.id === productId ? { ...p, quantity: newQuantity } : p
    );
    
    updateSelectedProducts(updatedProducts);
  };

  // Calculate total price
  const totalPrice = selectedProducts.reduce(
    (sum, product) => sum + (product.price * product.quantity), 
    0
  );

  // Handle moving to next step
  const handleNext = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 500);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Select Products</h2>
      
      {/* Selected Products List */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Selected Products ({selectedProducts.length})</h3>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Products to Hamper</DialogTitle>
                <DialogDescription>
                  Select products to include in your hamper.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="your-products" value={currentTab} onValueChange={setCurrentTab} className="mt-4">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="your-products">Your Products</TabsTrigger>
                  <TabsTrigger value="cross-listed">Cross-Listed Products</TabsTrigger>
                </TabsList>
                
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select 
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="bottles">Bottles</SelectItem>
                        <SelectItem value="apparel">Apparel</SelectItem>
                        <SelectItem value="diaries">Diaries</SelectItem>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {currentTab === "your-products" && (
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="cross-listed-filter"
                          checked={showCrossListedOnly}
                          onCheckedChange={() => setShowCrossListedOnly(!showCrossListedOnly)}
                        />
                        <label htmlFor="cross-listed-filter" className="text-sm cursor-pointer">
                          Cross-listed only
                        </label>
                      </div>
                    )}
                    
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="your-products" className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <Card key={product.id} className="overflow-hidden">
                          <div className="flex flex-col h-full">
                            <div className="h-32 bg-muted">
                              <img 
                                src={product.thumbnail} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <CardContent className="flex flex-col flex-grow p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{product.name}</h4>
                                {product.crossListed && (
                                  <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                                    Cross-Listed
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground mb-2">
                                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                              </div>
                              <div className="mt-auto flex justify-between items-center">
                                <div className="font-medium">₹{product.price}</div>
                                <Button 
                                  size="sm" 
                                  onClick={() => addProduct(product)}
                                  disabled={selectedProducts.some(p => p.id === product.id)}
                                >
                                  {selectedProducts.some(p => p.id === product.id) ? "Added" : "Add"}
                                </Button>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full py-8 flex flex-col items-center justify-center text-center">
                        <Package className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No products found</h3>
                        <p className="text-muted-foreground mt-2">
                          Try adjusting your filters or search term
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="cross-listed" className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredProducts.filter(p => p.crossListed).length > 0 ? (
                      filteredProducts.filter(p => p.crossListed).map((product) => (
                        <Card key={product.id} className="overflow-hidden">
                          <div className="flex flex-col h-full">
                            <div className="h-32 bg-muted">
                              <img 
                                src={product.thumbnail} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <CardContent className="flex flex-col flex-grow p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{product.name}</h4>
                                <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                                  Cross-Listed
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mb-2">
                                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                              </div>
                              <div className="mt-auto flex justify-between items-center">
                                <div className="font-medium">₹{product.price}</div>
                                <Button 
                                  size="sm" 
                                  onClick={() => addProduct(product)}
                                  disabled={selectedProducts.some(p => p.id === product.id)}
                                >
                                  {selectedProducts.some(p => p.id === product.id) ? "Added" : "Add"}
                                </Button>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full py-8 flex flex-col items-center justify-center text-center">
                        <Package className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No cross-listed products found</h3>
                        <p className="text-muted-foreground mt-2">
                          Try adjusting your filters or search term
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
        
        {selectedProducts.length > 0 ? (
          <div className="border rounded-md">
            <div className="p-4 border-b">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
            </div>
            {selectedProducts.map(product => (
              <div key={product.id} className="p-4 border-b last:border-0">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="w-14 h-14 bg-muted rounded">
                      <img 
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      {product.crossListed && (
                        <Badge variant="outline" className="mt-1 text-xs bg-purple-50 text-purple-600 border-purple-200">
                          Cross-Listed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 text-right">₹{product.price}</div>
                  <div className="col-span-3">
                    <div className="flex items-center justify-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, product.quantity - 1)}
                      >
                        -
                      </Button>
                      <div className="w-12 mx-2 text-center">{product.quantity}</div>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8" 
                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="col-span-2 text-right flex justify-between items-center">
                    <span className="font-medium">₹{product.price * product.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8" 
                      onClick={() => removeProduct(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-4 bg-muted/10">
              <div className="flex justify-end">
                <div className="w-1/3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Products Subtotal:</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span>Packaging:</span>
                    <span>Calculated at next step</span>
                  </div>
                  <div className="flex justify-between items-center font-medium text-lg mt-2 pt-2 border-t">
                    <span>Total:</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="border rounded-md py-12 flex flex-col items-center justify-center text-center">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No products added yet</h3>
            <p className="text-muted-foreground mt-2 max-w-md">
              Add products to your hamper by clicking the "Add Product" button above.
            </p>
            <Button onClick={() => setDialogOpen(true)} className="mt-4">
              Add Products
            </Button>
          </div>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous: Details
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedProducts.length === 0 || isLoading}
        >
          {isLoading ? "Saving..." : "Next: Packaging Options"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
