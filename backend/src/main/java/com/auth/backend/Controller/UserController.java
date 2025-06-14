package com.auth.backend.Controller;

import com.auth.backend.Entity.UserEntry;
import com.auth.backend.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173/")
public class UserController {
    @Autowired
    private UserServices userServices;


    @GetMapping("")
    public ResponseEntity<UserEntry> getUserByName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        Optional<UserEntry> user = Optional.ofNullable(userServices.findByUserName(userName));
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PutMapping
    public ResponseEntity<UserEntry> updateUser(@RequestBody UserEntry user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        try {
            UserEntry userInfo = userServices.findByUserName(userName);
            userInfo.setUserName(user.getUserName());
            userInfo.setPassword(user.getPassword());
            userServices.saveNewUser(userInfo);
            return new ResponseEntity<>(userInfo, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

//    @DeleteMapping("/{userId}")
//    public String deleteUserById(@PathVariable ObjectId userId) {
//        userServices.deleteById(userId);
//        return "One Entry Deleted from Journal Entry";
//    }


    @DeleteMapping
    public String deleteUserByUserName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        System.out.println(userName);
        userServices.deleteByUserName(userName);
        return "One Entry Deleted from Journal Entry";
    }
}
