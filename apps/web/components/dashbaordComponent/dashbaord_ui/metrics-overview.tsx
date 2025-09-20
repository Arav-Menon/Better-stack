import { Card } from "@/components/ui/card";
import { Activity, Globe, Clock, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "stable";
}

function MetricCard({ title, value, subtitle, icon, trend }: MetricCardProps) {
  const trendColors = {
    up: "text-performance-excellent",
    down: "text-status-critical",
    stable: "text-muted-foreground",
  };

  return (
    <Card className="p-6 bg-[#0c0c0c] border-border/50">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-medium text-[#fff]">{title}</span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-[#fff]">{value}</div>
            <div className="text-white">{subtitle}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function MetricsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Overall Status"
        value="98.9%"
        subtitle="All systems operational"
        icon={<Activity className="w-4 h-4 text-status-healthy" />}
        trend="up"
      />
      <MetricCard
        title="Monitored Sites"
        value="24"
        subtitle="Active monitoring"
        icon={<Globe className="w-4 h-4 text-primary" />}
        trend="stable"
      />
      <MetricCard
        title="Avg Response"
        value="247ms"
        subtitle="Last 24h average"
        icon={<Clock className="w-4 h-4 text-performance-good" />}
        trend="up"
      />
      <MetricCard
        title="Incidents"
        value="2"
        subtitle="Resolved this week"
        icon={<TrendingUp className="w-4 h-4 text-status-warning" />}
        trend="down"
      />
    </div>
  );
}
