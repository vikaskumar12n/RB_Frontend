import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Minimalist Monochrome Theme (Pure Black & White)
const black      = "#000000";
const white      = "#ffffff";
const grayText   = "#4b5563"; // Slight variation for dates/headers

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

const NursingFresherTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, license, summaryTitle, experienceTitle, skillsTitle, certTitle, eduTitle, summary, skills, certs, experience, education } = data;

  return (
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
          <div style={{ fontSize: "13px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", borderBottom: `2px solid ${black}`, display: "inline-block" }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.7", textAlign: "justify" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "40px" }}>
          
          {/* LEFT: CLINICAL ROTATIONS & INTERNSHIPS */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px", borderBottom: `2px solid ${black}`, display: "inline-block" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "12px", alignItems: "center" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ fontSize: "10px", color: grayText, fontWeight: "500" }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "700", fontSize: "11px", display: "block", marginTop: "4px", fontStyle: "italic", color: "#334155" }} />
                    <ul style={{ margin: "10px 0", paddingLeft: "15px", listStyleType: "square" }}>
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

          {/* RIGHT: SKILLS & CERTIFICATIONS & EDUCATION */}
          <div>
            <div style={{ marginBottom: "30px" }}>
              <div style={{ fontSize: "13px", fontWeight: "900", textTransform: "uppercase", marginBottom: "12px", borderBottom: `2px solid ${black}`, display: "inline-block" }}>
                <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ fontSize: "10px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: "bold" }}>›</span>
                    <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "30px", border: `2px dashed ${black}`, padding: "15px" }}>
              <div style={{ fontSize: "13px", fontWeight: "900", textTransform: "uppercase", marginBottom: "12px" }}>
                <E value={certTitle} onChange={(v) => u("certTitle", v)} />
              </div>
              {certs.map((c, i) => (
                <div key={i} style={{ fontSize: "9.5px", marginBottom: "6px", fontWeight: "500", display: "flex", alignItems: "center", gap: "8px" }}>
                   <span style={{ fontWeight: "bold" }}>+</span>
                  <E value={c} onChange={(v) => { const a = ref.current.certs.map((item, j) => j === i ? v : item); u("certs", a); }} />
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: "13px", fontWeight: "900", textTransform: "uppercase", marginBottom: "12px", borderBottom: `2px solid ${black}`, display: "inline-block" }}>
                <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              </div>
              {education.map((edu, i) => (
                <div key={i}>
                  <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "800", fontSize: "10.5px" }} />
                  <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "9.5px", marginTop: "2px" }} />
                  <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "9.5px", fontWeight: "800" }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default NursingFresherTemplate;