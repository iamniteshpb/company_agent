import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AILogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

export function AILogo({ size = "md", animated = true, className }: AILogoProps) {
  return (
    <motion.div
      initial={animated ? { scale: 0.8, opacity: 0 } : false}
      animate={animated ? { scale: 1, opacity: 1 } : false}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20",
        sizeClasses[size],
        animated && "ai-pulse",
        className
      )}
    >
      {/* Inner glow */}
      <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-primary to-accent opacity-80" />
      
      {/* Logo mark */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="relative z-10 w-1/2 h-1/2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" className="fill-primary-foreground/20" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>

      {/* Animated ring */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-primary/50"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
}

// Company Logo with Text
interface CompanyLogoProps {
  collapsed?: boolean;
}

export function CompanyLogo({ collapsed = false }: CompanyLogoProps) {
  return (
    <div className="flex items-center gap-3">
      <AILogo size="sm" animated={false} />
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-lg font-bold text-gradient-primary">AI Analytics</span>
        </motion.div>
      )}
    </div>
  );
}
