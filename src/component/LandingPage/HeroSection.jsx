import { Link, useNavigate } from "react-router-dom";

import Loader from "../../helper/loader";
import { useEffect, useState } from "react";
import React from "react";

export default function HeroSection() {
    const Navigate = useNavigate();
    const [loading, setloding] = useState(false)
    const [visible, setVisible] = useState(false);

    const handleDashboard = () => {
        setloding(true);
        setTimeout(() => {
            Navigate("/myresume");
            setloding(false);
        }, 500);
    };
      const handleView = () => {
        setloding(true);
        setTimeout(() => {
            Navigate("/home#builder");
            setloding(false);
        }, 500);
    };
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <>
            {loading && <Loader />}
            <section className="relative pt-20 flex flex-col items-center justify-center bg-white   overflow-hidden">

                {/* Background glow blobs */}
                <div className="absolute top-[10%] left-[8%] w-56 h-56 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-[10%] right-[6%] w-54 h-54 rounded-full bg-violet-400/10 blur-3xl pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[700px] h-[700px] rounded-full bg-blue-300/5 blur-[80px]" />
                </div>

                {/* Badge */}
                <div
                    className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        } flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5  `}
                >
                    <span className="w-2 h-2 rounded-full bg-blue-900 animate-pulse inline-block" />
                    <span className="text-xs font-semibold text-blue-900 tracking-wide ">
                        AI-Powered · Free to use
                    </span>
                </div>

                {/* Heading */}
                <h1
                    className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        } text-2xl sm:text-2xl md:text-[3.3rem] font-extrabold text-center leading-[1.1] max-w-[700px] mb-5 text-gray-900 tracking-tight`}
                >
                    Get dream jobs with our{" "}
                    <span className="bg-gradient-to-r from-blue-900 via-blue-800 to-violet-900 bg-clip-text text-transparent">
                        AI Powered
                    </span>{" "}
                    resume builder
                </h1>

                {/* Subtitle */}
                <p
                    className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        } text-base md:text-lg   text-gray-500 text-center max-w-[680px] leading-relaxed mb-10`}
                >
                    Build a professional and outstanding resume with our free builder and templates.
                    Land your next interview faster.
                </p>

                {/* CTA Buttons */}
                <div
                    className={`transition-all duration-700 delay-[400ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        } flex flex-wrap gap-3 justify-center mb-10`}
                >

                    <button
                        onClick={handleDashboard}
                        className="group relative bg-gradient-to-br from-blue-800 to-violet-900 text-white font-semibold rounded-xl px-8 py-3.5 text-sm shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 hover:shadow-blue-500/40 transition-all duration-200 overflow-hidden inline-block"
                    >
                        <span className="relative z-10">
                            Go to dashboard →
                        </span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </button>
                    <button onClick={handleView} id="builder" className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl px-7 py-3.5 text-sm transition-colors duration-200">
                        View templates
                    </button>
                </div>



            </section>
        </>
    );
}