'use client'

import { Check, Shield, Clock, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Check,
    title: 'Verified Vehicles',
    description: '100% Verified owners',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Clock,
    title: '24x7 Support',
    description: 'Always available',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Lock,
    title: 'Easy Booking',
    description: 'Book in less than 2 minutes',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Encrypted payment system',
    color: 'from-orange-500 to-red-500',
  },
]

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className={`bg-gradient-to-br ${feature.color} rounded-2xl p-8 text-white h-full hover:shadow-2xl transition-all duration-300`}>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-white/80 text-sm">{feature.description}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
