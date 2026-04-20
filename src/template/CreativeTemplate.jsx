import React, { useState, useRef } from "react";
import EditableSpan from "../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

const accent = "#1a1a1a"; // Professional Black
const dark = "#1a1a1a";
const light = "#ffffff";
const muted = "#555555";

const CreativeTemplate = ({ data: propData, setData: setPropData }) => {
  // ─── Data Structure based on Vikasbind_oct (1).pdf ──────────────────────────
  const [data, setDataState] = useState(() => ({
    name: "First Name",
    phone: "+91 8644564677",
    location: "city, state",
    email: "email@gmail.com",
    linkedin: "linkedin.com",

    objectiveTitle: "OBJECTIVE",
    objective: "Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications. Proficient in front-end and back-end technologies, including HTML, CSS, JavaScript, React, Node.js, and database systems like MongoDB and MySQL. Skilled in problem-solving, collaboration, and delivering user-focused solutions.",

    skillsTitle: "SKILLS",
    skills: [
      "Html, Css, React Js, Node Js, Express Js, Next Js, Electron Js, Javascript, Bootstrap, Tailwind CSS",
      "Django (Framework), Python, MongoDB, MsSql, PostgreSQL, RESTful APIs, Git & Github"
    ],

    experienceTitle: "EXPERIENCE",
    experience: [
      {
        role: "full Stack Developer",
        company: "Microsoft",
        period: "Aug-2025-present",
        bullets: [
          "Contributed to the development of a full-scale bg  project.",
          "Built and integrated key modules like Finance, Accounts, and HR.",
          "Developed and optimized REST APIs for smooth data flow across the system.",
          "Worked on MongoDB database structures, schema design, and data handling."
        ]
      },
      {
        role: "Software Developer",
        company: "Amazon",
        period: "April 2025-August-2025",
        bullets: [
          "Developing full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
          "Responsible for building scalable APIs and ensuring responsive Design"
        ]
      }
    ],

    educationTitle: "EDUCATION",
    education: [
      { degree: "BTECH", school: "IIT delhi", year: "2021-2025" },
       
    ],

    projectsTitle: "PROJECTS",
    projects: [
      {
        title: "flipkard(E-commerce)",
        description: "Worked on a complete software Gained experience in business workflows and API development.",
      },
      {
        title: "Transport Management Systems  ",
        description: "Developed a web-based platform for vehicle tracking and automated invoice generation with secure authentication.",
      }
    ],

    certificationsTitle: "CERTIFICATIONS",
    certifications: [
      "Completed Training in Mern Stack",
      "Best Performance Award for project design"
    ],
    ...(propData || {}),
  }));

  const dataRef = useRef(data);
  const u = (field, value) => {
    const newData = { ...dataRef.current, [field]: value };
    setDataState(newData);
    dataRef.current = newData;
    if (setPropData) setPropData(newData);
  };

  // ─── Updated Section Heading Design (Fixed "Double Line" issue) ──────────
  const SectionHead = ({ title }) => (
    <div style={{ marginTop: "14px", marginBottom: "8px" }}>
      <div/>  
      <h2 style={{ 
        fontSize: "10px", fontWeight: "800", letterSpacing: "0.2em", 
        textAlign: "center", textTransform: "uppercase", margin: 0, padding: "3px 0" 
      }}>
        <E value={title} onChange={(v) => {}} />
      </h2>
      <div style={{ borderBottom: "1px solid #1a1a1a",paddingBottom:"4px  " }} /> {/* Bottom Line */}
    </div>
  );

  return (
    <div style={{ background: "#f5f5f5", padding: "20px", display: "flex", justifyContent: "center" }}>
      <div id="resume" style={{
          width: "210mm", minHeight: "297mm", padding: "12mm 15mm",
          background: light, fontFamily: "'Georgia', serif", fontSize: "10.5px",
          color: "#1a1a1a", boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <E value={data.name} onChange={(v) => u("name", v)} style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "1px" }} />
          <div style={{ fontSize: "9.5px", marginTop: "4px", color: muted }}>
            <E value={data.phone} onChange={(v) => u("phone", v)} /> | <E value={data.location} onChange={(v) => u("location", v)} />
            <br />
            <E value={data.email} onChange={(v) => u("email", v)} /> | <E value={data.linkedin} onChange={(v) => u("linkedin", v)} />
          </div>
        </div>

        {/* OBJECTIVE */}
        <SectionHead title={data.objectiveTitle} />
        <E value={data.objective} onChange={(v) => u("objective", v)} block style={{ lineHeight: "1.4", textAlign: "justify" }} />

        <div style={{ display: "flex", gap: "30px", marginTop: "10px" }}>
          {/* LEFT SIDE (Skills, Education, Certifications) */}
          <div style={{ flex: "0 0 220px" }}>
            <SectionHead title={data.skillsTitle} />
            {data.skills.map((s, i) => (
              <div key={i} style={{ marginBottom: "4px" }}>
                • <E value={s} onChange={() => {}} />
              </div>
            ))}

            <SectionHead title={data.educationTitle} />
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <E value={edu.school} onChange={() => {}} style={{ fontWeight: "700", display: "block" }} />
                <div style={{ fontStyle: "italic" }}><E value={edu.degree} onChange={() => {}} /></div>
                <div style={{ fontSize: "9px", color: "#666" }}>{edu.year}</div>
              </div>
            ))}

            <SectionHead title={data.certificationsTitle} />
            {data.certifications.map((c, i) => (
              <div key={i} style={{ marginBottom: "4px" }}>
                • <E value={c} onChange={() => {}} />
              </div>
            ))}
          </div>

          {/* RIGHT SIDE (Experience & Projects) */}
          <div style={{ flex: 1 }}>
            <SectionHead title={data.experienceTitle} />
            {data.experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700" }}>
                  <span>{exp.company}</span>
                  <span style={{ fontSize: "9px" }}>{exp.period}</span>
                </div>
                <div style={{ fontStyle: "italic", fontWeight: "600", marginBottom: "4px" }}>{exp.role}</div>
                {exp.bullets.map((b, bi) => (
                  <div key={bi} style={{ display: "flex", gap: "8px", marginBottom: "2px", textAlign: "justify" }}>
                    <span style={{ fontSize: "12px" }}>•</span>
                    <E value={b} onChange={() => {}} />
                  </div>
                ))}
              </div>
            ))}

            <SectionHead title={data.projectsTitle} />
            {data.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <div style={{ fontWeight: "700" }}>{proj.title}</div>
                <E value={proj.description} onChange={() => {}} block style={{ color: "#444" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;