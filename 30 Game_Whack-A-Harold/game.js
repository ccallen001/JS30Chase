'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

// VARIABLES

// dom

const rows = document.querySelectorAll(`.row`),
    start = document.querySelector(`.start`),
    characters = document.querySelectorAll(`.character`),

    groans = document.querySelectorAll(`.groan`),
    beeps = document.querySelectorAll(`.beep`);

/*----------------------------------------------------------------------------*/

// game settings

// inits set initial values
// frequency and upTime are how long between pops and how long they are up
// deltas refer to how much values decrease after one interval
// minFreq is the least time allowed between pops before game stops

const initFreq = 1500,
    initUpTime = 1500

let frequency = initFreq,
    minFreq = 1,
    deltaFreq = 33,
    //
    upTime = initUpTime,
    deltaUp = 20,
    //
    transTime = parseFloat(getComputedStyle(document.body).getPropertyValue(`--trans-time`)) + .05;

let score = 0;

/*--------------------------------------------------------------------------------------------------------------------*/

// HELPERS

// just a helper for generating random integers
function randomInt(upperBounds) {
    try {
        return Math.floor(Math.random() * upperBounds);
    } catch (err) {
        console.log(err);
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

// GAME MECHANICS

// characters up and down

function popUp(char) {
    if (char.style.transform !== `translateX(-50%) translateY(-50%)`) { // <-- prevent from popping up while already up

        char.style.backgroundImage = `url("images/harold.png")`; // just to make sure
        char.style.transform = `translateX(-50%) translateY(${-50}%)`;

        setTimeout(() => {
            popDown(char);
        }, upTime);
    }
}

function popDown(char) {
    char.style.transform = `translateX(-50%) translateY(${0}%)`;
    setTimeout(() => {
        char.style.backgroundImage = `url("images/harold.png")`;
    }, transTime);
}

/*----------------------------------------------------------------------------*/

// user controls

// start the game
function startGame() {
    if (frequency > minFreq) beeps[0].play();
    rows[0].style.background = `url("images/clouds_animated.gif") center -64px`;
    score = 0;
    interval();
}

// add listner/handler to start button
start.addEventListener(`click`, startGame, { once: true }); // <-- one time, one time... add back later when round ends

// when the characters get whacked
characters.forEach(char => {
    char.addEventListener(`click`, function () {
        // popDown(this); // <-- commented out lets them fall down organically

        this.style.backgroundImage = `url("images/harold_headache.png")`;
        groans[randomInt(groans.length)].play();

        score++;
    });
});

/*--------------------------------------------------------------------------------------------------------------------*/

// INTERVAL GENERATOR (uses variables declared in the VARIABLES block above)

function interval() {
    // GAME OVER/interval stops and things reset if the freq is less than the min freq specified in the VARIABLES block
    if (frequency < minFreq) {
        // down, Harolds, down!
        characters.forEach(char => popDown(char));

        // stop clouds
        rows[0].style.background = `url("images/clouds_still.gif") center -64px`;

        // buzzer
        beeps[beeps.length - 1].play();

        console.log(`SCORE: ${score}`);

        [frequency, upTime] = [initFreq, initUpTime];

        // re-add the one-time click listener on the start button // just buzzes and prints score right now
        start.addEventListener(`click`, startGame, { once: true });

        return;
    };

    // countdown beeps
    if (frequency < 800) {
        // beeps[0].volume = 0;
        // beeps[0].pause();
        // beeps[0].currentTime = 0;

        // beeps[0].volume = 1;
        // beeps[0].play();

        let beep = document.createElement(`audio`);
        beep.src = `sounds/beep.wav`;
        beep.play();
    }

    setTimeout(() => {
        popUp(characters[Math.floor(Math.random() * characters.length)]);

        frequency -= deltaFreq;
        upTime -= deltaUp;

        interval(); // <-- recursive call to interval function with frequency having been updated
    }, frequency);
}
