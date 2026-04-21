import React, { useState, useRef } from "react";
import EditableSpan from "../component/page/Editablespan";
import { Camera } from "lucide-react";

const E = (p) => <EditableSpan {...p} />;

const Ptemplates4 = ({ data: propData, setData: setPropData }) => {
  // 1. Unified Data Structure
  const [data, setDataState] = useState(() => ({
    name: "FIRST LAST",
    phone: "+1-234-456-789",
    location: "Bay Area, California",
    email: "professionalemail@resumeworded.com",
    linkedin: "linkedin.com/in/username",
    profileImage: null,

    objectiveTitle: "OBJECTIVE",
    objective: "Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications. Proficient in front-end and back-end technologies.",

    experienceTitle: "PROFESSIONAL EXPERIENCE",
    experience: [
      {
        company: "XYZ Solutions Pvt. Ltd.",
        role: "Front End Developer, React",
        period: "2018-Present",
        bullets: [
          "Contributed to the development of a full-scale CRM project.",
          "Improved system performance through efficient backend logic.",
          "Collaborated with the team to ensure seamless integration."
        ]
      }
    ],

    skillsTitle: "SKILLS",
    skills: [
      "HTML, CSS, JavaScript, React",
      "Node.js, Express, MongoDB, SQL"
    ],

    educationTitle: "EDUCATION",
    education: [
      { 
        degree: "Bachelor of Engineering, IT",
        school: "Millennium Group of Institutions",
        year: "2013"
      }
    ],

    projectsTitle: "PROJECTS",
    projects: [
      {
        title: "Project Name",
        description: "A brief description of your impact and the technologies used."
      }
    ],

    certificationsTitle: "CERTIFICATIONS",
    certifications: [
      "Certified Web Developer - 2023"
    ],
    ...(propData || {}),
  }));

  const dataRef = useRef(data);

  // 2. Centralized Update Functions
  const u = (field, value) => {
    const newData = { ...dataRef.current, [field]: value };
    setDataState(newData);
    dataRef.current = newData;
    if (setPropData) setPropData(newData);
  };

  const updateExp = (index, field, value) => {
    const updated = dataRef.current.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    u("experience", updated);
  };

  const updateBullet = (expIndex, bulletIndex, value) => {
    const updated = dataRef.current.experience.map((exp, i) => {
      if (i !== expIndex) return exp;
      const newBullets = exp.bullets.map((b, bi) => (bi === bulletIndex ? value : b));
      return { ...exp, bullets: newBullets };
    });
    u("experience", updated);
  };

  const updateEdu = (index, field, value) => {
    const updated = dataRef.current.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    u("education", updated);
  };

  const updateProject = (index, field, value) => {
    const updated = dataRef.current.projects.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    u("projects", updated);
  };

  const updateSkill = (index, value) => {
    const updated = dataRef.current.skills.map((s, i) => (i === index ? value : s));
    u("skills", updated);
  };

  const updateCert = (index, value) => {
    const updated = dataRef.current.certifications.map((c, i) => (i === index ? value : c));
    u("certifications", updated);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) u("profileImage", URL.createObjectURL(file));
  };

  const styles = {
    container: {
      width: "210mm",
      minHeight: "297mm",
      padding: "15mm 20mm",
      background: "#fff",
      fontFamily: "'Times New Roman', Times, serif",
      fontSize: "11pt",
      color: "#000",
      lineHeight: "1.4",
      margin: "auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      borderBottom: "2px solid #000",
      paddingBottom: "15px",
      marginBottom: "20px"
    },
    photoBox: {
      width: "100px",
      height: "120px",
      border: "1px solid #000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      overflow: "hidden"
    },
    sectionTitle: {
      fontWeight: "bold",
      fontSize: "12pt",
      textTransform: "uppercase",
      borderBottom: "1px solid #000",
      marginTop: "15px",
      marginBottom: "8px",
      letterSpacing: "0.5px",
      paddingBottom:"6px"

    },
    contactInfo: {
      fontSize: "10pt",
      marginTop: "5px",
      display: "flex",
      flexDirection: "column"
    }
  };

  return (
    <div id="resume" style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={{ flex: 1 }}>
          <E value={data.name} onChange={(v) => u("name", v)} style={{ fontSize: "26pt", fontWeight: "bold", display: "block" }} />
          <div style={styles.contactInfo}>
            <div style={{display: 'flex', gap: '5px'}}>
               <E value={data.location} onChange={(v) => u("location", v)} /> | 
               <E value={data.phone} onChange={(v) => u("phone", v)} />
            </div>
            <E value={data.email} onChange={(v) => u("email", v)} />
            <E value={data.linkedin} onChange={(v) => u("linkedin", v)} />
          </div>
        </div>

        <label style={styles.photoBox}>
          {data.profileImage ? (
            <img src={data.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <Camera size={24} color="#000" />
          )}
          <input type="file" hidden onChange={handleImageChange} accept="image/*" />
        </label>
      </div>

      {/* Objective */}
      <div style={styles.sectionTitle}><E value={data.objectiveTitle} onChange={(v) => u("objectiveTitle", v)} /></div>
      <E value={data.objective} onChange={(v) => u("objective", v)} block style={{ textAlign: "justify" }} />

      {/* Experience */}
      <div style={styles.sectionTitle}><E value={data.experienceTitle} onChange={(v) => u("experienceTitle", v)} /></div>
      {data.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
            <E value={exp.company} onChange={(v) => updateExp(i, "company", v)} />
            <E value={exp.period} onChange={(v) => updateExp(i, "period", v)} />
          </div>
          <div style={{ fontStyle: "italic", fontWeight: "600" }}>
            <E value={exp.role} onChange={(v) => updateExp(i, "role", v)} />
          </div>
          {exp.bullets.map((b, bi) => (
            <div key={bi} style={{ display: "flex", gap: "10px", marginLeft: "15px" }}>
              <span>•</span>
              <E value={b} onChange={(v) => updateBullet(i, bi, v)} style={{ flex: 1 }} />
            </div>
          ))}
        </div>
      ))}

      {/* Projects */}
      <div style={styles.sectionTitle}><E value={data.projectsTitle} onChange={(v) => u("projectsTitle", v)} /></div>
      {data.projects.map((p, i) => (
        <div key={i} style={{ marginBottom: "8px" }}>
          <E value={p.title} onChange={(v) => updateProject(i, "title", v)} style={{ fontWeight: "bold", display: "block" }} />
          <E value={p.description} onChange={(v) => updateProject(i, "description", v)} block style={{ textAlign: "justify", fontSize: "10.5pt" }} />
        </div>
      ))}

      {/* Skills */}
      <div style={styles.sectionTitle}><E value={data.skillsTitle} onChange={(v) => u("skillsTitle", v)} /></div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {data.skills.map((s, i) => (
          <div key={i}><E value={s} onChange={(v) => updateSkill(i, v)} /></div>
        ))}
      </div>

      {/* Education */}
      <div style={styles.sectionTitle}><E value={data.educationTitle} onChange={(v) => u("educationTitle", v)} /></div>
      {data.education.map((edu, i) => (
        <div key={i} style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
            <E value={edu.school} onChange={(v) => updateEdu(i, "school", v)} />
            <E value={edu.year} onChange={(v) => updateEdu(i, "year", v)} />
          </div>
          <E value={edu.degree} onChange={(v) => updateEdu(i, "degree", v)} />
        </div>
      ))}

      {/* Certifications */}
      <div style={styles.sectionTitle}><E value={data.certificationsTitle} onChange={(v) => u("certificationsTitle", v)} /></div>
      {data.certifications.map((c, i) => (
        <div key={i} style={{ marginBottom: "2px" }}>
          • <E value={c} onChange={(v) => updateCert(i, v)} />
        </div>
      ))}
    </div>
  );
};

export default Ptemplates4;