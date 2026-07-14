'use client';

import { CreditCard, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const PAYMENTS = [
  { id: 1, date: '2024-07-15', booking: 'Tesla Model 3', amount: '$250', status: 'Completed', method: 'Credit Card' },
  { id: 2, date: '2024-07-10', booking: 'BMW X5', amount: '$450', status: 'Completed', method: 'Debit Card' },
  { id: 3, date: '2024-06-28', booking: 'Audi A4', amount: '$300', status: 'Completed', method: 'PayPal' },
];

const SAVED_CARDS = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
  { id: 2, type: 'Mastercard', last4: '5555', expiry: '08/26', isDefault: false },
];

export default function PaymentsPage() {
  const [showAddCard, setShowAddCard] = useState(false);

  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Payments & Billing</h1>
        <p className="text-muted-foreground">Manage your payment methods and view billing history</p>
      </div>

      {/* Saved Cards */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Payment Methods</h2>
          <Button onClick={() => setShowAddCard(true)} size="sm">
            <Plus size={18} className="mr-1" />
            Add Card
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {SAVED_CARDS.map((card) => (
            <div key={card.id} className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between mb-12">
                <p className="font-semibold">{card.type}</p>
                {card.isDefault && <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Default</span>}
              </div>
              <p className="text-lg font-mono mb-4">•••• •••• •••• {card.last4}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm opacity-75">Valid Thru</p>
                <p className="font-mono">{card.expiry}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Payment History</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Booking</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Method</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {PAYMENTS.map((payment) => (
                <tr key={payment.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 text-foreground">{payment.date}</td>
                  <td className="py-3 px-4 text-foreground">{payment.booking}</td>
                  <td className="py-3 px-4 font-semibold text-foreground">{payment.amount}</td>
                  <td className="py-3 px-4 text-foreground">{payment.method}</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" className="text-primary">
                      <Download size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-foreground mb-6">Add Payment Method</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Cardholder Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                  <input type="text" placeholder="123" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowAddCard(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowAddCard(false)}>
                Add Card
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
