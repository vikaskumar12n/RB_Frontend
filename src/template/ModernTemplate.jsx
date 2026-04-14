import React, { useState, useRef } from "react";
import EditableSpan from "../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// ─── Minimalist Design Constants ──────────────────────────────────────────────
const black = "#000000";
const gray = "#4b5563";
const lightGray = "#e5e7eb";

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

  projects: [
    {
      title: "CRM (Customer Relationship Management)",
      description: "Worked on a complete CRM system including Finance, Accounts, and HR modules. Implemented payment tracking, automated invoicing, and employee management workflows.",
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

  experience: [
    {
      company: "XYZ Solutions Pvt. Ltd.",
      period: "2018 – Present",
      roles: [
        {
          title: "Front End Developer, React",
          period: "",
          bullets: [
            "Contributed to the development of a full-scale CRM (DSS) project.",
            "Built and integrated key modules like Finance, Accounts, and HR.",
            "Improved system performance through efficient backend logic and clean architecture.",
          ],
        },
      ],
    },
  ],

  education: [
    {
      school: "Millennium Group of Institutions",
      year: "2013",
      degree: "Bachelor of Engineering, Information Technology",
    },
  ],

  skills: [
    ["HTML", "CSS", "JavaScript", "React"],
    ["Node.js", "Express", "MongoDB", "SQL"],
  ],
});

// ─── Section Headings ────────────────────────────────────────────────────────
const SideHead = ({ children }) => (
  <div style={{
    fontSize: "10px", fontWeight: "bold", textTransform: "uppercase",
    letterSpacing: "1.5px", color: black, borderBottom: `1px solid ${black}`,
    paddingBottom: "5px", marginBottom: "8px", marginTop: "15px"
  }}>
    {children}
  </div>
);

const MainHead = ({ children }) => (
  <div style={{
    fontSize: "11px", fontWeight: "bold", textTransform: "uppercase",
    letterSpacing: "1.5px", color: black, borderBottom: `1px solid ${black}`,
    paddingBottom: "5px", marginBottom: "10px"
  }}>
    {children}
  </div>
);

const ModernTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDataState] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const dataRef = useRef(data);

  const setData = (newData) => {
    setDataState(newData);
    dataRef.current = newData;
    if (setPropData) setPropData(newData);
  };

  const u = (field, value) => setData({ ...dataRef.current, [field]: value });

  const {
    name, location, phone, email, linkedin, objectiveTitle, experienceTitle,
    projectTitle, educationTitle, skillsTitle, certificationTitle,
    objective, projects, certifications, experience, education, skills,
  } = data;

  return (
    <div id="resume" style={{
      width: "210mm", minHeight: "297mm", fontFamily: "'Segoe UI', sans-serif",
      fontSize: "10.5px", backgroundColor: "#fff", display: "flex", color: black, boxSizing: "border-box"
    }}>

      {/* LEFT COLUMN (Sidebar) */}
      <div style={{ width: "65mm", padding: "12mm 8mm", borderRight: `1px solid ${lightGray}`, flexShrink: 0 }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }} />

        <SideHead>Contact</SideHead>
        <div style={{ fontSize: "9.5px", lineHeight: "1.8" }}>
          <E value={location} onChange={(v) => u("location", v)} block />
          <E value={phone} onChange={(v) => u("phone", v)} block />
          <E value={email} onChange={(v) => u("email", v)} block />
          <E value={linkedin} onChange={(v) => u("linkedin", v)} block />
        </div>

        <SideHead><E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} /></SideHead>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {skills.flat().map((skill, i) => skill ? (
            <div key={i} style={{ fontSize: "9.5px" }}>• <E value={skill} onChange={() => {}} /></div>
          ) : null)}
        </div>

        <SideHead><E value={educationTitle} onChange={(v) => u("educationTitle", v)} /></SideHead>
        {education.map((edu, i) => (
          <div key={i} style={{ marginBottom: "8px", fontSize: "9px" }}>
            <E value={edu.degree} onChange={() => {}} block style={{ fontWeight: "bold" }} />
            <E value={edu.school} onChange={() => {}} block />
            <E value={edu.year} onChange={() => {}} block style={{ color: gray }} />
          </div>
        ))}

        <SideHead><E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} /></SideHead>
        {certifications.map((cert, i) => (
          <div key={i} style={{ fontSize: "9px", marginBottom: "4px" }}>• <E value={cert} onChange={() => {}} /></div>
        ))}
      </div>

      {/* RIGHT COLUMN (Main Content) */}
      <div style={{ flex: 1, padding: "12mm 10mm" }}>
        
        <div style={{ marginBottom: "20px" }}>
          <MainHead><E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} /></MainHead>
          <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "10px", lineHeight: "1.6", textAlign: "justify" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <MainHead><E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} /></MainHead>
          {experience.map((exp, ei) => (
            <div key={ei} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "11px" }}>
                <E value={exp.company} onChange={() => {}} />
                <E value={exp.period} onChange={() => {}} style={{ fontSize: "9.5px", fontWeight: "normal" }} />
              </div>
              {exp.roles?.map((role, ri) => (
                <div key={ri} style={{ marginTop: "2px" }}>
                  <E value={role.title} onChange={() => {}} style={{ fontStyle: "italic", color: gray }} />
                  <ul style={{ paddingLeft: "18px", marginTop: "4px", margin: "4px 0" }}>
                    {role.bullets?.map((b, bi) => (
                      <li key={bi} style={{ marginBottom: "2px" }}><E value={b} onChange={() => {}} /></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div>
          <MainHead><E value={projectTitle} onChange={(v) => u("projectTitle", v)} /></MainHead>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <E value={proj.title} onChange={() => {}} style={{ fontWeight: "bold", display: "block" }} />
              <E value={proj.description} onChange={() => {}} block style={{ fontSize: "10px", color: gray, marginTop: "2px" }} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ModernTemplate;