
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight, ShoppingCart, Tag, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface HamperListProps {
  viewType: "grid" | "list";
  status: "active" | "draft" | "pending" | "archived";
}

// Mock data for hampers
const mockHampers = [
  {
    id: "hamper-1",
    title: "Corporate Wellness Kit",
    category: "corporate",
    description: "Complete wellness kit with bottle, journal, and healthy snacks",
    imageUrl: "https://placehold.co/600x400?text=Corporate+Wellness+Kit",
    price: "₹2,500",
    status: "active",
    productCount: 5,
    lastUpdated: "2 days ago",
    views: 124,
    orders: 8
  },
  {
    id: "hamper-2",
    title: "Diwali Special Gift Set",
    category: "festival",
    description: "Festive gift set with diyas, sweets box, and custom mug",
    imageUrl: "https://placehold.co/600x400?text=Diwali+Special",
    price: "₹1,800",
    status: "active",
    productCount: 4,
    lastUpdated: "1 week ago",
    views: 280,
    orders: 22
  },
  {
    id: "hamper-3",
    title: "Work From Home Essentials",
    category: "corporate",
    description: "Essential items for remote work - notebook, pen, mug, and stress ball",
    imageUrl: "https://placehold.co/600x400?text=WFH+Essentials",
    price: "₹1,200",
    status: "draft",
    productCount: 6,
    lastUpdated: "3 days ago",
    views: 0,
    orders: 0
  },
  {
    id: "hamper-4",
    title: "Anniversary Celebration Bundle",
    category: "anniversary",
    description: "Elegant hamper for corporate anniversaries with custom items",
    imageUrl: "https://placehold.co/600x400?text=Anniversary+Bundle",
    price: "₹3,500",
    status: "pending",
    productCount: 7,
    lastUpdated: "5 days ago",
    views: 0,
    orders: 0
  },
  {
    id: "hamper-5",
    title: "New Year Welcome Kit",
    category: "seasonal",
    description: "Welcome kit for new employees with branded merchandise",
    imageUrl: "https://placehold.co/600x400?text=Welcome+Kit",
    price: "₹2,200",
    status: "archived",
    productCount: 5,
    lastUpdated: "2 months ago",
    views: 95,
    orders: 12
  }
];

export default function HamperList({ viewType, status }: HamperListProps) {
  // Filter hampers based on status
  const filteredHampers = mockHampers.filter(hamper => hamper.status === status);
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case "draft":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Draft</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Pending</Badge>;
      case "archived":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  if (filteredHampers.length === 0) {
    return (
      <div className="col-span-full py-8 flex flex-col items-center justify-center text-center">
        <Package className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No hampers found</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          {status === "active" && "You don't have any active hampers. Create a new hamper to get started."}
          {status === "draft" && "You don't have any draft hampers. Start creating a hamper to save as a draft."}
          {status === "pending" && "You don't have any hampers pending approval."}
          {status === "archived" && "You don't have any archived hampers."}
        </p>
        {(status === "active" || status === "draft") && (
          <Button asChild className="mt-6">
            <Link to="/create-hamper">Create a Hamper</Link>
          </Button>
        )}
      </div>
    );
  }

  if (viewType === "list") {
    return (
      <div className="col-span-full space-y-4">
        {filteredHampers.map(hamper => (
          <Card key={hamper.id} className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-48 h-48 bg-muted">
                <img 
                  src={hamper.imageUrl} 
                  alt={hamper.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{hamper.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{hamper.category.charAt(0).toUpperCase() + hamper.category.slice(1)}</p>
                    </div>
                    {getStatusBadge(hamper.status)}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm">{hamper.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span>{hamper.productCount} products</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span>{hamper.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Updated {hamper.lastUpdated}</span>
                    </div>
                    {hamper.status === "active" && (
                      <div className="flex items-center gap-1">
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        <span>{hamper.orders} orders</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="mt-auto">
                  <Button asChild variant="outline">
                    <Link to={`/hamper/${hamper.id}`}>
                      {status === "draft" ? "Edit" : "View"} Hamper
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Grid view
  return (
    <>
      {filteredHampers.map(hamper => (
        <Card key={hamper.id} className="overflow-hidden">
          <div className="h-48 bg-muted">
            <img 
              src={hamper.imageUrl} 
              alt={hamper.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{hamper.title}</CardTitle>
              {getStatusBadge(hamper.status)}
            </div>
            <p className="text-sm text-muted-foreground">{hamper.category.charAt(0).toUpperCase() + hamper.category.slice(1)}</p>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm line-clamp-2">{hamper.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>{hamper.productCount} products</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span>{hamper.price}</span>
              </div>
              {hamper.status === "active" && (
                <div className="flex items-center gap-1 col-span-2">
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  <span>{hamper.orders} orders</span>
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to={`/hamper/${hamper.id}`}>
                {status === "draft" ? "Edit" : "View"} Hamper
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
