import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../helper/loader";

export default function ResumeHeroSection() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);
const handleNavigateToCategory = () => {
    setLoading(true);
    setTimeout(() => { 
      navigate("/home#category"); 
      setLoading(false);
    }, 500);
  };

  return (
    <>
      {loading && <Loader />}
     <div
 className={`relative max-w-6xl overflow-hidden rounded-2xl px-6 md:px-14 mb-10 mx-auto py-10 md:py-12 flex flex-col md:flex-row items-center justify-between min-h-[220px] transition-opacity duration-700 ${
  visible ? "opacity-100" : "opacity-0"
} bg-[linear-gradient(360deg,#2e3a53_0%,#2e3a53_100%)]`}
>
  {/* Glow effect (Mobile par thoda chota kiya) */}
  <div className="absolute -top-16 -left-16 w-40 h-40 md:w-56 md:h-56 rounded-full bg-[radial-gradient(circle,rgba(100,120,255,0.3)_0%,transparent_70%)]" />

  {/* Left: Text + Button (Mobile par center align) */}
  <div className="relative z-10 max-w-sm text-center md:text-left flex flex-col items-center md:items-start mb-12 md:mb-0">
    <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight md:leading-snug mb-6">
      Start building your resume today, land your dream job tomorrow
    </h1>
    <button
      onClick={handleNavigateToCategory}
      className="bg-white text-indigo-900 font-bold px-8 py-3 rounded-lg hover:bg-indigo-50 active:scale-95 transition-all shadow-lg text-sm md:text-base w-fit"
    >
      Create my resume
    </button>
  </div>

  {/* Right: Resume Cards (Mobile par responsive scaling) */}
  <div className="relative z-10 w-full max-w-[280px] md:w-72 h-44 md:h-52 flex-shrink-0 scale-90 sm:scale-100">
    {/* Card 1 - back left */}
    <div className="absolute bottom-0 left-0 bg-white rounded shadow-xl p-2 md:p-3 w-32 md:w-44 -rotate-6">
      <ResumeCardContent name="Rahul" />
    </div>
    
    {/* Card 2 - middle */}
    <div className="absolute bottom-4 left-8 md:left-14 bg-white rounded shadow-xl p-2 md:p-3 w-32 md:w-44 -rotate-1 z-10">
      <ResumeCardContent name="Arjun" />
    </div>
    
    {/* Card 3 - front right */}
    <div className="absolute bottom-5 right-0 bg-white rounded shadow-2xl p-2 md:p-3 w-32 md:w-44 z-20 border-t-2 border-indigo-500">
      <ResumeCardContent name="Aman" large />
    </div>
  </div>
</div>
    </>
  );
}

function ResumeCardContent({ name, large }) {
  return (
    <div className="select-none">
      <p className={`font-bold text-gray-900 mb-0.5 ${large ? "text-[9px]" : "text-[7px]"}`}>
        {name}
      </p>
      <p className="text-[5px] text-gray-500 mb-1">Professional Developer</p>
      <hr className="border-gray-200 mb-1" />
      
      <p className="text-[5.5px] font-bold uppercase tracking-wide mb-1 text-indigo-600">Summary</p>
      <div className="h-[3px] bg-gray-200 rounded mb-1 w-full" />
      <div className="h-[3px] bg-gray-200 rounded mb-2 w-3/5" />
      
      <p className="text-[5.5px] font-bold uppercase tracking-wide mb-1 text-indigo-600">Experience</p>
      <div className="h-[3px] bg-gray-200 rounded mb-1 w-full" />
      <div className="h-[3px] bg-gray-200 rounded mb-1 w-4/5" />
      
      <p className="text-[5.5px] font-bold uppercase tracking-wide mb-1 text-indigo-600">Education</p>
      <div className="h-[3px] bg-gray-200 rounded mb-1 w-4/5" />
      <div className="h-[3px] bg-gray-200 rounded w-3/5" />
    </div>
  );
}