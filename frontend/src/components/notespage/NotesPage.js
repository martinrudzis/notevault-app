import React, { useState } from "react";
import Note from '../note/Note';

const NotesPage = () => {
    const [notes, setNotes] = useState([])

    const handleCreateNewNote = () => {
        const newNote = { title: 'New Note', bodyText: 'Enter note text here' };
        setNotes([...notes, newNote]);
    }

    return(
        <div>
        <button onClick={handleCreateNewNote}>Create New Note</button>
        {notes.map((note, index) => (<Note key={index} {...note} />))}
        </div>
    );
};

export default NotesPage