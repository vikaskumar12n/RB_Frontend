import React from "react";

const features = [
  {
    emoji: "🐷",
    bg: "bg-blue-100",
    title: "We're actually free",
    desc: "No gimmicks, no freemium features, no joke. Get everything you need to build a professional resume that shows off your best qualities to help you land your next job.",
  },
  {
    emoji: "🏅",
    bg: "bg-teal-100",
    title: "Data-Driven Templates",
    desc: "Rest assured that the templates you find are the best around. Based on data from what employers want to see in candidates, we've created our templates with hiring in mind.",
  },
  {
    emoji: "💼",
    bg: "bg-purple-100",
    title: "Get Seen",
    desc: "With your resume ready for top employers, easily share with millions of interested employers on Indeed, the world's #1 job site.",
  },
  {
    emoji: "⚡",
    bg: "bg-orange-100",
    title: "Easy to Customize",
    desc: "Our intuitive drag-and-drop editor makes it simple to personalize your resume in minutes. Change fonts, colors, and layouts without any design experience needed.",
  },
  {
    emoji: "🔒",
    bg: "bg-pink-100",
    title: "Privacy First",
    desc: "Your data stays yours. We never sell your personal information or share your resume with third parties without your explicit consent. Build with complete peace of mind.",
  },
  {
    emoji: "📄",
    bg: "bg-green-100",
    title: "Download Instantly",
    desc: "Export your finished resume as a polished PDF with just one click. Print-ready formatting ensures your resume looks perfect whether viewed on screen or on paper.",
  },
];

export default function WhySection() {
  return (
    <section className="py-20 px-3 text-center max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-12">
        Why build my resume with edumitrahub.com?
      </h2>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
        {features.map(({ emoji, bg, title, desc }) => (
          <div key={title}>
            <div
              className={`${bg} w-20 h-20 rounded-xl flex items-center justify-center text-4xl mb-4`}
            >
              {emoji}
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm text-justify leading-relaxed">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}