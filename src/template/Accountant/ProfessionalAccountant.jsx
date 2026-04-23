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

const primary = "#1e293b";
const secondary = "#64748b";
const bgLight = "#f8fafc";
const accent = "#0f172a";

const getInitialData = () => ({
  name: "ACCOUNTANT NAME",
  location: "Mumbai, India",
  phone: "+91-98765-43210",
  email: "finance.pro@email.com",
  linkedin: "linkedin.com/in/accountant",
  objectiveTitle: "Professional Profile",
  experienceTitle: "Professional Experience",
  educationTitle: "Academic Background",
  skillsTitle: "Core Competencies",
  softwareTitle: "Technical Proficiency",
  objective: `Detail-oriented Accountant with 6+ years of experience in financial reporting, tax compliance, and auditing. Proven track record of maintaining accurate financial records, optimizing tax strategies, and ensuring full compliance with GAAP and IFRS standards. Expert in financial analysis and cost reduction.`,
  skills: [
    "Financial Auditing", "Taxation (GST/Income Tax)", "Accounts Payable/Receivable",
    "Payroll Management", "Budgeting & Forecasting", "Bank Reconciliation"
  ],
  software: ["Tally Prime", "SAP FICO", "QuickBooks", "Advanced MS Excel"],
  experience: [
    {
      company: "R.K. Associates & Co.",
      period: "2021 – Present",
      roles: [{
        title: "Senior Accountant",
        bullets: [
          "Managed end-to-end accounting operations for 15+ corporate clients.",
          "Finalized balance sheets and P&L accounts with 100% accuracy.",
          "Automated reconciliation processes, saving 20 hours of manual work monthly.",
          "Handled GST filings, TDS returns, and responded to tax notices.",
        ],
      }],
    },
    {
      company: "Global Solutions Ltd.",
      period: "2018 – 2021",
      roles: [{
        title: "Junior Accountant",
        bullets: [
          "Processed vendor payments and managed daily cash flow records.",
          "Assisted in internal audits and prepared financial reports for management.",
        ],
      }],
    },
  ],
  education: [{
    school: "University of Delhi",
    year: "2018",
    degree: "Chartered Accountant (ICAI) / M.Com",
  }],
});

const SectionHeader = ({ children, onAdd, showAdd = false }) => (
  <div style={{ borderBottom: `2px solid ${primary}`, marginBottom: "8px", paddingBottom: "6px", marginTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span style={{ fontSize: "11px", fontWeight: "800", color: primary, textTransform: "uppercase", letterSpacing: "1.5px" }}>
      {children}
    </span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const AccountantTemplate = ({ data: propData, setData: setPropData }) => {
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
  const addSkill = () => u("skills", [...ref.current.skills, "New skill"]);
  const removeSkill = (i) => u("skills", ref.current.skills.filter((_, idx) => idx !== i));
  const copySkill = (i) => u("skills", [...ref.current.skills, ref.current.skills[i] + " (Copy)"]);

  // ========== SOFTWARE FUNCTIONS ==========
  const addSoftware = () => u("software", [...ref.current.software, "New software"]);
  const removeSoftware = (i) => u("software", ref.current.software.filter((_, idx) => idx !== i));
  const copySoftware = (i) => u("software", [...ref.current.software, ref.current.software[i] + " (Copy)"]);

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
    const up = ref.current.skills.map((s, idx) => idx === i ? value : s);
    u("skills", up);
  };
  const updateSoftwareField = (i, value) => {
    const up = ref.current.software.map((s, idx) => idx === i ? value : s);
    u("software", up);
  };

  const { name, location, phone, email, linkedin, objectiveTitle, experienceTitle, educationTitle, skillsTitle, softwareTitle, objective, experience, education, skills, software } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "10.5px",
        lineHeight: "1.4",
        backgroundColor: "#fff",
        color: "#334155",
        boxSizing: "border-box"
      }}>

        {/* TOP HEADER - CLEAN & BOLD */}
        <div style={{ padding: "12mm 14mm", borderBottom: `8px solid ${primary}`, textAlign: "center" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "900", color: accent, textTransform: "uppercase", marginBottom: "5px" }} />
          <div style={{ display: "flex", justifyContent: "center", gap: "15px", fontSize: "10px", color: secondary }}>
            <E value={location} onChange={(v) => u("location", v)} />
            <span>|</span>
            <E value={phone} onChange={(v) => u("phone", v)} />
            <span>|</span>
            <E value={email} onChange={(v) => u("email", v)} />
          </div>
          <div style={{ marginTop: "3px", fontSize: "10px", color: primary, fontWeight: "600" }}>
            <E value={linkedin} onChange={(v) => u("linkedin", v)} />
          </div>
        </div>

        <div style={{ padding: "8mm 14mm", display: "grid", gridTemplateColumns: "1fr" }}>

          {/* SUMMARY */}
          <SectionHeader>
            <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
          </SectionHeader>
          <div style={{ padding: "2px 0", textAlign: "justify" }}>
            <E value={objective} onChange={(v) => u("objective", v)} block />
          </div>

          {/* EXPERIENCE */}
          <SectionHeader showAdd={true} onAdd={addExperience}>
            <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
          </SectionHeader>

          {experience.map((exp, ei) => (
            <div key={ei} className="hoverable-row" style={{
              borderBottom: ei !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none",
              marginBottom: ei !== data.experience.length - 1 ? "5px" : "0",  /*  added */
              paddingBottom: ei !== data.experience.length - 1 ? "5px" : "0", /*  added */
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "bold", fontSize: "11px", color: accent }} />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} style={{ color: secondary }} />
                  <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                  <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                </div>
              </div>

              {exp.roles.map((role, ri) => (
                <div key={ri} className="hoverable-row" style={{ marginTop: "6px", marginLeft: "8px", borderLeft: `2px solid ${primary}`, paddingLeft: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                    <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontStyle: "italic", fontWeight: "600", color: secondary, display: "block", marginBottom: "4px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                      <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                      <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                    </div>
                  </div>

                  <div style={{ paddingLeft: "5px" }}>
                    {role.bullets.map((b, bi) => (
                      <div key={bi} className="hoverable-row" style={{ display: "flex", gap: "8px", marginBottom: "2px", alignItems: "flex-start" }}>
                        <span style={{ color: primary }}>•</span>
                        <E value={b} onChange={(v) => updateBulletField(ei, ri, bi, v)} style={{ flex: 1 }} />
                        <IconBtn onClick={() => copyBullet(ei, ri, bi)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={6} /></IconBtn>
                        <IconBtn onClick={() => removeBullet(ei, ri, bi)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={6} /></IconBtn>
                      </div>
                    ))}
                  </div>
                </div>
              ))}


            </div>
          ))}

          {/* TWO COLUMN SECTION FOR SKILLS & EDUCATION */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "30px" }}>
            <div>
              <SectionHeader showAdd={true} onAdd={addSkill}>
                <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
              </SectionHeader>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
                {skills.map((skill, i) => (
                  <div key={i} className="hoverable-row" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "4px", height: "4px", background: secondary, borderRadius: "50%" }} />
                    <E value={skill} onChange={(v) => updateSkillField(i, v)} style={{ flex: 1 }} />
                    <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={6} /></IconBtn>
                    <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={6} /></IconBtn>
                  </div>
                ))}
              </div>

              <SectionHeader showAdd={true} onAdd={addSoftware}>
                <E value={softwareTitle} onChange={(v) => u("softwareTitle", v)} />
              </SectionHeader>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {software.map((sw, i) => (
                  <span key={i} className="hoverable-row" style={{ background: bgLight, padding: "2px 8px", borderRadius: "4px", border: `1px solid #e2e8f0`, fontSize: "9.5px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <E value={sw} onChange={(v) => updateSoftwareField(i, v)} />
                    <IconBtn onClick={() => copySoftware(i)} color="#6366f1" style={{ padding: "1px 2px" }}><Copy size={5} /></IconBtn>
                    <IconBtn onClick={() => removeSoftware(i)} color="#ef4444" style={{ padding: "1px 2px" }}><Trash2 size={5} /></IconBtn>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <SectionHeader showAdd={true} onAdd={addEducation}>
                <E value={educationTitle} onChange={(v) => u("educationTitle", v)} />
              </SectionHeader>
              {education.map((edu, i) => (
                <div key={i} className="hoverable-row" style={{ marginBottom: "12px", borderBottom: i !== education.length - 1 ? `1px dashed #e2e8f0` : "none", paddingBottom: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                    <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "bold", display: "block", flex: 1 }} />
                    <div style={{ display: "flex", gap: 3 }}>
                      <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>
                  <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "9.5px", color: secondary, display: "block" }} />
                  <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "9.5px", fontWeight: "bold", color: primary }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AccountantTemplate;