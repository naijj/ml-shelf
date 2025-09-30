import React from 'react';
import { Download, Tag, Calendar, User, Database, Eye, CircleUser as UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { LikeButton } from './LikeButton';
import { Database as DB } from '../lib/supabase';

type Model = DB['public']['Tables']['models']['Row'];

interface ModelCardProps {
  model: Model;
  onDownload: (model: Model) => void;
  onViewDetails?: (model: Model) => void;
  uploaderEmail?: string;
}

export function ModelCard({ model, onDownload, onViewDetails, uploaderEmail }: ModelCardProps) {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getUploaderName = () => {
    if (uploaderEmail) {
      return uploaderEmail.split('@')[0];
    }
    return 'Anonymous';
  };

  const getFrameworkColor = (framework: string | null) => {
    if (!framework) return 'bg-gray-100 text-gray-700';
    
    const colors: Record<string, string> = {
      'TensorFlow': 'bg-orange-100 text-orange-700',
      'PyTorch': 'bg-red-100 text-red-700',
      'ONNX': 'bg-blue-100 text-blue-700',
      'TensorFlow Lite': 'bg-green-100 text-green-700',
      'Core ML': 'bg-purple-100 text-purple-700',
      'Other': 'bg-gray-100 text-gray-700'
    };
    
    return colors[framework] || 'bg-gray-100 text-gray-700';
  };

  return (
    <motion.div
      whileHover={{ y: -4, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-3">
            {model.name}
          </h3>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{formatSize(model.size_bytes)}</div>
            {model.framework && (
              <div className={`text-xs font-medium mt-1 px-2 py-1 rounded-full ${getFrameworkColor(model.framework)}`}>
                {model.framework}
              </div>
            )}
          </div>
        </div>

        {model.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {model.description}
          </p>
        )}

        <div className="space-y-2 mb-4">
          {/* Uploader Info */}
          <div className="flex items-center text-sm text-gray-500">
            <UserCircle className="w-4 h-4 mr-2" />
            <span>by {getUploaderName()}</span>
          </div>
          
          {model.format && (
            <div className="flex items-center text-sm text-gray-500">
              <Database className="w-4 h-4 mr-2" />
              <span>{model.format}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(model.created_at)}</span>
          </div>
        </div>

        {model.tags && model.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {model.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
            {model.tags.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{model.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 space-x-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-sm text-gray-500">
            <Download className="w-4 h-4 mr-1" />
            <span>{model.downloads.toLocaleString()}</span>
            </div>
            <LikeButton 
              modelId={model.id} 
              showCount={true}
              size="sm"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            {onViewDetails && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewDetails(model)}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1 text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDownload(model)}
              className="bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-1 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              <span>Get</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}