import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Smartphone, Wifi, Globe, Zap } from 'lucide-react';

const useCases = [
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Add AI features to your mobile apps without bloating the download size or draining battery.',
    examples: ['Image recognition', 'Text classification', 'Voice commands', 'Real-time filters'],
    color: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50/50 to-cyan-50/30'
  },
  {
    icon: Wifi,
    title: 'IoT Devices',
    description: 'Deploy ML models on resource-constrained IoT devices and edge computers for smart automation.',
    examples: ['Sensor analysis', 'Anomaly detection', 'Predictive maintenance', 'Smart monitoring'],
    color: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50/50 to-emerald-50/30'
  },
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Run ML models directly in the browser for real-time inference without server dependencies.',
    examples: ['Client-side ML', 'Privacy-first AI', 'Offline capabilities', 'Real-time processing'],
    color: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50/50 to-pink-50/30'
  },
  {
    icon: Zap,
    title: 'Embedded Systems',
    description: 'Integrate AI into microcontrollers and embedded devices for intelligent edge computing.',
    examples: ['Smart sensors', 'Wearable devices', 'Automotive systems', 'Industrial automation'],
    color: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50/50 to-red-50/30'
  }
];

export function UseCases() {
  return (
    <section className="py-32 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-2xl"
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
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
            Perfect for
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> Every Use Case</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            From mobile apps to IoT devices, MLShelf has the right tiny models for your project.
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={useCase.title} useCase={useCase} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCaseCard({ useCase, index }: { useCase: any; index: number }) {
  const [isHovered, setIsHovered] = React.useState(false);

  const cardAnimation = useSpring({
    transform: isHovered 
      ? 'translateY(-8px) rotateX(5deg) rotateY(5deg)' 
      : 'translateY(0px) rotateX(0deg) rotateY(0deg)',
    boxShadow: isHovered 
      ? '0 30px 60px rgba(0, 0, 0, 0.12)' 
      : '0 10px 30px rgba(0, 0, 0, 0.06)',
    config: { tension: 300, friction: 30 }
  });

  const iconAnimation = useSpring({
    transform: isHovered ? 'scale(1.1) rotate(10deg)' : 'scale(1) rotate(0deg)',
    config: { tension: 400, friction: 20 }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
    >
      <animated.div
        style={cardAnimation}
        className={`group bg-gradient-to-br ${useCase.bgGradient} backdrop-blur-sm rounded-3xl p-10 border border-white/50 h-full cursor-pointer overflow-hidden relative`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-transparent" />
        </div>

        <div className="relative space-y-8">
          {/* Icon */}
          <animated.div style={iconAnimation}>
            <div className={`w-20 h-20 bg-gradient-to-br ${useCase.color} rounded-3xl flex items-center justify-center shadow-xl`}>
              <useCase.icon className="w-10 h-10 text-white" />
            </div>
          </animated.div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
              {useCase.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {useCase.description}
            </p>

            {/* Examples */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Use Cases
              </h4>
              <div className="flex flex-wrap gap-2">
                {useCase.examples.map((example: string, i: number) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + i * 0.1 }}
                    className="text-sm bg-white/60 backdrop-blur-sm text-gray-700 px-3 py-2 rounded-full border border-white/40 font-medium"
                  >
                    {example}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </motion.div>
  );
}