import $ from "jquery";
import katex from "katex";
import React from "react";
import ReactQuill, { Quill } from "react-quill";

import "katex/dist/katex.min.css";
import "@edtr-io/mathquill/build/mathquill.css";
import "mathquill4quill/mathquill4quill.css";
import "react-quill/dist/quill.snow.css";
import "@/app/css/maths.css";
import "@/app/css/features/editor.css";

if (typeof window !== "undefined") {
    window.katex = katex;
    window.jQuery = window.$ = $;
    window.mathquill4quill = require("mathquill4quill");
    require("@edtr-io/mathquill/build/mathquill.js");
}

function Toolbar({ uniqueId, isActive, applyColor }) {
    return (
        <div className={isActive ? "toolbar" : "toolbar hide"}>
            <div id={uniqueId}>
                <button className="ql-header" value="1"></button>
                <button className="ql-header" value="2"></button>
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>
                <button className="ql-align" value=""></button>
                <button className="ql-align" value="right"></button>
                <button className="ql-align" value="center"></button>
                <button
                    className="ql-personalized-color"
                    style={{ backgroundColor: "#000000" }}
                    onClick={() => applyColor("#000000")}
                ></button>
                <button
                    className="ql-personalized-color"
                    style={{ backgroundColor: "#ff0000" }}
                    onClick={() => applyColor("#ff0000")}
                ></button>
                <button
                    className="ql-personalized-color"
                    style={{ backgroundColor: "#0000ff" }}
                    onClick={() => applyColor("#0000ff")}
                ></button>
                <button className="ql-formula"></button>
            </div>
        </div>
    );
}

class QuillEditor extends React.Component {
    static compt = 0;
    static active = null;

    constructor(props) {
        super(props);
        this.reactQuill = React.createRef();
        this.attachQuillRefs = this.attachQuillRefs.bind(this);
        this.didAttachQuillRefs = false;
        this.code = ++QuillEditor.compt;
        console.log(this.props);
    }

    componentDidMount() {
        if (!this.didAttachQuillRefs) {
            this.attachQuillRefs();
            this.didAttachQuillRefs = true;
        }
    }

    handleDocumentClick = (event) => {
        console.log("Element clicked:", event.target);
    };

    attachQuillRefs() {
        const enableMathQuillFormulaAuthoring = window.mathquill4quill({
            Quill,
            katex,
        });

        enableMathQuillFormulaAuthoring(this.reactQuill.current.editor, {
            displayHistory: true, // defaults to false
            historyCacheKey: "disce_math_history_cachekey_", // optional
            historySize: 10, // optional (defaults to 10)
            operators: [
                ["\\pm", "\\pm"],
                ["\\sqrt{x}", "\\sqrt"],
                ["\\sqrt[n]{x}", "\\nthroot"],
                ["\\frac{x}{y}", "\\frac"],
                ["\\sum^{s}_{x}{d}", "\\sum"],
                ["\\prod^{s}_{x}{d}", "\\prod"],
                ["\\coprod^{s}_{x}{d}", "\\coprod"],
                ["\\int^{s}_{x}{d}", "\\int"],
                ["\\binom{n}{k}", "\\binom"],
            ],
        });
    }

    applyColor = (color) => {
        this.reactQuill.current.editor.format("color", color);
    };

    render() {
        return (
            <div className="editor-container" onFocus={this.props.whenDivGetFocused}>
                <Toolbar
                    uniqueId={"toolbar-" + this.code}
                    isActive={!this.props.disabled && this.props.isActive}
                    applyColor={this.applyColor}
                />
                <ReactQuill
                    className="editor"
                    id={this.props.editorId}
                    ref={this.reactQuill}
                    modules={{
                        formula: true,
                        toolbar: { container: `#toolbar-${this.code}` },
                    }}
                    value={this.props.value}
                    theme={"snow"}
                    placeholder={this.props.placeholder}
                    bounds={".quill"}
                    onFocus={(event) => this.props.onFocus(event, this.props.isActive)}
                    onBlur={(event) => this.props.onBlur(event, this.props.isActive)}
                    onChange={this.props.onChange}
                    onKeyDown={this.props.onKeyDown}
                    readOnly={this.props.disabled}
                />
            </div>
        );
    }
}

export default QuillEditor;

// Retenter la version avec static et l'autre truc
// NON (par ce qu'il faut que les éditeurs n'apparaissent que quand l'utilisateur est dans une fenètre éditable)

// Créer un élément isActive qui vient s'activer ou se désactiver
// Avec onBlur et onFocus

// Autre solution plus simple : tout déplacer dans un élément parent
// Qui va créer les states isActive et la passer à la toolbar
// Et qui va aussi gérer directement onFocus et onBlur (qu'il faudra du coup passer en paramètre)

// Trouver un moyen pour faire en sorte que les Editors s'autogérent en terme de toolbar
// (J'ai testé un truc avec un QuillEditor.active, mais ça ne marche pas pour l'instant)
