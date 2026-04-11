import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";
const E = (p) => <EditableSpan {...p} />;

// Neutral Professional Colors
const primary = "#111827";   // Charcoal
const secondary = "#4b5563"; // Grey
const borderCol = "#e5e7eb"; // Light Silver

const getInitialData = () => ({
  name:     "FIRST LAST",
  location: "Mumbai, India",
  phone:    "+91-234-456-789",
  email:    "bizdev@company.com",
  linkedin: "linkedin.com/in/username",

  objectiveTitle:      "Career Objective",
  experienceTitle:     "Work Experience",
  projectTitle:        "Key Achievements",
  educationTitle:      "Education",
  skillsTitle:         "Skills",
  certificationTitle:  "Certifications",

  objective: `Dynamic Business Development professional with 6+ years of proven track record in B2B sales, client acquisition, and revenue growth. Expert in identifying new market opportunities, forging strategic partnerships, and closing high-value deals. Consistently exceeded targets by 40%+ YoY.`,

  skills: [
    ["B2B Sales", "CRM Tools", "Negotiation", "Lead Gen"],
    ["Market Research", "HubSpot", "Salesforce", "Presentations"],
  ],

  experience: [
    {
      company: "TechCorp Solutions",
      period: "2019 – Present",
      roles: [{
        title: "Business Development Manager",
        bullets: [
          "Generated $3.2M in new ARR through enterprise client acquisition.",
          "Built and managed pipeline of 120+ qualified enterprise prospects.",
          "Negotiated and closed 15 high-value SaaS contracts in FY2023.",
          "Expanded market presence into 3 new geographic territories.",
        ],
      }],
    },
    {
      company: "GrowthFirst Inc.",
      period: "2016 – 2019",
      roles: [{
        title: "Sales Executive",
        bullets: [
          "Exceeded quarterly sales quota by 45% for 8 consecutive quarters.",
          "Developed relationships with 200+ SME clients across the region.",
        ],
      }],
    },
  ],

  education: [{
    school: "XLRI Jamshedpur",
    year:   "2016",
    degree: "MBA, Sales & Marketing",
  }],

  projects: [
    { title: "Revenue Record FY23",      description: "Achieved highest-ever quarterly revenue of $1.1M — 48% above target." },
    { title: "Strategic Partnership Deal", description: "Closed a 3-year exclusive partnership with Fortune 500 client worth $2M." },
  ],

  certifications: [
    "HubSpot Sales Certification",
    "Salesforce Certified Sales Professional",
  ],
});

// ── Simple Section heading (No boxes/backgrounds) ──────────────────────────────
const SHead = ({ children }) => (
  <div style={{ marginTop: "18px", marginBottom: "8px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "11px", fontWeight: "800", letterSpacing: "1.5px", textTransform: "uppercase", color: primary }}>
        {children}
      </span>
      <div style={{ flex: 1, height: "1px", background: primary }} />
    </div>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const BusinessDevTemplates = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, location, phone, email, linkedin, objectiveTitle, experienceTitle, projectTitle, educationTitle, skillsTitle, certificationTitle, objective, projects, certifications, experience, education, skills } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", fontSize: "11px", lineHeight: "1.5", backgroundColor: "#fff", color: primary, boxSizing: "border-box", padding: "15mm" }}>

      {/* CLEAN HEADER (No Background) */}
      <div style={{ marginBottom: "20px" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "800", color: primary, textTransform: "uppercase" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "8px", fontSize: "11px", color: secondary }}>
          <E value={location} onChange={(v) => u("location", v)} />
          <span>•</span>
          <E value={phone}    onChange={(v) => u("phone", v)} />
          <span>•</span>
          <E value={email}    onChange={(v) => u("email", v)} />
          <span>•</span>
          <E value={linkedin} onChange={(v) => u("linkedin", v)} />
        </div>
      </div>

      {/* OBJECTIVE (Removed Box and Border) */}
      <SHead><E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} /></SHead>
      <E value={objective} onChange={(v) => u("objective", v)} block style={{ color: secondary, lineHeight: "1.6" }} />

      {/* EXPERIENCE */}
      <SHead><E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} /></SHead>
      {experience.map((exp, ei) => (
        <div key={ei} style={{ marginTop: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px" }}>
            <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
            <E value={exp.period}  onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} />
          </div>
          {exp.roles.map((role, ri) => (
            <div key={ri} style={{ marginTop: "4px" }}>
              <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => { if (i !== ei) return e; return { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) }; }); u("experience", a); }} style={{ fontStyle: "italic", fontWeight: "600", color: secondary, fontSize: "11px" }} />
              <ul style={{ paddingLeft: "15px", margin: "5px 0 0 0" }}>
                {role.bullets.map((b, bi) => (
                  <li key={bi} style={{ marginBottom: "4px", color: secondary }}>
                    <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => { if (i !== ei) return e; return { ...e, roles: e.roles.map((r, j) => { if (j !== ri) return r; return { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) }; }) }; }); u("experience", a); }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}

      {/* ACHIEVEMENTS (Removed boxes and icons) */}
      <SHead><E value={projectTitle} onChange={(v) => u("projectTitle", v)} /></SHead>
      {projects.map((proj, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <E value={proj.title} onChange={(v) => { /* update logic */ }} style={{ fontWeight: "bold", display: "block", color: primary }} />
          <E value={proj.description} onChange={(v) => { /* update logic */ }} style={{ color: secondary }} />
        </div>
      ))}

      {/* TWO COLUMN SECTION */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginTop: "10px" }}>
        {/* SKILLS */}
        <div>
          <SHead><E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} /></SHead>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 15px", fontSize: "11px", color: secondary }}>
            {skills.flat().map((skill, i) => (
              <span key={i}>
                <E value={skill} onChange={(v) => { /* Update Logic */ }} />
                {i !== skills.flat().length - 1 && <span style={{ color: borderCol, marginLeft: "15px" }}>|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* EDUCATION & CERTIFICATIONS */}
        <div>
          <SHead><E value={educationTitle} onChange={(v) => u("educationTitle", v)} /></SHead>
          {education.map((edu, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                <E value={edu.degree} onChange={(v) => { /* Update Logic */ }} />
                <E value={edu.year} onChange={(v) => { /* Update Logic */ }} />
              </div>
              <E value={edu.school} onChange={(v) => { /* Update Logic */ }} style={{ color: secondary, fontSize: "10.5px" }} />
            </div>
          ))}

          <div style={{ marginTop: "15px" }}>
            <div style={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", color: secondary, marginBottom: "5px" }}>
              <E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} />
            </div>
            {certifications.map((cert, i) => (
              <div key={i} style={{ fontSize: "10.5px", color: secondary, marginBottom: "2px" }}>
                • <E value={cert} onChange={(v) => { /* Update Logic */ }} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default BusinessDevTemplates;