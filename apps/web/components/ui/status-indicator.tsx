"use client";

import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "operational" | "degraded" | "outage" | "maintenance";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function StatusIndicator({
  status,
  size = "md",
  showLabel = false,
  className,
}: StatusIndicatorProps) {
  const statusConfig = {
    operational: {
      color: "bg-[#077233]",
      label: "Operational",
      animation: "animate-pulse-green",
    },
    degraded: {
      color: "bg-yellow-500",
      label: "Degraded Performance",
      animation: "animate-pulse",
    },
    outage: {
      color: "bg-destructive",
      label: "Major Outage",
      animation: "animate-pulse",
    },
    maintenance: {
      color: "bg-blue-500",
      label: "Maintenance",
      animation: "animate-pulse",
    },
    server: {
      color: "bg-[#077233]",
      label: "server",
      animation: "animate-pulse",
    },
  };

  const sizeConfig = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const config = statusConfig[status];

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div
        className={cn(
          "rounded-full",
          config.color,
          config.animation,
          sizeConfig[size]
        )}
      />
      {showLabel && (
        <span className="text-sm text-muted-foreground">{config.label}</span>
      )}
    </div>
  );
}
