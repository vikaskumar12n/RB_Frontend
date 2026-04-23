import React, { useState, useRef } from "react";
import EditableSpan from "../component/page/Editablespan";
import { Plus, Trash2, Copy } from "lucide-react";

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

const accent = "#1a1a1a";
const dark = "#1a1a1a";
const light = "#ffffff";
const muted = "#555555";

const CreativeTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDataState] = useState(() => ({
    name: "First Name",
    phone: "+91 8644564677",
    location: "city, state",
    email: "email@gmail.com",
    linkedin: "linkedin.com",
    profileImage: null,

    objectiveTitle: "OBJECTIVE",
    objective: "Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications. Proficient in front-end and back-end technologies, including HTML, CSS, JavaScript, React, Node.js, and database systems like MongoDB and MySQL. Skilled in problem-solving, collaboration, and delivering user-focused solutions.",

    skillsTitle: "SKILLS",
    skills: [
      "Html, Css, React Js, Node Js, Express Js, Next Js, Electron Js, Javascript, Bootstrap, Tailwind CSS",
      "Django (Framework), Python, MongoDB, MsSql, PostgreSQL, RESTful APIs, Git & Github"
    ],

    experienceTitle: "EXPERIENCE",
    experience: [
      {
        role: "full Stack Developer",
        company: "Microsoft",
        period: "Aug-2025-present",
        bullets: [
          "Contributed to the development of a full-scale bg project.",
          "Built and integrated key modules like Finance, Accounts, and HR.",
          "Developed and optimized REST APIs for smooth data flow across the system.",
          "Worked on MongoDB database structures, schema design and data handling."
        ]
      },
      {
        role: "Software Developer",
        company: "Amazon",
        period: "April 2025-August-2025",
        bullets: [
          "Developing full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
          "Responsible for building scalable APIs and ensuring responsive Design"
        ]
      }
    ],

    educationTitle: "EDUCATION",
    education: [
      { degree: "BTECH", school: "IIT delhi", year: "2021-2025" },
    ],

    projectsTitle: "PROJECTS",
    projects: [
      {
        title: "flipkard(E-commerce)",
        description: "Worked on a complete software Gained experience in business workflows and API development.",
      },
      {
        title: "Transport Management Systems",
        description: "Developed a web-based platform for vehicle tracking and automated invoice generation with secure authentication.",
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

  // ========== 
  // T FUNCTIONS ==========
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

  // Section Head Component with Add Button
  const SectionHead = ({ title, onAdd, showAdd = false }) => (
    <div style={{ marginTop: "14px", marginBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ flex: 1 }} />
        <h2 style={{ 
          fontSize: "10px", fontWeight: "800", letterSpacing: "0.2em", 
          textAlign: "center", textTransform: "uppercase", margin: 0, padding: "3px 0" 
        }}>
          <E value={title} onChange={(v) => u(title === "OBJECTIVE" ? "objectiveTitle" : 
             title === "SKILLS" ? "skillsTitle" :
             title === "EXPERIENCE" ? "experienceTitle" :
             title === "EDUCATION" ? "educationTitle" :
             title === "PROJECTS" ? "projectsTitle" :
             title === "CERTIFICATIONS" ? "certificationsTitle" : title, v)} />
        </h2>
        {showAdd && onAdd && (
          <IconBtn onClick={onAdd} color="#6366f1" style={{ marginLeft: "auto" }}>
            <Plus size={10} /> Add
          </IconBtn>
        )}
      </div>
      <div style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: "4px" }} />
    </div>
  );

  return (
    <>
      <StyleInjector />
      <div style={{ background: "#f5f5f5", padding: "20px", display: "flex", justifyContent: "center" }}>
        <div id="resume" style={{
            width: "210mm", minHeight: "297mm", padding: "12mm 15mm",
            background: light, fontFamily: "'Georgia', serif", fontSize: "10.5px",
            color: "#1a1a1a", boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}>
          
          {/* HEADER */}
          <div style={{ textAlign: "center", marginBottom: "12px" }}>
            <E value={data.name} onChange={(v) => u("name", v)} style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "1px" }} />
            <div style={{ fontSize: "9.5px", marginTop: "4px", color: muted }}>
              <E value={data.phone} onChange={(v) => u("phone", v)} /> | <E value={data.location} onChange={(v) => u("location", v)} />
              <br />
              <E value={data.email} onChange={(v) => u("email", v)} /> | <E value={data.linkedin} onChange={(v) => u("linkedin", v)} />
            </div>
          </div>

          {/* OBJECTIVE */}
          <SectionHead title={data.objectiveTitle} />
          <E value={data.objective} onChange={(v) => u("objective", v)} block style={{ lineHeight: "1.4", textAlign: "justify" }} />

          <div style={{ display: "flex", gap: "30px", marginTop: "10px" }}>
            {/* LEFT SIDE (Skills, Education, Certifications) */}
            <div style={{ flex: "0 0 220px" }}>
              
              {/* SKILLS */}
              <SectionHead title={data.skillsTitle} showAdd={true} onAdd={addSkill} />
              {data.skills.map((s, i) => (
                <div key={i} className="hoverable-row" style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: 5 }}>
                  <span>•</span>
                  <E value={s} onChange={(v) => updateSkill(i, v)} style={{ flex: 1 }} />
                  <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 3px" }}>
                    <Copy size={8} />
                  </IconBtn>
                  <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 3px" }}>
                    <Trash2 size={8} />
                  </IconBtn>
                </div>
              ))}

              {/* EDUCATION */}
              <SectionHead title={data.educationTitle} showAdd={true} onAdd={addEducation} />
              {data.education.map((edu, i) => (
                <div key={i} className="hoverable-row" style={{ marginBottom: "8px", position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 5 }}>
                    <E value={edu.school} onChange={(v) => updateEdu(i, "school", v)} style={{ fontWeight: "700", display: "block", flex: 1 }} />
                    <div style={{ display: "flex", gap: 2 }}>
                      <IconBtn onClick={() => copyEducation(i)} color="#6366f1" style={{ padding: "1px 3px" }}>
                        <Copy size={8} />
                      </IconBtn>
                      <IconBtn onClick={() => removeEducation(i)} color="#ef4444" style={{ padding: "1px 3px" }}>
                        <Trash2 size={8} />
                      </IconBtn>
                    </div>
                  </div>
                  <div style={{ fontStyle: "italic" }}>
                    <E value={edu.degree} onChange={(v) => updateEdu(i, "degree", v)} />
                  </div>
                  <div style={{ fontSize: "9px", color: "#666" }}>
                    <E value={edu.year} onChange={(v) => updateEdu(i, "year", v)} />
                  </div>
                </div>
              ))}

              {/* CERTIFICATIONS */}
              <SectionHead title={data.certificationsTitle} showAdd={true} onAdd={addCertification} />
              {data.certifications.map((c, i) => (
                <div key={i} className="hoverable-row" style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: 5 }}>
                  <span>•</span>
                  <E value={c} onChange={(v) => updateCert(i, v)} style={{ flex: 1 }} />
                  <IconBtn onClick={() => copyCertification(i)} color="#6366f1" style={{ padding: "1px 3px" }}>
                    <Copy size={8} />
                  </IconBtn>
                  <IconBtn onClick={() => removeCertification(i)} color="#ef4444" style={{ padding: "1px 3px" }}>
                    <Trash2 size={8} />
                  </IconBtn>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE (Experience & Projects) */}
            <div style={{ flex: 1 }}>
              
              {/* EXPERIENCE */}
              <SectionHead title={data.experienceTitle} showAdd={true} onAdd={addExperience} />
              {data.experience.map((exp, ei) => (
                <div key={ei} className="hoverable-row"   style={{
              borderBottom: ei !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none",
              marginBottom: ei !== data.experience.length - 1 ? "5px" : "0",  /*  added */
              paddingBottom: ei !== data.experience.length - 1 ? "5px" : "0", /*  added */
            }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 5 }}>
                    <span style={{ fontWeight: "700" }}>
                      <E value={exp.company} onChange={(v) => updateExp(ei, "company", v)} />
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ fontSize: "9px" }}>
                        <E value={exp.period} onChange={(v) => updateExp(ei, "period", v)} />
                      </span>
                      <IconBtn onClick={() => copyExperience(ei)} color="#6366f1" style={{ padding: "1px 3px" }}>
                        <Copy size={8} />
                      </IconBtn>
                      <IconBtn onClick={() => removeExperience(ei)} color="#ef4444" style={{ padding: "1px 3px" }}>
                        <Trash2 size={8} />
                      </IconBtn>
                    </div>
                  </div>
                  <div style={{ fontStyle: "italic", fontWeight: "600", marginBottom: "4px" }}>
                    <E value={exp.role} onChange={(v) => updateExp(ei, "role", v)} />
                  </div>
                  {exp.bullets.map((b, bi) => (
                    <div key={bi} className="hoverable-row" style={{ display: "flex", gap: "8px", marginBottom: "6px", textAlign: "justify", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "12px" }}>•</span>
                      <E value={b} onChange={(v) => updateBullet(ei, bi, v)} style={{ flex: 1 }} />
                      <IconBtn onClick={() => copyBullet(ei, bi)} color="#6366f1" style={{ padding: "1px 3px" }}>
                        <Copy size={7} />
                      </IconBtn>
                      <IconBtn onClick={() => removeBullet(ei, bi)} color="#ef4444" style={{ padding: "1px 3px" }}>
                        <Trash2 size={7} />
                      </IconBtn>
                    </div>
                  ))}
                   
                </div>
              ))}

              {/* PROJECTS */}
              <SectionHead title={data.projectsTitle} showAdd={true} onAdd={addProject} />
              {data.projects.map((proj, i) => (
                <div key={i} className="hoverable-row" style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ fontWeight: "700", flex: 1 }}>
                      <E value={proj.title} onChange={(v) => updateProject(i, "title", v)} />
                    </div>
                    <div style={{ display: "flex", gap: 3 }}>
                      <IconBtn onClick={() => copyProject(i)} color="#6366f1" style={{ padding: "1px 3px" }}>
                        <Copy size={8} />
                      </IconBtn>
                      <IconBtn onClick={() => removeProject(i)} color="#ef4444" style={{ padding: "1px 3px" }}>
                        <Trash2 size={8} />
                      </IconBtn>
                    </div>
                  </div>
                  <E value={proj.description} onChange={(v) => updateProject(i, "description", v)} block style={{ color: "#444" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreativeTemplate;