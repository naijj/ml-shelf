import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Zap, Users } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 bg-primary-500-gradient-start rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-primary-500-gradient-end rounded-full blur-3xl opacity-20"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Logo Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12 flex justify-center"
        >
          <div className="relative">
            {/* Outer Glow Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-32 h-32 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, var(--accent), var(--primary-500-gradient-start), var(--primary-500-gradient-end), var(--accent))`,
                padding: '2px'
              }}
            >
              <div className="w-full h-full rounded-full bg-midnight" />
            </motion.div>
            
            {/* Main Logo Container */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary-500-gradient-start to-primary-500-gradient-end p-1 animate-pulse-glow"
            >
              <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="MLShelf Logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
            </motion.div>
            
            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                className="absolute w-2 h-2 bg-accent rounded-full"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 15}%`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="gradient-text">MLShelf</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Your Tiny ML Model Hub
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover, share and run ML models under 10 MB — optimized for edge devices and lightning-fast deployment.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group gradient-bg px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3"
          >
            <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span>Get Started</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group glass-surface px-8 py-4 rounded-2xl font-bold text-lg border border-white/20 hover:border-accent/50 transition-all duration-300 flex items-center space-x-3"
          >
            <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span>Explore Models</span>
          </motion.button>
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
            className="glass-surface rounded-2xl p-6 text-center group"
          >
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold gradient-text mb-2">10 MB</div>
            <div className="text-gray-400 text-sm">Max file size</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-surface rounded-2xl p-6 text-center group"
          >
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold gradient-text mb-2">Free</div>
            <div className="text-gray-400 text-sm">Always</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-surface rounded-2xl p-6 text-center group"
          >
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold gradient-text mb-2">Instant</div>
            <div className="text-gray-400 text-sm">Downloads</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}