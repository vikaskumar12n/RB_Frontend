import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Project Manager - Simple Executive Theme
const black      = "#000000";
const secondary  = "#4b5563";
const divider    = "#000000"; 

const getInitialData = () => ({
  name: "PROJECT MANAGER NAME",
  contact: "+91-99887-76655 | Pune, India",
  links: "pm.lead@results.com | linkedin.com/in/projectmanager-master | pmportfolio.com/results-driven",

  summaryTitle: "LEADERSHIP PHILOSOPHY",
  summary: `Detail-oriented Project Manager with 7+ years of experience in leading high-impact software and infrastructure projects. Expert in Agile and Waterfall methodologies, budget management, and cross-functional team leadership. Proven track record of delivering complex projects on time and under budget while maintaining high stakeholder satisfaction.`,

  skillsTitle: "CORE COMPETENCIES",
  skillsList: "Agile, Scrum, Waterfall, Budgeting & Cost Control, Risk Management, Stakeholder Communication, Resource Planning, Quality Assurance (QA), Strategic Planning, Jira, Confluence, Microsoft Project, Asana, Trello",

  experienceTitle: "PROJECT ROADMAP & EXPERIENCE",
  experience: [
    {
      role: "Senior Project Manager",
      company: "Innovate Solutions Ltd., Pune",
      period: "2020 – Present",
      bullets: [
        "Led a team of 25+ software engineers to deliver a flagship fintech product, improving time-to-market by 20%.",
        "Managed a $5M annual budget, reducing project costs by 15% through optimized resource allocation.",
        "Implemented new Agile workflows, increasing sprint velocity by 25%.",
        "Reduced production bugs by 30% through improved QA coordination and testing protocols."
      ],
    },
    {
      role: "Technical Project Manager",
      company: "Digital Dream Systems, Mumbai",
      period: "2017 – 2020",
      bullets: [
        "Delivered 10+ software projects for international clients, achieving a 98% satisfaction rating.",
        "Bridged communication gap between technical teams and non-technical stakeholders."
      ],
    },
  ],

  eduTitle: "EDUCATION",
  education: [
    { 
      degree: "B.Tech in Information Technology", 
      school: "National Institute of Technology (NIT)", 
      year: "2017" 
    }
  ],

  certTitle: "CERTIFICATIONS",
  certs: [
    "PMP® – Project Management Professional",
    "Certified Scrum Master (CSM)",
    "PRINCE2® Foundation & Practitioner"
  ]
});

const ProjectManagerTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, contact, links, summaryTitle, summary, skillsTitle, skillsList, experienceTitle, experience, eduTitle, education, certTitle, certs } = data;

  return (
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
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
        </h3>
        <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.5", textAlign: "justify" }} />
      </div>

      {/* SKILLS */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "8px", textTransform: "uppercase" }}>
          <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
        </h3>
        <div style={{ fontSize: "11px", lineHeight: "1.4" }}>
          <E value={skillsList} onChange={(v) => u("skillsList", v)} />
        </div>
      </div>

      {/* EXPERIENCE */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "12px", textTransform: "uppercase" }}>
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
            <ul style={{ margin: "5px 0 0 0", paddingLeft: "18px", fontSize: "11px" }}>
              {exp.bullets.map((b, bi) => (
                <li key={bi} style={{ marginBottom: "4px", lineHeight: "1.4" }}><E value={b} onChange={() => {}} /></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "10px", textTransform: "uppercase" }}>
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
        <h3 style={{ fontSize: "13px", fontWeight: "900", borderBottom: `1px solid ${divider}`, paddingBottom: "2px", marginBottom: "8px", textTransform: "uppercase" }}>
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

export default ProjectManagerTemplate;