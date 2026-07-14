'use client';

import { Users, Mail, Phone, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CUSTOMERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1-555-0101', bookings: 12, status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1-555-0102', bookings: 8, status: 'Active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', phone: '+1-555-0103', bookings: 5, status: 'Inactive' },
];

export default function AdminCustomersPage() {
  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Customers</h1>
        <p className="text-muted-foreground">Manage user accounts</p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-4 px-6 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-4 px-6 font-medium text-muted-foreground">Email</th>
                <th className="text-left py-4 px-6 font-medium text-muted-foreground">Phone</th>
                <th className="text-left py-4 px-6 font-medium text-muted-foreground">Bookings</th>
                <th className="text-left py-4 px-6 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-4 px-6 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((customer) => (
                <tr key={customer.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-foreground">{customer.name}</td>
                  <td className="py-4 px-6 text-foreground flex items-center gap-2">
                    <Mail size={16} className="text-muted-foreground" />
                    {customer.email}
                  </td>
                  <td className="py-4 px-6 text-foreground flex items-center gap-2">
                    <Phone size={16} className="text-muted-foreground" />
                    {customer.phone}
                  </td>
                  <td className="py-4 px-6 text-foreground">{customer.bookings}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Link href={`/admin/customers/${customer.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
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
