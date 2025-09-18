"use client";

import {
  Edit,
  Trash2,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import { CustomCard } from "@/components/ui/custom-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Website {
  id: string;
  name: string;
  url: string;
  status: "online" | "offline" | "warning";
  responseTime: number;
  uptime: number;
  lastChecked: string;
  category: string;
  description: string;
  checkInterval: number;
}

interface WebsiteCardProps {
  website: Website;
  onEdit?: (website: Website) => void;
  onDelete: (id: string) => void;
}

export function WebsiteCard({ website, onEdit, onDelete }: WebsiteCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "offline":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-500 bg-green-500/10";
      case "warning":
        return "text-yellow-500 bg-yellow-500/10";
      case "offline":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Production":
        return "text-blue-500 bg-blue-500/10";
      case "API":
        return "text-purple-500 bg-purple-500/10";
      case "Content":
        return "text-green-500 bg-green-500/10";
      case "Development":
        return "text-orange-500 bg-orange-500/10";
      case "Testing":
        return "text-yellow-500 bg-yellow-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  return (
    <CustomCard className="bg-[#0c0c0c] border-gray-800 hover:border-gray-700 transition-colors">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">
              {website.name}
            </h3>
            <p className="text-gray-400 text-sm mb-2">{website.description}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <ExternalLink className="w-3 h-3" />
              <span className="truncate">{website.url}</span>
            </div>
          </div>
          <div
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(website.status)}`}
          >
            {getStatusIcon(website.status)}
            <span className="ml-1 capitalize">{website.status}</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Response Time</span>
            <span className="text-white text-sm">
              {website.responseTime > 0 ? `${website.responseTime}ms` : "-"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Uptime</span>
            <span className="text-white text-sm">{website.uptime}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Check Interval</span>
            <span className="text-white text-sm">{website.checkInterval}s</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(website.category)}`}
          >
            {website.category}
          </div>
          <span className="text-gray-500 text-xs">
            Last checked: {website.lastChecked}
          </span>
        </div>

        <div className="flex space-x-2">
          <Link href={`/dashboard/monitoring/${website.id}`} className="flex-1">
            <Button
              variant="ghost"
              className="w-full border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </Link>
          <Button
            // onClick={() => onEdit(website)}
            variant="ghost"
            className="border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => onDelete(website.id)}
            variant="ghost"
            className="border-red-700 text-white hover:bg-red-400 hover:text-white"
          >
            <Trash2 className="w-4 h-4 " />
          </Button>
        </div>
      </div>
    </CustomCard>
  );
}
