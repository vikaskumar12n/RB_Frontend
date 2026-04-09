import { useState } from "react";
import React from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const initialData = {
    personalInfo: {
        name: "Full Name", title: "Full Stack Developer (MERN)",
        email: "XYZ@gmail.com", phone: "+91-1234567890",
        location: "lucknow, Uttar Pradesh, India",
        linkedin: "https://linkedin.com/in/",
        github: "https://github.com/",
        portfolio: "https://heloo.tech",
    },
    objective: "Passionate and detail-oriented Full Stack Developer with strong experience in MERN stack development. Skilled in building scalable web applications, REST APIs, and responsive UI. Seeking an opportunity to contribute technical expertise, improve system performance, and grow in a dynamic development environment.",
    skills: {
        frontend: ["React.js", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"],
        backend: ["Node.js", "Express.js"],
        database: ["MongoDB", "SQL"],
        tools: ["Git", "GitHub", "Postman", "VS Code"],
        other: ["REST API", "JWT Authentication", "MVC Architecture"],
    },
    education: [
        { degree: "B.Tech in Computer Science", college: "Mars Institute Of Technology, india", year: "2024–2027", description: "Focus on software development, data structures, and web technologies." },
        { degree: "Diploma in Computer Science", college: "Collage Name", year: "2021–2024", description: "Strong foundation in programming, database management, and networking." },
    ],
    experience: [
        { role: "Trainee Software Developer", company: "tech Technology Pvt. Ltd.", duration: "July 2023 – Sep 2023", description: "Full stack web development using MERN stack.", responsibilities: ["Developed responsive web pages using HTML, CSS, JS", "Built REST APIs using Node.js and Express.js", "Worked with MongoDB for database operations", "Collaborated with team to debug and optimize code"] },
    ],
    projects: [
        { title: "Recruiter-X (Job Portal)", description: "Full-stack job portal where users can search and apply for jobs.", technologies: ["React.js", "Node.js", "Express.js", "MongoDB"], features: ["JWT Authentication", "Job posting & application system", "Admin dashboard"], link: "https://github.com/vikas-bind/recruiter-x" },
        { title: "10minZepto (E-commerce)", description: "E-commerce platform optimized for fast product browsing and ordering.", technologies: ["HTML", "CSS", "JavaScript", "Django"], features: ["Fast loading pages", "SMS API integration", "Cart & checkout"], link: "" },
        { title: "Resume Builder SaaS", description: "SaaS-based resume builder with PDF generation and cloud storage.", technologies: ["React.js", "Node.js", "AWS S3", "Puppeteer"], features: ["Multi-step form", "Live preview", "PDF download", "AWS S3 storage"], link: "" },
    ],
    certifications: [
        { title: "Python with Django Training", organization: "tech Technology Pvt. Ltd.", year: "2023" },
        { title: "Best Performance Award", organization: "tech Technology Pvt. Ltd.", year: "2023" },
    ],
    achievements: ["Successfully built multiple full-stack applications", "Received Best Performance Award during training", "Completed real-world projects using MERN stack"],
    strengths: ["Strong problem-solving skills", "Quick learner and adaptable", "Good communication and teamwork", "Time management and leadership skills"],
    hobbies: ["Coding and exploring new technologies", "Reading tech blogs", "Playing cricket"],
};

const API_URL = "http://localhost:3000/api/resume/save";

// ─── THEMES ──────────────────────────────────────────────────────────────────
const THEMES = {
    teal:   { name: "Teal",   accent: "#0d9488", light: "#f0fdfa", mid: "#99f6e4", dark: "#0f766e", border: "#5eead4", text: "#134e4a" },
    indigo: { name: "Indigo", accent: "#4f46e5", light: "#eef2ff", mid: "#a5b4fc", dark: "#4338ca", border: "#818cf8", text: "#1e1b4b" },
    rose:   { name: "Rose",   accent: "#e11d48", light: "#fff1f2", mid: "#fda4af", dark: "#be123c", border: "#fb7185", text: "#4c0519" },
    amber:  { name: "Amber",  accent: "#d97706", light: "#fffbeb", mid: "#fcd34d", dark: "#b45309", border: "#fbbf24", text: "#451a03" },
    slate:  { name: "Slate",  accent: "#475569", light: "#f8fafc", mid: "#cbd5e1", dark: "#334155", border: "#94a3b8", text: "#0f172a" },
};

const LAYOUTS = {
    classic:  { name: "Classic",  desc: "Single column, traditional" },
    sidebar:  { name: "Sidebar",  desc: "2-column with sidebar" },
    minimal:  { name: "Minimal",  desc: "Clean whitespace heavy" },
    creative: { name: "Creative", desc: "Colored header + sidebar" },
};

const SKILL_CATS = ["frontend", "backend", "database", "tools", "other"];

// ─── STEPS CONFIG ─────────────────────────────────────────────────────────────
const STEPS = [
    { id: "personal",        label: "Personal",       icon: "" },
    { id: "objective",       label: "Objective",      icon: "" },
    { id: "skills",          label: "Skills",         icon: "" },
    { id: "education",       label: "Education",      icon: "" },
    { id: "experience",      label: "Experience",     icon: "" },
    { id: "projects",        label: "Projects",       icon: "" },
    { id: "certifications",  label: "Certifications", icon: "" },
    { id: "extra",           label: "Extra Info",     icon: "" },
];

// ─── TEMPLATES ───────────────────────────────────────────────────────────────
function ClassicTemplate({ data: d, theme: t }) {
    const p = d.personalInfo;
    return (
        <div style={{ fontFamily: "'Georgia', serif", fontSize: 13, color: "#1e293b" }} className="bg-white p-10 min-h-[1050px]">
            <div style={{ borderBottom: `3px solid ${t.accent}`, paddingBottom: 16, marginBottom: 20 }}>
                <h1 style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", color: "#0f172a" }}>{p.name}</h1>
                {p.title && <p style={{ color: t.accent, fontWeight: 700, fontSize: 14, marginTop: 4 }}>{p.title}</p>}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0 20px", marginTop: 8, fontSize: 11, color: "#64748b" }}>
                    {p.email && <span>✉ {p.email}</span>}{p.phone && <span>📞 {p.phone}</span>}
                    {p.location && <span>📍 {p.location}</span>}{p.linkedin && <span>🔗 {p.linkedin}</span>}
                    {p.github && <span>💻 {p.github}</span>}{p.portfolio && <span>🌐 {p.portfolio}</span>}
                </div>
            </div>
            {d.objective && <CSec title="Objective" t={t}><p style={{ color: "#334155", lineHeight: 1.7 }}>{d.objective}</p></CSec>}
            {SKILL_CATS.some(c => d.skills[c]?.length > 0) && (
                <CSec title="Technical Skills" t={t}>
                    {SKILL_CATS.filter(c => d.skills[c]?.length > 0).map(c => (
                        <div key={c} style={{ display: "flex", gap: 8, marginBottom: 4, fontSize: 12 }}>
                            <span style={{ fontWeight: 700, color: "#475569", minWidth: 70, textTransform: "capitalize" }}>{c}:</span>
                            <span style={{ color: "#334155" }}>{d.skills[c].join(", ")}</span>
                        </div>
                    ))}
                </CSec>
            )}
            {d.education?.some(e => e.college) && (
                <CSec title="Education" t={t}>
                    {d.education.filter(e => e.college).map((ed, i) => (
                        <div key={i} style={{ marginBottom: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div><p style={{ fontWeight: 700 }}>{ed.degree}</p><p style={{ color: "#64748b", fontSize: 11 }}>{ed.college}</p></div>
                                <p style={{ color: "#94a3b8", fontSize: 11 }}>{ed.year}</p>
                            </div>
                            {ed.description && <p style={{ color: "#64748b", fontSize: 11, fontStyle: "italic", marginTop: 2 }}>{ed.description}</p>}
                        </div>
                    ))}
                </CSec>
            )}
            {d.experience?.some(e => e.company) && (
                <CSec title="Experience" t={t}>
                    {d.experience.filter(e => e.company).map((ex, i) => (
                        <div key={i} style={{ marginBottom: 12 }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div><p style={{ fontWeight: 700 }}>{ex.role}</p><p style={{ color: t.accent, fontWeight: 600, fontSize: 11 }}>{ex.company}</p></div>
                                <p style={{ color: "#94a3b8", fontSize: 11 }}>{ex.duration}</p>
                            </div>
                            {ex.description && <p style={{ color: "#475569", fontSize: 11, marginTop: 4 }}>{ex.description}</p>}
                            {ex.responsibilities?.length > 0 && <ul style={{ marginTop: 4, paddingLeft: 16, fontSize: 11, color: "#475569" }}>{ex.responsibilities.map((r, j) => <li key={j} style={{ marginBottom: 2 }}>{r}</li>)}</ul>}
                        </div>
                    ))}
                </CSec>
            )}
            {d.projects?.some(p => p.title) && (
                <CSec title="Projects" t={t}>
                    {d.projects.filter(p => p.title).map((pr, i) => (
                        <div key={i} style={{ marginBottom: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontWeight: 700 }}>{pr.title}</p>
                                {pr.link && <a href={pr.link} style={{ color: t.accent, fontSize: 10 }}>{pr.link}</a>}
                            </div>
                            {pr.technologies?.length > 0 && <p style={{ fontSize: 10, color: "#94a3b8", fontStyle: "italic" }}>{pr.technologies.join(", ")}</p>}
                            {pr.description && <p style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{pr.description}</p>}
                            {pr.features?.length > 0 && <ul style={{ paddingLeft: 16, fontSize: 11, color: "#64748b", marginTop: 2 }}>{pr.features.map((f, j) => <li key={j}>{f}</li>)}</ul>}
                        </div>
                    ))}
                </CSec>
            )}
            {d.certifications?.some(c => c.title) && (
                <CSec title="Certifications" t={t}>
                    {d.certifications.filter(c => c.title).map((cert, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                            <span style={{ fontWeight: 600 }}>{cert.title} <span style={{ fontWeight: 400, color: "#64748b" }}>— {cert.organization}</span></span>
                            <span style={{ color: "#94a3b8" }}>{cert.year}</span>
                        </div>
                    ))}
                </CSec>
            )}
            {(d.achievements?.length > 0 || d.strengths?.length > 0 || d.hobbies?.length > 0) && (
                <CSec title="Additional Information" t={t}>
                    {d.achievements?.length > 0 && <><SubHead label="Achievements" /><ul style={{ paddingLeft: 16, fontSize: 11, color: "#475569", marginBottom: 6 }}>{d.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul></>}
                    {d.strengths?.length > 0 && <><SubHead label="Strengths" /><p style={{ fontSize: 11, color: "#475569", marginBottom: 6 }}>{d.strengths.join(" • ")}</p></>}
                    {d.hobbies?.length > 0 && <><SubHead label="Hobbies" /><p style={{ fontSize: 11, color: "#475569" }}>{d.hobbies.join(" • ")}</p></>}
                </CSec>
            )}
        </div>
    );
}
function CSec({ title, t, children }) {
    return (
        <div style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.18em", color: t.accent, borderBottom: `1px solid ${t.border}`, paddingBottom: 4, marginBottom: 8 }}>{title}</h2>
            {children}
        </div>
    );
}
function SubHead({ label }) {
    return <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#94a3b8", marginBottom: 3 }}>{label}</p>;
}

function SidebarTemplate({ data: d, theme: t }) {
    const p = d.personalInfo;
    return (
        <div style={{ fontFamily: "'Georgia', serif", fontSize: 12, display: "flex", minHeight: 1050 }} className="bg-white">
            <div style={{ width: 210, background: t.light, borderRight: `3px solid ${t.border}`, padding: "28px 18px", flexShrink: 0 }}>
                <div style={{ marginBottom: 20 }}>
                    <h1 style={{ fontSize: 20, fontWeight: 900, color: t.text, lineHeight: 1.2 }}>{p.name}</h1>
                    {p.title && <p style={{ fontSize: 11, color: t.accent, fontWeight: 700, marginTop: 4 }}>{p.title}</p>}
                </div>
                <div style={{ fontSize: 10, color: "#475569", marginBottom: 20, lineHeight: 2 }}>
                    {p.email && <div>✉ {p.email}</div>}{p.phone && <div>📞 {p.phone}</div>}
                    {p.location && <div>📍 {p.location}</div>}{p.linkedin && <div style={{ wordBreak: "break-all" }}>🔗 {p.linkedin}</div>}
                    {p.github && <div style={{ wordBreak: "break-all" }}>💻 {p.github}</div>}
                    {p.portfolio && <div style={{ wordBreak: "break-all" }}>🌐 {p.portfolio}</div>}
                </div>
                {SKILL_CATS.some(c => d.skills[c]?.length > 0) && (
                    <div style={{ marginBottom: 20 }}>
                        <SSHead label="Skills" t={t} />
                        {SKILL_CATS.filter(c => d.skills[c]?.length > 0).map(c => (
                            <div key={c} style={{ marginBottom: 8 }}>
                                <p style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: t.dark, marginBottom: 3 }}>{c}</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                                    {d.skills[c].map((s, i) => <span key={i} style={{ background: t.border, color: t.text, fontSize: 9, padding: "2px 7px", borderRadius: 999, fontWeight: 600 }}>{s}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {d.certifications?.some(c => c.title) && (
                    <div style={{ marginBottom: 16 }}>
                        <SSHead label="Certifications" t={t} />
                        {d.certifications.filter(c => c.title).map((cert, i) => (
                            <div key={i} style={{ marginBottom: 6 }}>
                                <p style={{ fontSize: 10, fontWeight: 700, color: t.text }}>{cert.title}</p>
                                <p style={{ fontSize: 9, color: "#64748b" }}>{cert.organization} · {cert.year}</p>
                            </div>
                        ))}
                    </div>
                )}
                {d.strengths?.length > 0 && <div style={{ marginBottom: 16 }}><SSHead label="Strengths" t={t} />{d.strengths.map((s, i) => <p key={i} style={{ fontSize: 10, color: "#475569", marginBottom: 2 }}>· {s}</p>)}</div>}
                {d.hobbies?.length > 0 && <div><SSHead label="Hobbies" t={t} />{d.hobbies.map((s, i) => <p key={i} style={{ fontSize: 10, color: "#475569", marginBottom: 2 }}>· {s}</p>)}</div>}
            </div>
            <div style={{ flex: 1, padding: "28px 24px" }}>
                {d.objective && <MSec title="Objective" t={t}><p style={{ color: "#334155", lineHeight: 1.7, fontSize: 12 }}>{d.objective}</p></MSec>}
                {d.education?.some(e => e.college) && (
                    <MSec title="Education" t={t}>
                        {d.education.filter(e => e.college).map((ed, i) => (
                            <div key={i} style={{ marginBottom: 10 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div><p style={{ fontWeight: 700, fontSize: 12 }}>{ed.degree}</p><p style={{ color: "#64748b", fontSize: 10 }}>{ed.college}</p></div>
                                    <p style={{ color: "#94a3b8", fontSize: 10 }}>{ed.year}</p>
                                </div>
                            </div>
                        ))}
                    </MSec>
                )}
                {d.experience?.some(e => e.company) && (
                    <MSec title="Experience" t={t}>
                        {d.experience.filter(e => e.company).map((ex, i) => (
                            <div key={i} style={{ marginBottom: 14 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div><p style={{ fontWeight: 700, fontSize: 12 }}>{ex.role}</p><p style={{ color: t.accent, fontWeight: 600, fontSize: 10 }}>{ex.company}</p></div>
                                    <p style={{ color: "#94a3b8", fontSize: 10 }}>{ex.duration}</p>
                                </div>
                                {ex.responsibilities?.length > 0 && <ul style={{ marginTop: 6, paddingLeft: 14, fontSize: 11, color: "#475569" }}>{ex.responsibilities.map((r, j) => <li key={j} style={{ marginBottom: 2 }}>{r}</li>)}</ul>}
                            </div>
                        ))}
                    </MSec>
                )}
                {d.projects?.some(p => p.title) && (
                    <MSec title="Projects" t={t}>
                        {d.projects.filter(p => p.title).map((pr, i) => (
                            <div key={i} style={{ marginBottom: 10 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p style={{ fontWeight: 700, fontSize: 12 }}>{pr.title}</p>
                                    {pr.link && <a href={pr.link} style={{ color: t.accent, fontSize: 9 }}>{pr.link}</a>}
                                </div>
                                {pr.technologies?.length > 0 && <p style={{ fontSize: 9, color: "#94a3b8", fontStyle: "italic" }}>{pr.technologies.join(", ")}</p>}
                                {pr.description && <p style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{pr.description}</p>}
                            </div>
                        ))}
                    </MSec>
                )}
                {d.achievements?.length > 0 && <MSec title="Achievements" t={t}><ul style={{ paddingLeft: 14, fontSize: 11, color: "#475569" }}>{d.achievements.map((a, i) => <li key={i} style={{ marginBottom: 3 }}>{a}</li>)}</ul></MSec>}
            </div>
        </div>
    );
}
function SSHead({ label, t }) {
    return <p style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.16em", color: t.dark, borderBottom: `1px solid ${t.border}`, paddingBottom: 3, marginBottom: 8 }}>{label}</p>;
}
function MSec({ title, t, children }) {
    return (
        <div style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.16em", color: t.accent, borderBottom: `1px solid ${t.border}`, paddingBottom: 3, marginBottom: 8 }}>{title}</h2>
            {children}
        </div>
    );
}

function MinimalTemplate({ data: d, theme: t }) {
    const p = d.personalInfo;
    return (
        <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: "#1e293b", background: "white", padding: "48px 56px", minHeight: 1050 }}>
            <div style={{ marginBottom: 36 }}>
                <h1 style={{ fontSize: 36, fontWeight: 300, letterSpacing: "-0.03em", color: "#0f172a" }}>{p.name}</h1>
                {p.title && <p style={{ fontSize: 13, color: t.accent, fontWeight: 500, marginTop: 4, letterSpacing: "0.04em" }}>{p.title}</p>}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0 24px", marginTop: 12, fontSize: 11, color: "#94a3b8" }}>
                    {p.email && <span>{p.email}</span>}{p.phone && <span>{p.phone}</span>}{p.location && <span>{p.location}</span>}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0 24px", marginTop: 4, fontSize: 10, color: "#cbd5e1" }}>
                    {p.linkedin && <span>{p.linkedin}</span>}{p.github && <span>{p.github}</span>}{p.portfolio && <span>{p.portfolio}</span>}
                </div>
            </div>
            {d.objective && <MinSec title="About" t={t}><p style={{ color: "#475569", lineHeight: 1.8, maxWidth: 560 }}>{d.objective}</p></MinSec>}
            {SKILL_CATS.some(c => d.skills[c]?.length > 0) && (
                <MinSec title="Skills" t={t}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {SKILL_CATS.flatMap(c => d.skills[c] || []).map((s, i) => (
                            <span key={i} style={{ border: `1px solid ${t.border}`, color: t.text, fontSize: 10, padding: "3px 10px", borderRadius: 4, fontWeight: 500 }}>{s}</span>
                        ))}
                    </div>
                </MinSec>
            )}
            {d.education?.some(e => e.college) && (
                <MinSec title="Education" t={t}>
                    {d.education.filter(e => e.college).map((ed, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                            <div><p style={{ fontWeight: 600 }}>{ed.degree}</p><p style={{ color: "#94a3b8", fontSize: 11 }}>{ed.college}</p></div>
                            <p style={{ color: "#cbd5e1", fontSize: 11 }}>{ed.year}</p>
                        </div>
                    ))}
                </MinSec>
            )}
            {d.experience?.some(e => e.company) && (
                <MinSec title="Experience" t={t}>
                    {d.experience.filter(e => e.company).map((ex, i) => (
                        <div key={i} style={{ marginBottom: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontWeight: 600 }}>{ex.role} <span style={{ color: t.accent, fontWeight: 500 }}>@ {ex.company}</span></p>
                                <p style={{ color: "#94a3b8", fontSize: 11 }}>{ex.duration}</p>
                            </div>
                            {ex.responsibilities?.length > 0 && <ul style={{ marginTop: 6, paddingLeft: 14, color: "#64748b", fontSize: 11 }}>{ex.responsibilities.map((r, j) => <li key={j} style={{ marginBottom: 2 }}>{r}</li>)}</ul>}
                        </div>
                    ))}
                </MinSec>
            )}
            {d.projects?.some(p => p.title) && (
                <MinSec title="Projects" t={t}>
                    {d.projects.filter(p => p.title).map((pr, i) => (
                        <div key={i} style={{ marginBottom: 12 }}>
                            <p style={{ fontWeight: 600 }}>{pr.title} {pr.link && <a href={pr.link} style={{ color: t.accent, fontSize: 10, fontWeight: 400 }}>↗ {pr.link}</a>}</p>
                            {pr.technologies?.length > 0 && <p style={{ fontSize: 10, color: "#94a3b8" }}>{pr.technologies.join("  ·  ")}</p>}
                            {pr.description && <p style={{ color: "#64748b", fontSize: 11, marginTop: 3 }}>{pr.description}</p>}
                        </div>
                    ))}
                </MinSec>
            )}
            {d.certifications?.some(c => c.title) && (
                <MinSec title="Certifications" t={t}>
                    {d.certifications.filter(c => c.title).map((cert, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                            <span>{cert.title} <span style={{ color: "#94a3b8" }}>· {cert.organization}</span></span>
                            <span style={{ color: "#cbd5e1" }}>{cert.year}</span>
                        </div>
                    ))}
                </MinSec>
            )}
        </div>
    );
}
function MinSec({ title, t, children }) {
    return (
        <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: t.accent, marginBottom: 12 }}>{title}</p>
            {children}
        </div>
    );
}

function CreativeTemplate({ data: d, theme: t }) {
    const p = d.personalInfo;
    return (
        <div style={{ fontFamily: "'Georgia', serif", fontSize: 12, minHeight: 1050 }} className="bg-white">
            <div style={{ background: `linear-gradient(135deg, ${t.accent} 0%, ${t.dark} 100%)`, padding: "32px 36px 28px", color: "white" }}>
                <h1 style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.02em" }}>{p.name}</h1>
                {p.title && <p style={{ fontSize: 14, fontWeight: 500, opacity: 0.9, marginTop: 4 }}>{p.title}</p>}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0 20px", marginTop: 12, fontSize: 10, opacity: 0.8 }}>
                    {p.email && <span>✉ {p.email}</span>}{p.phone && <span>📞 {p.phone}</span>}
                    {p.location && <span>📍 {p.location}</span>}{p.linkedin && <span>🔗 {p.linkedin}</span>}
                    {p.github && <span>💻 {p.github}</span>}{p.portfolio && <span>🌐 {p.portfolio}</span>}
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ width: 8, background: t.mid, flexShrink: 0 }} />
                <div style={{ flex: 1, padding: "24px 32px" }}>
                    {d.objective && <CrSec title="Objective" t={t}><p style={{ color: "#334155", lineHeight: 1.75 }}>{d.objective}</p></CrSec>}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
                        <div>
                            {d.education?.some(e => e.college) && (
                                <CrSec title="Education" t={t}>
                                    {d.education.filter(e => e.college).map((ed, i) => (
                                        <div key={i} style={{ marginBottom: 10 }}>
                                            <p style={{ fontWeight: 700, fontSize: 12 }}>{ed.degree}</p>
                                            <p style={{ color: "#64748b", fontSize: 10 }}>{ed.college}</p>
                                            <p style={{ color: t.accent, fontSize: 10 }}>{ed.year}</p>
                                        </div>
                                    ))}
                                </CrSec>
                            )}
                            {SKILL_CATS.some(c => d.skills[c]?.length > 0) && (
                                <CrSec title="Skills" t={t}>
                                    {SKILL_CATS.filter(c => d.skills[c]?.length > 0).map(c => (
                                        <div key={c} style={{ marginBottom: 8 }}>
                                            <p style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: t.dark, marginBottom: 4 }}>{c}</p>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                                                {d.skills[c].map((s, i) => <span key={i} style={{ background: t.light, border: `1px solid ${t.border}`, color: t.text, fontSize: 9, padding: "2px 8px", borderRadius: 999 }}>{s}</span>)}
                                            </div>
                                        </div>
                                    ))}
                                </CrSec>
                            )}
                            {d.certifications?.some(c => c.title) && (
                                <CrSec title="Certifications" t={t}>
                                    {d.certifications.filter(c => c.title).map((cert, i) => (
                                        <div key={i} style={{ marginBottom: 6 }}>
                                            <p style={{ fontWeight: 700, fontSize: 11 }}>{cert.title}</p>
                                            <p style={{ color: "#64748b", fontSize: 10 }}>{cert.organization} · {cert.year}</p>
                                        </div>
                                    ))}
                                </CrSec>
                            )}
                            {d.strengths?.length > 0 && <CrSec title="Strengths" t={t}>{d.strengths.map((s, i) => <p key={i} style={{ fontSize: 11, color: "#475569", marginBottom: 2 }}>▸ {s}</p>)}</CrSec>}
                            {d.hobbies?.length > 0 && <CrSec title="Hobbies" t={t}><p style={{ fontSize: 11, color: "#475569" }}>{d.hobbies.join(" · ")}</p></CrSec>}
                        </div>
                        <div>
                            {d.experience?.some(e => e.company) && (
                                <CrSec title="Experience" t={t}>
                                    {d.experience.filter(e => e.company).map((ex, i) => (
                                        <div key={i} style={{ marginBottom: 14 }}>
                                            <p style={{ fontWeight: 700, fontSize: 12 }}>{ex.role}</p>
                                            <p style={{ color: t.accent, fontWeight: 600, fontSize: 10 }}>{ex.company} · {ex.duration}</p>
                                            {ex.responsibilities?.length > 0 && <ul style={{ marginTop: 5, paddingLeft: 14, fontSize: 11, color: "#475569" }}>{ex.responsibilities.map((r, j) => <li key={j} style={{ marginBottom: 2 }}>{r}</li>)}</ul>}
                                        </div>
                                    ))}
                                </CrSec>
                            )}
                            {d.projects?.some(p => p.title) && (
                                <CrSec title="Projects" t={t}>
                                    {d.projects.filter(p => p.title).map((pr, i) => (
                                        <div key={i} style={{ marginBottom: 10 }}>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <p style={{ fontWeight: 700, fontSize: 12 }}>{pr.title}</p>
                                                {pr.link && <a href={pr.link} style={{ color: t.accent, fontSize: 9 }}>↗</a>}
                                            </div>
                                            {pr.technologies?.length > 0 && <p style={{ fontSize: 9, color: "#94a3b8", fontStyle: "italic" }}>{pr.technologies.join(", ")}</p>}
                                            {pr.description && <p style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{pr.description}</p>}
                                        </div>
                                    ))}
                                </CrSec>
                            )}
                            {d.achievements?.length > 0 && <CrSec title="Achievements" t={t}><ul style={{ paddingLeft: 14, fontSize: 11, color: "#475569" }}>{d.achievements.map((a, i) => <li key={i} style={{ marginBottom: 3 }}>{a}</li>)}</ul></CrSec>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
function CrSec({ title, t, children }) {
    return (
        <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ width: 3, height: 14, background: t.accent, borderRadius: 2, display: "inline-block" }} />
                <h2 style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.16em", color: t.dark }}>{title}</h2>
            </div>
            {children}
        </div>
    );
}

const TEMPLATE_MAP = {
    classic: ClassicTemplate,
    sidebar: SidebarTemplate,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
};

// ─── FORM HELPERS ─────────────────────────────────────────────────────────────
const FField = ({ label, value, onChange, type = "text", span2 }) => (
    <div className={span2 ? "col-span-2" : ""}>
        <label className="block text-[12px] font-extrabold uppercase tracking-widest text-black mb-1">{label}</label>
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition" />
    </div>
);
const FArea = ({ label, value, onChange, rows = 3 }) => (
    <div className="col-span-2">
        {label && <label className="block text-[12px] font-extrabold uppercase tracking-widest text-black mb-1">{label}</label>}
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows}
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition resize-none" />
    </div>
);
function TagInput({ items, onAdd, onRemove }) {
    const [v, setV] = useState("");
    const commit = () => { if (v.trim()) { onAdd(v.trim()); setV(""); } };
    return (
        <div className="flex flex-wrap gap-1.5 items-center p-2 border border-slate-200 rounded-xl min-h-[42px] bg-white focus-within:ring-2 focus-within:ring-indigo-300">
            {items.map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {t}<button onClick={() => onRemove(i)} className="text-indigo-300 hover:text-red-500 text-sm font-black">×</button>
                </span>
            ))}
            <input value={v} onChange={e => setV(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); commit(); } }}
                placeholder="Type & Enter" className="flex-1 min-w-[90px] outline-none text-xs text-slate-500 bg-transparent" />
        </div>
    );
}
const AddBtn = ({ label, onClick }) => (
    <button onClick={onClick} className="w-full mt-3 py-2 border-2 border-dashed border-indigo-200 text-indigo-400 rounded-xl hover:bg-indigo-50 text-xs font-extrabold transition">+ {label}</button>
);
const DelBtn = ({ onClick }) => (
    <button onClick={onClick} className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 text-sm font-black flex items-center justify-center transition">×</button>
);

// ─── STEP PANELS ──────────────────────────────────────────────────────────────
function StepPersonal({ data, setPI }) {
    return (
        <div className="grid grid-cols-2 gap-3">
            <FField label="Full Name"           value={data.personalInfo.name}      onChange={setPI("name")} />
            <FField label="Professional Title"  value={data.personalInfo.title}     onChange={setPI("title")} />
            <FField label="Email"               value={data.personalInfo.email}     onChange={setPI("email")} type="email" />
            <FField label="Phone"               value={data.personalInfo.phone}     onChange={setPI("phone")} />
            <FField label="Location"            value={data.personalInfo.location}  onChange={setPI("location")} span2 />
            <FField label="LinkedIn"            value={data.personalInfo.linkedin}  onChange={setPI("linkedin")} />
            <FField label="GitHub"              value={data.personalInfo.github}    onChange={setPI("github")} />
            <FField label="Portfolio"           value={data.personalInfo.portfolio} onChange={setPI("portfolio")} span2 />
        </div>
    );
}

function StepObjective({ data, setData }) {
    return (
        <div className="grid grid-cols-2">
            <FArea value={data.objective} onChange={v => setData(d => ({ ...d, objective: v }))} rows={5} />
        </div>
    );
}

function StepSkills({ data, setSkill }) {
    return (
        <div className="flex flex-col gap-4">
            {SKILL_CATS.map(cat => (
                <div key={cat}>
                    <label className="block text-[12px] font-extrabold uppercase tracking-widest text-black mb-1 capitalize">{cat}</label>
                    <TagInput
                        items={data.skills[cat] || []}
                        onAdd={v => setSkill(cat)([...(data.skills[cat] || []), v])}
                        onRemove={i => setSkill(cat)((data.skills[cat] || []).filter((_, j) => j !== i))}
                    />
                </div>
            ))}
        </div>
    );
}

function StepEducation({ data, updList, delItem, addItem }) {
    return (
        <>
            {data.education.map((ed, i) => (
                <div key={i} className="relative bg-slate-50 border border-slate-100 rounded-xl p-4 mb-3">
                    <DelBtn onClick={() => delItem("education", i)} />
                    <div className="grid grid-cols-2 gap-3">
                        <FField label="Degree"      value={ed.degree}      onChange={v => updList("education", i, "degree", v)} span2 />
                        <FField label="College"     value={ed.college}     onChange={v => updList("education", i, "college", v)} span2 />
                        <FField label="Year"        value={ed.year}        onChange={v => updList("education", i, "year", v)} />
                        <FArea  label="Description" value={ed.description} onChange={v => updList("education", i, "description", v)} rows={2} />
                    </div>
                </div>
            ))}
            <AddBtn label="Add Education" onClick={() => addItem("education", { degree: "", college: "", year: "", description: "" })} />
        </>
    );
}

function StepExperience({ data, updList, updInner, delInner, delItem, addItem }) {
    return (
        <>
            {data.experience.map((ex, i) => (
                <div key={i} className="relative bg-slate-50 border border-slate-100 rounded-xl p-4 mb-3">
                    <DelBtn onClick={() => delItem("experience", i)} />
                    <div className="grid grid-cols-2 gap-3">
                        <FField label="Role"        value={ex.role}        onChange={v => updList("experience", i, "role", v)} />
                        <FField label="Company"     value={ex.company}     onChange={v => updList("experience", i, "company", v)} />
                        <FField label="Duration"    value={ex.duration}    onChange={v => updList("experience", i, "duration", v)} span2 />
                        <FArea  label="Description" value={ex.description} onChange={v => updList("experience", i, "description", v)} rows={2} />
                        <div className="col-span-2">
                            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">Responsibilities</label>
                            <TagInput items={ex.responsibilities || []} onAdd={v => updInner("experience", i, "responsibilities", v)} onRemove={j => delInner("experience", i, "responsibilities", j)} />
                        </div>
                    </div>
                </div>
            ))}
            <AddBtn label="Add Experience" onClick={() => addItem("experience", { role: "", company: "", duration: "", description: "", responsibilities: [] })} />
        </>
    );
}

function StepProjects({ data, updList, updInner, delInner, delItem, addItem }) {
    return (
        <>
            {data.projects.map((pr, i) => (
                <div key={i} className="relative bg-slate-50 border border-slate-100 rounded-xl p-4 mb-3">
                    <DelBtn onClick={() => delItem("projects", i)} />
                    <div className="grid grid-cols-2 gap-3">
                        <FField label="Title"       value={pr.title}       onChange={v => updList("projects", i, "title", v)} span2 />
                        <FField label="Link"        value={pr.link}        onChange={v => updList("projects", i, "link", v)} span2 />
                        <FArea  label="Description" value={pr.description} onChange={v => updList("projects", i, "description", v)} rows={2} />
                        <div className="col-span-2">
                            <label className="block text-[12px] font-extrabold uppercase tracking-widest text-black mb-1">Technologies</label>
                            <TagInput items={pr.technologies || []} onAdd={v => updInner("projects", i, "technologies", v)} onRemove={j => delInner("projects", i, "technologies", j)} />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">Features</label>
                            <TagInput items={pr.features || []} onAdd={v => updInner("projects", i, "features", v)} onRemove={j => delInner("projects", i, "features", j)} />
                        </div>
                    </div>
                </div>
            ))}
            <AddBtn label="Add Project" onClick={() => addItem("projects", { title: "", description: "", technologies: [], features: [], link: "" })} />
        </>
    );
}

function StepCertifications({ data, updList, delItem, addItem }) {
    return (
        <>
            {data.certifications.map((cert, i) => (
                <div key={i} className="relative bg-slate-50 border border-slate-100 rounded-xl p-4 mb-3">
                    <DelBtn onClick={() => delItem("certifications", i)} />
                    <div className="grid grid-cols-2 gap-3">
                        <FField label="Title"        value={cert.title}        onChange={v => updList("certifications", i, "title", v)} span2 />
                        <FField label="Organization" value={cert.organization} onChange={v => updList("certifications", i, "organization", v)} />
                        <FField label="Year"         value={cert.year}         onChange={v => updList("certifications", i, "year", v)} />
                    </div>
                </div>
            ))}
            <AddBtn label="Add Certification" onClick={() => addItem("certifications", { title: "", organization: "", year: "" })} />
        </>
    );
}

function StepExtra({ data, addStr, delStr }) {
    return (
        <div className="flex flex-col gap-5">
            {[["achievements", "🏆 Achievements"], ["strengths", "💪 Strengths"], ["hobbies", "🎮 Hobbies"]].map(([key, label]) => (
                <div key={key}>
                    <label className="block text-[12px] font-extrabold uppercase tracking-widest text-black mb-1">{label}</label>
                    <TagInput items={data[key] || []} onAdd={v => addStr(key, v)} onRemove={i => delStr(key, i)} />
                </div>
            ))}
        </div>
    );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function ResumeBuilder() {
    const [data, setData]       = useState(initialData);
    const [tab, setTab]         = useState("edit");       // edit | preview | template
    const [step, setStep]       = useState(0);            // 0–7 for edit steps
    const [layout, setLayout]   = useState("classic");
    const [themeKey, setThemeKey] = useState("teal");
    const [saving, setSaving]   = useState(false);
    const [toast, setToast]     = useState(null);

    const theme = THEMES[themeKey];
    const showToast = (msg, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 4000); };

    // ── data helpers ──
    const setPI        = k => v => setData(d => ({ ...d, personalInfo: { ...d.personalInfo, [k]: v } }));
    const setSkill     = cat => arr => setData(d => ({ ...d, skills: { ...d.skills, [cat]: arr } }));
    const updList      = (key, i, field, val) => setData(d => { const a = [...d[key]]; a[i] = { ...a[i], [field]: val }; return { ...d, [key]: a }; });
    const delItem      = (key, i) => setData(d => ({ ...d, [key]: d[key].filter((_, j) => j !== i) }));
    const addItem      = (key, blank) => setData(d => ({ ...d, [key]: [...d[key], blank] }));
    const updInner     = (key, i, field, val) => setData(d => { const a = [...d[key]]; a[i] = { ...a[i], [field]: [...(a[i][field] || []), val] }; return { ...d, [key]: a }; });
    const delInner     = (key, i, field, j) => setData(d => { const a = [...d[key]]; a[i] = { ...a[i], [field]: a[i][field].filter((_, k) => k !== j) }; return { ...d, [key]: a }; });
    const addStr       = (key, v) => { if (v.trim()) setData(d => ({ ...d, [key]: [...(d[key] || []), v.trim()] })); };
    const delStr       = (key, i) => setData(d => ({ ...d, [key]: d[key].filter((_, j) => j !== i) }));

    const saveResume = async () => {
        setSaving(true);
        try {
            const res = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, meta: { layout, theme: themeKey } }) });
            if (!res.ok) throw new Error(`Server error: ${res.status}`);
            const json = await res.json().catch(() => ({}));
            showToast(`Saved! ${json.message || ""}`.trim(), true);
        } catch (err) { showToast(`❌ ${err.message}`, false); }
        setSaving(false);
    };

    const downloadPDF = () => {
        const el = document.getElementById("resume-preview");
        if (!el) { setTab("preview"); setTimeout(downloadPDF, 400); return; }
        const win = window.open("", "_blank");
        win.document.write(`<html><head><title>${data.personalInfo.name}</title>
      <style>*{box-sizing:border-box;margin:0;padding:0}body{background:white}@media print{body{margin:0}}</style>
    </head><body>${el.outerHTML}<script>setTimeout(()=>window.print(),500)<\/script></body></html>`);
        win.document.close();
    };

    const handleSaveAndDownload = async () => {
        try { setSaving(true); await saveResume(); await downloadPDF(); } catch (e) { console.error(e); } finally { setSaving(false); }
    };

    const TemplateComp = TEMPLATE_MAP[layout];

    // ── step content map ──
    const stepContent = [
        <StepPersonal      key="personal"       data={data} setPI={setPI} />,
        <StepObjective     key="objective"      data={data} setData={setData} />,
        <StepSkills        key="skills"         data={data} setSkill={setSkill} />,
        <StepEducation     key="education"      data={data} updList={updList} delItem={delItem} addItem={addItem} />,
        <StepExperience    key="experience"     data={data} updList={updList} updInner={updInner} delInner={delInner} delItem={delItem} addItem={addItem} />,
        <StepProjects      key="projects"       data={data} updList={updList} updInner={updInner} delInner={delInner} delItem={delItem} addItem={addItem} />,
        <StepCertifications key="certifications" data={data} updList={updList} delItem={delItem} addItem={addItem} />,
        <StepExtra         key="extra"          data={data} addStr={addStr} delStr={delStr} />,
    ];

    const isFirst = step === 0;
    const isLast  = step === STEPS.length - 1;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" style={{ fontFamily: "system-ui, sans-serif" }}>

            {/* ── HEADER ── */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-lg shadow" style={{ background: "black" }}>R</div>
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-black">Resume Builder</p>
                            <p className="font-black text-slate-800 text-lg leading-tight">{data.personalInfo.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {[["edit", " Edit"], ["template", " Design"], ["preview", "👁 Preview"]].map(([key, label]) => (
                            <button key={key} onClick={() => setTab(key)}
                                className={`px-3.5 py-1.5 rounded-full text-sm font-bold transition ${tab === key ? "text-white shadow" : "bg-white text-black hover:text-white hover:bg-black"}`}
                                style={tab === key ? { background: "black" } : {}}>
                                {label}
                            </button>
                        ))}
                        {tab === "preview" && (
                            <button onClick={handleSaveAndDownload} disabled={saving}
                                className="px-4 py-1.5 rounded-full text-sm font-extrabold text-white transition disabled:opacity-60 flex items-center gap-1.5 shadow"
                                style={{ background: "black" }}>
                                {saving ? <><span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />Processing...</> : "⬇ Save & Download PDF"}
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-4 py-6">

                {/* ══════════════════════════════════
                    EDIT TAB — Step-by-step form
                ══════════════════════════════════ */}
                {tab === "edit" && (
                    <div className="max-w-3xl mx-auto">

                        {/* ── Step indicator bar ── */}
                        <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
                            {STEPS.map((s, idx) => {
                                const done    = idx < step;
                                const active  = idx === step;
                                return (
                                    <React.Fragment key={s.id}>
                                        <button
                                            onClick={() => setStep(idx)}
                                            className={`flex flex-col items-center px-3 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition whitespace-nowrap
                                                ${active  ? "text-white shadow-md"         : ""}
                                                ${done    ? "text-white opacity-80"        : ""}
                                                ${!active && !done ? "bg-white text-slate-400 border border-slate-200" : ""}
                                            `}
                                            style={active ? { background: "black" } : done ? { background: "#475569" } : {}}
                                        >
                                            <span className="text-base">{s.icon}</span>
                                            <span className="mt-0.5">{s.label}</span>
                                        </button>
                                        {idx < STEPS.length - 1 && (
                                            <div className={`h-0.5 w-4 flex-shrink-0 rounded ${idx < step ? "bg-slate-400" : "bg-slate-200"}`} />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        {/* ── Step card ── */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            {/* Card header */}
                            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
                                <span className="text-2xl">{STEPS[step].icon}</span>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Step {step + 1} of {STEPS.length}</p>
                                    <h3 className="text-xl font-extrabold text-slate-800">{STEPS[step].label}</h3>
                                </div>
                            </div>

                            {/* Card body */}
                            <div className="p-6">
                                {stepContent[step]}
                            </div>

                            {/* ── Next / Back buttons ── */}
                            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/40">
                                <button
                                    onClick={() => setStep(s => s - 1)}
                                    disabled={isFirst}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold transition
                                        ${isFirst ? "opacity-30 cursor-not-allowed bg-slate-100 text-slate-400" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"}`}
                                >
                                    ← Back
                                </button>

                                {/* Step dots */}
                                <div className="flex gap-1.5">
                                    {STEPS.map((_, idx) => (
                                        <button key={idx} onClick={() => setStep(idx)}
                                            className={`w-2 h-2 rounded-full transition ${idx === step ? "w-5 bg-black" : idx < step ? "bg-slate-400" : "bg-slate-200"}`}
                                        />
                                    ))}
                                </div>

                                {isLast ? (
                                    <button
                                        onClick={() => setTab("preview")}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold text-white shadow transition hover:opacity-90"
                                        style={{ background: "black" }}
                                    >
                                        👁 Preview →
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setStep(s => s + 1)}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold text-white shadow transition hover:opacity-90"
                                        style={{ background: "black" }}
                                    >
                                        Next →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ══════════════════════════════════
                    DESIGN TAB
                ══════════════════════════════════ */}
                {tab === "template" && (
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-5">
                            <h2 className="text-lg font-extrabold text-black mb-4">Layout Style</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {Object.entries(LAYOUTS).map(([key, val]) => (
                                    <button key={key} onClick={() => setLayout(key)}
                                        className={`p-4 rounded-2xl border-2 text-left transition ${layout === key ? "border-current shadow-md" : "border-slate-200 hover:border-slate-300"}`}
                                        style={layout === key ? { borderColor: theme.accent, background: theme.light } : {}}>
                                        <p className="font-extrabold text-sm text-slate-800">{val.name}</p>
                                        <p className="text-[10px] text-slate-400 mt-1">{val.desc}</p>
                                        {layout === key && <span className="mt-2 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: theme.accent }}>Active</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-5">
                            <h2 className="text-lg font-extrabold text-slate-700 mb-4">Color Theme</h2>
                            <div className="grid grid-cols-5 gap-3">
                                {Object.entries(THEMES).map(([key, val]) => (
                                    <button key={key} onClick={() => setThemeKey(key)}
                                        className={`p-3 rounded-2xl border-2 text-center transition ${themeKey === key ? "border-current shadow-lg" : "border-slate-200 hover:border-slate-300"}`}
                                        style={themeKey === key ? { borderColor: val.accent } : {}}>
                                        <div className="w-8 h-8 rounded-full mx-auto mb-2 shadow-md" style={{ background: `linear-gradient(135deg, ${val.accent}, ${val.dark})` }} />
                                        <p className="text-xs font-extrabold text-slate-700">{val.name}</p>
                                        {themeKey === key && <span className="mt-1 inline-block text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: val.accent }}>✓</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                            <h2 className="text-sm font-extrabold text-slate-700 mb-3">👁 Quick Preview</h2>
                            <div className="scale-[0.55] origin-top-left" style={{ height: 320, overflow: "hidden", pointerEvents: "none" }}>
                                <div style={{ width: "181.8%", transformOrigin: "top left" }}>
                                    <TemplateComp data={data} theme={theme} />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-5">
                            <button onClick={() => setTab("preview")} className="px-8 py-3 rounded-2xl text-white font-extrabold text-sm shadow-lg transition hover:opacity-90" style={{ background: "black" }}>
                                See Full Preview →
                            </button>
                        </div>
                    </div>
                )}

                {/* ══════════════════════════════════
                    PREVIEW TAB
                ══════════════════════════════════ */}
                {tab === "preview" && (
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 mb-4 bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex-wrap">
                            <span className="text-xs font-extrabold text-black uppercase tracking-widest">Layout:</span>
                            {Object.entries(LAYOUTS).map(([key, val]) => (
                                <button key={key} onClick={() => setLayout(key)}
                                    className={`px-3 py-1 rounded-full text-sm font-extrabold transition ${layout === key ? "text-white" : "bg-black text-white"}`}
                                    style={layout === key ? { background: theme.accent } : {}}>{val.name}</button>
                            ))}
                            <span className="text-xs font-extrabold text-block uppercase tracking-widest ml-2">Color:</span>
                            {Object.entries(THEMES).map(([key, val]) => (
                                <button key={key} onClick={() => setThemeKey(key)}
                                    className={`w-6 h-6 rounded-full border-2 transition ${themeKey === key ? "scale-125 shadow" : "border-transparent"}`}
                                    style={{ background: `linear-gradient(135deg, ${val.accent}, ${val.dark})`, borderColor: themeKey === key ? val.dark : "transparent" }} />
                            ))}
                        </div>
                        <div id="resume-preview" className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                            <TemplateComp data={data} theme={theme} />
                        </div>
                    </div>
                )}
            </div>

            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl text-sm font-extrabold text-white transition ${toast.ok ? "" : "bg-red-500"}`}
                    style={toast.ok ? { background: theme.accent } : {}}>
                    {toast.msg}
                </div>
            )}
        </div>
    );
}