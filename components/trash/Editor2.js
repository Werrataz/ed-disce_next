import React, { useState, useRef, useEffect } from "react";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import "quill-mathquill/mathquill.css";
import { Quill } from "react-quill";
import MathQuill from "quill-mathquill";
import "react-quill/dist/quill.bubble.css";

// Register MathQuill module
MathQuill.register();

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["link", "image", "formula"],
];

function Editor({ value, onChange }) {
  const handleChange = (content, delta, source, editor) => {
    const deltaContent = editor.getContents();
    onChange(deltaContent);
  };
  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      theme="bubble"
      modules={{ toolbar: toolbarOptions }}
    />
  );
}

export default Editor;
