
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarCheck, 
  BarChart,
  Percent,
  BadgePercent
} from "lucide-react";

interface Performance {
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: string;
}

interface PromotionProps {
  id: string;
  name: string;
  type: string;
  discount: string;
  startDate: string;
  endDate: string;
  products: number | string;
  status: string;
  performance?: Performance;
}

interface Props {
  promotion: PromotionProps;
}

export default function PromotionCard({ promotion }: Props) {
  // Get icon based on promotion type
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'discount':
        return <Percent className="h-4 w-4" />;
      case 'coupon':
        return <BadgePercent className="h-4 w-4" />;
      default:
        return <BadgePercent className="h-4 w-4" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-lg">{promotion.name}</h3>
              <Badge variant="default" className="bg-green-600">
                Active
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {`${promotion.discount} • ${promotion.type} • ${promotion.products} products`}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {`${new Date(promotion.startDate).toLocaleDateString()} - 
                ${new Date(promotion.endDate).toLocaleDateString()}`}
              </span>
            </div>
            
            {promotion.performance && (
              <div className="mt-3 grid grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Impressions</p>
                  <p className="font-medium">{promotion.performance.impressions}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Clicks</p>
                  <p className="font-medium">{promotion.performance.clicks}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Conversions</p>
                  <p className="font-medium">{promotion.performance.conversions}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="font-medium">{promotion.performance.revenue}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <BarChart className="h-4 w-4 mr-1" />
              Analytics
            </Button>
            <Button variant="outline" size="sm">Edit</Button>
            <Button size="sm">Manage</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
