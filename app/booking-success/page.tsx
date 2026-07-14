'use client';

import { CheckCircle, Download, Calendar, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={64} className="text-green-600" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-xl text-muted-foreground">Your vehicle rental has been successfully booked</p>
        </div>

        {/* Booking Details */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 print:break-inside-avoid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
              <p className="text-2xl font-bold text-primary">BK-2024-12345</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-foreground">$350.00</p>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="mb-8 pb-8 border-b border-border">
            <h2 className="font-bold text-foreground mb-4">Vehicle Details</h2>
            <div className="flex gap-4">
              <img
                src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=60"
                alt="Vehicle"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-1">Tesla Model 3</h3>
                <p className="text-sm text-muted-foreground mb-2">Luxury • 5 Passengers</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar size={16} /> 3 days</span>
                  <span className="flex items-center gap-1"><MapPin size={16} /> NY, USA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rental Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Pickup</p>
              <p className="font-bold text-foreground mb-1">July 15, 2024</p>
              <p className="text-sm text-muted-foreground">10:00 AM - New York, NY</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Return</p>
              <p className="font-bold text-foreground mb-1">July 18, 2024</p>
              <p className="text-sm text-muted-foreground">10:00 AM - New York, NY</p>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 print:break-inside-avoid print:mt-4">
          <h3 className="font-bold text-foreground mb-4">What's Next?</h3>
          <ol className="space-y-3 text-sm text-foreground">
            <li className="flex gap-3">
              <span className="font-bold text-primary">1.</span>
              <span>Confirmation email has been sent to your registered email address</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">2.</span>
              <span>Upload your driver&apos;s license and ID proof before pickup</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">3.</span>
              <span>Arrive 15 minutes early for vehicle pickup</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">4.</span>
              <span>Complete vehicle inspection before departing</span>
            </li>
          </ol>
        </div>

        {/* Actions */}
        <div className="flex gap-4 flex-col sm:flex-row print:hidden">
          <Link href="/dashboard/bookings" className="flex-1">
            <Button className="w-full">View My Bookings</Button>
          </Link>
          <Button variant="outline" className="flex-1" onClick={() => window.print()}>
            <Download size={18} className="mr-2" />
            Download Invoice
          </Button>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-muted-foreground mt-8 print:hidden">
          Need help?{' '}
          <Link href="/dashboard/support" className="text-primary hover:text-primary/80 font-medium">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
