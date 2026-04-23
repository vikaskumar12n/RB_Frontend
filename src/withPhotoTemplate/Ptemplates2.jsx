import React, { useState, useRef } from "react";
import { Camera, MapPin, Phone, Mail, Link as LinkIcon, Plus, Trash2, Copy } from "lucide-react";
import EditableSpan from "../component/page/Editablespan";

// Inject print styles once
const PRINT_STYLE = `
  @media print {
    .no-print { display: none !important; }
    .resume-bullet-row { align-items: flex-start !important; }
    body { margin: 0; }
    @page {
      size: A4;
      margin: 0;
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

// Floating icon button — hidden on print, fades in on hover of parent
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
      padding: "2px 5px",
      fontSize: "9px",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "2px",
      flexShrink: 0,
      lineHeight: 1.2,
      ...style,
    }}
  >
    {children}
  </button>
);

const PTemplate2 = ({ data: propData, setData: setPropData }) => {
  const [data, setDataState] = useState(() => ({
    name: "First Name",
    title: "Full Stack Developer",
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

  const u = (field, value) => {
    const newData = { ...dataRef.current, [field]: value };
    setDataState(newData);
    dataRef.current = newData;
    if (setPropData) setPropData(newData);
  };

  // ========== EXPERIENCE FUNCTIONS ==========
  const addExperience = () => {
    const newExp = {
      role: "New Role",
      company: "New Company",
      period: "Date",
      bullets: ["New bullet point"]
    };
    u("experience", [...dataRef.current.experience, newExp]);
  };

  const removeExperience = (index) => {
    u("experience", dataRef.current.experience.filter((_, i) => i !== index));
  };

  const copyExperience = (index) => {
    const expToCopy = JSON.parse(JSON.stringify(dataRef.current.experience[index]));
    expToCopy.company = expToCopy.company + " (Copy)";
    u("experience", [...dataRef.current.experience, expToCopy]);
  };

  const updateExp = (index, field, value) => {
    u("experience", dataRef.current.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    ));
  };

  // ========== BULLET FUNCTIONS ==========
  const addBullet = (expIndex) => {
    u("experience", dataRef.current.experience.map((exp, i) =>
      i === expIndex ? { ...exp, bullets: [...exp.bullets, "New bullet point"] } : exp
    ));
  };

  const removeBullet = (expIndex, bulletIndex) => {
    u("experience", dataRef.current.experience.map((exp, i) =>
      i === expIndex ? { ...exp, bullets: exp.bullets.filter((_, bi) => bi !== bulletIndex) } : exp
    ));
  };

  const copyBullet = (expIndex, bulletIndex) => {
    u("experience", dataRef.current.experience.map((exp, i) =>
      i === expIndex ? { ...exp, bullets: [...exp.bullets, exp.bullets[bulletIndex] + " (Copy)"] } : exp
    ));
  };

  const updateBullet = (expIndex, bulletIndex, value) => {
    u("experience", dataRef.current.experience.map((exp, i) =>
      i === expIndex ? { ...exp, bullets: exp.bullets.map((b, bi) => bi === bulletIndex ? value : b) } : exp
    ));
  };

  // ========== PROJECTS FUNCTIONS ==========
  const addProject = () => {
    u("projects", [...dataRef.current.projects, { title: "New Project", description: "Project description" }]);
  };

  const removeProject = (index) => {
    u("projects", dataRef.current.projects.filter((_, i) => i !== index));
  };

  const copyProject = (index) => {
    const projectToCopy = JSON.parse(JSON.stringify(dataRef.current.projects[index]));
    projectToCopy.title = projectToCopy.title + " (Copy)";
    u("projects", [...dataRef.current.projects, projectToCopy]);
  };

  const updateProject = (index, field, value) => {
    u("projects", dataRef.current.projects.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    ));
  };

  // ========== EDUCATION FUNCTIONS ==========
  const addEducation = () => {
    u("education", [...dataRef.current.education, { degree: "New Degree", school: "New School", year: "Year" }]);
  };

  const removeEducation = (index) => {
    u("education", dataRef.current.education.filter((_, i) => i !== index));
  };

  const copyEducation = (index) => {
    const eduToCopy = JSON.parse(JSON.stringify(dataRef.current.education[index]));
    eduToCopy.school = eduToCopy.school + " (Copy)";
    u("education", [...dataRef.current.education, eduToCopy]);
  };

  const updateEdu = (index, field, value) => {
    u("education", dataRef.current.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    ));
  };

  // ========== SKILLS FUNCTIONS ==========
  const addSkill = () => {
    u("skills", [...dataRef.current.skills, "New skill"]);
  };

  const removeSkill = (index) => {
    u("skills", dataRef.current.skills.filter((_, i) => i !== index));
  };

  const copySkill = (index) => {
    u("skills", [...dataRef.current.skills, dataRef.current.skills[index] + " (Copy)"]);
  };

  const updateSkill = (index, value) => {
    u("skills", dataRef.current.skills.map((s, i) => i === index ? value : s));
  };

  // ========== CERTIFICATIONS FUNCTIONS ==========
  const addCertification = () => {
    u("certifications", [...dataRef.current.certifications, "New certification"]);
  };

  const removeCertification = (index) => {
    u("certifications", dataRef.current.certifications.filter((_, i) => i !== index));
  };

  const copyCertification = (index) => {
    u("certifications", [...dataRef.current.certifications, dataRef.current.certifications[index] + " (Copy)"]);
  };

  const updateCert = (index, value) => {
    u("certifications", dataRef.current.certifications.map((c, i) => i === index ? value : c));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) u("profileImage", URL.createObjectURL(file));
  };

  // Styles - Reduced whitespace
  const primary = "#1e293b"; 
  const accent = "#3b82f6";
  const secondary = "#475569";
  const border = "#e2e8f0";

  const styles = {
    container: {
      width: "210mm",
      minHeight: "297mm",
      padding: "10mm",  // Reduced from 15mm
      background: "#fff",
      fontFamily: "'Arial', sans-serif",
      fontSize: "11px",
      color: "#333",
      lineHeight: "1.4",  // Reduced from 1.5
      margin: "auto",
    },
    header: {
      display: "flex",
      backgroundColor: primary,
      color: "#fff",
      padding: "25px",  // Reduced from 40px
      alignItems: "center",
      justifyContent: "space-between"
    },
    photoContainer: {
      width: "90px",  // Reduced from 110px
      height: "90px",
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
      fontSize: "12px",  // Reduced from 13px
      fontWeight: "700",
      textTransform: "uppercase",
      color: accent,
      letterSpacing: "1px",
      borderBottom: `1.5px solid ${border}`,  // Thinner border
      marginBottom: "6px",  // Reduced from 10px
      paddingBottom: "3px",  // Reduced from 4px
      marginTop: "12px",  // Reduced from 20px
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      fontSize: "10px",  // Reduced from 11px
      opacity: 0.9
    },
    itemHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "3px"  // Reduced from 5px
    },
    bulletDot: {
      marginTop: "10px",  // Reduced from 13px - MAJOR FIX
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      background: "#333",
      flexShrink: 0
    }
  };

  return (
    <>
      <StyleInjector />
      <div id="resume" style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={{ flex: 1 }}>
            <E value={data.name} onChange={(v) => u("name", v)} style={{ fontSize: "28px", fontWeight: "800", display: "block" }} />
            <E value={data.title} onChange={(v) => u("title", v)} style={{ fontSize: "14px", color: accent, fontWeight: "500", marginTop: "2px" }} />
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px" }}>
              <div style={styles.contactItem}><MapPin size={10}/> <E value={data.location} onChange={(v) => u("location", v)} /></div>
              <div style={styles.contactItem}><Phone size={10}/> <E value={data.phone} onChange={(v) => u("phone", v)} /></div>
              <div style={styles.contactItem}><Mail size={10}/> <E value={data.email} onChange={(v) => u("email", v)} /></div>
              <div style={styles.contactItem}><LinkIcon size={10}/> <E value={data.linkedin} onChange={(v) => u("linkedin", v)} /></div>
            </div>
          </div>

          <label style={styles.photoContainer} className="no-print">
            {data.profileImage ? (
              <img src={data.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Camera size={24} color="#999" />
            )}
            <input type="file" hidden onChange={handleImageChange} accept="image/*" />
          </label>
        </div>

        <div style={{ padding: "15px 30px" }}>  {/* Reduced padding */}
          {/* Objective */}
          <div style={styles.sectionTitle}>
            <E value={data.objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
          </div>
          <E value={data.objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "10.5px", lineHeight: "1.5", color: secondary }} />

          {/* Experience Section */}
          <div style={styles.sectionTitle}>
            <E value={data.experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            <IconBtn onClick={addExperience} color="#6366f1">
              <Plus size={10} /> Add
            </IconBtn>
          </div>

          {data.experience.map((exp, ei) => (
            <div
              key={ei}
              className="hoverable-row"
              style={{
                marginBottom: "12px",  // Reduced from 20px
                borderBottom: ei !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none",
                paddingBottom: "8px",  // Reduced from 10px
                position: "relative"
              }}
            >
              <div style={styles.itemHeader}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", fontSize: "11px" }}>
                    <E value={exp.company} onChange={(v) => updateExp(ei, "company", v)} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <E value={exp.period} onChange={(v) => updateExp(ei, "period", v)} style={{ color: secondary }} />
                      <IconBtn onClick={() => copyExperience(ei)} color="#6366f1" title="Copy Experience">
                        <Copy size={9} />
                      </IconBtn>
                      <IconBtn onClick={() => removeExperience(ei)} color="#ef4444" title="Remove Experience">
                        <Trash2 size={9} />
                      </IconBtn>
                    </div>
                  </div>
                  <E value={exp.role} onChange={(v) => updateExp(ei, "role", v)} style={{ fontSize: "10.5px", fontWeight: "600", color: accent, fontStyle: "italic", display: "block", marginBottom: 2 }} />
                </div>
              </div>

              {/* Bullets */}
              {exp.bullets.map((b, bi) => (
                <div
                  key={bi}
                  className="hoverable-row resume-bullet-row"
                  style={{ display: "flex", gap: 6, marginLeft: 10, marginBottom: 2, alignItems: "flex-start" }}
                >
                  <div style={styles.bulletDot} />
                  <E value={b} onChange={(v) => updateBullet(ei, bi, v)} block style={{ flex: 1, fontSize: "10.5px", color: secondary }} />
                  <IconBtn onClick={() => copyBullet(ei, bi)} color="#6366f1" title="Copy Bullet" style={{ padding: "1px 3px", fontSize: "8px" }}>
                    <Copy size={7} />
                  </IconBtn>
                  <IconBtn onClick={() => removeBullet(ei, bi)} color="#ef4444" title="Remove Bullet" style={{ padding: "1px 3px", fontSize: "8px" }}>
                    <Trash2 size={7} />
                  </IconBtn>
                </div>
              ))}

              
            </div>
          ))}

          {/* Projects Section */}
          <div style={styles.sectionTitle}>
            <E value={data.projectsTitle} onChange={(v) => u("projectsTitle", v)} />
            <IconBtn onClick={addProject} color="#6366f1">
              <Plus size={10} /> Add
            </IconBtn>
          </div>

          {data.projects.map((proj, i) => (
            <div key={i} className="hoverable-row" style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <E value={proj.title} onChange={(v) => updateProject(i, "title", v)} style={{ fontSize: "11px", fontWeight: "700", display: "block" }} />
                <div style={{ display: "flex", gap: 3 }}>
                  <IconBtn onClick={() => copyProject(i)} color="#6366f1">
                    <Copy size={9} />
                  </IconBtn>
                  <IconBtn onClick={() => removeProject(i)} color="#ef4444">
                    <Trash2 size={9} />
                  </IconBtn>
                </div>
              </div>
              <E value={proj.description} onChange={(v) => updateProject(i, "description", v)} block style={{ fontSize: "10.5px", color: secondary }} />
            </div>
          ))}

          {/* Education Section */}
          <div style={styles.sectionTitle}>
            <E value={data.educationTitle} onChange={(v) => u("educationTitle", v)} />
            <IconBtn onClick={addEducation} color="#6366f1">
              <Plus size={10} /> Add
            </IconBtn>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            {data.education.map((edu, i) => (
              <div key={i} className="hoverable-row">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <E value={edu.degree} onChange={(v) => updateEdu(i, "degree", v)} block style={{ fontWeight: "700", fontSize: "10.5px" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9.5px", color: secondary }}>
                      <E value={edu.school} onChange={(v) => updateEdu(i, "school", v)} />
                      <E value={edu.year} onChange={(v) => updateEdu(i, "year", v)} />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 3 }}>
                    <IconBtn onClick={() => copyEducation(i)} color="#6366f1">
                      <Copy size={9} />
                    </IconBtn>
                    <IconBtn onClick={() => removeEducation(i)} color="#ef4444">
                      <Trash2 size={9} />
                    </IconBtn>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div style={styles.sectionTitle}>
            <E value={data.skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            <IconBtn onClick={addSkill} color="#6366f1">
              <Plus size={10} /> Add
            </IconBtn>
          </div>

          {data.skills.map((skill, i) => (
            <div key={i} className="hoverable-row" style={{ display: "flex", alignItems: "flex-start", gap: 5, marginBottom: 2 }}>
              <E value={skill} onChange={(v) => updateSkill(i, v)} block style={{ flex: 1, fontSize: "10.5px", color: secondary }} />
              <IconBtn onClick={() => copySkill(i)} color="#6366f1">
                <Copy size={9} />
              </IconBtn>
              <IconBtn onClick={() => removeSkill(i)} color="#ef4444">
                <Trash2 size={9} />
              </IconBtn>
            </div>
          ))}

          {/* Certifications Section */}
          <div style={styles.sectionTitle}>
            <E value={data.certificationsTitle} onChange={(v) => u("certificationsTitle", v)} />
            <IconBtn onClick={addCertification} color="#6366f1">
              <Plus size={10} /> Add
            </IconBtn>
          </div>

          {data.certifications.map((cert, i) => (
            <div key={i} className="hoverable-row" style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 2 }}>
              <div style={styles.bulletDot} />
              <E value={cert} onChange={(v) => updateCert(i, v)} block style={{ flex: 1, fontSize: "10.5px", color: secondary }} />
              <IconBtn onClick={() => copyCertification(i)} color="#6366f1">
                <Copy size={9} />
              </IconBtn>
              <IconBtn onClick={() => removeCertification(i)} color="#ef4444">
                <Trash2 size={9} />
              </IconBtn>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PTemplate2;