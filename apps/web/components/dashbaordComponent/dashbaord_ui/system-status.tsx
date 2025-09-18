"use client";

import { CustomCard } from "@/components/ui/custom-card";

interface SystemService {
  name: string;
  status: "operational" | "degraded" | "outage";
}

export function SystemStatus() {
  const services: SystemService[] = [
    { name: "Monitoring", status: "operational" },
    { name: "API Services", status: "operational" },
    { name: "Notifications", status: "degraded" },
    { name: "Dashboard", status: "operational" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500 text-green-500";
      case "degraded":
        return "bg-yellow-500 text-yellow-500";
      case "outage":
        return "bg-red-500 text-red-500";
      default:
        return "bg-gray-500 text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "Operational";
      case "degraded":
        return "Degraded";
      case "outage":
        return "Outage";
      default:
        return "Unknown";
    }
  };

  return (
    <CustomCard className="bg-[#0c0c0c] border-gray-800">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full ${getStatusColor(service.status).split(" ")[0]}`}
                />
                <span className="text-white text-sm">{service.name}</span>
              </div>
              <span
                className={`text-xs ${getStatusColor(service.status).split(" ")[1]}`}
              >
                {getStatusText(service.status)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </CustomCard>
  );
}
