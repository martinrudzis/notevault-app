package com.notevault.service

import com.notevault.models.Note
import com.notevault.repositories.NoteRepository
import org.springframework.data.crossstore.ChangeSetPersister
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.*

@Service
class NoteService(private val noteRepository: NoteRepository) {

    fun createNote(note: Note): Note {
        return noteRepository.save(note)
    }

    fun findAllNotesByUserId(userId: Long): Optional<List<Note>> {
        return noteRepository.findAllNotesByUserId(userId)
    }

    fun findNoteById(noteId: Long): Optional<Note> {
        return noteRepository.findById(noteId)
    }

    fun deleteNoteById(noteId: Long) {
        return noteRepository.deleteById(noteId)
    }

    fun updateNote(note: Note): Note {
        return noteRepository.save(note)
    }

}