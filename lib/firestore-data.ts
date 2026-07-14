import { addDoc, collection, doc, getDoc, getDocs, query, where, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { Vehicle } from './mock-data'; // Keep interface

export interface Booking {
  id?: string;
  userId: string;
  vehicleId: string;
  vehicle: string;
  from: string;
  to: string;
  status: string;
  amount: number;
  image: string;
  createdAt: string;
}


export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'vehicles'));
    const vehicles: Vehicle[] = [];
    querySnapshot.forEach((doc) => {
      vehicles.push({ id: doc.id, ...doc.data() } as Vehicle);
    });
    return vehicles;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
}

export async function getVehicleById(id: string): Promise<Vehicle | undefined> {
  try {
    const docRef = doc(db, 'vehicles', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Vehicle;
    }
  } catch (error) {
    console.error(`Error fetching vehicle ${id}:`, error);
  }
  return undefined;
}

export async function getAvailableVehicles(): Promise<Vehicle[]> {
  try {
    const q = query(collection(db, 'vehicles'), where('available', '==', true));
    const querySnapshot = await getDocs(q);
    const vehicles: Vehicle[] = [];
    querySnapshot.forEach((doc) => {
      vehicles.push({ id: doc.id, ...doc.data() } as Vehicle);
    });
    return vehicles;
  } catch (error) {
    console.error('Error fetching available vehicles:', error);
    return [];
  }
}

export async function getVehiclesByCategory(category: string): Promise<Vehicle[]> {
  try {
    const q = query(collection(db, 'vehicles'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    const vehicles: Vehicle[] = [];
    querySnapshot.forEach((doc) => {
      vehicles.push({ id: doc.id, ...doc.data() } as Vehicle);
    });
    return vehicles;
  } catch (error) {
    console.error(`Error fetching vehicles in category ${category}:`, error);
    return [];
    return [];
  }
}

export async function createBooking(booking: Booking): Promise<string | undefined> {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), booking);
    return docRef.id;
  } catch (error) {
    console.error('Error creating booking:', error);
    return undefined;
  }
}

export async function getUserBookings(userId: string): Promise<Booking[]> {
  try {
    const q = query(collection(db, 'bookings'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const bookings: Booking[] = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() } as Booking);
    });
    return bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

export function listenUserBookings(userId: string, callback: (bookings: Booking[]) => void) {
  const q = query(collection(db, 'bookings'), where('userId', '==', userId));
  return onSnapshot(q, (querySnapshot) => {
    const bookings: Booking[] = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() } as Booking);
    });
    callback(bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, (error) => {
    console.error('Error listening to bookings:', error);
    callback([]);
  });
}

export async function toggleWishlist(userId: string, vehicleId: string): Promise<boolean> {
  try {
    const q = query(collection(db, 'wishlist'), where('userId', '==', userId), where('vehicleId', '==', vehicleId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      await addDoc(collection(db, 'wishlist'), {
        userId,
        vehicleId,
        createdAt: new Date().toISOString()
      });
      return true; // Added
    } else {
      const deletePromises = querySnapshot.docs.map(docSnapshot => deleteDoc(doc(db, 'wishlist', docSnapshot.id)));
      await Promise.all(deletePromises);
      return false; // Removed
    }
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    return false;
  }
}

export async function isVehicleInWishlist(userId: string, vehicleId: string): Promise<boolean> {
  try {
    const q = query(collection(db, 'wishlist'), where('userId', '==', userId), where('vehicleId', '==', vehicleId));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    return false;
  }
}

export async function getUserWishlist(userId: string): Promise<Vehicle[]> {
  try {
    const q = query(collection(db, 'wishlist'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const vehiclePromises = querySnapshot.docs.map(async (wishlistDoc) => {
      const vId = wishlistDoc.data().vehicleId;
      return await getVehicleById(vId);
    });
    
    const vehicles = await Promise.all(vehiclePromises);
    return vehicles.filter((v): v is Vehicle => v !== undefined);
  } catch (error) {
    console.error('Error fetching user wishlist:', error);
    return [];
  }
}
