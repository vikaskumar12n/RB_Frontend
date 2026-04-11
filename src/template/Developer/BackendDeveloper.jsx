import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Modern Minimalist Palette
const black      = "#111827"; // Slate Black
const gray       = "#6b7280"; // Muted Gray
const divider    = "#e5e7eb"; // Subtle Line

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
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", color: black, padding: "20mm 15mm", boxSizing: "border-box" }}>
      
      {/* HEADER SECTION - CENTERED & BOLD */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "32px", fontWeight: "900", letterSpacing: "1px", textTransform: "uppercase" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", color: gray, fontWeight: "600", marginTop: "5px", letterSpacing: "2px", textTransform: "uppercase" }} />
        
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "15px", fontSize: "11px", fontWeight: "500" }}>
          <span><E value={location} onChange={(v) => u("location", v)} /></span>
          <span style={{ color: divider }}>|</span>
          <span><E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span style={{ color: divider }}>|</span>
          <span><E value={email} onChange={(v) => u("email", v)} /></span>
        </div>
        <div style={{ fontSize: "11px", marginTop: "5px", fontWeight: "bold" }}>
          <E value={github} onChange={(v) => u("github", v)} /> 
          <span style={{ margin: "0 10px", color: divider }}>•</span>
          <E value={linkedin} onChange={(v) => u("linkedin", v)} />
        </div>
      </div>

      <hr style={{ border: "none", borderTop: `1px solid ${divider}`, marginBottom: "25px" }} />

      {/* TWO COLUMN CONTENT */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2.2fr", gap: "40px" }}>
        
        {/* LEFT COLUMN - SIDEBAR STYLE */}
        <div style={{ borderRight: `1px solid ${divider}`, paddingRight: "20px" }}>
          
          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "12px", color: black }}>{skillsTitle}</h3>
            {skills.map((s, i) => (
              <div key={i} style={{ fontSize: "10.5px", marginBottom: "10px", lineHeight: "1.4" }}>
                <E value={s} onChange={(v) => { /* Logic */ }} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "12px", color: black }}>{toolsTitle}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {tools.map((t, i) => (
                <div key={i} style={{ fontSize: "10.5px", display: "flex", alignItems: "center" }}>
                   <span style={{ color: gray, marginRight: "8px" }}>—</span>
                   <E value={t} onChange={(v) => { /* Logic */ }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "12px", color: black }}>{eduTitle}</h3>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "15px" }}>
                <E value={edu.degree} onChange={(v) => { /* Logic */ }} block style={{ fontWeight: "700", fontSize: "10.5px" }} />
                <E value={edu.school} onChange={(v) => { /* Logic */ }} block style={{ fontSize: "10px", color: gray }} />
                <E value={edu.year} onChange={(v) => { /* Logic */ }} style={{ fontSize: "10px", fontWeight: "bold" }} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN - MAIN CONTENT */}
        <div>
          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "10px", color: black }}>{summaryTitle}</h3>
            <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6", textAlign: "justify", color: "#374151" }} />
          </div>

          <div>
            <h3 style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px", color: black }}>{experienceTitle}</h3>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <E value={exp.company} onChange={(v) => { /* Logic */ }} style={{ fontWeight: "800", fontSize: "13px" }} />
                  <E value={exp.period} onChange={(v) => { /* Logic */ }} style={{ fontSize: "10px", fontWeight: "600", color: gray }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri} style={{ marginTop: "4px" }}>
                    <E value={role.title} onChange={(v) => { /* Logic */ }} style={{ fontWeight: "700", fontSize: "11px", fontStyle: "italic", display: "block", marginBottom: "8px" }} />
                    <ul style={{ margin: "0", paddingLeft: "15px" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "11px", marginBottom: "6px", color: "#374151", lineHeight: "1.5" }}>
                          <E value={b} onChange={(v) => { /* Logic */ }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BackendDevTemplate;