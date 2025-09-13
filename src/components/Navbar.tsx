import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-sm border-b sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">MLShelf</h1>
            </Link>
          </motion.div>

          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className={`relative text-gray-600 hover:text-gray-900 transition-colors ${
                isActive('/') ? 'text-blue-600' : ''
              }`}
            >
              Home
              {isActive('/') && (
                <motion.div
                  layoutId="activeLink"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </Link>
            
            <Link
              to="/explore"
              className={`relative text-gray-600 hover:text-gray-900 transition-colors ${
                isActive('/explore') ? 'text-blue-600' : ''
              }`}
            >
              Explore
              {isActive('/explore') && (
                <motion.div
                  layoutId="activeLink"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`relative flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors ${
                    isActive('/dashboard') ? 'text-blue-600' : ''
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                  {isActive('/dashboard') && (
                    <motion.div
                      layoutId="activeLink"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                    />
                  )}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}