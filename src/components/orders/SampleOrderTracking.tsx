
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, CheckCircle2 } from "lucide-react";

// Mock data for sample order tracking
const trackingData = [
  {
    id: "sample-1",
    trackingId: "BC123456789IN",
    product: "Premium Metal Water Bottle",
    status: "In Transit",
    currentLocation: "Mumbai Sorting Center",
    events: [
      {
        date: "2025-05-18 09:30",
        location: "Mumbai Sorting Center",
        description: "Shipment arrived at sorting facility"
      },
      {
        date: "2025-05-17 14:45",
        location: "Delhi Hub",
        description: "Shipment departed"
      },
      {
        date: "2025-05-16 11:20",
        location: "Delhi Hub",
        description: "Shipment arrived"
      },
      {
        date: "2025-05-15 18:30",
        location: "Vendor Facility",
        description: "Order processed and ready for pickup"
      }
    ]
  },
  {
    id: "sample-3",
    trackingId: "BC987654321IN",
    product: "Wireless Charger Pad",
    status: "Out for Delivery",
    currentLocation: "Bangalore Local Hub",
    events: [
      {
        date: "2025-05-20 08:15",
        location: "Bangalore Local Hub",
        description: "Out for delivery"
      },
      {
        date: "2025-05-19 21:40",
        location: "Bangalore Local Hub",
        description: "Shipment arrived at delivery facility"
      },
      {
        date: "2025-05-18 06:30",
        location: "Chennai Hub",
        description: "Shipment departed"
      },
      {
        date: "2025-05-14 10:15",
        location: "Vendor Facility",
        description: "Order processed and ready for pickup"
      }
    ]
  }
];

export default function SampleOrderTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTracking, setSelectedTracking] = useState<any | null>(null);
  
  const handleSearch = () => {
    if (!searchTerm) return;
    
    const result = trackingData.find(item =>
      item.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSelectedTracking(result || null);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "In Transit":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Out for Delivery":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "Delayed":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Enter tracking ID or product name"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleSearch}>Track</Button>
      </div>
      
      {/* Display all available tracking if no search */}
      {!searchTerm && !selectedTracking && trackingData.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Active Sample Shipments</h3>
          {trackingData.map((item) => (
            <Card 
              key={item.id}
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => setSelectedTracking(item)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{item.product}</h4>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Tracking ID: <span className="font-medium">{item.trackingId}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Current Location: {item.currentLocation}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* When a tracking is selected or searched */}
      {selectedTracking && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{selectedTracking.product}</h4>
                <Badge className={getStatusColor(selectedTracking.status)}>
                  {selectedTracking.status}
                </Badge>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Tracking ID: <span className="font-medium">{selectedTracking.trackingId}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Current Location: {selectedTracking.currentLocation}
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-muted" />
                <div className="space-y-6">
                  {selectedTracking.events.map((event: any, index: number) => (
                    <div key={index} className="relative pl-6">
                      <div className="absolute left-0 top-1 rounded-full bg-primary w-4 h-4 flex items-center justify-center">
                        {index === 0 && <CheckCircle2 className="h-3 w-3 text-background" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{event.description}</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {searchTerm && (
            <Button variant="outline" onClick={() => setSelectedTracking(null)}>
              Back to all shipments
            </Button>
          )}
        </div>
      )}
      
      {/* No tracking found after search */}
      {searchTerm && !selectedTracking && (
        <div className="text-center py-8 text-muted-foreground">
          No tracking information found for "{searchTerm}"
        </div>
      )}
    </div>
  );
}
