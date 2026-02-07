import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: "primary" | "accent" | "success" | "warning" | "destructive";
  delay?: number;
}

const iconColorClasses = {
  primary: "text-primary bg-primary/10",
  accent: "text-accent bg-accent/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  destructive: "text-destructive bg-destructive/10",
};

const changeTypeClasses = {
  positive: "text-success",
  negative: "text-destructive",
  neutral: "text-muted-foreground",
};

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "primary",
  delay = 0,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="metric-card group"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {change && (
            <p className={cn("text-sm font-medium", changeTypeClasses[changeType])}>
              {change}
            </p>
          )}
        </div>
        <div
          className={cn(
            "p-3 rounded-xl transition-transform duration-300 group-hover:scale-110",
            iconColorClasses[iconColor]
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
