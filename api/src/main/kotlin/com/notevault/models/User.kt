package com.notevault.models

import javax.persistence.*

@Entity
@Table(name = "Users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    val id: Long = 0,
    val username: String,
    val email: String,
    val password: String
)