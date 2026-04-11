import React, { useState, useCallback, useRef } from "react";
import EditableSpan from "../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

 
// ─── Default data ──────────────────────────────────────────────────────────────
const getInitialData = () => ({
  name:     "First Last",
  title:    "Senior Software Engineer",
  phone:    "+1-234-456-789",
  email:    "email@resumeworded.com",
  linkedin: "linkedin.com/in/username",
  location: "Bay Area, CA",

  // ✅ Editable section titles (SoftwareEnn feature)
  summaryTitle:    "Professional Summary",
  experienceTitle: "Professional Experience",
  educationTitle:  "Education",
  skillsTitle:     "Skills",

  summary:
    "Results-driven software engineer with 8+ years building scalable front-end solutions. Proven track record of improving performance metrics and leading cross-functional teams.",

  experience: [
    {
      company:  "Resume Worded",
      location: "New York, NY",
      period:   "2018 – Present",
      title:    "Front End Developer, React",
      bullets: [
        "Developed product tours with React, improving adoption by 25% and driving $1M revenue.",
        "Reduced support tickets by 45% through a custom client dashboard.",
        "Increased conversion rates by 20% collaborating with UX/UI design teams.",
      ],
    },
    {
      company:  "Growthsi",
      location: "San Diego, CA",
      period:   "2014 – 2017",
      title:    "Front End Developer",
      bullets: [
        "Delivered cross-browser accessible websites with 22% faster load times.",
        "Translated design wireframes into pixel-perfect HTML5/CSS3 markup.",
      ],
    },
  ],

  education: [
    {
      school:   "Resume Worded University",
      location: "San Francisco, CA",
      year:     "2013",
      degree:   "Bachelor of Engineering, Information Technology",
    },
  ],

  skills: [
    "React / Redux",
    "JavaScript (ES6+)",
    "HTML5 & CSS3",
    "jQuery",
    "Git & GitHub",
    "Responsive Design",
    "Agile / Scrum",
    "REST APIs",
  ],
});

// ─── API payload builder ───────────────────────────────────────────────────────
const buildPayload = (data) => ({
  personalInfo: {
    name:     data.name,
    title:    data.title,
    email:    data.email,
    phone:    data.phone,
    location: data.location,
    linkedin: data.linkedin,
  },
  summary: data.summary,
  experience: data.experience.map((exp) => ({
    role:             exp.title,
    company:          exp.company,
    location:         exp.location,
    duration:         exp.period,
    responsibilities: exp.bullets,
  })),
  education: data.education.map((edu) => ({
    degree:   edu.degree,
    school:   edu.school,
    location: edu.location,
    year:     edu.year,
  })),
  skills: data.skills,
});

// ─── Shared section heading style ─────────────────────────────────────────────
const sectionHeadStyle = {
  fontWeight:    "bold",
  fontSize:      "10px",
  letterSpacing: "2px",
  textTransform: "uppercase",
  color:         "#1a1a2e",
  borderBottom:  "1px solid #1a1a2e",
  paddingBottom: "2px",
  display:       "flex",
  alignItems:    "center",
};

// ─── Save Button ───────────────────────────────────────────────────────────────
const SaveButton = ({ onSave, saving, saveStatus }) => (
  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "12px", marginBottom: "10px", padding: "0 4px" }}>
    {saveStatus === "success" && (
      <span style={{ color: "#1a1a2e", fontSize: "13px", fontFamily: "'Georgia', serif" }}>
        ✓ Saved successfully!
      </span>
    )}
    {saveStatus === "error" && (
      <span style={{ color: "#dc2626", fontSize: "13px", fontFamily: "'Georgia', serif" }}>
        ✗ Save failed. Try again.
      </span>
    )}
    <button
      onClick={onSave}
      disabled={saving}
      style={{
        background:    saving ? "#6b7280" : "#1a1a2e",
        color:         "#e2a04a",
        border:        "2px solid #e2a04a",
        borderRadius:  "4px",
        padding:       "8px 20px",
        fontSize:      "13px",
        fontFamily:    "'Georgia', serif",
        fontWeight:    "bold",
        cursor:        saving ? "not-allowed" : "pointer",
        letterSpacing: "0.5px",
        transition:    "background 0.2s, color 0.2s",
      }}
    >
      {saving ? "Saving..." : "💾 Save Resume"}
    </button>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const ExecutiveTemplate = ({ data: propData, setData: setPropData }) => {
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

  const u = (field, value) => {
    const newData = { ...dataRef.current, [field]: value };
    setData(newData);
  };

  // ─── Save logic ──────────────────────────────────────────────────────────────
  

  // ─── Destructure ─────────────────────────────────────────────────────────────
  const {
    name, title, phone, email, linkedin, location,
    summaryTitle, experienceTitle, educationTitle, skillsTitle,
    summary, experience, education, skills,
  } = data;

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: "relative" }}>

    
      {/* RESUME BODY */}
      <div
        id="resume"
        style={{
          width: "210mm", minHeight: "297mm",
          fontFamily: "'Georgia', serif", fontSize: "10.5px",
          backgroundColor: "#fff", boxSizing: "border-box",
        }}
      >

        {/* ── HEADER ── */}
        <div style={{ backgroundColor: "#1a1a2e", padding: "12mm 14mm 8mm" }}>
          <E
            value={name}
            onChange={(v) => u("name", v)}
            block
            style={{ fontSize: "24px", color: "#fff", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "bold" }}
          />
          <E
            value={title}
            onChange={(v) => u("title", v)}
            block
            style={{ fontSize: "11px", color: "#e2a04a", letterSpacing: "1px", marginTop: "4px" }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0 16px", marginTop: "8px" }}>
            {[
              ["location", location],
              ["phone",    phone],
              ["email",    email],
              ["linkedin", linkedin],
            ].map(([key, val]) => (
              <E
                key={key}
                value={val}
                onChange={(v) => u(key, v)}
                style={{ color: "#9ca3af", fontSize: "9.5px", whiteSpace: "nowrap" }}
              />
            ))}
          </div>
        </div>

        {/* Gold divider */}
        <div style={{ height: "3px", backgroundColor: "#e2a04a" }} />

        {/* ── BODY ── */}
        <div style={{ padding: "8mm 14mm" }}>

          {/* SUMMARY — ✅ editable title */}
          <div style={{ marginBottom: "16px" }}>
            <h2 style={{ ...sectionHeadStyle, marginBottom: "4px" }}>
              <E
                value={summaryTitle}
                onChange={(v) => u("summaryTitle", v)}
                style={{ color: "#1a1a2e", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "bold", fontSize: "10px" }}
              />
            </h2>
            <E
              value={summary}
              onChange={(v) => u("summary", v)}
              block
              style={{ fontSize: "10px", lineHeight: "1.6", color: "#374151" }}
            />
          </div>

          {/* EXPERIENCE — ✅ editable title */}
          <div style={{ marginBottom: "16px" }}>
            <h2 style={{ ...sectionHeadStyle, marginBottom: "8px" }}>
              <E
                value={experienceTitle}
                onChange={(v) => u("experienceTitle", v)}
                style={{ color: "#1a1a2e", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "bold", fontSize: "10px" }}
              />
            </h2>

            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <E
                      value={exp.title}
                      onChange={(v) => {
                        const a = dataRef.current.experience.map((e, i) =>
                          i === ei ? { ...e, title: v } : e
                        );
                        u("experience", a);
                      }}
                      block
                      style={{ fontWeight: "bold", fontSize: "11px", color: "#1a1a2e" }}
                    />
                    <span style={{ fontSize: "9.5px", color: "#6b7280" }}>
                      <E
                        value={exp.company}
                        onChange={(v) => {
                          const a = dataRef.current.experience.map((e, i) =>
                            i === ei ? { ...e, company: v } : e
                          );
                          u("experience", a);
                        }}
                        style={{ color: "#6b7280" }}
                      />
                      {" · "}
                      <E
                        value={exp.location}
                        onChange={(v) => {
                          const a = dataRef.current.experience.map((e, i) =>
                            i === ei ? { ...e, location: v } : e
                          );
                          u("experience", a);
                        }}
                        style={{ color: "#6b7280" }}
                      />
                    </span>
                  </div>

                  {/* Period badge */}
                  <span style={{ backgroundColor: "#1a1a2e", color: "#e2a04a", fontSize: "9px", padding: "1px 6px", borderRadius: "2px", whiteSpace: "nowrap", marginLeft: "8px", marginTop: "2px" }}>
                    <E
                      value={exp.period}
                      onChange={(v) => {
                        const a = dataRef.current.experience.map((e, i) =>
                          i === ei ? { ...e, period: v } : e
                        );
                        u("experience", a);
                      }}
                      style={{ color: "#e2a04a" }}
                    />
                  </span>
                </div>

                <ul style={{ paddingLeft: "20px", marginTop: "4px", marginBottom: 0 }}>
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} style={{ marginTop: "2px", listStyleType: "disc" }}>
                      <E
                        value={b}
                        onChange={(v) => {
                          const a = dataRef.current.experience.map((e, i) => {
                            if (i !== ei) return e;
                            const bullets = e.bullets.map((bul, k) =>
                              k === bi ? v : bul
                            );
                            return { ...e, bullets };
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

          {/* EDUCATION + SKILLS — two-column grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

            {/* EDUCATION — ✅ editable title */}
            <div>
              <h2 style={{ ...sectionHeadStyle, marginBottom: "8px" }}>
                <E
                  value={educationTitle}
                  onChange={(v) => u("educationTitle", v)}
                  style={{ color: "#1a1a2e", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "bold", fontSize: "10px" }}
                />
              </h2>
              {education.map((edu, i) => (
                <div key={i}>
                  <E
                    value={edu.degree}
                    onChange={(v) => {
                      const a = dataRef.current.education.map((e, j) =>
                        j === i ? { ...e, degree: v } : e
                      );
                      u("education", a);
                    }}
                    block
                    style={{ fontWeight: "bold", fontSize: "10.5px", color: "#1a1a2e" }}
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
                    style={{ fontSize: "9.5px", color: "#6b7280" }}
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
                    style={{ fontSize: "9.5px", color: "#6b7280" }}
                  />
                </div>
              ))}
            </div>

            {/* SKILLS — ✅ editable title */}
            <div>
              <h2 style={{ ...sectionHeadStyle, marginBottom: "8px" }}>
                <E
                  value={skillsTitle}
                  onChange={(v) => u("skillsTitle", v)}
                  style={{ color: "#1a1a2e", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "bold", fontSize: "10px" }}
                />
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 8px" }}>
                {skills.map((skill, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ color: "#e2a04a", fontSize: "8px" }}>◆</span>
                    <E
                      value={skill}
                      onChange={(v) => {
                        const a = dataRef.current.skills.map((s, j) =>
                          j === i ? v : s
                        );
                        u("skills", a);
                      }}
                      style={{ fontSize: "9.5px", color: "#374151" }}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;