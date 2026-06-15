import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets, ownerMenuLinks } from "../assets/assets";
import toast from "react-hot-toast";

const OwnerDashboard = () => {
  const { user, token } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
    return null;
  }

  // konten berdasarkan URL
  const renderContent = () => {
    switch (location.pathname) {
      case "/owner":
        return <Dashboard />;
      case "/owner/add-car":
        return <AddCar />;
      case "/owner/manage-cars":
        return <ManageCars />;
      case "/owner/manage-bookings":
        return <ManageBookings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className=" flex min-h-screen">
      {/* SIDEBAR */}
      <div className=" w-56 border-r border-gray-100 flex-shrink-0 flex flex-col ">
        {/* PROFILE */}
        <div className=" flex flex-col items-center py-8 border-b border-gray-100">
          <img src={user?.image || assets.user_profile} alt="" className=" w-14 h-14 rounded-full object-cover border border-gray-200" />
          <p className=" text-sm font-medium text-gray-800 mt-2">{user?.name || "Owner"}</p>
        </div>

        {/* MENU */}
        <ul className=" flex flex-col mt-2">
          {ownerMenuLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => ` flex items-center gap-3 px-6 py-3 text-sm transition-all
            ${isActive ? " bg-primary/10 border-r-2 border-primary font-medium" : "text-gray-500 hover:bg-gray-50"}`}
            >
              <img src={location.pathname === link.path ? link.coloredIcon : link.icon} alt="" className=" w-5" />
              {link.name}
            </NavLink>
          ))}
        </ul>
      </div>

      {/* CONTENT */}
      <div className=" flex-1 p-8">{renderContent()}</div>
    </div>
  );
};

// ─────────────────────────────────────
// DASHBOAR CONTENT
// ─────────────────────────────────────
const Dashboard = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await fetch(`${backendUrl}/api/owner/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) setData(result.dashData);
    };
    fetchDashboard();
  }, [token]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1 className=" text-2xl font-bold text-gray-800 mb-1">Admin Dashboard</h1>
      <p className=" text-gray-400 text-sm mb-6">Monitor overall platform performance including total cars, bookings, revenue, and recent activities</p>

      {/* STAT CARDS */}
      <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className=" border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className=" text-xs text-gray-400">Total Cars</p>
            <p className=" text-2xl font-bold text-gray-800">{data.totalCars}</p>
          </div>
          <img src={assets.carIconColored} alt="" className=" w-10 opacity-80" />
        </div>
        <div className=" border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className=" text-xs text-gray-400">Total Bookings</p>
            <p className=" text-2xl font-bold text-gray-800">{data.totalBookings}</p>
          </div>
          <img src={assets.listIconColored} alt="" className=" w-10 opacity-80" />
        </div>

        <div className=" border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className=" text-xs text-gray-400">Pending Bookings</p>
            <p className=" text-2xl font-bold text-gray-800">{data.pendingBookings}</p>
          </div>
          <img src={assets.cautionIconColored} alt="" className=" w-10 opacity-80" />
        </div>
        <div className=" border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className=" text-xs text-gray-400">Completed Bookings</p>
            <p className=" text-2xl font-bold text-gray-800">{data.completedBookings}</p>
          </div>
          <img src={assets.listIconColored} alt="" className=" w-10 opacity-80" />
        </div>
      </div>

      {/* RECENT BOOKINGS + REVENUE */}
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RECENT BOOKINGS */}
        <div className=" border border-gray-200 rounded-xl p-5">
          <h2 className=" font-semibold text-gray-800 mb-1 ">Recent Bookings</h2>
          <p className=" text-gray-400 text-xs mb-4">Latest customer bookings</p>
          <div className=" flex flex-col gap-4">
            {data.recentBookings.map((booking, index) => (
              <div key={index} className=" flex items-center justify-between">
                <div className=" flex items-center gap-3">
                  <div className=" flex items-center justify-center bg-primary/10 w-8 h-8 rounded-full">
                    <img src={assets.listIconColored} alt="" className=" w-5" />
                  </div>
                  <div>
                    <p className=" text-sm font-medium">
                      {booking.car.brand} {booking.car.model}
                    </p>
                    <p className=" text-xs text-gray-400">{new Date(booking.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className=" text-right flex items-center gap-2">
                  <p className=" text-sm font-semibold text-gray-400">${booking.price}</p>
                  <p
                    className={` text-xs rounded-full px-2 py-0.5 rounded-full
                    ${booking.status === "confirmed" ? "bg-green-100 text-green-600" : booking.status === "completed" ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-600"}`}
                  >
                    {booking.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* MONTHLY REVENUE */}
        <div className=" border border-gray-200 rounded-xl p-5">
          <h2 className=" font-semibold text-gray-800 mb-1 ">Monthly Revenue</h2>
          <p className=" text-gray-400 text-xs mb-4">Revenue for current month</p>
          <p className=" text-4xl font-bold text-primary">${data.monthlyRevenue}</p>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────
// MANAGE CARS CONTENT
// ─────────────────────────────────────
const ManageCars = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, [token]);

  const fetchCars = async () => {
    const res = await fetch(`${backendUrl}/api/owner/cars`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setCars(data.cars);
    }
  };

  // ✅ Toggle Available
  const handleTogle = async (carId) => {
    const res = await fetch(`${backendUrl}/api/owner/car/${carId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Status mobil berhasil diubah! ✅");
      fetchCars();
    }
  };

  // ✅ Delete Car
  const handleDelete = async (carId) => {
    if (!confirm("Yakin hapus mobil ini?")) return;
    const res = await fetch(`${backendUrl}/api/owner/car/${carId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Mobil berhasil dihapus! 🗑️");
      fetchCars();
    }
  };
  return (
    <div>
      <h1 className=" text-2xl font-bold text-gray-800 mb-1">Manage Cars</h1>
      <p className=" text-gray-400 text-sm mb-6">View all listed cars, update their details, or remove them from the booking platform.</p>

      {/* TABLE */}
      <div className=" border border-gray-100 rounded-xl overflow-hidden ">
        {/* HEADER */}
        <div className=" grid grid-cols-5 bg-gray-50 px-4 py-3 text-xs text-gray-400 font-medium">
          <span className=" col-span-2">Car</span>
          <span> Category</span>
          <span>Price</span>
          <span>Status</span>
        </div>

        {/* ROWS */}
        {cars.map((car, index) => (
          <div key={index} className=" grid grid-cols-5 px-4 py-3 border-t border-gray-100 items-center">
            {/* CAR INFO */}
            <div className=" flex items-center gap-2 col-span-2">
              <img src={car.image} alt="" className=" w-14 h-10 object-cover rounded-lg" />
              <div>
                <p className=" text-sm font-medium text-gray-800">
                  {car.brand} {car.model}
                </p>
                <p className=" text-xs text-gray-400">
                  {car.seating_capacity} seats • {car.transmission}
                </p>
              </div>
            </div>

            {/* CATEGORY */}
            <span className=" text-sm text-gray-600">{car.category}</span>

            {/* PRICE */}
            <p className=" text-sm text-gray-600">${car.pricePerDay}/day</p>

            {/* STATUS + ACTIONS*/}
            <div className=" flex items-center gap-3">
              <span
                onClick={() => handleTogle(car._id)}
                className={` text-xs px-2 py-1 rounded-full font-medium cursor-pointer ${car.isAvaliable ? " bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
              >
                {car.isAvaliable ? "Available" : "Not Available"}
              </span>
              <div className=" flex items-center gap-2 ">
                <img src={assets.eye_icon} alt="" className=" w-5 cursor-pointer opacity-60 hover:opacity-100" />
                <img onClick={() => handleDelete(car._id)} src={assets.delete_icon} alt="" className=" w-5 cursor-pointer opacity-60 hover:opacity-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────
// MANAGE BOOKINGS CONTENT
// ─────────────────────────────────────
const ManageBookings = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const fetchBookings = async () => {
    const res = await fetch(`${backendUrl}/api/owner/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setBookings(data.bookings);
    }
  };

  // ✅ Update status booking
  const handleStatus = async (bookingId, status) => {
    const res = await fetch(`${backendUrl}/api/owner/booking/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success(`Booking ${status}`);
      fetchBookings();
    }
  };

  return (
    <div>
      <h1 className=" text-2xl font-bold text-gray-800 mb-1">Manage Bookings</h1>
      <p className=" text-gray-400 text-sm mb-6">Track all customer bookings, approve or cancel requests, and manage booking statuses</p>

      {/* TABLE */}
      <div className=" border border-gray-100 rounded-xl overflow-hidden">
        {/* HEADER */}
        <div className=" flex items-center bg-gray-50 px-4 py-3 text-xs text-gray-400 font-medium">
          <span className=" w-48">Car</span>
          <span className=" flex-1">Date Range</span>
          <span className=" w-20">Total</span>
          <span className=" w-32">Status</span>
          <span className=" w-20">Action</span>
        </div>

        {/* ROW */}
        {bookings.map((booking, index) => (
          <div key={index} className=" flex items-center px-4 py-3 border-t border-gray-100 items-center">
            {/* CAR */}
            <div className=" flex items-center gap-3 w-48">
              <img src={booking.car.image} alt="" className=" w-14 h-10 rounded-lg object-cover" />
              <p className=" text-sm font-semibold text-gray-800">
                {booking.car.brand} {booking.car.model}
              </p>
            </div>

            {/* DATE RANGE */}
            <p className=" text-sm text-gray-600 flex-1">
              {new Date(booking.pickupDate).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
              })}{" "}
              to{" "}
              {new Date(booking.returnDate).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            {/* TOTAL */}
            <p className=" text-sm text-gray-600 w-20">${booking.price}</p>

            {/* STATUS  */}
            <div className=" col-span-2 flex items-center gap-3 w-32">
              <span
                className={` text-xs px-2 py-1 rounded-full font-medium
                ${
                  booking.status === "confirmed"
                    ? " bg-green-100 text-green-600"
                    : booking.status === "completed"
                      ? " bg-blue-100 text-blue-600"
                      : booking.status === "cancelled"
                        ? " bg-red-100 text-red-600"
                        : " bg-yellow-100 text-yellow-600"
                }`}
              >
                {booking.status}
              </span>
            </div>
            <select
              value={booking.status}
              onChange={(e) => handleStatus(booking._id, e.target.value)}
              className=" w-24 text-xs border border-gray-200 px-2 py-1 rounded-lg hover:bg-gray-50 transition"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────
// ADD CARS CONTENT
// ─────────────────────────────────────
const AddCar = () => {
  const { backendUrl, token } = useContext(AppContext);

  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [category, setCategory] = useState("sedan");
  const [transmission, setTransmission] = useState("Automatic");
  const [fuelType, setFuelType] = useState("Gasoline");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("pricePerDay", pricePerDay);
    formData.append("category", category);
    formData.append("transmission", transmission);
    formData.append("fuel_type", fuelType);
    formData.append("seating_capacity", seatingCapacity);
    formData.append("location", location);
    formData.append("description", description);

    const res = await fetch(`${backendUrl}/api/owner/car`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Mobil berhasil ditambahkan! 🚗");
      // reset form
      setImage(null);
      setBrand("");
      setModel("");
      setYear("");
      setPricePerDay("");
      setLocation("");
      setDescription("");
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h1 className=" text-2xl font-bold text-gray-800 mb-1">Add New Car</h1>
      <p className=" text-sm text-gray-400 mb-6">Fill in details to list a new car for booking, including pricing, availability, and car specifications.</p>

      <form onSubmit={handleSubmit} className=" flex flex-col gap-5 max-w-2xl">
        {/* UPLOAD FOTO */}
        <label className=" flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:bg-gray-50">
          {image ? (
            <img src={URL.createObjectURL(image)} alt="" className=" h-32 object-cover rounded-lg" />
          ) : (
            <div className=" flex flex-col items-center gap-2">
              <img src={assets.upload_icon} alt="" className=" w-10 opacity-50 " />
              <p className=" text-sm text-gray-400">Upload a picture of your car</p>
            </div>
          )}
          <input type="file" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])} />
        </label>

        {/* BRAND + MODEL */}
        <div className=" grid grid-cols-2 gap-4">
          <div>
            <label className=" text-sm text-gray-600 mb-1 block">Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. BMW, Mercedes, Audi..."
              required
              className=" w-full border border-gray-200 outline-none px-4 py-3 text-sm focus:text-primary rounded-lg"
            />
          </div>
          <div>
            <label className=" text-sm text-gray-600 mb-1 block">Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. X5, E-Class, M4..."
              required
              className=" w-full border border-gray-200 outline-none px-4 py-3 text-sm focus:text-primary rounded-lg"
            />
          </div>
        </div>

        {/* YEAR + PRICE + CATEGORY */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className=" text-sm text-gray-600 mb-1 block">Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2025"
              required
              className=" w-full border border-gray-200 outline-none px-4 py-3 text-sm focus:text-primary rounded-lg"
            />
          </div>
          <div>
            <label className=" text-sm text-gray-600 mb-1 block">Daily Price ($)</label>
            <input
              type="number"
              value={pricePerDay}
              onChange={(e) => setPricePerDay(e.target.value)}
              placeholder="100"
              required
              className=" w-full border border-gray-200 outline-none px-4 py-3 text-sm focus:text-primary rounded-lg"
            />
          </div>
          <div>
            <label className=" text-sm text-gray-600 mb-1 block">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-200 outline-none px-4 py-3 text-sm focus:text-primary rounded-lg">
              <option>Sedan</option>
              <option>SUV</option>
              <option>Economy</option>
              <option>Luxury</option>
            </select>
          </div>
        </div>

        {/* TRANSMISSION + FUEL + SEATS */}
        <div className=" grid grid-cols-3 gap-4">
          <div>
            <label className=" text-sm text-gray-600 mb-1 block">Transmission</label>
            <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className="w-full border border-gray-200 outline-none px-4 py-3 text-sm focus:text-primary rounded-lg">
              <option>Automatic</option>
              <option>Manual</option>
              <option>Semi-Automatic</option>
            </select>
          </div>
          <div>
            <label className=" text-sm text-gray-600 mb-1 block">Fuel Type</label>
            <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="w-full border border-gray-200 outline-none px-4 py-3 text-sm focus:text-primary rounded-lg">
              <option>Gasoline</option>
              <option>Diesel</option>
              <option>Hybrid</option>
              <option>Electric</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Seating Capacity</label>
            <input
              type="number"
              value={seatingCapacity}
              onChange={(e) => setSeatingCapacity(e.target.value)}
              placeholder="5"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* LOCATION */}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="eg. San Francisco, CA"
            required
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className=" text-sm text-gray-600 mb-1 block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your car, its condition, and any notable details..."
            rows={4}
            required
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
          ></textarea>
        </div>

        <button type="submit" className=" bg-primary text-white px-8 py-3 rounded-lg hover:opacity-90 transition w-fit font-medium">
          ✓ List Your Car
        </button>
      </form>
    </div>
  );
};
export default OwnerDashboard;
