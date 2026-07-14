'use client';

import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';

const VEHICLES = [
  { id: 1, name: 'Tesla Model 3', category: 'Luxury', pricePerDay: '$85', available: 12, status: 'Active' },
  { id: 2, name: 'BMW X5', category: 'Premium', pricePerDay: '$120', available: 5, status: 'Active' },
  { id: 3, name: 'Toyota Corolla', category: 'Economy', pricePerDay: '$45', available: 8, status: 'Active' },
  { id: 4, name: 'Audi A4', category: 'Luxury', pricePerDay: '$95', available: 0, status: 'Inactive' },
];

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState(VEHICLES);
  const [showAddModal, setShowAddModal] = useState(false);

  const deleteVehicle = (id: number) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
    <div className="p-4 md:p-8 w-full mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Vehicles</h1>
          <p className="text-muted-foreground">Manage vehicle inventory</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={18} className="mr-2" />
          Add Vehicle
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-4 px-6 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-4 px-6 font-medium text-muted-foreground">Category</th>
                <th className="text-left py-4 px-6 font-medium text-muted-foreground">Price/Day</th>
                <th className="text-left py-4 px-6 font-medium text-muted-foreground">Available</th>
                <th className="text-left py-4 px-6 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-4 px-6 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-foreground">{vehicle.name}</td>
                  <td className="py-4 px-6 text-foreground">{vehicle.category}</td>
                  <td className="py-4 px-6 font-semibold text-foreground">{vehicle.pricePerDay}</td>
                  <td className="py-4 px-6 text-foreground">{vehicle.available} units</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      vehicle.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <Link href={`/admin/vehicles/${vehicle.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye size={16} />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => deleteVehicle(vehicle.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-foreground mb-6">Add New Vehicle</h3>
            <div className="space-y-4 mb-6">
              <input placeholder="Vehicle Name" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground" />
              <input placeholder="Category" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground" />
              <input placeholder="Price per Day" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground" />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowAddModal(false)}>
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
