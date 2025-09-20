import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ResponseTimeChartProps {
  data: Array<{
    time: string;
    response: number;
    name?: string;
  }>;
  title?: string;
  height?: number;
}

export function ResponseTimeChart({ data, title = "Response Time", height = 300 }: ResponseTimeChartProps) {
  const getPerformanceColor = (value: number) => {
    if (value < 200) return "hsl(var(--performance-excellent))";
    if (value < 500) return "hsl(var(--performance-good))"; 
    if (value < 1000) return "hsl(var(--performance-fair))";
    return "hsl(var(--performance-poor))";
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="bg-[#0c0c0c] border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-[#fff]">{label}</p>
          <p className="font-semibold" style={{ color: getPerformanceColor(value) }}>
            Response: {value}ms
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-black">{title}</h3>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: 'Response Time (ms)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="response" 
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}