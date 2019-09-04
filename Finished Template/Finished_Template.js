"use strict"

var LOG = console.log



window.onload = function () {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    //var getHint; //Word getHint
    var categories; // Array of topics
    var chosenCategory; // Selected category
    var word; // Selected word
    var guess; // Guess
    var guesses = []; // Stored guesses
    var lives; // Lives
    var counter; // Count correct guesses
    var space; // Number of spaces in word '-'
    var correct = document.createElement('ul');
    var letters = document.createElement('ul');


    // Get elements
    //var showCategory = document.getElementById("scatagory");
    //var getHint = document.getElementById("hint");
    var showLives = document.getElementById("mylives");
    var showClue = document.getElementById("clue");
    var myButtons = document.getElementById('buttons');


    // create alphabet ul
    function buttons() {

        for (var i = 0; i < alphabet.length; i++) {
            var list = document.createElement('li')
            letters.id = 'alphabet';
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }

    }


    // Select Category
    function selectCat() {
        if (chosenCategory === categories[0]) {
            categoryName.innerHTML = "The Chosen Category Is Animals";
        } else if (chosenCategory === categories[1]) {
            categoryName.innerHTML = "The Chosen Category Is Films";
        } else if (chosenCategory === categories[2]) {
            categoryName.innerHTML = "The Chosen Category Is Cities";
        }
    }

    // Create guesses ul
    function result() {
        var wordHolder = document.getElementById('hold');


        for (var i = 0; i < word.length; i++) {
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            } else {
                guess.innerHTML = "_";
            }

            guesses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);

        }

    }

    // Show lives
    function comments() {
        showLives.innerHTML = "You have " + lives + " lives";
        if (lives < 1) {
            showLives.innerHTML = "Game Over";
        }
        for (var i = 0; i < guesses.length; i++) {
            if (counter + space === guesses.length) {
                showLives.innerHTML = "You Win!";
            }
        }
    }

    // Animate man
    function animate() {
        var drawMe = lives;
        drawArray[drawMe]();
    }


    // Hangman
    function canvas() {
        var myStickman = document.getElementById("stickman");
        var context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };

    function head() {
        var myStickman = document.getElementById("stickman");
        var context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    }

    function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
        var myStickman = document.getElementById("stickman");
        var context = myStickman.getContext('2d');
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    function frame1() {
        draw(0, 150, 150, 150);
    };

    function frame2() {
        draw(10, 0, 10, 600);
    };

    function frame3() {
        draw(0, 5, 70, 5);
    };

    function frame4() {
        draw(60, 5, 60, 15);
    };

    function torso() {
        draw(60, 36, 60, 70);
    };

    function rightArm() {
        draw(60, 46, 100, 50);
    };

    function leftArm() {
        draw(60, 46, 20, 50);
    };

    function rightLeg() {
        draw(60, 70, 100, 100);
    };

    function leftLeg() {
        draw(60, 70, 20, 100);
    };

    var drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

    // OnClick Function



    function check() {
        LOG(document.getElementById('alphabet'))
        LOG(letters);
        letters.onclick = function () {
            var guess = (this.innerHTML);
            LOG(this);
            this.setAttribute("class", "active");
            this.onclick = null;
            for (var i = 0; i < word.length; i++) {
                if (word[i] === guess) {
                    guess[i].innerHTML = guess;
                    counter += 1;
                }
            }
            var j = (word.indexOf(guess));
            if (j === -1) {
                lives -= 1;
                comments();
                animate();
            } else {
                comments();
            }
        }
    }





    // Play
    function play() {
        categories = [
            ["dog", "cat", "mantis-shrimp", "fly", "fish", "octopus", "bird"],
            ["alien", "megamind", "the-princess-bride", "finding-nemo", "jaws"],
            ["albequerque", "phoenix", "tokyo", "paris", "london"]
        ];

        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        word = word.replace(/\s/g, "-");
        console.log(word);
        buttons();

        guesses = [];
        lives = 10;
        counter = 0;
        space = 0;
        result();
        comments();
        selectCat();
        canvas();
    }

    play();

    // Hint

    hint.onclick = function () {

        var hints = [
            ["Most popular household pet", "Always lands on its feet", "Can reach the speed of sound", "Small winged bug", "Swims in the ocean", "Has a large amount of arms", "Flies across the sky"],
            ["Science-Fiction horror film", "A subversive masterpiece", "As you wish", "Animated Fish", "Giant great white shark"],
            ["A song has been made about it", "Capitol of Arizona", "Population of 9 million", "City of Love", "Home of Big Ben"]
        ];

        var categoryIndex = categories.indexOf(chosenCategory);
        var hintIndex = chosenCategory.indexOf(word);
        showClue.innerHTML = "Clue: - " + hints[categoryIndex][hintIndex];
    };

    // Reset

    document.getElementById('reset').onclick = function () {

        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        var myStickman = document.getElementById("stickman");
        var context = myStickman.getContext('2d');
        context.clearRect(0, 0, 400, 400);
        play();
    }
}