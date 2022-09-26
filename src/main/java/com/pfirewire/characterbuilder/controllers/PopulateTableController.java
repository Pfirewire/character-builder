package com.pfirewire.characterbuilder.controllers;

import com.pfirewire.characterbuilder.models.Race;
import com.pfirewire.characterbuilder.models.User;
import com.pfirewire.characterbuilder.repositories.RaceRepository;
import org.springframework.stereotype.*;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class PopulateTableController {
    private final RaceRepository raceDao;

    public PopulateTableController(
            RaceRepository raceDao)
    {
        this.raceDao = raceDao;
    }

    @GetMapping("populate/races")
    public String showPopulateRacesPage(Model model) {
        System.out.println("inside showPopulateRacesPage");
        model.addAttribute("race", new Race());
        return "populate/races";
    }

    @PostMapping("populate/races")
    public String populateRacesTable(
            @ModelAttribute Race race,
            @RequestParam(name = "raceType") String type,
            @RequestParam(name = "raceSpeed") String speed,
            @RequestParam(name = "raceAge") String age,
            @RequestParam(name = "raceAlignment") String alignment,
            @RequestParam(name = "raceSize") String size,
            @RequestParam(name = "raceSizeDescription") String sizeDescription
            ) {
        System.out.println("inside populateRacesTable");
        System.out.println(race.getType());
        race.setType(type);
        race.setSpeed(Integer.parseInt(speed));
        race.setAge(age);
        race.setAlignment(alignment);
        race.setSize(size);
        race.setSizeDescription(sizeDescription);
        raceDao.save(race);
        return "populate/races";
    }

}
