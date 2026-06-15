import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets, menuLinks } from "../assets/assets";

const Navbar = () => {
  const { token, setToken, user, setUser, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  // tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setShowDropdown(false);
    navigate("/");
  };

  const handleListCar = async () => {
    // belum login → login dulu
    if (!token) return navigate("/login");

    // sudah owner → langsung ke dashboar
    if (user?.role === "owner") return navigate("/owner");

    // belum owner upgrade dulu
    const res = await fetch(`${backendUrl}/api/auth/upgrade`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      navigate("/owner");
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/cars?search=${searchQuery}`);
    }
  };

  return (
    <nav className=" flex items-center justify-between px-6 md:px-16 py-4 border-b border-gray-200 sticky top-0 z-50 bg-[#F1F5F9]">
      {/* LOGO */}
      <Link to="/">
        <img src={assets.logo} alt="CarRental" className=" h-8" />
      </Link>

      {/* MENU DESKTOP */}
      <div className=" hidden md:flex  items-center gap-8 text-sm text-gray-600">
        {menuLinks.map((link) => (
          <Link key={link.name} to={link.path} className=" hover:text-primary transition">
            {link.name}
          </Link>
        ))}
      </div>

      {/* SEARCH - desktop */}
      <div className=" hidden md:flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2">
        <img src={assets.search_icon} alt="" className=" w-4" />
        <input
          type="text"
          placeholder=" Search Cars"
          className=" outline-none text-sm w-28 text-gray-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      {/* RIGHT */}
      <div className=" flex items-center gap-3">
        {token && user ? (
          <>
            {/* LIST CARS */}
            <button onClick={handleListCar}>List cars</button>

            <div className=" relative" ref={dropdownRef}>
              <img src={user.image || assets.user_profile} alt="" onClick={() => setShowDropdown(!showDropdown)} className="w-9 h-9 rounded-full cursor-pointer object-cover border border-gray-200" />
              {showDropdown && (
                <div className="absolute right-0 top-11 bg-white border border-gray-100 rounded-xl shadow-lg w-44 z-50">
                  <Link to="/my-bookings" onClick={() => setShowDropdown(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-t-xl">
                    My Bookings
                  </Link>
                  {user.role === "owner" && (
                    <Link to="/owner" onClick={() => setShowDropdown(false)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                      Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-gray-50 rounded-b-xl">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button onClick={handleListCar} className=" hidden md:block text-sm text-gray-600  hover:text-primary transition">
              List Car
            </button>
            <button onClick={() => navigate("/login")} className=" bg-primary text-white px-5 py-2 rounded-full text-sm hover:opacity-90 transition">
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
