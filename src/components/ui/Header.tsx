import { motion } from "framer-motion";
import { Bell, Search, User, Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = "Dashboard", subtitle }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-40"
    >
      {/* Title Section */}
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-64 pl-10 bg-muted/30 border-border/50 focus:border-primary/50"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        {/* User */}
        <Button variant="ghost" className="gap-2 hidden sm:flex">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium">Admin</span>
        </Button>
      </div>
    </motion.header>
  );
}
