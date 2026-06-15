import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, backendUrl } = useContext(AppContext);

  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // fetch car dari backend
  useEffect(() => {
    const fetchCar = async () => {
      const res = await fetch(`${backendUrl}/api/cars/${id}`);
      const data = await res.json();
      if (data.success) setCar(data.car);
    };
    fetchCar();
  }, [id]);

  // kalau tidak ketemu
  if (!car) return <div className=" text-sm py-20 text-gray-400">Car not found</div>;

  // hitung total harga dan hari
  const totalDays = pickupDate && returnDate ? Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)) : 0;

  const totalPrice = totalDays * car.pricePerDay;

  const handleBooking = async () => {
    if (!token) return navigate("/login");

    if (!pickupDate || !returnDate) {
      return toast.error("Pilih tanggal pickup dan return dulu!");
    }

    if (totalDays <= 0) {
      return toast.error("Return date harus setelah pickup date!");
    }

    const res = await fetch(`${backendUrl}/api/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        carId: car._id,
        pickupDate,
        returnDate,
        pickupLocation: car.location,
        returnLocation: car.location,
      }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Booking berhasil! 🎉");
      navigate("/my-bookings");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className=" px-6 md:px-16 py-10">
      {/* BACK */}
      <button onClick={() => navigate("/cars")} className=" text-sm text-gray-500 flex gap-2 items-center hover:text-primary transition">
        ← Back to all cars
      </button>

      <div className=" flex flex-col md:flex-row gap-8">
        {/* KIRI - foto dan info*/}
        <div className=" flex-1">
          <img src={car.image} alt={car.brand} className=" w-full rounded-xl object-cover max-h-80" />

          {/* NAMA */}
          <h1 className=" text-2xl font-bold text-gray-800 mt-6">
            {car.brand} {car.model}
          </h1>
          <p className=" text-gray-400 text-sm mt-1">
            {car.year} {car.category}
          </p>

          {/* SPEC */}
          <div className=" grid grid-cols-4 gap-4 mt-6">
            <div className=" bg-[#F3F4F6] flex flex-col items-center gap-2 border border-gray-100 rounded-xl p-3">
              <img src={assets.users_icon} alt="" className=" w-5" />
              <p className=" text-sm text-gray-900 font-medium">{car.seating_capacity}</p>
            </div>
            <div className=" bg-[#F3F4F6] flex flex-col items-center gap-2 border border-gray-100 rounded-xl p-3">
              <img src={assets.fuel_icon} alt="" className=" w-5" />
              <p className=" text-sm text-gray-900 font-medium">{car.fuel_type}</p>
            </div>
            <div className=" bg-[#F3F4F6] flex flex-col items-center gap-2 border border-gray-100 rounded-xl p-3">
              <img src={assets.car_icon} alt="" className=" w-5" />
              <p className=" text-sm text-gray-900 font-medium">{car.transmission}</p>
            </div>
            <div className=" bg-[#F3F4F6] flex flex-col items-center gap-2 border border-gray-100 rounded-xl p-3">
              <img src={assets.location_icon} alt="" className=" w-5" />
              <p className=" text-sm text-gray-900 font-medium">{car.location}</p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className=" mt-6">
            <h3 className=" font-semibold text-gray-800 mb-2">Description</h3>
            <p className=" text-sm text-gray-500 leading-relaxed">{car.description}</p>
          </div>

          {/* FEATURES */}
          {car.features && car.features.length > 0 && (
            <div className=" mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">Features</h3>
              <div className=" grid grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <div key={index} className=" flex items-center gap-2 text-sm text-gray-600">
                    <img src={assets.check_icon} alt="" className=" w-4" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* KANAN - Booking Form */}
        <div className=" w-full md:w-80 flex-shrink-0">
          <div className=" border border-gray-100 rounded-xl p-6 shadow-sm sticky top-24 ">
            {/* HARGA */}
            <div className=" flex items-center justify-between mb-6">
              <span className=" text-3xl font-bold text-gray-800">${car.pricePerDay}</span>
              <span className=" text-sm text-gray-400 ml-1 ">per day</span>
            </div>

            {/* PICKUP DATE */}
            <div className=" mb-4">
              <label className=" text-sm text-gray-600 mb-1 block">Pickup Date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className=" w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* RETURN DATE */}
            <div className=" mb-4">
              <label className=" text-sm text-gray-600 mb-1 block">Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className=" w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* TOTAL HARGA */}
            {totalDays > 0 && (
              <div className=" bg-gray-50 rounded-lg p-3 mb-4 text-sm">
                <div className=" flex text-gray-600 justify-between">
                  <span>
                    ${car.pricePerDay} x {totalDays} days
                  </span>
                  <span className=" font-semibold">${totalPrice}</span>
                </div>
              </div>
            )}

            {/* BOOK NOW */}
            <button onClick={handleBooking} className=" text-white text-sm bg-primary rounded-lg hover:opacity-90 font-medium transition py-3 w-full">
              Book Now
            </button>

            <p className=" text-xs mt-3 text-gray-400 text-center">No credit card required to reserve</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
