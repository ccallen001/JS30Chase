'use strict';

// INITIALIZED GLOBALS

// scoreboard dom
let score_name,
    score_high,
    score_your,
    score_message;

/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/

// AIRTABLE DATBASE CONNECTION AND SETUP

// read and assign current high score
let name,
    highScore;
function getSetHighScore() {
    console.log(`Getting high score from Airtable...`)
    fetch(`https://api.airtable.com/v0/app1f28asn5qYyBt9/Table%201?api_key=key2907TRncvdS3pJ`, { method: `GET` })
        .then(response => response.json())
        .then(jso => {
            // console.log(jso);
            let o = (jso.records && jso.records.filter && jso.records.filter(rec => rec.id === `recGgzk8TFA7K6N0P`)) || null;
            // console.log(o[0] && o[0].fields && o[0].fields[`High Score`]);
            name = (o[0] && o[0].fields && o[0].fields[`Name`]) || `default Harold`;
            if (name === `default Harold`) console.error(`error getting name from Airtable :( ...defaulting to 'Harold'`);

            highScore = (o[0] && o[0].fields && o[0].fields[`High Score`]) || null;
            if (!highScore) {
                console.error(`fetch failed to get high score from Airtable :(`);
            } else {
                // debugger;
                if (score_name && score_high) {
                    score_name.textContent = name;
                    score_high.textContent = highScore;
                }

                console.log(`Current high score: ${highScore}. Set by '${name}'!`);
            }
        })
        .catch(err => console.error(err))
        .catch(err => console.error(err));
}
getSetHighScore(); // <-- also gets called when start is clicked/interval starts

/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/

// VARIABLES

// dom

const fireworks = document.querySelector(`.fireworks`),

    name_inpCont = document.querySelector(`.name_input_container`),
    name_inp = document.querySelector(`.name_input`),
    name_inpInp = name_inp.querySelector(`input`),
    name_inpBtn = name_inp.querySelector(`button`),

    start = document.querySelector(`.start`),

    rows = document.querySelectorAll(`.row`),
    characters = document.querySelectorAll(`.character`),

    groans = document.querySelectorAll(`.groan`),
    beeps = document.querySelectorAll(`.beep`),
    applause = document.querySelector(`.applause`);

score_name = document.getElementsByClassName(`name`)[0];
score_high = document.getElementsByClassName(`high`)[0];
score_your = document.getElementsByClassName(`your`)[0];
score_message = document.getElementsByClassName(`message`)[0];

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
    deltaFreq = 50,
    //
    upTime = initUpTime,
    deltaUp = 20,
    //
    transTime = parseFloat(getComputedStyle(document.body).getPropertyValue(`--trans-time`)) + .05;

let score = 0;

/*--------------------------------------------------------------------------------------------------------------------*/

// HELPER(S)

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

// characters popping up and down

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
    score_your.textContent = score;
    score_message.textContent = `Harold loves you! <3`;
    getSetHighScore();
    interval(); // <-- start the popping
}

// add listner/handler to start button
start.addEventListener(`click`, startGame, { once: true }); // <-- one time, one time... add back later when round ends

// when the characters get whacked
characters.forEach(char => {
    char.addEventListener(`click`, function () {
        // popDown(this); // <-- commented out lets them fall down organically in time

        this.style.backgroundImage = `url("images/harold_headache.png")`;
        groans[randomInt(groans.length)].play();

        score++;

        score_your.textContent = score;
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

        console.log(`Your score this round: ${score}`);

        // if high score beat, update in Airtable database
        if (highScore && (score > highScore)) {
            fireworks.style.display = `block`;
            applause.play();
            applause.onended = () => fireworks.style.display = `none`;

            name_inpCont.style.top = `64px`;
            name_inpCont.style.zIndex = 1000;
            name_inp.style.transform = `rotate(1440deg) scale(1)`;
            setTimeout(() => {
                name_inpInp.focus();
                name_inpBtn.onclick = () => {
                    // debugger;
                    if (name_inpInp.value) {
                        // update the database
                        // figure out how to do a fetch PATCH, lol!
                        try {
                            let xhr = new XMLHttpRequest();
                            xhr.open(`PATCH`, `https://api.airtable.com/v0/app1f28asn5qYyBt9/Table%201/recGgzk8TFA7K6N0P`);
                            xhr.setRequestHeader(`Authorization`, `Bearer key2907TRncvdS3pJ`);
                            xhr.setRequestHeader(`Content-type`, `application/json`);
                            try { xhr.send(`{"fields": {"Name": "${name_inpInp.value}", "High Score": ${score}}}`); }
                            catch (err) { console.error(`Error sending name and/or score to Airtable :(`); }
                        } catch (err) {
                            console.error(`Error updating Airtable database: ${err}`);
                        }

                        name_inpCont.style.top = 0;
                        name_inpCont.style.zIndex = 0;
                        name_inp.style.transform = `rotate(0) scale(0)`;

                        // update the scoreboard
                        score_name.textContent = name_inpInp.value;
                        score_high.textContent = score;
                    } else {
                        score_message.textContent = `Input your name, silly!`;
                        name_inp.focus();
                    }
                }
            }, transTime);

            score_message.textContent = `!!!CONGRATS!!! New high score: ${score}!`;

            console.log(`:) !!!CONGRATS!!! You set a new high score of ${score}! :)`);
        } else {
            score_message.textContent = `Didn't beat ${name}'s score of ${highScore}.`;

            console.log(`:( Sorry, your score of ${score} did not beat ${name}'s high score of ${highScore}. :(`);
        }

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
