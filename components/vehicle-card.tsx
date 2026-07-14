'use client'

import { Vehicle } from '@/lib/mock-data'
import { Heart, MapPin, Zap } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

interface VehicleCardProps {
  vehicle: Vehicle
  index?: number
}

export function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link href={`/vehicles/${vehicle.id}`}>
        <div className="bg-card rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 h-full flex flex-col group cursor-pointer">
          {/* Image Container */}
          <div className="relative h-48 bg-muted overflow-hidden">
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />}

            {/* Badge */}
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold capitalize">
              {vehicle.category}
            </div>

            {/* Availability */}
            {!vehicle.available && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold">Not Available</span>
              </div>
            )}

            {/* Favorite Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                if (!user) {
                  setShowLoginModal(true)
                  return
                }
                setIsFavorite(!isFavorite)
              }}
              className="absolute top-3 right-3 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all cursor-pointer"
            >
              <Heart
                size={20}
                className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
              />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            {/* Title and Rating */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">{vehicle.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < Math.floor(vehicle.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {vehicle.rating} ({vehicle.reviews})
                </span>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{vehicle.year}</span>
                  <span>•</span>
                  <span>{vehicle.transmission}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{vehicle.capacity} seats</span>
                  <span>•</span>
                  <span>{vehicle.luggage} bags</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {vehicle.features.slice(0, 2).map((feature) => (
                <span key={feature} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                  {feature}
                </span>
              ))}
              {vehicle.features.length > 2 && (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                  +{vehicle.features.length - 2}
                </span>
              )}
            </div>

            {/* Pricing Section */}
            <div className="border-t border-border pt-4 mb-4">
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">12 Hours</span>
                  <span className="text-lg font-bold text-foreground">₹{Math.round(vehicle.price * 20)}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">24 Hours</span>
                  <span className="text-lg font-bold text-foreground">₹{Math.round(vehicle.price * 36)}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault()
                  setShowLoginModal(true)
                  return
                }
                if (!user.verified) {
                  e.preventDefault()
                  setShowVerificationModal(true)
                }
              }}
              className={`w-full py-3 rounded-lg font-semibold transition-all text-sm text-center flex items-center justify-center ${
                vehicle.available
                  ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg'
                  : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
              }`}
            >
              Book Now
            </motion.div>
          </div>
        </div>
      </Link>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowLoginModal(false); }}>
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full shadow-2xl" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            <h3 className="text-xl font-bold text-foreground mb-2">Login Required</h3>
            <p className="text-muted-foreground mb-6">Please login to continue with this action.</p>
            <div className="flex gap-3">
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowLoginModal(false); }}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push('/auth/login'); }}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowVerificationModal(false); }}>
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full shadow-2xl" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            <h3 className="text-xl font-bold text-foreground mb-2">Verification Required</h3>
            <p className="text-muted-foreground mb-6">You need to upload your documents before booking a vehicle.</p>
            <div className="flex gap-3">
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowVerificationModal(false); }}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push('/dashboard/documents'); }}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Upload Documents
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
