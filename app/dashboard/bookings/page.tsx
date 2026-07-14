'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, Clock, Eye, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUserBookings, Booking } from '@/lib/firestore-data';
import { useAuth } from '@/lib/auth-context';

export default function BookingsPage() {
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      if (user) {
        const data = await getUserBookings(user.id);
        setBookings(data);
      }
      setIsLoading(false);
    }
    loadBookings();
  }, [user]);

  const filteredBookings = selectedStatus === 'all'
    ? bookings
    : bookings.filter(b => b.status.toLowerCase() === selectedStatus);

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 w-full mx-auto flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground text-lg animate-pulse">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
        <p className="text-muted-foreground">Manage all your vehicle bookings in one place</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {['all', 'active', 'completed', 'upcoming'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              selectedStatus === status
                ? 'bg-primary text-white'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-muted">
              <img
                src={booking.image}
                alt={booking.vehicle}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
              <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                booking.status === 'Active' ? 'bg-green-500 text-white' :
                booking.status === 'Completed' ? 'bg-gray-500 text-white' :
                'bg-blue-500 text-white'
              }`}>
                {booking.status}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">{booking.vehicle}</h3>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar size={16} className="mr-2" />
                  {booking.from} to {booking.to}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin size={16} className="mr-2" />
                  Main Hub
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-4">
                <p className="text-2xl font-bold text-foreground">${booking.amount}</p>
              </div>

              <div className="flex gap-2">
                <Link href={`/dashboard/bookings/${booking.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye size={16} className="mr-1" />
                    View Details
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="px-3">
                  <Download size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <Calendar size={48} className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No bookings found</h3>
          <p className="text-muted-foreground mb-6">You don&apos;t have any {selectedStatus} bookings yet</p>
          <Link href="/vehicles">
            <Button>Browse Vehicles</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
