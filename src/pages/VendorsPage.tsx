import { motion } from "framer-motion";
import { Users, Star, AlertTriangle, TrendingUp, TrendingDown, MoreVertical, Plus } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { LineChartComponent } from "@/components/charts/LineChartComponent";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";

const vendorList = [
  {
    id: "VND-001",
    name: "Vendor A",
    logo: "A",
    claims: 450,
    duplicateRate: 18,
    rating: 3.2,
    trend: "up",
    status: "error" as const,
    region: "North America",
    lastActivity: "2 hours ago",
  },
  {
    id: "VND-002",
    name: "Vendor B",
    logo: "B",
    claims: 380,
    duplicateRate: 10,
    rating: 4.1,
    trend: "down",
    status: "warning" as const,
    region: "Europe",
    lastActivity: "5 hours ago",
  },
  {
    id: "VND-003",
    name: "Vendor C",
    logo: "C",
    claims: 290,
    duplicateRate: 5,
    rating: 4.5,
    trend: "down",
    status: "active" as const,
    region: "Asia Pacific",
    lastActivity: "1 day ago",
  },
  {
    id: "VND-004",
    name: "Vendor D",
    logo: "D",
    claims: 210,
    duplicateRate: 4,
    rating: 4.7,
    trend: "stable",
    status: "active" as const,
    region: "North America",
    lastActivity: "3 hours ago",
  },
  {
    id: "VND-005",
    name: "Vendor E",
    logo: "E",
    claims: 180,
    duplicateRate: 3,
    rating: 4.8,
    trend: "down",
    status: "active" as const,
    region: "Europe",
    lastActivity: "12 hours ago",
  },
];

const vendorPerformanceData = [
  { name: "Vendor A", value: 82 },
  { name: "Vendor B", value: 90 },
  { name: "Vendor C", value: 95 },
  { name: "Vendor D", value: 96 },
  { name: "Vendor E", value: 97 },
];

const vendorTrendData = [
  { name: "Jan", value: 15, value2: 12, value3: 8 },
  { name: "Feb", value: 14, value2: 11, value3: 6 },
  { name: "Mar", value: 16, value2: 10, value3: 5 },
  { name: "Apr", value: 17, value2: 10, value3: 5 },
  { name: "May", value: 18, value2: 9, value3: 4 },
  { name: "Jun", value: 18, value2: 10, value3: 3 },
];

const VendorsPage = () => {
  return (
    <DashboardLayout title="Vendors" subtitle="Manage and monitor vendor performance">
      {/* Header Actions */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex gap-2">
          <Button variant="outline">All Vendors</Button>
          <Button variant="ghost">Active</Button>
          <Button variant="ghost">Needs Review</Button>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Vendor
        </Button>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Vendors"
          value="47"
          change="+2 this month"
          changeType="positive"
          icon={Users}
          iconColor="primary"
          delay={0}
        />
        <MetricCard
          title="Avg Rating"
          value="4.3"
          change="↑ 0.2 vs last month"
          changeType="positive"
          icon={Star}
          iconColor="warning"
          delay={1}
        />
        <MetricCard
          title="Needs Review"
          value="5"
          change="2 critical"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="destructive"
          delay={2}
        />
        <MetricCard
          title="Avg Performance"
          value="92%"
          change="+3% improvement"
          changeType="positive"
          icon={TrendingUp}
          iconColor="success"
          delay={3}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BarChartComponent
          data={vendorPerformanceData}
          title="Performance Score by Vendor"
          subtitle="Based on duplicate rate and processing speed"
          colorful
        />
        <LineChartComponent
          data={vendorTrendData}
          title="Duplicate Rate Trend"
          subtitle="Top 3 vendors with highest rates"
          showMultiple
        />
      </div>

      {/* Vendor Cards */}
      <h3 className="text-lg font-semibold mb-4">All Vendors</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendorList.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-5" hover>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold",
                    vendor.status === "error" ? "bg-destructive/10 text-destructive" :
                    vendor.status === "warning" ? "bg-warning/10 text-warning" :
                    "bg-primary/10 text-primary"
                  )}>
                    {vendor.logo}
                  </div>
                  <div>
                    <h4 className="font-semibold">{vendor.name}</h4>
                    <p className="text-xs text-muted-foreground">{vendor.region}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Total Claims</p>
                  <p className="text-lg font-semibold">{vendor.claims}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Duplicate Rate</p>
                  <div className="flex items-center gap-1">
                    <p className={cn(
                      "text-lg font-semibold",
                      vendor.duplicateRate > 10 ? "text-destructive" :
                      vendor.duplicateRate > 5 ? "text-warning" :
                      "text-success"
                    )}>
                      {vendor.duplicateRate}%
                    </p>
                    {vendor.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-destructive" />
                    ) : vendor.trend === "down" ? (
                      <TrendingDown className="w-4 h-4 text-success" />
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="text-sm font-medium">{vendor.rating}</span>
                </div>
                <StatusBadge
                  status={vendor.status}
                  label={vendor.status === "error" ? "Critical" : vendor.status === "warning" ? "Review" : "Healthy"}
                />
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                Last activity: {vendor.lastActivity}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default VendorsPage;
