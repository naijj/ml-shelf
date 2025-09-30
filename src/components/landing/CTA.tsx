import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Upload, Download, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CTA() {
  const navigate = useNavigate();

  const floatAnimation = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(-10px)' });
        await next({ transform: 'translateY(0px)' });
      }
    },
    config: { duration: 3000 }
  });

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleExploreModels = () => {
    navigate('/explore');
  };

  return (
    <section className="py-32 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 mb-8"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Ready to Start?</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Join the
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                ML Revolution
              </span>
            </h2>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
              Start sharing your tiny ML models today and help make AI accessible to everyone, everywhere.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <animated.div style={floatAnimation}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="group relative bg-white text-purple-600 px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"
                  initial={{ scale: 0, opacity: 1 }}
                  whileHover={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="relative flex items-center space-x-3">
                  <Upload className="w-6 h-6" />
                  <span>Upload Your First Model</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  backgroundColor: "rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExploreModels}
                className="bg-white/10 backdrop-blur-sm text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 flex items-center space-x-3"
              >
                <Download className="w-6 h-6" />
                <span>Explore Models</span>
              </motion.button>
            </motion.div>
          </animated.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Zap, text: 'Lightning Fast', desc: '≤10MB models only' },
              { icon: Download, text: 'Instant Access', desc: 'No registration to download' },
              { icon: Sparkles, text: 'Always Free', desc: 'Open source forever' }
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.text}</h3>
                <p className="text-white/80">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}