package com.auth.backend.Controller;

import com.auth.backend.Entity.JournalEntry;
import com.auth.backend.Entity.UserEntry;
import com.auth.backend.Services.JournalEntryServices;
import com.auth.backend.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/journals")
@CrossOrigin(origins = "http://localhost:5173/")

public class JournalEntryController {
    @Autowired
    private JournalEntryServices journalEntryServices;
    @Autowired
    private UserServices userServices;


    @GetMapping
    public ResponseEntity<List<JournalEntry>> getAllJournalEntriesOfUsers() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();

        UserEntry user = userServices.findByUserName(userName);
        System.out.println(user);
        List<JournalEntry> entries = user.getJournalEntries();
        System.out.println(entries);
        if (entries != null && !entries.isEmpty()) {
            return new ResponseEntity<>(entries, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //    TODO The flaw is here that an un-authenticated user can see others journals by simple enter the respective Journal entry id
    @GetMapping("/id/{journal_Id}")
    public ResponseEntity<JournalEntry> getJournalEntryById(@PathVariable String journal_Id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        UserEntry user = userServices.findByUserName(userName);
        List<JournalEntry> collect = user.getJournalEntries().stream().filter(x -> x.getId().equals(journal_Id)).toList();

        if (!collect.isEmpty()) {
            Optional<JournalEntry> journalEntry = journalEntryServices.getJournalById(journal_Id);
            if (journalEntry.isPresent()) {
                return new ResponseEntity<>(journalEntry.get(), HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<JournalEntry> addJournal(@RequestBody JournalEntry myEntry) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        if (!myEntry.getTitle().isEmpty() && !myEntry.getContent().isEmpty()) {
            journalEntryServices.saveEntryByUser(myEntry, userName);
            return ResponseEntity.status(HttpStatus.CREATED).body(myEntry);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/id/{journal_Id}")
    public ResponseEntity<JournalEntry> updateJournalEntry(@RequestBody JournalEntry newEntry, @PathVariable String journal_Id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        UserEntry user = userServices.findByUserName(userName);
        List<JournalEntry> collect = user.getJournalEntries().stream().filter(x -> x.getId().equals(journal_Id)).toList();
        if (!collect.isEmpty()) {
            Optional<JournalEntry> journalEntry = journalEntryServices.getJournalById(journal_Id);
            if (journalEntry.isPresent()) {
                JournalEntry old = journalEntry.get();
                old.setTitle(newEntry.getTitle() != null && !newEntry.getTitle().equals("") ? newEntry.getTitle() : old.getTitle());
                old.setContent(newEntry.getContent() != null && !newEntry.getContent().equals("") ? newEntry.getContent() : old.getContent());
                journalEntryServices.saveEntryByUser(old);
                return new ResponseEntity<>(old, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @DeleteMapping("/id/{journal_Id}")
    public String deleteJournalEntry(@PathVariable String journal_Id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        journalEntryServices.deleteJournalEntry(journal_Id, userName);
        return "One Entry Deleted from Journal Entry";
    }

}
