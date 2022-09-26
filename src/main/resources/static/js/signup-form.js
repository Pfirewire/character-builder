$(() => {
    let userHasFocusedPassword = false;
    let userHasFocusedConfirm = false;
    let passwordFulfillsRequirements = false;
    let lengthMet = false;
    let uppercaseMet = false;
    let lowercaseMet = false;
    let numberMet = false;
    let specialMet = false;
    let disabledAttribute = $("#signupPasswordSubmit").attr("disabled");


    const isNumber = input => {
        return !(isNaN(Number(input)));
    }

    const atLeastEight = input => {
        if(input.length >= 8) {
            return true;
        } else {
            return false;
        }
    }


    const containsLowercase = input => {
        for(let i = 0; i < input.length; i++) {
            if(input.charAt(i).toLowerCase() === input.charAt(i) && !(isNumber(input.charAt(i))) && !(containsSpecialCharacter(input.charAt(i)))) {
                return true;
            }
        }
        return false;
    }

    const containsUppercase = input => {
        for(let i = 0; i < input.length; i++) {
            if(input.charAt(i).toUpperCase() === input.charAt(i) && !(isNumber(input.charAt(i))) && !(containsSpecialCharacter(input.charAt(i)))) {
                return true;
            }
        }
        return false;
    }

    const containsNumber = input => {
        for(let i = 0; i < input.length; i++) {
            if(isNumber(input.charAt(i))) {
                return true;
            }
        }
        return false;
    }

    const containsSpecialCharacter = input => {
        let specials = "!@#$%^&*()-=_+"
        for(let i = 0; i < input.length; i++) {
            for(let j = 0; j < specials.length; j++) {
                if(input.charAt(i) === specials.charAt(j)) {
                    return true;
                }
            }
        }
        return false;
    }

    const requirementsNotMet = (input) => {
        if(atLeastEight(input) && containsLowercase(input) && containsUppercase(input) && containsNumber(input) && containsSpecialCharacter(input)){
            return false;
        } else {
            return true;
        }
    }

    const revertBorder = selector => {
        selector.css("border", "1px solid #ced4da");
    }

    const makeBorderRed = selector => {
        selector.css("border", "2px solid #F00");
    }

    const makeTextRed = selector => {
        selector.css("color", "#F00");
    }

    const revertText = selector => {
        selector.css("color", "#6c757d");
    }

    const changeBorderBasedOnRequirements = selector => {
        if(requirementsNotMet(selector.val())){
            makeBorderRed(selector);
        } else {
            revertBorder(selector);
        }
    }

    const changeIndividualRequirements = value => {
        lengthMet = atLeastEight(value);
        lengthMet ? revertText($("#signupPasswordHelpLength")) : makeTextRed($("#signupPasswordHelpLength"));
        lowercaseMet = containsLowercase(value);
        lowercaseMet ? revertText($("#signupPasswordHelpLowercaseLetter")) : makeTextRed($("#signupPasswordHelpLowercaseLetter"));
        uppercaseMet = containsUppercase(value);
        uppercaseMet ? revertText($("#signupPasswordHelpUppercaseLetter")) : makeTextRed($("#signupPasswordHelpUppercaseLetter"));
        numberMet = containsNumber(value);
        numberMet ? revertText($("#signupPasswordHelpNumber")) : makeTextRed($("#signupPasswordHelpNumber"));
        specialMet = containsSpecialCharacter(value);
        specialMet ? revertText($("#signupPasswordHelpSpecialCharacters")) : makeTextRed($("#signupPasswordHelpSpecialCharacters"));
    }

    const confirmMatchesPassword = () => {
        return $("#signupConfirmPassword").val() === $("#signupPassword").val();
    }

    const changeBorderPasswordMatch = selector => {
        if(confirmMatchesPassword()) {
            revertBorder(selector);
            $("#passwordsMustMatch").removeClass("d-block").addClass("d-none");
        } else {
            makeBorderRed(selector);
            $("#passwordsMustMatch").removeClass("d-none").addClass("d-block");
        }
    }

    const submitButtonEnableDisable = () => {
        disabledAttribute = $("#signupPasswordSubmit").attr("disabled");
        if(!(requirementsNotMet($("#signupPassword").val())) && confirmMatchesPassword()) {
            passwordFulfillsRequirements = true;
        }
        if(passwordFulfillsRequirements) {
            $("#signupPasswordSubmit").removeAttr("disabled");
        } else if(typeof disabledAttribute === undefined || typeof disabledAttribute === false) {
            $("#signupPasswordSubmit").attr("disabled", "");
        }
    }

    $("#signupPassword")
        .focus(() => {
            console.log("inside password focus. userHasFocusedPassword: " + userHasFocusedPassword);
            if(!userHasFocusedPassword) {
                makeTextRed($(`
                #signupPasswordHelpLength, 
                #signupPasswordHelpUppercaseLetter, 
                #signupPasswordHelpLowercaseLetter, 
                #signupPasswordHelpNumber, 
                #signupPasswordHelpSpecialCharacters
                `));
            }
            userHasFocusedPassword = true;
            changeBorderBasedOnRequirements($("#signupPassword"));
            changeIndividualRequirements($("#signupPassword").val());
        })
        .keyup(() => {
            changeBorderBasedOnRequirements($("#signupPassword"));
            changeIndividualRequirements($("#signupPassword").val());
            submitButtonEnableDisable();
        })
    ;

    $("#signupConfirmPassword")
        .focus(() => {
            userHasFocusedConfirm = true;
            changeBorderPasswordMatch($("#signupConfirmPassword"));
        })
        .keyup(() => {
            changeBorderPasswordMatch($("#signupConfirmPassword"));
            submitButtonEnableDisable();
        })
    ;

    $("#notAUserToggle")
        .click(() => {
            $("#signupContainer").slideToggle();
        });


});