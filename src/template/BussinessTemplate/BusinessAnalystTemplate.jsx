import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";
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

const primary = "#111827";
const secondary = "#4b5563";
const borderCol = "#e5e7eb";

const getInitialData = () => ({
  name: "FIRST LAST",
  location: "New York, USA",
  phone: "+1-234-456-789",
  email: "analyst@business.com",
  linkedin: "linkedin.com/in/username",
  objectiveTitle: "Professional Summary",
  experienceTitle: "Work Experience",
  projectTitle: "Key Projects",
  educationTitle: "Education",
  skillsTitle: "Core Skills",
  certificationTitle: "Certifications",
  objective: `Results-driven Business Analyst with 5+ years of experience translating complex business needs into actionable insights. Proficient in data analysis, process optimization, and stakeholder management.`,
  skills: [
    ["Data Analysis", "SQL", "Excel", "Power BI"],
    ["Stakeholder Mgmt", "Agile", "JIRA", "Confluence"],
  ],
  experience: [
    {
      company: "Accenture Pvt. Ltd.",
      period: "2020 – Present",
      roles: [{
        title: "Senior Business Analyst",
        bullets: [
          "Led requirements gathering for a $2M digital transformation project.",
          "Reduced process inefficiencies by 35% through workflow redesign.",
          "Collaborated with cross-functional teams of 20+ stakeholders.",
          "Delivered weekly KPI dashboards using Power BI and SQL.",
        ],
      }],
    },
    {
      company: "InfoSys Ltd.",
      period: "2017 – 2020",
      roles: [{
        title: "Business Analyst",
        bullets: [
          "Documented 50+ functional and non-functional requirements.",
          "Conducted gap analysis and presented findings to C-suite executives.",
        ],
      }],
    },
  ],
  education: [{
    school: "IIM Ahmedabad",
    year: "2017",
    degree: "MBA, Business Analytics",
  }],
  projects: [
    { title: "ERP Migration", description: "Led end-to-end business analysis for SAP ERP migration covering 8 departments." },
    { title: "Customer 360 Portal", description: "Defined requirements for a unified CRM portal serving 500K+ customers." },
  ],
  certifications: [
    "CBAP – Certified Business Analysis Professional",
    "PMI-PBA – Professional in Business Analysis",
  ],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1.5px solid ${primary}`, marginBottom: "8px", paddingBottom: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const BusinessAnalystTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setDataFunc = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setDataFunc({ ...ref.current, [f]: v });

  // ========== EXPERIENCE FUNCTIONS ==========
  const addExperience = () => {
    u("experience", [...ref.current.experience, { company: "New Company", period: "Date", roles: [{ title: "New Role", bullets: ["New bullet point"] }] }]);
  };
  const removeExperience = (i) => u("experience", ref.current.experience.filter((_, idx) => idx !== i));
  const copyExperience = (i) => {
    const expToCopy = JSON.parse(JSON.stringify(ref.current.experience[i]));
    expToCopy.company = expToCopy.company + " (Copy)";
    u("experience", [...ref.current.experience, expToCopy]);
  };

  // ========== ROLE FUNCTIONS ==========
  const addRole = (ei) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: [...exp.roles, { title: "New Role", bullets: ["New bullet point"] }] } : exp);
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
  const addEducation = () => u("education", [...ref.current.education, { degree: "New Degree", school: "New School", year: "Year" }]);
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
  const updateCertField = (i, value) => {
    const up = ref.current.certifications.map((c, idx) => idx === i ? value : c);
    u("certifications", up);
  };

  const { name, location, phone, email, linkedin, objectiveTitle, experienceTitle, projectTitle, educationTitle, skillsTitle, certificationTitle, objective, projects, certifications, experience, education, skills } = data;

  // Flatten skills for display
  const flatSkills = skills.flat();

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", fontSize: "11px", lineHeight: "1.5", backgroundColor: "#fff", color: primary, boxSizing: "border-box", padding: "15mm" }}>

        {/* MINIMAL HEADER */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }} />
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "8px", fontSize: "11px", color: secondary }}>
            <E value={location} onChange={(v) => u("location", v)} />
            <span>•</span>
            <E value={phone} onChange={(v) => u("phone", v)} />
            <span>•</span>
            <E value={email} onChange={(v) => u("email", v)} />
            <span>•</span>
            <E value={linkedin} onChange={(v) => u("linkedin", v)} />
          </div>
        </div>

        {/* SUMMARY */}
        <div style={{ marginBottom: "20px" }}>
          <SectionTitle>
            <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
          </SectionTitle>
          <E value={objective} onChange={(v) => u("objective", v)} block style={{ color: secondary, lineHeight: "1.6" }} />
        </div>

        {/* EXPERIENCE */}
        <div style={{ marginBottom: "20px" }}>
          <SectionTitle showAdd={true} onAdd={addExperience}>
            <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
          </SectionTitle>

          {experience.map((exp, ei) => (
            <div key={ei} className="hoverable-row"
              style={{
                borderBottom: ei !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none",
                marginBottom: ei !== data.experience.length - 1 ? "5px" : "0",  /*  added */
                paddingBottom: ei !== data.experience.length - 1 ? "5px" : "0", /*  added */
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "bold", fontSize: "12px" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} />
                  <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                  <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                </div>
              </div>

              {exp.roles.map((role, ri) => (
                <div key={ri} className="hoverable-row" style={{ marginTop: "6px", marginLeft: "8px", borderLeft: `2px solid ${primary}`, paddingLeft: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                    <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontWeight: "600", color: secondary, fontSize: "11px", display: "block", marginBottom: "4px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                      <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                      <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                    </div>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "15px" }}>
                    {role.bullets.map((b, bi) => (
                      <li key={bi} className="hoverable-row" style={{ marginBottom: "3px", color: secondary, display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
                        <span>•</span>
                        <E value={b} onChange={(v) => updateBulletField(ei, ri, bi, v)} style={{ flex: 1 }} />
                        <IconBtn onClick={() => copyBullet(ei, ri, bi)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={6} /></IconBtn>
                        <IconBtn onClick={() => removeBullet(ei, ri, bi)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={6} /></IconBtn>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}


            </div>
          ))}
        </div>

        {/* SKILLS */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1.5px solid ${primary}`, marginBottom: "8px", paddingBottom: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            <IconBtn onClick={addSkillRow} color="#6366f1"><Plus size={9} /> Add Row</IconBtn>
          </div>

          {skills.map((row, ri) => (
            <div key={ri} className="hoverable-row" style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 15px", alignItems: "center" }}>
                {row.map((skill, ci) => (
                  <span key={ci} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <E value={skill} onChange={(v) => updateSkillItem(ri, ci, v)} />
                    <IconBtn onClick={() => removeSkillItem(ri, ci)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={6} /></IconBtn>
                    {ci !== row.length - 1 && <span style={{ color: borderCol }}>|</span>}
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
        </div>

        {/* TWO COLUMN BOTTOM SECTION */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>

          {/* PROJECTS */}
          <div>
            <SectionTitle showAdd={true} onAdd={addProject}>
              <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
            </SectionTitle>
            {projects.map((proj, i) => (
              <div key={i} className="hoverable-row" style={{ marginBottom: "12px", borderBottom: i !== projects.length - 1 ? `1px dashed ${borderCol}` : "none", paddingBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                  <E value={proj.title} onChange={(v) => updateProjectField(i, "title", v)} style={{ fontWeight: "bold", fontSize: "11px", display: "block", flex: 1 }} />
                  <div style={{ display: "flex", gap: 3 }}>
                    <IconBtn onClick={() => copyProject(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                    <IconBtn onClick={() => removeProject(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                  </div>
                </div>
                <E value={proj.description} onChange={(v) => updateProjectField(i, "description", v)} style={{ fontSize: "10.5px", color: secondary }} />
              </div>
            ))}
          </div>

          {/* EDUCATION & CERTS */}
          <div>
            <SectionTitle showAdd={true} onAdd={addEducation}>
              <E value={educationTitle} onChange={(v) => u("educationTitle", v)} />
            </SectionTitle>
            {education.map((edu, i) => (
              <div key={i} className="hoverable-row" style={{ marginBottom: "10px", borderBottom: i !== education.length - 1 ? `1px dashed ${borderCol}` : "none", paddingBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                  <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "bold", flex: 1 }} />
                  <div style={{ display: "flex", gap: 3 }}>
                    <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                    <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2px" }}>
                  <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "10.5px", color: secondary, flex: 1 }} />
                  <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontWeight: "bold" }} />
                </div>
              </div>
            ))}

            {/* CERTIFICATIONS */}
            <div style={{ marginTop: "20px" }}>
              <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1.5px solid ${primary}`, marginBottom: "8px", paddingBottom: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} />
                <IconBtn onClick={addCertification} color="#6366f1"><Plus size={8} /> Add</IconBtn>
              </div>
              {certifications.map((cert, i) => (
                <div key={i} className="hoverable-row" style={{ marginBottom: "6px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span>•</span>
                  <E value={cert} onChange={(v) => updateCertField(i, v)} style={{ flex: 1 }} />
                  <IconBtn onClick={() => copyCertification(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                  <IconBtn onClick={() => removeCertification(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default BusinessAnalystTemplate;