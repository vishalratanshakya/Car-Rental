'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Truck, Clock, Search, AlertCircle } from 'lucide-react'
import { DatePicker } from './date-picker'

export interface SearchParams {
  city: string
  pickupDate: string
  returnDate: string
  vehicleType: string
  duration: string
}

interface SearchCardProps {
  onSearch?: (params: SearchParams) => void
}

const CITIES = [
  'Delhi',
  'Mumbai',
  'Noida',
  'Greater Noida',
  'Gurgaon',
  'Jaipur',
  'Agra',
  'Lucknow',
  'Chandigarh',
  'Bangalore',
  'Pune',
  'Hyderabad',
]

const VEHICLE_TYPES = ['Car', 'Bike', 'Scooty', 'SUV', 'Electric']
const DURATIONS = ['12 Hours', '24 Hours', 'Custom Days']

export function SearchCard({ onSearch }: SearchCardProps) {
  const router = useRouter()
  const [params, setParams] = useState<SearchParams>({
    city: '',
    pickupDate: '',
    returnDate: '',
    vehicleType: 'Car',
    duration: '24 Hours',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false)
  const [cityFilter, setCityFilter] = useState('')

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!params.city.trim()) {
      newErrors.city = 'Please select a pickup city.'
    }
    if (!params.pickupDate) {
      newErrors.pickupDate = 'Please select a pickup date.'
    }
    if (!params.returnDate) {
      newErrors.returnDate = 'Please select a return date.'
    }
    if (params.pickupDate && params.returnDate && params.pickupDate >= params.returnDate) {
      newErrors.returnDate = 'Return date must be after pickup date.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSearch = () => {
    if (!validateForm()) return

    setIsLoading(true)

    // Simulate loading for 1-2 seconds
    setTimeout(() => {
      setIsLoading(false)
      // Store search params for vehicle filtering
      sessionStorage.setItem('searchParams', JSON.stringify(params))
      router.push(
        `/vehicles?city=${encodeURIComponent(params.city)}&type=${encodeURIComponent(
          params.vehicleType
        )}&duration=${encodeURIComponent(params.duration)}`
      )
    }, 1200)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSearch()
    }
  }

  const filteredCities = CITIES.filter((city) =>
    city.toLowerCase().includes(cityFilter.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white dark:bg-card rounded-2xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all"
    >
      <h2 className="text-3xl font-bold text-foreground mb-6">Find your perfect ride</h2>
      <div className="flex flex-col gap-5">
        {/* Search Location */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            <MapPin size={16} className="inline mr-2 text-primary" />
            Search Location
          </label>
          <input
            type="text"
            placeholder="Search city or location..."
            value={params.city}
            onChange={(e) => {
              setParams({ ...params, city: e.target.value })
              setErrors({ ...errors, city: '' })
            }}
            onKeyPress={handleKeyPress}
            className={`w-full px-4 py-3 bg-muted/50 border rounded-xl text-foreground focus:outline-none focus:ring-2 transition-all ${
              errors.city ? 'border-destructive focus:ring-destructive' : 'border-transparent focus:ring-primary'
            }`}
          />
          {errors.city && (
            <p className="text-xs text-destructive mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.city}
            </p>
          )}
        </div>

        {/* Dates Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Pick-up Date */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              <Calendar size={16} className="inline mr-2 text-primary" />
              Pickup
            </label>
            <DatePicker
              value={params.pickupDate}
              onChange={(date) => {
                setParams({ ...params, pickupDate: date })
                setErrors({ ...errors, pickupDate: '', returnDate: '' })
              }}
              placeholder="Start"
              minDate={getTodayDate()}
              className={errors.pickupDate ? 'border-destructive ring-1 ring-destructive' : ''}
            />
            {errors.pickupDate && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.pickupDate}
              </p>
            )}
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              <Calendar size={16} className="inline mr-2 text-primary" />
              Return
            </label>
            <DatePicker
              value={params.returnDate}
              onChange={(date) => {
                setParams({ ...params, returnDate: date })
                setErrors({ ...errors, returnDate: '' })
              }}
              placeholder="End"
              minDate={params.pickupDate || getTodayDate()}
              className={errors.returnDate ? 'border-destructive ring-1 ring-destructive' : ''}
            />
            {errors.returnDate && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.returnDate}
              </p>
            )}
          </div>
        </div>

        {/* Vehicle Type */}
        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            <Truck size={16} className="inline mr-2 text-primary" />
            Vehicle Type
          </label>
          <select
            value={params.vehicleType}
            onChange={(e) => setParams({ ...params, vehicleType: e.target.value })}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 bg-muted/50 border border-transparent rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            {VEHICLE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>



        {/* Search Button */}
        {/* Search Button */}
        <div className="pt-4">
          <motion.button
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            onClick={handleSearch}
            disabled={isLoading}
            onKeyPress={handleKeyPress}
            className={`w-full py-4 text-lg rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
              isLoading
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-[#ff6b35] text-white hover:bg-[#ff5515] hover:shadow-lg hover:shadow-[#ff6b35]/20'
            }`}
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline"
                >
                  <Search size={20} />
                </motion.div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search size={20} />
                <span>Search</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
