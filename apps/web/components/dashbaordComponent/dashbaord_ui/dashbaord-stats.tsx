"use client";

import { Globe, Activity, TrendingUp, Shield } from "lucide-react";
import { CustomCard } from "@/components/ui/custom-card";

interface StatsProps {
  totalWebsites: number;
  totalChecks: number;
  averageUptime: number;
}

export function DashboardStats({
  totalWebsites,
  totalChecks,
  averageUptime,
}: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <CustomCard className="bg-[#0c0c0c] border-gray-800">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Websites</p>
              <p className="text-2xl font-bold text-white">{totalWebsites}</p>
            </div>
            <Globe className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </CustomCard>

      <CustomCard className="bg-[#0c0c0c] border-gray-800">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Checks</p>
              <p className="text-2xl font-bold text-white">
                {totalChecks.toLocaleString()}
              </p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </CustomCard>

      <CustomCard className="bg-[#0c0c0c] border-gray-800">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Average Uptime</p>
              <p className="text-2xl font-bold text-white">{averageUptime}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </CustomCard>

      <CustomCard className="bg-[#0c0c0c] border-gray-800">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Plan Status</p>
              <p className="text-lg font-bold text-green-500">Active</p>
            </div>
            <Shield className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </CustomCard>
    </div>
  );
}
