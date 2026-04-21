import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

const primary = "#1a1a1a";
const secondary = "#555555";
const border = "#cccccc";

const getInitialData = () => ({
  name: "CPA CANDIDATE NAME",
  title: "Certified Public Accountant (CPA)",
  location: "New York / Mumbai",
  phone: "+1-555-0123 / +91-XXXXX",
  email: "cpa.professional@globalfinance.com",
  linkedin: "linkedin.com/in/cpa-expert",
  photo: null,

  summaryTitle: "Professional Profile",
  experienceTitle: "Professional Experience",
  skillsTitle: "Core Competencies",
  eduTitle: "Education",

  summary: `Results-oriented Certified Public Accountant (CPA) with expertise in US GAAP, IFRS, and complex tax regulations. Highly skilled in financial statement preparation, external auditing, and corporate tax strategy.`,

  competencies: [
    "US GAAP & IFRS", "SEC Reporting", "Tax Planning",
    "Internal Controls", "Forensic Accounting", "Risk Assessment"
  ],

  experience: [
    {
      company: "Deloitte / Ernst & Young (Big 4)",
      period: "2020 – Present",
      roles: [{
        title: "Senior Audit Associate",
        bullets: [
          "Led statutory audits for Fortune 500 clients, ensuring compliance with SEC guidelines.",
          "Evaluated internal control systems and recommended improvements to mitigate financial risks.",
          "Managed a diverse portfolio of clients across manufacturing and technology sectors."
        ],
      }],
    },
    {
      company: "Mid-Tier Accounting Firm",
      period: "2017 – 2020",
      roles: [{
        title: "Staff Accountant",
        bullets: [
          "Prepared detailed financial statements and consolidated reports for multi-state entities.",
          "Assisted in IRS audits and handled high-volume corporate tax filings.",
        ],
      }],
    },
  ],

  education: [
    { school: "AICPA / State Board of Accountancy", year: "2020", degree: "Certified Public Accountant (CPA)" },
    { school: "University of Southern California", year: "2017", degree: "Master of Science in Accounting" }
  ],
});

// ✅ Photo Upload
const PhotoUpload = ({ photo, onPhotoChange }) => {
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onPhotoChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      onClick={() => fileRef.current.click()}
      style={{
        width: "85px", height: "85px",
        borderRadius: "4px",
        border: `1px solid ${border}`,
        overflow: "hidden", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: "#f5f5f5", flexShrink: 0,
        position: "relative",
      }}
    >
      {photo ? (
        <img src={photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <div style={{ textAlign: "center", padding: "8px" }}>
          <div style={{ fontSize: "20px" }}>📷</div>
          <div style={{ fontSize: "7px", color: secondary, marginTop: "2px" }}>Add Photo</div>
        </div>
      )}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0, transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
        onMouseLeave={(e) => e.currentTarget.style.opacity = "0"}
      >
        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 600 }}>Change</span>
      </div>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
    </div>
  );
};

// ✅ Section Title — simple black underline
const SectionTitle = ({ value, onChange }) => (
  <div style={{
    borderBottom: `2px solid ${primary}`,
    marginBottom: "10px", paddingBottom: "4px",
    fontSize: "11px", fontWeight: "800",
    textTransform: "uppercase", letterSpacing: "1.5px",
    color: primary,
  }}>
    <E value={value} onChange={onChange} />
  </div>
);

const PTemplate3 = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const {
    name, title, location, phone, email, linkedin, photo,
    summaryTitle, experienceTitle, skillsTitle, eduTitle,
    summary, competencies, experience, education
  } = data;

  return (
    <div id="resume" style={{
      width: "210mm", minHeight: "297mm",
      fontFamily: "'Times New Roman', Georgia, serif",
      backgroundColor: "#fff", color: primary,
      boxSizing: "border-box",
    }}>

      {/* ── HEADER ── */}
      <div style={{
        padding: "30px 36px 20px",
        borderBottom: `3px double ${primary}`,
        display: "flex", alignItems: "center", gap: "24px",
      }}>
        {/* Photo */}
        <PhotoUpload photo={photo} onPhotoChange={(v) => u("photo", v)} />

        {/* Name + Info */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <E
            value={name}
            onChange={(v) => u("name", v)}
            block
            style={{
              fontSize: "28px", fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "3px", color: primary,
            }}
          />
          <E
            value={title}
            onChange={(v) => u("title", v)}
            block
            style={{
              fontSize: "12px", color: secondary,
              fontStyle: "italic", marginTop: "5px",
            }}
          />

          {/* Divider */}
          <div style={{ margin: "10px auto", width: "60px", height: "1px", backgroundColor: primary }} />

          {/* Contact */}
          <div style={{
            display: "flex", justifyContent: "center",
            flexWrap: "wrap", gap: "4px 14px",
            fontSize: "9.5px", color: secondary,
          }}>
            <span><E value={location} onChange={(v) => u("location", v)} /></span>
            <span>|</span>
            <span><E value={phone} onChange={(v) => u("phone", v)} /></span>
            <span>|</span>
            <span><E value={email} onChange={(v) => u("email", v)} /></span>
            <span>|</span>
            <span><E value={linkedin} onChange={(v) => u("linkedin", v)} /></span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: "24px 36px", display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* SUMMARY */}
        <div>
          <SectionTitle value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          <E
            value={summary}
            onChange={(v) => u("summary", v)}
            block
            style={{ fontSize: "10.5px", lineHeight: "1.7", color: secondary, textAlign: "justify" }}
          />
        </div>

        {/* EXPERIENCE */}
        <div>
          <SectionTitle value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
          {experience.map((exp, ei) => (
            <div key={ei} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <E
                  value={exp.company}
                  onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }}
                  style={{ fontWeight: "700", fontSize: "11.5px", color: primary }}
                />
                <E
                  value={exp.period}
                  onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }}
                  style={{ fontSize: "9.5px", color: secondary, fontStyle: "italic" }}
                />
              </div>
              {exp.roles.map((role, ri) => (
                <div key={ri}>
                  <E
                    value={role.title}
                    onChange={(v) => {
                      const a = ref.current.experience.map((e, i) =>
                        i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e
                      );
                      u("experience", a);
                    }}
                    style={{ fontSize: "10.5px", fontWeight: "600", fontStyle: "italic", color: secondary, display: "block", marginBottom: "5px", marginTop: "3px" }}
                  />
                  <ul style={{ margin: "0", paddingLeft: "16px" }}>
                    {role.bullets.map((b, bi) => (
                      <li key={bi} style={{ fontSize: "10px", marginBottom: "3px", color: secondary, lineHeight: "1.6" }}>
                        <E
                          value={b}
                          onChange={(v) => {
                            const a = ref.current.experience.map((e, i) =>
                              i === ei ? {
                                ...e, roles: e.roles.map((r, j) =>
                                  j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r
                                )
                              } : e
                            );
                            u("experience", a);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* SKILLS */}
        <div>
          <SectionTitle value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 0px", fontSize: "10.5px", color: secondary }}>
            {competencies.map((skill, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center" }}>
                <E
                  value={skill}
                  onChange={(v) => {
                    const a = ref.current.competencies.map((s, j) => j === i ? v : s);
                    u("competencies", a);
                  }}
                />
                {i !== competencies.length - 1 && (
                  <span style={{ margin: "0 10px", color: border }}>◆</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div>
          <SectionTitle value={eduTitle} onChange={(v) => u("eduTitle", v)} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {education.map((edu, i) => (
              <div key={i} style={{
                paddingLeft: "10px",
                borderLeft: `2px solid ${primary}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <E
                    value={edu.degree}
                    onChange={(v) => {
                      const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e);
                      u("education", a);
                    }}
                    block
                    style={{ fontWeight: "700", fontSize: "10.5px", color: primary }}
                  />
                  <E
                    value={edu.year}
                    onChange={(v) => {
                      const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e);
                      u("education", a);
                    }}
                    style={{ fontSize: "9px", fontWeight: "600", color: secondary, fontStyle: "italic", marginLeft: "8px" }}
                  />
                </div>
                <E
                  value={edu.school}
                  onChange={(v) => {
                    const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e);
                    u("education", a);
                  }}
                  block
                  style={{ fontSize: "10px", color: secondary, marginTop: "2px", fontStyle: "italic" }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PTemplate3;