import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Search, Zap, Database, Cpu, Cloud } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-cyan-900/20"
        />
        
        {/* Floating Geometric Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-3xl floating blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl floating-delayed blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.1 }}
          className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-br from-purple-600 to-cyan-400 rounded-full floating-slow blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.4 }}
          className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-cyan-600 to-purple-400 rounded-3xl floating blur-sm"
        />

        {/* Particle Network */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 0.3, y: 0 }}
              transition={{ duration: 2, delay: i * 0.2 }}
              className={`absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full floating-${i % 3 === 0 ? 'slow' : i % 2 === 0 ? 'delayed' : ''}`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-text">Store, Share</span>
                <br />
                <span className="text-white">& Run ML Models</span>
                <br />
                <span className="gradient-text">with Ease</span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              A lightweight ML hub with fast uploads, simple downloads, and optimized for low-resource systems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 btn-glow"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload a Model
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/explore"
                  className="inline-flex items-center px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Explore Models
                </Link>
              </motion.div>
            </motion.div>

            {/* Feature Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">10MB</div>
                <div className="text-sm text-gray-400 mt-1">Max Size</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">Free</div>
                <div className="text-sm text-gray-400 mt-1">Always</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">Fast</div>
                <div className="text-sm text-gray-400 mt-1">Deploy</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - 3D Illustration */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              {/* Main Central Node */}
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                  rotateX: [0, 10, 0, -10, 0]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="relative mx-auto w-64 h-64 glass rounded-3xl flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl"
                >
                  <Database className="w-16 h-16 text-white" />
                </motion.div>
                
                {/* Orbiting Elements */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-lg flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Cloud className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Upload className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Satellite Nodes */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 w-16 h-16 glass rounded-2xl flex items-center justify-center"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-lg"></div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-8 w-16 h-16 glass rounded-2xl flex items-center justify-center"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg"></div>
              </motion.div>

              <motion.div
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-12 h-12 glass rounded-xl flex items-center justify-center"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-md"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}