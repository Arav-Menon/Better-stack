"use client";

import { useState } from "react";
import { DashboardStats } from "./dashbaord_ui/dashbaord-stats";
import { QuickActions } from "./dashbaord_ui/quick-actions";
import { RecentActivity } from "./dashbaord_ui/recent-activity";
import { SystemStatus } from "./dashbaord_ui/system-status";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  plan: string;
  joinedDate: string;
  totalWebsites: number;
  totalChecks: number;
  averageUptime: number;
}

export default function Overview() {
  const [userProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/professional-avatar.png",
    plan: "Pro Plan",
    joinedDate: "January 2024",
    totalWebsites: 12,
    totalChecks: 45280,
    averageUptime: 99.2,
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: "alert",
      message: "API Server response time increased",
      time: "2 hours ago",
      severity: "warning" as const,
    },
    {
      id: 2,
      type: "success",
      message: "Blog website back online",
      time: "4 hours ago",
      severity: "success" as const,
    },
    {
      id: 3,
      type: "info",
      message: "New website added: E-commerce Store",
      time: "1 day ago",
      severity: "info" as const,
    },
    {
      id: 4,
      type: "alert",
      message: "Main Website experienced downtime",
      time: "2 days ago",
      severity: "error" as const,
    },
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-400">
          Monitor your websites and track performance metrics
        </p>
      </div>

      {/* Stats */}
      <DashboardStats
        totalWebsites={userProfile.totalWebsites}
        totalChecks={userProfile.totalChecks}
        averageUptime={userProfile.averageUptime}
      />

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <QuickActions />
        <RecentActivity activities={recentActivity} />
      </div>

      {/* System Status */}
      <SystemStatus />
    </div>
  );
}
