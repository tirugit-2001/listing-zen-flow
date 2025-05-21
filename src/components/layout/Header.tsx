
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  Upload, 
  Bell, 
  Settings, 
  HelpCircle, 
  User, 
  Search, 
  Globe, 
  MessageSquare, 
  TrendingUp, 
  BarChart
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import BulkImport from "@/components/product/BulkImport";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

export default function Header() {
  const { toast } = useToast();
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  
  // Helper to check if a path is active
  const isActive = (path: string) => location.pathname === path;
  const isActiveParent = (path: string) => location.pathname.startsWith(path);

  return (
    <header className="border-b shadow-sm sticky top-0 bg-background z-10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/seller-central" className="flex items-center gap-2">
            <div className="bg-brand-yellow p-2 rounded-md">
              <Package className="h-6 w-6 text-brand-dark" />
            </div>
            <span className="text-xl font-bold">Seller Central</span>
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={isActiveParent('/products') || isActiveParent('/add-product') || isActiveParent('/branding-canvas') ? 'text-primary font-medium' : ''}>
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[220px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/products" className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${isActive('/products') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}>
                          <div className="text-sm font-medium">All Products</div>
                          <div className="line-clamp-2 text-sm text-muted-foreground">
                            View and manage your product catalog
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/add-product" className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${isActive('/add-product') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}>
                          <div className="text-sm font-medium">Add Product</div>
                          <div className="line-clamp-2 text-sm text-muted-foreground">
                            Create a new product listing
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/branding-canvas" className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${isActive('/branding-canvas') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}>
                          <div className="text-sm font-medium">Branding Canvas</div>
                          <div className="line-clamp-2 text-sm text-muted-foreground">
                            Customize branding zones on products
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className={isActive('/orders') || isActive('/proposals') ? 'text-primary font-medium' : ''}>
                  Orders
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[220px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/orders" className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${isActive('/orders') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}>
                          <div className="text-sm font-medium">Manage Orders</div>
                          <div className="line-clamp-2 text-sm text-muted-foreground">
                            View and process incoming orders
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/proposals" className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${isActive('/proposals') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}>
                          <div className="text-sm font-medium">Proposals</div>
                          <div className="line-clamp-2 text-sm text-muted-foreground">
                            Manage client proposals
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/return-gifts" className={isActiveParent('/return-gifts') ? 'text-primary font-medium' : ''}>
                    Return Gifts
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={isActiveParent('/marketing') ? 'text-primary font-medium' : ''}>
                  Marketing
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[280px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/marketing" className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${isActive('/marketing') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}>
                          <div className="text-sm font-medium">Campaign Dashboard</div>
                          <div className="line-clamp-2 text-sm text-muted-foreground">
                            Manage all your marketing campaigns
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/marketing/audience-segments" className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${isActive('/marketing/audience-segments') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}>
                          <div className="text-sm font-medium">Audience Segments</div>
                          <div className="line-clamp-2 text-sm text-muted-foreground">
                            Create and manage customer segments
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/analytics" className={isActive('/analytics') ? 'text-primary font-medium' : ''}>
                    Analytics
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Global Search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {showSearch && (
            <div className="absolute top-16 right-4 mt-1 bg-background border rounded-md shadow-lg p-3 w-80 z-50">
              <Input 
                placeholder="Search products, orders, campaigns..." 
                className="w-full"
                autoFocus
              />
            </div>
          )}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => toast({
                    title: "Notifications",
                    description: "You have no new notifications",
                  })}
                >
                  <Bell className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  onClick={() => setShowBulkImport(true)}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Import
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Import multiple products at once</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline"
                  size="icon"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help & Resources</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline"
                  size="icon"
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch Platform</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/account-settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
