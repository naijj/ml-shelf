import React from 'react';
import { Brain, Download, Upload, Users, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

interface HeroSectionProps {
  onShowAuth: () => void;
  onExploreModels: () => void;
}

export function HeroSection({ onShowAuth, onExploreModels }: HeroSectionProps) {
  // React Spring animations
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 60 }
  });

  const slideIn = useSpring({
    from: { opacity: 0, transform: 'translateX(100px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    delay: 400,
    config: { tension: 200, friction: 50 }
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <animated.div style={fadeIn} className="text-center lg:text-left space-y-8">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/40"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Lightweight ML Models</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent">
                  Your Tiny
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ML Model Hub
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl"
              >
                Discover, share, and run ML models under 10MB — built for everyone.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 pt-8"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onShowAuth}
                className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Ripple Effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 1 }}
                  whileHover={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="relative flex items-center space-x-3">
                  <Upload className="w-6 h-6" />
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  backgroundColor: "rgba(255, 255, 255, 0.9)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onExploreModels}
                className="bg-white/70 backdrop-blur-sm text-gray-700 px-10 py-5 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 flex items-center justify-center space-x-3"
              >
                <Download className="w-6 h-6" />
                <span>Explore Models</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-8 pt-12"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">≤10MB</div>
                <div className="text-sm text-gray-500 font-medium">Max Size</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">Free</div>
                <div className="text-sm text-gray-500 font-medium">Always</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">Instant</div>
                <div className="text-sm text-gray-500 font-medium">Downloads</div>
              </div>
            </motion.div>
          </animated.div>

          {/* Right Illustration */}
          <animated.div style={slideIn} className="relative">
            <div className="relative">
              {/* Main Floating Card */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateY: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50"
              >
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center space-x-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center"
                    >
                      <Brain className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-gray-800">TinyBERT-Sentiment</h3>
                      <p className="text-sm text-gray-500">2.3 MB • PyTorch</p>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Accuracy</span>
                        <span>94.2%</span>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "94%" }}
                        transition={{ duration: 2, delay: 1 }}
                        className="h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Speed</span>
                        <span>87.5%</span>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "87%" }}
                        transition={{ duration: 2, delay: 1.2 }}
                        className="h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Download Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Model</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, 10, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/60"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-700">Live</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  x: [0, -10, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/60"
              >
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-700">1.2k users</span>
                </div>
              </motion.div>
            </div>
          </animated.div>
        </div>
      </div>
    </div>
  );
}