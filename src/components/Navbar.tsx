import React from 'react';
import { motion } from 'framer-motion';

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-surface rounded-2xl px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500-gradient-start to-primary-500-gradient-end p-0.5">
                  <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center">
                    <img 
                      src="/logo.png" 
                      alt="MLShelf Logo" 
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-accent opacity-20 animate-pulse-glow"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">MLShelf</h1>
                <p className="text-xs text-gray-400 -mt-1">Tiny ML Hub</p>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden md:flex items-center space-x-8"
            >
              <a href="#home" className="text-gray-300 hover:text-white transition-colors font-medium">
                Home
              </a>
              <a href="#explore" className="text-gray-300 hover:text-white transition-colors font-medium">
                Explore
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors font-medium">
                About
              </a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-4"
            >
              <button className="text-gray-300 hover:text-white transition-colors font-medium">
                Sign In
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gradient-bg px-6 py-2 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}