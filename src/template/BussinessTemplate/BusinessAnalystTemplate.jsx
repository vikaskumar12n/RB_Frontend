import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Clean Corporate Colors
const primary = "#111827";   // Charcoal Black
const secondary = "#4b5563"; // Graphite Grey
const borderCol = "#e5e7eb"; // Soft Slate

const getInitialData = () => ({
  name:     "FIRST LAST",
  location: "New York, USA",
  phone:    "+1-234-456-789",
  email:    "analyst@business.com",
  linkedin: "linkedin.com/in/username",

  objectiveTitle:     "Professional Summary",
  experienceTitle:    "Work Experience",
  projectTitle:       "Key Projects",
  educationTitle:     "Education",
  skillsTitle:        "Core Skills",
  certificationTitle: "Certifications",

  objective: `Results-driven Business Analyst with 5+ years of experience translating complex business needs into actionable insights. Proficient in data analysis, process optimization, and stakeholder management.`,

  skills: [
    ["Data Analysis", "SQL", "Excel", "Power BI"],
    ["Stakeholder Mgmt", "Agile", "JIRA", "Confluence"],
  ],

  experience: [
    {
      company: "Accenture Pvt. Ltd.",
      period: "2020 – Present",
      roles: [{
        title: "Senior Business Analyst",
        bullets: [
          "Led requirements gathering for a $2M digital transformation project.",
          "Reduced process inefficiencies by 35% through workflow redesign.",
          "Collaborated with cross-functional teams of 20+ stakeholders.",
          "Delivered weekly KPI dashboards using Power BI and SQL.",
        ],
      }],
    },
    {
      company: "InfoSys Ltd.",
      period: "2017 – 2020",
      roles: [{
        title: "Business Analyst",
        bullets: [
          "Documented 50+ functional and non-functional requirements.",
          "Conducted gap analysis and presented findings to C-suite executives.",
        ],
      }],
    },
  ],

  education: [{
    school: "IIM Ahmedabad",
    year:   "2017",
    degree: "MBA, Business Analytics",
  }],

  projects: [
    { title: "ERP Migration",       description: "Led end-to-end business analysis for SAP ERP migration covering 8 departments." },
    { title: "Customer 360 Portal", description: "Defined requirements for a unified CRM portal serving 500K+ customers." },
  ],

  certifications: [
    "CBAP – Certified Business Analysis Professional",
    "PMI-PBA – Professional in Business Analysis",
  ],
});

const BusinessAnalystTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, location, phone, email, linkedin, objectiveTitle, experienceTitle, projectTitle, educationTitle, skillsTitle, certificationTitle, objective, projects, certifications, experience, education, skills } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", fontSize: "11px", lineHeight: "1.5", backgroundColor: "#fff", color: primary, boxSizing: "border-box", padding: "15mm" }}>

      {/* MINIMAL HEADER */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }} />
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "8px", fontSize: "11px", color: secondary }}>
          <E value={location} onChange={(v) => u("location", v)} />
          <span>•</span>
          <E value={phone} onChange={(v) => u("phone", v)} />
          <span>•</span>
          <E value={email} onChange={(v) => u("email", v)} />
          <span>•</span>
          <E value={linkedin} onChange={(v) => u("linkedin", v)} />
        </div>
      </div>

      {/* SUMMARY */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1.5px solid ${primary}`, marginBottom: "8px", paddingBottom: "2px" }}>
          <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
        </div>
        <E value={objective} onChange={(v) => u("objective", v)} block style={{ color: secondary, lineHeight: "1.6" }} />
      </div>

      {/* EXPERIENCE */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1.5px solid ${primary}`, marginBottom: "12px", paddingBottom: "2px" }}>
          <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
        </div>
        {experience.map((exp, ei) => (
          <div key={ei} style={{ marginBottom: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px" }}>
              <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
              <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} />
            </div>
            {exp.roles.map((role, ri) => (
              <div key={ri} style={{ marginTop: "4px" }}>
                <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => { if (i !== ei) return e; return { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) }; }); u("experience", a); }} style={{ fontWeight: "600", color: secondary, fontSize: "11px", display: "block", marginBottom: "4px" }} />
                <ul style={{ margin: 0, paddingLeft: "15px" }}>
                  {role.bullets.map((b, bi) => (
                    <li key={bi} style={{ marginBottom: "3px", color: secondary }}>
                      <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => { if (i !== ei) return e; return { ...e, roles: e.roles.map((r, j) => { if (j !== ri) return r; return { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) }; }) }; }); u("experience", a); }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* SKILLS */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1.5px solid ${primary}`, marginBottom: "8px", paddingBottom: "2px" }}>
          <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 15px", fontSize: "11px", color: secondary }}>
          {skills.flat().map((skill, i) => (
            <span key={i}>
              <E value={skill} onChange={(v) => { /* simplified update logic */ }} />
              {i !== skills.flat().length - 1 && <span style={{ color: borderCol, marginLeft: "15px" }}>|</span>}
            </span>
          ))}
        </div>
      </div>

      {/* TWO COLUMN BOTTOM SECTION */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        {/* PROJECTS */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1.5px solid ${primary}`, marginBottom: "8px", paddingBottom: "2px" }}>
            <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
          </div>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <E value={proj.title} onChange={(v) => { /* Update Logic */ }} style={{ fontWeight: "bold", fontSize: "11px", display: "block" }} />
              <E value={proj.description} onChange={(v) => { /* Update Logic */ }} style={{ fontSize: "10.5px", color: secondary }} />
            </div>
          ))}
        </div>

        {/* EDUCATION & CERTS */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1.5px solid ${primary}`, marginBottom: "8px", paddingBottom: "2px" }}>
            <E value={educationTitle} onChange={(v) => u("educationTitle", v)} />
          </div>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                <E value={edu.degree} onChange={(v) => { /* Update Logic */ }} />
                <E value={edu.year} onChange={(v) => { /* Update Logic */ }} />
              </div>
              <E value={edu.school} onChange={(v) => { /* Update Logic */ }} style={{ fontSize: "10.5px", color: secondary }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BusinessAnalystTemplate;