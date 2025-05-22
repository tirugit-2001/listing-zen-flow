
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, ShoppingCart, Image as ImageIcon, Tag, Eye } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HamperPreviewProps {
  hamperData: any;
}

export default function HamperPreview({ hamperData }: HamperPreviewProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Calculate total price
  const calculateTotalPrice = () => {
    // Sum of all products
    const productsTotal = hamperData.products.reduce(
      (sum: number, product: any) => sum + (product.price * product.quantity),
      0
    );
    
    // Add packaging cost (simulated)
    let packagingCost = 0;
    switch(hamperData.packageType) {
      case "premium":
        packagingCost = 250;
        break;
      case "luxury":
        packagingCost = 450;
        break;
      case "eco":
        packagingCost = 180;
        break;
      default: // standard
        packagingCost = 120;
        break;
    }
    
    // Add branding costs (simulated)
    const brandingCost = (hamperData.brandingOptions?.length || 0) * 50;
    
    return {
      productsTotal,
      packagingCost,
      brandingCost,
      total: productsTotal + packagingCost + brandingCost
    };
  };
  
  const pricing = calculateTotalPrice();

  return (
    <Card className="sticky top-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Preview</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Image Preview */}
        <div className="aspect-square bg-muted rounded-md overflow-hidden relative">
          {hamperData.images && hamperData.images.length > 0 ? (
            <img 
              src={hamperData.images[0]} 
              alt="Hamper preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No image uploaded yet</p>
            </div>
          )}
        </div>
        
        {/* Title & Category */}
        <div className="space-y-1.5">
          <h3 className="font-medium text-lg line-clamp-2">
            {hamperData.title || "Untitled Hamper"}
          </h3>
          {hamperData.category && (
            <Badge variant="outline" className="font-normal text-xs">
              {hamperData.category.charAt(0).toUpperCase() + hamperData.category.slice(1)}
            </Badge>
          )}
        </div>
        
        {/* Description */}
        {hamperData.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {hamperData.description}
          </p>
        )}
        
        {/* Products */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Products:</span>
            <span>{hamperData.products?.length || 0} items</span>
          </div>
          
          {hamperData.products && hamperData.products.length > 0 ? (
            <div className="border rounded-md p-2 space-y-2 max-h-[200px] overflow-y-auto">
              {hamperData.products.map((product: any, index: number) => (
                <div key={index} className="flex justify-between items-center text-sm border-b last:border-0 pb-2 last:pb-0">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-muted rounded flex-shrink-0">
                      {product.thumbnail && (
                        <img 
                          src={product.thumbnail} 
                          alt={product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      )}
                    </div>
                    <span className="line-clamp-1">{product.name}</span>
                  </div>
                  <span>×{product.quantity}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-md p-3 text-center bg-muted/30">
              <p className="text-sm text-muted-foreground">No products added yet</p>
            </div>
          )}
        </div>
        
        {/* Packaging */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Packaging:</span>
            <span>
              {hamperData.packageType ? (
                hamperData.packageType.charAt(0).toUpperCase() + hamperData.packageType.slice(1)
              ) : (
                "Not selected"
              )}
            </span>
          </div>
          
          {hamperData.brandingOptions && hamperData.brandingOptions.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {hamperData.brandingOptions.map((option: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                  {option.replace(/-/g, ' ')}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <Separator />
        
        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Products Subtotal:</span>
            <span>₹{pricing.productsTotal || 0}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Packaging:</span>
            <span>₹{pricing.packagingCost || 0}</span>
          </div>
          {pricing.brandingCost > 0 && (
            <div className="flex justify-between text-sm">
              <span>Branding Options:</span>
              <span>₹{pricing.brandingCost}</span>
            </div>
          )}
          
          <div className="flex justify-between font-medium border-t pt-2">
            <span>Total Price:</span>
            <span>₹{pricing.total || 0}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <TooltipProvider>
          <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full" disabled onClick={() => setShowTooltip(true)}>
                <Eye className="mr-2 h-4 w-4" />
                Preview as Customer
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Available after submitting for approval</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
