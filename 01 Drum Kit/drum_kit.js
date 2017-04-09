'use strict';
//image loads..
function init() {
    //bring page in to view>>>>>>>>>>>>>>>
    document.body.style.opacity = 1;
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    //create sound map
    let soundMap = {
        65: `sounds/boom.wav`,
        83: `sounds/clap.wav`,
        68: `sounds/hihat.wav`,
        70: `sounds/kick.wav`,
        32: `sounds/openhat.wav`,
        74: `sounds/ride.wav`,
        75: `sounds/snare.wav`,
        76: `sounds/tink.wav`,
        186: `sounds/tom.wav`,
    },
        //get the li elements on the page
        lis = document.querySelectorAll(`li`);

    function activate(mS, kC) {
        if (mS) {
            //audio effect
            let sound = document.createElement(`audio`);
            sound.src = mS;
            sound.play();

            //visual effect
            let active = document.querySelector(`li[data-key-code="${kC}"]`).classList;
            active.toggle(`active`);
            setTimeout(() => { active.toggle(`active`); }, 100);
        }
    }

    //listen for key presses
    window.addEventListener(`keydown`, ev => {
        //no spacebar scrolling
        if (ev.keyCode === 32) { ev.preventDefault(); }
        activate(soundMap[ev.keyCode], ev.keyCode);
    });

    //listen for mouse clicks
    function callPS() { activate(soundMap[this.dataset.keyCode], this.dataset.keyCode); }
    lis.forEach(ea => {
        ea.addEventListener(`mousedown`, callPS);
    });

    //drummer boy
    console.log(`
       _
      /_)  _.-===-._
      /  .; '_-.'- .'.     _
 __ _/  /.'| ._  '. , |   (_|
/|_( |  |.'.-._'- .  '|     |
|_)  /  |/'    ''--''||     _|__
|_)_|  /'  ._.   ._.  '|   / )(_|
)/  (  |_      _      _/   |' (_|
/   /    |           /     _) (_/
|   '',_ _'._'---'_.'_ _,.'    | |
|    /  | |  '"""'  / / /     /   |
 |_.'    | |       / /  |   .'
  '--.,   | |     / /  _;-''
      '|   | |   / /   |
      .;--""'''''''""--;.
     /(                 )|
     |_''-------------''_/
     | '';-----;-----;'' |
     | / : | / : | / : | |
     |V.','.V.','.V.','.V|
     |'./_|.;./_|.;./_|.'/
      ';..___________..;'
       |       _       |
       ;       |       ;
       |       |       /
        ', _ _ | __ _,'
         /o____|____o|
          |::::|::::|
          |::::|::::|
           |:::|:::/
          ,'-' Y '-',
         /    / |    |
        (___.'   '.___)
    `);
}