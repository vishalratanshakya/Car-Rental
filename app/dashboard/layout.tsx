'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Calendar, 
  Heart, 
  FileText, 
  CreditCard, 
  Bell, 
  Settings, 
  HelpCircle,
  LogOut,
  Menu,
  X,
  BarChart3,
  Users,
  Zap
} from 'lucide-react';

const USER_NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Calendar, label: 'My Bookings', href: '/dashboard/bookings' },
  { icon: Heart, label: 'Wishlist', href: '/dashboard/wishlist' },
  { icon: FileText, label: 'Documents', href: '/dashboard/documents' },
  { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  { icon: HelpCircle, label: 'Support', href: '/dashboard/support' },
];

const ADMIN_NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Zap, label: 'Vehicles', href: '/admin/vehicles' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: Calendar, label: 'Bookings', href: '/admin/bookings' },
  { icon: FileText, label: 'Documents', href: '/admin/documents' },
  { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
  { icon: BarChart3, label: 'Reports', href: '/admin/reports' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const isAdmin = user.role === 'admin';
  const navItems = isAdmin ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="flex h-screen bg-background print:h-auto">
      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static w-64 h-screen bg-card border-r border-border overflow-y-auto transition-transform duration-300 z-40 print:hidden`}>
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-primary">DriveHub</h1>
          <p className="text-xs text-muted-foreground mt-1">{isAdmin ? 'Admin Panel' : 'User Portal'}</p>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && item.href !== '/admin/dashboard' && pathname.startsWith(item.href + '/'));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <div className={`mr-3 transition-colors ${isActive ? 'text-white' : 'text-muted-foreground group-hover:text-primary'}`}>
                  <item.icon size={20} />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && <div className="ml-auto w-1 h-6 bg-white rounded-full" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-border p-4 bg-card">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">{user.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors text-sm font-medium"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden print:overflow-visible">
        {/* Top Navigation */}
        <header className="bg-card border-b border-border p-4 flex items-center justify-between print:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto print:overflow-visible">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
