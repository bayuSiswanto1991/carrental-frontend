import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className=" bg-white border-t border-gray-100 px-6 md:px-16 py-12">
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-8 mb-4">
        {/* LOGO  + DESCRIPTION */}
        <div className=" md:col-span-1">
          <Link to="/">
            <img src={assets.logo} alt="Car Rental" className=" h-8 mb-4" />
          </Link>
          <p className=" text-gray-400 text-sm leading-relaxed">Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.</p>
          {/* SOCIAL MEDIA */}
          <div className=" flex items-center gap-3 mt-4">
            <img src={assets.facebook_logo} alt="" className=" w-5 cursor-pointer opacity-60 hover:opacity-100" />
            <img src={assets.instagram_logo} alt="" className=" w-5 cursor-pointer opacity-60 hover:opacity-100" />
            <img src={assets.twitter_logo} alt="" className=" w-5 cursor-pointer opacity-60 hover:opacity-100" />
            <img src={assets.gmail_logo} alt="" className=" w-5 cursor-pointer opacity-60 hover:opacity-100" />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className=" font-semibold text-gray-800 mb-4 text-sm">QUICK LINKS</h4>
          <ul>
            <li className=" flex flex-col gap-2 text-sm text-gray-500">
              <Link to="/Home" className=" hover:text-primary transition">
                Home
              </Link>
              <Link to="/Home" className=" hover:text-primary transition">
                Browse Cars
              </Link>
              <Link to="/Home" className=" hover:text-primary transition">
                List Your Car
              </Link>
              <Link to="/Home" className=" hover:text-primary transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h4 className=" font-semibold text-gray-800 mb-4 text-sm">RESOURCES</h4>
          <ul>
            <li className=" flex flex-col gap-2 text-sm text-gray-500">
              <Link to="/Home" className=" hover:text-primary transition">
                Help Center
              </Link>
              <Link to="/Home" className=" hover:text-primary transition">
                Terms of Service
              </Link>
              <Link to="/Home" className=" hover:text-primary transition">
                Privacy Policy
              </Link>
              <Link to="/Home" className=" hover:text-primary transition">
                Insurance
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className=" font-semibold text-gray-800 mb-4 text-sm">CONTACT</h4>
          <ul>
            <li className=" flex flex-col gap-2 text-sm text-gray-500">
              <Link to="/Home" className=" hover:text-primary transition">
                1234 Luxury Drive
              </Link>
              <Link to="/Home" className=" hover:text-primary transition">
                San Francisco, CA 94107
              </Link>
              <Link to="/Home" className=" hover:text-primary transition">
                +1 (555) 123-4567
              </Link>
              <Link to="/Home" className=" hover:text-primary transition">
                car@example.com
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className=" border-t border-t-gray-100 pt-6 flex items-center justify-between text-xs text-gray-400">
        <p>© 2025 CarRental. All rights reserved.</p>
        <div className=" flex items-center gap-4">
          <Link to="/" className=" hover:text-primary transition">
            Terms
          </Link>
          <Link to="/" className=" hover:text-primary transition">
            Privacy
          </Link>
          <Link to="/" className=" hover:text-primary transition">
            Cookies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
