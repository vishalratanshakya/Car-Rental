'use client';

import { Bell, Check, Trash2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Booking Confirmed',
    message: 'Your Tesla Model 3 booking has been confirmed. Pickup is on July 15th at 10:00 AM.',
    date: '2024-07-12',
    read: false,
    type: 'booking',
  },
  {
    id: 2,
    title: 'Payment Received',
    message: 'We have received your payment of $250 for booking BK-2024-001.',
    date: '2024-07-11',
    read: true,
    type: 'payment',
  },
  {
    id: 3,
    title: 'Vehicle Ready for Pickup',
    message: 'Your Tesla Model 3 is ready for pickup. Please arrive 15 minutes early.',
    date: '2024-07-10',
    read: true,
    type: 'booking',
  },
  {
    id: 4,
    title: 'Promotion Available',
    message: 'Special 20% discount on luxury vehicles this weekend only!',
    date: '2024-07-09',
    read: true,
    type: 'promotion',
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
          <p className="text-muted-foreground">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllAsRead}>
          <Check size={16} className="mr-1" />
          Mark All as Read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`border rounded-lg p-4 transition-colors ${
                notification.read
                  ? 'border-border bg-background'
                  : 'border-primary bg-primary/5'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                  notification.read ? 'bg-muted' : 'bg-primary'
                }`} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{notification.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.date}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground whitespace-nowrap flex-shrink-0">
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="text-primary hover:bg-primary/10"
                    >
                      <Check size={16} />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNotification(notification.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Bell size={48} className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">All caught up!</h3>
            <p className="text-muted-foreground">You don&apos;t have any notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
