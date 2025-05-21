
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { 
  Badge 
} from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Tag, 
  Calendar,
  ArrowRight
} from 'lucide-react';

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

interface AIRecommendationEngineProps {
  onCreatePromotion: (recommendation: RecommendationType) => void;
}

export default function AIRecommendationEngine({ onCreatePromotion }: AIRecommendationEngineProps) {
  const [activeTab, setActiveTab] = useState<string>("smart");
  
  // AI-generated recommendations based on different algorithms
  const smartRecommendations: RecommendationType[] = [
    {
      id: "rec-1",
      title: "Inventory Clearance Opportunity",
      description: "Create a flash sale for these 5 products with low inventory and slow movement to clear stock",
      impact: "Estimated 38% increase in conversions",
      confidence: 92,
      products: 5,
      recommended: "30% discount for 48 hours",
      category: "inventory",
      predictedRevenue: "₹45,800",
      predictedConversion: "38%",
      targetAudience: ["Previous browsers", "Wishlist users", "Cart abandoners"]
    },
    {
      id: "rec-2",
      title: "High-Value Bundle Recommendation",
      description: "These products are frequently viewed together but rarely purchased together - create a bundle offer",
      impact: "Estimated 25% increase in average order value",
      confidence: 87,
      products: 3,
      recommended: "15% off bundle",
      category: "bundle",
      predictedRevenue: "₹67,500",
      predictedConversion: "22%",
      targetAudience: ["Repeat customers", "High-AOV customers"]
    },
    {
      id: "rec-3",
      title: "Seasonal Opportunity Alert",
      description: "Upcoming monsoon season - promote these waterproof products with special messaging",
      impact: "Estimated 42% increase in category sales",
      confidence: 89,
      products: 7,
      recommended: "Featured promotion + 10% discount",
      category: "seasonal",
      predictedRevenue: "₹89,200",
      predictedConversion: "28%",
      targetAudience: ["Geographic targeting: High rainfall regions", "Previous seasonal buyers"]
    }
  ];

  const audienceRecommendations: RecommendationType[] = [
    {
      id: "rec-4",
      title: "Loyalty Segment Opportunity",
      description: "Create a special promotion for loyal customers who haven't purchased in 30+ days",
      impact: "Estimated 45% re-engagement rate",
      confidence: 94,
      products: "Selected premium products",
      recommended: "Exclusive 25% discount",
      category: "audience",
      predictedRevenue: "₹120,000",
      predictedConversion: "32%",
      targetAudience: ["Loyal customers (3+ orders)", "30+ days no purchase"]
    },
    {
      id: "rec-5",
      title: "First-Time Buyer Conversion",
      description: "Special offer for users who have browsed 5+ times but never purchased",
      impact: "Estimated 28% first purchase conversion",
      confidence: 85,
      products: "Entry-level products",
      recommended: "Free shipping + 10% discount",
      category: "audience",
      predictedRevenue: "₹48,500",
      predictedConversion: "28%",
      targetAudience: ["Multiple-time browsers", "No purchase history"]
    }
  ];

  const timingRecommendations: RecommendationType[] = [
    {
      id: "rec-6",
      title: "Optimal Launch Timing",
      description: "Schedule your next major promotion during peak engagement periods",
      impact: "Estimated 32% higher engagement",
      confidence: 91,
      recommended: "Tuesday-Thursday, 10AM-2PM",
      category: "timing",
      predictedConversion: "27%",
      targetAudience: ["All segments"]
    },
    {
      id: "rec-7",
      title: "Extended Weekend Promotion",
      description: "Data shows higher conversion for 3-day promotions ending on Sunday",
      impact: "Estimated 18% higher revenue vs. other timings",
      confidence: 86,
      recommended: "Friday-Sunday promotion",
      category: "timing",
      predictedRevenue: "₹78,500",
      predictedConversion: "24%",
      targetAudience: ["Weekend shoppers", "Mobile users"]
    }
  ];

  const getRecommendationsByTab = () => {
    switch(activeTab) {
      case "smart":
        return smartRecommendations;
      case "audience":
        return audienceRecommendations;
      case "timing":
        return timingRecommendations;
      default:
        return smartRecommendations;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch(category) {
      case "inventory":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">Inventory</Badge>;
      case "bundle":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">Bundle</Badge>;
      case "seasonal":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Seasonal</Badge>;
      case "audience":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">Audience</Badge>;
      case "timing":
        return <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 border-indigo-200">Timing</Badge>;
      default:
        return <Badge variant="secondary">{category}</Badge>;
    }
  };

  const getConfidenceBadge = (confidence: number) => {
    let colorClass = "bg-green-100 text-green-800 border-green-200";
    
    if (confidence < 85) {
      colorClass = "bg-amber-100 text-amber-800 border-amber-200";
    } else if (confidence < 75) {
      colorClass = "bg-red-100 text-red-800 border-red-200";
    }
    
    return (
      <Badge variant="outline" className={colorClass}>
        {confidence}% Confidence
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-amber-500" /> 
            AI-Powered Recommendations
          </h2>
          <p className="text-muted-foreground">
            Smart promotion suggestions based on your product data and market trends
          </p>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="smart">
              <Sparkles className="mr-2 h-4 w-4" />
              Smart Mix
            </TabsTrigger>
            <TabsTrigger value="audience">
              <Users className="mr-2 h-4 w-4" />
              Audience
            </TabsTrigger>
            <TabsTrigger value="timing">
              <Calendar className="mr-2 h-4 w-4" />
              Timing
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getRecommendationsByTab().map(recommendation => (
          <Card key={recommendation.id} className="overflow-hidden">
            <CardHeader className="pb-3 relative">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-medium">{recommendation.title}</CardTitle>
                {getCategoryBadge(recommendation.category)}
              </div>
              <CardDescription className="line-clamp-2">
                {recommendation.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Potential Impact:</span>
                  <span className="font-medium text-emerald-600">{recommendation.impact}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <span>{getConfidenceBadge(recommendation.confidence)}</span>
                </div>
                
                {recommendation.products && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Products:</span>
                    <span>{recommendation.products}</span>
                  </div>
                )}
                
                {recommendation.recommended && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Recommendation:</span>
                    <span>{recommendation.recommended}</span>
                  </div>
                )}
                
                {recommendation.predictedRevenue && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Est. Revenue:</span>
                    <span className="font-medium text-emerald-600">{recommendation.predictedRevenue}</span>
                  </div>
                )}
                
                {recommendation.targetAudience && (
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="text-muted-foreground">Target Audience:</span>
                    <div className="flex flex-wrap gap-1">
                      {recommendation.targetAudience.map((audience, index) => (
                        <Badge variant="outline" key={index} className="bg-gray-50">
                          {audience}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button 
                className="w-full"
                onClick={() => onCreatePromotion(recommendation)}
              >
                Create This Promotion
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
