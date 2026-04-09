import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";
const E = (p) => <EditableSpan {...p} />;

const accent = "#065f46";
const light   = "#ecfdf5";
const mid     = "#6ee7b7";

const getInitialData = () => ({
  name:     "FIRST LAST",
  location: "Bangalore, India",
  phone:    "+91-234-456-789",
  email:    "mba@corporate.com",
  linkedin: "linkedin.com/in/username",

  objectiveTitle:      "Profile",
  experienceTitle:     "Professional Experience",
  projectTitle:        "Academic Projects",
  educationTitle:      "Education",
  skillsTitle:         "Skills",
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
        period: "",
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
        period: "",
        bullets: [
          "Assisted in credit appraisal of SME loan applications worth ₹50Cr+.",
          "Prepared sector research reports on FMCG and Auto industries.",
        ],
      }],
    },
  ],

  education: [
    {
      school: "IIM Calcutta",
      year:   "2022–2024",
      degree: "MBA – Finance & Strategy",
    },
    {
      school: "Delhi University",
      year:   "2019–2022",
      degree: "B.Com (Hons.) – 9.1 CGPA",
    },
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
      <span style={{ fontSize: "9px", fontFamily: "'Trebuchet MS', sans-serif", fontWeight: "900", letterSpacing: "3px", textTransform: "uppercase", color: accent }}>
        {children}
      </span>
    </div>
    <div style={{ height: "2px", background: `linear-gradient(to right, ${accent}, transparent)`, marginTop: "3px" }} />
  </div>
);

// ── Sidebar section heading ────────────────────────────────────────────────────
const SideHead = ({ children }) => (
  <div style={{ marginTop: "12px", marginBottom: "6px" }}>
    <span style={{ fontSize: "8px", fontFamily: "'Trebuchet MS', sans-serif", fontWeight: "900", letterSpacing: "2px", textTransform: "uppercase", color: "#fff", background: accent, padding: "2px 8px", borderRadius: "2px" }}>
      {children}
    </span>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const MBATemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, location, phone, email, linkedin, objectiveTitle, experienceTitle, projectTitle, educationTitle, skillsTitle, certificationTitle, objective, projects, certifications, experience, education, skills } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Georgia', serif", fontSize: "10.5px", lineHeight: "1.5", backgroundColor: "#fff", color: "#1a1a1a", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>

      {/* HEADER */}
      <div style={{ background: accent, padding: "8mm 14mm" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "24px", fontWeight: "bold", color: "#fff", letterSpacing: "3px", textTransform: "uppercase" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0 16px", marginTop: "6px", fontSize: "9px", color: mid, fontFamily: "'Trebuchet MS', sans-serif" }}>
          <E value={location} onChange={(v) => u("location", v)} />
          <E value={phone}    onChange={(v) => u("phone", v)} />
          <E value={email}    onChange={(v) => u("email", v)} />
          <E value={linkedin} onChange={(v) => u("linkedin", v)} />
        </div>
      </div>

      {/* TWO-COLUMN BODY */}
      <div style={{ display: "flex", flex: 1 }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{ width: "62mm", background: light, padding: "6mm 6mm 10mm", flexShrink: 0, borderRight: `2px solid ${mid}` }}>

          {/* EDUCATION in sidebar */}
          <SideHead>
            <E value={educationTitle} onChange={(v) => u("educationTitle", v)} style={{ color: "#fff" }} />
          </SideHead>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10px", color: accent }} />
              <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontStyle: "italic", color: "#444", fontSize: "9px", fontFamily: "'Trebuchet MS', sans-serif", marginTop: "1px" }} />
              <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} block style={{ color: accent, fontSize: "9px", fontFamily: "'Trebuchet MS', sans-serif", fontWeight: "bold", marginTop: "2px" }} />
            </div>
          ))}

          {/* SKILLS in sidebar */}
          <SideHead>
            <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} style={{ color: "#fff" }} />
          </SideHead>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {skills.map((row, ri) => row.map((cell, ci) => cell ? (
              <div key={`${ri}-${ci}`} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "9.5px", fontFamily: "'Trebuchet MS', sans-serif" }}>
                <span style={{ width: "5px", height: "5px", background: accent, borderRadius: "50%", flexShrink: 0 }} />
                <E value={cell} onChange={(v) => { const a = ref.current.skills.map((r) => [...r]); a[ri][ci] = v; u("skills", a); }} style={{ color: "#333" }} />
              </div>
            ) : null))}
          </div>

          {/* CERTIFICATIONS in sidebar */}
          <SideHead>
            <E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} style={{ color: "#fff" }} />
          </SideHead>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: "5px", display: "flex", gap: "5px", alignItems: "flex-start", fontSize: "9.5px", fontFamily: "'Trebuchet MS', sans-serif" }}>
              <span style={{ color: accent, marginTop: "1px", flexShrink: 0 }}>✔</span>
              <E value={cert} onChange={(v) => { const a = ref.current.certifications.map((c, j) => j === i ? v : c); u("certifications", a); }} style={{ color: "#333" }} />
            </div>
          ))}

        </div>

        {/* ── RIGHT MAIN ── */}
        <div style={{ flex: 1, padding: "6mm 10mm 10mm" }}>

          {/* PROFILE */}
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
                        <span style={{ color: accent, marginTop: "1px", fontSize: "8px" }}>●</span>
                        <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => { if (i !== ei) return e; return { ...e, roles: e.roles.map((r, j) => { if (j !== ri) return r; return { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) }; }) }; }); u("experience", a); }} style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "10px", lineHeight: "1.6" }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          {/* ACADEMIC PROJECTS */}
          <SHead><E value={projectTitle} onChange={(v) => u("projectTitle", v)} style={{ color: accent }} /></SHead>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginTop: "6px" }}>
              <E value={proj.title} onChange={(v) => { const a = ref.current.projects.map((p, j) => j === i ? { ...p, title: v } : p); u("projects", a); }} style={{ fontWeight: "bold", fontSize: "10.5px", color: accent, display: "block" }} />
              <E value={proj.description} onChange={(v) => { const a = ref.current.projects.map((p, j) => j === i ? { ...p, description: v } : p); u("projects", a); }} style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "10px", lineHeight: "1.6", color: "#444" }} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default MBATemplate;