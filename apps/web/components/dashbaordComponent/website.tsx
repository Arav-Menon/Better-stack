"use client";

import type React from "react";
import { useState } from "react";
import { Plus, Globe } from "lucide-react";
import { CustomCard } from "@/components/ui/custom-card";
import { Button } from "@/components/ui/button";
import { WebsiteCard } from "./dashbaord_ui/website-card";
import { WebsiteModal } from "./dashbaord_ui/website-modal";
import { SearchFilter } from "./dashbaord_ui/search-filter";
import Link from "next/link";

interface Website {
  id: string;
  name: string;
  url: string;
  status: "online" | "offline" | "warning";
  responseTime: number;
  uptime: number;
  lastChecked: string;
  createdAt: string;
  category: string;
  description: string;
  checkInterval: number;
}

export default function WebsitesPage() {
  const [websites, setWebsites] = useState<Website[]>([
    {
      id: "1",
      name: "Main Website",
      url: "https://example.com",
      status: "online",
      responseTime: 245,
      uptime: 99.9,
      lastChecked: "2 minutes ago",
      createdAt: "2024-01-15",
      category: "Production",
      description: "Primary company website",
      checkInterval: 60,
    },
    {
      id: "2",
      name: "API Server",
      url: "https://api.example.com",
      status: "warning",
      responseTime: 1200,
      uptime: 98.5,
      lastChecked: "1 minute ago",
      createdAt: "2024-01-10",
      category: "API",
      description: "Main API endpoint",
      checkInterval: 30,
    },
    {
      id: "3",
      name: "Blog",
      url: "https://blog.example.com",
      status: "offline",
      responseTime: 0,
      uptime: 95.2,
      lastChecked: "5 minutes ago",
      createdAt: "2024-01-08",
      category: "Content",
      description: "Company blog and articles",
      checkInterval: 300,
    },
    {
      id: "4",
      name: "E-commerce Store",
      url: "https://shop.example.com",
      status: "online",
      responseTime: 180,
      uptime: 99.8,
      lastChecked: "1 minute ago",
      createdAt: "2024-01-20",
      category: "Production",
      description: "Online store platform",
      checkInterval: 60,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    category: "Production",
    description: "",
    checkInterval: 60,
  });

  const filteredWebsites = websites.filter((website) => {
    const matchesSearch =
      website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      website.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || website.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingWebsite) {
      setWebsites((prev) =>
        prev.map((site) =>
          site.id === editingWebsite.id
            ? {
                ...site,
                name: formData.name,
                url: formData.url,
                category: formData.category,
                description: formData.description,
                checkInterval: formData.checkInterval,
              }
            : site
        )
      );
    } else {
      const newWebsite: Website = {
        id: Date.now().toString(),
        name: formData.name,
        url: formData.url,
        category: formData.category,
        description: formData.description,
        checkInterval: formData.checkInterval,
        status: "online",
        responseTime: Math.floor(Math.random() * 500) + 100,
        uptime: 100,
        lastChecked: "Just now",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setWebsites((prev) => [...prev, newWebsite]);
    }

    closeModal();
  };

  const handleEdit = (website: Website) => {
    setEditingWebsite(website);
    setFormData({
      name: website.name,
      url: website.url,
      category: website.category,
      description: website.description,
      checkInterval: website.checkInterval,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setWebsites((prev) => prev.filter((site) => site.id !== id));
  };

  const openModal = () => {
    setEditingWebsite(null);
    setFormData({
      name: "",
      url: "",
      category: "Production",
      description: "",
      checkInterval: 60,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingWebsite(null);
    setFormData({
      name: "",
      url: "",
      category: "Production",
      description: "",
      checkInterval: 60,
    });
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">add-website</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Website Management
          </h1>
          <p className="text-gray-400">Monitor and manage all your websites</p>
        </div>
        <Button onClick={openModal} className="bg-white text-black hover:bg-white/90 ">
          <Plus className="w-4 h-4 mr-2" />
          Add Website
        </Button>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        filterCategory={filterCategory}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilterCategory}
      />

      {/* Websites Grid */}
      {filteredWebsites.length === 0 ? (
        <CustomCard className="bg-white border-gray-800">
          <div className="p-12 text-center">
            <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No websites found
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || filterCategory !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first website"}
            </p>
            <Button
              onClick={openModal}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add Your First Website
            </Button>
          </div>
        </CustomCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredWebsites.map((website) => (
            <WebsiteCard
              key={website.id}
              website={website}
              //   onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <WebsiteModal
        isOpen={isModalOpen}
        editingWebsite={editingWebsite}
        formData={formData}
        onSubmit={handleSubmit}
        onClose={closeModal}
        onFormDataChange={setFormData}
      />
    </div>
  );
}
