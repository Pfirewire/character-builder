$(()=> {
    // Base api url
    let baseUrl = "https://www.dnd5eapi.co/api/";

    // Create character object with methods
    const CreateCharacter = {
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
            let html = "";
            html += `
                <label for="allClasses">Choose a Class: </label>
                <select name="allClasses" id="allClasses">
                    <option value="0" selected>Select One</option>
                    ${Output.listSelectOptions(classes)}
                </select>
            `;
            return html;
        },
        printRaceOptions: races => {
            let html = "";
            html += `
                <label for="allRaces">Choose a Race: </label>
                <select name="allRaces" id="allRaces">
                    <option value="0" selected>Select One</option>
                    ${Output.listSelectOptions(races)}
                </select>
            `;
            return html;
        },
        printClassDescription: characterClass => {

        },
        printRaceDescription: raceName => {
            $.get(baseUrl + "races/" + raceName, () => {})
                .done(raceData => {
                    $("#showRaceDescriptionDiv").html(`
                        <p>${raceData.alignment}</p>
                        <p>${raceData.age}</p>
                        <p>${raceData.size_description}</p>
                    `);
                })
            ;
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
            console.log(scoreDiv.children().last().attr("id"));
        }
    }

    // Get all classes and display in select box
    $.get(baseUrl + "classes", () => {})
        .done(data => {
            let classes = data;
            $("#chooseClassDiv").html(`
                ${Output.printClassOptions(classes)}
            `);
        })
    ;

    // Get all races and display in select box
    $.get(baseUrl + "races", () => {})
        .done(data => {
            let races = data;
            $("#chooseRaceDiv").html(`
                ${Output.printRaceOptions(races)}
            `);
            $("#allRaces").change(() => {
                if($("#allRaces").val() == 0) {
                    $("#showRaceDescriptionDiv").html("");
                } else {
                    $("#showRaceDescriptionDiv").html(`
                        ${Output.printRaceDescription($("#allRaces").val())}
                    `);
                }
            });
        })
    ;

    // Called whenever roll buttons are clicked
    $(".roll-btn").click(function(e) {
        console.log("inside click roll-btn");
        console.log($(this).parent().attr("id"));
        e.preventDefault();
        CreateCharacter.rollAbilityScore($(this).parent());
    });

});