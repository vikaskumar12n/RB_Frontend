import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Design Intern - Minimalist Portfolio-Style Theme (No Borders, No Color)
const black      = "#000000";
const darkGray   = "#27272a";
const lightGray  = "#71717a";
const white      = "#ffffff";

const getInitialData = () => ({
  name: "DESIGN INTERN NAME",
  title: "UI/UX Designer | Visual Storyteller | Graphic Design Student",
  location: "Pune, India",
  phone: "+91-99999-00000",
  email: "design.intern@portfolio.com",
  portfolio: "behance.net/design-pro",
  linkedin: "linkedin.com/in/designer-nextgen",

  objectiveTitle: "Design Philosophy",
  skillsTitle: "Design Toolkit",
  projectTitle: "Selected Projects",
  eduTitle: "Design Education",
  toolTitle: "Software Proficiency",

  objective: `Aspiring Designer with a focus on creating intuitive, user-centric experiences. Passionate about minimal aesthetics and functional design. Seeking an internship to contribute to creative projects and refine skills in UI/UX, branding, and visual communication.`,

  skills: [
    "User Interface (UI) Design", "User Experience (UX) Research", 
    "Visual Branding & Identity", "Typography & Layout", 
    "Wireframing & Prototyping", "Design Systems"
  ],

  tools: [
    "Figma / Adobe XD", "Adobe Photoshop", "Adobe Illustrator", "After Effects (Basic)", "Webflow"
  ],

  projects: [
    {
      name: "Food Delivery App - UX Case Study",
      link: "View Case Study",
      bullets: [
        "Conducted user research and created personas for a niche food delivery market.",
        "Designed high-fidelity prototypes in Figma, resulting in a 15% improvement in task completion rate during testing.",
        "Developed a cohesive design system with reusable components and accessible color palettes."
      ],
    },
    {
      name: "Brand Identity: 'Neo-Eco' Startup",
      link: "View Project",
      bullets: [
        "Created a complete visual identity including logo, typography, and social media guidelines.",
        "Focused on sustainability themes through minimalist iconography and organic color theory."
      ],
    },
  ],

  education: [
    {
      school: "National Institute of Design (NID)",
      year: "2022 – 2026 (Ongoing)",
      degree: "Bachelor of Design (B.Des) in Interaction Design",
    }
  ],
});

const DesignInternTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, portfolio, linkedin, objectiveTitle, skillsTitle, projectTitle, eduTitle, toolTitle, objective, skills, tools, projects, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: white, color: black, padding: "20mm", boxSizing: "border-box" }}>
      
      {/* HEADER - CLEAN & BOLD */}
      <div style={{ marginBottom: "15mm" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "40px", fontWeight: "900", letterSpacing: "-1.5px", lineHeight: "1" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "11px", fontWeight: "500", textTransform: "uppercase", letterSpacing: "1px", color: lightGray, marginTop: "10px" }} />
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "15px", fontSize: "10px", fontWeight: "600" }}>
          <span><E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span>/</span>
          <span><E value={email} onChange={(v) => u("email", v)} /></span>
          <span>/</span>
          <span style={{ textDecoration: "underline" }}><E value={portfolio} onChange={(v) => u("portfolio", v)} /></span>
          <span>/</span>
          <span><E value={location} onChange={(v) => u("location", v)} /></span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "50px" }}>
        
        {/* LEFT COLUMN - INFO & SKILLS */}
        <div style={{ borderRight: "1px solid #f0f0f0", paddingRight: "10px" }}>
          
          {/* EDUCATION */}
          <div style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "15px", color: lightGray }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "700", fontSize: "12px", marginBottom: "4px" }} />
                <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10px", color: darkGray }} />
                <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "10px", fontWeight: "800", marginTop: "5px", display: "block" }} />
              </div>
            ))}
          </div>

          {/* SKILLS */}
          <div style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "15px", color: lightGray }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            {skills.map((s, i) => (
              <div key={i} style={{ fontSize: "11px", marginBottom: "10px", fontWeight: "500", display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontSize: "6px" }}>●</span>
                <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
              </div>
            ))}
          </div>

          {/* SOFTWARE */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "15px", color: lightGray }}>
              <E value={toolTitle} onChange={(v) => u("toolTitle", v)} />
            </div>
            {tools.map((t, i) => (
              <div key={i} style={{ fontSize: "10px", fontWeight: "700", border: `1px solid ${black}`, padding: "6px 10px", marginBottom: "6px", textAlign: "center" }}>
                <E value={t} onChange={(v) => { const a = ref.current.tools.map((item, j) => j === i ? v : item); u("tools", a); }} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN - PHILOSOPHY & PROJECTS */}
        <div>
          {/* PHILOSOPHY */}
          <div style={{ marginBottom: "35px" }}>
            <div style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px", color: lightGray }}>
              <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
            </div>
            <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "12px", lineHeight: "1.8", textAlign: "justify", fontWeight: "500" }} />
          </div>

          {/* PROJECTS */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "20px", color: lightGray }}>
              <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
            </div>
            {projects.map((proj, pi) => (
              <div key={pi} style={{ marginBottom: "30px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <E value={proj.name} onChange={(v) => { const a = ref.current.projects.map((p, i) => i === pi ? { ...p, name: v } : p); u("projects", a); }} style={{ fontWeight: "900", fontSize: "14px" }} />
                  <E value={proj.link} onChange={(v) => { const a = ref.current.projects.map((p, i) => i === pi ? { ...p, link: v } : p); u("projects", a); }} style={{ fontSize: "9px", textDecoration: "underline", fontWeight: "700" }} />
                </div>
                <ul style={{ margin: "12px 0", paddingLeft: "0", listStyleType: "none" }}>
                  {proj.bullets.map((b, bi) => (
                    <li key={bi} style={{ fontSize: "11px", marginBottom: "8px", lineHeight: "1.5", color: darkGray }}>
                      <E value={b} onChange={(v) => { const a = ref.current.projects.map((p, i) => i === pi ? { ...p, bullets: p.bullets.map((bul, k) => k === bi ? v : bul) } : p); u("projects", a); }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default DesignInternTemplate;