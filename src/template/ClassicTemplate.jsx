import React, { useState, useRef } from "react";
import EditableSpan from "../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Classic - Minimalist Single Column Theme
const black      = "#000000";
const secondary  = "#4b5563";
const divider    = "#000000"; 

const getInitialData = () => ({
  name: "FIRST LAST",
  contact: "+1-234-456-789 | Bay Area, California",
  links: "professionalemail@resumeworded.com | linkedin.com/in/username",

  objectiveTitle: "OBJECTIVE",
  objective: `Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications. Proficient in front-end and back-end technologies, including HTML, CSS, JavaScript, React, Node.js, and database systems like MongoDB and MySQL.`,

  experienceTitle: "PROFESSIONAL EXPERIENCE",
  experience: [
    {
      company: "XYZ Solutions Pvt. Ltd.",
      period: "2018 – Present",
      roles: [{
        title: "Front End Developer, React",
        bullets: [
          "Contributed to the development of a full-scale CRM (DSS) project.",
          "Built and integrated key modules like Finance, Accounts, and HR.",
          "Improved system performance through efficient backend logic and clean architecture.",
          "Collaborated with the team to deliver real-world business features.",
        ],
      }],
    },
    {
      company: "Technano Pvt. Ltd., Noida",
      period: "2014 – 2017",
      roles: [{
        title: "Front End Developer",
        bullets: [
          "Built fast and accessible websites improving load time by 22%.",
          "Converted UI/UX wireframes into responsive code.",
        ],
      }],
    },
  ],

  projectTitle: "PROJECTS",
  projects: [
    {
      title: "CRM (Customer Relationship Management)",
      description: "Worked on a complete CRM system with Finance, Accounts, and HR modules.",
    },
    {
      title: "E-commerce Website",
      description: "Developed full stack e-commerce platform with authentication and payment integration.",
    },
  ],

  skillsTitle: "SKILLS",
  skillsList: "HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, SQL, Git, RESTful APIs",

  educationTitle: "EDUCATION",
  education: [{
    school: "Millennium Group of Institutions",
    year: "2013",
    degree: "Bachelor of Engineering, Information Technology",
  }],

  certificationTitle: "CERTIFICATIONS",
  certifications: [
    "Full Stack Web Development - Udemy",
    "React Developer Certification",
  ],
});

const ClassicTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const {
    name, contact, links, objectiveTitle, objective, experienceTitle, experience,
    projectTitle, projects, skillsTitle, skillsList, educationTitle, education,
    certificationTitle, certifications
  } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Georgia', serif", backgroundColor: "#fff", color: black, padding: "15mm", boxSizing: "border-box" }}>
      
      {/* HEADER - CENTERED */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "1px", textTransform: "uppercase" }} />
        <div style={{ fontSize: "11px", marginTop: "5px", color: secondary }}>
          <E value={contact} onChange={(v) => u("contact", v)} />
        </div>
        <div style={{ fontSize: "11px", fontWeight: "bold", marginTop: "2px" }}>
          <E value={links} onChange={(v) => u("links", v)} />
        </div>
      </div>

      {/* OBJECTIVE */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "12px", fontWeight: "bold", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
        </h3>
        <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "11px", lineHeight: "1.5", textAlign: "justify" }} />
      </div>

      {/* EXPERIENCE */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "12px", fontWeight: "bold", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "10px", textTransform: "uppercase" }}>
          <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
        </h3>
        {experience.map((exp, ei) => (
          <div key={ei} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "11px" }}>
              <E value={exp.company} onChange={() => {}} />
              <E value={exp.period} onChange={() => {}} />
            </div>
            {exp.roles.map((role, ri) => (
              <div key={ri} style={{ marginTop: "2px" }}>
                <E value={role.title} onChange={() => {}} style={{ fontSize: "10.5px", fontStyle: "italic", display: "block", color: secondary }} />
                <ul style={{ margin: "5px 0 0 0", paddingLeft: "18px", fontSize: "10.5px" }}>
                  {role.bullets.map((b, bi) => (
                    <li key={bi} style={{ marginBottom: "3px" }}><E value={b} onChange={() => {}} /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* PROJECTS */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "12px", fontWeight: "bold", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
        </h3>
        {projects.map((proj, i) => (
          <div key={i} style={{ marginBottom: "6px", fontSize: "11px" }}>
            <span style={{ fontWeight: "bold" }}><E value={proj.title} onChange={() => {}} />: </span>
            <E value={proj.description} onChange={() => {}} />
          </div>
        ))}
      </div>

      {/* SKILLS */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "12px", fontWeight: "bold", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
        </h3>
        <div style={{ fontSize: "11px", lineHeight: "1.4" }}>
          <E value={skillsList} onChange={(v) => u("skillsList", v)} />
        </div>
      </div>

      {/* EDUCATION */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "12px", fontWeight: "bold", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={educationTitle} onChange={(v) => u("educationTitle", v)} />
        </h3>
        {education.map((edu, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
            <div>
              <span style={{ fontWeight: "bold" }}><E value={edu.school} onChange={() => {}} /></span> | <E value={edu.degree} onChange={() => {}} />
            </div>
            <span style={{ fontWeight: "bold" }}><E value={edu.year} onChange={() => {}} /></span>
          </div>
        ))}
      </div>

      {/* CERTIFICATIONS */}
      <div>
        <h3 style={{ fontSize: "12px", fontWeight: "bold", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} />
        </h3>
        <ul style={{ margin: "0", paddingLeft: "18px", fontSize: "11px" }}>
          {certifications.map((cert, i) => (
            <li key={i} style={{ marginBottom: "2px" }}><E value={cert} onChange={() => {}} /></li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default ClassicTemplate;