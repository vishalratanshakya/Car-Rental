'use client';

import { BarChart3, Users, Calendar, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const STATS = [
  { label: 'Total Bookings', value: '1,234', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
  { label: 'Active Users', value: '5,678', icon: Users, color: 'bg-green-100 text-green-600' },
  { label: 'Revenue', value: '$45,230', icon: DollarSign, color: 'bg-purple-100 text-purple-600' },
  { label: 'Growth', value: '+12.5%', icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your platform and monitor key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STATS.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
          <AlertCircle className="w-6 h-6 text-primary mb-3" />
          <h3 className="font-semibold text-foreground mb-2">Pending Approvals</h3>
          <p className="text-sm text-muted-foreground mb-4">
            3 documents and 2 users waiting for verification
          </p>
          <Link href="/admin/documents">
            <Button variant="outline" size="sm">Review Now</Button>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <BarChart3 className="w-6 h-6 text-primary mb-3" />
          <h3 className="font-semibold text-foreground mb-2">View Reports</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Check detailed analytics and performance metrics
          </p>
          <Link href="/admin/reports">
            <Button size="sm">View Reports</Button>
          </Link>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-primary hover:text-primary/80 text-sm font-medium">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Booking ID</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Vehicle</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 text-foreground">BK-2024-{i.toString().padStart(4, '0')}</td>
                  <td className="py-3 px-4 text-foreground">Customer {i}</td>
                  <td className="py-3 px-4 text-foreground">Vehicle {i}</td>
                  <td className="py-3 px-4 font-semibold text-foreground">${(i * 100).toFixed(0)}</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
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
