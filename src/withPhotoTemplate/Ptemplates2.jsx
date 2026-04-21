import React, { useState, useRef } from "react";
import { Camera, MapPin, Phone, Mail, Link as LinkIcon } from "lucide-react";
import EditableSpan from "../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

const PTemplate2 = ({ data: propData, setData: setPropData }) => {
  // 1. Exact same data structure as Template 1
  const [data, setDataState] = useState(() => ({
    name: "First Name",
    title: "Full Stack Developer", // Added for the modern look
    phone: "+91 7567895678",
    location: "City, State",
    email: "example@gmail.com",
    linkedin: "linkedin.com",
    profileImage: null,
    objectiveTitle: "OBJECTIVE",
    objective: "Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications.",
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
          "Developed and optimized REST APIs for smooth data flow across the system."
        ]
      }
    ],
    educationTitle: "EDUCATION",
    education: [
      { degree: "BTECH", school: "IIT Kanpur", year: "2024-2027" },
      { degree: "Intermediate", school: "Delhi Public School", year: "2019-2021" }
    ],
    projectsTitle: "PROJECTS",
    projects: [
      {
        title: "Paytm (Payment Application)",
        description: "Worked on a complete project including Finance, Accounts, and HR modules.",
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

  // 2. Centralized Logic
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

  // 3. Modern Design Styles
  const primary = "#1e293b"; 
  const accent = "#3b82f6";
  const secondary = "#475569";
  const border = "#e2e8f0";

  const styles = {
    container: {
      width: "210mm",
      minHeight: "297mm",
      backgroundColor: "#fff",
      color: primary,
      margin: "0 auto",
      fontFamily: "'Inter', sans-serif",
      boxShadow: "0 0 20px rgba(0,0,0,0.05)"
    },
    header: {
      display: "flex",
      backgroundColor: primary,
      color: "#fff",
      padding: "40px",
      alignItems: "center",
      justifyContent: "space-between"
    },
    photoContainer: {
      width: "110px",
      height: "110px",
      borderRadius: "50%",
      border: "3px solid #fff",
      overflow: "hidden",
      backgroundColor: "#f0f0f0",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
    },
    sectionTitle: {
      fontSize: "13px",
      fontWeight: "700",
      textTransform: "uppercase",
      color: accent,
      letterSpacing: "1px",
      borderBottom: `2px solid ${border}`,
      marginBottom: "10px",
      paddingBottom: "4px",
      marginTop: "20px"
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "11px",
      opacity: 0.9
    }
  };

  return (
    <div id="resume" style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={{ flex: 1 }}>
          <E value={data.name} onChange={(v) => u("name", v)} style={{ fontSize: "32px", fontWeight: "800", display: "block" }} />
          <E value={data.title} onChange={(v) => u("title", v)} style={{ fontSize: "16px", color: accent, fontWeight: "500", marginTop: "4px" }} />
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "20px" }}>
            <div style={styles.contactItem}><MapPin size={12}/> <E value={data.location} onChange={(v) => u("location", v)} /></div>
            <div style={styles.contactItem}><Phone size={12}/> <E value={data.phone} onChange={(v) => u("phone", v)} /></div>
            <div style={styles.contactItem}><Mail size={12}/> <E value={data.email} onChange={(v) => u("email", v)} /></div>
            <div style={styles.contactItem}><LinkIcon size={12}/> <E value={data.linkedin} onChange={(v) => u("linkedin", v)} /></div>
          </div>
        </div>

        <label style={styles.photoContainer}>
          {data.profileImage ? (
            <img src={data.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <Camera size={30} color="#999" />
          )}
          <input type="file" hidden onChange={handleImageChange} accept="image/*" />
        </label>
      </div>

      <div style={{ padding: "20px 40px" }}>
        {/* Objective */}
        <section>
          <div style={styles.sectionTitle}><E value={data.objectiveTitle} onChange={(v) => u("objectiveTitle", v)} /></div>
          <E value={data.objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "11px", lineHeight: "1.6", color: secondary }} />
        </section>

        {/* Experience */}
        <section>
          <div style={styles.sectionTitle}><E value={data.experienceTitle} onChange={(v) => u("experienceTitle", v)} /></div>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", fontSize: "12px" }}>
                <E value={exp.company} onChange={(v) => updateExp(i, "company", v)} />
                <E value={exp.period} onChange={(v) => updateExp(i, "period", v)} style={{ color: secondary }} />
              </div>
              <E value={exp.role} onChange={(v) => updateExp(i, "role", v)} style={{ fontSize: "11px", fontWeight: "600", color: accent, display: "block", fontStyle: "italic" }} />
              <ul style={{ paddingLeft: "18px", marginTop: "5px" }}>
                {exp.bullets.map((b, bi) => (
                  <li key={bi} style={{ fontSize: "11px", color: secondary, marginBottom: "2px" }}>
                    <E value={b} onChange={(v) => updateBullet(i, bi, v)} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section>
          <div style={styles.sectionTitle}><E value={data.projectsTitle} onChange={(v) => u("projectsTitle", v)} /></div>
          {data.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <E value={proj.title} onChange={(v) => updateProject(i, "title", v)} style={{ fontSize: "12px", fontWeight: "700", display: "block" }} />
              <E value={proj.description} onChange={(v) => updateProject(i, "description", v)} block style={{ fontSize: "11px", color: secondary }} />
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <div style={styles.sectionTitle}><E value={data.educationTitle} onChange={(v) => u("educationTitle", v)} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {data.education.map((edu, i) => (
              <div key={i}>
                <E value={edu.degree} onChange={(v) => updateEdu(i, "degree", v)} block style={{ fontWeight: "700", fontSize: "11px" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: secondary }}>
                  <E value={edu.school} onChange={(v) => updateEdu(i, "school", v)} />
                  <E value={edu.year} onChange={(v) => updateEdu(i, "year", v)} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills - Modern Pill Layout */}
        <section>
          <div style={styles.sectionTitle}><E value={data.skillsTitle} onChange={(v) => u("skillsTitle", v)} /></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {data.skills.map((skillRow, i) => (
              <div key={i} style={{ width: "100%" }}>
                 <E value={skillRow} onChange={(v) => updateSkill(i, v)} block style={{ fontSize: "11px", color: secondary, marginBottom: "5px" }} />
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <div style={styles.sectionTitle}><E value={data.certificationsTitle} onChange={(v) => u("certificationsTitle", v)} /></div>
          {data.certifications.map((cert, i) => (
            <div key={i} style={{ fontSize: "11px", color: secondary, display: "flex", gap: "8px", alignItems: "start" }}>
              <span>•</span>
              <E value={cert} onChange={(v) => updateCert(i, v)} block />
            </div>
          ))}
        </section>

      </div>
    </div>
  );
};

export default PTemplate2;