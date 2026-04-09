import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Graphic Designer Creative Theme
const primary    = "#7c3aed"; // Vibrant Purple
const accent     = "#06b6d4"; // Cyan/Electric Blue
const lightBg    = "#f5f3ff"; // Soft Purple Tint
const textDark   = "#1f2937";
const white      = "#ffffff";
const softGray ="#ffffff"

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
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Montserrat', sans-serif", backgroundColor: white, color: textDark, boxSizing: "border-box" }}>
      
      {/* CREATIVE SIDEBAR HEADER */}
      <div style={{ display: "flex", height: "45mm" }}>
        <div style={{ background: primary, color: white, width: "70%", padding: "10mm 15mm", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "1px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
            <div style={{ width: "30px", height: "3px", background: accent }} />
            <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", fontWeight: "600", textTransform: "uppercase", color: "#ddd6fe" }} />
          </div>
        </div>
        <div style={{ background: lightBg, width: "30%", padding: "10mm 10mm", fontSize: "10px", display: "flex", flexDirection: "column", justifyContent: "center", borderBottom: `5px solid ${accent}` }}>
          <div style={{ marginBottom: "4px" }}>📍 <E value={location} onChange={(v) => u("location", v)} /></div>
          <div style={{ marginBottom: "4px" }}>📞 <E value={phone} onChange={(v) => u("phone", v)} /></div>
          <div style={{ marginBottom: "4px" }}>📧 <E value={email} onChange={(v) => u("email", v)} /></div>
          <div style={{ fontWeight: "bold", color: primary }}>🌐 <E value={portfolio} onChange={(v) => u("portfolio", v)} /></div>
        </div>
      </div>

      <div style={{ padding: "10mm 15mm" }}>
        
        {/* SUMMARY SECTION - STYLISH BOX */}
        <div style={{ background: lightBg, padding: "15px 20px", borderRadius: "15px", marginBottom: "25px", borderRight: `8px solid ${primary}` }}>
          <div style={{ fontSize: "12px", fontWeight: "900", color: primary, textTransform: "uppercase", marginBottom: "8px" }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6", textAlign: "justify" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "30px" }}>
          
          {/* LEFT: WORK EXPERIENCE */}
          <div>
            <div style={{ fontSize: "14px", fontWeight: "900", color: textDark, textTransform: "uppercase", marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
               <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
               <div style={{ flexGrow: 1, height: "1px", background: "#e5e7eb" }} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "12px", color: primary }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ color: softGray, fontSize: "10px" }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "700", fontSize: "11px", display: "block", marginTop: "3px", fontStyle: "italic" }} />
                    <ul style={{ margin: "10px 0", paddingLeft: "15px", listStyleType: "circle" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "10.5px", marginBottom: "5px", color: "#4b5563" }}>
                          <E value={b} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, bullets: r.bullets.map((bul, k) => k === bi ? v : bul) } : r) } : e); u("experience", a); }} />
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
            {/* SKILLS AS COLORED TAGS */}
            <div style={{ fontSize: "13px", fontWeight: "900", color: textDark, textTransform: "uppercase", marginBottom: "12px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "25px" }}>
              {skills.map((s, i) => (
                <span key={i} style={{ background: primary, color: white, padding: "3px 10px", fontSize: "9px", borderRadius: "4px", fontWeight: "600" }}>
                  <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                </span>
              ))}
            </div>

            {/* TOOLS LIST */}
            <div style={{ fontSize: "13px", fontWeight: "900", color: textDark, textTransform: "uppercase", marginBottom: "12px" }}>
              <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
            </div>
            <div style={{ border: `1px solid ${lightBg}`, padding: "12px", borderRadius: "10px" }}>
              {tools.map((tool, i) => (
                <div key={i} style={{ fontSize: "10.5px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent }} />
                  <E value={tool} onChange={(v) => { const a = ref.current.tools.map((t, j) => j === i ? v : t); u("tools", a); }} />
                </div>
              ))}
            </div>

            {/* EDUCATION */}
            <div style={{ marginTop: "25px" }}>
              <div style={{ fontSize: "13px", fontWeight: "900", color: textDark, textTransform: "uppercase", marginBottom: "12px" }}>
                <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
              </div>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "11px" }} />
                  <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "10px", color: primary }} />
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

export default GraphicDesignerTemplate;