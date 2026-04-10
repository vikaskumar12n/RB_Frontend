// import React, { useState, useRef } from "react";
// import { ArrowLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from "react";


// // ── Import Templates ──────────────────────────────────────────────────────────
// import SoftwareEnn from "../template/softwareEnn";
// import ClassicTemplate from "../template/ClassicTemplate";
// import ModernTemplate from "../template/ModernTemplate";
// import MinimalTemplate from "../template/MinimalTemplate";
// import CreativeTemplate from "../template/CreativeTemplate";
// import { saveToAPI } from "../helper/PdfHelpers";
// // ── Constants ────────────────────────────────────────────────────────────────
// const A4_WIDTH_PX = 794;
// const A4_HEIGHT_PX = 1122;
// const CARD_SCALE = 0.28;
// const MODAL_SCALE = 0.22;

// // ── Template List ──────────────────────────────────────────────────────────────
// const TEMPLATES = [
//   { id: "software-eng", name: "Software Engineer", component: SoftwareEnn, color: "#2563eb", icon: "💻" },
//   { id: "classic", name: "Classic Template", component: ClassicTemplate, color: "#1e3a5f", icon: "📄" },
//   { id: "modern", name: "Modern Template", component: ModernTemplate, color: "#0ea5e9", icon: "✨" },
//   { id: "minimal", name: "Minimal Template", component: MinimalTemplate, color: "#64748b", icon: "🎯" },
//   { id: "creative", name: "Creative Template", component: CreativeTemplate, color: "#8b5cf6", icon: "🎨" },
// ];

// // ── PDF Helpers ──────────────────────────────────────────────────────────────
// const loadLibraries = () =>
//   new Promise((resolve, reject) => {
//     const loaded = { html2canvas: !!window.html2canvas, jsPDF: !!(window.jspdf?.jsPDF) };
//     const check = () => { if (loaded.html2canvas && loaded.jsPDF) resolve(); };
//     check();
//     if (loaded.html2canvas && loaded.jsPDF) return;
//     if (!window.html2canvas) {
//       const s1 = document.createElement("script");
//       s1.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
//       s1.onload = () => { loaded.html2canvas = true; check(); };
//       s1.onerror = reject;
//       document.head.appendChild(s1);
//     }
//     if (!window.jspdf?.jsPDF) {
//       const s2 = document.createElement("script");
//       s2.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
//       s2.onload = () => { loaded.jsPDF = true; check(); };
//       s2.onerror = reject;
//       document.head.appendChild(s2);
//     }
//   });

// const captureElement = async (elementId) => {
//   const el = document.getElementById(elementId);
//   if (!el) return null;
//   await document.fonts.ready;
//   return await window.html2canvas(el, {
//     scale: 2, useCORS: true, allowTaint: false,
//     backgroundColor: "#ffffff", letterRendering: true, logging: false,
//     windowWidth: A4_WIDTH_PX, windowHeight: A4_HEIGHT_PX,
//     onclone: (clonedDoc) => {
//       const clonedEl = clonedDoc.getElementById(elementId);
//       if (clonedEl) {
//         clonedEl.style.transform = "none";
//         clonedEl.style.width = `${A4_WIDTH_PX}px`;
//         clonedEl.style.display = "block";
//       }
//     },
//   });
// };

// const generatePDF = async (templateId, hasPage2) => {
//   await loadLibraries();

//   // ✅ FIX: Pehle check karo element exist karta hai
//   const page1El = document.getElementById("resume-page-1");
//   if (!page1El) {
//     throw new Error("Resume element not found. Editor open hai aur resume visible hai?");
//   }

//   const { jsPDF } = window.jspdf;
//   const pdf = new jsPDF({
//     orientation: "portrait",
//     unit: "px",
//     format: [A4_WIDTH_PX, A4_HEIGHT_PX],
//     hotfixes: ["px_scaling"],
//   });

//   const canvas1 = await captureElement("resume-page-1");
//   if (!canvas1) throw new Error("Page 1 capture failed — element render nahi hua");

//   pdf.addImage(
//     canvas1.toDataURL("image/jpeg", 0.95),
//     "JPEG", 0, 0, A4_WIDTH_PX, A4_HEIGHT_PX,
//     undefined, "FAST"
//   );

//   if (hasPage2) {
//     const canvas2 = await captureElement("resume-page-2");
//     if (canvas2) {
//       pdf.addPage([A4_WIDTH_PX, A4_HEIGHT_PX], "portrait");
//       pdf.addImage(
//         canvas2.toDataURL("image/jpeg", 0.95),
//         "JPEG", 0, 0, A4_WIDTH_PX, A4_HEIGHT_PX,
//         undefined, "FAST"
//       );
//     }
//   }

//   pdf.save(`resume_${templateId}.pdf`);
// };

 

// // ── Default Data ──────────────────────────────────────────────────────────────
// const getInitialData = () => ({
//   name: "FIRST LAST",
//   location: "Bay Area, California",
//   phone: "+1-234-456-789",
//   email: "professionalemail@resumeworded.com",
//   linkedin: "linkedin.com/in/username",
//   objectiveTitle: "Objective",
//   experienceTitle: "Professional Experience",
//   projectTitle: "Projects",
//   educationTitle: "Education",
//   skillsTitle: "Skills",
//   certificationTitle: "Certifications",
//   objective: `Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications.`,
//   projects: [
//     { title: "CRM System", description: "Complete CRM system with Finance, Accounts, and HR modules." },
//     { title: "E-commerce Website", description: "Full stack platform with authentication and payment integration." },
//   ],
//   certifications: ["Full Stack Web Development - Udemy", "React Developer Certification"],
//   experience: [
//     {
//       company: "XYZ Solutions Pvt. Ltd.", period: "2018 – Present",
//       roles: [{ title: "Front End Developer", bullets: ["Built full-scale CRM project", "Improved system performance", "Team collaboration"] }],
//     },
//     {
//       company: "Technano Pvt. Ltd.", period: "2014 – 2017",
//       roles: [{ title: "Front End Developer", bullets: ["Improved load time by 22%", "Converted wireframes to code"] }],
//     },
//   ],
//   education: [{ school: "Millennium Group of Institutions", year: "2013", degree: "Bachelor of Engineering, IT" }],
//   skills: [["HTML", "CSS", "JavaScript", "React"], ["Node.js", "Express", "MongoDB", "SQL"]],
// });

// // ── Template Selection Modal ──────────────────────────────────────────────────
// const TemplateSelectionModal = ({ isOpen, onClose, onSelectTemplate }) => {
//   const [selectedId, setSelectedId] = useState(null);
//   const defaultData = getInitialData();
//  const modalRef = useRef(null);
//  useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         onClose();
//       }
//     };
//     if (isOpen) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;
  

//   return (
//    <div className="fixed inset-0 z-[10000] bg-black/70 flex items-center justify-center">
  
//   {/* Modal Box */}
//   <div ref={modalRef} className="bg-white rounded-2xl max-w-[960px] w-[94%] max-h-[88vh] overflow-auto p-7">
    
//     {/* Header */}
//     <div className="flex justify-between items-center mb-6">
//       <h2 className="text-[22px] font-bold text-slate-800">
//         Choose a Template
//       </h2>

//       <button
//         onClick={onClose}
//         className="w-9 h-9 flex items-center justify-center text-[20px] 
//         border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-100 transition"
//       >
//         ×
//       </button>
//     </div>

//     {/* Template Grid */}
//     <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-5">
//       {TEMPLATES.map((template) => {
//         const TemplateComponent = template.component;
//         const isSelected = selectedId === template.id;

//         return (
//           <div
//             key={template.id}
//             onClick={() => setSelectedId(template.id)}
//             className={`rounded-xl cursor-pointer transition-all overflow-hidden border-2 
//               ${isSelected ? "" : "border-slate-200 bg-white"}
//             `}
//             style={
//               isSelected
//                 ? {
//                     borderColor: template.color,
//                     background: `${template.color}08`,
//                     boxShadow: `0 0 0 3px ${template.color}22`,
//                   }
//                 : {}
//             }
//           >
//             {/* Preview */}
//             <div
//               className="w-full overflow-hidden bg-slate-50 relative"
//               style={{ height: `${A4_HEIGHT_PX * MODAL_SCALE}px` }}
//             >
//               <div
//                 className="origin-top-left pointer-events-none select-none"
//                 style={{
//                   width: `${A4_WIDTH_PX}px`,
//                   height: `${A4_HEIGHT_PX}px`,
//                   transform: `scale(${MODAL_SCALE})`,
//                 }}
//               >
//                 <TemplateComponent data={defaultData} setData={() => {}} />
//               </div>

//               {/* Checkmark */}
//               {isSelected && (
//                 <div
//                   className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
//                   style={{ background: template.color }}
//                 >
//                   <svg
//                     width="12"
//                     height="12"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="#fff"
//                     strokeWidth="3"
//                   >
//                     <polyline points="20 6 9 17 4 12" />
//                   </svg>
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div
//               className={`p-3.5 border-t-2 transition-all ${
//                 isSelected ? "" : "bg-white border-slate-200"
//               }`}
//               style={
//                 isSelected
//                   ? {
//                       borderTopColor: template.color,
//                       background: `${template.color}06`,
//                     }
//                   : {}
//               }
//             >
//               <div className="text-[13px] font-semibold text-black">
//                 {template.name}
//               </div>

//               <div className="text-[11px] text-black mt-1">
//                 Professional & Clean
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>

//     {/* Footer Buttons */}
//     <div className="flex gap-3 justify-end mt-5 pt-3 sticky bottom-0">
//       <button
//         onClick={onClose}
//         className="px-5 py-2.5 border border-slate-300 rounded-lg  
//         text-[13px] text-black font-medium hover:bg-slate-100 transition"
//       >
//         Cancel
//       </button>

//       <button
//         onClick={() => {
//           if (selectedId) {
//             const selected = TEMPLATES.find(t => t.id === selectedId);
//             onSelectTemplate(selected);
//             onClose();
//           }
//         }}
//         disabled={!selectedId}
//         className={`px-6 py-2.5 rounded-lg text-white text-[13px] font-semibold transition 
//           ${
//             selectedId
//               ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
//               : "bg-slate-700 cursor-not-allowed"
//           }`}
//       >
//         Continue with Template →
//       </button>
//     </div>

//   </div>
// </div>
//   );
// };

// // ── Full-Screen Editor Modal ──────────────────────────────────────────────────
// const EditorModal = ({ isOpen, onClose, user, template, initialData, onSaved }) => {
//   const [resumeData, setResumeData] = useState(() => ({ ...getInitialData(), ...(initialData || {}) }));
//   const [hasPage2, setHasPage2] = useState(false);
//   const [page2Data, setPage2Data] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState(null);
//  const modalRef = useRef(null);
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         onClose();
//       }
//     };
//     if (isOpen) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen, onClose]);

//   if (!isOpen || !template) return null;

//   const showToast = (msg, type = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const handleSaveAndDownload = async () => {
//     setLoading(true);
//     try {
//       await saveToAPI(resumeData, template?.id || "default");
//       onSaved(resumeData);
//       showToast("Resume saved successfully!");
//       await generatePDF(template?.id || "default", hasPage2);
//       showToast("PDF downloaded successfully!");
//     } catch (err) {
//       console.error("Error:", err);
//       showToast("Something went wrong. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen || !template) return null;

//   const TemplateComponent = template.component;

//   return (
//     <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.72)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
//       {toast && (
//         <div ref={modalRef} style={{ position: "fixed", top: "68px", right: "24px", zIndex: 10001, background: toast.type === "error" ? "#fef2f2" : "#f0fdf4", border: `1px solid ${toast.type === "error" ? "#fca5a5" : "#86efac"}`, color: toast.type === "error" ? "#dc2626" : "#16a34a", padding: "10px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: "500", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
//           {toast.msg}
//         </div>
//       )}

//       {/* Top Bar */}
//       <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 24px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
//           <button onClick={onClose} style={{ background: "none", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontSize: "13px", color: "#475569" }}>
//             ← Back
//           </button>
//           <div style={{ width: "1px", height: "22px", background: "#e2e8f0" }} />
//           <div>
//             <div style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>{template.name}</div>
//             <div style={{ fontSize: "11px", color: "#94a3b8" }}>{user?.email}</div>
//           </div>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <span style={{ fontSize: "12px", color: "#94a3b8" }}>✏️ Click any text to edit</span>
//           <button
//             onClick={handleSaveAndDownload}
//             disabled={loading}
//             style={{ background: loading ? "#93c5fd" : "#2563eb", border: "none", color: "#fff", borderRadius: "8px", padding: "8px 24px", cursor: loading ? "not-allowed" : "pointer", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}
//           >
//             {loading ? <> Saving & Downloading...</> : <> Save & Download PDF</>}
//           </button>
//         </div>
//       </div>

//       {/* Tip Bar */}
//       <div style={{ background: "#fffbeb", borderBottom: "1px solid #fde68a", padding: "6px 24px", fontSize: "12px", color: "#92400e", textAlign: "center", flexShrink: 0 }}>
//         💡 Click directly on any text in the resume to edit it. Press "Save & Download PDF" when done.
//       </div>

//       {/* Editor Canvas */}
//       <div style={{ flex: 1, overflowY: "auto", background: "#e7e7e7", padding: "32px 16px 60px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
//         <div style={{ fontSize: "11px", color: "#94a3b8", letterSpacing: "2px", textTransform: "uppercase" }}>Page 1</div>
//         <div id="resume-page-1" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.22)", borderRadius: "2px" }}>
//           <TemplateComponent data={resumeData} setData={setResumeData} />
//         </div>
//         {!hasPage2 ? (
//           <button
//             onClick={() => setHasPage2(true)}
//             style={{ width: `${A4_WIDTH_PX}px`, padding: "16px", background: "#fff", border: "2px dashed #cbd5e1", borderRadius: "8px", cursor: "pointer", color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}
//           >
//             + Add Page 2 (optional)
//           </button>
//         ) : (
//           <>
//             <div style={{ fontSize: "11px", color: "#94a3b8", letterSpacing: "2px", textTransform: "uppercase" }}>Page 2</div>
//             <div style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.22)", borderRadius: "2px" }}>
//               <BlankPage2
//                 pageData={page2Data}
//                 setPageData={setPage2Data}
//                 onRemove={() => { setHasPage2(false); setPage2Data({}); }}
//               />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // ── Blank Page 2 ──────────────────────────────────────────────────────────────
// const BlankPage2 = ({ pageData, setPageData, onRemove }) => {
//   const update = (field, val) => setPageData((p) => ({ ...p, [field]: val }));
//   const SH2 = ({ field, defaultVal }) => (
//     <div style={{ borderBottom: "1.5px solid #111", marginTop: "16px", marginBottom: "4px" }}>
//       <div
//         contentEditable suppressContentEditableWarning
//         onBlur={(e) => update(field, e.currentTarget.innerText)}
//         style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "0.12em", textAlign: "center", textTransform: "uppercase", paddingBottom: "3px", outline: "none", cursor: "text" }}
//       >
//         {pageData[field] || defaultVal}
//       </div>
//     </div>
//   );
//   return (
//     <div id="resume-page-2" style={{ width: `${A4_WIDTH_PX}px`, minHeight: `${A4_HEIGHT_PX}px`, background: "#fff", padding: "12mm", boxSizing: "border-box", fontFamily: "Times New Roman, Georgia, serif", fontSize: "11px" }}>
//       {[1, 2, 3].map((n) => (
//         <div key={n}>
//           <SH2 field={`h${n}`} defaultVal={n === 1 ? "Additional Information" : n === 2 ? "Another Section" : "Third Section"} />
//           <div
//             contentEditable suppressContentEditableWarning
//             onBlur={(e) => update(`b${n}`, e.currentTarget.innerText)}
//             style={{ fontSize: "11px", lineHeight: "1.6", color: "#222", minHeight: "50px", outline: "none", cursor: "text", whiteSpace: "pre-wrap", marginTop: "4px" }}
//           >
//             {pageData[`b${n}`] || "Click here to write..."}
//           </div>
//         </div>
//       ))}
//       <div style={{ textAlign: "center", marginTop: "40px" }}>
//         <button onClick={onRemove} style={{ fontSize: "12px", color: "#ef4444", background: "none", border: "1px dashed #ef4444", borderRadius: "6px", padding: "6px 16px", cursor: "pointer" }}>
//           🗑 Remove Page 2
//         </button>
//       </div>
//     </div>
//   );
// };

// const ResumeCard = ({ resumeData, template, onClick }) => {
//   const [hovered, setHovered] = useState(false);
//   const templateColor = template?.color || "#1e3a5f";
//   const templateName = template?.name || "Software Engineer";
//   const TemplateComponent = template?.component;

//   // Use actual edited data if available, otherwise show default placeholder data
//   const previewData = Object.keys(resumeData).length > 0 ? resumeData : getInitialData();

//   return (
//     <div
//       onClick={onClick}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{ cursor: "pointer", display: "inline-flex", flexDirection: "column" }}
//     >
//       {/* Thumbnail Container */}
//       <div style={{
//         width: `${A4_WIDTH_PX * CARD_SCALE}px`,
//         height: `${A4_HEIGHT_PX * CARD_SCALE}px`,
//         overflow: "hidden",
//         borderRadius: "10px 10px 0 0",
//         border: "1px solid #e2e8f0",
//         borderBottom: "none",
//         backgroundColor: "#fff",
//         position: "relative",
//       }}>
//         {/* Scaled Resume Preview */}
//         <div style={{
//           width: `${A4_WIDTH_PX}px`,
//           height: `${A4_HEIGHT_PX}px`,
//           transform: `scale(${CARD_SCALE})`,
//           transformOrigin: "top left",
//           pointerEvents: "none",
//           userSelect: "none",
//         }}>
//           {TemplateComponent && (
//             <TemplateComponent data={previewData} setData={() => { }} />
//           )}
//         </div>

//         {/* Hover Overlay */}
//         {hovered && (
//           <div style={{
//             position: "absolute", inset: 0,
//             background: "rgba(15,23,42,0.55)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             borderRadius: "10px 10px 0 0",
//           }}>
//             <span style={{
//               color: "#fff", fontSize: "13px", fontWeight: "600",
//               background: templateColor, padding: "8px 18px", borderRadius: "8px",
//             }}>
//               Edit Resume →
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Card Footer */}
//       <div style={{
//         background: "#fff",
//         border: "1px solid #e2e8f0",
//         borderTop: `2px solid ${templateColor}`,
//         borderRadius: "0 0 10px 10px",
//         padding: "11px 13px",
//       }}>
//         <div style={{ fontSize: "13px", fontWeight: "600", color: "#1e293b" }}>{templateName} Resume</div>
//         <div style={{ fontSize: "11px", color: "#64748b", marginTop: "3px" }}>
//           {Object.keys(resumeData).length > 0 ? "✓ Edited — click to continue" : "Click to start editing"}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Stat Card Component ───────────────────────────────────────────────────────
// const StatCard = ({ value, label, color }) => (
//   <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "14px 18px", textAlign: "center", border: "1px solid #e2e8f0" }}>
//     <div style={{ fontSize: "24px", fontWeight: "700", color, fontFamily: "Georgia, serif" }}>{value}</div>
//     <div style={{ fontSize: "11px", color: "#64748b", marginTop: "3px" }}>{label}</div>
//   </div>
// );

// // ── Main Profile Page ─────────────────────────────────────────────────────────
// export default function ProfilePage({ user }) {
//   useEffect(() => {
//   window.scrollTo(0, 0);
// }, []);
//   const navigate = useNavigate();
//   const currentUser = user || { name: "John", email: "John@example.com", joinedDate: "Jan 2024" };
//   const accent = "#1e3a5f";
//   const initials = currentUser.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

//   const [resumeData, setResumeData] = useState({});
//   const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
//   const [editorOpen, setEditorOpen] = useState(false);
//   const [templateModalOpen, setTemplateModalOpen] = useState(false);
//   const [saveCount, setSaveCount] = useState(0);
//   const hasEdited = Object.keys(resumeData).length > 0;

//   const handleCreateNew = () => {
//     setTemplateModalOpen(true);
//   };

//   const handleSelectTemplate = (template) => {
//     setSelectedTemplate(template);
//     setResumeData({});
//     setEditorOpen(true);
//   };

//   return (
//     <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
//       <div>
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-800 transition-all duration-200 font-medium active:scale-95"
//         >
//           <ArrowLeft size={18} />
//           <span>Back</span>
//         </button>
//       </div>

//       <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "3px 24px" }}>

//         {/* Profile Hero */}
//         <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
//           <div style={{ height: "88px", background: accent, position: "relative" }}>
//             <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 0, transparent 50%)", backgroundSize: "14px 14px" }} />
//           </div>
//           <div style={{ padding: "0 32px 28px" }}>
//             <div style={{ marginTop: "0px", marginBottom: "16px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
//               <div style={{ width: "76px", height: "76px", borderRadius: "50%", background: accent, border: "4px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "26px", fontWeight: "700", boxShadow: "0 2px 16px rgba(0,0,0,0.15)" }}>
//                 {initials}
//               </div>
//               <button
//                 onClick={() => setEditorOpen(true)}
//                 style={{ background: accent, color: "#fff", border: "none", borderRadius: "10px", padding: "10px 24px", cursor: "pointer", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 2px 8px rgba(30,58,95,0.3)" }}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
//                   <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//                   <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//                 </svg>
//                 {hasEdited ? "Continue Editing" : "Edit Resume"}
//               </button>
//             </div>
//             <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
//               <div>
//                 <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "#1e293b" }}>{currentUser.name}</h1>
//                 <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
//                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
//                   <span style={{ fontSize: "13px", color: "#64748b" }}>{currentUser.email}</span>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
//                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
//                   <span style={{ fontSize: "13px", color: "#94a3b8" }}>Joined {currentUser.joinedDate || "2024"}</span>
//                 </div>
//               </div>
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", minWidth: "250px" }}>
//                 <StatCard value="1" label="Resume" color={accent} />
//                 <StatCard value={saveCount} label="Saves" color="#0ea5e9" />
//                 <StatCard value={hasEdited ? "Active" : "Draft"} label="Status" color={hasEdited ? "#22c55e" : "#f59e0b"} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* My Resume Section */}
//         <div className="mb-3.5">
//           <h2 className="mb-1 text-[27px] font-bold text-slate-800">
//             My Resume
//           </h2>
//           <p className="text-[13px] text-slate-500">
//             Click the card to open the editor and customize your resume
//           </p>
//         </div>
//         <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
//           {/* Resume Card — now shows actual resume preview */}
//           <ResumeCard
//             resumeData={resumeData}
//             template={selectedTemplate}
//             onClick={() => setEditorOpen(true)}
//           />

//           {/* Create New Card */}
//           <div
//             onClick={handleCreateNew}
//             style={{
//               width: `${A4_WIDTH_PX * CARD_SCALE}px`,
//               height: `${A4_HEIGHT_PX * CARD_SCALE + 76}px`,
//               border: "2px dashed #cbd5e1",
//               borderRadius: "10px",
//               display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//               cursor: "pointer", background: "#fff", color: "#94a3b8", gap: "8px",
//               transition: "all 0.2s",
//             }}
//             onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
//             onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.color = "#94a3b8"; }}
//           >
//             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               <circle cx="12" cy="12" r="10" />
//               <line x1="12" y1="8" x2="12" y2="16" />
//               <line x1="8" y1="12" x2="16" y2="12" />
//             </svg>
//             <span style={{ fontSize: "12px", fontWeight: "500" }}>Create New</span>
//           </div>
//         </div>

//         {/* Tips */}
//         <div className="mt-8 mb-10 bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
//           <h3 className="mb-4 text-[25px] font-bold text-slate-800">
//             Quick Tips
//           </h3>

//           <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3">
//             {[
//               { icon: "✏️", tip: "Click any text on the resume to edit it inline" },
//               { icon: "💾⬇️", tip: "Single click saves your data AND downloads PDF" },
//               { icon: "📄", tip: "Add Page 2 for publications, extra sections, or references" },
//               { icon: "🎨", tip: "Choose from 6 different professional templates" },
//             ].map(({ icon, tip }, i) => (
//               <div
//                 key={i}
//                 className="flex gap-2 items-start p-10 bg-slate-50 rounded-lg border border-gray-200 shadow-lg"
//               >
//                 <span className="text-[15px] shrink-0">{icon}</span>
//                 <span className="text-[15px] font-bold text-slate-600 leading-6">
//                   {tip}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Template Selection Modal — now shows actual resume previews */}
//       <TemplateSelectionModal
//         isOpen={templateModalOpen}
//         onClose={() => setTemplateModalOpen(false)}
//         onSelectTemplate={handleSelectTemplate}
//       />

//       {/* Editor Modal */}
//       <EditorModal

//         isOpen={editorOpen}
//         onClose={() => setEditorOpen(false)}
//         user={currentUser}
//         template={selectedTemplate}
//         initialData={resumeData}
//         onSaved={(data) => { setResumeData(data); setSaveCount((c) => c + 1); }}
//       />
//     </div>
//   );
// }
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SoftwareEnn from "../template/softwareEnn";
import ClassicTemplate from "../template/ClassicTemplate";
import ModernTemplate from "../template/ModernTemplate";
import MinimalTemplate from "../template/MinimalTemplate";
import CreativeTemplate from "../template/CreativeTemplate";
import { saveToAPI } from "../helper/PdfHelpers";

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1122;
const CARD_SCALE = 0.22;

const TEMPLATES = [
  { id: "software-eng", name: "Software Engineer", component: SoftwareEnn, color: "#2563eb" },
  { id: "classic",      name: "Classic Template",  component: ClassicTemplate, color: "#1e3a5f" },
  { id: "modern",       name: "Modern Template",   component: ModernTemplate,  color: "#0ea5e9" },
  { id: "minimal",      name: "Minimal Template",  component: MinimalTemplate, color: "#64748b" },
  { id: "creative",     name: "Creative Template", component: CreativeTemplate, color: "#8b5cf6" },
];

const getInitialData = () => ({
  name: "FIRST LAST",
  location: "Bay Area, California",
  phone: "+1-234-456-789",
  email: "professionalemail@resumeworded.com",
  linkedin: "linkedin.com/in/username",
  objectiveTitle: "Objective",
  experienceTitle: "Professional Experience",
  projectTitle: "Projects",
  educationTitle: "Education",
  skillsTitle: "Skills",
  certificationTitle: "Certifications",
  objective: "Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications.",
  projects: [
    { title: "CRM System", description: "Complete CRM system with Finance, Accounts, and HR modules." },
    { title: "E-commerce Website", description: "Full stack platform with authentication and payment integration." },
  ],
  certifications: ["Full Stack Web Development - Udemy", "React Developer Certification"],
  experience: [
    {
      company: "XYZ Solutions Pvt. Ltd.", period: "2018 – Present",
      roles: [{ title: "Front End Developer", bullets: ["Built full-scale CRM project", "Improved system performance", "Team collaboration"] }],
    },
    {
      company: "Technano Pvt. Ltd.", period: "2014 – 2017",
      roles: [{ title: "Front End Developer", bullets: ["Improved load time by 22%", "Converted wireframes to code"] }],
    },
  ],
  education: [{ school: "Millennium Group of Institutions", year: "2013", degree: "Bachelor of Engineering, IT" }],
  skills: [["HTML", "CSS", "JavaScript", "React"], ["Node.js", "Express", "MongoDB", "SQL"]],
});

// ── PDF helpers (same as before) ─────────────────────────────────────────────
const loadLibraries = () =>
  new Promise((resolve, reject) => {
    const loaded = { html2canvas: !!window.html2canvas, jsPDF: !!(window.jspdf?.jsPDF) };
    const check = () => { if (loaded.html2canvas && loaded.jsPDF) resolve(); };
    check();
    if (loaded.html2canvas && loaded.jsPDF) return;
    if (!window.html2canvas) {
      const s1 = document.createElement("script");
      s1.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      s1.onload = () => { loaded.html2canvas = true; check(); };
      s1.onerror = reject;
      document.head.appendChild(s1);
    }
    if (!window.jspdf?.jsPDF) {
      const s2 = document.createElement("script");
      s2.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s2.onload = () => { loaded.jsPDF = true; check(); };
      s2.onerror = reject;
      document.head.appendChild(s2);
    }
  });

const captureElement = async (elementId) => {
  const el = document.getElementById(elementId);
  if (!el) return null;
  await document.fonts.ready;
  return await window.html2canvas(el, {
    scale: 2, useCORS: true, allowTaint: false,
    backgroundColor: "#ffffff", letterRendering: true, logging: false,
    windowWidth: A4_WIDTH_PX, windowHeight: A4_HEIGHT_PX,
    onclone: (clonedDoc) => {
      const clonedEl = clonedDoc.getElementById(elementId);
      if (clonedEl) {
        clonedEl.style.transform = "none";
        clonedEl.style.width = `${A4_WIDTH_PX}px`;
        clonedEl.style.display = "block";
      }
    },
  });
};

const generatePDF = async (templateId) => {
  await loadLibraries();
  const page1El = document.getElementById("resume-page-1");
  if (!page1El) throw new Error("Resume element not found");
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [A4_WIDTH_PX, A4_HEIGHT_PX], hotfixes: ["px_scaling"] });
  const canvas1 = await captureElement("resume-page-1");
  if (!canvas1) throw new Error("Page 1 capture failed");
  pdf.addImage(canvas1.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, A4_WIDTH_PX, A4_HEIGHT_PX, undefined, "FAST");
  pdf.save(`resume_${templateId}.pdf`);
};

// ── Editor Modal ──────────────────────────────────────────────────────────────
const EditorModal = ({ isOpen, onClose, template, resumeData, setResumeData, onSaved }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveDownload = async () => {
    setLoading(true);
    try {
      await saveToAPI(resumeData, template?.id || "default");
      onSaved(resumeData);
      showToast("Saved successfully!");
      await generatePDF(template?.id || "default");
      showToast("PDF downloaded!");
    } catch (err) {
      showToast("Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !template) return null;
  const TemplateComponent = template.component;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.72)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {toast && (
        <div style={{ position: "fixed", top: "68px", right: "24px", zIndex: 10001, background: toast.type === "error" ? "#fef2f2" : "#f0fdf4", border: `1px solid ${toast.type === "error" ? "#fca5a5" : "#86efac"}`, color: toast.type === "error" ? "#dc2626" : "#16a34a", padding: "10px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: "500" }}>
          {toast.msg}
        </div>
      )}

      {/* Top Bar */}
      <div ref={modalRef} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 24px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button onClick={onClose} style={{ background: "none", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontSize: "13px", color: "#475569" }}>
              ← Back
            </button>
            <div style={{ width: "1px", height: "22px", background: "#e2e8f0" }} />
            <span style={{ fontSize: "14px", fontWeight: "700", color: template.color }}>{template.name}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>✏️ Click any text to edit</span>
            <button
              onClick={handleSaveDownload}
              disabled={loading}
              style={{ background: loading ? "#1c398e" : "#1c398e", border: "none", color: "#fff", borderRadius: "8px", padding: "8px 24px", cursor: loading ? "not-allowed" : "pointer", fontSize: "13px", fontWeight: "600" }}
            >
              {loading ? "Saving..." : "Save & Download PDF"}
            </button>
          </div>
        </div>

        <div style={{ background: "#fffbeb", borderBottom: "1px solid #fde68a", padding: "6px 24px", fontSize: "12px", color: "#92400e", textAlign: "center", flexShrink: 0 }}>
          💡 Click directly on any text in the resume to edit it.
        </div>

        <div style={{ flex: 1, overflowY: "auto", background: "#", padding: "32px 16px 60px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <div style={{ fontSize: "11px", color: "#94a3b8", letterSpacing: "2px", textTransform: "uppercase" }}>Page 1</div>
          <div id="resume-page-1" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.22)", borderRadius: "2px" }}>
            <TemplateComponent data={resumeData} setData={setResumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Profile Page — 3 Panel Layout ───────────────────────────────────────
export default function ProfilePage({ user }) {
  const navigate = useNavigate();
  const currentUser = user || { name: "John Doe", email: "john@example.com", joinedDate: "Jan 2024" };

  // ── State ──
  const [selectedTemplateId, setSelectedTemplateId] = useState(TEMPLATES[0].id);
  const [resumeDataMap, setResumeDataMap]   = useState({});   // templateId → data
  const [editorOpen, setEditorOpen]         = useState(false);
  const [saveCount, setSaveCount]           = useState(0);

  const selectedTemplate = TEMPLATES.find(t => t.id === selectedTemplateId);
  const resumeData       = resumeDataMap[selectedTemplateId] || getInitialData();

  const setResumeData = (data) => {
    setResumeDataMap(prev => ({ ...prev, [selectedTemplateId]: data }));
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── Top bar ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "12px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "none", cursor: "pointer", fontSize: "13px", color: "#475569" }}
        >
          ← Back
        </button>
        <span style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>My Resumes</span>
      </div>

      {/* ── 3 Panel Layout ── */}
      <div style={{ display: "flex", height: "calc(100vh - 57px)", overflow: "hidden" }}>

        {/* ── LEFT PANEL — Resume List ── */}
        <div style={{ width: "220px", borderRight: "1px solid #e2e8f0", background: "#fff", display: "flex", flexDirection: "column", flexShrink: 0 }}>

          {/* Create New Button */}
          <div style={{ padding: "16px 12px 12px" }}>
            <button
              onClick={() => {
                const next = TEMPLATES.find(t => !resumeDataMap[t.id]) || TEMPLATES[0];
                setSelectedTemplateId(next.id);
                setEditorOpen(true);
              }}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "10px", border: "1.5px dashed #cbd5e1", borderRadius: "10px", background: "none", cursor: "pointer", fontSize: "13px", color: "#64748b", fontWeight: "500", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#2563eb"; e.currentTarget.style.color = "#2563eb"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.color = "#64748b"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create New
            </button>
          </div>

          {/* Scrollable Template List */}
          <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {TEMPLATES.map((t) => {
              const isActive = t.id === selectedTemplateId;
              const hasData  = !!resumeDataMap[t.id];
              const Comp     = t.component;
              const data     = resumeDataMap[t.id] || getInitialData();

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTemplateId(t.id)}
                  style={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    border: isActive ? `2px solid ${t.color}` : "1.5px solid #e2e8f0",
                    background: isActive ? `${t.color}08` : "#fff",
                    overflow: "hidden",
                    transition: "all 0.15s",
                    boxShadow: isActive ? `0 0 0 3px ${t.color}22` : "none",
                  }}
                >
                  {/* Mini Preview */}
                  <div style={{ height: `${A4_HEIGHT_PX * CARD_SCALE}px`, overflow: "hidden", position: "relative", background: "#f8fafc" }}>
                    <div style={{ width: `${A4_WIDTH_PX}px`, height: `${A4_HEIGHT_PX}px`, transform: `scale(${CARD_SCALE})`, transformOrigin: "top left", pointerEvents: "none", userSelect: "none" }}>
                      <Comp data={data} setData={() => {}} />
                    </div>
                    {/* Checkmark if selected */}
                    {isActive && (
                      <div style={{ position: "absolute", top: "6px", right: "6px", width: "20px", height: "20px", borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div style={{ padding: "8px 10px", borderTop: `2px solid ${isActive ? t.color : "#f1f5f9"}`, background: isActive ? `${t.color}06` : "#fff" }}>
                    <div style={{ fontSize: "11px", fontWeight: "600", color: "#1e293b" }}>{t.name}</div>
                    <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "2px" }}>
                      {hasData ? "✓ Edited" : "Not started"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CENTER PANEL — Resume Preview ── */}
        <div style={{ flex: 1, overflowY: "auto", background: "#", display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 24px" }}>

          {/* Template name + updated */}
          <div style={{ width: "100%", maxWidth: "794px", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#1e293b" }}>{selectedTemplate?.name} Resume</h2>
              <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#94a3b8" }}>
                {resumeDataMap[selectedTemplateId] ? "Updated recently" : "Not edited yet"}
              </p>
            </div>
            {/* Change Template pill */}
            <button
              onClick={() => {
                const idx = TEMPLATES.findIndex(t => t.id === selectedTemplateId);
                const next = TEMPLATES[(idx + 1) % TEMPLATES.length];
                setSelectedTemplateId(next.id);
              }}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#fff", cursor: "pointer", fontSize: "12px", color: "#475569", fontWeight: "500" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              Change Template
            </button>
          </div>

          {/* Resume Preview Box */}
          <div style={{ position: "relative", width: "794px" }}>
            <div style={{ background: "#fff", boxShadow: "0 8px 10px rgba(0,0,0,0.18)", borderRadius: "4px", overflow: "hidden", pointerEvents: "none", userSelect: "none" }}>
              {selectedTemplate && (
                <selectedTemplate.component data={resumeData} setData={() => {}} />
              )}
            </div>

            {/* Edit Overlay Button */}
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <button
                onClick={() => setEditorOpen(true)}
                style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background:  "#1c398e", border: "none", borderRadius: "10px", color: "#fff", fontSize: "13px", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit Resume
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — Actions ── */}
        <div style={{ width: "220px", borderLeft: "1px solid #e2e8f0", background: "#fff", padding: "24px 16px", display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}>

          {/* Download */}
          <button
            onClick={() => generatePDF(selectedTemplateId)}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", border: "1px solid #e2e8f0", borderRadius: "10px", background: "#fff", cursor: "pointer", fontSize: "14px", color: "#1e293b", fontWeight: "500", transition: "all 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            Download Resume
          </button>

          {/* Duplicate */}
          <button
            onClick={() => {
              const newId = TEMPLATES.find(t => !resumeDataMap[t.id])?.id;
              if (newId) {
                setResumeDataMap(prev => ({ ...prev, [newId]: resumeData }));
                setSelectedTemplateId(newId);
              }
            }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", border: "1px solid #e2e8f0", borderRadius: "10px", background: "#fff", cursor: "pointer", fontSize: "14px", color: "#1e293b", fontWeight: "500", transition: "all 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </div>
            Duplicate
          </button>

          {/* Delete */}
          <button
            onClick={() => {
              setResumeDataMap(prev => { const n = { ...prev }; delete n[selectedTemplateId]; return n; });
            }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", border: "1px solid #fee2e2", borderRadius: "10px", background: "#fff", cursor: "pointer", fontSize: "14px", color: "#dc2626", fontWeight: "500", transition: "all 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
            </div>
            Delete
          </button>

          <div style={{ borderTop: "1px solid #f1f5f9", margin: "4px 0" }} />

          {/* Stats */}
          <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "14px" }}>
            <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "10px", fontWeight: "600", letterSpacing: "0.05em", textTransform: "uppercase" }}>Resume Info</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Template</span>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#1e293b" }}>{selectedTemplate?.name.split(" ")[0]}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Status</span>
              <span style={{ fontSize: "12px", fontWeight: "600", color: resumeDataMap[selectedTemplateId] ? "#16a34a" : "#f59e0b" }}>
                {resumeDataMap[selectedTemplateId] ? "Edited" : "Draft"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Saves</span>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#1e293b" }}>{saveCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Editor Modal ── */}
      <EditorModal
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        template={selectedTemplate}
        resumeData={resumeData}
        setResumeData={setResumeData}
        onSaved={(data) => { setResumeData(data); setSaveCount(c => c + 1); }}
      />
    </div>
  );
}