package com.auth.backend.Services;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sentMail(String to, String subject, String otp) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper mail = new MimeMessageHelper(message, true);
            mail.setTo(to);
            mail.setSubject(subject);
            String htmlContent = """
                    <html>
                        <body>
                            <h2>Your One-Time Password (OTP)</h2>
                            <p>Dear User,</p>
                            <p>Your OTP for verification is:</p>
                            <h1 style="color:blue;">%s</h1>
                            <p>Please do not share this code with anyone.</p>
                            <p>Thanks,for reaching us .<br/> Journal-Application Team</p>
                        </body>
                    </html>
                    """.formatted(otp);
            mail.setText(htmlContent, true);
            javaMailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
