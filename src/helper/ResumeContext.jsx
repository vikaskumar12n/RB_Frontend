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
    console.log("User check:", storedUser);

    if (!storedUser) {
  toast.error("Please login first to download resume!");
  setTimeout(() => {
    setShowEditorModal(false);
    window.dispatchEvent(new CustomEvent("openAuthModal", {
      detail: {
        tab: "login",
        onSuccess: () => {
          setShowEditorModal(true);
        }
      }
    }));
  }, 0);
  return;
}

    try {
      setDownloading(true);

      const html2canvas = (await import("html2canvas")).default;
      const jsPDFModule = await import("jspdf");
      const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;
 
      const dataWithoutPhoto = { ...resumeData };
      delete dataWithoutPhoto.photo; 
      await saveToAPI(dataWithoutPhoto, selectedId);
      // yaha tk add hua h
      console.log("Resume saved");

      const capture = async (id) => {
        const el = document.getElementById(id);
        if (!el) throw new Error(`Element ${id} not found`);

        window.scrollTo(0, 0);
        await new Promise(resolve => setTimeout(resolve, 150));

        const canvas = await html2canvas(el, {
          scale: 3,
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

        return canvas;
      };

      const pdf = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      });

      console.log("Capturing page 1...");
      const c1 = await capture("resume");
      const imgWidth = 210;
      const imgHeight = (c1.height * imgWidth) / c1.width;
      pdf.addImage(c1.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0, imgWidth, imgHeight);

      if (hasPage2) {
        console.log("Capturing page 2...");
        const c2 = await capture("resume-page-2");
        if (c2) {
          const imgHeight2 = (c2.height * imgWidth) / c2.width;
          pdf.addPage();
          pdf.addImage(c2.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0, imgWidth, imgHeight2);
        }
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