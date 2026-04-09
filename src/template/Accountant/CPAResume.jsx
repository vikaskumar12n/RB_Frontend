import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// CPA Professional Theme
const borderCol = "#cbd5e1"
const primary = "#002147";   // Oxford Blue (Trust & Stability)
const secondary = "#64748b"; // Muted Slate
const accent = "#b59410";    // CPA Gold (Premium look)
const lightBg = "#f8fafc";

const getInitialData = () => ({
  name: "CPA CANDIDATE NAME",
  title: "Certified Public Accountant (CPA)",
  location: "New York / Mumbai",
  phone: "+1-555-0123 / +91-XXXXX",
  email: "cpa.professional@globalfinance.com",
  linkedin: "linkedin.com/in/cpa-expert",

  summaryTitle: "Professional Profile",
  experienceTitle: "Professional Experience",
  skillsTitle: "Core CPA Competencies",
  eduTitle: "Education & Professional Credentials",
  auditTitle: "Audit & Compliance Expertise",

  summary: `Results-oriented Certified Public Accountant (CPA) with expertise in US GAAP, IFRS, and complex tax regulations. Highly skilled in financial statement preparation, external auditing, and corporate tax strategy. Dedicated to maintaining the highest standards of integrity and accuracy in financial reporting.`,

  competencies: [
    "US GAAP & IFRS", "SEC Reporting", "Tax Planning & Compliance",
    "Internal Controls (SOX)", "Forensic Accounting", "Risk Assessment"
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
          "Managed a diverse portfolio of clients across manufacturing and technology sectors.",
          "Reviewed complex tax provisions and deferred tax calculations."
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
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Garamond', serif", backgroundColor: "#fff", color: "#1e293b", boxSizing: "border-box" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12mm 15mm 8mm", borderBottom: `2px solid ${primary}` }}>
        <div>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "bold", color: primary, letterSpacing: "1px" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", color: accent, fontWeight: "bold", marginTop: "2px" }} />
        </div>
        <div style={{ textAlign: "right", fontSize: "10px", color: secondary, lineHeight: "1.6" }}>
          <div><E value={location} onChange={(v) => u("location", v)} /> 📍</div>
          <div><E value={phone} onChange={(v) => u("phone", v)} /> 📞</div>
          <div><E value={email} onChange={(v) => u("email", v)} /> 📧</div>
          <div style={{ color: primary, fontWeight: "bold" }}><E value={linkedin} onChange={(v) => u("linkedin", v)} /> 🔗</div>
        </div>
      </div>

      <div style={{ padding: "10mm 15mm" }}>
        
        {/* SUMMARY */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ color: primary, fontWeight: "bold", fontSize: "12px", textTransform: "uppercase", marginBottom: "6px", borderLeft: `4px solid ${accent}`, paddingLeft: "10px" }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11.5px", textAlign: "justify", lineHeight: "1.5" }} />
        </div>

        {/* CORE COMPETENCIES - PILL DESIGN */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ color: primary, fontWeight: "bold", fontSize: "12px", textTransform: "uppercase", marginBottom: "8px", borderLeft: `4px solid ${accent}`, paddingLeft: "10px" }}>
            <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {competencies.map((skill, i) => (
              <span key={i} style={{ background: lightBg, color: primary, padding: "3px 12px", borderRadius: "15px", fontSize: "10px", fontWeight: "600", border: `1px solid ${primary}22` }}>
                <E value={skill} onChange={(v) => { const a = ref.current.competencies.map((s, j) => j === i ? v : s); u("competencies", a); }} />
              </span>
            ))}
          </div>
        </div>

        {/* EXPERIENCE */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ color: primary, fontWeight: "bold", fontSize: "12px", textTransform: "uppercase", marginBottom: "10px", borderLeft: `4px solid ${accent}`, paddingLeft: "10px" }}>
            <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
          </div>
          {experience.map((exp, ei) => (
            <div key={ei} style={{ marginBottom: "15px", paddingLeft: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} style={{ fontWeight: "bold", fontSize: "12.5px", color: primary }} />
                <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ fontSize: "10.5px", color: secondary, fontWeight: "bold" }} />
              </div>
              {exp.roles.map((role, ri) => (
                <div key={ri}>
                  <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontStyle: "italic", fontWeight: "600", color: accent, display: "block", marginBottom: "5px" }} />
                  <ul style={{ margin: "0", paddingLeft: "18px", listStyleType: "square" }}>
                    {role.bullets.map((b, bi) => (
                      <li key={bi} style={{ fontSize: "11px", marginBottom: "4px", color: "#334155" }}>
                        <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* EDUCATION & CREDENTIALS */}
        <div style={{ marginBottom: "10px" }}>
          <div style={{ color: primary, fontWeight: "bold", fontSize: "12px", textTransform: "uppercase", marginBottom: "8px", borderLeft: `4px solid ${accent}`, paddingLeft: "10px" }}>
            <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", paddingLeft: "14px" }}>
            {education.map((edu, i) => (
              <div key={i} style={{ borderLeft: `1px solid ${borderCol}`, paddingLeft: "10px" }}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "11px", color: primary }} />
                <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10px", color: secondary }} />
                <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "10px", fontWeight: "bold", color: accent }} />
              </div>
            ))}
          </div>
        </div>

      </div>
      
      {/* FOOTER STRIP */}
      <div style={{ height: "15px", background: primary, marginTop: "auto" }}></div>
    </div>
  );
};

export default CPATemplate;