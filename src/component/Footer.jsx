import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../helper/loader";
const item = [
  { label: "Build a Resume", link: "/myresume" },
  { label: "Samples", link: "/home" }
];
const items = [
  { label: "Help", link: "/help" },
  { label: "About Us", link: "/about" }
];
const socialIcons = [
  {
    label: "X",
    link:"https://www.x.com/",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Facebook",
   link:"https://www.facebook.com/",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    link:"https://www.instagram.com/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    label: "YouTube",
     link:"https://www.youtube.com/",
    path: "M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z",
  },
];

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    setLoading(true);

    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      {loading && <Loader />}
      <footer className="bg-[#eeebe5] w-full pt-12 pb-6 px-5 sm:px-8 font-sans">
        <div className="max-w-5xl mx-auto">

          {/* Top Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-10">

            {/* Job Seekers */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Job Seekers</h3>
              <ul className="space-y-2.5">
                {item?.map((data, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigate(data.link)}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {data.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Need Help */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Need Help?</h3>

              <ul className="space-y-2.5">
                {items.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigate(item.link)}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stay Connected — full width on mobile */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Stay Connected</h3>

              {/* Social Icons */}
              <div className="flex items-center gap-4 mb-5">
                {socialIcons.map(({ label, path,link }) => (
                  <Link key={label} to={link} aria-label={label} className="text-gray-500 hover:text-gray-900 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d={path} />
                    </svg>
                  </Link>
                ))}
              </div>

              {/* App Buttons */}
              <div className="flex flex-row sm:flex-col gap-3">
                {/* App Store */}
                <a href="#" className="inline-flex items-center gap-2.5 bg-black text-white rounded-lg px-3 py-2 hover:opacity-85 transition-opacity flex-1 sm:flex-none sm:w-40">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <div className="text-[8px] leading-tight opacity-70">Download on the</div>
                    <div className="text-xs font-semibold leading-tight">App Store</div>
                  </div>
                </a>

                {/* Google Play */}
                <a href="#" className="inline-flex items-center gap-2.5 bg-black text-white rounded-lg px-3 py-2 hover:opacity-85 transition-opacity flex-1 sm:flex-none sm:w-40">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3.18 23.76c.3.17.64.24.99.2L14.54 12 11 8.46 3.18 23.76z" fill="#EA4335" />
                    <path d="M20.46 10.31L17.37 8.6l-3.56 3.4 3.56 3.4 3.12-1.74a1.8 1.8 0 000-3.35z" fill="#FBBC04" />
                    <path d="M3.18.24a1.8 1.8 0 00-.99 1.6v20.32c0 .67.37 1.26.99 1.6L14.54 12 3.18.24z" fill="#4285F4" />
                    <path d="M14.54 12L3.18 23.76c.31.18.67.24 1.02.18l.14-.08L17.37 15.4 14.54 12z" fill="#34A853" />
                  </svg>
                  <div>
                    <div className="text-[8px] leading-tight opacity-70">GET IT ON</div>
                    <div className="text-xs font-semibold leading-tight">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 mb-4" />

          {/* Bottom Bar */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-xs text-gray-400">Copyright © Resume.com 2026</span>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {["Terms", "Privacy", "Privacy Center"].map((item) => (
                  <a key={item} href="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">{item}</a>
                ))}
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  Your Privacy Choices
                  <span className="text-[9px] text-blue-500 border border-blue-500 rounded-full px-1">✓✗</span>
                </span>
                <a href="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">Accessibility</a>
              </div>
            </div>
            <p className="text-xs text-gray-400 italic leading-relaxed">
              The information on this site is provided as a courtesy. Resume.com is not a career or legal advisor and does not guarantee job interviews or offers.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}