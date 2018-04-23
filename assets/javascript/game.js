// My RPG Game
//-------------------------------------------------------------------

// Player chooses a new opponent.

// Note: Challenge should come from picking the right enemies, not choosing the strongest player. 

$(document).ready(function () {

    // Establish an object for the entire game.

    var rpgGame = {};

    // Background music because why not.

    var bgMusic = $("#bkgd-music")[0],
        playing = true;
    const rollSound = new Audio("assets/sounds/whoosh.ogg");
    $('.char-all').click(e => rollSound.play());

    // Create a function to reset the game. This will be a click that appears after player HP hits 0.

    function resetGame() {

        // Rebuild `rpgGame.gameCharacters` from scratch
        // Create each character. List its stats: Name, Attack Power, Health Points, Counter Attack Power
        // Each time user attacks, character Attack Power increases by its base Attack Power; e.g. If base AP is 6, each attack will increase the AP by 6 (12, 18, 24, etc)

        rpgGame.wins = 0;

        rpgGame.gameCharacters = {
            "mario": {
                "name": "Mario",
                "hp": 100,
                "attack": 14,
                "baseAttack": 14,
                "counter": 5,
                "imgurl": "assets/images/mariosprite.png",
            },
            "daisy": {
                "name": "Daisy",
                "hp": 120,
                "attack": 8,
                "baseAttack": 8,
                "counter": 15,
                "imgurl": "assets/images/daisysprite.png",

            },
            "wario": {
                "name": "Wario",
                "hp": 180,
                "attack": 7,
                "baseAttack": 7,
                "counter": 25,
                "imgurl": "assets/images/wariosprite.png",

            },
            "birdo": {
                "name": "Birdo",
                "hp": 150,
                "attack": 8,
                "baseAttack": 8,
                "counter": 20,
                "imgurl": "assets/images/birdosprite.png",

            },
        };

        $("#char-list").empty();
        $("#opponent-list").empty();
        $("#char-selected").empty();
        $(".upcoming-list").empty();
        $("#opponent-selected").empty();

        $("#opponent-area").hide();
        $("#opponent-select").hide();
        $("#char-area-select").hide();
        $("#fight-section").hide();
        $("#upcoming-opponents").hide();

        $("#char-area").show();

        $(".btn-reset").addClass("reset");

        showCharacters();
    };

    // Build the characters. 
    function charCreation(charId) {
        var character = rpgGame.gameCharacters[charId];
        var charAll = $("<div class='char-all default' id='character-" + charId + "'>");
        var charName = $("<div class='char-name'>").text(character.name);
        var charPic = $("<img class='char-pic' alt='character'>").attr('src', character.imgurl);
        var charHP = $("<div class='char-hp'>").text(character.hp);

        charAll.append(charName).append(charPic).append(charHP);
        return charAll;
    }

    // When game starts, player chooses their character by clicking the chosen picture. 
    // Move them around as player makes their selections.
    function showCharacters() {
        for (const charId of Object.keys(rpgGame.gameCharacters)) {
            var charArea = charCreation(charId);
            $("#char-list").append(charArea);
        }
        // This is the initial character selection that will move chosen character while moving remaining to opponent selection area.
        $("#char-list").on("click", ".char-all", function () {
            //test

            $(this).addClass("selectedChar");
            $("#char-area").hide();
            $("#char-area-select").show();

            $(".selectedChar").appendTo("#char-selected").removeClass("default");
            
            $(".default").appendTo("#opponent-list");
            $("#opponent-select").show();

            rpgGame.currentCharacter = this.id.substring(10);
        });

        // Player then chooses an opponent by click. Player must defeat all the remaining fighters.
        // Enemy, once selected, moves to a "opponent area" that we'll call #opponent-selected. 
        // This action will also reveal the "fight" window.
        $("#opponent-list").on("click", ".char-all", function () {
            $(this).addClass("selectedOpponent");
            //New stuff if things break
            $(".char-all").addClass("nonactive");
            $(".selectedOpponent").appendTo("#opponent-selected").removeClass("nonactive");
            $(".selectedChar").removeClass("nonactive");
            // $("#upcoming-opponents", ".upcoming-list").show();
            $(".nonactive > .char-all").appendTo(".upcoming-list");

            //end of new
            $("#opponent-select").hide();
            $("#opponent-area").show();
            $("#fight-section").show();

            rpgGame.currentOpponent = this.id.substring(10);
        })
    }

    // To begin fighting, player clicks ATTACK button.
    // When a player clicks ATTACK, the character damages the enemy. Opponent loses HP. Display HP under their picture.
    $("#fight-section").on("click", ".btn-attack", function charAttack() {

        rpgGame.gameCharacters[rpgGame.currentOpponent].hp -= rpgGame.gameCharacters[rpgGame.currentCharacter].attack;
        rpgGame.gameCharacters[rpgGame.currentCharacter].attack += rpgGame.gameCharacters[rpgGame.currentCharacter].baseAttack;

        if (rpgGame.gameCharacters[rpgGame.currentOpponent].hp > 0) {
            counterAttack();
        } else {
            rpgGame.gameCharacters[rpgGame.currentOpponent].hp = 0;
            alert("You won this round!");
            $("#opponent-area > #opponent-selected .char-all").addClass("defeated");
            roundWon();

            // Player wins when all enemies are defeated. 
            console.log(rpgGame.wins);
            console.log(Object.keys(rpgGame.gameCharacters).length - 1);
            if (rpgGame.wins >= (Object.keys(rpgGame.gameCharacters).length - 1)) {

                alert("Congrats! You beat the game!");
                resetGame();
                return;
            }
        }
        // Player loses if their HP falls to 0 or below.
        if (rpgGame.gameCharacters[rpgGame.currentCharacter].hp <= 0) {
            alert("You lost!")
            resetGame();
            return;
        }

        $("#character-" + rpgGame.currentCharacter + " > .char-hp").text(rpgGame.gameCharacters[rpgGame.currentCharacter].hp);
        $("#character-" + rpgGame.currentOpponent + " > .char-hp").text(rpgGame.gameCharacters[rpgGame.currentOpponent].hp);
    });

    function roundWon() {
        $(".defeated").remove();
        $("#opponent-select").show();
        $("#opponent-area").hide();
        rpgGame.wins++;
    }

    // Opponent will instantly counter the attack. When that happens, the player's character loses some of their HP.
    function counterAttack() {
        rpgGame.gameCharacters[rpgGame.currentCharacter].hp -= rpgGame.gameCharacters[rpgGame.currentOpponent].counter;
    }
    // Restart button appears when player wins or loses.

    $(".reset").click(function () {
        resetGame();
    });


    resetGame();
});
