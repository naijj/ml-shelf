import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Mobile App Developer',
    company: 'TechStart Inc.',
    content: 'MLShelf saved me weeks of model optimization. Found the perfect image classification model under 5MB for my iOS app.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'IoT Engineer',
    company: 'EdgeTech Solutions',
    content: 'The quality of tiny models here is incredible. Deployed a 3MB NLP model on our Raspberry Pi devices with great results.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Research Scientist',
    company: 'AI Research Lab',
    content: 'Perfect platform for sharing our compressed models. The usage instructions feature makes it easy for others to implement.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

const useCases = [
  {
    title: 'Mobile Apps',
    description: 'Add AI features to your mobile apps without bloating the download size.',
    icon: '📱',
    examples: ['Image recognition', 'Text classification', 'Voice commands']
  },
  {
    title: 'IoT Devices',
    description: 'Deploy ML models on resource-constrained IoT devices and edge computers.',
    icon: '🔌',
    examples: ['Sensor data analysis', 'Anomaly detection', 'Predictive maintenance']
  },
  {
    title: 'Web Applications',
    description: 'Run ML models directly in the browser for real-time inference.',
    icon: '🌐',
    examples: ['Client-side ML', 'Privacy-first AI', 'Offline capabilities']
  },
  {
    title: 'Embedded Systems',
    description: 'Integrate AI into microcontrollers and embedded devices.',
    icon: '⚡',
    examples: ['Smart sensors', 'Wearable devices', 'Automotive systems']
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Trusted by Developers Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what developers are saying about MLShelf and how it's helping them build better AI applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 relative"
            >
              <Quote className="w-8 h-8 text-blue-600 mb-4" />
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-blue-600">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Perfect for Every Use Case
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From mobile apps to IoT devices, MLShelf has the right tiny models for your project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {useCase.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {useCase.description}
              </p>
              <div className="space-y-1">
                {useCase.examples.map((example, i) => (
                  <div key={i} className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mr-2 mb-2">
                    {example}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}