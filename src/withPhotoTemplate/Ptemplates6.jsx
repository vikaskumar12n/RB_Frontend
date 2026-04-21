import React, { useState, useRef } from "react";
import { Phone, Mail, MapPin, Plus, X } from "lucide-react";

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

const Ptemplates6 = ({ data: propData, setData: setPropData }) => {
  const [data, setDataState] = useState(() => ({
    name: "First Name",
    role: "Certified Public Accountant (CPA)",
    phone: "+91 7567895678",
    location: "New York / Mumbai",
    email: "cpa.professional@globalfinance.com",
    Linkedin: ".com/in/cpa-expert",
    profileImage: null,
    summaryTitle: "Executive Summary",
    summary:
      "Results-oriented Certified Public Accountant (CPA) with expertise in US GAAP, IFRS, and complex tax regulations.",
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

  const updateExp = (index, field, value) => {
    const updated = dataRef.current.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    u("experience", updated);
  };

  const updateEdu = (index, field, value) => {
    const updated = dataRef.current.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    u("education", updated);
  };

  const updateSkill = (index, value) => {
    const updated = dataRef.current.skills.map((s, i) => (i === index ? value : s));
    u("skills", updated);
  };

  const addSkill = () => u("skills", [...dataRef.current.skills, "New Skill"]);
  const removeSkill = (index) => u("skills", dataRef.current.skills.filter((_, i) => i !== index));

  const addExp = () =>
    u("experience", [
      ...dataRef.current.experience,
      { company: "Company Name", role: "Job Role", period: "Year - Year", desc: "Description here." },
    ]);

  const addEdu = () =>
    u("education", [
      ...dataRef.current.education,
      { degree: "Degree Name", school: "University Name", year: "Year" },
    ]);

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
  };

  return (
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
              <EditableSpan value={data.Linkedin} onChange={(v) => u("Linkedin", v)} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <MapPin size={12} />
              <EditableSpan value={data.location} onChange={(v) => u("location", v)} />
            </div>
          </div>
        </div>

        <label style={styles.photoCircle}>
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
        {/* ✅ FIX: summaryTitle ab editable hai */}
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

      {/* Experience */}
      <div style={styles.section}>
        {/* ✅ FIX: experienceTitle ab editable hai */}
        <div style={styles.sectionLabel}>
          <EditableSpan
            value={data.experienceTitle}
            onChange={(v) => u("experienceTitle", v)}
            style={{ color: "#0984e3", fontWeight: "800", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}
          />
        </div>
        <div style={styles.sectionContent}>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700" }}>
                <EditableSpan value={exp.role} onChange={(v) => updateExp(i, "role", v)} />
                <EditableSpan
                  value={exp.period}
                  onChange={(v) => updateExp(i, "period", v)}
                  style={{ color: "#636e72" }}
                />
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

      {/* Skills */}
      <div style={styles.section}>
        {/* ✅ FIX: skillsTitle ab editable hai */}
        <div style={styles.sectionLabel}>
          <EditableSpan
            value={data.skillsTitle}
            onChange={(v) => u("skillsTitle", v)}
            style={{ color: "#0984e3", fontWeight: "800", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}
          />
        </div>
        <div style={styles.sectionContent}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {data.skills.map((skill, i) => (
              <span key={i} style={styles.skillBadge}>
                <EditableSpan value={skill} onChange={(v) => updateSkill(i, v)} />
                <X size={10} style={{ cursor: "pointer", color: "#b2bec3" }} onClick={() => removeSkill(i)} />
              </span>
            ))}
          </div> 
        </div>
      </div>

      {/* Education */}
      <div style={styles.section}>
        {/* ✅ FIX: educationTitle ab editable hai */}
        <div style={styles.sectionLabel}>
          <EditableSpan
            value={data.educationTitle}
            onChange={(v) => u("educationTitle", v)}
            style={{ color: "#0984e3", fontWeight: "800", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}
          />
        </div>
        <div style={styles.sectionContent}>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <EditableSpan
                value={edu.degree}
                onChange={(v) => updateEdu(i, "degree", v)}
                style={{ fontWeight: "700", display: "block" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                <EditableSpan value={edu.school} onChange={(v) => updateEdu(i, "school", v)} />
                <EditableSpan value={edu.year} onChange={(v) => updateEdu(i, "year", v)} />
              </div>
            </div>
          ))} 
        </div>
      </div>
    </div>
  );
};

export default Ptemplates6;