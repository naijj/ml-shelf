import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Brain, Download, Upload, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  // React Spring animations
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(60px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 60 }
  });

  const floatAnimation = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(-20px)' });
        await next({ transform: 'translateY(0px)' });
      }
    },
    config: { duration: 3000 }
  });

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleExploreModels = () => {
    navigate('/explore');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-purple-50/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-purple-100/40 to-pink-100/40 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Content */}
          <animated.div style={fadeIn} className="text-center lg:text-left space-y-12">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border border-white/40"
            >
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span className="text-gray-700 font-medium">Tiny ML Models Hub</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                  ML for
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Everyone
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-2xl sm:text-3xl text-gray-600 leading-relaxed max-w-2xl font-light"
              >
                Discover, share, and deploy tiny machine learning models under 10MB. 
                <span className="text-purple-600 font-medium"> Accessible AI for all.</span>
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 pt-8"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  boxShadow: "0 25px 50px rgba(139, 92, 246, 0.25)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="group relative bg-gradient-to-r from-blue-500 to-purple-500 text-white px-12 py-6 rounded-2xl font-semibold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
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
                  y: -4,
                  backgroundColor: "rgba(255, 255, 255, 0.9)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExploreModels}
                className="bg-white/60 backdrop-blur-sm text-gray-700 px-12 py-6 rounded-2xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 flex items-center justify-center space-x-3"
              >
                <Download className="w-6 h-6" />
                <span>Explore Models</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-wrap gap-12 pt-16"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">≤10MB</div>
                <div className="text-gray-500 font-medium">Max Size</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-500 mb-2">Free</div>
                <div className="text-gray-500 font-medium">Always</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-500 mb-2">Instant</div>
                <div className="text-gray-500 font-medium">Access</div>
              </div>
            </motion.div>
          </animated.div>

          {/* Right Illustration */}
          <div className="relative flex items-center justify-center">
            <animated.div style={floatAnimation} className="relative">
              {/* Main Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/50 max-w-md"
              >
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex items-center space-x-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <Brain className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">TinyBERT-Sentiment</h3>
                      <p className="text-gray-500">2.3 MB • PyTorch</p>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span>Accuracy</span>
                        <span>94.2%</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "94%" }}
                          transition={{ duration: 2, delay: 1.5 }}
                          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span>Speed</span>
                        <span>87.5%</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "87%" }}
                          transition={{ duration: 2, delay: 1.7 }}
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-3 shadow-lg"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Download Model</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  x: [0, 15, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -top-8 -right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/60"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-700">Live</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  x: [0, -15, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/60"
              >
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">1.2k downloads</span>
                </div>
              </motion.div>
            </animated.div>
          </div>
        </div>
      </div>
    </section>
  );
}