import React, { useState, useCallback, useRef } from "react";
import EditableSpan from "../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

const API_URL = "http://localhost:3000/api/resume/save";
const teal = "#0f766e";
const lightTeal = "#f0fdfa";

// ─── Default data ──────────────────────────────────────────────────────────────
const getInitialData = () => ({
  name: "FIRST LAST",
  location: "Bay Area, California",
  phone: "+1-234-456-789",
  email: "professionalemail@resumeworded.com",
  linkedin: "linkedin.com/in/username",

  // ✅ Editable section titles (SoftwareEnn feature)
  objectiveTitle:      "Objective",
  experienceTitle:     "Professional Experience",
  projectTitle:        "Projects",
  educationTitle:      "Education",
  skillsTitle:         "Skills",
  certificationTitle:  "Certifications",

  objective: `Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications. Proficient in front-end and back-end technologies, including HTML, CSS, JavaScript, React, Node.js, and database systems like MongoDB and MySQL.`,

  skills: [
    ["HTML", "CSS", "JavaScript", "React"],
    ["Node.js", "Express", "MongoDB", "SQL"],
  ],

  experience: [
    {
      company: "XYZ Solutions Pvt. Ltd.",
      period: "2018 – Present",
      roles: [{
        title: "Front End Developer, React",
        period: "", // ✅ role-level period (SoftwareEnn feature)
        bullets: [
          "Contributed to the development of a full-scale CRM (DSS) project.",
          "Built and integrated key modules like Finance, Accounts, and HR.",
          "Improved system performance through efficient backend logic and clean architecture.",
          "Collaborated with the team to deliver real-world business features.",
        ],
      }],
    },
    {
      company: "Technano Pvt. Ltd., Noida",
      period: "2014 – 2017",
      roles: [{
        title: "Front End Developer",
        period: "", // ✅ role-level period
        bullets: [
          "Built fast and accessible websites improving load time by 22%.",
          "Converted UI/UX wireframes into responsive code.",
        ],
      }],
    },
  ],

  education: [{
    school: "Millennium Group of Institutions",
    year: "2013",
    degree: "Bachelor of Engineering, Information Technology",
  }],

  projects: [
    {
      title: "CRM (Customer Relationship Management)",
      description: "Worked on a complete CRM system with Finance, Accounts, and HR modules.",
    },
    {
      title: "E-commerce Website",
      description: "Developed full stack e-commerce platform with authentication and payment integration.",
    },
  ],

  certifications: [
    "Full Stack Web Development - Udemy",
    "React Developer Certification",
  ],
});

// ─── API payload builder ───────────────────────────────────────────────────────
const buildPayload = (data) => ({
  personalInfo: {
    name:     data.name,
    email:    data.email,
    phone:    data.phone,
    location: data.location,
    linkedin: data.linkedin,
  },
  objective: data.objective,
  skills: {
    frontend: data.skills?.[0] ?? [],
    backend:  data.skills?.[1] ?? [],
    database: data.skills?.[2] ?? [],
    tools:    data.skills?.[3] ?? [],
    other:    data.skills?.[4] ?? [],
  },
  education: data.education.map((edu) => ({
    degree:      edu.degree,
    college:     edu.school,
    year:        edu.year,
    description: edu.description || "",
  })),
  experience: data.experience.map((exp) => ({
    role:             exp.roles?.[0]?.title || "",
    company:          exp.company,
    duration:         exp.period,
    responsibilities: exp.roles?.[0]?.bullets || [],
  })),
  projects: data.projects.map((proj) => ({
    title:        proj.title,
    description:  proj.description,
    technologies: proj.technologies || [],
    features:     proj.features || [],
    link:         proj.link || "",
  })),
  certifications: data.certifications.map((cert) =>
    typeof cert === "string"
      ? { title: cert, organization: "", year: "" }
      : cert
  ),
});

// ─── Section Heading ───────────────────────────────────────────────────────────
const SectionHead = ({ children }) => (
  <div style={{ marginTop: "10px", marginBottom: "5px", display: "flex", alignItems: "center", gap: "8px" }}>
    <div style={{ width: "6px", height: "6px", background: teal, borderRadius: "50%", flexShrink: 0 }} />
    <span style={{ fontSize: "9px", fontFamily: "'Trebuchet MS', sans-serif", fontWeight: "bold", letterSpacing: "3px", textTransform: "uppercase", color: teal }}>
      {children}
    </span>
    <div style={{ flex: 1, height: "1px", background: "#d1faf4" }} />
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const ClassicTemplate = ({ data: propData, setData: setPropData }) => {
  // ✅ Local state with merged initial data
  const [data, setDataState] = useState(() => ({
    ...getInitialData(),
    ...(propData || {}),
  }));

  // ✅ dataRef to avoid stale closures
  const dataRef = useRef(data);

  const setData = (newData) => {
    setDataState(newData);
    dataRef.current = newData;
    if (setPropData) setPropData(newData);
  };

  const u = (f, v) => {
    const newData = { ...dataRef.current, [f]: v };
    setData(newData);
  };

  // ─── Save logic ──────────────────────────────────────────────────────────────
  

  // ─── Destructure ─────────────────────────────────────────────────────────────
  const {
    name, location, phone, email, linkedin,
    objectiveTitle, experienceTitle, projectTitle,
    educationTitle, skillsTitle, certificationTitle,
    objective, projects, certifications, experience, education, skills,
  } = data;

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: "relative" }}>

      {/* ── SAVE BUTTON ── */}
    

      {/* ── RESUME BODY ── */}
      <div
        id="resume"
        style={{
          width: "210mm", minHeight: "297mm", fontFamily: "'Georgia', Times, serif",
          fontSize: "10.5px", lineHeight: "1.5", backgroundColor: "#fff",
          color: "#1a1a1a", boxSizing: "border-box",
        }}
      >

        {/* ── HEADER ── */}
        <div style={{ background: teal, padding: "10mm 14mm 8mm" }}>
          <E
            value={name}
            onChange={(v) => u("name", v)}
            block
            style={{ fontSize: "24px", fontWeight: "bold", color: "#fff", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "'Georgia', serif" }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0 16px", marginTop: "6px", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "9px", color: "#cffaf4" }}>
            <E value={location} onChange={(v) => u("location", v)} />
            <E value={phone}    onChange={(v) => u("phone", v)} />
            <E value={email}    onChange={(v) => u("email", v)} />
            <E value={linkedin} onChange={(v) => u("linkedin", v)} />
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ padding: "6mm 14mm 14mm" }}>

          {/* OBJECTIVE — ✅ editable title */}
          <SectionHead>
            <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} style={{ color: teal }} />
          </SectionHead>
          <div style={{ background: lightTeal, borderLeft: `3px solid ${teal}`, padding: "6px 10px", fontSize: "10px", lineHeight: "1.7", color: "#333", fontFamily: "'Trebuchet MS', sans-serif" }}>
            <E value={objective} onChange={(v) => u("objective", v)} block />
          </div>

          {/* EXPERIENCE — ✅ editable title */}
          <SectionHead>
            <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} style={{ color: teal }} />
          </SectionHead>
          {experience.map((exp, ei) => (
            <div key={ei} style={{ marginTop: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <E
                  value={exp.company}
                  onChange={(v) => {
                    const a = dataRef.current.experience.map((e, i) =>
                      i === ei ? { ...e, company: v } : e
                    );
                    u("experience", a);
                  }}
                  style={{ fontWeight: "bold", fontSize: "11px", color: "#111" }}
                />
                <E
                  value={exp.period}
                  onChange={(v) => {
                    const a = dataRef.current.experience.map((e, i) =>
                      i === ei ? { ...e, period: v } : e
                    );
                    u("experience", a);
                  }}
                  style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "9px", color: teal, fontWeight: "bold", whiteSpace: "nowrap", marginLeft: "8px" }}
                />
              </div>

              {exp.roles.map((role, ri) => (
                <div key={ri} style={{ marginTop: "3px", paddingLeft: "8px" }}>

                  {/* ✅ Role title + role-level period (SoftwareEnn feature) */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <E
                      value={role.title}
                      onChange={(v) => {
                        const a = dataRef.current.experience.map((e, i) => {
                          if (i !== ei) return e;
                          const roles = e.roles.map((r, j) =>
                            j === ri ? { ...r, title: v } : r
                          );
                          return { ...e, roles };
                        });
                        u("experience", a);
                      }}
                      style={{ fontStyle: "italic", color: "#555", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "10px", display: "block", marginBottom: "2px" }}
                    />
                    {/* ✅ role.period — editable (SoftwareEnn feature) */}
                    <E
                      value={role.period || ""}
                      onChange={(v) => {
                        const a = dataRef.current.experience.map((e, i) => {
                          if (i !== ei) return e;
                          const roles = e.roles.map((r, j) =>
                            j === ri ? { ...r, period: v } : r
                          );
                          return { ...e, roles };
                        });
                        u("experience", a);
                      }}
                      style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "9px", color: "#888", whiteSpace: "nowrap", marginLeft: "8px" }}
                    />
                  </div>

                  <ul style={{ paddingLeft: "14px", margin: 0 }}>
                    {role.bullets.map((b, bi) => (
                      <li key={bi} style={{ listStyle: "none", display: "flex", gap: "6px", marginTop: "2px", alignItems: "flex-start" }}>
                        <span style={{ color: teal, marginTop: "1px", fontSize: "8px" }}>▶</span>
                        <E
                          value={b}
                          onChange={(v) => {
                            const a = dataRef.current.experience.map((e, i) => {
                              if (i !== ei) return e;
                              const roles = e.roles.map((r, j) => {
                                if (j !== ri) return r;
                                const bullets = r.bullets.map((bul, k) =>
                                  k === bi ? v : bul
                                );
                                return { ...r, bullets };
                              });
                              return { ...e, roles };
                            });
                            u("experience", a);
                          }}
                          style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "10px", lineHeight: "1.6" }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          {/* PROJECTS — ✅ editable title + ✅ editable project title (SoftwareEnn feature) */}
          <SectionHead>
            <E value={projectTitle} onChange={(v) => u("projectTitle", v)} style={{ color: teal }} />
          </SectionHead>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginTop: "6px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
              {/* ✅ Project title now editable (was static badge before) */}
              <span style={{ color: "#fff", background: teal, fontSize: "8px", padding: "1px 5px", borderRadius: "2px", whiteSpace: "nowrap", fontFamily: "'Trebuchet MS', sans-serif", marginTop: "2px", flexShrink: 0 }}>
                <E
                  value={proj.title}
                  onChange={(v) => {
                    const a = dataRef.current.projects.map((p, j) =>
                      j === i ? { ...p, title: v } : p
                    );
                    u("projects", a);
                  }}
                  style={{ color: "#fff" }}
                />
              </span>
              <E
                value={proj.description}
                onChange={(v) => {
                  const a = dataRef.current.projects.map((p, j) =>
                    j === i ? { ...p, description: v } : p
                  );
                  u("projects", a);
                }}
                style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "10px", lineHeight: "1.6", color: "#333" }}
              />
            </div>
          ))}

          {/* EDUCATION — ✅ editable title */}
          <SectionHead>
            <E value={educationTitle} onChange={(v) => u("educationTitle", v)} style={{ color: teal }} />
          </SectionHead>
          {education.map((edu, i) => (
            <div key={i} style={{ marginTop: "5px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <E
                  value={edu.school}
                  onChange={(v) => {
                    const a = dataRef.current.education.map((e, j) =>
                      j === i ? { ...e, school: v } : e
                    );
                    u("education", a);
                  }}
                  style={{ fontWeight: "bold", fontSize: "11px" }}
                />
                <E
                  value={edu.degree}
                  onChange={(v) => {
                    const a = dataRef.current.education.map((e, j) =>
                      j === i ? { ...e, degree: v } : e
                    );
                    u("education", a);
                  }}
                  block
                  style={{ fontStyle: "italic", color: "#555", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "10px" }}
                />
              </div>
              <E
                value={edu.year}
                onChange={(v) => {
                  const a = dataRef.current.education.map((e, j) =>
                    j === i ? { ...e, year: v } : e
                  );
                  u("education", a);
                }}
                style={{ background: lightTeal, border: `1px solid ${teal}`, color: teal, fontSize: "9px", padding: "1px 7px", borderRadius: "10px", fontFamily: "'Trebuchet MS', sans-serif", whiteSpace: "nowrap", fontWeight: "bold" }}
              />
            </div>
          ))}

          {/* SKILLS — ✅ editable title */}
          <SectionHead>
            <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} style={{ color: teal }} />
          </SectionHead>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "4px" }}>
            {skills.map((row, ri) =>
              row.map((cell, ci) =>
                cell ? (
                  <div key={`${ri}-${ci}`} style={{ background: lightTeal, border: `1px solid #99f6e4`, borderRadius: "3px", padding: "2px 9px", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "9.5px", color: "#0f5a55" }}>
                    <E
                      value={cell}
                      onChange={(v) => {
                        const a = dataRef.current.skills.map((r) => [...r]);
                        a[ri][ci] = v;
                        u("skills", a);
                      }}
                      style={{ color: "#0f5a55" }}
                    />
                  </div>
                ) : null
              )
            )}
          </div>

          {/* CERTIFICATIONS — ✅ editable title */}
          <SectionHead>
            <E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} style={{ color: teal }} />
          </SectionHead>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", marginTop: "4px" }}>
            {certifications.map((cert, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "10px", color: "#333" }}>
                <span style={{ width: "7px", height: "7px", background: teal, borderRadius: "50%", flexShrink: 0, display: "inline-block" }} />
                <E
                  value={cert}
                  onChange={(v) => {
                    const a = dataRef.current.certifications.map((c, j) =>
                      j === i ? v : c
                    );
                    u("certifications", a);
                  }}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClassicTemplate;