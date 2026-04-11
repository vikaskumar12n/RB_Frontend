import React, { useState } from "react";

const jobs = [
  {
    company: "Company A", location: "New York, NY", period: "Jan 2022 – Present",
    role: "Business Development Manager",
    bullets: [
      "Developed new marketing and business plans that grew portfolio by $50m annually",
      "Oversaw a team of 5 direct reports: 2 managers and 3 individual contributors",
      "Managed vendor relationships, lead pipeline and direct marketing sales campaigns",
      "Present to company executive level quarterly on team goals and planning",
    ],
  },
  {
    company: "Company B", location: "New York, NY", period: "Jul 2020 – Jan 2022",
    role: "Business Development Associate",
    bullets: [
      "Managed sales cycle from prospect to closing independently",
      "Improved closing rate by 30% through data-driven solutions",
      "Created sales reports using Python and internal visualization tools",
    ],
  },
  {
    company: "Company C", location: "Brooklyn, NY", period: "Aug 2018 – Jul 2020",
    role: "Administrative Assistant",
    bullets: [
      "Scheduled and coordinated meetings and travel for team members",
      "Trained 3 additional assistants during period of team expansion",
    ],
  },
];

const skills = ["Vital Signs", "Patient Monitoring", "HIPAA Regulations", "Python", "Leadership"];

const completion = [
  { label: "Profile",    pct: 100 },
  { label: "Experience", pct: 80  },
  { label: "Skills",     pct: 50  },
];

export default function ResumeBuilder() {
  const [leftOpen, setLeftOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-xs text-gray-800">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
           
        </div>
        <div className="flex items-center gap-3"> 
          <button onClick={() => setLeftOpen(!leftOpen)} className="lg:hidden w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600">☰</button>
        </div>
      </header>

      {leftOpen && <div className="lg:hidden fixed inset-0 z-20 bg-black/20" onClick={() => setLeftOpen(false)} />}

      <div className="flex max-w-6xl mx-auto px-4 py-6 gap-5">

        {/* ── LEFT SIDEBAR ── */}
        <aside className={`
          fixed top-0 left-0 h-full z-30 w-60 bg-white border-r border-gray-200 p-4 flex flex-col gap-4 overflow-y-auto
          transition-transform duration-300
          lg:static lg:w-48 lg:h-auto lg:translate-x-0 lg:shrink-0 lg:border lg:border-gray-200 lg:rounded-xl lg:shadow-sm
          ${leftOpen ? "translate-x-0" : "-translate-x-full"}
        `}>

          {/* Profile */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm shrink-0">J</div>
            <div>
              <p className="font-bold text-gray-800 text-[12px]">Jenny</p>
              <p className="text-gray-400 text-[10px]">San Francisco, CA</p>
              <p className="text-gray-400 text-[10px]">jenny@apple.com</p>
            </div>
          </div>

          {/* Summary */}
          <div>
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Summary</p>
            <p className="text-[10px] text-gray-500 leading-relaxed">Experienced professional with background in business development and operations.</p>
          </div>

          {/* Experience */}
          <div>
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Experience</p>
            <div className="space-y-2.5">
              {[
                { title: "Registered Nurse",  place: "Nice Hospital", period: "2012 – Present" },
                { title: "Associate Nurse",   place: "Nice Hospital", period: "2008 – 2012"    },
              ].map((e) => (
                <div key={e.title} className="pl-2.5 border-l border-gray-200">
                  <p className="font-semibold text-gray-700 text-[10px]">{e.title}</p>
                  <p className="text-gray-400 text-[9px]">{e.place}</p>
                  <p className="text-gray-400 text-[9px]">{e.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
            {[{ icon: "🪄", label: "AI Writer" }, { icon: "📚", label: "Resources" }].map((t) => (
              <button key={t.label} className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition text-left bg-white">
                <span>{t.icon}</span>
                <span className="text-[11px] font-medium text-gray-600">{t.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* ── CENTER ── */}
        <main className="flex-1 min-w-0">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

            {/* Header */}
            <div className="px-7  border-b border-gray-100">
              <h1 className="text-xl font-bold text-gray-900">Your Resume</h1>
              <p className="text-gray-400 text-[11px] mt-0.5">email@example.com · +1 123-456-7890</p>
            </div>

            <div className="px-7 py-3 space-y-6">

              {/* Work Experience */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-[12px] font-bold text-gray-800 uppercase tracking-wide">Work Experience</h2>
                  <button className="text-[10px] text-gray-400 border border-gray-200 rounded-lg px-2.5 py-1 hover:bg-gray-50 transition">+ Add</button>
                </div>
                <div className="space-y-5">
                  {jobs.map((j, i) => (
                    <div key={i} className="pl-4 border-l-2 border-gray-100">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <p className="font-bold text-gray-800 text-[12px]">{j.role}</p>
                          <p className="text-gray-400 text-[10px]">{j.company} · {j.location}</p>
                        </div>
                        <span className="shrink-0 text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full whitespace-nowrap">{j.period}</span>
                      </div>
                      <ul className="mt-2 space-y-1">
                        {j.bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-[11px] text-gray-500 leading-relaxed">
                            <span className="text-gray-300 shrink-0 mt-0.5">–</span>{b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className=" bg-gray-100" />

              {/* Certifications */}
              <div>
                <h2 className="text-[12px] font-bold text-gray-800 uppercase tracking-wide ">Certifications & Licenses</h2>
                <div className="flex gap-2 flex-wrap">
                  {["First Aid Certification", "CPR Certification"].map((c) => (
                    <span key={c} className="text-[10px] border border-gray-200 text-gray-600 rounded-lg px-3 py-1.5">{c}</span>
                  ))}
                </div>
              </div>

              <div className="  bg-gray-100" />

              {/* Skills */}
              <div>
                <h2 className="text-[12px] font-bold text-gray-800 uppercase tracking-wide mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="text-[10px] bg-gray-50 border border-gray-200 text-gray-600 rounded-lg px-3 py-1.5">{s}</span>
                  ))}
                  <button className="text-[10px] border border-dashed border-gray-300 text-gray-400 rounded-lg px-3 py-1.5 hover:border-gray-400 transition">+ Add</button>
                </div>
              </div>

            </div>
          </div>
        </main>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="hidden xl:flex flex-col gap-3 w-44 shrink-0">

          {/* Completion */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <p className="text-[11px] font-bold text-gray-700 mb-3">Profile Strength</p>
            <div className="space-y-3">
              {completion.map((c) => (
                <div key={c.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-gray-500">{c.label}</span>
                    <span className="text-[10px] font-semibold text-gray-700">{c.pct}%</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full">
                    <div className="h-full bg-blue-900 rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          {[
            { icon: "💼", label: "Job Matches",  sub: "Match & apply"  },
            { icon: "🎯", label: "ATS Check",    sub: "Optimize resume" },
          ].map((a) => (
            <div key={a.label} className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 transition shadow-sm">
              <span className="text-base">{a.icon}</span>
              <div>
                <p className="font-semibold text-[11px] text-gray-700">{a.label}</p>
                <p className="text-gray-400 text-[9px]">{a.sub}</p>
              </div>
            </div>
          ))}

          {/* AI tip */}
          <div className="bg-blue-900 rounded-xl p-4 text-white">
            <p className="font-bold text-[11px] mb-1">🪄 AI Tip</p>
            <p className="text-[10px] text-gray-100 leading-relaxed mb-3">Add measurable results to increase your interview chances by 2×.</p>
            <button className="w-full border border-white text-gray-300 text-[10px] font-semibold py-1.5 rounded-lg hover:bg-gray-800 transition">Try AI Writer</button>
          </div>

          <button className="bg-blue-900 hover:bg-gray-700 text-white text-[11px] font-bold py-2.5 rounded-xl transition w-full">
            Download PDF ↓
          </button>
        </aside>

      </div>
    </div>
  );
}