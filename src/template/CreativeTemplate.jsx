import React, { useState, useCallback, useRef } from "react";
import EditableSpan from "../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

const API_URL = "http://localhost:3000/api/resume/save";

const accent = "#c0392b";
const dark   = "#1a1a2e";
const mid    = "#16213e";
const light  = "#f0ede8";
const muted  = "#8a8a9a";

// ─── Default data ──────────────────────────────────────────────────────────────
const getInitialData = () => ({
  name:     "FIRST LAST",
  location: "Bay Area, California",
  phone:    "+1-234-456-789",
  email:    "professionalemail@resumeworded.com",
  linkedin: "linkedin.com/in/username",

  objectiveTitle:     "Objective",
  experienceTitle:    "Professional Experience",
  projectTitle:       "Projects",
  educationTitle:     "Education",
  skillsTitle:        "Skills",
  certificationTitle: "Certifications",

  objective: `Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining
scalable web applications. Proficient in front-end and back-end technologies, including HTML, CSS, JavaScript,
React, Node.js, and database systems like MongoDB and MySQL. Skilled in problem-solving, collaboration, and
delivering user-focused solutions.`,

  skills: [
    ["HTML", "CSS", "JavaScript", "React"],
    ["Node.js", "Express", "MongoDB", "SQL"],
  ],

  experience: [
    {
      company: "XYZ Solutions Pvt. Ltd.",
      period:  "2018 – Present",
      roles: [{
        title:  "Front End Developer, React",
        period: "", // ✅ role-level period (SoftwareEnn feature)
        bullets: [
          "Contributed to the development of a full-scale CRM (DSS) project.",
          "Built and integrated key modules like Finance, Accounts, and HR.",
          "Improved system performance through efficient backend logic and clean architecture.",
          "Collaborated with the team to deliver real-world business features and ensure seamless frontend–backend integration.",
        ],
      }],
    },
    {
      company: "Technano Pvt. Ltd., Noida",
      period:  "2014 – 2017",
      roles: [{
        title:  "Front End Developer",
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
    year:   "2013",
    degree: "Bachelor of Engineering, Information Technology",
  }],

  projects: [
    {
      title: "CRM (Customer Relationship Management)",
      description: `Worked on a complete CRM system that includes multiple business-critical modules.
Finance Module: Payment tracking, invoices, salary processing, and financial data handling.
Accounts Module: Account records management, transaction monitoring, and data validation.
HR Module: Employee management, attendance, leave handling, and recruitment support features.`,
    },
    {
      title:       "E-commerce Website",
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
    features:     proj.features    || [],
    link:         proj.link        || "",
  })),
  certifications: data.certifications.map((cert) =>
    typeof cert === "string"
      ? { title: cert, organization: "", year: "" }
      : cert
  ),
});

// ─── Left sidebar section heading ─────────────────────────────────────────────
const SectionHeading = ({ children }) => (
  <div style={{
    fontSize: "8px", fontFamily: "'Trebuchet MS', sans-serif",
    letterSpacing: "3px", textTransform: "uppercase", color: accent,
    borderBottom: "1px solid #ffffff20", paddingBottom: "4px", fontWeight: "bold",
  }}>
    {children}
  </div>
);

// ─── Right column section heading ─────────────────────────────────────────────
const RightHeading = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
    <span style={{
      fontSize: "8px", fontFamily: "'Trebuchet MS', sans-serif",
      letterSpacing: "3px", textTransform: "uppercase", color: accent, fontWeight: "bold",
    }}>
      {children}
    </span>
    <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, ${accent}, transparent)` }} />
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const CreativeTemplate = ({ data: propData, setData: setPropData }) => {
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
 

      {/* ── RESUME BODY ── */}
      <div
        id="resume"
        style={{
          width: "210mm", minHeight: "297mm",
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: "10px", background: light,
          display: "flex", flexDirection: "column",
        }}
      >

        {/* ── HEADER ── */}
        <div style={{
          background: dark, padding: "10mm 12mm 8mm",
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", borderBottom: `4px solid ${accent}`,
        }}>
          <div>
            <div style={{ fontSize: "9px", color: accent, letterSpacing: "4px", textTransform: "uppercase", fontFamily: "'Trebuchet MS', sans-serif", marginBottom: "4px" }}>
              ◆ Resume
            </div>
            <E value={name} onChange={(v) => u("name", v)} block
              style={{ fontSize: "28px", fontWeight: "bold", color: "#fff", letterSpacing: "1px", lineHeight: 1.1, fontFamily: "'Georgia', serif" }}
            />
          </div>
          <div style={{ textAlign: "right", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "9px", color: muted, lineHeight: "1.9" }}>
            <E value={location} onChange={(v) => u("location", v)} style={{ color: "#ccc" }} />
            <E value={phone}    onChange={(v) => u("phone", v)}    style={{ color: "#ccc" }} />
            <E value={email}    onChange={(v) => u("email", v)}    style={{ color: accent }} />
            <E value={linkedin} onChange={(v) => u("linkedin", v)} style={{ color: accent }} />
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ display: "flex", flex: 1 }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{ width: "62mm", background: mid, padding: "8mm 7mm", display: "flex", flexDirection: "column", gap: "7mm" }}>

            {/* SKILLS — ✅ editable title */}
            <div>
              <SectionHeading>
                <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} style={{ color: accent }} />
              </SectionHeading>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "6px" }}>
                {skills.map((row, ri) =>
                  row.map((skill, si) => (
                    <div key={`${ri}-${si}`} style={{
                      background: "#ffffff10", border: `1px solid ${accent}55`,
                      borderRadius: "2px", padding: "2px 7px",
                      fontSize: "9px", color: "#e0e0e0", fontFamily: "'Trebuchet MS', sans-serif",
                    }}>
                      <E
                        value={skill}
                        onChange={(v) => {
                          const a = dataRef.current.skills.map((r) => [...r]);
                          a[ri][si] = v;
                          u("skills", a);
                        }}
                        style={{ color: "#e0e0e0" }}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* EDUCATION — ✅ editable title */}
            <div>
              <SectionHeading>
                <E value={educationTitle} onChange={(v) => u("educationTitle", v)} style={{ color: accent }} />
              </SectionHeading>
              {education.map((edu, i) => (
                <div key={i} style={{ marginTop: "6px" }}>
                  <E
                    value={edu.degree}
                    onChange={(v) => {
                      const a = dataRef.current.education.map((e, j) =>
                        j === i ? { ...e, degree: v } : e
                      );
                      u("education", a);
                    }}
                    style={{ color: "#fff", fontSize: "9.5px", fontWeight: "bold", display: "block" }}
                  />
                  <E
                    value={edu.school}
                    onChange={(v) => {
                      const a = dataRef.current.education.map((e, j) =>
                        j === i ? { ...e, school: v } : e
                      );
                      u("education", a);
                    }}
                    style={{ color: "#aaa", fontFamily: "'Trebuchet MS',sans-serif", display: "block", marginTop: "2px" }}
                  />
                  <div style={{ display: "inline-block", marginTop: "4px", background: accent, color: "#fff", fontSize: "8px", padding: "1px 6px", borderRadius: "2px", fontFamily: "'Trebuchet MS',sans-serif" }}>
                    <E
                      value={edu.year}
                      onChange={(v) => {
                        const a = dataRef.current.education.map((e, j) =>
                          j === i ? { ...e, year: v } : e
                        );
                        u("education", a);
                      }}
                      style={{ color: "#fff" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* CERTIFICATIONS — ✅ editable title */}
            <div>
              <SectionHeading>
                <E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} style={{ color: accent }} />
              </SectionHeading>
              {certifications.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "5px", marginTop: "5px" }}>
                  <span style={{ color: accent, marginTop: "1px" }}>▸</span>
                  <E
                    value={c}
                    onChange={(v) => {
                      const a = dataRef.current.certifications.map((cert, j) =>
                        j === i ? v : cert
                      );
                      u("certifications", a);
                    }}
                    style={{ color: "#ccc", fontFamily: "'Trebuchet MS',sans-serif", fontSize: "9px", lineHeight: "1.5" }}
                  />
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{ flex: 1, padding: "8mm 9mm", display: "flex", flexDirection: "column", gap: "6mm" }}>

            {/* OBJECTIVE — ✅ editable title */}
            <div>
              <RightHeading>
                <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} style={{ color: accent }} />
              </RightHeading>
              <E value={objective} onChange={(v) => u("objective", v)} block
                style={{ color: "#333", lineHeight: "1.7", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "9.5px", marginTop: "5px" }}
              />
            </div>

            {/* EXPERIENCE — ✅ editable title */}
            <div>
              <RightHeading>
                <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} style={{ color: accent }} />
              </RightHeading>
              {experience.map((exp, ei) => (
                <div key={ei} style={{ marginTop: "7px", paddingLeft: "7px", borderLeft: `3px solid ${accent}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2px" }}>
                    <E
                      value={exp.company}
                      onChange={(v) => {
                        const a = dataRef.current.experience.map((e, i) =>
                          i === ei ? { ...e, company: v } : e
                        );
                        u("experience", a);
                      }}
                      style={{ fontWeight: "bold", color: dark, fontSize: "10.5px", fontFamily: "'Georgia', serif" }}
                    />
                    <E
                      value={exp.period}
                      onChange={(v) => {
                        const a = dataRef.current.experience.map((e, i) =>
                          i === ei ? { ...e, period: v } : e
                        );
                        u("experience", a);
                      }}
                      style={{ color: accent, fontSize: "8.5px", fontFamily: "'Trebuchet MS', sans-serif", fontWeight: "bold", letterSpacing: "0.5px" }}
                    />
                  </div>

                  {exp.roles.map((role, ri) => (
                    <div key={ri}>

                      {/* ✅ role title + role-level period (SoftwareEnn feature) */}
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
                          style={{ color: muted, fontStyle: "italic", fontSize: "9px", fontFamily: "'Trebuchet MS', sans-serif", display: "block", marginBottom: "3px" }}
                        />
                        {/* ✅ role.period editable */}
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
                          style={{ color: "#888", fontSize: "8.5px", fontFamily: "'Trebuchet MS', sans-serif", whiteSpace: "nowrap", marginLeft: "8px" }}
                        />
                      </div>

                      {role.bullets.map((b, bi) => (
                        <div key={bi} style={{ display: "flex", alignItems: "flex-start", gap: "5px", marginTop: "3px" }}>
                          <span style={{ color: accent, fontSize: "8px", marginTop: "2px" }}>■</span>
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
                            style={{ color: "#444", fontFamily: "'Trebuchet MS', sans-serif", lineHeight: "1.6", fontSize: "9.5px" }}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* PROJECTS — ✅ editable title + ✅ editable project title (SoftwareEnn feature) */}
            <div>
              <RightHeading>
                <E value={projectTitle} onChange={(v) => u("projectTitle", v)} style={{ color: accent }} />
              </RightHeading>
              {projects.map((proj, i) => (
                <div key={i} style={{
                  marginTop: "6px", background: "#fff", border: "1px solid #ddd",
                  borderTop: `3px solid ${accent}`, padding: "5px 8px", borderRadius: "0 0 3px 3px",
                }}>
                  {/* ✅ project title now editable */}
                  <E
                    value={proj.title}
                    onChange={(v) => {
                      const a = dataRef.current.projects.map((p, j) =>
                        j === i ? { ...p, title: v } : p
                      );
                      u("projects", a);
                    }}
                    style={{ fontWeight: "bold", color: dark, fontSize: "10px", fontFamily: "'Georgia', serif", display: "block", marginBottom: "3px" }}
                  />
                  <E
                    value={proj.description}
                    onChange={(v) => {
                      const a = dataRef.current.projects.map((p, j) =>
                        j === i ? { ...p, description: v } : p
                      );
                      u("projects", a);
                    }}
                    style={{ color: "#555", fontFamily: "'Trebuchet MS', sans-serif", lineHeight: "1.6", fontSize: "9px" }}
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;