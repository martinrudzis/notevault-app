package com.notevault.service

import com.notevault.models.User
import com.notevault.repositories.UserRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(private val userRepository: UserRepository) {

    fun findByEmail(email: String): Optional<User> {
        return userRepository.findByEmail(email)
    }

    fun findByUserId(userId: Long): Optional<User> {
        return userRepository.findById(userId)
    }

}