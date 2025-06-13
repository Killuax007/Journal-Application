package com.auth.backend.Repo;

import com.auth.backend.Entity.UserEntry;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends MongoRepository<UserEntry, ObjectId> {
    UserEntry findByUserName(String userName);

    void deleteByUserName(String userName);
}
