'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface PriceCardProps {
  name: string
  price: number
  description: string
  features: string[]
  highlighted?: boolean
  onSelect?: () => void
}

export function PriceCard({
  name,
  price,
  description,
  features,
  highlighted = false,
  onSelect,
}: PriceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: highlighted ? -12 : -6 }}
      className={`relative rounded-2xl border transition-all duration-300 overflow-hidden h-full flex flex-col ${
        highlighted
          ? 'border-primary bg-gradient-to-br from-card to-primary/5 shadow-2xl scale-105'
          : 'border-border bg-card hover:shadow-xl'
      }`}
    >
      {highlighted && (
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
          POPULAR
        </div>
      )}

      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-6">{description}</p>

        {/* Price */}
        <div className="mb-6">
          <span className="text-5xl font-bold text-primary">${price}</span>
          <span className="text-muted-foreground text-sm ml-2">/day</span>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-foreground text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSelect}
          className={`w-full py-3 rounded-lg font-bold transition-all duration-200 ${
            highlighted
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg'
              : 'bg-muted text-foreground hover:bg-primary hover:text-white'
          }`}
        >
          Choose Plan
        </motion.button>
      </div>
    </motion.div>
  )
}
