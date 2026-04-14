import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Essential Monochrome Palette (Inspired by provided structure)
const black      = "#000000";
const secondary  = "#4b5563";
const divider    = "#000000"; // Solid black divider as per request

const getInitialData = () => ({
  name: "MOBILE APP DEVELOPER",
  contact: "+91-99000-11000 | Bangalore, India",
  links: "mobile.dev@appstudio.com | github.com/app-architect",

  objectiveTitle: "OBJECTIVE",
  objective: "Results-driven Mobile Developer with 5+ years of experience in building high-performance native and cross-platform applications. Expert in UI/UX implementation, API integration, and App Store/Play Store deployment. Focused on writing memory-efficient code and creating seamless user transitions.",

  skillsTitle: "SKILLS",
  skillsList: "Swift (iOS), Kotlin (Android), Flutter, React Native, MVVM, VIPER, Clean Architecture, SQLite, Realm, CoreData, Firebase, Fastlane, Git & Github",

  experienceTitle: "EXPERIENCE",
  experience: [
    {
      role: "Lead Mobile Developer",
      company: "AppVantage Solutions, Bangalore",
      period: "2021 – Present",
      bullets: [
        "Developed a fintech application from scratch, achieving 500k+ downloads on Play Store.",
        "Reduced app crash rate by 15% through robust error handling and automated testing.",
        "Integrated complex third-party SDKs for biometric authentication and secure payments.",
        "Optimized image caching and lazy loading, reducing data consumption by 30%."
      ],
    },
    {
      role: "Junior iOS Developer",
      company: "SwiftTech Systems, Noida",
      period: "2019 – 2021",
      bullets: [
        "Maintained and updated a social media app with 1M+ active users.",
        "Collaborated with backend teams to optimize JSON parsing and network calls."
      ],
    },
  ],

  educationTitle: "EDUCATION",
  education: [
    { degree: "B.Tech in Computer Science", school: "National Institute of Technology (NIT)", year: "2019" },
  ],

  projectsTitle: "PROJECTS",
  projects: [
    {
      name: "Fintech Mobile Wallet",
      desc: "Built a secure payment gateway integration using Flutter and Node.js, supporting multi-currency transactions."
    },
    {
      name: "Transport Tracking App",
      desc: "Real-time vehicle tracking application using Google Maps API and Firebase Cloud Messaging."
    }
  ],

  certTitle: "CERTIFICATIONS",
  certs: [
    "AWS Certified Developer – Associate",
    "Google Certified Professional Android Developer"
  ]
});

const MobileDevTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, contact, links, objectiveTitle, objective, skillsTitle, skillsList, experienceTitle, experience, educationTitle, education, projectsTitle, projects, certTitle, certs } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", color: black, padding: "15mm", boxSizing: "border-box" }}>
      
      {/* HEADER - CENTERED */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "1px" }} />
        <div style={{ fontSize: "11px", marginTop: "5px" }}>
          <E value={contact} onChange={(v) => u("contact", v)} />
        </div>
        <div style={{ fontSize: "11px", fontWeight: "bold" }}>
          <E value={links} onChange={(v) => u("links", v)} />
        </div>
      </div>

      {/* OBJECTIVE */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "bold", borderBottom: `1px solid ${divider}`,paddingBottom:"6px", marginBottom: "8px" }}>
          <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
        </h3>
        <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "11px", lineHeight: "1.5", textAlign: "justify" }} />
      </div>

      {/* SKILLS */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "bold", borderBottom: `1px solid ${divider}`,paddingBottom:"6px", marginBottom: "8px" }}>
          <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
        </h3>
        <div style={{ fontSize: "11px" }}>
          <span style={{ fontWeight: "bold" }}>Technical Skills: </span>
          <E value={skillsList} onChange={(v) => u("skillsList", v)} />
        </div>
      </div>

      {/* EXPERIENCE */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "bold", borderBottom: `1px solid ${divider}`,paddingBottom:"6px", marginBottom: "12px" }}>
          <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
        </h3>
        {experience.map((exp, ei) => (
          <div key={ei} style={{ marginBottom: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px" }}>
              <E value={exp.role} onChange={() => {}} />
              <E value={exp.period} onChange={() => {}} />
            </div>
            <div style={{ fontSize: "11px", fontStyle: "italic", marginBottom: "5px", color: secondary }}>
              <E value={exp.company} onChange={() => {}} />
            </div>
            <ul style={{ margin: "0", paddingLeft: "18px", fontSize: "11px" }}>
              {exp.bullets.map((b, bi) => (
                <li key={bi} style={{ marginBottom: "4px", lineHeight: "1.4" }}><E value={b} onChange={() => {}} /></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "bold", borderBottom: `1px solid ${divider}`,paddingBottom:"6px", marginBottom: "10px" }}>
          <E value={educationTitle} onChange={(v) => u("educationTitle", v)} />
        </h3>
        {education.map((edu, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px" }}>
            <div style={{ fontWeight: "bold" }}>
              <E value={edu.degree} onChange={() => {}} />: <span style={{ fontWeight: "normal" }}><E value={edu.school} onChange={() => {}} /></span>
            </div>
            <E value={edu.year} onChange={() => {}} style={{ fontWeight: "bold" }} />
          </div>
        ))}
      </div>

      {/* PROJECTS */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "bold", borderBottom: `1px solid ${divider}`,paddingBottom:"6px", marginBottom: "10px" }}>
          <E value={projectsTitle} onChange={(v) => u("projectsTitle", v)} />
        </h3>
        {projects.map((proj, i) => (
          <div key={i} style={{ marginBottom: "8px", fontSize: "11px" }}>
            <div style={{ fontWeight: "bold" }}><E value={proj.name} onChange={() => {}} /></div>
            <E value={proj.desc} onChange={() => {}} block />
          </div>
        ))}
      </div>

      {/* CERTIFICATIONS */}
      <div>
        <h3 style={{ fontSize: "13px", fontWeight: "bold", borderBottom: `1px solid ${divider}`,paddingBottom:"6px", marginBottom: "8px" }}>
          <E value={certTitle} onChange={(v) => u("certTitle", v)} />
        </h3>
        <ul style={{ margin: "0", paddingLeft: "18px", fontSize: "11px" }}>
          {certs.map((c, i) => (
            <li key={i} style={{ marginBottom: "3px" }}><E value={c} onChange={() => {}} /></li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default MobileDevTemplate;