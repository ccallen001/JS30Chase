'use strict';

const synth = window.speechSynthesis;

let times = `when I was an infant,-I just found out that-It has recently come to my attention that,-once,-back when I was actually a woman,-once upon a time,-when I was your age...-two days ago,-last week,-the other day,-when I was in Italy,-when I was growing up,-when I was a kid,-when I was in the hospital,-back in the good old days,-30 years ago,`,
    subjects = `I-my cat,-this one guy-my dog,-a very heavy set clown-several really weird looking guys,-my sister-my mother,-a very large child,-President Trump`,
    verbs = `frantically ran away from-took 50 dollars from-carved, archaic runes, into-took complete charge, of-drove a car into-straight up devoured-murdered-found, and tied up, in a basement,-said hello..., and, how do you do, to-hid for many weeks from-set fire to-viciously beat`,
    objects = `Harold,-an old man,-your mother,-my father,-this really old dude,-a guy who used to be in prison,-ex President Bush,-a nice young lady,-two really hairy boys,-four small men...-a man found lying in the the street-a very large turtle,-50 birds,`,
    clauses = `while shouting obscenities at the sky-while slowly slipping in to a strangely comfortable, fit of madness-while chanting indescernible invocations-after completely running out of toilet paper-just for fun-just in order to talk about rats-all just to die alone-for no good reason at all-just for the heck of it-after eating 12, way, way too spicy tacos-all while waving around a plastic hammer-while not wearing any pants-at least 10, or so, times-after consuming one whole gram of L.S.D.`,
    phraseArr = [times, subjects, verbs, objects, clauses].map(phrase => phrase.split(`-`)),
    phrase,
    utterance,
    engVoices;

synth.onvoiceschanged = () => {
    engVoices = synth.getVoices().filter(voice => voice.lang.includes(`en-`) && voice.name !== `Fred`);
    synth.onvoiceschanged = null;
};

// get dom elements
let androidTop = document.querySelector(`.android.top`),
    speakBtn = document.getElementById(`speak-btn`);

// speak function
function speak() {
    // disalbe button click transition effect
    speakBtn.removeEventListener(`mousedown`, clickEffect);

    // if it's not talking...
    if (!synth.speaking) {

        phrase = ``;
        // random phrase
        phraseArr.forEach(ea => phrase += ea[Math.floor(Math.random() * ea.length)] + ` `);
        // reassign utterance with a new instance
        utterance = new SpeechSynthesisUtterance(phrase);
        // speed of voice
        utterance.rate = .90;
        // random voice
        utterance.voice = engVoices[Math.floor(Math.random() * engVoices.length)];

        // console.log(utterance.voice);

        // animate the android        
        utterance.onstart = () => androidTop.style.animation = `talk .33s linear infinite`;
        utterance.onend = () => {
            // re-add click transition effects
            speakBtn.addEventListener(`mousedown`, clickEffect);

            // stop the animation
            androidTop.style.animation = `none`;
        }

        // say it!
        synth.speak(utterance);
    }
}

function clickEffect() { this.style.transform = `scale(.95)`; }

// button click effects
speakBtn.addEventListener(`mousedown`, clickEffect);
[`mouseup`, `mouseleave`].forEach(ea => speakBtn.addEventListener(ea, ev => speakBtn.style.transform = `scale(1)`));

speakBtn.addEventListener(`click`, speak);