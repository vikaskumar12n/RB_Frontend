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
const secondary = "#475569";
const borderCol = "#e2e8f0";

const getInitialData = () => ({
  name: "SENIOR ACCOUNTANT NAME",
  title: "Chartered Accountant | Financial Controller",
  location: "Delhi, India",
  phone: "+91-99999-88888",
  email: "senior.acc@finance.com",
  linkedin: "linkedin.com/in/seniorpro",
  summaryTitle: "Executive Summary",
  experienceTitle: "Professional Leadership",
  skillsTitle: "Core Expertise",
  eduTitle: "Education & Credentials",
  highlightTitle: "Key Achievements",
  summary: `Accomplished Senior Accountant with 10+ years of expertise in high-level financial management, strategic tax planning, and regulatory compliance. Proven ability to lead finance teams, streamline multi-entity accounting, and reduce operational costs by up to 20%. Expert in IFRS, GST laws, and complex financial modeling.`,
  highlights: [
    "Spearheaded a financial audit that identified ₹5M in unclaimed tax credits.",
    "Implemented ERP (SAP S/4HANA) across 4 regional branches.",
    "Reduced monthly closing cycle from 10 days to 4 days."
  ],
  skills: [
    "Strategic Financial Planning", "Risk Management", "Corporate Taxation",
    "Consolidated Financial Statements", "Mergers & Acquisitions", "Team Leadership"
  ],
  experience: [
    {
      company: "Reliance Industries Ltd.",
      period: "2019 – Present",
      roles: [{
        title: "Senior Manager - Accounts & Finance",
        bullets: [
          "Overseeing an annual budget of ₹500Cr and managing a team of 12 junior accountants.",
          "Ensuring 100% compliance with statutory requirements including GST, TDS, and Income Tax.",
          "Directing internal audits and coordinating with external auditors for annual filings.",
          "Providing data-driven insights to the CFO to support long-term business scaling."
        ],
      }],
    },
    {
      company: "Tata Consultancy Services",
      period: "2014 – 2019",
      roles: [{
        title: "Assistant Accounts Manager",
        bullets: [
          "Managed accounts payable/receivable for international clients (US & UK regions).",
          "Prepared quarterly MIS reports and variance analysis for executive review.",
        ],
      }],
    },
  ],
  education: [
    { school: "The Institute of Chartered Accountants of India", year: "2014", degree: "Chartered Accountant (CA)" },
    { school: "SRCC, Delhi University", year: "2011", degree: "B.Com (Hons)" }
  ],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontWeight: "bold", fontSize: "12px", textTransform: "uppercase", borderBottom: `1.5px solid ${primary}`, marginBottom: "8px", paddingBottom: "6px", letterSpacing: "1px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const SeniorAccountantTemplate = ({ data: propData, setData: setPropData }) => {
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

  // ========== HIGHLIGHTS FUNCTIONS ==========
  const addHighlight = () => u("highlights", [...ref.current.highlights, "New achievement"]);
  const removeHighlight = (i) => u("highlights", ref.current.highlights.filter((_, idx) => idx !== i));
  const copyHighlight = (i) => u("highlights", [...ref.current.highlights, ref.current.highlights[i] + " (Copy)"]);

  // ========== SKILLS FUNCTIONS ==========
  const addSkill = () => u("skills", [...ref.current.skills, "New skill"]);
  const removeSkill = (i) => u("skills", ref.current.skills.filter((_, idx) => idx !== i));
  const copySkill = (i) => u("skills", [...ref.current.skills, ref.current.skills[i] + " (Copy)"]);

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
  const updateHighlightField = (i, value) => {
    const up = ref.current.highlights.map((h, idx) => idx === i ? value : h);
    u("highlights", up);
  };

  const { name, title, location, phone, email, linkedin, summaryTitle, experienceTitle, skillsTitle, eduTitle, highlightTitle, summary, highlights, experience, education, skills } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', 'Helvetica', sans-serif", backgroundColor: "#fff", color: primary, boxSizing: "border-box", padding: "15mm" }}>

        {/* CLEAN HEADER */}
        <div style={{ marginBottom: "25px", textAlign: "left" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px", textTransform: "uppercase" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", color: secondary, marginTop: "2px", fontWeight: "500" }} />

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px", fontSize: "11px", color: secondary }}>
            <E value={location} onChange={(v) => u("location", v)} />
            <span>•</span>
            <E value={phone} onChange={(v) => u("phone", v)} />
            <span>•</span>
            <E value={email} onChange={(v) => u("email", v)} />
            <span>•</span>
            <E value={linkedin} onChange={(v) => u("linkedin", v)} />
          </div>
        </div>

        {/* SUMMARY */}
        <div style={{ marginBottom: "20px" }}>
          <SectionTitle>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </SectionTitle>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6", color: secondary }} />
        </div>

        {/* HIGHLIGHTS */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontWeight: "bold", fontSize: "12px", textTransform: "uppercase", marginBottom: "8px", color: primary, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <E value={highlightTitle} onChange={(v) => u("highlightTitle", v)} />
            <IconBtn onClick={addHighlight} color="#6366f1">
              <Plus size={9} /> Add
            </IconBtn>
          </div>
          <ul style={{ margin: "0", paddingLeft: "15px", listStyleType: "circle" }}>
            {highlights.map((h, i) => (
              <li key={i} className="hoverable-row" style={{ fontSize: "10.5px", marginBottom: "4px", color: secondary, display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
                <span>•</span>
                <E value={h} onChange={(v) => updateHighlightField(i, v)} style={{ flex: 1 }} />
                <IconBtn onClick={() => copyHighlight(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                <IconBtn onClick={() => removeHighlight(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
              </li>
            ))}
          </ul>
        </div>

        {/* EXPERIENCE */}
        <div style={{ marginBottom: "20px" }}>
          <SectionTitle showAdd={true} onAdd={addExperience}>
            <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
          </SectionTitle>

          {experience.map((exp, ei) => (
            <div key={ei} className="hoverable-row" style={{
              borderBottom: ei !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none",
              marginBottom: ei !== data.experience.length - 1 ? "5px" : "0",  /*  added */
              paddingBottom: ei !== data.experience.length - 1 ? "5px" : "0", /*  added */
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "700", fontSize: "12px" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} />
                  <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                  <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                </div>
              </div>

              {exp.roles.map((role, ri) => (
                <div key={ri} className="hoverable-row" style={{ marginTop: "6px", marginLeft: "8px", borderLeft: `2px solid ${primary}`, paddingLeft: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                    <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontWeight: "600", color: secondary, fontSize: "11px", display: "block", marginBottom: "6px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                      <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                      <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                    </div>
                  </div>

                  <ul style={{ margin: "0", paddingLeft: "15px" }}>
                    {role.bullets.map((b, bi) => (
                      <li key={bi} className="hoverable-row" style={{ fontSize: "10.5px", marginBottom: "3px", color: secondary, display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
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

        {/* SKILLS & EDUCATION */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          <div>
            <div style={{ fontWeight: "bold", fontSize: "11px", textTransform: "uppercase", borderBottom: `1px solid ${borderCol}`, marginBottom: "8px", paddingBottom: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
              <IconBtn onClick={addSkill} color="#6366f1"><Plus size={8} /> Add</IconBtn>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px", fontSize: "10.5px", color: secondary }}>
              {skills.map((s, i) => (
                <span key={i} className="hoverable-row" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <E value={s} onChange={(v) => updateSkillField(i, v)} />
                  <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={6} /></IconBtn>
                  <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={6} /></IconBtn>
                  {i !== skills.length - 1 && <span style={{ color: borderCol, marginLeft: "6px" }}>|</span>}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: "bold", fontSize: "11px", textTransform: "uppercase", borderBottom: `1px solid ${borderCol}`, marginBottom: "8px", paddingBottom: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              <IconBtn onClick={addEducation} color="#6366f1"><Plus size={8} /> Add</IconBtn>
            </div>
            {education.map((edu, i) => (
              <div key={i} className="hoverable-row" style={{ marginBottom: "10px", borderBottom: i !== education.length - 1 ? `1px dashed ${borderCol}` : "none", paddingBottom: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                  <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "bold", fontSize: "10.5px", flex: 1 }} />
                  <div style={{ display: "flex", gap: 3 }}>
                    <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                    <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2px" }}>
                  <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "10px", color: secondary, flex: 1 }} />
                  <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "10px", fontWeight: "bold" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default SeniorAccountantTemplate;