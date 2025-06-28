package com.auth.backend.Services;

import com.auth.backend.Entity.UserEntry;
import com.auth.backend.Repo.UserRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServices {
    //TODO Save new user by hashing the password
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @Autowired
    private UserRepo userRepo;

    public void saveUser(UserEntry user) {
        userRepo.save(user);
    }

    public boolean saveNewUser(UserEntry user) {
        try {
            System.out.println(user);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            if (user.getRoles() == null) {
                user.setRoles(List.of("USER"));
            }
            userRepo.save(user);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    public void saveAdmin(UserEntry user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(List.of("USER", "ADMIN"));
        userRepo.save(user);
    }

    public List<UserEntry> getAll() {
        return userRepo.findAll();
    }

    public Optional<UserEntry> findById(ObjectId id) {
        return userRepo.findById(id);
    }

    public Optional<UserEntry> otpVerification(String otp) {
        Optional<UserEntry> userOptional = userRepo.findByOtp(otp.trim());
        return userOptional;
    }

    public void deleteById(ObjectId id) {
        userRepo.deleteById(id);
    }

    public void deleteByUserName(String userName) {
        userRepo.deleteByUserName(userName);
    }

    public UserEntry findByUserName(String username) {
        return userRepo.findByUserName(username);
    }
}
