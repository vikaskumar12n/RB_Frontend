import { useState, useEffect } from "react";
import React from "react";
import SoftwareEnn from "../template/softwareEnn";
import ClassicTemplate from "../template/ClassicTemplate";
import ModernTemplate from "../template/ModernTemplate";
import MinimalTemplate from "../template/MinimalTemplate";
import ExecutiveTemplate from "../template/ExecutiveTemplate";
import CreativeTemplate from "../template/CreativeTemplate";
import { saveToAPI } from "../helper/PdfHelpers";
const A4_HEIGHT_PX = 1122;
const A4_WIDTH_PX  = 794;
const CARD_SCALE   = 0.32;
const card=720
const CARD_HEIGHT  = card * CARD_SCALE;

// ── Template registry ──────────────────────────────────────────────────────
const TEMPLATES = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional black & white, ATS-friendly",
    preview: { accent: "#111" },
    component: ClassicTemplate,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Blue sidebar with clean typography",
    preview: { accent: "#a0c4e8" },
    component: ModernTemplate,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Green accents, open and airy layout",
    preview: { accent: "#059669" },
    component: MinimalTemplate,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Dark header with gold accents",
    preview: { accent: "#e2a04a" },
    component: ExecutiveTemplate,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Purple tones with skill bars",
    preview: { accent: "#6d28d9" },
    component: CreativeTemplate,
  },
  {
    id: "SoftwareEnn",
    name: "Software Engineer",
    description: "White and dark",
    preview: { accent: "#1a1a2e" },
    component: SoftwareEnn,
  },
];
  
// ── Load libraries ─────────────────────────────────────────────────────────
const loadLibraries = () =>
  new Promise((resolve, reject) => {
    const loaded = {
      html2canvas: !!window.html2canvas,
      jsPDF: !!(window.jspdf?.jsPDF),
    };

    const check = () => {
      if (loaded.html2canvas && loaded.jsPDF) resolve();
    };

    // Pehle check karo — agar already loaded hain toh turant resolve
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
    scale: 2, // 3 ki jagah 2 try karein, file size bhi kam hogi aur alignment stable rahegi
    useCORS: true,
    allowTaint: false,
    backgroundColor: "#ffffff",
    letterRendering: true, // Font spacing ko sahi rakhta hai
    logging: false,
    windowWidth: A4_WIDTH_PX,
    windowHeight: A4_HEIGHT_PX,
    onclone: (clonedDoc) => {
      const clonedEl = clonedDoc.getElementById(elementId);
      clonedEl.style.transform = "none";
      clonedEl.style.width = `${A4_WIDTH_PX}px`;
      
      // Force render hidden elements if any
      clonedEl.style.display = "block";
    },
  });
};

const generatePDF = async (selectedId, hasPage2) => {
  await loadLibraries();
  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [A4_WIDTH_PX, A4_HEIGHT_PX],
    hotfixes: ["px_scaling"],
  });

  // Page 1
  const canvas1 = await captureElement("resume-page-1");
  if (!canvas1) throw new Error("Page 1 capture failed");
  const imgData1 = canvas1.toDataURL("image/jpeg", 0.95);
  pdf.addImage(imgData1, "JPEG", 0, 0, A4_WIDTH_PX, A4_HEIGHT_PX, undefined, 'FAST');

  // Page 2
  if (hasPage2) {
    const canvas2 = await captureElement("resume-page-2");
    if (canvas2) {
      pdf.addPage([A4_WIDTH_PX, A4_HEIGHT_PX], "portrait");
      const imgData2 = canvas2.toDataURL("image/jpeg", 0.95);
      pdf.addImage(imgData2, "JPEG", 0, 0, A4_WIDTH_PX, A4_HEIGHT_PX, undefined, 'FAST');
    }
  }

  pdf.save(`resume_${selectedId}.pdf`);
};
  
// ── Overlay backdrop ───────────────────────────────────────────────────────
const Overlay = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.65)", backdropFilter: "blur(2px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

// ── Single template preview card ───────────────────────────────────────────
const TemplateCard = ({ template, onOpen }) => {
  const { name, description, component: TemplComp } = template;
  return (
    <div
      onClick={() => onOpen(template.id)}
      style={{
        cursor: "pointer", borderRadius: "12px", overflow: "hidden",
        border: "2px solid #e5e7eb", transition: "all 0.2s", background: "#fff",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.04)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Scaled-down live preview */}
      <div style={{ height: `${CARD_HEIGHT}px`, position: "relative", overflow: "hidden", background: "#f9fafb" }}>
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: `${A4_WIDTH_PX}px`, height: `${A4_HEIGHT_PX}px`,
          transform: `scale(${CARD_SCALE})`, transformOrigin: "top left",
          pointerEvents: "none", userSelect: "none",
        }}>
          <TemplComp data={{}} setData={() => {}} />
        </div>
        {/* hover hint */}
        <div
          style={{
            position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.2s",
            background: "rgba(0,0,0,0.3)", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
        >
          <span style={{
            color: "#fff", fontSize: "13px", fontWeight: 600,
            background: "rgba(0,0,0,0.55)", padding: "8px 18px", borderRadius: "8px",
          }}>
            Click to Edit
          </span>
        </div>
      </div>
      <div style={{ background: "#fff", padding: "10px 14px", borderTop: "1px solid #f3f4f6" }}>
        <div style={{ fontWeight: 600, fontSize: "13px", color: "#1f2937" }}>{name}</div>
        <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>{description}</div>
      </div>
    </div>
  );
};

// ── All-Templates modal ────────────────────────────────────────────────────
const AllTemplatesModal = ({ onSelect, onClose }) => (
  <Overlay onClose={onClose}>
    <div style={{
      width: "min(900px, 95vw)", maxHeight: "90vh",
      background: "#fff", borderRadius: "16px",
      display: "flex", flexDirection: "column", overflow: "hidden",
      boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
    }}>
      {/* header */}
      <div style={{
        padding: "20px 24px", borderBottom: "1px solid #e5e7eb",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#111827" }}>All Templates</h2>
          <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#6b7280" }}>
            Koi bhi template chunein aur seedha edit karein
          </p>
        </div>
        <button onClick={onClose} style={{
          background: "#f3f4f6", border: "none", borderRadius: "50%",
          width: "36px", height: "36px", cursor: "pointer", fontSize: "18px",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#374151",
        }}>×</button>
      </div>
      {/* grid */}
      <div style={{
        overflowY: "auto", padding: "24px",
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px",
      }}>
        {TEMPLATES.map((t) => (
          <TemplateCard key={t.id} template={t} onOpen={(id) => { onSelect(id); onClose(); }} />
        ))}
      </div>
    </div>
  </Overlay>
);

// ── Blank editable Page 2 ──────────────────────────────────────────────────
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
    <div
      id="resume-page-2"
      style={{
        width: `${A4_WIDTH_PX}px`, minHeight: `${A4_HEIGHT_PX}px`,
        backgroundColor: "#fff", padding: "48px 52px",
        boxSizing: "border-box", fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ height: "4px", backgroundColor: accentColor || "#1e3a5f", marginBottom: "28px", borderRadius: "2px" }} />
      {[1, 2, 3].map((n) => (
        <div key={n}>
          <div
            contentEditable suppressContentEditableWarning
            onBlur={(e) => update(`heading${n}`, e.currentTarget.innerText)}
            style={headingStyle}
          >
            {pageData[`heading${n}`] || (n === 1 ? "Additional Information" : n === 2 ? "Another Section" : "Third Section (Optional)")}
          </div>
          <div
            contentEditable suppressContentEditableWarning
            onBlur={(e) => update(`body${n}`, e.currentTarget.innerText)}
            style={bodyStyle}
          >
            {pageData[`body${n}`] || "Yahan click karke likhna shuru karein..."}
          </div>
        </div>
      ))}
      <div className="no-print" style={{ marginTop: "40px", textAlign: "center" }}>
        <button
          onClick={onRemove}
          style={{
            fontSize: "12px", color: "#ef4444", background: "none",
            border: "1px dashed #ef4444", borderRadius: "6px",
            padding: "6px 18px", cursor: "pointer",
          }}
        >🗑 Page 2 hatao</button>
      </div>
    </div>
  );
};

// ── Resume Editor Modal ────────────────────────────────────────────────────
const ResumeEditorModal = ({
  selectedId, resumeData, setResumeData,
  hasPage2, setHasPage2, page2Data, setPage2Data,
  isOverflowing, downloading, onDownload, onClose,
  onTemplateChange, resetKey,
}) => {
  const selectedTemplate  = TEMPLATES.find((t) => t.id === selectedId);
  const TemplateComponent = selectedTemplate?.component;
  const accentColor       = selectedTemplate?.preview?.accent;

  return (
    <Overlay onClose={onClose}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        width: "min(960px, 98vw)", height: "95vh",
        background: "#f3f4f6", borderRadius: "16px",
        display: "flex", flexDirection: "column", overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
      }}>

        {/* ── Top bar ── */}
        <div style={{
          background: "#fff", borderBottom: "1px solid #e5e7eb",
          padding: "12px 20px", display: "flex", alignItems: "center",
          justifyContent: "space-between", flexShrink: 0,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "#6b7280" }}>
              ← Back
            </button>
            <span style={{ color: "#d1d5db" }}>|</span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>
              {selectedTemplate?.name} Template
            </span>
            {hasPage2 && (
              <span style={{ fontSize: "11px", color: "#9ca3af", background: "#f3f4f6", padding: "2px 8px", borderRadius: "999px" }}>
                2 Pages
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Template switcher */}
            <select
              value={selectedId || ""}
              onChange={(e) => onTemplateChange(e.target.value)}
              style={{
                fontSize: "13px", border: "1px solid #d1d5db", borderRadius: "8px",
                padding: "6px 12px", color: "#374151", background: "#fff", outline: "none",
              }}
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>

            {/* Download button */}
            <button
              onClick={onDownload}
              disabled={downloading}
              style={{
                padding: "8px 20px", borderRadius: "8px", border: "none",
                color: "#fff", fontSize: "13px", fontWeight: 600,
                background: downloading ? "#93c5fd" : "#2563eb",
                cursor: downloading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: "6px",
              }}
            >
              {downloading ? (
                <>
                  <span style={{
                    width: "13px", height: "13px",
                    border: "2px solid rgba(255,255,255,0.4)",
                    borderTopColor: "#fff", borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                    display: "inline-block",
                  }} />
                  Generating...
                </>
              ) : "⬇ Download PDF"}
            </button>

            <button onClick={onClose} style={{
              background: "#f3f4f6", border: "none", borderRadius: "50%",
              width: "34px", height: "34px", cursor: "pointer", fontSize: "18px",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#374151",
            }}>×</button>
          </div>
        </div>

        {/* Hint bar */}
        <div style={{
          textAlign: "center", fontSize: "12px", color: "#9ca3af",
          padding: "6px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", flexShrink: 0,
        }}>
          💡 Click on any text to edit it directly
        </div>

        {/* Overflow warning */}
        {isOverflowing && !hasPage2 && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 20px", background: "#fff7ed", borderBottom: "1px solid #fed7aa", flexShrink: 0,
          }}>
            <span style={{ fontSize: "13px", color: "#92400e" }}>
              ⚠️ Content exceeded A4 size — add Page 2
            </span>
            <button
              onClick={() => setHasPage2(true)}
              style={{
                fontSize: "12px", fontWeight: 600, padding: "6px 14px", borderRadius: "8px",
                border: "none", color: "#fff", cursor: "pointer", background: accentColor || "#1e3a5f",
              }}
            >
              + Page 2 Add
            </button>
          </div>
        )}

        {/* ── Scrollable canvas ── */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "24px 0",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "24px",
        }}>

          {/* Page 1 */}
          <div>
            <div style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", marginBottom: "6px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Page 1
            </div>
            <div
              id="resume-page-1"
              style={{
                width: `${A4_WIDTH_PX}px`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                borderRadius: "4px", overflow: "hidden",
                outline: isOverflowing && !hasPage2 ? "2px dashed #f97316" : "2px solid transparent",
              }}
            >
              {TemplateComponent && (
                <TemplateComponent
                  key={`${selectedId}-${resetKey}`}
                  data={resumeData}
                  setData={setResumeData}
                />
              )}
            </div>
          </div>

          {/* Add Page 2 button */}
          {!hasPage2 && (
            <button
              onClick={() => setHasPage2(true)}
              style={{
                width: `${A4_WIDTH_PX}px`, padding: "18px", cursor: "pointer",
                border: `2px dashed ${isOverflowing ? (accentColor || "#f97316") : "#d1d5db"}`,
                borderRadius: "12px",
                background: isOverflowing ? "#fff7ed" : "#f9fafb",
                color: isOverflowing ? (accentColor || "#f97316") : "#9ca3af",
                fontSize: "13px", fontWeight: 500,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              <span style={{ fontSize: "20px" }}>+</span>
              {isOverflowing ? "⚠️add page 2— content exceeds A4 size" : " add Page 2(optional)"}
            </button>
          )}

          {/* Page 2 */}
          {hasPage2 && (
            <div>
              <div style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", marginBottom: "6px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Page 2
              </div>
              <div style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)", borderRadius: "4px", overflow: "hidden" }}>
                <BlankPage
                  pageData={page2Data}
                  setPageData={setPage2Data}
                  accentColor={accentColor}
                  onRemove={() => { setHasPage2(false); setPage2Data({}); }}
                />
              </div>
            </div>
          )}

          <div style={{ height: "40px" }} />
        </div>
      </div>
    </Overlay>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ── Main Builder ──────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
const Builder = () => {
  const [selectedId,    setSelectedId]    = useState(null);
  const [resumeData,    setResumeData]    = useState({});
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [hasPage2,      setHasPage2]      = useState(false);
  const [page2Data,     setPage2Data]     = useState({});
  const [resetKey,      setResetKey]      = useState(0);
  const [downloading,   setDownloading]   = useState(false);
  const [toast,         setToast]         = useState(null); // { type, msg }

  const [showAllModal,    setShowAllModal]    = useState(false);
  const [showEditorModal, setShowEditorModal] = useState(false);

  const selectedTemplate = TEMPLATES.find((t) => t.id === selectedId);
  const accentColor      = selectedTemplate?.preview?.accent;

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  // Open a template → launch editor
  const handleOpenTemplate = (id) => {
    setSelectedId(id);
    setResumeData({});
    setPage2Data({});
    setHasPage2(false);
    setResetKey((k) => k + 1);
    setShowEditorModal(true);
  };

  // Switch template inside editor
  const handleTemplateChange = (id) => {
    setSelectedId(id);
    setResumeData({});
    setPage2Data({});
    setHasPage2(false);
    setResetKey((k) => k + 1);
  };

  // ── Download: save → generate PDF ──────────────────────────────────────
 const handleDownload = async () => {
  if (!selectedId) {
    alert("❌ please Select any One template");
    return;
  }

  if (!resumeData || Object.keys(resumeData).length === 0) {
    alert("❌ Resume empty");
    return;
  }

  setDownloading(true);

  try {
    //  API save
    await saveToAPI(resumeData, selectedId);

    //  PDF generate
    await generatePDF(selectedId, hasPage2);

  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  } finally {
    setDownloading(false);
  }
};

  // Overflow detection (runs only when editor is open)
  useEffect(() => {
    if (!showEditorModal) return;
    const check = () => {
      const el = document.getElementById("resume-page-1");
      if (!el) return;
      setIsOverflowing(el.scrollHeight > A4_HEIGHT_PX + 10);
    };
    check();
    const el = document.getElementById("resume-page-1");
    if (!el) return;
    const obs = new ResizeObserver(check);
    obs.observe(el);
    return () => obs.disconnect();
  }, [showEditorModal, resumeData]);

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div
      style={{ minHeight: "100vh", background: "#f8fafc", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111827", margin: 0 }}>
            Semples Resume
          </h1>
          <p style={{ color: "#6b7280", marginTop: "8px", fontSize: "14px" }}>
           Choose a template, edit it, and download the PDF — directly in your browser.
          </p>
        </div>

        {/* Template grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px", marginBottom: "32px",
        }}>
          {TEMPLATES.slice(0, 5).map((t) => (
            <TemplateCard key={t.id} template={t} onOpen={handleOpenTemplate} />
          ))}

          {/* "All Templates" tile */}
          <div
            onClick={() => setShowAllModal(true)}
            style={{
              cursor: "pointer", borderRadius: "12px",
              border: "2px dashed #d1d5db", background: "#f9fafb",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              height: `${CARD_HEIGHT + 56}px`,
              gap: "10px", transition: "all 0.2s", color: "#6b7280",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#2563eb";
              e.currentTarget.style.color = "#2563eb";
              e.currentTarget.style.background = "#eff6ff";
              e.currentTarget.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.color = "#6b7280";
              e.currentTarget.style.background = "#f9fafb";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span style={{ fontSize: "32px" }}>⊞</span>
            <span style={{ fontSize: "14px", fontWeight: 600 }}>All Templates</span>
            <span style={{ fontSize: "11px", opacity: 0.7 }}>See all template</span>
          </div>
        </div>

        {/* Re-open editor bar (when editor is closed but template is selected) */}
        {selectedId && !showEditorModal && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px",
            padding: "16px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}>
            <span>
              <span style={{ fontSize: "13px", color: "#6b7280" }}>Selected: </span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>
                {selectedTemplate?.name}
              </span>
            </span>
            <button
              onClick={() => setShowEditorModal(true)}
              style={{
                padding: "9px 22px", borderRadius: "8px", border: "none",
                background: accentColor || "#2563eb", color: "#fff",
                fontWeight: 600, fontSize: "13px", cursor: "pointer",
              }}
            >
              ✏️ Resume Edit 
            </button>
          </div>
        )}
      </div>

      {/* Toast notification */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 99999,
          padding: "12px 20px", borderRadius: "10px",
          background: toast.type === "success" ? "#d1fae5"
            : toast.type === "error"   ? "#fee2e2"
            : toast.type === "warning" ? "#fff7ed"
            : "#dbeafe",
          color: toast.type === "success" ? "#065f46"
            : toast.type === "error"   ? "#991b1b"
            : toast.type === "warning" ? "#92400e"
            : "#1e40af",
          fontSize: "13px", fontWeight: 600,
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        }}>
          {toast.msg}
        </div>
      )}

      {/* All Templates Modal */}
      {showAllModal && (
        <AllTemplatesModal
          onSelect={handleOpenTemplate}
          onClose={() => setShowAllModal(false)}
        />
      )}

      {/* Resume Editor Modal */}
      {showEditorModal && selectedId && (
        <ResumeEditorModal
          selectedId={selectedId}
          resumeData={resumeData}
          setResumeData={setResumeData}
          hasPage2={hasPage2}
          setHasPage2={setHasPage2}
          page2Data={page2Data}
          setPage2Data={setPage2Data}
          isOverflowing={isOverflowing}
          downloading={downloading}
          onDownload={handleDownload}
          onClose={() => setShowEditorModal(false)}
          onTemplateChange={handleTemplateChange}
          resetKey={resetKey}
        />
      )}
    </div>
  );
};

export default Builder;