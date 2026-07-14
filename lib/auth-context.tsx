'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile as updateFirebaseAuthProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  avatar?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch custom user profile from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        } else {
          // Fallback if firestore document is missing
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'User',
            email: firebaseUser.email || '',
            phone: '',
            role: 'user',
            avatar: firebaseUser.photoURL || '',
            verified: false
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    await updateFirebaseAuthProfile(userCredential.user, {
      displayName: name,
    });

    const newUser: User = {
      id: userCredential.user.uid,
      name,
      email,
      phone,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      verified: false,
    };

    // Save to Firestore
    await setDoc(doc(db, 'users', newUser.id), newUser);
    setUser(newUser);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      await updateDoc(doc(db, 'users', user.id), updates);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
