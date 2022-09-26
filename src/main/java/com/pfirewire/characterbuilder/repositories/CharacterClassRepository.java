package com.pfirewire.characterbuilder.repositories;

import com.pfirewire.characterbuilder.models.CharacterClass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterClassRepository extends JpaRepository<CharacterClass, Long> {
    CharacterClass findByName(String name);
}
