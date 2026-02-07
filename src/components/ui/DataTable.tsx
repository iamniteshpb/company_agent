import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { cn } from "@/lib/utils";

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    render?: (value: any, row: T) => React.ReactNode;
  }[];
  title?: string;
  subtitle?: string;
}

export function DataTable<T extends Record<string, any>>({ data, columns, title, subtitle }: DataTableProps<T>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="data-table"
    >
      {(title || subtitle) && (
        <div className="p-6 border-b border-border/50">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent">
            {columns.map((column) => (
              <TableHead key={String(column.key)} className="text-muted-foreground">
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex} 
              className="border-border/50 hover:bg-muted/10 transition-colors"
            >
              {columns.map((column) => (
                <TableCell key={String(column.key)} className="py-4">
                  {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}

// Status Badge Component
interface StatusBadgeProps {
  status: "active" | "warning" | "error" | "pending";
  label: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusClasses = {
    active: "bg-success/10 text-success border-success/30",
    warning: "bg-warning/10 text-warning border-warning/30",
    error: "bg-destructive/10 text-destructive border-destructive/30",
    pending: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
      statusClasses[status]
    )}>
      <span className={cn("w-1.5 h-1.5 rounded-full", {
        "bg-success": status === "active",
        "bg-warning": status === "warning",
        "bg-destructive": status === "error",
        "bg-muted-foreground": status === "pending",
      })} />
      {label}
    </span>
  );
}
