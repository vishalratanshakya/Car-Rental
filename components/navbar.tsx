'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, LogOut, Settings, Moon, Sun, Bell, HelpCircle, FileText, CreditCard, Home, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { searchVehicles, Vehicle } from '@/lib/mock-data'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Vehicle[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setSearchResults(searchVehicles(searchQuery))
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setProfileOpen(false)
        setIsSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Vehicles', href: '/vehicles' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-card border-b border-border shadow-lg"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">DriveHub</span>
          </Link>

          {/* Mobile Search */}
          <div className="md:hidden flex-1 mx-2 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-9 pr-4 py-2 bg-muted/50 border-2 border-primary rounded-full text-sm focus:outline-none transition-all"
              />
            </div>
            {isSearchFocused && searchQuery.length > 0 && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 -left-4 -right-16 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 max-h-60 overflow-y-auto">
                {searchResults.map(vehicle => (
                  <Link 
                    key={vehicle.id} 
                    href={`/vehicles/${vehicle.id}`}
                    onClick={() => {
                      setSearchQuery('')
                      setIsSearchFocused(false)
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-muted transition-colors border-b border-border last:border-0"
                  >
                    <img src={vehicle.image} alt={vehicle.name} className="w-10 h-10 object-cover rounded" />
                    <div>
                      <p className="text-sm font-medium text-foreground line-clamp-1">{vehicle.name}</p>
                      <p className="text-xs text-muted-foreground">${vehicle.price}/day</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {isSearchFocused && searchQuery.length > 0 && searchResults.length === 0 && (
              <div className="absolute top-full mt-2 -left-4 -right-16 bg-card border border-border rounded-lg shadow-lg p-4 text-center z-50">
                <p className="text-sm text-muted-foreground">No vehicles found.</p>
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 ml-8 lg:ml-12">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && item.href !== '#' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-colors duration-200 font-medium ${
                    isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block relative ml-auto mr-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="pl-9 pr-4 py-2 bg-muted/50 border-2 border-primary rounded-full text-sm focus:outline-none w-64 transition-all"
              />
            </div>
            {isSearchFocused && searchQuery.length > 0 && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                {searchResults.slice(0, 5).map(vehicle => (
                  <Link 
                    key={vehicle.id} 
                    href={`/vehicles/${vehicle.id}`}
                    onClick={() => {
                      setSearchQuery('')
                      setIsSearchFocused(false)
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-muted transition-colors border-b border-border last:border-0"
                  >
                    <img src={vehicle.image} alt={vehicle.name} className="w-10 h-10 object-cover rounded" />
                    <div>
                      <p className="text-sm font-medium text-foreground line-clamp-1">{vehicle.name}</p>
                      <p className="text-xs text-muted-foreground">${vehicle.price}/day</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {isSearchFocused && searchQuery.length > 0 && searchResults.length === 0 && (
              <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg p-4 text-center z-50">
                <p className="text-sm text-muted-foreground">No vehicles found.</p>
              </div>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-foreground hidden sm:inline">{user.name}</span>
                </button>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-border bg-muted/50">
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link onClick={() => setProfileOpen(false)} href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors text-foreground">
                        <Home size={16} />
                        <span className="text-sm">Dashboard</span>
                      </Link>
                      <Link onClick={() => setProfileOpen(false)} href="/dashboard/notifications" className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors text-foreground">
                        <Bell size={16} />
                        <span className="text-sm">Notifications</span>
                      </Link>
                      <Link onClick={() => setProfileOpen(false)} href="/dashboard/payments" className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors text-foreground">
                        <CreditCard size={16} />
                        <span className="text-sm">Payments</span>
                      </Link>
                      <Link onClick={() => setProfileOpen(false)} href="/dashboard/documents" className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors text-foreground">
                        <FileText size={16} />
                        <span className="text-sm">Documents</span>
                      </Link>
                      <Link onClick={() => setProfileOpen(false)} href="/dashboard/support" className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors text-foreground">
                        <HelpCircle size={16} />
                        <span className="text-sm">Support</span>
                      </Link>
                    </div>

                    {/* Theme Toggle */}
                    <div className="border-t border-border py-2 px-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Theme</p>
                      <div className="flex gap-2">
                        <button onClick={() => setTheme('light')} className={`flex-1 px-3 py-1 rounded text-xs font-medium transition-all ${theme === 'light' ? 'bg-primary text-white' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
                          <Sun size={14} className="mx-auto" />
                        </button>
                        <button onClick={() => setTheme('dark')} className={`flex-1 px-3 py-1 rounded text-xs font-medium transition-all ${theme === 'dark' ? 'bg-primary text-white' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
                          <Moon size={14} className="mx-auto" />
                        </button>
                      </div>
                    </div>

                    {/* Settings & Logout */}
                    <div className="border-t border-border py-2">
                      <Link onClick={() => setProfileOpen(false)} href={user.role === 'admin' ? '/admin/settings' : '/dashboard/settings'} className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors text-foreground">
                        <Settings size={16} />
                        <span className="text-sm">Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          router.push('/')
                          setProfileOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-muted transition-colors flex items-center gap-3 text-destructive"
                      >
                        <LogOut size={16} />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-foreground hover:text-primary transition-colors px-4 py-2 font-medium">
                  Sign In
                </Link>
                <Link href="/auth/register" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && item.href !== '#' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {user ? (
              <>
                <Link onClick={() => setIsOpen(false)} href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className="block px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout()
                    router.push('/')
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-destructive hover:bg-muted transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="block px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/register" className="w-full bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition-all mt-2 block text-center">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
