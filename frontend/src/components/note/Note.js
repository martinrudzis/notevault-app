import React, { useState } from 'react';
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
    const [isExpanded, setIsExpanded] = useState(false);
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
      <Card sx={{ minWidth: 300, border: "1px solid rgba(211,211,211,0.6)" }}>
      <CardHeader
        title={title}
        action={
          <>
            <IconButton onClick={() => onDeleteNote()} aria-label="delete" size="small">
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleEditModalOpen} aria-label="edit" size="small">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label="expand"
              size="small"
            >
              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </>
        }
      />
      <div style={{ backgroundColor: "rgba(211,211,211,0.4)" }}>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body1">{bodyText}</Typography>
          </CardContent>
        </Collapse>
      </div>

      {/* Edit Note Modal */}
      <Dialog open={editModalOpen} onClose={handleEditModalClose} fullWidth maxWidth="md">
        <DialogTitle>Edit Note</DialogTitle>
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