import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Check if user info is in local storage when the app loads
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const login = (userData) => {
    // Save user info to state and local storage
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUserInfo(userData);
  };

  const logout = () => {
    // Clear user info from state and local storage
    localStorage.removeItem('userInfo');
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};