'use client';

import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Calendar, Heart, FileText, CreditCard, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_BOOKINGS = [
  { id: 1, vehicle: 'Tesla Model 3', status: 'Active', date: '2024-07-15', amount: '$250' },
  { id: 2, vehicle: 'BMW X5', status: 'Completed', date: '2024-07-10', amount: '$450' },
  { id: 3, vehicle: 'Audi A4', status: 'Upcoming', date: '2024-07-20', amount: '$300' },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { icon: Calendar, label: 'Total Bookings', value: '12', color: 'text-blue-500', bgGradient: 'from-blue-500/20 to-blue-500/5 border-blue-500/20' },
    { icon: Heart, label: 'Wishlist', value: '5', color: 'text-rose-500', bgGradient: 'from-rose-500/20 to-rose-500/5 border-rose-500/20' },
    { icon: CreditCard, label: 'Total Spent', value: '₹2,450', color: 'text-emerald-500', bgGradient: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20' },
    { icon: TrendingUp, label: 'Member Tier', value: 'Gold', color: 'text-amber-500', bgGradient: 'from-amber-500/20 to-amber-500/5 border-amber-500/20' },
  ];

  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">Here&apos;s an overview of your account activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.bgGradient} border-2 rounded-2xl p-6 transition-all hover:shadow-xl hover:scale-105 duration-300 relative overflow-hidden group`}>
            {/* Decorative background blob */}
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/40 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none mix-blend-overlay"></div>
            
            <div className={`w-14 h-14 rounded-xl bg-background/80 backdrop-blur-md shadow-sm border border-border/50 flex items-center justify-center mb-4 relative z-10`}>
              <stat.icon size={26} className={stat.color} />
            </div>
            <p className="text-muted-foreground text-sm mb-2 font-medium relative z-10">{stat.label}</p>
            <p className="text-3xl font-extrabold text-foreground relative z-10">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
          <AlertCircle className="w-6 h-6 text-primary mb-3" />
          <h3 className="font-semibold text-foreground mb-2">Verify Your License</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload your driver&apos;s license to unlock premium features
          </p>
          <Link href="/dashboard/documents">
            <Button variant="outline" size="sm">Upload Now</Button>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Rent a Vehicle</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Browse our collection of premium vehicles
          </p>
          <Link href="/vehicles">
            <Button size="sm" className="w-full">Start Renting</Button>
          </Link>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Recent Bookings</h2>
          <Link href="/dashboard/bookings" className="text-primary hover:text-primary/80 text-sm font-medium">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Vehicle</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BOOKINGS.map((booking) => (
                <tr key={booking.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 text-foreground">{booking.vehicle}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'Active' ? 'bg-green-100 text-green-700' :
                      booking.status === 'Completed' ? 'bg-gray-100 text-gray-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-foreground">{booking.date}</td>
                  <td className="py-3 px-4 font-semibold text-foreground">{booking.amount}</td>
                  <td className="py-3 px-4">
                    <Link href={`/dashboard/bookings/${booking.id}`} className="text-primary hover:text-primary/80 font-medium">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
