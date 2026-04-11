
import React from "react";
import { Link } from "react-router-dom";
export default function ResumeHeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-white">
      <h1 className="text-4xl font-extrabold text-gray-900 max-w-2xl leading-tight mb-4">
        Get inspired by resume samples from professional resume experts
      </h1>

      <p className="text-gray-500 text-base max-w-xl mb-10">
        Search by job title to find resumes from resume experts that can inspire
        your own resume creation
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <button className="bg-blue-900 hover:bg-blue-900 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200">
         
         <Link to="/create">Create my resume</Link> 
        </button>

        <button className="border border-gray-300 hover:bg-gray-50 text-blue-700 font-semibold px-6 py-3 rounded-md transition-colors duration-200">
          Explore all samples
        </button>
      </div>
    </section>
  );
}