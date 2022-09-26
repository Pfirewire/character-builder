package com.pfirewire.characterbuilder.repositories;

import com.pfirewire.characterbuilder.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
