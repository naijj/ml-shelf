import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Brain } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform scroll position to background opacity and blur
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.1, 0.8]);
  const backdropBlur = useTransform(scrollY, [0, 100], [8, 20]);

  return (
    <>
      {/* Main Floating Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4"
      >
        <motion.nav
          style={{
            backgroundColor: useTransform(backgroundOpacity, (value) => `rgba(255, 255, 255, ${value})`),
            backdropFilter: useTransform(backdropBlur, (value) => `blur(${value}px)`),
          }}
          className="px-12 py-4 rounded-full border border-white/20 shadow-2xl w-full"
        >
          <div className="flex items-center justify-between space-x-12">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-cyan-400 rounded-full opacity-30 blur-sm"
                />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ML Shelf
              </span>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {['Home', 'Models', 'Docs'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-gray-700 hover:text-gray-900 rounded-full hover:bg-white/30 transition-all duration-300 font-medium"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 text-gray-700 hover:text-gray-900 rounded-full hover:bg-white/30 transition-all duration-300 font-medium"
              >
                Login
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white rounded-full hover:shadow-lg transition-all duration-300 font-medium"
              >
                Sign Up
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-24 left-1/2 transform -translate-x-1/2 w-96 bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              {['Home', 'Models', 'Docs'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="block px-4 py-3 text-gray-700 hover:text-gray-900 rounded-2xl hover:bg-white/50 transition-all duration-300 font-medium text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
              
              <div className="border-t border-gray-200/50 pt-4 space-y-3">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="w-full px-4 py-3 text-gray-700 hover:text-gray-900 rounded-2xl hover:bg-white/50 transition-all duration-300 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}