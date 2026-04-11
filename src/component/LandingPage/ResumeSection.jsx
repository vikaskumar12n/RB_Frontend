import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import SoftwareEnn from "../../template/softwareEnn";
import ClassicTemplate from "../../template/ClassicTemplate";
import ModernTemplate from "../../template/ModernTemplate";
import MinimalTemplate from "../../template/MinimalTemplate";
import ExecutiveTemplate from "../../template/ExecutiveTemplate";
import CreativeTemplate from "../../template/CreativeTemplate";
import { saveToAPI } from '../../api/Api';
// ==================== TEMPLATE REGISTRY ====================
const TEMPLATES = {
  softwareEnn: { component: SoftwareEnn, name: "Software Engineer", icon: "fa-code" },
  classicTemplate: { component: ClassicTemplate, name: "Classic Pro", icon: "fa-briefcase" },
  modernTemplate: { component: ModernTemplate, name: "Modern Dark", icon: "fa-mobile-alt" },
  minimalTemplate: { component: MinimalTemplate, name: "Minimal Light", icon: "fa-feather-alt" },
  executiveTemplate: { component: ExecutiveTemplate, name: "Executive", icon: "fa-crown" },
  creativeTemplate: { component: CreativeTemplate, name: "Creative", icon: "fa-palette" },
};

// ==================== MAIN APP ====================
const ResumeSection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("softwareEnn");
  const [resumeData, setResumeData] = useState({
    fullName: "Michael Rodriguez",
    title: "Full Stack Developer",
    email: "michael.r@dev.com",
    phone: "+1 415 555 9876",
    location: "Austin, TX",
    summary: "Passionate full-stack developer with 5+ years of experience building scalable web apps.",
    experience: [
      { title: "Senior Frontend Engineer", company: "TechFlow Inc", date: "2022-Present", description: "Led React migration, improved performance by 40%." },
      { title: "Junior Developer", company: "StartupLab", date: "2019-2022", description: "Built REST APIs and integrated third-party services." }
    ],
    skills: ["React", "Node.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    education: { degree: "B.Tech in CS", university: "University of Texas", year: "2019" }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const captureRef1 = useRef(null);
  const captureRef2 = useRef(null);

  // PDF capture helpers
  const A4_WIDTH_PX = 1123;
  const A4_HEIGHT_PX = 1587;

  const captureElement = async (elementRef) => {
    if (!elementRef || !elementRef.current) return null;
    await document.fonts.ready;
    try {
      const canvas = await html2canvas(elementRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        letterRendering: true,
        logging: false,
        windowWidth: A4_WIDTH_PX,
        onclone: (clonedDoc, element) => {
          if (elementRef.current) {
            const clonedEl = clonedDoc.getElementById(elementRef.current.id);
            if (clonedEl) {
              clonedEl.style.transform = "none";
              clonedEl.style.width = `${A4_WIDTH_PX}px`;
              clonedEl.style.display = "block";
            }
          }
        },
      });
      return canvas;
    } catch (err) {
      console.error("Capture error:", err);
      return null;
    }
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const canvas1 = await captureElement(captureRef1);
      if (!canvas1) throw new Error("Failed to capture resume");
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [A4_WIDTH_PX, A4_HEIGHT_PX],
        hotfixes: ["px_scaling"],
      });
      
      const imgData1 = canvas1.toDataURL("image/jpeg", 0.95);
      pdf.addImage(imgData1, "JPEG", 0, 0, A4_WIDTH_PX, A4_HEIGHT_PX, undefined, 'FAST');
      
      if (captureRef2.current) {
        const canvas2 = await captureElement(captureRef2);
        if (canvas2) {
          pdf.addPage([A4_WIDTH_PX, A4_HEIGHT_PX], "portrait");
          const imgData2 = canvas2.toDataURL("image/jpeg", 0.95);
          pdf.addImage(imgData2, "JPEG", 0, 0, A4_WIDTH_PX, A4_HEIGHT_PX, undefined, 'FAST');
        }
      }
      
      pdf.save(`resume_${selectedTemplate}.pdf`);
    } catch (err) {
      console.error("PDF Error:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Save to API
 

  // Modal edit handlers
  const handleFieldChange = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (index, field, value) => {
    const newExp = [...(resumeData.experience || [])];
    if (!newExp[index]) newExp[index] = {};
    newExp[index][field] = value;
    setResumeData(prev => ({ ...prev, experience: newExp }));
  };

  const removeExperience = (index) => {
    const newExp = [...(resumeData.experience || [])];
    newExp.splice(index, 1);
    setResumeData(prev => ({ ...prev, experience: newExp }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...(prev.experience || []), { title: "New Role", company: "", date: "", description: "" }]
    }));
  };

  const handleSkillsChange = (skillsStr) => {
    const skillsArray = skillsStr.split(",").map(s => s.trim()).filter(s => s);
    setResumeData(prev => ({ ...prev, skills: skillsArray }));
  };

  const ActiveTemplateComponent = TEMPLATES[selectedTemplate]?.component || SoftwareEnn;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ResumeForge Pro
          </h1>
          <p className="text-gray-600 mt-2">Build, edit & export perfect resumes — ATS-friendly templates</p>
        </div>

        {/* Template Selector Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-layer-group text-indigo-500"></i> Choose Template
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {Object.entries(TEMPLATES).map(([key, template]) => (
              <button
                key={key}
                onClick={() => setSelectedTemplate(key)}
                className={`p-3 rounded-xl transition-all flex flex-col items-center gap-2 ${
                  selectedTemplate === key 
                    ? "bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-300" 
                    : "bg-white text-gray-700 hover:shadow-md border border-gray-200"
                }`}
              >
                <i className={`fas ${template.icon} text-xl`}></i>
                <span className="text-sm font-medium">{template.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resume Preview + Action Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
          <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <i className="fas fa-pen"></i> Edit Details
              </button>
              <button
                onClick={generatePDF}
                disabled={isGenerating}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-60"
              >
                <i className="fas fa-download"></i> {isGenerating ? "Generating..." : "Download PDF"}
              </button>
              <button
                onClick={saveToAPI}
                className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <i className="fas fa-save"></i> Save to Cloud
              </button>
            </div>
            {saveStatus === "saving" && <span className="text-blue-600 text-sm"><i className="fas fa-spinner fa-spin"></i> Saving...</span>}
            {saveStatus === "success" && <span className="text-green-600 text-sm"><i className="fas fa-check-circle"></i> Saved!</span>}
            {saveStatus === "error" && <span className="text-red-600 text-sm"><i className="fas fa-exclamation-triangle"></i> Save failed</span>}
          </div>
          
          {/* Live Resume Render */}
          <div className="flex justify-center overflow-x-auto">
            <div className="max-w-3xl w-full transition-all duration-300">
              <ActiveTemplateComponent ref={captureRef1} data={resumeData} />
            </div>
          </div>
        </div>

        {/* ========== MODAL FOR EDITING ========== */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  <i className="fas fa-user-edit text-indigo-500 mr-2"></i>Edit Resume Content
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
              </div>
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" className="mt-1 w-full border rounded-lg p-2" value={resumeData.fullName} onChange={e=>handleFieldChange("fullName", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                    <input type="text" className="mt-1 w-full border rounded-lg p-2" value={resumeData.title} onChange={e=>handleFieldChange("title", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" className="mt-1 w-full border rounded-lg p-2" value={resumeData.email} onChange={e=>handleFieldChange("email", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="text" className="mt-1 w-full border rounded-lg p-2" value={resumeData.phone} onChange={e=>handleFieldChange("phone", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" className="mt-1 w-full border rounded-lg p-2" value={resumeData.location} onChange={e=>handleFieldChange("location", e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Summary / Bio</label>
                    <textarea rows="2" className="mt-1 w-full border rounded-lg p-2" value={resumeData.summary} onChange={e=>handleFieldChange("summary", e.target.value)} />
                  </div>
                </div>

                {/* Experience Section */}
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">Work Experience</h3>
                  {resumeData.experience?.map((exp, idx) => (
                    <div key={idx} className="border rounded-lg p-3 mb-3 bg-gray-50 relative">
                      <button
                        onClick={() => removeExperience(idx)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <input className="w-full mb-2 p-2 border rounded" placeholder="Title" value={exp.title} onChange={e=>handleExperienceChange(idx, "title", e.target.value)} />
                      <input className="w-full mb-2 p-2 border rounded" placeholder="Company" value={exp.company} onChange={e=>handleExperienceChange(idx, "company", e.target.value)} />
                      <input className="w-full mb-2 p-2 border rounded" placeholder="Date (e.g. 2021-2024)" value={exp.date} onChange={e=>handleExperienceChange(idx, "date", e.target.value)} />
                      <textarea rows="2" className="w-full p-2 border rounded" placeholder="Description" value={exp.description} onChange={e=>handleExperienceChange(idx, "description", e.target.value)} />
                    </div>
                  ))}
                  <button onClick={addExperience} className="text-indigo-600 text-sm flex items-center gap-1">
                    <i className="fas fa-plus-circle"></i> Add Experience
                  </button>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 font-semibold">Skills (comma separated)</label>
                  <input type="text" className="mt-1 w-full border rounded-lg p-2" value={resumeData.skills?.join(", ") || ""} onChange={e=>handleSkillsChange(e.target.value)} placeholder="React, Node, Python" />
                </div>
                
                {/* Education */}
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">Education</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600">Degree</label>
                      <input className="border rounded p-2 w-full" value={resumeData.education?.degree || ""} onChange={e=>setResumeData(prev=>({...prev, education:{...prev.education, degree:e.target.value}}))} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">University</label>
                      <input className="border rounded p-2 w-full" value={resumeData.education?.university || ""} onChange={e=>setResumeData(prev=>({...prev, education:{...prev.education, university:e.target.value}}))} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Year</label>
                      <input className="border rounded p-2 w-full" value={resumeData.education?.year || ""} onChange={e=>setResumeData(prev=>({...prev, education:{...prev.education, year:e.target.value}}))} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 border rounded-lg hover:bg-gray-100">Cancel</button>
                <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Apply Changes</button>
              </div>
            </div>
          </div>
        )}
        
        <div className="text-center text-xs text-gray-400 mt-8 border-t pt-6">
          <i className="fas fa-shield-alt"></i> Professional templates optimized for ATS • Click edit to personalize content • PDF export with high resolution
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;