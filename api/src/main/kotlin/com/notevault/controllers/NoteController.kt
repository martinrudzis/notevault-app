package com.notevault.controllers

import com.notevault.models.Note
import com.notevault.service.NoteService
import com.notevault.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@RestController
@CrossOrigin(origins = ["http://localhost:3000"])
@RequestMapping("/api/notes")
class NoteController(private val noteService: NoteService, private val userService: UserService) {

    @GetMapping("/users/{userId}")
    fun getAllNotesForUser(@PathVariable userId: Long): ResponseEntity<Any> {
        val user = userService.findByUserId(userId)
        if (user.isPresent) {
            val notes = noteService.findAllNotesByUserId(userId)
            return if (notes.isPresent) {
                ResponseEntity.ok(notes.get())
            } else {
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID $userId has no notes")
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID $userId does not exist")
    }

    @GetMapping("/id/{noteId}")
    fun getNoteById(@PathVariable noteId: Long): ResponseEntity<Any> {
        val note = noteService.findNoteById(noteId)
        return if (note.isPresent) {
            ResponseEntity.ok(note.get())
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Requested note does not exist")
        }
    }

    @DeleteMapping("/id/{noteId}")
    fun deleteNoteById(@PathVariable noteId: Long): ResponseEntity<Any> {
        val note = noteService.findNoteById(noteId)
        if (note.isPresent) {
            noteService.deleteNoteById(noteId)
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Requested note does not exist")
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Note successfully deleted")
    }

    @PostMapping
    fun createNote(@RequestBody note: Note): ResponseEntity<String> {
        // Perform validation if needed

        // Call the NoteService to create the note
        noteService.createNote(note)

        return ResponseEntity.status(HttpStatus.CREATED).body("Note created successfully.")
    }

    @PutMapping("/id/{noteId}")
    fun updateNote(@PathVariable noteId: Long, @RequestBody updatedNote: Note): ResponseEntity<String> {
        val noteToUpdate = noteService.findNoteById(noteId)
        if (noteToUpdate.isPresent) {
            noteToUpdate.get().title = updatedNote.title
            noteToUpdate.get().bodyText = updatedNote.bodyText
            noteToUpdate.get().modifiedDate = LocalDateTime.now()
            noteService.updateNote(noteToUpdate.get()) // Save the updated note in the database and return it.
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Requested note does not exist")
        }
        return ResponseEntity.status(HttpStatus.OK).body("Updated successfully")
    }

}