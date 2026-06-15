import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const MyBookings = () => {
  const { token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch(`${backendUrl}/api/booking/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setBookings(data.bookings);
    };
    fetchBookings();
  }, [token]);

  // kalau belum login
  if (!token) {
    navigate("/login");
    return null;
  }
  return (
    <div className=" px-6 md:px-16 py-10">
      {/* HEADER */}
      <h1 className="  text-2xl font-bold text-gray-800 mb-1">My Bookings</h1>
      <p className=" text-sm text-gray-400 mb-8">View and manage your car bookings</p>

      {/* LIST BOOKINGS */}
      <div className=" flex flex-col gap-4">
        {bookings.map((booking, index) => (
          <div key={index} className=" border border-gray-100 rounded-2xl p-5 flex flex-col md:flex-row gap-5 hover:shadow-sm transition">
            {/* FOTO MOBIL */}
            <img src={booking.car.image} alt={booking.car.brand} className=" w-full md:w-48 h-32 object-cover rounded-xl flex-shrink-0" />

            {/* INFO */}
            <div className=" flex-1 flex flex-col md:flex-row justify-between gap-4">
              {/* KIRI - detail mobil */}
              <div>
                <div className=" flex items-center gap-2 mb-1">
                  <span className=" text-xs text-gray-400">Booking #{index + 1}</span>
                  <span
                    className={` text-xs px-2 py-0.5 rounded-full font-medium
                    ${
                      booking.status === "confirmed"
                        ? " bg-green-100 text-green-600"
                        : booking.status === "completed"
                          ? " bg-blue-100 text-blue-600"
                          : booking.status === "cancelled"
                            ? " bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <h3 className=" font-semibold text-gray-800 text-lg">
                  {booking.car.brand} {booking.car.model}
                </h3>
                <p className=" text-gray-400 text-xs mb-3">
                  {booking.car.year} • {booking.car.category}
                </p>

                {/* RENTAL PERIOD */}
                <div className=" flex flex-col gap-1 text-sm text-gray-500">
                  <div className=" flex items-center gap-2">
                    <img src={assets.calendar_icon_colored} alt="" className=" w-4" />
                    <span>
                      {new Date(booking.pickupDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(booking.returnDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className=" flex items-center gap-2">
                    <img src={assets.location_icon_colored} alt="" className=" w-4" />
                    <span>Airport Terminal 1</span>
                  </div>
                  <div className=" flex items-center gap-2">
                    <img src={assets.location_icon_colored} alt="" className=" w-4" />
                    <span>Downtown Office</span>
                  </div>
                </div>
              </div>

              {/* KANAN - HARGA */}
              <div className=" text-right flex-shrink-0">
                <p className=" text-xs text-gray-400 mb-1">Total Price</p>
                <p className=" text-2xl font-bold text-primary">${booking.price}</p>
                <p className=" text-xs text-gray-400 mt-1">
                  Booked on{" "}
                  {new Date(booking.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* KALAU KOSONG */}
      {bookings.length === 0 && (
        <div className=" text-center py-20">
          <p className=" text-gray-400 mb-4">No boookings yet!</p>
          <button onClick={() => navigate("/cars")} className=" bg-primary text-white px-6 py-3 hover:opacity-90 transition rounded-full text-sm">
            Browse Cars
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
