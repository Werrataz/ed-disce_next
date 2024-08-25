import dynamic from "next/dynamic";
import React, { useState, useCallback, useRef } from "react";

const QuillEditor = dynamic(
  () => import("./QuillEditor").then((mod) => mod.default),
  { ssr: false, loading: () => <p>Editor loading ...</p> }
);

function Editor({ value, onFocus, onBlur, onClick, onChange, placeholder }) {
  const [isActive, setIsActive] = useState(false);
  const handleFocus = useCallback((event, isActive) => {
    if (!isActive) {
      setIsActive(true);
    }
  }, []);
  const handleBlur = useCallback((event, isActive) => {
    if (isActive) {
      setIsActive(false);
    }
  }, []);
  return (
    <QuillEditor
      whenDivGetFocused={onFocus}
      value={value}
      isActive={isActive}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default Editor;
