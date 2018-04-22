// My RPG Game
//-------------------------------------------------------------------







// To begin fighting, player clicks ATTACK button.
// Provide failsafe on ATTACK button that if player clicks, it says "no one here". Would be better to make it not appear till opponent selected.
// When a player clicks ATTACK, the character damages the enemy. Opponent loses HP. Display HP under their picture.

// Opponent will instantly counter the attack. When that happens, the player's character loses some of their HP. Also display HP under picture.

// Player continues hitting ATTACK button to defeat enemy.

//When enemy HP reduced to 0 or below, alert the player that the enemy was defeated.
// Remove enemy from "defender area".

// Player chooses a new opponent.

// Player wins when all enemies are defeated. 

// Player loses if their HP falls to 0 or below.

// Restart button appears when player wins or loses.

// Note: Challenge should come from picking the right enemies, not choosing the strongest player. 

$(document).ready(function () {

    // Establish an object for the entire game.

    var rpgGame = {

        // Create each character. List its stats: Name, Attack Power, Health Points, Counter Attack Power
        // Each time user attacks, character Attack Power increases by its base Attack Power; e.g. If base AP is 6, each attack will increase the AP by 6 (12, 18, 24, etc)

        "gameCharacters": {
            "mario": {
                "name": "Mario",
                "hp": 100,
                "attack": 14,
                "counter": 5,
                "imgurl": "assets/images/mariosprite.png",
            },
            "daisy": {
                "name": "Daisy",
                "hp": 120,
                "attack": 8,
                "counter": 15,
                "imgurl": "assets/images/daisysprite.png",

            },
            "wario": {
                "name": "Wario",
                "hp": 180,
                "attack": 7,
                "counter": 25,
                "imgurl": "assets/images/wariosprite.png",

            },
            "birdo": {
                "name": "Birdo",
                "hp": 150,
                "attack": 8,
                "counter": 20,
                "imgurl": "assets/images/birdosprite.png",

            },
        },

    };

    // Create a function to reset the game. This will be a click that appears after player HP hits 0.

    function resetGame() {
        $('#char-area').show();
        $('#opponent-area').empty();
        $('#fight-section').empty();
        $('#opponent-select').empty();
        $('#char-area-select').empty();
        $(".opponent").addClass("reset");
    };

    function resetBtn() {
        if (charHP < 0) {
            $(this).removeClass("reset");
        };
        $(".opponent").on("click", "opponent", function () {
            resetGame();
        });
    };

    // Build the characters. 
    function charCreation(character) {
        var charAll = $("<div class='char-all default'>");
        var charName = $("<div class='char-name'>").text(character.name);
        var charPic = $("<img class='char-pic' alt='character'>").attr('src', character.imgurl);
        var charHP = $("<div class='char-hp'>").text(character.hp);

        charAll.append(charName).append(charPic).append(charHP);
        return charAll;
    }

    // Show the characters.
    function showCharacters() {
        for (const charId of Object.keys(rpgGame.gameCharacters)) {
            var charArea = charCreation(rpgGame.gameCharacters[charId]);
            $("#char-list").append(charArea);

        }
        console.log("is this working?");
        $("#char-list").on("click", ".char-all", function () {
            $(this).addClass("selectedChar");
            $("#char-area").hide();
            $("#char-area-select").removeClass("temphide");
            $(".selectedChar").appendTo("#char-selected").removeClass("default");
            $(".default").appendTo("#opponent-list");
            $("#opponent-select").removeClass("temphide");
        });
        $("#opponent-list").on("click", ".char-all", function () {
            $(this).addClass("selectedOpponent");
            $(".selectedOpponent").appendTo(".opponent-selected");
            $("#opponent-select").addClass("temphide");
            $("#opponent-area").removeClass("temphide");
            $("#fight-section").removeClass("temphide");

        })
    }




    showCharacters();

    // When game starts, player chooses their character by clicking the chosen picture. 


    // Player then chooses an opponent by click. Player must defeat all the remaining fighters.
    // Enemy, once selected, moves to a "defender area" that we'll call #fight-section. 


    $("#fight-section").on("click", ".btn-primary", function () {
        alert("This is a test");
        // Create a string which will hold the lottery number
        var charAttack = "";

    })


    // Global variables:


    // Characters



});
