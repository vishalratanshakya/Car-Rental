'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Users, Gauge, Fuel, DollarSign, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const BOOKING_DETAILS = {
  1: {
    vehicle: 'Tesla Model 3',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    from: '2024-07-15',
    to: '2024-07-18',
    fromLocation: 'New York, NY',
    toLocation: 'New York, NY',
    status: 'Active',
    amount: '$250',
    dailyRate: '$85/day',
    specs: {
      passengers: 5,
      luggage: 3,
      transmission: 'Automatic',
      fuelType: 'Electric',
    },
    details: {
      bookingId: 'BK-2024-001',
      driverLicense: 'Valid',
      insurance: 'Included',
      mileage: 'Unlimited',
      fuelPolicy: 'Full to Full',
    }
  }
};

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const booking = BOOKING_DETAILS[params.id as unknown as keyof typeof BOOKING_DETAILS] || BOOKING_DETAILS[1];
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCancel = () => {
    setShowCancelConfirm(false);
    router.push('/dashboard/bookings');
  };

  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      {/* Back Button */}
      <Link href="/dashboard/bookings" className="flex items-center text-primary hover:text-primary/80 mb-6 font-medium print:hidden">
        <ArrowLeft size={20} className="mr-2" />
        Back to Bookings
      </Link>

      {/* Header */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{booking.vehicle}</h1>
            <p className="text-muted-foreground">Booking ID: {booking.details.bookingId}</p>
          </div>
          <span className={`px-4 py-2 rounded-lg font-medium ${
            booking.status === 'Active' ? 'bg-green-100 text-green-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {booking.status}
          </span>
        </div>
      </div>

      {/* Image and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Image */}
        <div className="lg:col-span-2">
          <img
            src={booking.image}
            alt={booking.vehicle}
            className="w-full h-96 object-cover rounded-lg border border-border"
          />
        </div>

        {/* Summary Card */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-bold text-foreground mb-4">Booking Summary</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Daily Rate</p>
              <p className="text-2xl font-bold text-foreground">{booking.dailyRate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-primary">{booking.amount}</p>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-2">Pickup</p>
              <p className="font-medium text-foreground">{booking.from}</p>
              <p className="text-sm text-muted-foreground">{booking.fromLocation}</p>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-2">Return</p>
              <p className="font-medium text-foreground">{booking.to}</p>
              <p className="text-sm text-muted-foreground">{booking.toLocation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h3 className="font-bold text-foreground mb-4">Vehicle Specifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1 flex items-center"><Users size={16} className="mr-1" /> Passengers</p>
            <p className="font-bold text-foreground">{booking.specs.passengers}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1 flex items-center"><Gauge size={16} className="mr-1" /> Luggage</p>
            <p className="font-bold text-foreground">{booking.specs.luggage}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1 flex items-center"><Users size={16} className="mr-1" /> Transmission</p>
            <p className="font-bold text-foreground">{booking.specs.transmission}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1 flex items-center"><Fuel size={16} className="mr-1" /> Fuel</p>
            <p className="font-bold text-foreground">{booking.specs.fuelType}</p>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h3 className="font-bold text-foreground mb-4">Booking Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Driver License Status</p>
            <p className="font-medium text-green-600">{booking.details.driverLicense}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Insurance</p>
            <p className="font-medium text-foreground">{booking.details.insurance}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Mileage</p>
            <p className="font-medium text-foreground">{booking.details.mileage}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Fuel Policy</p>
            <p className="font-medium text-foreground">{booking.details.fuelPolicy}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 print:hidden">
        <Button variant="outline" className="flex-1" onClick={() => window.print()}>
          <Download size={18} className="mr-2" />
          Download Invoice
        </Button>
        {booking.status === 'Active' && (
          <Button variant="outline" className="flex-1 text-destructive hover:bg-destructive/10" onClick={() => setShowCancelConfirm(true)}>
            <X size={18} className="mr-2" />
            Cancel Booking
          </Button>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md">
            <h3 className="text-xl font-bold text-foreground mb-2">Cancel Booking?</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setShowCancelConfirm(false)} className="flex-1">
                Keep Booking
              </Button>
              <Button variant="destructive" onClick={handleCancel} className="flex-1">
                Yes, Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
