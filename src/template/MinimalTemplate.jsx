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
  objective: `Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications. Proficient in front-end and back-end technologies, including HTML, CSS, JavaScript, React, Node.js, and database systems like MongoDB and MySQL. Skilled in problem-solving, collaboration, and delivering user-focused solutions. Passionate about leveraging cutting-edge technologies to create seamless, innovative digital experiences.`,
  projects: [
    {
      title: "CRM(Customer RelationShip Management)",
      description: `Worked on a complete CRM system that includes multiple business-critical modules. Contributed actively to Finance Module, Accounts Module, HR Module.`,
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
            "Improved system performance through efficient backend logic and clean architecture.",
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

const MinimalTemplate = ({ data: propData, setData: setPropData }) => {
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

  const SectionLabel = ({ children, onAdd, showAdd = false }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0 6px" }}>
      <span style={{
        fontSize: "7.5px",
        fontFamily: "'Trebuchet MS', sans-serif",
        letterSpacing: "3px",
        textTransform: "uppercase",
        fontWeight: "bold",
        color: "#111",
        whiteSpace: "nowrap",
      }}>
        {children}
      </span>
      <div style={{ flex: 1, height: "1px", background: "#bbb" }} />
      {showAdd && onAdd && (
        <IconBtn onClick={onAdd} color="#6366f1" style={{ marginLeft: "auto" }}>
          <Plus size={9} /> Add
        </IconBtn>
      )}
    </div>
  );

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
            fontFamily: "'Georgia', Times, serif",
            fontSize: "10px",
            backgroundColor: "#fff",
            color: "#111",
            boxSizing: "border-box",
            padding: "12mm 14mm",
          }}
        >
          {/* HEADER */}
          <div style={{ borderBottom: "2px solid #111", paddingBottom: "8px", marginBottom: "2px" }}>
            <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "26px", fontWeight: "bold", fontFamily: "'Georgia', serif", letterSpacing: "1px", color: "#111", lineHeight: 1.1 }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0 18px", marginTop: "6px", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "8.5px", color: "#555" }}>
              {[
                [location, "location"],
                [phone, "phone"],
                [email, "email"],
                [linkedin, "linkedin"],
              ].map(([val, key], idx) => (
                <span key={key} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  {idx !== 0 && <span style={{ color: "#ccc", marginRight: "14px" }}>·</span>}
                  <E value={val} onChange={(v) => u(key, v)} style={{ color: "#555" }} />
                </span>
              ))}
            </div>
          </div>

          {/* OBJECTIVE */}
          <SectionLabel>
            <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
          </SectionLabel>
          <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "9.5px", fontFamily: "'Trebuchet MS', sans-serif", lineHeight: "1.75", color: "#333" }} />

          {/* EXPERIENCE */}
          <SectionLabel showAdd={true} onAdd={addExperience}>
            <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
          </SectionLabel>

          {experience.map((exp, ei) => (
            <div key={ei} className="hoverable-row" style={{ marginBottom: "12px", borderBottom: ei !== experience.length - 1 ? "1px dashed #e5e7eb" : "none", paddingBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "bold", fontSize: "10.5px", fontFamily: "'Georgia', serif", color: "#111" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} style={{ fontSize: "8.5px", color: "#888", whiteSpace: "nowrap" }} />
                  <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                  <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                </div>
              </div>

              {exp.roles.map((role, ri) => (
                <div key={ri} className="hoverable-row" style={{ marginTop: "6px", paddingLeft: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                    <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontSize: "9px", fontFamily: "'Trebuchet MS', sans-serif", fontStyle: "italic", color: "#555", flex: 1 }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <E value={role.period} onChange={(v) => updateRoleField(ei, ri, "period", v)} style={{ fontSize: "8.5px", color: "#aaa", whiteSpace: "nowrap" }} />
                      <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                      <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                      <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                    </div>
                  </div>

                  {role.bullets.map((b, bi) => (
                    <div key={bi} className="hoverable-row" style={{ display: "flex", gap: "6px", alignItems: "flex-start", marginTop: "3px" }}>
                      <span style={{ fontSize: "8px", color: "#aaa", marginTop: "3px", flexShrink: 0 }}>◦</span>
                      <E value={b} onChange={(v) => updateBulletField(ei, ri, bi, v)} style={{ fontSize: "9.5px", fontFamily: "'Trebuchet MS', sans-serif", lineHeight: "1.6", color: "#333", flex: 1 }} />
                      <IconBtn onClick={() => copyBullet(ei, ri, bi)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={6} /></IconBtn>
                      <IconBtn onClick={() => removeBullet(ei, ri, bi)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={6} /></IconBtn>
                    </div>
                  ))}
                </div>
              ))}

               
            </div>
          ))}

          {/* PROJECTS */}
          <SectionLabel showAdd={true} onAdd={addProject}>
            <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
          </SectionLabel>

          {projects.map((proj, i) => (
            <div key={i} className="hoverable-row" style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                <E value={proj.title} onChange={(v) => updateProjectField(i, "title", v)} style={{ fontSize: "10px", fontWeight: "bold", fontFamily: "'Georgia', serif", color: "#111", flex: 1 }} />
                <div style={{ display: "flex", gap: 3 }}>
                  <IconBtn onClick={() => copyProject(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                  <IconBtn onClick={() => removeProject(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                </div>
              </div>
              <E value={proj.description} onChange={(v) => updateProjectField(i, "description", v)} block style={{ fontSize: "9.5px", fontFamily: "'Trebuchet MS', sans-serif", lineHeight: "1.6", color: "#444" }} />
            </div>
          ))}

          {/* EDUCATION */}
          <SectionLabel showAdd={true} onAdd={addEducation}>
            <E value={educationTitle} onChange={(v) => u("educationTitle", v)} />
          </SectionLabel>

          {education.map((edu, i) => (
            <div key={i} className="hoverable-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
              <div style={{ flex: 1 }}>
                <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontWeight: "bold", fontSize: "10.5px", fontFamily: "'Georgia', serif", color: "#111" }} />
                <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} block style={{ fontSize: "9px", fontFamily: "'Trebuchet MS', sans-serif", fontStyle: "italic", color: "#555" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "8.5px", color: "#888", whiteSpace: "nowrap" }} />
                <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
              </div>
            </div>
          ))}

          {/* SKILLS */}
          <SectionLabel showAdd={true} onAdd={addSkill}>
            <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
          </SectionLabel>

          {skills.map((row, ri) => (
            <div key={ri} className="hoverable-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
              {row.map((skill, ci) => (
                <div key={ci} style={{ display: "inline-flex", alignItems: "center", gap: "2px", background: "#f5f5f5", borderRadius: "2px", padding: "2px 6px" }}>
                  <E value={skill} onChange={(v) => updateSkillItem(ri, ci, v)} style={{ fontSize: "8.5px", color: "#222" }} />
                  <IconBtn onClick={() => removeSkillItem(ri, ci)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={6} /></IconBtn>
                </div>
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
          <SectionLabel showAdd={true} onAdd={addCertification}>
            <E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} />
          </SectionLabel>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 24px" }}>
            {certifications.map((cert, i) => (
              <div key={i} className="hoverable-row" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ fontSize: "8px", color: "#aaa" }}>—</span>
                <E value={cert} onChange={(v) => { const a = ref.current.certifications.map((c, j) => j === i ? v : c); u("certifications", a); }} style={{ fontSize: "9.5px", color: "#333" }} />
                <IconBtn onClick={() => copyCertification(i)} color="#6366f1" style={{ padding: "1px 2px" }}><Copy size={6} /></IconBtn>
                <IconBtn onClick={() => removeCertification(i)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={6} /></IconBtn>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MinimalTemplate;