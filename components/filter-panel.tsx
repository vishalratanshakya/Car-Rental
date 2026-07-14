'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FilterPanelProps {
  onFiltersChange?: (filters: FilterState) => void
}

export interface FilterState {
  categories: string[]
  priceRange: [number, number]
  transmission: string[]
  fuelType: string[]
  rating: number
}

export function FilterPanel({ onFiltersChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    transmission: [],
    fuelType: [],
    rating: 0,
  })
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    transmission: true,
    fuelType: true,
    rating: true,
  })
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const categories = ['Economy', 'Comfort', 'Premium', 'Luxury', 'SUV']
  const transmissions = ['Manual', 'Automatic']
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid']

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const toggleFilter = (type: keyof Omit<FilterState, 'priceRange' | 'rating'>, value: string) => {
    setFilters((prev) => {
      const updated = {
        ...prev,
        [type]: prev[type].includes(value)
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      }
      onFiltersChange?.(updated)
      return updated
    })
  }

  const updatePriceRange = (range: [number, number]) => {
    setFilters((prev) => {
      const updated = { ...prev, priceRange: range }
      onFiltersChange?.(updated)
      return updated
    })
  }

  const updateRating = (rating: number) => {
    setFilters((prev) => {
      const updated = { ...prev, rating }
      onFiltersChange?.(updated)
      return updated
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-xl p-4 sm:p-6 h-fit lg:sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar"
    >
      <div 
        className="flex justify-between items-center md:mb-6 cursor-pointer md:cursor-default"
        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
      >
        <h2 className="text-lg font-bold text-foreground">Filters</h2>
        <button 
          className="md:hidden p-1 bg-muted rounded-lg hover:bg-primary/20 transition-colors"
        >
          <ChevronDown size={20} className={`transform transition-transform ${isMobileFiltersOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className={`${isMobileFiltersOpen ? 'block mt-6' : 'hidden'} md:block`}>
        {/* Category Filter */}
      <FilterSection
        title="Category"
        section="category"
        isExpanded={expandedSections.category}
        onToggle={toggleSection}
      >
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(category.toLowerCase())}
                onChange={() => toggleFilter('categories', category.toLowerCase())}
                className="w-4 h-4 rounded border-border cursor-pointer"
              />
              <span className="text-foreground text-sm">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection
        title="Price Range"
        section="price"
        isExpanded={expandedSections.price}
        onToggle={toggleSection}
      >
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="500"
            value={filters.priceRange[1]}
            onChange={(e) => updatePriceRange([filters.priceRange[0], parseInt(e.target.value)])}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      {/* Transmission Filter */}
      <FilterSection
        title="Transmission"
        section="transmission"
        isExpanded={expandedSections.transmission}
        onToggle={toggleSection}
      >
        <div className="space-y-2">
          {transmissions.map((trans) => (
            <label key={trans} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.transmission.includes(trans.toLowerCase())}
                onChange={() => toggleFilter('transmission', trans.toLowerCase())}
                className="w-4 h-4 rounded border-border cursor-pointer"
              />
              <span className="text-foreground text-sm">{trans}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Fuel Type Filter */}
      <FilterSection
        title="Fuel Type"
        section="fuelType"
        isExpanded={expandedSections.fuelType}
        onToggle={toggleSection}
      >
        <div className="space-y-2">
          {fuelTypes.map((fuel) => (
            <label key={fuel} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.fuelType.includes(fuel.toLowerCase())}
                onChange={() => toggleFilter('fuelType', fuel.toLowerCase())}
                className="w-4 h-4 rounded border-border cursor-pointer"
              />
              <span className="text-foreground text-sm">{fuel}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection
        title="Rating"
        section="rating"
        isExpanded={expandedSections.rating}
        onToggle={toggleSection}
      >
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => updateRating(rating)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-foreground text-sm">
                {rating.toFixed(1)}+ stars
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Reset Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setFilters({
            categories: [],
            priceRange: [0, 500],
            transmission: [],
            fuelType: [],
            rating: 0,
          })
          onFiltersChange?.({
            categories: [],
            priceRange: [0, 500],
            transmission: [],
            fuelType: [],
            rating: 0,
          })
        }}
        className="w-full mt-6 py-2 bg-muted hover:bg-primary hover:text-white text-foreground rounded-lg font-semibold transition-all"
      >
        Reset Filters
      </motion.button>
      </div>
    </motion.div>
  )
}

interface FilterSectionProps {
  title: string
  section: string
  isExpanded: boolean
  onToggle: (section: string) => void
  children: React.ReactNode
}

function FilterSection({ title, section, isExpanded, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-b border-border last:border-b-0 py-4">
      <button
        onClick={() => onToggle(section)}
        className="w-full flex items-center justify-between text-foreground font-semibold text-sm hover:text-primary transition-colors"
      >
        {title}
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <motion.div
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-3">{children}</div>
      </motion.div>
    </div>
  )
}
