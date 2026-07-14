'use client';

import Link from 'next/link';
import { Heart, Star, MapPin, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { getUserWishlist, toggleWishlist } from '@/lib/firestore-data';
import { Vehicle } from '@/lib/mock-data';
import { useEffect, useState } from 'react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export default function WishlistPage() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    async function fetchWishlist() {
      if (user) {
        const vehicles = await getUserWishlist(user.id);
        setWishlist(vehicles);
      }
      setIsLoading(false);
    }
    fetchWishlist();
  }, [user]);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const removeFromWishlist = async (id: string, itemName: string) => {
    if (!user) return;
    await toggleWishlist(user.id, id);
    setWishlist(wishlist.filter(item => item.id !== id));
    addToast(`Removed ${itemName} from wishlist`, 'success');
  };

  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-in fade-in slide-in-from-top-4 ${
              toast.type === 'success'
                ? 'bg-emerald-500 text-white'
                : 'bg-destructive text-destructive-foreground'
            }`}
          >
            {toast.type === 'success' ? <Check size={20} /> : <X size={20} />}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">Your saved favorite vehicles</p>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
                <button 
                  onClick={() => removeFromWishlist(item.id, item.name)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform cursor-pointer"
                >
                  <Heart size={20} className="fill-red-500 text-red-500" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-foreground">{item.rating || 4.5}</span>
                      <span className="text-muted-foreground text-sm">({item.reviews || 10} reviews)</span>
                    </div>
                    <p className="font-bold text-primary">${item.price}/day</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/vehicles/${item.id}`} className="flex-1">
                    <Button size="sm" className="w-full">Book Now</Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromWishlist(item.id, item.name)}
                    className="px-3 text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart size={48} className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Wishlist is empty</h3>
          <p className="text-muted-foreground mb-6">Browse vehicles to add them to your wishlist</p>
          <Link href="/vehicles">
            <Button>Browse Vehicles</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
