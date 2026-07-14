'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const slides = [
  { title: 'Luxury Car', color: 'from-purple-500 to-pink-500', image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop' },
  { title: 'Sports Bike', color: 'from-red-500 to-orange-500', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
  { title: 'Scooty', color: 'from-blue-500 to-cyan-500', image: 'https://images.unsplash.com/photo-1559010032-d4d0ef21a916?w=800&h=600&fit=crop' },
  { title: 'SUV', color: 'from-green-500 to-emerald-500', image: 'https://images.unsplash.com/photo-1606661160365-ec2df60432c7?w=800&h=600&fit=crop' },
  { title: 'Electric Vehicle', color: 'from-yellow-500 to-lime-500', image: 'https://images.unsplash.com/photo-1560958089-b8a46dd52c86?w=800&h=600&fit=crop' },
]

export function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  return (
    <div
      className="relative w-full h-96 rounded-2xl overflow-hidden group"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={24} className="text-black" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={24} className="text-black" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index)
              setIsAutoPlay(false)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Slide Title */}
      <div className="absolute bottom-20 left-6 z-20">
        <motion.h3
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white"
        >
          {slides[current].title}
        </motion.h3>
      </div>
    </div>
  )
}
