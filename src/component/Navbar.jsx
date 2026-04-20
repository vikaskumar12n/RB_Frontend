import { useEffect, useState, useRef } from "react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../helper/loader";
const NAV_ITEMS = [
  { label: "Create Resume", path: "/home" },
];

function HamburgerIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function LogoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#1a3fa8" />
      <path d="M5 6h9a2 2 0 012 2v2a2 2 0 01-2 2H5V6z" fill="white" opacity="0.9" />
      <rect x="5" y="14" width="14" height="1.5" rx="0.75" fill="white" opacity="0.65" />
      <rect x="5" y="17" width="9" height="1.5" rx="0.75" fill="white" opacity="0.45" />
    </svg>
  );
}

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [user, setUser] = useState({
    isLoggedIn: true,
    name: "Vikas Kumar",
    email: "vikas@gmail.com",
    avatar: null,
    role: "Full Stack Developer",
    joinedDate: "Jan 2024",
  });

  const handleNavigation = (path) => {
    setLoading(true);
    setIsProfileOpen(false);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser({ ...user, isLoggedIn: false });
    setIsProfileOpen(false);
  };

  const getInitials = (name) =>
    name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="font-sans">

      {/* ── Loading Overlay ── */}
      {loading && <Loader />}


      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 px-6 md:px-8 transition-transform duration-300 shadow-sm ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex items-center h-16">

          {/* Logo */}
          <Link to={"/"} className="flex items-center gap-2 text-[#1a3fa8] font-semibold text-2xl">
           
            <span>
              <img
                src="/images/logo.png"
                className="h-18  inline-block"
              />
            </span>
          </Link>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-3">

            {/* Desktop Button */}
            <div className="hidden md:flex items-center gap-4">
              {location.pathname === "/" ? (
                <button
                  onClick={() => handleNavigation("/home")}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 transition"
                >
                  Create Resume
                </button>
              ) : (
                <button
                  onClick={() => handleNavigation("/")}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 transition"
                >
                  Home
                </button>
              )}
            </div>

            {/* ── Profile Dropdown ── */}
            {user.isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>

                {/* Avatar Button */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-xl border transition-all duration-200 ${isProfileOpen ? "bg-blue-50 border-blue-200" : "border-transparent hover:bg-gray-100"}`}
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                    {getInitials(user.name)}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user.name.split(" ")[0]}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* ── Dropdown Panel ── */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 overflow-hidden">

                    {/* Profile Header */}
                    <div className="bg-gradient-to-br p-2 from-[#1a3fa8] to-blue-500 px-5  ">
                      <div className="flex items-center gap-3">
                        {/* Big Avatar */}
                        <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-lg font-bold shadow">
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{user.name}</p>
                          <p className="text-blue-100 text-xs mt-0.5">{user.email}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            <span className="text-[10px] text-blue-100">Active</span>
                          </div>
                        </div>
                      </div>
                    </div>



                    {/* Menu Items */}
                    <div className="  ">
                      <button
                        onClick={() => handleNavigation("/myresume")}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path str okeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">My Profile</p>
                          <p className="text-[11px] text-gray-400">View your resume & details</p>
                        </div>
                        <svg className="w-4 h-4 text-gray-300 ml-auto group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>


                    </div>

                    {/* Logout */}
                    <div className="  pb-2 pt-0 border-t border-gray-100  ">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">Logout</p>
                          <p className="text-[11px] text-red-300">Sign out of your account</p>
                        </div>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-1.5 text-sm font-semibold text-white bg-[#1a3fa8] rounded-lg hover:bg-blue-700 transition">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b fixed top-16 left-0 w-full z-40 shadow-md">
          <div className="px-6 py-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="block px-2 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {!user.isLoggedIn && (
              <div className="pt-2 space-y-2">
                <Link to="/login" className="block text-center px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block text-center px-5 py-2 text-sm font-medium text-white bg-[#1a3fa8] rounded-lg hover:bg-blue-700" onClick={() => setMobileOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}