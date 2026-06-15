import React from "react";
import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);

  // fetch semua cars
  const fetchCars = async () => {
    const res = await fetch(`${backendUrl}/api/cars`);
    const data = await res.json();
    if (data.success) setCars(data.cars);
  };

  // fetch user profile
  const fetchUsers = async () => {
    const res = await fetch(`${backendUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (data.success) setUser(data.user);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const value = {
    backendUrl,
    currency,
    token,
    setToken,
    user,
    setUser,
    cars,
    fetchCars,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
