'use strict';

/*
----------------------------------------------------------------------------------------------------------------------------------
*/

// VARS

const video = document.querySelector(`video`),
    speedDisplay = document.getElementById(`speed-display`),
    control = document.getElementById(`control`),
    gradient = document.querySelector(`#control .gradient`),
    slide = document.getElementById(`slide`),
    boost = document.getElementById(`boost`);

let left,
    distance,
    cLen = control.getBoundingClientRect().width,
    cLenD2 = cLen / 2,
    sLen = slide.getBoundingClientRect().width,
    sLenD2 = sLen / 2,
    calc,
    speed = 1;

/*
----------------------------------------------------------------------------------------------------------------------------------
*/

/* called on control mousemove... defined below */
function updateSpeedDisplay() {
    speedDisplay.style.transition = `none`;
    speedDisplay.style.opacity = 1;
    speedDisplay.textContent = `${speed}X`;
}
updateSpeedDisplay(); // on pageload call

function transOutSpeedDisplay() {
    setTimeout(() => {
        speedDisplay.style.transition = `opacity 4s ease-out`;
        speedDisplay.style.opacity = 0;
    }, 666);
}
transOutSpeedDisplay(); // on pageload call

/* speedDisplay transition out */
[`mouseup`, `mouseout`].forEach(event => slide.addEventListener(event, transOutSpeedDisplay));

/*
----------------------------------------------------------------------------------------------------------------------------------
*/

control.addEventListener(`mousemove`, ev => {
    ev.preventDefault();

    left = parseInt(getComputedStyle(slide).getPropertyValue(`left`));
    distance = ev.x - control.getBoundingClientRect().left;
    calc = distance < sLenD2 ? sLenD2 : distance >= 250 ? 250 : distance; // why 250??

    if (ev.buttons) {
        gradient.style.width = `${calc}px`;
        slide.style.left = `${calc - sLenD2}px`;

        speed = Number((((left / (492/* (250 - sLenD2) * 2 */)) * 5)).toFixed(2)); // why 250??

        video.playbackRate = speed;

        boost.textContent = `Boost!`;
        boost.classList.remove(`boosted`);

        updateSpeedDisplay();
        /* trans out happens on mouseup */

        console.log({ left: left, speed: speed });
    }
});

/*
----------------------------------------------------------------------------------------------------------------------------------
*/

// boost button logic
boost.addEventListener(`click`, ev => {
    gradient.style.width = `${250}px`;
    slide.style.left = `${left = 250 - sLenD2}px`;
    video.playbackRate = speed = 4;

    boost.textContent = `BOOSTED`
    boost.classList.add(`boosted`);

    updateSpeedDisplay();
    transOutSpeedDisplay();

    console.log({ left: left, speed: speed });
});

/*
----------------------------------------------------------------------------------------------------------------------------------
*/
