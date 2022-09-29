package com.pfirewire.characterbuilder.models;

import java.util.List;
import java.util.logging.Level;

public class CharacterClass {

    private String index;
    private String name;
    private String url;
    private int hitDie;
    private Level level;
    private Spellcasting spellcasting;
    private ClassSpellList spells;
    private List<StartingEquipment> startingEquipment;
    private List<Proficiency> proficiencies;
    private List<AbilityScore> savingThrows;

}
