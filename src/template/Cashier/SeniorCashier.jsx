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
const secondary = "#475569";
const line = "#e2e8f0";

const getInitialData = () => ({
  name: "SENIOR CASHIER NAME",
  title: "Front-End Supervisor | Lead Cashier",
  location: "Bangalore, India",
  phone: "+91-90000-80000",
  email: "senior.cashier@retail.com",
  summaryTitle: "Professional Profile",
  experienceTitle: "Management & Experience",
  skillsTitle: "Core Competencies",
  eduTitle: "Education",
  expertiseTitle: "Operational Expertise",
  summary: `Dedicated Senior Cashier with 7+ years of experience in high-volume retail management. Proven track record in supervising front-end operations, training new staff, and maintaining rigorous cash control standards. Expert in resolving complex customer issues and ensuring seamless checkout experiences during peak hours.`,
  expertise: [
    "Cash Drawer Reconciliation", "Staff Training & Mentoring", "POS System Troubleshooting",
    "Refund & Exchange Management", "Shift Scheduling", "Audit Compliance"
  ],
  experience: [
    {
      company: "Shoppers Stop / Lifestyle",
      period: "2020 – Present",
      roles: [{
        title: "Senior Cashier / Front-End Lead",
        bullets: [
          "Supervise a team of 12 cashiers, ensuring adherence to store policies and speed-of-service targets.",
          "Perform daily cash office functions, including bank deposits and till audits for 15+ registers.",
          "Train 20+ new hires on POS operations, customer service excellence, and loss prevention.",
          "Successfully reduced checkout wait times by 15% through efficient lane management.",
        ],
      }],
    },
    {
      company: "Westside Retail",
      period: "2016 – 2020",
      roles: [{
        title: "Lead Cashier",
        bullets: [
          "Handled high-value transactions and corporate account billing with 100% accuracy.",
          "Resolved escalated customer complaints, maintaining a 95% positive feedback rating.",
        ],
      }],
    },
  ],
  education: [{
    school: "University of Commerce",
    year: "2016",
    degree: "Bachelor of Commerce (B.Com)",
  }],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "13px", fontWeight: "bold", color: primary, textTransform: "uppercase", marginBottom: "12px", borderBottom: `1px solid ${line}`, paddingBottom: "2px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const SeniorCashierTemplate = ({ data: propData, setData: setPropData }) => {
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

  // ========== EXPERTISE FUNCTIONS ==========
  const addExpertise = () => u("expertise", [...ref.current.expertise, "New expertise"]);
  const removeExpertise = (i) => u("expertise", ref.current.expertise.filter((_, idx) => idx !== i));
  const copyExpertise = (i) => u("expertise", [...ref.current.expertise, ref.current.expertise[i] + " (Copy)"]);

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
  const updateExpertiseField = (i, value) => {
    const up = ref.current.expertise.map((e, idx) => idx === i ? value : e);
    u("expertise", up);
  };
  const updateEduField = (i, field, value) => {
    const up = ref.current.education.map((edu, idx) => idx === i ? { ...edu, [field]: value } : edu);
    u("education", up);
  };

  const { name, title, location, phone, email, summaryTitle, experienceTitle, eduTitle, expertiseTitle, summary, expertise, experience, education } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Segoe UI', 'Helvetica', sans-serif", backgroundColor: "#fff", color: primary, boxSizing: "border-box" }}>

        {/* HEADER */}
        <div style={{ padding: "12mm 15mm 5mm", borderBottom: `3px solid ${primary}` }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", color: secondary, marginTop: "2px", fontWeight: "600", textTransform: "uppercase" }} />

          <div style={{ display: "flex", gap: "20px", marginTop: "10px", fontSize: "11px", fontWeight: "500" }}>
            <span><E value={location} onChange={(v) => u("location", v)} /></span>
            <span style={{ color: line }}>|</span>
            <span><E value={phone} onChange={(v) => u("phone", v)} /></span>
            <span style={{ color: line }}>|</span>
            <span><E value={email} onChange={(v) => u("email", v)} /></span>
          </div>
        </div>

        <div style={{ padding: "8mm 15mm" }}>

          {/* SUMMARY SECTION */}
          <div style={{ marginBottom: "25px" }}>
            <SectionTitle>
              <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
            </SectionTitle>
            <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6", color: primary }} />
          </div>

          {/* TWO COLUMN CONTENT */}
          <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: "40px" }}>

            {/* LEFT: WORK EXPERIENCE */}
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
                    <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "bold", fontSize: "12px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} />
                      <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>

                  {exp.roles.map((role, ri) => (
                    <div key={ri} className="hoverable-row" style={{ marginTop: "6px", marginLeft: "8px", borderLeft: `1px solid ${line}`, paddingLeft: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                        <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontStyle: "italic", fontSize: "11px", color: secondary, fontWeight: "600" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                          <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                          <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                        </div>
                      </div>
                      <ul style={{ margin: "8px 0", paddingLeft: "18px" }}>
                        {role.bullets.map((b, bi) => (
                          <li key={bi} className="hoverable-row" style={{ fontSize: "11px", marginBottom: "5px", color: primary, display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
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

            {/* RIGHT: OPERATIONAL EXPERTISE & EDUCATION */}
            <div>
              <SectionTitle showAdd={true} onAdd={addExpertise}>
                <E value={expertiseTitle} onChange={(v) => u("expertiseTitle", v)} />
              </SectionTitle>

              <div style={{ marginBottom: "30px" }}>
                {expertise.map((item, i) => (
                  <div key={i} className="hoverable-row" style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px", fontSize: "11px" }}>
                    <span style={{ color: primary }}>•</span>
                    <E value={item} onChange={(v) => updateExpertiseField(i, v)} style={{ flex: 1 }} />
                    <IconBtn onClick={() => copyExpertise(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                    <IconBtn onClick={() => removeExpertise(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                  </div>
                ))}
              </div>

              <SectionTitle showAdd={true} onAdd={addEducation}>
                <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              </SectionTitle>

              {education.map((edu, i) => (
                <div key={i} className="hoverable-row" style={{ marginBottom: "15px", borderBottom: i !== education.length - 1 ? `1px dashed ${line}` : "none", paddingBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                    <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "bold", fontSize: "11.5px", flex: 1 }} />
                    <div style={{ display: "flex", gap: 3 }}>
                      <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>
                  <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "11px", color: secondary, marginTop: "2px" }} />
                  <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "11px", fontWeight: "bold", color: primary }} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default SeniorCashierTemplate;