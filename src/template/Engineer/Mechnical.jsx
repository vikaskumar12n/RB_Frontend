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

const black = "#000000";
const darkGray = "#374151";
const lightGray = "#9ca3af";
const borderCol = "#000000";

const getInitialData = () => ({
  name: "MECHANICAL ENGINEER NAME",
  title: "Senior Design Engineer | Manufacturing Specialist",
  location: "Pune, Maharashtra",
  phone: "+91-77777-66666",
  email: "mech.pro@engineering.com",
  linkedin: "linkedin.com/in/mechanical-pro",
  summaryTitle: "Professional Profile",
  experienceTitle: "Professional Experience",
  skillsTitle: "Core Competencies",
  toolsTitle: "Software & Tools",
  eduTitle: "Education",
  summary: `Detail-oriented Mechanical Engineer with 5+ years of experience in product design, R&D, and manufacturing processes. Proficient in 3D modeling, finite element analysis (FEA), and thermal systems. Expert in optimizing production workflows and reducing manufacturing costs while maintaining high-quality standards.`,
  skills: [
    "Product Design (CAD/CAM)", "Finite Element Analysis", "HVAC Systems",
    "Thermodynamics", "Robotics & Automation", "Six Sigma & Lean Mfg"
  ],
  tools: [
    "SolidWorks", "AutoCAD", "CATIA", "ANSYS", "MATLAB"
  ],
  experience: [
    {
      company: "Tata Motors / Mahindra & Mahindra",
      period: "2021 – Present",
      roles: [{
        title: "Senior Design Engineer",
        bullets: [
          "Leading a team of 5 in the design and development of automotive chassis components.",
          "Performing stress analysis and CFD simulations to ensure component durability.",
          "Collaborating with vendors to source high-grade materials, reducing costs by 10%.",
          "Implementing Lean Manufacturing principles to improve assembly line efficiency."
        ],
      }],
    },
    {
      company: "Precision Tools Pvt Ltd.",
      period: "2018 – 2021",
      roles: [{
        title: "Mechanical Site Engineer",
        bullets: [
          "Supervised the installation and commissioning of heavy industrial machinery.",
          "Maintained 99% equipment uptime through proactive preventive maintenance schedules."
        ],
      }],
    },
  ],
  education: [{
    school: "National Institute of Technology (NIT)",
    year: "2018",
    degree: "B.Tech in Mechanical Engineering",
  }],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "12px", fontWeight: "bold", paddingBottom: "6px", textTransform: "uppercase", borderBottom: `1.5px solid ${black}`, marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const MechanicalSimpleTemplate = ({ data: propData, setData: setPropData }) => {
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

  // ========== SKILLS FUNCTIONS ==========
  const addSkill = () => u("skills", [...ref.current.skills, "New skill"]);
  const removeSkill = (i) => u("skills", ref.current.skills.filter((_, idx) => idx !== i));
  const copySkill = (i) => u("skills", [...ref.current.skills, ref.current.skills[i] + " (Copy)"]);

  // ========== TOOLS FUNCTIONS ==========
  const addTool = () => u("tools", [...ref.current.tools, "New tool"]);
  const removeTool = (i) => u("tools", ref.current.tools.filter((_, idx) => idx !== i));
  const copyTool = (i) => u("tools", [...ref.current.tools, ref.current.tools[i] + " (Copy)"]);

  // ========== EDUCATION FUNCTIONS ==========
  const addEducation = () => u("education", [...ref.current.education, { degree: "New Degree", school: "New School", year: "Year" }]);
  const removeEducation = (i) => u("education", ref.current.education.filter((_, idx) => idx !== i));
  const copyEducation = (i) => {
    const eduToCopy = JSON.parse(JSON.stringify(ref.current.education[i]));
    eduToCopy.school = eduToCopy.school + " (Copy)";
    u("education", [...ref.current.education, eduToCopy]);
  };

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
  const updateSkillField = (i, value) => {
    const up = ref.current.skills.map((s, idx) => idx === i ? value : s);
    u("skills", up);
  };
  const updateToolField = (i, value) => {
    const up = ref.current.tools.map((t, idx) => idx === i ? value : t);
    u("tools", up);
  };
  const updateEduField = (i, field, value) => {
    const up = ref.current.education.map((edu, idx) => idx === i ? { ...edu, [field]: value } : edu);
    u("education", up);
  };

  const { name, title, location, phone, email, linkedin, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Times New Roman', Times, serif", backgroundColor: "#fff", color: black, padding: "15mm", boxSizing: "border-box" }}>

        {/* HEADER SECTION - CENTERED & BOLD */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "24px", fontWeight: "bold", textTransform: "uppercase" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "13px", fontWeight: "bold", marginTop: "3px" }} />
          <div style={{ fontSize: "11px", marginTop: "8px" }}>
            <E value={location} onChange={(v) => u("location", v)} /> | <E value={phone} onChange={(v) => u("phone", v)} /> | <E value={email} onChange={(v) => u("email", v)} />
          </div>
          <div style={{ fontSize: "11px", marginTop: "2px", fontWeight: "bold" }}>
            <E value={linkedin} onChange={(v) => u("linkedin", v)} />
          </div>
        </div>

        {/* SUMMARY */}
        <div style={{ marginBottom: "20px" }}>
          <SectionTitle>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </SectionTitle>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.4", textAlign: "justify" }} />
        </div>

        {/* WORK EXPERIENCE */}
        <div style={{ marginBottom: "20px" }}>
          <SectionTitle showAdd={true} onAdd={addExperience}>
            <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
          </SectionTitle>

          {experience.map((exp, ei) => (
            <div key={ei} className="hoverable-row" style={{
              borderBottom: ei !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none",
              marginBottom: ei !== data.experience.length - 1 ? "5px" : "0",  /*  added */
              paddingBottom: ei !== data.experience.length - 1 ? "5px" : "0", /*  added */
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "bold", fontSize: "11px" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} />
                  <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                  <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                </div>
              </div>

              {exp.roles.map((role, ri) => (
                <div key={ri} className="hoverable-row" style={{ marginTop: "6px", marginLeft: "10px", borderLeft: `1px solid ${borderCol}`, paddingLeft: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                    <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontWeight: "bold", fontSize: "11px", fontStyle: "italic", display: "block" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                      <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                      <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                    </div>
                  </div>
                  <ul style={{ margin: "5px 0", paddingLeft: "25px" }}>
                    {role.bullets.map((b, bi) => (
                      <li key={bi} className="hoverable-row" style={{ fontSize: "10.5px", marginBottom: "3px", display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
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

        {/* SKILLS, TOOLS & EDUCATION - TWO COLUMN LAYOUT */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>

          {/* COLUMN 1: SKILLS & TOOLS */}
          <div>
            <SectionTitle showAdd={true} onAdd={addSkill}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </SectionTitle>
            <div style={{ fontSize: "10.5px", lineHeight: "1.6" }}>
              {skills.map((s, i) => (
                <span key={i} className="hoverable-row" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <E value={s} onChange={(v) => updateSkillField(i, v)} />
                  <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 2px" }}><Copy size={6} /></IconBtn>
                  <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={6} /></IconBtn>
                  {i !== skills.length - 1 ? " • " : ""}
                </span>
              ))}
            </div>

            <div style={{ marginTop: "20px" }}>
              <SectionTitle showAdd={true} onAdd={addTool}>
                <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
              </SectionTitle>
              <div style={{ fontSize: "10.5px" }}>
                {tools.map((tool, i) => (
                  <div key={i} className="hoverable-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px", gap: 6 }}>
                    <E value={tool} onChange={(v) => updateToolField(i, v)} style={{ flex: 1 }} />
                    <IconBtn onClick={() => copyTool(i)} color="#6366f1" style={{ padding: "1px 2px" }}><Copy size={6} /></IconBtn>
                    <IconBtn onClick={() => removeTool(i)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={6} /></IconBtn>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2: EDUCATION */}
          <div>
            <SectionTitle showAdd={true} onAdd={addEducation}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </SectionTitle>
            {education.map((edu, i) => (
              <div key={i} className="hoverable-row" style={{ marginBottom: "12px", borderBottom: i !== education.length - 1 ? `1px dashed ${lightGray}` : "none", paddingBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                  <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "bold", fontSize: "11px", flex: 1 }} />
                  <div style={{ display: "flex", gap: 3 }}>
                    <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                    <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                  </div>
                </div>
                <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "10.5px" }} />
                <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "10.5px", fontWeight: "bold" }} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default MechanicalSimpleTemplate;