import dynamic from "next/dynamic";
import React, { useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import { on } from "events";

const QuillEditor = dynamic(
    () => import("./QuillEditor").then((mod) => mod.default),
    { ssr: false, loading: () => <p>Chargement...</p> }
);

function Editor({ value, onFocus, onBlur, onClick, onKeyDown, onChange, disabled, placeholder, editorId }) {
    const [isActive, setIsActive] = useState(false);
    const handleFocus = useCallback((event, isActive) => {
        if (!isActive) {
            setIsActive(true);
        }
        if (onFocus) onFocus(event);
    }, [onFocus]);
    const handleBlur = useCallback((event, isActive) => {
        if (isActive) {
            setIsActive(false);
        }
        if (onBlur) onBlur(event);
    }, [onBlur]);
    const handleChange = useCallback((content, delta, source, editor) => {
        if (onChange) {
            const deltaContent = editor.getContents();
            if (onChange) onChange(deltaContent);
        }
    }, [onChange]);

    return (
        <QuillEditor
            whenDivGetFocused={onFocus}
            value={value}
            editorId={editorId}
            isActive={isActive}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            onClick={onClick}
            placeholder={placeholder}
            onChange={handleChange}
            disabled={disabled}
        />
    );
}

export default Editor;
