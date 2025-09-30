import React from 'react';
import { Database } from 'lucide-react';
import { ModelCard } from './ModelCard';
import { SearchAndFilters } from './SearchAndFilters';
import { useModels } from '../hooks/useModels';

interface ModelGridProps {
  onViewModelDetails?: (model: any) => void;
}

export function ModelGrid({ onViewModelDetails }: ModelGridProps) {
  const { models, loading, downloadModel } = useModels();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFramework, setSelectedFramework] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'latest' | 'downloads'>('latest');

  // Filter and sort models
  const filteredModels = React.useMemo(() => {
    let filtered = models.filter(model => {
      const matchesSearch = searchQuery === '' || 
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (model.tags && model.tags.some(tag => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ));
      
      const matchesFramework = selectedFramework === '' || 
        model.framework === selectedFramework;
      
      return matchesSearch && matchesFramework;
    });

    // Sort models
    filtered.sort((a, b) => {
      if (sortBy === 'downloads') {
        return b.downloads - a.downloads;
      } else {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return filtered;
  }, [models, searchQuery, selectedFramework, sortBy]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading models...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFramework={selectedFramework}
        onFrameworkChange={setSelectedFramework}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Available Models</h2>
          <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {filteredModels.length} {filteredModels.length === 1 ? 'model' : 'models'}
          </span>
        </div>
      </div>

      {filteredModels.length === 0 ? (
        <div className="text-center py-16">
          <Database className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            {models.length === 0 ? 'No models available yet' : 'No models match your filters'}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {models.length === 0 
              ? 'Be the first to contribute! Sign in and upload your tiny ML models to share with the community.'
              : 'Try adjusting your search or filter criteria to find more models.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredModels.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              onDownload={downloadModel}
              onViewDetails={onViewModelDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}