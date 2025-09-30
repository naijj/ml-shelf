import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Zap, MousePointer, Globe, Cpu, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Small & Fast',
    description: 'All models under 10MB for lightning-fast downloads and deployment on any device.',
    color: 'from-yellow-400 to-orange-500',
    delay: 0.1
  },
  {
    icon: MousePointer,
    title: 'One-Click Easy',
    description: 'No registration needed to download. Get the models you need instantly with signed URLs.',
    color: 'from-blue-400 to-cyan-500',
    delay: 0.2
  },
  {
    icon: Globe,
    title: 'Open & Free',
    description: 'Community-driven platform. Share your models and help make AI accessible to everyone.',
    color: 'from-green-400 to-emerald-500',
    delay: 0.3
  },
  {
    icon: Cpu,
    title: 'Edge Ready',
    description: 'Optimized for mobile apps, IoT devices, and resource-constrained environments.',
    color: 'from-purple-400 to-pink-500',
    delay: 0.4
  }
];

export function Features() {
  return (
    <section className="py-32 bg-gradient-to-br from-white via-blue-50/10 to-purple-50/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-2xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/40 mb-8"
          >
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="text-purple-600 font-semibold">Why MLShelf?</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 leading-tight">
            Built for
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> Modern AI</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            The only platform dedicated to tiny machine learning models that work everywhere.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const [isHovered, setIsHovered] = React.useState(false);

  const floatAnimation = useSpring({
    transform: isHovered ? 'translateY(-12px)' : 'translateY(0px)',
    boxShadow: isHovered 
      ? '0 25px 50px rgba(0, 0, 0, 0.15)' 
      : '0 10px 30px rgba(0, 0, 0, 0.08)',
    config: { tension: 300, friction: 30 }
  });

  const iconAnimation = useSpring({
    transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
    config: { tension: 400, friction: 20 }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: feature.delay,
        type: "spring",
        stiffness: 100
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <animated.div
        style={floatAnimation}
        className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 h-full cursor-pointer"
      >
        <div className="space-y-6">
          {/* Icon */}
          <animated.div style={iconAnimation}>
            <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
              <feature.icon className="w-8 h-8 text-white" />
            </div>
          </animated.div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {feature.description}
            </p>
          </div>
        </div>
      </animated.div>
    </motion.div>
  );
}