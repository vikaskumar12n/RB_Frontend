import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// ICU Nurse - Minimalist Monochrome Theme (Pure Black & White)
const black      = "#000000";
const darkGray   = "#4b5563";
const borderCol  = "#000000"; // Solid black for formal lines
const white      = "#ffffff";

const getInitialData = () => ({
  name: "ICU NURSE NAME, BSN, RN",
  title: "Critical Care Registered Nurse (ICU) | CCRN Certified",
  location: "Mumbai, India",
  phone: "+91-99999-88888",
  email: "icu.nurse@healthcare.com",
  license: "RN License: XYZ12345 (Maharashtra Nursing Council)",

  summaryTitle: "Professional Profile",
  experienceTitle: "Critical Care Experience",
  skillsTitle: "Core Competencies",
  certTitle: "Certifications & Licensure",
  eduTitle: "Education",

  summary: `Highly skilled Critical Care Nurse with 8+ years of experience in high-acuity Intensive Care Units. Expert in managing complex patient conditions, including mechanical ventilation, hemodynamic monitoring, and continuous renal replacement therapy (CRRT). Proven ability to deliver compassionate, evidence-based care in fast-paced, life-critical environments.`,

  skills: [
    "Advanced Patient Assessment", "Hemodynamic Monitoring (Swan-Ganz)", "Mechanical Ventilation Management", 
    "CRRT & ECMO Support", "Vasoactive Drip Titration", "Neurological Monitoring (ICP)", "Code Blue & Rapid Response Leader"
  ],

  certs: [
    "Registered Nurse (RN)", "Critical Care Registered Nurse (CCRN)", 
    "Advanced Cardiovascular Life Support (ACLS)", "Basic Life Support (BLS)", "PALS Certified"
  ],

  experience: [
    {
      company: "Apex Superspeciality Hospital",
      period: "2019 – Present",
      roles: [{
        title: "Senior Staff Nurse - Medical/Surgical ICU",
        bullets: [
          "Provide comprehensive care for critically ill patients with multi-organ failure, trauma, and post-operative complications.",
          "Collaborate with intensivist teams to develop and execute complex care plans.",
          "Precept and mentor new nursing staff and students on ICU protocols and advanced skills.",
          "Maintained 100% compliance with infection control and safety standards."
        ],
      }],
    },
    {
      company: "City Heart Institute",
      period: "2016 – 2019",
      roles: [{
        title: "Staff Nurse - Cardiac ICU (CICU)",
        bullets: [
          "Managed post-CABG and angioplasty patients, monitoring for arrhythmias and complications.",
          "Administered and titrated potent cardiac medications based on hemodynamic data."
        ],
      }],
    },
  ],

  education: [{
    school: "TATA Institute of Social Sciences (TISS) - School of Health Studies",
    year: "2016",
    degree: "B.Sc. in Nursing",
  }],
});

const ICUNurseSimpleTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, license, summaryTitle, experienceTitle, skillsTitle, certTitle, eduTitle, summary, skills, certs, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Times New Roman', Times, serif", backgroundColor: white, color: black, padding: "15mm 20mm", boxSizing: "border-box" }}>
      
      {/* HEADER SECTION - CENTERED & BOLD */}
      <div style={{ textAlign: "center", marginBottom: "12mm", borderBottom: `2px solid ${black}`, paddingBottom: "5px" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "bold", letterSpacing: "0.5px", textTransform: "uppercase" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "12px", fontWeight: "bold", marginTop: "5px", textTransform: "uppercase" }} />
        
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "12px", fontSize: "11px" }}>
          <span><E value={location} onChange={(v) => u("location", v)} /></span>
          <span>•</span>
          <span><E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span>•</span>
          <span><E value={email} onChange={(v) => u("email", v)} /></span>
        </div>
        <div style={{ fontSize: "11px", marginTop: "8px", fontWeight: "bold", fontStyle: "italic" }}>
          <E value={license} onChange={(v) => u("license", v)} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        
        {/* SUMMARY SECTION */}
        <div style={{ marginBottom: "15px" }}>
          <div style={{ fontSize: "13px", fontWeight: "bold",paddingBottom:"5px", textTransform: "uppercase", marginBottom: "8px", borderBottom: `1.5px solid ${black}`, display: "inline-block" }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "12px", lineHeight: "1.6", textAlign: "justify" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "40px" }}>
          
          {/* LEFT: CLINICAL EXPERIENCE */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: "bold",paddingBottom:"5px", textTransform: "uppercase", marginBottom: "15px", borderBottom: `1.5px solid ${black}`, display: "inline-block" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "13px" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} style={{ textTransform: "uppercase" }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ fontSize: "11px" }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "bold", fontSize: "12px", display: "block", marginTop: "4px", fontStyle: "italic" }} />
                    <ul style={{ margin: "10px 0", paddingLeft: "20px", listStyleType: "disc" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "11.5px", marginBottom: "6px", lineHeight: "1.5" }}>
                          <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* RIGHT: SKILLS, CERTIFICATIONS & EDUCATION */}
          <div>
            <div style={{ marginBottom: "30px" }}>
              <div style={{ fontSize: "13px", fontWeight: "bold",paddingBottom:"5px", textTransform: "uppercase", marginBottom: "12px", borderBottom: `1.5px solid ${black}`, display: "inline-block" }}>
                <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ fontSize: "11px",paddingBottom:"10px", fontWeight: "bold", borderLeft: `3px solid ${black}`, paddingLeft: "10px" }}>
                    <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "30px", border: `1px solid ${black}`, padding: "15px" }}>
              <div style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px" }}>
                <E value={certTitle} onChange={(v) => u("certTitle", v)} />
              </div>
              {certs.map((c, i) => (
                <div key={i} style={{ fontSize: "10.5px", marginBottom: "6px", fontWeight: "bold" }}>
                  <E value={c} onChange={(v) => { const a = ref.current.certs.map((item, j) => j === i ? v : item); u("certs", a); }} />
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: "13px", fontWeight: "bold",paddingBottom:"5px", textTransform: "uppercase", marginBottom: "12px", borderBottom: `1.5px solid ${black}`, display: "inline-block" }}>
                <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              </div>
              {education.map((edu, i) => (
                <div key={i}>
                  <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "11px" }} />
                  <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10px", marginTop: "2px" }} />
                  <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "10px", fontWeight: "bold" }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ICUNurseSimpleTemplate;