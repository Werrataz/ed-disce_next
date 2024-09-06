import dynamic from "next/dynamic";
import React, { useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import { on } from "events";

const QuillEditor = dynamic(
    () => import("./QuillEditor").then((mod) => mod.default),
    { ssr: false, loading: () => <p>Chargement...</p> }
);

function Editor({ value, onFocus, onBlur, onClick, onChange, disabled, placeholder }) {
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
    const handleChange = useCallback((content, delta, source, editor) => {
        if (onChange) {
            const deltaContent = editor.getContents();
            onChange(deltaContent);
        }
    }, [onChange]);

    return (
        <QuillEditor
            whenDivGetFocused={onFocus}
            value={value}
            isActive={isActive}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            onChange={handleChange}
            disabled={disabled}
        />
    );
}

export default Editor;
