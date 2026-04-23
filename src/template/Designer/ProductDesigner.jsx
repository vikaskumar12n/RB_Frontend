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

const primary = "#059669";
const dark = "#1e293b";
const lightBg = "#f1f5f9";
const borderCol = "#cbd5e1";
const accent = "#10b981";

const getInitialData = () => ({
  name: "PRODUCT DESIGNER NAME",
  title: "Senior Product Designer | UX Strategy & Systems",
  location: "Bangalore, India",
  phone: "+91-99999-88888",
  email: "product.pro@design.com",
  portfolio: "portfolio.com/design-lead",
  linkedin: "linkedin.com/in/product-designer",
  summaryTitle: "Product Vision",
  experienceTitle: "Professional Experience",
  skillsTitle: "Core Competencies",
  toolsTitle: "Design Ecosystem",
  eduTitle: "Education",
  summary: `User-centric Product Designer with 6+ years of experience in building scalable digital products. Expert in translating complex user needs into seamless business solutions. Specialized in design systems, cross-functional collaboration, and end-to-end product development.`,
  skills: [
    "Product Strategy", "User Journey Mapping", "Design Systems",
    "Rapid Prototyping", "A/B Testing", "Mobile-First Design", "Stakeholder Management"
  ],
  tools: [
    "Figma", "Adobe Creative Suite", "Miro", "Jira", "Framer", "Protopie"
  ],
  experience: [
    {
      company: "TechNexus Solutions",
      period: "2021 – Present",
      roles: [{
        title: "Senior Product Designer",
        bullets: [
          "Led the end-to-end design of a B2B SaaS platform, increasing user retention by 25%.",
          "Collaborated with Product Managers to define roadmap and feature prioritization.",
          "Managed a centralized design system, reducing design-to-dev time by 40%.",
          "Conducted usability audits and implemented data-driven design iterations."
        ],
      }],
    },
    {
      company: "Creative Pulse Agency",
      period: "2018 – 2021",
      roles: [{
        title: "Product Designer",
        bullets: [
          "Designed intuitive interfaces for 10+ mobile and web applications.",
          "Created high-fidelity prototypes for stakeholder presentations and investor pitches."
        ],
      }],
    },
  ],
  education: [{
    school: "Indian Institute of Technology (IIT) Design",
    year: "2018",
    degree: "B.Des in Product Design",
  }],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "13px", fontWeight: "800", color: dark, textTransform: "uppercase", marginBottom: "15px", borderBottom: `2px solid ${lightBg}`, paddingBottom: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color={primary}>
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const ProductDesignerTemplate = ({ data: propData, setData: setPropData }) => {
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

  const { name, title, location, phone, email, portfolio, linkedin, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", color: dark, boxSizing: "border-box" }}>

        {/* PROFESSIONAL HEADER */}
        <div style={{ display: "flex", borderBottom: `8px solid ${primary}` }}>
          <div style={{ padding: "12mm 15mm", width: "65%" }}>
            <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-0.5px", color: dark }} />
            <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", fontWeight: "600", color: primary, marginTop: "5px" }} />
            <div style={{ marginTop: "12px", display: "flex", gap: "15px", fontSize: "10px", fontWeight: "bold" }}>
              <E value={portfolio} onChange={(v) => u("portfolio", v)} style={{ color: primary }} />
              <E value={linkedin} onChange={(v) => u("linkedin", v)} />
            </div>
          </div>
          <div style={{ background: lightBg, padding: "12mm 10mm", width: "35%", fontSize: "10px", textAlign: "right" }}>
            <div style={{ marginBottom: "4px" }}><E value={location} onChange={(v) => u("location", v)} /> 📍</div>
            <div style={{ marginBottom: "4px" }}><E value={phone} onChange={(v) => u("phone", v)} /> 📞</div>
            <div style={{ marginBottom: "4px" }}><E value={email} onChange={(v) => u("email", v)} /> 📧</div>
          </div>
        </div>

        <div style={{ padding: "10mm 15mm" }}>

          {/* SUMMARY SECTION */}
          <div style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "12px", fontWeight: "800", color: primary, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
              <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
            </div>
            <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11.5px", lineHeight: "1.6", textAlign: "justify", color: "#475569" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "35px" }}>

            {/* LEFT: WORK EXPERIENCE */}
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
                    <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "800", fontSize: "13px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} style={{ fontSize: "10px", color: "#64748b", fontWeight: "bold" }} />
                      <IconBtn onClick={() => copyExperience(ei)} color={primary}><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>

                  {exp.roles.map((role, ri) => (
                    <div key={ri} className="hoverable-row" style={{ marginTop: "8px", marginLeft: "10px", borderLeft: `2px solid ${lightBg}`, paddingLeft: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                        <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontWeight: "600", fontSize: "11.5px", color: primary, display: "block", marginBottom: "8px" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <IconBtn onClick={() => copyRole(ei, ri)} color={primary}><Copy size={7} /></IconBtn>
                          <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                          <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                        </div>
                      </div>
                      <ul style={{ margin: "0", paddingLeft: "15px" }}>
                        {role.bullets.map((b, bi) => (
                          <li key={bi} className="hoverable-row" style={{ fontSize: "11px", marginBottom: "6px", color: "#334155", lineHeight: "1.5", display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
                            <span>•</span>
                            <E value={b} onChange={(v) => updateBulletField(ei, ri, bi, v)} style={{ flex: 1 }} />
                            <IconBtn onClick={() => copyBullet(ei, ri, bi)} color={primary} style={{ padding: "1px 3px" }}><Copy size={6} /></IconBtn>
                            <IconBtn onClick={() => removeBullet(ei, ri, bi)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={6} /></IconBtn>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}


                </div>
              ))}
            </div>

            {/* RIGHT: SKILLS & TOOLS */}
            <div>
              {/* SKILLS SECTION */}
              <div style={{ fontSize: "12px", fontWeight: "800", color: dark, textTransform: "uppercase", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
                <IconBtn onClick={addSkill} color={primary}><Plus size={8} /> Add</IconBtn>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "30px" }}>
                {skills.map((s, i) => (
                  <span key={i} className="hoverable-row" style={{ background: lightBg, color: dark, padding: "4px 10px", fontSize: "9px", borderRadius: "5px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <E value={s} onChange={(v) => updateSkillField(i, v)} />
                    <IconBtn onClick={() => copySkill(i)} color={primary} style={{ padding: "1px 2px" }}><Copy size={6} /></IconBtn>
                    <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={6} /></IconBtn>
                  </span>
                ))}
              </div>

              {/* TOOLS SECTION */}
              <div style={{ fontSize: "12px", fontWeight: "800", color: dark, textTransform: "uppercase", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
                <IconBtn onClick={addTool} color={primary}><Plus size={8} /> Add</IconBtn>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "30px" }}>
                {tools.map((tool, i) => (
                  <div key={i} className="hoverable-row" style={{ fontSize: "10.5px", display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${lightBg}`, paddingBottom: "2px", alignItems: "center" }}>
                    <E value={tool} onChange={(v) => updateToolField(i, v)} style={{ flex: 1 }} />
                    <div style={{ display: "flex", gap: 3 }}>
                      <IconBtn onClick={() => copyTool(i)} color={primary} style={{ padding: "1px 2px" }}><Copy size={6} /></IconBtn>
                      <IconBtn onClick={() => removeTool(i)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={6} /></IconBtn>
                      <span style={{ color: accent }}>✔</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* EDUCATION SECTION */}
              <div style={{ background: lightBg, padding: "15px", borderRadius: "10px" }}>
                <div style={{ fontSize: "12px", fontWeight: "800", color: dark, textTransform: "uppercase", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
                  <IconBtn onClick={addEducation} color={primary}><Plus size={8} /> Add</IconBtn>
                </div>

                {education.map((edu, i) => (
                  <div key={i} className="hoverable-row" style={{ marginBottom: "10px", borderBottom: i !== education.length - 1 ? `1px dashed ${borderCol}` : "none", paddingBottom: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                      <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "bold", fontSize: "10.5px", flex: 1 }} />
                      <div style={{ display: "flex", gap: 3 }}>
                        <IconBtn onClick={() => copyEducation(i)} color={primary}><Copy size={8} /></IconBtn>
                        <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                      </div>
                    </div>
                    <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "9.5px", marginTop: "2px" }} />
                    <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "9.5px", color: primary, fontWeight: "bold" }} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDesignerTemplate;