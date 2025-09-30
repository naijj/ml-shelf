import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Github, Twitter, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center space-x-4 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center"
              >
                <Brain className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <span className="text-3xl font-bold">MLShelf</span>
                <p className="text-gray-400">Tiny ML Hub</p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Making machine learning accessible to everyone through tiny, efficient models that work everywhere.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Explore Models', 'Upload Model', 'Documentation', 'API Reference'].map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6">Community</h3>
            <ul className="space-y-3">
              {['Discord', 'GitHub Discussions', 'Blog', 'Newsletter'].map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-lg mb-4 md:mb-0">
            &copy; 2025 MLShelf. Built with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block"
            >
              <Heart className="w-4 h-4 text-red-500 inline fill-current" />
            </motion.span>
            {' '}for the ML community.
          </p>
          <div className="flex items-center space-x-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}