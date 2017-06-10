'use strict';

const synth = window.speechSynthesis;

let times = `I just found out that-It has recently come to my attention that,-once,-back when I was actually a woman,-once upon a time,-when I was your age...-two days ago,-last week,-the other day,-when I was in Italy,-when I was growing up,-when I was a kid,-when I was in the hospital,-back in the good old days,-30 years ago,`,
    subjects = `I-you-my cat-this one guy-my dog,-a very heavy set clown-five guys-my sister-your mother,-a very large child-President Trump`,
    verbs = `frantically ran away from-took 50 dollars from-etched archaic runes into-took complete charge, of-drove a car into-straight up ate-murdered-tied up in a basement...-said hello, and how do you do, to-hid for many weeks from-set fire to-viciously beat`,
    objects = `Harold,-an old man,-me,-your mother,-my father,-this really old dude,-a guy who used to be in prison,-ex President Bush,-a nice young lady,-two really hairy boys,-four small men...-a man on the street-a very large turtle-50 birds,`,
    clauses = `while shouting obscenities at the sky-slowly slipping in to a strangely comfortable, fit of madness-while chanting indescernible magic invocations-after completely running out of toilet paper-just for fun-just so they could talk about rats-all in order just to die alone-for no good reason at all-just for the heck of it-after eating 12, way, way too spicy, tacos-while holding a plastic hammer-while not wearing any pants-10, or so, times-after consuming one whole gram of L.S.D.`,
    phraseArr = [times, subjects, verbs, objects, clauses].map(phrase => phrase.split(`-`)),
    phrase = ``,
    utterance,
    engVoices;

synth.onvoiceschanged = () => {
    engVoices = synth.getVoices().filter(voice => voice.lang.includes(`en-`));
};

// get dom elements
let androidTop = document.querySelector(`.android.top`),
    speakBtn = document.getElementById(`speak-btn`);

// speak function
function speak() {
    // speakBtn.removeEventListener(`click`, speak);
    // speakBtn.removeEventListener(`mousedown`, ev => speakBtn.style.transform = `scale(.95)`);
    // [`mouseup`, `mouseleave`].forEach(ea => speakBtn.removeEventListener(ea, ev => speakBtn.style.transform = `scale(1)`));

    // phraseArr.forEach(ea => phrase += ea[Math.floor(Math.random() * ea.length)] + ` `);
    // utterance = new SpeechSynthesisUtterance(phrase);
    // utterance.rate = .95;
    // utterance.voice = engVoices[Math.floor(Math.random() * engVoices.length)];

    // utterance.onstart = () => androidTop.style.animation = `talk .33s linear infinite`;
    // utterance.onend = () => {
    //     speakBtn.addEventListener(`click`, speak);
    //     addBtnClickEffects();
    //     androidTop.style.animation = `none`;
    // }

    utterance = new SpeechSynthesisUtterance(`fuck`);
    utterance.voice = engVoices[Math.floor(Math.random() * engVoices.length)];

    console.log(synth);

    synth.speak(utterance);
}

function addBtnClickEffects() {
    speakBtn.addEventListener(`mousedown`, ev => speakBtn.style.transform = `scale(.95)`);
    [`mouseup`, `mouseleave`].forEach(ea => speakBtn.addEventListener(ea, ev => speakBtn.style.transform = `scale(1)`));
}
addBtnClickEffects();

speakBtn.addEventListener(`click`, speak);