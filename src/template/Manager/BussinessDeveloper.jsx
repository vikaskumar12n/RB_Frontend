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
  name: "BUSINESS DEVELOPMENT MANAGER",
  contact: "+91-98000-77000 | Mumbai, India",
  links: "growth.lead@business.com | linkedin.com/in/bd-expert | portfolio.com/sales-leader",
  summaryTitle: "PROFESSIONAL PROFILE",
  summary: `Results-driven Business Development professional with 8+ years of experience in driving multi-million dollar revenue growth. Expert in identifying market opportunities, building high-value strategic partnerships, and closing complex B2B deals. Strong leader with a focus on sustainable business expansion and client retention.`,
  skillsTitle: "CORE EXPERTISE",
  skillsList: "Strategic Partnership Building, High-Stakes Negotiations, Revenue Forecasting, Market Research & Analysis, Lead Generation Pipeline, Account Management, Public Speaking, Salesforce, HubSpot CRM, LinkedIn Sales Navigator, Tableau, MS Office Suite",
  experienceTitle: "SALES & GROWTH HISTORY",
  experience: [
    {
      role: "Senior Business Development Manager",
      company: "Global Trade Corp, Mumbai",
      period: "2021 – Present",
      bullets: [
        "Increased quarterly revenue by 35% through the acquisition of 15+ Enterprise-level clients.",
        "Negotiated and signed strategic partnerships with 3 global distributors, expanding market reach by 40%.",
        "Led a sales team of 10, consistently over-achieving annual targets by 115%.",
        "Developed a new lead scoring system that improved sales conversion rates by 22%."
      ],
    },
    {
      role: "Business Development Associate",
      company: "Stellar Startups Inc., Bangalore",
      period: "2018 – 2021",
      bullets: [
        "Generated over $1M in new business revenue within the first 12 months.",
        "Conducted market entry research for Southeast Asia, resulting in 2 successful branch openings."
      ],
    },
  ],
  eduTitle: "EDUCATION",
  education: [
    {
      degree: "MBA in Marketing & Strategy",
      school: "Indian Institute of Management (IIM)",
      year: "2018"
    }
  ],
  certTitle: "CERTIFICATIONS",
  certs: [
    "Certified Sales Professional (CSP)",
    "Strategic Negotiations Mastery - Harvard Extension"
  ]
});

const SectionTitle = ({ children, onAdd, showAdd = false }) => (
  <div style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, marginBottom: "8px", textTransform: "uppercase", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span>{children}</span>
    {showAdd && onAdd && (
      <IconBtn onClick={onAdd} color="#6366f1">
        <Plus size={9} /> Add
      </IconBtn>
    )}
  </div>
);

const BusinessDevTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setDataFunc = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setDataFunc({ ...ref.current, [f]: v });

  // ========== EXPERIENCE FUNCTIONS ==========
  const addExperience = () => {
    u("experience", [...ref.current.experience, { role: "New Role", company: "New Company", period: "Date", bullets: ["New bullet point"] }]);
  };
  const removeExperience = (i) => u("experience", ref.current.experience.filter((_, idx) => idx !== i));
  const copyExperience = (i) => {
    const expToCopy = JSON.parse(JSON.stringify(ref.current.experience[i]));
    expToCopy.company = expToCopy.company + " (Copy)";
    u("experience", [...ref.current.experience, expToCopy]);
  };

  // ========== BULLET FUNCTIONS ==========
  const addBullet = (ei) => {
    const updated = ref.current.experience.map((exp, i) => i === ei ? { ...exp, bullets: [...exp.bullets, "New bullet point"] } : exp);
    u("experience", updated);
  };
  const removeBullet = (ei, bi) => {
    const updated = ref.current.experience.map((exp, i) => i === ei ? { ...exp, bullets: exp.bullets.filter((_, idx) => idx !== bi) } : exp);
    u("experience", updated);
  };
  const copyBullet = (ei, bi) => {
    const updated = ref.current.experience.map((exp, i) => i === ei ? { ...exp, bullets: [...exp.bullets, exp.bullets[bi] + " (Copy)"] } : exp);
    u("experience", updated);
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
  const updateExpField = (i, field, value) => {
    const updated = ref.current.experience.map((exp, idx) => idx === i ? { ...exp, [field]: value } : exp);
    u("experience", updated);
  };
  const updateBulletField = (ei, bi, value) => {
    const updated = ref.current.experience.map((exp, i) => i === ei ? { ...exp, bullets: exp.bullets.map((b, idx) => idx === bi ? value : b) } : exp);
    u("experience", updated);
  };
  const updateEduField = (i, field, value) => {
    const updated = ref.current.education.map((edu, idx) => idx === i ? { ...edu, [field]: value } : edu);
    u("education", updated);
  };
  const updateCertField = (i, value) => {
    const updated = ref.current.certs.map((c, idx) => idx === i ? value : c);
    u("certs", updated);
  };

  const { name, contact, links, summaryTitle, summary, skillsTitle, skillsList, experienceTitle, experience, eduTitle, education, certTitle, certs } = data;

  return (
    <>
      <StyleInjector />
      <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", color: black, padding: "15mm", boxSizing: "border-box" }}>

        {/* HEADER - CENTERED */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "1px" }} />
          <div style={{ fontSize: "11px", marginTop: "5px", color: secondary }}>
            <E value={contact} onChange={(v) => u("contact", v)} />
          </div>
          <div style={{ fontSize: "11px", fontWeight: "bold", marginTop: "2px" }}>
            <E value={links} onChange={(v) => u("links", v)} />
          </div>
        </div>

        {/* SUMMARY */}
        <div style={{ marginBottom: "15px" }}>
          <SectionTitle>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </SectionTitle>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.5", textAlign: "justify" }} />
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

        {/* EXPERIENCE */}
        <div style={{ marginBottom: "15px" }}>
          <SectionTitle showAdd={true} onAdd={addExperience}>
            <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
          </SectionTitle>

          {experience.map((exp, ei) => (
            <div key={ei} className="hoverable-row" style={{
              borderBottom: ei !== data.experience.length - 1 ? "1px dashed #e5e7eb" : "none",
              marginBottom: ei !== data.experience.length - 1 ? "5px" : "0",  /*  added */
              paddingBottom: ei !== data.experience.length - 1 ? "5px" : "0", /*  added */
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                <E value={exp.role} onChange={(v) => updateExpField(ei, "role", v)} style={{ fontWeight: "bold", fontSize: "12px" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <E value={exp.period} onChange={(v) => updateExpField(ei, "period", v)} />
                  <IconBtn onClick={() => copyExperience(ei)} color="#6366f1"><Copy size={8} /></IconBtn>
                  <IconBtn onClick={() => removeExperience(ei)} color="#ef4444"><Trash2 size={8} /></IconBtn>
                </div>
              </div>
              <div style={{ fontSize: "11px", fontStyle: "italic", marginBottom: "5px", color: secondary }}>
                <E value={exp.company} onChange={(v) => updateExpField(ei, "company", v)} />
              </div>
              <ul style={{ margin: "5px 0 0 0", paddingLeft: "18px", fontSize: "11px" }}>
                {exp.bullets.map((b, bi) => (
                  <li key={bi} className="hoverable-row" style={{ marginBottom: "4px", lineHeight: "1.4", display: "flex", alignItems: "flex-start", gap: 6, listStyle: "none" }}>
                    <span>•</span>
                    <E value={b} onChange={(v) => updateBulletField(ei, bi, v)} style={{ flex: 1 }} />
                    <IconBtn onClick={() => copyBullet(ei, bi)} color="#6366f1" style={{ padding: "1px 3px" }}><Copy size={6} /></IconBtn>
                    <IconBtn onClick={() => removeBullet(ei, bi)} color="#ef4444" style={{ padding: "1px 3px" }}><Trash2 size={6} /></IconBtn>
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
            <div key={i} className="hoverable-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6, marginBottom: "8px", borderBottom: i !== education.length - 1 ? `1px dashed ${secondary}` : "none", paddingBottom: "6px" }}>
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

export default BusinessDevTemplate;