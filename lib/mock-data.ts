export interface Vehicle {
  id: string
  name: string
  category: 'economy' | 'comfort' | 'premium' | 'luxury' | 'suv' | 'bike'
  price: number
  image: string
  year: number
  transmission: 'manual' | 'automatic'
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid'
  capacity: number
  luggage: number
  rating: number
  reviews: number
  description: string
  features: string[]
  available: boolean
}

export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export interface Booking {
  id: string
  vehicleId: string
  pickupDate: string
  returnDate: string
  pickupLocation: string
  returnLocation: string
  totalPrice: number
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  createdAt: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  joinDate: string
  bookingsCount: number
  totalSpent: number
}

const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Toyota Corolla',
    category: 'economy',
    price: 45,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=300&fit=crop',
    year: 2023,
    transmission: 'automatic',
    fuelType: 'petrol',
    capacity: 5,
    luggage: 3,
    rating: 4.5,
    reviews: 128,
    description: 'Fuel-efficient and reliable compact car perfect for city driving',
    features: ['Air Conditioning', 'Power Steering', 'ABS Brakes', 'Bluetooth'],
    available: true,
  },
  {
    id: '2',
    name: 'Honda Civic',
    category: 'economy',
    price: 50,
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=300&fit=crop',
    year: 2023,
    transmission: 'automatic',
    fuelType: 'petrol',
    capacity: 5,
    luggage: 4,
    rating: 4.6,
    reviews: 156,
    description: 'Comfortable and agile sedan with excellent fuel economy',
    features: ['Climate Control', 'Power Windows', 'Backup Camera', 'USB Charging'],
    available: true,
  },
  {
    id: '3',
    name: 'BMW 3 Series',
    category: 'premium',
    price: 120,
    image: 'https://images.unsplash.com/photo-1609708536965-e0b9ad0ffd6d?w=500&h=300&fit=crop',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    capacity: 5,
    luggage: 4,
    rating: 4.8,
    reviews: 89,
    description: 'Luxurious sedan with advanced technology and comfort features',
    features: [
      'Leather Seats',
      'Sunroof',
      'Navigation System',
      'Panoramic Glass Roof',
      'Premium Sound System',
    ],
    available: true,
  },
  {
    id: '4',
    name: 'Mercedes-Benz E-Class',
    category: 'luxury',
    price: 180,
    image: 'https://images.unsplash.com/photo-1553882900-d5160ca3fe10?w=500&h=300&fit=crop',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    capacity: 5,
    luggage: 5,
    rating: 4.9,
    reviews: 67,
    description: 'Ultimate luxury experience with state-of-the-art features',
    features: [
      'Premium Leather',
      'Heated Seats',
      'Adaptive Suspension',
      'Panoramic Sunroof',
      'AIR BODY Control',
    ],
    available: false,
  },
  {
    id: '5',
    name: 'Toyota Highlander',
    category: 'suv',
    price: 95,
    image: 'https://images.unsplash.com/photo-1606611013016-969c19d4a42f?w=500&h=300&fit=crop',
    year: 2023,
    transmission: 'automatic',
    fuelType: 'hybrid',
    capacity: 7,
    luggage: 6,
    rating: 4.7,
    reviews: 203,
    description: 'Spacious SUV perfect for families with advanced safety features',
    features: [
      'Three Row Seating',
      'All-Wheel Drive',
      'Power Liftgate',
      'Safety Sense 2.5+',
      'Dual Climate Control',
    ],
    available: true,
  },
  {
    id: '6',
    name: 'Tesla Model 3',
    category: 'premium',
    price: 110,
    image: 'https://images.unsplash.com/photo-1560958089-b8a63fbf7368?w=500&h=300&fit=crop',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'electric',
    capacity: 5,
    luggage: 4,
    rating: 4.9,
    reviews: 245,
    description: 'Cutting-edge electric vehicle with autopilot capability',
    features: [
      'Autopilot',
      'Supercharging Compatible',
      'Premium Audio',
      'Glass Roof',
      'Touchscreen Controls',
    ],
    available: true,
  },
  {
    id: '7',
    name: 'Royal Enfield Classic 350',
    category: 'bike',
    price: 15,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&h=300&fit=crop',
    year: 2023,
    transmission: 'manual',
    fuelType: 'petrol',
    capacity: 2,
    luggage: 0,
    rating: 4.8,
    reviews: 342,
    description: 'Iconic cruiser bike with timeless design and thumping engine',
    features: ['ABS', 'Disc Brakes', 'Electric Start', 'Alloy Wheels'],
    available: true,
  },
  {
    id: '8',
    name: 'Honda Activa 6G',
    category: 'bike',
    price: 10,
    image: 'https://images.unsplash.com/photo-1625298912440-664bebf317c9?w=500&h=300&fit=crop',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    capacity: 2,
    luggage: 1,
    rating: 4.6,
    reviews: 512,
    description: 'Reliable and fuel-efficient scooter perfect for city commutes',
    features: ['LED Headlight', 'External Fuel Fill', 'Telescopic Suspension'],
    available: true,
  },
  {
    id: '9',
    name: 'KTM Duke 390',
    category: 'bike',
    price: 25,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&h=300&fit=crop',
    year: 2024,
    transmission: 'manual',
    fuelType: 'petrol',
    capacity: 2,
    luggage: 0,
    rating: 4.9,
    reviews: 189,
    description: 'Aggressive street naked bike with thrilling performance',
    features: ['TFT Display', 'Quickshifter+', 'Supermoto ABS', 'LED Lights'],
    available: true,
  },
  {
    id: '10',
    name: 'Yamaha R15 V4',
    category: 'bike',
    price: 20,
    image: 'https://images.unsplash.com/photo-1552084795-9ff0f438a2e5?w=500&h=300&fit=crop',
    year: 2023,
    transmission: 'manual',
    fuelType: 'petrol',
    capacity: 2,
    luggage: 0,
    rating: 4.7,
    reviews: 256,
    description: 'Track-focused sports bike with aerodynamic design',
    features: ['Traction Control', 'Variable Valve Actuation', 'Quick Shifter'],
    available: true,
  },
]

const reviews: Review[] = [
  {
    id: '1',
    author: 'John Smith',
    rating: 5,
    comment: 'Excellent service! The car was clean and in perfect condition. Highly recommended!',
    date: '2024-01-15',
    verified: true,
  },
  {
    id: '2',
    author: 'Sarah Johnson',
    rating: 4,
    comment: 'Good experience overall. Pick-up was quick and the staff was friendly.',
    date: '2024-01-10',
    verified: true,
  },
  {
    id: '3',
    author: 'Michael Chen',
    rating: 5,
    comment: 'Amazing car and amazing service. Will definitely rent again!',
    date: '2024-01-05',
    verified: true,
  },
  {
    id: '4',
    author: 'Emma Wilson',
    rating: 4,
    comment: 'Very smooth rental process. The car is well-maintained.',
    date: '2023-12-28',
    verified: true,
  },
]

const mockBookings: Booking[] = [
  {
    id: 'BK001',
    vehicleId: '1',
    pickupDate: '2024-02-15',
    returnDate: '2024-02-18',
    pickupLocation: 'Downtown Office',
    returnLocation: 'Downtown Office',
    totalPrice: 135,
    status: 'confirmed',
    createdAt: '2024-01-20',
  },
  {
    id: 'BK002',
    vehicleId: '3',
    pickupDate: '2024-03-01',
    returnDate: '2024-03-05',
    pickupLocation: 'Airport Terminal 1',
    returnLocation: 'Airport Terminal 1',
    totalPrice: 480,
    status: 'pending',
    createdAt: '2024-01-18',
  },
]

const mockUser: UserProfile = {
  id: 'USR001',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  joinDate: '2022-06-15',
  bookingsCount: 12,
  totalSpent: 2540,
}

export function getVehicles(): Vehicle[] {
  return vehicles
}

export function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === id)
}

export function getVehiclesByCategory(category: Vehicle['category']): Vehicle[] {
  return vehicles.filter((v) => v.category === category)
}

export function getAvailableVehicles(): Vehicle[] {
  return vehicles.filter((v) => v.available)
}

export function getReviews(): Review[] {
  return reviews
}

export function getUserBookings(): Booking[] {
  return mockBookings
}

export function getUserProfile(): UserProfile {
  return mockUser
}

export function searchVehicles(query: string): Vehicle[] {
  const lowerQuery = query.toLowerCase()
  return vehicles.filter(
    (v) =>
      v.name.toLowerCase().includes(lowerQuery) ||
      v.category.includes(lowerQuery) ||
      v.description.toLowerCase().includes(lowerQuery),
  )
}
