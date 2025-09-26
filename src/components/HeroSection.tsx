import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { ChevronDown, Sparkles, Download, ArrowRight } from 'lucide-react';

interface NeuralCanvasProps {
  className?: string;
}

const NeuralCanvas: React.FC<NeuralCanvasProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<any[]>([]);
  const connectionsRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Neural network parameters
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 40 : 80;
    const maxConnections = isMobile ? 2 : 3;
    const connectionDistance = isMobile ? 120 : 150;

    // Initialize nodes
    const initNodes = () => {
      nodesRef.current = [];
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 2,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          brightness: Math.random() * 0.5 + 0.5,
          connections: []
        });
      }
    };

    // Create connections between nearby nodes
    const createConnections = () => {
      connectionsRef.current = [];
      nodesRef.current.forEach((node, i) => {
        node.connections = [];
        let connectionCount = 0;
        
        nodesRef.current.forEach((otherNode, j) => {
          if (i !== j && connectionCount < maxConnections) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              const connection = {
                from: node,
                to: otherNode,
                distance,
                sparkPhase: Math.random() * Math.PI * 2,
                sparkSpeed: Math.random() * 0.03 + 0.01,
                opacity: Math.max(0, 1 - distance / connectionDistance) * 0.3
              };
              
              connectionsRef.current.push(connection);
              node.connections.push(connection);
              connectionCount++;
            }
          }
        });
      });
    };

    initNodes();
    createConnections();

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw connections
      connectionsRef.current.forEach(connection => {
        const { from, to } = connection;
        
        // Update spark animation
        connection.sparkPhase += connection.sparkSpeed;
        
        // Draw connection line
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, `rgba(147, 51, 234, ${connection.opacity})`); // purple
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${connection.opacity * 1.5})`); // blue
        gradient.addColorStop(1, `rgba(147, 51, 234, ${connection.opacity})`); // purple
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        // Draw electric spark
        const sparkIntensity = Math.sin(connection.sparkPhase) * 0.5 + 0.5;
        if (sparkIntensity > 0.7) {
          const sparkX = from.x + (to.x - from.x) * (sparkIntensity - 0.7) / 0.3;
          const sparkY = from.y + (to.y - from.y) * (sparkIntensity - 0.7) / 0.3;
          
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#60A5FA';
          ctx.fillStyle = `rgba(96, 165, 250, ${sparkIntensity})`;
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Update and draw nodes
      nodesRef.current.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Update pulse
        node.pulsePhase += node.pulseSpeed;
        const pulseIntensity = Math.sin(node.pulsePhase) * 0.3 + 0.7;

        // Draw node with glow
        const glowRadius = node.radius * 3;
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        
        gradient.addColorStop(0, `rgba(147, 51, 234, ${pulseIntensity * node.brightness})`);
        gradient.addColorStop(0.3, `rgba(59, 130, 246, ${pulseIntensity * node.brightness * 0.6})`);
        gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseIntensity * node.brightness})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

interface RotatingTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const RotatingText: React.FC<RotatingTextProps> = ({ text, className = '', delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handleHover = () => {
    setIsHovered(true);
    setAnimationKey(prev => prev + 1);
    setTimeout(() => setIsHovered(false), 600);
  };

  return (
    <motion.span
      className={`inline-block cursor-pointer ${className}`}
      onHoverStart={handleHover}
      key={animationKey}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}-${animationKey}`}
          className="inline-block"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.05,
            type: "spring",
            stiffness: 100
          }}
          style={{
            transformOrigin: 'center bottom',
            transformStyle: 'preserve-3d'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export function HeroSection() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' }
    });
  }, [controls]);

  const scrollToExplore = () => {
    const nextSection = document.querySelector('#next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Neural Network Background */}
      <NeuralCanvas className="z-0" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 z-10" />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={controls}
              className="text-center lg:text-left"
            >
              {/* Main Headline with Rotating Letters */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                <RotatingText 
                  text="Upload & Discover"
                  className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                  delay={0.3}
                />
                <RotatingText 
                  text="Tiny ML Models"
                  className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mt-2"
                  delay={0.8}
                />
              </motion.h1>

              {/* Subheadline Placeholder */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed h-16"
              >
                {/* Empty placeholder with reserved spacing */}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-3 text-lg relative overflow-hidden"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    </motion.div>
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
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
                    className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-3 text-lg relative overflow-hidden"
                  >
                    <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                    <span>Explore Models</span>
                    
                    {/* Subtle glow */}
                    <motion.div
                      className="absolute inset-0 bg-white/5 rounded-2xl"
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
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

            {/* Right Side - Placeholder Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full h-96">
                {/* Placeholder for brain/neural image or animated code preview */}
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
                    {/* Main placeholder container */}
                    <div className="w-64 h-64 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-500">
                      <div className="p-8 h-full flex flex-col justify-center">
                        <div className="text-white/90 font-mono text-sm mb-4">
                          <div className="text-yellow-300"># Neural Network</div>
                          <div className="text-blue-300">import brain_model</div>
                          <div className="mt-2">model = load_tiny_ml(</div>
                          <div className="ml-4">'neural_net.h5')</div>
                          <div className="mt-2 text-green-300"># Only 2.3 MB!</div>
                        </div>
                        <div className="flex items-center space-x-2 text-white/70">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                          <span className="text-xs">Neural Processing...</span>
                        </div>
                      </div>
                    </div>

                    {/* Floating Neural Nodes */}
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-8 -right-8 bg-purple-500/20 backdrop-blur-sm rounded-2xl p-4 border border-purple-400/30"
                    >
                      <div className="w-8 h-8 bg-purple-400 rounded-full animate-pulse"></div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute -bottom-8 -left-8 bg-blue-500/20 backdrop-blur-sm rounded-2xl p-4 border border-blue-400/30"
                    >
                      <div className="w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
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
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2 text-white/60 hover:text-white/80 transition-colors cursor-pointer"
          onClick={scrollToExplore}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <motion.div
            animate={{ 
              y: [0, 5, 0],
              boxShadow: [
                '0 0 10px rgba(147, 51, 234, 0.5)',
                '0 0 20px rgba(147, 51, 234, 0.8)',
                '0 0 10px rgba(147, 51, 234, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-2 rounded-full bg-purple-600/20 backdrop-blur-sm border border-purple-400/30"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}