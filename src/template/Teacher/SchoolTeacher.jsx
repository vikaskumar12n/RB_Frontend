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
const darkGray = "#374151";
const lightGray = "#6b7280";
const white = "#ffffff";

const getInitialData = () => ({
  name: "TEACHER NAME, B.Ed.",
  title: "Senior Secondary English Teacher | 5+ Years Experience",
  location: "Lucknow, India",
  phone: "+91-98000-55555",
  email: "teacher.pro@email.com",
  linkedin: "linkedin.com/in/educator-profile",
  objectiveTitle: "Teaching Philosophy",
  skillsTitle: "Core Competencies",
  experienceTitle: "Professional Teaching Experience",
  eduTitle: "Academic Background",
  certTitle: "Certifications & Workshops",
  objective: `Dedicated and passionate educator with a strong commitment to student development and academic excellence. Expert in creating engaging lesson plans, managing diverse classrooms, and implementing innovative teaching methodologies. Proven track record of improving student literacy and critical thinking skills.`,
  skills: [
    "Curriculum Development", "Classroom Management", "Student Assessment & Evaluation",
    "E-Learning Tools (Google Classroom/Zoom)", "Parent-Teacher Communication",
    "Lesson Planning & Execution", "Extracurricular Coordination"
  ],
  experience: [
    {
      company: "St. Xavier's International School",
      period: "2020 – Present",
      roles: [{
        title: "Trained Graduate Teacher (TGT) - English",
        bullets: [
          "Developed and delivered comprehensive English curriculum for Grades 8-10, achieving a 100% pass rate in board exams.",
          "Introduced interactive storytelling and drama techniques, increasing student participation by 40%.",
          "Mentored a group of 40 students as a Class Teacher, focusing on both academic and emotional well-being.",
          "Coordinated the annual Inter-School Literary Fest, managing over 500 participants."
        ],
      }],
    },
    {
      company: "Bright Beginnings Public School",
      period: "2018 – 2020",
      roles: [{
        title: "Primary School Teacher",
        bullets: [
          "Focused on foundational literacy and numeracy for Grades 3-5.",
          "Regularly conducted parent-teacher meetings to discuss individual student progress and behavioral development."
        ],
      }],
    },
  ],
  education: [
    {
      school: "University of Lucknow",
      year: "2018",
      degree: "Bachelor of Education (B.Ed.)",
    },
    {
      school: "Banaras Hindu University (BHU)",
      year: "2016",
      degree: "M.A. in English Literature",
    }
  ],
  certs: [
    "CTET Qualified (Central Teacher Eligibility Test)",
    "Digital Teaching Certification by Microsoft Educators",
    "Workshop on Inclusive Education & Special Needs"
  ],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const SchoolTeacherTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setDataFunc = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setDataFunc({ ...ref.current, [f]: v });

  // ========== EXPERIENCE FUNCTIONS ==========
  const addExperience = () => {
    u("experience", [...ref.current.experience, { company: "New School", period: "Date", roles: [{ title: "New Position", bullets: ["New bullet point"] }] }]);
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

  // ========== CERTIFICATIONS FUNCTIONS ==========
  const addCert = () => u("certs", [...ref.current.certs, "New certification"]);
  const removeCert = (i) => u("certs", ref.current.certs.filter((_, idx) => idx !== i));
  const copyCert = (i) => u("certs", [...ref.current.certs, ref.current.certs[i] + " (Copy)"]);

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
  const updateEduField = (i, field, value) => {
    const up = ref.current.education.map((edu, idx) => idx === i ? { ...edu, [field]: value } : edu);
    u("education", up);
  };
  const updateCertField = (i, value) => {
    const up = ref.current.certs.map((c, idx) => idx === i ? value : c);
    u("certs", up);
  };

  const { name, title, location, phone, email, linkedin, objectiveTitle, skillsTitle, experienceTitle, eduTitle, certTitle, objective, skills, experience, education, certs } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Playfair Display', serif", backgroundColor: white, color: black, padding: "20mm", boxSizing: "border-box" }}>

        {/* HEADER - CLASSIC & ELEGANT */}
        <div style={{ textAlign: "center", marginBottom: "15mm" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "32px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "12px", fontWeight: "600", fontStyle: "italic", marginTop: "5px", color: darkGray }} />

          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "15px", fontSize: "10px", borderTop: "1px solid #000", borderBottom: "1px solid #000", padding: "5px 0" }}>
            <span>📍 <E value={location} onChange={(v) => u("location", v)} /></span>
            <span>📞 <E value={phone} onChange={(v) => u("phone", v)} /></span>
            <span>📧 <E value={email} onChange={(v) => u("email", v)} /></span>
            <span>🔗 <E value={linkedin} onChange={(v) => u("linkedin", v)} /></span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "40px" }}>

          {/* LEFT COLUMN: EXPERIENCE & OBJECTIVE */}
          <div>
            {/* PHILOSOPHY */}
            <div style={{ marginBottom: "30px" }}>
              <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
                <div style={{ flexGrow: "1", height: "1px", background: "#eee" }} />
              </div>
              <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "11px", lineHeight: "1.7", textAlign: "justify", fontStyle: "italic" }} />
            </div>

            {/* EXPERIENCE */}
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
                    <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} style={{ fontWeight: "bold", fontSize: "13px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} style={{ fontSize: "10px", color: lightGray }} />
                      <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>

                  {exp.roles.map((role, ri) => (
                    <div key={ri} className="hoverable-row" style={{ marginTop: "8px", marginLeft: "10px", borderLeft: `2px solid ${black}`, paddingLeft: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                        <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontWeight: "700", fontSize: "11px", display: "block", marginTop: "3px" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                          <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                          <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                        </div>
                      </div>
                      <ul style={{ margin: "10px 0", paddingLeft: "18px", listStyleType: "circle" }}>
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
          </div>

          {/* RIGHT COLUMN: SKILLS, EDUCATION & CERTS */}
          <div>
            {/* SKILLS */}
            <div style={{ marginBottom: "35px" }}>
              <SectionTitle showAdd={true} onAdd={addSkill}>
                <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
              </SectionTitle>
              {skills.map((s, i) => (
                <div key={i} className="hoverable-row" style={{ fontSize: "10px", marginBottom: "12px", borderLeft: "2px solid #000", paddingLeft: "10px", fontWeight: "500", display: "flex", alignItems: "center", gap: 6 }}>
                  <E value={s} onChange={(v) => updateSkillField(i, v)} style={{ flex: 1 }} />
                  <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                  <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                </div>
              ))}
            </div>

            {/* EDUCATION */}
            <div style={{ marginBottom: "35px" }}>
              <SectionTitle showAdd={true} onAdd={addEducation}>
                <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              </SectionTitle>
              {education.map((edu, i) => (
                <div key={i} className="hoverable-row" style={{ marginBottom: "15px", borderBottom: i !== education.length - 1 ? `1px dashed #eee` : "none", paddingBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                    <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "bold", fontSize: "11px", flex: 1 }} />
                    <div style={{ display: "flex", gap: 3 }}>
                      <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>
                  <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "10px", marginTop: "2px" }} />
                  <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "10px", fontWeight: "900" }} />
                </div>
              ))}
            </div>

            {/* CERTIFICATIONS */}
            <div>
              <SectionTitle showAdd={true} onAdd={addCert}>
                <E value={certTitle} onChange={(v) => u("certTitle", v)} />
              </SectionTitle>
              {certs.map((c, i) => (
                <div key={i} className="hoverable-row" style={{ fontSize: "9.5px", marginBottom: "8px", border: "1px solid #eee", padding: "5px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                  <E value={c} onChange={(v) => updateCertField(i, v)} style={{ flex: 1 }} />
                  <IconBtn onClick={() => copyCert(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                  <IconBtn onClick={() => removeCert(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default SchoolTeacherTemplate;