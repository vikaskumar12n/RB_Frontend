import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";
const E = (p) => <EditableSpan {...p} />;

// Minimalist Theme Colors
const primary = "#000000";
const secondary = "#4b5563";
const line = "#e5e7eb";

const getInitialData = () => ({
  name:     "FIRST LAST",
  location: "Bangalore, India",
  phone:    "+91-234-456-789",
  email:    "mba@corporate.com",
  linkedin: "linkedin.com/in/username",

  objectiveTitle:      "Profile Summary",
  experienceTitle:     "Professional Experience",
  projectTitle:        "Academic Projects",
  educationTitle:      "Education",
  skillsTitle:         "Key Skills",
  certificationTitle:  "Certifications",

  objective: `High-performing MBA Graduate with specialization in Finance & Strategy. Strong foundation in corporate finance, strategic management, and organizational behavior. Seeking to leverage academic excellence and internship experience to drive business growth in a dynamic corporate environment.`,

  skills: [
    ["Financial Modeling", "Strategy", "Excel", "Python"],
    ["Market Research", "Consulting", "PowerPoint", "Tableau"],
  ],

  experience: [
    {
      company: "Deloitte India",
      period: "Summer 2023",
      roles: [{
        title: "Strategy Intern",
        bullets: [
          "Conducted industry analysis for a $500M M&A deal in the pharma sector.",
          "Developed financial models and valuation reports for 3 client engagements.",
          "Presented recommendations to senior management resulting in client retention.",
        ],
      }],
    },
    {
      company: "HDFC Bank",
      period: "Winter 2022",
      roles: [{
        title: "Corporate Banking Intern",
        bullets: [
          "Assisted in credit appraisal of SME loan applications worth ₹50Cr+.",
          "Prepared sector research reports on FMCG and Auto industries.",
        ],
      }],
    },
  ],

  education: [
    { school: "IIM Calcutta", year: "2022–2024", degree: "MBA – Finance & Strategy" },
    { school: "Delhi University", year: "2019–2022", degree: "B.Com (Hons.) – 9.1 CGPA" },
  ],

  projects: [
    { title: "Merger Analysis", description: "Analyzed synergies in a hypothetical $200M tech merger — presented DCF, comparable company analysis and accretion/dilution model." },
    { title: "Go-to-Market Plan", description: "Developed complete GTM strategy for a fintech startup as part of strategy consulting simulation." },
  ],

  certifications: [
    "CFA Level 1 – Cleared",
    "Financial Modeling & Valuation – Wall Street Prep",
  ],
});

// ── Minimal Section Heading (No Boxes/Gradients) ───────────────────────────────
const SHead = ({ children }) => (
  <div style={{ marginTop: "16px", marginBottom: "6px", borderBottom: `1px solid ${primary} ` }}>
    <span style={{ fontSize: "11px",paddingBottom:"5px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: primary }}>
      {children}
    </span>
  </div>
);

const MBATemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, location, phone, email, linkedin, objectiveTitle, experienceTitle, projectTitle, educationTitle, skillsTitle, certificationTitle, objective, projects, certifications, experience, education, skills } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Times New Roman', serif", fontSize: "11px", lineHeight: "1.4", backgroundColor: "#fff", color: primary, boxSizing: "border-box", padding: "15mm", }}>

      {/* HEADER - Clean and Centered */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "26px",paddingBottom:"6px", fontWeight: "bold", textTransform: "uppercase" }} />
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "5px", fontSize: "10px", color: secondary }}>
          <E value={location} onChange={(v) => u("location", v)} />
          <span>|</span>
          <E value={phone} onChange={(v) => u("phone", v)} />
          <span>|</span>
          <E value={email} onChange={(v) => u("email", v)} />
          <span>|</span>
          <E value={linkedin} onChange={(v) => u("linkedin", v)} />
        </div>
      </div>

      {/* SUMMARY */}
      <SHead><E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} /></SHead>
      <E value={objective} onChange={(v) => u("objective", v)} block style={{ marginTop: "4px", textAlign: "justify" ,paddingBottom:"5px"}} />

      {/* EDUCATION - Moved to top for MBA Students */}
      <SHead><E value={educationTitle} onChange={(v) => u("educationTitle", v)} /></SHead>
      {education.map((edu, i) => (
        <div key={i} style={{ marginBottom: "6px", }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
            <E value={edu.school} onChange={(v) => { /* Update logic */ }} />
            <E value={edu.year} onChange={(v) => { /* Update logic */ }} />
          </div>
          <E value={edu.degree} onChange={(v) => { /* Update logic */ }} style={{ fontStyle: "italic" }} />
        </div>
      ))}

      {/* EXPERIENCE */}
      <SHead><E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} /></SHead>
      {experience.map((exp, ei) => (
        <div key={ei} style={{ marginTop: "8px",paddingBottom:"5px"}}>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
            <E value={exp.company} onChange={(v) => { /* Update logic */ }} />
            <E value={exp.period} onChange={(v) => { /* Update logic */ }} />
          </div>
          {exp.roles.map((role, ri) => (
            <div key={ri}>
              <E value={role.title} onChange={(v) => { /* Update logic */ }} style={{ fontStyle: "italic", color: secondary }} />
              <ul style={{ paddingLeft: "18px", margin: "4px 0" }}>
                {role.bullets.map((b, bi) => (
                  <li key={bi} style={{ marginBottom: "2px" }}>
                    <E value={b} onChange={(v) => { /* Update logic */ }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}

      {/* PROJECTS */}
      <SHead><E value={projectTitle} onChange={(v) => u("projectTitle", v)} /></SHead>
      {projects.map((proj, i) => (
        <div key={i} style={{ marginTop: "6px" }}>
          <E value={proj.title} onChange={(v) => { /* Update logic */ }} style={{ fontWeight: "bold", display: "block" }} />
          <E value={proj.description} onChange={(v) => { /* Update logic */ }} />
        </div>
      ))}

      {/* SKILLS & CERTS (Side by Side) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" ,paddingBottom:"5px" }}>
        <div>
          <SHead><E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} /></SHead>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px" }}>
            {skills.flat().map((skill, i) => (
              <span key={i} style={{ fontSize: "10.5px" }}>
                • <E value={skill} onChange={(v) => { /* Update logic */ }} />
              </span>
            ))}
          </div>
        </div>
        <div>
          <SHead><E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} /></SHead>
          {certifications.map((cert, i) => (
            <div key={i} style={{ fontSize: "10.5px", marginBottom: "2px" }}>
              • <E value={cert} onChange={(v) => { /* Update logic */ }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MBATemplate;