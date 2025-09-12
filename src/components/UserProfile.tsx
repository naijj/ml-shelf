import React, { useState, useEffect } from 'react';
import { User, Database, Download, ArrowLeft, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useModels } from '../hooks/useModels';
import { ModelCard } from './ModelCard';
import { Database as DB } from '../lib/supabase';

type Model = DB['public']['Tables']['models']['Row'];

interface UserProfileProps {
  onBack: () => void;
}

export function UserProfile({ onBack }: UserProfileProps) {
  const [userModels, setUserModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalDownloads, setTotalDownloads] = useState(0);
  
  const { user } = useAuth();
  const { getUserModels, downloadModel } = useModels();

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    setLoading(true);
    
    const models = await getUserModels(user.id);
    setUserModels(models);
    
    // Calculate total downloads
    const total = models.reduce((sum, model) => sum + model.downloads, 0);
    setTotalDownloads(total);
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8"
        >
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user?.email?.split('@')[0] || 'User'}
              </h1>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              
              {/* Stats */}
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{userModels.length}</span> models uploaded
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{totalDownloads.toLocaleString()}</span> total downloads
                  </span>
                </div>
                {totalDownloads > 100 && (
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-yellow-700 font-medium">Popular Contributor</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Models */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          <div className="flex items-center space-x-3 mb-8">
            <Database className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Your Models</h2>
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {userModels.length}
            </span>
          </div>

          {userModels.length === 0 ? (
            <div className="text-center py-16">
              <Database className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No models uploaded yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start sharing your tiny ML models with the community. Upload your first model to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userModels.map((model) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <ModelCard
                    model={model}
                    onDownload={downloadModel}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}