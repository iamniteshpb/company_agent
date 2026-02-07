import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

interface LineChartComponentProps {
  data: { name: string; value: number; value2?: number; value3?: number }[];
  title: string;
  subtitle?: string;
  showMultiple?: boolean;
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

export function LineChartComponent({ data, title, subtitle, showMultiple = false }: LineChartComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="chart-container"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            <Line
              type="monotone"
              dataKey="value"
              name="Claims"
              stroke="hsl(185, 85%, 50%)"
              strokeWidth={3}
              dot={{ fill: 'hsl(185, 85%, 50%)', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: 'hsl(185, 85%, 50%)' }}
            />
            {showMultiple && (
              <>
                <Line
                  type="monotone"
                  dataKey="value2"
                  name="Resolved"
                  stroke="hsl(160, 84%, 39%)"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(160, 84%, 39%)', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: 'hsl(160, 84%, 39%)' }}
                />
                <Line
                  type="monotone"
                  dataKey="value3"
                  name="Pending"
                  stroke="hsl(270, 75%, 60%)"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(270, 75%, 60%)', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: 'hsl(270, 75%, 60%)' }}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
