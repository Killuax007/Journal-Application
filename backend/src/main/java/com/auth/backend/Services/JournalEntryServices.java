package com.auth.backend.Services;

import com.auth.backend.Entity.JournalEntry;
import com.auth.backend.Entity.UserEntry;
import com.auth.backend.Repo.JournalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class JournalEntryServices {
    @Autowired
    private JournalRepo journalRepo;
    @Autowired
    private UserServices userServices;

    //TODO: In future if i used monogdb Atlas service then we should implement Transactional interface
//    @Transactional
    public void saveEntryByUser(JournalEntry journalEntry, String userName) {
        try {
            UserEntry user = userServices.findByUserName(userName);
            journalEntry.setDate(LocalDateTime.now());
            JournalEntry saved = journalRepo.save(journalEntry);
            user.getJournalEntries().add(saved);
            userServices.saveUser(user);
        } catch (Exception e) {
            throw new NullPointerException("Failed to save journal entry..." + e.getMessage());
        }

    }

    public void saveEntryByUser(JournalEntry journalEntry) {
        journalRepo.save(journalEntry);
    }

    public List<JournalEntry> getJournals() {
        return journalRepo.findAll();
    }

    public Optional<JournalEntry> getJournalById(String id) {
        return journalRepo.findById(id);
    }

    public void deleteJournalEntry(String id, String username) {
        UserEntry user = userServices.findByUserName(username);
        user.getJournalEntries().removeIf(x -> x.getId().equals(id));
        userServices.saveUser(user);
        journalRepo.deleteById(id);
    }

}
