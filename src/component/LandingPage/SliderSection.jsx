import { useState, useEffect } from "react";
import React from "react";
import {Link} from "react-router-dom"
const slides = [
  "/images/resume builder.png",
  "/images/semple.png",
  "/images/category.png",
];

export default function SliderSection() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 py-10 px-4 text-center">

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold  text-gray-800">
        Create resumes that get noticed simple, 
      </h1>
      <p className="text-3xl md:text-4xl font-bold  text-gray-800">
        simple, easy, fast, free
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-3 mt-5">
        <button className= "bg-gray-200 text-gray-700 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-300 transition">
         <Link to="myresume">Resume Builder</Link>
        </button>
        <button className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-300 transition">
          <Link to="home#builder">Resume Builder</Link>
        </button>
      </div>

 {/* Slider */}
<div className="mt-4 flex justify-center px-4">
  <div className="relative w-full max-w-6xl">

    {/*  Gradient Glow */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r   opacity-30"></div>

    {/*  Main Card */}
<div className="flex justify-center   mt-5">
  <div className="relative w-full max-w-5xl rounded-3xl shadow-sm overflow-hidden">

    {/* 🌈 Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-blue-400 to-blue-400"></div>

    {/*  Glass Layer */}
    <div className="absolute inset-0 backdrop-blur-sm bg-white/30"></div>

    {/* 🖼 Image */}
    <div className="relative flex items-center justify-center">
      <img
        src={slides[current]}
        alt="resume preview"
        className="w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] p-10"
      />
    </div>

    {/*  Dots */}
    <div className="absolute bottom-5 w-full flex justify-center gap-3">
      {slides.map((_, i) => (
        <div
          key={i}
          onClick={() => setCurrent(i)}
          className={`h-2.5 w-2.5 rounded-full cursor-pointer ${
            current === i
              ? "bg-blue-600 scale-125"
              : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>

  </div>
</div>
  </div>
</div>
    </div>
  );
}