import { Card } from "@/components/ui/card";
import { StatusIndicator } from "./dashbaord-status-indicator";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Zap } from "lucide-react";

interface MonitorCardProps {
  name: string;
  url: string;
  status: "healthy" | "warning" | "critical" | "maintenance";
  uptime: number;
  responseTime: number;
  lastChecked: string;
  onClick?: () => void;
}

export function MonitorCard({
  name,
  url, 
  status,
  uptime,
  responseTime,
  lastChecked,
  onClick
}: MonitorCardProps) {
  const getPerformanceColor = (time: number) => {
    if (time < 200) return "text-performance-excellent";
    if (time < 500) return "text-performance-good"; 
    if (time < 1000) return "text-performance-fair";
    return "text-performance-poor";
  };

  return (
    <Card 
      className="p-6 hover:bg-white/5 transition-colors cursor-pointer border border-border/50 bg-[#0c0c0c]"
      onClick={onClick}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-[#fff]">{name}</h3>
            <p className="text-sm text-[#fff]">{url}</p>
          </div>
          <StatusIndicator status={status} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs">Uptime</span>
            </div>
            <div className="text-lg font-semibold text-muted-foreground">
              {uptime.toFixed(2)}%
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Zap className="w-3 h-3" />
              <span className="text-xs">Response</span>
            </div>
            <div className={`text-lg font-semibold text-muted-foreground ${getPerformanceColor(responseTime)}`}>
              {responseTime}ms
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span className="text-xs">Checked</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {lastChecked}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs text-muted-foreground ">
            {status === "healthy" ? "99.9%" : status === "warning" ? "95%+" : "< 95%"} SLA
          </Badge>
        </div>
      </div>
    </Card>
  );
}