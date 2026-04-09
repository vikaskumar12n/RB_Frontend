import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Business Development - Minimalist Corporate Theme (No Color)
const black      = "#000000";
const darkGray   = "#374151";
const lightGray  = "#9ca3af";
const white      = "#ffffff";

const getInitialData = () => ({
  name: "BUSINESS DEVELOPMENT MANAGER",
  title: "Strategic Partnerships | Revenue Growth | B2B Sales",
  location: "Mumbai, India",
  phone: "+91-98000-77000",
  email: "growth.lead@business.com",
  linkedin: "linkedin.com/in/bd-expert",
  website: "portfolio.com/sales-leader",

  summaryTitle: "Professional Profile",
  experienceTitle: "Sales & Growth History",
  skillsTitle: "Core Expertise",
  toolsTitle: "Sales Stack",
  eduTitle: "Education",

  summary: `Results-driven Business Development professional with 8+ years of experience in driving multi-million dollar revenue growth. Expert in identifying market opportunities, building high-value strategic partnerships, and closing complex B2B deals. Strong leader with a focus on sustainable business expansion and client retention.`,

  skills: [
    "Strategic Partnership Building", "High-Stakes Negotiations", "Revenue Forecasting", 
    "Market Research & Analysis", "Lead Generation Pipeline", "Account Management", "Public Speaking"
  ],

  tools: [
    "Salesforce / HubSpot CRM", "LinkedIn Sales Navigator", "Tableau / BI Tools", "ZoomInfo", "MS Office Suite"
  ],

  experience: [
    {
      company: "Global Trade Corp",
      period: "2021 – Present",
      roles: [{
        title: "Senior Business Development Manager",
        bullets: [
          "Increased quarterly revenue by 35% through the acquisition of 15+ Enterprise-level clients.",
          "Negotiated and signed strategic partnerships with 3 global distributors, expanding market reach by 40%.",
          "Led a sales team of 10, consistently over-achieving annual targets by 115%.",
          "Developed a new lead scoring system that improved sales conversion rates by 22%."
        ],
      }],
    },
    {
      company: "Stellar Startups Inc.",
      period: "2018 – 2021",
      roles: [{
        title: "Business Development Associate",
        bullets: [
          "Generated over $1M in new business revenue within the first 12 months.",
          "Conducted market entry research for Southeast Asia, resulting in 2 successful branch openings."
        ],
      }],
    },
  ],

  education: [{
    school: "Indian Institute of Management (IIM)",
    year: "2018",
    degree: "MBA in Marketing & Strategy",
  }],
});

const BusinessDevTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, linkedin, website, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: white, color: black, padding: "15mm", boxSizing: "border-box" }}>
      
      {/* HEADER - BOLD & CLEAN */}
      <div style={{ textAlign: "center", borderBottom: `2px solid ${black}`, paddingBottom: "8mm", marginBottom: "10mm" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "32px", fontWeight: "900", letterSpacing: "2px", textTransform: "uppercase" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "12px", fontWeight: "600", marginTop: "5px", color: darkGray }} />
        
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "15px", fontSize: "10px", fontWeight: "500" }}>
          <span>📞 <E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span>📧 <E value={email} onChange={(v) => u("email", v)} /></span>
          <span>📍 <E value={location} onChange={(v) => u("location", v)} /></span>
        </div>
        <div style={{ fontSize: "10px", marginTop: "5px", fontWeight: "700" }}>
          <E value={linkedin} onChange={(v) => u("linkedin", v)} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "30px" }}>
        
        {/* LEFT COLUMN: SUMMARY & EXPERIENCE */}
        <div style={{ borderRight: `1px solid ${black}`, paddingRight: "25px" }}>
          
          <div style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", borderLeft: `4px solid ${black}`, paddingLeft: "10px" }}>
              <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
            </div>
            <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6", textAlign: "justify" }} />
          </div>

          <div>
            <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px", borderBottom: `1px solid ${black}`, paddingBottom: "2px", display: "inline-block" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "12px" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "700", fontSize: "11px", display: "block", marginTop: "4px" }} />
                    <ul style={{ margin: "10px 0", paddingLeft: "18px", listStyleType: "disc" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "10.5px", marginBottom: "6px", lineHeight: "1.4" }}>
                          <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: SKILLS, TOOLS & EDUCATION */}
        <div>
          <div style={{ marginBottom: "35px" }}>
            <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            {skills.map((s, i) => (
              <div key={i} style={{ fontSize: "10px", marginBottom: "12px", fontWeight: "600", display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "8px" }}>■</span>
                <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "35px" }}>
            <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px" }}>
              <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {tools.map((t, i) => (
                <div key={i} style={{ border: `1px solid ${black}`, padding: "4px 8px", fontSize: "9px", fontWeight: "bold", textAlign: "center" }}>
                  <E value={t} onChange={(v) => { const a = ref.current.tools.map((item, j) => j === i ? v : item); u("tools", a); }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ border: `1px solid ${lightGray}`, padding: "10px", marginBottom: "10px" }}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10.5px" }} />
                <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "9.5px", marginTop: "2px" }} />
                <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "9.5px", fontWeight: "900", display: "block", marginTop: "5px" }} />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default BusinessDevTemplate;