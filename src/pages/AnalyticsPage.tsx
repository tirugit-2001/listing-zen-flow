
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { BarChart as BarChartIcon, TrendingUp, ArrowDownUp, Package, ShoppingCart, Calendar, Download } from "lucide-react";

export default function AnalyticsPage() {
  // Mock data for the charts
  const salesData = [
    { name: 'Jan', wyshkit: 4000, basecamp: 2400 },
    { name: 'Feb', wyshkit: 3000, basecamp: 2210 },
    { name: 'Mar', wyshkit: 2000, basecamp: 2290 },
    { name: 'Apr', wyshkit: 2780, basecamp: 2000 },
    { name: 'May', wyshkit: 5890, basecamp: 2181 },
    { name: 'Jun', wyshkit: 2390, basecamp: 2500 },
    { name: 'Jul', wyshkit: 3490, basecamp: 3100 },
  ];

  const productCategoryData = [
    { name: 'Bottles', value: 35 },
    { name: 'Apparel', value: 25 },
    { name: 'Electronics', value: 20 },
    { name: 'Diaries', value: 15 },
    { name: 'Others', value: 5 },
  ];

  const brandingMethodData = [
    { name: 'Printing', wyshkit: 20, basecamp: 15 },
    { name: 'Embroidery', wyshkit: 15, basecamp: 10 },
    { name: 'Engraving', wyshkit: 8, basecamp: 12 },
    { name: 'Heat Transfer', wyshkit: 10, basecamp: 5 },
    { name: 'Debossing', wyshkit: 5, basecamp: 2 },
  ];

  const returnGiftData = [
    { name: 'Jan', value: 8 },
    { name: 'Feb', value: 12 },
    { name: 'Mar', value: 16 },
    { name: 'Apr', value: 9 },
    { name: 'May', value: 15 },
    { name: 'Jun', value: 18 },
    { name: 'Jul', value: 22 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center">
              <BarChartIcon className="mr-2 h-6 w-6" />
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">Insights and performance metrics across platforms</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="return-gifts">Return Gifts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            {/* Performance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full mb-3">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total Sales</h3>
                    <p className="text-2xl font-bold">₹8,45,000</p>
                    <p className="text-xs text-green-600">+12% vs. last month</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-amber-100 text-amber-600 p-2 rounded-full mb-3">
                      <ShoppingCart className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total Orders</h3>
                    <p className="text-2xl font-bold">182</p>
                    <p className="text-xs text-green-600">+8% vs. last month</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 text-green-600 p-2 rounded-full mb-3">
                      <Package className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Products Listed</h3>
                    <p className="text-2xl font-bold">42</p>
                    <p className="text-xs text-green-600">+4 new this month</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-full mb-3">
                      <ArrowDownUp className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Cross-Listed</h3>
                    <p className="text-2xl font-bold">18</p>
                    <p className="text-xs text-green-600">43% of products</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Comparison</CardTitle>
                  <CardDescription>WyshKit vs BaseCampMart monthly sales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={salesData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="wyshkit" stackId="1" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="basecamp" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Product Categories</CardTitle>
                  <CardDescription>Distribution of products by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {productCategoryData.map((entry, index) => (
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
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Branding Methods</CardTitle>
                  <CardDescription>Comparison of branding methods used</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={brandingMethodData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="wyshkit" name="WyshKit" fill="#8884d8" />
                        <Bar dataKey="basecamp" name="BaseCampMart" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Return Gift Orders</CardTitle>
                  <CardDescription>Monthly trend of return gift orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={returnGiftData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Placeholder content for other tabs */}
          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Sales Analysis</CardTitle>
                <CardDescription>Comprehensive sales data across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Detailed sales metrics and charts would be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Analyze product metrics and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Product performance metrics and analytics would be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="return-gifts">
            <Card>
              <CardHeader>
                <CardTitle>Return Gift Analytics</CardTitle>
                <CardDescription>Analytics for return gift campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Return gift program metrics and analytics would be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
