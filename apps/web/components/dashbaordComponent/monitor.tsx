"use client"
import { useState } from "react";
import { MetricsOverview } from "./dashbaord_ui/metrics-overview";
import { MonitorCard } from "./dashbaord_ui/monitor-card";
import { StatusIndicator } from "./dashbaord_ui/dashbaord-status-indicator";
import { ResponseTimeChart } from "./dashbaord_ui/response-time-chart";
import { UptimeChart } from "./dashbaord_ui/uptime-chart";
// import { StatusDistributionChart } from "./dashbaord_ui/status-distribution-chart";
import { PerformanceOverviewChart } from "./dashbaord_ui/performance-over-view-chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";

// Mock data for charts
const responseTimeData = [
  { time: "00:00", response: 234 },
  { time: "04:00", response: 189 },
  { time: "08:00", response: 267 },
  { time: "12:00", response: 298 },
  { time: "16:00", response: 156 },
  { time: "20:00", response: 445 },
  { time: "24:00", response: 234 },
];

const uptimeData = [
  { time: "Mon", uptime: 99.97 },
  { time: "Tue", uptime: 99.89 },
  { time: "Wed", uptime: 97.23 },
  { time: "Thu", uptime: 99.99 },
  { time: "Fri", uptime: 98.45 },
  { time: "Sat", uptime: 99.78 },
  { time: "Sun", uptime: 99.65 },
];

const statusDistribution = [
  { name: "Healthy", value: 18, status: "healthy" as const },
  { name: "Warning", value: 4, status: "warning" as const },
  { name: "Critical", value: 1, status: "critical" as const },
  { name: "Maintenance", value: 1, status: "maintenance" as const },
];

// Mock data for demonstration
const monitoredSites = [
  {
    id: "1",
    name: "Main Website",
    url: "https://example.com",
    status: "healthy" as const,
    uptime: 99.97,
    responseTime: 234,
    lastChecked: "2 min ago",
  },
  {
    id: "2",
    name: "API Gateway",
    url: "https://api.example.com",
    status: "healthy" as const,
    uptime: 99.89,
    responseTime: 156,
    lastChecked: "1 min ago",
  },
  {
    id: "3",
    name: "CDN Europe",
    url: "https://eu-cdn.example.com",
    status: "warning" as const,
    uptime: 97.23,
    responseTime: 789,
    lastChecked: "30 sec ago",
  },
  {
    id: "4",
    name: "Database Cluster",
    url: "db-cluster.example.com",
    status: "healthy" as const,
    uptime: 99.99,
    responseTime: 89,
    lastChecked: "1 min ago",
  },
  {
    id: "5",
    name: "Payment Gateway",
    url: "https://payments.example.com",
    status: "critical" as const,
    uptime: 87.45,
    responseTime: 2340,
    lastChecked: "5 min ago",
  },
  {
    id: "6",
    name: "File Storage",
    url: "https://storage.example.com",
    status: "maintenance" as const,
    uptime: 99.12,
    responseTime: 445,
    lastChecked: "3 min ago",
  },
];

export default function MonitorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState<string | null>(null);

  const filteredSites = monitoredSites.filter(
    (site) =>
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const overallStatus = monitoredSites.every(
    (site) => site.status === "healthy"
  )
    ? "healthy"
    : monitoredSites.some((site) => site.status === "critical")
      ? "critical"
      : "warning";

  const performanceData = filteredSites.map((site) => ({
    name: site.name.split(" ")[0], // Shortened names for chart
    responseTime: site.responseTime,
    uptime: site.uptime,
  }));

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-[#fff]">
                System Status
              </h1>
              <div className="flex items-center gap-4">
                <StatusIndicator status={overallStatus} />
                <span className="text-sm text-muted-foreground">
                  Last updated 1 minute ago
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" size="sm" className="bg-white/5" >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="ghost" className="bg-white/5" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Monitor
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search monitors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Metrics Overview */}
        <MetricsOverview />

        {/* Charts Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Performance Analytics
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponseTimeChart
              data={responseTimeData}
              title="Response Time Trend (24h)"
            />
            <UptimeChart data={uptimeData} title="Weekly Uptime" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* <StatusDistributionChart data={statusDistribution} /> */}
            {/* <PerformanceOverviewChart
              data={performanceData}
              title="Services Performance"
            /> */}
          </div>
        </div>

        {/* Monitors Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Monitored Services ({filteredSites.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSites.map((site) => (
              <MonitorCard
                key={site.id}
                name={site.name}
                url={site.url}
                status={site.status}
                uptime={site.uptime}
                responseTime={site.responseTime}
                lastChecked={site.lastChecked}
                onClick={() => (window.location.href = `/monitor/${site.id}`)}
              />
            ))}
          </div>

          {filteredSites.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No monitors match your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
