
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  BarChart3, 
  Users, 
  Target, 
  Tag, 
  Percent,
  AlertTriangle,
  LockKeyhole
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ABTestingPanel from "@/components/promotions/ABTestingPanel";
import AIRecommendationEngine from "@/components/promotions/AIRecommendationEngine";
import PromotionCard from "@/components/promotions/PromotionCard";
import PromotionAnalytics from "@/components/promotions/PromotionAnalytics";

// Define a type for the recommendation that matches AIRecommendationEngine's RecommendationType
interface RecommendationType {
  id: string;
  title: string;
  description: string;
  impact: string;
  confidence: number;
  category: "inventory" | "bundle" | "seasonal" | "audience" | "timing";
  products?: number | string;
  recommended?: string;
  predictedRevenue?: string;
  predictedConversion?: string;
  targetAudience?: string[];
}

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("promotions");
  const { toast } = useToast();

  // Updated promotions data to match PromotionCard props
  // Changed products from string[] to string to match PromotionProps
  // And updated performance from number to Performance object
  const promotions = [
    {
      id: "promo1",
      title: "Summer Sale",
      name: "Summer Sale Campaign",
      type: "discount",
      discount: "20%",
      products: "3 products", // Changed from array to string to match PromotionProps
      status: "active",
      startDate: "2025-05-15",
      endDate: "2025-06-15",
      budget: 15000,
      spent: 4200,
      performance: {
        impressions: 8500,
        clicks: 1200,
        conversions: 320,
        revenue: "₹48,600"
      }
    },
    {
      id: "promo2",
      title: "New Collection Launch",
      name: "Spring Collection Launch",
      type: "featured",
      discount: "",
      products: "2 products", // Changed from array to string to match PromotionProps
      status: "scheduled",
      startDate: "2025-05-25",
      endDate: "2025-06-10",
      budget: 25000,
      spent: 0,
      performance: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: "₹0"
      }
    },
    {
      id: "promo3",
      title: "Clearance Sale",
      name: "End of Season Clearance",
      type: "discount",
      discount: "50%",
      products: "4 products", // Changed from array to string to match PromotionProps
      status: "draft",
      startDate: "",
      endDate: "",
      budget: 10000,
      spent: 0,
      performance: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: "₹0"
      }
    }
  ];

  // Add handler for creating promotions from AI recommendations
  const handleCreatePromotion = (recommendation: RecommendationType) => {
    toast({
      title: "Promotion Created",
      description: `Your "${recommendation.title}" promotion has been created successfully.`,
    });
    
    // In a real application, this would create a promotion and redirect
    // For now, we'll just switch to the promotions tab
    setActiveTab("promotions");
  };

  const handleRestrictedFeature = () => {
    toast({
      title: "Restricted Feature",
      description: "Email marketing is managed by BaseCampMart. Vendors cannot directly email customers.",
      variant: "destructive"
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Marketing & Promotions</h1>
              <p className="text-muted-foreground">
                Manage product promotions and marketing campaigns
              </p>
            </div>
            <Button asChild>
              <Link to="/offers-and-promotions">
                Create Promotion
              </Link>
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="promotions">Promotions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="promotions" className="space-y-6">
              {/* Active Promotions */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Active Promotions</h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/offers-and-promotions">View All</Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {promotions.map(promotion => (
                    <PromotionCard key={promotion.id} promotion={promotion} />
                  ))}
                </div>
              </div>

              {/* Restricted Email Marketing */}
              <Card className="border-amber-200">
                <CardHeader className="bg-amber-50">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <CardTitle className="text-lg">Email Marketing Restrictions</CardTitle>
                  </div>
                  <CardDescription>
                    Email marketing to BaseCampMart customers is managed by the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <LockKeyhole className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Restricted Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Direct email marketing to customers is managed by BaseCampMart to maintain brand consistency and customer relationship.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Available Marketing Options</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Tag className="h-4 w-4 text-green-500 mr-2" />
                        <span>Product promotions and discounts</span>
                      </li>
                      <li className="flex items-center">
                        <Tag className="h-4 w-4 text-green-500 mr-2" />
                        <span>Featured product placement</span>
                      </li>
                      <li className="flex items-center">
                        <Tag className="h-4 w-4 text-green-500 mr-2" />
                        <span>In-platform advertising</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={handleRestrictedFeature}>
                    Request Marketing Support
                  </Button>
                </CardFooter>
              </Card>

              {/* Marketing Tools */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Marketing Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Product Discounts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Create percentage or fixed amount discounts for your products
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/offers-and-promotions">Create Discount</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Featured Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Boost visibility by featuring products on the marketplace
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/offers-and-promotions">Feature Products</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">A/B Testing</CardTitle>
                        <Badge>Beta</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Test different product images and descriptions
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => setActiveTab("recommendations")}>
                        Start Testing
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <PromotionAnalytics />
            </TabsContent>

            <TabsContent value="audience">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Target Audience</CardTitle>
                    <Badge>Platform Managed</Badge>
                  </div>
                  <CardDescription>
                    BaseCampMart manages customer segments. You can target products to these segments.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Available Customer Segments</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="border rounded-md p-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">Corporate Gifting</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Corporate customers looking for bulk gifts
                          </p>
                        </div>
                        
                        <div className="border rounded-md p-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-purple-500" />
                            <span className="font-medium">Premium Buyers</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            High-value customers seeking quality products
                          </p>
                        </div>
                        
                        <div className="border rounded-md p-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-green-500" />
                            <span className="font-medium">Event Planners</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Customers organizing events and gatherings
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="font-medium mb-2">Note on Customer Data</h3>
                      <p className="text-sm">
                        BaseCampMart manages all direct customer communications and data.
                        You can target specific segments when creating promotions,
                        but cannot access individual customer data or send direct emails.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <Link to="/offers-and-promotions">Target Segments with Promotions</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Marketing Recommendations</CardTitle>
                    <CardDescription>
                      AI-powered suggestions to improve your product visibility and sales
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AIRecommendationEngine onCreatePromotion={handleCreatePromotion} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>A/B Testing Tool</CardTitle>
                    <CardDescription>
                      Test different product images and descriptions to see what performs best
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ABTestingPanel />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
