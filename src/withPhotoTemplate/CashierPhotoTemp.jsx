import React, { useState, useRef } from "react";
import { Camera, MapPin, Phone, Mail, Link as LinkIcon, Briefcase, GraduationCap, Code, Award, Target, Folder } from "lucide-react";
import EditableSpan from "../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

const Cashierphoto = ({ data: propData, setData: setPropData }) => {
  // 1. Initial Data Structure (Exactly matches Template 1)
  const [data, setDataState] = useState(() => ({
    name: "First Name",
    title: "Full Stack Developer", // Modern title field
    phone: "+91 7567895678",
    location: "city, state",
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
          "Developed and optimized REST APIs for smooth data flow."
        ]
      },
      {
        role: "Software Developer",
        company: "IBM",
        period: "April 2025-Aug 2025",
        bullets: [
          "Developing full-stack web applications using MERN stack.",
          "Responsible for building scalable APIs and ensuring responsive design."
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
        title: "Paytm (Payment Application)",
        description: "Worked on a complete project including Finance, Accounts, and HR modules.",
      },
      {
        title: "HRMS (HR Management System)",
        description: "Built full-stack HRMS using React, Node, Express, and MongoDB.",
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

  // 2. Centralized Logic (Matches Template 1 logic)
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
  const accent = "#0284c7";
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
      padding: "40px",
      boxShadow: "0 0 20px rgba(0,0,0,0.05)"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "30px",
      borderBottom: `2px solid ${primary}`,
      paddingBottom: "20px"
    },
    photoContainer: {
      width: "100px",
      height: "100px",
      borderRadius: "12px",
      border: `1px solid ${border}`,
      overflow: "hidden",
      backgroundColor: "#f8fafc",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    },
    sectionTitleContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginTop: "20px",
      marginBottom: "12px"
    },
    sectionTitleText: {
      fontSize: "12px",
      fontWeight: "800",
      textTransform: "uppercase",
      color: primary,
      letterSpacing: "1px"
    },
    line: {
      flex: 1,
      height: "1px",
      backgroundColor: border
    }
  };

  return (
    <div id="resume" style={styles.container}>
      {/* ── HEADER ── */}
      <header style={styles.header}>
        <div style={{ flex: 1 }}>
          <E value={data.name} onChange={(v) => u("name", v)} block style={{ fontSize: "32px", fontWeight: "800", color: primary, letterSpacing: "-1px" }} />
          <E value={data.title} onChange={(v) => u("title", v)} block style={{ fontSize: "16px", color: accent, fontWeight: "600", marginTop: "4px" }} />
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "15px", fontSize: "10.5px", color: secondary }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={12}/> <E value={data.location} onChange={(v) => u("location", v)} /></span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Phone size={12}/> <E value={data.phone} onChange={(v) => u("phone", v)} /></span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Mail size={12}/> <E value={data.email} onChange={(v) => u("email", v)} /></span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", color: accent }}><LinkIcon size={12}/> <E value={data.linkedin} onChange={(v) => u("linkedin", v)} /></span>
          </div>
        </div>

        <label style={styles.photoContainer}>
          {data.profileImage ? (
            <img src={data.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ textAlign: "center", color: "#94a3b8" }}>
              <Camera size={24} />
              <div style={{ fontSize: "8px", marginTop: "4px" }}>PHOTO</div>
            </div>
          )}
          <input type="file" hidden onChange={handleImageChange} accept="image/*" />
        </label>
      </header>

      {/* ── OBJECTIVE ── */}
      <section>
        <div style={styles.sectionTitleContainer}>
          <Target size={14} color={accent}/>
          <div style={styles.sectionTitleText}><E value={data.objectiveTitle} onChange={(v) => u("objectiveTitle", v)} /></div>
          <div style={styles.line} />
        </div>
        <E value={data.objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "11px", lineHeight: "1.6", color: secondary }} />
      </section>

      {/* ── EXPERIENCE ── */}
      <section>
        <div style={styles.sectionTitleContainer}>
          <Briefcase size={14} color={accent}/>
          <div style={styles.sectionTitleText}><E value={data.experienceTitle} onChange={(v) => u("experienceTitle", v)} /></div>
          <div style={styles.line} />
        </div>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <E value={exp.company} onChange={(v) => updateExp(i, "company", v)} style={{ fontWeight: "700", fontSize: "13px" }} />
              <E value={exp.period} onChange={(v) => updateExp(i, "period", v)} style={{ fontSize: "10px", color: secondary, fontWeight: "600" }} />
            </div>
            <E value={exp.role} onChange={(v) => updateExp(i, "role", v)} style={{ fontSize: "11px", fontWeight: "600", color: accent, fontStyle: "italic" }} />
            <ul style={{ paddingLeft: "15px", marginTop: "5px", listStyleType: "circle" }}>
              {exp.bullets.map((b, bi) => (
                <li key={bi} style={{ fontSize: "10.5px", color: secondary, marginBottom: "3px" }}>
                  <E value={b} onChange={(v) => updateBullet(i, bi, v)} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* ── PROJECTS ── */}
      <section>
        <div style={styles.sectionTitleContainer}>
          <Folder size={14} color={accent}/>
          <div style={styles.sectionTitleText}><E value={data.projectsTitle} onChange={(v) => u("projectsTitle", v)} /></div>
          <div style={styles.line} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          {data.projects.map((p, i) => (
            <div key={i} style={{ backgroundColor: "#f8fafc", padding: "10px", borderRadius: "6px", border: "1px solid #f1f5f9" }}>
              <E value={p.title} onChange={(v) => updateProject(i, "title", v)} style={{ fontWeight: "700", fontSize: "11.5px", display: "block", color: primary }} />
              <E value={p.description} onChange={(v) => updateProject(i, "description", v)} block style={{ fontSize: "10px", color: secondary, marginTop: "4px" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section>
        <div style={styles.sectionTitleContainer}>
          <Code size={14} color={accent}/>
          <div style={styles.sectionTitleText}><E value={data.skillsTitle} onChange={(v) => u("skillsTitle", v)} /></div>
          <div style={styles.line} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {data.skills.map((s, i) => (
            <div key={i} style={{ fontSize: "10.5px", color: secondary, display: "flex", gap: "5px" }}>
              <span style={{ color: accent }}>•</span>
              <E value={s} onChange={(v) => updateSkill(i, v)} block />
            </div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section>
        <div style={styles.sectionTitleContainer}>
          <GraduationCap size={14} color={accent}/>
          <div style={styles.sectionTitleText}><E value={data.educationTitle} onChange={(v) => u("educationTitle", v)} /></div>
          <div style={styles.line} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {data.education.map((edu, i) => (
            <div key={i} style={{ borderLeft: `2px solid ${border}`, paddingLeft: "10px" }}>
              <E value={edu.degree} onChange={(v) => updateEdu(i, "degree", v)} block style={{ fontWeight: "700", fontSize: "11px" }} />
              <div style={{ fontSize: "10px", color: secondary }}>
                <E value={edu.school} onChange={(v) => updateEdu(i, "school", v)} /> | <E value={edu.year} onChange={(v) => updateEdu(i, "year", v)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section>
        <div style={styles.sectionTitleContainer}>
          <Award size={14} color={accent}/>
          <div style={styles.sectionTitleText}><E value={data.certificationsTitle} onChange={(v) => u("certificationsTitle", v)} /></div>
          <div style={styles.line} />
        </div>
        {data.certifications.map((c, i) => (
          <div key={i} style={{ fontSize: "10.5px", color: secondary, marginBottom: "4px", display: "flex", gap: "8px" }}>
            <span style={{ color: accent }}>★</span>
            <E value={c} onChange={(v) => updateCert(i, v)} block />
          </div>
        ))}
      </section>

    </div>
  );
};

export default Cashierphoto;