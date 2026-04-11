import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.55)", backdropFilter: "blur(6px)" }}>

      <div className="flex flex-col items-center gap-5">
 
        <div className="relative w-16 h-16">
         
          <div className="absolute inset-0 rounded-full border-4 border-white" />
           
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white border-r-blue-900 animate-spin" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-900 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-white text-sm font-semibold tracking-wide">
            Please wait...
          </span>
          <span className="text-blue-100 text-xs">
            Loading your resume
          </span>
        </div>

        {/* Animated dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Loader;