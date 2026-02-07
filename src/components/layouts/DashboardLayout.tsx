import { useState, ReactNode } from "react";
import { AppSidebar } from "@/components/ui/AppSidebar";
import { Header } from "@/components/ui/Header";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div 
        className="transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarCollapsed ? 72 : 260 }}
      >
        <Header title={title} subtitle={subtitle} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
