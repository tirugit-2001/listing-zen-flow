
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  BadgePercent, 
  BadgeDollarSign, 
  TicketPercent, 
  Percent, 
  ChartBar, 
  ChartPie, 
  Calendar,
  CalendarCheck,
  Tag,
  Tags,
  TrendingUp,
  Sparkles,
  Split,
  Brain,
  Users
} from "lucide-react";
import PromotionAnalytics from "@/components/promotions/PromotionAnalytics";
import PromotionPredictiveAnalytics from "@/components/promotions/PromotionPredictiveAnalytics";
import PromotionCard from "@/components/promotions/PromotionCard";
import CreatePromotionForm from "@/components/promotions/CreatePromotionForm";
import AIRecommendationEngine from "@/components/promotions/AIRecommendationEngine";
import ABTestingPanel from "@/components/promotions/ABTestingPanel";

export default function OffersAndPromotionsPage() {
  const [activeTab, setActiveTab] = useState("active-promotions");
  const { toast } = useToast();
  
  // Sample promotions data
  const activePromotions = [
    {
      id: "promo-1",
      name: "Summer Sale 2025",
      type: "Discount",
      discount: "20%",
      startDate: "2025-06-01",
      endDate: "2025-06-30",
      products: 12,
      status: "active",
      performance: {
        impressions: 1245,
        clicks: 320,
        conversions: 67,
        revenue: "₹32,800"
      }
    },
    {
      id: "promo-2",
      name: "Corporate Gifts Bundle",
      type: "Bundle",
      discount: "Buy 3 Get 1 Free",
      startDate: "2025-05-15",
      endDate: "2025-07-15",
      products: 4,
      status: "active",
      performance: {
        impressions: 860,
        clicks: 175,
        conversions: 42,
        revenue: "₹21,500"
      }
    },
    {
      id: "promo-3",
      name: "First-Time Buyer Coupon",
      type: "Coupon",
      discount: "₹500 Off",
      startDate: "2025-05-01",
      endDate: "2025-12-31",
      products: "All products",
      status: "active",
      performance: {
        impressions: 3250,
        clicks: 620,
        conversions: 135,
        revenue: "₹67,500"
      }
    }
  ];
  
  const scheduledPromotions = [
    {
      id: "promo-4",
      name: "Diwali Special",
      type: "Flash Sale",
      discount: "30%",
      startDate: "2025-10-15",
      endDate: "2025-11-15",
      products: 25,
      status: "scheduled"
    }
  ];
  
  const expiredPromotions = [
    {
      id: "promo-5",
      name: "New Year Sale",
      type: "Discount",
      discount: "15%",
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      products: 18,
      status: "expired",
      performance: {
        impressions: 2180,
        clicks: 495,
        conversions: 89,
        revenue: "₹42,650"
      }
    }
  ];
  
  // KPIs data with enhanced AI metrics
  const kpiData = {
    activePromotions: activePromotions.length,
    totalRevenue: "₹121,950",
    conversionRate: "22%",
    averageDiscount: "18%",
    aiScore: 87, // New AI optimization score
    predictedRevenue: "₹174,800" // New AI-predicted revenue
  };
  
  // Create new promotion handler
  const handleCreatePromotion = (data) => {
    console.log("Creating new promotion:", data);
    toast({
      title: "Promotion Created",
      description: `${data.name} has been created successfully.`,
    });
    setActiveTab("active-promotions");
  };

  // Create promotion from AI recommendation
  const handleCreateFromRecommendation = (recommendation) => {
    console.log("Creating promotion from recommendation:", recommendation);
    toast({
      title: "Creating From Recommendation",
      description: `Setting up "${recommendation.title}" promotion.`,
    });
    setActiveTab("create-promotion");
  };

  // Create A/B test handler
  const handleCreateTest = () => {
    console.log("Creating new A/B test");
    toast({
      title: "A/B Test Setup",
      description: "Starting A/B test creation wizard.",
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Offers & Promotions
              <Badge variant="default" className="ml-2 bg-emerald-600">BaseCampMart</Badge>
            </h1>
            <p className="text-muted-foreground">
              Create and manage promotional offers, coupons, and sale events
            </p>
          </div>
          
          <Button onClick={() => setActiveTab("create-promotion")}>
            <BadgePercent className="mr-2 h-4 w-4" />
            Create New Promotion
          </Button>
        </div>
        
        {/* Enhanced KPI Cards with AI Insights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full mb-3">
                  <BadgePercent className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Active Promotions</h3>
                <p className="text-2xl font-bold">{kpiData.activePromotions}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full mb-3">
                  <BadgeDollarSign className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Promotion Revenue</h3>
                <p className="text-2xl font-bold">{kpiData.totalRevenue}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-full mb-3">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
                <p className="text-2xl font-bold">{kpiData.conversionRate}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-amber-100 text-amber-600 p-2 rounded-full mb-3">
                  <Percent className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Avg. Discount</h3>
                <p className="text-2xl font-bold">{kpiData.averageDiscount}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full mb-3">
                  <Brain className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">AI Optimization Score</h3>
                <p className="text-2xl font-bold text-blue-700">{kpiData.aiScore}/100</p>
                <Badge variant="outline" className="mt-1 bg-blue-100 border-blue-300 text-blue-700">Excellent</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1 border-emerald-200 bg-emerald-50">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full mb-3">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">AI-Predicted Revenue</h3>
                <p className="text-2xl font-bold text-emerald-700">{kpiData.predictedRevenue}</p>
                <Badge variant="outline" className="mt-1 bg-emerald-100 border-emerald-300 text-emerald-700">+43% vs Current</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Tabs - Enhanced with AI capabilities */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:w-full">
            <TabsTrigger value="active-promotions">Active</TabsTrigger>
            <TabsTrigger value="scheduled-promotions">Scheduled</TabsTrigger>
            <TabsTrigger value="expired-promotions">Expired</TabsTrigger>
            <TabsTrigger value="ai-recommendations">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Recommendations
            </TabsTrigger>
            <TabsTrigger value="predictive-analytics">
              <ChartBar className="mr-2 h-4 w-4" />
              Predictive Analytics
            </TabsTrigger>
            <TabsTrigger value="ab-testing">
              <Split className="mr-2 h-4 w-4" />
              A/B Testing
            </TabsTrigger>
            <TabsTrigger value="create-promotion">Create New</TabsTrigger>
          </TabsList>
          
          {/* Active Promotions Tab */}
          <TabsContent value="active-promotions" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Promotions List */}
              <div className="w-full md:w-2/3 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Active Promotions ({activePromotions.length})</h2>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="discount">Discounts</SelectItem>
                        <SelectItem value="bundle">Bundles</SelectItem>
                        <SelectItem value="coupon">Coupons</SelectItem>
                        <SelectItem value="flash">Flash Sales</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Search promotions..." className="max-w-[200px]" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {activePromotions.map(promotion => (
                    <PromotionCard key={promotion.id} promotion={promotion} />
                  ))}
                </div>
              </div>
              
              {/* Analytics Panel */}
              <div className="w-full md:w-1/3">
                <PromotionAnalytics />
              </div>
            </div>
          </TabsContent>
          
          {/* Scheduled Promotions Tab */}
          <TabsContent value="scheduled-promotions" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Scheduled Promotions ({scheduledPromotions.length})</h2>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="discount">Discounts</SelectItem>
                    <SelectItem value="bundle">Bundles</SelectItem>
                    <SelectItem value="coupon">Coupons</SelectItem>
                    <SelectItem value="flash">Flash Sales</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Search promotions..." className="max-w-[200px]" />
              </div>
            </div>
            
            <div className="space-y-4">
              {scheduledPromotions.length > 0 ? (
                scheduledPromotions.map(promotion => (
                  <Card key={promotion.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-lg">{promotion.name}</h3>
                            <Badge variant="outline" className="border-amber-500 text-amber-500">
                              Scheduled
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            {`${promotion.discount} • ${promotion.type} • ${promotion.products} products`}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {`Starts ${new Date(promotion.startDate).toLocaleDateString()} - 
                              Ends ${new Date(promotion.endDate).toLocaleDateString()}`}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button size="sm">Activate Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No scheduled promotions found.</p>
                    <Button className="mt-4" onClick={() => setActiveTab("create-promotion")}>
                      Create New Promotion
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          {/* Expired Promotions Tab */}
          <TabsContent value="expired-promotions" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Expired Promotions ({expiredPromotions.length})</h2>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="discount">Discounts</SelectItem>
                    <SelectItem value="bundle">Bundles</SelectItem>
                    <SelectItem value="coupon">Coupons</SelectItem>
                    <SelectItem value="flash">Flash Sales</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Search promotions..." className="max-w-[200px]" />
              </div>
            </div>
            
            <div className="space-y-4">
              {expiredPromotions.map(promotion => (
                <Card key={promotion.id} className="overflow-hidden border-dashed">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-lg">{promotion.name}</h3>
                          <Badge variant="outline" className="border-gray-400 text-gray-400">
                            Expired
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">
                          {`${promotion.discount} • ${promotion.type} • ${promotion.products} products`}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {`Ran from ${new Date(promotion.startDate).toLocaleDateString()} to 
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
                        <Button variant="outline" size="sm">View Report</Button>
                        <Button variant="outline" size="sm">Recreate</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* AI Recommendations Tab - Completely Overhauled */}
          <TabsContent value="ai-recommendations" className="space-y-6">
            <AIRecommendationEngine onCreatePromotion={handleCreateFromRecommendation} />
          </TabsContent>
          
          {/* Predictive Analytics Tab - New */}
          <TabsContent value="predictive-analytics" className="space-y-6">
            <PromotionPredictiveAnalytics />
          </TabsContent>
          
          {/* A/B Testing Tab - New */}
          <TabsContent value="ab-testing" className="space-y-6">
            <ABTestingPanel onCreateTest={handleCreateTest} />
          </TabsContent>
          
          {/* Create Promotion Tab */}
          <TabsContent value="create-promotion" className="space-y-6">
            <h2 className="text-xl font-semibold">Create New Promotion</h2>
            <CreatePromotionForm onSubmit={handleCreatePromotion} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
