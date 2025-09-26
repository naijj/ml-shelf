import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { ChevronDown, Sparkles, Download, ArrowRight, Brain, Database, Code } from 'lucide-react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, Engine } from '@tsparticles/engine';

interface ShuffleTextProps {
  text: string;
  className?: string;
  onHover?: boolean;
}

const ShuffleText: React.FC<ShuffleTextProps> = ({ text, className = '', onHover = false }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  
  const shuffleText = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        prev.split('').map((char, index) => {
          if (index < iteration) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
      }
      
      iteration += 1 / 3;
    }, 30);
  }, [text, isAnimating]);

  useEffect(() => {
    const timer = setTimeout(() => {
      shuffleText();
    }, 500);
    return () => clearTimeout(timer);
  }, [shuffleText]);

  return (
    <span 
      className={className}
      onMouseEnter={onHover ? shuffleText : undefined}
      style={{ fontFamily: 'monospace' }}
    >
      {displayText}
    </span>
  );
};

export function HeroSection() {
  const [particlesInit, setParticlesInit] = useState(false);
  const controls = useAnimation();

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log('Particles loaded', container);
  }, []);

  const initParticles = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
    setParticlesInit(true);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: 'easeOut' }
    });
  }, [controls]);

  const particlesOptions = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'attract',
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        attract: {
          distance: 200,
          duration: 0.4,
          factor: 5,
        },
      },
    },
    particles: {
      color: {
        value: ['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981'],
      },
      links: {
        color: '#8B5CF6',
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: 'none' as const,
        enable: true,
        outModes: {
          default: 'bounce' as const,
        },
        random: false,
        speed: 0.1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: window.innerWidth < 768 ? 60 : 120,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 25, max: 40 },
      },
    },
    detectRetina: true,
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Particles Background */}
      {particlesInit && (
        <Particles
          id="hero-particles"
          init={initParticles}
          loaded={particlesLoaded}
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 z-10" />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={controls}
              className="text-center lg:text-left"
            >
              {/* Main Headline with Shuffle Animation */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                <ShuffleText 
                  text="Upload & Discover"
                  className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  onHover={true}
                />
                <ShuffleText 
                  text="Tiny ML Models"
                  className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-2"
                  onHover={true}
                />
              </motion.h1>

              {/* Subheadline Placeholder */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed min-h-[3rem]"
              >
                Share, discover, and deploy machine learning models under 10MB. 
                Perfect for edge computing, mobile apps, and IoT devices.
              </motion.p>

              {/* Dock-style CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-3 text-lg"
                  >
                    <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: '0 20px 40px rgba(255, 255, 255, 0.1)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <Link
                    to="/explore"
                    className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-3 text-lg"
                  >
                    <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                    <span>Explore Models</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="grid grid-cols-3 gap-8 mt-16 max-w-md mx-auto lg:mx-0"
              >
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-white">10MB</div>
                  <div className="text-sm text-gray-400">Max Size</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-sm text-gray-400">Always</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-white">Instant</div>
                  <div className="text-sm text-gray-400">Deploy</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - 3D Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full h-96">
                {/* 3D Cube/Shelf Illustration */}
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
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative">
                    {/* Main Cube */}
                    <div className="w-64 h-64 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-500">
                      <div className="p-8 h-full flex flex-col justify-center">
                        <div className="text-white/90 font-mono text-sm mb-4">
                          <div className="text-yellow-300"># Load tiny ML model</div>
                          <div className="text-blue-300">import tensorflow as tf</div>
                          <div className="mt-2">model = tf.keras.models.</div>
                          <div className="ml-4">load_model('tiny.h5')</div>
                          <div className="mt-2 text-green-300"># Only 2.3 MB!</div>
                        </div>
                        <div className="flex items-center space-x-2 text-white/70">
                          <Database className="w-4 h-4" />
                          <span className="text-xs">2.3 MB • TensorFlow</span>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-8 -right-8 bg-purple-500/20 backdrop-blur-sm rounded-2xl p-4 border border-purple-400/30"
                    >
                      <Brain className="w-8 h-8 text-purple-300" />
                    </motion.div>

                    <motion.div
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute -bottom-8 -left-8 bg-blue-500/20 backdrop-blur-sm rounded-2xl p-4 border border-blue-400/30"
                    >
                      <Code className="w-8 h-8 text-blue-300" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2 text-white/60 hover:text-white/80 transition-colors cursor-pointer"
          onClick={() => {
            const nextSection = document.querySelector('#next-section');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}