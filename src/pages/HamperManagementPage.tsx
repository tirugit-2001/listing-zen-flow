
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, Filter, LayoutGrid, List, Package, ShoppingCart, ArrowRight, Clock, CheckCircle } from "lucide-react";
import HamperList from "@/components/hamper/HamperList";

export default function HamperManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Hampers & Gift Sets</h1>
              <p className="text-muted-foreground">Create and manage custom hampers with your products</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button asChild size="sm">
                <Link to="/create-hamper">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Hamper
                </Link>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active Hampers</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="pending">Pending Approval</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search hampers..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Select 
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="festival">Festival</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                    <SelectItem value="holiday">Holiday</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}>
                  {viewType === "grid" ? (
                    <LayoutGrid className="h-4 w-4" />
                  ) : (
                    <List className="h-4 w-4" />
                  )}
                </Button>
                
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <TabsContent value="active" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <HamperList viewType={viewType} status="active" />
              </div>
            </TabsContent>
            
            <TabsContent value="draft" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <HamperList viewType={viewType} status="draft" />
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <HamperList viewType={viewType} status="pending" />
              </div>
            </TabsContent>
            
            <TabsContent value="archived" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <HamperList viewType={viewType} status="archived" />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                1
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                2
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
