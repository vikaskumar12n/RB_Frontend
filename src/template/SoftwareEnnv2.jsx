import React, { useState, useRef } from "react";
import EditableSpan from "../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

const SoftwareEnnV2 = ({ data: propData, setData: setPropData }) => {
  // ─── Data Structure based on Vikasbind_oct (1).pdf ──────────────────────────
  const [data, setDataState] = useState(() => ({
    name: "First Name", 
    phone: "+91 7567895678", 
    location: "city, state",  
    email: "example@gmail.com",
    linkedin: "linkedin.com ",

    objectiveTitle: "OBJECTIVE", 
    objective: "Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications. Proficient in front-end and back-end technologies, including HTML, CSS, JavaScript, React, Node.js, and database systems like MongoDB and MySQL. Skilled in problem-solving, collaboration, and delivering user-focused solutions. Passionate about leveraging cutting-edge technologies to create seamless, innovative digital experiences.",  
    skillsTitle: "SKILLS",  
    skills: [
      "Html, Css, React Js, Node Js, Express Js, Next Js, Electron Js, Javascript, Bootstrap, Tailwind CSS", 
      "Django (Framework), Python, MongoDB, MsSql, PostgreSQL, RESTful APIs, Git & Github"  
    ],

    experienceTitle: "EXPERIENCE",  
    experience: [
      {
        role: "Full Stack Developer", 
        company: "HCL Tech Lucknow",  
        period: "Aug-2025-present",  
        bullets: [
          "Contributed to the development of a full-scale project.",  
          "Built and integrated key modules like Finance, Accounts, and HR.", 
          "Developed and optimized REST APIs for smooth data flow across the system.",  
          "Worked on MongoDB database structures, schema design, and data handling.",  
          "Improved system performance through efficient backend logic and clean architecture.", 
          "Collaborated with the team to deliver real-world business features and ensure seamless frontend-backend integration."  
        ]
      },
      {
        role: "Software Developer",  
        company: "IBM",  
        period: "April 2025-August-2025",  
        bullets: [
          "Developing full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",  
          "Responsible for building scalable APIs, integrating frontend/backend, and ensuring responsive Design"  
        ]
      },
      {
        role: "Software Developer",  
        company: "Tech Mahindra",  
        period: "April 2024 - April 2025", 
        bullets: [
          "Committed to continuous learning and staying updated with latest technologies.", 
          "Applied problem-solving abilities to overcome challenges during project development.", 
          "Created technical documentation to communicate project details effectively."  
        ]
      }
    ],

    educationTitle: "EDUCATION",  
    education: [
      { degree: "BTECH", school: "IIT kanpur", year: "2024-2027" },  
     { degree: "Intermediate", school: "Delhi public school", year: "2019-2021" } 
    ],

    projectsTitle: "PROJECTS",  
    projects: [
      {
        title: "Paytm (Payment Applicatio)", 
        description: "Worked on a completem including Finance (Payment tracking, invoices), Accounts (Transaction monitoring), and HR (Attendance, recruitment) modules. Gained experience in business workflows and API development.",  
      },
      {
        title: "Transport Management Systems",  
        description: "Developed a web-based platform for vehicle tracking and automated invoice generation with secure authentication and responsive UI.",  
      },
      {
        title: "HRMS (HR Management System)",  
        description: "Built full-stack HRMS using React, Node, Express, and MongoDB. Features include attendance tracking and candidate management. Deployed on Vercel.", 
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

  // ─── Design Styles ─────────────────────────────────────────────────────────
  const styles = {
    container: {
      width: "210mm",
      minHeight: "297mm",
      padding: "12mm 15mm",
      background: "#fff",
      fontFamily: "'Georgia', serif",
      fontSize: "10.5px",
      color: "#1a1a1a",
      lineHeight: "1.4",
      margin: "auto",
    },
    header: { textAlign: "center", marginBottom: "12px" },
    name: { fontSize: "22px", fontWeight: "700", letterSpacing: "1px", display: "block" },
    contact: { fontSize: "9.5px", marginTop: "4px" },
    sectionHead: { 
  marginTop: "14px", 
  marginBottom: "8px" 
},

bottomLine: { 
  borderBottom: "2px solid #1a1a1a", 
  marginTop: "4px" 
},

sectionTitle: { 
  fontSize: "10px", 
  fontWeight: "800", 
  letterSpacing: "0.2em", 
  textTransform: "uppercase", 
  textAlign: "left", 
  margin: 0,
  padding: "2px 0",
  paddingBottom: "6px",
},
    itemTitle: { display: "flex", justifyContent: "space-between", fontWeight: "700", marginTop: "6px" },
    bullet: { display: "flex", gap: "8px", marginBottom: "1px", textAlign: "justify" },
    bulletDot: { marginTop: "6px", width: "4px", height: "4px", borderRadius: "50%", background: "#333", flexShrink: 0 }
  };

  const SectionHead = ({ title }) => (
    <div style={styles.sectionHead}>
      <div style={styles.bottomLine}><h2 style={styles.sectionTitle}>{title}</h2></div>
    </div>
  );

  return (
    <div id="resume" style={styles.container}>
      <div style={styles.header}>
        <E value={data.name} onChange={(v) => u("name", v)} style={styles.name} />
        <div style={styles.contact}>
          <E value={data.phone} onChange={(v) => u("phone", v)} /> | <E value={data.location} onChange={(v) => u("location", v)} />
          <br />
          <E value={data.email} onChange={(v) => u("email", v)} /> | <E value={data.linkedin} onChange={(v) => u("linkedin", v)} />
        </div>
      </div>

      <SectionHead title={data.objectiveTitle}  />
      <E value={data.objective} onChange={(v) => u("objective", v)} block />

      <SectionHead title={data.skillsTitle} />
      {data.skills.map((s, i) => <div key={i} style={{marginBottom: "6px"}}><E value={s} onChange={()=>{}} /></div>)}

      <SectionHead title={data.experienceTitle} />
      {data.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: "8px" }}>
          <div style={styles.itemTitle}>
            <span>{exp.company}</span>
            <span>{exp.period}</span>
          </div>
          <div style={{ fontStyle: "italic", fontWeight: "600" }}>{exp.role}</div>
          {exp.bullets?.map((b, bi) => (
            <div key={bi} style={styles.bullet}>
              <div style={styles.bulletDot} />
              <E value={b} onChange={() => {}} style={{ flex: 1 }} />
            </div>
          ))}
        </div>
      ))}

      <SectionHead title={data.projectsTitle} />
      {data.projects.map((p, i) => (
        <div key={i} style={{ marginBottom: "8px" }}>
          <div style={{ fontWeight: "700" }}>{p.title}</div>
          <E value={p.description} onChange={() => {}} block />
        </div>
      ))}

      <SectionHead title={data.educationTitle} />
      {data.education.map((edu, i) => (
        <div key={i} style={{ marginBottom: "6px" }}>
          <div style={styles.itemTitle}>
            <span>{edu.school}</span>
            <span>{edu.year}</span>
          </div>
          <div style={{ fontStyle: "italic" }}>{edu.degree}</div>
        </div>
      ))}

      <SectionHead title={data.certificationsTitle} />
      {data.certifications.map((c, i) => (
        <div key={i} style={styles.bullet}>
          <div style={styles.bulletDot} />
          <E value={c} onChange={() => {}} />
        </div>
      ))}
    </div>
  );
};

export default SoftwareEnnV2;
 