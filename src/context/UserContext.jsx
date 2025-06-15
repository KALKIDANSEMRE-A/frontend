import React, { createContext, useState, useEffect, useContext } from "react";

// Create the UserContext
export const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data and token from localStorage on initial render
  useEffect(() => {
    const loadAuthDataFromStorage = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("authToken"); // Check for the auth token as well

        if (storedUser && storedToken) {
          // Only set user if both user data and token exist
          setUser(JSON.parse(storedUser));
        } else {
          // If user data or token is missing, clear both to ensure a clean state
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error("Error loading auth data from storage:", error);
        // Ensure a clean state on error
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    loadAuthDataFromStorage();
  }, []);

  // Login function
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (token) {
      localStorage.setItem("authToken", token); // Store the token
    } else {
      // If no token is provided during login, it's an inconsistent state, so clear to be safe.
      localStorage.removeItem("authToken");
      console.warn("Login function called without a token.");
    }
  };
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  // Provide user data and authentication functions
  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
