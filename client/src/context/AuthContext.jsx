import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(false);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (inputs) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const res = await axios.post(`${backendURL}/api/auth/login`, inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
