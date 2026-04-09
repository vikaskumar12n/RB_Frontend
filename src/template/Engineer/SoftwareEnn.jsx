import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Minimalist Formal Theme (No Colors)
const black      = "#000000";
const darkGray   = "#374151";
const lightGray  = "#9ca3af";
const borderCol  = "#e5e7eb";

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

const SoftwareDevSimpleTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, links, summaryTitle, experienceTitle, skillsTitle, eduTitle, projectTitle, summary, techStack, experience, topProjects, education } = data;

  return (
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
        <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${borderCol}`, marginBottom: "5px" }}>
          <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
        </div>
        <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.4" }} />
      </div>

      {/* EXPERIENCE */}
      <div style={{ marginBottom: "15px" }}>
        <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${borderCol}`, marginBottom: "8px" }}>
          <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
        </div>
        {experience.map((exp, ei) => (
          <div key={ei} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "11px" }}>
              <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
              <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} />
            </div>
            {exp.roles.map((role, ri) => (
              <div key={ri}>
                <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "600", fontSize: "11px", fontStyle: "italic" }} />
                <ul style={{ margin: "3px 0", paddingLeft: "20px" }}>
                  {role.bullets.map((b, bi) => (
                    <li key={bi} style={{ fontSize: "10.5px", marginBottom: "2px" }}>
                      <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
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
        
        {/* SKILLS */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${borderCol}`, marginBottom: "5px" }}>
            <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {techStack.map((s, i) => (
              <span key={i} style={{ fontSize: "10.5px" }}>
                <E value={s} onChange={(v) => { const a = ref.current.techStack.map((item, j) => j === i ? v : item); u("techStack", a); }} />{i !== techStack.length - 1 ? "," : ""}
              </span>
            ))}
          </div>

          <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${borderCol}`, marginBottom: "5px", marginTop: "15px" }}>
            <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
          </div>
          {topProjects.map((p, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <E value={p.name} onChange={(v) => { const a = ref.current.topProjects.map((item, j) => j === i ? { ...item, name: v } : item); u("topProjects", a); }} block style={{ fontWeight: "bold", fontSize: "10.5px" }} />
              <E value={p.detail} onChange={(v) => { const a = ref.current.topProjects.map((item, j) => j === i ? { ...item, detail: v } : item); u("topProjects", a); }} block style={{ fontSize: "10px" }} />
            </div>
          ))}
        </div>

        {/* EDUCATION */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", borderBottom: `1px solid ${borderCol}`, marginBottom: "5px" }}>
            <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
          </div>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "11px" }} />
              <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10.5px" }} />
              <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "10.5px", fontWeight: "bold" }} />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default SoftwareDevSimpleTemplate;