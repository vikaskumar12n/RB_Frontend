import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Operations Manager - Ultra-Minimalist Theme (No Borders, No Color)
const black      = "#000000";
const darkGray   = "#4b5563";
const textGray   = "#6b7280";
const white      = "#ffffff";

const getInitialData = () => ({
  name: "OPERATIONS MANAGER",
  title: "Process Optimization | Supply Chain | Team Leadership",
  location: "New Delhi, India",
  phone: "+91-90000-88000",
  email: "ops.lead@efficiency.com",
  linkedin: "linkedin.com/in/ops-expert",

  summaryTitle: "Professional Summary",
  experienceTitle: "Core Experience",
  skillsTitle: "Operational Skills",
  toolsTitle: "Technical Proficiencies",
  eduTitle: "Education",

  summary: `Strategic Operations Manager with 10+ years of experience in streamlining business processes, reducing operational costs, and improving overall organizational efficiency. Expert in supply chain management, vendor relations, and cross-departmental coordination. Committed to driving growth through data-backed decision making and lean methodologies.`,

  skills: [
    "Process Improvement (Lean/Six Sigma)", "Supply Chain & Logistics", "Budgeting & Financial Oversight", 
    "Vendor & Contract Management", "Change Management", "Inventory Control", "KPI Tracking"
  ],

  tools: [
    "ERP (SAP/Oracle)", "Microsoft Excel (Advanced)", "Project Management (Jira/Asana)", "Power BI", "SQL"
  ],

  experience: [
    {
      company: "Logistics Global Solutions",
      period: "2020 – Present",
      roles: [{
        title: "Senior Operations Manager",
        bullets: [
          "Optimized the regional supply chain, resulting in a 20% reduction in delivery lead times.",
          "Managed an annual operating budget of $10M, consistently saving 12% through strategic sourcing.",
          "Implemented a new warehouse management system (WMS) that increased inventory accuracy to 99.9%.",
          "Led a cross-functional team of 50+ staff across 4 different departments."
        ],
      }],
    },
    {
      company: "Manufacturing Hub India",
      period: "2016 – 2020",
      roles: [{
        title: "Operations Coordinator",
        bullets: [
          "Streamlined production floor layout, increasing daily output by 15% without additional headcount.",
          "Negotiated long-term contracts with key vendors, securing an 8% cost reduction in raw materials."
        ],
      }],
    },
  ],

  education: [{
    school: "Faculty of Management Studies (FMS)",
    year: "2016",
    degree: "Masters in Business Administration (Operations)",
  }],
});

const OperationsManagerTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, linkedin, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: white, color: black, padding: "20mm", boxSizing: "border-box" }}>
      
      {/* HEADER - TEXT ONLY, NO BORDERS */}
      <div style={{ marginBottom: "15mm" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "36px", fontWeight: "300", letterSpacing: "1px", textAlign: "left", marginBottom: "5px" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px", color: darkGray, marginBottom: "20px" }} />
        
        <div style={{ display: "flex", gap: "15px", fontSize: "10px", color: textGray, fontWeight: "500" }}>
          <span><E value={location} onChange={(v) => u("location", v)} /></span>
          <span>•</span>
          <span><E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span>•</span>
          <span><E value={email} onChange={(v) => u("email", v)} /></span>
          <span>•</span>
          <span><E value={linkedin} onChange={(v) => u("linkedin", v)} /></span>
        </div>
      </div>

      {/* SUMMARY SECTION */}
      <div style={{ marginBottom: "30px" }}>
        <div style={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>
          <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
        </div>
        <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.8", color: darkGray, maxWidth: "90%" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "50px" }}>
        
        {/* LEFT: WORK HISTORY */}
        <div>
          <div style={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "20px" }}>
            <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
          </div>
          {experience.map((exp, ei) => (
            <div key={ei} style={{ marginBottom: "30px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} style={{ fontSize: "14px", fontWeight: "700" }} />
                <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ fontSize: "10px", fontWeight: "500", color: textGray }} />
              </div>
              {exp.roles.map((role, ri) => (
                <div key={ri} style={{ marginTop: "5px" }}>
                  <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "600", fontSize: "11px", display: "block", fontStyle: "italic", marginBottom: "10px" }} />
                  <ul style={{ margin: "0", paddingLeft: "15px", listStyleType: "circle" }}>
                    {role.bullets.map((b, bi) => (
                      <li key={bi} style={{ fontSize: "10.5px", marginBottom: "8px", lineHeight: "1.5", color: darkGray }}>
                        <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* RIGHT: SKILLS & INFO */}
        <div>
          {/* SKILLS */}
          <div style={{ marginBottom: "35px" }}>
            <div style={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "15px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            {skills.map((s, i) => (
              <div key={i} style={{ fontSize: "10.5px", marginBottom: "12px", color: darkGray, display: "flex", gap: "8px" }}>
                <span style={{ fontWeight: "bold" }}>›</span>
                <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
              </div>
            ))}
          </div>

          {/* TOOLS */}
          <div style={{ marginBottom: "35px" }}>
            <div style={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "15px" }}>
              <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
            </div>
            {tools.map((t, i) => (
              <div key={i} style={{ fontSize: "10.5px", marginBottom: "8px", color: darkGray }}>
                <E value={t} onChange={(v) => { const a = ref.current.tools.map((item, j) => j === i ? v : item); u("tools", a); }} />
              </div>
            ))}
          </div>

          {/* EDUCATION */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "15px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "15px" }}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "700", fontSize: "11px" }} />
                <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10px", color: textGray, marginTop: "2px" }} />
                <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "10px", fontWeight: "700" }} />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default OperationsManagerTemplate;