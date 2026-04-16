package com.example.resumebackend.controller;

import com.example.resumebackend.entity.Resume;
import com.example.resumebackend.service.ResumeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/resume")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:3000"
})
public class ResumeController {

    private final ResumeService service;

    public ResumeController(ResumeService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<Resume> createResume(@Valid @RequestBody Resume resume) {
        Resume saved = service.saveResume(resume);
        return ResponseEntity.ok(saved);
    }
}