import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Calendar, Download, Filter } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { AreaChartComponent } from "@/components/charts/AreaChartComponent";
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { LineChartComponent } from "@/components/charts/LineChartComponent";
import { PieChartComponent } from "@/components/charts/PieChartComponent";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const yearlyData = [
  { name: "Jan", value: 420, value2: 380 },
  { name: "Feb", value: 480, value2: 420 },
  { name: "Mar", value: 520, value2: 480 },
  { name: "Apr", value: 580, value2: 510 },
  { name: "May", value: 620, value2: 560 },
  { name: "Jun", value: 680, value2: 600 },
  { name: "Jul", value: 720, value2: 650 },
  { name: "Aug", value: 780, value2: 700 },
  { name: "Sep", value: 850, value2: 780 },
  { name: "Oct", value: 920, value2: 850 },
  { name: "Nov", value: 980, value2: 900 },
  { name: "Dec", value: 1050, value2: 950 },
];

const categoryData = [
  { name: "Healthcare", value: 2450 },
  { name: "Technology", value: 1890 },
  { name: "Finance", value: 1560 },
  { name: "Retail", value: 1230 },
  { name: "Manufacturing", value: 980 },
];

const performanceData = [
  { name: "Processing Speed", value: 45 },
  { name: "Accuracy Rate", value: 92 },
  { name: "Resolution Time", value: 78 },
  { name: "User Satisfaction", value: 88 },
];

const regionData = [
  { name: "North America", value: 38 },
  { name: "Europe", value: 28 },
  { name: "Asia Pacific", value: 22 },
  { name: "Others", value: 12 },
];

const multiLineData = [
  { name: "Week 1", value: 150, value2: 120, value3: 30 },
  { name: "Week 2", value: 180, value2: 145, value3: 35 },
  { name: "Week 3", value: 165, value2: 140, value3: 25 },
  { name: "Week 4", value: 200, value2: 170, value3: 30 },
  { name: "Week 5", value: 220, value2: 190, value3: 30 },
  { name: "Week 6", value: 195, value2: 165, value3: 30 },
];

const AnalyticsPage = () => {
  return (
    <DashboardLayout title="Analytics" subtitle="Comprehensive data analysis and reporting">
      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <Select defaultValue="year">
            <SelectTrigger className="w-40 bg-muted/30 border-border/50">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Revenue"
          value="$12.4M"
          change="+18.2% vs last year"
          changeType="positive"
          icon={TrendingUp}
          iconColor="success"
          delay={0}
        />
        <MetricCard
          title="Claims Processed"
          value="8,945"
          change="+24.5% vs last year"
          changeType="positive"
          icon={TrendingUp}
          iconColor="primary"
          delay={1}
        />
        <MetricCard
          title="Avg Processing Time"
          value="2.1 days"
          change="-15% improvement"
          changeType="positive"
          icon={TrendingDown}
          iconColor="success"
          delay={2}
        />
        <MetricCard
          title="Resolution Rate"
          value="94.8%"
          change="+2.3% vs last year"
          changeType="positive"
          icon={TrendingUp}
          iconColor="accent"
          delay={3}
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AreaChartComponent
          data={yearlyData}
          title="Annual Claims Overview"
          subtitle="Total claims vs processed claims by month"
          showSecondary
        />
        <BarChartComponent
          data={categoryData}
          title="Claims by Category"
          subtitle="Top 5 industry sectors"
          colorful
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <PieChartComponent
          data={regionData}
          title="Regional Distribution"
          subtitle="Claims by geographic region"
        />
        <div className="lg:col-span-2">
          <LineChartComponent
            data={multiLineData}
            title="Weekly Performance"
            subtitle="Total, resolved, and pending claims"
            showMultiple
          />
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartComponent
          data={performanceData}
          title="System Performance Metrics"
          subtitle="Key performance indicators (%)"
        />
        <GlassCard>
          <h3 className="text-lg font-semibold mb-4">Analytics Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-muted-foreground">Total Data Points Analyzed</span>
              <span className="font-semibold">1.2M+</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-muted-foreground">AI Predictions Made</span>
              <span className="font-semibold">45,892</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-muted-foreground">Anomalies Detected</span>
              <span className="font-semibold text-warning">127</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-muted-foreground">Reports Generated</span>
              <span className="font-semibold">2,341</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
              <span className="text-success">Savings from Duplicate Detection</span>
              <span className="font-semibold text-success">$3.2M</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
