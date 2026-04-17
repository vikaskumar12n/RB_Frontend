// components/ResumeSlider.jsx
import { useState, useRef, useEffect } from "react";
import SoftwareEnn from "../../template/SoftwareEnn";
import ClassicTemplate from "../../template/ClassicTemplate";
import ModernTemplate from "../../template/ModernTemplate";
import MinimalTemplate from "../../template/MinimalTemplate";
import ExecutiveTemplate from "../../template/ExecutiveTemplate";
import CreativeTemplate from "../../template/CreativeTemplate";
import { saveToAPI } from "../../api/Api";
import html2pdf from "html2pdf.js";
import React from "react";
import Loader from "../../helper/loader";

const templates = [
    { id: "softwareEnn", label: "Software", component: SoftwareEnn },
    { id: "classic", label: "Classic", component: ClassicTemplate },
    { id: "modern", label: "Modern", component: ModernTemplate },
    { id: "minimal", label: "Minimal", component: MinimalTemplate },
    { id: "executive", label: "Executive", component: ExecutiveTemplate },
    { id: "creative", label: "Creative", component: CreativeTemplate },
];

// Helper function to normalize resume data for templates
const normalizeResumeData = (data) => {
    if (!data) return {};
    
    return {
        // Basic info
        name: data.name || data.personalInfo?.name || "FIRST LAST",
        title: data.title || data.personalInfo?.title || "",
        location: data.location || data.personalInfo?.location || "Bay Area, California",
        phone: data.phone || data.personalInfo?.phone || "+1-234-456-789",
        email: data.email || data.personalInfo?.email || "professionalemail@resumeworded.com",
        linkedin: data.linkedin || data.personalInfo?.linkedin || "linkedin.com/in/username",
        
        // Section titles
        objectiveTitle: data.objectiveTitle || "Objective",
        experienceTitle: data.experienceTitle || "Professional Experience",
        projectTitle: data.projectTitle || "Projects",
        educationTitle: data.educationTitle || "Education",
        skillsTitle: data.skillsTitle || "Skills",
        certificationTitle: data.certificationTitle || "Certifications",
        
        // Content
        objective: data.objective || data.summary || "",
        
        // Arrays - ensure they exist and are proper arrays
        experience: Array.isArray(data.experience) ? data.experience : [],
        projects: Array.isArray(data.projects) ? data.projects : [],
        education: Array.isArray(data.education) ? data.education : [],
        certifications: Array.isArray(data.certifications) ? data.certifications : [],
        skills: Array.isArray(data.skills) ? data.skills : [],
        
        // Additional fields for compatibility
        contact: data.contact || "",
        links: data.links || "",
        skillsList: data.skillsList || "",
        summary: data.summary || data.objective || "",
    };
};

// Get initial data for a specific template
const getInitialDataForTemplate = (templateId) => {
    // You can customize initial data per template if needed
    const defaultData = {
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
        objective: `Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications.`,
        experience: [],
        projects: [],
        education: [],
        certifications: [],
        skills: [["HTML", "CSS", "JavaScript", "React"], ["Node.js", "Express", "MongoDB", "SQL"]],
    };
    
    return defaultData;
};

export default function ResumeSlider({ resumeData, onClose }) {
    const [current, setCurrent] = useState(0);
    const [saving, setSaving] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [toast, setToast] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const previewRef = useRef(null);
    const modalRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const resumeRef = useRef(null);
    
    // Store data for each template separately
    const [templateDataMap, setTemplateDataMap] = useState({});
    
    // Get current template data
    const currentTemplateId = templates[current].id;
    const currentData = templateDataMap[currentTemplateId] || normalizeResumeData(resumeData) || getInitialDataForTemplate(currentTemplateId);
    
    // Initialize data for all templates when resumeData changes
    useEffect(() => {
        if (resumeData && Object.keys(resumeData).length > 0) {
            const normalized = normalizeResumeData(resumeData);
            const newMap = {};
            templates.forEach(template => {
                // Create a deep copy for each template
                newMap[template.id] = JSON.parse(JSON.stringify(normalized));
            });
            setTemplateDataMap(newMap);
        }
    }, [resumeData]);
    
    // Update data for current template
    const updateCurrentData = (newData) => {
        setTemplateDataMap(prev => ({
            ...prev,
            [currentTemplateId]: newData
        }));
    };
    
    // Switch template and optionally save current data
    const switchTemplate = async (newIndex) => {
        // Optional: Auto-save current template data before switching
        // await saveCurrentData();
        
        setCurrent(newIndex);
        // No need to reset data - each template has its own data
    };
    
    const goTo = (i) => switchTemplate(i);
    const prev = () => switchTemplate((current - 1 + templates.length) % templates.length);
    const next = () => switchTemplate((current + 1) % templates.length);

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const saveCurrentData = async () => {
        setSaving(true);
        setLoading(true);
        try {
            await saveToAPI(currentData, currentTemplateId);
            showToast(`Resume (${templates[current].label}) saved successfully!`);
            return true;
        } catch (err) {
            console.error(err);
            showToast("Save failed. Please try again.", "error");
            return false;
        } finally {
            setSaving(false);
            setLoading(false);
        }
    };

    const handleSave = async () => {
        await saveCurrentData();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const handleDownload = async (ref) => {
        const target = ref?.current;
        if (!target) {
            showToast("Could not find resume content.", "error");
            return;
        }
        setDownloading(true);
        try {
            await html2pdf()
                .set({
                    margin: 0,
                    filename: `resume-${currentTemplateId}.pdf`,
                    image: { type: "jpeg", quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true, logging: false },
                    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
                })
                .from(target)
                .save();
            showToast("PDF downloaded successfully!");
        } catch (err) {
            console.error("Download error:", err);
            showToast("Download failed. Please try again.", "error");
        } finally {
            setDownloading(false);
            setLoading(false);
        }
    };

    const handleSaveAndDownload = async () => {
        try {
            setSaving(true);
            setLoading(true);
            // Save current template data
            await saveCurrentData();
            // Download PDF
            await handleDownload(resumeRef);
        } catch (err) {
            console.error(err);
            showToast("Operation failed. Please try again.", "error");
        } finally {
            setSaving(false);
            setLoading(false);
        }
    };

    const ActiveTemplate = templates[current].component;

    // Force re-render when template changes
    const templateKey = `${currentTemplateId}-${Date.now()}`;

    return (
        <>
            {loading && <Loader />}
            <section className="bg-[linear-gradient(135deg,#1a237e_0%,#283593_30%,#1565c0_60%,#6a1b9a_100%)]">
                <div className="max-w-5xl mx-auto py-9 grid grid-cols-1 lg:grid-cols-2 items-center">
                    {/* Left Panel */}
                    <div className="max-w-100 text-white space-y-4 pl-2 pb-2">
                        <h1 className="text-4xl lg:text-4xl font-bold leading-tight">
                            Every detail on your resume, built to perfection
                        </h1>
                        <p className="text-blue-200 text-sm font-bold leading-relaxed max-w-sm">
                            Our resume templates are based on what employers actually look for
                            in a candidate. How do we know? We've talked with thousands of
                            employers to get the answers.
                        </p>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-white text-blue-900 font-bold px-5 py-2.5 text-sm rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            Create my resume
                        </button>
                    </div>

                    {/* Right Panel */}
                    <div className="flex flex-col items-center gap-3">
                        <div
                            className="relative w-full bg-white rounded-xl shadow-2xl overflow-hidden group"
                            style={{ height: "450px", maxWidth: "340px" }}
                        >
                            <div className="overflow-hidden w-full h-full">
                                <div
                                    className="flex transition-transform duration-500 ease-in-out h-full"
                                    style={{ transform: `translateX(-${current * 100}%)` }}
                                >
                                    {templates.map((t) => (
                                        <div key={t.id} className="min-w-full relative" style={{ height: "420px" }}>
                                            <div
                                                className="absolute top-0 left-0"
                                                style={{
                                                    transform: "scale(0.42)",
                                                    transformOrigin: "top left",
                                                    width: "238%",
                                                    pointerEvents: "none",
                                                }}
                                                ref={t.id === currentTemplateId ? previewRef : null}
                                            >
                                                <t.component 
                                                    data={templateDataMap[t.id] || normalizeResumeData(resumeData)} 
                                                />
                                            </div>
                                            <div
                                                className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end justify-center pb-5"
                                                style={{ height: "450px", maxWidth: "340px" }}
                                            >
                                                <button
                                                    onClick={() => {
                                                        switchTemplate(templates.findIndex((tp) => tp.id === t.id));
                                                        setModalOpen(true);
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 bg-white text-blue-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-blue-50"
                                                >
                                                    Use this Template →
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={prev}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center hover:bg-white shadow text-sm transition z-10"
                            >‹</button>
                            <button
                                onClick={next}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center hover:bg-white shadow text-sm transition z-10"
                            >›</button>
                        </div>

                        <p className="text-white/60 text-xs uppercase tracking-widest font-medium">
                            {templates[current].label} Template
                        </p>
                        <div className="flex gap-2">
                            {templates.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className={`rounded-full transition-all duration-200 ${i === current ? "bg-white w-4 h-2" : "bg-white/40 w-2 h-2"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4"
                    onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
                >
                    <div
                        ref={modalRef}
                        className="bg-white sm:rounded-2xl shadow-2xl w-full h-100 sm:h-auto sm:max-w-4xl sm:max-h-[90vh] overflow-hidden flex flex-col"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
                            <div>
                                <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                                    {templates[current].label} Template
                                </h2>
                                <p className="text-xs text-gray-400 mt-0.5">Preview · Edit · Download</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="hidden sm:flex gap-1 bg-gray-100 p-1 rounded-lg mr-2">
                                    {templates.map((t, i) => (
                                        <button
                                            key={t.id}
                                            onClick={() => switchTemplate(i)}
                                            className={`text-xs px-2.5 py-1 rounded-md transition-all font-medium ${i === current
                                                ? "bg-white text-blue-700 shadow-sm"
                                                : "text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition text-lg"
                                >×</button>
                            </div>
                        </div>

                        {/* Template Tabs - mobile only */}
                        <div className="flex sm:hidden gap-1 bg-gray-100 p-1 mx-4 mt-2 rounded-lg overflow-x-auto">
                            {templates.map((t, i) => (
                                <button
                                    key={t.id}
                                    onClick={() => switchTemplate(i)}
                                    className={`text-xs px-2.5 py-1 rounded-md transition-all font-medium whitespace-nowrap ${i === current
                                        ? "bg-white text-blue-700 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-auto bg-gray-50 p-3 sm:p-6 flex justify-center items-start">
                            <div className="w-full flex justify-center">
                                <div
                                    style={{
                                        width: "794px",
                                        minHeight: "1123px",
                                        transformOrigin: "top center",
                                        transform: `scale(var(--resume-scale, 1))`,
                                    }}
                                    className="[--resume-scale:0.38] xs:[--resume-scale:0.45] sm:[--resume-scale:0.65] md:[--resume-scale:0.8] lg:[--resume-scale:1]"
                                >
                                    <div
                                        ref={resumeRef}
                                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                                        style={{ width: "794px", minHeight: "1123px" }}
                                    >
                                        <ActiveTemplate 
                                            key={currentTemplateId}
                                            data={currentData} 
                                            setData={updateCurrentData}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 bg-white flex-wrap gap-2">
                            <div className="flex gap-1">
                                <button onClick={prev} className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-100 transition">← Prev</button>
                                <button onClick={next} className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-100 transition">Next →</button>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleSaveAndDownload}
                                    disabled={saving || downloading}
                                    className="flex items-center gap-2 bg-blue-700 text-white text-sm font-medium px-4 sm:px-5 py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-60"
                                >
                                    {(saving || downloading) ? (
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    )}
                                    {(saving || downloading) ? "Processing..." : "Save & Download PDF"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl text-white text-sm font-medium shadow-lg z-[60] transition-all
                    ${toast.type === "error" ? "bg-red-500" : "bg-green-600"}`}>
                    {toast.msg}
                </div>
            )}
        </>
    );
}