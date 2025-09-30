import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Download, Upload, Users, Zap, MousePointer, Cpu, ArrowRight, Database, Sparkles, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { HeroSection } from './HeroSection';
import { TopModelsSection } from './TopModelsSection';

export function LandingPage() {
  const scrollToExplore = () => {
    const exploreSection = document.querySelector('#how-it-works');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShowAuth = () => {
    // Navigate to register page
    window.location.href = '/register';
  };

  const handleExploreModels = () => {
    // Navigate to explore page
    window.location.href = '/explore';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection onShowAuth={handleShowAuth} onExploreModels={handleExploreModels} />

      {/* Why MLShelf Section */}
      <section id="next-section" className="py-32 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/40 mb-8"
            >
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-purple-600 font-semibold">Why Choose MLShelf?</span>
              <Sparkles className="w-5 h-5 text-purple-500" />
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Built for Everyone
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The only platform dedicated to tiny machine learning models.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group text-center p-12 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg"
              >
                <Zap className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Small & Fast</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                All models are under 10 MB, perfect for mobile apps, IoT devices, and edge computing scenarios.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group text-center p-12 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg"
              >
                <MousePointer className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">One-Click Download</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Instant signed URLs for secure downloads. No registration required to access models.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group text-center p-12 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg"
              >
                <Cpu className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Edge-Ready</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Optimized for low-resource devices, microcontrollers, and embedded systems.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-gradient-to-br from-gray-50/50 to-blue-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/40 mb-8"
            >
              <Award className="w-5 h-5 text-purple-600" />
              <span className="text-purple-600 font-semibold">Simple Process</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              How It <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Three simple steps to start sharing and using tiny ML models.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center relative"
            >
              <div className="relative mb-8">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                >
                  <Upload className="w-12 h-12 text-white" />
                </motion.div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  1
                </div>
                <div className="absolute top-12 -right-8 hidden md:block">
                  <ArrowRight className="w-8 h-8 text-gray-300" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Upload</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Upload your tiny ML models (under 10 MB) with detailed usage instructions and metadata.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center relative"
            >
              <div className="relative mb-8">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                >
                  <Users className="w-12 h-12 text-white" />
                </motion.div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  2
                </div>
                <div className="absolute top-12 -right-8 hidden md:block">
                  <ArrowRight className="w-8 h-8 text-gray-300" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Share</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Your models become instantly available to the community with searchable tags and descriptions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="relative mb-8">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                >
                  <Download className="w-12 h-12 text-white" />
                </motion.div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Download & Use</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Others can instantly download and integrate your models into their projects with clear instructions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top Downloaded Models Section */}
      <TopModelsSection />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-8 md:mb-0">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center"
              >
                <Brain className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <span className="text-2xl font-bold">MLShelf</span>
                <p className="text-sm text-gray-300">Tiny ML Hub</p>
              </div>
            </div>
            <div className="flex items-center space-x-12">
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg">GitHub</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-12 text-center text-gray-400">
            <p className="text-lg">&copy; 2025 MLShelf. Built for the tiny ML community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}