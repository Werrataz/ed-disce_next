import dynamic from "next/dynamic";
import React, { useState, useCallback } from "react";

const QuillEditor = dynamic(
  () => import("./QuillEditor").then((mod) => mod.default),
  { ssr: false, loading: () => <p>Editor loading ...</p> }
);

function Editor({}) {
  const [isActive, setIsActive] = useState(false);
  const handleFocus = useCallback(() => {
    setIsActive(true);
    console.log("focus");
  }, []);
  const handleBlur = useCallback(() => {
    setIsActive(false);
    console.log("blur");
  }, []);
  return (
    <QuillEditor
      isActive={isActive}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

export default Editor;
