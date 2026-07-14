'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending message
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help. Reach out to our team below.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-foreground">Phone</h3>
                    <p className="mt-1 text-muted-foreground">Mon-Fri from 8am to 8pm.</p>
                    <p className="mt-2 text-primary font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-foreground">Email</h3>
                    <p className="mt-1 text-muted-foreground">Our friendly team is here to help.</p>
                    <p className="mt-2 text-primary font-medium">support@vehiclehub.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-foreground">Office</h3>
                    <p className="mt-1 text-muted-foreground">Come say hello at our headquarters.</p>
                    <p className="mt-2 text-foreground font-medium">100 Mobility Way, San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>
              
              {submitted ? (
                <div className="bg-green-500/10 border border-green-500/20 text-green-600 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p>Thanks for reaching out. We will get back to you shortly.</p>
                  <Button 
                    className="mt-6" 
                    variant="outline" 
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full py-6 text-lg">
                    Send Message
                  </Button>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
