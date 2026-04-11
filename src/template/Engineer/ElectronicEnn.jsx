import React, { useState, useRef } from "react";
import EditableSpan from "../../component/page/Editablespan";

const E = (p) => <EditableSpan {...p} />;

// Clean Monochrome Palette
const black      = "#000000";
const darkGray   = "#334155";
const borderCol  = "#e2e8f0"; // Very light divider lines

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
      
      {/* HEADER - CLEAN & BOLD */}
      <div style={{ padding: "12mm 15mm 8mm", borderBottom: `2px solid ${black}` }}>
        <E value={name} onChange={(v) => u("name", v)} block style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "0.5px", textTransform: "uppercase" }} />
        <E value={title} onChange={(v) => u("title", v)} block style={{ fontSize: "14px", marginTop: "4px", fontWeight: "bold", textTransform: "uppercase", color: darkGray }} />
        
        <div style={{ display: "flex", gap: "20px", marginTop: "15px", fontSize: "11px", fontWeight: "500" }}>
          <span>📍 <E value={location} onChange={(v) => u("location", v)} /></span>
          <span>📞 <E value={phone} onChange={(v) => u("phone", v)} /></span>
          <span>📧 <E value={email} onChange={(v) => u("email", v)} /></span>
          <span>🔗 <E value={linkedin} onChange={(v) => u("linkedin", v)} /></span>
        </div>
      </div>

      <div style={{ padding: "8mm 15mm" }}>
        
        {/* SUMMARY SECTION */}
        <div style={{ marginBottom: "25px" }}>
          <div style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "8px", borderBottom: `1px solid ${black}`, paddingBottom: "2px" }}>
            <E value={summaryTitle} onChange={(v) => u("summaryTitle", v)} />
          </div>
          <E value={summary} onChange={(v) => u("summary", v)} block style={{ fontSize: "11px", lineHeight: "1.6", textAlign: "justify" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: "40px" }}>
          
          {/* LEFT: WORK EXPERIENCE */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "15px" }}>
              <E value={experienceTitle} onChange={(v) => u("experienceTitle", v)} />
            </div>
            {experience.map((exp, ei) => (
              <div key={ei} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "12px" }}>
                  <E value={exp.company} onChange={(v) => { /* Logic */ }} />
                  <E value={exp.period} onChange={(v) => { /* Logic */ }} />
                </div>
                {exp.roles.map((role, ri) => (
                  <div key={ri} style={{ marginTop: "4px" }}>
                    <E value={role.title} onChange={(v) => { /* Logic */ }} style={{ fontStyle: "italic", fontSize: "11px", fontWeight: "600", color: darkGray }} />
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

          {/* RIGHT: SKILLS, TOOLS & EDUCATION */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px", borderBottom: `1px solid ${borderCol}`, paddingBottom: "2px" }}>
              <E value={skillsTitle} onChange={(v) => u("skillsTitle", v)} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "25px" }}>
              {skills.map((s, i) => (
                <div key={i} style={{ fontSize: "11px", display: "flex", alignItems: "center" }}>
                   <span style={{ marginRight: "10px" }}>•</span>
                   <E value={s} onChange={(v) => { /* Logic */ }} />
                </div>
              ))}
            </div>

            <div style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px", borderBottom: `1px solid ${borderCol}`, paddingBottom: "2px" }}>
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

            <div style={{ fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "12px", borderBottom: `1px solid ${borderCol}`, paddingBottom: "2px" }}>
              <E value={eduTitle} onChange={(v) => u("eduTitle", v)} />
            </div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <E value={edu.degree} onChange={(v) => { /* Logic */ }} block style={{ fontWeight: "bold", fontSize: "11.5px" }} />
                <E value={edu.school} onChange={(v) => { /* Logic */ }} block style={{ fontSize: "11px", color: darkGray }} />
                <E value={edu.year} onChange={(v) => { /* Logic */ }} style={{ fontSize: "11px", fontWeight: "bold" }} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ElectronicEngineerSimpleTemplate;