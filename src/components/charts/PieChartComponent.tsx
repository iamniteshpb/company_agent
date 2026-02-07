import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

interface PieChartComponentProps {
  data: { name: string; value: number }[];
  title: string;
  subtitle?: string;
}

const COLORS = [
  "hsl(185, 85%, 50%)",
  "hsl(270, 75%, 60%)",
  "hsl(160, 84%, 39%)",
  "hsl(38, 92%, 50%)",
  "hsl(340, 75%, 55%)",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong rounded-lg px-4 py-3 border border-border/50">
        <p className="text-sm font-semibold" style={{ color: payload[0].payload.fill }}>
          {payload[0].name}
        </p>
        <p className="text-sm text-muted-foreground">
          {payload[0].value.toLocaleString()} ({(payload[0].percent * 100).toFixed(1)}%)
        </p>
      </div>
    );
  }
  return null;
};

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export function PieChartComponent({ data, title, subtitle }: PieChartComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="chart-container"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              stroke="transparent"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
