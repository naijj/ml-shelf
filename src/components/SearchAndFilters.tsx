import React from 'react';
import { Search, Filter, SortDesc } from 'lucide-react';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFramework: string;
  onFrameworkChange: (framework: string) => void;
  sortBy: 'latest' | 'downloads';
  onSortChange: (sort: 'latest' | 'downloads') => void;
}

const FRAMEWORKS = [
  { value: '', label: 'All Frameworks' },
  { value: 'TensorFlow', label: 'TensorFlow' },
  { value: 'PyTorch', label: 'PyTorch' },
  { value: 'ONNX', label: 'ONNX' },
  { value: 'TensorFlow Lite', label: 'TensorFlow Lite' },
  { value: 'Core ML', label: 'Core ML' },
  { value: 'Other', label: 'Other' }
];

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedFramework,
  onFrameworkChange,
  sortBy,
  onSortChange
}: SearchAndFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search models by name or tags..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Framework Filter */}
        <div className="lg:w-64">
          <div className="relative">
            <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              value={selectedFramework}
              onChange={(e) => onFrameworkChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
            >
              {FRAMEWORKS.map(framework => (
                <option key={framework.value} value={framework.value}>
                  {framework.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className="lg:w-48">
          <div className="relative">
            <SortDesc className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'latest' | 'downloads')}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
            >
              <option value="latest">Latest First</option>
              <option value="downloads">Most Downloaded</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}