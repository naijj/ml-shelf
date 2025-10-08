import { motion } from 'framer-motion';
import { Zap, Download, Smartphone, Shield, Globe, Cpu } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Tiny Model Focus',
    description: 'All models are under 10MB, perfect for resource-constrained environments and edge computing.',
    color: 'bg-yellow-500'
  },
  {
    icon: Download,
    title: 'One-Click Downloads',
    description: 'No registration required to download. Get the models you need instantly.',
    color: 'bg-blue-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Designed for mobile apps, IoT devices, and embedded systems with limited resources.',
    color: 'bg-green-500'
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Community-driven platform with verified models and usage instructions.',
    color: 'bg-purple-500'
  },
  {
    icon: Globe,
    title: 'Open Source',
    description: 'Free forever. Share your models and help the community grow.',
    color: 'bg-indigo-500'
  },
  {
    icon: Cpu,
    title: 'Edge Computing Ready',
    description: 'Optimized for inference on CPUs, mobile processors, and microcontrollers.',
    color: 'bg-red-500'
  }
];

export default function WhyMLShelfSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Why Choose MLShelf?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            The only platform dedicated to tiny machine learning models. 
            Built for developers who need efficient, lightweight AI solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-8 transition-shadow duration-300 bg-white shadow-sm rounded-2xl hover:shadow-md"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="text-white w-7 h-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}