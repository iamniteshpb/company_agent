import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  Users,
  FileWarning,
  Activity,
  ArrowRight,
  Sparkles,
  Bot
} from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { MetricCard } from "@/components/ui/MetricCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { AreaChartComponent } from "@/components/charts/AreaChartComponent";
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { PieChartComponent } from "@/components/charts/PieChartComponent";
import { LineChartComponent } from "@/components/charts/LineChartComponent";
import { DataTable, StatusBadge } from "@/components/ui/DataTable";
import { ChatInterface, ChatMessage } from "@/components/ui/ChatInterface";
import { AILogo } from "@/components/ui/AILogo";
import { Button } from "@/components/ui/button";
import aiHeroBg from "@/assets/ai-hero-bg.jpg";

// Demo data
const claimsTrendData = [
  { name: "Aug", value: 120, value2: 80 },
  { name: "Sep", value: 150, value2: 95 },
  { name: "Oct", value: 180, value2: 120 },
  { name: "Nov", value: 210, value2: 145 },
  { name: "Dec", value: 260, value2: 180 },
  { name: "Jan", value: 300, value2: 220 },
];

const vendorData = [
  { name: "Vendor A", value: 450 },
  { name: "Vendor B", value: 380 },
  { name: "Vendor C", value: 290 },
  { name: "Vendor D", value: 210 },
  { name: "Vendor E", value: 180 },
];

const claimsDistribution = [
  { name: "Duplicate", value: 35 },
  { name: "Valid", value: 45 },
  { name: "Pending", value: 15 },
  { name: "Rejected", value: 5 },
];

const monthlyAnalyticsData = [
  { name: "Jan", value: 420, value2: 380, value3: 40 },
  { name: "Feb", value: 480, value2: 420, value3: 60 },
  { name: "Mar", value: 520, value2: 480, value3: 40 },
  { name: "Apr", value: 580, value2: 510, value3: 70 },
  { name: "May", value: 620, value2: 560, value3: 60 },
  { name: "Jun", value: 680, value2: 600, value3: 80 },
];

const vendorTableData = [
  { vendor: "Vendor A", claims: 450, duplicates: 81, rate: "18%", status: "error" as const },
  { vendor: "Vendor B", claims: 380, duplicates: 38, rate: "10%", status: "warning" as const },
  { vendor: "Vendor C", claims: 290, duplicates: 14, rate: "5%", status: "active" as const },
  { vendor: "Vendor D", claims: 210, duplicates: 8, rate: "4%", status: "active" as const },
  { vendor: "Vendor E", claims: 180, duplicates: 5, rate: "3%", status: "active" as const },
];

const tableColumns = [
  { key: "vendor" as const, label: "Vendor" },
  { key: "claims" as const, label: "Total Claims", render: (value: number) => value.toLocaleString() },
  { key: "duplicates" as const, label: "Duplicates", render: (value: number) => value.toLocaleString() },
  { key: "rate" as const, label: "Rate" },
  { 
    key: "status" as const, 
    label: "Status", 
    render: (value: "active" | "warning" | "error") => {
      const labels = { active: "Healthy", warning: "Review", error: "Critical" };
      return <StatusBadge status={value} label={labels[value]} />;
    }
  },
];

// AI Responses simulation
const aiResponses: Record<string, { content: string; data?: any }> = {
  default: {
    content: "I'm your AI Analytics Agent. I can help you analyze business data, identify trends, and provide insights about your company metrics. Try asking questions like:\n\n• Which vendor has the highest duplicate claims?\n• What's the trend in claims over the last 6 months?\n• Show me the claims distribution by status",
  },
  vendor: {
    content: "Based on my analysis, **Vendor A** has the highest duplicate claims rate at 18%. This is significantly higher than the average of 8% across all vendors. I recommend conducting a review of their submission process.",
    data: { vendor: "Vendor A", duplicate_rate: "18%", total_claims: 450, duplicates: 81 }
  },
  trend: {
    content: "Duplicate claims have shown a steady increase over the last 6 months, rising from 120 in August to 300 in January—a 150% increase. This trend suggests a systemic issue that needs attention.",
    data: { trend: "increasing", growth: "150%", period: "6 months" }
  },
  distribution: {
    content: "Here's the current claims distribution:\n• **Valid**: 45% of all claims\n• **Duplicate**: 35% (concerning level)\n• **Pending Review**: 15%\n• **Rejected**: 5%\n\nThe duplicate rate is above the 20% threshold for concern.",
    data: { valid: "45%", duplicate: "35%", pending: "15%", rejected: "5%" }
  }
};

const Index = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: aiResponses.default.content,
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback((message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, userMessage]);
    
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response = aiResponses.default;
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes("vendor") || lowerMessage.includes("duplicate")) {
        response = aiResponses.vendor;
      } else if (lowerMessage.includes("trend") || lowerMessage.includes("month")) {
        response = aiResponses.trend;
      } else if (lowerMessage.includes("distribution") || lowerMessage.includes("status")) {
        response = aiResponses.distribution;
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        data: response.data,
        timestamp: new Date(),
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <DashboardLayout title="AI Analytics Dashboard" subtitle="Real-time business intelligence powered by AI">
      {/* Hero Section with Background */}
      <div className="relative mb-8 rounded-2xl overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${aiHeroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 p-8 flex items-center justify-between"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <AILogo size="lg" />
              <div>
                <h2 className="text-2xl font-bold">Enterprise AI Analytics</h2>
                <p className="text-muted-foreground">Intelligent insights at your fingertips</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Ask questions in natural language and get instant insights from your business data. 
              Our AI agent analyzes trends, identifies anomalies, and provides actionable recommendations.
            </p>
            <div className="flex gap-3">
              <Button className="gap-2">
                <Bot className="w-4 h-4" />
                Start Conversation
              </Button>
              <Button variant="outline" className="gap-2">
                View Documentation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <GlassCard className="p-4 text-center">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">99.2%</p>
              <p className="text-xs text-muted-foreground">Accuracy Rate</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <Activity className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold">2.3s</p>
              <p className="text-xs text-muted-foreground">Avg Response</p>
            </GlassCard>
          </div>
        </motion.div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Claims"
          value="1,510"
          change="+12.5% vs last month"
          changeType="positive"
          icon={FileWarning}
          iconColor="primary"
          delay={0}
        />
        <MetricCard
          title="Duplicate Rate"
          value="18.2%"
          change="+3.2% vs last month"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="warning"
          delay={1}
        />
        <MetricCard
          title="Processed Value"
          value="$2.4M"
          change="+8.1% vs last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="success"
          delay={2}
        />
        <MetricCard
          title="Active Vendors"
          value="47"
          change="2 new this month"
          changeType="neutral"
          icon={Users}
          iconColor="accent"
          delay={3}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AreaChartComponent
          data={claimsTrendData}
          title="Claims Trend Analysis"
          subtitle="6-month overview of claims vs duplicates"
          showSecondary
        />
        <BarChartComponent
          data={vendorData}
          title="Claims by Vendor"
          subtitle="Top 5 vendors by total claims"
          colorful
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <PieChartComponent
          data={claimsDistribution}
          title="Claims Distribution"
          subtitle="By status category"
        />
        <div className="lg:col-span-2">
          <LineChartComponent
            data={monthlyAnalyticsData}
            title="Monthly Analytics"
            subtitle="Claims, resolved, and pending trends"
            showMultiple
          />
        </div>
      </div>

      {/* Chat and Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* AI Chat */}
        <GlassCard className="p-0 overflow-hidden h-[500px]" hover={false}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ai-pulse">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">AI Analytics Agent</h3>
                <p className="text-xs text-muted-foreground">Ask me anything about your data</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <span className="status-dot status-online" />
                <span className="text-xs text-success">Online</span>
              </div>
            </div>
            <ChatInterface
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </GlassCard>

        {/* Vendor Table */}
        <DataTable
          data={vendorTableData}
          columns={tableColumns}
          title="Vendor Performance"
          subtitle="Duplicate claim analysis by vendor"
        />
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard delay={5}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <TrendingUp className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h4 className="font-medium mb-1">High Alert</h4>
              <p className="text-sm text-muted-foreground">
                Vendor A's duplicate rate increased by 5% this week. Immediate review recommended.
              </p>
            </div>
          </div>
        </GlassCard>
        <GlassCard delay={6}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Trend Warning</h4>
              <p className="text-sm text-muted-foreground">
                Overall duplicate claims up 150% in 6 months. Pattern detection suggests systemic issue.
              </p>
            </div>
          </div>
        </GlassCard>
        <GlassCard delay={7}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Positive Signal</h4>
              <p className="text-sm text-muted-foreground">
                Vendor C and D maintaining healthy duplicate rates below 5%. Consider as benchmarks.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Index;
