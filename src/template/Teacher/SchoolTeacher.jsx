import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// School Teacher - Academic Minimalist Theme (No Color, No Borders)
const black      = "#000000";
const darkGray   = "#374151";
const lightGray  = "#6b7280";
const white      = "#ffffff";

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

const SchoolTeacherTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, linkedin, objectiveTitle, skillsTitle, experienceTitle, eduTitle, certTitle, objective, skills, experience, education, certs } = data;

  return (
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
            <div style={{ fontSize: "12px", fontWeight: "900",  textTransform: "uppercase", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
              <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
              <div style={{ flexGrow: "1", height: "1px", background: "#eee" }} />
            </div>
            <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "11px", lineHeight: "1.7", textAlign: "justify", fontStyle: "italic" }} />
          </div>

          {/* EXPERIENCE */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
              <div style={{ flexGrow: "1", height: "1px", background: "#eee" }} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "13px" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ fontSize: "10px", color: lightGray }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "700", fontSize: "11px", display: "block", marginTop: "3px" }} />
                    <ul style={{ margin: "10px 0", paddingLeft: "18px", listStyleType: "circle" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "10.5px", marginBottom: "6px", lineHeight: "1.5" }}>
                          <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
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
            <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            {skills.map((s, i) => (
              <div key={i} style={{ fontSize: "10px", marginBottom: "12px", borderLeft: "2px solid #000", paddingLeft: "10px", fontWeight: "500" }}>
                <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
              </div>
            ))}
          </div>

          {/* EDUCATION */}
          <div style={{ marginBottom: "35px" }}>
            <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "15px" }}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "11px" }} />
                <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10px", marginTop: "2px" }} />
                <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "10px", fontWeight: "900" }} />
              </div>
            ))}
          </div>

          {/* CERTIFICATIONS */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px" }}>
              <E value={certTitle} onChange={(v) => u("certTitle", v)} />
            </div>
            {certs.map((c, i) => (
              <div key={i} style={{ fontSize: "9.5px", marginBottom: "8px", border: "1px solid #eee", padding: "5px", textAlign: "center" }}>
                <E value={c} onChange={(v) => { const a = ref.current.certs.map((item, j) => j === i ? v : item); u("certs", a); }} />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default SchoolTeacherTemplate;