import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Minimalist Design Palette
const black      = "#000000";
const secondary  = "#4b5563"; // Gray for subtle text
const line       = "#e5e7eb"; // Light divider line

const getInitialData = () => ({
  name: "GRAPHIC VISUALIZER",
  title: "Senior Graphic Designer | Brand Identity Specialist",
  location: "Delhi, India",
  phone: "+91-98765-43210",
  email: "design.art@creative.com",
  portfolio: "behance.net/visual-wizard",
  linkedin: "linkedin.com/in/graphic-pro",

  summaryTitle: "Creative Vision",
  experienceTitle: "Design Experience",
  skillsTitle: "Expertise",
  toolsTitle: "Creative Software",
  eduTitle: "Education",

  summary: `Highly creative Graphic Designer with 7+ years of experience in branding, typography, and digital illustration. Expert in transforming complex ideas into compelling visual stories. Proven track record of delivering high-impact marketing materials and maintaining brand consistency across all platforms.`,

  skills: [
    "Brand Identity", "Typography", "Digital Illustration", "Print Media",
    "Motion Graphics", "Packaging Design", "Layout Design", "Vector Art"
  ],

  tools: [
    "Adobe Photoshop", "Adobe Illustrator", "InDesign", "After Effects", "CorelDraw"
  ],

  experience: [
    {
      company: "Pixel Perfect Agency",
      period: "2020 – Present",
      roles: [{
        title: "Senior Graphic Designer",
        bullets: [
          "Developed 50+ brand identities for startups and established enterprises.",
          "Led the creative direction for social media campaigns, increasing engagement by 60%.",
          "Managed end-to-end print production for large-scale outdoor advertising.",
          "Mentored junior designers on design principles and industry-standard workflows."
        ],
      }],
    },
    {
      company: "Print & Media Solutions",
      period: "2017 – 2020",
      roles: [{
        title: "Visual Designer",
        bullets: [
          "Conceptualized and designed monthly magazine layouts and book covers.",
          "Reduced design turnaround time by 30% through efficient asset management."
        ],
      }],
    },
  ],

  education: [{
    school: "College of Art, Delhi",
    year: "2017",
    degree: "Bachelor of Fine Arts (BFA) in Applied Art",
  }],
});

const GraphicDesignerTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, portfolio, linkedin, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", color: black, boxSizing: "border-box" }}>
      
      {/* HEADER - TEXT ONLY */}
      <div style={{ padding: "12mm 15mm 8mm", borderBottom: `2px solid ${black}` }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "32px", fontWeight: "900", letterSpacing: "-0.5px" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", fontWeight: "600", textTransform: "uppercase", marginTop: "4px", color: secondary }} />
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "15px", fontSize: "11px", fontWeight: "500" }}>
          <span>📍 <E value={location} onChange={(v) => u("location", v)} /></span>
          <span>📞 <E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span>📧 <E value={email} onChange={(v) => u("email", v)} /></span>
          <span>🌐 <E value={portfolio} onChange={(v) => u("portfolio", v)} /></span>
        </div>
      </div>

      <div style={{ padding: "8mm 15mm" }}>
        
        {/* SUMMARY - NO BOX */}
        <div style={{ marginBottom: "25px" }}>
          <div style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "8px", borderBottom: `1px solid ${line}`, paddingBottom: "2px" }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "40px" }}>
          
          {/* LEFT: WORK EXPERIENCE */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "15px" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px" }}>
                  <E value={exp.company} onChange={(v) => { /* Logic */ }} />
                  <E value={exp.period} onChange={(v) => { /* Logic */ }} style={{ fontSize: "11px", fontWeight: "normal" }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri} style={{ marginTop: "2px" }}>
                    <E value={role.title} onChange={(v) => { /* Logic */ }} style={{ fontWeight: "600", fontSize: "11px", fontStyle: "italic", color: secondary }} />
                    <ul style={{ margin: "8px 0", paddingLeft: "18px" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "11px", marginBottom: "5px" }}>
                          <E value={b} onChange={(v) => { /* Logic */ }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* RIGHT: SKILLS & TOOLS */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px", borderBottom: `1px solid ${line}`, paddingBottom: "2px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "25px" }}>
              {skills.map((s, i) => (
                <div key={i} style={{ fontSize: "11px", display: "flex", alignItems: "center" }}>
                   <span style={{ marginRight: "10px" }}>•</span>
                   <E value={s} onChange={(v) => { /* Logic */ }} />
                </div>
              ))}
            </div>

            <div style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px", borderBottom: `1px solid ${line}`, paddingBottom: "2px" }}>
              <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
            </div>
            <div style={{ marginBottom: "25px" }}>
              {tools.map((tool, i) => (
                <div key={i} style={{ fontSize: "11px", marginBottom: "6px", display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "10px" }}>›</span>
                  <E value={tool} onChange={(v) => { /* Logic */ }} />
                </div>
              ))}
            </div>

            <div style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px", borderBottom: `1px solid ${line}`, paddingBottom: "2px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <E value={edu.degree} onChange={(v) => { /* Logic */ }} block style={{ fontWeight: "bold", fontSize: "11.5px" }} />
                <E value={edu.school} onChange={(v) => { /* Logic */ }} block style={{ fontSize: "11px", color: secondary }} />
                <E value={edu.year} onChange={(v) => { /* Logic */ }} style={{ fontSize: "11px", fontWeight: "bold" }} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default GraphicDesignerTemplate;