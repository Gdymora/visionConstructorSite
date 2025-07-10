import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  authToken: string | null;
  setAuthToken: (token: string) => void;
  clearAuthToken: () => void;
}

// Create a context with an initial value of undefined to signify that it may not be available
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthTokenState] = useState<string | null>(localStorage.getItem('token'));

  const setAuthToken = (token: string) => {
    localStorage.setItem('token', token);
    setAuthTokenState(token);
  };

  const clearAuthToken = () => {
    localStorage.removeItem('token');
    setAuthTokenState(null);
  };

  return ( 
    <AuthContext.Provider value={{ authToken, setAuthToken, clearAuthToken }} >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
