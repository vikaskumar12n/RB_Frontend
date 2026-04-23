// // ResumeContext.jsx - Fixed version

// import { createContext, useContext, useState } from "react";
// import React from "react";
// import { saveToAPI } from "../api/Api";
// const ResumeContext = createContext();

// export const ResumeProvider = ({ children }) => {
//   const [downloading, setDownloading] = useState(false);

//   const downloadResumePDF = async (resumeData, selectedId, hasPage2) => {
//     try {
//       setDownloading(true);

//       const html2canvas = (await import("html2canvas")).default;
//       const jsPDFModule = await import("jspdf");
//       const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;

//       //  SAVE API
//      await saveToAPI(resumeData, selectedId);

//       console.log(" Resume saved");

//    const capture = async (id) => {
//   const el = document.getElementById(id);
//   if (!el) throw new Error(`Element ${id} not found`);

//   window.scrollTo(0, 0);

//   await new Promise(resolve => setTimeout(resolve, 150));

//   const canvas = await html2canvas(el, {
//     scale: 3,            
//     useCORS: true,
//     backgroundColor: "#ffffff",
//     logging: false, 
//     scrollY: -window.scrollY, 
//     scrollX: 0,
//     windowWidth: el.scrollWidth,
//     windowHeight: el.scrollHeight,
//     onclone: (clonedDoc) => { 
//       const clonedEl = clonedDoc.getElementById(id);
//       clonedEl.style.transform = "none";
//       clonedEl.style.transition = "none";
//     }
//   });

//   return canvas;
// };
//       const pdf = new jsPDF({ 
//         unit: "mm", 
//         format: "a4",
//         orientation: "portrait"
//       });

//       // Capture Page 1
//       console.log("Capturing page 1...");
//       const c1 = await capture("resume");

//       // Calculate proper dimensions for A4
//       const imgWidth = 210; // A4 width in mm
//       const imgHeight = (c1.height * imgWidth) / c1.width;

//       console.log(`Canvas size: ${c1.width}x${c1.height}, PDF height: ${imgHeight}mm`);

//       pdf.addImage(c1.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0, imgWidth, imgHeight);

//       // Capture Page 2 if exists
//       if (hasPage2) {
//         console.log("Capturing page 2...");
//         const c2 = await capture("resume-page-2");
//         if (c2) {
//           const imgHeight2 = (c2.height * imgWidth) / c2.width;
//           pdf.addPage();
//           pdf.addImage(c2.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0, imgWidth, imgHeight2);
//         }
//       }

//       pdf.save(`resume-${selectedId || "file"}.pdf`);
//       console.log(" PDF saved successfully");

//     } catch (err) {
//       console.error("PDF Error:", err);
//       alert("❌ Error in download: " + err.message);
//     } finally {
//       setDownloading(false);
//     }
//   };

//   return (
//     <ResumeContext.Provider value={{ downloadResumePDF, downloading, setDownloading }}>
//       {children}
//     </ResumeContext.Provider>
//   );
// };

// export const useResume = () => useContext(ResumeContext);
// ResumeContext.jsx
import { createContext, useContext, useState } from "react";
import React from "react";
import { saveToAPI } from "../api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [downloading, setDownloading] = useState(false);

  const [showEditorModal, setShowEditorModal] = useState(false);

  const downloadResumePDF = async (resumeData, selectedId, hasPage2) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("Please login first to download resume!");
      setTimeout(() => {
        setShowEditorModal(false);
        window.dispatchEvent(new CustomEvent("openAuthModal", {
          detail: { tab: "login", onSuccess: () => setShowEditorModal(true) }
        }));
      }, 0);
      return;
    }

    try {
      setDownloading(true);

      // API call aur imports PARALLEL mein shuru karo
      const dataWithoutPhoto = { ...resumeData };
      delete dataWithoutPhoto.photo;

      const [html2canvasModule, jsPDFModule] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
        saveToAPI(dataWithoutPhoto, selectedId).catch(err =>
          console.log("Save failed", err)  // Save fail hone pe download rok mat
        )
      ]);

      const html2canvas = html2canvasModule.default;
      const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;

      const capture = async (id) => {
        const el = document.getElementById(id);
        if (!el) throw new Error(`Element ${id} not found`);

        window.scrollTo(0, 0);
        await new Promise(resolve => setTimeout(resolve, 50));

        return html2canvas(el, {
          scale: 1.2,           // 1.5 → 1.2, bahut faster, quality kaafi achhi rehti hai
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
          scrollY: -window.scrollY,
          scrollX: 0,
          windowWidth: el.scrollWidth,
          windowHeight: el.scrollHeight,
          onclone: (clonedDoc) => {
            const clonedEl = clonedDoc.getElementById(id);
            clonedEl.style.transform = "none";
            clonedEl.style.transition = "none";
          }
        });
      };

      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

      // Page 1 aur Page 2 parallel capture karo
      const capturePromises = [capture("resume")];
      if (hasPage2) capturePromises.push(capture("resume-page-2"));

      const [c1, c2] = await Promise.all(capturePromises);

      const imgWidth = 210;
      pdf.addImage(
        c1.toDataURL("image/jpeg", 0.75),  // 0.8 → 0.75, faster with negligible quality loss
        "JPEG", 0, 0, imgWidth, (c1.height * imgWidth) / c1.width
      );

      if (c2) {
        pdf.addPage();
        pdf.addImage(
          c2.toDataURL("image/jpeg", 0.75),
          "JPEG", 0, 0, imgWidth, (c2.height * imgWidth) / c2.width
        );
      }

      pdf.save(`resume-${selectedId || "file"}.pdf`);

      toast.success("Resume downloaded successfully!");

    } catch (err) {
      console.error("PDF Error:", err);
      toast.error("Error in download: " + err.message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <ResumeContext.Provider value={{ downloadResumePDF, downloading, setDownloading }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);