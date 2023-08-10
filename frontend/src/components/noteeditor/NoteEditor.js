import React, { useState } from 'react';
import { Quill } from "react-quill";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";

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

const NoteEditor = ({
    dialogTitle,
    title, 
    noteId,
    isNewNote,
    bodyText, 
    onAddNote,
    onDeleteNote, 
    onUpdateNote,
}) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newBody, setnewBody] = useState(bodyText);

    const handleEditModalOpen = () => {
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };

    const handleEditModalSaveNoteAndClose = () => {
        setEditModalOpen(false);
        handleSaveNote();
    }

    const handleSaveNote = () => {
        if (isNewNote) {
            onAddNote(newTitle, newBody);
        } else {
            onUpdateNote(noteId, newTitle, newBody);
        }
    }

    const handleDeleteNote = () => {
        if (isNewNote) {
            handleEditModalClose();
        } else {
            onDeleteNote(noteId);
        }
    }
  
    return (
        <div>
            <IconButton onClick={handleEditModalOpen} aria-label="edit" size="small">
                {dialogTitle}
            </IconButton>
            <Dialog open={editModalOpen} onClose={handleEditModalClose} fullWidth maxWidth="md">
            <DialogTitle>
                {dialogTitle}
                <IconButton onClick={handleDeleteNote} aria-label="delete" size="small">
                    <DeleteIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
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
                <ReactQuill
                    theme="snow"
                    value={newBody}
                    onChange={setnewBody}
                    modules={modules}
                    formats={formats}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleEditModalClose}>Cancel</Button>
            <Button 
                onClick={handleEditModalSaveNoteAndClose} 
                color="primary">
                Save Changes
            </Button>
            </DialogActions>
        </Dialog>
      </div>
    );
};

export default NoteEditor;