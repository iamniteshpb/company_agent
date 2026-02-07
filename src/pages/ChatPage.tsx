import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, History, Trash2, Plus } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { ChatInterface, ChatMessage } from "@/components/ui/ChatInterface";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const suggestedQuestions = [
  "Which vendor has the highest duplicate claims?",
  "Show me the claims trend for the last 6 months",
  "What's the distribution of claims by status?",
  "Compare vendor performance metrics",
  "Identify anomalies in recent claims data",
  "Generate a summary report for Q4",
];

const aiResponses: Record<string, { content: string; data?: any }> = {
  default: {
    content: "I'm ready to help you analyze your business data. Ask me questions about vendors, claims, trends, or any other metrics you'd like to explore.",
  },
  vendor: {
    content: "Based on my analysis, **Vendor A** has the highest duplicate claims rate at 18%. This is significantly higher than the average of 8% across all vendors.\n\n**Recommendations:**\n1. Conduct an audit of Vendor A's submission process\n2. Implement additional validation checks\n3. Schedule a review meeting with their team",
    data: { vendor: "Vendor A", duplicate_rate: "18%", total_claims: 450, duplicates: 81, avg_rate: "8%" }
  },
  trend: {
    content: "Here's the claims trend analysis for the last 6 months:\n\n📈 **Overall Growth:** Claims increased from 120 to 300 (+150%)\n📊 **Monthly Average:** 203 claims\n⚠️ **Concern:** Duplicate rate growing faster than total claims\n\nThe data suggests a systemic issue that began around October.",
    data: { growth: "150%", avg_monthly: 203, peak_month: "January", start_value: 120, end_value: 300 }
  },
  distribution: {
    content: "Current claims distribution breakdown:\n\n✅ **Valid Claims:** 45% (675 claims)\n🔄 **Duplicate Claims:** 35% (525 claims) ⚠️\n⏳ **Pending Review:** 15% (225 claims)\n❌ **Rejected:** 5% (75 claims)\n\nThe duplicate rate exceeds the 20% threshold for concern. Immediate action is recommended.",
    data: { valid: 675, duplicate: 525, pending: 225, rejected: 75, total: 1500 }
  },
  compare: {
    content: "Vendor performance comparison:\n\n**Top Performers (Low Duplicate Rate):**\n• Vendor E: 3% duplicate rate\n• Vendor D: 4% duplicate rate\n• Vendor C: 5% duplicate rate\n\n**Needs Attention:**\n• Vendor B: 10% duplicate rate\n• Vendor A: 18% duplicate rate ⚠️\n\nRecommend sharing best practices from top performers with underperforming vendors.",
    data: { best_performer: "Vendor E", worst_performer: "Vendor A", avg_rate: "8%" }
  },
  anomaly: {
    content: "Anomaly detection results:\n\n🚨 **Critical Anomalies Found:**\n1. Vendor A spike on Dec 15th (+45% claims in single day)\n2. Unusual pattern of duplicate submissions at 3 AM\n3. Cluster of rejected claims from same IP range\n\n**Recommendation:** Investigate these patterns for potential fraud or system issues.",
    data: { anomalies_found: 3, severity: "high", investigation_priority: "immediate" }
  },
  report: {
    content: "**Q4 Summary Report Generated:**\n\n📊 **Key Metrics:**\n• Total Claims Processed: 4,250\n• Processing Efficiency: 94.2%\n• Average Resolution Time: 2.3 days\n\n💰 **Financial Impact:**\n• Total Value Processed: $8.5M\n• Duplicate Savings: $1.2M prevented\n\n📈 **Trends:**\n• Claims volume up 23% vs Q3\n• Duplicate detection improved by 15%\n\nFull report available for download.",
    data: { quarter: "Q4", total_claims: 4250, efficiency: "94.2%", savings: "$1.2M" }
  }
};

const ChatPage = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Welcome to the AI Analytics Agent!\n\nI can help you analyze your business data using natural language. Try asking questions about:\n\n• Vendor performance and duplicate claims\n• Trends and patterns in your data\n• Anomaly detection and alerts\n• Custom reports and insights\n\nWhat would you like to explore today?",
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback((message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      let response = aiResponses.default;
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes("vendor") && lowerMessage.includes("highest")) {
        response = aiResponses.vendor;
      } else if (lowerMessage.includes("trend") || lowerMessage.includes("month")) {
        response = aiResponses.trend;
      } else if (lowerMessage.includes("distribution") || lowerMessage.includes("status")) {
        response = aiResponses.distribution;
      } else if (lowerMessage.includes("compare") || lowerMessage.includes("performance")) {
        response = aiResponses.compare;
      } else if (lowerMessage.includes("anomal") || lowerMessage.includes("unusual")) {
        response = aiResponses.anomaly;
      } else if (lowerMessage.includes("report") || lowerMessage.includes("summary")) {
        response = aiResponses.report;
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
    }, 1200);
  }, []);

  const handleClearChat = () => {
    setChatMessages([{
      id: "welcome",
      role: "assistant",
      content: "Chat cleared. How can I help you today?",
      timestamp: new Date(),
    }]);
  };

  return (
    <DashboardLayout title="AI Chat" subtitle="Natural language interface for data analysis">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-180px)]">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <Button className="w-full gap-2" size="lg">
            <Plus className="w-4 h-4" />
            New Conversation
          </Button>

          <GlassCard className="p-4">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Suggested Questions
            </h3>
            <div className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(question)}
                  className="w-full text-left text-sm p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-muted-foreground" />
              Recent Conversations
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="p-2 hover:bg-muted/50 rounded cursor-pointer">Vendor Analysis - Today</p>
              <p className="p-2 hover:bg-muted/50 rounded cursor-pointer">Q4 Report - Yesterday</p>
              <p className="p-2 hover:bg-muted/50 rounded cursor-pointer">Trend Review - 3 days ago</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <GlassCard className="p-0 h-full overflow-hidden" hover={false}>
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center ai-pulse">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Analytics Agent</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="status-dot status-online" />
                      <span>Online • Ready to assist</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleClearChat}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <ChatInterface
                  messages={chatMessages}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  placeholder="Ask about vendors, claims, trends, or generate reports..."
                />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;
