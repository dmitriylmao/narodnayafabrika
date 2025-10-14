
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdmin(user); 
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); 

  return (
    <AuthContext.Provider value={{ admin, loading }}>
      
      {loading ? <div>Загрузка аутентификации...</div> : children}
    </AuthContext.Provider>
  );
};