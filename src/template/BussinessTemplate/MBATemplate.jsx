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

const primary = "#000000";
const secondary = "#4b5563";
const line = "#e5e7eb";

const getInitialData = () => ({
  name: "FIRST LAST",
  location: "Bangalore, India",
  phone: "+91-234-456-789",
  email: "mba@corporate.com",
  linkedin: "linkedin.com/in/username",
  objectiveTitle: "Profile Summary",
  experienceTitle: "Professional Experience",
  projectTitle: "Academic Projects",
  educationTitle: "Education",
  skillsTitle: "Key Skills",
  certificationTitle: "Certifications",
  objective: `High-performing MBA Graduate with specialization in Finance & Strategy. Strong foundation in corporate finance, strategic management, and organizational behavior. Seeking to leverage academic excellence and internship experience to drive business growth in a dynamic corporate environment.`,
  skills: [
    ["Financial Modeling", "Strategy", "Excel", "Python"],
    ["Market Research", "Consulting", "PowerPoint", "Tableau"],
  ],
  experience: [
    {
      company: "Deloitte India",
      period: "Summer 2023",
      roles: [{
        title: "Strategy Intern",
        bullets: [
          "Conducted industry analysis for a $500M M&A deal in the pharma sector.",
          "Developed financial models and valuation reports for 3 client engagements.",
          "Presented recommendations to senior management resulting in client retention.",
        ],
      }],
    },
    {
      company: "HDFC Bank",
      period: "Winter 2022",
      roles: [{
        title: "Corporate Banking Intern",
        bullets: [
          "Assisted in credit appraisal of SME loan applications worth ₹50Cr+.",
          "Prepared sector research reports on FMCG and Auto industries.",
        ],
      }],
    },
  ],
  education: [
    { school: "IIM Calcutta", year: "2022–2024", degree: "MBA – Finance & Strategy" },
    { school: "Delhi University", year: "2019–2022", degree: "B.Com (Hons.) – 9.1 CGPA" },
  ],
  projects: [
    { title: "Merger Analysis", description: "Analyzed synergies in a hypothetical $200M tech merger — presented DCF, comparable company analysis and accretion/dilution model." },
    { title: "Go-to-Market Plan", description: "Developed complete GTM strategy for a fintech startup as part of strategy consulting simulation." },
  ],
  certifications: [
    "CFA Level 1 – Cleared",
    "Financial Modeling & Valuation – Wall Street Prep",
  ],
});

const SHead = ({ children, onAdd, showAdd = false }) => (
  <div style={{ marginTop: "16px", marginBottom: "6px", borderBottom: `1px solid ${primary}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span style={{ fontSize: "11px", paddingBottom: "5px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: primary }}>
      {children}
    </span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const MBATemplate = ({ data: propData, setData: setPropData }) => {
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

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Times New Roman', serif", fontSize: "11px", lineHeight: "1.4", backgroundColor: "#fff", color: primary, boxSizing: "border-box", padding: "15mm" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "26px", paddingBottom: "6px", fontWeight: "bold", textTransform: "uppercase" }} />
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "5px", fontSize: "10px", color: secondary }}>
            <E value={location} onChange={(v) => u("location", v)} />
            <span>|</span>
            <E value={phone} onChange={(v) => u("phone", v)} />
            <span>|</span>
            <E value={email} onChange={(v) => u("email", v)} />
            <span>|</span>
            <E value={linkedin} onChange={(v) => u("linkedin", v)} />
          </div>
        </div>

        {/* SUMMARY */}
        <SHead>
          <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
        </SHead>
        <E value={objective} onChange={(v) => u("objective", v)} block style={{ marginTop: "4px", textAlign: "justify", paddingBottom: "5px" }} />

        {/* EDUCATION - Moved to top for MBA Students */}
        <SHead showAdd={true} onAdd={addEducation}>
          <E value={educationTitle} onChange={(v) => u("educationTitle", v)} />
        </SHead>

        {education.map((edu, i) => (
          <div key={i} className="hoverable-row" style={{ marginBottom: "8px", borderBottom: i !== education.length - 1 ? `1px dashed ${line}` : "none", paddingBottom: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
              <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontWeight: "bold", flex: 1 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} />
                <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
              </div>
            </div>
            <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontStyle: "italic" }} />
          </div>
        ))}

        {/* EXPERIENCE */}
        <SHead showAdd={true} onAdd={addExperience}>
          <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
        </SHead>

        {experience.map((exp, ei) => (
          <div key={ei} className="hoverable-row" style={{
            borderBottom: ei !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none",
            marginBottom: ei !== data.experience.length - 1 ? "5px" : "0",  /*  added */
            paddingBottom: ei !== data.experience.length - 1 ? "5px" : "0", /*  added */
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
              <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "bold" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} />
                <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
              </div>
            </div>

            {exp.roles.map((role, ri) => (
              <div key={ri} className="hoverable-row" style={{ marginTop: "4px", marginLeft: "8px", borderLeft: `1px solid ${line}`, paddingLeft: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                  <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontStyle: "italic", color: secondary }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                    <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                    <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                  </div>
                </div>
                <ul style={{ paddingLeft: "18px", margin: "4px 0" }}>
                  {role.bullets.map((b, bi) => (
                    <li key={bi} className="hoverable-row" style={{ marginBottom: "2px", display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
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

        {/* PROJECTS */}
        <SHead showAdd={true} onAdd={addProject}>
          <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
        </SHead>

        {projects.map((proj, i) => (
          <div key={i} className="hoverable-row" style={{ marginTop: "6px", marginBottom: "10px", borderBottom: i !== projects.length - 1 ? `1px dashed ${line}` : "none", paddingBottom: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
              <E value={proj.title} onChange={(v) => updateProjectField(i, "title", v)} style={{ fontWeight: "bold", display: "block", flex: 1 }} />
              <div style={{ display: "flex", gap: 3 }}>
                <IconBtn onClick={() => copyProject(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                <IconBtn onClick={() => removeProject(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
              </div>
            </div>
            <E value={proj.description} onChange={(v) => updateProjectField(i, "description", v)} />
          </div>
        ))}

        {/* SKILLS & CERTS (Side by Side) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", paddingBottom: "5px" }}>

          {/* SKILLS */}
          <div>
            <SHead showAdd={true} onAdd={addSkillRow}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </SHead>

            {skills.map((row, ri) => (
              <div key={ri} className="hoverable-row" style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 10px", alignItems: "center" }}>
                  {row.map((skill, ci) => (
                    <span key={ci} style={{ fontSize: "10.5px", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <span>•</span>
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
          </div>

          {/* CERTIFICATIONS */}
          <div>
            <SHead showAdd={true} onAdd={addCertification}>
              <E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} />
            </SHead>

            {certifications.map((cert, i) => (
              <div key={i} className="hoverable-row" style={{ fontSize: "10.5px", marginBottom: "4px", display: "flex", alignItems: "center", gap: 6 }}>
                <span>•</span>
                <E value={cert} onChange={(v) => updateCertField(i, v)} style={{ flex: 1 }} />
                <IconBtn onClick={() => copyCertification(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                <IconBtn onClick={() => removeCertification(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default MBATemplate;