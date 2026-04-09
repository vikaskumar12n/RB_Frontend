import  {useResume} from "../helper/ResumeContext";

const GlobalDownloadButton = () => {
  const { resumeData, selectedId, hasPage2, downloading, setDownloading, downloadResumePDF } = useResume();

  return (
    <button
      onClick={async () => {
        setDownloading(true);
        await downloadResumePDF(resumeData, selectedId, hasPage2);
        setDownloading(false);
      }}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#14b8a6",
        color: "#fff",
        border: "none",
        borderRadius: "50px",
        padding: "12px 20px",
        fontWeight: "bold",
        cursor: "pointer",
        zIndex: 1000
      }}
    >
      {downloading ? "Processing..." : "⬇ Download Resume"}
    </button>
  );
};

export default GlobalDownloadButton;