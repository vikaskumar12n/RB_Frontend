import React, { useState, useCallback, useRef } from "react";
import EditableSpan from "../component/page/Editablespan";

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

// ─── Main Component ────────────────────────────────────────────────────────────
const MinimalTemplate = ({ data: propData, setData: setPropData }) => {
  //  Local state with merged initial data
  const [data, setDataState] = useState(() => ({
    ...getInitialData(),
    ...(propData || {}),
  }));

  //  dataRef to avoid stale closures in nested callbacks
  const dataRef = useRef(data);

  const setData = (newData) => {
    setDataState(newData);
    dataRef.current = newData;
    if (setPropData) setPropData(newData);
  };

  //  Top-level field updater using dataRef
  const u = (field, value) => {
    const newData = { ...dataRef.current, [field]: value };
    setData(newData);
  };

  // ─── Save logic ──────────────────────────────────────────────────────────────
 
 

  // ─── Destructure from local state ───────────────────────────────────────────
  const {
    name, location, phone, email, linkedin,
    objectiveTitle, experienceTitle, projectTitle,
    educationTitle, skillsTitle, certificationTitle,
    objective, projects, certifications, experience, education, skills,
  } = data;

  // ─── Section label (titles are now editable via <E>) ─────────────────────────
  const SectionLabel = ({ children }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0 6px" }}>
      <span style={{
        fontSize: "7.5px",
        fontFamily: "'Trebuchet MS', sans-serif",
        letterSpacing: "3px",
        textTransform: "uppercase",
        fontWeight: "bold",
        color: "#111",
        whiteSpace: "nowrap",
      }}>
        {children}
      </span>
      <div style={{ flex: 1, height: "1px", background: "#bbb" }} />
    </div>
  );

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: "relative" }}>

      
      {/* ── RESUME BODY ── */}
      <div
        id="resume"
        style={{
          width: "210mm",
          minHeight: "297mm",
          fontFamily: "'Georgia', Times, serif",
          fontSize: "10px",
          backgroundColor: "#fff",
          color: "#111",
          boxSizing: "border-box",
          padding: "12mm 14mm",
        }}
      >

        {/* ── HEADER ── */}
        <div style={{ borderBottom: "2px solid #111", paddingBottom: "8px", marginBottom: "2px" }}>
          <E
            value={name}
            onChange={(v) => u("name", v)}
            block
            style={{
              fontSize: "26px",
              fontWeight: "bold",
              fontFamily: "'Georgia', serif",
              letterSpacing: "1px",
              color: "#111",
              lineHeight: 1.1,
            }}
          />
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0 18px",
            marginTop: "6px",
            fontFamily: "'Trebuchet MS', sans-serif",
            fontSize: "8.5px",
            color: "#555",
          }}>
            {[
              [location, "location"],
              [phone,    "phone"],
              [email,    "email"],
              [linkedin, "linkedin"],
            ].map(([val, key], idx) => (
              <span key={key} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                {idx !== 0 && (
                  <span style={{ color: "#ccc", marginRight: "14px", position: "absolute", transform: "translateX(-14px)" }}>·</span>
                )}
                <E value={val} onChange={(v) => u(key, v)} style={{ color: "#555" }} />
              </span>
            ))}
          </div>
        </div>

        {/* ── OBJECTIVE ── */}
        {/*  FIX: objectiveTitle is now editable via <E> inside SectionLabel */}
        <SectionLabel>
          <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
        </SectionLabel>
        <E
          value={objective}
          onChange={(v) => u("objective", v)}
          block
          style={{
            fontSize: "9.5px",
            fontFamily: "'Trebuchet MS', sans-serif",
            lineHeight: "1.75",
            color: "#333",
          }}
        />

        {/* ── EXPERIENCE ── */}
        {/*  FIX: experienceTitle is now editable */}
        <SectionLabel>
          <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
        </SectionLabel>
        {experience.map((exp, ei) => (
          <div key={ei} style={{ marginBottom: "8px" }}>

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
                style={{
                  fontWeight: "bold",
                  fontSize: "10.5px",
                  fontFamily: "'Georgia', serif",
                  color: "#111",
                }}
              />
              <E
                value={exp.period}
                onChange={(v) => {
                  const a = dataRef.current.experience.map((e, i) =>
                    i === ei ? { ...e, period: v } : e
                  );
                  u("experience", a);
                }}
                style={{
                  fontSize: "8.5px",
                  fontFamily: "'Trebuchet MS', sans-serif",
                  color: "#888",
                  whiteSpace: "nowrap",
                  marginLeft: "8px",
                }}
              />
            </div>

            {/* Roles */}
            {exp.roles?.map((role, ri) => (
              <div key={ri} style={{ marginTop: "2px", paddingLeft: "2px" }}>

                {/*  FIX: Role Title + Role-level Period (like SoftwareEnn) */}
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
                    style={{
                      fontSize: "9px",
                      fontFamily: "'Trebuchet MS', sans-serif",
                      fontStyle: "italic",
                      color: "#555",
                      display: "block",
                      marginBottom: "3px",
                    }}
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
                    style={{
                      fontSize: "8.5px",
                      fontFamily: "'Trebuchet MS', sans-serif",
                      color: "#aaa",
                      whiteSpace: "nowrap",
                      marginLeft: "8px",
                    }}
                  />
                </div>

                {/* Bullets */}
                {role.bullets?.map((b, bi) => (
                  <div
                    key={bi}
                    style={{ display: "flex", gap: "6px", alignItems: "flex-start", marginTop: "2px" }}
                  >
                    <span style={{ fontSize: "8px", color: "#aaa", marginTop: "3px", flexShrink: 0 }}>◦</span>
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
                      style={{
                        fontSize: "9.5px",
                        fontFamily: "'Trebuchet MS', sans-serif",
                        lineHeight: "1.6",
                        color: "#333",
                      }}
                    />
                  </div>
                ))}

              </div>
            ))}
          </div>
        ))}

        {/* ── PROJECTS ── */}
        {/*  FIX: projectTitle editable + proj.title editable (was missing in MinimalTemplate) */}
        <SectionLabel>
          <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
        </SectionLabel>
        {projects.map((proj, i) => (
          <div key={i} style={{ marginBottom: "6px" }}>
            <E
              value={proj.title}
              onChange={(v) => {
                const a = dataRef.current.projects.map((p, j) =>
                  j === i ? { ...p, title: v } : p
                );
                u("projects", a);
              }}
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                fontFamily: "'Georgia', serif",
                color: "#111",
                display: "block",
                marginBottom: "2px",
              }}
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
              style={{
                fontSize: "9.5px",
                fontFamily: "'Trebuchet MS', sans-serif",
                lineHeight: "1.6",
                color: "#444",
              }}
            />
          </div>
        ))}

        {/* ── EDUCATION ── */}
        {/*  FIX: educationTitle editable */}
        <SectionLabel>
          <E value={educationTitle} onChange={(v) => u("educationTitle", v)} />
        </SectionLabel>
        {education.map((edu, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
            <div>
              <E
                value={edu.school}
                onChange={(v) => {
                  const a = dataRef.current.education.map((e, j) =>
                    j === i ? { ...e, school: v } : e
                  );
                  u("education", a);
                }}
                style={{
                  fontWeight: "bold",
                  fontSize: "10.5px",
                  fontFamily: "'Georgia', serif",
                  color: "#111",
                }}
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
                style={{
                  fontSize: "9px",
                  fontFamily: "'Trebuchet MS', sans-serif",
                  fontStyle: "italic",
                  color: "#555",
                  marginTop: "2px",
                  margin: 0,
                  padding: 0,
                  lineHeight: "1.2",
                }}
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
              style={{
                fontSize: "8.5px",
                fontFamily: "'Trebuchet MS', sans-serif",
                color: "#888",
                whiteSpace: "nowrap",
                marginLeft: "8px",
              }}
            />
          </div>
        ))}

        {/* ── SKILLS ── */}
        {/*  FIX: skillsTitle editable */}
        <SectionLabel>
          <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
        </SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {skills.map((row, ri) =>
            row.map((skill, ci) =>
              skill ? (
                <div
                  key={`${ri}-${ci}`}
                  style={{
                   
                    borderRadius: "2px",
                    padding: "2px 8px",
                    fontSize: "8.5px",
                    fontFamily: "'Trebuchet MS', sans-serif",
                    color: "#222",
                  }}
                >
                  <E
                    value={skill}
                    onChange={(v) => {
                      const a = dataRef.current.skills.map((r) => [...r]);
                      a[ri][ci] = v;
                      u("skills", a);
                    }}
                    style={{ color: "#222" }}
                  />
                </div>
              ) : null
            )
          )}
        </div>

        {/* ── CERTIFICATIONS ── */}
        {/*  FIX: certificationTitle editable */}
        <SectionLabel>
          <E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} />
        </SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 24px" }}>
          {certifications.map((cert, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ fontSize: "8px", color: "#aaa" }}>—</span>
              <E
                value={cert}
                onChange={(v) => {
                  const a = dataRef.current.certifications.map((c, j) =>
                    j === i ? v : c
                  );
                  u("certifications", a);
                }}
                style={{
                  fontSize: "9.5px",
                  fontFamily: "'Trebuchet MS', sans-serif",
                  color: "#333",
                }}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MinimalTemplate;