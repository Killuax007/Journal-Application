package com.auth.backend.Controller;


import com.auth.backend.Entity.UserEntry;
import com.auth.backend.Services.EmailService;
import com.auth.backend.Services.OtpService;
import com.auth.backend.Services.UserDetailsServiceImpl;
import com.auth.backend.Services.UserServices;
import com.auth.backend.Utils.JwtUtil;
import com.auth.backend.io.OtpRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/public")
@CrossOrigin(origins = "http://localhost:5173/")
public class PublicController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private UserServices userServices;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private EmailService emailService;
    @Autowired
    private OtpService otpService;


    @GetMapping("")
    public ResponseEntity<String> displayIntro() {

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Welcome my friend...");
    }

    @PostMapping("/register")
    public ResponseEntity<String> createUser(@RequestBody UserEntry userEntry) {
        System.out.println(userEntry);
        if (userEntry == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create ");
        }
        String otp = otpService.generateOtp();
        userEntry.setOtp(otp);
        emailService.sentMail(userEntry.getEmail(), "Account Verification One Time Password ", otp);
        userServices.saveNewUser(userEntry);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");

    }

    @PostMapping("/otp-verify")
    public ResponseEntity<String> verifyUserEmail(@RequestBody OtpRequest otpRequest) {
        String otp = otpRequest.getOtp();
        System.out.println(otp);
        if (otp == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid otp ");
        }
        Optional<UserEntry> userOpt = userServices.otpVerification(otp);
        if (userOpt.isPresent()) {
            UserEntry user = userOpt.get();
            user.setIsEmailVerified(true);
            user.setOtp(null);  // Optional: Clear OTP
            userServices.saveUser(user);
            return ResponseEntity.ok("Account verified successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired OTP");
        }

    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserEntry user) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword()));
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUserName());
            String jwt = jwtUtil.generateToken(userDetails.getUsername());
            return new ResponseEntity<>(jwt, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Exception occurred while createAuthenticationToken ", e);
            return new ResponseEntity<>("Incorrect username or password", HttpStatus.BAD_REQUEST);
        }
    }
}
