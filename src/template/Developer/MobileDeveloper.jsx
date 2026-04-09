import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Mobile Developer - Structural Architecture Theme (No Color Effects)
const black      = "#111827";
const gray       = "#4b5563";
const lightGray  = "#f3f4f6";
const borderCol  = "#000000";

const getInitialData = () => ({
  name: "MOBILE APP DEVELOPER",
  title: "iOS & Android Specialist | Flutter & React Native",
  location: "Bangalore, India",
  phone: "+91-99000-11000",
  email: "mobile.dev@appstudio.com",
  github: "github.com/app-architect",
  portfolio: "play.google.com/dev-apps",

  summaryTitle: "Technical Profile",
  experienceTitle: "App Development History",
  skillsTitle: "Core Tech Stack",
  toolsTitle: "Mobile Ecosystem",
  eduTitle: "Education",

  summary: `Results-driven Mobile Developer with 5+ years of experience in building high-performance native and cross-platform applications. Expert in UI/UX implementation, API integration, and App Store/Play Store deployment. Focused on writing memory-efficient code and creating seamless user transitions.`,

  skills: [
    "Native: Swift (iOS), Kotlin (Android)",
    "Cross-Platform: Flutter, React Native",
    "Architecture: MVVM, VIPER, Clean Architecture",
    "Local DB: SQLite, Realm, CoreData"
  ],

  tools: [
    "Xcode", "Android Studio", "Firebase", "Fastlane", "GitLab CI/CD", "Postman"
  ],

  experience: [
    {
      company: "AppVantage Solutions",
      period: "2021 – Present",
      roles: [{
        title: "Lead Mobile Developer",
        bullets: [
          "Developed a fintech application from scratch, achieving 500k+ downloads on Play Store.",
          "Reduced app crash rate by 15% through robust error handling and automated testing.",
          "Integrated complex third-party SDKs for biometric authentication and secure payments.",
          "Optimized image caching and lazy loading, reducing data consumption by 30%."
        ],
      }],
    },
    {
      company: "SwiftTech Systems",
      period: "2019 – 2021",
      roles: [{
        title: "Junior iOS Developer",
        bullets: [
          "Maintained and updated a social media app with 1M+ active users.",
          "Collaborated with backend teams to optimize JSON parsing and network calls."
        ],
      }],
    },
  ],

  education: [{
    school: "National Institute of Technology (NIT)",
    year: "2019",
    degree: "B.Tech in Computer Science",
  }],
});

const MobileDevTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, github, portfolio, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", color: black, padding: "15mm", boxSizing: "border-box" }}>
      
      {/* APP-INSPIRED HEADER (CLEAN BORDERS) */}
      <div style={{ border: `2px solid ${black}`, padding: "10mm", marginBottom: "25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "26px", fontWeight: "900", letterSpacing: "-0.5px" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "12px", fontWeight: "700", marginTop: "5px", textTransform: "uppercase", color: gray }} />
        </div>
        <div style={{ textAlign: "right", fontSize: "10px", fontWeight: "600", borderLeft: `1px solid ${black}`, paddingLeft: "15px" }}>
          <div style={{ marginBottom: "3px" }}>📞 <E value={phone} onChange={(v) => u("phone", v)} /></div>
          <div style={{ marginBottom: "3px" }}>📧 <E value={email} onChange={(v) => u("email", v)} /></div>
          <div>🔗 <E value={github} onChange={(v) => u("github", v)} /></div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "30px" }}>
        
        {/* LEFT: SUMMARY & EXPERIENCE */}
        <div style={{ borderRight: `1px solid ${lightGray}`, paddingRight: "20px" }}>
          
          <div style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "10px", borderBottom: `2px solid ${black}`, display: "inline-block" }}>
              <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
            </div>
            <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6", color: gray, textAlign: "justify" }} />
          </div>

          <div>
            <div style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px", background: black, color: "#fff", padding: "4px 10px" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "12px" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ color: gray }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "600", fontSize: "11px", display: "block", marginTop: "4px", fontStyle: "italic" }} />
                    <ul style={{ margin: "10px 0", paddingLeft: "15px", listStyleType: "square" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "10.5px", marginBottom: "6px" }}>
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

        {/* RIGHT: SKILLS, TOOLS & EDUCATION */}
        <div>
          <div style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "12px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            {skills.map((s, i) => (
              <div key={i} style={{ fontSize: "10px", marginBottom: "10px", padding: "8px", background: lightGray, borderLeft: `3px solid ${black}` }}>
                <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "12px" }}>
              <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {tools.map((t, i) => (
                <span key={i} style={{ border: `1px solid ${black}`, padding: "3px 8px", fontSize: "9px", fontWeight: "700" }}>
                  <E value={t} onChange={(v) => { const a = ref.current.tools.map((item, j) => j === i ? v : item); u("tools", a); }} />
                </span>
              ))}
            </div>
          </div>

          <div style={{ border: `1px dashed ${black}`, padding: "15px" }}>
            <div style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "10px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10.5px" }} />
                <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "9.5px", marginTop: "2px" }} />
                <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "9.5px", fontWeight: "900" }} />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default MobileDevTemplate;