package com.auth.backend.Services;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class OtpService {
    public String generateOtp() {

        Random random = new Random();
        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < 6; i++) {

            int digit = random.nextInt(10);
            otp.append(digit);
        }

        return otp.toString();
    }
}
