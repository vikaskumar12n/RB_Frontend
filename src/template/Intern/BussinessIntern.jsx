import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Business Intern - Clean Corporate Theme (No Borders, No Color)
const black      = "#000000";
const darkGray   = "#374151";
const lightGray  = "#6b7280";
const white      = "#ffffff";

const getInitialData = () => ({
  name: "BUSINESS INTERN NAME",
  title: "Management Student | Aspiring Business Analyst | Strategy",
  location: "Mumbai, India",
  phone: "+91-90000-11111",
  email: "intern.biz@email.com",
  linkedin: "linkedin.com/in/business-aspirant",

  objectiveTitle: "Career Objective",
  skillsTitle: "Core Competencies",
  projectTitle: "Academic & Internship Projects",
  eduTitle: "Education",
  extraTitle: "Extracurricular & Leadership",

  objective: `Detail-oriented Management student with strong analytical and communication skills. Seeking a Business Development or Operations internship to apply market research, data analysis, and strategic planning knowledge. Quick learner with a proven track record of leadership in college organizations.`,

  skills: [
    "Market Research & Competitor Analysis", "Data Visualization (Excel/Tableau)", 
    "Business Communication & Pitching", "Financial Literacy & Budgeting", 
    "CRM Tools (HubSpot/Salesforce Basics)", "Strategic Problem Solving"
  ],

  projects: [
    {
      name: "Market Entry Strategy Project",
      period: "Winter Internship 2024",
      bullets: [
        "Conducted primary research on consumer behavior for a new EdTech startup, surveying 200+ potential users.",
        "Analyzed competitor pricing models and presented a gap analysis report to the founding team.",
        "Identified 3 key market trends that led to a pivot in the company's social media strategy."
      ],
    },
    {
      name: "Financial Analysis of Retail Sector",
      period: "Academic Project - Semester 4",
      bullets: [
        "Performed ratio analysis on the annual reports of top 5 retail companies in India.",
        "Used Excel to create a forecasting model for sales growth over the next 2 fiscal years."
      ],
    },
  ],

  education: [
    {
      school: "Symbiosis Institute of Business Management",
      year: "2023 – 2025 (Expected)",
      degree: "MBA / BBA in Marketing & Finance",
    },
    {
      school: "Delhi Public School",
      year: "2022",
      degree: "Higher Secondary Education (Commerce)",
    }
  ],

  extras: [
    "President of the College Entrepreneurship Cell",
    "Winner of Inter-College Case Study Competition 2023",
    "Volunteer for National Service Scheme (NSS)"
  ],
});

const BusinessInternTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, linkedin, objectiveTitle, skillsTitle, projectTitle, eduTitle, extraTitle, objective, skills, projects, education, extras } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: white, color: black, padding: "20mm", boxSizing: "border-box" }}>
      
      {/* HEADER - MINIMALIST */}
      <div style={{ marginBottom: "12mm" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "32px", fontWeight: "300", letterSpacing: "1px" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: darkGray, marginTop: "5px" }} />
        
        <div style={{ display: "flex", gap: "20px", marginTop: "15px", fontSize: "10px", fontWeight: "500", color: lightGray }}>
          <span>📍 <E value={location} onChange={(v) => u("location", v)} /></span>
          <span>📞 <E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span>📧 <E value={email} onChange={(v) => u("email", v)} /></span>
          <span>🔗 <E value={linkedin} onChange={(v) => u("linkedin", v)} /></span>
        </div>
      </div>

      {/* OBJECTIVE */}
      <div style={{ marginBottom: "25px" }}>
        <div style={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
          <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
        </div>
        <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "11px", lineHeight: "1.6", textAlign: "justify", color: darkGray }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        
        {/* LEFT COLUMN: PROJECTS & EXTRAS */}
        <div>
          <div style={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px", borderBottom: "1px solid #000" }}>
            <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
          </div>
          {projects.map((proj, pi) => (
            <div key={pi} style={{ marginBottom: "20px" }}>
              <div style={{ fontWeight: "800", fontSize: "12px" }}>
                <E value={proj.name} onChange={(v) => { const a = ref.current.projects.map((p, i) => i === pi ? { ...p, name: v } : p); u("projects", a); }} />
              </div>
              <E value={proj.period} onChange={(v) => { const a = ref.current.projects.map((p, i) => i === pi ? { ...p, period: v } : p); u("projects", a); }} block style={{ fontSize: "9px", fontWeight: "600", fontStyle: "italic", marginBottom: "8px" }} />
              <ul style={{ margin: "0", paddingLeft: "15px", listStyleType: "circle" }}>
                {proj.bullets.map((b, bi) => (
                  <li key={bi} style={{ fontSize: "10.5px", marginBottom: "5px", lineHeight: "1.4", color: darkGray }}>
                    <E value={b} onChange={(v) => { const a = ref.current.projects.map((p, i) => i === pi ? { ...p, bullets: p.bullets.map((bul, k) => k === bi ? v : bul) } : p); u("projects", a); }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div style={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1px", marginTop: "10px", marginBottom: "15px", borderBottom: "1px solid #000" }}>
            <E value={extraTitle} onChange={(v) => u("extraTitle", v)} />
          </div>
          {extras.map((item, i) => (
            <div key={i} style={{ fontSize: "10.5px", marginBottom: "8px", color: darkGray, display: "flex", gap: "8px" }}>
              <span>•</span>
              <E value={item} onChange={(v) => { const a = ref.current.extras.map((ex, j) => j === i ? v : ex); u("extras", a); }} />
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: SKILLS & EDUCATION */}
        <div>
          <div style={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px", borderBottom: "1px solid #000" }}>
            <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" }}>
            {skills.map((s, i) => (
              <div key={i} style={{ fontSize: "10.5px", fontWeight: "500", padding: "5px 0", borderBottom: "0.5px solid #eee" }}>
                <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
              </div>
            ))}
          </div>

          <div style={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px", borderBottom: "1px solid #000" }}>
            <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
          </div>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "15px" }}>
              <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "700", fontSize: "11px" }} />
              <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10px", marginTop: "2px" }} />
              <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "10px", fontWeight: "700" }} />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default BusinessInternTemplate;