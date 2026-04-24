import React, { useState, useEffect, useRef } from "react";

const testimonials = [
    {
        text: "I landed 3 interviews within a week of using Examples.com. The templates are clean and the whole process took me under 20 minutes!",
        name: "Rahul Sharma",
        role: "Software Engineer, Bangalore",
        initial: "R",
        color: "bg-indigo-600",
        textColor: "text-indigo-600"
    },
    {
        text: "As a fresh graduate, I had no idea how to write a resume. This platform made it so easy and the result looked incredibly professional.",
        name: "Priya Mehta",
        role: "Marketing Graduate, Mumbai",
        initial: "P",
        color: "bg-cyan-600",
        textColor: "text-cyan-600"
    },
    {
        text: "The fact that it's completely free is unbelievable. I've tried paid tools that weren't half as good. Highly recommend to everyone!",
        name: "Arjun Nair",
        role: "Product Manager, Hyderabad",
        initial: "A",
        color: "bg-emerald-600",
        textColor: "text-emerald-600"

    },
    {
        text: "The privacy features gave me so much confidence. I knew my data was safe while I focused on crafting the perfect resume for my dream job.",
        name: "Sneha Reddy",
        role: "HR Executive, Chennai",
        initial: "S",
        color: "bg-red-600",
        textColor: "text-red-600"
    },
    {
        text: "Downloaded my resume as a PDF in seconds. It looked so polished that my recruiter asked me which designer made it!",
        name: "Vikram Joshi",
        role: "Sales Manager, Delhi",
        initial: "V",
        color: "bg-amber-600",
        textColor: "text-amber-600"
    },
];

const GAP = 18;
const INTERVAL = 3000;

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [cardWidth, setCardWidth] = useState(0);
    const [visible, setVisible] = useState(3);
    const wrapperRef = useRef(null);
    const maxIndex = testimonials.length - visible;

    useEffect(() => {
        const calcWidth = () => {
            if (wrapperRef.current) {
                const isMobile = window.innerWidth < 768;
                const visibleCount = isMobile ? 1 : 3;
                setVisible(visibleCount);
                const total = wrapperRef.current.offsetWidth;
                setCardWidth((total - GAP * (visibleCount - 1)) / visibleCount);
                setCurrent(0); // reset on resize
            }
        };
        calcWidth();
        window.addEventListener("resize", calcWidth);
        return () => window.removeEventListener("resize", calcWidth);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
        }, INTERVAL);
        return () => clearInterval(timer);
    }, [maxIndex]);

    const goTo = (i) => setCurrent(Math.max(0, Math.min(i, maxIndex)));

    return (
        <section className="py-20 px-4 text-center overflow-hidden">
            <span className="inline-block bg-blue-200 text-black text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
                Reviews
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-14">
                What our users say
            </h2>

            <div className="relative max-w-5xl mx-auto" ref={wrapperRef}>
                {/* Track */}
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${current * (cardWidth + GAP)}px)`,
                        }}
                    >
                        {testimonials.map(({ text, name, role, initial, color,textColor }) => (
                            <div
                                key={name}
                                className="flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-3 text-left hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                                style={{ width: cardWidth, marginRight: GAP }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`text-5xl ${textColor} font-serif leading-none`}>&quot;</div>
                                    <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                                        {initial}
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-yellow-400 text-xs">★★★★★</div>
                                        <div className="text-sm font-semibold text-gray-900">{name}</div>
                                        <div className="text-xs text-gray-400">{role}</div>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed italic">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                        onClick={() => goTo(current <= 0 ? maxIndex : current - 1)}
                        className="w-11 h-11 rounded-full border-2 border-gray-200 bg-white text-gray-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                        ←
                    </button>

                    <div className="flex gap-2">
                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === current ? "bg-blue-800 w-6" : "bg-gray-200 w-2"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => goTo(current >= maxIndex ? 0 : current + 1)}
                        className="w-11 h-11 rounded-full border-2 border-gray-200 bg-white text-gray-600 hover:border-blue-600 hover:text-blue-600 hover:bg-green-50 transition-all"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
}