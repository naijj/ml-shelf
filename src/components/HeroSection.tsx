import React from 'react';
import { Brain, Download, Upload, Users, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './GradientBlinds.css';

export function HeroSection() {
  return (
    <section className="hero relative overflow-hidden min-h-screen flex items-center justify-center text-white">
      {/* Gradient Blinds Background */}
      <div className="absolute inset-0 gradient-blinds"></div>
      
      {/* Content */}
      <div className="relative z-10 px-4 text-center max-w-4xl mx-auto">
        {/* Floating Brain Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="inline-block"
          >
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-white/30">
              <Brain className="w-16 h-16 text-white" />
            </div>
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            MLShelf
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl mb-4 text-white/90 font-light max-w-3xl mx-auto leading-relaxed"
        >
          Your Tiny ML Model Hub
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg mb-12 text-white/80 max-w-2xl mx-auto leading-relaxed"
        >
          Discover, share and run ML models under 10 MB — optimized for edge devices and lightning-fast deployment.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/register"
              className="group bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3 border-2 border-white/20"
            >
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>Get Started</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/explore"
              className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center space-x-3"
            >
              <Zap className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Explore Models</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center group"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-10 h-10 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
              </motion.div>
              <div className="text-3xl font-bold text-white mb-1">10 MB</div>
              <div className="text-white/70 text-sm">Max file size</div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center group"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Users className="w-10 h-10 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-white mb-1">Free</div>
              <div className="text-white/70 text-sm">Always</div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center group"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Download className="w-10 h-10 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
              </motion.div>
              <div className="text-3xl font-bold text-white mb-1">Instant</div>
              <div className="text-white/70 text-sm">Downloads</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
