'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Small delay ensures DOM is updated before scrolling
    const timeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      })
    }, 10)
    
    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}
