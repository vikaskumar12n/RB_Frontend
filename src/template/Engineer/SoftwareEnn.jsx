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
const borderCol = "#e5e7eb";

const getInitialData = () => ({
  name: "DEVELOPER NAME",
  title: "Full Stack Developer",
  location: "Mumbai, India",
  phone: "+91-00000-00000",
  email: "developer@email.com",
  links: "GitHub | Portfolio | LinkedIn",
  summaryTitle: "Professional Summary",
  experienceTitle: "Work Experience",
  skillsTitle: "Technical Skills",
  eduTitle: "Education",
  projectTitle: "Key Projects",
  summary: `Passionate Full Stack Developer with 4+ years of experience in building scalable web applications. Expert in JavaScript ecosystem and cloud architecture. Focused on writing clean, maintainable code and optimizing performance.`,
  techStack: [
    "JavaScript", "React.js", "Node.js", "TypeScript",
    "PostgreSQL", "Docker", "AWS", "Git"
  ],
  experience: [
    {
      company: "Company Name / Startup",
      period: "2022 – Present",
      roles: [{
        title: "Senior Software Engineer",
        bullets: [
          "Developed and maintained high-performance web modules using React.",
          "Optimized backend APIs resulting in 20% faster load times.",
          "Collaborated with cross-functional teams to deliver monthly sprint goals."
        ],
      }],
    },
    {
      company: "Previous Organization",
      period: "2019 – 2022",
      roles: [{
        title: "Full Stack Developer",
        bullets: [
          "Built custom features for e-commerce platforms using the MERN stack.",
          "Resolved 50+ critical production bugs within the first 6 months."
        ],
      }],
    },
  ],
  topProjects: [
    { name: "Project Alpha", tech: "React, Firebase", detail: "Real-time collaboration tool for remote teams." },
    { name: "Project Beta", tech: "Node.js, MongoDB", detail: "Custom CMS built for a digital marketing agency." }
  ],
  education: [{
    school: "University Name",
    year: "2019",
    degree: "B.Tech in Computer Science",
  }],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${borderCol}`, marginBottom: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const SoftwareDevSimpleTemplate = ({ data: propData, setData: setPropData }) => {
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
  const addSkill = () => u("techStack", [...ref.current.techStack, "New skill"]);
  const removeSkill = (i) => u("techStack", ref.current.techStack.filter((_, idx) => idx !== i));
  const copySkill = (i) => u("techStack", [...ref.current.techStack, ref.current.techStack[i] + " (Copy)"]);

  // ========== PROJECTS FUNCTIONS ==========
  const addProject = () => u("topProjects", [...ref.current.topProjects, { name: "New Project", tech: "Tech", detail: "Project description" }]);
  const removeProject = (i) => u("topProjects", ref.current.topProjects.filter((_, idx) => idx !== i));
  const copyProject = (i) => {
    const projToCopy = JSON.parse(JSON.stringify(ref.current.topProjects[i]));
    projToCopy.name = projToCopy.name + " (Copy)";
    u("topProjects", [...ref.current.topProjects, projToCopy]);
  };

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
    const up = ref.current.techStack.map((s, idx) => idx === i ? value : s);
    u("techStack", up);
  };
  const updateProjectField = (i, field, value) => {
    const up = ref.current.topProjects.map((proj, idx) => idx === i ? { ...proj, [field]: value } : proj);
    u("topProjects", up);
  };
  const updateEduField = (i, field, value) => {
    const up = ref.current.education.map((edu, idx) => idx === i ? { ...edu, [field]: value } : edu);
    u("education", up);
  };

  const { name, title, location, phone, email, links, summaryTitle, experienceTitle, skillsTitle, eduTitle, projectTitle, summary, techStack, experience, topProjects, education } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Times New Roman', serif", backgroundColor: "#fff", color: black, padding: "15mm", boxSizing: "border-box" }}>

        {/* SIMPLE CENTERED HEADER */}
        <div style={{ textAlign: "center", marginBottom: "20px", borderBottom: `2px solid ${black}`, paddingBottom: "10px" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "24px", fontWeight: "bold", textTransform: "uppercase" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", fontWeight: "600", marginTop: "2px" }} />
          <div style={{ fontSize: "11px", marginTop: "5px" }}>
            <E value={location} onChange={(v) => u("location", v)} /> | <E value={phone} onChange={(v) => u("phone", v)} /> | <E value={email} onChange={(v) => u("email", v)} />
          </div>
          <div style={{ fontSize: "11px", marginTop: "2px", fontStyle: "italic" }}>
            <E value={links} onChange={(v) => u("links", v)} />
          </div>
        </div>

        {/* SUMMARY */}
        <div style={{ marginBottom: "15px" }}>
          <SectionTitle>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </SectionTitle>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.4" }} />
        </div>

        {/* EXPERIENCE */}
        <div style={{ marginBottom: "15px" }}>
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
                    <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontWeight: "600", fontSize: "11px", fontStyle: "italic" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                      <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                      <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                    </div>
                  </div>
                  <ul style={{ margin: "3px 0", paddingLeft: "20px" }}>
                    {role.bullets.map((b, bi) => (
                      <li key={bi} className="hoverable-row" style={{ fontSize: "10.5px", marginBottom: "2px", display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
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

        {/* TWO COLUMN FOR SKILLS & EDUCATION */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>

          {/* SKILLS & PROJECTS */}
          <div>
            <SectionTitle showAdd={true} onAdd={addSkill}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {techStack.map((s, i) => (
                <span key={i} className="hoverable-row" style={{ fontSize: "10.5px", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <E value={s} onChange={(v) => updateSkillField(i, v)} />
                  <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 2px" }}><Copy size={6} /></IconBtn>
                  <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={6} /></IconBtn>
                  {i !== techStack.length - 1 ? "," : ""}
                </span>
              ))}
            </div>

            <div style={{ marginTop: "15px" }}>
              <SectionTitle showAdd={true} onAdd={addProject}>
                <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
              </SectionTitle>
              {topProjects.map((p, i) => (
                <div key={i} className="hoverable-row" style={{ marginBottom: "8px", borderBottom: i !== topProjects.length - 1 ? `1px dashed ${borderCol}` : "none", paddingBottom: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                    <E value={p.name} onChange={(v) => updateProjectField(i, "name", v)} style={{ fontWeight: "bold", fontSize: "10.5px", flex: 1 }} />
                    <div style={{ display: "flex", gap: 3 }}>
                      <IconBtn onClick={() => copyProject(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeProject(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>
                  <E value={p.detail} onChange={(v) => updateProjectField(i, "detail", v)} style={{ fontSize: "10px" }} />
                </div>
              ))}
            </div>
          </div>

          {/* EDUCATION */}
          <div>
            <SectionTitle showAdd={true} onAdd={addEducation}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </SectionTitle>
            {education.map((edu, i) => (
              <div key={i} className="hoverable-row" style={{ marginBottom: "10px", borderBottom: i !== education.length - 1 ? `1px dashed ${borderCol}` : "none", paddingBottom: "8px" }}>
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

export default SoftwareDevSimpleTemplate;