import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Minimalist Tech Intern Theme (Pure Black & White)
const black      = "#000000";
const white      = "#ffffff";
const grayText   = "#4b5563"; // Slight variation for dates

const getInitialData = () => ({
  name: "INTERN NAME",
  title: "Software Engineering Intern | Aspiring Web Developer",
  location: "Bengaluru, India",
  phone: "+91-77777-66666",
  email: "intern.dev@techmail.com",
  github: "github.com/intern-coder",
  linkedin: "linkedin.com/in/aspiring-dev",

  objectiveTitle: "Objective",
  skillsTitle: "Technical Skills",
  projectsTitle: "Key Projects",
  eduTitle: "Education",
  certTitle: "Certifications & Achievements",

  objective: `Highly motivated Computer Science student seeking a challenging Software Engineering Internship. Eager to apply strong foundations in data structures, algorithms, and full-stack development to contribute to innovative projects. Quick learner with a passion for coding and problem-solving.`,

  skills: [
    "Languages: Python, Java, JavaScript (ES6+), SQL",
    "Frontend: HTML5, CSS3, React.js, Tailwind CSS",
    "Backend: Node.js, Express.js, Basic Flask",
    "Tools: Git/GitHub, VS Code, Postman, Linux Basics"
  ],

  projects: [
    {
      name: "E-Commerce Product API",
      tech: "Node.js, Express, MongoDB",
      bullets: [
        "Built a RESTful API for managing products, users, and orders with full CRUD functionality.",
          "Implemented JWT authentication and bcrypt for password hashing to secure user data.",
          "Deployed the application on Heroku and documented the API using Postman."
      ],
    },
    {
      name: "Weather App Dashboard",
      tech: "React.js, Fetch API, Tailwind CSS",
      bullets: [
        "Developed a responsive single-page application that displays real-time weather data for searched cities.",
        "Integrated the OpenWeatherMap API and optimized API calls to improve performance."
      ],
    },
  ],

  education: [{
    school: "Indian Institute of Technology (IIT) / NIT",
    year: "Expected Graduation: 2025",
    degree: "B.Tech in Computer Science & Engineering",
  }],

  certs: [
    "HackerRank Problem Solving (Intermediate) Certificate", 
    "AWS Certified Cloud Practitioner (Pursuing)", 
    "Udemy: Modern React with Redux [Complete Guide]", 
    "Dean's List - Semester 3, 4"
  ],
});

const TechInternTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, github, linkedin, objectiveTitle, skillsTitle, projectsTitle, eduTitle, certTitle, objective, skills, projects, education, certs } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'IBM Plex Mono', monospace", backgroundColor: white, color: black, padding: "15mm 20mm", boxSizing: "border-box" }}>
      
      {/* CODE-STYLE HEADER - CENTERED */}
      <div style={{ textAlign: "center", marginBottom: "12mm", borderBottom: `2px solid ${black}`, paddingBottom: "5px" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-1px" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "12px", fontWeight: "700", marginTop: "5px", textTransform: "uppercase" }} />
        
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "12px", fontSize: "10px", fontWeight: "500" }}>
          <span><E value={location} onChange={(v) => u("location", v)} /></span>
          <span>•</span>
          <span><E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span>•</span>
          <span><E value={email} onChange={(v) => u("email", v)} /></span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "5px", fontSize: "10px", fontWeight: "700" }}>
          <span><E value={github} onChange={(v) => u("github", v)} /></span>
          <span>|</span>
          <span><E value={linkedin} onChange={(v) => u("linkedin", v)} /></span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        
        {/* OBJECTIVE SECTION */}
        <div style={{ marginBottom: "15px" }}>
          <div style={{ fontSize: "13px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", borderBottom: `2px solid ${black}`, display: "inline-block" }}>
            <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
          </div>
          <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "11px", lineHeight: "1.7", textAlign: "justify" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "40px" }}>
          
          {/* LEFT: PROJECTS SECTION */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px", borderBottom: `2px solid ${black}`, display: "inline-block" }}>
              <E value={projectsTitle} onChange={(v) => u("projectsTitle", v)} />
            </div>
            {projects.map((proj, pi) => (
              <div key={pi} style={{ marginBottom: "25px", position: "relative" }}>
                <div style={{ position: "absolute", left: "-6px", top: "0", bottom: "0", width: "1px", background: black }} />
                <div style={{ position: "absolute", left: "-3.5px", top: "2px", width: "6px", height: "6px", borderRadius: "50%", background: white, border: `1.5px solid ${black}` }} />
                
                <div style={{ paddingLeft: "15px" }}>
                  <div style={{ fontWeight: "800", fontSize: "13px", textTransform: "uppercase" }}>
                    <E value={proj.name} onChange={(v) => { const a = ref.current.projects.map((p, i) => i === pi ? { ...p, name: v } : p); u("projects", a); }} />
                  </div>
                  <E value={proj.tech} onChange={(v) => { const a = ref.current.projects.map((p, i) => i === pi ? { ...p, tech: v } : p); u("projects", a); }} block style={{ fontWeight: "700", fontSize: "10px", color: grayText, fontStyle: "italic", marginTop: "2px" }} />
                  
                  <ul style={{ margin: "10px 0", paddingLeft: "15px", listStyleType: "square" }}>
                    {proj.bullets.map((b, bi) => (
                      <li key={bi} style={{ fontSize: "10.5px", marginBottom: "6px", lineHeight: "1.5" }}>
                        <E value={b} onChange={(v) => { const a = ref.current.projects.map((p, i) => i === pi ? { ...p, bullets: p.bullets.map((bul, k) => k === bi ? v : bul) } : p); u("projects", a); }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: SKILLS & EDUCATION & CERTS */}
          <div>
            <div style={{ marginBottom: "30px" }}>
              <div style={{ fontSize: "13px", fontWeight: "900", textTransform: "uppercase", marginBottom: "12px", borderBottom: `2px solid ${black}`, display: "inline-block" }}>
                <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ fontSize: "10px", fontWeight: "600", borderLeft: `2px solid ${black}`, paddingLeft: "8px" }}>
                    <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <div style={{ fontSize: "13px", fontWeight: "900", textTransform: "uppercase", marginBottom: "12px", borderBottom: `2px solid ${black}`, display: "inline-block" }}>
                <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              </div>
              {education.map((edu, i) => (
                <div key={i}>
                  <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "800", fontSize: "11px" }} />
                  <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10px", marginTop: "2px" }} />
                  <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "10px", fontWeight: "800" }} />
                </div>
              ))}
            </div>

            <div style={{ border: `2px dashed ${black}`, padding: "15px" }}>
              <div style={{ fontSize: "13px", fontWeight: "900", textTransform: "uppercase", marginBottom: "12px" }}>
                <E value={certTitle} onChange={(v) => u("certTitle", v)} />
              </div>
              {certs.map((c, i) => (
                <div key={i} style={{ fontSize: "9.5px", marginBottom: "6px", fontWeight: "500", display: "flex", gap: "8px" }}>
                   <span style={{ fontWeight: "bold" }}>[]</span>
                  <E value={c} onChange={(v) => { const a = ref.current.certs.map((item, j) => j === i ? v : item); u("certs", a); }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default TechInternTemplate;