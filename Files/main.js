const LOG = console.log;



window.onload = () => {

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];


    // function checkLetter(letter) {
    //   return  letter.indexOf(PATTERN) === -1;
    // }

    // function myFunction() {
    //   document.getElementById("demo").innerHTML = alphabet.filter(checkLetter);
    // }

    //var getHint; //Word getHint
    let categories; // Array of topics
    let chosenCategory; // Selected category
    let word; // Selected word
    let guess; // Guess
    let guesses = []; // Stored guesses
    let lives; // Lives
    let counter; // Count correct guesses
    let space; // Number of spaces in word '-'
    const correct = document.createElement('ul');
    const letters = document.createElement('ul');


    // Get elements
    //var showCategory = document.getElementById("scatagory");
    //var getHint = document.getElementById("hint");
    const showLives = document.getElementById("mylives");
    const showClue = document.getElementById("clue");
    const myButtons = document.getElementById('buttons');
    const myStickman = document.getElementById("stickman");
    const context = myStickman.getContext('2d');


    // create alphabet ul
    function buttons() {

        for (let i = 0; i < alphabet.length; i++) {
            const list = document.createElement('button');
            letters.id = 'alphabet';
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check(event);
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
        const wordHolder = document.getElementById('hold');


        for (let i = 0; i < word.length; i++) {
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
        showLives.textContent = `You have ${lives} lives`;
        if (lives < 1) {
            showLives.textContent = "Game Over";
        }
        for (let i = 0; i < guesses.length; i++) {
            if (counter + space === guesses.length) {
                showLives.textContent = "You Win!";
            }
        }
    }

    // Animate man
    function animate() {
        const drawMe = lives;
        drawArray[drawMe]();
    }


    // Hangman
    function canvas() {
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };

    function head() {
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    }

    function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
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
    function check(event) {
        letters.onclick = event => {
            const key = event.target;
            const keyText = event.target.textContent;
            const guessed = (keyText);

            key.setAttribute("class", "active");
            key.disabled = true;
            for (let i = 0; i < word.length; i++) {
                if (word[i] === guessed) {
                    guesses[i].innerHTML = guessed;
                    counter += 1;
                }
            }
            let j = (word.indexOf(guessed));
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
            ["dog", "sphynx", "mantis-shrimp", "beetle", "clownfish", "octopus", "turkey"],
            ["alien", "megamind", "the-princess-bride", "finding-nemo", "jaws", "detective-pikachu", "jurassic-park"],
            ["albequerque", "phoenix", "tokyo", "paris", "london", "denver", "assur", ]
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

    hint.onclick = () => {

        const hints = [
            ["Most popular household pet", "Popular Egyptian statue", "Can strike with 1,500 Newtons of force", "Small winged bug", "Has white and orange stripes", "Has a large amount of arms", "Was almost the American national bird"],
            ["Science-Fiction horror film", "A subversive masterpiece", "As you wiiiiiish!", "Animated Fish", "Giant great white shark", "Investigative mouse", "Dinosaurs"],
            ["A weird song has been made about this town", "Capitol city of Arizona", "Island city with population of 9 million", "City of Love", "Home of Big Ben", "Large city in Colorado", "The capitol of Assyria"]
        ];

        const categoryIndex = categories.indexOf(chosenCategory);
        const hintIndex = chosenCategory.indexOf(word);
        showClue.innerHTML = `Clue: - ${hints[categoryIndex][hintIndex]}`;
    };

    // Reset

    document.getElementById('reset').onclick = () => {
        location.reload();
    }

}