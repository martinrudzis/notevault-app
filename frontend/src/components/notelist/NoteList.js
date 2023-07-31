import Note from '../note/Note';

const NoteList = ({ notes, onAddNote, newNoteTitle, setNewNoteTitle, newNoteBody, setNewNoteBody, onDeleteNote, onUpdateNote }) => {
    return(
        <div>
            <button onClick={onAddNote}>Create Note</button>
            <input type="text" value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} />
            <textarea value={newNoteBody} onChange={(e) => setNewNoteBody(e.target.value)} />
            {  
                notes?.map((note) => {
                    return(
                        <Note 
                            key={note.modifiedDate} 
                            title={note.title} 
                            bodyText={note.bodyText} 
                            onDeleteNote={() => onDeleteNote(note.noteId)}
                            onUpdateNote={() => onUpdateNote(note.noteId)}
                        />
                    )
                }).reverse()
            }
        </div>
    );
};

export default NoteList