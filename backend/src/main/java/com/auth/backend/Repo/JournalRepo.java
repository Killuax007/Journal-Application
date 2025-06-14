package com.auth.backend.Repo;

import com.auth.backend.Entity.JournalEntry;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JournalRepo extends MongoRepository<JournalEntry, String> {
}
