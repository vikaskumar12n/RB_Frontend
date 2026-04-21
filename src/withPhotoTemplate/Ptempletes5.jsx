import React, { useState, useRef } from "react";
import EditableSpan from "../component/page/Editablespan";
import { Camera, Mail, Phone, MapPin,   } from "lucide-react";

const E = (p) => <EditableSpan {...p} />;

const Ptemplates5 = ({ data: propData, setData: setPropData }) => {
  const [data, setDataState] = useState(() => ({
    name: "FIRST LAST", 
    location: "Bay Area, California", 
    phone: "+1-234-456-789", 
    email: "professionalemail@resumeworded.com", 
    linkedin: "linkedin.com/in/username", 
    profileImage: null,

    objectiveTitle: "OBJECTIVE", 
    objective: "Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications. Proficient in front-end and back-end technologies, including HTML, CSS, JavaScript, React, Node.js, and database systems like MongoDB and MySQL.", 

    experienceTitle: "PROFESSIONAL EXPERIENCE", 
    experience: [
      {
        company: "XYZ Solutions Pvt. Ltd.", 
        role: "Front End Developer, React", 
        period: "2018-Present", 
        bullets: [
          "Contributed to the development of a full-scale CRM (DSS) project. Built and integrated key modules like Finance, Accounts, and HR.", 
          "Improved system performance through efficient backend logic and clean architecture.", 
          "Collaborated with the team to deliver real-world business features and ensure seamless frontend-backend integration." 
        ]
      }
    ],

    projectsTitle: "PROJECTS", 
    projects: [
      {
        title: "CRM (Customer Relationship Management)", 
        description: "Worked on a complete CRM system that includes multiple business-critical modules: Finance, Accounts, and HR." 
      }
    ],

    educationTitle: "EDUCATION", 
    education: [
      { 
        degree: "Bachelor of Engineering, Information Technology", 
        school: "Millennium Group of Institutions", 
        year: "2013" 
      }
    ],

    skillsTitle: "SKILLS", 
    skills: ["HTML CSS JavaScript React", "Node.js Express MongoDB SQL"], 

    certificationsTitle: "CERTIFICATIONS", 
    certifications: ["Full Stack Web Development - Udemy React Developer Certification"],
    ...(propData || {}),
  }));

  const dataRef = useRef(data);
  const u = (field, value) => {
    const newData = { ...dataRef.current, [field]: value };
    setDataState(newData);
    dataRef.current = newData;
    if (setPropData) setPropData(newData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) u("profileImage", URL.createObjectURL(file));
  };

  const styles = {
    container: {
      width: "210mm",
      minHeight: "297mm",
      padding: "12mm 15mm",
      background: "#fff",
      fontFamily: "'Inter', sans-serif",
      fontSize: "10.5px",
      color: "#000",
      lineHeight: "1.5",
      margin: "auto",
    },
    headerWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1.5px solid #000",
      paddingBottom: "10px",
      marginBottom: "15px"
    },
    photoCircle: {
      width: "90px",
      height: "90px",
      borderRadius: "50%",
      border: "1px solid #000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative"
    },
    sectionHead: {
      fontWeight: "bold",
      fontSize: "11.5px",
      textTransform: "uppercase",
      marginTop: "12px",
      marginBottom: "4px",
      borderBottom: "1px solid #eee"
    },
    flexBetween: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: "bold",
      marginTop: "5px"
    },
    bullet: {
      display: "flex",
      gap: "8px",
      marginLeft: "12px",
      marginTop: "2px"
    }
  };

  return (
    <div id="resume" style={styles.container}>
      {/* Header */}
      <div style={styles.headerWrapper}>
        <div style={{ flex: 1 }}>
          <E value={data.name} onChange={(v) => u("name", v)} style={{ fontSize: "28px", fontWeight: "900", textTransform: "uppercase" }} />
          <div style={{ display: "flex", gap: "10px", marginTop: "5px", color: "#444" }}>
            <E value={data.phone} onChange={(v) => u("phone", v)} /> | 
            <E value={data.location} onChange={(v) => u("location", v)} />
          </div>
          <div style={{ color: "#444" }}>
            <E value={data.email} onChange={(v) => u("email", v)} /> | 
            <E value={data.email} onChange={(v) => u("linkedin", v)} />
          </div>
        </div>

        <label style={styles.photoCircle}>
          {data.profileImage ? (
            <img src={data.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <Camera size={24} color="#000" />
          )}
          <input type="file" hidden onChange={handleImageChange} accept="image/*" />
        </label>
      </div>

      {/* Objective */}
      <div style={styles.sectionHead}>{data.objectiveTitle}</div>
      <E value={data.objective} onChange={(v) => u("objective", v)} block style={{ textAlign: "justify" }} />

      {/* Experience */}
      <div style={styles.sectionHead}>{data.experienceTitle}</div>
      {data.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: "8px" }}>
          <div style={styles.flexBetween}>
            <span>{exp.company}</span>
            <span>{exp.period}</span>
          </div>
          <div style={{ fontStyle: "italic", fontWeight: "600" }}>{exp.role}</div>
          {exp.bullets.map((b, bi) => (
            <div key={bi} style={styles.bullet}>
              <span style={{ fontWeight: "bold" }}>•</span>
              <E value={b} onChange={() => {}} style={{ flex: 1 }} />
            </div>
          ))}
        </div>
      ))}

      {/* Projects */}
      <div style={styles.sectionHead}>{data.projectsTitle}</div>
      {data.projects.map((p, i) => (
        <div key={i} style={{ marginBottom: "5px" }}>
          <div style={{ fontWeight: "bold" }}>{p.title}</div>
          <E value={p.description} onChange={() => {}} block />
        </div>
      ))}

      {/* Education */}
      <div style={styles.sectionHead}>{data.educationTitle}</div>
      {data.education.map((edu, i) => (
        <div key={i}>
          <div style={styles.flexBetween}>
            <span>{edu.school}</span>
            <span>{edu.year}</span>
          </div>
          <div>{edu.degree}</div>
        </div>
      ))}

      {/* Skills */}
      <div style={styles.sectionHead}>{data.skillsTitle}</div>
      {data.skills.map((s, i) => (
        <div key={i}><E value={s} onChange={() => {}} /></div>
      ))}
    </div>
  );
};

export default Ptemplates5;