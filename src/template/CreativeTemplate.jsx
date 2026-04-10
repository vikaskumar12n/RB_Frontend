import React, { useState, useCallback, useRef } from "react";
import EditableSpan from "../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

const accent = "#c0392b";
const dark = "#1a1a2e";
const light = "#ffffff"; // Pure white background
const muted = "#555555";

// ─── Default data ──────────────────────────────────────────────────────────────
const getInitialData = () => ({
  name: "FIRST LAST",
  location: "Bay Area, California",
  phone: "+1-234-456-789",
  email: "professionalemail@resumeworded.com",
  linkedin: "linkedin.com/in/username",

  objectiveTitle: "Objective",
  experienceTitle: "Professional Experience",
  projectTitle: "Projects",
  educationTitle: "Education",
  skillsTitle: "Skills",
  certificationTitle: "Certifications",

  objective: `Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications. Proficient in front-end and back-end technologies, including HTML, CSS, JavaScript, React, Node.js, and database systems like MongoDB and MySQL.`,

  skills: [
    ["HTML", "CSS", "JavaScript", "React"],
    ["Node.js", "Express", "MongoDB", "SQL"],
  ],

  experience: [
    {
      company: "XYZ Solutions Pvt. Ltd.",
      period: "2018 – Present",
      roles: [{
        title: "Front End Developer, React",
        period: "",
        bullets: [
          "Contributed to the development of a full-scale CRM (DSS) project.",
          "Built and integrated key modules like Finance, Accounts, and HR.",
          "Improved system performance through efficient backend logic and clean architecture.",
        ],
      }],
    },
  ],

  education: [{
    school: "Millennium Group of Institutions",
    year: "2013",
    degree: "Bachelor of Engineering, Information Technology",
  }],

  projects: [
    {
      title: "CRM (Customer Relationship Management)",
      description: `Worked on a complete CRM system that includes multiple business-critical modules like Finance, Accounts, and HR for real-world business workflows.`,
    },
    {
      title: "E-commerce Website",
      description: "Developed full stack e-commerce platform with authentication and payment integration.",
    },
  ],

  certifications: [
    "Full Stack Web Development - Udemy",
    "React Developer Certification",
  ],
});

// ─── Section Headings ─────────────────────────────────────────────
const RightHeading = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", marginTop: "15px" }}>
    <span style={{
      fontSize: "10px", fontFamily: "'Trebuchet MS', sans-serif",
      letterSpacing: "2px", textTransform: "uppercase", color: accent, fontWeight: "bold",
    }}>
      {children}
    </span>
    <div style={{ flex: 1, height: "1px", background: `#eee` }} />
  </div>
);

const CreativeTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDataState] = useState(() => ({
    ...getInitialData(),
    ...(propData || {}),
  }));

  const dataRef = useRef(data);

  const setData = (newData) => {
    setDataState(newData);
    dataRef.current = newData;
    if (setPropData) setPropData(newData);
  };

  const u = (f, v) => {
    const newData = { ...dataRef.current, [f]: v };
    setData(newData);
  };

  const {
    name, location, phone, email, linkedin,
    objectiveTitle, experienceTitle, projectTitle,
    educationTitle, skillsTitle, certificationTitle,
    objective, projects, certifications, experience, education, skills,
  } = data;

  return (
    <div style={{ background: "#f5f5f5", padding: "20px", display: "flex", justifyContent: "center" }}>
      <div
        id="resume"
        style={{
          width: "210mm", minHeight: "297mm",
          fontFamily: "'Georgia', serif",
          fontSize: "11px", background: light,
          padding: "15mm 15mm", color: "#333",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      >
        {/* ── HEADER ── */}
        <div style={{ borderBottom: `2px solid ${accent}`, paddingBottom: "10px", marginBottom: "20px" }}>
          <E value={name} onChange={(v) => u("name", v)} block
            style={{ fontSize: "32px", fontWeight: "bold", color: dark, letterSpacing: "1px", marginBottom: "5px" }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", fontSize: "10px", color: muted, fontFamily: "'Trebuchet MS', sans-serif" }}>
            <E value={location} onChange={(v) => u("location", v)} />
            <E value={phone} onChange={(v) => u("phone", v)} />
            <E value={email} onChange={(v) => u("email", v)} style={{ color: accent }} />
            <E value={linkedin} onChange={(v) => u("linkedin", v)} style={{ color: accent }} />
          </div>
        </div>

        {/* ── OBJECTIVE ── */}
        <div>
          <RightHeading>
            <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
          </RightHeading>
          <E value={objective} onChange={(v) => u("objective", v)} block
            style={{ lineHeight: "1.6", color: "#444" }}
          />
        </div>

        <div style={{ display: "flex", gap: "30px", marginTop: "10px" }}>
          {/* ── LEFT SIDE (Skills, Education, Certs) ── */}
          <div style={{ flex: "0 0 220px" }}>
            
            <RightHeading>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </RightHeading>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {skills.flat().map((skill, i) => (
                <span key={i} style={{ fontSize: "10px", padding: "2px 0", width: "45%", color: "#444" }}>
                  • <E value={skill} onChange={(v) => {
                      const flat = dataRef.current.skills.flat();
                      flat[i] = v;
                      // Re-chunking if necessary or just update the structure
                      u("skills", [flat.slice(0, 4), flat.slice(4)]);
                  }} />
                </span>
              ))}
            </div>

            <RightHeading>
              <E value={educationTitle} onChange={(v) => u("educationTitle", v)} />
            </RightHeading>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <E value={edu.degree} onChange={(v) => {}} style={{ fontWeight: "bold", display: "block" }} />
                <E value={edu.school} onChange={(v) => {}} style={{ color: muted, display: "block" }} />
                <E value={edu.year} onChange={(v) => {}} style={{ fontSize: "9px", color: accent }} />
              </div>
            ))}

            <RightHeading>
              <E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} />
            </RightHeading>
            {certifications.map((c, i) => (
              <div key={i} style={{ marginBottom: "4px", fontSize: "10px" }}>
                • <E value={c} onChange={(v) => {}} />
              </div>
            ))}
          </div>

          {/* ── RIGHT SIDE (Experience & Projects) ── */}
          <div style={{ flex: 1 }}>
            
            <RightHeading>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </RightHeading>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                  <E value={exp.company} onChange={(v) => {}} style={{ fontSize: "12px" }} />
                  <E value={exp.period} onChange={(v) => {}} style={{ color: accent }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => {}} style={{ fontStyle: "italic", color: muted, marginBottom: "5px", display: "block" }} />
                    {role.bullets.map((b, bi) => (
                      <div key={bi} style={{ display: "flex", gap: "8px", marginBottom: "3px", paddingLeft: "5px" }}>
                        <span style={{ color: accent }}>•</span>
                        <E value={b} onChange={(v) => {}} style={{ lineHeight: "1.5" }} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            <RightHeading>
              <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
            </RightHeading>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <E value={proj.title} onChange={(v) => {}} style={{ fontWeight: "bold", color: dark, display: "block" }} />
                <E value={proj.description} onChange={(v) => {}} style={{ color: "#555", lineHeight: "1.4" }} />
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;