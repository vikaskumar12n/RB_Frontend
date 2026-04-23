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
const white = "#ffffff";
const grayText = "#4b5563";

const getInitialData = () => ({
  name: "INTERN NAME",
  title: "Software Engineering Intern | Aspiring Web Developer",
  location: "Bengaluru, India",
  phone: "+91-77777-66666",
  email: "intern.dev@techmail.com",
  github: "github.com/intern-coder",
  linkedin: "linkedin.com/in/aspiring-dev",
  objectiveTitle: "Objective",
  skillsTitle: "Technical Skills",
  projectsTitle: "Key Projects",
  eduTitle: "Education",
  certTitle: "Certifications & Achievements",
  objective: `Highly motivated Computer Science student seeking a challenging Software Engineering Internship. Eager to apply strong foundations in data structures, algorithms, and full-stack development to contribute to innovative projects. Quick learner with a passion for coding and problem-solving.`,
  skills: [
    "Languages: Python, Java, JavaScript (ES6+), SQL",
    "Frontend: HTML5, CSS3, React.js, Tailwind CSS",
    "Backend: Node.js, Express.js, Basic Flask",
    "Tools: Git/GitHub, VS Code, Postman, Linux Basics"
  ],
  projects: [
    {
      name: "E-Commerce Product API",
      tech: "Node.js, Express, MongoDB",
      bullets: [
        "Built a RESTful API for managing products, users, and orders with full CRUD functionality.",
        "Implemented JWT authentication and bcrypt for password hashing to secure user data.",
        "Deployed the application on Heroku and documented the API using Postman."
      ],
    },
    {
      name: "Weather App Dashboard",
      tech: "React.js, Fetch API, Tailwind CSS",
      bullets: [
        "Developed a responsive single-page application that displays real-time weather data for searched cities.",
        "Integrated the OpenWeatherMap API and optimized API calls to improve performance."
      ],
    },
  ],
  education: [{
    school: "Indian Institute of Technology (IIT) / NIT",
    year: "Expected Graduation: 2025",
    degree: "B.Tech in Computer Science & Engineering",
  }],
  certs: [
    "HackerRank Problem Solving (Intermediate) Certificate",
    "AWS Certified Cloud Practitioner (Pursuing)",
    "Udemy: Modern React with Redux [Complete Guide]",
    "Dean's List - Semester 3, 4"
  ],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "13px", fontWeight: "900", paddingBottom: "5px", textTransform: "uppercase", marginBottom: "12px", borderBottom: `2px solid ${black}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const TechInternTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setDataFunc = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setDataFunc({ ...ref.current, [f]: v });

  // ========== PROJECTS FUNCTIONS ==========
  const addProject = () => {
    u("projects", [...ref.current.projects, { name: "New Project", tech: "Tech Stack", bullets: ["New bullet point"] }]);
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

  // ========== CERTIFICATIONS FUNCTIONS ==========
  const addCert = () => u("certs", [...ref.current.certs, "New certification"]);
  const removeCert = (i) => u("certs", ref.current.certs.filter((_, idx) => idx !== i));
  const copyCert = (i) => u("certs", [...ref.current.certs, ref.current.certs[i] + " (Copy)"]);

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
  const updateCertField = (i, value) => {
    const updated = ref.current.certs.map((c, idx) => idx === i ? value : c);
    u("certs", updated);
  };

  const { name, title, location, phone, email, github, linkedin, objectiveTitle, skillsTitle, projectsTitle, eduTitle, certTitle, objective, skills, projects, education, certs } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'IBM Plex Mono', monospace", backgroundColor: white, color: black, padding: "15mm 20mm", boxSizing: "border-box" }}>

        {/* CODE-STYLE HEADER - CENTERED */}
        <div style={{ textAlign: "center", marginBottom: "12mm", borderBottom: `2px solid ${black}`, paddingBottom: "7px" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-1px" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "12px", fontWeight: "700", marginTop: "5px", textTransform: "uppercase" }} />

          <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "12px", fontSize: "10px", fontWeight: "500" }}>
            <span><E value={location} onChange={(v) => u("location", v)} /></span>
            <span>•</span>
            <span><E value={phone} onChange={(v) => u("phone", v)} /></span>
            <span>•</span>
            <span><E value={email} onChange={(v) => u("email", v)} /></span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "5px", fontSize: "10px", fontWeight: "700" }}>
            <span><E value={github} onChange={(v) => u("github", v)} /></span>
            <span>|</span>
            <span><E value={linkedin} onChange={(v) => u("linkedin", v)} /></span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>

          {/* OBJECTIVE SECTION */}
          <div style={{ marginBottom: "15px" }}>
            <SectionTitle>
              <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
            </SectionTitle>
            <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "11px", lineHeight: "1.7", textAlign: "justify" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "40px" }}>

            {/* LEFT: PROJECTS SECTION */}
            <div>
              <SectionTitle showAdd={true} onAdd={addProject}>
                <E value={projectsTitle} onChange={(v) => u("projectsTitle", v)} />
              </SectionTitle>

              {projects.map((proj, pi) => (
                <div key={pi} className="hoverable-row" style={{ marginBottom: "25px", borderBottom: pi !== projects.length - 1 ? `1px dashed ${grayText}` : "none", paddingBottom: "15px", position: "relative" }}>
                  <div style={{ position: "absolute", left: "-6px", top: "0", bottom: "0", width: "1px", background: black }} />
                  <div style={{ position: "absolute", left: "-3.5px", top: "2px", width: "6px", height: "6px", borderRadius: "50%", background: white, border: `1.5px solid ${black}` }} />

                  <div style={{ paddingLeft: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6 }}>
                      <div style={{ fontWeight: "800", fontSize: "13px", textTransform: "uppercase" }}>
                        <E value={proj.name} onChange={(v) => updateProjectField(pi, "name", v)} />
                      </div>
                      <div style={{ display: "flex", gap: 3 }}>
                        <IconBtn onClick={() => copyProject(pi)} color="#6366f1"><Copy size={8} /></IconBtn>
                        <IconBtn onClick={() => removeProject(pi)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                      </div>
                    </div>
                    <E value={proj.tech} onChange={(v) => updateProjectField(pi, "tech", v)} style={{ fontWeight: "700", fontSize: "10px", color: grayText, fontStyle: "italic", marginTop: "2px" }} />

                    <ul style={{ margin: "10px 0", paddingLeft: "15px", listStyleType: "square" }}>
                      {proj.bullets.map((b, bi) => (
                        <li key={bi} className="hoverable-row" style={{ fontSize: "10.5px", marginBottom: "6px", lineHeight: "1.5", display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
                          <span>•</span>
                          <E value={b} onChange={(v) => updateBulletField(pi, bi, v)} style={{ flex: 1 }} />
                          <IconBtn onClick={() => copyBullet(pi, bi)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={6} /></IconBtn>
                          <IconBtn onClick={() => removeBullet(pi, bi)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={6} /></IconBtn>
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: SKILLS & EDUCATION & CERTS */}
            <div>
              {/* SKILLS */}
              <div style={{ marginBottom: "30px" }}>
                <SectionTitle showAdd={true} onAdd={addSkill}>
                  <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
                </SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {skills.map((s, i) => (
                    <div key={i} className="hoverable-row" style={{ fontSize: "10px", fontWeight: "600", borderLeft: `2px solid ${black}`, paddingLeft: "8px", display: "flex", alignItems: "center", gap: 6 }}>
                      <E value={s} onChange={(v) => updateSkillField(i, v)} style={{ flex: 1 }} />
                      <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                      <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                    </div>
                  ))}
                </div>
              </div>

              {/* EDUCATION */}
              <div style={{ marginBottom: "30px" }}>
                <SectionTitle showAdd={true} onAdd={addEducation}>
                  <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
                </SectionTitle>
                {education.map((edu, i) => (
                  <div key={i} className="hoverable-row" style={{ marginBottom: "15px", borderBottom: i !== education.length - 1 ? `1px dashed ${grayText}` : "none", paddingBottom: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                      <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "800", fontSize: "11px", flex: 1 }} />
                      <div style={{ display: "flex", gap: 3 }}>
                        <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                        <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                      </div>
                    </div>
                    <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "10px", marginTop: "2px" }} />
                    <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "10px", fontWeight: "800" }} />
                  </div>
                ))}
              </div>

              {/* CERTIFICATIONS */}
              <div style={{ border: `2px dashed ${black}`, padding: "15px" }}>
                <SectionTitle showAdd={true} onAdd={addCert}>
                  <E value={certTitle} onChange={(v) => u("certTitle", v)} />
                </SectionTitle>
                {certs.map((c, i) => (
                  <div key={i} className="hoverable-row" style={{ fontSize: "9.5px", marginBottom: "6px", fontWeight: "500", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: "bold" }}>[]</span>
                    <E value={c} onChange={(v) => updateCertField(i, v)} style={{ flex: 1 }} />
                    <IconBtn onClick={() => copyCert(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                    <IconBtn onClick={() => removeCert(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
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

export default TechInternTemplate;