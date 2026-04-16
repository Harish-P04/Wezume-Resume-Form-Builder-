package com.example.resumebackend.service;

import com.example.resumebackend.entity.Resume;
import com.example.resumebackend.repository.ResumeRepository;
import org.springframework.stereotype.Service;

@Service
public class ResumeService {

    private final ResumeRepository repository;

    public ResumeService(ResumeRepository repository) {
        this.repository = repository;
    }

    public Resume saveResume(Resume resume) {
        return repository.save(resume);
    }
}
