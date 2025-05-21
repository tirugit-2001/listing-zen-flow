
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Check, Filter, MoreHorizontal, Plus, SearchIcon, X } from "lucide-react";

interface Distributor {
  id: string;
  name: string;
  email: string;
  status: "active" | "pending" | "inactive";
  productsAuthorized: number;
  dateAdded: string;
}

// Mock data
const distributors: Distributor[] = [
  {
    id: "d1",
    name: "AceDistributors",
    email: "contact@acedistributors.com",
    status: "active",
    productsAuthorized: 42,
    dateAdded: "2025-03-15"
  },
  {
    id: "d2",
    name: "PromoElite",
    email: "sales@promoelite.com",
    status: "active",
    productsAuthorized: 28,
    dateAdded: "2025-04-02"
  },
  {
    id: "d3",
    name: "MerchandiseHub",
    email: "info@merchandisehub.com",
    status: "pending",
    productsAuthorized: 0,
    dateAdded: "2025-05-18"
  },
  {
    id: "d4",
    name: "GiftCorp Solutions",
    email: "business@giftcorp.com",
    status: "inactive",
    productsAuthorized: 15,
    dateAdded: "2025-01-10"
  }
];

export default function BrandDistributorsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newDistributor, setNewDistributor] = useState({
    email: "",
    name: ""
  });
  const { toast } = useToast();

  const filteredDistributors = distributors.filter(distributor => 
    distributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    distributor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDistributor = () => {
    // Here you would typically send this data to your API
    toast({
      title: "Distributor invitation sent",
      description: `${newDistributor.name} has been invited to become your authorized distributor.`
    });
    setAddDialogOpen(false);
    setNewDistributor({ email: "", name: "" });
  };

  const handleStatusChange = (id: string, status: "active" | "pending" | "inactive") => {
    toast({
      title: "Status updated",
      description: `Distributor status has been updated to ${status}.`
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search distributors..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Distributor
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Distributor Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Products Authorized</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDistributors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No distributors found
                </TableCell>
              </TableRow>
            ) : (
              filteredDistributors.map((distributor) => (
                <TableRow key={distributor.id}>
                  <TableCell>{distributor.name}</TableCell>
                  <TableCell>{distributor.email}</TableCell>
                  <TableCell>
                    <Badge variant={
                      distributor.status === "active" ? "default" : 
                      distributor.status === "pending" ? "secondary" : "outline"
                    }>
                      {distributor.status.charAt(0).toUpperCase() + distributor.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{distributor.productsAuthorized}</TableCell>
                  <TableCell>{distributor.dateAdded}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(distributor.id, "active")}>
                          <Check className="h-4 w-4 mr-2" />
                          Set Active
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(distributor.id, "inactive")}>
                          <X className="h-4 w-4 mr-2" />
                          Set Inactive
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Manage Products</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Distributor</DialogTitle>
            <DialogDescription>
              Invite a distributor to sell your products on BaseCampMart.
              They will receive an email invitation to accept your authorization.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Distributor Business Name</label>
              <Input 
                id="name"
                value={newDistributor.name}
                onChange={(e) => setNewDistributor(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter distributor's business name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <Input 
                id="email"
                type="email"
                value={newDistributor.email}
                onChange={(e) => setNewDistributor(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter distributor's email address"
              />
              <p className="text-xs text-muted-foreground">
                This email will receive an invitation to authorize your products.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddDistributor}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
