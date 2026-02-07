import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { motion } from "framer-motion";

interface BarChartComponentProps {
  data: { name: string; value: number }[];
  title: string;
  subtitle?: string;
  colorful?: boolean;
}

const COLORS = [
  "hsl(185, 85%, 50%)",
  "hsl(270, 75%, 60%)",
  "hsl(160, 84%, 39%)",
  "hsl(38, 92%, 50%)",
  "hsl(340, 75%, 55%)",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong rounded-lg px-4 py-3 border border-border/50">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-sm font-semibold text-foreground">
          Value: {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function BarChartComponent({ data, title, subtitle, colorful = false }: BarChartComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="chart-container"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(222, 30%, 18%, 0.3)' }} />
            <Bar 
              dataKey="value" 
              radius={[6, 6, 0, 0]}
              maxBarSize={50}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colorful ? COLORS[index % COLORS.length] : "hsl(185, 85%, 50%)"} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
