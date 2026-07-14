'use client';

import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BookingFailedPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle size={64} className="text-red-600" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Booking Failed</h1>
          <p className="text-xl text-muted-foreground">Your booking could not be completed</p>
        </div>

        {/* Error Details */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-foreground mb-4">What Went Wrong?</h3>
          <p className="text-sm text-foreground mb-4">
            There was an issue processing your payment. This could be due to:
          </p>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex gap-2">
              <span>•</span>
              <span>Insufficient funds in your account</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Card has expired or is not valid</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Billing address mismatch</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Transaction was declined by your bank</span>
            </li>
          </ul>
        </div>

        {/* Booking Summary */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="font-bold text-foreground mb-6">Booking Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between pb-4 border-b border-border">
              <span className="text-muted-foreground">Vehicle</span>
              <span className="text-foreground font-medium">Tesla Model 3</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-border">
              <span className="text-muted-foreground">Dates</span>
              <span className="text-foreground font-medium">July 15-18, 2024</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-border">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="text-foreground font-medium">$350.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="text-red-600 font-medium">Failed</span>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-foreground mb-2">How to Fix This?</h3>
          <ol className="space-y-2 text-sm text-foreground">
            <li className="flex gap-2">
              <span className="font-bold text-primary">1.</span>
              <span>Check your card details and ensure they are correct</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">2.</span>
              <span>Try using a different payment method</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">3.</span>
              <span>Contact your bank to verify the transaction</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">4.</span>
              <span>Try booking again with updated information</span>
            </li>
          </ol>
        </div>

        {/* Actions */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <Link href="/checkout" className="flex-1">
            <Button className="w-full">
              <ArrowLeft size={18} className="mr-2" />
              Try Again
            </Button>
          </Link>
          <Link href="/dashboard/support" className="flex-1">
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </Link>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          <Link href="/vehicles" className="text-primary hover:text-primary/80 font-medium">
            Continue browsing vehicles
          </Link>
        </p>
      </div>
    </div>
  );
}
