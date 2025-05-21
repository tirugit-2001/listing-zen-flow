
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Search, Filter, Users, FileText, RefreshCw, BarChart, ChevronDown, Upload, Download, Eye, Edit, Trash, Target } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Mock audience segments data
const segmentsData = [
  {
    id: "seg-1",
    name: "Active Customers",
    description: "Customers who have made a purchase in the last 90 days",
    type: "behavioral",
    source: "internal",
    status: "active",
    audience: 24568,
    lastUpdated: "2025-05-15",
    performance: {
      campaigns: 5,
      impressions: 345000,
      clicks: 28000,
      conversions: 2650,
      conversionRate: 9.46,
    }
  },
  {
    id: "seg-2",
    name: "Cart Abandoners",
    description: "Visitors who added items to cart but didn't complete purchase in the last 30 days",
    type: "behavioral",
    source: "internal",
    status: "active",
    audience: 8342,
    lastUpdated: "2025-05-16",
    performance: {
      campaigns: 3,
      impressions: 124000,
      clicks: 9800,
      conversions: 720,
      conversionRate: 7.35,
    }
  },
  {
    id: "seg-3",
    name: "High-Value Customers",
    description: "Customers whose average order value is >₹5000",
    type: "value-based",
    source: "internal",
    status: "active",
    audience: 3542,
    lastUpdated: "2025-05-12",
    performance: {
      campaigns: 2,
      impressions: 89000,
      clicks: 7200,
      conversions: 810,
      conversionRate: 11.25,
    }
  },
  {
    id: "seg-4",
    name: "Lookalike Audience",
    description: "Similar profiles to your top 1% of customers based on purchase behavior",
    type: "ai-generated",
    source: "derived",
    status: "in-review",
    audience: 120000,
    lastUpdated: "2025-05-18",
    performance: {
      campaigns: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      conversionRate: 0,
    }
  },
  {
    id: "seg-5",
    name: "Newsletter Subscribers",
    description: "Users who have subscribed to weekly newsletters but haven't made a purchase",
    type: "engagement",
    source: "internal",
    status: "active",
    audience: 14289,
    lastUpdated: "2025-05-14",
    performance: {
      campaigns: 4,
      impressions: 210000,
      clicks: 15600,
      conversions: 1250,
      conversionRate: 8.01,
    }
  },
  {
    id: "seg-6",
    name: "Corporate Gift Buyers",
    description: "B2B customers who have purchased corporate gifts",
    type: "business",
    source: "internal",
    status: "active",
    audience: 1870,
    lastUpdated: "2025-05-10",
    performance: {
      campaigns: 2,
      impressions: 42000,
      clicks: 3600,
      conversions: 520,
      conversionRate: 14.44,
    }
  }
];

// Insight data for segments
const segmentInsights = [
  {
    segment: "Active Customers",
    stats: [78, 65, 42, 89, 53, 61, 75]
  },
  {
    segment: "Cart Abandoners",
    stats: [45, 52, 38, 65, 72, 58, 49]
  },
  {
    segment: "High-Value Customers",
    stats: [92, 88, 76, 95, 84, 90, 88]
  }
];

export default function AudienceSegmentsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateSegment, setShowCreateSegment] = useState(false);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  
  // Filter segments based on search and filters
  const filteredSegments = segmentsData.filter(segment => {
    const matchesSearch = segment.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        segment.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || segment.type === filterType;
    const matchesStatus = filterStatus === "all" || segment.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'in-review':
        return 'bg-amber-100 text-amber-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Toggle select segment
  const toggleSelectSegment = (segmentId: string) => {
    setSelectedSegments(prev => 
      prev.includes(segmentId) 
        ? prev.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };
  
  // Select all segments
  const toggleSelectAll = () => {
    if (selectedSegments.length === filteredSegments.length) {
      setSelectedSegments([]);
    } else {
      setSelectedSegments(filteredSegments.map(segment => segment.id));
    }
  };
  
  // Performance data for chart
  const performanceData = segmentsData
    .filter(segment => segment.performance.conversions > 0)
    .map(segment => ({
      name: segment.name,
      conversions: segment.performance.conversions,
      conversionRate: segment.performance.conversionRate,
    }));

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <Link to="/marketing" className="text-muted-foreground hover:text-foreground inline-flex items-center mb-2">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Marketing
            </Link>
            <h1 className="text-2xl font-bold tracking-tight flex items-center">
              <Users className="mr-2 h-6 w-6" />
              Audience Segments
            </h1>
            <p className="text-muted-foreground">
              Create and manage audience segments for targeted marketing
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button onClick={() => setShowCreateSegment(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Segment
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="segments">
          <TabsList className="mb-6">
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="insights">Audience Insights</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="segments">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search segments..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="value-based">Value-based</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="ai-generated">AI Generated</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  className="whitespace-nowrap"
                  disabled={selectedSegments.length === 0}
                  onClick={() => {
                    toast({
                      title: "Export Started",
                      description: `Exporting ${selectedSegments.length} selected segment(s)`,
                    });
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Selected
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Refresh Complete",
                      description: "Audience segments data has been refreshed",
                    });
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={filteredSegments.length > 0 && selectedSegments.length === filteredSegments.length}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Segment Name</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead className="hidden lg:table-cell">Source</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSegments.map((segment) => (
                      <TableRow key={segment.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedSegments.includes(segment.id)}
                            onCheckedChange={() => toggleSelectSegment(segment.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <span className="font-medium">{segment.name}</span>
                            <p className="text-sm text-muted-foreground hidden sm:block">
                              {segment.description.length > 60 
                                ? segment.description.substring(0, 60) + '...' 
                                : segment.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell capitalize">
                          {segment.type}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell capitalize">
                          {segment.source}
                        </TableCell>
                        <TableCell>
                          {segment.audience.toLocaleString()}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {formatDate(segment.lastUpdated)}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(segment.status)} capitalize`}>
                            {segment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions <ChevronDown className="ml-2 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Target className="mr-2 h-4 w-4" />
                                Create Campaign
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* Segment Performance Overview */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Segment Performance</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Metrics by Segment</CardTitle>
                  <CardDescription>
                    Compare performance across different audience segments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={performanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="conversions" name="Conversions" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="conversionRate" name="Conversion Rate %" fill="#82ca9d" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Behavior Analysis</CardTitle>
                  <CardDescription>User behavior patterns across segments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Site Visit Frequency</span>
                      <span className="font-medium">6.8 avg/month</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-purple-500 rounded-full h-2" style={{ width: "68%" }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Product View Duration</span>
                      <span className="font-medium">2:45 min avg</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 rounded-full h-2" style={{ width: "55%" }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Cart Abandonment</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-amber-500 rounded-full h-2" style={{ width: "42%" }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Return Customer Rate</span>
                      <span className="font-medium">38%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 rounded-full h-2" style={{ width: "38%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Device & Platform</CardTitle>
                  <CardDescription>How users access your store</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span>Mobile</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 rounded-full h-2" style={{ width: "68%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span>Desktop</span>
                        <span className="font-medium">24%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-purple-500 rounded-full h-2" style={{ width: "24%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span>Tablet</span>
                        <span className="font-medium">8%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 rounded-full h-2" style={{ width: "8%" }}></div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span>iOS</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 rounded-full h-2" style={{ width: "42%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span>Android</span>
                        <span className="font-medium">34%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 rounded-full h-2" style={{ width: "34%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span>Desktop OS</span>
                        <span className="font-medium">24%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-purple-500 rounded-full h-2" style={{ width: "24%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Purchase Behaviors</CardTitle>
                  <CardDescription>Buying patterns and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Average Order Value</span>
                        <span>₹3,450</span>
                      </div>
                      <div className="text-sm text-muted-foreground">+12% vs previous period</div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Purchase Frequency</span>
                        <span>Every 72 days</span>
                      </div>
                      <div className="text-sm text-muted-foreground">-5% vs previous period</div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Most Popular Category</span>
                        <span>Drinkware</span>
                      </div>
                      <div className="text-sm text-muted-foreground">32% of total purchases</div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Bulk Orders (>10 items)</span>
                        <span>18%</span>
                      </div>
                      <div className="text-sm text-muted-foreground">+3% vs previous period</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="pb-0">
                <CardTitle>AI-Powered Audience Insights</CardTitle>
                <CardDescription>
                  Advanced behavioral analysis and segment performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Engagement Patterns</h3>
                    <p className="text-sm mb-4">Your active customer segment shows distinct engagement patterns:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Peak engagement hours: 8-10 PM IST</li>
                      <li>• 68% higher email open rates on Tuesdays</li>
                      <li>• 3.2x more responsive to video content</li>
                      <li>• Average of 4.5 products viewed before purchase</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Product Affinities</h3>
                    <p className="text-sm mb-4">Cross-selling opportunities based on purchase behavior:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Customers who buy water bottles also buy: tumblers (72%)</li>
                      <li>• Corporate gift buyers prefer: tech accessories (65%)</li>
                      <li>• Bundle opportunity: notebook + pen sets (48% conversion)</li>
                      <li>• Price sensitivity threshold: ₹1,200 for first-time buyers</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Retention Indicators</h3>
                    <p className="text-sm mb-4">Factors that correlate with customer loyalty:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• First purchase experience (delivery time)</li>
                      <li>• Personalization quality of products</li>
                      <li>• Email engagement in first 30 days</li>
                      <li>• Support interactions (positive correlation)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-4">Segment Performance Heat Map</h3>
                  <div className="grid grid-cols-8 gap-1">
                    <div className="text-right pr-2 font-medium">Active Customers</div>
                    {segmentInsights[0].stats.map((value, i) => (
                      <div 
                        key={`active-${i}`}
                        className="h-8 rounded"
                        style={{ 
                          backgroundColor: `rgba(136, 132, 216, ${value/100})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: value > 70 ? 'white' : 'black',
                          fontSize: '0.8rem'
                        }}
                      >
                        {value}
                      </div>
                    ))}
                    
                    <div className="text-right pr-2 font-medium">Cart Abandoners</div>
                    {segmentInsights[1].stats.map((value, i) => (
                      <div 
                        key={`abandoner-${i}`}
                        className="h-8 rounded"
                        style={{ 
                          backgroundColor: `rgba(130, 202, 157, ${value/100})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: value > 70 ? 'white' : 'black',
                          fontSize: '0.8rem'
                        }}
                      >
                        {value}
                      </div>
                    ))}
                    
                    <div className="text-right pr-2 font-medium">High-Value</div>
                    {segmentInsights[2].stats.map((value, i) => (
                      <div 
                        key={`high-value-${i}`}
                        className="h-8 rounded"
                        style={{ 
                          backgroundColor: `rgba(255, 198, 88, ${value/100})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: value > 70 ? 'white' : 'black',
                          fontSize: '0.8rem'
                        }}
                      >
                        {value}
                      </div>
                    ))}
                    
                    <div></div>
                    <div className="text-center text-xs text-muted-foreground">CTR</div>
                    <div className="text-center text-xs text-muted-foreground">Conv.</div>
                    <div className="text-center text-xs text-muted-foreground">AOV</div>
                    <div className="text-center text-xs text-muted-foreground">Ret.</div>
                    <div className="text-center text-xs text-muted-foreground">Eng.</div>
                    <div className="text-center text-xs text-muted-foreground">LTV</div>
                    <div className="text-center text-xs text-muted-foreground">ROI</div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground mt-2">
                    Performance metrics: Click-Through Rate, Conversion Rate, Average Order Value, Retention Rate, Engagement, Lifetime Value, ROI
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button 
                  className="ml-auto" 
                  onClick={() => {
                    toast({
                      title: "AI Analysis",
                      description: "Generating comprehensive audience analysis report...",
                    });
                  }}
                >
                  <Target className="mr-2 h-4 w-4" />
                  Generate AI Audience Analysis
                </Button>
              </CardFooter>
            </Card>
            
            <div className="p-5 border border-dashed rounded-lg flex flex-col items-center text-center">
              <Target className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">AI Audience Prediction Engine</h3>
              <p className="max-w-xl text-muted-foreground mb-4">
                Our advanced AI can analyze your customer data to identify hidden patterns, predict future behaviors, and recommend new high-value segments to target.
              </p>
              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "AI Predictions",
                      description: "Analyzing customer data to predict future behaviors...",
                    });
                  }}
                >
                  Generate Behavior Predictions
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-none"
                  onClick={() => {
                    toast({
                      title: "New Segments",
                      description: "Creating AI-powered audience segments based on behavior patterns...",
                    });
                  }}
                >
                  Create AI Segments
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Behavioral Segments</CardTitle>
                  <CardDescription>Templates based on user actions and behaviors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Product Viewers</span>
                    <span className="text-sm text-muted-foreground">Users who viewed specific products but didn't purchase</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Cart Abandoners</span>
                    <span className="text-sm text-muted-foreground">Visitors who added items to cart without completing purchase</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Frequent Browsers</span>
                    <span className="text-sm text-muted-foreground">Visitors who browse often but rarely purchase</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Value-Based Segments</CardTitle>
                  <CardDescription>Templates based on customer value and spending</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">VIP Customers</span>
                    <span className="text-sm text-muted-foreground">Top 10% of customers by lifetime value</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Big Spenders</span>
                    <span className="text-sm text-muted-foreground">Customers with average order value above ₹5,000</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Discount Buyers</span>
                    <span className="text-sm text-muted-foreground">Customers who primarily purchase during sales</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Segments</CardTitle>
                  <CardDescription>Advanced segments with machine learning</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Lookalike Audience</span>
                    <span className="text-sm text-muted-foreground">Similar profiles to your best customers</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Propensity to Buy</span>
                    <span className="text-sm text-muted-foreground">Users most likely to convert in next 7 days</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Churn Risk</span>
                    <span className="text-sm text-muted-foreground">Customers showing signs of disengagement</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Segments</CardTitle>
                  <CardDescription>Based on engagement with your communications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Email Engagers</span>
                    <span className="text-sm text-muted-foreground">Users who open and click emails regularly</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Social Media Followers</span>
                    <span className="text-sm text-muted-foreground">Customers who follow and engage with social accounts</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Review Submitters</span>
                    <span className="text-sm text-muted-foreground">Customers who have left product reviews</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Business Segments</CardTitle>
                  <CardDescription>B2B and corporate customer segments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Corporate Gift Buyers</span>
                    <span className="text-sm text-muted-foreground">B2B customers purchasing corporate gifts</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Bulk Orders</span>
                    <span className="text-sm text-muted-foreground">Customers who typically order in large quantities</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Event Planners</span>
                    <span className="text-sm text-muted-foreground">Customers who purchase for events and conferences</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Lifecycle Segments</CardTitle>
                  <CardDescription>Based on customer journey stage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">New Customers</span>
                    <span className="text-sm text-muted-foreground">First-time purchasers within last 30 days</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Loyal Customers</span>
                    <span className="text-sm text-muted-foreground">3+ purchases in last 6 months</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-medium">Lapsed Customers</span>
                    <span className="text-sm text-muted-foreground">No purchase in last 6 months</span>
                    <Button size="sm" className="mt-2 w-full">Use Template</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Create Segment Dialog */}
      <Dialog open={showCreateSegment} onOpenChange={setShowCreateSegment}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Audience Segment</DialogTitle>
            <DialogDescription>
              Define criteria for your new audience segment.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-3">
              <Label htmlFor="segment-name">Segment Name</Label>
              <Input id="segment-name" placeholder="Enter segment name..." />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="segment-description">Description</Label>
              <Input id="segment-description" placeholder="Enter segment description..." />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="segment-type">Segment Type</Label>
                <Select>
                  <SelectTrigger id="segment-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="value-based">Value-Based</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="segment-status">Status</Label>
                <Select>
                  <SelectTrigger id="segment-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Segment Criteria</Label>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select attribute" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="purchase_count">Purchase Count</SelectItem>
                          <SelectItem value="last_purchase">Last Purchase Date</SelectItem>
                          <SelectItem value="avg_order_value">Avg. Order Value</SelectItem>
                          <SelectItem value="product_category">Product Category</SelectItem>
                          <SelectItem value="location">Location</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="greater_than">Greater Than</SelectItem>
                          <SelectItem value="less_than">Less Than</SelectItem>
                          <SelectItem value="contains">Contains</SelectItem>
                          <SelectItem value="in_the_last">In the Last</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    
                    <Input placeholder="Enter value..." />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-3.5 w-3.5" />
                      Add Condition
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex items-center gap-2">
              <Switch id="ai-enhance" />
              <Label htmlFor="ai-enhance" className="font-medium text-sm">
                Enhance with AI
              </Label>
              <span className="text-xs text-muted-foreground">
                Use AI to refine your segment based on behavioral patterns
              </span>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20"
              onClick={() => {
                toast({
                  title: "AI Segment Generator",
                  description: "Generating audience segment based on your best performing customer patterns...",
                });
              }}
            >
              <Target className="mr-2 h-4 w-4" />
              Auto-Create with AI
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowCreateSegment(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowCreateSegment(false);
                toast({
                  title: "Segment Created",
                  description: "Your new audience segment has been created.",
                });
              }}>
                Create Segment
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
