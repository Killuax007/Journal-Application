package com.auth.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

//@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@SpringBootApplication()
public class SpringbootAuthApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootAuthApplication.class, args);
        System.out.println("server running on port 5000");
    }

    @Bean
    public PlatformTransactionManager Transactionmanager(MongoDatabaseFactory dbFactory) {
        return new MongoTransactionManager(dbFactory);
    }

}
