import React from 'react';
import { Brain, Download, Upload, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Typewriter, StaggerChildren, Float } from 'react-bits';

interface HeroSectionProps {
  onShowAuth: () => void;
  onExploreModels: () => void;
}

export function HeroSection({ onShowAuth, onExploreModels }: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center relative">
          
          {/* Floating Brain icon */}
          <Float floatAmount={12} floatDuration={3}>
            <div className="bg-blue-600 p-4 rounded-2xl shadow-lg inline-block mb-8">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </Float>
          
          {/* Animated Title */}
          <StaggerChildren
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            delay={0.1}
          >
            <motion.h1
              className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6"
              initial="hidden"
              animate="visible"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MLShelf
              </span>
            </motion.h1>
          </StaggerChildren>

          {/* Typewriter for tagline */}
          <div className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            <Typewriter
              text="Tiny ML Models for Everyone. Share, discover, and download lightweight machine learning models under 10MB."
              speed={30}
              loop={false}
            />
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onShowAuth}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Sign In & Upload</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExploreModels}
              className="bg-white text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold shadow-lg hover:shadow-xl border border-gray-200 flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Explore Models</span>
            </motion.button>
          </motion.div>

          {/* Stats with stagger */}
          <StaggerChildren delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <Brain className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">10 MB</div>
                  <div className="text-sm text-gray-600">Max file size</div>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <Users className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">Free</div>
                  <div className="text-sm text-gray-600">Always</div>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <Download className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">Instant</div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </div>
              </motion.div>
            </div>
          </StaggerChildren>
        </div>
      </div>
    </div>
  );
}
