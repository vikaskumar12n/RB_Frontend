import React from "react";

const steps = [
  {
    number: "01",
    title: "Choose a Template",
    desc: "Browse our collection of professionally designed, employer-tested resume templates.",
  },
  {
    number: "02",
    title: "Fill in Your Details",
    desc: "Add your experience, skills, and education using our simple step-by-step editor.",
  },
  {
    number: "03",
    title: "Customize the Look",
    desc: "Tweak fonts, colors, and layout to match your personal style and industry.",
  },
  {
    number: "04",
    title: "Download & Apply",
    desc: "Export your polished resume as a PDF and start applying to your dream jobs today.",
  },
];

export default function HowItWorks() {
  return (
    <section className= "bg-[linear-gradient(360deg,#2e3a53_0%,#2e3a53_100%)] py-15 mt-25 px-2 text-center" >
      <span className="inline-block bg-green-900 text-green-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
        Process
      </span>
      <h2 className="text-3xl font-bold text-white mb-16">How it works</h2>

      <div className="relative max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Connector line - visible on md+ */}
        <div className="hidden md:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-green-800 via-green-400 to-green-800 z-0" />

        {steps.map(({ number, title, desc }) => (
          <div key={number} className="relative z-10 flex flex-col items-center text-center px-2">
            <div className="w-[72px] h-[72px] rounded-full bg-gray-800 border-2 border-green-700 flex items-center justify-center text-2xl font-bold text-green-400 mb-5">
              {number}
            </div>
            <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
            <p className="text-gray-300 text-xs text-justify leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}