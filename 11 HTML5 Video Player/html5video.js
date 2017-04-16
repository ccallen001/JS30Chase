'use strict';

let video = document.querySelector(`video`),

    rocks = document.querySelector(`#rocks`),

    blur = document.querySelector(`#blur`),
    dim = document.querySelector(`#dim`),
    invert = document.querySelector(`#invert`),

    play = document.querySelector(`#play`),
    playing = false,
    wasPlaying = false,

    duration = document.querySelector(`#duration`),
    display = document.querySelector(`#duration-cont div`),

    vMinus = document.querySelector(`#vMinus`),
    vPlus = document.querySelector(`#vPlus`),
    vPerc = document.querySelector(`#vPerc`),
    mute = document.querySelector(`#mute`),
    max = document.querySelector(`#max`),

    specials = document.querySelectorAll(`#special-cont button`);

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//  PLAY/PAUSE-----------------------------------------------------------------------------

function playIt() {
    video.play();
    playing = true;
    play.textContent = `||`;
}

function pauseIt() {
    video.pause();
    playing = false;
    play.textContent = `=>`;
}

play.addEventListener(`click`, ev => {
    if (!playing) { playIt(); }
    else { pauseIt(); }
});

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//  TIMING---------------------------------------------------------------------------------

let i = 0,
    dur,
    intv = setInterval(() => {
        if (video.duration) { dur = video.duration; clearInterval(intv); }
        if (++i === 4) { clearInterval(intv); }

        duration.setAttribute(`max`, dur);

        duration.addEventListener(`input`, ev => {
            let ct = ev.currentTarget;

            if (ct.value == 0) { display.textContent = `00:00s` }
            else { display.textContent = ct.value < 10 ? `0${ct.value}s` : `${ct.value}s` }
            video.currentTime = ct.value;
        });
    }, 500);

//using the slider to set time
let downed = false;

duration.addEventListener(`mousedown`, ev => {
    wasPlaying = playing ? true : false;
    pauseIt();
    downed = true;
});

duration.addEventListener(`mouseup`, ev => {
    if (downed && wasPlaying) { playIt(); }
    downed = false;
});

//show current time on status bar
!function updateDuration() {
    duration.value = video.currentTime;

    if (video.currentTime == 0) { display.textContent = `00:00s` }
    else { display.textContent = video.currentTime < 10 ? `0${video.currentTime.toFixed(2)}s` : `${video.currentTime.toFixed(2)}s` }

    setTimeout(updateDuration, 100);
}();

//when it ends
video.onended = () => {
    video.currentTime = 0;
    setTimeout(() => { pauseIt(); }, 100)
}

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//  VOLUME---------------------------------------------------------------------------------

//initialize volume
video.volume = .5;

function setVolume(mop) {
    if (mop === `m`) {
        if (video.volume > 0) { video.volume -= .1; }
    } else {
        if (video.volume < 1) { video.volume += .1; }
    }

    video.volume = (Math.round(video.volume * 10) / 10);

    vPerc.textContent = `${Math.round(video.volume * 100)}%`;
}

[vMinus, vPlus].forEach(ea => ea.addEventListener(`click`, ev => {
    if (ev.currentTarget === vMinus) {
        setVolume(`m`);
    } else {
        setVolume(`p`);
    }
}));

[mute, max].forEach(ea => ea.addEventListener(`click`, ev => {
    if (ev.currentTarget === mute) { video.volume = 0; }
    else { video.volume = 1; }
    vPerc.textContent = `${Math.round(video.volume * 100)}%`;
}));

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//  SPECIAL BUTTONS------------------------------------------------------------------------

//initialize opacities
rocks.style.opacity = 0;
video.style.opacity = 1;

let funcMap = {
    0: () => {
        blur.style.filter = !blur.blurred ? `blur(8px)` : `none`;
        blur.blurred = !blur.blurred;
    },
    1: () => {
        dim.style.filter = !dim.dimmed ? `brightness(.25)` : `none`;
        dim.dimmed = !dim.dimmed;
    },
    2: () => {
        invert.style.filter = !invert.inverted ? `invert(100%)` : `none`;
        invert.inverted = !invert.inverted;
    },
    3: () => {
        rocks.style.opacity = rocks.style.opacity == 0 ? 1 : 0;
        video.style.opacity = video.style.opacity == 1 ? 0 : 1;
    }
}

specials.forEach((ea, i) => ea.addEventListener(`click`, ev => {
    ev.target.classList.toggle(`active`);
    funcMap[i]();
}));

//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------