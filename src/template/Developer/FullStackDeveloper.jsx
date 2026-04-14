import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Essential Monochrome Palette
const black      = "#000000";
const secondary  = "#4b5563"; 
const divider    = "#000000"; // Solid black line for sections

const getInitialData = () => ({
  name: "FULL STACK DEVELOPER",
  contact: "+91-98765-43210 | Bangalore, India",
  links: "dev.expert@stack.com | github.com/dev-pro | linkedin.com/in/fullstack-master",

  objectiveTitle: "OBJECTIVE",
  objective: "Performance-driven Full Stack Developer with 5+ years of experience in designing and deploying scalable web applications. Expert in React.js, Node.js, and Distributed Systems. Proven ability to optimize database performance and implement robust CI/CD pipelines.",

  skillsTitle: "SKILLS",
  skillsList: "React, Next.js, TypeScript, Node.js, Express, Python, MongoDB, PostgreSQL, Redis, REST, GraphQL, WebSockets, Docker, Kubernetes, AWS (EC2, S3, Lambda), Git, Nginx, Jenkins",

  experienceTitle: "EXPERIENCE",
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Tech Giant Systems, Bangalore",
      period: "2021 – Present",
      bullets: [
        "Led the migration of a monolithic legacy system to a Microservices architecture.",
        "Improved application load time by 40% through code-splitting and server-side rendering.",
        "Integrated secure payment gateways and OAuth2 authentication protocols.",
        "Mentored 10+ junior developers and conducted rigorous code reviews."
      ],
    },
    {
      role: "Full Stack Developer",
      company: "FastScale Startup, Remote",
      period: "2018 – 2021",
      bullets: [
        "Developed and launched an MVP that scaled to 100k+ active users within 6 months.",
        "Built real-time dashboard using Socket.io for live data monitoring."
      ],
    },
  ],

  educationTitle: "EDUCATION",
  education: [
    { degree: "B.Tech in Computer Science", school: "Indian Institute of Technology (IIT)", year: "2018" },
  ],

  projectsTitle: "PROJECTS",
  projects: [
    {
      name: "Distributed E-commerce Engine",
      desc: "Built a high-concurrency engine using Node.js and Redis that handles 5000+ requests per second."
    },
    {
      name: "Real-time Collaboration Tool",
      desc: "Developed a shared workspace application with live document editing using WebSockets and CRDTs."
    }
  ],

  certTitle: "CERTIFICATIONS",
  certs: [
    "AWS Certified Solutions Architect",
    "Meta Front-End Developer Professional Certificate"
  ]
});

const FullStackMinimalTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, contact, links, objectiveTitle, objective, skillsTitle, skillsList, experienceTitle, experience, educationTitle, education, projectsTitle, projects, certTitle, certs } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", color: black, padding: "15mm", boxSizing: "border-box" }}>
      
      {/* HEADER - CENTERED */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "26px", fontWeight: "900", letterSpacing: "-1px" }} />
        <div style={{ fontSize: "11px", marginTop: "5px", color: secondary }}>
          <E value={contact} onChange={(v) => u("contact", v)} />
        </div>
        <div style={{ fontSize: "11px", fontWeight: "bold", marginTop: "2px" }}>
          <E value={links} onChange={(v) => u("links", v)} />
        </div>
      </div>

      {/* OBJECTIVE */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom:"6px", marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
        </h3>
        <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "11px", lineHeight: "1.5", textAlign: "justify" }} />
      </div>

      {/* SKILLS */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom:"6px", marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
        </h3>
        <div style={{ fontSize: "11px", lineHeight: "1.4" }}>
          <span style={{ fontWeight: "bold" }}>Technical Stack: </span>
          <E value={skillsList} onChange={(v) => u("skillsList", v)} />
        </div>
      </div>

      {/* EXPERIENCE */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom:"6px", marginBottom: "12px", textTransform: "uppercase" }}>
          <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
        </h3>
        {experience.map((exp, ei) => (
          <div key={ei} style={{ marginBottom: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px" }}>
              <E value={exp.role} onChange={() => {}} />
              <E value={exp.period} onChange={() => {}} />
            </div>
            <div style={{ fontSize: "11px", fontStyle: "italic", marginBottom: "5px", color: secondary }}>
              <E value={exp.company} onChange={() => {}} />
            </div>
            <ul style={{ margin: "0", paddingLeft: "18px", fontSize: "11px" }}>
              {exp.bullets.map((b, bi) => (
                <li key={bi} style={{ marginBottom: "4px", lineHeight: "1.4" }}><E value={b} onChange={() => {}} /></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom:"6px", marginBottom: "10px", textTransform: "uppercase" }}>
          <E value={educationTitle} onChange={(v) => u("educationTitle", v)} />
        </h3>
        {education.map((edu, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px" }}>
            <div style={{ fontWeight: "bold" }}>
              <E value={edu.degree} onChange={() => {}} /> | <span style={{ fontWeight: "normal" }}><E value={edu.school} onChange={() => {}} /></span>
            </div>
            <E value={edu.year} onChange={() => {}} style={{ fontWeight: "bold" }} />
          </div>
        ))}
      </div>

      {/* PROJECTS */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom:"6px", marginBottom: "10px", textTransform: "uppercase" }}>
          <E value={projectsTitle} onChange={(v) => u("projectsTitle", v)} />
        </h3>
        {projects.map((proj, i) => (
          <div key={i} style={{ marginBottom: "8px", fontSize: "11px" }}>
            <div style={{ fontWeight: "bold" }}><E value={proj.name} onChange={() => {}} /></div>
            <E value={proj.desc} onChange={() => {}} block />
          </div>
        ))}
      </div>

      {/* CERTIFICATIONS */}
      <div>
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom:"6px", marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={certTitle} onChange={(v) => u("certTitle", v)} />
        </h3>
        <ul style={{ margin: "0", paddingLeft: "18px", fontSize: "11px" }}>
          {certs.map((c, i) => (
            <li key={i} style={{ marginBottom: "3px" }}><E value={c} onChange={() => {}} /></li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default FullStackMinimalTemplate;