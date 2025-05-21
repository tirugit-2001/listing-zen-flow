
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SearchIcon, Filter, ArrowRight, CheckCircle, Clock, Package, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample order mock data
const sampleOrders = {
  active: [
    {
      id: "sample-1",
      product: "Premium Metal Water Bottle",
      vendor: "EcoThrive Products",
      requestDate: "2025-05-15",
      status: "Approved",
      quantity: 3,
      expectedDelivery: "2025-05-25",
      imageUrl: "https://placehold.co/100x100",
      feedback: ""
    },
    {
      id: "sample-2",
      product: "Organic Cotton Tote Bag",
      vendor: "EcoThrive Products",
      requestDate: "2025-05-16",
      status: "Pending",
      quantity: 2,
      expectedDelivery: "",
      imageUrl: "https://placehold.co/100x100",
      feedback: ""
    },
    {
      id: "sample-3",
      product: "Wireless Charger Pad",
      vendor: "TechGadgetry",
      requestDate: "2025-05-14",
      status: "In Transit",
      quantity: 1,
      expectedDelivery: "2025-05-23",
      imageUrl: "https://placehold.co/100x100",
      feedback: ""
    }
  ],
  past: [
    {
      id: "sample-4",
      product: "Bamboo Notebook & Pen Set",
      vendor: "Wellness Essentials",
      requestDate: "2025-04-20",
      status: "Delivered",
      quantity: 5,
      deliveryDate: "2025-04-28",
      imageUrl: "https://placehold.co/100x100",
      feedback: "Great quality, will be placing a bulk order"
    },
    {
      id: "sample-5",
      product: "Smart Travel Mug",
      vendor: "TechGadgetry",
      requestDate: "2025-04-10",
      status: "Canceled",
      quantity: 2,
      deliveryDate: "",
      imageUrl: "https://placehold.co/100x100",
      feedback: ""
    },
    {
      id: "sample-6",
      product: "Eco-Friendly Gift Hamper",
      vendor: "Premium Office Supplies",
      requestDate: "2025-03-15",
      status: "Delivered",
      quantity: 1,
      deliveryDate: "2025-03-25",
      imageUrl: "https://placehold.co/100x100",
      feedback: "Quality was acceptable, but packaging needs improvement"
    }
  ]
};

interface SampleOrderListProps {
  filter: "active" | "past";
}

export default function SampleOrderList({ filter }: SampleOrderListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSample, setSelectedSample] = useState<any | null>(null);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();
  
  const orders = sampleOrders[filter] || [];
  
  const filteredOrders = orders.filter(order =>
    order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleFeedbackSubmit = () => {
    toast({
      title: "Feedback Submitted",
      description: "Your feedback has been recorded for this sample order",
    });
    setFeedbackDialogOpen(false);
    // In a real app, this would update the sample order with the feedback
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "In Transit":
        return <Package className="h-4 w-4 text-blue-500" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Canceled":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search samples..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No sample orders found
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center p-4 gap-4">
                  <div className="w-16 h-16 shrink-0">
                    <img 
                      src={order.imageUrl} 
                      alt={order.product}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{order.product}</h4>
                    <p className="text-sm text-muted-foreground">{order.vendor}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm">
                      <span>Qty: {order.quantity}</span>
                      <span>Requested: {new Date(order.requestDate).toLocaleDateString()}</span>
                      {order.deliveryDate && (
                        <span>Delivered: {new Date(order.deliveryDate).toLocaleDateString()}</span>
                      )}
                      {order.expectedDelivery && !order.deliveryDate && (
                        <span>Expected: {new Date(order.expectedDelivery).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Badge className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                    
                    <div className="flex items-center gap-2">
                      {filter === "active" && order.status === "Delivered" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedSample(order);
                            setFeedbackDialogOpen(true);
                          }}
                        >
                          Add Feedback
                        </Button>
                      )}
                      
                      {filter === "past" && order.status === "Delivered" && (
                        <Button variant="outline" size="sm">Order Now</Button>
                      )}
                      
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {filter === "past" && order.feedback && (
                  <div className="border-t p-4">
                    <h5 className="font-medium text-sm mb-1">Your Feedback:</h5>
                    <p className="text-sm text-muted-foreground">{order.feedback}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Feedback Dialog */}
      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Feedback</DialogTitle>
            <DialogDescription>
              Please provide your feedback on this sample to help the vendor improve their products.
            </DialogDescription>
          </DialogHeader>
          
          {selectedSample && (
            <div className="flex items-center gap-3 py-2">
              <img 
                src={selectedSample.imageUrl} 
                alt={selectedSample.product}
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                <h4 className="font-medium">{selectedSample.product}</h4>
                <p className="text-sm text-muted-foreground">{selectedSample.vendor}</p>
              </div>
            </div>
          )}
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Share your thoughts on the quality, design, and functionality of the sample"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setFeedbackDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
