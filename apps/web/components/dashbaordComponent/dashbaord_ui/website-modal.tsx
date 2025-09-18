"use client"

import { Button } from "@/components/ui/button"
import type React from "react"

interface Website {
  id: string
  name: string
  url: string
  category: string
  description: string
  checkInterval: number
}

interface WebsiteModalProps {
  isOpen: boolean
  editingWebsite: Website | null
  formData: {
    name: string
    url: string
    category: string
    description: string
    checkInterval: number
  }
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
  onFormDataChange: (data: any) => void
}

export function WebsiteModal({
  isOpen,
  editingWebsite,
  formData,
  onSubmit,
  onClose,
  onFormDataChange,
}: WebsiteModalProps) {
  const categories = ["Production", "API", "Content", "Development", "Testing"]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0c0c0c] rounded-lg p-6 w-full max-w-md border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">{editingWebsite ? "Edit Website" : "Add New Website"}</h3>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Website Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="My Website"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Website URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => onFormDataChange({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of this website"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => onFormDataChange({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1 bg-white text-black hover:bg-white/40">
              {editingWebsite ? "Update Website" : "Add Website"}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              className="flex-1 border-gray-700 text-white/5 hover:bg-white/10 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
