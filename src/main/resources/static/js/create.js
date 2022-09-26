$(()=> {

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

    // Get all classes and display in select box
    $.get("https://www.dnd5eapi.co/api/classes", () => {})
        .done(data => {
            let classes = data;
            $("#chooseClassDiv").html(`
                ${CreateClass.printClassOptions(classes)}
            `);
        })
    ;
    $.get("https://www.dnd5eapi.co/api/races", () => {})
        .done(data => {
            let races = data;
            $("#chooseRaceDiv").html(`
                ${CreateClass.printRaceOptions(races)}
            `);
        })
    ;

});