import React, { useState, useRef } from "react";
import { Camera } from "lucide-react";

const EditableSpan = ({ value, onChange, style = {}, block = false }) => {
  const Tag = block ? "div" : "span";
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.innerText)}
      style={{
        outline: "none",
        cursor: "text",
        minWidth: "20px",
        display: block ? "block" : "inline",
        whiteSpace: block ? "pre-wrap" : "normal",
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

const E = (p) => <EditableSpan {...p} />;

const PTemplates6 = ({ data: propData, setData: setPropData }) => {
  const [data, setDataState] = useState(() => ({
    name: "First Name",
    phone: "+91 7567895678",
    location: "city, state",
    email: "example@gmail.com",
    linkedin: "linkedin.com",
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
        title: "Paytm (Payment Application)",
        description: "Worked on a complete project including Finance, Accounts, and HR modules.",
      },
      {
        title: "Transport Management Systems",
        description: "Developed a web-based platform for vehicle tracking and automated invoice generation.",
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

  const u = (field, value) => {
    const newData = { ...dataRef.current, [field]: value };
    setDataState(newData);
    dataRef.current = newData;
    if (setPropData) setPropData(newData);
  };

  // ✅ Experience update
  const updateExp = (index, field, value) => {
    const updated = dataRef.current.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    u("experience", updated);
  };

  // ✅ Bullet update
  const updateBullet = (expIndex, bulletIndex, value) => {
    const updated = dataRef.current.experience.map((exp, i) => {
      if (i !== expIndex) return exp;
      const newBullets = exp.bullets.map((b, bi) => (bi === bulletIndex ? value : b));
      return { ...exp, bullets: newBullets };
    });
    u("experience", updated);
  };

  // ✅ Education update
  const updateEdu = (index, field, value) => {
    const updated = dataRef.current.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    u("education", updated);
  };

  // ✅ Projects update
  const updateProject = (index, field, value) => {
    const updated = dataRef.current.projects.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    u("projects", updated);
  };

  // ✅ Skills update
  const updateSkill = (index, value) => {
    const updated = dataRef.current.skills.map((s, i) => (i === index ? value : s));
    u("skills", updated);
  };

  // ✅ Certifications update
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
      padding: "15mm",
      background: "#fff",
      fontFamily: "'Arial', sans-serif",
      fontSize: "11px",
      color: "#333",
      lineHeight: "1.5",
      margin: "auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      borderBottom: "2px solid #333",
      paddingBottom: "10px"
    },
    photoContainer: {
      width: "90px",
      height: "110px",
      border: "1px solid #ccc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor: "#f0f0f0",
      cursor: "pointer",
      flexShrink: 0,
    },
    sectionTitle: {
      fontWeight: "bold",
      fontSize: "12px",
      borderBottom: "1px solid #333",
      marginTop: "15px",
      marginBottom: "5px",
      textTransform: "uppercase",
      paddingBottom:"6px"
      
    },
    itemHeader: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: "bold",
      marginTop: "8px",
      
    },
    bullet: {
      display: "flex",
      gap: "8px",
      marginLeft: "10px",
      marginBottom: "2px"
    },
    bulletDot: {
      marginTop: "6px",
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      background: "#333",
      flexShrink: 0
    }
  };

  return (
    <div id="resume" style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ flex: 1 }}>
          <E value={data.name} onChange={(v) => u("name", v)} style={{ fontSize: "24px", fontWeight: "bold" }} />
          <div>
            <E value={data.location} onChange={(v) => u("location", v)} /> |
            <E value={data.phone} onChange={(v) => u("phone", v)} />
          </div>
          <div>
            <E value={data.email} onChange={(v) => u("email", v)} /> |
            <E value={data.linkedin} onChange={(v) => u("linkedin", v)} />
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

      {/* ✅ Objective - heading + content editable */}
      <div style={styles.sectionTitle}>
        <E value={data.objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
      </div>
      <E value={data.objective} onChange={(v) => u("objective", v)} block />

      {/* ✅ Experience - heading + all fields editable */}
      <div style={styles.sectionTitle}>
        <E value={data.experienceTitle} onChange={(v) => u("experienceTitle", v)} />
      </div>
      {data.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <div style={styles.itemHeader}>
            <E value={exp.company} onChange={(v) => updateExp(i, "company", v)} />
            <E value={exp.period} onChange={(v) => updateExp(i, "period", v)} />
          </div>
          <E value={exp.role} onChange={(v) => updateExp(i, "role", v)} style={{ fontStyle: "italic", display: "block" }} />
          {exp.bullets.map((b, bi) => (
            <div key={bi} style={styles.bullet}>
              <div style={styles.bulletDot} />
              <E value={b} onChange={(v) => updateBullet(i, bi, v)} block style={{ flex: 1 }} />
            </div>
          ))}
        </div>
      ))}

      {/* ✅ Projects - heading + title + description editable */}
      <div style={styles.sectionTitle}>
        <E value={data.projectsTitle} onChange={(v) => u("projectsTitle", v)} />
      </div>
      {data.projects.map((p, i) => (
        <div key={i} style={{ marginBottom: "8px" }}>
          <E value={p.title} onChange={(v) => updateProject(i, "title", v)} style={{ fontWeight: "bold", display: "block" }} />
          <E value={p.description} onChange={(v) => updateProject(i, "description", v)} block />
        </div>
      ))}

      {/* ✅ Education - heading + school + year + degree editable */}
      <div style={styles.sectionTitle}>
        <E value={data.educationTitle} onChange={(v) => u("educationTitle", v)} />
      </div>
      {data.education.map((edu, i) => (
        <div key={i} style={{ marginBottom: "6px" }}>
          <div style={styles.itemHeader}>
            <E value={edu.school} onChange={(v) => updateEdu(i, "school", v)} />
            <E value={edu.year} onChange={(v) => updateEdu(i, "year", v)} />
          </div>
          <E value={edu.degree} onChange={(v) => updateEdu(i, "degree", v)} style={{ display: "block" }} />
        </div>
      ))}

      {/* ✅ Skills - heading + each skill editable */}
      <div style={styles.sectionTitle}>
        <E value={data.skillsTitle} onChange={(v) => u("skillsTitle", v)} />
      </div>
      {data.skills.map((s, i) => (
        <div key={i}>
          <E value={s} onChange={(v) => updateSkill(i, v)} block />
        </div>
      ))}

      {/* ✅ Certifications - heading + each cert editable */}
      <div style={styles.sectionTitle}>
        <E value={data.certificationsTitle} onChange={(v) => u("certificationsTitle", v)} />
      </div>
      {data.certifications.map((c, i) => (
        <div key={i} style={styles.bullet}>
          <div style={styles.bulletDot} />
          <E value={c} onChange={(v) => updateCert(i, v)} block style={{ flex: 1 }} />
        </div>
      ))}
    </div>
  );
};

export default PTemplates6;