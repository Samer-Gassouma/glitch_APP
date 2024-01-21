import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();

import { getUser } from './services/userService';



export const AuthProvider =  ({ children }) => {


  const [user, setUser] = useState(getUser());

  

  const login = (userData) => {
    // Perform login logic and set user data
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
