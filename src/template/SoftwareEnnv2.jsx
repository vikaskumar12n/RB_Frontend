import React, { useState, useRef } from "react";
import EditableSpan from "../component/page/Editablespan";
import { Plus, Trash2, Copy } from "lucide-react";

// Inject print styles once
const PRINT_STYLE = `
  @media print {
    .no-print { display: none !important; }
    .resume-bullet-row { align-items: flex-start !important; }
    body { margin: 0; }
    @page { size: A4; margin: 15mm; }
  }
  @media screen {
    .edit-controls { opacity: 0; transition: opacity 0.15s; }
    .hoverable-row:hover .edit-controls { opacity: 1; }
  }
`;

const StyleInjector = () => {
  if (typeof document !== "undefined" && !document.getElementById("resume-print-style")) {
    const style = document.createElement("style");
    style.id = "resume-print-style";
    style.innerHTML = PRINT_STYLE;
    document.head.appendChild(style);
  }
  return null;
};

const E = (p) => <EditableSpan {...p} />;

const IconBtn = ({ onClick, color = "#6366f1", title, children, style = {} }) => (
  <button
    className="no-print edit-controls"
    onClick={onClick}
    title={title}
    style={{
      background: color, color: "#fff", border: "none", borderRadius: "3px",
      padding: "2px 5px", fontSize: "9px", cursor: "pointer",
      display: "inline-flex", alignItems: "center", gap: "2px",
      flexShrink: 0, lineHeight: 1.2, ...style,
    }}
  >
    {children}
  </button>
);

const SoftwareEnnV2 = ({ data: propData, setData: setPropData }) => {
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
          "Developed and optimized REST APIs for smooth data flow.",
          "Worked on MongoDB database structures and data handling.",
          "Improved system performance through efficient backend logic.",
          "Collaborated with the team to deliver real-world business features."
        ]
      },
      {
        role: "Software Developer",
        company: "IBM",
        period: "April 2025-August-2025",
        bullets: [
          "Developing full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
          "Responsible for building scalable APIs and ensuring responsive Design."
        ]
      },
      {
        role: "Software Developer",
        company: "Tech Mahindra",
        period: "April 2024 - April 2025",
        bullets: [
          "Committed to continuous learning and staying updated with latest technologies.",
          "Applied problem-solving abilities to overcome challenges.",
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

  const setDataFunc = (d) => { setDataState(d); dataRef.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setDataFunc({ ...dataRef.current, [f]: v });

  // ========== EXPERIENCE FUNCTIONS ==========
  const addExperience = () => {
    u("experience", [...dataRef.current.experience, { role: "New Role", company: "New Company", period: "Date", bullets: ["New bullet point"] }]);
  };
  const removeExperience = (i) => u("experience", dataRef.current.experience.filter((_, idx) => idx !== i));
  const copyExperience = (i) => {
    const expToCopy = JSON.parse(JSON.stringify(dataRef.current.experience[i]));
    expToCopy.company = expToCopy.company + " (Copy)";
    u("experience", [...dataRef.current.experience, expToCopy]);
  };

  // ========== BULLET FUNCTIONS ==========
  const addBullet = (ei) => {
    const updated = dataRef.current.experience.map((exp, i) => i === ei ? { ...exp, bullets: [...exp.bullets, "New bullet point"] } : exp);
    u("experience", updated);
  };
  const removeBullet = (ei, bi) => {
    const updated = dataRef.current.experience.map((exp, i) => i === ei ? { ...exp, bullets: exp.bullets.filter((_, idx) => idx !== bi) } : exp);
    u("experience", updated);
  };
  const copyBullet = (ei, bi) => {
    const updated = dataRef.current.experience.map((exp, i) => i === ei ? { ...exp, bullets: [...exp.bullets, exp.bullets[bi] + " (Copy)"] } : exp);
    u("experience", updated);
  };

  // ========== PROJECTS FUNCTIONS ==========
  const addProject = () => u("projects", [...dataRef.current.projects, { title: "New Project", description: "Project description" }]);
  const removeProject = (i) => u("projects", dataRef.current.projects.filter((_, idx) => idx !== i));
  const copyProject = (i) => {
    const projToCopy = JSON.parse(JSON.stringify(dataRef.current.projects[i]));
    projToCopy.title = projToCopy.title + " (Copy)";
    u("projects", [...dataRef.current.projects, projToCopy]);
  };

  // ========== EDUCATION FUNCTIONS ==========
  const addEducation = () => u("education", [...dataRef.current.education, { degree: "New Degree", school: "New School", year: "Year" }]);
  const removeEducation = (i) => u("education", dataRef.current.education.filter((_, idx) => idx !== i));
  const copyEducation = (i) => {
    const eduToCopy = JSON.parse(JSON.stringify(dataRef.current.education[i]));
    eduToCopy.school = eduToCopy.school + " (Copy)";
    u("education", [...dataRef.current.education, eduToCopy]);
  };

  // ========== SKILLS FUNCTIONS ==========
  const addSkill = () => u("skills", [...dataRef.current.skills, "New skill"]);
  const removeSkill = (i) => u("skills", dataRef.current.skills.filter((_, idx) => idx !== i));
  const copySkill = (i) => u("skills", [...dataRef.current.skills, dataRef.current.skills[i] + " (Copy)"]);

  // ========== CERTIFICATIONS FUNCTIONS ==========
  const addCertification = () => u("certifications", [...dataRef.current.certifications, "New certification"]);
  const removeCertification = (i) => u("certifications", dataRef.current.certifications.filter((_, idx) => idx !== i));
  const copyCertification = (i) => u("certifications", [...dataRef.current.certifications, dataRef.current.certifications[i] + " (Copy)"]);

  // ========== UPDATE FUNCTIONS ==========
  const updateExp = (i, field, value) => {
    const updated = dataRef.current.experience.map((exp, idx) => idx === i ? { ...exp, [field]: value } : exp);
    u("experience", updated);
  };
  const updateBullet = (ei, bi, value) => {
    const updated = dataRef.current.experience.map((exp, i) => i === ei ? { ...exp, bullets: exp.bullets.map((b, idx) => idx === bi ? value : b) } : exp);
    u("experience", updated);
  };
  const updateProject = (i, field, value) => {
    const updated = dataRef.current.projects.map((proj, idx) => idx === i ? { ...proj, [field]: value } : proj);
    u("projects", updated);
  };
  const updateEdu = (i, field, value) => {
    const updated = dataRef.current.education.map((edu, idx) => idx === i ? { ...edu, [field]: value } : edu);
    u("education", updated);
  };
  const updateSkill = (i, value) => {
    const updated = dataRef.current.skills.map((s, idx) => idx === i ? value : s);
    u("skills", updated);
  };
  const updateCert = (i, value) => {
    const updated = dataRef.current.certifications.map((c, idx) => idx === i ? value : c);
    u("certifications", updated);
  };

  const SectionHead = ({ title, onAdd, showAdd = false }) => (
    <div style={{ marginTop: "14px", marginBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ borderBottom: "2px solid #1a1a1a", marginTop: "4px", flex: 1 }}>
          <h2 style={{ fontSize: "10px", fontWeight: "800", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "left", margin: 0, padding: "2px 0", paddingBottom: "6px" }}>
            {title}
          </h2>
        </div>
        {showAdd && onAdd && (
          <IconBtn onClick={onAdd} color="#6366f1" style={{ marginLeft: "10px" }}>
            <Plus size={9} /> Add
          </IconBtn>
        )}
      </div>
    </div>
  );

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
    itemTitle: { display: "flex", justifyContent: "space-between", fontWeight: "700", marginTop: "6px", flexWrap: "wrap", gap: 4 },
    bullet: { display: "flex", gap: "8px", marginBottom: "1px", textAlign: "justify", alignItems: "flex-start" },
    bulletDot: { marginTop: "10px", width: "4px", height: "4px", borderRadius: "50%", background: "#333", flexShrink: 0 }
  };

  const { name, phone, location, email, linkedin, objectiveTitle, objective, skillsTitle, skills, experienceTitle, experience, projectsTitle, projects, educationTitle, education, certificationsTitle, certifications } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <E value={name} onChange={(v) => u("name", v)} style={styles.name} />
          <div style={styles.contact}>
            <E value={phone} onChange={(v) => u("phone", v)} /> | <E value={location} onChange={(v) => u("location", v)} />
            <br />
            <E value={email} onChange={(v) => u("email", v)} /> | <E value={linkedin} onChange={(v) => u("linkedin", v)} />
          </div>
        </div>

        {/* OBJECTIVE */}
        <SectionHead title={<E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />} />
        <E value={objective} onChange={(v) => u("objective", v)} block />

        {/* SKILLS */}
        <SectionHead title={<E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />} showAdd={true} onAdd={addSkill} />
        {skills.map((s, i) => (
          <div key={i} className="hoverable-row" style={{ marginBottom: "6px", display: "flex", alignItems: "center", gap: 6 }}>
            <E value={s} onChange={(v) => updateSkill(i, v)} style={{ flex: 1 }} />
            <IconBtn onClick={() => copySkill(i)} color="#6366f1"><Copy size={8} /></IconBtn>
            <IconBtn onClick={() => removeSkill(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
          </div>
        ))}

        {/* EXPERIENCE */}
        <SectionHead title={<E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />} showAdd={true} onAdd={addExperience} />
        
        {experience.map((exp, ei) => (
          <div key={ei} className="hoverable-row" style={{ marginBottom: "12px", borderBottom: ei !== experience.length - 1 ? "1px dashed #ccc" : "none", paddingBottom: "10px" }}>
            <div style={styles.itemTitle}>
              <E value={exp.company} onChange={(v) => updateExp(ei, "company", v)} />
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <E value={exp.period} onChange={(v) => updateExp(ei, "period", v)} />
                <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
              </div>
            </div>
            <div style={{ fontStyle: "italic", fontWeight: "600", marginBottom: "4px" }}>
              <E value={exp.role} onChange={(v) => updateExp(ei, "role", v)} />
            </div>
            {exp.bullets.map((b, bi) => (
              <div key={bi} className="hoverable-row" style={styles.bullet}>
                <div style={styles.bulletDot} />
                <E value={b} onChange={(v) => updateBullet(ei, bi, v)} style={{ flex: 1 }} />
                <IconBtn onClick={() => copyBullet(ei, bi)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                <IconBtn onClick={() => removeBullet(ei, bi)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
              </div>
            ))}
            
          </div>
        ))}

        {/* PROJECTS */}
        <SectionHead title={<E value={projectsTitle} onChange={(v) => u("projectsTitle", v)} />} showAdd={true} onAdd={addProject} />
        
        {projects.map((proj, i) => (
          <div key={i} className="hoverable-row" style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
              <E value={proj.title} onChange={(v) => updateProject(i, "title", v)} style={{ fontWeight: "700", flex: 1 }} />
              <div style={{ display: "flex", gap: 3 }}>
                <IconBtn onClick={() => copyProject(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                <IconBtn onClick={() => removeProject(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
              </div>
            </div>
            <E value={proj.description} onChange={(v) => updateProject(i, "description", v)} block />
          </div>
        ))}

        {/* EDUCATION */}
        <SectionHead title={<E value={educationTitle} onChange={(v) => u("educationTitle", v)} />} showAdd={true} onAdd={addEducation} />
        
        {education.map((edu, i) => (
          <div key={i} className="hoverable-row" style={{ marginBottom: "6px" }}>
            <div style={styles.itemTitle}>
              <E value={edu.school} onChange={(v) => updateEdu(i, "school", v)} />
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <E value={edu.year} onChange={(v) => updateEdu(i, "year", v)} />
                <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
              </div>
            </div>
            <div style={{ fontStyle: "italic" }}>
              <E value={edu.degree} onChange={(v) => updateEdu(i, "degree", v)} />
            </div>
          </div>
        ))}

        {/* CERTIFICATIONS */}
        <SectionHead title={<E value={certificationsTitle} onChange={(v) => u("certificationsTitle", v)} />} showAdd={true} onAdd={addCertification} />
        
        {certifications.map((c, i) => (
          <div key={i} className="hoverable-row" style={styles.bullet}>
            <div style={styles.bulletDot} />
            <E value={c} onChange={(v) => updateCert(i, v)} style={{ flex: 1 }} />
            <IconBtn onClick={() => copyCertification(i)} color="#6366f1"><Copy size={8} /></IconBtn>
            <IconBtn onClick={() => removeCertification(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
          </div>
        ))}
      </div>
    </>
  );
};

export default SoftwareEnnV2;