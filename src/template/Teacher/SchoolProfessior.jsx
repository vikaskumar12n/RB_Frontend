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
const white = "#ffffff";

const getInitialData = () => ({
  name: "DR. PROFESSOR NAME, PH.D.",
  title: "Professor of Economics | Research Lead | 12+ Years Experience",
  location: "New Delhi, India",
  phone: "+91-98111-22222",
  email: "professor.academic@university.edu",
  linkedin: "linkedin.com/in/scholarly-profile",
  summaryTitle: "Academic Profile",
  experienceTitle: "Teaching & Administrative Experience",
  eduTitle: "Educational Qualifications",
  skillsTitle: "Core Competencies",
  researchTitle: "Key Publications & Research",
  summary: `Distinguished academician with over 12 years of experience in higher education and research. Expert in Macroeconomics, Econometrics, and Public Policy. Published author in international journals with a focus on sustainable development. Committed to fostering a rigorous intellectual environment and mentoring PhD scholars.`,
  skills: [
    "Advanced Research Methodology", "Curriculum Design & Accreditation",
    "Grant Writing & Fund Management", "Academic Peer Reviewing",
    "Statistical Analysis (STATA/SPSS)", "Public Speaking & Lecturing"
  ],
  experience: [
    {
      company: "Jawaharlal Nehru University (JNU)",
      period: "2018 – Present",
      roles: [{
        title: "Associate Professor - Department of Economics",
        bullets: [
          "Supervise and mentor 5 Ph.D. candidates and 10 Master's students in their research theses.",
          "Secured a ₹50 Lakh research grant for a multi-year project on rural economic growth.",
          "Designed and implemented a new post-graduate elective course on 'Digital Economies'.",
          "Served as a lead member of the University Curriculum Review Committee for NAAC accreditation."
        ],
      }],
    },
    {
      company: "Delhi School of Economics",
      period: "2014 – 2018",
      roles: [{
        title: "Assistant Professor",
        bullets: [
          "Delivered lectures on Advanced Econometrics to batches of 100+ students.",
          "Co-authored 4 papers published in high-impact international journals (Q1 ranking)."
        ],
      }],
    },
  ],
  education: [
    {
      school: "University of Oxford, UK",
      year: "2014",
      degree: "Ph.D. in Applied Economics",
    },
    {
      school: "Delhi University",
      year: "2010",
      degree: "M.A. in Economics (Gold Medalist)",
    }
  ],
  research: [
    "Published 'Global Trade Volatility' in the Journal of Economic Perspectives (2022).",
    "Lead Researcher: 'Urbanization Trends in Southeast Asia' funded by World Bank Group.",
    "Guest Speaker at the International Economic Forum, Geneva (2023)."
  ],
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "15px", borderBottom: `2px double ${black}`, display: "inline-block" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1" style={{ marginLeft: "15px" }}>
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const CollegeProfessorTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setDataFunc = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setDataFunc({ ...ref.current, [f]: v });

  // ========== EXPERIENCE FUNCTIONS ==========
  const addExperience = () => {
    u("experience", [...ref.current.experience, { company: "New University", period: "Date", roles: [{ title: "New Position", bullets: ["New bullet point"] }] }]);
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

  // ========== EDUCATION FUNCTIONS ==========
  const addEducation = () => u("education", [...ref.current.education, { degree: "New Degree", school: "New School", year: "Year" }]);
  const removeEducation = (i) => u("education", ref.current.education.filter((_, idx) => idx !== i));
  const copyEducation = (i) => {
    const eduToCopy = JSON.parse(JSON.stringify(ref.current.education[i]));
    eduToCopy.school = eduToCopy.school + " (Copy)";
    u("education", [...ref.current.education, eduToCopy]);
  };

  // ========== SKILLS FUNCTIONS ==========
  const addSkill = () => u("skills", [...ref.current.skills, "New skill"]);
  const removeSkill = (i) => u("skills", ref.current.skills.filter((_, idx) => idx !== i));
  const copySkill = (i) => u("skills", [...ref.current.skills, ref.current.skills[i] + " (Copy)"]);

  // ========== RESEARCH FUNCTIONS ==========
  const addResearch = () => u("research", [...ref.current.research, "New research publication"]);
  const removeResearch = (i) => u("research", ref.current.research.filter((_, idx) => idx !== i));
  const copyResearch = (i) => u("research", [...ref.current.research, ref.current.research[i] + " (Copy)"]);

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
  const updateResearchField = (i, value) => {
    const up = ref.current.research.map((r, idx) => idx === i ? value : r);
    u("research", up);
  };

  const { name, title, location, phone, email, linkedin, summaryTitle, experienceTitle, eduTitle, skillsTitle, researchTitle, summary, skills, experience, education, research } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Times New Roman', serif", backgroundColor: white, color: black, padding: "18mm", boxSizing: "border-box" }}>

        {/* HEADER - FORMAL & CENTERED */}
        <div style={{ textAlign: "center", marginBottom: "10mm" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "26px", fontWeight: "bold", textTransform: "uppercase" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "12px", fontWeight: "bold", marginTop: "4px", color: darkGray }} />

          <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "12px", fontSize: "10.5px", borderTop: `1px solid ${black}`, borderBottom: `1px solid ${black}`, padding: "6px 0" }}>
            <span>📍 <E value={location} onChange={(v) => u("location", v)} /></span>
            <span>•</span>
            <span>📞 <E value={phone} onChange={(v) => u("phone", v)} /></span>
            <span>•</span>
            <span>📧 <E value={email} onChange={(v) => u("email", v)} /></span>
            <span>•</span>
            <span>🔗 <E value={linkedin} onChange={(v) => u("linkedin", v)} /></span>
          </div>
        </div>

        {/* SUMMARY */}
        <div style={{ marginBottom: "25px" }}>
          <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "8px", borderLeft: `4px solid ${black}`, paddingLeft: "10px" }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11.5px", lineHeight: "1.6", textAlign: "justify" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "35px" }}>

          {/* LEFT COLUMN: EXPERIENCE & RESEARCH */}
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
                    <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} style={{ fontSize: "10.5px" }} />
                    <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                    <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                  </div>
                </div>

                {exp.roles.map((role, ri) => (
                  <div key={ri} className="hoverable-row" style={{ marginTop: "8px", marginLeft: "10px", borderLeft: `2px solid ${black}`, paddingLeft: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                      <E value={role.title} onChange={(v) => updateRoleField(ei, ri, "title", v)} style={{ fontWeight: "bold", fontSize: "11px", fontStyle: "italic", display: "block" }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <IconBtn onClick={() => copyRole(ei, ri)} color="#6366f1"><Copy size={7} /></IconBtn>
                        <IconBtn onClick={() => removeRole(ei, ri)} color="#ef4444"><Trash2 size={7} /></IconBtn>
                        <IconBtn onClick={() => addBullet(ei, ri)} color="#10b981"><Plus size={7} /> Bullet</IconBtn>
                      </div>
                    </div>
                    <ul style={{ margin: "8px 0", paddingLeft: "15px", listStyleType: "disc" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} className="hoverable-row" style={{ fontSize: "11px", marginBottom: "5px", lineHeight: "1.4", display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
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

            <SectionTitle showAdd={true} onAdd={addResearch}>
              <E value={researchTitle} onChange={(v) => u("researchTitle", v)} />
            </SectionTitle>
            {research.map((item, i) => (
              <div key={i} className="hoverable-row" style={{ fontSize: "11px", marginBottom: "10px", paddingLeft: "10px", borderLeft: "1px solid #ddd", fontStyle: "italic", display: "flex", alignItems: "flex-start", gap: 6 }}>
                <E value={item} onChange={(v) => updateResearchField(i, v)} style={{ flex: 1 }} />
                <IconBtn onClick={() => copyResearch(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                <IconBtn onClick={() => removeResearch(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: EDUCATION & SKILLS */}
          <div>
            {/* EDUCATION */}
            <div style={{ marginBottom: "30px" }}>
              <SectionTitle showAdd={true} onAdd={addEducation}>
                <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              </SectionTitle>
              {education.map((edu, i) => (
                <div key={i} className="hoverable-row" style={{ marginBottom: "15px", borderBottom: i !== education.length - 1 ? `1px dashed #ddd` : "none", paddingBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                    <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} style={{ fontWeight: "bold", fontSize: "11px", flex: 1 }} />
                    <div style={{ display: "flex", gap: 3 }}>
                      <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                      <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                    </div>
                  </div>
                  <E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} style={{ fontSize: "10px", marginTop: "2px" }} />
                  <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontSize: "10px", fontWeight: "bold" }} />
                </div>
              ))}
            </div>

            {/* SKILLS */}
            <div style={{ marginBottom: "30px" }}>
              <SectionTitle showAdd={true} onAdd={addSkill}>
                <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
              </SectionTitle>
              {skills.map((s, i) => (
                <div key={i} className="hoverable-row" style={{ fontSize: "10px", fontWeight: "600", marginBottom: "10px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span>◈</span>
                  <E value={s} onChange={(v) => updateSkillField(i, v)} style={{ flex: 1 }} />
                  <IconBtn onClick={() => copySkill(i)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={7} /></IconBtn>
                  <IconBtn onClick={() => removeSkill(i)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={7} /></IconBtn>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default CollegeProfessorTemplate;