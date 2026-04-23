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

const primary = "#2563eb";
const secondary = "#10b981";
const dark = "#1e293b";
const lightBg = "#f8fafc";
const borderCol = "#e2e8f0";
const softGray = "#475569";

const getInitialData = () => ({
  name: "FRONTEND ENGINEER",
  title: "Senior React Developer | UI/UX Enthusiast",
  location: "Pune, India",
  phone: "+91-99887-76655",
  email: "frontend.master@dev.com",
  github: "github.com/react-wizard",
  linkedin: "linkedin.com/in/frontend-pro",
  summaryTitle: "Developer Profile",
  experienceTitle: "Engineering Roadmap",
  skillsTitle: "Tech Stack",
  toolsTitle: "UI & Design Tools",
  eduTitle: "Education",
  summary: `Passionate Frontend Developer with 5+ years of expertise in building high-performance web applications using React and Vue. Strong eye for UI/UX details, specializing in responsive design, state management (Redux/Pinia), and performance optimization. Dedicated to writing clean, maintainable, and accessible code.`,
  skills: [
    "React.js / Next.js", "Vue.js / Nuxt.js", "TypeScript", "Tailwind CSS",
    "Redux / Pinia / Context API", "Unit Testing (Jest/Cypress)", "PWA & SEO Optimization"
  ],
  tools: [
    "Figma to Code", "Vite / Webpack", "Storybook", "Firebase", "Adobe XD"
  ],
  experience: [
    {
      company: "WebFlow Innovations",
      period: "2021 – Present",
      roles: [{
        title: "Senior Frontend Developer",
        bullets: [
          "Architected a scalable UI Component Library using React & Tailwind, used across 4 sub-projects.",
          "Optimized application performance, improving Lighthouse score from 65 to 98.",
          "Implemented complex data visualizations using D3.js and Chart.js.",
          "Collaborated with UI/UX teams to bridge the gap between design and technical implementation."
        ],
      }],
    },
    {
      company: "Digital Dream Studio",
      period: "2018 – 2021",
      roles: [{
        title: "Frontend Developer (Vue focused)",
        bullets: [
          "Developed a real-time collaboration tool using Vue 3 and WebSockets.",
          "Integrated RESTful APIs and managed global state using Pinia."
        ],
      }],
    },
  ],
  education: [{
    school: "University of Technology",
    year: "2018",
    degree: "B.Tech in Information Technology",
  }],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "13px", fontWeight: "800", textTransform: "uppercase", marginBottom: "15px", color: dark, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color={primary}>
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const FrontendDevTemplate = ({ data: propData, setData: setPropData }) => {
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

  const { name, title, location, phone, email, github, linkedin, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Plus Jakarta Sans', sans-serif", backgroundColor: "#fff", color: dark, boxSizing: "border-box" }}>

        {/* DEV HEADER */}
        <div style={{ background: dark, color: "white", padding: "12mm 15mm", position: "relative" }}>
          <div style={{ position: "absolute", color: "white", right: "15mm", top: "12mm", fontSize: "40px", opacity: "0.1", fontWeight: "900" }}>{"</>"}</div>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "32px", fontWeight: "800", letterSpacing: "-1px", color: "white" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", color: primary, fontWeight: "700", textTransform: "uppercase", marginTop: "4px" }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginTop: "20px", fontSize: "10px", opacity: "0.9" }}>
            <div>📍 <E value={location} onChange={(v) => u("location", v)} style={{ color: "#e2e8f0" }} /></div>
            <div>📞 <E value={phone} onChange={(v) => u("phone", v)} style={{ color: "#e2e8f0" }} /></div>
            <div>📧 <E value={email} onChange={(v) => u("email", v)} style={{ color: "#e2e8f0" }} /></div>
            <div style={{ color: secondary, fontWeight: "bold" }}>🔗 <E value={github} onChange={(v) => u("github", v)} style={{ color: secondary }} /></div>
          </div>
        </div>

        <div style={{ padding: "10mm 15mm" }}>

          {/* SUMMARY SECTION */}
          <div style={{ marginBottom: "25px", borderBottom: `1px solid ${borderCol}`, paddingBottom: "15px" }}>
            <div style={{ fontSize: "12px", fontWeight: "800", color: primary, textTransform: "uppercase", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "8px", height: "8px", background: secondary, borderRadius: "2px" }} />
              <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
            </div>
            <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.7", color: softGray }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "30px" }}>

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
                    <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "800", fontSize: "12px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} style={{ color: softGray, fontSize: "10px" }} />
                      <IconBtn onClick={() => copyExperience(ei)} color={primary}><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>

                  {exp.roles.map((role, ri) => (
                    <div key={ri} className="hoverable-row" style={{ marginTop: "8px", marginLeft: "12px", borderLeft: `2px solid ${borderCol}`, paddingLeft: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                        <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontWeight: "700", fontSize: "11px", color: primary, display: "block", marginTop: "3px" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <IconBtn onClick={() => copyRole(ei, ri)} color={primary}><Copy size={7} /></IconBtn>
                          <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                          <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                        </div>
                      </div>
                      <ul style={{ margin: "10px 0", paddingLeft: "15px" }}>
                        {role.bullets.map((b, bi) => (
                          <li key={bi} className="hoverable-row" style={{ fontSize: "10.5px", marginBottom: "6px", color: "#334155", display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
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

            {/* RIGHT: SKILLS & TECH */}
            <div>
              {/* SKILLS */}
              <div style={{ background: lightBg, padding: "15px", borderRadius: "12px", marginBottom: "20px" }}>
                <SectionTitle showAdd={true} onAdd={addSkill}>
                  <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
                </SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {skills.map((s, i) => (
                    <div key={i} className="hoverable-row" style={{ fontSize: "10px", fontWeight: "600", display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ color: secondary }}>●</span>
                      <E value={s} onChange={(v) => updateSkillField(i, v)} style={{ flex: 1 }} />
                      <IconBtn onClick={() => copySkill(i)} color={primary} style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                      <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOOLS */}
              <div style={{ padding: "0 15px" }}>
                <SectionTitle showAdd={true} onAdd={addTool}>
                  <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
                </SectionTitle>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "25px" }}>
                  {tools.map((t, i) => (
                    <span key={i} className="hoverable-row" style={{ border: `1px solid ${borderCol}`, padding: "3px 8px", fontSize: "9px", borderRadius: "4px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <E value={t} onChange={(v) => updateToolField(i, v)} />
                      <IconBtn onClick={() => copyTool(i)} color={primary} style={{ padding: "1px 2px" }}><Copy size={5} /></IconBtn>
                      <IconBtn onClick={() => removeTool(i)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={5} /></IconBtn>
                    </span>
                  ))}
                </div>

                {/* EDUCATION */}
                <SectionTitle showAdd={true} onAdd={addEducation}>
                  <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
                </SectionTitle>
                {education.map((edu, i) => (
                  <div key={i} className="hoverable-row" style={{ marginBottom: "10px", borderBottom: i !== education.length - 1 ? `1px dashed ${borderCol}` : "none", paddingBottom: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                      <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "bold", fontSize: "10.5px", flex: 1 }} />
                      <div style={{ display: "flex", gap: 3 }}>
                        <IconBtn onClick={() => copyEducation(i)} color={primary}><Copy size={8} /></IconBtn>
                        <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                      </div>
                    </div>
                    <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "9.5px", color: "#64748b" }} />
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

export default FrontendDevTemplate;