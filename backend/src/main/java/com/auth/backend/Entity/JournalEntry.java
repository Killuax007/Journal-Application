package com.auth.backend.Entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "journal_entries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class JournalEntry {
    @Id
    private String id;
    private String title;
    private String content;
    private LocalDateTime date;


}
