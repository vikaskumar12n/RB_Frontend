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
const darkGray = "#4b5563";
const textGray = "#6b7280";
const white = "#ffffff";

const getInitialData = () => ({
  name: "OPERATIONS MANAGER",
  title: "Process Optimization | Supply Chain | Team Leadership",
  location: "New Delhi, India",
  phone: "+91-90000-88000",
  email: "ops.lead@efficiency.com",
  linkedin: "linkedin.com/in/ops-expert",
  summaryTitle: "Professional Summary",
  experienceTitle: "Core Experience",
  skillsTitle: "Operational Skills",
  toolsTitle: "Technical Proficiencies",
  eduTitle: "Education",
  summary: `Strategic Operations Manager with 10+ years of experience in streamlining business processes, reducing operational costs, and improving overall organizational efficiency. Expert in supply chain management, vendor relations, and cross-departmental coordination. Committed to driving growth through data-backed decision making and lean methodologies.`,
  skills: [
    "Process Improvement (Lean/Six Sigma)", "Supply Chain & Logistics", "Budgeting & Financial Oversight",
    "Vendor & Contract Management", "Change Management", "Inventory Control", "KPI Tracking"
  ],
  tools: [
    "ERP (SAP/Oracle)", "Microsoft Excel (Advanced)", "Project Management (Jira/Asana)", "Power BI", "SQL"
  ],
  experience: [
    {
      company: "Logistics Global Solutions",
      period: "2020 – Present",
      roles: [{
        title: "Senior Operations Manager",
        bullets: [
          "Optimized the regional supply chain, resulting in a 20% reduction in delivery lead times.",
          "Managed an annual operating budget of $10M, consistently saving 12% through strategic sourcing.",
          "Implemented a new warehouse management system (WMS) that increased inventory accuracy to 99.9%.",
          "Led a cross-functional team of 50+ staff across 4 different departments."
        ],
      }],
    },
    {
      company: "Manufacturing Hub India",
      period: "2016 – 2020",
      roles: [{
        title: "Operations Coordinator",
        bullets: [
          "Streamlined production floor layout, increasing daily output by 15% without additional headcount.",
          "Negotiated long-term contracts with key vendors, securing an 8% cost reduction in raw materials."
        ],
      }],
    },
  ],
  education: [{
    school: "Faculty of Management Studies (FMS)",
    year: "2016",
    degree: "Masters in Business Administration (Operations)",
  }],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const OperationsManagerTemplate = ({ data: propData, setData: setPropData }) => {
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
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: white, color: black, padding: "20mm", boxSizing: "border-box" }}>

        {/* HEADER - TEXT ONLY, NO BORDERS */}
        <div style={{ marginBottom: "15mm" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "36px", fontWeight: "300", letterSpacing: "1px", textAlign: "left", marginBottom: "5px" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px", color: darkGray, marginBottom: "20px" }} />

          <div style={{ display: "flex", gap: "15px", fontSize: "10px", color: textGray, fontWeight: "500" }}>
            <span><E value={location} onChange={(v) => u("location", v)} /></span>
            <span>•</span>
            <span><E value={phone} onChange={(v) => u("phone", v)} /></span>
            <span>•</span>
            <span><E value={email} onChange={(v) => u("email", v)} /></span>
            <span>•</span>
            <span><E value={linkedin} onChange={(v) => u("linkedin", v)} /></span>
          </div>
        </div>

        {/* SUMMARY SECTION */}
        <div style={{ marginBottom: "30px" }}>
          <SectionTitle>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </SectionTitle>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.8", color: darkGray, maxWidth: "90%" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "50px" }}>

          {/* LEFT: WORK HISTORY */}
          <div>
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
                  <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontSize: "14px", fontWeight: "700" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} style={{ fontSize: "10px", fontWeight: "500", color: textGray }} />
                    <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                    <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                  </div>
                </div>

                {exp.roles.map((role, ri) => (
                  <div key={ri} className="hoverable-row" style={{ marginTop: "10px", marginLeft: "10px", borderLeft: `1px solid ${textGray}`, paddingLeft: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                      <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontWeight: "600", fontSize: "11px", display: "block", fontStyle: "italic", marginBottom: "10px" }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                        <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                        <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                      </div>
                    </div>
                    <ul style={{ margin: "0", paddingLeft: "15px", listStyleType: "circle" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} className="hoverable-row" style={{ fontSize: "10.5px", marginBottom: "8px", lineHeight: "1.5", color: darkGray, display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
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

          {/* RIGHT: SKILLS & INFO */}
          <div>
            {/* SKILLS */}
            <div style={{ marginBottom: "35px" }}>
              <SectionTitle showAdd={true} onAdd={addSkill}>
                <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
              </SectionTitle>
              {skills.map((s, i) => (
                <div key={i} className="hoverable-row" style={{ fontSize: "10.5px", marginBottom: "12px", color: darkGray, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: "bold" }}>›</span>
                  <E value={s} onChange={(v) => updateSkillField(i, v)} style={{ flex: 1 }} />
                  <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                  <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                </div>
              ))}
            </div>

            {/* TOOLS */}
            <div style={{ marginBottom: "35px" }}>
              <SectionTitle showAdd={true} onAdd={addTool}>
                <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
              </SectionTitle>
              {tools.map((t, i) => (
                <div key={i} className="hoverable-row" style={{ fontSize: "10.5px", marginBottom: "8px", color: darkGray, display: "flex", alignItems: "center", gap: 6 }}>
                  <E value={t} onChange={(v) => updateToolField(i, v)} style={{ flex: 1 }} />
                  <IconBtn onClick={() => copyTool(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                  <IconBtn onClick={() => removeTool(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                </div>
              ))}
            </div>

            {/* EDUCATION */}
            <div>
              <SectionTitle showAdd={true} onAdd={addEducation}>
                <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              </SectionTitle>
              {education.map((edu, i) => (
                <div key={i} className="hoverable-row" style={{ marginBottom: "15px", borderBottom: i !== education.length - 1 ? `1px dashed ${textGray}` : "none", paddingBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                    <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "700", fontSize: "11px", flex: 1 }} />
                    <div style={{ display: "flex", gap: 3 }}>
                      <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>
                  <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "10px", color: textGray, marginTop: "2px" }} />
                  <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "10px", fontWeight: "700" }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default OperationsManagerTemplate;