
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  TrendingUp, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  PieChart, 
  BarChart, 
  Users, 
  Target, 
  MessagesSquare,
  ArrowRight,
  Clock,
  Gift,
  CheckCircle,
  AlertCircle,
  Download,
  Copy,
  Eye,
  Edit,
  Trash
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

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

// Mock AI suggestions
const aiSuggestions = [
  {
    id: "sugg-1",
    title: "Optimize email subject lines",
    description: "Your open rates could improve by 15% with more compelling subject lines. AI analysis shows emotional triggers are working well with your audience.",
    impact: "high",
    ease: "easy",
  },
  {
    id: "sugg-2",
    title: "Adjust ad scheduling",
    description: "Your ads perform 35% better between 6-9pm. Consider reallocating budget to these hours for better ROI.",
    impact: "medium",
    ease: "medium",
  },
  {
    id: "sugg-3",
    title: "New audience segment opportunity",
    description: "Data analysis reveals a potential new audience segment of urban professionals aged 25-34 interested in eco-friendly products.",
    impact: "high",
    ease: "hard",
  }
];

// AI content templates
const contentTemplates = [
  {
    id: "temp-1",
    title: "Product Launch Announcement",
    description: "Announcement template optimized for new product launches with high engagement metrics",
    category: "Email",
    conversionRate: "24%"
  },
  {
    id: "temp-2",
    title: "Limited Time Offer",
    description: "Creates urgency with countdown timer and personalized recommendations",
    category: "Social",
    conversionRate: "18%"
  },
  {
    id: "temp-3",
    title: "Customer Testimonial Showcase",
    description: "Highlights real customer reviews with product imagery",
    category: "Display",
    conversionRate: "16%"
  }
];

export default function MarketingPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Filter campaigns based on search and filters
  const filteredCampaigns = campaignData.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || campaign.status === filterStatus;
    const matchesType = filterType === "all" || campaign.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

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

  const handleGenerateCampaign = () => {
    toast({
      title: "AI Campaign Generator",
      description: "Your AI-optimized campaign is being created. This may take a moment.",
    });
    // In a real app, this would trigger the AI campaign generation
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center">
              <TrendingUp className="mr-2 h-6 w-6" />
              Marketing Hub
            </h1>
            <p className="text-muted-foreground">
              Create, manage, and optimize your marketing campaigns
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowCreateCampaign(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
            <Button 
              variant="outline" 
              onClick={handleGenerateCampaign}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-none"
            >
              <Target className="mr-2 h-4 w-4" />
              AI Campaign Generator
            </Button>
          </div>
        </div>

        <Tabs defaultValue="campaigns">
          <TabsList className="mb-6">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Performance</TabsTrigger>
            <TabsTrigger value="content">Content Library</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Campaign Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="display">Display</SelectItem>
                    <SelectItem value="remarketing">Remarketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
            
            <div className="grid gap-4">
              {filteredCampaigns.map((campaign) => (
                <Card key={campaign.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link to={`/marketing/campaigns/${campaign.id}`}>
                          <CardTitle className="text-lg hover:text-primary transition-colors hover:underline">
                            {campaign.name}
                          </CardTitle>
                        </Link>
                        <CardDescription className="flex items-center mt-1">
                          <span>Budget: {formatCurrency(campaign.budget)}</span>
                          <span className="mx-2">•</span>
                          <span>
                            {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge className={`${getStatusColor(campaign.status)} capitalize`}>
                          {campaign.status}
                        </Badge>
                        <span className="text-sm mt-1 text-muted-foreground">{campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)} Campaign</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-muted/30 p-3 rounded">
                        <div className="text-sm text-muted-foreground">Spent</div>
                        <div className="font-semibold">{formatCurrency(campaign.spent)}</div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round((campaign.spent / campaign.budget) * 100)}% of budget
                        </div>
                      </div>
                      <div className="bg-muted/30 p-3 rounded">
                        <div className="text-sm text-muted-foreground">Impressions</div>
                        <div className="font-semibold">{campaign.impressions.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatCurrency(campaign.spent / campaign.impressions * 1000)} CPM
                        </div>
                      </div>
                      <div className="bg-muted/30 p-3 rounded">
                        <div className="text-sm text-muted-foreground">Clicks</div>
                        <div className="font-semibold">{campaign.clicks.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {((campaign.clicks / campaign.impressions) * 100).toFixed(2)}% CTR
                        </div>
                      </div>
                      <div className="bg-muted/30 p-3 rounded">
                        <div className="text-sm text-muted-foreground">Conversions</div>
                        <div className="font-semibold">{campaign.conversions.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          ROI: {campaign.roi.toFixed(1)}x
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4 bg-muted/20">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Audience:</span> {campaign.audience}
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/marketing/campaigns/${campaign.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            More
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Edit className="h-3.5 w-3.5 mr-1.5" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-3.5 w-3.5 mr-1.5" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="h-3.5 w-3.5 mr-1.5" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full mb-3">
                      <Users className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total Reach</h3>
                    <p className="text-2xl font-bold">285,420</p>
                    <p className="text-xs text-green-600">+9% vs. last month</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-full mb-3">
                      <Clock className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Avg. Engagement</h3>
                    <p className="text-2xl font-bold">3:42</p>
                    <p className="text-xs text-red-600">-2% vs. last month</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 text-green-600 p-2 rounded-full mb-3">
                      <Gift className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Conversions</h3>
                    <p className="text-2xl font-bold">4,250</p>
                    <p className="text-xs text-green-600">+15% vs. last month</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-amber-100 text-amber-600 p-2 rounded-full mb-3">
                      <BarChart className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Avg. ROI</h3>
                    <p className="text-2xl font-bold">2.8x</p>
                    <p className="text-xs text-green-600">+0.4x vs. last month</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Campaign Performance Metrics</CardTitle>
                <CardDescription>Tracking impressions, clicks, and conversions over time</CardDescription>
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Channel Effectiveness</CardTitle>
                  <CardDescription>Performance comparison across marketing channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span>Email Marketing</span>
                        <span className="font-medium">76%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary rounded-full h-2" style={{ width: "76%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span>Social Media</span>
                        <span className="font-medium">62%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 rounded-full h-2" style={{ width: "62%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span>Search Ads</span>
                        <span className="font-medium">48%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 rounded-full h-2" style={{ width: "48%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span>Display Ads</span>
                        <span className="font-medium">35%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-amber-500 rounded-full h-2" style={{ width: "35%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span>Partnerships</span>
                        <span className="font-medium">29%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-purple-500 rounded-full h-2" style={{ width: "29%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Campaign ROI Analysis</CardTitle>
                  <CardDescription>Investment performance by campaign type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaignData
                      .filter(c => c.roi > 0)
                      .sort((a, b) => b.roi - a.roi)
                      .slice(0, 5)
                      .map((campaign, index) => (
                        <div key={campaign.id}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="truncate max-w-[200px]" title={campaign.name}>
                              {campaign.name}
                            </span>
                            <span className="font-medium">{campaign.roi.toFixed(1)}x</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`rounded-full h-2 ${
                                index === 0 ? "bg-green-500" :
                                index === 1 ? "bg-emerald-500" :
                                index === 2 ? "bg-teal-500" :
                                index === 3 ? "bg-cyan-500" :
                                "bg-blue-500"
                              }`} 
                              style={{ width: `${Math.min(campaign.roi / 5 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Library Tab */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Optimized email marketing templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Template
                    </Button>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Recently Used</p>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="font-medium">Welcome Series</p>
                        <p className="text-sm text-muted-foreground">3-part onboarding sequence</p>
                      </div>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="font-medium">Abandoned Cart</p>
                        <p className="text-sm text-muted-foreground">Recovery email with discount</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Templates
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Content</CardTitle>
                  <CardDescription>Post templates for various platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Post
                    </Button>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Content Calendar</p>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="font-medium">Product Spotlight</p>
                        <p className="text-sm text-muted-foreground">Features and benefits template</p>
                      </div>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="font-medium">Customer Testimonial</p>
                        <p className="text-sm text-muted-foreground">Social proof template</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Content Calendar
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Ad Creatives</CardTitle>
                  <CardDescription>Display and search ad templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Ad
                    </Button>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Ad Library</p>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="font-medium">Dynamic Product Ads</p>
                        <p className="text-sm text-muted-foreground">Personalized product recommendations</p>
                      </div>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="font-medium">Brand Awareness</p>
                        <p className="text-sm text-muted-foreground">Visual storytelling templates</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Ad Library
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Content Templates</CardTitle>
                <CardDescription>High-performing templates created and optimized by AI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {contentTemplates.map((template) => (
                    <Card key={template.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{template.title}</CardTitle>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{template.category}</Badge>
                          <span className="text-sm text-green-600 font-medium">
                            {template.conversionRate} conversion
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-0">
                        <Button variant="ghost" size="sm">
                          Preview
                        </Button>
                        <Button size="sm">
                          Use Template
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t">
                <Button variant="outline">
                  Generate Custom Template with AI
                  <Target className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai-insights">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>AI-Powered Recommendations</CardTitle>
                  <CardDescription>
                    Smart insights to optimize your marketing performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiSuggestions.map((suggestion) => (
                      <Card key={suggestion.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-base">{suggestion.title}</CardTitle>
                            <Badge 
                              className={
                                suggestion.impact === 'high' 
                                  ? 'bg-green-100 text-green-800' 
                                  : suggestion.impact === 'medium'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-blue-100 text-blue-800'
                              }
                            >
                              {suggestion.impact} impact
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{suggestion.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-3">
                          <div className="text-sm text-muted-foreground">
                            Implementation: <span className="capitalize">{suggestion.ease}</span>
                          </div>
                          <Button>
                            Apply Suggestion
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Marketing Assistant</CardTitle>
                  <CardDescription>Get real-time marketing advice</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 h-[250px] mb-4 overflow-y-auto">
                    <div className="flex flex-col gap-3">
                      <div className="bg-background p-3 rounded-lg ml-6 relative">
                        <div className="absolute -left-6 top-0 bg-primary text-white p-1 rounded-full">
                          <User className="h-4 w-4" />
                        </div>
                        How can I improve my email open rates?
                      </div>
                      <div className="bg-primary/10 p-3 rounded-lg mr-6">
                        Based on your campaign data, I recommend:
                        <ol className="list-decimal ml-4 mt-2 space-y-1">
                          <li>Test subject lines with personalization</li>
                          <li>Send emails between 10-11am on Tuesdays</li>
                          <li>Segment your audience more granularly</li>
                        </ol>
                      </div>
                      <div className="bg-background p-3 rounded-lg ml-6 relative">
                        <div className="absolute -left-6 top-0 bg-primary text-white p-1 rounded-full">
                          <User className="h-4 w-4" />
                        </div>
                        Which products should I promote next month?
                      </div>
                      <div className="bg-primary/10 p-3 rounded-lg mr-6">
                        Based on seasonal trends and your inventory data:
                        <ul className="list-disc ml-4 mt-2">
                          <li>Premium water bottles (high margin + summer season)</li>
                          <li>Eco-friendly notebooks (back-to-school timing)</li>
                          <li>Custom tote bags (trending in your industry)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Ask the AI marketing assistant..." className="flex-1" />
                    <Button>
                      <MessagesSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Competitive Market Analysis</CardTitle>
                <CardDescription>
                  AI-powered insights on market trends and competitor activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Market Trends</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <TrendingUp className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">78% increase in eco-friendly product searches</span>
                        </li>
                        <li className="flex items-start">
                          <TrendingUp className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Growing demand for customizable corporate gifts</span>
                        </li>
                        <li className="flex items-start">
                          <TrendingUp className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Rising interest in premium tech accessories</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Competitor Activity</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <AlertCircle className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                          <span className="text-sm">Competitor A launched new sustainable line</span>
                        </li>
                        <li className="flex items-start">
                          <AlertCircle className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                          <span className="text-sm">Competitor B increased social ad spend by 35%</span>
                        </li>
                        <li className="flex items-start">
                          <AlertCircle className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                          <span className="text-sm">Competitor C offering extended customization</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Opportunity Areas</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Underserved mid-market corporate segment</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Tech startup welcome kits ($50-100 range)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Educational sector gift bundles (Q3 opportunity)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">AI-Generated Strategy Recommendation</h4>
                    <p>Based on current market dynamics and your sales data, focus on expanding your eco-friendly product line with emphasis on customization options. Target mid-market tech companies and educational institutions with bundled offerings tailored to their specific needs. Consider allocating 15% more budget to social media advertising with targeted messaging around sustainability and personalization.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button className="ml-auto" onClick={() => {
                  toast({
                    title: "Report Generated",
                    description: "Full competitive analysis report has been sent to your email.",
                  });
                }}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Analysis
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Create Campaign Dialog */}
      <Dialog open={showCreateCampaign} onOpenChange={setShowCreateCampaign}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Marketing Campaign</DialogTitle>
            <DialogDescription>
              Set up your campaign details and targeting options.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-3">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input id="campaign-name" placeholder="Enter campaign name..." />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="campaign-type">Campaign Type</Label>
                <Select>
                  <SelectTrigger id="campaign-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="email">Email Campaign</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="display">Display Ads</SelectItem>
                      <SelectItem value="remarketing">Remarketing</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="audience">Target Audience</Label>
                <Select>
                  <SelectTrigger id="audience">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="returning">Returning Customers</SelectItem>
                      <SelectItem value="new">New Visitors</SelectItem>
                      <SelectItem value="cart">Cart Abandoners</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" />
              </div>
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="budget">Budget (₹)</Label>
              <Input id="budget" type="number" placeholder="5000" />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center pt-2">
            <Button 
              variant="outline" 
              onClick={() => {
                toast({
                  title: "AI Campaign Creator",
                  description: "Generating campaign based on your best performing metrics...",
                });
              }}
            >
              <Target className="mr-2 h-4 w-4" />
              Auto-Create with AI
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowCreateCampaign(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowCreateCampaign(false);
                toast({
                  title: "Campaign Created",
                  description: "Your new marketing campaign has been created.",
                });
              }}>
                Create Campaign
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
