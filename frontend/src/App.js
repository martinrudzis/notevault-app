import './App.css';
import React, { useEffect, useState } from 'react';
import api from './api/axiosConfig';
import NoteList from './components/notelist/NoteList';

const App = () => {
  // State to hold the notes data
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteBody, setNewNoteBody] = useState('');


  const getNotes = async () => {
    try {
      const response = await api.get("api/notes/users/1");
      console.log(response.data);
      setNotes(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  // Function to add a new note via a POST request
  const addNote = async () => {
    const newNote = {
      title: newNoteTitle,
      bodyText: newNoteBody,
    };
    try {
      setNotes([...notes, newNote]);
      await api.post('/api/notes', newNote);
      setNewNoteTitle('');
      setNewNoteBody('');
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async (noteId, updatedNote) => {
    try {
      await api.put(`/api/notes/id/${noteId}`, updatedNote);
      setNotes([...notes, updatedNote]);
    } catch (error) {
      console.error(error)
    }
  }

  // Function to delete a note via a DELETE request
  const deleteNote = async (noteId) => {
    try {
      // Send a DELETE request to the server to delete the note from the database
      await api.delete(`/api/notes/id/${noteId}`);

      // Update the local state (UI) by removing the deleted note from the notes array
      setNotes(notes.filter((note) => note.noteId !== noteId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, [])

  return (
    <div>
      <h1>App</h1>
      <NoteList
        notes={notes}
        onAddNote={addNote}
        newNoteTitle={newNoteTitle}
        setNewNoteTitle={setNewNoteTitle}
        newNoteBody={newNoteBody}
        setNewNoteBody={setNewNoteBody}
        onDeleteNote={deleteNote}
        onUpdateNote={(noteId, updatedNote) => updateNote(noteId, updatedNote)}
      />
    </div>
  );
};

export default App;
