import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Finance Professional Colors
const primary = "#1e293b"; // Slate Blue/Dark
const secondary = "#64748b"; // Muted Slate
const bgLight = "#f8fafc"; // Very light gray-blue
const accent = "#0f172a";

const getInitialData = () => ({
  name: "ACCOUNTANT NAME",
  location: "Mumbai, India",
  phone: "+91-98765-43210",
  email: "finance.pro@email.com",
  linkedin: "linkedin.com/in/accountant",

  objectiveTitle: "Professional Profile",
  experienceTitle: "Professional Experience",
  educationTitle: "Academic Background",
  skillsTitle: "Core Competencies",
  softwareTitle: "Technical Proficiency",

  objective: `Detail-oriented Accountant with 6+ years of experience in financial reporting, tax compliance, and auditing. Proven track record of maintaining accurate financial records, optimizing tax strategies, and ensuring full compliance with GAAP and IFRS standards. Expert in financial analysis and cost reduction.`,

  skills: [
    "Financial Auditing", "Taxation (GST/Income Tax)", "Accounts Payable/Receivable",
    "Payroll Management", "Budgeting & Forecasting", "Bank Reconciliation"
  ],

  software: ["Tally Prime", "SAP FICO", "QuickBooks", "Advanced MS Excel"],

  experience: [
    {
      company: "R.K. Associates & Co.",
      period: "2021 – Present",
      roles: [{
        title: "Senior Accountant",
        bullets: [
          "Managed end-to-end accounting operations for 15+ corporate clients.",
          "Finalized balance sheets and P&L accounts with 100% accuracy.",
          "Automated reconciliation processes, saving 20 hours of manual work monthly.",
          "Handled GST filings, TDS returns, and responded to tax notices.",
        ],
      }],
    },
    {
      company: "Global Solutions Ltd.",
      period: "2018 – 2021",
      roles: [{
        title: "Junior Accountant",
        bullets: [
          "Processed vendor payments and managed daily cash flow records.",
          "Assisted in internal audits and prepared financial reports for management.",
        ],
      }],
    },
  ],

  education: [{
    school: "University of Delhi",
    year: "2018",
    degree: "Chartered Accountant (ICAI) / M.Com",
  }],
});

// Section Heading Component
const SectionHeader = ({ children }) => (
  <div style={{ borderBottom: `2px solid ${primary}`, marginBottom: "8px", marginTop: "15px" }}>
    <span style={{ 
      fontSize: "11px", 
      fontWeight: "800", 
      color: primary, 
      textTransform: "uppercase", 
      letterSpacing: "1.5px" 
    }}>
      {children}
    </span>
  </div>
);

const AccountantTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, location, phone, email, linkedin, objectiveTitle, experienceTitle, educationTitle, skillsTitle, softwareTitle, objective, experience, education, skills, software } = data;

  return (
    <div id="resume" style={{ 
      width: "210mm", 
      minHeight: "297mm", 
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", 
      fontSize: "10.5px", 
      lineHeight: "1.4", 
      backgroundColor: "#fff", 
      color: "#334155", 
      boxSizing: "border-box" 
    }}>

      {/* TOP HEADER - CLEAN & BOLD */}
      <div style={{ padding: "12mm 14mm", borderBottom: `8px solid ${primary}`, textAlign: "center" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "900", color: accent, textTransform: "uppercase", marginBottom: "5px" }} />
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", fontSize: "10px", color: secondary }}>
          <E value={location} onChange={(v) => u("location", v)} />
          <span>|</span>
          <E value={phone} onChange={(v) => u("phone", v)} />
          <span>|</span>
          <E value={email} onChange={(v) => u("email", v)} />
        </div>
        <div style={{ marginTop: "3px", fontSize: "10px", color: primary, fontWeight: "600" }}>
          <E value={linkedin} onChange={(v) => u("linkedin", v)} />
        </div>
      </div>

      <div style={{ padding: "8mm 14mm", display: "grid", gridTemplateColumns: "1fr" }}>
        
        {/* SUMMARY */}
        <SectionHeader><E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} /></SectionHeader>
        <div style={{ padding: "2px 0", textAlign: "justify" }}>
          <E value={objective} onChange={(v) => u("objective", v)} block />
        </div>

        {/* EXPERIENCE */}
        <SectionHeader><E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} /></SectionHeader>
        {experience.map((exp, ei) => (
          <div key={ei} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "11px", color: accent }}>
              <E value={exp.company} onChange={(v) => { 
                const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); 
              }} />
              <E value={exp.period} onChange={(v) => { 
                const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); 
              }} style={{ color: secondary }} />
            </div>
            {exp.roles.map((role, ri) => (
              <div key={ri}>
                <E value={role.title} onChange={(v) => { 
                  const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); 
                }} style={{ fontStyle: "italic", fontWeight: "600", color: secondary, display: "block", marginBottom: "4px" }} />
                
                <div style={{ paddingLeft: "5px" }}>
                  {role.bullets.map((b, bi) => (
                    <div key={bi} style={{ display: "flex", gap: "8px", marginBottom: "2px" }}>
                      <span style={{ color: primary }}>•</span>
                      <E value={b} onChange={(v) => { 
                        const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); 
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* TWO COLUMN SECTION FOR SKILLS & EDUCATION */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "30px" }}>
          <div>
            <SectionHeader><E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} /></SectionHeader>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
              {skills.map((skill, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: "4px", height: "4px", background: secondary, borderRadius: "50%" }} />
                  <E value={skill} onChange={(v) => { 
                    const a = ref.current.skills.map((s, j) => j === i ? v : s); u("skills", a); 
                  }} />
                </div>
              ))}
            </div>

            <SectionHeader><E value={softwareTitle} onChange={(v) => u("softwareTitle", v)} /></SectionHeader>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {software.map((sw, i) => (
                <span key={i} style={{ background: bgLight, padding: "2px 8px", borderRadius: "4px", border: `1px solid #e2e8f0`, fontSize: "9.5px" }}>
                  <E value={sw} onChange={(v) => { 
                    const a = ref.current.software.map((s, j) => j === i ? v : s); u("software", a); 
                  }} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader><E value={educationTitle} onChange={(v) => u("educationTitle", v)} /></SectionHeader>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <E value={edu.degree} onChange={(v) => { 
                  const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); 
                }} style={{ fontWeight: "bold", display: "block" }} />
                <E value={edu.school} onChange={(v) => { 
                  const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); 
                }} style={{ fontSize: "9.5px", color: secondary, display: "block" }} />
                <E value={edu.year} onChange={(v) => { 
                  const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); 
                }} style={{ fontSize: "9.5px", fontWeight: "bold", color: primary }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AccountantTemplate;