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

const black = "#000000";
const white = "#ffffff";
const grayText = "#4b5563";

const getInitialData = () => ({
  name: "NURSE FRESHER NAME, BSN, RN",
  title: "Registered Nurse (Fresher) | BLS Certified",
  location: "Kolkata, India",
  phone: "+91-88888-77777",
  email: "nurse.fresh@healthcare.com",
  license: "RN License Status: Applied / Pending Verification",
  summaryTitle: "Objective",
  experienceTitle: "Clinical Rotations & Internships",
  skillsTitle: "Core Nursing Skills",
  certTitle: "Certifications & Licensure",
  eduTitle: "Education",
  summary: `Motivated and compassionate Graduate Nurse (BSN) seeking an entry-level position. Highly organized and dedicated to patient care. Eager to apply clinical knowledge and practical skills gained through academic training and internships. Possesses strong communication skills and the ability to work effectively in multidisciplinary healthcare teams.`,
  skills: [
    "Patient Assessment & Vital Signs Monitoring", "Medication Administration Protocols",
    "Basic Wound Care & Infection Control", "IV Insertion Assistance", "Emergency Response (BLS)",
    "Electronic Health Records (EHR) Training", "Patient & Family Education Support"
  ],
  certs: [
    "Registered Nurse (RN) License (Applied)",
    "Basic Life Support (BLS) Certification (AHA Accredited)",
    "ACLS Certification (Pursuing)",
    "Hospital Safety & Infection Control Certified"
  ],
  experience: [
    {
      company: "St. Mary's Hospital",
      period: "Clinical Internship: 6 Months (2023)",
      roles: [{
        title: "Staff Nurse Intern - Medical/Surgical Ward",
        bullets: [
          "Assisted staff nurses in delivering direct patient care to an average of 6 patients per shift.",
          "Monitored and documented vital signs, intake/output, and patient conditions.",
          "Observed and assisted with wound care and medication preparation.",
          "Participated in multidisciplinary team huddles and patient handovers."
        ],
      }],
    },
    {
      company: "Apollo Gleneagles Hospitals",
      period: "Clinical Rotation: ICU/Emergency Room (2022)",
      roles: [{
        title: "Student Nurse Rotational Internship",
        bullets: [
          "Gained hands-on experience in sterile techniques and basic patient hygiene.",
          "Assisted with patient transport and maintaining patient comfort."
        ],
      }],
    },
  ],
  education: [{
    school: "College of Nursing, Medical College",
    year: "Graduated: 2023",
    degree: "Bachelor of Science in Nursing (BSN)",
  }],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "13px", fontWeight: "900", paddingBottom: "6px", textTransform: "uppercase", marginBottom: "15px", borderBottom: `2px solid ${black}`, display: "inline-block" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1" style={{ marginLeft: "15px" }}>
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const NursingFresherTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setDataFunc = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setDataFunc({ ...ref.current, [f]: v });

  // ========== EXPERIENCE FUNCTIONS ==========
  const addExperience = () => {
    u("experience", [...ref.current.experience, { company: "New Hospital", period: "Date", roles: [{ title: "New Role", bullets: ["New bullet point"] }] }]);
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

  // ========== CERTIFICATIONS FUNCTIONS ==========
  const addCert = () => u("certs", [...ref.current.certs, "New certification"]);
  const removeCert = (i) => u("certs", ref.current.certs.filter((_, idx) => idx !== i));
  const copyCert = (i) => u("certs", [...ref.current.certs, ref.current.certs[i] + " (Copy)"]);

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
  const updateSkillField = (i, value) => {
    const up = ref.current.skills.map((s, idx) => idx === i ? value : s);
    u("skills", up);
  };
  const updateCertField = (i, value) => {
    const up = ref.current.certs.map((c, idx) => idx === i ? value : c);
    u("certs", up);
  };
  const updateEduField = (i, field, value) => {
    const up = ref.current.education.map((edu, idx) => idx === i ? { ...edu, [field]: value } : edu);
    u("education", up);
  };

  const { name, title, location, phone, email, license, summaryTitle, experienceTitle, skillsTitle, certTitle, eduTitle, summary, skills, certs, experience, education } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: white, color: black, padding: "15mm 20mm", boxSizing: "border-box" }}>

        {/* HEADER SECTION - CENTERED */}
        <div style={{ textAlign: "center", marginBottom: "12mm", borderBottom: `2px solid ${black}`, paddingBottom: "5px" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "0.5px" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "12px", fontWeight: "700", marginTop: "5px", color: black }} />

          <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "12px", fontSize: "11px", fontWeight: "500" }}>
            <span>📍 <E value={location} onChange={(v) => u("location", v)} /></span>
            <span>📞 <E value={phone} onChange={(v) => u("phone", v)} /></span>
            <span>📧 <E value={email} onChange={(v) => u("email", v)} /></span>
          </div>
          <div style={{ fontSize: "11px", marginTop: "8px", fontWeight: "700", fontStyle: "italic" }}>
            <E value={license} onChange={(v) => u("license", v)} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>

          {/* OBJECTIVE SECTION */}
          <div style={{ marginBottom: "15px" }}>
            <SectionTitle>
              <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
            </SectionTitle>
            <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.7", textAlign: "justify" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "40px" }}>

            {/* LEFT: CLINICAL ROTATIONS & INTERNSHIPS */}
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
                    <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "800", fontSize: "12px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} style={{ fontSize: "10px", color: grayText, fontWeight: "500" }} />
                      <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>

                  {exp.roles.map((role, ri) => (
                    <div key={ri} className="hoverable-row" style={{ marginTop: "8px", marginLeft: "10px", borderLeft: `1px solid ${grayText}`, paddingLeft: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                        <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontWeight: "700", fontSize: "11px", display: "block", marginTop: "4px", fontStyle: "italic", color: "#334155" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                          <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                          <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                        </div>
                      </div>
                      <ul style={{ margin: "10px 0", paddingLeft: "15px", listStyleType: "square" }}>
                        {role.bullets.map((b, bi) => (
                          <li key={bi} className="hoverable-row" style={{ fontSize: "10.5px", marginBottom: "6px", lineHeight: "1.5", display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
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

            {/* RIGHT: SKILLS & CERTIFICATIONS & EDUCATION */}
            <div>
              {/* SKILLS */}
              <div style={{ marginBottom: "30px" }}>
                <SectionTitle showAdd={true} onAdd={addSkill}>
                  <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
                </SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {skills.map((s, i) => (
                    <div key={i} className="hoverable-row" style={{ fontSize: "10px", fontWeight: "600", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontWeight: "bold" }}>›</span>
                      <E value={s} onChange={(v) => updateSkillField(i, v)} style={{ flex: 1 }} />
                      <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                      <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                    </div>
                  ))}
                </div>
              </div>

              {/* CERTIFICATIONS */}
              <div style={{ marginBottom: "30px", border: `2px dashed ${black}`, padding: "15px" }}>
                <div style={{ fontSize: "13px", fontWeight: "900", textTransform: "uppercase", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <E value={certTitle} onChange={(v) => u("certTitle", v)} />
                  <IconBtn onClick={addCert} color="#6366f1"><Plus size={8} /> Add</IconBtn>
                </div>
                {certs.map((c, i) => (
                  <div key={i} className="hoverable-row" style={{ fontSize: "9.5px", paddingBottom: "6px", marginBottom: "6px", fontWeight: "500", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: "bold" }}>+</span>
                    <E value={c} onChange={(v) => updateCertField(i, v)} style={{ flex: 1 }} />
                    <IconBtn onClick={() => copyCert(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                    <IconBtn onClick={() => removeCert(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                  </div>
                ))}
              </div>

              {/* EDUCATION */}
              <div>
                <SectionTitle showAdd={true} onAdd={addEducation}>
                  <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
                </SectionTitle>
                {education.map((edu, i) => (
                  <div key={i} className="hoverable-row" style={{ marginBottom: "15px", borderBottom: i !== education.length - 1 ? `1px dashed ${grayText}` : "none", paddingBottom: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                      <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "800", fontSize: "10.5px", flex: 1 }} />
                      <div style={{ display: "flex", gap: 3 }}>
                        <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                        <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                      </div>
                    </div>
                    <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "9.5px", marginTop: "2px" }} />
                    <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "9.5px", fontWeight: "800" }} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default NursingFresherTemplate;