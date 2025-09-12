import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Download, Smartphone, Shield, Globe, Cpu } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Tiny Model Focus',
    description: 'All models are under 10MB, perfect for resource-constrained environments and edge computing.',
    color: 'text-yellow-600'
  },
  {
    icon: Download,
    title: 'One-Click Downloads',
    description: 'No registration required to download. Get the models you need instantly.',
    color: 'text-blue-600'
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Designed for mobile apps, IoT devices, and embedded systems with limited resources.',
    color: 'text-green-600'
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Community-driven platform with verified models and usage instructions.',
    color: 'text-purple-600'
  },
  {
    icon: Globe,
    title: 'Open Source',
    description: 'Free forever. Share your models and help the community grow.',
    color: 'text-indigo-600'
  },
  {
    icon: Cpu,
    title: 'Edge Computing Ready',
    description: 'Optimized for inference on CPUs, mobile processors, and microcontrollers.',
    color: 'text-red-600'
  }
];

export function WhyMLShelfSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MLShelf</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The only platform dedicated to tiny machine learning models. 
            Built for developers who need efficient, lightweight AI solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-6`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}