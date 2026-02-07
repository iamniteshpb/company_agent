import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Database, Palette, Key, Globe, Save } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsPage = () => {
  return (
    <DashboardLayout title="Settings" subtitle="Manage your account and preferences">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted/30">
          <TabsTrigger value="general" className="gap-2">
            <Settings className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="w-4 h-4" />
            API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile */}
            <GlassCard>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Profile Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    A
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 2MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input defaultValue="Admin" className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input defaultValue="User" className="bg-muted/30" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="admin@company.com" className="bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input defaultValue="Administrator" disabled className="bg-muted/30" />
                </div>
              </div>
            </GlassCard>

            {/* Preferences */}
            <GlassCard>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-accent" />
                Preferences
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="bg-muted/30">
                      <Globe className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger className="bg-muted/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                      <SelectItem value="est">Eastern (GMT-5)</SelectItem>
                      <SelectItem value="pst">Pacific (GMT-8)</SelectItem>
                      <SelectItem value="cet">Central European (GMT+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger className="bg-muted/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Compact Mode</p>
                    <p className="text-xs text-muted-foreground">Reduce spacing in UI</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <GlassCard>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-warning" />
              Notification Preferences
            </h3>
            <div className="space-y-4">
              {[
                { title: "Email Notifications", desc: "Receive email updates for important events" },
                { title: "Push Notifications", desc: "Browser push notifications" },
                { title: "Weekly Digest", desc: "Weekly summary of analytics" },
                { title: "Alert on Anomalies", desc: "Instant alerts for detected anomalies" },
                { title: "Report Ready", desc: "Notify when scheduled reports are ready" },
                { title: "Vendor Alerts", desc: "Alerts for vendor performance issues" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={index < 4} />
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                Password
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" className="bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" className="bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" className="bg-muted/30" />
                </div>
                <Button>Update Password</Button>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
              <div className="space-y-4">
                <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                  <p className="text-success font-medium">2FA is enabled</p>
                  <p className="text-sm text-muted-foreground">Your account is protected with two-factor authentication</p>
                </div>
                <Button variant="outline">Manage 2FA Settings</Button>
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="api">
          <GlassCard>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              API Configuration
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>API Endpoint</Label>
                <Input value="https://api.company.com/v1/agent/chat" disabled className="bg-muted/30 font-mono text-sm" />
              </div>
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <Input value="sk-••••••••••••••••••••••••" disabled className="bg-muted/30 font-mono text-sm" />
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input placeholder="https://your-app.com/webhook" className="bg-muted/30 font-mono text-sm" />
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="font-medium mb-2">Rate Limits</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Requests per minute</p>
                    <p className="font-semibold">100</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Daily quota</p>
                    <p className="font-semibold">10,000</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
