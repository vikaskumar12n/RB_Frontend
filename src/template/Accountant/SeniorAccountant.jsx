import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Senior Executive Colors
const primary = "#0f172a";   // Dark Slate (Authority)
const accent = "#94a3b8";    // Steel Gray
const highlight = "#f1f5f9"; // Soft background
const borderCol = "#cbd5e1";

const getInitialData = () => ({
  name: "SENIOR ACCOUNTANT NAME",
  title: "Chartered Accountant | Financial Controller",
  location: "Delhi, India",
  phone: "+91-99999-88888",
  email: "senior.acc@finance.com",
  linkedin: "linkedin.com/in/seniorpro",

  summaryTitle: "Executive Summary",
  experienceTitle: "Professional Leadership",
  skillsTitle: "Core Expertise",
  eduTitle: "Education & Credentials",
  highlightTitle: "Key Achievements",

  summary: `Accomplished Senior Accountant with 10+ years of expertise in high-level financial management, strategic tax planning, and regulatory compliance. Proven ability to lead finance teams, streamline multi-entity accounting, and reduce operational costs by up to 20%. Expert in IFRS, GST laws, and complex financial modeling.`,

  highlights: [
    "Spearheaded a financial audit that identified ₹5M in unclaimed tax credits.",
    "Implemented ERP (SAP S/4HANA) across 4 regional branches.",
    "Reduced monthly closing cycle from 10 days to 4 days."
  ],

  skills: [
    "Strategic Financial Planning", "Risk Management & Mitigation", "Corporate Taxation",
    "Consolidated Financial Statements", "Mergers & Acquisitions", "Team Leadership"
  ],

  experience: [
    {
      company: "Reliance Industries Ltd.",
      period: "2019 – Present",
      roles: [{
        title: "Senior Manager - Accounts & Finance",
        bullets: [
          "Overseeing an annual budget of ₹500Cr and managing a team of 12 junior accountants.",
          "Ensuring 100% compliance with statutory requirements including GST, TDS, and Income Tax.",
          "Directing internal audits and coordinating with external auditors for annual filings.",
          "Providing data-driven insights to the CFO to support long-term business scaling."
        ],
      }],
    },
    {
      company: "Tata Consultancy Services",
      period: "2014 – 2019",
      roles: [{
        title: "Assistant Accounts Manager",
        bullets: [
          "Managed accounts payable/receivable for international clients (US & UK regions).",
          "Prepared quarterly MIS reports and variance analysis for executive review.",
        ],
      }],
    },
  ],

  education: [
    { school: "The Institute of Chartered Accountants of India", year: "2014", degree: "Chartered Accountant (CA)" },
    { school: "SRCC, Delhi University", year: "2011", degree: "B.Com (Hons)" }
  ],
});

const SeniorAccountantTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, linkedin, summaryTitle, experienceTitle, skillsTitle, eduTitle, highlightTitle, summary, highlights, experience, education, skills } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Times New Roman', serif", backgroundColor: "#fff", color: primary, boxSizing: "border-box" }}>
      
      {/* EXECUTIVE HEADER */}
      <div style={{ borderBottom: `3px solid ${primary}`, padding: "10mm 15mm 5mm", textAlign: "left" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "26px", fontWeight: "bold", letterSpacing: "1px" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", color: accent, marginTop: "2px", fontWeight: "600" }} />
        
        <div style={{ display: "flex", gap: "20px", marginTop: "8px", fontSize: "10px", fontFamily: "Arial" }}>
          <span>📍 <E value={location} onChange={(v) => u("location", v)} /></span>
          <span>📞 <E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span>📧 <E value={email} onChange={(v) => u("email", v)} /></span>
          <span>🔗 <E value={linkedin} onChange={(v) => u("linkedin", v)} /></span>
        </div>
      </div>

      <div style={{ padding: "8mm 15mm" }}>
        
        {/* SUMMARY SECTION */}
        <div style={{ marginBottom: "15px" }}>
          <div style={{ fontWeight: "bold", borderBottom: `1px solid ${borderCol}`, marginBottom: "5px", textTransform: "uppercase", fontSize: "12px" }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6", fontStyle: "italic" }} />
        </div>

        {/* KEY HIGHLIGHTS - GOLD BOX */}
        <div style={{ background: highlight, padding: "10px", borderLeft: `4px solid ${primary}`, marginBottom: "15px" }}>
          <div style={{ fontWeight: "bold", fontSize: "11px", marginBottom: "5px" }}>
             <E value={highlightTitle} onChange={(v) => u("highlightTitle", v)} />
          </div>
          {highlights.map((h, i) => (
            <div key={i} style={{ fontSize: "10.5px", display: "flex", gap: "5px", marginBottom: "2px" }}>
              <span>★</span>
              <E value={h} onChange={(v) => { const a = ref.current.highlights.map((item, j) => j === i ? v : item); u("highlights", a); }} />
            </div>
          ))}
        </div>

        {/* EXPERIENCE */}
        <div style={{ fontWeight: "bold", borderBottom: `1px solid ${borderCol}`, marginBottom: "10px", textTransform: "uppercase", fontSize: "12px" }}>
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
                <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "bold", color: "#475569", display: "block", marginBottom: "5px" }} />
                <ul style={{ margin: "0", paddingLeft: "15px" }}>
                  {role.bullets.map((b, bi) => (
                    <li key={bi} style={{ fontSize: "11px", marginBottom: "3px" }}>
                      <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        {/* BOTTOM SECTIONS */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "25px" }}>
          <div>
            <div style={{ fontWeight: "bold", borderBottom: `1px solid ${borderCol}`, marginBottom: "8px", textTransform: "uppercase", fontSize: "11px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {skills.map((s, i) => (
                <span key={i} style={{ border: `1px solid ${primary}`, padding: "2px 8px", fontSize: "10px", fontWeight: "600" }}>
                  <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                </span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: "bold", borderBottom: `1px solid ${borderCol}`, marginBottom: "8px", textTransform: "uppercase", fontSize: "11px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10.5px" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
                  <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} />
                  <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SeniorAccountantTemplate;