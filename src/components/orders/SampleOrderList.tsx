
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Eye, 
  MoreVertical, 
  Download, 
  ClipboardCheck, 
  ThumbsUp, 
  ThumbsDown,
  Check,
  X
} from "lucide-react";

// Define sample order types
type SampleOrder = {
  id: string;
  product: string;
  vendor: string;
  requestDate: string;
  status: string;
  quantity: number;
  expectedDelivery: string;
  imageUrl: string;
  feedback: string;
};

// Mock data for sample orders
const activeSampleOrders: SampleOrder[] = [
  {
    id: "SO-001",
    product: "Eco-friendly Water Bottle",
    vendor: "GreenWare Inc.",
    requestDate: "2025-05-10",
    status: "Processing",
    quantity: 2,
    expectedDelivery: "2025-05-25",
    imageUrl: "/placeholder.svg",
    feedback: ""
  },
  {
    id: "SO-002",
    product: "Cotton Canvas Tote",
    vendor: "Fabric Designers",
    requestDate: "2025-05-12",
    status: "Shipped",
    quantity: 3,
    expectedDelivery: "2025-05-20",
    imageUrl: "/placeholder.svg",
    feedback: ""
  },
  {
    id: "SO-003",
    product: "Bamboo Notebook",
    vendor: "EcoStationery",
    requestDate: "2025-05-14",
    status: "Processing",
    quantity: 5,
    expectedDelivery: "2025-05-28",
    imageUrl: "/placeholder.svg",
    feedback: ""
  }
];

const pastSampleOrders: SampleOrder[] = [
  {
    id: "SO-004",
    product: "Recycled Pen Set",
    vendor: "Office Eco",
    requestDate: "2025-04-02",
    status: "Delivered",
    quantity: 10,
    expectedDelivery: "2025-04-10",
    imageUrl: "/placeholder.svg",
    feedback: "Good quality, will place bulk order"
  },
  {
    id: "SO-005",
    product: "Wooden USB Drive",
    vendor: "TechWood",
    requestDate: "2025-04-15",
    status: "Delivered",
    quantity: 2,
    expectedDelivery: "2025-04-22",
    imageUrl: "/placeholder.svg",
    feedback: "Not satisfied with storage capacity"
  },
  {
    id: "SO-006",
    product: "Recycled Paper Notepad",
    vendor: "GreenPaper Co.",
    requestDate: "2025-03-28",
    status: "Delivered",
    quantity: 5,
    expectedDelivery: "2025-04-05",
    imageUrl: "/placeholder.svg",
    feedback: "Great quality, approved for bulk order"
  }
];

interface SampleOrderListProps {
  filter: "active" | "past" | "all";
}

export default function SampleOrderList({ filter }: SampleOrderListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(filter === "all" ? "active" : filter);
  
  let filteredOrders = activeTab === "active" ? activeSampleOrders : pastSampleOrders;
  
  if (searchTerm) {
    filteredOrders = filteredOrders.filter(order => 
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Processing</Badge>;
      case "Shipped":
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Shipped</Badge>;
      case "Delivered":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Delivered</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {filter === "all" && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="hidden md:table-cell">Vendor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date Requested</TableHead>
              <TableHead className="hidden md:table-cell">Expected Delivery</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell className="hidden md:table-cell">{order.vendor}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(order.requestDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(order.expectedDelivery).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        
                        {order.status === "Delivered" ? (
                          <>
                            <DropdownMenuItem>
                              <ThumbsUp className="mr-2 h-4 w-4 text-green-600" />
                              <span>Approve Sample</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ThumbsDown className="mr-2 h-4 w-4 text-red-600" />
                              <span>Reject Sample</span>
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem>
                            <ClipboardCheck className="mr-2 h-4 w-4" />
                            <span>Track Order</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No sample orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {filteredOrders.length > 0 && activeTab === "past" && (
        <div className="mt-6">
          <h3 className="font-medium mb-3">Sample Feedback Summary</h3>
          <div className="space-y-3">
            {pastSampleOrders.map(order => (
              <div key={`feedback-${order.id}`} className="p-3 border rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{order.product}</p>
                    <p className="text-sm text-muted-foreground">{order.vendor} • {order.id}</p>
                  </div>
                  {order.feedback.includes("approved") || order.feedback.includes("will place") ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center">
                      <Check className="mr-1 h-3 w-3" /> Approved
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 flex items-center">
                      <X className="mr-1 h-3 w-3" /> Rejected
                    </Badge>
                  )}
                </div>
                <div className="mt-2">
                  <p className="text-sm">{order.feedback || "No feedback provided"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
