import React, { useState, useRef } from "react";
import { Camera, Plus, Trash2, Copy } from "lucide-react";

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

const EditableSpan = ({ value, onChange, style = {}, block = false }) => {
  const Tag = block ? "div" : "span";
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.innerText)}
      style={{
        outline: "none", cursor: "text", minWidth: "20px",
        display: block ? "block" : "inline",
        whiteSpace: block ? "pre-wrap" : "normal",
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

const E = (p) => <EditableSpan {...p} />;

const IconBtn = ({ onClick, color = "#6366f1", title, children, style = {} }) => (
  <button
    className="no-print edit-controls"
    onClick={onClick}
    title={title}
    style={{
      background: color, color: "#fff", border: "none", borderRadius: "4px",
      padding: "2px 5px", fontSize: "9px", cursor: "pointer",
      display: "inline-flex", alignItems: "center", gap: "2px",
      flexShrink: 0, lineHeight: 1.2, ...style,
    }}
  >
    {children}
  </button>
);

const PTemplates1 = ({ data: propData, setData: setPropData }) => {
  const [data, setDataState] = useState(() => ({
    name: "First Name",
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
        role: "Full Stack Developer", company: "HCL Tech Lucknow", period: "Aug-2025-present",
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
        role: "Software Developer", company: "IBM", period: "April 2025-August-2025",
        bullets: [
          "Developing full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
          "Responsible for building scalable APIs, integrating frontend/backend, and ensuring responsive Design"
        ]
      },
      {
        role: "Software Developer", company: "Tech Mahindra", period: "April 2024 - April 2025",
        bullets: [
          "Committed to continuous learning and staying updated with latest technologies.",
          "Applied problem-solving abilities to overcome challenges during project development.",
          "Created technical documentation to communicate project details effectively."
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
      { title: "Paytm (Payment Application)", description: "Worked on a complete project including Finance, Accounts, and HR modules." },
      { title: "Transport Management Systems", description: "Developed a web-based platform for vehicle tracking and automated invoice generation." },
      { title: "HRMS (HR Management System)", description: "Built full-stack HRMS using React, Node, Express, and MongoDB." }
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

  const addExperience = () => u("experience", [...dataRef.current.experience, { role: "New Role", company: "New Company", period: "Date", bullets: ["New bullet point"] }]);
  const removeExperience = (i) => u("experience", dataRef.current.experience.filter((_, idx) => idx !== i));
  const copyExperience = (i) => { const e = JSON.parse(JSON.stringify(dataRef.current.experience[i])); e.company += " (Copy)"; u("experience", [...dataRef.current.experience, e]); };
  const updateExp = (i, field, value) => u("experience", dataRef.current.experience.map((e, idx) => idx === i ? { ...e, [field]: value } : e));

  const addBullet = (ei) => u("experience", dataRef.current.experience.map((e, i) => i === ei ? { ...e, bullets: [...e.bullets, "New bullet point"] } : e));
  const removeBullet = (ei, bi) => u("experience", dataRef.current.experience.map((e, i) => i === ei ? { ...e, bullets: e.bullets.filter((_, idx) => idx !== bi) } : e));
  const copyBullet = (ei, bi) => u("experience", dataRef.current.experience.map((e, i) => i === ei ? { ...e, bullets: [...e.bullets, e.bullets[bi] + " (Copy)"] } : e));
  const updateBullet = (ei, bi, value) => u("experience", dataRef.current.experience.map((e, i) => i === ei ? { ...e, bullets: e.bullets.map((b, idx) => idx === bi ? value : b) } : e));

  const addEducation = () => u("education", [...dataRef.current.education, { degree: "New Degree", school: "New School", year: "Year" }]);
  const removeEducation = (i) => u("education", dataRef.current.education.filter((_, idx) => idx !== i));
  const copyEducation = (i) => { const e = JSON.parse(JSON.stringify(dataRef.current.education[i])); e.school += " (Copy)"; u("education", [...dataRef.current.education, e]); };
  const updateEdu = (i, field, value) => u("education", dataRef.current.education.map((e, idx) => idx === i ? { ...e, [field]: value } : e));

  const addProject = () => u("projects", [...dataRef.current.projects, { title: "New Project", description: "Project description" }]);
  const removeProject = (i) => u("projects", dataRef.current.projects.filter((_, idx) => idx !== i));
  const copyProject = (i) => { const p = JSON.parse(JSON.stringify(dataRef.current.projects[i])); p.title += " (Copy)"; u("projects", [...dataRef.current.projects, p]); };
  const updateProject = (i, field, value) => u("projects", dataRef.current.projects.map((p, idx) => idx === i ? { ...p, [field]: value } : p));

  const addSkill = () => u("skills", [...dataRef.current.skills, "New skill"]);
  const removeSkill = (i) => u("skills", dataRef.current.skills.filter((_, idx) => idx !== i));
  const copySkill = (i) => u("skills", [...dataRef.current.skills, dataRef.current.skills[i] + " (Copy)"]);
  const updateSkill = (i, value) => u("skills", dataRef.current.skills.map((s, idx) => idx === i ? value : s));

  const addCertification = () => u("certifications", [...dataRef.current.certifications, "New certification"]);
  const removeCertification = (i) => u("certifications", dataRef.current.certifications.filter((_, idx) => idx !== i));
  const copyCertification = (i) => u("certifications", [...dataRef.current.certifications, dataRef.current.certifications[i] + " (Copy)"]);
  const updateCert = (i, value) => u("certifications", dataRef.current.certifications.map((c, idx) => idx === i ? value : c));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) u("profileImage", URL.createObjectURL(file));
  };

  const s = {
    container: {
      width: "210mm", minHeight: "297mm",
      padding: "10mm",                        /* ✅ 15mm → 10mm */
      background: "#fff", fontFamily: "'Arial', sans-serif",
      fontSize: "10.5px", color: "#333",
      lineHeight: "1.4",                      /* ✅ 1.5 → 1.4 */
      margin: "auto",
    },
    header: {
      display: "flex", justifyContent: "space-between", alignItems: "center",
      marginBottom: "10px",                   /* ✅ 20px → 10px */
      borderBottom: "2px solid #333",
      paddingBottom: "8px",                   /* ✅ 10px → 8px */
    },
    photoContainer: {
      width: "80px", height: "95px",          /* ✅ 90×110 → 80×95 */
      border: "1px solid #ccc", display: "flex",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", backgroundColor: "#f0f0f0",
      cursor: "pointer", flexShrink: 0,
    },
    sectionTitle: {
      fontWeight: "bold", fontSize: "11.5px",
      borderBottom: "1px solid #333",
      marginTop: "15px",                     
      marginBottom: "4px",                    
      textTransform: "uppercase",
      paddingBottom: "6px",                  
      display: "flex", justifyContent: "space-between", alignItems: "center",
    },
    itemHeader: {
      display: "flex", justifyContent: "space-between", fontWeight: "bold",
    },
    bulletDot: {
      marginTop: "13px",                        
      width: "4px", height: "4px", borderRadius: "50%",
      background: "#333", flexShrink: 0,
    },
  };

  return (
    <>
      <StyleInjector />
      <div id="resume" style={s.container}>

        {/* HEADER */}
        <div style={s.header}>
          <div style={{ flex: 1 }}>
            <E value={data.name} onChange={(v) => u("name", v)} style={{ fontSize: "22px", fontWeight: "bold" }} />
            <div style={{ marginTop: "2px" }}>
              <E value={data.location} onChange={(v) => u("location", v)} /> |{" "}
              <E value={data.phone} onChange={(v) => u("phone", v)} />
            </div>
            <div>
              <E value={data.email} onChange={(v) => u("email", v)} /> |{" "}
              <E value={data.linkedin} onChange={(v) => u("linkedin", v)} />
            </div>
          </div>
          <label style={s.photoContainer} className="me-6 no-print">
            {data.profileImage ? (
              <img src={data.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Camera size={28} color="#999" />
            )}
            <input type="file" hidden onChange={handleImageChange} accept="image/*" />
          </label>
        </div>

        {/* OBJECTIVE */}
        <div style={s.sectionTitle}>
          <E value={data.objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
        </div>
        <E value={data.objective} onChange={(v) => u("objective", v)} block />

        {/* EXPERIENCE */}
        <div style={s.sectionTitle}>
          <E value={data.experienceTitle} onChange={(v) => u("experienceTitle", v)} />
          <IconBtn onClick={addExperience} color="#6366f1"><Plus size={10} /> Add</IconBtn>
        </div>

        {data.experience.map((exp, ei) => (
          <div
            key={ei}
            className="hoverable-row"
            style={{
              borderBottom: ei !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none",
              marginBottom: ei !== data.experience.length - 1 ? "5px" : "0",  /* ✅ added */
              paddingBottom: ei !== data.experience.length - 1 ? "5px" : "0", /* ✅ added */
            }}
          >
            <div style={{ ...s.itemHeader, gap: 4 }}>
              <E value={exp.company} onChange={(v) => updateExp(ei, "company", v)} />
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <E value={exp.period} onChange={(v) => updateExp(ei, "period", v)} />
                <IconBtn onClick={() => copyExperience(ei)} color="#6366f1" title="Copy"><Copy size={9} /></IconBtn>
                <IconBtn onClick={() => removeExperience(ei)} color="#ef4444" title="Remove"><Trash2 size={9} /></IconBtn>
              </div>
            </div>
            <E value={exp.role} onChange={(v) => updateExp(ei, "role", v)} style={{ fontStyle: "italic", display: "block", marginBottom: "2px" }} />

            {exp.bullets.map((b, bi) => (
              <div key={bi} className="hoverable-row resume-bullet-row" style={{ display: "flex", gap: 6, marginLeft: 8, marginBottom: 1, alignItems: "flex-start" }}>
                <div style={s.bulletDot} />
                <E value={b} onChange={(v) => updateBullet(ei, bi, v)} block style={{ flex: 1 }} />
                <IconBtn onClick={() => copyBullet(ei, bi)} color="#6366f1" title="Copy" style={{ padding: "1px 4px" }}><Copy size={7} /></IconBtn>
                <IconBtn onClick={() => removeBullet(ei, bi)} color="#ef4444" title="Remove" style={{ padding: "1px 4px" }}><Trash2 size={7} /></IconBtn>
              </div>
            ))}

            
          </div>
        ))}

        {/* PROJECTS */}
        <div style={s.sectionTitle}>
          <E value={data.projectsTitle} onChange={(v) => u("projectsTitle", v)} />
          <IconBtn onClick={addProject} color="#6366f1"><Plus size={10} /> Add</IconBtn>
        </div>

        {data.projects.map((p, i) => (
          <div key={i} className="hoverable-row" style={{ marginBottom: "3px" }}>  {/* ✅ added */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <E value={p.title} onChange={(v) => updateProject(i, "title", v)} style={{ fontWeight: "bold", display: "block" }} />
              <div style={{ display: "flex", gap: 3 }}>
                <IconBtn onClick={() => copyProject(i)} color="#6366f1"><Copy size={9} /></IconBtn>
                <IconBtn onClick={() => removeProject(i)} color="#ef4444"><Trash2 size={9} /></IconBtn>
              </div>
            </div>
            <E value={p.description} onChange={(v) => updateProject(i, "description", v)} block />
          </div>
        ))}

        {/* EDUCATION */}
        <div style={s.sectionTitle}>
          <E value={data.educationTitle} onChange={(v) => u("educationTitle", v)} />
          <IconBtn onClick={addEducation} color="#6366f1"><Plus size={10} /> Add</IconBtn>
        </div>

        {data.education.map((edu, i) => (
          <div key={i} className="hoverable-row" style={{ marginBottom: 4 }}>  {/* ✅ 8px → 4px */}
            <div style={{ ...s.itemHeader }}>
              <E value={edu.school} onChange={(v) => updateEdu(i, "school", v)} />
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <E value={edu.year} onChange={(v) => updateEdu(i, "year", v)} />
                <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={9} /></IconBtn>
                <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={9} /></IconBtn>
              </div>
            </div>
            <E value={edu.degree} onChange={(v) => updateEdu(i, "degree", v)} style={{ display: "block" }} />
          </div>
        ))}

        {/* SKILLS */}
        <div style={s.sectionTitle}>
          <E value={data.skillsTitle} onChange={(v) => u("skillsTitle", v)} />
          <IconBtn onClick={addSkill} color="#6366f1"><Plus size={10} /> Add</IconBtn>
        </div>

        {data.skills.map((sk, i) => (
          <div key={i} className="hoverable-row" style={{ display: "flex", alignItems: "flex-start", gap: 4, marginBottom: 2 }}>  {/* ✅ 6→4, 4→2 */}
            <E value={sk} onChange={(v) => updateSkill(i, v)} block style={{ flex: 1 }} />
            <IconBtn onClick={() => copySkill(i)} color="#6366f1"><Copy size={9} /></IconBtn>
            <IconBtn onClick={() => removeSkill(i)} color="#ef4444"><Trash2 size={9} /></IconBtn>
          </div>
        ))}

        {/* CERTIFICATIONS */}
        <div style={s.sectionTitle}>
          <E value={data.certificationsTitle} onChange={(v) => u("certificationsTitle", v)} />
          <IconBtn onClick={addCertification} color="#6366f1"><Plus size={10} /> Add</IconBtn>
        </div>

        {data.certifications.map((c, i) => (
          <div key={i} className="hoverable-row" style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 2 }}>  {/* ✅ 4→2 */}
            <div style={s.bulletDot} />
            <E value={c} onChange={(v) => updateCert(i, v)} block style={{ flex: 1 }} />
            <IconBtn onClick={() => copyCertification(i)} color="#6366f1"><Copy size={9} /></IconBtn>
            <IconBtn onClick={() => removeCertification(i)} color="#ef4444"><Trash2 size={9} /></IconBtn>
          </div>
        ))}

      </div>
    </>
  );
};

export default PTemplates1;