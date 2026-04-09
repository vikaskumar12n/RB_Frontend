import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Full Stack Developer - Minimalist Monochrome Theme
const black      = "#000000";
const deepGray   = "#1f2937";
const lightGray  = "#64748b";
const borderCol  = "#e5e7eb";

const getInitialData = () => ({
  name: "FULL STACK DEVELOPER",
  title: "MERN Stack Expert | Cloud Solutions Architect",
  location: "Bangalore, India",
  phone: "+91-98765-43210",
  email: "dev.expert@stack.com",
  github: "github.com/dev-pro",
  linkedin: "linkedin.com/in/fullstack-master",

  summaryTitle: "Technical Overview",
  experienceTitle: "Engineering Experience",
  skillsTitle: "Core Tech Stack",
  toolsTitle: "DevOps & Tools",
  eduTitle: "Education",

  summary: `Performance-driven Full Stack Developer with 5+ years of experience in designing and deploying scalable web applications. Expert in React.js, Node.js, and Distributed Systems. Proven ability to optimize database performance and implement robust CI/CD pipelines.`,

  skills: [
    "Frontend: React, Next.js, TypeScript",
    "Backend: Node.js, Express, Python",
    "Databases: MongoDB, PostgreSQL, Redis",
    "API Design: REST, GraphQL, WebSockets"
  ],

  tools: [
    "Docker & Kubernetes", "AWS (EC2, S3, Lambda)", "Git / GitHub Actions", "Nginx", "Jenkins"
  ],

  experience: [
    {
      company: "Tech Giant Systems",
      period: "2021 – Present",
      roles: [{
        title: "Senior Software Engineer",
        bullets: [
          "Led the migration of a monolithic legacy system to a Microservices architecture.",
          "Improved application load time by 40% through code-splitting and server-side rendering.",
          "Integrated secure payment gateways and OAuth2 authentication protocols.",
          "Mentored 10+ junior developers and conducted rigorous code reviews."
        ],
      }],
    },
    {
      company: "FastScale Startup",
      period: "2018 – 2021",
      roles: [{
        title: "Full Stack Developer",
        bullets: [
          "Developed and launched an MVP that scaled to 100k+ active users within 6 months.",
          "Built real-time dashboard using Socket.io for live data monitoring."
        ],
      }],
    },
  ],

  education: [{
    school: "Indian Institute of Technology (IIT)",
    year: "2018",
    degree: "B.Tech in Computer Science",
  }],
});

const FullStackMinimalTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, github, linkedin, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'IBM Plex Mono', monospace", backgroundColor: "#fff", color: black, padding: "15mm", boxSizing: "border-box" }}>
      
      {/* MINIMALIST HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `2px solid ${black}`, paddingBottom: "10px", marginBottom: "25px" }}>
        <div>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-1px" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "12px", fontWeight: "600", marginTop: "4px", textTransform: "uppercase" }} />
        </div>
        <div style={{ textAlign: "right", fontSize: "10px", lineHeight: "1.6" }}>
          <div><E value={location} onChange={(v) => u("location", v)} /> | <E value={phone} onChange={(v) => u("phone", v)} /></div>
          <div><E value={email} onChange={(v) => u("email", v)} /></div>
          <div style={{ fontWeight: "bold" }}><E value={github} onChange={(v) => u("github", v)} /></div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "25px" }}>
        
        {/* LEFT COLUMN: EXPERIENCE & SUMMARY */}
        <div style={{ flex: "2", borderRight: `1px solid ${black}`, paddingRight: "20px" }}>
          
          {/* SUMMARY */}
          <div style={{ marginBottom: "25px" }}>
            <div style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", background: black, color: "#fff", display: "inline-block", padding: "2px 8px" }}>
              <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
            </div>
            <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6" }} />
          </div>

          {/* EXPERIENCE */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px", borderBottom: "1px solid #000" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "12px" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "600", fontSize: "11px", display: "block", margin: "4px 0" }} />
                    <ul style={{ margin: "5px 0", paddingLeft: "15px", listStyleType: "square" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "10.5px", marginBottom: "4px" }}>
                          <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: SKILLS, TOOLS, EDUCATION */}
        <div style={{ flex: "1" }}>
          
          <div style={{ marginBottom: "25px" }}>
            <div style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "10px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            {skills.map((s, i) => (
              <div key={i} style={{ fontSize: "10px", marginBottom: "8px", borderLeft: "2px solid #000", paddingLeft: "8px" }}>
                <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "25px" }}>
            <div style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "10px" }}>
              <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {tools.map((t, i) => (
                <span key={i} style={{ border: "1px solid #000", padding: "2px 6px", fontSize: "9px", fontWeight: "bold" }}>
                  <E value={t} onChange={(v) => { const a = ref.current.tools.map((item, j) => j === i ? v : item); u("tools", a); }} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "10px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10px" }} />
                <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "9px" }} />
                <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "9px", fontWeight: "900" }} />
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default FullStackMinimalTemplate;