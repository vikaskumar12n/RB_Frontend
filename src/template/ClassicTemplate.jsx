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
const secondary = "#4b5563";
const divider = "#000000";

const getInitialData = () => ({
  name: "FIRST LAST",
  contact: "+1-234-456-789 | Bay Area, California",
  links: "professionalemail@resumeworded.com | linkedin.com/in/username",
  objectiveTitle: "OBJECTIVE",
  objective: `Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications. Proficient in front-end and back-end technologies, including HTML, CSS, JavaScript, React, Node.js, and database systems like MongoDB and MySQL.`,
  experienceTitle: "PROFESSIONAL EXPERIENCE",
  experience: [
    {
      company: "XYZ Solutions Pvt. Ltd.",
      period: "2018 – Present",
      roles: [{
        title: "Front End Developer, React",
        bullets: [
          "Contributed to the development of a full-scale CRM (DSS) project.",
          "Built and integrated key modules like Finance, Accounts, and HR.",
          "Improved system performance through efficient backend logic and clean architecture.",
          "Collaborated with the team to deliver real-world business features.",
        ],
      }],
    },
    {
      company: "Technano Pvt. Ltd., Noida",
      period: "2014 – 2017",
      roles: [{
        title: "Front End Developer",
        bullets: [
          "Built fast and accessible websites improving load time by 22%.",
          "Converted UI/UX wireframes into responsive code.",
        ],
      }],
    },
  ],
  projectTitle: "PROJECTS",
  projects: [
    {
      title: "CRM (Customer Relationship Management)",
      description: "Worked on a complete CRM system with Finance, Accounts, and HR modules.",
    },
    {
      title: "E-commerce Website",
      description: "Developed full stack e-commerce platform with authentication and payment integration.",
    },
  ],
  skillsTitle: "SKILLS",
  skillsList: "HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, SQL, Git, RESTful APIs",
  educationTitle: "EDUCATION",
  education: [{
    school: "Millennium Group of Institutions",
    year: "2013",
    degree: "Bachelor of Engineering, Information Technology",
  }],
  certificationTitle: "CERTIFICATIONS",
  certifications: [
    "Full Stack Web Development - Udemy",
    "React Developer Certification",
  ],
});

const ClassicTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

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
  const addEducation = () => u("education", [...ref.current.education, { school: "New School", year: "Year", degree: "New Degree" }]);
  const removeEducation = (i) => u("education", ref.current.education.filter((_, idx) => idx !== i));
  const copyEducation = (i) => {
    const eduToCopy = JSON.parse(JSON.stringify(ref.current.education[i]));
    eduToCopy.school = eduToCopy.school + " (Copy)";
    u("education", [...ref.current.education, eduToCopy]);
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

  const {
    name, contact, links, objectiveTitle, objective, experienceTitle, experience,
    projectTitle, projects, skillsTitle, skillsList, educationTitle, education,
    certificationTitle, certifications
  } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Georgia', serif", backgroundColor: "#fff", color: black, padding: "12mm", boxSizing: "border-box" }}>
        
        {/* HEADER - CENTERED */}
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "1px", textTransform: "uppercase" }} />
          <div style={{ fontSize: "10px", marginTop: "3px", color: secondary }}>
            <E value={contact} onChange={(v) => u("contact", v)} />
          </div>
          <div style={{ fontSize: "10px", fontWeight: "bold", marginTop: "1px" }}>
            <E value={links} onChange={(v) => u("links", v)} />
          </div>
        </div>

        {/* OBJECTIVE */}
        <div style={{ marginBottom: "12px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "bold", borderBottom: `1px solid ${divider}`, paddingBottom: "4px", marginBottom: "6px", textTransform: "uppercase", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
          </h3>
          <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "10px", lineHeight: "1.4", textAlign: "justify" }} />
        </div>

        {/* EXPERIENCE */}
        <div style={{ marginBottom: "12px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "bold", borderBottom: `1px solid ${divider}`, paddingBottom: "4px", marginBottom: "8px", textTransform: "uppercase", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            <IconBtn onClick={addExperience} color="#6366f1"><Plus size={9} /> Add Company</IconBtn>
          </h3>

          {experience.map((exp, ei) => (
            <div key={ei} className="hoverable-row" style={{ marginBottom: "10px", borderBottom: ei !== experience.length - 1 ? `1px dashed #e5e7eb` : "none", paddingBottom: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "bold", fontSize: "10.5px" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} style={{ fontSize: "10px", color: secondary }} />
                  <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                  <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                </div>
              </div>

              {exp.roles.map((role, ri) => (
                <div key={ri} className="hoverable-row" style={{ marginTop: "5px", marginLeft: "8px", borderLeft: `1px solid ${divider}`, paddingLeft: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                    <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontSize: "10px", fontStyle: "italic", display: "block", color: secondary }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                      <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                      <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                    </div>
                  </div>
                  <ul style={{ margin: "3px 0 0 0", paddingLeft: "15px", fontSize: "10px" }}>
                    {role.bullets.map((b, bi) => (
                      <li key={bi} className="hoverable-row" style={{ marginBottom: "2px", display: "flex", alignItems: "flex-start", gap: 4, listStyle: "none" }}>
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

        {/* PROJECTS */}
        <div style={{ marginBottom: "12px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "bold", borderBottom: `1px solid ${divider}`, paddingBottom: "4px", marginBottom: "6px", textTransform: "uppercase", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
            <IconBtn onClick={addProject} color="#6366f1"><Plus size={9} /> Add Project</IconBtn>
          </h3>
          {projects.map((proj, i) => (
            <div key={i} className="hoverable-row" style={{ marginBottom: "5px", fontSize: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                <span style={{ fontWeight: "bold", flex: 1 }}>
                  <E value={proj.title} onChange={(v) => updateProjectField(i, "title", v)} />
                </span>
                <div style={{ display: "flex", gap: 3 }}>
                  <IconBtn onClick={() => copyProject(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                  <IconBtn onClick={() => removeProject(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                </div>
              </div>
              <E value={proj.description} onChange={(v) => updateProjectField(i, "description", v)} block style={{ marginLeft: "0px" }} />
            </div>
          ))}
        </div>

        {/* SKILLS */}
        <div style={{ marginBottom: "12px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "bold", borderBottom: `1px solid ${divider}`, paddingBottom: "4px", marginBottom: "6px", textTransform: "uppercase" }}>
            <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
          </h3>
          <div style={{ fontSize: "10px", lineHeight: "1.4" }}>
            <E value={skillsList} onChange={(v) => u("skillsList", v)} />
          </div>
        </div>

        {/* EDUCATION */}
        <div style={{ marginBottom: "12px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "bold", borderBottom: `1px solid ${divider}`, paddingBottom: "4px", marginBottom: "6px", textTransform: "uppercase", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <E value={educationTitle} onChange={(v) => u("educationTitle", v)} />
            <IconBtn onClick={addEducation} color="#6366f1"><Plus size={9} /> Add Education</IconBtn>
          </h3>
          {education.map((edu, i) => (
            <div key={i} className="hoverable-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4, fontSize: "10px", marginBottom: "4px" }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: "bold" }}><E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} /></span> | <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <span style={{ fontWeight: "bold" }}><E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} /></span>
                <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
              </div>
            </div>
          ))}
        </div>

        {/* CERTIFICATIONS */}
        <div>
          <h3 style={{ fontSize: "11px", fontWeight: "bold", borderBottom: `1px solid ${divider}`, paddingBottom: "4px", marginBottom: "6px", textTransform: "uppercase", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} />
            <IconBtn onClick={addCertification} color="#6366f1"><Plus size={9} /> Add Certification</IconBtn>
          </h3>
          <ul style={{ margin: "0", paddingLeft: "15px", fontSize: "10px" }}>
            {certifications.map((cert, i) => (
              <li key={i} className="hoverable-row" style={{ marginBottom: "2px", display: "flex", alignItems: "flex-start", gap: 4, listStyle: "none" }}>
                <span>•</span>
                <E value={cert} onChange={(v) => { const a = ref.current.certifications.map((c, idx) => idx === i ? v : c); u("certifications", a); }} style={{ flex: 1 }} />
                <IconBtn onClick={() => copyCertification(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                <IconBtn onClick={() => removeCertification(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
};

export default ClassicTemplate;