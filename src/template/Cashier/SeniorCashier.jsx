import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Refined Professional Palette
const primary    = "#000000"; // Deep Black
const secondary  = "#475569"; // Professional Gray
const accent     = "#000000"; // Keeping it monochrome for a clean look
const line       = "#e2e8f0"; // Subtle line color

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

  const { name, title, location, phone, email, summaryTitle, experienceTitle, eduTitle, expertiseTitle, summary, expertise, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Segoe UI', 'Helvetica', sans-serif", backgroundColor: "#fff", color: primary, boxSizing: "border-box" }}>
      
      {/* HEADER - TEXT ONLY */}
      <div style={{ padding: "12mm 15mm 5mm", borderBottom: `3px solid ${primary}` }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", color: secondary, marginTop: "2px", fontWeight: "600", textTransform: "uppercase" }} />
        
        <div style={{ display: "flex", gap: "20px", marginTop: "10px", fontSize: "11px", fontWeight: "500" }}>
          <span><E value={location} onChange={(v) => u("location", v)} /></span>
          <span style={{ color: line }}>|</span>
          <span><E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span style={{ color: line }}>|</span>
          <span><E value={email} onChange={(v) => u("email", v)} /></span>
        </div>
      </div>

      <div style={{ padding: "8mm 15mm" }}>
        
        {/* SUMMARY SECTION */}
        <div style={{ marginBottom: "25px" }}>
          <div style={{ fontSize: "13px", fontWeight: "bold", color: primary, textTransform: "uppercase", marginBottom: "6px", borderBottom: `1px solid ${line}`, paddingBottom: "2px" }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6", color: primary }} />
        </div>

        {/* TWO COLUMN CONTENT */}
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: "40px" }}>
          
          {/* LEFT: WORK EXPERIENCE */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: "bold", color: primary, textTransform: "uppercase", marginBottom: "12px", borderBottom: `1px solid ${line}`, paddingBottom: "2px" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px" }}>
                  <E value={exp.company} onChange={(v) => { /* Update Logic */ }} />
                  <E value={exp.period} onChange={(v) => { /* Update Logic */ }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri} style={{ marginTop: "4px" }}>
                    <E value={role.title} onChange={(v) => { /* Update Logic */ }} style={{ fontStyle: "italic", fontSize: "11px", color: secondary, fontWeight: "600" }} />
                    <ul style={{ margin: "8px 0", paddingLeft: "18px" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "11px", marginBottom: "5px", color: primary }}>
                          <E value={b} onChange={(v) => { /* Update Logic */ }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* RIGHT: OPERATIONAL EXPERTISE & EDUCATION */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: "bold", color: primary, textTransform: "uppercase", marginBottom: "12px", borderBottom: `1px solid ${line}`, paddingBottom: "2px" }}>
              <E value={expertiseTitle} onChange={(v) => u("expertiseTitle", v)} />
            </div>
            <div style={{ marginBottom: "30px" }}>
              {expertise.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px", fontSize: "11px" }}>
                  <span style={{ color: primary }}>•</span>
                  <E value={item} onChange={(v) => { /* Update Logic */ }} />
                </div>
              ))}
            </div>

            <div style={{ fontSize: "13px", fontWeight: "bold", color: primary, textTransform: "uppercase", marginBottom: "12px", borderBottom: `1px solid ${line}`, paddingBottom: "2px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "15px" }}>
                <E value={edu.degree} onChange={(v) => { /* Update Logic */ }} block style={{ fontWeight: "bold", fontSize: "11.5px" }} />
                <E value={edu.school} onChange={(v) => { /* Update Logic */ }} block style={{ fontSize: "11px", color: secondary, marginTop: "2px" }} />
                <E value={edu.year} onChange={(v) => { /* Update Logic */ }} style={{ fontSize: "11px", fontWeight: "bold", color: primary }} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SeniorCashierTemplate;