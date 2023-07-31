package com.notevault

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class NoteVaultApplication

fun main(args: Array<String>) {
	runApplication<NoteVaultApplication>(*args)
}
