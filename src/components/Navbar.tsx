import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Brain, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <Link to="/" className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    MLShelf
                  </span>
                  <p className="text-sm text-gray-500 -mt-1">Tiny ML Hub</p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'Explore', path: '/explore' },
                { name: 'Dashboard', path: '/dashboard' }
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  as={Link}
                  to={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{user.email?.split('@')[0]}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-6 py-3 text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    as={Link}
                    to="/login"
                    className="px-6 py-3 text-gray-700 hover:text-gray-900 rounded-2xl hover:bg-gray-100 transition-all duration-300 font-semibold"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    as={Link}
                    to="/register"
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold"
                  >
                    Sign Up
                  </motion.button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-3 text-gray-700 hover:text-gray-900 rounded-2xl hover:bg-gray-100 transition-all duration-300"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
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
            className="absolute top-24 left-1/2 transform -translate-x-1/2 w-96 bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {[
                { name: 'Home', path: '/' },
                { name: 'Explore', path: '/explore' },
                { name: 'Dashboard', path: '/dashboard' }
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  as={Link}
                  to={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`block px-6 py-4 rounded-2xl transition-all duration-300 font-semibold text-center ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white/50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              
              <div className="border-t border-gray-200/50 pt-6 space-y-4">
                {user ? (
                  <>
                    <div className="text-center text-gray-700 font-medium">
                      {user.email?.split('@')[0]}
                    </div>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      onClick={handleSignOut}
                      className="w-full px-6 py-4 text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 font-semibold"
                    >
                      Sign Out
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      as={Link}
                      to="/login"
                      className="w-full px-6 py-4 text-gray-700 hover:text-gray-900 rounded-2xl hover:bg-white/50 transition-all duration-300 font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      as={Link}
                      to="/register"
                      className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}