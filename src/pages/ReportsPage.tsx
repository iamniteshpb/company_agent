import { motion } from "framer-motion";
import { FileText, Download, Calendar, Filter, Plus, Eye, Trash2, Clock } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";

const reports = [
  {
    id: "RPT-001",
    title: "Q4 2024 Claims Summary",
    description: "Comprehensive overview of all claims processed in Q4",
    type: "Quarterly Report",
    status: "completed" as const,
    generatedAt: "2024-01-15 09:30 AM",
    size: "2.4 MB",
    format: "PDF",
  },
  {
    id: "RPT-002",
    title: "Vendor Performance Analysis",
    description: "Detailed performance metrics for all active vendors",
    type: "Analysis",
    status: "completed" as const,
    generatedAt: "2024-01-14 03:15 PM",
    size: "1.8 MB",
    format: "PDF",
  },
  {
    id: "RPT-003",
    title: "Duplicate Claims Investigation",
    description: "Investigation report on duplicate claim patterns",
    type: "Investigation",
    status: "completed" as const,
    generatedAt: "2024-01-13 11:00 AM",
    size: "3.2 MB",
    format: "PDF",
  },
  {
    id: "RPT-004",
    title: "Weekly Analytics Dashboard",
    description: "Weekly snapshot of key performance indicators",
    type: "Weekly Report",
    status: "generating" as const,
    generatedAt: "Generating...",
    size: "-",
    format: "PDF",
  },
  {
    id: "RPT-005",
    title: "Annual Compliance Report",
    description: "Yearly compliance and audit documentation",
    type: "Compliance",
    status: "scheduled" as const,
    generatedAt: "Scheduled for Jan 20",
    size: "-",
    format: "PDF",
  },
];

const reportTemplates = [
  { name: "Claims Summary", icon: FileText, color: "primary" },
  { name: "Vendor Analysis", icon: FileText, color: "accent" },
  { name: "Trend Report", icon: FileText, color: "success" },
  { name: "Audit Report", icon: FileText, color: "warning" },
];

const ReportsPage = () => {
  return (
    <DashboardLayout title="Reports" subtitle="Generate and manage analytical reports">
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        {reportTemplates.map((template, index) => (
          <GlassCard key={index} className="p-4 cursor-pointer hover:border-primary/50" hover>
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                template.color === "primary" ? "bg-primary/10 text-primary" :
                template.color === "accent" ? "bg-accent/10 text-accent" :
                template.color === "success" ? "bg-success/10 text-success" :
                "bg-warning/10 text-warning"
              )}>
                <template.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-sm">{template.name}</p>
                <p className="text-xs text-muted-foreground">Generate new</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </motion.div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold">Recent Reports</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Schedule
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Report
          </Button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-5" hover>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{report.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {report.generatedAt}
                      </span>
                      <span>{report.type}</span>
                      {report.size !== "-" && <span>{report.size}</span>}
                      <span>{report.format}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge
                    status={
                      report.status === "completed" ? "active" :
                      report.status === "generating" ? "warning" :
                      "pending"
                    }
                    label={
                      report.status === "completed" ? "Completed" :
                      report.status === "generating" ? "Generating" :
                      "Scheduled"
                    }
                  />
                  {report.status === "completed" && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <GlassCard className="p-4 text-center">
          <p className="text-3xl font-bold text-primary">234</p>
          <p className="text-sm text-muted-foreground">Reports Generated</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-3xl font-bold text-success">12</p>
          <p className="text-sm text-muted-foreground">Scheduled Reports</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-3xl font-bold text-accent">1.2 GB</p>
          <p className="text-sm text-muted-foreground">Total Storage Used</p>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
