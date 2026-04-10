import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Formal Engineering Palette
const primary    = "#000000"; // Black
const secondary  = "#475569"; // Slate Gray
const line       = "#e2e8f0"; // Divider line

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
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Arial', sans-serif", backgroundColor: "#fff", color: primary, boxSizing: "border-box" }}>
      
      {/* HEADER SECTION - NO BACKGROUNDS */}
      <div style={{ padding: "12mm 15mm 5mm", borderBottom: `2px solid ${primary}` }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "1px" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "13px", color: secondary, marginTop: "2px", fontWeight: "bold", textTransform: "uppercase" }} />
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "12px", fontSize: "11px", fontWeight: "500" }}>
          <span>📍 <E value={location} onChange={(v) => u("location", v)} /></span>
          <span>📞 <E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span>📧 <E value={email} onChange={(v) => u("email", v)} /></span>
          <span>🔗 <E value={linkedin} onChange={(v) => u("linkedin", v)} /></span>
        </div>
      </div>

      <div style={{ padding: "8mm 15mm" }}>
        
        {/* SUMMARY SECTION */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "12px", fontWeight: "bold", color: primary, textTransform: "uppercase", marginBottom: "6px", borderBottom: `1px solid ${line}`, paddingBottom: "2px" }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6", textAlign: "justify" }} />
        </div>

        {/* TWO COLUMN BODY */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "35px" }}>
          
          {/* LEFT: WORK EXPERIENCE */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: "bold", color: primary, textTransform: "uppercase", marginBottom: "12px", borderBottom: `1px solid ${line}`, paddingBottom: "2px" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "11.5px" }}>
                  <E value={exp.company} onChange={(v) => { /* Update logic */ }} />
                  <E value={exp.period} onChange={(v) => { /* Update logic */ }} style={{ fontSize: "11px" }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { /* Update logic */ }} style={{ fontWeight: "600", fontSize: "11px", color: secondary, display: "block", marginTop: "2px" }} />
                    <ul style={{ margin: "6px 0", paddingLeft: "18px" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "10.5px", marginBottom: "4px" }}>
                          <E value={b} onChange={(v) => { /* Update logic */ }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* RIGHT: SKILLS, PROJECTS & EDUCATION */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: "bold", color: primary, textTransform: "uppercase", marginBottom: "10px", borderBottom: `1px solid ${line}`, paddingBottom: "2px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "25px" }}>
              {skills.map((s, i) => (
                <div key={i} style={{ fontSize: "10.5px", display: "flex", alignItems: "center" }}>
                   <span style={{ marginRight: "8px" }}>•</span>
                   <E value={s} onChange={(v) => { /* Update logic */ }} />
                </div>
              ))}
            </div>

            <div style={{ fontSize: "12px", fontWeight: "bold", color: primary, textTransform: "uppercase", marginBottom: "10px", borderBottom: `1px solid ${line}`, paddingBottom: "2px" }}>
              <E value={projectsTitle} onChange={(v) => u("projectsTitle", v)} />
            </div>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <E value={p.name} onChange={(v) => { /* Update logic */ }} block style={{ fontWeight: "bold", fontSize: "11px" }} />
                <E value={p.detail} onChange={(v) => { /* Update logic */ }} block style={{ fontSize: "10.5px", color: secondary, marginTop: "2px" }} />
              </div>
            ))}

            <div style={{ fontSize: "12px", fontWeight: "bold", color: primary, textTransform: "uppercase", marginBottom: "10px", marginTop: "20px", borderBottom: `1px solid ${line}`, paddingBottom: "2px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <E value={edu.degree} onChange={(v) => { /* Update logic */ }} block style={{ fontWeight: "bold", fontSize: "11px" }} />
                <E value={edu.school} onChange={(v) => { /* Update logic */ }} block style={{ fontSize: "10.5px", color: secondary }} />
                <E value={edu.year} onChange={(v) => { /* Update logic */ }} style={{ fontSize: "10.5px", fontWeight: "bold" }} />
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default CivilEngineerTemplate;