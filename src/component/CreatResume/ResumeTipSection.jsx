import React from "react";
const ResumeTipsSection = () => {
  const cards = [
    {
      color: "#6366f1",
      bg: "#eef2ff",
      stroke: "#4f46e5",
      title: "Industry standards",
      bullets: [
        "Resume style depends heavily on your industry — an actor's resume differs greatly from an accountant's.",
        "Creative fields expect a portfolio showcasing both form and function.",
        "Research templates from your target industry before switching careers.",
      ],
    },
    {
      color: "#6366f1",
      bg: "#ecfeff",
      stroke: "#0e7490",
      title: "Resume templates",
      bullets: [
        "Templates are a starting point for form, structure, and layout — not a final product.",
        "Always personalise your details so the resume reflects you, not a generic format.",
      ],
    },
  ];

  const avoidPoints = [
    "Do not include hobbies or irrelevant objectives — focus only on information relevant to the job.",
    "Skip the photo unless specifically required for your industry.",
    "Avoid exclamation points, smiley faces, or emojis — keep the tone professional.",
    "Use a professional email address — avoid nicknames or catchphrases.",
    "Proofread carefully — check bullet points, capitalisation, spelling, and overall structure.",
  ];

  return (
    <div className="max-w-6xl mx-auto px-8 pb-20  font-sans">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4 tracking-wide uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        Resume Guide
      </div>

      <h2 className="text-3xl font-medium text-black leading-snug mb-2">
        Things to consider when browsing resume samples
      </h2>
      <p className="text-sm text-black mb-8 leading-relaxed">
        Use these guidelines to find the right resume style and make a strong first impression.
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {cards.map((card) => (
          <div key={card.title} className="bg-white border border-gray-100 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: card.color }} />
            <div className="w-11 h-11 rounded-xl flex items-center justify-center  " style={{ background: card.bg }}>
              {/* Icon */}
            </div>
            <p className="text-md font-medium text-black mb-3">{card.title}</p>
            <ul className="flex flex-col gap-2">
              {card.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-black leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: card.color }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
 
        <div className="bg-gradient-to-br rounded-2xl p-5"
        style={{background: "linear-gradient(360deg, #2e3a53 0%, #2e3a53 100%)"}}>
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-4">
            {/* Icon */}
          </div>
          <p className="text-md font-medium text-white mb-3">Resume layout</p>
          <ul className="flex flex-col gap-2 ">
            {["Think from the hiring manager's perspective — put the most relevant details first.",
              "Create clear sections for skills, certifications, education, and accomplishments."
            ].map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-blue-200 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

    
      <div className="border-t border-gray-100 my-6" />

      
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
          {/* Cross Icon */}
        </div>
        <h3 className="text-3xl font-medium text-black">Things to not include in your resume</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {avoidPoints.map((point, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 flex items-start gap-3">
            <div className="min-w-[22px] h-[22px] bg-red-50 rounded-md flex items-center justify-center text-xs font-medium text-red-700">
              {i + 1}
            </div>
            <p className="text-sm text-black leading-relaxed">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTipsSection;