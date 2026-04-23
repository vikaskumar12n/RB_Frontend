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

// Photo Upload
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
      className="no-print"
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

const SectionTitle = ({ value, onChange, onAdd, showAdd = false }) => (
  <div style={{
    borderBottom: `2px solid ${primary}`,
    marginBottom: "10px", paddingBottom: "4px",
    fontSize: "11px", fontWeight: "800",
    textTransform: "uppercase", letterSpacing: "1.5px",
    color: primary,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}>
    <E value={value} onChange={onChange} />
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const PTemplate3 = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setDataFunc = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setDataFunc({ ...ref.current, [f]: v });

  // ========== EXPERIENCE FUNCTIONS ==========
  const addExperience = () => {
    u("experience", [...ref.current.experience, { company: "New Company", period: "Date", roles: [{ title: "New Role", bullets: ["New bullet point"] }] }]);
  };
  const removeExperience = (i) => u("experience", ref.current.experience.filter((_, idx) => idx !== i));
  const copyExperience = (i) => {
    const expToCopy = JSON.parse(JSON.stringify(ref.current.experience[i]));
    expToCopy.company = expToCopy.company + " (Copy)";
    u("experience", [...ref.current.experience, expToCopy]);
  };

  // ========== ROLE FUNCTIONS ==========
  const addRole = (ei) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: [...exp.roles, { title: "New Role", bullets: ["New bullet point"] }] } : exp);
    u("experience", up);
  };
  const removeRole = (ei, ri) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: exp.roles.filter((_, r) => r !== ri) } : exp);
    u("experience", up);
  };
  const copyRole = (ei, ri) => {
    const roleToCopy = JSON.parse(JSON.stringify(ref.current.experience[ei].roles[ri]));
    roleToCopy.title = roleToCopy.title + " (Copy)";
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: [...exp.roles, roleToCopy] } : exp);
    u("experience", up);
  };

  // ========== BULLET FUNCTIONS ==========
  const addBullet = (ei, ri) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: exp.roles.map((role, r) => r === ri ? { ...role, bullets: [...role.bullets, "New bullet point"] } : role) } : exp);
    u("experience", up);
  };
  const removeBullet = (ei, ri, bi) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: exp.roles.map((role, r) => r === ri ? { ...role, bullets: role.bullets.filter((_, b) => b !== bi) } : role) } : exp);
    u("experience", up);
  };
  const copyBullet = (ei, ri, bi) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: exp.roles.map((role, r) => r === ri ? { ...role, bullets: [...role.bullets, role.bullets[bi] + " (Copy)"] } : role) } : exp);
    u("experience", up);
  };

  // ========== SKILLS FUNCTIONS ==========
  const addSkill = () => u("competencies", [...ref.current.competencies, "New skill"]);
  const removeSkill = (i) => u("competencies", ref.current.competencies.filter((_, idx) => idx !== i));
  const copySkill = (i) => u("competencies", [...ref.current.competencies, ref.current.competencies[i] + " (Copy)"]);

  // ========== EDUCATION FUNCTIONS ==========
  const addEducation = () => u("education", [...ref.current.education, { degree: "New Degree", school: "New School", year: "Year" }]);
  const removeEducation = (i) => u("education", ref.current.education.filter((_, idx) => idx !== i));
  const copyEducation = (i) => {
    const eduToCopy = JSON.parse(JSON.stringify(ref.current.education[i]));
    eduToCopy.school = eduToCopy.school + " (Copy)";
    u("education", [...ref.current.education, eduToCopy]);
  };

  // ========== UPDATE FUNCTIONS ==========
  const updateExpField = (ei, field, value) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, [field]: value } : exp);
    u("experience", up);
  };
  const updateRoleField = (ei, ri, field, value) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: exp.roles.map((role, r) => r === ri ? { ...role, [field]: value } : role) } : exp);
    u("experience", up);
  };
  const updateBulletField = (ei, ri, bi, value) => {
    const up = ref.current.experience.map((exp, i) => i === ei ? { ...exp, roles: exp.roles.map((role, r) => r === ri ? { ...role, bullets: role.bullets.map((b, idx) => idx === bi ? value : b) } : role) } : exp);
    u("experience", up);
  };
  const updateEduField = (i, field, value) => {
    const up = ref.current.education.map((edu, idx) => idx === i ? { ...edu, [field]: value } : edu);
    u("education", up);
  };
  const updateSkillField = (i, value) => {
    const up = ref.current.competencies.map((s, idx) => idx === i ? value : s);
    u("competencies", up);
  };

  const {
    name, title, location, phone, email, linkedin, photo,
    summaryTitle, experienceTitle, skillsTitle, eduTitle,
    summary, competencies, experience, education
  } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{
        width: "210mm", minHeight: "297mm",
        fontFamily: "'Times New Roman', Georgia, serif",
        backgroundColor: "#fff", color: primary,
        boxSizing: "border-box",
      }}>

        {/* HEADER */}
        <div style={{
          padding: "30px 36px 20px",
          borderBottom: `3px double ${primary}`,
          display: "flex", alignItems: "center", gap: "24px",
        }}>
          <PhotoUpload photo={photo} onPhotoChange={(v) => u("photo", v)} />

          <div style={{ flex: 1, textAlign: "center" }}>
            <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "3px", color: primary }} />
            <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "12px", color: secondary, fontStyle: "italic", marginTop: "5px" }} />

            <div style={{ margin: "10px auto", width: "60px", height: "1px", backgroundColor: primary }} />

            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "4px 14px", fontSize: "9.5px", color: secondary }}>
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

        {/* BODY */}
        <div style={{ padding: "24px 36px", display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* SUMMARY */}
          <div>
            <SectionTitle value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
            <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "10.5px", lineHeight: "1.7", color: secondary, textAlign: "justify" }} />
          </div>

          {/* EXPERIENCE */}
          <div>
            <SectionTitle value={experienceTitle} onChange={(v) => u("experienceTitle", v)} showAdd={true} onAdd={addExperience} />

            {experience.map((exp, ei) => (
              <div key={ei} className="hoverable-row" style={{
                borderBottom: ei !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none",
                marginBottom: ei !== data.experience.length - 1 ? "5px" : "0",  /*  added */
                paddingBottom: ei !== data.experience.length - 1 ? "5px" : "0", /*  added */
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                  <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "700", fontSize: "11.5px", color: primary }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} style={{ fontSize: "9.5px", color: secondary, fontStyle: "italic" }} />
                    <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                    <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                  </div>
                </div>

                {exp.roles.map((role, ri) => (
                  <div key={ri} className="hoverable-row" style={{ marginTop: "6px", marginLeft: "10px", borderLeft: `1px solid ${border}`, paddingLeft: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                      <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontSize: "10.5px", fontWeight: "600", fontStyle: "italic", color: secondary, display: "block", marginBottom: "5px", marginTop: "3px" }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                        <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                        <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                      </div>
                    </div>
                    <ul style={{ margin: "0", paddingLeft: "16px" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} className="hoverable-row" style={{ fontSize: "10px", marginBottom: "3px", color: secondary, lineHeight: "1.6", display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
                          <span>•</span>
                          <E value={b} onChange={(v) => updateBulletField(ei, ri, bi, v)} style={{ flex: 1 }} />
                          <IconBtn onClick={() => copyBullet(ei, ri, bi)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={6} /></IconBtn>
                          <IconBtn onClick={() => removeBullet(ei, ri, bi)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={6} /></IconBtn>
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
            <SectionTitle value={skillsTitle} onChange={(v) => u("skillsTitle", v)} showAdd={true} onAdd={addSkill} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 0px", fontSize: "10.5px", color: secondary }}>
              {competencies.map((skill, i) => (
                <span key={i} className="hoverable-row" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <E value={skill} onChange={(v) => updateSkillField(i, v)} />
                  <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={6} /></IconBtn>
                  <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={6} /></IconBtn>
                  {i !== competencies.length - 1 && <span style={{ margin: "0 8px", color: border }}>◆</span>}
                </span>
              ))}
            </div>
          </div>

          {/* EDUCATION */}
          <div>
            <SectionTitle value={eduTitle} onChange={(v) => u("eduTitle", v)} showAdd={true} onAdd={addEducation} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {education.map((edu, i) => (
                <div key={i} className="hoverable-row" style={{ paddingLeft: "10px", borderLeft: `2px solid ${primary}`, borderBottom: i !== education.length - 1 ? `1px dashed ${border}` : "none", paddingBottom: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                    <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "700", fontSize: "10.5px", color: primary, flex: 1 }} />
                    <div style={{ display: "flex", gap: 3 }}>
                      <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2px" }}>
                    <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "10px", color: secondary, fontStyle: "italic", flex: 1 }} />
                    <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "9px", fontWeight: "600", color: secondary, fontStyle: "italic", marginLeft: "8px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default PTemplate3;