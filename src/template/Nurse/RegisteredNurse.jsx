import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Registered Nurse - Clinical Clean Theme (Simple & Professional)
const black      = "#1e293b"; // Dark Slate (Better than pure black)
const gray       = "#64748b";
const darkGray  = "#f1f5f9";
const white      = "#ffffff";

const getInitialData = () => ({
  name: "NURSE NAME, BSN, RN",
  title: "Critical Care Registered Nurse (ICU) | BLS & ACLS Certified",
  location: "Chandigarh, India",
  phone: "+91-98765-43210",
  email: "nurse.pro@healthcare.com",
  license: "State Nursing Council Reg: 123456",

  summaryTitle: "Professional Summary",
  experienceTitle: "Clinical Experience",
  skillsTitle: "Core Nursing Competencies",
  certTitle: "Certifications & Licenses",
  eduTitle: "Education",

  summary: `Dedicated Registered Nurse with over 6 years of experience in high-volume hospital settings. Expert in patient assessment, emergency response, and post-operative care. Proven ability to remain calm in high-pressure situations and provide empathetic, patient-centered care while collaborating with multidisciplinary medical teams.`,

  skills: [
    "Patient Assessment & Monitoring", "Medication Administration", "Wound Care & Dressings", 
    "Emergency Room (ER) Support", "IV Insertion & Phlebotomy", "Electronic Health Records (EHR)", "Patient & Family Education"
  ],

  certs: [
    "Registered Nurse (RN) License", "Advanced Cardiovascular Life Support (ACLS)", 
    "Basic Life Support (BLS)", "PALS Certification", "Infection Control Specialist"
  ],

  experience: [
    {
      company: "City General Hospital",
      period: "2020 – Present",
      roles: [{
        title: "Registered Nurse - Intensive Care Unit (ICU)",
        bullets: [
          "Provide specialized care for critically ill patients requiring ventilator support and continuous monitoring.",
          "Coordinate with doctors to develop and implement complex patient care plans.",
          "Educate family members on patient condition and post-discharge care protocols.",
          "Maintained 100% accuracy in medication administration and medical record documentation."
        ],
      }],
    },
    {
      company: "Healing Hands Clinic",
      period: "2017 – 2020",
      roles: [{
        title: "Staff Nurse - Medical/Surgical Ward",
        bullets: [
          "Managed a patient load of 8-10 per shift, ensuring timely treatments and assessments.",
          "Assisted in minor surgical procedures and post-operative recovery monitoring."
        ],
      }],
    },
  ],

  education: [{
    school: "College of Nursing, AIIMS",
    year: "2017",
    degree: "Bachelor of Science in Nursing (BSN)",
  }],
});

const NurseResumeTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, license, summaryTitle, experienceTitle, skillsTitle, certTitle, eduTitle, summary, skills, certs, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Geist', sans-serif", backgroundColor: white, color: black, padding: "15mm 20mm", boxSizing: "border-box" }}>
      
      {/* HEADER SECTION */}
      <div style={{ textAlign: "center", marginBottom: "10mm" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "0.5px" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "12px", fontWeight: "600", color: gray, marginTop: "5px", textTransform: "uppercase" }} />
        
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "12px", fontSize: "10px", fontWeight: "500" }}>
          <span>📞 <E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span>•</span>
          <span>📧 <E value={email} onChange={(v) => u("email", v)} /></span>
          <span>•</span>
          <span>📍 <E value={location} onChange={(v) => u("location", v)} /></span>
        </div>
        <div style={{ fontSize: "10px", marginTop: "8px", fontWeight: "700", fontStyle: "italic" }}>
          <E value={license} onChange={(v) => u("license", v)} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        
        {/* SUMMARY SECTION */}
        <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "15px" }}>
          <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", color: black }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6", color: darkGray }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "40px" }}>
          
          {/* LEFT: CLINICAL EXPERIENCE */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "12px" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ fontSize: "10px", color: gray }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "700", fontSize: "11px", display: "block", marginTop: "3px", color: "#334155" }} />
                    <ul style={{ margin: "10px 0", paddingLeft: "15px", listStyleType: "square" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "10.5px", marginBottom: "6px", lineHeight: "1.4" }}>
                          <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* RIGHT: SKILLS & CERTIFICATIONS */}
          <div>
            <div style={{ marginBottom: "30px" }}>
              <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "12px" }}>
                <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ fontSize: "10px", fontWeight: "600", padding: "6px 0", borderBottom: "1px solid #f1f5f9" }}>
                    • <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "30px", background: "#f8fafc", padding: "15px", borderRadius: "4px" }}>
              <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "12px" }}>
                <E value={certTitle} onChange={(v) => u("certTitle", v)} />
              </div>
              {certs.map((c, i) => (
                <div key={i} style={{ fontSize: "9.5px", marginBottom: "6px", fontWeight: "500" }}>
                  ✓ <E value={c} onChange={(v) => { const a = ref.current.certs.map((item, j) => j === i ? v : item); u("certs", a); }} />
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase", marginBottom: "10px" }}>
                <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              </div>
              {education.map((edu, i) => (
                <div key={i}>
                  <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10.5px" }} />
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

export default NurseResumeTemplate;