import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";
const E = (p) => <EditableSpan {...p} />;

// Formal Minimalist Theme (No Colors)
const black      = "#000000";
const darkGray   = "#374151";
const lightGray  = "#9ca3af";
const borderCol  = "#000000"; // Solid black for formal lines

const getInitialData = () => ({
  name: "MECHANICAL ENGINEER NAME",
  title: "Senior Design Engineer | Manufacturing Specialist",
  location: "Pune, Maharashtra",
  phone: "+91-77777-66666",
  email: "mech.pro@engineering.com",
  linkedin: "linkedin.com/in/mechanical-pro",

  summaryTitle: "Professional Profile",
  experienceTitle: "Professional Experience",
  skillsTitle: "Core Competencies",
  toolsTitle: "Software & Tools",
  eduTitle: "Education",

  summary: `Detail-oriented Mechanical Engineer with 5+ years of experience in product design, R&D, and manufacturing processes. Proficient in 3D modeling, finite element analysis (FEA), and thermal systems. Expert in optimizing production workflows and reducing manufacturing costs while maintaining high-quality standards.`,

  skills: [
    "Product Design (CAD/CAM)", "Finite Element Analysis", "HVAC Systems",
    "Thermodynamics", "Robotics & Automation", "Six Sigma & Lean Mfg"
  ],

  tools: [
    "SolidWorks", "AutoCAD", "CATIA", "ANSYS", "MATLAB"
  ],

  experience: [
    {
      company: "Tata Motors / Mahindra & Mahindra",
      period: "2021 – Present",
      roles: [{
        title: "Senior Design Engineer",
        bullets: [
          "Leading a team of 5 in the design and development of automotive chassis components.",
          "Performing stress analysis and CFD simulations to ensure component durability.",
          "Collaborating with vendors to source high-grade materials, reducing costs by 10%.",
          "Implementing Lean Manufacturing principles to improve assembly line efficiency."
        ],
      }],
    },
    {
      company: "Precision Tools Pvt Ltd.",
      period: "2018 – 2021",
      roles: [{
        title: "Mechanical Site Engineer",
        bullets: [
          "Supervised the installation and commissioning of heavy industrial machinery.",
          "Maintained 99% equipment uptime through proactive preventive maintenance schedules.",
        ],
      }],
    },
  ],

  education: [{
    school: "National Institute of Technology (NIT)",
    year: "2018",
    degree: "B.Tech in Mechanical Engineering",
  }],
});

const MechanicalSimpleTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, linkedin, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Times New Roman', Times, serif", backgroundColor: "#fff", color: black, padding: "15mm", boxSizing: "border-box" }}>
      
      {/* HEADER SECTION - CENTERED & BOLD */}
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "24px", fontWeight: "bold", textTransform: "uppercase" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "13px", fontWeight: "bold", marginTop: "3px" }} />
        <div style={{ fontSize: "11px", marginTop: "8px" }}>
          <E value={location} onChange={(v) => u("location", v)} /> | <E value={phone} onChange={(v) => u("phone", v)} /> | <E value={email} onChange={(v) => u("email", v)} />
        </div>
        <div style={{ fontSize: "11px", marginTop: "2px", fontWeight: "bold" }}>
          <E value={linkedin} onChange={(v) => u("linkedin", v)} />
        </div>
      </div>

      {/* SUMMARY */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "12px", fontWeight: "bold",paddingBottom:"6px", textTransform: "uppercase", borderBottom: `1.5px solid ${black}`, marginBottom: "5px" }}>
          <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
        </div>
        <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.4", textAlign: "justify" }} />
      </div>

      {/* WORK EXPERIENCE */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "12px", fontWeight: "bold",paddingBottom:"6px", textTransform: "uppercase", borderBottom: `1.5px solid ${black}`, marginBottom: "10px" }}>
          <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
        </div>
        {experience.map((exp, ei) => (
          <div key={ei} style={{ marginBottom: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold",paddingBottom:"6px", fontSize: "11px" }}>
              <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
              <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} />
            </div>
            {exp.roles.map((role, ri) => (
              <div key={ri}>
                <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "bold",paddingBottom:"6px", fontSize: "11px", fontStyle: "italic", display: "block" }} />
                <ul style={{ margin: "5px 0", paddingLeft: "25px" }}>
                  {role.bullets.map((b, bi) => (
                    <li key={bi} style={{ fontSize: "10.5px", marginBottom: "3px" }}>
                      <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* SKILLS, TOOLS & EDUCATION - TWO COLUMN LAYOUT */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        
        {/* COLUMN 1: SKILLS & TOOLS */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: "bold",paddingBottom:"6px", textTransform: "uppercase", borderBottom: `1.5px solid ${black}`, marginBottom: "8px" }}>
            <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
          </div>
          <div style={{ fontSize: "10.5px", lineHeight: "1.6" }}>
            {skills.map((s, i) => (
              <span key={i}>
                <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                {i !== skills.length - 1 ? " • " : ""}
              </span>
            ))}
          </div>

          <div style={{ fontSize: "12px", fontWeight: "bold",paddingBottom:"6px", textTransform: "uppercase", borderBottom: `1.5px solid ${black}`, marginBottom: "8px", marginTop: "20px" }}>
            <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
          </div>
          <div style={{ fontSize: "10.5px" }}>
            {tools.map((tool, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                <E value={tool} onChange={(v) => { const a = ref.current.tools.map((t, j) => j === i ? v : t); u("tools", a); }} />
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 2: EDUCATION */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: "bold",paddingBottom:"6px", textTransform: "uppercase", borderBottom: `1.5px solid ${black}`, marginBottom: "8px" }}>
            <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
          </div>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold",paddingBottom:"6px", fontSize: "11px" }} />
              <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10.5px" }} />
              <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "10.5px", fontWeight: "bold" }} />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default MechanicalSimpleTemplate;