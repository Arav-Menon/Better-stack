"use client"

import { Search, Filter } from "lucide-react"

interface SearchFilterProps {
  searchTerm: string
  filterCategory: string
  onSearchChange: (value: string) => void
  onFilterChange: (value: string) => void
}

export function SearchFilter({ searchTerm, filterCategory, onSearchChange, onFilterChange }: SearchFilterProps) {
  const categories = ["Production", "API", "Content", "Development", "Testing"]

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search websites..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-[#0c0c0c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <select
          value={filterCategory}
          onChange={(e) => onFilterChange(e.target.value)}
          className="pl-10 pr-8 py-2 bg-[#0c0c0c] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
