'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FilterPanel, FilterState } from '@/components/filter-panel'
import { VehicleCard } from '@/components/vehicle-card'
import { Vehicle } from '@/lib/mock-data'
import { getVehicles } from '@/lib/firestore-data'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { X } from 'lucide-react'

interface SearchParamsState {
  city?: string
  type?: string
  duration?: string
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchParamsState, setSearchParamsState] = useState<SearchParamsState>({})
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    transmission: [],
    fuelType: [],
    rating: 0,
  })
  const [sortBy, setSortBy] = useState('featured')

  // Parse search params from URL
  useEffect(() => {
    const city = searchParams.get('city')
    const type = searchParams.get('type')
    const duration = searchParams.get('duration')

    if (city || type || duration) {
      setSearchParamsState({ city: city || undefined, type: type || undefined, duration: duration || undefined })
    }
  }, [searchParams])

  useEffect(() => {
    async function loadVehicles() {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Failed to load vehicles", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadVehicles();
  }, [])

  const filteredVehicles = vehicles.filter((vehicle) => {
    // Search-based filters
    if (searchParamsState.type) {
      if (searchParamsState.type === 'Electric') {
        if (vehicle.fuelType !== 'electric') return false;
      } else {
        const vehicleTypeMap: Record<string, string[]> = {
          Car: ['economy', 'comfort', 'premium', 'luxury'],
          SUV: ['suv'],
          Bike: ['bike'],
          Scooty: ['bike'],
        }
        const allowedCategories = vehicleTypeMap[searchParamsState.type] || []
        if (allowedCategories.length > 0 && !allowedCategories.includes(vehicle.category)) {
          return false
        }
      }
    }

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(vehicle.category)) {
      return false
    }

    // Price filter
    if (vehicle.price < filters.priceRange[0] || vehicle.price > filters.priceRange[1]) {
      return false
    }

    // Transmission filter
    if (filters.transmission.length > 0 && !filters.transmission.includes(vehicle.transmission)) {
      return false
    }

    // Fuel type filter
    if (filters.fuelType.length > 0 && !filters.fuelType.includes(vehicle.fuelType)) {
      return false
    }

    // Rating filter
    if (filters.rating > 0 && vehicle.rating < filters.rating) {
      return false
    }

    // Availability filter
    if (!vehicle.available) {
      return false
    }

    return true
  })

  // Sort vehicles
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return b.year - a.year
      default:
        return 0
    }
  })

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Our Fleet</h1>
            {searchParamsState.city || searchParamsState.type || searchParamsState.duration ? (
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <p className="text-muted-foreground">
                  Found {filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'} in:
                </p>
                {searchParamsState.city && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    {searchParamsState.city}
                  </span>
                )}
                {searchParamsState.type && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                    {searchParamsState.type}
                  </span>
                )}
                {searchParamsState.duration && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                    {searchParamsState.duration}
                  </span>
                )}
                <button
                  onClick={() => router.push('/vehicles')}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-muted hover:bg-muted/80 text-foreground rounded-full text-sm font-medium transition-colors"
                >
                  <X size={16} />
                  Clear
                </button>
              </div>
            ) : (
              <p className="text-muted-foreground">Browse our complete selection of {filteredVehicles.length} available vehicles</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <aside className="lg:col-span-1">
              <FilterPanel onFiltersChange={setFilters} />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Top Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-border"
              >
                <p className="text-muted-foreground">
                  Showing {sortedVehicles.length} of {vehicles.length} vehicles
                </p>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm font-semibold text-foreground">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </motion.div>

              {/* Vehicles Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-96 bg-muted animate-pulse rounded-2xl"></div>
                  ))}
                </div>
              ) : sortedVehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedVehicles.map((vehicle, index) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-card border border-border rounded-2xl"
                >
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-muted-foreground">😕</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">No vehicles found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        categories: [],
                        priceRange: [0, 500],
                        transmission: [],
                        fuelType: [],
                        rating: 0,
                      })
                      router.push('/vehicles')
                    }}
                    className="text-primary font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
