import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

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

function UserIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}

function SettingsIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

function LogoutIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    );
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Mock user data - Replace with actual auth data
    const [user, setUser] = useState({
        isLoggedIn: true, // Change to false for logged out state
        name: "Vikas Kumar",
        email: "vikas@gmail.com",
        avatar: null // You can add avatar URL here
    });

    const handleLogout = () => {
        // Add your logout logic here
        setUser({ ...user, isLoggedIn: false });
        setIsProfileOpen(false);
        // Redirect to login page if needed
        // window.location.href = "/login";
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="font-sans">

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-100 px-6 md:px-8">
                <div className="flex items-center h-16">

                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2 text-[#1a3fa8] font-semibold text-2xl">
                        <LogoIcon />
                        <span>Sikha.com</span>
                    </a>

                    {/* Desktop Navigation Links */}


                    {/* RIGHT SIDE */}
                    <div className="ml-auto flex items-center gap-4">
                       <div className="hidden md:flex items-center gap-4 ml-8">
    {NAV_ITEMS.map((item) => (
      <Link key={item.label} to={item.path}>
        <button className="px-4 py-2 rounded-lg text-sm font-medium text-white border bg-blue-800 hover:bg-blue-50 hover:text-black transition">
          {item.label}
        </button>
      </Link>
    ))}
  </div>
                       

                        {/* User Profile Section */}
                        {user.isLoggedIn ? (
                            <div className="relative">
                                {/* Profile Button */}
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
                                >
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-semibold">
                                            {getInitials(user.name)}
                                        </div>
                                    )}
                                    <span className="hidden md:block text-sm font-medium text-gray-700">
                                        {user.name.split(" ")[0]}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {isProfileOpen && (
                                    <>
                                        {/* Backdrop */}
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsProfileOpen(false)}
                                        />

                                        {/* Dropdown */}
                                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                                            {/* User Info */}
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-2">
                                                <Link
                                                    to="/myresume"
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <UserIcon />
                                                    My Profile
                                                </Link>
                                                
                                                 
                                                <div className="border-t border-gray-100 my-1"></div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition w-full"
                                                >
                                                    <LogoutIcon />
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            /* Login/Signup Buttons when not logged in */
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-1.5 text-sm font-semibold text-white bg-[#1a3fa8] rounded-lg hover:bg-blue-700 transition"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
                        >
                            <HamburgerIcon />
                        </button>

                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden bg-white border-b ${mobileOpen ? "block" : "hidden"}`}>
                <div className="px-6 py-4 space-y-3">

                    {/* Mobile Nav Items */}
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className="block w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded"
                            onClick={() => setMobileOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* My Resume Link for Mobile */}
                    <Link
                        to="/myresume"
                        className="block text-center px-5 py-2.5 text-sm font-semibold text-[#1a3fa8] border-2 border-[#1a3fa8] rounded-lg hover:bg-[#1a3fa8] hover:text-white"
                        onClick={() => setMobileOpen(false)}
                    >
                        My Resume
                    </Link>

                    {/* If logged out, show login/register in mobile menu */}
                    {!user.isLoggedIn && (
                        <div className="pt-2 space-y-2">
                            <Link
                                to="/login"
                                className="block text-center px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                                onClick={() => setMobileOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="block text-center px-5 py-2 text-sm font-medium text-white bg-[#1a3fa8] rounded-lg hover:bg-blue-700"
                                onClick={() => setMobileOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}