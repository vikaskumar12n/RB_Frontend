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

const primary = "#000000";
const secondary = "#4b5563";
const borderCol = "#e5e7eb";

const getInitialData = () => ({
  name: "CASHIER NAME",
  location: "Mumbai, India",
  phone: "+91-00000-00000",
  email: "retail.pro@email.com",
  summaryTitle: "Professional Summary",
  experienceTitle: "Work History",
  skillsTitle: "Key Skills",
  eduTitle: "Education",
  summary: `Energetic Retail Cashier with 3+ years of experience in high-volume retail environments. Proven ability to handle cash transactions accurately, resolve customer inquiries, and maintain a clean, organized checkout area. Committed to providing excellent customer service and supporting team goals.`,
  skills: [
    "Cash Handling", "POS Systems", "Inventory Management",
    "Customer Service", "Conflict Resolution", "Loss Prevention"
  ],
  experience: [
    {
      company: "Reliance Retail / Big Bazaar",
      period: "2021 – Present",
      roles: [{
        title: "Retail Cashier",
        bullets: [
          "Processed 100+ transactions daily with 100% accuracy in cash and card payments.",
          "Greeted customers and assisted with product location and pricing inquiries.",
          "Promoted store loyalty programs, increasing sign-ups by 20% in 6 months.",
          "Maintained a balanced cash drawer at the end of every shift."
        ],
      }],
    },
    {
      company: "Local Supermarket",
      period: "2019 – 2021",
      roles: [{
        title: "Junior Cashier",
        bullets: [
          "Assisted in restocking shelves and managing inventory during off-peak hours.",
          "Provided fast and friendly service to ensure minimal wait times at checkout."
        ],
      }],
    },
  ],
  education: [{
    school: "City Higher Secondary School",
    year: "2019",
    degree: "High School Diploma / 12th Pass",
  }],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontWeight: "bold", paddingBottom: "6px", color: primary, borderBottom: `1px solid ${primary}`, marginBottom: "10px", fontSize: "12px", textTransform: "uppercase", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const RetailCashierTemplate = ({ data: propData, setData: setPropData }) => {
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

  const { name, location, phone, email, summaryTitle, experienceTitle, skillsTitle, eduTitle, summary, skills, experience, education } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', 'Arial', sans-serif", backgroundColor: "#fff", color: primary, boxSizing: "border-box" }}>

        {/* HEADER */}
        <div style={{ padding: "10mm 15mm 5mm", borderBottom: `2px solid ${primary}`, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "24px", fontWeight: "bold", color: primary, textTransform: "uppercase", letterSpacing: "1px" }} />
            <div style={{ fontSize: "11px", color: secondary, marginTop: "5px" }}>
              <E value={location} onChange={(v) => u("location", v)} /> | <E value={phone} onChange={(v) => u("phone", v)} />
            </div>
          </div>
          <E value={email} onChange={(v) => u("email", v)} style={{ fontSize: "11px", color: primary, fontWeight: "600" }} />
        </div>

        <div style={{ padding: "8mm 15mm" }}>

          {/* SUMMARY SECTION */}
          <div style={{ marginBottom: "20px" }}>
            <SectionTitle>
              <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
            </SectionTitle>
            <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "10.5px", lineHeight: "1.6", textAlign: "justify" }} />
          </div>

          {/* TWO COLUMN BODY */}
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "30px" }}>

            {/* LEFT COLUMN: EXPERIENCE */}
            <div>
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
                    <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "bold", fontSize: "11px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} style={{ color: secondary, fontSize: "10px" }} />
                      <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>

                  {exp.roles.map((role, ri) => (
                    <div key={ri} className="hoverable-row" style={{ marginTop: "6px", marginLeft: "8px", borderLeft: `1px solid ${borderCol}`, paddingLeft: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                        <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontStyle: "italic", fontSize: "10.5px", color: secondary, display: "block", marginTop: "2px" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                          <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                          <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                        </div>
                      </div>
                      <ul style={{ margin: "5px 0", paddingLeft: "18px" }}>
                        {role.bullets.map((b, bi) => (
                          <li key={bi} className="hoverable-row" style={{ fontSize: "10.5px", marginBottom: "4px", color: primary, display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
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

            {/* RIGHT COLUMN: SKILLS & EDUCATION */}
            <div>
              <SectionTitle showAdd={true} onAdd={addSkill}>
                <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
              </SectionTitle>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "25px" }}>
                {skills.map((s, i) => (
                  <div key={i} className="hoverable-row" style={{ fontSize: "10.5px", display: "flex", alignItems: "center", gap: 6 }}>
                    <span>•</span>
                    <E value={s} onChange={(v) => updateSkillField(i, v)} style={{ flex: 1 }} />
                    <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                    <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                  </div>
                ))}
              </div>

              <SectionTitle showAdd={true} onAdd={addEducation}>
                <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              </SectionTitle>

              {education.map((edu, i) => (
                <div key={i} className="hoverable-row" style={{ marginBottom: "12px", borderBottom: i !== education.length - 1 ? `1px dashed ${borderCol}` : "none", paddingBottom: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                    <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "bold", fontSize: "11px", flex: 1 }} />
                    <div style={{ display: "flex", gap: 3 }}>
                      <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>
                  <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "10.5px", color: secondary, marginTop: "2px" }} />
                  <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "10px", fontWeight: "bold", color: secondary }} />
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default RetailCashierTemplate;