import './App.css';
import React, { useEffect, useState } from 'react';
import api from './api/axiosConfig';
import NoteList from './components/notelist/NoteList';
import NoteEditor from './components/noteeditor/NoteEditor';
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
  const addNote = async (noteTitle, noteBody) => {
    const newNote = {
      title: noteTitle,
      bodyText: noteBody,
    };
    try {
      setNotes([...notes, newNote]);
      await api.post('/api/notes', newNote);
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async (noteId, noteTitle, noteBody) => {
    const updatedNote = {
      title: noteTitle,
      bodyText: noteBody,
    };
    try {
      // Update the notes state by filtering out the original note
      setNotes(prevNotes => {
        const updatedNotes = prevNotes.filter((note) => note.noteId !== noteId);
        return [...updatedNotes, updatedNote];
      });
      await api.put(`/api/notes/id/${noteId}`, updatedNote);
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
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <Box 
        sx={{
          paddingTop: 2,
          paddingBottom: 5,
          paddingLeft: 4,
          paddingRight: 1,
          bgcolor: 'white',
          boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: 1,
          width: '100%',
          maxWidth: 'calc(100% - 2in)',
          margin: 10,
          overflow: 'hidden'
        }}
      >
        <NoteEditor
          dialogTitle={"+ Create Note"}
          title={''}
          isNewNote={true}
          bodyText={''}
          onAddNote={addNote}
        /> 
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
        }}>
          <Box
            padding="16px"
            bgcolor="silver"
            borderRadius="8px"
            width="99%"
            height="50vh" // Set a fixed height for the scrollable area
            overflow="auto" // Enable vertical scrolling
          >
            <NoteList
              notes={notes}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
              onUpdateNote={updateNote}
            />
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default App;
