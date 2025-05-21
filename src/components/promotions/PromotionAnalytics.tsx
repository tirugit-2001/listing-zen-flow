
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChartPie, ChartBar, TrendingUp } from "lucide-react";
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
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function PromotionAnalytics() {
  // Mock data for the charts
  const conversionData = [
    { date: "May 01", rate: 15 },
    { date: "May 05", rate: 18 },
    { date: "May 10", rate: 22 },
    { date: "May 15", rate: 25 },
    { date: "May 20", rate: 20 },
    { date: "May 25", rate: 28 }
  ];
  
  const revenueData = [
    { name: "Product A", revenue: 12500 },
    { name: "Product B", revenue: 9200 },
    { name: "Product C", revenue: 7800 },
    { name: "Product D", revenue: 5400 },
    { name: "Product E", revenue: 3200 }
  ];
  
  const channelData = [
    { name: "Direct", value: 45 },
    { name: "Social", value: 25 },
    { name: "Email", value: 15 },
    { name: "Referral", value: 10 },
    { name: "Other", value: 5 }
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Promotion Performance</CardTitle>
        <CardDescription>
          Analytics for current active promotions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="conversion">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="conversion">
              <TrendingUp className="h-4 w-4 mr-2" />
              Conversion
            </TabsTrigger>
            <TabsTrigger value="revenue">
              <ChartBar className="h-4 w-4 mr-2" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="channels">
              <ChartPie className="h-4 w-4 mr-2" />
              Channels
            </TabsTrigger>
          </TabsList>
          
          {/* Conversion Rate Chart */}
          <TabsContent value="conversion">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={conversionData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="rate"
                    stroke="#0ea5e9"
                    fillOpacity={1}
                    fill="url(#colorRate)"
                    name="Conversion Rate %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-center text-muted-foreground mt-4">
              Conversion rate trending upward by 8% this month
            </p>
          </TabsContent>
          
          {/* Revenue Chart */}
          <TabsContent value="revenue">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-center text-muted-foreground mt-4">
              Top 5 products by promotion revenue
            </p>
          </TabsContent>
          
          {/* Channels Chart */}
          <TabsContent value="channels">
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-center text-muted-foreground mt-4">
              Promotion engagement by channel
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
