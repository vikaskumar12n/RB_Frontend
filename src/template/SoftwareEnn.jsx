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
      title: "CRM(Customer RelationShip Management)",
      description: `Worked on a complete CRM system that includes multiple business-critical modules.`,
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
            "Collaborated with the team to deliver real-world business features.",
          ],
        },
      ],
    },
    {
      company: "Technano Pvt. Ltd., Noida",
      period: "2014 – 2017",
      roles: [
        {
          title: "Front End Developer",
          period: "",
          bullets: [
            "Built fast and accessible websites improving load time by 22%.",
            "Converted UI/UX wireframes into responsive code.",
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

const SectionHead = ({ title, onAdd, showAdd = false }) => (
  <div style={{ borderBottom: "1.5px solid #111", marginTop: "14px", marginBottom: "4px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 style={{
        fontSize: "10px",
        fontWeight: "bold",
        letterSpacing: "0.12em",
        textAlign: "center",
        textTransform: "uppercase",
        paddingBottom: "6px",
        margin: 0,
      }}>
        {title}
      </h2>
      {showAdd && onAdd && (
        <IconBtn onClick={onAdd} color="#6366f1" style={{ marginBottom: "4px" }}>
          <Plus size={9} /> Add
        </IconBtn>
      )}
    </div>
  </div>
);

const SoftwareEnn = ({ data: propData, setData: setPropData }) => {
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
  const addSkillRow = () => u("skills", [...ref.current.skills, ["New skill"]]);
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

  const {
    name, location, phone, email, linkedin,
    objectiveTitle, experienceTitle, projectTitle,
    educationTitle, skillsTitle, certificationTitle,
    objective, projects, certifications, experience, education, skills,
  } = data;

  return (
    <>
      <StyleInjector />
      <div style={{ position: "relative" }}>
        <div
          id="resume"
          style={{
            width: "210mm",
            minHeight: "297mm",
            padding: "12mm",
            background: "#fff",
            outline: "none",
            cursor: "text",
          }}
        >
          {/* HEADER */}
          <div style={{ textAlign: "center" }}>
            <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "22px", fontWeight: "bold" }} />
            <div><E value={location} onChange={(v) => u("location", v)} /></div>
            <div><E value={phone} onChange={(v) => u("phone", v)} /></div>
            <div><E value={email} onChange={(v) => u("email", v)} /></div>
            <div><E value={linkedin} onChange={(v) => u("linkedin", v)} /></div>
          </div>

          {/* OBJECTIVE */}
          <SectionHead title={<E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />} />
          <div style={{ marginTop: "2px" }}>
            <E value={objective} onChange={(v) => u("objective", v)} block style={{ lineHeight: "1", margin: 0, padding: 0, textAlign: "justify" }} />
          </div>

          {/* EXPERIENCE */}
          <SectionHead
            title={<E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />}
            showAdd={true}
            onAdd={addExperience}
          />

          {experience.map((exp, ei) => (
            <div key={ei} className="hoverable-row" style={{
              borderBottom: ei !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none",
              marginBottom: ei !== data.experience.length - 1 ? "5px" : "0",  /*  added */
              paddingBottom: ei !== data.experience.length - 1 ? "5px" : "0", /*  added */
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "bold", display: "block" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} style={{ whiteSpace: "nowrap", fontWeight: "bold" }} />
                  <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                  <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                </div>
              </div>

              {exp.roles.map((role, ri) => (
                <div key={ri} className="hoverable-row" style={{ marginTop: "6px", marginLeft: "8px", borderLeft: "1px solid #ccc", paddingLeft: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                    <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontWeight: "bold", display: "block" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <E value={role.period} onChange={(v) => updateRoleField(ei, ri, "period", v)} style={{ whiteSpace: "nowrap" }} />
                      <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                      <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                      <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                    </div>
                  </div>

                  {role.bullets.map((b, bi) => (
                    <div key={bi} className="hoverable-row" style={{ display: "flex", alignItems: "flex-start", gap: 4, marginTop: "3px" }}>
                      <span>•</span>
                      <E value={b} onChange={(v) => updateBulletField(ei, ri, bi, v)} style={{ flex: 1 }} />
                      <IconBtn onClick={() => copyBullet(ei, ri, bi)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={6} /></IconBtn>
                      <IconBtn onClick={() => removeBullet(ei, ri, bi)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={6} /></IconBtn>
                    </div>
                  ))}
                </div>
              ))}


            </div>
          ))}

          {/* PROJECTS */}
          <SectionHead
            title={<E value={projectTitle} onChange={(v) => u("projectTitle", v)} />}
            showAdd={true}
            onAdd={addProject}
          />

          {projects.map((p, i) => (
            <div key={i} className="hoverable-row" style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                <E value={p.title} onChange={(v) => updateProjectField(i, "title", v)} style={{ fontWeight: "bold", display: "block", flex: 1 }} />
                <div style={{ display: "flex", gap: 3 }}>
                  <IconBtn onClick={() => copyProject(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                  <IconBtn onClick={() => removeProject(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                </div>
              </div>
              <E value={p.description} onChange={(v) => updateProjectField(i, "description", v)} block style={{ marginTop: "0px" }} />
            </div>
          ))}

          {/* EDUCATION */}
          <SectionHead
            title={<E value={educationTitle} onChange={(v) => u("educationTitle", v)} />}
            showAdd={true}
            onAdd={addEducation}
          />

          {education.map((edu, i) => (
            <div key={i} className="hoverable-row" style={{ marginBottom: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontWeight: "bold" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ whiteSpace: "nowrap" }} />
                  <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                  <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                </div>
              </div>
              <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} block style={{ margin: 0, padding: 0, lineHeight: "1.2" }} />
            </div>
          ))}

          {/* SKILLS */}
          <SectionHead
            title={<E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />}
            showAdd={true}
            onAdd={addSkillRow}
          />

          {skills.map((row, ri) => (
            <div key={ri} className="hoverable-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
              {row.map((cell, ci) => (
                <span key={ci} style={{ display: "inline-flex", alignItems: "center", gap: "2px", background: "#f5f5f5", padding: "2px 6px", borderRadius: "3px" }}>
                  <E value={cell} onChange={(v) => updateSkillItem(ri, ci, v)} />
                  <IconBtn onClick={() => removeSkillItem(ri, ci)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={6} /></IconBtn>
                </span>
              ))}
              <IconBtn onClick={() => addSkillItem(ri)} color="#10b981" style={{ padding: "1px 3px" }}>
                <Plus size={7} /> Add
              </IconBtn>
              <IconBtn onClick={() => copySkillRow(ri)} color="#6366f1" style={{ padding: "1px 3px" }}>
                <Copy size={7} /> Copy Row
              </IconBtn>
              <IconBtn onClick={() => removeSkillRow(ri)} color="#ef4444" style={{ padding: "1px 3px" }}>
                <Trash2 size={7} /> Remove Row
              </IconBtn>
            </div>
          ))}

          {/* CERTIFICATIONS */}
          <SectionHead
            title={<E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} />}
            showAdd={true}
            onAdd={addCertification}
          />

          {certifications.map((c, i) => (
            <div key={i} className="hoverable-row" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "2px" }}>
              <span>•</span>
              <E value={c} onChange={(v) => { const a = ref.current.certifications.map((cert, j) => j === i ? v : cert); u("certifications", a); }} style={{ flex: 1 }} />
              <IconBtn onClick={() => copyCertification(i)} color="#6366f1"><Copy size={8} /></IconBtn>
              <IconBtn onClick={() => removeCertification(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SoftwareEnn;