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

const black = "#000000";
const gray = "#4b5563";
const lightGray = "#e5e7eb";

const getInitialData = () => ({
  name: "FIRST LAST",
  location: "Bay Area, California",
  phone: "+1-234-456-789",
  email: "professionalemail@resumeworded.com",
  linkedin: "linkedin.com/in/username",
  objectiveTitle: "Objective",
  experienceTitle: "Professional Experience",
  projectTitle: "Projects",
  educationTitle: "Education",
  skillsTitle: "Skills",
  certificationTitle: "Certifications",
  objective: `Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications.`,
  projects: [
    {
      title: "CRM (Customer Relationship Management)",
      description: "Worked on a complete CRM system including Finance, Accounts, and HR modules.",
    },
    {
      title: "E-commerce Website",
      description: "Developed full stack e-commerce platform with authentication and payment integration.",
    },
  ],
  certifications: [
    "Full Stack Web Development - Udemy",
    "React Developer Certification",
  ],
  experience: [
    {
      company: "XYZ Solutions Pvt. Ltd.",
      period: "2018 – Present",
      roles: [
        {
          title: "Front End Developer, React",
          period: "",
          bullets: [
            "Contributed to the development of a full-scale CRM (DSS) project.",
            "Built and integrated key modules like Finance, Accounts, and HR.",
            "Improved system performance through efficient backend logic.",
          ],
        },
      ],
    },
  ],
  education: [
    {
      school: "Millennium Group of Institutions",
      year: "2013",
      degree: "Bachelor of Engineering, Information Technology",
    },
  ],
  skills: [
    ["HTML", "CSS", "JavaScript", "React"],
    ["Node.js", "Express", "MongoDB", "SQL"],
  ],
});

const SideHead = ({ children, onAdd, showAdd = false }) => (
  <div style={{
    fontSize: "10px", fontWeight: "bold", textTransform: "uppercase",
    letterSpacing: "1.5px", color: black, borderBottom: `1px solid ${black}`,
    paddingBottom: "5px", marginBottom: "8px", marginTop: "15px",
    display: "flex", justifyContent: "space-between", alignItems: "center"
  }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1" style={{ marginLeft: "8px" }}>
        <Plus size={8} /> Add
      </IconBtn>
    )}
  </div>
);

const MainHead = ({ children, onAdd, showAdd = false }) => (
  <div style={{
    fontSize: "11px", fontWeight: "bold", textTransform: "uppercase",
    letterSpacing: "1.5px", color: black, borderBottom: `1px solid ${black}`,
    paddingBottom: "5px", marginBottom: "10px",
    display: "flex", justifyContent: "space-between", alignItems: "center"
  }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const ModernTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDataState] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setDataFunc = (d) => { setDataState(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setDataFunc({ ...ref.current, [f]: v });

  // ========== EXPERIENCE FUNCTIONS ==========
  const addExperience = () => {
    u("experience", [...ref.current.experience, { company: "New Company", period: "Date", roles: [{ title: "New Role", period: "", bullets: ["New bullet point"] }] }]);
  };
  const removeExperience = (i) => u("experience", ref.current.experience.filter((_, idx) => idx !== i));
  const copyExperience = (i) => {
    const expToCopy = JSON.parse(JSON.stringify(ref.current.experience[i]));
    expToCopy.company = expToCopy.company + " (Copy)";
    u("experience", [...ref.current.experience, expToCopy]);
  };

  // ========== ROLE FUNCTIONS ==========
  const addRole = (ei) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: [...exp.roles, { title: "New Role", period: "", bullets: ["New bullet point"] }] } : exp);
    u("experience", up);
  };
  const removeRole = (ei, ri) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: exp.roles.filter((_, r) => r !== ri) } : exp);
    u("experience", up);
  };
  const copyRole = (ei, ri) => {
    const roleToCopy = JSON.parse(JSON.stringify(ref.current.experience[ei].roles[ri]));
    roleToCopy.title = roleToCopy.title + " (Copy)";
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: [...exp.roles, roleToCopy] } : exp);
    u("experience", up);
  };

  // ========== BULLET FUNCTIONS ==========
  const addBullet = (ei, ri) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: exp.roles.map((role, r) => r === ri ? { ...role, bullets: [...role.bullets, "New bullet point"] } : role) } : exp);
    u("experience", up);
  };
  const removeBullet = (ei, ri, bi) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: exp.roles.map((role, r) => r === ri ? { ...role, bullets: role.bullets.filter((_, b) => b !== bi) } : role) } : exp);
    u("experience", up);
  };
  const copyBullet = (ei, ri, bi) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: exp.roles.map((role, r) => r === ri ? { ...role, bullets: [...role.bullets, role.bullets[bi] + " (Copy)"] } : role) } : exp);
    u("experience", up);
  };

  // ========== PROJECTS FUNCTIONS ==========
  const addProject = () => u("projects", [...ref.current.projects, { title: "New Project", description: "Project description" }]);
  const removeProject = (i) => u("projects", ref.current.projects.filter((_, idx) => idx !== i));
  const copyProject = (i) => {
    const projToCopy = JSON.parse(JSON.stringify(ref.current.projects[i]));
    projToCopy.title = projToCopy.title + " (Copy)";
    u("projects", [...ref.current.projects, projToCopy]);
  };

  // ========== EDUCATION FUNCTIONS ==========
  const addEducation = () => u("education", [...ref.current.education, { school: "New School", year: "Year", degree: "New Degree" }]);
  const removeEducation = (i) => u("education", ref.current.education.filter((_, idx) => idx !== i));
  const copyEducation = (i) => {
    const eduToCopy = JSON.parse(JSON.stringify(ref.current.education[i]));
    eduToCopy.school = eduToCopy.school + " (Copy)";
    u("education", [...ref.current.education, eduToCopy]);
  };

  // ========== SKILLS FUNCTIONS ==========
  const addSkill = () => u("skills", [...ref.current.skills, ["New skill"]]);
  const removeSkillRow = (i) => u("skills", ref.current.skills.filter((_, idx) => idx !== i));
  const copySkillRow = (i) => {
    const skillToCopy = JSON.parse(JSON.stringify(ref.current.skills[i]));
    skillToCopy[0] = skillToCopy[0] + " (Copy)";
    u("skills", [...ref.current.skills, skillToCopy]);
  };
  const addSkillItem = (rowIdx) => {
    const updated = ref.current.skills.map((row, i) => i === rowIdx ? [...row, "New skill"] : row);
    u("skills", updated);
  };
  const removeSkillItem = (rowIdx, itemIdx) => {
    const updated = ref.current.skills.map((row, i) => i === rowIdx ? row.filter((_, idx) => idx !== itemIdx) : row);
    u("skills", updated);
  };

  // ========== CERTIFICATIONS FUNCTIONS ==========
  const addCertification = () => u("certifications", [...ref.current.certifications, "New certification"]);
  const removeCertification = (i) => u("certifications", ref.current.certifications.filter((_, idx) => idx !== i));
  const copyCertification = (i) => u("certifications", [...ref.current.certifications, ref.current.certifications[i] + " (Copy)"]);

  // ========== UPDATE FUNCTIONS ==========
  const updateExpField = (ei, field, value) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, [field]: value } : exp);
    u("experience", up);
  };
  const updateRoleField = (ei, ri, field, value) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: exp.roles.map((role, r) => r === ri ? { ...role, [field]: value } : role) } : exp);
    u("experience", up);
  };
  const updateBulletField = (ei, ri, bi, value) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: exp.roles.map((role, r) => r === ri ? { ...role, bullets: role.bullets.map((b, idx) => idx === bi ? value : b) } : role) } : exp);
    u("experience", up);
  };
  const updateProjectField = (i, field, value) => {
    const up = ref.current.projects.map((proj, idx) => idx === i ? { ...proj, [field]: value } : proj);
    u("projects", up);
  };
  const updateEduField = (i, field, value) => {
    const up = ref.current.education.map((edu, idx) => idx === i ? { ...edu, [field]: value } : edu);
    u("education", up);
  };
  const updateSkillItem = (rowIdx, itemIdx, value) => {
    const updated = ref.current.skills.map((row, i) => i === rowIdx ? row.map((item, idx) => idx === itemIdx ? value : item) : row);
    u("skills", updated);
  };
  const updateCert = (i, value) => {
    const up = ref.current.certifications.map((c, idx) => idx === i ? value : c);
    u("certifications", up);
  };

  const {
    name, location, phone, email, linkedin, objectiveTitle, experienceTitle,
    projectTitle, educationTitle, skillsTitle, certificationTitle,
    objective, projects, certifications, experience, education, skills,
  } = data;

 
  return (
    <>
      <StyleInjector />
      <div id="resume" style={{
        width: "210mm", minHeight: "297mm", fontFamily: "'Segoe UI', sans-serif",
        fontSize: "10.5px", backgroundColor: "#fff", display: "flex", color: black, boxSizing: "border-box"
      }}>

        {/* LEFT COLUMN (Sidebar) */}
        <div style={{ width: "65mm", padding: "12mm 8mm", borderRight: `1px solid ${lightGray}`, flexShrink: 0 }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }} />

          <SideHead>Contact</SideHead>
          <div style={{ fontSize: "9.5px", lineHeight: "1.8" }}>
            <E value={location} onChange={(v) => u("location", v)} block />
            <E value={phone} onChange={(v) => u("phone", v)} block />
            <E value={email} onChange={(v) => u("email", v)} block />
            <E value={linkedin} onChange={(v) => u("linkedin", v)} block />
          </div>

          <SideHead showAdd={true} onAdd={addSkill}>
            <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
          </SideHead>
          
          {skills.map((row, ri) => (
            <div key={ri} className="hoverable-row" style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", alignItems: "center" }}>
                {row.map((skill, ci) => (
                  <span key={ci} style={{ display: "inline-flex", alignItems: "center", gap: "2px", background: "#f5f5f5", padding: "2px 6px", borderRadius: "3px", fontSize: "9.5px" }}>
                    <E value={skill} onChange={(v) => updateSkillItem(ri, ci, v)} />
                    <IconBtn onClick={() => removeSkillItem(ri, ci)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={6} /></IconBtn>
                  </span>
                ))}
                <IconBtn onClick={() => addSkillItem(ri)} color="#10b981" style={{ padding: "1px 3px" }}>
                  <Plus size={7} /> Add
                </IconBtn>
              </div>
              <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
                <IconBtn onClick={() => copySkillRow(ri)} color="#6366f1" style={{ padding: "1px 3px" }}>
                  <Copy size={7} /> Copy Row
                </IconBtn>
                <IconBtn onClick={() => removeSkillRow(ri)} color="#ef4444" style={{ padding: "1px 3px" }}>
                  <Trash2 size={7} /> Remove Row
                </IconBtn>
              </div>
            </div>
          ))}

          <SideHead showAdd={true} onAdd={addEducation}>
            <E value={educationTitle} onChange={(v) => u("educationTitle", v)} />
          </SideHead>
          
          {education.map((edu, i) => (
            <div key={i} className="hoverable-row" style={{ marginBottom: "10px", fontSize: "9px", borderBottom: i !== education.length - 1 ? `1px dashed ${lightGray}` : "none", paddingBottom: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 4 }}>
                <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "bold", flex: 1 }} />
                <div style={{ display: "flex", gap: 2 }}>
                  <IconBtn onClick={() => copyEducation(i)} color="#6366f1" style={{ padding: "1px 2px" }}><Copy size={6} /></IconBtn>
                  <IconBtn onClick={() => removeEducation(i)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={6} /></IconBtn>
                </div>
              </div>
              <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} block />
              <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} block style={{ color: gray }} />
            </div>
          ))}

          <SideHead showAdd={true} onAdd={addCertification}>
            <E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} />
          </SideHead>
          
          {certifications.map((cert, i) => (
            <div key={i} className="hoverable-row" style={{ fontSize: "9px", marginBottom: "4px", display: "flex", alignItems: "center", gap: 4 }}>
              <span>•</span>
              <E value={cert} onChange={(v) => updateCert(i, v)} style={{ flex: 1 }} />
              <IconBtn onClick={() => copyCertification(i)} color="#6366f1" style={{ padding: "1px 2px" }}><Copy size={6} /></IconBtn>
              <IconBtn onClick={() => removeCertification(i)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={6} /></IconBtn>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN (Main Content) */}
        <div style={{ flex: 1, padding: "12mm 10mm" }}>
          
          <div style={{ marginBottom: "20px" }}>
            <MainHead>
              <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
            </MainHead>
            <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "10px", lineHeight: "1.6", textAlign: "justify" }} />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <MainHead showAdd={true} onAdd={addExperience}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </MainHead>
            
            {experience.map((exp, ei) => (
              <div key={ei} className="hoverable-row" style={{ marginBottom: "14px", borderBottom: ei !== experience.length - 1 ? `1px dashed ${lightGray}` : "none", paddingBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                  <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "bold", fontSize: "11px" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} style={{ fontSize: "9.5px", fontWeight: "normal" }} />
                    <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                    <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                  </div>
                </div>
                
                {exp.roles.map((role, ri) => (
                  <div key={ri} className="hoverable-row" style={{ marginTop: "6px", marginLeft: "8px", borderLeft: `1px solid ${lightGray}`, paddingLeft: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                      <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontStyle: "italic", color: gray }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                        <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                        <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                      </div>
                    </div>
                    <ul style={{ paddingLeft: "18px", marginTop: "4px", margin: "4px 0" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} className="hoverable-row" style={{ marginBottom: "2px", display: "flex", alignItems: "flex-start", gap: 4, listStyle: "none" }}>
                          <span>•</span>
                          <E value={b} onChange={(v) => updateBulletField(ei, ri, bi, v)} style={{ flex: 1 }} />
                          <IconBtn onClick={() => copyBullet(ei, ri, bi)} color="#6366f1" style={{ padding: "1px 2px" }}><Copy size={6} /></IconBtn>
                          <IconBtn onClick={() => removeBullet(ei, ri, bi)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={6} /></IconBtn>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                
              </div>
            ))}
          </div>

          <div>
            <MainHead showAdd={true} onAdd={addProject}>
              <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
            </MainHead>
            
            {projects.map((proj, i) => (
              <div key={i} className="hoverable-row" style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                  <E value={proj.title} onChange={(v) => updateProjectField(i, "title", v)} style={{ fontWeight: "bold", display: "block", flex: 1 }} />
                  <div style={{ display: "flex", gap: 3 }}>
                    <IconBtn onClick={() => copyProject(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                    <IconBtn onClick={() => removeProject(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                  </div>
                </div>
                <E value={proj.description} onChange={(v) => updateProjectField(i, "description", v)} block style={{ fontSize: "10px", color: gray, marginTop: "2px" }} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default ModernTemplate;