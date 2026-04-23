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

const getInitialData = () => ({
  name: "First Last",
  title: "Senior Software Engineer",
  phone: "+1-234-456-789",
  email: "email@resumeworded.com",
  linkedin: "linkedin.com/in/username",
  location: "Bay Area, CA",
  summaryTitle: "Professional Summary",
  experienceTitle: "Professional Experience",
  educationTitle: "Education",
  skillsTitle: "Skills",
  summary: "Results-driven software engineer with 8+ years building scalable front-end solutions. Proven track record of improving performance metrics and leading cross-functional teams.",
  experience: [
    {
      company: "Resume Worded",
      location: "New York, NY",
      period: "2018 – Present",
      title: "Front End Developer, React",
      bullets: [
        "Developed product tours with React, improving adoption by 25% and driving $1M revenue.",
        "Reduced support tickets by 45% through a custom client dashboard.",
        "Increased conversion rates by 20% collaborating with UX/UI design teams.",
      ],
    },
    {
      company: "Growthsi",
      location: "San Diego, CA",
      period: "2014 – 2017",
      title: "Front End Developer",
      bullets: [
        "Delivered cross-browser accessible websites with 22% faster load times.",
        "Translated design wireframes into pixel-perfect HTML5/CSS3 markup.",
      ],
    },
  ],
  education: [
    {
      school: "Resume Worded University",
      location: "San Francisco, CA",
      year: "2013",
      degree: "Bachelor of Engineering, Information Technology",
    },
  ],
  skills: [
    "React / Redux",
    "JavaScript (ES6+)",
    "HTML5 & CSS3",
    "jQuery",
    "Git & GitHub",
    "Responsive Design",
    "Agile / Scrum",
    "REST APIs",
  ],
});

const ExecutiveTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDataState] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setDataFunc = (d) => { setDataState(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setDataFunc({ ...ref.current, [f]: v });

  // ========== EXPERIENCE FUNCTIONS ==========
  const addExperience = () => {
    u("experience", [...ref.current.experience, { company: "New Company", location: "Location", period: "Date", title: "New Role", bullets: ["New bullet point"] }]);
  };
  const removeExperience = (i) => u("experience", ref.current.experience.filter((_, idx) => idx !== i));
  const copyExperience = (i) => {
    const expToCopy = JSON.parse(JSON.stringify(ref.current.experience[i]));
    expToCopy.company = expToCopy.company + " (Copy)";
    u("experience", [...ref.current.experience, expToCopy]);
  };

  // ========== BULLET FUNCTIONS ==========
  const addBullet = (ei) => {
    const updated = ref.current.experience.map((exp, i) => i === ei ? { ...exp, bullets: [...exp.bullets, "New bullet point"] } : exp);
    u("experience", updated);
  };
  const removeBullet = (ei, bi) => {
    const updated = ref.current.experience.map((exp, i) => i === ei ? { ...exp, bullets: exp.bullets.filter((_, idx) => idx !== bi) } : exp);
    u("experience", updated);
  };
  const copyBullet = (ei, bi) => {
    const updated = ref.current.experience.map((exp, i) => i === ei ? { ...exp, bullets: [...exp.bullets, exp.bullets[bi] + " (Copy)"] } : exp);
    u("experience", updated);
  };

  // ========== EDUCATION FUNCTIONS ==========
  const addEducation = () => {
    u("education", [...ref.current.education, { school: "New School", location: "Location", year: "Year", degree: "New Degree" }]);
  };
  const removeEducation = (i) => u("education", ref.current.education.filter((_, idx) => idx !== i));
  const copyEducation = (i) => {
    const eduToCopy = JSON.parse(JSON.stringify(ref.current.education[i]));
    eduToCopy.school = eduToCopy.school + " (Copy)";
    u("education", [...ref.current.education, eduToCopy]);
  };

  // ========== SKILLS FUNCTIONS ==========
  const addSkill = () => u("skills", [...ref.current.skills, "New skill"]);
  const removeSkill = (i) => u("skills", ref.current.skills.filter((_, idx) => idx !== i));
  const copySkill = (i) => u("skills", [...ref.current.skills, ref.current.skills[i] + " (Copy)"]);

  // ========== UPDATE FUNCTIONS ==========
  const updateExpField = (ei, field, value) => {
    const updated = ref.current.experience.map((exp, i) => i === ei ? { ...exp, [field]: value } : exp);
    u("experience", updated);
  };
  const updateBulletField = (ei, bi, value) => {
    const updated = ref.current.experience.map((exp, i) => i === ei ? { ...exp, bullets: exp.bullets.map((b, idx) => idx === bi ? value : b) } : exp);
    u("experience", updated);
  };
  const updateEduField = (i, field, value) => {
    const updated = ref.current.education.map((edu, idx) => idx === i ? { ...edu, [field]: value } : edu);
    u("education", updated);
  };
  const updateSkillField = (i, value) => {
    const updated = ref.current.skills.map((s, idx) => idx === i ? value : s);
    u("skills", updated);
  };

  const {
    name, title, phone, email, linkedin, location,
    summaryTitle, experienceTitle, educationTitle, skillsTitle,
    summary, experience, education, skills,
  } = data;

  const sectionHeadStyle = {
    fontWeight: "bold",
    fontSize: "10px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#1a1a2e",
    borderBottom: "1px solid #1a1a2e",
    paddingBottom: "6px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <>
      <StyleInjector />
      <div style={{ position: "relative" }}>
        <div
          id="resume"
          style={{
            width: "210mm", minHeight: "297mm",
            fontFamily: "'Georgia', serif", fontSize: "10.5px",
            backgroundColor: "#fff", boxSizing: "border-box",
          }}
        >
          {/* HEADER */}
          <div style={{ backgroundColor: "#1a1a2e", padding: "14mm 8mm" }}>
            <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "24px", color: "#fff", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "bold" }} />
            <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "11px", color: "#e2a04a", letterSpacing: "1px", marginTop: "4px" }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0 16px", marginTop: "8px" }}>
              {[
                ["location", location],
                ["phone", phone],
                ["email", email],
                ["linkedin", linkedin],
              ].map(([key, val]) => (
                <E key={key} value={val} onChange={(v) => u(key, v)} style={{ color: "#9ca3af", fontSize: "9.5px", whiteSpace: "nowrap" }} />
              ))}
            </div>
          </div>

          {/* Gold divider */}
          <div style={{ height: "3px", backgroundColor: "#e2a04a" }} />

          {/* BODY */}
          <div style={{ padding: "8mm 14mm" }}>

            {/* SUMMARY */}
            <div style={{ marginBottom: "16px" }}>
              <h2 style={sectionHeadStyle}>
                <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
              </h2>
              <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "10px", lineHeight: "1.6", color: "#374151" }} />
            </div>

            {/* EXPERIENCE */}
            <div style={{ marginBottom: "16px" }}>
              <h2 style={sectionHeadStyle}>
                <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
                <IconBtn onClick={addExperience} color="#6366f1"><Plus size={9} /> Add Company</IconBtn>
              </h2>

              {experience.map((exp, ei) => (
                <div key={ei} className="hoverable-row" style={{ marginBottom: "12px", borderBottom: ei !== experience.length - 1 ? "1px dashed #e5e7eb" : "none", paddingBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 4 }}>
                    <div style={{ flex: 1 }}>
                      <E value={exp.title} onChange={(v) => updateExpField(ei, "title", v)} block style={{ fontWeight: "bold", fontSize: "11px", color: "#1a1a2e" }} />
                      <span style={{ fontSize: "9.5px", color: "#6b7280" }}>
                        <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ color: "#6b7280" }} />
                        {" · "}
                        <E value={exp.location} onChange={(v) => updateExpField(ei, "location", v)} style={{ color: "#6b7280" }} />
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ color: "#191a1b", fontSize: "9px", whiteSpace: "nowrap" }}>
                        <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} />
                      </span>
                      <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>

                  <ul style={{ paddingLeft: "20px", marginTop: "6px", marginBottom: 0 }}>
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="hoverable-row" style={{ marginTop: "3px", listStyleType: "disc", display: "flex", alignItems: "flex-start", gap: 4 }}>
                        <span>•</span>
                        <E value={b} onChange={(v) => updateBulletField(ei, bi, v)} style={{ fontSize: "10px", color: "#374151", flex: 1 }} />
                        <IconBtn onClick={() => copyBullet(ei, bi)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                        <IconBtn onClick={() => removeBullet(ei, bi)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                      </li>
                    ))}
                  </ul>

                  
                </div>
              ))}
            </div>

            {/* EDUCATION + SKILLS — two-column grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

              {/* EDUCATION */}
              <div>
                <h2 style={sectionHeadStyle}>
                  <E value={educationTitle} onChange={(v) => u("educationTitle", v)} />
                  <IconBtn onClick={addEducation} color="#6366f1"><Plus size={9} /> Add</IconBtn>
                </h2>
                {education.map((edu, i) => (
                  <div key={i} className="hoverable-row" style={{ marginBottom: "10px", borderBottom: i !== education.length - 1 ? "1px dashed #e5e7eb" : "none", paddingBottom: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                      <div style={{ flex: 1 }}>
                        <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} block style={{ fontWeight: "bold", fontSize: "10.5px", color: "#1a1a2e" }} />
                        <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} block style={{ fontSize: "9.5px", color: "#6b7280" }} />
                        <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} block style={{ fontSize: "9.5px", color: "#6b7280" }} />
                      </div>
                      <div style={{ display: "flex", gap: 3 }}>
                        <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                        <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SKILLS */}
              <div>
                <h2 style={sectionHeadStyle}>
                  <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
                  <IconBtn onClick={addSkill} color="#6366f1"><Plus size={9} /> Add</IconBtn>
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 8px" }}>
                  {skills.map((skill, i) => (
                    <div key={i} className="hoverable-row" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ color: "#e2a04a", fontSize: "8px" }}>◆</span>
                      <E value={skill} onChange={(v) => updateSkillField(i, v)} style={{ fontSize: "9.5px", color: "#374151", flex: 1 }} />
                      <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                      <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExecutiveTemplate;