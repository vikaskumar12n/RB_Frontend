import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Senior Cashier / Front-End Lead Theme
const primary    = "#1e3a8a"; // Deep Royal Blue
const secondary  = "#475569"; // Slate Gray
const lightBg    = "#f1f5f9"; // Soft Gray Blue
const borderCol  = "#cbd5e1";
const accent     = "#2563eb";

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

const SeniorCashierTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, summaryTitle, experienceTitle, skillsTitle, eduTitle, expertiseTitle, summary, expertise, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#fff", color: "#1e293b", boxSizing: "border-box" }}>
      
      {/* TOP HEADER SECTION */}
      <div style={{ background: primary, padding: "12mm 15mm", color: "#fff" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", color: "#bfdbfe", marginTop: "4px", fontWeight: "600" }} />
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "12px", fontSize: "10px" }}>
          <span>📍 <E value={location} onChange={(v) => u("location", v)} /></span>
          <span>📞 <E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span>📧 <E value={email} onChange={(v) => u("email", v)} /></span>
        </div>
      </div>

      <div style={{ padding: "8mm 15mm" }}>
        
        {/* SUMMARY */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "12px", fontWeight: "bold", color: primary, textTransform: "uppercase", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
            <div style={{ flexGrow: 1, height: "2px", background: lightBg }} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6", color: secondary }} />
        </div>

        {/* TWO COLUMN CONTENT */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "30px" }}>
          
          {/* LEFT: WORK EXPERIENCE */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: "bold", color: primary, textTransform: "uppercase", marginBottom: "10px" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "11.5px" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ color: accent }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontStyle: "italic", fontSize: "10.5px", color: secondary, fontWeight: "600" }} />
                    <ul style={{ margin: "6px 0", paddingLeft: "15px" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "10.5px", marginBottom: "4px", color: secondary }}>
                          <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* RIGHT: SKILLS & OPERATIONAL EXPERTISE */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: "bold", color: primary, textTransform: "uppercase", marginBottom: "10px" }}>
              <E value={expertiseTitle} onChange={(v) => u("expertiseTitle", v)} />
            </div>
            <div style={{ background: lightBg, padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>
              {expertise.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", fontSize: "10px", fontWeight: "600" }}>
                  <span style={{ color: accent }}>✓</span>
                  <E value={item} onChange={(v) => { const a = ref.current.expertise.map((ex, j) => j === i ? v : ex); u("expertise", a); }} />
                </div>
              ))}
            </div>

            <div style={{ fontSize: "12px", fontWeight: "bold", color: primary, textTransform: "uppercase", marginBottom: "10px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: "10px", marginBottom: "10px" }}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10.5px" }} />
                <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "9.5px", color: secondary }} />
                <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "9.5px", fontWeight: "bold", color: accent }} />
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default SeniorCashierTemplate;