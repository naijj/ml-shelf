import React from 'react';
import { motion } from 'framer-motion';
import { ModelGrid } from './ModelGrid';
import { ModelDetailModal } from './ModelDetailModal';
import { useModels } from '../hooks/useModels';
import { useUsers } from '../hooks/useUsers';
import { Database as DB } from '../lib/supabase';
import GradientBlinds from './GradientBlinds';

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
    <div className="min-h-screen bg-gray-50 relative">
      {/* Hero Section with Gradient Blinds */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 overflow-hidden"
      >
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <GradientBlinds
            gradientColors={['#667eea', '#764ba2', '#f093fb']}
            angle={135}
            noise={0.2}
            blindCount={10}
            blindMinWidth={80}
            spotlightRadius={0.4}
            spotlightSoftness={0.8}
            spotlightOpacity={0.6}
            mouseDampening={0.2}
            distortAmount={0}
            shineDirection="right"
            mixBlendMode="multiply"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold text-white mb-6"
          >
            Explore ML Models
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Discover tiny machine learning models optimized for edge computing and mobile devices
          </motion.p>
        </div>
      </motion.section>

      <div className="pt-8 relative z-10">
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