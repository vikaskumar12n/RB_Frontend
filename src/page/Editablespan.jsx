import { useRef, useEffect } from "react";
import React from "react";

const EditableSpan = ({ value, onChange, className = "", style = {}, block = false }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.innerText = value ?? "";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Tag = block ? "div" : "span";
  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => onChange && onChange(e.currentTarget.innerText)}
      className={`outline-none cursor-text hover:bg-yellow-50 focus:bg-yellow-100 rounded px-0.5 transition-colors ${className}`}
      style={{ display: block ? "block" : "inline", minWidth: "8px", minHeight: "1em", ...style }}
    />
  );
};

export default EditableSpan;