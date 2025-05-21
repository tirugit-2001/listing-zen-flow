import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  BarChart, 
  Calendar, 
  ChevronDown, 
  Clock, 
  Copy, 
  Download, 
  Edit, 
  Eye, 
  Filter, 
  PieChart, 
  Search, 
  Settings, 
  Share, 
  Target, 
  Trash, 
  TrendingUp, 
  Users,
  Plus
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Mock data for campaigns
const campaignData = [
  {
    id: "camp-1",
    name: "Summer Collection Launch",
    status: "active",
    type: "email",
    audience: "Returning Customers",
    budget: 5000,
    spent: 2300,
    startDate: "2025-05-10",
    endDate: "2025-06-10",
    impressions: 45000,
    clicks: 3200,
    conversions: 380,
    roi: 2.4
  },
  {
    id: "camp-2",
    name: "New Customer Acquisition",
    status: "active",
    type: "social",
    audience: "Lookalike Audience",
    budget: 10000,
    spent: 7500,
    startDate: "2025-04-15",
    endDate: "2025-05-30",
    impressions: 120000,
    clicks: 8500,
    conversions: 950,
    roi: 1.8
  },
  {
    id: "camp-3",
    name: "Product Awareness Campaign",
    status: "scheduled",
    type: "display",
    audience: "New Visitors",
    budget: 7500,
    spent: 0,
    startDate: "2025-06-01",
    endDate: "2025-07-15",
    impressions: 0,
    clicks: 0,
    conversions: 0,
    roi: 0
  },
  {
    id: "camp-4",
    name: "End of Season Sale",
    status: "completed",
    type: "email",
    audience: "All Customers",
    budget: 3000,
    spent: 3000,
    startDate: "2025-03-01",
    endDate: "2025-03-21",
    impressions: 68000,
    clicks: 12000,
    conversions: 2200,
    roi: 4.2
  },
  {
    id: "camp-5",
    name: "Retargeting Campaign",
    status: "active",
    type: "remarketing",
    audience: "Cart Abandoners",
    budget: 4500,
    spent: 2100,
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    impressions: 35000,
    clicks: 4800,
    conversions: 720,
    roi: 3.1
  }
];

// Mock performance data
const performanceData = [
  { name: 'Jan', impressions: 40000, clicks: 3000, conversions: 300 },
  { name: 'Feb', impressions: 45000, clicks: 3500, conversions: 380 },
  { name: 'Mar', impressions: 55000, clicks: 4200, conversions: 420 },
  { name: 'Apr', impressions: 70000, clicks: 5500, conversions: 550 },
  { name: 'May', impressions: 80000, clicks: 6000, conversions: 620 },
];

export default function CampaignDetailPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const campaign = campaignData.find(c => c.id === id);
  const [activeTab, setActiveTab] = useState("overview");

  if (!campaign) {
    return (
      <Layout>
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/marketing" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Campaigns
            </Link>
          </div>
          <Card>
            <CardContent className="py-8 text-center">
              <CardTitle className="text-2xl">Campaign Not Found</CardTitle>
              <CardDescription>The requested campaign could not be found.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'paused':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/marketing" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Campaigns
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{campaign.name}</h1>
              <p className="text-muted-foreground">
                {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                  <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="h-3.5 w-3.5 mr-2" />
                  Edit Campaign
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-3.5 w-3.5 mr-2" />
                  Duplicate Campaign
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash className="h-3.5 w-3.5 mr-2" />
                  Delete Campaign
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="targeting">Targeting</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full mb-3">
                      <Target className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Budget</h3>
                    <p className="text-2xl font-bold">{formatCurrency(campaign.budget)}</p>
                    <p className="text-xs text-muted-foreground">Planned investment</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-full mb-3">
                      <Clock className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Spent</h3>
                    <p className="text-2xl font-bold">{formatCurrency(campaign.spent)}</p>
                    <p className="text-xs text-red-600">
                      {Math.round((campaign.spent / campaign.budget) * 100)}% of budget
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 text-green-600 p-2 rounded-full mb-3">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Impressions</h3>
                    <p className="text-2xl font-bold">{campaign.impressions.toLocaleString()}</p>
                    <p className="text-xs text-green-600">
                      {formatCurrency(campaign.spent / campaign.impressions * 1000)} CPM
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-amber-100 text-amber-600 p-2 rounded-full mb-3">
                      <BarChart className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Conversions</h3>
                    <p className="text-2xl font-bold">{campaign.conversions.toLocaleString()}</p>
                    <p className="text-xs text-green-600">ROI: {campaign.roi.toFixed(1)}x</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance Over Time</CardTitle>
                <CardDescription>Tracking impressions, clicks, and conversions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={performanceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="impressions" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="clicks" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="conversions" stackId="3" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Engagement</CardTitle>
                  <CardDescription>Engagement metrics from your target audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-1">
                      <span>Returning Customers</span>
                      <span className="font-medium">82%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: "82%" }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-1">
                      <span>New Visitors</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 rounded-full h-2" style={{ width: "68%" }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-1">
                      <span>Cart Abandoners</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 rounded-full h-2" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Channel Performance</CardTitle>
                  <CardDescription>Performance by marketing channel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-1">
                      <span>Email Marketing</span>
                      <span className="font-medium">76%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: "76%" }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-1">
                      <span>Social Media</span>
                      <span className="font-medium">62%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 rounded-full h-2" style={{ width: "62%" }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-1">
                      <span>Display Ads</span>
                      <span className="font-medium">48%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 rounded-full h-2" style={{ width: "48%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Targeting Tab */}
          <TabsContent value="targeting">
            <Card>
              <CardHeader>
                <CardTitle>Target Audience Segments</CardTitle>
                <CardDescription>Manage and analyze your audience segments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Returning Customers</h4>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Customers who have made a purchase in the last 6 months.</p>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">New Visitors</h4>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Users who have visited the website in the last 30 days but haven't made a purchase.</p>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Cart Abandoners</h4>
                    <Badge className="bg-amber-100 text-amber-800">Inactive</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Users who added items to their cart but didn't complete the purchase.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Segment
                </Button>
                <Button className="ml-auto">
                  View All Segments
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Content Overview</CardTitle>
                <CardDescription>Manage and preview your campaign content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Email Content</h4>
                    <p className="text-sm text-muted-foreground">Subject: Exclusive Offer for You</p>
                    <p className="text-sm text-muted-foreground">Body: Get 20% off on your next purchase...</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Preview Email
                    </Button>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Social Media Ad</h4>
                    <p className="text-sm text-muted-foreground">Headline: Summer Collection is Here!</p>
                    <p className="text-sm text-muted-foreground">Description: Shop the latest trends...</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Preview Ad
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  Edit Content
                </Button>
                <Button className="ml-auto">
                  View All Content
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
