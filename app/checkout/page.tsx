'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CreditCard, MapPin, Calendar, Users, ArrowLeft, Download } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { createBooking } from '@/lib/firestore-data';

interface BookingData {
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  vehicleType: string;
  price: number;
  pickupDate: string;
  returnDate: string;
  duration: number;
  totalPrice: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [gst, setGst] = useState(0);
  const [securityDeposit] = useState(500);

  useEffect(() => {
    // Load booking data from sessionStorage
    const data = sessionStorage.getItem('bookingData');
    if (data) {
      const parsed = JSON.parse(data);
      setBookingData(parsed);
      // Calculate GST (18%)
      const gstAmount = Math.round((parsed.totalPrice * 18) / 100);
      setGst(gstAmount);
      setIsLoading(false);
    } else {
      router.replace('/vehicles');
    }
  }, [router]);

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', desc: 'Visa, Mastercard, etc.' },
    { id: 'upi', label: 'UPI', desc: 'Google Pay, PhonePe, etc.' },
    { id: 'netbanking', label: 'Net Banking', desc: 'All major banks' },
    { id: 'wallet', label: 'Wallet', desc: 'Paytm, Amazon Pay, etc.' },
    { id: 'cod', label: 'Cash on Delivery', desc: 'Pay at pickup' },
  ];

  const handleCheckout = async () => {
    if (!bookingData || !user) return;
    setIsProcessing(true);
    
    const finalTotal = bookingData.totalPrice + gst + securityDeposit;
    
    await createBooking({
      userId: user.id,
      vehicleId: bookingData.vehicleId,
      vehicle: bookingData.vehicleName,
      from: bookingData.pickupDate,
      to: bookingData.returnDate,
      status: 'Upcoming',
      amount: finalTotal,
      image: bookingData.vehicleImage,
      createdAt: new Date().toISOString()
    });

    sessionStorage.removeItem('bookingData');
    router.push('/dashboard/bookings');
  };

  if (isLoading || !bookingData) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Redirecting...</h1>
          <p className="text-muted-foreground">Taking you back to vehicles...</p>
        </div>
      </div>
    );
  }

  const finalTotal = bookingData.totalPrice + gst + securityDeposit;

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/vehicles" className="flex items-center text-primary hover:text-primary/80 mb-8 font-medium">
          <ArrowLeft size={20} className="mr-2" />
          Continue Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-6">Booking Summary</h1>

              {/* Vehicle Info */}
              <div className="border-b border-border pb-6 mb-6">
                <h2 className="font-semibold text-foreground mb-4">Selected Vehicle</h2>
                <div className="flex gap-4">
                  <img
                    src={bookingData.vehicleImage}
                    alt={bookingData.vehicleName}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{bookingData.vehicleName}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{bookingData.vehicleType} • 5 Passengers</p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar size={16} /> {bookingData.duration} days</span>
                      <span className="flex items-center gap-1"><MapPin size={16} /> India</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="border-b border-border pb-6 mb-6">
                <h2 className="font-semibold text-foreground mb-4">Rental Details</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pickup Date</span>
                    <span className="text-foreground font-medium">{bookingData.pickupDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Return Date</span>
                    <span className="text-foreground font-medium">{bookingData.returnDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="text-foreground font-medium">{bookingData.duration} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily Rate</span>
                    <span className="text-foreground font-medium">₹{Math.round(bookingData.price * 20)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="font-semibold text-foreground mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label key={method.id} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:bg-muted/50'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4"
                      />
                      <CreditCard size={20} className="ml-3 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{method.label}</p>
                        <p className="text-sm text-muted-foreground">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              <h2 className="font-bold text-foreground mb-6">Price Breakdown</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{bookingData.duration} days × ₹{Math.round(bookingData.price * 20)}/day</span>
                  <span className="text-foreground font-medium">₹{bookingData.totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="text-foreground font-medium">₹{gst}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Security Deposit</span>
                  <span className="text-foreground font-medium">₹{securityDeposit}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-primary">₹{finalTotal}</span>
              </div>

              <Button onClick={handleCheckout} disabled={isProcessing} className="w-full">
                {isProcessing ? 'Processing...' : 'Complete Booking'}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                You will not be charged until the booking is confirmed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
