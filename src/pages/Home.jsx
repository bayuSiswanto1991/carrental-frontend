import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Home = () => {
  const { cars } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO SECTION */}
      <div className=" bg-[#F1F5F9] px-6 md:px-16 pt-16 pb-0 flex flex-col items-center text-center">
        <h1 className=" text-3xl sm:text-4xl md:text-5xl font-bold text-[#414141] mb-4">Luxury Cars on Rent</h1>

        {/* SEARCH BAR */}
        <div className=" bg-white rounded-full shadow-md hidden md:flex items-center gap-4 px-6 py-4 mt-6 w-full max-w-2xl">
          <div className=" flex flex-col items-start">
            <span className=" text-xs text-gray-400">Pickup Location</span>
            <span className=" text-sm font-medium">Bangalore</span>
          </div>
          <div className=" w-px h-8 bg-gray-200" />
          <div className=" flex flex-col items-start">
            <span className=" text-xs text-gray-400">Pick-up Date</span>
            <span className=" text-sm font-medium">28-Mar 2025</span>
          </div>
          <div className=" w-px h-8 bg-gray-200" />
          <div className=" flex flex-col items-start flex-1">
            <span className=" text-xs text-gray-400">Return Date</span>
            <span className=" text-sm font-medium">30-Mar 2025</span>
          </div>
        </div>

        {/* SEARCH BUTTON - mobile only */}
        <button onClick={() => navigate("/cars")} className=" md:hidden bg-primary text-white px-6 py-3 rounded-full text-sm hover:opacity-90 transition flex items-center gap-2 ">
          <img src={assets.search_icon} alt="" className=" w-4 brightness-0 invert" /> Search
        </button>

        {/* HERO IMAGE */}
        <img src={assets.main_car} alt="Luxury Car" className=" mt-8 w-full max-w-2xl" />
      </div>

      {/* FEATURED VEHICLE */}
      <div className=" bg-white px-6 md:px-16 py-16">
        <h2 className=" text-3xl font-bold text-center mb-2">Featured Vehicles</h2>
        <p className=" text-gray-400 text-center text-sm mb-10">Explore our selection of premium vehicles available for your next adventure.</p>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.slice(0, 3).map((car) => (
            <div key={car._id} onClick={() => navigate(`/cars/${car._id}`)} className=" border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition">
              <div className=" relative">
                <img src={car.image} alt={car.brand} className=" w-full h-48 object-cover" />
                <span className=" absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded-full">Available Now</span>
                <span className=" absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">${car.pricePerDay}/day</span>
              </div>
              <div className=" p-6">
                <h3 className=" font-semibold text-gray-800">
                  {car.brand} {car.model}
                </h3>
                <p className=" text-gray-400 text-xs mb-3">
                  {car.category} • {car.year}
                </p>
                <div className=" grid grid-cols-2 gap-1 text-xs text-gray-500">
                  <p className=" flex items-center gap-1">
                    <img src={assets.users_icon} alt="" className=" w-3" />
                    {car.seating_capacity} Seat
                  </p>
                  <p className=" flex items-center gap-1">
                    <img src={assets.fuel_icon} alt="" className=" w-3" />
                    {car.fuel_type}
                  </p>
                  <p className=" flex items-center gap-1">
                    <img src={assets.car_icon} alt="" className=" w-3" />
                    {car.transmission}
                  </p>
                  <p className=" flex items-center gap-1">
                    <img src={assets.location_icon} alt="" className=" w-3" />
                    {car.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className=" flex justify-center mt-10">
          <button onClick={() => navigate("/cars")} className=" border border-gray-300 px-8 py-3 rounded-full text-sm hover:bg-gray-50 transition ">
            Explore all cars →
          </button>
        </div>
      </div>

      {/* BANNER - Do You Own a Luxury Car? */}
      <div className=" px-6 md:px-16 mb-16">
        <div className=" bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] rounded-2xl p-8 md:p-12 flex items-center justify-between">
          <div className=" text-white">
            <h3 className=" text-2xl md:text-3xl font-bold mb-2">Do You Own a Luxury Car?</h3>
            <p className=" text-white/80 text-sm mb-6 max-w-sm leading-relaxed">
              Monetize your vehicle effortlessly by listing it on CarRental.We take care of insurance, driver verification, and secure payments — so you can earn passive income, stress-free.
            </p>
            <button onClick={() => navigate("/owner")} className=" bg-white text-primary px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
              List your car
            </button>
          </div>
          <img src={assets.banner_car_image} alt="" className=" w-96 hidden md:block" />
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className=" px-6 md:px-16 py-16 bg-gray-50">
        <h2 className=" text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
        <p className=" text-gray-400 text-center text-sm mb-10">Discover why discerning travelers choose StayVenture for their luxury accommodations around the world.</p>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className=" bg-white p-6 rounded-2xl border border-gray-100">
              <div className=" flex items-center gap-3 mb-4">
                <img src={i === 1 ? assets.testimonial_image_1 : assets.testimonial_image_2} alt="" className=" w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className=" text-sm font-medium">Emma Rodriguez</p>
                  <p className=" text-gray-400 text-xs">Barcelona, Spain</p>
                </div>
              </div>
              <div className=" flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img key={star} src={assets.star_icon} alt="" className=" w-4" />
                ))}
              </div>
              <p className=" text-sm text-gray-500 ">"I've used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides."</p>
            </div>
          ))}
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className=" px-6 md:px-16 py-16 text-center">
        <h2 className=" text-3xl font-bold mb-2">Never Miss a Deal!</h2>
        <p className="text-gray-400 text-center text-sm mb-10">Subscribe to get the latest offers, new collections, and exclusive discounts.</p>
        <div className=" flex flex-col md:flex-row items-center max-w-md mx-auto gap-3 sm:gap-0">
          <input type="email" placeholder="Enter your email address" className=" w-full sm:flex-1 border border-gray-200 outline-none sm:rounded-l-lg sm:rounded-r-none rounded-lg px-4 py-3 text-sm" />
          <button className=" w-full sm:w-auto bg-primary text-white px-6 py-3 text-sm rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:opacity-90 transition">Subscribe Now</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
