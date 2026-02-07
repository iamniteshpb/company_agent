import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Database,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Activity,
  Users,
  FileText,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: MessageSquare, label: "AI Chat", path: "/chat" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Database, label: "Data Explorer", path: "/data" },
  { icon: Users, label: "Vendors", path: "/vendors" },
  { icon: FileText, label: "Reports", path: "/reports" },
];

const bottomItems = [
  { icon: HelpCircle, label: "Help", path: "/help" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function AppSidebar({ collapsed = false, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center glow-primary">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-hidden"
            >
              <h1 className="font-bold text-lg">AI Analytics</h1>
              <p className="text-xs text-muted-foreground">Enterprise Agent</p>
            </motion.div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 flex-shrink-0"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="py-4 px-3 border-t border-sidebar-border space-y-1">
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
            </NavLink>
          );
        })}

        {/* Status Indicator */}
        {!collapsed && (
          <div className="mt-4 p-3 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="status-dot status-online" />
              <span className="text-xs font-medium">System Online</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="w-3 h-3" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
