import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Business Development - Ultra Simple Single Column Theme
const black      = "#000000";
const secondary  = "#4b5563";
const divider    = "#000000"; 

const getInitialData = () => ({
  name: "BUSINESS DEVELOPMENT MANAGER",
  contact: "+91-98000-77000 | Mumbai, India",
  links: "growth.lead@business.com | linkedin.com/in/bd-expert | portfolio.com/sales-leader",

  summaryTitle: "PROFESSIONAL PROFILE",
  summary: `Results-driven Business Development professional with 8+ years of experience in driving multi-million dollar revenue growth. Expert in identifying market opportunities, building high-value strategic partnerships, and closing complex B2B deals. Strong leader with a focus on sustainable business expansion and client retention.`,

  skillsTitle: "CORE EXPERTISE",
  skillsList: "Strategic Partnership Building, High-Stakes Negotiations, Revenue Forecasting, Market Research & Analysis, Lead Generation Pipeline, Account Management, Public Speaking, Salesforce, HubSpot CRM, LinkedIn Sales Navigator, Tableau, MS Office Suite",

  experienceTitle: "SALES & GROWTH HISTORY",
  experience: [
    {
      role: "Senior Business Development Manager",
      company: "Global Trade Corp, Mumbai",
      period: "2021 – Present",
      bullets: [
        "Increased quarterly revenue by 35% through the acquisition of 15+ Enterprise-level clients.",
        "Negotiated and signed strategic partnerships with 3 global distributors, expanding market reach by 40%.",
        "Led a sales team of 10, consistently over-achieving annual targets by 115%.",
        "Developed a new lead scoring system that improved sales conversion rates by 22%."
      ],
    },
    {
      role: "Business Development Associate",
      company: "Stellar Startups Inc., Bangalore",
      period: "2018 – 2021",
      bullets: [
        "Generated over $1M in new business revenue within the first 12 months.",
        "Conducted market entry research for Southeast Asia, resulting in 2 successful branch openings."
      ],
    },
  ],

  eduTitle: "EDUCATION",
  education: [
    { 
      degree: "MBA in Marketing & Strategy", 
      school: "Indian Institute of Management (IIM)", 
      year: "2018" 
    }
  ],

  certTitle: "CERTIFICATIONS",
  certs: [
    "Certified Sales Professional (CSP)",
    "Strategic Negotiations Mastery - Harvard Extension"
  ]
});

const BusinessDevTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, contact, links, summaryTitle, summary, skillsTitle, skillsList, experienceTitle, experience, eduTitle, education, certTitle, certs } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", color: black, padding: "15mm", boxSizing: "border-box" }}>
      
      {/* HEADER - CENTERED */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "1px" }} />
        <div style={{ fontSize: "11px", marginTop: "5px", color: secondary }}>
          <E value={contact} onChange={(v) => u("contact", v)} />
        </div>
        <div style={{ fontSize: "11px", fontWeight: "bold", marginTop: "2px" }}>
          <E value={links} onChange={(v) => u("links", v)} />
        </div>
      </div>

      {/* SUMMARY */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
        </h3>
        <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.5", textAlign: "justify" }} />
      </div>

      {/* SKILLS */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
        </h3>
        <div style={{ fontSize: "11px", lineHeight: "1.4" }}>
          <E value={skillsList} onChange={(v) => u("skillsList", v)} />
        </div>
      </div>

      {/* EXPERIENCE */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "12px", textTransform: "uppercase" }}>
          <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
        </h3>
        {experience.map((exp, ei) => (
          <div key={ei} style={{ marginBottom: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px" }}>
              <E value={exp.role} onChange={() => {}} />
              <E value={exp.period} onChange={() => {}} />
            </div>
            <div style={{ fontSize: "11px", fontStyle: "italic", marginBottom: "5px", color: secondary }}>
              <E value={exp.company} onChange={() => {}} />
            </div>
            <ul style={{ margin: "5px 0 0 0", paddingLeft: "18px", fontSize: "11px" }}>
              {exp.bullets.map((b, bi) => (
                <li key={bi} style={{ marginBottom: "4px", lineHeight: "1.4" }}><E value={b} onChange={() => {}} /></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "10px", textTransform: "uppercase" }}>
          <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
        </h3>
        {education.map((edu, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px" }}>
            <div style={{ fontWeight: "bold" }}>
              <E value={edu.degree} onChange={() => {}} /> | <span style={{ fontWeight: "normal" }}><E value={edu.school} onChange={() => {}} /></span>
            </div>
            <E value={edu.year} onChange={() => {}} style={{ fontWeight: "bold" }} />
          </div>
        ))}
      </div>

      {/* CERTIFICATIONS */}
      <div>
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={certTitle} onChange={(v) => u("certTitle", v)} />
        </h3>
        <ul style={{ margin: "0", paddingLeft: "18px", fontSize: "11px" }}>
          {certs.map((c, i) => (
            <li key={i} style={{ marginBottom: "3px" }}><E value={c} onChange={() => {}} /></li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default BusinessDevTemplate;