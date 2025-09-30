import React from 'react';
import { motion } from 'framer-motion';
import { Download, Star, Brain, TrendingUp, Award, Zap } from 'lucide-react';
import { useModels } from '../hooks/useModels';

export function TopModelsSection() {
  const { models, loading, downloadModel } = useModels();

  // Get top 6 models by downloads
  const topModels = React.useMemo(() => {
    return [...models]
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 6);
  }, [models]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading top models...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full blur-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20 mb-6"
          >
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-purple-600 font-semibold">Most Popular</span>
            <Award className="w-5 h-5 text-yellow-500" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Top Downloaded
            </span>
            <br />
            ML Models
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most popular tiny ML models trusted by developers worldwide
          </p>
        </motion.div>

        {topModels.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <Brain className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Models Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Be the first to upload and share your tiny ML models with the community!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  rotateY: 5
                }}
                className="group relative"
              >
                {/* Rank Badge */}
                {index < 3 && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    className="absolute -top-3 -left-3 z-10"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                      index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                      'bg-gradient-to-br from-orange-400 to-orange-600'
                    }`}>
                      {index + 1}
                    </div>
                  </motion.div>
                )}

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 h-full relative overflow-hidden">
                  {/* Animated Background Gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                          {model.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-3">
                          {model.framework && (
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getFrameworkColor(model.framework)}`}>
                              {model.framework}
                            </span>
                          )}
                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                            {formatSize(model.size_bytes)}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
                      >
                        <Brain className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>

                    {model.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {model.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-purple-600">
                          <Download className="w-4 h-4" />
                          <span className="text-sm font-semibold">
                            {model.downloads.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-semibold">
                            {(4.5 + Math.random() * 0.5).toFixed(1)}
                          </span>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => downloadModel(model)}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2 text-sm font-medium"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Get</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/80 backdrop-blur-sm text-purple-600 px-8 py-4 rounded-xl hover:bg-white transition-all duration-300 font-semibold shadow-lg hover:shadow-xl border border-white/20"
          >
            View All Models →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}