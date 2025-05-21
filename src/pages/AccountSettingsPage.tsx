
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Settings, User, Bell, Lock, Shield } from "lucide-react";

export default function AccountSettingsPage() {
  return (
    <Layout>
      <div className="container py-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight flex items-center">
            <Settings className="mr-2 h-6 w-6" />
            Account Settings
          </h1>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="w-full border-b pb-0 flex justify-start space-x-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Permissions</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                  <CardDescription>Manage your company information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" defaultValue="Mutations Design" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" type="url" defaultValue="https://mutations.design" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyDescription">Company Description</Label>
                    <Textarea 
                      id="companyDescription" 
                      rows={4} 
                      defaultValue="Mutations Design is a leading corporate gifting solution provider, offering branded products through BaseCampMart and WyshKit platforms."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Contact Email</Label>
                      <Input id="email" type="email" defaultValue="contact@mutations.design" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Contact Phone</Label>
                      <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure your seller account settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="baseCampId">BaseCampMart Vendor ID</Label>
                      <Input id="baseCampId" defaultValue="BCMV-1001" readOnly disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wyshkitId">WyshKit CGC ID</Label>
                      <Input id="wyshkitId" defaultValue="WKITC-5582" readOnly disabled />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allowCrossList">Allow Cross-Listing</Label>
                      <Switch id="allowCrossList" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Allow your products to be cross-listed between BaseCampMart and WyshKit platforms
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="returnGiftProgram">Return Gift Program</Label>
                      <Switch id="returnGiftProgram" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Participate in the return gift program to offer branded gifts for customer returns
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailOrders">New Orders</Label>
                      <Switch id="emailOrders" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailProposals">Proposal Updates</Label>
                      <Switch id="emailProposals" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailCrosslist">Cross-Listing Approvals</Label>
                      <Switch id="emailCrosslist" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailReturns">Return Gift Orders</Label>
                      <Switch id="emailReturns" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-medium">In-App Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="appOrders">New Orders</Label>
                      <Switch id="appOrders" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="appProposals">Proposal Updates</Label>
                      <Switch id="appProposals" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="appCrosslist">Cross-Listing Approvals</Label>
                      <Switch id="appCrosslist" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="appSystem">System Announcements</Label>
                      <Switch id="appSystem" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Reset to Default</Button>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Change Password</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="twoFactor" className="block">Enable Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="twoFactor" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>User Permissions</CardTitle>
                <CardDescription>Manage user access and roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Team Members</h3>
                  
                  <div className="border rounded-md">
                    <div className="grid grid-cols-4 p-4 border-b font-medium">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Role</div>
                      <div>Actions</div>
                    </div>
                    
                    <div className="grid grid-cols-4 p-4 border-b">
                      <div>John Doe</div>
                      <div>john@mutations.design</div>
                      <div>Admin</div>
                      <div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 p-4 border-b">
                      <div>Jane Smith</div>
                      <div>jane@mutations.design</div>
                      <div>Manager</div>
                      <div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 p-4">
                      <div>Alex Johnson</div>
                      <div>alex@mutations.design</div>
                      <div>Vendor</div>
                      <div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Team Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

import { Plus } from "lucide-react";
