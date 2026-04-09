import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Minimalist UI/UX Theme (Clean & Modern)
const black      = "#000000";
const softGray   = "#64748b";
const borderCol  = "#e2e8f0";
const accent     = "#2563eb"; // Subtle Blue for links/years

const getInitialData = () => ({
  name: "CREATIVE DESIGNER",
  title: "Senior UI/UX & Product Designer",
  location: "Mumbai, India",
  phone: "+91-99999-00000",
  email: "hello@designer.com",
  portfolio: "behance.net/creative-ui",
  linkedin: "linkedin.com/in/design-pro",

  summaryTitle: "Design Philosophy",
  experienceTitle: "Professional Experience",
  skillsTitle: "Core Skills",
  toolsTitle: "Software",
  eduTitle: "Education",

  summary: `User-centric UI/UX Designer with 6+ years of experience in crafting intuitive digital experiences. Specialized in design systems, high-fidelity prototyping, and user research. Passionate about bridging the gap between user needs and business goals through functional interfaces.`,

  skills: [
    "User Research", "Wireframing", "Interaction Design", "Prototyping",
    "Design Systems", "Usability Testing", "Visual Design"
  ],

  tools: ["Figma", "Adobe XD", "After Effects", "Webflow", "Sketch"],

  experience: [
    {
      company: "Creative Studio X",
      period: "2021 – Present",
      roles: [{
        title: "Lead Product Designer",
        bullets: [
          "Redesigned flagship mobile app, resulting in a 40% increase in daily active users.",
          "Established a comprehensive Design System (UI Kit) used across 3 platforms.",
          "Mentored a team of 4 designers and streamlined developer hand-off process."
        ],
      }],
    },
    {
      company: "Digital Innovations Agency",
      period: "2018 – 2021",
      roles: [{
        title: "UI Designer",
        bullets: [
          "Created high-fidelity mockups for 15+ international client projects.",
          "Collaborated closely with front-end devs for pixel-perfect implementation."
        ],
      }],
    },
  ],

  education: [{
    school: "National Institute of Design (NID)",
    year: "2018",
    degree: "Bachelor of Design (Interaction Design)",
  }],
});

const UIUXSimpleTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, portfolio, linkedin, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#ffffff", color: black, padding: "20mm", boxSizing: "border-box" }}>
      
      {/* MINIMAL HEADER */}
      <div style={{ borderBottom: `1px solid ${black}`, paddingBottom: "10px", marginBottom: "30px" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "5px" }}>
          <E value={title} onChange={(v) => u("title", v)} style={{ fontSize: "14px", color: softGray, fontWeight: "500" }} />
          <div style={{ fontSize: "10px", textAlign: "right", color: softGray }}>
            <E value={location} onChange={(v) => u("location", v)} /> • <E value={phone} onChange={(v) => u("phone", v)} />
          </div>
        </div>
        <div style={{ display: "flex", gap: "15px", marginTop: "10px", fontSize: "10px", fontWeight: "bold" }}>
          <E value={email} onChange={(v) => u("email", v)} />
          <E value={portfolio} onChange={(v) => u("portfolio", v)} style={{ color: accent }} />
          <E value={linkedin} onChange={(v) => u("linkedin", v)} style={{ color: accent }} />
        </div>
      </div>

      {/* CONTENT GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr", gap: "40px" }}>
        
        {/* SIDEBAR: SKILLS & EDU */}
        <div>
          <section style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {skills.map((s, i) => (
                <div key={i} style={{ fontSize: "11px", color: softGray }}>
                  <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px" }}>
              <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {tools.map((t, i) => (
                <span key={i} style={{ border: `1px solid ${borderCol}`, padding: "2px 6px", fontSize: "9px", borderRadius: "3px" }}>
                  <E value={t} onChange={(v) => { const a = ref.current.tools.map((item, j) => j === i ? v : item); u("tools", a); }} />
                </span>
              ))}
            </div>
          </section>

          <section>
            <div style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "15px" }}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10px" }} />
                <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10px", color: softGray }} />
                <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "10px", color: accent, fontWeight: "bold" }} />
              </div>
            ))}
          </section>
        </div>

        {/* MAIN: SUMMARY & EXPERIENCE */}
        <div>
          <section style={{ marginBottom: "35px" }}>
            <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "12px", lineHeight: "1.7", textAlign: "justify", fontStyle: "italic", color: "#334155" }} />
          </section>

          <section>
            <div style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "20px", borderBottom: `1px solid ${borderCol}`, paddingBottom: "5px" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "13px" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ fontSize: "10px", color: softGray }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri} style={{ marginTop: "5px" }}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "600", fontSize: "11px", color: accent, display: "block" }} />
                    <ul style={{ margin: "10px 0", paddingLeft: "15px" }}>
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
          </section>
        </div>

      </div>

    </div>
  );
};

export default UIUXSimpleTemplate;