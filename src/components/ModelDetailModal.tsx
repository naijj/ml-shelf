import React from 'react';
import { X, Download, Calendar, User, Database, Tag, Code, FileText, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Database as DB } from '../lib/supabase';
import { LikeButton } from './LikeButton';

type Model = DB['public']['Tables']['models']['Row'];

interface ModelDetailModalProps {
  model: Model | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (model: Model) => void;
}

export function ModelDetailModal({ model, isOpen, onClose, onDownload }: ModelDetailModalProps) {
  const [activeTab, setActiveTab] = React.useState<'mac' | 'windows' | 'linux'>('mac');

  if (!isOpen || !model) return null;

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const isCodeBlock = (text: string) => {
    // Simple heuristic to detect code blocks
    return text.includes('import ') || 
           text.includes('from ') || 
           text.includes('def ') || 
           text.includes('function ') || 
           text.includes('const ') || 
           text.includes('let ') || 
           text.includes('var ') ||
           text.includes('```
  };

  const extractCodeFromMarkdown = (text: string) => {
    // Extract code from markdown code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```
    const matches = [...text.matchAll(codeBlockRegex)];
    
    if (matches.length > 0) {
      return {
        language: matches[1] || 'python',
        code: matches.trim()[2]
      };
    }
    
    return {
      language: 'python',
      code: text
    };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{model.name}</h2>
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Uploaded by User</span>
            </div>
            <div className="flex items-center space-x-4">
              {model.framework && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getFrameworkColor(model.framework)}`}>
                  {model.framework}
                </span>
              )}
              {model.format && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {model.format}
                </span>
              )}
              <span className="text-sm text-gray-600 font-medium">
                {formatSize(model.size_bytes)}
              </span>
              <LikeButton 
                modelId={model.id} 
                likesCount={model.likes_count || 0}
                showCount={true}
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6 space-y-6">
            {/* Description */}
            {model.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {model.description}
                </p>
              </div>
            )}

            {/* General Usage Instructions */}
            {model.usage_instructions && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-green-600" />
                  General Usage Instructions
                </h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  {isCodeBlock(model.usage_instructions) ? (
                    <SyntaxHighlighter
                      language={extractCodeFromMarkdown(model.usage_instructions).language}
                      style={tomorrow}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      {extractCodeFromMarkdown(model.usage_instructions).code}
                    </SyntaxHighlighter>
                  ) : (
                    <div className="p-4">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                        {model.usage_instructions}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* OS-Specific Usage Instructions */}
            {(model.mac_instructions || model.windows_instructions || model.linux_instructions) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Monitor className="w-5 h-5 mr-2 text-blue-600" />
                  OS-Specific Instructions
                </h3>
                
                {/* Tab Navigation */}
                <div className="flex space-x-1 mb-4 bg-gray-100 p-1 rounded-lg">
                  {model.mac_instructions && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('mac')}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        activeTab === 'mac'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <span>🍎</span>
                      <span>macOS</span>
                    </motion.button>
                  )}
                  {model.windows_instructions && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('windows')}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        activeTab === 'windows'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <span>🪟</span>
                      <span>Windows</span>
                    </motion.button>
                  )}
                  {model.linux_instructions && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('linux')}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        activeTab === 'linux'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <span>🐧</span>
                      <span>Linux</span>
                    </motion.button>
                  )}
                </div>

                {/* Tab Content */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-50 rounded-lg overflow-hidden"
                >
                  {activeTab === 'mac' && model.mac_instructions && (
                    <div>
                      {isCodeBlock(model.mac_instructions) ? (
                        <SyntaxHighlighter
                          language={extractCodeFromMarkdown(model.mac_instructions).language}
                          style={tomorrow}
                          customStyle={{
                            margin: 0,
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                        >
                          {extractCodeFromMarkdown(model.mac_instructions).code}
                        </SyntaxHighlighter>
                      ) : (
                        <div className="p-4">
                          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                            {model.mac_instructions}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'windows' && model.windows_instructions && (
                    <div>
                      {isCodeBlock(model.windows_instructions) ? (
                        <SyntaxHighlighter
                          language={extractCodeFromMarkdown(model.windows_instructions).language}
                          style={tomorrow}
                          customStyle={{
                            margin: 0,
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                        >
                          {extractCodeFromMarkdown(model.windows_instructions).code}
                        </SyntaxHighlighter>
                      ) : (
                        <div className="p-4">
                          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                            {model.windows_instructions}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'linux' && model.linux_instructions && (
                    <div>
                      {isCodeBlock(model.linux_instructions) ? (
                        <SyntaxHighlighter
                          language={extractCodeFromMarkdown(model.linux_instructions).language}
                          style={tomorrow}
                          customStyle={{
                            margin: 0,
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                        >
                          {extractCodeFromMarkdown(model.linux_instructions).code}
                        </SyntaxHighlighter>
                      ) : (
                        <div className="p-4">
                          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                            {model.linux_instructions}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            )}

            {/* Tags */}
            {model.tags && model.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-purple-600" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {model.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Model Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-indigo-600" />
                  Model Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium text-gray-900">{formatSize(model.size_bytes)}</span>
                  </div>
                  {model.framework && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Framework:</span>
                      <span className="font-medium text-gray-900">{model.framework}</span>
                    </div>
                  )}
                  {model.format && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Format:</span>
                      <span className="font-medium text-gray-900">{model.format}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Downloads:</span>
                    <span className="font-medium text-gray-900 flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {model.downloads.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-emerald-600" />
                  Upload Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uploaded by:</span>
                    <span className="font-medium text-gray-900">User</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Upload date:</span>
                    <span className="font-medium text-gray-900 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(model.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Ready to use this model in your project?
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDownload(model)}
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors flex items-center space-x-2 font-semibold shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>Download Model</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
