"use client";

import { useEffect, useState } from "react";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { CustomCard } from "@/components/ui/custom-card";

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "outage" | "maintenance";
  uptime: string;
  responseTime: string;
}

export function StatusDashboard() {
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: "Website",
      status: "operational",
      uptime: "99.99%",
      responseTime: "245ms",
    },
    {
      name: "API",
      status: "operational",
      uptime: "99.98%",
      responseTime: "89ms",
    },
    {
      name: "Database",
      status: "operational",
      uptime: "100%",
      responseTime: "12ms",
    },
    {
      name: "CDN",
      status: "degraded",
      uptime: "99.95%",
      responseTime: "456ms",
    },
  ]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-[#121313]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#fff] mb-4">
              Real-Time Status Dashboard
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Monitor all your services at a glance. Get instant visibility into
              performance metrics and uptime statistics.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <CustomCard className="p-6">
              <div className="grid gap-4">
                {services.map((service, index) => (
                  <div
                    key={service.name}
                    className={`flex items-center justify-between p-4 rounded-lg border border-border bg-[#0c0c0c] hover:bg-muted/10 transition-all duration-300 ${isVisible ? "animate-fade-in" : ""}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <StatusIndicator status={service.status} />
                      <div>
                        <h3 className="font-semibold text-[#fff]">
                          {service.name}
                        </h3>
                        <p className="text-sm text-[#fff]">
                          {service.status === "operational"
                            ? "All systems operational"
                            : service.status === "degraded"
                              ? "Performance issues detected"
                              : service.status === "outage"
                                ? "Service unavailable"
                                : "Scheduled maintenance"}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-8 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-[#fff]">
                          {service.uptime}
                        </div>
                        <div className="text-muted-foreground">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-[#fff]">
                          {service.responseTime}
                        </div>
                        <div className="text-muted-foreground">Response</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    Last updated: 2 seconds ago
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse-green"></div>
                    <span className="text-muted-foreground">
                      Live monitoring active
                    </span>
                  </div>
                </div>
              </div>
            </CustomCard>
          </div>
        </div>
      </div>
    </section>
  );
}
