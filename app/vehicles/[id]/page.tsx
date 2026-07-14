'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getVehicleById, toggleWishlist, isVehicleInWishlist } from '@/lib/firestore-data'
import { getReviews, Vehicle } from '@/lib/mock-data'
import { motion } from 'framer-motion'
import { Heart, MapPin, Calendar, Users, Zap, Fuel, Settings } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function VehicleDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const vehicleId = params?.id as string
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const reviews = getReviews() // TODO: Fetch reviews from Firestore as well if needed
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    async function loadWishlistStatus() {
      if (user && vehicleId) {
        const inWishlist = await isVehicleInWishlist(user.id, vehicleId)
        setIsFavorite(inWishlist)
      }
    }
    loadWishlistStatus()
  }, [user, vehicleId])

  useEffect(() => {
    async function loadVehicle() {
      if (vehicleId) {
        try {
          const data = await getVehicleById(vehicleId)
          if (data) setVehicle(data)
        } catch (error) {
          console.error("Failed to load vehicle", error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    loadVehicle()
  }, [vehicleId])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="w-full mx-auto px-4 py-24 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-10 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-muted rounded w-1/4"></div>
          </div>
        </div>
      </main>
    )
  }

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="w-full mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Vehicle Not Found</h1>
          <p className="text-muted-foreground">The vehicle you&apos;re looking for doesn&apos;t exist.</p>
        </div>
        <Footer />
      </main>
    )
  }

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0
    const start = new Date(pickupDate)
    const end = new Date(returnDate)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const totalPrice = calculateDays() * vehicle.price

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Image */}
      <section className="relative bg-muted h-96 overflow-hidden">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className={`object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          priority
        />
        {!imageLoaded && <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />}

        {/* Removed Dark overlay at bottom as requested */}
        {/* Header Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-between items-start"
            >
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{vehicle.name}</h1>
                <p className="text-white/80 text-lg capitalize">{vehicle.category} • {vehicle.year}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                  if (!user) {
                    setShowLoginModal(true)
                    return
                  }
                  const added = await toggleWishlist(user.id, vehicle.id)
                  setIsFavorite(added)
                  setToastMessage(added ? 'Added to Wishlist!' : 'Removed from Wishlist')
                  setTimeout(() => setToastMessage(''), 3000)
                }}
                className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all"
              >
                <Heart
                  size={24}
                  className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Specs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <Users size={24} className="text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{vehicle.capacity}</p>
                <p className="text-xs text-muted-foreground">Passengers</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <Zap size={24} className="text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{vehicle.luggage}</p>
                <p className="text-xs text-muted-foreground">Luggage</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <Settings size={24} className="text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground capitalize">{vehicle.transmission}</p>
                <p className="text-xs text-muted-foreground">Transmission</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <Fuel size={24} className="text-accent mx-auto mb-2" />
                <p className="text-sm font-bold text-foreground capitalize">{vehicle.fuelType}</p>
                <p className="text-xs text-muted-foreground">Fuel Type</p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">About this vehicle</h2>
              <p className="text-muted-foreground mb-6">{vehicle.description}</p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {vehicle.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                    <Zap size={16} className="text-accent flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Customer Reviews</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{review.author}</p>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      {review.verified && (
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">{review.comment}</p>
                    <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-fit"
          >
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24 shadow-xl">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-2">Daily Rate</p>
                <p className="text-4xl font-bold text-primary">${vehicle.price}</p>
                <p className="text-xs text-muted-foreground">/day</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    <Calendar size={16} className="inline mr-2" />
                    Pick-up Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    <Calendar size={16} className="inline mr-2" />
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {calculateDays() > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-muted/50 rounded-lg p-4 mb-6 border border-border"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground">{calculateDays()} days</span>
                    <span className="text-foreground font-semibold">
                      ${vehicle.price * calculateDays()}
                    </span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                    <span>Total</span>
                    <span className="text-primary">${totalPrice}</span>
                  </div>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (!user) {
                    setShowLoginModal(true)
                    return
                  }
                  if (!user.verified) {
                    setShowVerificationModal(true)
                    return
                  }
                  if (vehicle.available && calculateDays() > 0) {
                    setIsBooking(true);
                    // Store booking data in sessionStorage for checkout
                    const bookingData = {
                      vehicleId: vehicle.id,
                      vehicleName: vehicle.name,
                      vehicleImage: vehicle.image,
                      vehicleType: vehicle.category,
                      price: vehicle.price,
                      pickupDate,
                      returnDate,
                      duration: calculateDays(),
                      totalPrice,
                    };
                    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
                    setTimeout(() => {
                      router.push('/checkout');
                    }, 300);
                  }
                }}
                disabled={!vehicle.available || calculateDays() === 0 || isBooking}
                className={`w-full py-3 rounded-lg font-bold transition-all ${
                  vehicle.available && calculateDays() > 0
                    ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg'
                    : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                }`}
              >
                {isBooking ? 'Booking...' : vehicle.available ? 'Book Now' : 'Not Available'}
              </motion.button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                ✓ Free cancellation up to 24 hours before pickup
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowLoginModal(false)}>
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-foreground mb-2">Login Required</h3>
            <p className="text-muted-foreground mb-6">Please login to continue with this action.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowLoginModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => router.push('/auth/login')}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowVerificationModal(false)}>
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-foreground mb-2">Verification Required</h3>
            <p className="text-muted-foreground mb-6">You need to upload your documents before booking a vehicle.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowVerificationModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => router.push('/dashboard/documents')}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Upload Documents
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 right-6 z-50 bg-primary text-white px-6 py-3 rounded-lg shadow-xl font-medium"
        >
          {toastMessage}
        </motion.div>
      )}
    </main>
  )
}
