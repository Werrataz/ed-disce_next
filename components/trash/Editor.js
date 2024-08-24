import { Component } from "react";
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../css/Editor.css"

class Editor extends Component {

    // static formats = [
    //     'header',
    //     'bold', 'italic', 'underline', 'strike', 'blockquote',
    //     'list', 'bullet', 'indent',
    //     'link', 'image'
    // ]

    constructor(props) {
        super(props);
        this.state = {
            text: "",
        }
    }

    render() {
        const Toolbar = () => (
            <div id={`toolbar-${this.props.index}`}>
                <select className="ql-header" defaultValue="" onChange={e => e.persist()}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="">Normal</option>
                </select>
                <button className="ql-bold">Bold</button>
                <button className="ql-italic">Italic</button>
                <button className="ql-underline">Underline</button>
                <select className="ql-color">
                    <option value="red"></option>
                    <option value="green"></option>
                    <option value="blue"></option>
                    <option value="orange"></option>
                    <option value="violet"></option>
                    <option value="black"></option>
                </select>
                <select className="ql-background">
                    <option value="red"></option>
                    <option value="green"></option>
                    <option value="blue"></option>
                    <option value="orange"></option>
                    <option value="violet"></option>
                    <option value="black"></option>
                </select>
                <button className="ql-link">Link</button>
                <button className="ql-image">Image</button>
                <button className="ql-clean">Clean</button>
            </div>
        );
        return (
            <div className={"editor" + " " + this.props.extraClass}>
                <Toolbar />
                <ReactQuill
                    id={`quill-${this.props.index}`}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    modules={{ toolbar: `#toolbar-${this.props.index}` }}
                    formats={Editor.formats}
                />
            </div>
        );
    }
}

export default Editor;