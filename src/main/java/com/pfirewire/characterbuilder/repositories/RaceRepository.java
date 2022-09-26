package com.pfirewire.characterbuilder.repositories;

import com.pfirewire.characterbuilder.models.Race;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RaceRepository extends JpaRepository<Race, Long> {
    Race findByType(String type);
}
