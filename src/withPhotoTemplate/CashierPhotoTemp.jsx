import React, { useState, useRef } from "react";
import { Camera, MapPin, Phone, Mail, Link as LinkIcon, Briefcase, GraduationCap, Code, Award, Target, Folder, Plus, Trash2, Copy } from "lucide-react";
import EditableSpan from "../component/page/Editablespan";

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

const Cashierphoto = ({ data: propData, setData: setPropData }) => {
  const [data, setDataState] = useState(() => ({
    name: "First Name",
    title: "Full Stack Developer",
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

  const u = (field, value) => {
    const newData = { ...dataRef.current, [field]: value };
    setDataState(newData);
    dataRef.current = newData;
    if (setPropData) setPropData(newData);
  };

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

  // Modern Design Styles
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
    <>
      <StyleInjector />
      <div id="resume" style={styles.container}>
        {/* ── HEADER ── */}
        <header style={styles.header}>
          <div style={{ flex: 1 }}>
            <E value={data.name} onChange={(v) => u("name", v)} block style={{ fontSize: "32px", fontWeight: "800", color: primary, letterSpacing: "-1px" }} />
            <E value={data.title} onChange={(v) => u("title", v)} block style={{ fontSize: "16px", color: accent, fontWeight: "600", marginTop: "4px" }} />

            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "15px", fontSize: "10.5px", color: secondary }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={12} /> <E value={data.location} onChange={(v) => u("location", v)} /></span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Phone size={12} /> <E value={data.phone} onChange={(v) => u("phone", v)} /></span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Mail size={12} /> <E value={data.email} onChange={(v) => u("email", v)} /></span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", color: accent }}><LinkIcon size={12} /> <E value={data.linkedin} onChange={(v) => u("linkedin", v)} /></span>
            </div>
          </div>

          <label style={styles.photoContainer} className="no-print">
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
            <Target size={14} color={accent} />
            <div style={styles.sectionTitleText}><E value={data.objectiveTitle} onChange={(v) => u("objectiveTitle", v)} /></div>
            <div style={styles.line} />
          </div>
          <E value={data.objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "11px", lineHeight: "1.6", color: secondary }} />
        </section>

        {/* ── EXPERIENCE ── */}
        <section>
          <div style={{ ...styles.sectionTitleContainer, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Briefcase size={14} color={accent} />
              <div style={styles.sectionTitleText}><E value={data.experienceTitle} onChange={(v) => u("experienceTitle", v)} /></div>
              <div style={styles.line} />
            </div>
            <IconBtn onClick={addExperience} color="#6366f1">
              <Plus size={11} /> Add
            </IconBtn>
          </div>

          {data.experience.map((exp, ei) => (
            <div key={ei} className="hoverable-row" style={{
              borderBottom: ei !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none",
              marginBottom: ei !== data.experience.length - 1 ? "5px" : "0",  /*  added */
              paddingBottom: ei !== data.experience.length - 1 ? "5px" : "0", /*  added */
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
                <E value={exp.company} onChange={(v) => updateExp(ei, "company", v)} style={{ fontWeight: "700", fontSize: "13px" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <E value={exp.period} onChange={(v) => updateExp(ei, "period", v)} style={{ fontSize: "10px", color: secondary, fontWeight: "600" }} />
                  <IconBtn onClick={() => copyExperience(ei)} color="#6366f1" title="Copy">
                    <Copy size={10} />
                  </IconBtn>
                  <IconBtn onClick={() => removeExperience(ei)} color="#ef4444" title="Remove">
                    <Trash2 size={10} />
                  </IconBtn>
                </div>
              </div>
              <E value={exp.role} onChange={(v) => updateExp(ei, "role", v)} style={{ fontSize: "11px", fontWeight: "600", color: accent, fontStyle: "italic" }} />

              <ul style={{ paddingLeft: "15px", marginTop: "5px", listStyleType: "circle" }}>
                {exp.bullets.map((b, bi) => (
                  <li key={bi} className="hoverable-row" style={{ fontSize: "10.5px", color: secondary, marginBottom: "3px", display: "flex", alignItems: "flex-start", gap: 5 }}>
                    <span>•</span>
                    <E value={b} onChange={(v) => updateBullet(ei, bi, v)} style={{ flex: 1 }} />
                    <IconBtn onClick={() => copyBullet(ei, bi)} color="#6366f1" title="Copy" style={{ padding: "1px 5px", fontSize: "9px" }}>
                      <Copy size={8} />
                    </IconBtn>
                    <IconBtn onClick={() => removeBullet(ei, bi)} color="#ef4444" title="Remove" style={{ padding: "1px 5px", fontSize: "9px" }}>
                      <Trash2 size={8} />
                    </IconBtn>
                  </li>
                ))}
              </ul>


            </div>
          ))}
        </section>

        {/* ── PROJECTS ── */}
        <section>
          <div style={{ ...styles.sectionTitleContainer, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Folder size={14} color={accent} />
              <div style={styles.sectionTitleText}><E value={data.projectsTitle} onChange={(v) => u("projectsTitle", v)} /></div>
              <div style={styles.line} />
            </div>
            <IconBtn onClick={addProject} color="#6366f1">
              <Plus size={11} /> Add
            </IconBtn>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            {data.projects.map((p, i) => (
              <div key={i} className="hoverable-row" style={{ backgroundColor: "#f8fafc", padding: "10px", borderRadius: "6px", border: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <E value={p.title} onChange={(v) => updateProject(i, "title", v)} style={{ fontWeight: "700", fontSize: "11.5px", display: "block", color: primary, flex: 1 }} />
                  <div style={{ display: "flex", gap: 4 }}>
                    <IconBtn onClick={() => copyProject(i)} color="#6366f1">
                      <Copy size={10} />
                    </IconBtn>
                    <IconBtn onClick={() => removeProject(i)} color="#ef4444">
                      <Trash2 size={10} />
                    </IconBtn>
                  </div>
                </div>
                <E value={p.description} onChange={(v) => updateProject(i, "description", v)} block style={{ fontSize: "10px", color: secondary, marginTop: "4px" }} />
              </div>
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section>
          <div style={{ ...styles.sectionTitleContainer, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Code size={14} color={accent} />
              <div style={styles.sectionTitleText}><E value={data.skillsTitle} onChange={(v) => u("skillsTitle", v)} /></div>
              <div style={styles.line} />
            </div>
            <IconBtn onClick={addSkill} color="#6366f1">
              <Plus size={11} /> Add
            </IconBtn>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {data.skills.map((s, i) => (
              <div key={i} className="hoverable-row" style={{ fontSize: "10.5px", color: secondary, display: "flex", alignItems: "flex-start", gap: "5px" }}>
                <span style={{ color: accent }}>•</span>
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
        </section>

        {/* ── EDUCATION ── */}
        <section>
          <div style={{ ...styles.sectionTitleContainer, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <GraduationCap size={14} color={accent} />
              <div style={styles.sectionTitleText}><E value={data.educationTitle} onChange={(v) => u("educationTitle", v)} /></div>
              <div style={styles.line} />
            </div>
            <IconBtn onClick={addEducation} color="#6366f1">
              <Plus size={11} /> Add
            </IconBtn>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {data.education.map((edu, i) => (
              <div key={i} className="hoverable-row" style={{ borderLeft: `2px solid ${border}`, paddingLeft: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <E value={edu.degree} onChange={(v) => updateEdu(i, "degree", v)} style={{ fontWeight: "700", fontSize: "11px", flex: 1 }} />
                  <div style={{ display: "flex", gap: 4 }}>
                    <IconBtn onClick={() => copyEducation(i)} color="#6366f1">
                      <Copy size={10} />
                    </IconBtn>
                    <IconBtn onClick={() => removeEducation(i)} color="#ef4444">
                      <Trash2 size={10} />
                    </IconBtn>
                  </div>
                </div>
                <div style={{ fontSize: "10px", color: secondary }}>
                  <E value={edu.school} onChange={(v) => updateEdu(i, "school", v)} /> | <E value={edu.year} onChange={(v) => updateEdu(i, "year", v)} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section>
          <div style={{ ...styles.sectionTitleContainer, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Award size={14} color={accent} />
              <div style={styles.sectionTitleText}><E value={data.certificationsTitle} onChange={(v) => u("certificationsTitle", v)} /></div>
              <div style={styles.line} />
            </div>
            <IconBtn onClick={addCertification} color="#6366f1">
              <Plus size={11} /> Add
            </IconBtn>
          </div>

          {data.certifications.map((c, i) => (
            <div key={i} className="hoverable-row" style={{ fontSize: "10.5px", color: secondary, marginBottom: "4px", display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <span style={{ color: accent }}>★</span>
              <E value={c} onChange={(v) => updateCert(i, v)} style={{ flex: 1 }} />
              <IconBtn onClick={() => copyCertification(i)} color="#6366f1">
                <Copy size={10} />
              </IconBtn>
              <IconBtn onClick={() => removeCertification(i)} color="#ef4444">
                <Trash2 size={10} />
              </IconBtn>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default Cashierphoto;