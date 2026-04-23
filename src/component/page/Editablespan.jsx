import React, { useState, useRef, useEffect } from "react";

const EditableSpan = ({ value, onChange, style = {}, block = false }) => {
  const ref = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const localValueRef = useRef(value);

  // Update ref when value changes from outside
  useEffect(() => {
    if (!isEditing && ref.current && ref.current.innerText !== value) {
      localValueRef.current = value;
      ref.current.innerText = value;
    }
  }, [value, isEditing]);

  const handleBlur = (e) => {
    setIsEditing(false);
    const newValue = e.currentTarget.innerText;
    if (newValue !== localValueRef.current) {
      localValueRef.current = newValue;
      onChange(newValue);
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e) => {
    // Allow native undo/redo (Ctrl+Z / Ctrl+Y)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z' || e.key === 'y' || e.key === 'Y')) {
      // Let browser handle undo/redo naturally
      e.stopPropagation();
      return;
    }
  };

  const Tag = block ? "div" : "span";
  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      style={{
        outline: "none",
        cursor: "text",
        minWidth: "20px",
        display: block ? "block" : "inline",
        whiteSpace: block ? "pre-wrap" : "normal",
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: localValueRef.current }}
    />
  );
};

export default EditableSpan;