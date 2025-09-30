import React from 'react';
import { ModelGrid } from './ModelGrid';
import { ModelDetailModal } from './ModelDetailModal';
import { useModels } from '../hooks/useModels';
import { Database as DB } from '../lib/supabase';

type Model = DB['public']['Tables']['models']['Row'];

export function ExplorePage() {
  const [selectedModel, setSelectedModel] = React.useState<Model | null>(null);
  const [showModelDetail, setShowModelDetail] = React.useState(false);
  const { downloadModel } = useModels();

  const handleViewModelDetails = (model: Model) => {
    setSelectedModel(model);
    setShowModelDetail(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-8">
        <ModelGrid onViewModelDetails={handleViewModelDetails} />
      </div>

      <ModelDetailModal
        model={selectedModel}
        isOpen={showModelDetail}
        onClose={() => {
          setShowModelDetail(false);
          setSelectedModel(null);
        }}
        onDownload={downloadModel}
      />
    </div>
  );
}