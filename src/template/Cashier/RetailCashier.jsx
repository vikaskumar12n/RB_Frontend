import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Retail Friendly Colors
const primary    = "#065f46"; // Emerald Green (Trust & Growth)
const secondary  = "#6b7280"; // Slate Gray
const lightBg    = "#ecfdf5"; // Light Mint
const borderCol  = "#d1d5db";

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
    "Cash Handling", "POS Systems (Square/Gini)", "Inventory Management",
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

const RetailCashierTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, location, phone, email, summaryTitle, experienceTitle, skillsTitle, eduTitle, summary, skills, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Arial', sans-serif", backgroundColor: "#fff", color: "#374151", boxSizing: "border-box" }}>
      
      {/* HEADER - SIMPLE & BOLD */}
      <div style={{ padding: "10mm 15mm", borderBottom: `5px solid ${primary}`, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "24px", fontWeight: "bold", color: primary, textTransform: "uppercase" }} />
          <div style={{ fontSize: "11px", color: secondary, marginTop: "5px" }}>
            <E value={location} onChange={(v) => u("location", v)} /> | <E value={phone} onChange={(v) => u("phone", v)} />
          </div>
        </div>
        <E value={email} onChange={(v) => u("email", v)} style={{ fontSize: "11px", color: primary, fontWeight: "600" }} />
      </div>

      <div style={{ padding: "8mm 15mm" }}>
        
        {/* SUMMARY SECTION */}
        <div style={{ marginBottom: "15px" }}>
          <div style={{ fontWeight: "bold", color: primary, borderBottom: `1px solid ${borderCol}`, marginBottom: "5px", fontSize: "12px" }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "10.5px", lineHeight: "1.5" }} />
        </div>

        {/* TWO COLUMN BODY */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "25px" }}>
          
          {/* LEFT COLUMN: EXPERIENCE */}
          <div>
            <div style={{ fontWeight: "bold", color: primary, borderBottom: `1px solid ${borderCol}`, marginBottom: "8px", fontSize: "12px" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "11px" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ color: secondary, fontSize: "10px" }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontStyle: "italic", fontSize: "10.5px", color: secondary }} />
                    <ul style={{ margin: "5px 0", paddingLeft: "15px" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "10px", marginBottom: "3px" }}>
                          <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
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
            <div style={{ fontWeight: "bold", color: primary, borderBottom: `1px solid ${borderCol}`, marginBottom: "8px", fontSize: "12px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "20px" }}>
              {skills.map((s, i) => (
                <span key={i} style={{ backgroundColor: lightBg, color: primary, padding: "2px 8px", borderRadius: "4px", fontSize: "9.5px", border: `1px solid ${primary}22` }}>
                  <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                </span>
              ))}
            </div>

            <div style={{ fontWeight: "bold", color: primary, borderBottom: `1px solid ${borderCol}`, marginBottom: "8px", fontSize: "12px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10.5px" }} />
                <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10px", color: secondary }} />
                <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "10px", fontWeight: "bold" }} />
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default RetailCashierTemplate;