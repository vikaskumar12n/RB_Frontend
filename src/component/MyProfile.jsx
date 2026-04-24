import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SoftwareEnn from "../template/SoftwareEnn";
import ClassicTemplate from "../template/ClassicTemplate";
import ModernTemplate from "../template/ModernTemplate";
import MinimalTemplate from "../template/MinimalTemplate";
import CreativeTemplate from "../template/CreativeTemplate";
import SoftwareEnnV2 from "../template/SoftwareEnnv2";
import { saveToAPI } from "../api/Api";


const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1122;
const CARD_SCALE = 0.22;

const TEMPLATES = [
  { id: "Software Developer",     name: "Software Developer Template", component: SoftwareEnnV2, color: "#8b5cf6" },
  { id: "software-eng", name: "Software Engineer", component: SoftwareEnn,      color: "#2563eb" },
  { id: "classic",      name: "Classic Template",  component: ClassicTemplate,  color: "#1e3a5f" },
  { id: "modern",       name: "Modern Template",   component: ModernTemplate,   color: "#0ea5e9" },
  { id: "minimal",      name: "Minimal Template",  component: MinimalTemplate,  color: "#64748b" },
  { id: "creative",     name: "Creative Template", component: CreativeTemplate, color: "#8b5cf6" },
];

 
// ── PDF helpers ───────────────────────────────────────────────────────────────
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

// ── useBreakpoint hook ────────────────────────────────────────────────────────
const useBreakpoint = () => {
  const [bp, setBp] = useState(() => {
    const w = window.innerWidth;
    if (w < 640) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  });
  useEffect(() => {
    const handler = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return bp;
};

// ── Responsive resume preview scale ──────────────────────────────────────────
const useResumeScale = (containerRef) => {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const calc = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth - 32;
        const s = Math.min(1, w / A4_WIDTH_PX);
        setScale(s);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [containerRef]);
  return scale;
};

// ── FIXED: Modal-specific scale hook using window width directly ──────────────
const useModalResumeScale = () => {
  const [scale, setScale] = useState(1);

  const calc = useCallback(() => {
    // Modal preview area: full window width minus padding and sidebar
    // On mobile: full width - 32px padding
    // On tablet/desktop: roughly 60% of window or constrained
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;

    let availableWidth;
    if (isMobile) {
      availableWidth = window.innerWidth - 32;
    } else if (isTablet) {
      availableWidth = window.innerWidth - 48;
    } else {
      // Desktop modal: left panel (editor) + right panel (preview)
      // preview panel takes remaining space
      availableWidth = window.innerWidth * 0.55 - 48;
    }

    const s = Math.min(1, Math.max(0.3, availableWidth / A4_WIDTH_PX));
    setScale(s);
  }, []);

  useEffect(() => {
    // Run immediately and after a small delay to ensure DOM is painted
    calc();
    const t = setTimeout(calc, 100);
    window.addEventListener("resize", calc);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", calc);
    };
  }, [calc]);

  return scale;
};

// ── Editor Modal ──────────────────────────────────────────────────────────────
const EditorModal = ({ isOpen, onClose, template, resumeData, setResumeData, onSaved }) => {
  const previewAreaRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [toast,   setToast]   = useState(null);
  const bp = useBreakpoint();

  // ── FIXED: Calculate scale from the actual preview area container ──
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    if (!isOpen) return;

    const recalc = () => {
      if (previewAreaRef.current) {
        const containerW = previewAreaRef.current.offsetWidth - 48; // 24px padding each side
        const s = Math.min(1, Math.max(0.3, containerW / A4_WIDTH_PX));
        setPreviewScale(s);
      }
    };

    // Delay to let the modal render fully before measuring
    const t1 = setTimeout(recalc, 50);
    const t2 = setTimeout(recalc, 200); // second pass for fonts/images

    const ro = new ResizeObserver(recalc);
    if (previewAreaRef.current) ro.observe(previewAreaRef.current);
    window.addEventListener("resize", recalc);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener("resize", recalc);
    };
  }, [isOpen]);

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

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen || !template) return null;
  const TemplateComponent = template.component;

  const isMobile  = bp === "mobile";
  const isDesktop = bp === "desktop";

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.72)",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed",
          top: isMobile ? "auto" : "68px",
          bottom: isMobile ? "20px" : "auto",
          right: "16px", zIndex: 10001,
          background: toast.type === "error" ? "#fef2f2" : "#f0fdf4",
          border: `1px solid ${toast.type === "error" ? "#fca5a5" : "#86efac"}`,
          color: toast.type === "error" ? "#dc2626" : "#16a34a",
          padding: "10px 18px", borderRadius: "10px",
          fontSize: "13px", fontWeight: "500",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
          {toast.msg}
        </div>
      )}

      {/* Modal container — intercept clicks so backdrop doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}
      >
        {/* ── Top Bar ── */}
        <div style={{
          background: "#fff",
          borderBottom: "1px solid #e2e8f0",
          padding: "0 16px",
          height: isMobile ? "52px" : "56px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={onClose}
              style={{
                background: "none", border: "1px solid #e2e8f0", borderRadius: "8px",
                padding: isMobile ? "5px 10px" : "6px 14px",
                cursor: "pointer", fontSize: "13px", color: "#475569",
              }}
            >
              ← {!isMobile && "Back"}
            </button>
            {!isMobile && <div style={{ width: "1px", height: "22px", background: "#e2e8f0" }} />}
            <span style={{
              fontSize: isMobile ? "13px" : "14px", fontWeight: "700",
              color: template.color, whiteSpace: "nowrap",
              overflow: "hidden", textOverflow: "ellipsis",
              maxWidth: isMobile ? "120px" : "none",
            }}>
              {template.name}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {isDesktop && (
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>✏️ Click any text to edit</span>
            )}
            <button
              onClick={handleSaveDownload}
              disabled={loading}
              style={{
                background: "#1c398e", border: "none", color: "#fff",
                borderRadius: "8px",
                padding: isMobile ? "7px 12px" : "8px 24px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: isMobile ? "12px" : "13px",
                fontWeight: "600", whiteSpace: "nowrap",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Saving..." : isMobile ? "Save & PDF" : "Save & Download PDF"}
            </button>
          </div>
        </div>

        {/* ── Hint bar ── */}
        <div style={{
          background: "#fffbeb", borderBottom: "1px solid #fde68a",
          padding: "5px 16px", fontSize: "11px", color: "#92400e",
          textAlign: "center", flexShrink: 0,
        }}>
          💡 Click directly on any text in the resume to edit it.
        </div>

        {/* ── Preview Area ── */}
       <div
  ref={previewAreaRef}
  style={{
    flex: 1,
    overflowY: "auto",
    padding: isMobile ? "16px 16px 60px" : "32px 24px 60px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    background: "#f1f5f9",
  }}
>
  <div style={{
    fontSize: "11px", color: "#94a3b8",
    letterSpacing: "2px", textTransform: "uppercase",
  }}>
    Page 1
  </div>

  {/* Resume wrapper — FIXED */}
  <div style={{
    width: `${A4_WIDTH_PX * previewScale}px`,   // ← container shrinks with scale
    height: `${A4_HEIGHT_PX * previewScale}px`, // ← height bhi adjust hoti h
    flexShrink: 0,
    overflow: "visible",
  }}>
    <div style={{
      width: `${A4_WIDTH_PX}px`,
      transformOrigin: "top left",              // ← top left kiya
      transform: `scale(${previewScale})`,      // ← sirf scale, koi margin nahi
    }}>
      <div
        id="resume-page-1"
        style={{
          boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
          borderRadius: "2px",
          width: `${A4_WIDTH_PX}px`,
          background: "#fff",
        }}
      >
        <TemplateComponent data={resumeData} setData={setResumeData} />
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

// ── Bottom Sheet for mobile (template selector) ───────────────────────────────
const TemplateBottomSheet = ({ isOpen, onClose, templates, selectedId, resumeDataMap, onSelect }) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 8000,
        background: "rgba(0,0,0,0.5)",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: "16px 16px 0 0",
          padding: "16px 0 32px", maxHeight: "70vh",
          display: "flex", flexDirection: "column",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 16px 12px", borderBottom: "1px solid #f1f5f9",
        }}>
          <span style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b" }}>Choose Template</span>
          <button onClick={onClose} style={{ border: "none", background: "none", fontSize: "20px", color: "#94a3b8", cursor: "pointer" }}>×</button>
        </div>
        <div style={{
          overflowY: "auto", padding: "12px 16px",
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px",
        }}>
          {templates.map(t => {
            const isActive = t.id === selectedId;
            const hasData  = !!resumeDataMap[t.id];
            const Comp     = t.component;
            const data     = resumeDataMap[t.id] ;
            return (
              <div
                key={t.id}
                onClick={() => { onSelect(t.id); onClose(); }}
                style={{
                  cursor: "pointer", borderRadius: "10px",
                  border: isActive ? `2px solid ${t.color}` : "1.5px solid #e2e8f0",
                  background: isActive ? `${t.color}08` : "#fff",
                  overflow: "hidden",
                  boxShadow: isActive ? `0 0 0 3px ${t.color}22` : "none",
                }}
              >
                <div style={{ height: `${A4_HEIGHT_PX * CARD_SCALE}px`, overflow: "hidden", background: "#f8fafc", position: "relative" }}>
                  <div style={{ width: `${A4_WIDTH_PX}px`, height: `${A4_HEIGHT_PX}px`, transform: `scale(${CARD_SCALE})`, transformOrigin: "top left", pointerEvents: "none", userSelect: "none" }}>
                    <Comp data={data} setData={() => {}} />
                  </div>
                  {isActive && (
                    <div style={{ position: "absolute", top: "6px", right: "6px", width: "20px", height: "20px", borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  )}
                </div>
                <div style={{ padding: "6px 8px", borderTop: `2px solid ${isActive ? t.color : "#f1f5f9"}` }}>
                  <div style={{ fontSize: "11px", fontWeight: "600", color: "#1e293b" }}>{t.name}</div>
                  <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "2px" }}>{hasData ? "✓ Edited" : "Not started"}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ── Main Profile Page ─────────────────────────────────────────────────────────
export default function ProfilePage({ user }) {
  const navigate   = useNavigate();
  const bp         = useBreakpoint();
  const previewRef = useRef(null);
  const previewScale = useResumeScale(previewRef);

  const currentUser = user || { name: "John Doe", email: "john@example.com", joinedDate: "Jan 2024" };

  const [selectedTemplateId, setSelectedTemplateId] = useState(TEMPLATES[0].id);
  const [resumeDataMap,      setResumeDataMap]       = useState({});
  const [editorOpen,         setEditorOpen]          = useState(false);
  const [saveCount,          setSaveCount]           = useState(0);
  const [leftPanelOpen,      setLeftPanelOpen]       = useState(false);
  const [rightPanelOpen,     setRightPanelOpen]      = useState(false);
  const [sheetOpen,          setSheetOpen]           = useState(false);

  const selectedTemplate = TEMPLATES.find(t => t.id === selectedTemplateId);
  const resumeData       = resumeDataMap[selectedTemplateId] ;

  const setResumeData = (data) => {
    setResumeDataMap(prev => ({ ...prev, [selectedTemplateId]: data }));
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";
  const isDesktop = bp === "desktop";

  const leftW  = isDesktop ? "220px" : "200px";
  const rightW = isDesktop ? "220px" : "200px";

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI', system-ui, sans-serif", }}>

      <style>{`
        @media (max-width: 639px) {
          .resume-center-preview { padding: 16px 8px 100px !important; }
        }
        @media (max-width: 1023px) {
          .three-panel { overflow: visible !important; height: auto !important; }
        }
      `}</style>

      {/* ── Top bar ── */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #e2e8f0",
        
       height: "57px",
        display: "flex", alignItems: "center", gap: "10px",
        marginTop:"70px" 
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "7px 12px", border: "1px solid #e2e8f0",
            borderRadius: "8px", background: "none", cursor: "pointer",
            fontSize: "13px", color: "#475569", flexShrink: 0,
          }}
        >
          ← {!isMobile && "Back"}
        </button>
        <span style={{ fontSize: isMobile ? "14px" : "16px", fontWeight: "700", color: "#1e293b", flex: 1 }}>
          My Resumes
        </span>

        {isMobile && (
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setSheetOpen(true)}
              style={{ padding: "7px 10px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#fff", cursor: "pointer", fontSize: "12px", color: "#475569", display: "flex", alignItems: "center", gap: "4px" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              Templates
            </button>
            <button
              onClick={() => setRightPanelOpen(v => !v)}
              style={{ padding: "7px 10px", border: "1px solid #e2e8f0", borderRadius: "8px", background: rightPanelOpen ? "#f0f9ff" : "#fff", cursor: "pointer", fontSize: "12px", color: "#475569" }}
            >
              Actions
            </button>
          </div>
        )}

        {isTablet && (
          <button
            onClick={() => setLeftPanelOpen(v => !v)}
            style={{ padding: "7px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", background: leftPanelOpen ? "#eff6ff" : "#fff", cursor: "pointer", fontSize: "12px", color: "#475569", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            Templates
          </button>
        )}
      </div>

      {/* ── Body ── */}
      {isDesktop ? (
        <div className="three-panel" style={{ display: "flex", height: "calc(100vh - 57px)", overflow: "hidden" }}>

          {/* LEFT PANEL */}
          <div style={{ width: leftW, borderRight: "1px solid #e2e8f0", background: "#fff", display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden" }}>
            <div style={{ padding: "16px 12px 12px" }}>
              <button
                onClick={() => { const next = TEMPLATES.find(t => !resumeDataMap[t.id]) || TEMPLATES[0]; setSelectedTemplateId(next.id); setEditorOpen(true); }}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "10px", border: "1.5px dashed #cbd5e1", borderRadius: "10px", background: "none", cursor: "pointer", fontSize: "13px", color: "#64748b", fontWeight: "500" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#2563eb"; e.currentTarget.style.color = "#2563eb"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.color = "#64748b"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Create New
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {TEMPLATES.map(t => (
                <TemplateCard
                  key={t.id} t={t}
                  isActive={t.id === selectedTemplateId}
                  hasData={!!resumeDataMap[t.id]}
                  data={resumeDataMap[t.id] }
                  onClick={() => setSelectedTemplateId(t.id)}
                />
              ))}
            </div>
          </div>

          {/* CENTER PANEL */}
          <div ref={previewRef} style={{ flex: 1, overflowY: "auto", background: "#f1f5f9", display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 24px" }}>
            <CenterHeader selectedTemplate={selectedTemplate} resumeDataMap={resumeDataMap} selectedTemplateId={selectedTemplateId} setSelectedTemplateId={setSelectedTemplateId} bp={bp} />
            <ResumePreviewBox selectedTemplate={selectedTemplate} resumeData={resumeData} scale={previewScale} onEdit={() => setEditorOpen(true)} />
          </div>

          {/* RIGHT PANEL */}
          <div style={{ width: rightW, borderLeft: "1px solid #e2e8f0", background: "#fff", padding: "24px 16px", display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}>
            <ActionButtons
              selectedTemplateId={selectedTemplateId} resumeData={resumeData}
              resumeDataMap={resumeDataMap} setResumeDataMap={setResumeDataMap}
              setSelectedTemplateId={setSelectedTemplateId} saveCount={saveCount}
              selectedTemplate={selectedTemplate}
            />
          </div>
        </div>

      ) : isTablet ? (
        <div style={{ display: "flex", minHeight: "calc(100vh - 57px)" }}>
          {leftPanelOpen && (
            <div style={{ width: "200px", borderRight: "1px solid #e2e8f0", background: "#fff", display: "flex", flexDirection: "column", flexShrink: 0 }}>
              <div style={{ padding: "12px 10px" }}>
                <button
                  onClick={() => { const next = TEMPLATES.find(t => !resumeDataMap[t.id]) || TEMPLATES[0]; setSelectedTemplateId(next.id); setEditorOpen(true); setLeftPanelOpen(false); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "8px", border: "1.5px dashed #cbd5e1", borderRadius: "10px", background: "none", cursor: "pointer", fontSize: "12px", color: "#64748b" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Create New
                </button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "0 10px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {TEMPLATES.map(t => (
                  <TemplateCard
                    key={t.id} t={t}
                    isActive={t.id === selectedTemplateId}
                    hasData={!!resumeDataMap[t.id]}
                    data={resumeDataMap[t.id] }
                    onClick={() => { setSelectedTemplateId(t.id); setLeftPanelOpen(false); }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={previewRef} style={{ flex: 1, overflowY: "auto", background: "#f1f5f9", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 16px 40px" }}>
            <CenterHeader selectedTemplate={selectedTemplate} resumeDataMap={resumeDataMap} selectedTemplateId={selectedTemplateId} setSelectedTemplateId={setSelectedTemplateId} bp={bp} />
            <ResumePreviewBox selectedTemplate={selectedTemplate} resumeData={resumeData} scale={previewScale} onEdit={() => setEditorOpen(true)} />
            <div style={{ width: "100%", maxWidth: "794px", marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <ActionButtons
                selectedTemplateId={selectedTemplateId} resumeData={resumeData}
                resumeDataMap={resumeDataMap} setResumeDataMap={setResumeDataMap}
                setSelectedTemplateId={setSelectedTemplateId} saveCount={saveCount}
                selectedTemplate={selectedTemplate} inline
              />
            </div>
          </div>
        </div>

      ) : (
        <div style={{ minHeight: "calc(100vh - 57px)", background: "#f1f5f9" }}>
          {rightPanelOpen && (
            <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <ActionButtons
                selectedTemplateId={selectedTemplateId} resumeData={resumeData}
                resumeDataMap={resumeDataMap} setResumeDataMap={setResumeDataMap}
                setSelectedTemplateId={setSelectedTemplateId} saveCount={saveCount}
                selectedTemplate={selectedTemplate} inline
              />
            </div>
          )}
          <div ref={previewRef} className="resume-center-preview" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 8px 100px" }}>
            <CenterHeader selectedTemplate={selectedTemplate} resumeDataMap={resumeDataMap} selectedTemplateId={selectedTemplateId} setSelectedTemplateId={setSelectedTemplateId} bp={bp} />
            <ResumePreviewBox selectedTemplate={selectedTemplate} resumeData={resumeData} scale={previewScale} onEdit={() => setEditorOpen(true)} />
          </div>

          {/* Mobile FAB */}
          <div style={{ position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)", zIndex: 200 }}>
            <button
              onClick={() => setEditorOpen(true)}
              style={{ display: "flex", alignItems: "center", gap: "8px", padding: "13px 28px", background: "#1c398e", border: "none", borderRadius: "40px", color: "#fff", fontSize: "14px", fontWeight: "600", cursor: "pointer", boxShadow: "0 6px 20px rgba(28,57,142,0.45)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit Resume
            </button>
          </div>
        </div>
      )}

      {/* ── Template Bottom Sheet (mobile) ── */}
      <TemplateBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        templates={TEMPLATES}
        selectedId={selectedTemplateId}
        resumeDataMap={resumeDataMap}
        onSelect={setSelectedTemplateId}
      />

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

// ── TemplateCard ──────────────────────────────────────────────────────────────
function TemplateCard({ t, isActive, hasData, data, onClick }) {
  const Comp = t.component;
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer", borderRadius: "10px",
        border: isActive ? `2px solid ${t.color}` : "1.5px solid #e2e8f0",
        background: isActive ? `${t.color}08` : "#fff",
        overflow: "hidden", transition: "all 0.15s",
        boxShadow: isActive ? `0 0 0 3px ${t.color}22` : "none",
      }}
    >
      <div style={{ height: `${A4_HEIGHT_PX * CARD_SCALE}px`, overflow: "hidden", position: "relative", background: "#f8fafc" }}>
        <div style={{ width: `${A4_WIDTH_PX}px`, height: `${A4_HEIGHT_PX}px`, transform: `scale(${CARD_SCALE})`, transformOrigin: "top left", pointerEvents: "none", userSelect: "none" }}>
          <Comp data={data} setData={() => {}} />
        </div>
        {isActive && (
          <div style={{ position: "absolute", top: "6px", right: "6px", width: "20px", height: "20px", borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        )}
      </div>
      <div style={{ padding: "8px 10px", borderTop: `2px solid ${isActive ? t.color : "#f1f5f9"}`, background: isActive ? `${t.color}06` : "#fff" }}>
        <div style={{ fontSize: "11px", fontWeight: "600", color: "#1e293b" }}>{t.name}</div>
        <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "2px" }}>{hasData ? "✓ Edited" : "Not started"}</div>
      </div>
    </div>
  );
}

// ── CenterHeader ──────────────────────────────────────────────────────────────
function CenterHeader({ selectedTemplate, resumeDataMap, selectedTemplateId, setSelectedTemplateId, bp }) {
  const isMobile = bp === "mobile";
  return (
    <div style={{ width: "100%", maxWidth: "794px", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
      <div>
        <h2 style={{ margin: 0, fontSize: isMobile ? "16px" : "20px", fontWeight: "700", color: "#1e293b" }}>{selectedTemplate?.name} Resume</h2>
        <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#94a3b8" }}>
          {resumeDataMap[selectedTemplateId] ? "Updated recently" : "Not edited yet"}
        </p>
      </div>
      {!isMobile && (
        <button
          onClick={() => {
            const idx  = TEMPLATES.findIndex(t => t.id === selectedTemplateId);
            const next = TEMPLATES[(idx + 1) % TEMPLATES.length];
            setSelectedTemplateId(next.id);
          }}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#fff", cursor: "pointer", fontSize: "12px", color: "#475569", fontWeight: "500" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Change Template
        </button>
      )}
    </div>
  );
}

// ── ResumePreviewBox ──────────────────────────────────────────────────────────
function ResumePreviewBox({ selectedTemplate, resumeData, scale, onEdit }) {
  return (
    <div style={{ width: "100%", maxWidth: "794px" }}>
      <div style={{
        position: "relative",
        width: `${A4_WIDTH_PX}px`,
        transformOrigin: "top left",
        transform: `scale(${scale})`,
        marginBottom: scale < 1 ? `${-(A4_HEIGHT_PX * (1 - scale))}px` : "0",
      }}>
        <div style={{
          background: "#fff",
          boxShadow: "0 8px 10px rgba(0,0,0,0.18)",
          borderRadius: "4px", overflow: "hidden",
          pointerEvents: "none", userSelect: "none",
        }}>
          {selectedTemplate && <selectedTemplate.component data={resumeData} setData={() => {}} />}
        </div>
        <div style={{ position: "absolute", top: "20px", right: "20px" }}>
          <button
            onClick={onEdit}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 20px", background: "#1c398e",
              border: "none", borderRadius: "10px", color: "#fff",
              fontSize: "13px", fontWeight: "600", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)", pointerEvents: "all",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit Resume
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ActionButtons ─────────────────────────────────────────────────────────────
function ActionButtons({ selectedTemplateId, resumeData, resumeDataMap, setResumeDataMap, setSelectedTemplateId, saveCount, selectedTemplate, inline }) {
  const btnStyle = inline
    ? { display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "10px", background: "#fff", cursor: "pointer", fontSize: "13px", color: "#1e293b", fontWeight: "500" }
    : { width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", border: "1px solid #e2e8f0", borderRadius: "10px", background: "#fff", cursor: "pointer", fontSize: "14px", color: "#1e293b", fontWeight: "500" };

  return (
    <>
      <button
        onClick={() => generatePDF(selectedTemplateId)}
        style={btnStyle}
        onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
        onMouseLeave={e => e.currentTarget.style.background = "#fff"}
      >
        <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </div>
        {inline ? <span style={{ fontSize: "13px" }}>Download</span> : "Download Resume"}
      </button>

      <button
        onClick={() => {
          const newId = TEMPLATES.find(t => !resumeDataMap[t.id])?.id;
          if (newId) { setResumeDataMap(prev => ({ ...prev, [newId]: resumeData })); setSelectedTemplateId(newId); }
        }}
        style={btnStyle}
        onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
        onMouseLeave={e => e.currentTarget.style.background = "#fff"}
      >
        <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        </div>
        {inline ? <span style={{ fontSize: "13px" }}>Duplicate</span> : "Duplicate"}
      </button>

      <button
        onClick={() => setResumeDataMap(prev => { const n = { ...prev }; delete n[selectedTemplateId]; return n; })}
        style={{
          ...(inline
            ? { display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", borderRadius: "10px", background: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: "500" }
            : { width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", borderRadius: "10px", background: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: "500" }
          ),
          border: "1px solid #fee2e2", color: "#dc2626",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
        onMouseLeave={e => e.currentTarget.style.background = "#fff"}
      >
        <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
        </div>
        {inline ? <span style={{ fontSize: "13px" }}>Delete</span> : "Delete"}
      </button>

      {!inline && (
        <>
          <div style={{ borderTop: "1px solid #f1f5f9", margin: "4px 0" }} />
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
        </>
      )}
    </>
  );
}