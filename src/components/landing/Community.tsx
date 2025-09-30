import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Heart, Download, Star, Users, TrendingUp } from 'lucide-react';
import { useModels } from '../../hooks/useModels';

export function Community() {
  const { models, loading } = useModels();

  // Get top 6 models by downloads
  const topModels = React.useMemo(() => {
    return [...models]
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 6);
  }, [models]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <section className="py-32 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-32 left-32 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/40 mb-8"
          >
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <span className="text-purple-600 font-semibold">Community Favorites</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
            Most
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> Popular Models</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Discover the tiny ML models that developers love and trust worldwide.
          </p>
        </motion.div>

        {/* Models Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading community models...</p>
          </div>
        ) : topModels.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <Users className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Community Growing</h3>
            <p className="text-gray-600 max-w-md mx-auto text-lg">
              Be among the first to share your tiny ML models with the world!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topModels.map((model, index) => (
              <ModelCard key={model.id} model={model} index={index} />
            ))}
          </div>
        )}

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
            <div className="text-4xl font-bold text-blue-500 mb-2">{models.length}</div>
            <div className="text-gray-600 font-medium">Models Shared</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
            <div className="text-4xl font-bold text-purple-500 mb-2">
              {models.reduce((sum, model) => sum + model.downloads, 0).toLocaleString()}
            </div>
            <div className="text-gray-600 font-medium">Total Downloads</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
            <div className="text-4xl font-bold text-green-500 mb-2">100%</div>
            <div className="text-gray-600 font-medium">Free & Open</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ModelCard({ model, index }: { model: any; index: number }) {
  const [isHovered, setIsHovered] = React.useState(false);

  const cardAnimation = useSpring({
    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0px) scale(1)',
    boxShadow: isHovered 
      ? '0 25px 50px rgba(0, 0, 0, 0.15)' 
      : '0 10px 30px rgba(0, 0, 0, 0.08)',
    config: { tension: 300, friction: 30 }
  });

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <animated.div
        style={cardAnimation}
        className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 h-full cursor-pointer relative overflow-hidden"
      >
        {/* Rank Badge */}
        {index < 3 && (
          <div className="absolute -top-2 -right-2 z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${
              index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
              index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
              'bg-gradient-to-br from-orange-400 to-orange-600'
            }`}>
              {index + 1}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                {model.name}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                  {formatSize(model.size_bytes)}
                </span>
                {model.framework && (
                  <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                    {model.framework}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {model.description && (
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {model.description}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-blue-600">
                <Download className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {model.downloads.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-red-500">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {Math.floor(Math.random() * 50) + 10}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">
                  {(4.2 + Math.random() * 0.8).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </motion.div>
  );
}