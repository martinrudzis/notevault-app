package com.notevault.models

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "Notes")
data class Note(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "note_id")
    val noteId: Long,

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    val user: User,
    @Column(name = "user_id")
    val userId: Long = 1, // *** Default value for testing only ***

    var title: String,

    @Column(name = "body_text")
    var bodyText: String,

    @Column(name = "modified_date")
    var modifiedDate: LocalDateTime = LocalDateTime.now()
)
