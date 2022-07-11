import React, { useState, createContext } from 'react';

export type LoginContextType = {
  signedIn: boolean;
  signIn: () => void;
  logout: () => void;
};
export const LoginContext = createContext<LoginContextType | null>(null);
type LoginProviderProps = {
  children: React.ReactNode;
};
const LoginProvider: React.FC<LoginProviderProps> = function ({ children }) {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  function signIn() {
    const accessToken = localStorage.getItem('access_token');
    const tokenExpiration = localStorage.getItem('token_expiration');

    if (tokenExpiration) {
      if (accessToken && new Date(tokenExpiration) > new Date()) {
        if (!signedIn) {
          setSignedIn(true);
        }
      } else {
        if (signedIn) {
          setSignedIn(false);
        }
      }
    }
  }

  function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_expiration');
    setSignedIn(false);
  }

  return (
    <LoginContext.Provider value={{ signedIn, signIn, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
