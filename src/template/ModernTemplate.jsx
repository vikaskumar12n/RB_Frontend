import React, { useState, useCallback, useRef } from "react";
import EditableSpan from "../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

const API_URL = "http://localhost:3000/api/resume/save";

// ─── Default data ──────────────────────────────────────────────────────────────
const getInitialData = () => ({
  name: "FIRST LAST",
  location: "Bay Area, California",
  phone: "+1-234-456-789",
  email: "professionalemail@resumeworded.com",
  linkedin: "linkedin.com/in/username",

  objectiveTitle: "Objective",
  experienceTitle: "Professional Experience",
  projectTitle: "Projects",
  educationTitle: "Education",
  skillsTitle: "Skills",
  certificationTitle: "Certifications",

  objective: `Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining
scalable web applications. Proficient in front-end and back-end technologies, including HTML, CSS, JavaScript,
React, Node.js, and database systems like MongoDB and MySQL. Skilled in problem-solving, collaboration, and
delivering user-focused solutions. Passionate about leveraging cutting-edge technologies to create seamless,
innovative digital experiences.`,

  projects: [
    {
      title: "CRM(Customer RelationShip Management)",
      description: `Worked on a complete CRM system that includes multiple business-critical modules.
Contributed actively to .
Finance Module: Payment tracking, invoices, salary processing, and financial data handling.
Accounts Module: Account records management, transaction monitoring, and data validation.
HR Module: Employee management, attendance, leave handling, and recruitment support features.`,
    },
    {
      title: "E-commerce Website",
      description:
        "Developed full stack e-commerce platform with authentication and payment integration.",
    },
  ],

  certifications: [
    "Full Stack Web Development - Udemy",
    "React Developer Certification",
  ],

  experience: [
    {
      company: "XYZ Solutions Pvt. Ltd.",
      period: "2018 – Present",
      roles: [
        {
          title: "Front End Developer, React",
          period: "",
          bullets: [
            "Contributed to the development of a full-scale CRM (DSS) project.",
            "Built and integrated key modules like Finance, Accounts, and HR.",
            "Improved system performance through efficient backend logic and clean architecture.",
            "Collaborated with the team to deliver real-world business features and ensure seamless frontend–backend integration.",
          ],
        },
      ],
    },
    {
      company: "Technano Pvt. Ltd., Noida",
      period: "2014 – 2017",
      roles: [
        {
          title: "Front End Developer",
          period: "",
          bullets: [
            "Built fast and accessible websites improving load time by 22%.",
            "Converted UI/UX wireframes into responsive code.",
          ],
        },
      ],
    },
  ],

  education: [
    {
      school: "Millennium Group of Institutions",
      year: "2013",
      degree: "Bachelor of Engineering, Information Technology",
    },
  ],

  skills: [
    ["HTML", "CSS", "JavaScript", "React"],
    ["Node.js", "Express", "MongoDB", "SQL"],
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

// ─── Sidebar section heading ───────────────────────────────────────────────────
const SideHead = ({ children }) => (
  <div style={{
    fontSize: "9px", fontWeight: "bold", letterSpacing: "3px",
    textTransform: "uppercase", color: "#a0c4e8",
    borderBottom: "1px solid #a0c4e8", paddingBottom: "2px", marginBottom: "4px",
  }}>
    {children}
  </div>
);

// ─── Main section heading (right column) ──────────────────────────────────────
const MainHead = ({ children }) => (
  <div style={{
    fontSize: "11px", fontWeight: "bold", textTransform: "uppercase",
    letterSpacing: "2px", color: "#1e3a5f",
    borderBottom: "2px solid #1e3a5f", paddingBottom: "2px", marginBottom: "4px",
  }}>
    {children}
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const ModernTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDataState] = useState(() => ({
    ...getInitialData(),
    ...(propData || {}),
  }));

  const dataRef = useRef(data);

  const setData = (newData) => {
    setDataState(newData);
    dataRef.current = newData;
    if (setPropData) setPropData(newData);
  };

  const u = (field, value) => {
    const newData = { ...dataRef.current, [field]: value };
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
          width: "210mm",
          minHeight: "297mm",
          fontFamily: "'Calibri','Segoe UI',sans-serif",
          fontSize: "10.5px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "row",
          boxSizing: "border-box",
        }}
      >

        {/* ══════════════════════════════════════════
            LEFT SIDEBAR
        ══════════════════════════════════════════ */}
        <div style={{
          width: "68mm",
          backgroundColor: "#1e3a5f",
          color: "#fff",
          padding: "12mm 8mm",
          flexShrink: 0,
        }}>

          {/* Name */}
          <E
            value={name}
            onChange={(v) => u("name", v)}
            block
            style={{ fontSize: "16px", fontWeight: "bold", lineHeight: 1.2, color: "#fff", marginBottom: "4px" }}
          />

          {/* Contact */}
          <div style={{ marginTop: "8px", marginBottom: "16px" }}>
            <SideHead>Contact</SideHead>
            {[
              ["📍", location, "location"],
              ["📞", phone,    "phone"],
              ["✉",  email,   "email"],
              ["🔗", linkedin, "linkedin"],
            ].map(([icon, val, key]) => (
              <div key={key} style={{ display: "flex", alignItems: "flex-start", gap: "4px", marginTop: "4px" }}>
                <span style={{ fontSize: "9px", marginTop: "1px" }}>{icon}</span>
                <E
                  value={val}
                  onChange={(v) => u(key, v)}
                  style={{ fontSize: "9px", color: "#dce8f5", wordBreak: "break-all" }}
                />
              </div>
            ))}
          </div>

          {/* ✅ FIX: skillsTitle editable */}
          <div style={{ marginBottom: "16px" }}>
            <SideHead>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} style={{ color: "#a0c4e8" }} />
            </SideHead>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {skills.map((row, ri) =>
                row.map((skill, ci) =>
                  skill ? (
                    <span
                      key={`${ri}-${ci}`}
                      style={{
                        backgroundColor: "#2e5480",
                        color: "#dce8f5",
                        borderRadius: "3px",
                        padding: "1px 5px",
                        fontSize: "9px",
                      }}
                    >
                      <E
                        value={skill}
                        onChange={(v) => {
                          const a = dataRef.current.skills.map((r) => [...r]);
                          a[ri][ci] = v;
                          u("skills", a);
                        }}
                        style={{ color: "#dce8f5" }}
                      />
                    </span>
                  ) : null
                )
              )}
            </div>
          </div>

          {/* ✅ FIX: educationTitle editable */}
          <div style={{ marginBottom: "16px" }}>
            <SideHead>
              <E value={educationTitle} onChange={(v) => u("educationTitle", v)} style={{ color: "#a0c4e8" }} />
            </SideHead>
            {education.map((edu, i) => (
              <div key={i} style={{ marginTop: "4px" }}>
                <E
                  value={edu.degree}
                  onChange={(v) => {
                    const a = dataRef.current.education.map((e, j) =>
                      j === i ? { ...e, degree: v } : e
                    );
                    u("education", a);
                  }}
                  block
                  style={{ fontSize: "9px", fontWeight: "bold", color: "#fff" }}
                />
                <E
                  value={edu.school}
                  onChange={(v) => {
                    const a = dataRef.current.education.map((e, j) =>
                      j === i ? { ...e, school: v } : e
                    );
                    u("education", a);
                  }}
                  block
                  style={{ fontSize: "9px", color: "#a0c4e8" }}
                />
                <E
                  value={edu.year}
                  onChange={(v) => {
                    const a = dataRef.current.education.map((e, j) =>
                      j === i ? { ...e, year: v } : e
                    );
                    u("education", a);
                  }}
                  block
                  style={{ fontSize: "9px", color: "#a0c4e8" }}
                />
              </div>
            ))}
          </div>

          {/* ✅ FIX: certificationTitle editable */}
          <div>
            <SideHead>
              <E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} style={{ color: "#a0c4e8" }} />
            </SideHead>
            {certifications.map((cert, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "4px", marginTop: "4px" }}>
                <span style={{ color: "#a0c4e8", fontSize: "8px", marginTop: "2px" }}>✔</span>
                <E
                  value={cert}
                  onChange={(v) => {
                    const a = dataRef.current.certifications.map((c, j) =>
                      j === i ? v : c
                    );
                    u("certifications", a);
                  }}
                  style={{ fontSize: "9px", color: "#dce8f5" }}
                />
              </div>
            ))}
          </div>

        </div>

        {/* ══════════════════════════════════════════
            RIGHT MAIN COLUMN
        ══════════════════════════════════════════ */}
        <div style={{ flex: 1, padding: "12mm 10mm" }}>

          {/* ── OBJECTIVE ── */}
          {/* ✅ FIX: objectiveTitle editable */}
          <div style={{ marginBottom: "16px" }}>
            <MainHead>
              <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} style={{ color: "#1e3a5f" }} />
            </MainHead>
            <E
              value={objective}
              onChange={(v) => u("objective", v)}
              block
              style={{ fontSize: "10px", lineHeight: "1.6", color: "#374151", marginTop: "4px" }}
            />
          </div>

          {/* ── EXPERIENCE ── */}
          {/* ✅ FIX: experienceTitle editable */}
          <div style={{ marginBottom: "16px" }}>
            <MainHead>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} style={{ color: "#1e3a5f" }} />
            </MainHead>

            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginTop: "8px" }}>

                {/* Company + Period */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <E
                    value={exp.company}
                    onChange={(v) => {
                      const a = dataRef.current.experience.map((e, i) =>
                        i === ei ? { ...e, company: v } : e
                      );
                      u("experience", a);
                    }}
                    style={{ fontSize: "11px", fontWeight: "bold", color: "#1e3a5f" }}
                  />
                  <E
                    value={exp.period}
                    onChange={(v) => {
                      const a = dataRef.current.experience.map((e, i) =>
                        i === ei ? { ...e, period: v } : e
                      );
                      u("experience", a);
                    }}
                    style={{ fontSize: "9.5px", color: "#6b7280", whiteSpace: "nowrap", marginLeft: "8px" }}
                  />
                </div>

                {/* Roles */}
                {exp.roles?.map((role, ri) => (
                  <div key={ri} style={{ marginTop: "4px" }}>

                    {/* ✅ FIX: Role Title + Role-level Period */}
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
                        style={{ fontSize: "10px", fontWeight: "bold", fontStyle: "italic", color: "#6b7280" }}
                      />
                      <E
                        value={role.period}
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
                        style={{ fontSize: "9px", color: "#9ca3af", whiteSpace: "nowrap", marginLeft: "8px" }}
                      />
                    </div>

                    {/* Bullets */}
                    <ul style={{ paddingLeft: "16px", marginTop: "2px" }}>
                      {role.bullets?.map((b, bi) => (
                        <li key={bi} style={{ listStyleType: "disc", marginTop: "2px" }}>
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
                            style={{ fontSize: "10px", color: "#374151" }}
                          />
                        </li>
                      ))}
                    </ul>

                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ── PROJECTS ── */}
          {/* ✅ FIX: projectTitle editable + proj.title editable */}
          <div>
            <MainHead>
              <E value={projectTitle} onChange={(v) => u("projectTitle", v)} style={{ color: "#1e3a5f" }} />
            </MainHead>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginTop: "8px" }}>
                <E
                  value={proj.title}
                  onChange={(v) => {
                    const a = dataRef.current.projects.map((p, j) =>
                      j === i ? { ...p, title: v } : p
                    );
                    u("projects", a);
                  }}
                  style={{ fontSize: "10.5px", fontWeight: "bold", color: "#1e3a5f", display: "block" }}
                />
                <E
                  value={proj.description}
                  onChange={(v) => {
                    const a = dataRef.current.projects.map((p, j) =>
                      j === i ? { ...p, description: v } : p
                    );
                    u("projects", a);
                  }}
                  block
                  style={{ fontSize: "10px", color: "#374151", marginTop: "2px", lineHeight: "1.6" }}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;