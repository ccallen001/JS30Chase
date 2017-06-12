'use strict';

const synth = window.speechSynthesis;

// stops all speaking
synth.cancel();

let times = `after arriving back to the present from the year 3024,-back in the 70s,-I still remember, when-it's been almost 30 years since,-when I was an infant,...,-I just found out that,-It has recently come to my attention that,-once,-back when I was actually a woman,-once upon a time,-when I was your age...-two days ago,-last week,-the other day,-when I was in Italy,-when I was growing up,-when I was a kid,-back when I was in the hospital,-back in the good old days,-30 years ago,`,
    subjects = `my pet parakeet, Ted,-a pair of lovers,-Snoop Dogg,-two people-that girl, Precious, from that super precious movie, Precious,-Santa Claus-this super weird dude-a pair of star crossed lovers,-two really really old women,-I-my cat, Mr. Tinkerson,-this one guy I kind of sortta know,-my dog,-a very heavy set clown-several really weird looking guys,-my sister-my mother,-a very large chimpanzee,-President Trump`,
    verbs = `made a moderately successful rap album with-became really really good at making memes, with-gathered together and threw several small stones, at,-got in to an extremely brutal fist fight with-took hostage,-grabbed and shook vigorously,-frantically ran away from-stole 50 dollars from-carved, archaic runes, into-took complete and utter control, of-ended up taking by force,-drove a car into-straight up devoured-murdered-found and tied up, in the basement of an old grocery store,-said hello..., and, how do you do, to-hid for many weeks from-once set fire to-viciously beat`,
    objects = `the frozen head of Walt Disney,-the big blue genie, the one from Aladin,..,-Vladimir Putin,-Harold...,-an old man,-your mother,-my father,-this really old dude,-a guy who used to be in prison,-ex President Bush,-a nice young lady,-two really hairy boys,-four small men...-a man found lying in the the street-a very large turtle,-50 birds,`,
    clauses = `after building an apocolypse bunke and stocking it almost entirely with Fruit by the Foot-right before getting super duper plastered on virgin margaritas-right after waking up from a 35 year coma-after walking out on Fast and the Furious 9: Fast, Faster, Fastest-after finally cracking the DaVinci code-after skipping out on a tip... even though..., that waitress, was actually not bad-purely to see what would happen-while tap dancing really fast and shouting about fluoride in the water-all while shouting really strange obscenities at the sky-while slowly slipping in to a strangely comfortable, strangely erotic, fit of madness-all while chanting indescernible invocations and waving at cars as they passed by-after completely running out of toilet paper, and just,..., just, completely losing it-just for fun-just in order to talk about, rats and cheese-and they did it all for the nookie, for the nookie..., yeah-for no good reason at all-just for the heck of it-after eating 12 way, way too spicy tacos-all while waving around a plastic hammer-while not wearing any pants-at least 10 or more times-after consuming one whole gram of L.S.D.`,
    phraseArr = [times, subjects, verbs, objects, clauses].map(phrase => phrase.split(`-`)),
    phrase,
    utterance,
    engVoices;

synth.onvoiceschanged = () => {
    engVoices = synth.getVoices().filter(voice => voice.lang.includes(`en-`) && voice.name !== `Fred` && voice.name !== `Moira` && voice.name !== `Victoria` && voice.name !== `Alex`);
    synth.onvoiceschanged = null;
};

// get dom elements
let androidContainer = document.getElementById(`android-container`),
    androidTop = document.querySelector(`.android.top`),
    speakBtn = document.getElementById(`speak-btn`),
    squiggle = document.getElementById(`squiggle`);

androidContainer.rotation = 0;

// speak function
function speak() {
    // disalbe button click transition effect
    speakBtn.removeEventListener(`mousedown`, clickEffect);

    // if it's not talking...
    if (!synth.speaking) {
        // increase count of how many times spoken
        speak.count++;

        // what???
        if (speak.count === 3) {
            let time = 20;
            squiggle.style.animation = `squiggle ${time}s linear`;
            squiggle.style.animationFillMode = `forwards`;

            setTimeout(() => { document.body.removeChild(squiggle) }, time * 1000);
        }

        // rotate the container/head        
        if (speak.count % 5 === 0) {
            androidContainer.rotation += 720;
            androidContainer.style.transform = `rotate(${androidContainer.rotation}deg) translate(-10px)`;
        }

        phrase = ``;
        // random phrase
        phraseArr.forEach(ea => phrase += ea[Math.floor(Math.random() * ea.length)] + ` `);
        // reassign utterance with a new instance
        utterance = new SpeechSynthesisUtterance(phrase);
        // speed of voice
        utterance.rate = .90;
        // random voice
        utterance.voice = engVoices[Math.floor(Math.random() * engVoices.length)];

        console.log({ 'speak.count': speak.count })
        console.log(utterance.voice);

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

// how many times has the android spoken?
speak.count = 0;

function clickEffect() { this.style.transform = `scale(.95)`; }

// button click effects
speakBtn.addEventListener(`mousedown`, clickEffect);
[`mouseup`, `mouseleave`].forEach(ea => speakBtn.addEventListener(ea, ev => speakBtn.style.transform = `scale(1)`));

speakBtn.addEventListener(`click`, speak);