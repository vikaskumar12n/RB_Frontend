import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";
import { Plus, Trash2, Copy } from "lucide-react";

// Inject print styles once
const PRINT_STYLE = `
  @media print {
    .no-print { display: none !important; }
    .resume-bullet-row { align-items: flex-start !important; }
    body { margin: 0; }
    @page { size: A4; margin: 15mm; }
  }
  @media screen {
    .edit-controls { opacity: 0; transition: opacity 0.15s; }
    .hoverable-row:hover .edit-controls { opacity: 1; }
  }
`;

const StyleInjector = () => {
  if (typeof document !== "undefined" && !document.getElementById("resume-print-style")) {
    const style = document.createElement("style");
    style.id = "resume-print-style";
    style.innerHTML = PRINT_STYLE;
    document.head.appendChild(style);
  }
  return null;
};

const E = (p) => <EditableSpan {...p} />;

const IconBtn = ({ onClick, color = "#6366f1", title, children, style = {} }) => (
  <button
    className="no-print edit-controls"
    onClick={onClick}
    title={title}
    style={{
      background: color, color: "#fff", border: "none", borderRadius: "3px",
      padding: "2px 5px", fontSize: "9px", cursor: "pointer",
      display: "inline-flex", alignItems: "center", gap: "2px",
      flexShrink: 0, lineHeight: 1.2, ...style,
    }}
  >
    {children}
  </button>
);

const black = "#000000";
const secondary = "#4b5563";
const divider = "#000000";

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

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "13px", fontWeight: "900", paddingBottom: "5px", borderBottom: `1px solid ${divider}`, marginBottom: "8px", textTransform: "uppercase", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const DesignInternTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setDataFunc = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setDataFunc({ ...ref.current, [f]: v });

  // ========== PROJECTS FUNCTIONS ==========
  const addProject = () => {
    u("projects", [...ref.current.projects, { name: "New Project", link: "portfolio-link", bullets: ["New bullet point"] }]);
  };
  const removeProject = (i) => u("projects", ref.current.projects.filter((_, idx) => idx !== i));
  const copyProject = (i) => {
    const projToCopy = JSON.parse(JSON.stringify(ref.current.projects[i]));
    projToCopy.name = projToCopy.name + " (Copy)";
    u("projects", [...ref.current.projects, projToCopy]);
  };

  // ========== BULLET FUNCTIONS ==========
  const addBullet = (pi) => {
    const updated = ref.current.projects.map((proj, i) => i === pi ? { ...proj, bullets: [...proj.bullets, "New bullet point"] } : proj);
    u("projects", updated);
  };
  const removeBullet = (pi, bi) => {
    const updated = ref.current.projects.map((proj, i) => i === pi ? { ...proj, bullets: proj.bullets.filter((_, idx) => idx !== bi) } : proj);
    u("projects", updated);
  };
  const copyBullet = (pi, bi) => {
    const updated = ref.current.projects.map((proj, i) => i === pi ? { ...proj, bullets: [...proj.bullets, proj.bullets[bi] + " (Copy)"] } : proj);
    u("projects", updated);
  };

  // ========== EDUCATION FUNCTIONS ==========
  const addEducation = () => u("education", [...ref.current.education, { degree: "New Degree", school: "New School", year: "Year" }]);
  const removeEducation = (i) => u("education", ref.current.education.filter((_, idx) => idx !== i));
  const copyEducation = (i) => {
    const eduToCopy = JSON.parse(JSON.stringify(ref.current.education[i]));
    eduToCopy.school = eduToCopy.school + " (Copy)";
    u("education", [...ref.current.education, eduToCopy]);
  };

  // ========== CERTIFICATIONS FUNCTIONS ==========
  const addCert = () => u("certs", [...ref.current.certs, "New certification"]);
  const removeCert = (i) => u("certs", ref.current.certs.filter((_, idx) => idx !== i));
  const copyCert = (i) => u("certs", [...ref.current.certs, ref.current.certs[i] + " (Copy)"]);

  // ========== UPDATE FUNCTIONS ==========
  const updateProjectField = (pi, field, value) => {
    const updated = ref.current.projects.map((proj, i) => i === pi ? { ...proj, [field]: value } : proj);
    u("projects", updated);
  };
  const updateBulletField = (pi, bi, value) => {
    const updated = ref.current.projects.map((proj, i) => i === pi ? { ...proj, bullets: proj.bullets.map((b, idx) => idx === bi ? value : b) } : proj);
    u("projects", updated);
  };
  const updateEduField = (i, field, value) => {
    const updated = ref.current.education.map((edu, idx) => idx === i ? { ...edu, [field]: value } : edu);
    u("education", updated);
  };
  const updateCertField = (i, value) => {
    const updated = ref.current.certs.map((c, idx) => idx === i ? value : c);
    u("certs", updated);
  };

  const { name, contact, links, objectiveTitle, objective, skillsTitle, skillsList, projectTitle, projects, eduTitle, education, certTitle, certs } = data;

  return (
    <>
      <StyleInjector />
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
          <SectionTitle>
            <E value={objectiveTitle} onChange={(v) => u("objectiveTitle", v)} />
          </SectionTitle>
          <E value={objective} onChange={(v) => u("objective", v)} block style={{ fontSize: "11px", lineHeight: "1.5", textAlign: "justify" }} />
        </div>

        {/* SKILLS */}
        <div style={{ marginBottom: "15px" }}>
          <SectionTitle>
            <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
          </SectionTitle>
          <div style={{ fontSize: "11px", lineHeight: "1.4" }}>
            <E value={skillsList} onChange={(v) => u("skillsList", v)} />
          </div>
        </div>

        {/* PROJECTS */}
        <div style={{ marginBottom: "15px" }}>
          <SectionTitle showAdd={true} onAdd={addProject}>
            <E value={projectTitle} onChange={(v) => u("projectTitle", v)} />
          </SectionTitle>

          {projects.map((proj, pi) => (
            <div key={pi} className="hoverable-row" style={{ marginBottom: "15px", borderBottom: pi !== projects.length - 1 ? `1px dashed #e5e7eb` : "none", paddingBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6 }}>
                <E value={proj.name} onChange={(v) => updateProjectField(pi, "name", v)} style={{ fontWeight: "bold", fontSize: "12px", flex: 1 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <E value={proj.link} onChange={(v) => updateProjectField(pi, "link", v)} style={{ fontSize: "10px", fontWeight: "normal", textDecoration: "underline" }} />
                  <IconBtn onClick={() => copyProject(pi)} color="#6366f1"><Copy size={8} /></IconBtn>
                  <IconBtn onClick={() => removeProject(pi)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                </div>
              </div>
              <ul style={{ margin: "5px 0 0 0", paddingLeft: "18px", fontSize: "11px" }}>
                {proj.bullets.map((b, bi) => (
                  <li key={bi} className="hoverable-row" style={{ marginBottom: "4px", lineHeight: "1.4", display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
                    <span>•</span>
                    <E value={b} onChange={(v) => updateBulletField(pi, bi, v)} style={{ flex: 1 }} />
                    <IconBtn onClick={() => copyBullet(pi, bi)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={6} /></IconBtn>
                    <IconBtn onClick={() => removeBullet(pi, bi)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={6} /></IconBtn>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

        {/* EDUCATION */}
        <div style={{ marginBottom: "15px" }}>
          <SectionTitle showAdd={true} onAdd={addEducation}>
            <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
          </SectionTitle>

          {education.map((edu, i) => (
            <div key={i} className="hoverable-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6, marginBottom: "8px", borderBottom: i !== education.length - 1 ? `1px dashed #e5e7eb` : "none", paddingBottom: "6px" }}>
              <div style={{ fontWeight: "bold", flex: 1 }}>
                <E value={edu.degree} onChange={(v) => updateEduField(i, "degree", v)} /> | <span style={{ fontWeight: "normal" }}><E value={edu.school} onChange={(v) => updateEduField(i, "school", v)} /></span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <E value={edu.year} onChange={(v) => updateEduField(i, "year", v)} style={{ fontWeight: "bold" }} />
                <IconBtn onClick={() => copyEducation(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                <IconBtn onClick={() => removeEducation(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
              </div>
            </div>
          ))}
        </div>

        {/* CERTIFICATIONS */}
        <div>
          <SectionTitle showAdd={true} onAdd={addCert}>
            <E value={certTitle} onChange={(v) => u("certTitle", v)} />
          </SectionTitle>

          <ul style={{ margin: "0", paddingLeft: "18px", fontSize: "11px" }}>
            {certs.map((c, i) => (
              <li key={i} className="hoverable-row" style={{ marginBottom: "3px", display: "flex", alignItems: "center", gap: 6, listStyle: "none" }}>
                <span>•</span>
                <E value={c} onChange={(v) => updateCertField(i, v)} style={{ flex: 1 }} />
                <IconBtn onClick={() => copyCert(i)} color="#6366f1"><Copy size={8} /></IconBtn>
                <IconBtn onClick={() => removeCert(i)} color="#ef4444"><Trash2 size={8} /></IconBtn>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
};

export default DesignInternTemplate;