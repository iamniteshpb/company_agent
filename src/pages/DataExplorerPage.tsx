import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Search, Table, RefreshCw, Download, Code, Eye } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { DataTable, StatusBadge } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for different tables
const claimsData = [
  { id: "CLM-001", vendor: "Vendor A", amount: "$12,450", date: "2024-01-15", status: "active" as const, type: "Standard" },
  { id: "CLM-002", vendor: "Vendor B", amount: "$8,920", date: "2024-01-14", status: "pending" as const, type: "Urgent" },
  { id: "CLM-003", vendor: "Vendor A", amount: "$15,780", date: "2024-01-14", status: "error" as const, type: "Duplicate" },
  { id: "CLM-004", vendor: "Vendor C", amount: "$6,340", date: "2024-01-13", status: "active" as const, type: "Standard" },
  { id: "CLM-005", vendor: "Vendor D", amount: "$9,120", date: "2024-01-12", status: "active" as const, type: "Standard" },
  { id: "CLM-006", vendor: "Vendor B", amount: "$11,560", date: "2024-01-12", status: "warning" as const, type: "Review" },
  { id: "CLM-007", vendor: "Vendor E", amount: "$7,890", date: "2024-01-11", status: "active" as const, type: "Standard" },
  { id: "CLM-008", vendor: "Vendor A", amount: "$14,230", date: "2024-01-10", status: "error" as const, type: "Duplicate" },
];

const vendorsData = [
  { id: "VND-001", name: "Vendor A", claims: 450, rating: 3.2, region: "North America", status: "warning" as const },
  { id: "VND-002", name: "Vendor B", claims: 380, rating: 4.1, region: "Europe", status: "active" as const },
  { id: "VND-003", name: "Vendor C", claims: 290, rating: 4.5, region: "Asia Pacific", status: "active" as const },
  { id: "VND-004", name: "Vendor D", claims: 210, rating: 4.7, region: "North America", status: "active" as const },
  { id: "VND-005", name: "Vendor E", claims: 180, rating: 4.8, region: "Europe", status: "active" as const },
];

const transactionsData = [
  { id: "TXN-001", claim: "CLM-001", action: "Created", user: "System", timestamp: "2024-01-15 09:30:00" },
  { id: "TXN-002", claim: "CLM-001", action: "Validated", user: "AI Agent", timestamp: "2024-01-15 09:30:05" },
  { id: "TXN-003", claim: "CLM-001", action: "Approved", user: "Admin", timestamp: "2024-01-15 10:15:00" },
  { id: "TXN-004", claim: "CLM-002", action: "Created", user: "System", timestamp: "2024-01-14 14:20:00" },
  { id: "TXN-005", claim: "CLM-002", action: "Pending Review", user: "AI Agent", timestamp: "2024-01-14 14:20:10" },
];

const claimsColumns = [
  { key: "id" as const, label: "Claim ID" },
  { key: "vendor" as const, label: "Vendor" },
  { key: "amount" as const, label: "Amount" },
  { key: "date" as const, label: "Date" },
  { key: "type" as const, label: "Type" },
  { 
    key: "status" as const, 
    label: "Status",
    render: (value: "active" | "warning" | "error" | "pending") => {
      const labels = { active: "Processed", warning: "Review", error: "Duplicate", pending: "Pending" };
      return <StatusBadge status={value} label={labels[value]} />;
    }
  },
];

const vendorColumns = [
  { key: "id" as const, label: "ID" },
  { key: "name" as const, label: "Vendor Name" },
  { key: "claims" as const, label: "Total Claims" },
  { key: "rating" as const, label: "Rating", render: (value: number) => `${value.toFixed(1)} ⭐` },
  { key: "region" as const, label: "Region" },
  { 
    key: "status" as const, 
    label: "Health",
    render: (value: "active" | "warning") => {
      const labels = { active: "Healthy", warning: "Review Needed" };
      return <StatusBadge status={value} label={labels[value]} />;
    }
  },
];

const transactionColumns = [
  { key: "id" as const, label: "Transaction ID" },
  { key: "claim" as const, label: "Claim" },
  { key: "action" as const, label: "Action" },
  { key: "user" as const, label: "User" },
  { key: "timestamp" as const, label: "Timestamp" },
];

const DataExplorerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout title="Data Explorer" subtitle="Browse and query your data">
      {/* Search and Actions */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search across all tables..."
            className="pl-10 bg-muted/30 border-border/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="gap-2">
            <Code className="w-4 h-4" />
            SQL Query
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Database Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">Tables</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Table className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">8,945</p>
              <p className="text-xs text-muted-foreground">Total Records</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Eye className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">24.5K</p>
              <p className="text-xs text-muted-foreground">Queries Today</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <RefreshCw className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">2.3s</p>
              <p className="text-xs text-muted-foreground">Avg Response</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Data Tables Tabs */}
      <Tabs defaultValue="claims" className="space-y-4">
        <TabsList className="bg-muted/30">
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="claims">
          <DataTable
            data={claimsData}
            columns={claimsColumns}
            title="Claims Table"
            subtitle={`Showing ${claimsData.length} records`}
          />
        </TabsContent>

        <TabsContent value="vendors">
          <DataTable
            data={vendorsData}
            columns={vendorColumns}
            title="Vendors Table"
            subtitle={`Showing ${vendorsData.length} records`}
          />
        </TabsContent>

        <TabsContent value="transactions">
          <DataTable
            data={transactionsData}
            columns={transactionColumns}
            title="Transaction Log"
            subtitle={`Showing ${transactionsData.length} records`}
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default DataExplorerPage;
