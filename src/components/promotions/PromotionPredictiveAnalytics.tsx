
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { 
  BarChart as BarChartIcon, 
  ChartPie, 
  TrendingUp,
  CalendarDays,
  Clock,
  Users
} from 'lucide-react';

export default function PromotionPredictiveAnalytics() {
  const [activeTab, setActiveTab] = useState("forecast");
  const [timeframe, setTimeframe] = useState("30d");
  
  // Sample predictive data
  const forecastData = [
    { date: 'Week 1', baseline: 45000, withPromotion: 68000 },
    { date: 'Week 2', baseline: 48000, withPromotion: 72000 },
    { date: 'Week 3', baseline: 43000, withPromotion: 65000 },
    { date: 'Week 4', baseline: 50000, withPromotion: 75000 },
    { date: 'Week 5', baseline: 46000, withPromotion: 78000 },
    { date: 'Week 6', baseline: 52000, withPromotion: 88000 },
  ];
  
  const channelData = [
    { name: 'Organic Search', value: 28, fill: '#8884d8' },
    { name: 'Direct', value: 22, fill: '#83a6ed' },
    { name: 'Social', value: 19, fill: '#8dd1e1' },
    { name: 'Email', value: 17, fill: '#82ca9d' },
    { name: 'Referral', value: 14, fill: '#ffc658' }
  ];
  
  const timeOfDayData = [
    { hour: '6AM', conversion: 2.1 },
    { hour: '8AM', conversion: 3.8 },
    { hour: '10AM', conversion: 5.2 },
    { hour: '12PM', conversion: 7.5 },
    { hour: '2PM', conversion: 8.4 },
    { hour: '4PM', conversion: 7.9 },
    { hour: '6PM', conversion: 8.8 },
    { hour: '8PM', conversion: 7.2 },
    { hour: '10PM', conversion: 4.3 },
    { hour: '12AM', conversion: 2.5 },
  ];
  
  const audienceData = [
    { segment: 'New Visitors', propensity: 32, lift: 45 },
    { segment: 'Returning', propensity: 48, lift: 28 },
    { segment: 'Loyal', propensity: 67, lift: 18 },
    { segment: 'Cart Abandoners', propensity: 72, lift: 65 },
    { segment: 'High AOV', propensity: 51, lift: 38 },
  ];
  
  const getFormattedValue = (value: number) => {
    return `₹${value.toLocaleString()}`;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
              Predictive Analytics
            </CardTitle>
            <CardDescription>
              AI-powered forecasts and optimization insights
            </CardDescription>
          </div>
          
          <Select
            value={timeframe}
            onValueChange={setTimeframe}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="forecast">
              <TrendingUp className="h-4 w-4 mr-2" />
              Revenue Forecast
            </TabsTrigger>
            <TabsTrigger value="timing">
              <Clock className="h-4 w-4 mr-2" />
              Optimal Timing
            </TabsTrigger>
            <TabsTrigger value="channels">
              <ChartPie className="h-4 w-4 mr-2" />
              Channel Impact
            </TabsTrigger>
            <TabsTrigger value="audience">
              <Users className="h-4 w-4 mr-2" />
              Audience Propensity
            </TabsTrigger>
          </TabsList>
          
          {/* Revenue Forecast Tab */}
          <TabsContent value="forecast">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-lg font-medium">Projected Revenue Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    Forecasted revenue with and without promotions
                  </p>
                </div>
                
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm">With Promotion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-sm">Baseline</span>
                  </div>
                </div>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={forecastData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorPromotion" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={getFormattedValue} />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                    <Area
                      type="monotone"
                      dataKey="baseline"
                      stroke="#9ca3af"
                      fillOpacity={1}
                      fill="url(#colorBaseline)"
                      name="Baseline Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="withPromotion"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorPromotion)"
                      name="With Promotion"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Baseline Revenue</p>
                    <p className="text-xl font-bold">₹284,000</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-emerald-50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">With Promotion</p>
                    <p className="text-xl font-bold text-emerald-600">₹446,000</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Projected Lift</p>
                    <p className="text-xl font-bold text-blue-600">₹162,000</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-violet-50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">ROI</p>
                    <p className="text-xl font-bold text-violet-600">5.4x</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Optimal Timing Tab */}
          <TabsContent value="timing">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Optimal Promotion Timing</h3>
                  <p className="text-sm text-muted-foreground">
                    Conversion rate by time of day and day of week
                  </p>
                </div>
                
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  <Clock className="mr-1 h-3 w-3" />
                  AI Optimized
                </Badge>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeOfDayData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="hour"
                      label={{ value: 'Time of Day', position: 'bottom', offset: 20 }}
                    />
                    <YAxis
                      label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                    <Line
                      type="monotone"
                      dataKey="conversion"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-indigo-50 border-indigo-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-indigo-900">Best Day</h4>
                        <p className="text-xl font-bold text-indigo-800">Thursday</p>
                      </div>
                      <CalendarDays className="h-10 w-10 text-indigo-300" />
                    </div>
                    <p className="mt-2 text-xs text-indigo-700">
                      26% higher conversion rate than average
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-amber-50 border-amber-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-amber-900">Best Time</h4>
                        <p className="text-xl font-bold text-amber-800">6:00 PM - 8:00 PM</p>
                      </div>
                      <Clock className="h-10 w-10 text-amber-300" />
                    </div>
                    <p className="mt-2 text-xs text-amber-700">
                      8.8% peak conversion rate during this window
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50 border-blue-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">Optimal Duration</h4>
                        <p className="text-xl font-bold text-blue-800">72 Hours</p>
                      </div>
                      <TrendingUp className="h-10 w-10 text-blue-300" />
                    </div>
                    <p className="mt-2 text-xs text-blue-700">
                      Creates urgency without promo fatigue
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Channel Impact Tab */}
          <TabsContent value="channels">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Channel Effectiveness</h3>
              <p className="text-sm text-muted-foreground">
                Promotion performance by marketing channel
              </p>
              
              <div className="h-[300px] flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => [`${value}%`, 'Contribution']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {channelData.map((channel, index) => (
                  <Card key={index} className={`bg-gray-50`}>
                    <CardContent className="p-4">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <h4 className="text-sm font-medium">{channel.name}</h4>
                          <p className="text-xl font-bold">{channel.value}%</p>
                        </div>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.fill }}></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button className="w-full">
                Create Channel-Specific Promotions
              </Button>
            </div>
          </TabsContent>
          
          {/* Audience Propensity Tab */}
          <TabsContent value="audience">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Audience Propensity</h3>
                  <p className="text-sm text-muted-foreground">
                    Customer segments most likely to respond to promotions
                  </p>
                </div>
                
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  <Users className="mr-1 h-3 w-3" />
                  AI Segmentation
                </Badge>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={audienceData}
                    layout="vertical"
                    margin={{ top: 10, right: 60, left: 120, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <YAxis 
                      dataKey="segment" 
                      type="category" 
                      width={100} 
                      axisLine={false}
                    />
                    <XAxis 
                      type="number" 
                      domain={[0, 100]}
                      label={{ value: 'Propensity Score (%)', position: 'insideBottom', offset: -5 }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, name === 'propensity' ? 'Conversion Propensity' : 'Expected Lift']}
                    />
                    <Legend />
                    <Bar dataKey="propensity" name="Conversion Propensity" fill="#8884d8" />
                    <Bar dataKey="lift" name="Expected Lift" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Highest Potential</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Cart Abandoners</span>
                        <Badge variant="secondary">72%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Users who added products to cart but didn't complete purchase
                      </p>
                      <Button variant="outline" className="w-full mt-2">
                        Create Targeted Promotion
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Highest Expected Lift</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Cart Abandoners</span>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">+65%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Expected revenue increase with targeted promotions
                      </p>
                      <Button variant="outline" className="w-full mt-2">
                        View Opportunity
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Combined Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">1. Cart Abandoners</span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">4.7/5</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">2. High AOV</span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">3.9/5</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">3. Loyal</span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">3.6/5</Badge>
                      </div>
                      <Button className="w-full mt-2">
                        Create Multi-Segment Campaign
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
