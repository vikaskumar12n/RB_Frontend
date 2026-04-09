import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

const accent = "#312e81";
const light   = "#eef2ff";
const mid     = "#818cf8";

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

  objective: `Results-driven Business Analyst with 5+ years of experience translating complex business needs into actionable insights. Proficient in data analysis, process optimization, and stakeholder management. Adept at bridging the gap between technical teams and business units to deliver scalable solutions.`,

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
        period: "",
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
        period: "",
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

const buildPayload = (data) => ({
  personalInfo: { name: data.name, email: data.email, phone: data.phone, location: data.location, linkedin: data.linkedin },
  objective: data.objective,
  skills: { frontend: data.skills?.[0] ?? [], backend: data.skills?.[1] ?? [] },
  education: data.education.map((e) => ({ degree: e.degree, college: e.school, year: e.year, description: e.description || "" })),
  experience: data.experience.map((exp) => ({ role: exp.roles?.[0]?.title || "", company: exp.company, duration: exp.period, responsibilities: exp.roles?.[0]?.bullets || [] })),
  projects: data.projects.map((p) => ({ title: p.title, description: p.description, technologies: p.technologies || [], features: p.features || [], link: p.link || "" })),
  certifications: data.certifications.map((c) => typeof c === "string" ? { title: c, organization: "", year: "" } : c),
});

// ── Section heading ────────────────────────────────────────────────────────────
const SHead = ({ children }) => (
  <div style={{ marginTop: "12px", marginBottom: "5px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ width: "4px", height: "16px", background: accent, borderRadius: "2px", flexShrink: 0 }} />
      <span style={{ fontSize: "9px", fontFamily: "'Trebuchet MS', sans-serif", fontWeight: "900", letterSpacing: "3px", textTransform: "uppercase", color: accent }}>
        {children}
      </span>
    </div>
    <div style={{ height: "1px", background: light, marginTop: "4px" }} />
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const BusinessAnalystTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, location, phone, email, linkedin, objectiveTitle, experienceTitle, projectTitle, educationTitle, skillsTitle, certificationTitle, objective, projects, certifications, experience, education, skills } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Georgia', serif", fontSize: "10.5px", lineHeight: "1.5", backgroundColor: "#fff", color: "#1a1a1a", boxSizing: "border-box" }}>

      {/* HEADER */}
      <div style={{ background: accent, padding: "10mm 14mm 8mm" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "24px", fontWeight: "bold", color: "#fff", letterSpacing: "3px", textTransform: "uppercase" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0 16px", marginTop: "6px", fontSize: "9px", color: "#c7d2fe", fontFamily: "'Trebuchet MS', sans-serif" }}>
          <E value={location} onChange={(v) => u("location", v)} />
          <E value={phone}    onChange={(v) => u("phone", v)} />
          <E value={email}    onChange={(v) => u("email", v)} />
          <E value={linkedin} onChange={(v) => u("linkedin", v)} />
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: "6mm 14mm 14mm" }}>

        {/* OBJECTIVE */}
        <SHead><E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} style={{ color: accent }} /></SHead>
        <div style={{ background: light, borderLeft: `3px solid ${accent}`, padding: "6px 10px", fontSize: "10px", lineHeight: "1.7", color: "#333", fontFamily: "'Trebuchet MS', sans-serif" }}>
          <E value={objective} onChange={(v) => u("objective", v)} block />
        </div>

        {/* EXPERIENCE */}
        <SHead><E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} style={{ color: accent }} /></SHead>
        {experience.map((exp, ei) => (
          <div key={ei} style={{ marginTop: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} style={{ fontWeight: "bold", fontSize: "11px" }} />
              <E value={exp.period}  onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ fontSize: "9px", color: accent, fontWeight: "bold", whiteSpace: "nowrap", marginLeft: "8px", fontFamily: "'Trebuchet MS', sans-serif" }} />
            </div>
            {exp.roles.map((role, ri) => (
              <div key={ri} style={{ marginTop: "3px", paddingLeft: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => { if (i !== ei) return e; return { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) }; }); u("experience", a); }} style={{ fontStyle: "italic", color: "#555", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "10px" }} />
                  <E value={role.period || ""} onChange={(v) => { const a = ref.current.experience.map((e, i) => { if (i !== ei) return e; return { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, period: v } : r) }; }); u("experience", a); }} style={{ fontSize: "9px", color: "#999", whiteSpace: "nowrap", marginLeft: "8px", fontFamily: "'Trebuchet MS', sans-serif" }} />
                </div>
                <ul style={{ paddingLeft: "14px", margin: 0 }}>
                  {role.bullets.map((b, bi) => (
                    <li key={bi} style={{ listStyle: "none", display: "flex", gap: "6px", marginTop: "2px", alignItems: "flex-start" }}>
                      <span style={{ color: mid, marginTop: "1px", fontSize: "8px" }}>◆</span>
                      <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => { if (i !== ei) return e; return { ...e, roles: e.roles.map((r, j) => { if (j !== ri) return r; return { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) }; }) }; }); u("experience", a); }} style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "10px", lineHeight: "1.6" }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        {/* PROJECTS */}
        <SHead><E value={projectTitle} onChange={(v) => u("projectTitle", v)} style={{ color: accent }} /></SHead>
        {projects.map((proj, i) => (
          <div key={i} style={{ marginTop: "6px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
            <span style={{ color: "#fff", background: accent, fontSize: "8px", padding: "1px 6px", borderRadius: "2px", whiteSpace: "nowrap", fontFamily: "'Trebuchet MS', sans-serif", marginTop: "2px", flexShrink: 0 }}>
              <E value={proj.title} onChange={(v) => { const a = ref.current.projects.map((p, j) => j === i ? { ...p, title: v } : p); u("projects", a); }} style={{ color: "#fff" }} />
            </span>
            <E value={proj.description} onChange={(v) => { const a = ref.current.projects.map((p, j) => j === i ? { ...p, description: v } : p); u("projects", a); }} style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "10px", lineHeight: "1.6", color: "#333" }} />
          </div>
        ))}

        {/* EDUCATION */}
        <SHead><E value={educationTitle} onChange={(v) => u("educationTitle", v)} style={{ color: accent }} /></SHead>
        {education.map((edu, i) => (
          <div key={i} style={{ marginTop: "5px", display: "flex", justifyContent: "space-between" }}>
            <div>
              <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} style={{ fontWeight: "bold", fontSize: "11px" }} />
              <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontStyle: "italic", color: "#555", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "10px" }} />
            </div>
            <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ background: light, border: `1px solid ${accent}`, color: accent, fontSize: "9px", padding: "1px 8px", borderRadius: "10px", fontFamily: "'Trebuchet MS', sans-serif", whiteSpace: "nowrap", fontWeight: "bold" }} />
          </div>
        ))}

        {/* SKILLS */}
        <SHead><E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} style={{ color: accent }} /></SHead>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "4px" }}>
          {skills.map((row, ri) => row.map((cell, ci) => cell ? (
            <div key={`${ri}-${ci}`} style={{ background: light, border: `1px solid ${mid}`, borderRadius: "3px", padding: "2px 9px", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "9.5px", color: accent }}>
              <E value={cell} onChange={(v) => { const a = ref.current.skills.map((r) => [...r]); a[ri][ci] = v; u("skills", a); }} style={{ color: accent }} />
            </div>
          ) : null))}
        </div>

        {/* CERTIFICATIONS */}
        <SHead><E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} style={{ color: accent }} /></SHead>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", marginTop: "4px" }}>
          {certifications.map((cert, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "10px" }}>
              <span style={{ width: "7px", height: "7px", background: accent, borderRadius: "50%", flexShrink: 0, display: "inline-block" }} />
              <E value={cert} onChange={(v) => { const a = ref.current.certifications.map((c, j) => j === i ? v : c); u("certifications", a); }} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BusinessAnalystTemplate;