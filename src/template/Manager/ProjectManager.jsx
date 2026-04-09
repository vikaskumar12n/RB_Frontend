import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Project Manager Executive Red Theme (Clean White Background)
const primary  = "#111827"; // Near Black/Dark Slate
const executiveRed = "#c2410c"; // Executive Red Accent
const Gray   = "#4b5563"; // Muted Gray for descriptions
const borderCol = "#e5e7eb";
const white   = "#ffffff";

const getInitialData = () => ({
 name: "PROJECT MANAGER NAME",
 title: "Senior Project Manager | Agile & Prince2 Specialist",
 location: "Pune, India",
 phone: "+91-99887-76655",
 email: "pm.lead@results.com",
 linkedin: "linkedin.com/in/projectmanager-master",
 portfolio: "pmportfolio.com/results-driven",

 summaryTitle: "Leadership Philosophy",
 experienceTitle: "Project Roadmap & Experience",
 skillsTitle: "Core Competencies",
 toolsTitle: "Project Stack",
 eduTitle: "Education",

 summary: `Detail-oriented Project Manager with 7+ years of experience in leading high-impact software and infrastructure projects. Expert in Agile and Waterfall methodologies, budget management, and cross-functional team leadership. Proven track record of delivering complex projects on time and under budget while maintaining high stakeholder satisfaction.`,

 skills: [
  "Agile / Scrum / Waterfall", "Budgeting & Cost Control", "Risk Management", 
  "Stakeholder Communication", "Resource Planning", "Quality Assurance (QA)", "Strategic Planning"
 ],

 tools: [
  "Jira / Confluence", "Microsoft Project", "Asana / Trello", "Slack / MS Teams", "G-Suite / MS Office"
 ],

 experience: [
  {
   company: "Innovate Solutions Ltd.",
   period: "2020 – Present",
   roles: [{
    title: "Senior Project Manager",
    bullets: [
     "Led a team of 25+ software engineers to deliver a flagship fintech product, improving time-to-market by 20%.",
     "Managed a $5M annual budget, reducing project costs by 15% through optimized resource allocation.",
     "Implemented new Agile workflows, increasing sprint velocity by 25%.",
     "Reduced production bugs by 30% through improved QA coordination and testing protocols."
    ],
   }],
  },
  {
   company: "Digital Dream Systems",
   period: "2017 – 2020",
   roles: [{
    title: "Technical Project Manager",
    bullets: [
     "Delivered 10+ software projects for international clients, achieving a 98% satisfaction rating.",
     "Bridged communication gap between technical teams and non-technical stakeholders."
    ],
   }],
  },
 ],

 education: [{
  school: "National Institute of Technology (NIT)",
  year: "2017",
  degree: "B.Tech in Information Technology",
 }],
});

const ProjectManagerTemplate = ({ data: propData, setData: setPropData }) => {
 const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
 const ref = useRef(data);

 const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
 const u = (f, v) => setData({ ...ref.current, [f]: v });

 const { name, title, location, phone, email, linkedin, portfolio, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

 return (
  <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'IBM Plex Mono', monospace", backgroundColor: white, color: primary, boxSizing: "border-box" }}>
   
   {/* CLEAN EXECUTIVE HEADER WITH RED ACCENT */}
   <div style={{ display: "flex", borderBottom: `6px solid ${executiveRed}`, padding: "10mm 15mm 5mm 15mm", alignItems: "flex-end" }}>
    <div style={{ width: "70%" }}>
     <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "1px", color: primary }} />
     <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
      <div style={{ width: "25px", height: "3px", background: executiveRed }} />
      <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "12px", color: executiveRed, fontWeight: "bold", textTransform: "uppercase" }} />
     </div>
    </div>
    <div style={{ width: "30%", fontSize: "9px", textAlign: "right", color: primary, lineHeight: "1.6" }}>
     <div style={{ marginBottom: "3px" }}>📍 <E value={location} onChange={(v) => u("location", v)} /></div>
     <div style={{ marginBottom: "3px" }}>📞 <E value={phone} onChange={(v) => u("phone", v)} /></div>
     <div style={{ marginBottom: "3px" }}>📧 <E value={email} onChange={(v) => u("email", v)} /></div>
     <div style={{ fontWeight: "bold", color: primary }}>🔗 <E value={linkedin} onChange={(v) => u("linkedin", v)} /></div>
    </div>
   </div>

   <div style={{ padding: "8mm 15mm" }}>
    
    {/* SUMMARY SECTION - RED MARKER */}
    <div style={{ marginBottom: "25px", display: "flex", alignItems: "flex-start", gap: "15px" }}>
     <div style={{ fontSize: "11px", fontWeight: "900", color: executiveRed, textTransform: "uppercase", letterSpacing: "1px", writingMode: "vertical-rl", transform: "rotate(180deg)", borderRight: `2px solid ${executiveRed}`, paddingRight: "5px" }}>
      <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
     </div>
     <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "10.5px", lineHeight: "1.6", textAlign: "justify", flexGrow: "1" }} />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: "30px" }}>
     
     {/* LEFT: EXPERIENCE */}
     <div>
      <div style={{ fontSize: "13px", fontWeight: "900", color: primary, textTransform: "uppercase", marginBottom: "15px", borderBottom: `1px solid ${borderCol}`, paddingBottom: "5px" }}>
       <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
      </div>
      {experience.map((exp, ei) => (
       <div key={ei} style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "11px", color: primary }}>
         <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
         <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} style={{ color: executiveRed, fontSize: "10px" }} />
        </div>
        {exp.roles.map((role, ri) => (
         <div key={ri} style={{ marginTop: "4px" }}>
          <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontWeight: "700", fontSize: "10px", display: "block", fontStyle: "italic" }} />
          <ul style={{ margin: "8px 0", paddingLeft: "15px", listStyleType: "none" }}>
           {role.bullets.map((b, bi) => (
            <li key={bi} style={{ fontSize: "10px", marginBottom: "5px", display: "flex", gap: "10px", alignItems: "center" }}>
             <div style={{ width: "4px", height: "4px", background: executiveRed, flexShrink: "0" }} />
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
      {/* SKILLS */}
      <div style={{ fontSize: "11px", fontWeight: "900", color: primary, textTransform: "uppercase", marginBottom: "10px" }}>
       <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "25px" }}>
       {skills.map((s, i) => (
        <span key={i} style={{ background: executiveRed, color: white, padding: "2px 8px", fontSize: "9px", borderRadius: "1px", fontWeight: "700" }}>
         <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
        </span>
       ))}
      </div>

      {/* TOOLS LIST */}
      <div style={{ fontSize: "11px", fontWeight: "900", color: primary, textTransform: "uppercase", marginBottom: "10px" }}>
       <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
      </div>
      <div style={{ borderLeft: `1px solid ${borderCol}`, paddingLeft: "10px", marginBottom: "25px" }}>
       {tools.map((tool, i) => (
        <div key={i} style={{ fontSize: "10px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
         <div style={{ width: "6px", height: "6px", background: borderCol, border: `1px solid ${primary}` }} />
         <E value={tool} onChange={(v) => { const a = ref.current.tools.map((t, j) => j === i ? v : t); u("tools", a); }} />
        </div>
       ))}
      </div>

      {/* EDUCATION SECTION */}
      <div style={{ marginTop: "25px", borderTop: `1px dashed ${executiveRed}`, paddingTop: "15px" }}>
       <div style={{ fontSize: "11px", fontWeight: "900", color: primary, textTransform: "uppercase", marginBottom: "10px" }}>
        <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
       </div>
       {education.map((edu, i) => (
        <div key={i}>
         <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10px" }} />
         <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "9px" }} />
         <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "9px", color: executiveRed, fontWeight: "bold" }} />
        </div>
       ))}
      </div>
     </div>

    </div>
   </div>

  </div>
 );
};

export default ProjectManagerTemplate;