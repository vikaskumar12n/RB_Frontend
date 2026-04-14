import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditResume() {

  const [data, setData] = useState({
    summary: "",
  });

  return (
    <div className="flex gap-6">

      {/* LEFT SIDE - EDITOR */}
      <div className="w-1/2">
        <h2>Edit Resume</h2>

        <ReactQuill
          value={data.summary}
          onChange={(value) =>
            setData({ ...data, summary: value })
          }
        />
      </div>

      {/* RIGHT SIDE - PREVIEW */}
      <div className="w-1/2 border p-4">
        <h2>Preview</h2>

        <div dangerouslySetInnerHTML={{ __html: data.summary }} />
      </div>

    </div>
  );
}