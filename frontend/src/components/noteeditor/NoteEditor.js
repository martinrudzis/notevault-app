import React from "react";
import { Quill } from "react-quill";

const Size = Quill.import("formats/size");
Size.whitelist = ["small", "medium", "large"];
Quill.register(Size, true);

const Font = Quill.import("formats/font");
Font.whitelist = [
    "arial",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida"
];
Quill.register(Font, true);

export const modules = {
    toolbar: {
        container: "#toolbar",
    }
}

export const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "color",
    "code-block"
];

const NoteEditor = () => {
    return (
        <div id="toolbar">
            <span className="ql-formats">
                <select className="ql-font" defaultValue="helvetica">
                    <option value="arial">Arial</option>
                    <option value="courier-new">Courier New</option>
                    <option value="georgia">Georgia</option>
                    <option value="helvetica">Helvetica</option>
                    <option value="lucida">Lucida</option>
                </select>   
                <select className="ql-size" defaultValue="medium">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </span>
            <span className="ql-formats">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
            </span>
            <span className="ql-formats">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <button className="ql-indent" value="-1" />
                <button className="ql-indent" value="+1" />
            </span>
            <span className="ql-formats">
                <button className="ql-align" />
                <button className="ql-color" />
                <button className="ql-background" />
            </span>
            <span className="ql-formats">
                <button className="ql-link" />
            </span>
        </div>
    );
};

export default NoteEditor;