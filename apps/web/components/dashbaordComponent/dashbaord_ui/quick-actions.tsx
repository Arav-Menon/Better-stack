"use client";

import { Globe, Activity, Bell } from "lucide-react";
import { CustomCard } from "@/components/ui/custom-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function QuickActions() {
  return (
    <CustomCard className="bg-[#0c0c0c] border-gray-800">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <Link href="/dashboard/websites">
            <Button className="w-full text-[#fff] hover:bg-white/5 justify-start">
              <Globe className="w-4 h-4 mr-2" />
              Add New Website
            </Button>
          </Link>
          <Link href="/dashboard/monitoring">
            <Button
              variant="ghost"
              className="w-full border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white justify-start"
            >
              <Activity className="w-4 h-4 mr-2" />
              View Monitoring
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white justify-start"
          >
            <Bell className="w-4 h-4 mr-2" />
            Configure Alerts
          </Button>
        </div>
      </div>
    </CustomCard>
  );
}
