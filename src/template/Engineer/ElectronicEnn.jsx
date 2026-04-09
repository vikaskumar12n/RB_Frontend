import React, { useState, useRef } from "react";
import EditableSpan from "../../page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Formal Monochrome Theme (Black & White)
const black      = "#000000";
const darkGray   = "#334155";
const lightGray  = "#64748b";
const borderCol  = "#000000";
const softBg     = "#f8fafc"; // Very light gray for subtle contrast

const getInitialData = () => ({
  name: "ELECTRONIC ENGINEER NAME",
  title: "Embedded Systems Engineer | Hardware Designer",
  location: "Bangalore, India",
  phone: "+91-88888-99999",
  email: "ee.expert@hardware.com",
  linkedin: "linkedin.com/in/electronic-pro",

  summaryTitle: "Technical Profile",
  experienceTitle: "Professional Experience",
  skillsTitle: "Core Technical Skills",
  toolsTitle: "Hardware & Software Tools",
  eduTitle: "Education",

  summary: `Innovative Electronic Engineer with 5+ years of experience in PCB design, circuit troubleshooting, and embedded systems development. Expert in microcontroller programming (C/C++) and FPGA architecture. Skilled in taking products from conceptual design to mass manufacturing.`,

  skills: [
    "PCB Design (Multilayer)", "Analog & Digital Circuits", "Embedded C/C++",
    "Signal Processing", "VLSI Design", "IoT Architecture", "Firmware Development"
  ],

  tools: [
    "Altium Designer", "Eagle PCB", "Proteus", "Keil uVision", "MATLAB"
  ],

  experience: [
    {
      company: "Bosch / Samsung Electronics",
      period: "2021 – Present",
      roles: [{
        title: "Senior Hardware Engineer",
        bullets: [
          "Designed and optimized 4-layer PCBs for automotive sensor modules.",
          "Implemented firmware for ARM Cortex-M microcontrollers, reducing power consumption by 20%.",
          "Conducted EMI/EMC testing and successfully achieved product certification.",
          "Collaborated with manufacturing teams to streamline SMT assembly processes."
        ],
      }],
    },
    {
      company: "Core Circuits Pvt Ltd.",
      period: "2018 – 2021",
      roles: [{
        title: "Junior Electronic Engineer",
        bullets: [
          "Performed component-level troubleshooting and repair of complex medical devices.",
          "Developed prototype circuits using Arduino and Raspberry Pi for internal R&D projects."
        ],
      }],
    },
  ],

  education: [{
    school: "Indian Institute of Technology (IIT)",
    year: "2018",
    degree: "B.E. in Electronics & Communication",
  }],
});

const ElectronicEngineerSimpleTemplate = ({ data: propData, setData: setPropData }) => {
  const [data, setDS] = useState(() => ({ ...getInitialData(), ...(propData || {}) }));
  const ref = useRef(data);

  const setData = (d) => { setDS(d); ref.current = d; if (setPropData) setPropData(d); };
  const u = (f, v) => setData({ ...ref.current, [f]: v });

  const { name, title, location, phone, email, linkedin, summaryTitle, experienceTitle, skillsTitle, toolsTitle, eduTitle, summary, skills, tools, experience, education } = data;

  return (
    <div id="resume" style={{ width: "210mm", minHeight: "297mm", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", color: black, boxSizing: "border-box" }}>
      
      {/* HEADER WITH CIRCUIT STYLE BORDER */}
      <div style={{ display: "flex", borderBottom: `4px solid ${black}` }}>
        <div style={{ padding: "12mm 15mm", width: "70%", position: "relative", overflow: "hidden" }}>
          {/* Subtle geometric element for design flow */}
          <div style={{ position: "absolute", top: "-10px", right: "-10px", width: "100px", height: "100px", border: `1px solid ${black}`, opacity: "0.1", borderRadius: "50%" }} />
          
          <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "0.5px", textTransform: "uppercase" }} />
          <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "13px", marginTop: "5px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }} />
        </div>
        <div style={{ background: softBg, padding: "12mm 10mm", width: "30%", fontSize: "10px", borderLeft: `1px solid ${borderCol}` }}>
          <div style={{ marginBottom: "4px" }}>📍 <E value={location} onChange={(v) => u("location", v)} /></div>
          <div style={{ marginBottom: "4px" }}>📞 <E value={phone} onChange={(v) => u("phone", v)} /></div>
          <div style={{ marginBottom: "4px" }}>📧 <E value={email} onChange={(v) => u("email", v)} /></div>
          <div style={{ fontWeight: "bold" }}>🔗 <E value={linkedin} onChange={(v) => u("linkedin", v)} /></div>
        </div>
      </div>

      <div style={{ padding: "8mm 15mm" }}>
        
        {/* SUMMARY SECTION */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{ width: "10px", height: "10px", backgroundColor: black }} />
            <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" }}>
              <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
            </div>
            <div style={{ flexGrow: 1, height: "1px", backgroundColor: borderCol }} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: "25px" }}>
          
          {/* LEFT: WORK EXPERIENCE */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "18px", borderLeft: `1.5px solid ${black}`, paddingLeft: "15px", position: "relative" }}>
                <div style={{ position: "absolute", left: "-6px", top: "0", width: "10px", height: "10px", borderRadius: "50%", background: black }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "11px" }}>
                  <E value={exp.company} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, company: v } : e); u("experience", a); }} />
                  <E value={exp.period} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, period: v } : e); u("experience", a); }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri}>
                    <E value={role.title} onChange={(v) => { const a = ref.current.experience.map((e, i) => i === ei ? { ...e, roles: e.roles.map((r, j) => j === ri ? { ...r, title: v } : r) } : e); u("experience", a); }} style={{ fontStyle: "italic", fontSize: "10.5px", fontWeight: "600", marginBottom: "5px", display: "block" }} />
                    <ul style={{ margin: "0", paddingLeft: "15px", listStyleType: "square" }}>
                      {role.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: "10.5px", marginBottom: "4px" }}>
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
            <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "10px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "20px" }}>
              {skills.map((s, i) => (
                <span key={i} style={{ background: "#fff", border: `1px solid ${black}`, padding: "2px 8px", fontSize: "9px", borderRadius: "2px", fontWeight: "600" }}>
                  <E value={s} onChange={(v) => { const a = ref.current.skills.map((item, j) => j === i ? v : item); u("skills", a); }} />
                </span>
              ))}
            </div>

            <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "10px" }}>
              <E value={toolsTitle} onChange={(v) => u("toolsTitle", v)} />
            </div>
            <div style={{ border: `1px solid ${borderCol}`, padding: "10px", marginBottom: "20px" }}>
              {tools.map((tool, i) => (
                <div key={i} style={{ fontSize: "10px", marginBottom: "5px", display: "flex", justifyContent: "space-between", borderBottom: `1px dashed ${lightGray}` }}>
                  <E value={tool} onChange={(v) => { const a = ref.current.tools.map((t, j) => j === i ? v : t); u("tools", a); }} />
                  <span>[|]</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "10px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ paddingLeft: "5px", marginBottom: "10px" }}>
                <E value={edu.degree} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, degree: v } : e); u("education", a); }} block style={{ fontWeight: "bold", fontSize: "10.5px" }} />
                <E value={edu.school} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, school: v } : e); u("education", a); }} block style={{ fontSize: "9.5px" }} />
                <E value={edu.year} onChange={(v) => { const a = ref.current.education.map((e, j) => j === i ? { ...e, year: v } : e); u("education", a); }} style={{ fontSize: "9.5px", fontWeight: "bold" }} />
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default ElectronicEngineerSimpleTemplate;