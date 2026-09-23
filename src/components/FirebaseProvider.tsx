import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { AdminUser } from '../types';

interface FirebaseContextType {
  user: User | null;
  adminUser: AdminUser | null;
  loading: boolean;
  initialized: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  adminUser: null,
  loading: true,
  initialized: false
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Check if this user is an admin in Firestore
        try {
          const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid));
          if (adminDoc.exists()) {
            setAdminUser(adminDoc.data() as AdminUser);
          } else {
            setAdminUser(null);
          }
        } catch (error) {
          console.error("Error fetching admin status:", error);
          setAdminUser(null);
        }
      } else {
        setAdminUser(null);
      }
      
      setLoading(false);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, adminUser, loading, initialized }}>
      {children}
    </FirebaseContext.Provider>
  );
};
