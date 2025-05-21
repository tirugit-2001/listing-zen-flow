
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import {
  ArrowRightLeft,
  Split,
  BarChart as BarChartIcon,
  ChevronRight,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface TestVariant {
  id: string;
  name: string;
  description: string;
  discount: string;
  audience: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: string;
  conversionRate: number;
  status: 'active' | 'winner' | 'loser';
}

interface ABTest {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'scheduled';
  startDate: string;
  endDate: string;
  objective: 'conversion' | 'revenue' | 'engagement';
  audienceSize: number;
  variants: TestVariant[];
}

interface ABTestingPanelProps {
  onCreateTest?: () => void;
}

export default function ABTestingPanel({ onCreateTest }: ABTestingPanelProps) {
  const [selectedMetric, setSelectedMetric] = useState<string>("conversion");
  const [activeTestId, setActiveTestId] = useState<string>("test-1");
  
  // Mock data for A/B tests
  const abTests: ABTest[] = [
    {
      id: "test-1",
      name: "Summer Discount Level Test",
      status: 'running',
      startDate: "2025-06-01",
      endDate: "2025-06-14",
      objective: 'conversion',
      audienceSize: 10000,
      variants: [
        {
          id: "variant-a",
          name: "Variant A: 15% Discount",
          description: "15% discount with standard messaging",
          discount: "15%",
          audience: "50% of test group",
          impressions: 5260,
          clicks: 842,
          conversions: 126,
          revenue: "₹63,000",
          conversionRate: 15,
          status: 'active'
        },
        {
          id: "variant-b",
          name: "Variant B: 10% + Free Shipping",
          description: "10% discount with free shipping offer",
          discount: "10% + Free Shipping",
          audience: "50% of test group",
          impressions: 5240,
          clicks: 891,
          conversions: 160,
          revenue: "₹76,800",
          conversionRate: 18,
          status: 'active'
        }
      ]
    },
    {
      id: "test-2",
      name: "Bundle Pricing Strategy",
      status: 'completed',
      startDate: "2025-05-15",
      endDate: "2025-05-31",
      objective: 'revenue',
      audienceSize: 8000,
      variants: [
        {
          id: "variant-c",
          name: "Variant A: Buy 2 Get 1 Free",
          description: "Buy two items, get one free of equal or lesser value",
          discount: "Buy 2 Get 1 Free",
          audience: "50% of test group",
          impressions: 4120,
          clicks: 536,
          conversions: 98,
          revenue: "₹58,800",
          conversionRate: 18.3,
          status: 'loser'
        },
        {
          id: "variant-d",
          name: "Variant B: 25% off when buying 3+",
          description: "25% discount when purchasing 3 or more items",
          discount: "25% off 3+ items",
          audience: "50% of test group",
          impressions: 4080,
          clicks: 572,
          conversions: 121,
          revenue: "₹78,650",
          conversionRate: 21.2,
          status: 'winner'
        }
      ]
    }
  ];
  
  const activeTest = abTests.find(test => test.id === activeTestId);
  
  if (!activeTest) {
    return <div>No test selected</div>;
  }
  
  const getComparisonData = () => {
    switch (selectedMetric) {
      case 'conversion':
        return activeTest.variants.map(v => ({
          name: v.name.split(':')[0],
          conversionRate: v.conversionRate,
          fill: v.status === 'winner' ? '#16a34a' : v.status === 'loser' ? '#dc2626' : '#3b82f6'
        }));
      case 'revenue':
        return activeTest.variants.map(v => ({
          name: v.name.split(':')[0],
          revenue: parseInt(v.revenue.replace(/[^0-9]/g, '')),
          fill: v.status === 'winner' ? '#16a34a' : v.status === 'loser' ? '#dc2626' : '#3b82f6'
        }));
      case 'clicks':
        return activeTest.variants.map(v => ({
          name: v.name.split(':')[0],
          clicks: v.clicks,
          fill: v.status === 'winner' ? '#16a34a' : v.status === 'loser' ? '#dc2626' : '#3b82f6'
        }));
      default:
        return [];
    }
  };
  
  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'conversion':
        return 'Conversion Rate (%)';
      case 'revenue':
        return 'Revenue (₹)';
      case 'clicks':
        return 'Click Count';
      default:
        return '';
    }
  };
  
  const getMetricValue = (variant: TestVariant) => {
    switch (selectedMetric) {
      case 'conversion':
        return `${variant.conversionRate}%`;
      case 'revenue':
        return variant.revenue;
      case 'clicks':
        return variant.clicks.toString();
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Split className="mr-2 h-5 w-5 text-blue-500" /> 
            A/B Testing & Optimization
          </h2>
          <p className="text-muted-foreground">
            Test different promotion strategies to optimize performance
          </p>
        </div>
        
        <Button onClick={onCreateTest}>
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Create New Test
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Active Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {abTests.map(test => (
              <div 
                key={test.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${test.id === activeTestId ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
                onClick={() => setActiveTestId(test.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{test.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(test.startDate).toLocaleDateString()} - {new Date(test.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    className={
                      test.status === 'running' ? 'bg-green-100 text-green-800 border-green-200' :
                      test.status === 'completed' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      'bg-amber-100 text-amber-800 border-amber-200'
                    }
                  >
                    {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span>Variants: {test.variants.length}</span>
                  <span>Audience: {test.audienceSize.toLocaleString()}</span>
                </div>
                {test.id === activeTestId && (
                  <div className="mt-2 text-xs text-blue-600 flex items-center">
                    Currently viewing <ChevronRight className="h-3 w-3 ml-1" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
        
        <div className="w-full md:w-2/3 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{activeTest.name}</CardTitle>
                  <CardDescription>
                    Objective: {activeTest.objective.charAt(0).toUpperCase() + activeTest.objective.slice(1)} Optimization
                  </CardDescription>
                </div>
                <Select 
                  value={selectedMetric} 
                  onValueChange={setSelectedMetric}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conversion">Conversion Rate</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="clicks">Click Count</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getComparisonData()}
                    margin={{ top: 10, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: getMetricLabel(), angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar 
                      dataKey={selectedMetric === 'conversion' ? 'conversionRate' : selectedMetric === 'revenue' ? 'revenue' : 'clicks'} 
                      fill="#3b82f6"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTest.variants.map(variant => (
              <Card key={variant.id} className={
                variant.status === 'winner' ? 'border-green-200' :
                variant.status === 'loser' ? 'border-red-200' : ''
              }>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{variant.name.split(':')[1]}</CardTitle>
                    {variant.status === 'winner' && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" /> Winner
                      </Badge>
                    )}
                    {variant.status === 'loser' && (
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        <XCircle className="h-3 w-3 mr-1" /> Underperforming
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{variant.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Discount</p>
                      <p className="font-medium">{variant.discount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Audience</p>
                      <p className="font-medium">{variant.audience}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Impressions</p>
                      <p className="font-medium">{variant.impressions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Clicks</p>
                      <p className="font-medium">{variant.clicks.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Conversions</p>
                      <p className="font-medium">{variant.conversions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}</p>
                      <p className="font-medium text-emerald-600">{getMetricValue(variant)}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  {activeTest.status === 'completed' ? (
                    variant.status === 'winner' ? (
                      <Button className="w-full">Implement Winner</Button>
                    ) : (
                      <Button variant="outline" className="w-full">View Details</Button>
                    )
                  ) : (
                    <Button variant="outline" className="w-full">View Live Performance</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
