import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "strong" | "bordered";
  hover?: boolean;
  delay?: number;
}

export function GlassCard({
  children,
  className,
  variant = "default",
  hover = true,
  delay = 0,
  ...props
}: GlassCardProps) {
  const variants = {
    default: "glass",
    strong: "glass-strong",
    bordered: "border-animated",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={cn(
        "rounded-xl p-6",
        variants[variant],
        hover && "transition-all duration-300 hover:border-primary/30 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
