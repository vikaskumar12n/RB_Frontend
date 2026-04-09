import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Backend Architect - Light & Structured Theme (No Dark Backgrounds)
const primary    = "#0f172a"; // Deep Slate
const accent     = "#0284c7"; // Professional Blue
const lightBg    = "#f8fafc";
const borderCol  = "#e2e8f0";
const textGray   = "#475569";

const getInitialData = () => ({
  name: "BACKEND ENGINEER",
  title: "Senior Backend Developer | Node.js & Go Expert",
  location: "Hyderabad, India",
  phone: "+91-90000-55555",
  email: "backend.lead@server.com",
  github: "github.com/backend-pro",
  linkedin: "linkedin.com/in/system-architect",

  summaryTitle: "System Philosophy",
  experienceTitle: "Engineering Experience",
  skillsTitle: "Technical Stack",
  toolsTitle: "Cloud & DevOps",
  eduTitle: "Education",

  summary: `Highly analytical Backend Developer with 6+ years of experience in designing scalable microservices and RESTful APIs. Expert in database optimization, distributed systems, and cloud infrastructure. Passionate about building robust, high-availability systems that handle millions of requests.`,

  skills: [
    "Runtime: Node.js, Go, Python (FastAPI)",
    "Databases: PostgreSQL, MongoDB, Redis",
    "Architecture: Microservices, Event-Driven (Kafka)",
    "Security: JWT, OAuth2, Encryption Standards"
  ],

  tools: [
    "AWS (Lambda, RDS, S3)", "Docker & Kubernetes", "Terraform", "GitHub Actions", "Prometheus/Grafana"
  ],

  experience: [
    {
      company: "DataScale Systems",
      period: "2021 – Present",
      roles: [{
        title: "Senior Backend Engineer",
        bullets: [
          "Re-engineered the core API layer, reducing response times by 150ms for high-traffic endpoints.",
          "Implemented a distributed caching strategy with Redis, decreasing database load by 50%.",
          "Automated infrastructure provisioning using Terraform and AWS CloudFormation.",
          "Designed a real-time notification engine using WebSockets and RabbitMQ."
        ],
      }],
    },
    {
      company: "CoreLogic Labs",
      period: "2018 – 2021",
      roles: [{
        title: "Backend Developer",
        bullets: [
          "Developed and maintained 20+ microservices using Node.js and Express.",
          "Optimized complex SQL queries, improving report generation speed by 70%."
        ],
      }],
    },
  ],

  education: [{
    school: "IIT Kanpur",
    year: "2018",
    degree: "B.Tech in Computer Science & Engineering",
  }],
});

const BackendDevTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, github, linkedin, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", color: primary, boxSizing: "border-box" }}>
      
      {/* CLEAN WHITE HEADER WITH BORDER */}
      <div style={{ padding: "12mm 15mm", borderBottom: `2px solid ${primary}`, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "30px", fontWeight: "900", letterSpacing: "-1px", color: primary }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", color: accent, fontWeight: "700", marginTop: "4px", textTransform: "uppercase" }} />
        </div>
        <div style={{ textAlign: "right", fontSize: "10px", fontWeight: "600" }}>
          <div><E value={location} onChange={(v) => u("location", v)} /> | <E value={phone} onChange={(v) => u("phone", v)} /></div>
          <div><E value={email} onChange={(v) => u("email", v)} /></div>
          <div style={{ color: accent, marginTop: "2px" }}><E value={github} onChange={(v) => u("github", v)} /></div>
        </div>
      </div>

      <div style={{ padding: "10mm 15mm" }}>
        
        {/* SUMMARY SECTION */}
        <div style={{ marginBottom: "30px" }}>
          <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", color: primary, letterSpacing: "1px" }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.7", color: textGray, borderTop: `1px solid ${borderCol}`, paddingTop: "8px" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "40px" }}>
          
          {/* LEFT: ENGINEERING EXPERIENCE */}
          <div style={{ borderRight: `1px solid ${borderCol}`, paddingRight: "25px" }}>
            <div style={{ fontSize: "14px", fontWeight: "900", textTransform: "uppercase", marginBottom: "20px", display: "inline-block", borderBottom: `3px solid ${accent}` }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "12.5px" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ color: accent, fontSize: "10px" }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "700", fontSize: "11px", color: primary, display: "block", marginTop: "4px" }} />
                    <ul style={{ margin: "10px 0", paddingLeft: "0", listStyleType: "none" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "10.5px", marginBottom: "8px", color: textGray, display: "flex", gap: "10px" }}>
                          <span style={{ color: accent, fontWeight: "bold" }}>↳</span>
                          <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* RIGHT: TECH STACK & CLOUD */}
          <div>
            <div style={{ marginBottom: "25px" }}>
              <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px", color: primary }}>
                <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
              </div>
              {skills.map((s, i) => (
                <div key={i} style={{ fontSize: "10px", marginBottom: "12px", borderLeft: `2px solid ${primary}`, paddingLeft: "10px", fontWeight: "600" }}>
                  <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "25px" }}>
              <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px" }}>
                <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {tools.map((t, i) => (
                  <span key={i} style={{ border: `1px solid ${primary}`, padding: "3px 8px", fontSize: "9px", fontWeight: "bold", borderRadius: "1px" }}>
                    <E value={t} onChange={(v) => { const a = ref.current.tools.map((item, j) => j === i ? v : item); u("tools", a); }} />
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "30px", background: lightBg, padding: "15px", border: `1px dashed ${borderCol}` }}>
              <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "10px" }}>
                <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              </div>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10.5px" }} />
                  <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "9.5px", color: textGray }} />
                  <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "9.5px", color: accent, fontWeight: "bold" }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default BackendDevTemplate;