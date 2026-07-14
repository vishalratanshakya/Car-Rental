'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
  placeholder: string
  minDate?: string
  className?: string
}

export function DatePicker({ value, onChange, placeholder, minDate, className }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize currentMonth based on value or today
  useEffect(() => {
    if (value) {
      const d = new Date(value + 'T12:00:00Z')
      setCurrentMonth(new Date(d.getFullYear(), d.getMonth(), 1))
    }
  }, [value])

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), day))
    const dateString = selectedDate.toISOString().split('T')[0]
    
    if (minDate && dateString < minDate) return // Cannot select before minDate
    
    onChange(dateString)
    setIsOpen(false)
  }

  const isDateDisabled = (day: number) => {
    if (!minDate) return false
    const d = new Date(Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), day))
    const dString = d.toISOString().split('T')[0]
    return dString < minDate
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const d = new Date(dateStr + 'T12:00:00Z')
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-muted/50 border rounded-xl text-foreground flex items-center justify-between cursor-pointer transition-all select-none ${
          isOpen ? 'ring-2 ring-primary border-transparent' : 'border-transparent hover:border-border'
        } ${className || ''}`}
      >
        <span className={value ? 'text-foreground font-medium' : 'text-muted-foreground'}>
          {value ? formatDate(value) : placeholder}
        </span>
        <CalendarIcon size={18} className="text-muted-foreground" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 p-4 bg-white dark:bg-card border border-border rounded-xl shadow-2xl z-50 w-72"
          >
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-1 hover:bg-muted rounded-full transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="font-semibold text-foreground">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </div>
              <button
                onClick={handleNextMonth}
                className="p-1 hover:bg-muted rounded-full transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-semibold text-muted-foreground">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const disabled = isDateDisabled(day)
                
                const dString = new Date(Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), day)).toISOString().split('T')[0]
                const isSelected = value === dString

                return (
                  <button
                    key={day}
                    disabled={disabled}
                    onClick={() => handleDateSelect(day)}
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm transition-all ${
                      disabled 
                        ? 'text-muted-foreground/30 cursor-not-allowed' 
                        : isSelected 
                          ? 'bg-primary text-white font-bold shadow-md shadow-primary/20 scale-105'
                          : 'text-foreground hover:bg-primary/10 hover:text-primary font-medium cursor-pointer'
                    }`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
