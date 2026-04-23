import React, { useState, useRef } from "react";
import { Phone, Mail, MapPin, Plus, X, Copy, Trash2 } from "lucide-react";

// Inject print styles once
const PRINT_STYLE = `
  @media print {
    .no-print { display: none !important; }
    .resume-bullet-row { align-items: flex-start !important; }
    body { margin: 0; }
    @page {
      size: A4;
      margin: 15mm;
    }
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

const EditableSpan = ({ value, onChange, style = {}, block = false }) => {
  const Tag = block ? "div" : "span";
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.innerText)}
      style={{
        outline: "none",
        cursor: "text",
        minWidth: "20px",
        display: block ? "block" : "inline",
        whiteSpace: block ? "pre-wrap" : "normal",
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

// Floating icon button — hidden on print, fades in on hover
const IconBtn = ({ onClick, color = "#6366f1", title, children, style = {} }) => (
  <button
    className="no-print edit-controls"
    onClick={onClick}
    title={title}
    style={{
      background: color,
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "3px 7px",
      fontSize: "10px",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "3px",
      flexShrink: 0,
      lineHeight: 1.4,
      ...style,
    }}
  >
    {children}
  </button>
);

const Ptemplates6 = ({ data: propData, setData: setPropData }) => {
  const [data, setDataState] = useState(() => ({
    name: "First Name",
    role: "Certified Public Accountant (CPA)",
    phone: "+91 7567895678",
    location: "New York / Mumbai",
    email: "cpa.professional@globalfinance.com",
    linkedin: ".com/in/cpa-expert",
    profileImage: null,
    summaryTitle: "Executive Summary",
    summary: "Results-oriented Certified Public Accountant (CPA) with expertise in US GAAP, IFRS, and complex tax regulations.",
    skillsTitle: "Core Competencies",
    skills: ["US GAAP & IFRS", "SEC Reporting", "Tax Planning", "Internal Controls"],
    experienceTitle: "Professional Experience",
    experience: [
      {
        company: "Deloitte / Ernst & Young (Big 4)",
        role: "Senior Audit Associate",
        period: "2020 - Present",
        desc: "Led statutory audits for Fortune 500 clients, ensuring compliance with SEC guidelines.",
      },
      {
        company: "Mid-Tier Accounting Firm",
        role: "Staff Accountant",
        period: "2017 - 2020",
        desc: "Prepared detailed financial statements and consolidated reports for multi-state entities.",
      },
    ],
    educationTitle: "Education & Certifications",
    education: [
      { degree: "Master of Science in Accounting", school: "University of Southern California", year: "2017" },
      { degree: "Certified Public Accountant (CPA)", school: "AICPA / State Board", year: "2020" },
    ],
    ...(propData || {}),
  }));

  const dataRef = useRef(data);

  const u = (field, value) => {
    const newData = { ...dataRef.current, [field]: value };
    setDataState(newData);
    dataRef.current = newData;
    if (setPropData) setPropData(newData);
  };

  // ========== EXPERIENCE FUNCTIONS ==========
  const addExperience = () => {
    u("experience", [...dataRef.current.experience, { company: "New Company", role: "New Role", period: "Date", desc: "Description here." }]);
  };
  const removeExperience = (i) => u("experience", dataRef.current.experience.filter((_, idx) => idx !== i));
  const copyExperience = (i) => {
    const expToCopy = JSON.parse(JSON.stringify(dataRef.current.experience[i]));
    expToCopy.company = expToCopy.company + " (Copy)";
    u("experience", [...dataRef.current.experience, expToCopy]);
  };
  const updateExp = (i, field, value) => u("experience", dataRef.current.experience.map((e, idx) => idx === i ? { ...e, [field]: value } : e));

  // ========== EDUCATION FUNCTIONS ==========
  const addEducation = () => u("education", [...dataRef.current.education, { degree: "New Degree", school: "New School", year: "Year" }]);
  const removeEducation = (i) => u("education", dataRef.current.education.filter((_, idx) => idx !== i));
  const copyEducation = (i) => {
    const eduToCopy = JSON.parse(JSON.stringify(dataRef.current.education[i]));
    eduToCopy.school = eduToCopy.school + " (Copy)";
    u("education", [...dataRef.current.education, eduToCopy]);
  };
  const updateEdu = (i, field, value) => u("education", dataRef.current.education.map((e, idx) => idx === i ? { ...e, [field]: value } : e));

  // ========== SKILLS FUNCTIONS ==========
  const addSkill = () => u("skills", [...dataRef.current.skills, "New Skill"]);
  const removeSkill = (i) => u("skills", dataRef.current.skills.filter((_, idx) => idx !== i));
  const copySkill = (i) => u("skills", [...dataRef.current.skills, dataRef.current.skills[i] + " (Copy)"]);
  const updateSkill = (i, value) => u("skills", dataRef.current.skills.map((s, idx) => idx === i ? value : s));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) u("profileImage", URL.createObjectURL(file));
  };

  const styles = {
    page: {
      width: "210mm",
      minHeight: "297mm",
      padding: "15mm",
      background: "#fff",
      fontFamily: "'Inter', sans-serif",
      color: "#2d3436",
      margin: "auto",
    },
    topHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "30px",
      borderBottom: "4px solid #0984e3",
      paddingBottom: "20px",
    },
    photoCircle: {
      width: "110px",
      height: "110px",
      borderRadius: "50%",
      border: "3px solid #0984e3",
      overflow: "hidden",
      backgroundColor: "#f1f2f6",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    section: { marginBottom: "25px", display: "flex" },
    sectionLabel: {
      width: "150px",
      fontWeight: "800",
      color: "#0984e3",
      textTransform: "uppercase",
      fontSize: "12px",
      letterSpacing: "1px",
      flexShrink: 0,
    },
    sectionContent: { flex: 1, paddingLeft: "20px", borderLeft: "1px solid #dfe6e9" },
    skillBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      padding: "4px 10px",
      background: "#f1f2f6",
      borderRadius: "4px",
      marginRight: "8px",
      marginBottom: "8px",
      fontSize: "11px",
      fontWeight: "600",
    },
    addBtn: {
      fontSize: "11px",
      color: "#0984e3",
      border: "1px dashed #0984e3",
      background: "none",
      borderRadius: "4px",
      padding: "3px 10px",
      cursor: "pointer",
      marginTop: "6px",
    },
    expHeader: {
      display: "flex",
      justifyContent: "space-between",
      fontWeight: "700",
      marginBottom: "4px",
    },
  };

  return (
    <>
      <StyleInjector />
      <div style={styles.page}>
        {/* Header */}
        <div style={styles.topHeader}>
          <div style={{ flex: 1 }}>
            <EditableSpan
              value={data.name}
              onChange={(v) => u("name", v)}
              style={{ fontSize: "32px", fontWeight: "900", color: "#2d3436" }}
            />
            <EditableSpan
              value={data.role}
              onChange={(v) => u("role", v)}
              style={{ fontSize: "16px", color: "#0984e3", display: "block", fontWeight: "600" }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "15px", fontSize: "11px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Phone size={12} />
                <EditableSpan value={data.phone} onChange={(v) => u("phone", v)} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Mail size={12} />
                <EditableSpan value={data.email} onChange={(v) => u("email", v)} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Mail size={12} />
                <EditableSpan value={data.linkedin} onChange={(v) => u("linkedin", v)} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <MapPin size={12} />
                <EditableSpan value={data.location} onChange={(v) => u("location", v)} />
              </div>
            </div>
          </div>

          <label style={styles.photoCircle} className="no-print">
            {data.profileImage ? (
              <img src={data.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Plus color="#0984e3" />
            )}
            <input type="file" hidden onChange={handleImageChange} accept="image/*" />
          </label>
        </div>

        {/* Summary */}
        <div style={styles.section}>
          <div style={styles.sectionLabel}>
            <EditableSpan
              value={data.summaryTitle}
              onChange={(v) => u("summaryTitle", v)}
              style={{ color: "#0984e3", fontWeight: "800", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}
            />
          </div>
          <div style={styles.sectionContent}>
            <EditableSpan
              value={data.summary}
              onChange={(v) => u("summary", v)}
              block
              style={{ textAlign: "justify" }}
            />
          </div>
        </div>

        {/* Experience Section */}
        <div style={styles.section}>
          <div style={styles.sectionLabel}>
            <EditableSpan
              value={data.experienceTitle}
              onChange={(v) => u("experienceTitle", v)}
              style={{ color: "#0984e3", fontWeight: "800", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}
            />
          </div>
          <div style={styles.sectionContent}>
            <IconBtn onClick={addExperience} color="#0984e3" style={{ marginBottom: "10px" }}>
              <Plus size={11} /> Add Experience
            </IconBtn>
            
            {data.experience.map((exp, i) => (
              <div key={i} className="hoverable-row" style={{ marginBottom: "15px", borderBottom: i !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none", paddingBottom: "10px" }}>
                <div style={styles.expHeader}>
                  <EditableSpan value={exp.role} onChange={(v) => updateExp(i, "role", v)} style={{ fontWeight: "700" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <EditableSpan value={exp.period} onChange={(v) => updateExp(i, "period", v)} style={{ color: "#636e72" }} />
                    <IconBtn onClick={() => copyExperience(i)} color="#6366f1" title="Copy">
                      <Copy size={10} />
                    </IconBtn>
                    <IconBtn onClick={() => removeExperience(i)} color="#ef4444" title="Remove">
                      <Trash2 size={10} />
                    </IconBtn>
                  </div>
                </div>
                <EditableSpan
                  value={exp.company}
                  onChange={(v) => updateExp(i, "company", v)}
                  style={{ color: "#0984e3", fontWeight: "600", fontSize: "12px", display: "block" }}
                />
                <EditableSpan
                  value={exp.desc}
                  onChange={(v) => updateExp(i, "desc", v)}
                  block
                  style={{ fontSize: "11px", marginTop: "5px", color: "#636e72" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div style={styles.section}>
          <div style={styles.sectionLabel}>
            <EditableSpan
              value={data.skillsTitle}
              onChange={(v) => u("skillsTitle", v)}
              style={{ color: "#0984e3", fontWeight: "800", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}
            />
          </div>
          <div style={styles.sectionContent}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "5px" }}>
              {data.skills.map((skill, i) => (
                <span key={i} className="hoverable-row" style={styles.skillBadge}>
                  <EditableSpan value={skill} onChange={(v) => updateSkill(i, v)} />
                  <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 3px" }}>
                    <Copy size={8} />
                  </IconBtn>
                  <X size={10} style={{ cursor: "pointer", color: "#ef4444" }} onClick={() => removeSkill(i)} />
                </span>
              ))}
              <IconBtn onClick={addSkill} color="#0984e3" style={{ padding: "3px 8px" }}>
                <Plus size={10} /> Add Skill
              </IconBtn>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div style={styles.section}>
          <div style={styles.sectionLabel}>
            <EditableSpan
              value={data.educationTitle}
              onChange={(v) => u("educationTitle", v)}
              style={{ color: "#0984e3", fontWeight: "800", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}
            />
          </div>
          <div style={styles.sectionContent}>
            <IconBtn onClick={addEducation} color="#0984e3" style={{ marginBottom: "10px" }}>
              <Plus size={11} /> Add Education
            </IconBtn>
            
            {data.education.map((edu, i) => (
              <div key={i} className="hoverable-row" style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <EditableSpan
                    value={edu.degree}
                    onChange={(v) => updateEdu(i, "degree", v)}
                    style={{ fontWeight: "700", display: "block" }}
                  />
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <IconBtn onClick={() => copyEducation(i)} color="#6366f1">
                      <Copy size={10} />
                    </IconBtn>
                    <IconBtn onClick={() => removeEducation(i)} color="#ef4444">
                      <Trash2 size={10} />
                    </IconBtn>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                  <EditableSpan value={edu.school} onChange={(v) => updateEdu(i, "school", v)} />
                  <EditableSpan value={edu.year} onChange={(v) => updateEdu(i, "year", v)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Ptemplates6;