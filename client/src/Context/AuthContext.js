import React, { createContext, useEffect, useState } from "react";
import { isAuthenticated as chechAuth } from "../Service/AccountService";

export const AuthContext = createContext();

const Auth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    chechAuth().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);
  return (
    <div>
      {!isLoaded ? (
        <p>Loading....</p>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};

export default Auth;
