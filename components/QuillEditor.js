import $ from "jquery";
import katex from "katex";
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import { v4 as uuidv4 } from "uuid";

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

function Toolbar({ uniqueId, isActive }) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(isActive);
    console.log(isActive);
  }, [isActive]);

  return (
    <div className={isVisible ? "toolbar" : "toolbar hide"}>
      <div id={uniqueId}>
        <select className="ql-header">
          <option value="1">Titre</option>
          <option value="2">Sous-titre</option>
          <option value="">Normal</option>
        </select>
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
        <select className="ql-color">
          <option value="#000000"></option>
          <option value="#e60000"></option>
          <option value="#ff9900"></option>
          <option value="#ffff00"></option>
          <option value="#008a00"></option>
          <option value="#0066cc"></option>
        </select>
        <select className="ql-background">
          <option value=""></option>
          <option value="rgba(255, 153, 0, 0.3)"></option>
          <option value="rgba(255, 255, 0, 0.3)"></option>
          <option value="rgba(0, 138, 0, 0.3)"></option>
          <option value="rgba(0, 102, 204, 0.3)"></option>
          <option value="rgba(153, 51, 255, 0.3)"></option>
        </select>
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
        <select className="ql-align">
          <option value=""></option>
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify"></option>
        </select>
        <button className="ql-formula"></button>
      </div>
    </div>
  );
}

class QuillEditor extends React.Component {
  static compt = 0;

  constructor(props) {
    super(props);
    this.reactQuill = React.createRef();
    this.attachQuillRefs = this.attachQuillRefs.bind(this);
    this.didAttachQuillRefs = false;
    this.code = ++QuillEditor.compt;
    this.isActive = false;
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    if (!this.didAttachQuillRefs) {
      this.attachQuillRefs();
      this.didAttachQuillRefs = true;
    }
  }

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

  handleFocus() {
    this.isActive = true;
    console.log(this.isActive);
    console.log(this.code);
  }

  handleBlur() {
    this.isActive = false;
    console.log(this.isActive);
    console.log(this.code);
  }

  render() {
    return (
      <div>
        <Toolbar uniqueId={"toolbar-" + this.code} isActive={this.isActive} />
        <ReactQuill
          ref={this.reactQuill}
          modules={{
            formula: true,
            toolbar: { container: `#toolbar-${this.code}` },
          }}
          theme={"snow"}
          placeholder={this.props.placeholder}
          bounds={".quill"}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

export default QuillEditor;

// Créer un élément isActive qui vient s'activer ou se désactiver
// Avec onBlur et onFocus

// Autre solution plus simple : tout déplacer dans un élément parent
// Qui va créer les states isActive et la passer à la toolbar
// Et qui va aussi gérer directement onFocus et onBlur (qu'il faudra du coup passer en paramètre)

// Trouver un moyen pour faire en sorte que les Editors s'autogérent en terme de toolbar
// (J'ai testé un truc avec un QuillEditor.active, mais ça ne marche pas pour l'instant)
