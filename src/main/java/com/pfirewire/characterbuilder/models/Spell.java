package com.pfirewire.characterbuilder.models;

import java.util.List;

public class Spell {

    private String index;
    private String name;
    private String url;
    private List<String> description;
    private List<String> onHigherLevel;
    private String range;
    private List<SpellComponent> components;
    private String material;
    private AreaOfEffect areaOfEffect;
    private boolean isRitual;
    private String duration;
    private boolean isConcentration;
    private String castingTime;
    private int level;
    private String attackType;
    private Damage damage;
    private MagicSchool magicSchool;
    private List<CharacterClass> characterClasses;

}
