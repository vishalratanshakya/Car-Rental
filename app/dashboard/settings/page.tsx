'use client';

import { useAuth } from '@/lib/auth-context';
import { User, Lock, Bell, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function SettingsPage() {
  const { user, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');

  const handleSaveProfile = () => {
    if (user) {
      updateProfile({
        name: editName,
        email: editEmail,
        phone: editPhone,
      });
    }
  };

  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'security', label: 'Security', icon: Lock },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'privacy', label: 'Privacy', icon: Shield },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon size={18} className="mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">Personal Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              <Button onClick={handleSaveProfile} className="w-full">
                Save Changes
              </Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Account Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2">
                <span className="text-foreground">Verification Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user?.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {user?.verified ? 'Verified' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-foreground">Member Since</span>
                <span className="text-muted-foreground">Jan 15, 2024</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              <Button className="w-full">Update Password</Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Two-Factor Authentication</h3>
            <p className="text-muted-foreground mb-4">Add an extra layer of security to your account</p>
            <Button variant="outline" className="w-full">Enable 2FA</Button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-6">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { id: 1, name: 'Booking Confirmations', description: 'Receive notifications when your bookings are confirmed' },
              { id: 2, name: 'Payment Reminders', description: 'Get reminded about upcoming payments' },
              { id: 3, name: 'Promotional Offers', description: 'Receive special deals and promotional offers' },
              { id: 4, name: 'Service Updates', description: 'Be notified about service updates and maintenance' },
            ].map((notification) => (
              <div key={notification.id} className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
                <div>
                  <p className="font-medium text-foreground">{notification.name}</p>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy Tab */}
      {activeTab === 'privacy' && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-6">Privacy Settings</h3>
          <div className="space-y-4">
            {[
              { id: 1, name: 'Profile Visibility', description: 'Make your profile visible to other users' },
              { id: 2, name: 'Show Booking History', description: 'Allow others to see your booking history' },
              { id: 3, name: 'Data Collection', description: 'Allow us to collect usage analytics' },
            ].map((setting) => (
              <div key={setting.id} className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
                <div>
                  <p className="font-medium text-foreground">{setting.name}</p>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
