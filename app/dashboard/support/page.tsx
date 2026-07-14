'use client';

import { MessageCircle, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'How do I cancel my booking?',
    answer: 'You can cancel your booking from the dashboard under "My Bookings". Click on the booking and select "Cancel Booking". Cancellations made 24 hours before pickup are eligible for a full refund.'
  },
  {
    id: 2,
    question: 'What documents do I need to provide?',
    answer: 'You need to provide a valid driver\'s license and a government-issued ID. We may also require proof of insurance depending on the vehicle and rental duration.'
  },
  {
    id: 3,
    question: 'Can I modify my booking?',
    answer: 'Yes, you can modify your booking by contacting our support team or through the dashboard. Please note that modifications may incur additional charges.'
  },
  {
    id: 4,
    question: 'What is your refund policy?',
    answer: 'We offer full refunds for cancellations made 24 hours before pickup. Cancellations made less than 24 hours before pickup will incur a cancellation fee.'
  },
];

export default function SupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Support Center</h1>
        <p className="text-muted-foreground">Get help with your account and bookings</p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="text-primary" size={24} />
          </div>
          <h3 className="font-bold text-foreground mb-2">Live Chat</h3>
          <p className="text-sm text-muted-foreground mb-4">Available 24/7</p>
          <Button variant="outline" size="sm">Start Chat</Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Mail className="text-primary" size={24} />
          </div>
          <h3 className="font-bold text-foreground mb-2">Email</h3>
          <p className="text-sm text-muted-foreground mb-4">support@drivehub.com</p>
          <Button variant="outline" size="sm" onClick={() => setShowContactForm(true)}>Send Email</Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Phone className="text-primary" size={24} />
          </div>
          <h3 className="font-bold text-foreground mb-2">Phone</h3>
          <p className="text-sm text-muted-foreground mb-4">+1-800-DRIVE-HUB</p>
          <Button variant="outline" size="sm">Call Us</Button>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
              >
                <span className="font-medium text-foreground">{item.question}</span>
                <span className={`transition-transform ${expandedFaq === item.id ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {expandedFaq === item.id && (
                <div className="px-6 pb-6 border-t border-border text-muted-foreground">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-foreground mb-6">Send us a Message</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us more..."
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowContactForm(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowContactForm(false)}>
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
