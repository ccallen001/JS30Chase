'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

// dom and variable assignment

let breakIntervals = document.querySelectorAll(`#set-break li`),
    customInput = document.getElementById(`custom-input`),
    customInputInputs = [...customInput.querySelectorAll(`input`)],
    customInputBtn = customInput.querySelector(`button`),
    container = document.getElementById(`container`),
    containers = document.querySelectorAll(`.containers`),
    // [fiveS, oneM, fiveM, oneH] = breakIntervals,
    countSpans = document.querySelectorAll(`#countdown span`),
    // [countHr, countMi, countSe] = countSpans,
    timeSpans = document.querySelectorAll(`#time span`),
    // [timeHr, timeMi, timeSe] = timeSpans,
    backSpans = document.querySelectorAll(`#back-at span`),
    audio = document.getElementById(`audio`);

/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/

// time generator
let d, h, hr, mi, se, ap;
function getTime() {
    d = new Date();

    h = d.getHours();
    hr = h <= 12 ? !h ? 12 : h : h - 12; // nested... brutal ;)
    mi = d.getMinutes();
    se = d.getSeconds();
    ap = h < 12 ? `am` : `pm`;

    return [hr, mi, se, ap];
}
getTime();

/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/

// format with prefixed 0 if < 10
function prefix0(num) {
    return `${num < 10 ? `0${num}` : num}`;
}

/*--------------------------------------------------------------------------------------------------------------------*/

// update dom with current time
function showTime() {
    timeSpans.forEach((ea, i) => ea.textContent = [hr, mi, se, ap].map(el => prefix0(el))[i]);
}
showTime(); // <-- call as soon as js is available

/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/

// every second interval generator
function everySecond() {
    // fresh!
    clearTimeout(everySecond.timeout);

    // property assignment for timeout in order to cancel
    everySecond.timeout = setTimeout(() => {
        getTime();
        showTime();

        // recursive call
        everySecond();
    }, 1000);
}
everySecond();

/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/

// transition effect for the countdown text
function transEffect() {
    container.style.transition = `none`;
    container.style.opacity = 0;
    setTimeout(() => {
        container.style.transition = `opacity .5s ease-in`;
        container.style.opacity = 1
    }, 50);
}

/*--------------------------------------------------------------------------------------------------------------------*/

// be back @...
function backAt(hmsap) {
    let [h, m, s, ap] = hmsap;

    backSpans.forEach((ea, i) => {
        ea.textContent = [h, m, s, ap].map(el => prefix0(el))[i];
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/

// calculation of be back time
function resolveTime(gotTime, breakTime) {

    let resolved = gotTime.map((el, i) => {
        return i < 3 ? el + breakTime[i] : el; // <-- don't try am/pm yet.. !!! TO DO !!!
    });

    // console.log(resolved);

    if (resolved[2] >= 60) {
        resolved[2] -= 60;
        resolved[1] += 1;
    }

    if (resolved[1] >= 60) {
        resolved[1] -= 60;
        resolved[0] += 1;
    }

    // TO DO
    // write code to handle hours

    backAt(resolved);
}

/*--------------------------------------------------------------------------------------------------------------------*/

// the different break-time options up top
breakIntervals.forEach((ea, i) => ea.addEventListener(`click`, () => {
    everySecond(); // <-- keeps em synced

    if (i < 3) {
        // all but custom
        transEffect();

        let times = [[0, 0, 10], [0, 1, 0], [0, 5, 0]][i];

        countdown(times);

        resolveTime(getTime(), times);
    } else {
        // show custom-input modal
        customInput.style.display = `block`;
        customInput.style.opacity = 1;
        customInputInputs[0].focus();
    }
}));

/*--------------------------------------------------------------------------------------------------------------------*/

// custom-input start-button listener/handler
customInputBtn.addEventListener(`click`, ev => {
    everySecond(); // <-- keeps em synced

    let [h, m, s] = customInputInputs
        .map(el => parseInt(el.value))
        .map(el => {
            if (isNaN(el)) {
                return 0;
            } else {
                return el;
            }
        });

    // blank em out
    customInputInputs.forEach(ea => ea.value = null);

    // console.log(h, m, s);

    // validate
    if (
        (h || h === 0) && (m || m === 0) && (s || s === 0) &&
        !(h === 0 && m === 0 && s === 0) &&
        (m > -1 && m < 60) && (s > -1 && s < 60)
    ) {
        transEffect();
        countdown([h, m, s]);

        resolveTime(getTime(), [h, m, s]);
    } else {
        alert(`OOPS! There was an error :( ...Please try again!`);
    }

    customInput.clicked = false; // <-- sneaky... lies!!!

    hideCustomInput(ev);
});

/*--------------------------------------------------------*/

// hide custom-input modal

function hideCustomInput(ev) {
    if (!customInput.clicked/*|| ev.target === customInputBtn*/) {
        customInput.style.display = `none`;
        customInput.style.opacity = 0;
        customInputInputs.forEach(ea => ea.blur());
    }
}

window.addEventListener(`mousedown`, ev => {
    // console.log(customInput.clicked);

    hideCustomInput(ev);
});

customInput.addEventListener(`mousedown`, () => {
    customInput.clicked = true;
    setTimeout(() => {
        customInput.clicked = false;
    }, 200)
});

/*--------------------------------------------------------------------------------------------------------------------*/

// function that kicks off countdown and updates dom
function countdown(hms) {
    // keep it fresh!
    clearTimeout(countdown.timeout);

    // if (typeof hms === `function`) hms = hms(); // what??? ?? ? ...not so elegant :(

    // spread em!
    let [h, m, s] = [...hms];

    // update dom
    countSpans.forEach((ea, i) => {
        // red color if 10 secs or less
        containers[0].style.color = h === 0 && m === 0 && s <= 10 ?
            `#ff2500` : getComputedStyle(document.body).getPropertyValue(`--light`);
        // text content
        ea.textContent = [h, m, s].map(el => prefix0(el))[i];
    });

    // fun! :)
    document.title = containers[0].textContent;

    // countdown timer logic
    if (!h && !m && !s) {
        audio.play();
    } else {
        if (!s) {
            if (m) {
                m -= 1;
            }
            s = 59;
            if (!m) {
                if (h) {
                    h -= 1;
                    m = 59;
                }
            }
        } else {
            s -= 1;
        }

        // property assignment for canceling timeout ...and recursive call
        countdown.timeout = setTimeout(() => {
            countdown([h, m, s]);
        }, 1000);
    }
}
