import React, { useState, useRef } from "react";
import EditableSpan from "../component/page/Editablespan";
import { Camera, Plus, Trash2, Copy } from "lucide-react";

// Inject print styles once
const PRINT_STYLE = `
  @media print {
    .no-print { display: none !important; }
    .resume-bullet-row { align-items: flex-start !important; }
    body { margin: 0; }
    @page {
      size: A4;
      margin: 15mm;
    }
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

// Floating icon button — hidden on print, fades in on hover
const IconBtn = ({ onClick, color = "#6366f1", title, children, style = {} }) => (
  <button
    className="no-print edit-controls"
    onClick={onClick}
    title={title}
    style={{
      background: color,
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "3px 7px",
      fontSize: "10px",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "3px",
      flexShrink: 0,
      lineHeight: 1.4,
      ...style,
    }}
  >
    {children}
  </button>
);

const Ptemplates4 = ({ data: propData, setData: setPropData }) => {
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

  const u = (field, value) => {
    const newData = { ...dataRef.current, [field]: value };
    setDataState(newData);
    dataRef.current = newData;
    if (setPropData) setPropData(newData);
  };

  // ========== EXPERIENCE FUNCTIONS ==========
  const addExperience = () => {
    u("experience", [...dataRef.current.experience, { company: "New Company", role: "New Role", period: "Date", bullets: ["New bullet point"] }]);
  };
  const removeExperience = (i) => u("experience", dataRef.current.experience.filter((_, idx) => idx !== i));
  const copyExperience = (i) => {
    const expToCopy = JSON.parse(JSON.stringify(dataRef.current.experience[i]));
    expToCopy.company = expToCopy.company + " (Copy)";
    u("experience", [...dataRef.current.experience, expToCopy]);
  };
  const updateExp = (i, field, value) => u("experience", dataRef.current.experience.map((e, idx) => idx === i ? { ...e, [field]: value } : e));

  // ========== BULLET FUNCTIONS ==========
  const addBullet = (ei) => u("experience", dataRef.current.experience.map((e, i) => i === ei ? { ...e, bullets: [...e.bullets, "New bullet point"] } : e));
  const removeBullet = (ei, bi) => u("experience", dataRef.current.experience.map((e, i) => i === ei ? { ...e, bullets: e.bullets.filter((_, idx) => idx !== bi) } : e));
  const copyBullet = (ei, bi) => u("experience", dataRef.current.experience.map((e, i) => i === ei ? { ...e, bullets: [...e.bullets, e.bullets[bi] + " (Copy)"] } : e));
  const updateBullet = (ei, bi, value) => u("experience", dataRef.current.experience.map((e, i) => i === ei ? { ...e, bullets: e.bullets.map((b, idx) => idx === bi ? value : b) } : e));

  // ========== PROJECTS FUNCTIONS ==========
  const addProject = () => u("projects", [...dataRef.current.projects, { title: "New Project", description: "Project description" }]);
  const removeProject = (i) => u("projects", dataRef.current.projects.filter((_, idx) => idx !== i));
  const copyProject = (i) => {
    const projToCopy = JSON.parse(JSON.stringify(dataRef.current.projects[i]));
    projToCopy.title = projToCopy.title + " (Copy)";
    u("projects", [...dataRef.current.projects, projToCopy]);
  };
  const updateProject = (i, field, value) => u("projects", dataRef.current.projects.map((p, idx) => idx === i ? { ...p, [field]: value } : p));

  // ========== EDUCATION FUNCTIONS ==========
  const addEducation = () => u("education", [...dataRef.current.education, { degree: "New Degree", school: "New School", year: "Year" }]);
  const removeEducation = (i) => u("education", dataRef.current.education.filter((_, idx) => idx !== i));
  const copyEducation = (i) => {
    const eduToCopy = JSON.parse(JSON.stringify(dataRef.current.education[i]));
    eduToCopy.school = eduToCopy.school + " (Copy)";
    u("education", [...dataRef.current.education, eduToCopy]);
  };
  const updateEdu = (i, field, value) => u("education", dataRef.current.education.map((e, idx) => idx === i ? { ...e, [field]: value } : e));

  // ========== SKILLS FUNCTIONS ==========
  const addSkill = () => u("skills", [...dataRef.current.skills, "New skill"]);
  const removeSkill = (i) => u("skills", dataRef.current.skills.filter((_, idx) => idx !== i));
  const copySkill = (i) => u("skills", [...dataRef.current.skills, dataRef.current.skills[i] + " (Copy)"]);
  const updateSkill = (i, value) => u("skills", dataRef.current.skills.map((s, idx) => idx === i ? value : s));

  // ========== CERTIFICATIONS FUNCTIONS ==========
  const addCertification = () => u("certifications", [...dataRef.current.certifications, "New certification"]);
  const removeCertification = (i) => u("certifications", dataRef.current.certifications.filter((_, idx) => idx !== i));
  const copyCertification = (i) => u("certifications", [...dataRef.current.certifications, dataRef.current.certifications[i] + " (Copy)"]);
  const updateCert = (i, value) => u("certifications", dataRef.current.certifications.map((c, idx) => idx === i ? value : c));

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
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom:"5px"
    },
    contactInfo: {
      fontSize: "10pt",
      marginTop: "5px",
      display: "flex",
      flexDirection: "column"
    },
    itemHeader: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: "bold",
      marginTop: "8px",
    },
    bulletDot: {
      marginTop: "13px",
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      background: "#000",
      flexShrink: 0,
    },
  };

  return (
    <>
      <StyleInjector />
      <div id="resume" style={styles.container}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={{ flex: 1 }}>
            <E value={data.name} onChange={(v) => u("name", v)} style={{ fontSize: "26pt", fontWeight: "bold", display: "block" }} />
            <div style={styles.contactInfo}>
              <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap'}}>
                <E value={data.location} onChange={(v) => u("location", v)} /> | 
                <E value={data.phone} onChange={(v) => u("phone", v)} />
              </div>
              <E value={data.email} onChange={(v) => u("email", v)} />
              <E value={data.linkedin} onChange={(v) => u("linkedin", v)} />
            </div>
          </div>

          <label style={styles.photoBox} className="no-print">
            {data.profileImage ? (
              <img src={data.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Camera size={24} color="#000" />
            )}
            <input type="file" hidden onChange={handleImageChange} accept="image/*" />
          </label>
        </div>

        {/* Objective */}
        <div style={styles.sectionTitle}>
          <E value={data.objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
        </div>
        <E value={data.objective} onChange={(v) => u("objective", v)} block style={{ textAlign: "justify" }} />

        {/* Experience Section */}
        <div style={styles.sectionTitle}>
          <E value={data.experienceTitle} onChange={(v) => u("experienceTitle", v)} />
          <IconBtn onClick={addExperience} color="#6366f1">
            <Plus size={11} /> Add
          </IconBtn>
        </div>

        {data.experience.map((exp, ei) => (
          <div key={ei} className="hoverable-row"  style={{
              borderBottom: ei !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none",
              marginBottom: ei !== data.experience.length - 1 ? "5px" : "0",  /*  */
              paddingBottom: ei !== data.experience.length - 1 ? "5px" : "0", /* added */
            }}>
            <div style={{ ...styles.itemHeader, gap: 6 }}>
              <E value={exp.company} onChange={(v) => updateExp(ei, "company", v)} />
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <E value={exp.period} onChange={(v) => updateExp(ei, "period", v)} />
                <IconBtn onClick={() => copyExperience(ei)} color="#6366f1" title="Copy">
                  <Copy size={10} />
                </IconBtn>
                <IconBtn onClick={() => removeExperience(ei)} color="#ef4444" title="Remove">
                  <Trash2 size={10} />
                </IconBtn>
              </div>
            </div>
            <div style={{ fontStyle: "italic", fontWeight: "600", marginBottom: 4 }}>
              <E value={exp.role} onChange={(v) => updateExp(ei, "role", v)} />
            </div>

            {/* Bullets */}
            {exp.bullets.map((b, bi) => (
              <div key={bi} className="hoverable-row resume-bullet-row" style={{ display: "flex", gap: 8, marginLeft: 10, marginBottom: 2, alignItems: "flex-start" }}>
                <div style={styles.bulletDot} />
                <E value={b} onChange={(v) => updateBullet(ei, bi, v)} style={{ flex: 1 }} />
                <IconBtn onClick={() => copyBullet(ei, bi)} color="#6366f1" title="Copy" style={{ padding: "1px 5px", fontSize: "9px" }}>
                  <Copy size={8} />
                </IconBtn>
                <IconBtn onClick={() => removeBullet(ei, bi)} color="#ef4444" title="Remove" style={{ padding: "1px 5px", fontSize: "9px" }}>
                  <Trash2 size={8} />
                </IconBtn>
              </div>
            ))}
 
          </div>
        ))}

        {/* Projects Section */}
        <div style={styles.sectionTitle}>
          <E value={data.projectsTitle} onChange={(v) => u("projectsTitle", v)} />
          <IconBtn onClick={addProject} color="#6366f1">
            <Plus size={11} /> Add
          </IconBtn>
        </div>

        {data.projects.map((p, i) => (
          <div key={i} className="hoverable-row" style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
              <E value={p.title} onChange={(v) => updateProject(i, "title", v)} style={{ fontWeight: "bold", display: "block", flex: 1 }} />
              <div style={{ display: "flex", gap: 4 }}>
                <IconBtn onClick={() => copyProject(i)} color="#6366f1">
                  <Copy size={10} />
                </IconBtn>
                <IconBtn onClick={() => removeProject(i)} color="#ef4444">
                  <Trash2 size={10} />
                </IconBtn>
              </div>
            </div>
            <E value={p.description} onChange={(v) => updateProject(i, "description", v)} block style={{ textAlign: "justify", fontSize: "10.5pt" }} />
          </div>
        ))}

        {/* Skills Section */}
        <div style={styles.sectionTitle}>
          <E value={data.skillsTitle} onChange={(v) => u("skillsTitle", v)} />
          <IconBtn onClick={addSkill} color="#6366f1">
            <Plus size={11} /> Add
          </IconBtn>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {data.skills.map((s, i) => (
            <div key={i} className="hoverable-row" style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
              <E value={s} onChange={(v) => updateSkill(i, v)} style={{ flex: 1 }} />
              <IconBtn onClick={() => copySkill(i)} color="#6366f1">
                <Copy size={10} />
              </IconBtn>
              <IconBtn onClick={() => removeSkill(i)} color="#ef4444">
                <Trash2 size={10} />
              </IconBtn>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div style={styles.sectionTitle}>
          <E value={data.educationTitle} onChange={(v) => u("educationTitle", v)} />
          <IconBtn onClick={addEducation} color="#6366f1">
            <Plus size={11} /> Add
          </IconBtn>
        </div>

        {data.education.map((edu, i) => (
          <div key={i} className="hoverable-row" style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <E value={edu.school} onChange={(v) => updateEdu(i, "school", v)} style={{ fontWeight: "bold" }} />
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <E value={edu.year} onChange={(v) => updateEdu(i, "year", v)} />
                <IconBtn onClick={() => copyEducation(i)} color="#6366f1">
                  <Copy size={10} />
                </IconBtn>
                <IconBtn onClick={() => removeEducation(i)} color="#ef4444">
                  <Trash2 size={10} />
                </IconBtn>
              </div>
            </div>
            <E value={edu.degree} onChange={(v) => updateEdu(i, "degree", v)} />
          </div>
        ))}

        {/* Certifications Section */}
        <div style={styles.sectionTitle}>
          <E value={data.certificationsTitle} onChange={(v) => u("certificationsTitle", v)} />
          <IconBtn onClick={addCertification} color="#6366f1">
            <Plus size={11} /> Add
          </IconBtn>
        </div>

        {data.certifications.map((c, i) => (
          <div key={i} className="hoverable-row" style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
            <span>•</span>
            <E value={c} onChange={(v) => updateCert(i, v)} style={{ flex: 1 }} />
            <IconBtn onClick={() => copyCertification(i)} color="#6366f1">
              <Copy size={10} />
            </IconBtn>
            <IconBtn onClick={() => removeCertification(i)} color="#ef4444">
              <Trash2 size={10} />
            </IconBtn>
          </div>
        ))}
      </div>
    </>
  );
};

export default Ptemplates4;