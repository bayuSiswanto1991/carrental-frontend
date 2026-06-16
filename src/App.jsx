import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import OwnerDashboard from "./pages/OwnerDashboard";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className=" min-h-screen bg-white text-gray-800">
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/add-car" element={<OwnerDashboard />} />
        <Route path="/owner/manage-cars" element={<OwnerDashboard />} />
        <Route path="/owner/manage-bookings" element={<OwnerDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
