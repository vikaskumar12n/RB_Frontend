import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Frontend Architect Theme (Modern Web)
const primary    = "#2563eb"; // React Blue
const secondary  = "#10b981"; // Vue Green touch
const dark       = "##e7e7e7"; // Slate 900
const lightBg    = "#f8fafc";
const borderCol  = "#e2e8f0";
const softGray ="#2563eb"

const getInitialData = () => ({
  name: "FRONTEND ENGINEER",
  title: "Senior React Developer | UI/UX Enthusiast",
  location: "Pune, India",
  phone: "+91-99887-76655",
  email: "frontend.master@dev.com",
  github: "github.com/react-wizard",
  linkedin: "linkedin.com/in/frontend-pro",

  summaryTitle: "Developer Profile",
  experienceTitle: "Engineering Roadmap",
  skillsTitle: "Tech Stack",
  toolsTitle: "UI & Design Tools",
  eduTitle: "Education",

  summary: `Passionate Frontend Developer with 5+ years of expertise in building high-performance web applications using React and Vue. Strong eye for UI/UX details, specializing in responsive design, state management (Redux/Pinia), and performance optimization. Dedicated to writing clean, maintainable, and accessible code.`,

  skills: [
    "React.js / Next.js", "Vue.js / Nuxt.js", "TypeScript", "Tailwind CSS",
    "Redux / Pinia / Context API", "Unit Testing (Jest/Cypress)", "PWA & SEO Optimization"
  ],

  tools: [
    "Figma to Code", "Vite / Webpack", "Storybook", "Firebase", "Adobe XD"
  ],

  experience: [
    {
      company: "WebFlow Innovations",
      period: "2021 – Present",
      roles: [{
        title: "Senior Frontend Developer",
        bullets: [
          "Architected a scalable UI Component Library using React & Tailwind, used across 4 sub-projects.",
          "Optimized application performance, improving Lighthouse score from 65 to 98.",
          "Implemented complex data visualizations using D3.js and Chart.js.",
          "Collaborated with UI/UX teams to bridge the gap between design and technical implementation."
        ],
      }],
    },
    {
      company: "Digital Dream Studio",
      period: "2018 – 2021",
      roles: [{
        title: "Frontend Developer (Vue focused)",
        bullets: [
          "Developed a real-time collaboration tool using Vue 3 and WebSockets.",
          "Integrated RESTful APIs and managed global state using Pinia."
        ],
      }],
    },
  ],

  education: [{
    school: "University of Technology",
    year: "2018",
    degree: "B.Tech in Information Technology",
  }],
});

const FrontendDevTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, github, linkedin, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Plus Jakarta Sans', sans-serif", backgroundColor: "#fff", color: dark, boxSizing: "border-box" }}>
      
      {/* DEV HEADER */}
      <div style={{ background: dark, color: "black", padding: "12mm 15mm", position: "relative" }}>
        <div style={{ position: "absolute",color:"black", right: "15mm", top: "12mm", fontSize: "40px", opacity: "0.1", fontWeight: "900" }}>{"</>"}</div>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "32px", fontWeight: "800", letterSpacing: "-1px" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", color: primary, fontWeight: "700", textTransform: "uppercase", marginTop: "4px" }} />
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginTop: "20px", fontSize: "10px", opacity: "0.9" }}>
          <div>📍 <E value={location} onChange={(v) => u("location", v)} /></div>
          <div>📞 <E value={phone} onChange={(v) => u("phone", v)} /></div>
          <div>📧 <E value={email} onChange={(v) => u("email", v)} /></div>
          <div style={{ color: secondary, fontWeight: "bold" }}>🔗 <E value={github} onChange={(v) => u("github", v)} /></div>
        </div>
      </div>

      <div style={{ padding: "10mm 15mm" }}>
        
        {/* SUMMARY SECTION */}
        <div style={{ marginBottom: "25px", borderBottom: `1px solid black`, paddingBottom: "15px" }}>
          <div style={{ fontSize: "12px", fontWeight: "800", color: primary, textTransform: "uppercase", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "8px", height: "8px", background: secondary, borderRadius: "2px" }} />
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.7", color: "#475569" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "30px" }}>
          
          {/* LEFT: WORK EXPERIENCE */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: "800", textTransform: "uppercase", marginBottom: "15px", color: dark }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "25px", position: "relative", paddingLeft: "20px" }}>
                <div style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "2px", background: borderCol }} />
                <div style={{ position: "absolute", left: "-3px", top: "2px", width: "8px", height: "8px", borderRadius: "50%", background: primary }} />
                
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "12px" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ color: softGray, fontSize: "10px" }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "700", fontSize: "11px", color: primary, display: "block", marginTop: "3px" }} />
                    <ul style={{ margin: "10px 0", paddingLeft: "15px" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "10.5px", marginBottom: "6px", color: "#334155" }}>
                          <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* RIGHT: SKILLS & TECH */}
          <div>
            <div style={{ background: lightBg, padding: "15px", borderRadius: "12px", marginBottom: "20px" }}>
              <div style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase", marginBottom: "12px", color: primary }}>
                <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ fontSize: "10px", fontWeight: "600", display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ color: secondary }}>●</span>
                    <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "0 15px" }}>
              <div style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase", marginBottom: "12px" }}>
                <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "25px" }}>
                {tools.map((t, i) => (
                  <span key={i} style={{ border: `1px solid ${borderCol}`, padding: "3px 8px", fontSize: "9px", borderRadius: "4px", fontWeight: "600" }}>
                    <E value={t} onChange={(v) => { const a = ref.current.tools.map((item, j) => j === i ? v : item); u("tools", a); }} />
                  </span>
                ))}
              </div>

              <div style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase", marginBottom: "12px" }}>
                <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              </div>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10.5px" }} />
                  <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "9.5px", color: "#64748b" }} />
                  <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "9.5px", color: primary, fontWeight: "bold" }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default FrontendDevTemplate;