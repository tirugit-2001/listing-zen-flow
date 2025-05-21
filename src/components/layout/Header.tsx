
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
  BarChart,
  Menu,
  X,
  LogIn,
  LogOut
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const { toast } = useToast();
  const { isAuthenticated, user, logout } = useAuth();
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  
  // Close search dropdown when route changes
  useEffect(() => {
    setShowSearch(false);
    setShowMobileMenu(false);
  }, [location.pathname]);
  
  // Helper to check if a path is active
  const isActive = (path: string) => location.pathname === path;
  const isActiveParent = (path: string) => location.pathname.startsWith(path);

  // Helper to get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get avatar color based on user role
  const getAvatarColor = () => {
    if (!user?.role) return "bg-primary";
    
    switch (user.role) {
      case "admin":
        return "bg-purple-500";
      case "vendor":
        return "bg-cyan-500";
      default:
        return "bg-primary";
    }
  };

  // Mobile menu content
  const MobileMenuContent = () => (
    <div className="flex flex-col gap-4 py-4">
      <div className="border-b pb-4">
        <p className="font-medium mb-2">Products</p>
        <div className="space-y-2">
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/products" className={isActive('/products') ? 'text-primary font-medium' : ''}>All Products</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/add-product" className={isActive('/add-product') ? 'text-primary font-medium' : ''}>Add Product</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/branding-canvas" className={isActive('/branding-canvas') ? 'text-primary font-medium' : ''}>Branding Canvas</Link>
          </Button>
        </div>
      </div>
      
      <div className="border-b pb-4">
        <p className="font-medium mb-2">Orders</p>
        <div className="space-y-2">
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/orders" className={isActive('/orders') ? 'text-primary font-medium' : ''}>Manage Orders</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/proposals" className={isActive('/proposals') ? 'text-primary font-medium' : ''}>Proposals</Link>
          </Button>
        </div>
      </div>
      
      <div className="border-b pb-4">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/return-gifts" className={isActiveParent('/return-gifts') ? 'text-primary font-medium' : ''}>Return Gifts</Link>
        </Button>
      </div>
      
      <div className="border-b pb-4">
        <p className="font-medium mb-2">Marketing</p>
        <div className="space-y-2">
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/marketing" className={isActive('/marketing') ? 'text-primary font-medium' : ''}>Campaign Dashboard</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/marketing/audience-segments" className={isActive('/marketing/audience-segments') ? 'text-primary font-medium' : ''}>Audience Segments</Link>
          </Button>
        </div>
      </div>
      
      <div>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/analytics" className={isActive('/analytics') ? 'text-primary font-medium' : ''}>Analytics</Link>
        </Button>
      </div>
      
      {isAuthenticated ? (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-3 mb-4 px-2">
            <Avatar>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className={getAvatarColor()}>{getUserInitials()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/account-settings">
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="mt-4 pt-4 border-t">
          <Button asChild className="w-full">
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Link>
          </Button>
          <p className="text-center mt-2 text-sm text-muted-foreground">
            New vendor?{" "}
            <Link to="/vendor-onboarding" className="text-primary hover:underline">
              Apply here
            </Link>
          </p>
        </div>
      )}
    </div>
  );

  return (
    <header className="border-b shadow-sm sticky top-0 bg-background z-10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="block md:hidden">
            <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link to="/seller-central" className="flex items-center gap-2" onClick={() => setShowMobileMenu(false)}>
                      <div className="bg-brand-yellow p-2 rounded-md">
                        <Package className="h-5 w-5 text-brand-dark" />
                      </div>
                      <span className="text-xl font-bold">Seller Central</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <MobileMenuContent />
              </SheetContent>
            </Sheet>
          </div>
          
          <Link to="/seller-central" className="flex items-center gap-2">
            <div className="bg-brand-yellow p-2 rounded-md">
              <Package className="h-6 w-6 text-brand-dark" />
            </div>
            <span className="text-xl font-bold hidden sm:inline">Seller Central</span>
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

        <div className="flex items-center gap-1 sm:gap-2">
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
                  className="hidden sm:flex"
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
                  className="hidden sm:flex"
                  onClick={() => setShowBulkImport(true)}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Import</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Import products in bulk</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline"
                  size="icon"
                  className="hidden md:flex"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help & Resources</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* User Account Section */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className={getAvatarColor()}>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className={getAvatarColor()}>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account-settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: "Profile", description: "View and edit your profile" })}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={logout}
                  className="text-red-500 focus:text-red-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link to="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            </Button>
          )}
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
