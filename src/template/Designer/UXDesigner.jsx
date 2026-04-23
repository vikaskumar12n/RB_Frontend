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
const softGray = "#64748b";
const borderCol = "#e2e8f0";
const accent = "#2563eb";

const getInitialData = () => ({
  name: "CREATIVE DESIGNER",
  title: "Senior UI/UX & Product Designer",
  location: "Mumbai, India",
  phone: "+91-99999-00000",
  email: "hello@designer.com",
  portfolio: "behance.net/creative-ui",
  linkedin: "linkedin.com/in/design-pro",
  summaryTitle: "Design Philosophy",
  experienceTitle: "Professional Experience",
  skillsTitle: "Core Skills",
  toolsTitle: "Software",
  eduTitle: "Education",
  summary: `User-centric UI/UX Designer with 6+ years of experience in crafting intuitive digital experiences. Specialized in design systems, high-fidelity prototyping, and user research. Passionate about bridging the gap between user needs and business goals through functional interfaces.`,
  skills: [
    "User Research", "Wireframing", "Interaction Design", "Prototyping",
    "Design Systems", "Usability Testing", "Visual Design"
  ],
  tools: ["Figma", "Adobe XD", "After Effects", "Webflow", "Sketch"],
  experience: [
    {
      company: "Creative Studio X",
      period: "2021 – Present",
      roles: [{
        title: "Lead Product Designer",
        bullets: [
          "Redesigned flagship mobile app, resulting in a 40% increase in daily active users.",
          "Established a comprehensive Design System (UI Kit) used across 3 platforms.",
          "Mentored a team of 4 designers and streamlined developer hand-off process."
        ],
      }],
    },
    {
      company: "Digital Innovations Agency",
      period: "2018 – 2021",
      roles: [{
        title: "UI Designer",
        bullets: [
          "Created high-fidelity mockups for 15+ international client projects.",
          "Collaborated closely with front-end devs for pixel-perfect implementation."
        ],
      }],
    },
  ],
  education: [{
    school: "National Institute of Design (NID)",
    year: "2018",
    degree: "Bachelor of Design (Interaction Design)",
  }],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const UIUXSimpleTemplate = ({ data: propData, setData: setPropData }) => {
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
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#ffffff", color: black, padding: "20mm", boxSizing: "border-box" }}>

        {/* MINIMAL HEADER */}
        <div style={{ borderBottom: `1px solid ${black}`, paddingBottom: "10px", marginBottom: "30px" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "5px" }}>
            <E value={title} onChange={(v) => u("title", v)} style={{ fontSize: "14px", color: softGray, fontWeight: "500" }} />
            <div style={{ fontSize: "10px", textAlign: "right", color: softGray }}>
              <E value={location} onChange={(v) => u("location", v)} /> • <E value={phone} onChange={(v) => u("phone", v)} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "15px", marginTop: "10px", fontSize: "10px", fontWeight: "bold" }}>
            <E value={email} onChange={(v) => u("email", v)} />
            <E value={portfolio} onChange={(v) => u("portfolio", v)} style={{ color: accent }} />
            <E value={linkedin} onChange={(v) => u("linkedin", v)} style={{ color: accent }} />
          </div>
        </div>

        {/* CONTENT GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr", gap: "40px" }}>

          {/* SIDEBAR: SKILLS & EDU */}
          <div>
            {/* SKILLS */}
            <section style={{ marginBottom: "30px" }}>
              <SectionTitle showAdd={true} onAdd={addSkill}>
                <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
              </SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {skills.map((s, i) => (
                  <div key={i} className="hoverable-row" style={{ fontSize: "11px", color: softGray, display: "flex", alignItems: "center", gap: 6 }}>
                    <E value={s} onChange={(v) => updateSkillField(i, v)} style={{ flex: 1 }} />
                    <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                    <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                  </div>
                ))}
              </div>
            </section>

            {/* TOOLS */}
            <section style={{ marginBottom: "30px" }}>
              <SectionTitle showAdd={true} onAdd={addTool}>
                <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
              </SectionTitle>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {tools.map((t, i) => (
                  <span key={i} className="hoverable-row" style={{ border: `1px solid ${borderCol}`, padding: "2px 6px", fontSize: "9px", borderRadius: "3px", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <E value={t} onChange={(v) => updateToolField(i, v)} />
                    <IconBtn onClick={() => copyTool(i)} color="#6366f1" style={{ padding: "1px 2px" }}><Copy size={5} /></IconBtn>
                    <IconBtn onClick={() => removeTool(i)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={5} /></IconBtn>
                  </span>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section>
              <SectionTitle showAdd={true} onAdd={addEducation}>
                <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              </SectionTitle>
              {education.map((edu, i) => (
                <div key={i} className="hoverable-row" style={{ marginBottom: "15px", borderBottom: i !== education.length - 1 ? `1px dashed ${borderCol}` : "none", paddingBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                    <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "bold", fontSize: "10px", flex: 1 }} />
                    <div style={{ display: "flex", gap: 3 }}>
                      <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>
                  <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "10px", color: softGray }} />
                  <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "10px", color: accent, fontWeight: "bold" }} />
                </div>
              ))}
            </section>
          </div>

          {/* MAIN: SUMMARY & EXPERIENCE */}
          <div>
            {/* SUMMARY */}
            <section style={{ marginBottom: "35px" }}>
              <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "12px", lineHeight: "1.7", textAlign: "justify", fontStyle: "italic", color: "#334155" }} />
            </section>

            {/* EXPERIENCE */}
            <section>
              <div style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "20px", borderBottom: `1px solid ${borderCol}`, paddingBottom: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
                <IconBtn onClick={addExperience} color="#6366f1"><Plus size={9} /> Add</IconBtn>
              </div>

              {experience.map((exp, ei) => (
                <div key={ei} className="hoverable-row" style={{
                  borderBottom: ei !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none",
                  marginBottom: ei !== data.experience.length - 1 ? "5px" : "0",  /*  added */
                  paddingBottom: ei !== data.experience.length - 1 ? "5px" : "0", /*  added */
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                    <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "800", fontSize: "13px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} style={{ fontSize: "10px", color: softGray }} />
                      <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>

                  {exp.roles.map((role, ri) => (
                    <div key={ri} className="hoverable-row" style={{ marginTop: "8px", marginLeft: "12px", borderLeft: `1px solid ${borderCol}`, paddingLeft: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                        <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontWeight: "600", fontSize: "11px", color: accent, display: "block" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                          <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                          <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                        </div>
                      </div>
                      <ul style={{ margin: "10px 0", paddingLeft: "15px" }}>
                        {role.bullets.map((b, bi) => (
                          <li key={bi} className="hoverable-row" style={{ fontSize: "11px", marginBottom: "6px", color: "#334155", lineHeight: "1.5", display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
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
            </section>
          </div>

        </div>
      </div>
    </>
  );
};

export default UIUXSimpleTemplate;