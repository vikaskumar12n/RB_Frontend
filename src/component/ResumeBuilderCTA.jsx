import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../helper/loader'; // 👈 import karo

const ResumeBuilderCTA = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/myresume");
      setLoading(false);
    }, 400);
  };

  return (
    <div className="w-full p-10 mb-8 bg-blue-900 py-10 px-4">

      {/* ✅ Loader Call */}
      {loading && <Loader />}

      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
          Build your perfect resume with our
          <br />
          easy online builder today!
        </h2>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleClick}
            className="bg-white text-gray-600 font-semibold py-2 px-5 rounded-lg text-sm"
          >
            Create my resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderCTA;