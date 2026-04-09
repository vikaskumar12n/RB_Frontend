import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// College Professor - Academic Distinguished Theme (Black & White)
const black      = "#000000";
const darkGray   = "#374151";
const white      = "#ffffff";

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

const CollegeProfessorTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, linkedin, summaryTitle, experienceTitle, eduTitle, skillsTitle, researchTitle, summary, skills, experience, education, research } = data;

  return (
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
          <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "15px", borderBottom: `2px double ${black}`, display: "inline-block" }}>
            <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
          </div>
          {experience.map((exp, ei) => (
            <div key={ei} style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "13px" }}>
                <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ fontSize: "10.5px" }} />
              </div>
              {exp.roles.map((role, ri) => (
                <div key={ri}>
                  <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "bold", fontSize: "11px", fontStyle: "italic", display: "block" }} />
                  <ul style={{ margin: "8px 0", paddingLeft: "15px", listStyleType: "disc" }}>
                    {role.bullets.map((b, bi) => (
                      <li key={bi} style={{ fontSize: "11px", marginBottom: "5px", lineHeight: "1.4" }}>
                        <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginTop: "10px", marginBottom: "15px", borderBottom: `2px double ${black}`, display: "inline-block" }}>
            <E value={researchTitle} onChange={(v) => u("researchTitle", v)} />
          </div>
          {research.map((item, i) => (
            <div key={i} style={{ fontSize: "11px", marginBottom: "10px", paddingLeft: "10px", borderLeft: "1px solid #ddd", fontStyle: "italic" }}>
              <E value={item} onChange={(v) => { const a = ref.current.research.map((ex, j) => j === i ? v : ex); u("research", a); }} />
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: EDUCATION & SKILLS */}
        <div>
          <div style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "15px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "15px" }}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "11px" }} />
                <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10px", marginTop: "2px" }} />
                <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "10px", fontWeight: "bold" }} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "15px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            {skills.map((s, i) => (
              <div key={i} style={{ fontSize: "10px", fontWeight: "600", marginBottom: "10px", display: "flex", gap: "8px", alignItems: "baseline" }}>
                <span>◈</span>
                <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default CollegeProfessorTemplate;