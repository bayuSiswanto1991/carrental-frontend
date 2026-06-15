import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Cars = () => {
  const navigate = useNavigate();
  const { cars } = useContext(AppContext);
  const [searchParams] = useSearchParams();

  // baca dari URL dulu, kalau tidak ada pakai ""
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const querySearch = searchParams.get("search");
    if (querySearch) setSearch(querySearch);
  }, [searchParams]);

  const filteredCars = cars.filter(
    (car) =>
      car.brand.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      car.model.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      car.category.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );

  return (
    <div>
      {/* HEADER */}
      <div className=" bg-[#F1F5F9] px-6 md:px-16 py-16 text-center">
        <h1 className=" font-bold text-3xl text-gray-800 mb-2">Available Cars</h1>
        <p className=" text-sm text-gray-400 mb-8">Browse our selection of premium vehicles available for your next adventure</p>

        {/* SEARCH BAR */}
        <div className=" flex items-center  gap-3 max-w-xl mx-auto ">
          <div className=" flex items-center flex-1 bg-white rounded-full border border-gray-200 px-4 py-3">
            <img src={assets.search_icon} alt="" className=" w-4 opacity-90" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by make, model, or features" className=" outline-none text-sm flex-1 text-gray-600" />
          </div>

          <button className=" border border-gray-200 bg-white p-3 rounded-full hover:bg-gray-50 transition">
            <img src={assets.filter_icon} alt="" className=" w-5" />
          </button>
        </div>
      </div>

      {/* CARS GRID */}
      <div className=" px-6 md:px-16 py-10">
        {/* SHOWING X CARS */}
        <p className=" text-sm text-gray-500 mb-6">Showing {filteredCars.length} Cars</p>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
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
      </div>

      {/* KALAU TIDAK ADA HASIL */}
      {filteredCars.length === 0 && (
        <div className=" text-center py-16">
          <p className=" text-gray-400">No cars found for "{search}"</p>
        </div>
      )}
    </div>
  );
};

export default Cars;
