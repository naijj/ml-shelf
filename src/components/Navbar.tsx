import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, LogOut, User, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const { scrollY } = useScroll();
  
  // Transform scroll position to background opacity and blur
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 20]);

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: useTransform(backgroundOpacity, (value) => `rgba(255, 255, 255, ${value})`),
        backdropFilter: useTransform(backdropBlur, (value) => `blur(${value}px)`),
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 transition-all duration-300"
    >
      <motion.div
        style={{
          boxShadow: useTransform(scrollY, [0, 100], ['0 0 0 rgba(0,0,0,0)', '0 4px 30px rgba(0,0,0,0.1)']),
        }}
        className="w-full"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-all duration-300 group">
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
                  />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    MLShelf
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1 font-medium">Tiny ML Hub</p>
                </div>
              </Link>
            </motion.div>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden md:flex items-center space-x-12"
              >
                <Link
                  to="/"
                  className={`relative text-gray-600 hover:text-purple-600 transition-colors font-medium text-lg ${
                    isActive('/') ? 'text-purple-600' : ''
                  }`}
                >
                  <motion.span
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    Home
                  </motion.span>
                  {isActive('/') && (
                    <motion.div
                      layoutId="activeLink"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                    />
                  )}
                </Link>
                
                <Link
                  to="/explore"
                  className={`relative text-gray-600 hover:text-purple-600 transition-colors font-medium text-lg ${
                    isActive('/explore') ? 'text-purple-600' : ''
                  }`}
                >
                  <motion.span
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    Explore
                  </motion.span>
                  {isActive('/explore') && (
                    <motion.div
                      layoutId="activeLink"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                    />
                  )}
                </Link>
              </motion.div>

              {/* Auth Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center space-x-6"
              >
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className={`relative flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 font-medium ${
                        isActive('/dashboard') 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                      }`}
                    >
                      <User className="w-5 h-5" />
                      <span>Dashboard</span>
                      {isActive('/dashboard') && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                        />
                      )}
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-6 py-3 text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 font-medium"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </motion.button>
                  </>
                ) : (
                  <div className="flex items-center space-x-6">
                    <Link
                      to="/login"
                      className="text-gray-600 hover:text-purple-600 transition-colors font-medium text-lg"
                    >
                      <motion.span
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        Login
                      </motion.span>
                    </Link>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to="/register"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-2xl hover:shadow-lg transition-all duration-300 font-medium flex items-center space-x-2"
                      >
                        <Sparkles className="w-5 h-5" />
                        <span>Sign Up</span>
                      </Link>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </nav>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}