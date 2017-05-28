"use strict";

const output = document.querySelectorAll(`output`),
    blackout = document.querySelectorAll(`.blackout`),
    recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition)();

let triggerWords = [`modal`, `model`, `mohdel`, `mohdul`, `mowdle`];

recognition.lang = "en-US";

recognition.onend = () => recognition.start();
recognition.start();

recognition.onresult = ev => {
    let whatWasHeard = output[0].textContent = event.results[0][0].transcript,
        heardTrigger = false;

    triggerWords.forEach(ea => {
        if (whatWasHeard.includes(ea)) heardTrigger = true;
    });

    if (heardTrigger) blackout[0].classList.toggle(`hidden`);
};
