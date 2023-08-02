import React, { useState } from 'react';
import Note from '../note/Note';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ReactQuill from 'react-quill';
import NoteEditor, { modules, formats } from '../noteeditor/NoteEditor'
import "react-quill/dist/quill.snow.css";

const NoteList = ({ 
    notes, 
    onAddNote,
    onDeleteNote, 
    onUpdateNote, 
}) => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteBody, setNewNoteBody] = useState('');


    const handleCreateModalOpen = () => {
        setCreateModalOpen(true);
    };
    
    const handleCreateModalClose = () => {
        setCreateModalOpen(false);
    };
  
    const handleSaveNote = async () => {
        const newNote = {
            title: newNoteTitle,
            bodyText: newNoteBody,
        };
        try {
            await onAddNote(newNote);
            setCreateModalOpen(false);
            setNewNoteTitle('');
            setNewNoteBody('');
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <Button onClick={handleCreateModalOpen}>+ Create Note</Button>
            <Dialog open={createModalOpen} onClose={handleCreateModalClose} fullWidth maxWidth="md">
                <DialogTitle>Create Note</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Title"
                        value={newNoteTitle}
                        onChange={(e) => setNewNoteTitle(e.target.value)}
                    />
                    <NoteEditor />
                    <ReactQuill
                        theme="snow"
                        value={newNoteBody}
                        onChange={setNewNoteBody}
                        modules={modules}
                        formats={formats}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateModalClose}>Cancel</Button>
                    <Button onClick={handleSaveNote} color="primary">
                        Save Note
                    </Button>
                </DialogActions>
            </Dialog>
            {  
                notes?.map((note) => {
                    return(
                        <Note 
                            key={note.modifiedDate} 
                            title={note.title} 
                            bodyText={note.bodyText} 
                            onDeleteNote={() => onDeleteNote(note.noteId)}
                            onUpdateNote={(updatedNote) => onUpdateNote(note.noteId, updatedNote)}
                        />
                    )
                }).reverse()
            }
        </div>
    );
};

export default NoteList