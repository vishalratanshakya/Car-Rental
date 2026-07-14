'use client';

import Link from 'next/link';

export default function AdminBookingsPage() {
  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-2">Bookings Management</h1>
      <p className="text-muted-foreground mb-8">View and manage all customer bookings</p>
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">Booking list coming soon</p>
        <Link href="/admin/dashboard" className="text-primary hover:text-primary/80 mt-4 inline-block">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
