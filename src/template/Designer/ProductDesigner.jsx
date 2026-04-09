import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Product Designer Theme (Minimal & Impactful)
const primary    = "#059669"; // Emerald Green
const dark       = "#1e293b"; // Slate Dark
const lightBg    = "#f1f5f9"; // Soft Slate
const borderCol  = "#cbd5e1";
const accent     = "#10b981";

const getInitialData = () => ({
  name: "PRODUCT DESIGNER NAME",
  title: "Senior Product Designer | UX Strategy & Systems",
  location: "Bangalore, India",
  phone: "+91-99999-88888",
  email: "product.pro@design.com",
  portfolio: "portfolio.com/design-lead",
  linkedin: "linkedin.com/in/product-designer",

  summaryTitle: "Product Vision",
  experienceTitle: "Professional Experience",
  skillsTitle: "Core Competencies",
  toolsTitle: "Design Ecosystem",
  eduTitle: "Education",

  summary: `User-centric Product Designer with 6+ years of experience in building scalable digital products. Expert in translating complex user needs into seamless business solutions. Specialized in design systems, cross-functional collaboration, and end-to-end product development.`,

  skills: [
    "Product Strategy", "User Journey Mapping", "Design Systems", 
    "Rapid Prototyping", "A/B Testing", "Mobile-First Design", "Stakeholder Management"
  ],

  tools: [
    "Figma", "Adobe Creative Suite", "Miro", "Jira", "Framer", "Protopie"
  ],

  experience: [
    {
      company: "TechNexus Solutions",
      period: "2021 – Present",
      roles: [{
        title: "Senior Product Designer",
        bullets: [
          "Led the end-to-end design of a B2B SaaS platform, increasing user retention by 25%.",
          "Collaborated with Product Managers to define roadmap and feature prioritization.",
          "Managed a centralized design system, reducing design-to-dev time by 40%.",
          "Conducted usability audits and implemented data-driven design iterations."
        ],
      }],
    },
    {
      company: "Creative Pulse Agency",
      period: "2018 – 2021",
      roles: [{
        title: "Product Designer",
        bullets: [
          "Designed intuitive interfaces for 10+ mobile and web applications.",
          "Created high-fidelity prototypes for stakeholder presentations and investor pitches."
        ],
      }],
    },
  ],

  education: [{
    school: "Indian Institute of Technology (IIT) Design",
    year: "2018",
    degree: "B.Des in Product Design",
  }],
});

const ProductDesignerTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, portfolio, linkedin, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", color: dark, boxSizing: "border-box" }}>
      
      {/* PROFESSIONAL HEADER */}
      <div style={{ display: "flex", borderBottom: `8px solid ${primary}` }}>
        <div style={{ padding: "12mm 15mm", width: "65%" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-0.5px", color: dark }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", fontWeight: "600", color: primary, marginTop: "5px" }} />
          <div style={{ marginTop: "12px", display: "flex", gap: "15px", fontSize: "10px", fontWeight: "bold" }}>
             <E value={portfolio} onChange={(v) => u("portfolio", v)} style={{ color: primary }} />
             <E value={linkedin} onChange={(v) => u("linkedin", v)} />
          </div>
        </div>
        <div style={{ background: lightBg, padding: "12mm 10mm", width: "35%", fontSize: "10px", textAlign: "right" }}>
          <div style={{ marginBottom: "4px" }}><E value={location} onChange={(v) => u("location", v)} /> 📍</div>
          <div style={{ marginBottom: "4px" }}><E value={phone} onChange={(v) => u("phone", v)} /> 📞</div>
          <div style={{ marginBottom: "4px" }}><E value={email} onChange={(v) => u("email", v)} /> 📧</div>
        </div>
      </div>

      <div style={{ padding: "10mm 15mm" }}>
        
        {/* SUMMARY SECTION */}
        <div style={{ marginBottom: "30px" }}>
          <div style={{ fontSize: "12px", fontWeight: "800", color: primary, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11.5px", lineHeight: "1.6", textAlign: "justify", color: "#475569" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "35px" }}>
          
          {/* LEFT: WORK EXPERIENCE */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: "800", color: dark, textTransform: "uppercase", marginBottom: "15px", borderBottom: `2px solid ${lightBg}`, paddingBottom: "5px" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} style={{ fontWeight: "800", fontSize: "13px" }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ fontSize: "10px", color: "#64748b", fontWeight: "bold" }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "600", fontSize: "11.5px", color: primary, display: "block", marginBottom: "8px" }} />
                    <ul style={{ margin: "0", paddingLeft: "15px" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "11px", marginBottom: "6px", color: "#334155", lineHeight: "1.5" }}>
                          <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* RIGHT: SKILLS & TOOLS */}
          <div>
            {/* SKILLS AS BOLD TEXT LIST */}
            <div style={{ fontSize: "12px", fontWeight: "800", color: dark, textTransform: "uppercase", marginBottom: "12px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "30px" }}>
              {skills.map((s, i) => (
                <span key={i} style={{ background: lightBg, color: dark, padding: "4px 10px", fontSize: "9px", borderRadius: "5px", fontWeight: "700" }}>
                  <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                </span>
              ))}
            </div>

            {/* TOOLS SECTION */}
            <div style={{ fontSize: "12px", fontWeight: "800", color: dark, textTransform: "uppercase", marginBottom: "12px" }}>
              <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "30px" }}>
              {tools.map((tool, i) => (
                <div key={i} style={{ fontSize: "10.5px", display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${lightBg}`, paddingBottom: "2px" }}>
                  <E value={tool} onChange={(v) => { const a = ref.current.tools.map((t, j) => j === i ? v : t); u("tools", a); }} />
                  <span style={{ color: accent }}>✔</span>
                </div>
              ))}
            </div>

            {/* EDUCATION SECTION */}
            <div style={{ background: lightBg, padding: "15px", borderRadius: "10px" }}>
              <div style={{ fontSize: "12px", fontWeight: "800", color: dark, textTransform: "uppercase", marginBottom: "10px" }}>
                <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              </div>
              {education.map((edu, i) => (
                <div key={i}>
                  <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10.5px" }} />
                  <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "9.5px", marginTop: "2px" }} />
                  <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "9.5px", color: primary, fontWeight: "bold" }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProductDesignerTemplate;