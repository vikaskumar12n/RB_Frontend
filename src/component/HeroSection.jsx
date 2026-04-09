import { useState } from "react";
import React from "react";
const ResumeIllustration = () => (
  <div className="relative flex items-center justify-center w-full h-full">
    {/* Background circles */}
    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-orange-200 opacity-70" />
    <div className="absolute right-24 top-1/2 -translate-y-1/4 w-36 h-36 rounded-full bg-orange-300 opacity-50" />

    {/* Resume card */}
    <div className="relative z-10 right-4">
      {/* Purple border card */}
      <div className="relative bg-white rounded-lg shadow-xl w-44 h-52 border-l-8 border-purple-600 p-4 flex flex-col gap-3">
        {/* Lines on resume */}
        <div className="w-3/4 h-2.5 bg-slate-700 rounded-sm mt-2" />
        <div className="w-full h-2 bg-slate-300 rounded-sm" />
        <div className="w-5/6 h-2 bg-slate-300 rounded-sm" />
        <div className="w-full h-2 bg-slate-300 rounded-sm mt-1" />
        <div className="w-4/5 h-2 bg-slate-300 rounded-sm" />

        {/* Award badge */}
        <div className="absolute -top-5 -right-5 w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </div>

        {/* Ribbon badge */}
        <div className="absolute -bottom-4 -right-3 flex flex-col items-center">
          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          {/* Ribbon tails */}
          <div className="flex gap-1 -mt-1">
            <div className="w-3 h-5 bg-blue-600" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
            <div className="w-3 h-5 bg-blue-800" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function HeroSection() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      alert(`Searching for: "${query}"`);
    }
  };

  return (
    <section className="w-full   min-h-[400px] px-8 py-14 flex items-center">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Text + Search */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-5xl  text-gray-900 leading-tight mb-4">
            Free Resume Samples and Examples
          </h1>
          <p className="text-gray-600 text-xl mb-7 leading-relaxed">
            Use professionally written and formatted resume samples that will
            get you the job you want. Search over 100 HR approved resume
            examples.
          </p>

          {/* Search Bar */}
          <div className="flex items-center gap-0 w-full max-w-2xl">
            <div className="flex items-center flex-1 border border-gray-300 bg-white rounded-l-md px-3 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <svg
                className="w-4 h-4 text-gray-400 mr-2 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search resume samples"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-900 hover:bg-blue-000 active:scale-95 ml-2 rounded transition-all text-white text-sm font-semibold px-6 py-3 rounded-r-md cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="flex-shrink-0 w-64 h-64 md:w-72 md:h-72">
          <ResumeIllustration />
        </div>
      </div>
    </section>
  );
}