import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Engineering & Construction Colors
const primary    = "#c2410c"; // Construction Orange
const secondary  = "#334155"; // Slate Blue/Gray
const lightBg    = "#fff7ed"; // Very light orange tint
const borderCol  = "#e2e8f0";
const textDark   = "#0f172a";

const getInitialData = () => ({
  name: "CIVIL ENGINEER NAME",
  title: "Senior Project Engineer | Infrastructure Specialist",
  location: "Mumbai, India",
  phone: "+91-98765-43210",
  email: "engineer.pro@civil.com",
  linkedin: "linkedin.com/in/civil-expert",

  summaryTitle: "Professional Profile",
  experienceTitle: "Work History",
  skillsTitle: "Technical Expertise",
  eduTitle: "Education",
  projectsTitle: "Key Projects",

  summary: `Results-driven Civil Engineer with 6+ years of experience in structural design and site management. Expertise in AutoCAD, Revit, and project estimation. Proven track record of delivering infrastructure projects on time while ensuring safety and quality standards.`,

  skills: [
    "Structural Analysis", "AutoCAD & Revit", "Project Estimation (BOQ)",
    "Site Supervision", "Concrete Technology", "Quality Control (QA/QC)"
  ],

  experience: [
    {
      company: "Larsen & Toubro (L&T) Construction",
      period: "2021 – Present",
      roles: [{
        title: "Assistant Project Manager",
        bullets: [
          "Supervising construction of residential complexes from foundation to finishing.",
          "Managing a workforce of 50+ laborers and coordinating with sub-contractors.",
          "Ensuring structural integrity and adherence to IS Codes and safety regulations.",
          "Reduced material wastage by 12% through better inventory tracking."
        ],
      }],
    },
    {
      company: "AFCONS Infrastructure Ltd.",
      period: "2018 – 2021",
      roles: [{
        title: "Site Engineer",
        bullets: [
          "Monitored day-to-day site progress for major bridge expansion projects.",
          "Prepared detailed Daily Progress Reports (DPR) and verified vendor bills."
        ],
      }],
    },
  ],

  projects: [
    { name: "Metro Line Extension", detail: "Structural detailing for 3 elevated stations." },
    { name: "Smart City Drainage", detail: "Designed city-wide stormwater management system." }
  ],

  education: [{
    school: "Government College of Engineering",
    year: "2018",
    degree: "B.Tech in Civil Engineering",
  }],
});

const CivilEngineerTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, linkedin, summaryTitle, experienceTitle, skillsTitle, eduTitle, projectsTitle, summary, skills, experience, projects, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Helvetica', Arial, sans-serif", backgroundColor: "#fff", color: textDark, boxSizing: "border-box" }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", borderBottom: `8px solid ${primary}` }}>
        <div style={{ background: secondary, color: "#fff", padding: "10mm 15mm", width: "70%" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "26px", fontWeight: "900", letterSpacing: "1px" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "12px", color: "#fb923c", marginTop: "5px", fontWeight: "bold", textTransform: "uppercase" }} />
        </div>
        <div style={{ background: lightBg, padding: "10mm 10mm", width: "30%", fontSize: "10px", color: secondary }}>
          <div style={{ marginBottom: "3px" }}>📍 <E value={location} onChange={(v) => u("location", v)} /></div>
          <div style={{ marginBottom: "3px" }}>📞 <E value={phone} onChange={(v) => u("phone", v)} /></div>
          <div style={{ marginBottom: "3px" }}>📧 <E value={email} onChange={(v) => u("email", v)} /></div>
          <div style={{ fontWeight: "bold" }}>🔗 <E value={linkedin} onChange={(v) => u("linkedin", v)} /></div>
        </div>
      </div>

      <div style={{ padding: "8mm 15mm" }}>
        
        {/* SUMMARY */}
        <div style={{ marginBottom: "15px" }}>
          <div style={{ fontSize: "12px", fontWeight: "bold", color: primary, marginBottom: "5px", borderBottom: `1px solid ${borderCol}` }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "10.5px", lineHeight: "1.5" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "25px" }}>
          
          {/* LEFT: EXPERIENCE */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: "bold", color: primary, marginBottom: "8px", textTransform: "uppercase" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "11px" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ color: primary }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "600", fontSize: "10px", color: secondary, display: "block" }} />
                    <ul style={{ margin: "5px 0", paddingLeft: "15px" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "10px", marginBottom: "3px" }}>
                          <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* RIGHT: SKILLS, PROJECTS & EDU */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: "bold", color: primary, marginBottom: "8px", textTransform: "uppercase" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "15px" }}>
              {skills.map((s, i) => (
                <span key={i} style={{ background: secondary, color: "#fff", padding: "2px 6px", fontSize: "9px", borderRadius: "2px" }}>
                  <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                </span>
              ))}
            </div>

            <div style={{ fontSize: "12px", fontWeight: "bold", color: primary, marginBottom: "8px", textTransform: "uppercase" }}>
              <E value={projectsTitle} onChange={(v) => u("projectsTitle", v)} />
            </div>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: "8px", padding: "6px", background: lightBg, borderLeft: `3px solid ${primary}` }}>
                <E value={p.name} onChange={(v) => { const a = ref.current.projects.map((item, j) => j === i ? { ...item, name: v } : item); u("projects", a); }} block style={{ fontWeight: "bold", fontSize: "9.5px" }} />
                <E value={p.detail} onChange={(v) => { const a = ref.current.projects.map((item, j) => j === i ? { ...item, detail: v } : item); u("projects", a); }} block style={{ fontSize: "9px", color: secondary }} />
              </div>
            ))}

            <div style={{ fontSize: "12px", fontWeight: "bold", color: primary, marginBottom: "8px", marginTop: "15px", textTransform: "uppercase" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "9.5px" }} />
                <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "9px" }} />
                <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "9px", color: primary, fontWeight: "bold" }} />
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default CivilEngineerTemplate;