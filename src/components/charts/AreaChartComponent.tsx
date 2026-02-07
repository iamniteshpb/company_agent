import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

interface AreaChartComponentProps {
  data: { name: string; value: number; value2?: number }[];
  title: string;
  subtitle?: string;
  showSecondary?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong rounded-lg px-4 py-3 border border-border/50">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function AreaChartComponent({ data, title, subtitle, showSecondary = false }: AreaChartComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="chart-container"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(185, 85%, 50%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(185, 85%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAccent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(270, 75%, 60%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(270, 75%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              name="Primary"
              stroke="hsl(185, 85%, 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrimary)"
            />
            {showSecondary && (
              <Area
                type="monotone"
                dataKey="value2"
                name="Secondary"
                stroke="hsl(270, 75%, 60%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAccent)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
