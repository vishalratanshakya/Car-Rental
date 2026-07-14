'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SearchCard } from '@/components/search-card'
import { VehicleCard } from '@/components/vehicle-card'
import { Button } from '@/components/ui/button'

import { FeatureGrid } from '@/components/feature-grid'
import { Vehicle } from '@/lib/mock-data'
import { getVehicles, getAvailableVehicles, getVehiclesByCategory } from '@/lib/firestore-data'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { useEffect, useState } from 'react'

export default function Page() {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([])
  const [mostPickedVehicles, setMostPickedVehicles] = useState<Vehicle[]>([])
  const [premiumBikes, setPremiumBikes] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [available, all, bikes] = await Promise.all([
          getAvailableVehicles(),
          getVehicles(),
          getVehiclesByCategory('bike')
        ]);
        
        setFeaturedVehicles(available.slice(0, 4));
        setMostPickedVehicles(all.sort((a, b) => b.reviews - a.reviews).slice(0, 4));
        setPremiumBikes(bikes.slice(0, 4));
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Premium Hero Section with Video Background */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        <div className="w-full mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            
            {/* Search Card Container (Left Side, smaller) */}
            <div className="lg:justify-self-start w-full max-w-sm">
              <SearchCard />
            </div>

            {/* Text Container (Right Side) */}
            <div className="max-w-2xl lg:justify-self-end lg:text-right">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                >
                  Rent Cars, Bikes &<br />Scooters Anywhere
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl text-gray-200 mb-8 leading-relaxed"
                >
                  Book your perfect ride in minutes with secure booking, verified vehicles, and affordable prices.
                </motion.p>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50 relative">
        <div className="w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-2">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground">Experience premium vehicle rental with trusted features</p>
          </motion.div>
          <FeatureGrid />
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6 sm:mb-8">
            <div className="pr-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 sm:mb-4">Featured Vehicles</h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl hidden sm:block">
                Explore our handpicked selection of top-rated vehicles perfectly suited for your next journey.
              </p>
            </div>
            <Link href="/vehicles" className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors group whitespace-nowrap mb-2 sm:mb-0">
              View All 
              <ArrowRight className="ml-1 sm:ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-full flex-shrink-0 sm:w-auto snap-center h-64 sm:h-96 bg-muted animate-pulse rounded-2xl`}></div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {featuredVehicles.map((vehicle, index) => (
                  <div key={vehicle.id} className={`w-full flex-shrink-0 sm:w-auto snap-center`}>
                    <VehicleCard vehicle={vehicle} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Most Picked Up Vehicles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Most Popular Cars</h2>
            <Link href="/vehicles" className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors group whitespace-nowrap">
              View All 
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {isLoading ? (
            <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full flex-shrink-0 sm:w-auto snap-center h-64 sm:h-96 bg-muted animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {mostPickedVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="w-full flex-shrink-0 sm:w-auto snap-center">
                    <VehicleCard vehicle={vehicle} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Premium Bikes & Scooters Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Premium Two-Wheelers</h2>
            <Link href="/vehicles?category=bike" className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors group whitespace-nowrap">
              View All 
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {isLoading ? (
            <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full flex-shrink-0 sm:w-auto snap-center h-64 sm:h-96 bg-muted animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {premiumBikes.map((vehicle) => (
                  <div key={vehicle.id} className="w-full flex-shrink-0 sm:w-auto snap-center">
                    <VehicleCard vehicle={vehicle} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent text-white">
        <div className="w-full mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Hit the Road?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers. Book your vehicle today and enjoy the freedom of the road.
            </p>
            <Link href="/vehicles">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary font-bold px-8 py-3 rounded-lg hover:shadow-lg transition-all"
              >
                Start Booking Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
