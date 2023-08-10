import React from 'react';
import Card from "@mui/material/Card";
import NoteEditor from '../noteeditor/NoteEditor'
import "react-quill/dist/quill.snow.css";

const Note = ({ 
  title, 
  bodyText, 
  noteId,
  onAddNote,
  onDeleteNote, 
  onUpdateNote, 
}) => {
  return (
    <Card sx={{ minWidth: 300, margin: 1, borderRadius: 1 }}>
      <NoteEditor 
        dialogTitle={title}
        title={title}
        noteId={noteId}
        isNewNote={false}
        bodyText={bodyText}
        onAddNote={onAddNote}
        onUpdateNote={onUpdateNote}
        onDeleteNote={onDeleteNote}
      />
    </Card>
  );
};

export default Note