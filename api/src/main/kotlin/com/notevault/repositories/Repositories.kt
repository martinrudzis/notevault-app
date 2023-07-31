package com.notevault.repositories

import com.notevault.models.Note
import com.notevault.models.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): Optional<User>
}

interface NoteRepository : JpaRepository<Note, Long> {
    fun findAllNotesByUserId(userId: Long): Optional<List<Note>>
}