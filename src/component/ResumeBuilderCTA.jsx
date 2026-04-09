import { Link } from 'react-router-dom';
import React from 'react';

const ResumeBuilderCTA = () => {
  return (
    <div className="w-full  p-10 mb-10 bg-blue-800 py-10 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-3xl font-bold text-white leading-tight">
          Build your perfect resume with our
          <br />
          easy online builder today!
        </h2>

         
          {/* button bottom me */}
          <div className="flex justify-center mt-15">
            <Link to="/myresume">
              <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg text-lg">
                Create my resume
              </button>
            </Link>
          </div>

        </div>
      </div> 
  );
};

export default ResumeBuilderCTA;