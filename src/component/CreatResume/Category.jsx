import { useState, useRef, useEffect } from "react";  


import React from "react";
import { useResume } from "../../helper/ResumeContext";
import BusinessAnalystTemplate from "../../template/BussinessTemplate/BusinessAnalystTemplate";
import BusinessDevTemplate from "../../template/BussinessTemplate/BusinessDevTemplate";
import MBATemplate from "../../template/BussinessTemplate/MBATemplate";
import AccountantTemplate from "../../template/Accountant/ProfessionalAccountant";
import SeniorAccountantTemplate from "../../template/Accountant/SeniorAccountant";
import CPATemplate from "../../template/Accountant/CPAResume";
import RetailCashierTemplate from "../../template/Cashier/RetailCashier";
import SeniorCashierTemplate from "../../template/Cashier/SeniorCashier";
import SoftwareDevTemplate from "../../template/Engineer/SoftwareEnn";
import ElectronicEngineerTemplate from "../../template/Engineer/ElectronicEnn";
import CivilEngineerTemplate from "../../template/Engineer/CivilEnn";
import MechanicalEngineerTemplate from "../../template/Engineer/Mechnical";
import UIUXDesignerTemplate from "../../template/Designer/UXDesigner";
import GraphicDesignerTemplate from "../../template/Designer/GraficDesigner";
import ProductDesignerTemplate from "../../template/Designer/ProductDesigner";
import FullStackMinimalTemplate from "../../template/Developer/FullStackDeveloper";
import FrontendDevTemplate from "../../template/Developer/FrontendDeveloper";
import MobileDevTemplate from "../../template/Developer/MobileDeveloper";
import BackendDevTemplate from "../../template/Developer/BackendDeveloper";
import ProjectManagerTemplate from "../../template/Manager/ProjectManager";
import BusinessDevTemplates from "../../template/BussinessTemplate/BusinessDevTemplate";
import OperationsManagerTemplate from "../../template/Manager/operatorManager";
import NurseResumeTemplate from "../../template/Nurse/RegisteredNurse";
import ICUNurseSimpleTemplate from "../../template/Nurse/ICUNurse";
import NursingFresherTemplate from "../../template/Nurse/FresherNurse";
import TechInternTemplate from "../../template/Intern/TechIntern";
import BusinessInternTemplate from "../../template/Intern/BussinessIntern";
import DesignInternTemplate from "../../template/Intern/DesignInter";
import SchoolTeacherTemplate from "../../template/Teacher/SchoolTeacher";
import CollegeProfessorTemplate from "../../template/Teacher/SchoolProfessior";
import { Link } from "react-router-dom";
import { useSearch } from "../../helper/SearchContext";
 
const categories = [
  "Accountant", "Business", "Cashier", "Engineer",
  "Designer", "Developer", "Manager", "Nurse", "Intern", "Teacher",
];

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1122;
const CARD_SCALE = 0.32;

const categoryTemplates = {
  Accountant: [
    { id: "acc-1", name: "Professional Accountant", description: "Clean format with finance-focused layout", color: "#1a1a2e", sections: ["Summary", "Experience", "Skills", "Education", "Certifications"], component: AccountantTemplate },
    { id: "acc-2", name: "Senior Accountant", description: "Executive style with detailed work history", color: "#1a1a2e", sections: ["Objective", "Work History", "Core Skills", "Education"], component: SeniorAccountantTemplate },
    { id: "acc-3", name: "CPA Resume", description: "Certification-focused accounting resume", color: "#1a1a2e", sections: ["Profile", "Certifications", "Experience", "Skills"], component: CPATemplate },
  ],
  Business: [
    { id: "bus-1", name: "Business Analyst", description: "Data-driven layout for business professionals", color: "#312e81", sections: ["Summary", "Experience", "Skills", "Education"], component: BusinessAnalystTemplate },
    { id: "bus-2", name: "Business Development", description: "Sales & growth focused resume", color: "#1a1a2e", sections: ["Objective", "Achievements", "Experience", "Skills"], component: BusinessDevTemplate },
    { id: "bus-3", name: "MBA Graduate", description: "Academic + corporate hybrid format", color: "#1a1a2e", sections: ["Profile", "Education", "Experience", "Projects"], component: MBATemplate },
  ],
  Cashier: [
    { id: "cas-1", name: "Retail Cashier", description: "Simple and clean entry-level format", color: "#1a1a2e", sections: ["Objective", "Skills", "Experience", "Education"], component: RetailCashierTemplate },
    { id: "cas-2", name: "Senior Cashier", description: "Experienced cashier with supervisor skills", color: "#1a1a2e", sections: ["Summary", "Experience", "Skills", "Education"], component: SeniorCashierTemplate },
  ],
  Engineer: [
    { id: "eng-1", name: "Software Engineer", description: "Tech-focused with project highlights", color: "#1a1a2e", sections: ["Summary", "Skills", "Projects", "Experience", "Education"], component: SoftwareDevTemplate },
    { id: "eng-2", name: "Mechanical Engineer", description: "Traditional engineering resume format", color: "#1a1a2e", sections: ["Objective", "Education", "Experience", "Skills"], component: MechanicalEngineerTemplate },
    { id: "eng-3", name: "Civil Engineer", description: "Project-based layout for civil engineers", color: "#1a1a2e", sections: ["Profile", "Projects", "Experience", "Education", "Certifications"], component: CivilEngineerTemplate },
    { id: "eng-4", name: "Electrical Engineer", description: "Technical skills heavy format", color: "#1a1a2e", sections: ["Summary", "Technical Skills", "Experience", "Education"], component: ElectronicEngineerTemplate },
  ],
  Designer: [
    { id: "des-1", name: "UI/UX Designer", description: "Creative layout with portfolio section", color: "#1a1a2e", sections: ["Summary", "Portfolio", "Skills", "Experience", "Education"], component: UIUXDesignerTemplate },
    { id: "des-2", name: "Graphic Designer", description: "Visual-focused minimalist design", color: "#1a1a2e", sections: ["Profile", "Skills", "Experience", "Education"], component: GraphicDesignerTemplate },
    { id: "des-3", name: "Product Designer", description: "Product thinking + design skills", color: "#1a1a2e", sections: ["Summary", "Skills", "Projects", "Experience"], component: ProductDesignerTemplate },
  ],
  Developer: [
    { id: "dev-1", name: "Full Stack Developer", description: "MERN/MEAN stack focused resume", color: "#1a1a2e", sections: ["Summary", "Skills", "Projects", "Experience", "Education"], component: FullStackMinimalTemplate },
    { id: "dev-2", name: "Frontend Developer", description: "React/Vue focused with UI skills", color: "#1a1a2e", sections: ["Objective", "Skills", "Projects", "Experience", "Education"], component: FrontendDevTemplate },
    { id: "dev-3", name: "Backend Developer", description: "API & server-side focused format", color: "#1a1a2e", sections: ["Summary", "Technical Skills", "Experience", "Projects", "Education"], component: BackendDevTemplate },
    { id: "dev-4", name: "Mobile Developer", description: "iOS/Android app development resume", color: "#1a1a2e", sections: ["Profile", "Skills", "Apps", "Experience", "Education"], component: MobileDevTemplate },
  ],
  Manager: [
    { id: "mgr-1", name: "Project Manager", description: "PMP-style with leadership highlights", color: "#1a1a2e", sections: ["Summary", "Core Competencies", "Experience", "Education", "Certifications"], component: ProjectManagerTemplate },
    { id: "mgr-2", name: "Product Manager", description: "Product roadmap & stakeholder focus", color: "#1a1a2e", sections: ["Profile", "Skills", "Experience", "Education"], component: BusinessDevTemplates },
    { id: "mgr-3", name: "Operations Manager", description: "Process & efficiency focused layout", color: "#1a1a2e", sections: ["Summary", "Achievements", "Experience", "Skills", "Education"], component: OperationsManagerTemplate },
  ],
  Nurse: [
    { id: "nur-1", name: "Registered Nurse", description: "Clinical skills focused nursing resume", color: "#1a1a2e", sections: ["Summary", "Licenses", "Clinical Experience", "Skills", "Education"], component: NurseResumeTemplate },
    { id: "nur-2", name: "ICU Nurse", description: "Specialized critical care format", color: "#1a1a2e", sections: ["Profile", "Specializations", "Experience", "Education", "Certifications"], component: ICUNurseSimpleTemplate },
    { id: "nur-3", name: "Nursing Fresher", description: "Entry-level nursing graduate format", color: "#1a1a2e", sections: ["Objective", "Education", "Clinical Rotation", "Skills"], component: NursingFresherTemplate },
  ],
  Intern: [
    { id: "int-1", name: "Tech Intern", description: "Skills & projects focused for freshers", color: "#1a1a2e", sections: ["Objective", "Skills", "Projects", "Education"], component: TechInternTemplate },
    { id: "int-2", name: "Business Intern", description: "Extracurricular + academics focused", color: "#1a1a2e", sections: ["Objective", "Education", "Activities", "Skills"], component: BusinessInternTemplate },
    { id: "int-3", name: "Design Intern", description: "Portfolio-ready internship resume", color: "#1a1a2e", sections: ["Summary", "Portfolio", "Skills", "Education"], component: DesignInternTemplate },
  ],
  Teacher: [
    { id: "tea-1", name: "School Teacher", description: "Education-focused traditional format", color: "#1a1a2e", sections: ["Objective", "Education", "Experience", "Skills", "Certifications"], component: SchoolTeacherTemplate },
    { id: "tea-2", name: "College Professor", description: "Academic CV style with publications", color: "#1a1a2e", sections: ["Profile", "Education", "Publications", "Experience", "Skills"], component: CollegeProfessorTemplate },
  ],
};

// ─── Modal ─────────────────────────────────────────────────────────────────────
// \Background pe click karne se modal BAND NAHI HOGA — taaki editing safe rahe
const Modal = ({ children, onClose }) => {
   const modalRef = useRef(null);  
    useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 overflow-y-auto py-6">
      <div
      ref={modalRef}
        className="bg-gray-100 w-full max-w-5xl rounded-xl shadow-2xl relative"
        // \stopPropagation — accidental close na ho
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button — top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 z-100 text-gray-500 hover:text-red-500 text-2xl font-bold leading-none"
          title="Close"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

// ─── Mini Resume Preview Card ──────────────────────────────────────────────────
const ResumePreviewCard = ({ template, onUse }) => {
  const [hovered, setHovered] = useState(false);
  const hasComp = !!template.component;

  return (
    <div
      className="rounded-xl overflow-hidden border border-gray-200 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // \Puri card pe click → modal open
      onClick={() => onUse(template)}
    >
      <div className="relative overflow-hidden" style={{ height: "200px", backgroundColor: "#f8fafc" }}>
        {hasComp ? (
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: `${A4_WIDTH_PX}px`, height: `${A4_HEIGHT_PX}px`,
            transform: `scale(${CARD_SCALE})`, transformOrigin: "top left",
            pointerEvents: "none", userSelect: "none",
          }}>
            <template.component data={{}} setData={() => { }} />
          </div>
        ) : (
          <div className="absolute inset-0 p-3">
            <div className="rounded-sm mb-2 px-2 py-1.5" style={{ backgroundColor: template.color }}>
              <div className="h-2.5 w-24 rounded" style={{ backgroundColor: "rgba(255,255,255,0.9)" }} />
              <div className="h-1.5 w-16 rounded mt-1" style={{ backgroundColor: "rgba(255,255,255,0.5)" }} />
            </div>
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-1.5">
                {template.sections.slice(0, 3).map((_, i) => (
                  <div key={i}>
                    <div className="h-1.5 w-12 rounded mb-1" style={{ backgroundColor: template.color, opacity: 0.7 }} />
                    {[...Array(i === 0 ? 2 : 3)].map((_, j) => (
                      <div key={j} className="h-1 rounded mb-0.5" style={{ backgroundColor: "#d1d5db", width: `${65 + j * 8}%` }} />
                    ))}
                  </div>
                ))}
              </div>
              {template.sections.length > 3 && (
                <div className="w-20 flex flex-col gap-1.5">
                  {template.sections.slice(3).map((_, i) => (
                    <div key={i}>
                      <div className="h-1.5 w-10 rounded mb-1" style={{ backgroundColor: template.color, opacity: 0.5 }} />
                      {[...Array(2)].map((_, j) => (
                        <div key={j} className="h-1 rounded mb-0.5" style={{ backgroundColor: "#e5e7eb", width: `${55 + j * 10}%` }} />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {hovered && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
            <button
              onClick={(e) => {
                e.stopPropagation(); // card click se alag handle
                onUse(template);
              }}
              className="px-5 py-2 rounded-lg text-white text-sm font-bold shadow-lg hover:scale-105 transition-transform"
              style={{ backgroundColor: template.color }}
            >
              {hasComp ? "Use This Template →" : "Coming Soon"}
            </button>
          </div>
        )}
      </div>

      <div className="bg-white px-3 py-2.5 border-t border-gray-100">
        <div className="font-semibold text-sm text-gray-800">{template.name}</div>
        <div className="text-xs text-gray-500 mt-0.5">{template.description}</div>
        <div className="flex flex-wrap gap-1 mt-2">
          {template.sections.map((sec, i) => (
            <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">{sec}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Blank Page 2 ─────────────────────────────────────────────────────────────
const BlankPage = ({ pageData, setPageData, accentColor, onRemove }) => {
  const update = (field, val) => setPageData((p) => ({ ...p, [field]: val }));
  const headingStyle = {
    fontSize: "15px", fontWeight: "bold", color: accentColor || "#1e3a5f",
    borderBottom: `2px solid ${accentColor || "#1e3a5f"}`,
    paddingBottom: "5px", marginBottom: "12px", marginTop: "28px",
    outline: "none", cursor: "text", whiteSpace: "pre-wrap",
  };
  const bodyStyle = {
    fontSize: "13px", lineHeight: "1.8", color: "#333",
    minHeight: "80px", outline: "none", cursor: "text", whiteSpace: "pre-wrap",
  };
  return (
    <div id="resume-page-2" style={{ width: `${A4_WIDTH_PX}px`, minHeight: `${A4_HEIGHT_PX}px`, backgroundColor: "#fff", padding: "48px 52px", boxSizing: "border-box", fontFamily: "Arial, sans-serif" }}>
      <div style={{ height: "4px", backgroundColor: accentColor || "#1e3a5f", marginBottom: "28px", borderRadius: "2px" }} />
      {[1, 2, 3].map((n) => (
        <div key={n}>
          <div contentEditable suppressContentEditableWarning onBlur={(e) => update(`heading${n}`, e.currentTarget.innerText)} style={headingStyle}>
            {pageData[`heading${n}`] || (n === 1 ? "Additional Information" : n === 2 ? "Another Section" : "Third Section (Optional)")}
          </div>
          <div contentEditable suppressContentEditableWarning onBlur={(e) => update(`body${n}`, e.currentTarget.innerText)} style={bodyStyle}>
            {pageData[`body${n}`] || "Click here to start writing..."}
          </div>
        </div>
      ))}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <button onClick={onRemove} style={{ fontSize: "12px", color: "#ef4444", background: "none", border: "1px dashed #ef4444", borderRadius: "6px", padding: "6px 18px", cursor: "pointer" }}>
          🗑 Remove Page 2
        </button>
      </div>
    </div>
  );
};

// ─── Template Editor View (Modal ke andar render hoga) ────────────────────────
const TemplateEditor = ({ template, onBack }) => {
  const [resumeData, setResumeData] = useState({});
  const [hasPage2, setHasPage2] = useState(false);
  const [page2Data, setPage2Data] = useState({});

  const { downloadResumePDF, downloading, setDownloading } = useResume();

  const TemplComp = template.component;
  const accentColor = template.color;

  const handleDownload = async () => {
    if (!resumeData || Object.keys(resumeData).length === 0) {
      alert("❌ Resume is empty, please fill in some details first");
      return;
    }
    try {
      setDownloading(true);
      await downloadResumePDF({ ...resumeData }, template.id, hasPage2);
    } catch (err) {
      console.error("Download error:", err);
      alert("❌ Error downloading PDF");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div id="category" className="max-h-[80vh] bg-gray-100 rounded-xl overflow-y-auto rounded-xl">

      {/* ── Top Bar ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3"> 
          <button
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
          >
            ← Back to Templates
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-semibold" style={{ color: template.color }}>
            {template.name}
          </span>
          {hasPage2 && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">2 Pages</span>
          )}
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="px-3 py-2 mr-4 rounded-lg text-white text-sm font-semibold transition-all"
          style={{ backgroundColor: downloading ? "#93c5fd" : "#2563eb" }}
        >
          {downloading ? "Generating..." : "⬇ Download PDF"}
        </button>
      </div>

      {/* ── Hint ── */}
      <div className="text-center text-xs text-gray-400 py-2 bg-gray-50 border-b border-gray-200">
        💡 Click on any text to edit it directly on the resume
      </div>

      {/* ── Resume Canvas ── */}
      <div className="pb-3   flex flex-col items-center gap-8">

        {/* Page 1 */}
        <div>
          <div className="text-xs text-gray-400 text-center  tracking-widest uppercase">Page 1</div>
          <div
            id="resume"
            className="shadow-2xl rounded overflow-hidden"
            style={{ width: `${A4_WIDTH_PX}px` }}
          >
            <TemplComp
              key={template.id}
              data={resumeData}
              setData={setResumeData}
            />
          </div>
        </div>

        {/* Add Page 2 Button */}
        {!hasPage2 && (
          <button
            onClick={() => setHasPage2(true)}
            className="flex items-center justify-center gap-2 text-sm font-medium px-6 pb-4 rounded-xl border-2 border-dashed transition-all hover:shadow-md"
            style={{
              width: `${A4_WIDTH_PX}px`,
              borderColor: "#d1d5db",
              color: "#9ca3af",
              backgroundColor: "#f9fafb",
            }}
          >
            <span style={{ fontSize: "20px" }}>+</span>
            Page 2 add
          </button>
        )}

        {/* Page 2 */}
        {hasPage2 && (
          <div>
            <div className="text-xs text-gray-400 text-center mb-2 tracking-widest uppercase">Page 2</div>
            <div className="shadow-2xl rounded overflow-hidden">
              <BlankPage
                pageData={page2Data}
                setPageData={setPage2Data}
                accentColor={accentColor}
                onRemove={() => { setHasPage2(false); setPage2Data({}); }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default function CategoryNav() {

  const [active, setActive] = useState("Accountant");
  const [openTemplate, setOpenTemplate] = useState(null);
  const { searchQuery, setSearchQuery } = useSearch();

  const isSearching = searchQuery.trim() !== "";

  // ✅ Bug fix: naam 'displayTemplates' rakha — koi clash nahi
  const displayTemplates = isSearching
    ? Object.entries(categoryTemplates).flatMap(([cat, temps]) =>
        temps
          .filter(
            (t) =>
              t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              cat.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((t) => ({ ...t, category: cat }))
      )
    : categoryTemplates[active] || [];

  // ✅ Bug fix: parameter naam 'tmpl' rakha — 'template' se clash nahi
  const handleUse = (tmpl) => {
    if (!tmpl.component) {
      alert(`"${tmpl.name}" — Template coming soon!`);
      return;
    }
    setOpenTemplate(tmpl);
  };

  const handleClose = () => setOpenTemplate(null);

  const clearSearch = () => setSearchQuery("");

  return (
    <div className="w-full bg-white">

      {openTemplate && (
        <Modal onClose={handleClose}>
          <TemplateEditor
            template={openTemplate}
            onBack={handleClose}
          />
        </Modal>
      )}

      {/* Category Nav */}
      <div id="category" className="border-b border-gray-200 mt-2">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-1 flex-wrap">
            {categories.map((cat, i) => (
              <div key={cat} className="flex items-center">
                <button
                  onClick={() => {
                    setActive(cat);
                    clearSearch();
                  }}
                  className={`px-4 py-4 text-lg font-semibold transition-colors cursor-pointer
                    ${active === cat && !isSearching ? "text-blue-900 underline" : "text-blue-900 hover:underline"}`}
                >
                  {cat}
                </button>
                {i < categories.length - 1 && <span className="text-gray-300 select-none">|</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-2 pb-3 flex items-center gap-1 text-sm text-gray-500">
          <Link to="/" className="underline text-gray-700 hover:text-blue-700">Home</Link>
          <span className="text-gray-400 mx-1">›</span>
          <Link to="/home#category" className="underline text-gray-700 hover:text-blue-700">Resume Samples</Link>
          <span className="text-gray-400 mx-1">›</span>
          <span className="text-gray-500">
            {isSearching ? `Search: "${searchQuery}"` : `${active} Resume Templates`}
          </span>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isSearching ? `Results for "${searchQuery}"` : `${active} Resume Templates`}
            </h2>
            {/* ✅ Bug fix: displayTemplates.length use karo */}
            <p className="text-gray-500 text-sm mt-1">
              {displayTemplates.length} templates {isSearching ? "found" : `tailored for ${active} roles`} — click to preview and edit
            </p>
          </div>
          {isSearching && (
            <button
              onClick={clearSearch}
              className="text-sm text-red-500 border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
            >
              ✕ Clear Search
            </button>
          )}
        </div>

        {/* ✅ Bug fix: displayTemplates use karo — yahi main fix tha */}
        {displayTemplates.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {displayTemplates.map((tmpl) => (
              <ResumePreviewCard
                key={tmpl.id}
                template={tmpl}
                onUse={handleUse}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">{isSearching ? "🔍" : "📄"}</div>
            <p className="text-lg font-medium">
              {isSearching ? `No results for "${searchQuery}"` : `No templates yet for ${active}`}
            </p>
            <p className="text-sm mt-1">
              {isSearching ? "Try: 'Developer', 'Nurse', 'Manager'" : "Coming soon..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}