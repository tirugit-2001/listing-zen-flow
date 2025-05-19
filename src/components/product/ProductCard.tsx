
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Tag } from "lucide-react";

type ProductCardProps = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  imageSrc: string;
  brandingAvailable?: boolean;
  price?: number;
  digital?: boolean;
};

export default function ProductCard({
  id,
  name,
  category,
  subcategory,
  imageSrc,
  brandingAvailable = false,
  price,
  digital = false,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover-scale">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover transition-transform"
        />
        {digital && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
              Digital
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold line-clamp-1">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {category} - {subcategory}
            </p>
          </div>
          {brandingAvailable && (
            <Badge variant="outline" className="bg-brand-yellow/10 text-brand-dark border-brand-yellow">
              Brandable
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {price && (
          <p className="font-medium">
            ₹{price.toFixed(2)}
            <span className="text-xs text-muted-foreground ml-1">onwards</span>
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="sm" className="w-full">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          <Tag className="h-4 w-4 mr-2" />
          Brand
        </Button>
      </CardFooter>
    </Card>
  );
}
