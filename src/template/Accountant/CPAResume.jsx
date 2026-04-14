import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Simplified Professional Theme
const primary = "#1e293b";   // Deep Slate
const secondary = "#475569"; // Muted Grey
const accent = "#2563eb";    // Subtle Blue for links/titles
const borderCol = "#e2e8f0";

const getInitialData = () => ({
  name: "CPA CANDIDATE NAME",
  title: "Certified Public Accountant (CPA)",
  location: "New York / Mumbai",
  phone: "+1-555-0123 / +91-XXXXX",
  email: "cpa.professional@globalfinance.com",
  linkedin: "linkedin.com/in/cpa-expert",

  summaryTitle: "Professional Profile",
  experienceTitle: "Professional Experience",
  skillsTitle: "Core Competencies",
  eduTitle: "Education",

  summary: `Results-oriented Certified Public Accountant (CPA) with expertise in US GAAP, IFRS, and complex tax regulations. Highly skilled in financial statement preparation, external auditing, and corporate tax strategy.`,

  competencies: [
    "US GAAP & IFRS", "SEC Reporting", "Tax Planning",
    "Internal Controls", "Forensic Accounting", "Risk Assessment"
  ],

  experience: [
    {
      company: "Deloitte / Ernst & Young (Big 4)",
      period: "2020 – Present",
      roles: [{
        title: "Senior Audit Associate",
        bullets: [
          "Led statutory audits for Fortune 500 clients, ensuring compliance with SEC guidelines.",
          "Evaluated internal control systems and recommended improvements to mitigate financial risks.",
          "Managed a diverse portfolio of clients across manufacturing and technology sectors."
        ],
      }],
    },
    {
      company: "Mid-Tier Accounting Firm",
      period: "2017 – 2020",
      roles: [{
        title: "Staff Accountant",
        bullets: [
          "Prepared detailed financial statements and consolidated reports for multi-state entities.",
          "Assisted in IRS audits and handled high-volume corporate tax filings.",
        ],
      }],
    },
  ],

  education: [
    { school: "AICPA / State Board of Accountancy", year: "2020", degree: "Certified Public Accountant (CPA)" },
    { school: "University of Southern California", year: "2017", degree: "Master of Science in Accounting" }
  ],
});

const CPATemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, linkedin, summaryTitle, experienceTitle, skillsTitle, eduTitle, summary, competencies, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", color: primary, boxSizing: "border-box", padding: "15mm" }}>
      
      {/* SIMPLE HEADER */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "26px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", color: secondary, fontWeight: "500", marginTop: "4px" }} />
        
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", fontSize: "11px", color: secondary, marginTop: "10px", flexWrap: "wrap" }}>
          <span><E value={location} onChange={(v) => u("location", v)} /></span>
          <span>•</span>
          <span><E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span>•</span>
          <span><E value={email} onChange={(v) => u("email", v)} /></span>
          <span>•</span>
          <span style={{ color: accent }}><E value={linkedin} onChange={(v) => u("linkedin", v)} /></span>
        </div>
      </div>

      {/* SECTION WRAPPER */}
      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        
        {/* SUMMARY */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: "bold",paddingBottom:"6px", textTransform: "uppercase", borderBottom: `1px solid ${primary}`, marginBottom: "8px",  }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6", color: secondary }} />
        </div>

        {/* EXPERIENCE */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${primary}`, marginBottom: "12px",paddingBottom:"6px" }}>
            <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
          </div>
          {experience.map((exp, ei) => (
            <div key={ei} style={{ marginBottom: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px" }}>
                <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} />
              </div>
              {exp.roles.map((role, ri) => (
                <div key={ri}>
                  <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontSize: "11px", fontWeight: "600", color: secondary, display: "block", marginBottom: "6px" }} />
                  <ul style={{ margin: "0", paddingLeft: "15px" }}>
                    {role.bullets.map((b, bi) => (
                      <li key={bi} style={{ fontSize: "10.5px", marginBottom: "3px", color: secondary }}>
                        <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* SKILLS - SIMPLE COMMA SEPARATED OR LIST */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${primary}`, marginBottom: "8px",paddingBottom:"6px" }}>
            <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 15px", fontSize: "10.5px", color: secondary }}>
            {competencies.map((skill, i) => (
              <span key={i}>
                <E value={skill} onChange={(v) => { const a = ref.current.competencies.map((s, j) => j === i ? v : s); u("competencies", a); }} />
                {i !== competencies.length - 1 && <span style={{ marginLeft: "15px", color: borderCol }}>|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${primary}`, marginBottom: "10px",paddingBottom:"6px" }}>
            <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
            {education.map((edu, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                   <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "11px" }} />
                   <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "10px", fontWeight: "bold" }} />
                </div>
                <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10.5px", color: secondary }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CPATemplate;