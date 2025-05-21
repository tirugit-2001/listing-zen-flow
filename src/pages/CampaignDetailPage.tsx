
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  ChevronDown,
  Download,
  Edit,
  ExternalLink,
  Eye,
  MessageSquare,
  Pause,
  Play,
  RefreshCw,
  Settings,
  Share2,
  Target,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

// Mock campaign data
const campaignData = {
  id: "camp-1",
  name: "Summer Collection Launch",
  status: "active",
  type: "email",
  audience: "Returning Customers",
  budget: 5000,
  spent: 2300,
  startDate: "2025-05-10",
  endDate: "2025-06-10",
  description: "Promotional campaign for our new summer collection targeting existing customers with personalized recommendations based on previous purchases.",
  platforms: ["Email", "Instagram", "Facebook"],
  channels: [
    { name: "Email", value: 45 },
    { name: "Instagram", value: 30 },
    { name: "Facebook", value: 25 }
  ],
  metrics: [
    { date: "May 10", impressions: 5200, clicks: 420, conversions: 32 },
    { date: "May 11", impressions: 5800, clicks: 460, conversions: 38 },
    { date: "May 12", impressions: 6200, clicks: 490, conversions: 41 },
    { date: "May 13", impressions: 8500, clicks: 680, conversions: 58 },
    { date: "May 14", impressions: 9400, clicks: 750, conversions: 65 },
    { date: "May 15", impressions: 10200, clicks: 820, conversions: 72 },
  ],
  demographics: [
    { name: "18-24", value: 15 },
    { name: "25-34", value: 35 },
    { name: "35-44", value: 25 },
    { name: "45-54", value: 15 },
    { name: "55+", value: 10 }
  ],
  locations: [
    { name: "Delhi NCR", value: 30 },
    { name: "Mumbai", value: 25 },
    { name: "Bangalore", value: 20 },
    { name: "Hyderabad", value: 15 },
    { name: "Other", value: 10 }
  ],
  creativeSets: [
    {
      id: "creative-1",
      name: "Summer Essentials",
      type: "Image Carousel",
      impressions: 24500,
      clicks: 1840,
      conversions: 165,
      ctr: 7.51,
      thumbnail: "https://placehold.co/300x200"
    },
    {
      id: "creative-2",
      name: "Limited Edition",
      type: "Video Ad",
      impressions: 18200,
      clicks: 1460,
      conversions: 132,
      ctr: 8.02,
      thumbnail: "https://placehold.co/300x200"
    },
    {
      id: "creative-3",
      name: "Customer Testimonials",
      type: "Story Ads",
      impressions: 12800,
      clicks: 895,
      conversions: 83,
      ctr: 6.99,
      thumbnail: "https://placehold.co/300x200"
    }
  ]
};

// COLORS for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function CampaignDetailPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [isPaused, setIsPaused] = useState(false);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate metrics
  const totalImpressions = campaignData.metrics.reduce((sum, day) => sum + day.impressions, 0);
  const totalClicks = campaignData.metrics.reduce((sum, day) => sum + day.clicks, 0);
  const totalConversions = campaignData.metrics.reduce((sum, day) => sum + day.conversions, 0);
  const ctr = totalClicks / totalImpressions * 100;
  const conversionRate = totalConversions / totalClicks * 100;
  const cpa = campaignData.spent / totalConversions;
  
  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Campaign Resumed" : "Campaign Paused",
      description: isPaused ? "Campaign is now active and running ads." : "Campaign has been paused and is not running ads.",
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <Link to="/marketing" className="text-muted-foreground hover:text-foreground inline-flex items-center mb-2">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Campaigns
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">{campaignData.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-green-100 text-green-800 capitalize">
                {campaignData.status}
              </Badge>
              <span className="text-muted-foreground">
                {formatDate(campaignData.startDate)} - {formatDate(campaignData.endDate)}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            <Button variant="outline" size="sm" onClick={handlePauseToggle}>
              {isPaused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-none">
              <Target className="mr-2 h-4 w-4" />
              Optimize with AI
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Budget</span>
                <span className="text-xl font-bold">{formatCurrency(campaignData.budget)}</span>
                <div className="mt-1 text-sm">
                  <span className="text-muted-foreground">{formatCurrency(campaignData.spent)} spent</span>
                  <span className="mx-1">•</span>
                  <span className="text-muted-foreground">{((campaignData.spent / campaignData.budget) * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-primary rounded-full h-1.5" 
                    style={{ width: `${(campaignData.spent / campaignData.budget) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Impressions</span>
                <span className="text-xl font-bold">{totalImpressions.toLocaleString()}</span>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="text-xs">
                    {formatCurrency(campaignData.spent / totalImpressions * 1000)} CPM
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-blue-500 rounded-full h-1.5" 
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Clicks</span>
                <span className="text-xl font-bold">{totalClicks.toLocaleString()}</span>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="text-xs">
                    {ctr.toFixed(2)}% CTR
                  </Badge>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {formatCurrency(campaignData.spent / totalClicks)} CPC
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-purple-500 rounded-full h-1.5" 
                    style={{ width: "82%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Conversions</span>
                <span className="text-xl font-bold">{totalConversions.toLocaleString()}</span>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="text-xs">
                    {conversionRate.toFixed(2)}% Conv. Rate
                  </Badge>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {formatCurrency(cpa)} CPA
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-green-500 rounded-full h-1.5" 
                    style={{ width: "68%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="creatives">Creatives</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main performance graph */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Daily impressions, clicks and conversions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={campaignData.metrics}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
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
              
              {/* Campaign details */}
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                      <p className="mt-1">{campaignData.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Target Audience</h3>
                      <p className="mt-1">{campaignData.audience}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Platforms</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {campaignData.platforms.map((platform, index) => (
                          <Badge key={index} variant="outline">{platform}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Performance Channels</h3>
                      <div className="h-[180px] mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={campaignData.channels}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {campaignData.channels.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* AI Insights */}
            <Card className="mt-6">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  AI Performance Insights
                </CardTitle>
                <CardDescription>
                  AI-powered recommendations to optimize your campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2 text-blue-500" />
                      Performance Insights
                    </h4>
                    <ul className="mt-3 space-y-2">
                      <li className="text-sm">CTR is 15% higher than your account average</li>
                      <li className="text-sm">Conversion rate peaks between 7-9 PM IST</li>
                      <li className="text-sm">Mobile performance exceeds desktop by 22%</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium flex items-center">
                      <Users className="h-4 w-4 mr-2 text-green-500" />
                      Audience Insights
                    </h4>
                    <ul className="mt-3 space-y-2">
                      <li className="text-sm">25-34 age group has 2.1x better ROI</li>
                      <li className="text-sm">New visitors converting 8% better than returning</li>
                      <li className="text-sm">Bangalore audience shows highest engagement</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-purple-500" />
                      Creative Insights
                    </h4>
                    <ul className="mt-3 space-y-2">
                      <li className="text-sm">Image carousel outperforms single images by 32%</li>
                      <li className="text-sm">Messages with "Limited" have 18% higher CTR</li>
                      <li className="text-sm">Product showcase #2 needs optimization</li>
                    </ul>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Recommended Optimization Actions</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium flex items-center">
                        <Target className="h-4 w-4 mr-2 text-blue-500" />
                        Budget Reallocation
                      </h4>
                      <p className="text-sm mt-2">Shift 25% of budget from morning hours (8-11 AM) to evening (7-10 PM) to capture peak conversion times.</p>
                      <Button size="sm" className="mt-3">
                        Apply Recommendation
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium flex items-center">
                        <Target className="h-4 w-4 mr-2 text-green-500" />
                        Audience Expansion
                      </h4>
                      <p className="text-sm mt-2">Create a lookalike audience based on your top 1% converters to expand reach while maintaining quality.</p>
                      <Button size="sm" className="mt-3">
                        Apply Recommendation
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium flex items-center">
                        <Target className="h-4 w-4 mr-2 text-purple-500" />
                        Creative Optimization
                      </h4>
                      <p className="text-sm mt-2">Replace underperforming product showcase #2 with the new AI-generated variant that emphasizes limited availability.</p>
                      <Button size="sm" className="mt-3">
                        Apply Recommendation
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium flex items-center">
                        <Target className="h-4 w-4 mr-2 text-amber-500" />
                        Bid Strategy
                      </h4>
                      <p className="text-sm mt-2">Increase bids by 15% for the 25-34 age demographic in Bangalore and Mumbai to maximize ROI from top performing segments.</p>
                      <Button size="sm" className="mt-3">
                        Apply Recommendation
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button className="ml-auto" onClick={() => {
                  toast({
                    title: "AI Optimization Applied",
                    description: "Campaign has been optimized based on AI recommendations.",
                  });
                }}>
                  Apply All Optimizations
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="creatives">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Campaign Creatives</CardTitle>
                    <CardDescription>Manage and optimize your campaign creatives</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh Data
                    </Button>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Creative
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {campaignData.creativeSets.map((creative) => (
                    <Card key={creative.id} className="overflow-hidden">
                      <img 
                        src={creative.thumbnail} 
                        alt={creative.name} 
                        className="w-full h-40 object-cover"
                      />
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{creative.name}</CardTitle>
                        <CardDescription>{creative.type}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Impressions</p>
                            <p className="font-medium">{creative.impressions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Clicks</p>
                            <p className="font-medium">{creative.clicks.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Conversions</p>
                            <p className="font-medium">{creative.conversions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">CTR</p>
                            <p className="font-medium">{creative.ctr}%</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t">
                        <Button variant="ghost" size="sm">
                          <Eye className="mr-1.5 h-3.5 w-3.5" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-1.5 h-3.5 w-3.5" />
                          Edit
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8 p-6 border border-dashed rounded-lg flex flex-col items-center justify-center text-center">
                  <div className="bg-muted p-3 rounded-full mb-3">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">AI Creative Generator</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Generate high-converting ad creatives based on your campaign performance data
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-none"
                    onClick={() => {
                      toast({
                        title: "AI Creative Generation",
                        description: "Generating optimized creatives based on your performance data...",
                      });
                    }}
                  >
                    Generate AI Creatives
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="audience">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                  <CardDescription>Age distribution of campaign audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={campaignData.demographics}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {campaignData.demographics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Location distribution of campaign audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={campaignData.locations}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Audience Segments</CardTitle>
                      <CardDescription>Target and custom audience segments</CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New Segment
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Returning Customers</h3>
                        <Badge>Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Customers who have made at least one purchase in the last 90 days
                      </p>
                      <div className="mt-3 flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        <span className="text-muted-foreground">24,568 people</span>
                        <span className="mx-2">•</span>
                        <span className="text-green-600 font-medium">12% higher conversion rate</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Cart Abandoners</h3>
                        <Badge>Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Visitors who added items to cart but didn't complete purchase in the last 30 days
                      </p>
                      <div className="mt-3 flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        <span className="text-muted-foreground">8,342 people</span>
                        <span className="mx-2">•</span>
                        <span className="text-amber-600 font-medium">High recovery potential</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Lookalike Audience</h3>
                        <Badge variant="outline">In Review</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Similar profiles to your top 1% of customers based on purchase behavior
                      </p>
                      <div className="mt-3 flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        <span className="text-muted-foreground">Estimated 120,000+ people</span>
                        <span className="mx-2">•</span>
                        <span className="text-blue-600 font-medium">AI Generated</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm text-muted-foreground">
                      <Link to="/marketing/audience-segments" className="flex items-center hover:text-primary">
                        View all audience segments
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Link>
                    </span>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Import Segments
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Settings</CardTitle>
                <CardDescription>Configure campaign parameters and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Campaign settings would be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
