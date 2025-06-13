package com.auth.backend.Controller;

import com.auth.backend.Entity.UserEntry;
import com.auth.backend.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserServices userServices;

    @GetMapping("all-users")
    public ResponseEntity<List<UserEntry>> fetchAllUsers() {
        List<UserEntry> users = userServices.getAll();
        if (users != null && !users.isEmpty()) {
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/create-admin-user")
    public void createUser(@RequestBody UserEntry user) {
        userServices.saveAdmin(user);
    }

}
