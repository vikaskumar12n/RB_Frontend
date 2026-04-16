import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Minimalist Design Palette
const black      = "#000000";
const secondary  = "#4b5563";
const divider    = "#000000"; 

const getInitialData = () => ({
  name: "DESIGN INTERN NAME",
  contact: "+91-99999-00000 | Pune, India",
  links: "design.intern@portfolio.com | behance.net/design-pro | linkedin.com/in/designer-nextgen",

  objectiveTitle: "DESIGN PHILOSOPHY",
  objective: "Aspiring Designer with a focus on creating intuitive, user-centric experiences. Passionate about minimal aesthetics and functional design. Seeking an internship to contribute to creative projects and refine skills in UI/UX, branding, and visual communication.",

  skillsTitle: "DESIGN TOOLKIT",
  skillsList: "User Interface (UI) Design, User Experience (UX) Research, Visual Branding & Identity, Typography & Layout, Wireframing & Prototyping, Design Systems, Figma, Adobe XD, Photoshop, Illustrator, Webflow",

  projectTitle: "SELECTED PROJECTS",
  projects: [
    {
      name: "Food Delivery App - UX Case Study",
      link: "behance.net/case-study-food",
      bullets: [
        "Conducted user research and created personas for a niche food delivery market.",
        "Designed high-fidelity prototypes in Figma, resulting in a 15% improvement in task completion rate during testing.",
        "Developed a cohesive design system with reusable components and accessible color palettes."
      ],
    },
    {
      name: "Brand Identity: 'Neo-Eco' Startup",
      link: "behance.net/neo-eco",
      bullets: [
        "Created a complete visual identity including logo, typography, and social media guidelines.",
        "Focused on sustainability themes through minimalist iconography and organic color theory."
      ],
    },
  ],

  eduTitle: "DESIGN EDUCATION",
  education: [
    { 
      degree: "Bachelor of Design (B.Des) in Interaction Design", 
      school: "National Institute of Design (NID)", 
      year: "2022 – 2026 (Ongoing)" 
    }
  ],

  certTitle: "CERTIFICATIONS & AWARDS",
  certs: [
    "Google UX Design Professional Certificate",
    "Adobe Certified Professional in Visual Design"
  ]
});

const DesignInternTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, contact, links, objectiveTitle, objective, skillsTitle, skillsList, projectTitle, projects, eduTitle, education, certTitle, certs } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", color: black, padding: "15mm", boxSizing: "border-box" }}>
      
      {/* HEADER - CENTERED */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "26px", fontWeight: "900", letterSpacing: "1px" }} />
        <div style={{ fontSize: "11px", marginTop: "5px", color: secondary }}>
          <E value={contact} onChange={(v) => u("contact", v)} />
        </div>
        <div style={{ fontSize: "11px", fontWeight: "bold", marginTop: "2px" }}>
          <E value={links} onChange={(v) => u("links", v)} />
        </div>
      </div>

      {/* OBJECTIVE / PHILOSOPHY */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900",paddingBottom:"5px", borderBottom: `1px solid ${divider}`,  marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
        </h3>
        <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "11px", lineHeight: "1.5", textAlign: "justify" }} />
      </div>

      {/* SKILLS */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900",paddingBottom:"5px", borderBottom: `1px solid ${divider}`,  marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
        </h3>
        <div style={{ fontSize: "11px", lineHeight: "1.4" }}>
          <E value={skillsList} onChange={(v) => u("skillsList", v)} />
        </div>
      </div>

      {/* PROJECTS */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900",paddingBottom:"5px", borderBottom: `1px solid ${divider}`,  marginBottom: "12px", textTransform: "uppercase" }}>
          <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
        </h3>
        {projects.map((proj, pi) => (
          <div key={pi} style={{ marginBottom: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px" }}>
              <E value={proj.name} onChange={() => {}} />
              <E value={proj.link} onChange={() => {}} style={{ fontSize: "10px", fontWeight: "normal", textDecoration: "underline" }} />
            </div>
            <ul style={{ margin: "5px 0 0 0", paddingLeft: "18px", fontSize: "11px" }}>
              {proj.bullets.map((b, bi) => (
                <li key={bi} style={{ marginBottom: "4px", lineHeight: "1.4" }}><E value={b} onChange={() => {}} /></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900",paddingBottom:"5px", borderBottom: `1px solid ${divider}`,  marginBottom: "10px", textTransform: "uppercase" }}>
          <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
        </h3>
        {education.map((edu, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px" }}>
            <div style={{ fontWeight: "bold" }}>
              <E value={edu.degree} onChange={() => {}} /> | <span style={{ fontWeight: "normal" }}><E value={edu.school} onChange={() => {}} /></span>
            </div>
            <E value={edu.year} onChange={() => {}} style={{ fontWeight: "bold" }} />
          </div>
        ))}
      </div>

      {/* CERTIFICATIONS */}
      <div>
        <h3 style={{ fontSize: "13px", fontWeight: "900",paddingBottom:"5px", borderBottom: `1px solid ${divider}`,  marginBottom: "8px", textTransform: "uppercase" }}>
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

export default DesignInternTemplate;