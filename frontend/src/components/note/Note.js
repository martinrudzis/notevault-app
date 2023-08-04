import React, { useState } from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ReactQuill from 'react-quill';
import NoteEditor, { modules, formats } from '../noteeditor/NoteEditor'
import "react-quill/dist/quill.snow.css";

const Note = ({ 
  title, 
  bodyText, 
  onDeleteNote, 
  onUpdateNote, 
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newBodyText, setNewBodyText] = useState(bodyText);

  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleSaveChanges = async () => {
    const updatedNote = {
      title: newTitle,
      bodyText: newBodyText,
    };
    try {
      await onUpdateNote(updatedNote);
      setEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ minWidth: 300, margin: 1, borderRadius: 1 }}>
      <IconButton onClick={handleEditModalOpen} aria-label="edit" size="small">
        {title}
      </IconButton>
      {/* <CardHeader
        title={
          <>
            <IconButton onClick={handleEditModalOpen} aria-label="edit" size="small">
              {title}
            </IconButton>
          </>
        }
        action={
          <>
            <IconButton onClick={() => onDeleteNote()} aria-label="delete" size="small">
              <DeleteIcon />
            </IconButton>
          </>
        }
      /> */}
      {/* Edit Note Modal */}
      <Dialog open={editModalOpen} onClose={handleEditModalClose} fullWidth maxWidth="md">
        <DialogTitle>
          Edit Note
          <IconButton onClick={() => onDeleteNote()} aria-label="delete" size="small">
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
          <NoteEditor />
          <ReactQuill
            theme="snow"
            value={newBodyText}
            onChange={setNewBodyText}
            modules={modules}
            formats={formats}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditModalClose}>Cancel</Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Note