$(()=> {
    // Base api url
    let baseUrl = "https://www.dnd5eapi.co/api/";

    // Create character object with methods
    const CreateCharacter = {
        characterClass: () => {
            Get.classes();
        },
        race: () => {
            Get.races();
        },
        rollDSix: () => {
            return Math.floor(Math.random() * 6) + 1;
        },
        rollAbilityScore: scoreDiv => {
            let rolls = [];
            for(let i = 0; i < 4; i++){
                rolls[i] = CreateCharacter.rollDSix();
            }
            let lowestRoll = Math.min.apply(Math, rolls);
            let lowestRollIndex = rolls.indexOf(lowestRoll);
            Output.displayAbilityScoreRoll(rolls, lowestRoll, scoreDiv);
            Output.changeRollButton(rolls, lowestRollIndex, scoreDiv);
        },
        proficiencyChoices: () => {
            $("#allClasses").change(() => {
                if($("#allClasses").val() != 0) {
                    $.get(`${baseUrl}classes/${$("#allClasses").val()}`, () => {
                    })
                        .done(characterClass => {
                            $("#chooseProficienciesDiv").html(Output.printProficiencyOptions(characterClass))
                        })
                    ;
                }
            });
        },
        raceDescription: () => {
            $("#allRaces").change(() => {
                let race = $("#allRaces").val();
                if(race === 0) {
                    $("#showRaceDescriptionDiv").html("");
                } else {
                    Get.raceDescription(race);
                }
            });
        }
    };
    // Output object with methods
    const Output = {
        listSelectOptions: data => {
            let html = "";
            for(let i = 0; i < data.count; i++) {
                html += `
                    <option value="${data.results[i].index}">${data.results[i].name}</option>
                `;
            }
            return html;
        },
        printClassOptions: classes => {
            $("#chooseClassDiv").html(`
                <label for="allClasses">Choose a Class: </label>
                <select name="allClasses" id="allClasses">
                    <option value="0">Select One</option>
                    ${Output.listSelectOptions(classes)}
                </select>
            `);
        },
        printRaceOptions: races => {
            $("#chooseRaceDiv").html(`
                <label for="allRaces">Choose a Race: </label>
                <select name="allRaces" id="allRaces">
                    <option value="0">Select One</option>
                    ${Output.listSelectOptions(races)}
                </select>
            `);
        },
        printProficiencyOptions: characterClass => {
            let html = "";
            html += `
                <span>Choose ${characterClass.proficiency_choices[0].choose} from the following list: </span>
            `;
            return html;
        },
        printRaceDescription: raceData => {
            $("#showRaceDescriptionDiv").html(`
                <p>${raceData.alignment}</p>
                <p>${raceData.age}</p>
                <p>${raceData.size_description}</p>
            `);
        },
        displayAbilityScoreRoll: (rolls, lowestRoll, scoreDiv) => {
            scoreDiv.children().last().prev().children().val(rolls.reduce((a,b) => a+b) - lowestRoll);
        },
        changeRollButton: (rolls, lowestRollIndex, scoreDiv) => {
            let rollText = "";
            for(let i = 0; i < rolls.length; i++) {
                if(i === lowestRollIndex) {
                    rollText += `<span style="color: #F00;">${rolls[i]} </span>`
                } else {
                    rollText += `${rolls[i]} `
                }
            }
            scoreDiv.children().last().html(rollText.trim());
            scoreDiv.children().last().removeAttr("type");
            scoreDiv.children().last().removeClass("btn btn-primary roll-btn");
            scoreDiv.children().last().addClass("bg-primary py-2 rounded-2");
        }
    }
    // Get object for API calls
    const Get = {
        classes: () => {
            $.get(baseUrl + "classes", () => {})
                .done(classes => {
                    Output.printClassOptions(classes)
                    CreateCharacter.proficiencyChoices();
                })
            ;
        },
        classProficiencyOptions: () => {

        },
        races: () => {
            $.get(baseUrl + "races", () => {})
                .done(races => {
                    Output.printRaceOptions(races);
                    CreateCharacter.raceDescription();
                })
            ;
        },
        raceDescription: race => {
            $.get(baseUrl + "races/" + race, () => {})
                .done(raceData => {
                    Output.printRaceDescription(raceData);
                })
            ;
        }
    }

    CreateCharacter.characterClass();
    CreateCharacter.race();

    // Called whenever roll buttons are clicked
    $(".roll-btn").click(function(e) {
        e.preventDefault();
        CreateCharacter.rollAbilityScore($(this).parent());
    });

});