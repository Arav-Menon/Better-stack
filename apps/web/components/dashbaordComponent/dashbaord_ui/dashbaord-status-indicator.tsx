import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "healthy" | "warning" | "critical" | "maintenance";
  className?: string;
}

const statusConfig = {
  healthy: {
    bg: "bg-status-healthy",
    text: "text-status-healthy",
    label: "Operational"
  },
  warning: {
    bg: "bg-status-warning", 
    text: "text-status-warning",
    label: "Degraded Performance"
  },
  critical: {
    bg: "bg-status-critical",
    text: "text-status-critical", 
    label: "Major Outage"
  },
  maintenance: {
    bg: "bg-status-maintenance",
    text: "text-status-maintenance",
    label: "Under Maintenance"
  }
};

export function StatusIndicator({ status, className }: StatusIndicatorProps) {
  const config = statusConfig[status];
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("w-2 h-2 rounded-full", config.bg)} />
      <span className={cn("text-sm font-medium", config.text)}>
        {config.label}
      </span>
    </div>
  );
}