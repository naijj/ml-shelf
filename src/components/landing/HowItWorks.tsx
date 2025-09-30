import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Share2, Download, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload',
    description: 'Share your tiny ML models (≤10MB) with detailed usage instructions.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FileText,
    title: 'Document',
    description: 'Add comprehensive docs, examples, and platform-specific instructions.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Share2,
    title: 'Share',
    description: 'Your models become instantly discoverable by the global community.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Download,
    title: 'Deploy',
    description: 'Others download and integrate your models into their projects seamlessly.',
    color: 'from-orange-500 to-red-500'
  }
];

export function HowItWorks() {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-32 left-32 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl"
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
            How It <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Four simple steps to start sharing and using tiny ML models.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated Line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gray-200 rounded-full hidden lg:block">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative text-center group"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                  {index + 1}
                </div>

                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative mb-8"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-3xl transition-shadow duration-300`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Glow Effect */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl mx-auto blur-lg -z-10`}
                  />
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (except last item) */}
                {index < steps.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                    className="hidden lg:block absolute top-20 -right-4 text-gray-300"
                  >
                    <ArrowRight className="w-8 h-8" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Start Your Journey →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}