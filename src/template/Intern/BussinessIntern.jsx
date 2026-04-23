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
const lightGray = "#6b7280";
const white = "#ffffff";

const getInitialData = () => ({
  name: "BUSINESS INTERN NAME",
  title: "Management Student | Aspiring Business Analyst | Strategy",
  location: "Mumbai, India",
  phone: "+91-90000-11111",
  email: "intern.biz@email.com",
  linkedin: "linkedin.com/in/business-aspirant",
  objectiveTitle: "Career Objective",
  skillsTitle: "Core Competencies",
  projectTitle: "Academic & Internship Projects",
  eduTitle: "Education",
  extraTitle: "Extracurricular & Leadership",
  objective: `Detail-oriented Management student with strong analytical and communication skills. Seeking a Business Development or Operations internship to apply market research, data analysis, and strategic planning knowledge. Quick learner with a proven track record of leadership in college organizations.`,
  skills: [
    "Market Research & Competitor Analysis", "Data Visualization (Excel/Tableau)",
    "Business Communication & Pitching", "Financial Literacy & Budgeting",
    "CRM Tools (HubSpot/Salesforce Basics)", "Strategic Problem Solving"
  ],
  projects: [
    {
      name: "Market Entry Strategy Project",
      period: "Winter Internship 2024",
      bullets: [
        "Conducted primary research on consumer behavior for a new EdTech startup, surveying 200+ potential users.",
        "Analyzed competitor pricing models and presented a gap analysis report to the founding team.",
        "Identified 3 key market trends that led to a pivot in the company's social media strategy."
      ],
    },
    {
      name: "Financial Analysis of Retail Sector",
      period: "Academic Project - Semester 4",
      bullets: [
        "Performed ratio analysis on the annual reports of top 5 retail companies in India.",
        "Used Excel to create a forecasting model for sales growth over the next 2 fiscal years."
      ],
    },
  ],
  education: [
    {
      school: "Symbiosis Institute of Business Management",
      year: "2023 – 2025 (Expected)",
      degree: "MBA / BBA in Marketing & Finance",
    },
    {
      school: "Delhi Public School",
      year: "2022",
      degree: "Higher Secondary Education (Commerce)",
    }
  ],
  extras: [
    "President of the College Entrepreneurship Cell",
    "Winner of Inter-College Case Study Competition 2023",
    "Volunteer for National Service Scheme (NSS)"
  ],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "10px", fontWeight: "900", paddingBottom: "5px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px", borderBottom: "1px solid #000", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const BusinessInternTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setDataFunc = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setDataFunc({ ...ref.current, [f]: v });

  // ========== PROJECTS FUNCTIONS ==========
  const addProject = () => {
    u("projects", [...ref.current.projects, { name: "New Project", period: "Date", bullets: ["New bullet point"] }]);
  };
  const removeProject = (i) => u("projects", ref.current.projects.filter((_, idx) => idx !== i));
  const copyProject = (i) => {
    const projToCopy = JSON.parse(JSON.stringify(ref.current.projects[i]));
    projToCopy.name = projToCopy.name + " (Copy)";
    u("projects", [...ref.current.projects, projToCopy]);
  };

  // ========== BULLET FUNCTIONS ==========
  const addBullet = (pi) => {
    const updated = ref.current.projects.map((proj, i) => i === pi ? { ...proj, bullets: [...proj.bullets, "New bullet point"] } : proj);
    u("projects", updated);
  };
  const removeBullet = (pi, bi) => {
    const updated = ref.current.projects.map((proj, i) => i === pi ? { ...proj, bullets: proj.bullets.filter((_, idx) => idx !== bi) } : proj);
    u("projects", updated);
  };
  const copyBullet = (pi, bi) => {
    const updated = ref.current.projects.map((proj, i) => i === pi ? { ...proj, bullets: [...proj.bullets, proj.bullets[bi] + " (Copy)"] } : proj);
    u("projects", updated);
  };

  // ========== SKILLS FUNCTIONS ==========
  const addSkill = () => u("skills", [...ref.current.skills, "New skill"]);
  const removeSkill = (i) => u("skills", ref.current.skills.filter((_, idx) => idx !== i));
  const copySkill = (i) => u("skills", [...ref.current.skills, ref.current.skills[i] + " (Copy)"]);

  // ========== EDUCATION FUNCTIONS ==========
  const addEducation = () => u("education", [...ref.current.education, { degree: "New Degree", school: "New School", year: "Year" }]);
  const removeEducation = (i) => u("education", ref.current.education.filter((_, idx) => idx !== i));
  const copyEducation = (i) => {
    const eduToCopy = JSON.parse(JSON.stringify(ref.current.education[i]));
    eduToCopy.school = eduToCopy.school + " (Copy)";
    u("education", [...ref.current.education, eduToCopy]);
  };

  // ========== EXTRAS FUNCTIONS ==========
  const addExtra = () => u("extras", [...ref.current.extras, "New extracurricular activity"]);
  const removeExtra = (i) => u("extras", ref.current.extras.filter((_, idx) => idx !== i));
  const copyExtra = (i) => u("extras", [...ref.current.extras, ref.current.extras[i] + " (Copy)"]);

  // ========== UPDATE FUNCTIONS ==========
  const updateProjectField = (pi, field, value) => {
    const updated = ref.current.projects.map((proj, i) => i === pi ? { ...proj, [field]: value } : proj);
    u("projects", updated);
  };
  const updateBulletField = (pi, bi, value) => {
    const updated = ref.current.projects.map((proj, i) => i === pi ? { ...proj, bullets: proj.bullets.map((b, idx) => idx === bi ? value : b) } : proj);
    u("projects", updated);
  };
  const updateSkillField = (i, value) => {
    const updated = ref.current.skills.map((s, idx) => idx === i ? value : s);
    u("skills", updated);
  };
  const updateEduField = (i, field, value) => {
    const updated = ref.current.education.map((edu, idx) => idx === i ? { ...edu, [field]: value } : edu);
    u("education", updated);
  };
  const updateExtraField = (i, value) => {
    const updated = ref.current.extras.map((ex, idx) => idx === i ? value : ex);
    u("extras", updated);
  };

  const { name, title, location, phone, email, linkedin, objectiveTitle, skillsTitle, projectTitle, eduTitle, extraTitle, objective, skills, projects, education, extras } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: white, color: black, padding: "20mm", boxSizing: "border-box" }}>

        {/* HEADER - MINIMALIST */}
        <div style={{ marginBottom: "12mm" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "32px", fontWeight: "300", letterSpacing: "1px" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: darkGray, marginTop: "5px" }} />

          <div style={{ display: "flex", gap: "20px", marginTop: "15px", fontSize: "10px", fontWeight: "500", color: lightGray }}>
            <span>📍 <E value={location} onChange={(v) => u("location", v)} /></span>
            <span>📞 <E value={phone} onChange={(v) => u("phone", v)} /></span>
            <span>📧 <E value={email} onChange={(v) => u("email", v)} /></span>
            <span>🔗 <E value={linkedin} onChange={(v) => u("linkedin", v)} /></span>
          </div>
        </div>

        {/* OBJECTIVE */}
        <div style={{ marginBottom: "25px" }}>
          <SectionTitle>
            <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
          </SectionTitle>
          <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "11px", lineHeight: "1.6", textAlign: "justify", color: darkGray }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>

          {/* LEFT COLUMN: PROJECTS & EXTRAS */}
          <div>
            <SectionTitle showAdd={true} onAdd={addProject}>
              <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
            </SectionTitle>

            {projects.map((proj, pi) => (
              <div key={pi} className="hoverable-row" style={{ marginBottom: "20px", borderBottom: pi !== projects.length - 1 ? `1px dashed #e5e7eb` : "none", paddingBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                  <E value={proj.name} onChange={(v) => updateProjectField(pi, "name", v)} style={{ fontWeight: "800", fontSize: "12px", flex: 1 }} />
                  <div style={{ display: "flex", gap: 3 }}>
                    <IconBtn onClick={() => copyProject(pi)} color="#6366f1"><Copy size={8} /></IconBtn>
                    <IconBtn onClick={() => removeProject(pi)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                  </div>
                </div>
                <E value={proj.period} onChange={(v) => updateProjectField(pi, "period", v)} style={{ fontSize: "9px", fontWeight: "600", fontStyle: "italic", marginBottom: "8px" }} />

                <ul style={{ margin: "0", paddingLeft: "15px", listStyleType: "circle" }}>
                  {proj.bullets.map((b, bi) => (
                    <li key={bi} className="hoverable-row" style={{ fontSize: "10.5px", marginBottom: "5px", lineHeight: "1.4", color: darkGray, display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
                      <span>•</span>
                      <E value={b} onChange={(v) => updateBulletField(pi, bi, v)} style={{ flex: 1 }} />
                      <IconBtn onClick={() => copyBullet(pi, bi)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={6} /></IconBtn>
                      <IconBtn onClick={() => removeBullet(pi, bi)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={6} /></IconBtn>
                    </li>
                  ))}
                </ul>


              </div>
            ))}

            <SectionTitle showAdd={true} onAdd={addExtra}>
              <E value={extraTitle} onChange={(v) => u("extraTitle", v)} />
            </SectionTitle>

            {extras.map((item, i) => (
              <div key={i} className="hoverable-row" style={{ fontSize: "10.5px", marginBottom: "8px", color: darkGray, display: "flex", alignItems: "center", gap: 8 }}>
                <span>•</span>
                <E value={item} onChange={(v) => updateExtraField(i, v)} style={{ flex: 1 }} />
                <IconBtn onClick={() => copyExtra(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                <IconBtn onClick={() => removeExtra(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: SKILLS & EDUCATION */}
          <div>
            <SectionTitle showAdd={true} onAdd={addSkill}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </SectionTitle>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" }}>
              {skills.map((s, i) => (
                <div key={i} className="hoverable-row" style={{ fontSize: "10.5px", fontWeight: "500", padding: "5px 0", borderBottom: "0.5px solid #eee", display: "flex", alignItems: "center", gap: 8 }}>
                  <E value={s} onChange={(v) => updateSkillField(i, v)} style={{ flex: 1 }} />
                  <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                  <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                </div>
              ))}
            </div>

            <SectionTitle showAdd={true} onAdd={addEducation}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </SectionTitle>

            {education.map((edu, i) => (
              <div key={i} className="hoverable-row" style={{ marginBottom: "15px", borderBottom: i !== education.length - 1 ? `1px dashed #e5e7eb` : "none", paddingBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                  <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "700", fontSize: "11px", flex: 1 }} />
                  <div style={{ display: "flex", gap: 3 }}>
                    <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                    <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                  </div>
                </div>
                <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "10px", marginTop: "2px" }} />
                <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "10px", fontWeight: "700" }} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default BusinessInternTemplate;