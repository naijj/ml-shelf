import React from 'react';
import { ModelGrid } from './ModelGrid';
import { ModelDetailModal } from './ModelDetailModal';
import { useModels } from '../hooks/useModels';
import { useUsers } from '../hooks/useUsers';
import { Database as DB } from '../lib/supabase';

type Model = DB['public']['Tables']['models']['Row'];

export function ExplorePage() {
  const [selectedModel, setSelectedModel] = React.useState<Model | null>(null);
  const [showModelDetail, setShowModelDetail] = React.useState(false);
  const { downloadModel } = useModels();
  const { userProfiles } = useUsers();

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
        uploaderEmail={selectedModel?.uploaded_by ? userProfiles[selectedModel.uploaded_by]?.email : undefined}
      />
    </div>
  );
}