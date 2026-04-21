// src/pages/NotFound.jsx
import { useNavigate } from "react-router-dom";
import React from "react";
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `
          radial-gradient(ellipse at 30% 40%, rgba(26,63,168,0.15) 0%, transparent 60%),
          radial-gradient(ellipse at 70% 70%, rgba(26,63,168,0.1) 0%, transparent 55%),
          linear-gradient(135deg, #f8faff 0%, #eef2ff 50%, #f0f4ff 100%)
        `
      }}>

      <div className="text-center max-w-lg w-full">

        {/* ── 404 Big Text ── */}
        <div className="relative mb-6">
          <h1 className="text-[150px] font-black leading-none select-none"
            style={{
              background: "linear-gradient(135deg, #1a3fa8 0%, #3b6ef5 50%, #1a3fa8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: 0.15,
            }}>
            404
          </h1>

          {/* Floating icon center mein */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-2xl bg-white shadow-xl border border-blue-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-[#1a3fa8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Text ── */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Yeh page exist nahi karta ya move ho gaya hai. <br />
          Ghabrao mat, neeche buttons se wapas jao!
        </p>

        {/* ── Buttons ── */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 shadow-sm transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1a3fa8] hover:bg-blue-800 shadow-md transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </button>
        </div>

        {/* ── Bottom hint ── */}
        <p className="mt-10 text-xs text-gray-400">
          Error 404 · Page not found
        </p>

      </div>
    </div>
  );
}