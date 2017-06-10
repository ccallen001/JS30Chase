"use strict";

const outputs = document.querySelectorAll(`output`),
    blackouts = document.querySelectorAll(`.blackout`),
    inputs = document.querySelectorAll(`.modal input`),
    submits = document.querySelectorAll(`.modal button`),
    recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition)(),
    synthesis = window.speechSynthesis;

let triggerWords = [
    `modal`,
    `model`,
    `mohdel`,
    `mohdul`,
    `mowdle`,
    `moto`,
    `Moto`,
    `motor`
];

recognition.lang = "en-US";

recognition.onend = () => recognition.start();
recognition.start();

recognition.onresult = ev => {
    let whatWasHeard = event.results[0][0].transcript, heardTrigger = false;

    outputs.forEach(ea => {
        ea.textContent = whatWasHeard;
        ea.style.transition = ``;
        ea.style.opacity = 1;
        setTimeout(() => {
            ea.style.transition = `opacity 1s linear`;
            ea.style.opacity = 0.01;
        }, 2000);
    });

    triggerWords.forEach(ea => {
        if (whatWasHeard.includes(ea)) heardTrigger = true;
    });

    if (heardTrigger) blackouts[0].classList.toggle(`hidden`);
};

function sayIt() {
    // console.log(synthesis.getVoices());
    let utterance = new SpeechSynthesisUtterance(inputs[this.i].value),
        engVoices = synthesis.getVoices().filter(voice => voice.lang.includes(`en-`));

    utterance.voice = engVoices[Math.floor(Math.random() * engVoices.length)];

    // console.log(engVoices);

    synthesis.speak(utterance);
}

submits.forEach((ea, i) => {
    ea.i = i;
    ea.addEventListener(`click`, sayIt);
});
