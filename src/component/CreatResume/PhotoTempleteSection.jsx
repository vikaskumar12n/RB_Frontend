// components/ResumeSlider.jsx
import { useState, useRef, useEffect, useCallback } from "react";
 
import CreativeTemplate from "../../template/CreativeTemplate";
 
import Ptemplate2 from "../../withPhotoTemplate/Ptemplates2";
import Ptemplates3 from "../../withPhotoTemplate/Ptemplate3";
import Ptemplates4 from "../../withPhotoTemplate/Ptemplate4";
import Ptemplates5 from "../../withPhotoTemplate/Ptempletes5";
import PTemplate from "../../withPhotoTemplate/PCPAResume";
import Ptemplates6 from "../../withPhotoTemplate/Ptemplates6";
import PTemplates1 from "../../withPhotoTemplate/Ptemplates1";
import { saveToAPI } from "../../api/Api";
import html2pdf from "html2pdf.js";
import React from "react";
import Loader from "../../helper/loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const templates = [
  { id: "softwaredev", label: "Software developer",    component: PTemplates1 },
  { id: "softwareEnn", label: "Software",    component: Ptemplate2 },
  { id: "Developer", label: "Developer",  component: Ptemplates3 },
  { id: "classic", label: "Classic",  component: PTemplate },
  { id: "modern", label: "Modern",  component: Ptemplates5 },
  { id: "minimal", label: "Minimal",   component: Ptemplates4 },
  { id: "executive", label: "Executive",  component: Ptemplates6 },
  { id: "creative", label: "Creative",  component: CreativeTemplate },
];

const normalizeResumeData = (data) => {
  if (!data) return {};
  return {
    name: data.name || data.personalInfo?.name || "FIRST LAST",
    title: data.title || data.personalInfo?.title || "",
    location: data.location || data.personalInfo?.location || "Bay Area, California",
    phone: data.phone || data.personalInfo?.phone || "+1-234-456-789",
    email: data.email || data.personalInfo?.email || "professionalemail@resumeworded.com",
    linkedin: data.linkedin || data.personalInfo?.linkedin || "linkedin.com/in/username",
    objectiveTitle: data.objectiveTitle || "Objective",
    experienceTitle: data.experienceTitle || "Professional Experience",
    projectTitle: data.projectTitle || "Projects",
    educationTitle: data.educationTitle || "Education",
    skillsTitle: data.skillsTitle || "Skills",
    certificationTitle: data.certificationTitle || "Certifications",
    objective: data.objective || data.summary || "",
    experience: Array.isArray(data.experience) ? data.experience : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
    education: Array.isArray(data.education) ? data.education : [],
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
    contact: data.contact || "",
    links: data.links || "",
    skillsList: data.skillsList || "",
    summary: data.summary || data.objective || "",
  };
};

const hasMeaningfulContent = (data) => {
  if (!data) return false;
  const hasName = data.name && data.name !== "FIRST LAST" && data.name.trim() !== "";
  const hasEmail = data.email && data.email !== "professionalemail@resumeworded.com" && data.email.trim() !== "";
  const hasPhone = data.phone && data.phone !== "+1-234-456-789" && data.phone.trim() !== "";
  const hasObjective = data.objective && data.objective !== "" && data.objective !== "Proactive and detail-oriented Full Stack Developer with expertise in designing, developing, and maintaining scalable web applications.";
  const hasSkills = data.skills && data.skills.length > 0 && data.skills.some(s => s && s.trim() !== "");
  const hasExperience = data.experience && data.experience.length > 0 && data.experience.some(e => e.company && e.company.trim() !== "");
  const hasProjects = data.projects && data.projects.length > 0 && data.projects.some(p => p.title && p.title.trim() !== "");
  const hasEducation = data.education && data.education.length > 0 && data.education.some(e => e.school && e.school.trim() !== "");
  return hasName || hasEmail || hasPhone || hasObjective || hasSkills || hasExperience || hasProjects || hasEducation;
};

/* ─── Inline Styles ─────────────────────────────────────────────── */
const S = {
  hero: {
    background: "linear-gradient(360deg, #2e3a53 0%, #2e3a53 40%, #2e3a53 100%)",
    position: "relative",
    overflow: "hidden",
    padding: "30px 2px 28px",
    marginTop:"20px",
    marginBottom:"20px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  heroBg: {
    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
    background: `
      radial-gradient(ellipse 60% 50% at 10% 20%, rgba(99,102,241,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 40% 60% at 90% 80%, rgba(16,185,129,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 60% 10%, rgba(245,158,11,0.05) 0%, transparent 50%)
    `,
  },
  heroGrid: {
    maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1,
    display: "grid", gridTemplateColumns: "1fr", gap: "48px",
    alignItems: "center",
  },
  heroLeft: { color: "#fff" },
  badge: {
    display: "inline-flex", alignItems: "center", gap: "6px",
    background: "rgba(99,102,241,0.12)", border: "0.5px solid rgba(99,102,241,0.35)",
    borderRadius: "20px", padding: "5px 14px", marginBottom: "20px",
    fontSize: "11px", fontWeight: "600", color: "#a5b4fc", letterSpacing: "0.5px",
  },
  badgeDot: {
    width: "6px", height: "6px", borderRadius: "50%",
    background: "#6366f1", boxShadow: "0 0 6px #6366f1",
  },
  h1: {
    fontSize: "clamp(28px, 5vw, 48px)", fontWeight: "800", lineHeight: "1.15",
    marginBottom: "16px", letterSpacing: "-0.5px",
    background: "white",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  heroDesc: {
    fontSize: "14px", color: "white", lineHeight: "1.8",
    maxWidth: "400px", marginBottom: "28px",
  },
  heroBtn: {
    display: "inline-flex", alignItems: "center", gap: "8px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff", fontWeight: "700", fontSize: "14px",
    padding: "12px 24px", borderRadius: "12px", border: "none", cursor: "pointer",
    boxShadow: "0 8px 24px rgba(99,102,241,0.3)", transition: "all 0.2s",
  },
  heroStats: {
    display: "flex", gap: "24px", marginTop: "28px", flexWrap: "wrap",
  },
  stat: { textAlign: "center" },
  statNum: { fontSize: "22px", fontWeight: "800", color: "#f1f5f9" },
  statLabel: { fontSize: "11px", color: "white", fontWeight: "500" },

  sliderWrap: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
  },
  card: {
    position: "relative", width: "100%",  maxWidth: "320px",
    background: "#fff", borderRadius: "16px",
    overflow: "hidden", height: "420px",
    boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.08)",
  },
  cardTrack: {
    display: "flex", height: "100%",
    transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
  },
  templateSlide: { minWidth: "100%", position: "relative", overflow: "hidden" },
  templateScale: {
    position: "absolute", top: 0, left: 0,
    transform: "scale(0.42)", transformOrigin: "top left",
    width: "238%", pointerEvents: "none",
  },
  cardOverlay: {
    position: "absolute", inset: 0,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "16px",
    opacity: 0, transition: "opacity 0.3s",
  },
  useBtn: {
    background: "rgba(255,255,255,0.95)", color: "#1e1b4b",
    fontSize: "12px", fontWeight: "700", padding: "8px 20px",
    borderRadius: "20px", border: "none", cursor: "pointer",
    transform: "translateY(8px)", transition: "all 0.3s",
    backdropFilter: "blur(8px)",
  },
  navBtn: (side) => ({
    position: "absolute", [side]: "10px", top: "50%",
    transform: "translateY(-50%)", width: "28px", height: "28px",
    borderRadius: "50%", background: "rgba(255,255,255,0.9)",
    border: "0.5px solid rgba(0,0,0,0.1)", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "16px", color: "#374151", transition: "all 0.2s",
    zIndex: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  }),
  templateLabel: {
    fontSize: "11px", color: "white",
    letterSpacing: "2px", textTransform: "uppercase", fontWeight: "600",
  },
  dots: { display: "flex", gap: "6px", alignItems: "center" },
  dot: (active) => ({
    height: "6px", borderRadius: "3px", cursor: "pointer",
    background: active ? "#6366f1" : "rgba(255,255,255,0.25)",
    width: active ? "20px" : "6px",
    transition: "all 0.3s",
  }),

  /* ── Modal ── */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.5)",
    zIndex: 9999,
  },
  modal: {
    background: "#f8fafc", width: "100%", height: "100%",
    display: "flex", flexDirection: "column", overflow: "hidden",
  },
  modalHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 20px", background: "#fff",
    borderBottom: "0.5px solid #e2e8f0", gap: "12px", flexShrink: 0,
  },
  modalTitle: { fontSize: "15px", fontWeight: "700", color: "#0f172a" },
  modalSubtitle: { fontSize: "11px", color: "#94a3b8", marginTop: "2px" },
  tabsDesktop: {
    display: "flex", gap: "2px", background: "#f1f5f9",
    padding: "3px", borderRadius: "10px", overflowX: "auto",
    flex: "1", maxWidth: "500px",
  },
  tab: (active) => ({
    display: "flex", alignItems: "center", gap: "4px",
    fontSize: "12px", fontWeight: "600", padding: "6px 12px",
    borderRadius: "8px", border: "none", cursor: "pointer", whiteSpace: "nowrap",
    transition: "all 0.2s",
    background: active ? "#fff" : "transparent",
    color: active ? "#6366f1" : "#64748b",
    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
  }),
  closeBtn: {
    width: "32px", height: "32px", borderRadius: "50%",
    border: "0.5px solid #e2e8f0", background: "#f8fafc",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", fontSize: "18px", color: "#64748b",
    flexShrink: 0, transition: "all 0.2s",
  },
  modalTabsMobile: {
    display: "flex", gap: "4px", padding: "8px 16px",
    background: "#fff", borderBottom: "0.5px solid #e2e8f0",
    overflowX: "auto", flexShrink: 0,
  },

  // ✅ FIXED: Modal body — overflow hidden + proper centering
  modalBody: {
    flex: 1,
    overflow: "auto",
    background: "#f1f5f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px 0",          // horizontal padding removed — handled by inner wrapper
  },

  // ✅ FIXED: Outer scroll container that limits visible width on mobile
  resumeScrollContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    overflow: "hidden",          // clips the scaled resume so it doesn't overflow screen
  },

  // ✅ FIXED: The 794px resume wrapper — scale applied here
  resumeWrapper: {
    width: "794px",
    minHeight: "1123px",
    transformOrigin: "top center",
    background: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    flexShrink: 0,              // prevent squishing
  },

  modalFooter: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 20px", background: "#fff",
    borderTop: "0.5px solid #e2e8f0", flexShrink: 0, gap: "12px",
    flexWrap: "wrap",
  },
  footerNav: { display: "flex", gap: "4px" },
  footerNavBtn: {
    fontSize: "12px", color: "#64748b", padding: "6px 12px",
    borderRadius: "8px", border: "0.5px solid #e2e8f0",
    background: "#fff", cursor: "pointer", transition: "all 0.2s",
    fontWeight: "500",
  },
  downloadBtn: (loading) => ({
    display: "flex", alignItems: "center", gap: "8px",
    background: loading
      ? "#94a3b8"
      : "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff", fontSize: "13px", fontWeight: "700",
    padding: "10px 20px", borderRadius: "10px", border: "none",
    cursor: loading ? "not-allowed" : "pointer",
    transition: "all 0.2s",
    boxShadow: loading ? "none" : "0 4px 16px rgba(99,102,241,0.3)",
  }),
};

/* ─── Main Component ─────────────────────────────────────────────── */
export default function ResumeSliderWhitPhoto({ resumeData, onClose }) {
  const [current, setCurrent] = useState(0);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const previewRef = useRef(null);
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const resumeRef = useRef(null);
  const navigate = useNavigate();
  const [templateDataMap, setTemplateDataMap] = useState({});
  const [ShowEditorModal, setShowEditorModal] = useState(false);
  const [initialDataMap, setInitialDataMap] = useState({});
  const [editedTemplates, setEditedTemplates] = useState({});

  const currentTemplateId = templates[current].id;
  const currentData = templateDataMap[currentTemplateId] || normalizeResumeData(resumeData) || {};
  const hasCurrentTemplateEdits = editedTemplates[currentTemplateId] || false;

  useEffect(() => {
    if (resumeData && Object.keys(resumeData).length > 0) {
      const normalized = normalizeResumeData(resumeData);
      const newMap = {};
      const newInitialMap = {};
      templates.forEach((t) => {
        const templateData = JSON.parse(JSON.stringify(normalized));
        newMap[t.id] = templateData;
        newInitialMap[t.id] = JSON.parse(JSON.stringify(normalized));
      });
      setTemplateDataMap(newMap);
      setInitialDataMap(newInitialMap);
      setEditedTemplates({});
    }
  }, [resumeData]);

  const updateCurrentData = (newData) => {
    setTemplateDataMap((prev) => ({ ...prev, [currentTemplateId]: newData }));
    const initialDataForThisTemplate = initialDataMap[currentTemplateId];
    if (initialDataForThisTemplate) {
      const currentDataStr = JSON.stringify(newData);
      const initialDataStr = JSON.stringify(initialDataForThisTemplate);
      if (currentDataStr !== initialDataStr) {
        setEditedTemplates(prev => ({ ...prev, [currentTemplateId]: true }));
      } else {
        setEditedTemplates(prev => ({ ...prev, [currentTemplateId]: false }));
      }
    } else {
      setEditedTemplates(prev => ({ ...prev, [currentTemplateId]: true }));
    }
  };

  const switchTemplate = (newIndex) => setCurrent(newIndex);
  const goTo = (i) => switchTemplate(i);
  const prev = () => switchTemplate((current - 1 + templates.length) % templates.length);
  const next = () => switchTemplate((current + 1) % templates.length);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose?.();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const saveCurrentData = async () => {
    try {
      await saveToAPI(currentData, currentTemplateId);
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Save failed. Please try again.");
      return false;
    }
  };

  const handleDownload = async (ref) => {
    const target = ref?.current;
    if (!target) return false;
    try {
      await html2pdf()
        .set({
          margin: 0,
          filename: `resume-${currentTemplateId}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(target)
        .save();
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSaveAndDownload = async () => {
    const storedUser = localStorage.getItem("user");
    if (!hasCurrentTemplateEdits && !hasMeaningfulContent(currentData)) {
      toast.warning("⚠️ Please add some content to your resume before downloading!");
      return;
    }
    if (!storedUser) {
      toast.error("Please login first to download resume!", "error");
      setTimeout(() => {
        setShowEditorModal(false);
        window.dispatchEvent(new CustomEvent("openAuthModal", {
          detail: {
            tab: "login",
            onSuccess: () => { setShowEditorModal(true); }
          }
        }));
      }, 0);
      return;
    }

    setLoading(true);
    setSaving(true);
    try {
      const isSaved = await saveCurrentData();
      if (isSaved) {
        const isDownloaded = await handleDownload(resumeRef);
        if (isDownloaded) {
          toast.success("Saved & Downloaded successfully!");
          setInitialDataMap(prev => ({
            ...prev,
            [currentTemplateId]: JSON.parse(JSON.stringify(currentData))
          }));
          setEditedTemplates(prev => ({ ...prev, [currentTemplateId]: false }));
        }
      }
    } catch (err) {
      toast.error("Something went wrong.", err);
    } finally {
      setLoading(false);
      setSaving(false);
    }
  };

  const ActiveTemplate = templates[current].component;
  const isProcessing = saving || downloading;

  // ✅ FIXED: Better scale calculation — uses actual container width
  const getResumeScale = useCallback(() => {
    const w = window.innerWidth;
    const RESUME_WIDTH = 794;
    // On mobile: fit resume to screen width with some padding
    if (w < 640) {
      const availableWidth = w - 16; // 8px padding each side
      return Math.min(availableWidth / RESUME_WIDTH, 1);
    }
    if (w < 900) return 0.65;
    if (w < 1100) return 0.82;
    return 1;
  }, []);

  const [resumeScale, setResumeScale] = useState(1);

  useEffect(() => {
    const update = () => setResumeScale(getResumeScale());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [getResumeScale]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ✅ FIXED: Calculate the scaled height so container doesn't collapse
  const scaledHeight = 1123 * resumeScale;
  const scaledWidth = 794 * resumeScale;

  return (
    <>
      {loading && <Loader />}

      {/* ── Hero Section ── */}
      <section style={S.hero}>
        <div style={S.heroBg} />

        <div style={{
          position: "absolute", width: "300px", height: "300px", borderRadius: "50%",
          border: "0.5px solid rgba(99,102,241,0.08)", top: "-80px", right: "-80px",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", width: "200px", height: "200px", borderRadius: "50%",
          border: "0.5px solid rgba(99,102,241,0.06)", top: "-40px", right: "-40px",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{
          ...S.heroGrid,
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        }}>
          {/* Left */}
          <div style={S.heroLeft}>
            <h1 style={S.h1}>
              Every detail,<br />built to perfection
            </h1>
            <p style={S.heroDesc}>
              Our resume templates are based on what employers actually look for.
              We've talked with thousands of employers to craft the perfect format.
            </p>
            <button
              style={S.heroBtn}
              onClick={() => setModalOpen(true)}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(99,102,241,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.3)"; }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Create my resume
            </button>

            <div style={S.heroStats}>
              {[["7+", "Templates"], ["10k+", "Resumes"], ["98%", "Success Rate"]].map(([n, l]) => (
                <div key={l} style={S.stat}>
                  <div style={S.statNum}>{n}</div>
                  <div style={S.statLabel}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Slider */}
          <div style={S.sliderWrap}>
            <div
              style={S.card}
              onMouseEnter={() => setCardHovered(true)}
              onMouseLeave={() => setCardHovered(false)}
            >
              <div style={{ ...S.cardTrack, transform: `translateX(-${current * 100}%)` }}>
                {templates.map((t) => (
                  <div key={t.id} style={S.templateSlide}>
                    <div
                      style={S.templateScale}
                      ref={t.id === currentTemplateId ? previewRef : null}
                    >
                      <t.component data={templateDataMap[t.id] || normalizeResumeData(resumeData)} />
                    </div>

                    <div style={{
                      ...S.cardOverlay,
                      opacity: cardHovered ? 1 : 0,
                    }}>
                      <button
                        style={{
                          ...S.useBtn,
                          transform: cardHovered ? "translateY(0)" : "translateY(8px)",
                        }}
                        onClick={() => {
                          switchTemplate(templates.findIndex((tp) => tp.id === t.id));
                          setModalOpen(true);
                        }}
                      >
                        Use {t.label} Template →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button style={S.navBtn("left")} onClick={prev}>‹</button>
              <button style={S.navBtn("right")} onClick={next}>›</button>

              <div style={{
                position: "absolute", top: "12px", left: "12px",
                background: "rgba(99,102,241,0.9)", color: "white",
                fontSize: "10px", fontWeight: "700", padding: "3px 10px",
                borderRadius: "10px", backdropFilter: "blur(8px)",
                letterSpacing: "0.3px",
              }}>
                {templates[current].label}
              </div>
            </div>

            <p style={S.templateLabel}>{templates[current].label} Template</p>
            <div style={S.dots}>
              {templates.map((_, i) => (
                <button key={i} style={S.dot(i === current)} onClick={() => goTo(i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {modalOpen && (
        <div style={S.modalOverlay} onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <div
            ref={modalRef}
            style={{
              ...S.modal,
              ...(isMobile ? {
                width: "100vw",
                height: "100vh",
                maxWidth: "100vw",
                maxHeight: "100vh",
                borderRadius: "0px",
                margin: "0",
              } : {
                width: "95vw",
                height: "95vh",
                maxWidth: "1100px",
                maxHeight: "90vh",
                borderRadius: "20px",
              }),
            }}
          >
            {/* Header */}
            <div style={S.modalHeader}>
              <div style={{ flexShrink: 0 }}>
                <div style={S.modalTitle}>
                  {templates[current].label} Template
                  {hasCurrentTemplateEdits && (
                    <span style={{
                      fontSize: "10px",
                      background: "#fef3c7",
                      color: "#d97706",
                      padding: "2px 6px",
                      borderRadius: "10px",
                      marginLeft: "8px"
                    }}>
                      Edited
                    </span>
                  )}
                </div>
                <div style={S.modalSubtitle}>Preview · Edit · Download</div>
              </div>

              {!isMobile && (
                <div style={S.tabsDesktop}>
                  {templates.map((t, i) => (
                    <button key={t.id} style={S.tab(i === current)} onClick={() => switchTemplate(i)}>
                      <span>{t.label}</span>
                      {editedTemplates[t.id] && (
                        <span style={{
                          width: "6px", height: "6px",
                          background: "#10b981", borderRadius: "50%",
                          display: "inline-block", marginLeft: "4px"
                        }} />
                      )}
                    </button>
                  ))}
                </div>
              )}

              <button
                style={S.closeBtn}
                onClick={() => setModalOpen(false)}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#0f172a"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#64748b"; }}
              >
                ×
              </button>
            </div>

            {/* Tabs — mobile */}
            {isMobile && (
              <div style={S.modalTabsMobile}>
                {templates.map((t, i) => (
                  <button
                    key={t.id}
                    style={{
                      ...S.tab(i === current),
                      background: i === current ? "#6366f1" : "#f1f5f9",
                      color: i === current ? "#fff" : "#64748b",
                      borderRadius: "8px", border: "none", cursor: "pointer",
                      fontSize: "11px", padding: "6px 10px", whiteSpace: "nowrap",
                      fontWeight: "600",
                    }}
                    onClick={() => switchTemplate(i)}
                  >
                    {t.label}
                    {editedTemplates[t.id] && (
                      <span style={{
                        width: "6px", height: "6px",
                        background: i === current ? "#fff" : "#10b981",
                        borderRadius: "50%", display: "inline-block", marginLeft: "4px"
                      }} />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* ✅ FIXED: Body — proper mobile resume scaling */}
            <div style={S.modalBody}>
              {/*
                Outer container: exact size of the SCALED resume
                This prevents overflow and centers correctly on all screen sizes
              */}
              <div style={{
                width: `${scaledWidth}px`,
                height: `${scaledHeight}px`,
                position: "relative",
                flexShrink: 0,
              }}>
                {/*
                  Inner: always 794px wide, scaled down via transform
                  transformOrigin: top left so it scales from the correct anchor
                */}
                <div style={{
                  width: "794px",
                  minHeight: "1123px",
                  transform: `scale(${resumeScale})`,
                  transformOrigin: "top left",
                  background: "#fff",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}>
                  <div ref={resumeRef} style={{ width: "794px", minHeight: "1123px" }}>
                    <ActiveTemplate
                      key={currentTemplateId}
                      data={currentData}
                      setData={updateCurrentData}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={S.modalFooter}>
              <div style={S.footerNav}>
                <button
                  style={S.footerNavBtn} onClick={prev}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
                >← Prev</button>
                <button
                  style={S.footerNavBtn} onClick={next}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
                >Next →</button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "500" }}>
                  {current + 1} / {templates.length}
                </span>

                <button
                  style={S.downloadBtn(isProcessing)}
                  onClick={handleSaveAndDownload}
                  disabled={isProcessing}
                  onMouseEnter={(e) => { if (!isProcessing) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.4)"; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px rgba(99,102,241,0.3)"; }}
                >
                  {isProcessing ? <Loader /> : (
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  )}
                  {isProcessing ? "Processing..." : "Save & Download PDF"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}