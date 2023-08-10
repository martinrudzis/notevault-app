import React from 'react';
import Note from '../note/Note';
import "react-quill/dist/quill.snow.css";

const NoteList = ({ 
    notes, 
    onAddNote,
    onDeleteNote, 
    onUpdateNote, 
}) => {
    return(
        <div>
        {  
            notes?.map((note) => {
                return(
                    <Note 
                        key={note.modifiedDate} 
                        dialogTitle={"Edit Note"}
                        title={note.title} 
                        noteId={note.noteId}
                        bodyText={note.bodyText} 
                        onAddNote={onAddNote}
                        onDeleteNote={onDeleteNote}
                        onUpdateNote={onUpdateNote}
                    />
                )
            }).reverse()
        }
        </div>
    );
};

export default NoteList