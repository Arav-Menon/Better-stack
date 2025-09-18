"use client";

import { CustomCard } from "@/components/ui/custom-card";
import { Button } from "@/components/ui/button";

interface Activity {
  id: number;
  type: string;
  message: string;
  time: string;
  severity: "success" | "warning" | "error" | "info";
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "bg-green-500/20";
      case "warning":
        return "bg-yellow-500/20";
      case "error":
        return "bg-red-500/20";
      default:
        return "bg-blue-500/20";
    }
  };

  return (
    <CustomCard className="lg:col-span-2 bg-[#0c0c0c] border-gray-800">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg bg-white/5"
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 ${getSeverityColor(activity.severity)}`}
              />
              <div className="flex-1">
                <p className="text-white text-sm">{activity.message}</p>
                <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-4 border-gray-700 text-gray-300 hover:bg-white hover:text-black"
        >
          View All Activity
        </Button>
      </div>
    </CustomCard>
  );
}
