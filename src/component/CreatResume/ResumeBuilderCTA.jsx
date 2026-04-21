import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../helper/loader';  

const ResumeBuilderCTA = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

 const handleClick = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    window.dispatchEvent(new CustomEvent("openAuthModal", {
      detail: {
        tab: "login",
        onSuccess: () => {
          navigate("/home"); // ✅ login ke baad /home par bhejo
        }
      }
    }));
    return;
  }
  navigate("/home"); // ✅ already logged in hai to seedha /home
};

  return (
    <div className="w-full p-10 mb-20 py-10 px-4" 
  style={{ background: "linear-gradient(360deg, #2e3a53 0%, #2e3a53 100%)" }}>
 
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