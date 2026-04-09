import React, { useState, useCallback, useRef } from "react";
import EditableSpan from "../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;


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
      description: "Developed full stack e-commerce platform with authentication and payment integration.",
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

// ─── Section Heading ───────────────────────────────────────────────────────────
const SectionHead = ({ title }) => (
  <div style={{ borderBottom: "1.5px solid #111", marginTop: "14px", marginBottom: "4px" }}>
    <h2 style={{
      fontSize: "10px",
      fontWeight: "bold",
      letterSpacing: "0.12em",
      textAlign: "center",
      textTransform: "uppercase",
      paddingBottom: "3px",
      margin: 0,
    }}>
      {title}
    </h2>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const SoftwareEnn = ({ data: propData, setData: setPropData }) => {
  // ✅ Local state with merged initial data
  const [data, setDataState] = useState(() => ({
    ...getInitialData(),
    ...(propData || {}),
  }));

  // ✅ dataRef to avoid stale closures in nested callbacks
  const dataRef = useRef(data);

  const setData = (newData) => {
    setDataState(newData);
    dataRef.current = newData;
    if (setPropData) setPropData(newData);
  };

  // ✅ Top-level field updater using dataRef
  const u = (field, value) => {
    const newData = { ...dataRef.current, [field]: value };
    setData(newData);
  };

 
  // ─── Destructure from local state ───────────────────────────────────────────
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
          padding: "12mm",
          background: "#fff",
          outline: "none",
          cursor: "text",
        }}
      >

        {/* HEADER */}
        <div style={{ textAlign: "center" }}>
          <E value={name}     onChange={(v) => u("name", v)}     block style={{ fontSize: "22px", fontWeight: "bold" }} />
          <E value={location} onChange={(v) => u("location", v)} />
          <E value={phone}    onChange={(v) => u("phone", v)} />
          <E value={email}    onChange={(v) => u("email", v)} />
          <E value={linkedin} onChange={(v) => u("linkedin", v)} />
        </div>

        {/* OBJECTIVE */}
        <SectionHead
          title={
            <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
          }
        />
        <div style={{ marginTop: "2px" }}>
          <E
            value={objective}
            onChange={(v) => u("objective", v)}
            block
            style={{ lineHeight: "1", margin: 0, padding: 0, textAlign: "justify" }}
          />
        </div>

        {/* EXPERIENCE */}
        <SectionHead title={<E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />} />
        {experience.map((exp, ei) => (
          <div key={ei}>

            {/* Company + Period */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <E
                value={exp.company || "Company"}
                onChange={(v) => {
                  const a = dataRef.current.experience.map((e, i) =>
                    i === ei ? { ...e, company: v } : e
                  );
                  u("experience", a);
                }}
                style={{ fontWeight: "bold", display: "block" }}
              />
              <E
                value={exp.period || "Duration"}
                onChange={(v) => {
                  const a = dataRef.current.experience.map((e, i) =>
                    i === ei ? { ...e, period: v } : e
                  );
                  u("experience", a);
                }}
                style={{ whiteSpace: "nowrap", fontWeight: "bold", display: "block" }}
              />
            </div>

            {/* Roles */}
            {exp.roles?.map((role, ri) => (
              <div key={ri}>

                {/* Role Title + Period */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <E
                    value={role.title || "Role"}
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
                    style={{ fontWeight: "bold", display: "block" }}
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
                    style={{ whiteSpace: "nowrap" }}
                  />
                </div>

                {/* Bullets */}
                {role.bullets?.map((b, bi) => (
                  <E
                    key={bi}
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
                  />
                ))}

              </div>
            ))}
          </div>
        ))}

        {/* PROJECTS */}
        <SectionHead title={<E value={projectTitle} onChange={(v) => u("projectTitle", v)} />} />
        {projects.map((p, i) => (
          <div key={i} style={{ marginBottom: "6px" }}>
            <E
              value={p.title || "Project Title"}
              onChange={(v) => {
                const a = dataRef.current.projects.map((proj, j) =>
                  j === i ? { ...proj, title: v } : proj
                );
                u("projects", a);
              }}
              style={{ fontWeight: "bold", display: "block" }}
            />
            <E
              value={p.description || "Project Description"}
              onChange={(v) => {
                const a = dataRef.current.projects.map((proj, j) =>
                  j === i ? { ...proj, description: v } : proj
                );
                u("projects", a);
              }}
              block
              style={{ marginTop: "0px" }}
            />
          </div>
        ))}

        {/* EDUCATION */}
        <SectionHead title={<E value={educationTitle} onChange={(v) => u("educationTitle", v)} />} />
        {education?.map((edu, i) => (
          <div key={i} style={{ marginBottom: "4px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <E
                value={edu.school || "School"}
                onChange={(v) => {
                  const a = dataRef.current.education.map((e, j) =>
                    j === i ? { ...e, school: v } : e
                  );
                  u("education", a);
                }}
                style={{ fontWeight: "bold" }}
              />
              <E
                value={edu.year || "Year"}
                onChange={(v) => {
                  const a = dataRef.current.education.map((e, j) =>
                    j === i ? { ...e, year: v } : e
                  );
                  u("education", a);
                }}
                style={{ whiteSpace: "nowrap" }}
              />
            </div>
            <E
              value={edu.degree || "Degree"}
              onChange={(v) => {
                const a = dataRef.current.education.map((e, j) =>
                  j === i ? { ...e, degree: v } : e
                );
                u("education", a);
              }}
              block
              style={{ margin: 0, padding: 0, lineHeight: "1.2" }}
            />
          </div>
        ))}

        {/* SKILLS */}
        <SectionHead title={<E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />} />
        {skills.map((row, ri) => (
          <div key={ri}>
            {row.map((cell, ci) => (
              <E
                key={ci}
                value={cell}
                onChange={(v) => {
                  const a = dataRef.current.skills.map((r) => [...r]);
                  a[ri][ci] = v;
                  u("skills", a);
                }}
              />
            ))}
          </div>
        ))}

        {/* CERTIFICATIONS */}
        <SectionHead title={<E value={certificationTitle} onChange={(v) => u("certificationTitle", v)} />} />
        {certifications.map((c, i) => (
          <E
            key={i}
            value={c}
            onChange={(v) => {
              const a = dataRef.current.certifications.map((cert, j) =>
                j === i ? v : cert
              );
              u("certifications", a);
            }}
          />
        ))}

      </div>
    </div>
  );
};

export default SoftwareEnn;