import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Minimalist Professional Colors
const primary = "#1e293b";   // Deep Slate
const secondary = "#475569"; // Slate Gray
const borderCol = "#e2e8f0"; // Light Divider

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
    "Strategic Financial Planning", "Risk Management", "Corporate Taxation",
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
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', 'Helvetica', sans-serif", backgroundColor: "#fff", color: primary, boxSizing: "border-box", padding: "15mm" }}>
      
      {/* CLEAN HEADER (NO BORDERS/ICONS) */}
      <div style={{ marginBottom: "25px", textAlign: "left" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px", textTransform: "uppercase" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", color: secondary, marginTop: "2px", fontWeight: "500" }} />
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px", fontSize: "11px", color: secondary }}>
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
        <div style={{ fontWeight: "bold", fontSize: "12px", textTransform: "uppercase", borderBottom: `1.5px solid ${primary}`, marginBottom: "8px", paddingBottom: "2px", letterSpacing: "1px" }}>
          <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
        </div>
        <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6", color: secondary }} />
      </div>

      {/* HIGHLIGHTS (BOX REMOVED) */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontWeight: "bold", fontSize: "12px", textTransform: "uppercase", marginBottom: "8px", color: primary }}>
           <E value={highlightTitle} onChange={(v) => u("highlightTitle", v)} />
        </div>
        <ul style={{ margin: "0", paddingLeft: "15px", listStyleType: "circle" }}>
          {highlights.map((h, i) => (
            <li key={i} style={{ fontSize: "10.5px", marginBottom: "4px", color: secondary }}>
              <E value={h} onChange={(v) => { const a = ref.current.highlights.map((item, j) => j === i ? v : item); u("highlights", a); }} />
            </li>
          ))}
        </ul>
      </div>

      {/* EXPERIENCE */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontWeight: "bold", fontSize: "12px", textTransform: "uppercase", borderBottom: `1.5px solid ${primary}`, marginBottom: "12px", paddingBottom: "2px", letterSpacing: "1px" }}>
          <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
        </div>
        {experience.map((exp, ei) => (
          <div key={ei} style={{ marginBottom: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", fontSize: "12px" }}>
              <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
              <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} />
            </div>
            {exp.roles.map((role, ri) => (
              <div key={ri} style={{ marginTop: "4px" }}>
                <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "600", color: secondary, fontSize: "11px", display: "block", marginBottom: "6px" }} />
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

      {/* SKILLS & EDUCATION (NO GRID BOXES) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        <div>
          <div style={{ fontWeight: "bold", fontSize: "11px", textTransform: "uppercase", borderBottom: `1px solid ${borderCol}`, marginBottom: "8px", paddingBottom: "2px" }}>
            <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px", fontSize: "10.5px", color: secondary }}>
            {skills.map((s, i) => (
              <span key={i}>
                <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                {i !== skills.length - 1 && <span style={{ color: borderCol, marginLeft: "12px" }}>|</span>}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontWeight: "bold", fontSize: "11px", textTransform: "uppercase", borderBottom: `1px solid ${borderCol}`, marginBottom: "8px", paddingBottom: "2px" }}>
            <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
          </div>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10.5px" }} />
                <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "10px", fontWeight: "bold" }} />
              </div>
              <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10px", color: secondary }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SeniorAccountantTemplate;