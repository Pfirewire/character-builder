$(() => {


    const CreateClass = {
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
                    ${CreateClass.listSelectOptions(classes)}
                </select>
            `;
            return html;
        },
        printRaceOptions: races => {
            let html = "";
            html += `
                <label for="allRaces">Choose a Class: </label>
                <select name="allRaces" id="allRaces">
                    ${CreateClass.listSelectOptions(races)}
                </select>
            `;
            return html;
        }
    };


    let PopulateRaceTable = {
        listRaces: allRaces => {
            for (let i = 0; i < allRaces.count; i++) {
                $.get("https://www.dnd5eapi.co/api/races/" + allRaces.results[i].index, () => {})
                    .done(singleRace => {
                        let data = PopulateRaceTable.stringifySingleRaceInfo(singleRace);
                        $.post("populate/races", data);
                    })
                ;
            }
        },
        formifySingleRaceInfo: singleRace => {
            let html = "";
            html += `
                <input type="text" id="raceType" name="raceType" value="${singleRace.index}" th:field="*{type}">
                <input type="text" id="raceSpeed" name="raceSpeed" value="${singleRace.speed}">
                <input type="text" id="raceAge" name="raceAge" value="${singleRace.age}" th:field="*{age}">
                <input type="text" id="raceAlignment" name="raceAlignment" value="${singleRace.alignment}" th:field="*{alignment}">
                <input type="text" id="raceSize" name="raceSize" value="${singleRace.size}" th:field="*{size}">
                <input type="text" id="raceSizeDescription" name="raceSizeDescription" value="${singleRace.size_description}" th:field="*{size_description}">
                <button type="submit">Submit</button>
            `;
            return html;
        },
        stringifySingleRaceInfo: singleRace => {
            let selectiveSingleRace = {
                type: singleRace.index,
                speed: singleRace.speed,
                age: singleRace.age,
                alignment: singleRace.alignment,
                size: singleRace.size,
                size_description: singleRace.size_description
            }
            return JSON.stringify(selectiveSingleRace);
        },
        listSingleRaceInfo: singleRace => {
            let html = "";
            html += `
                <p>INSERT INTO races (type, speed, age, alignment, size, size_description) VALUES (</p>
                <p>'${PopulateRaceTable.unApostrophe(singleRace.index)}',</p>
                <p>'${singleRace.speed}',</p>
                <p>'${PopulateRaceTable.unApostrophe(singleRace.age)}',</p>
                <p>'${PopulateRaceTable.unApostrophe(singleRace.alignment)}',</p>
                <p>'${PopulateRaceTable.unApostrophe(singleRace.size)}',</p>
                <p>'${PopulateRaceTable.unApostrophe(singleRace.size_description)}'</p>
                <p>);</p>
            `;
            PopulateRaceTable.printAllRacesInfo(html);
        },
        printAllRacesInfo: html => {
            $("#racesInfoDiv").append(html);
        },
        unApostrophe: str => {
            console.log(str);
            newStr = str.replaceAll("'", "''");
            return newStr;
        }
    };

    $.get("https://www.dnd5eapi.co/api/races", () => {})
        .done(data => {
            let races = data;
            $("#chooseRaceDiv").html(`
                ${CreateClass.printRaceOptions(races)}
            `);
            $("#allRaces").change(() => {
                let url = "https://www.dnd5eapi.co/api/races/" + $("#allRaces").val();
                console.log(url);
                $.get(url, () => {})
                    .done(data => {
                        console.log(data);
                        $("#raceFormDiv").html(`${PopulateRaceTable.formifySingleRaceInfo(data)}`);
                    })
                ;
            });
        })
    ;


    
    // $.get("https://www.dnd5eapi.co/api/races", () => {})
    //     .done(allRaces => {
    //         PopulateRaceTable.listRaces(allRaces);
    //     })
    // ;
});