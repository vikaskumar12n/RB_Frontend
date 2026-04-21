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

const Withphototemplate = ({ data: propData, setData: setPropData }) => {
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
      padding: "12mm 15mm",
      background: "#fff",
      fontFamily: "'Georgia', serif",
      fontSize: "10.5px",
      color: "#1a1a1a",
      lineHeight: "1.4",
      margin: "auto",
       paddingBottom: "12px"
    },
    headerContainer: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      marginBottom: "20px",
      borderBottom: "2px solid #1a1a1a",
      paddingBottom: "15px"
    },
    photoBox: {
      width: "100px",
      height: "100px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
      backgroundColor: "#f9f9f9",
      flexShrink: 0,
      cursor: "pointer",
    },
    photoInput: {
      position: "absolute",
      inset: 0,
      opacity: 0,
      cursor: "pointer",
    },
    headerInfo: { flex: 1 },
    name: { fontSize: "24px", fontWeight: "700", letterSpacing: "1px" },
    contact: { fontSize: "10px", marginTop: "5px", color: "#444" },
    sectionHead: { marginTop: "14px", marginBottom: "8px" },
    bottomLine: { borderBottom: "1.5px solid #1a1a1a", marginTop: "4px", paddingBottom:"6px" },
    sectionTitle: {
      fontSize: "11px",
      fontWeight: "800",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      paddingBottom: "10px"
    },
    itemTitle: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: "700",
      marginTop: "6px",
      paddingBottom: "20px"
    },
    bullet: { display: "flex", gap: "8px", marginBottom: "1px" },
    bulletDot: {
      marginTop: "6px",
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      background: "#333",
      flexShrink: 0     
    }
  };

  // ✅ SectionHead - ab editable hai
  const SectionHead = ({ titleKey }) => (
    <div style={styles.sectionHead}>
      <div style={styles.bottomLine}>
        <E
          value={data[titleKey]}
          onChange={(v) => u(titleKey, v)}
          style={styles.sectionTitle}
        />
      </div>
    </div>
  );

  return (
    <div id="resume" style={styles.container}>
      {/* Header */}
      <div style={styles.headerContainer}>
        <div style={styles.photoBox}>
          {data.profileImage ? (
            <img src={data.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <Camera size={24} color="#ccc" />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} style={styles.photoInput} />
        </div>
        <div style={styles.headerInfo}>
          <E value={data.name} onChange={(v) => u("name", v)} style={styles.name} />
          <div style={styles.contact}>
            <E value={data.phone} onChange={(v) => u("phone", v)} /> |{" "}
            <E value={data.location} onChange={(v) => u("location", v)} />
            <br />
            <E value={data.email} onChange={(v) => u("email", v)} /> |{" "}
            <E value={data.linkedin} onChange={(v) => u("linkedin", v)} />
          </div>
        </div>
      </div>

      {/* ✅ Objective */}
      <SectionHead titleKey="objectiveTitle"/>
      <E value={data.objective} onChange={(v) => u("objective", v)} block />

      {/* ✅ Skills */}
      <SectionHead titleKey="skillsTitle" />
      {data.skills.map((s, i) => (
        <div key={i} style={{ marginBottom: "4px" }}>
          <E value={s} onChange={(v) => updateSkill(i, v)} block />
        </div>
      ))}

      {/* ✅ Experience */}
      <SectionHead titleKey="experienceTitle" />
      {data.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: "8px" }}>
          <div style={styles.itemTitle}>
            <E value={exp.company} onChange={(v) => updateExp(i, "company", v)} />
            <E value={exp.period} onChange={(v) => updateExp(i, "period", v)} />
          </div>
          <E
            value={exp.role}
            onChange={(v) => updateExp(i, "role", v)}
            style={{ fontStyle: "italic", fontWeight: "600", display: "block" }}
          />
          {exp.bullets?.map((b, bi) => (
            <div key={bi} style={styles.bullet}>
              <div style={styles.bulletDot} />
              <E value={b} onChange={(v) => updateBullet(i, bi, v)} block style={{ flex: 1 }} />
            </div>
          ))}
        </div>
      ))}

      {/* ✅ Projects */}
      <SectionHead titleKey="projectsTitle" />
      {data.projects.map((p, i) => (
        <div key={i} style={{ marginBottom: "8px" }}>
          <E value={p.title} onChange={(v) => updateProject(i, "title", v)} style={{ fontWeight: "700", display: "block" }} />
          <E value={p.description} onChange={(v) => updateProject(i, "description", v)} block />
        </div>
      ))}

      {/* ✅ Education */}
      <SectionHead titleKey="educationTitle" />
      {data.education.map((edu, i) => (
        <div key={i} style={{ marginBottom: "6px" }}>
          <div style={styles.itemTitle}>
            <E value={edu.school} onChange={(v) => updateEdu(i, "school", v)} />
            <E value={edu.year} onChange={(v) => updateEdu(i, "year", v)} />
          </div>
          <E value={edu.degree} onChange={(v) => updateEdu(i, "degree", v)} style={{ fontStyle: "italic", display: "block" }} />
        </div>
      ))}

      {/* ✅ Certifications */}
      <SectionHead titleKey="certificationsTitle" />
      {data.certifications.map((c, i) => (
        <div key={i} style={styles.bullet}>
          <div style={styles.bulletDot} />
          <E value={c} onChange={(v) => updateCert(i, v)} block style={{ flex: 1 }} />
        </div>
      ))}
    </div>
  );
};

export default Withphototemplate;