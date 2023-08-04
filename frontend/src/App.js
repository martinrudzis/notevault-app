import './App.css';
import React, { useEffect, useState } from 'react';
import api from './api/axiosConfig';
import NoteList from './components/notelist/NoteList';
import { Box } from '@mui/material';

const App = () => {
  // State to hold the notes data
  const [notes, setNotes] = useState([]);

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
  const addNote = async (newNote) => {
    try {
      setNotes([...notes, newNote]);
      await api.post('/api/notes', newNote);
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
    <Box 
      sx={{
        p: 2,
        bgcolor: 'white',
        boxShadow: 3,
        borderRadius: 2,
        width: '100%',
        maxWidth: 'calc(100% - 2in)',
        margin: 8,
      }}
    >
      <NoteList
        notes={notes}
        onAddNote={(newNote) => addNote(newNote)}
        onDeleteNote={deleteNote}
        onUpdateNote={(noteId, updatedNote) => updateNote(noteId, updatedNote)}
      />
    </Box>
  );
};

export default App;
