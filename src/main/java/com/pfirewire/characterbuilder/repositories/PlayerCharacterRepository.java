package com.pfirewire.characterbuilder.repositories;

import com.pfirewire.characterbuilder.models.PlayerCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerCharacterRepository extends JpaRepository<PlayerCharacter, Long> {

}
