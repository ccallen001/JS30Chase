'use strict';

let up = document.querySelector(`[data-click="up"`),
    down = document.querySelector(`[data-click="down"`),
    left = document.querySelector(`[data-click="left"`),
    right = document.querySelector(`[data-click="right"`),
    b = document.querySelector(`[data-click="b"`),
    a = document.querySelector(`[data-click="a"`),
    clickMap = {
        up: 38,
        down: 40,
        left: 37,
        right: 39,
        b: 66,
        a: 65
    },
    keyMap = {
        38: `↑`,
        39: `→`,
        40: `↓`,
        37: `←`,
        66: `b`,
        65: `a`
    },
    konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    i = 0,
    coin = document.createElement(`audio`),
    fight = document.createElement(`audio`),
    uniqueRequest = 0;

coin.src = `http://themushroomkingdom.net/sounds/wav/smw/smw_coin.wav`;
fight.src = `http://cd.textfiles.com/maxsounds/WAV/EFEITOS/BIT.WAV`;
fight.volume = .25;

function detectSequence(ev, fromClick) {
    //console.log(arguments);
    if (fromClick) {
        ev.keyCode = clickMap[ev.target.dataset.click];
        ev.key = ev.keyCode === 66 ? `b` : `a`;
    } else {
        function revertDPad(direction) {
            setTimeout(() => { direction.style.transform = `none`; }, 100);
        }

        function revertButton(button) {
            setTimeout(() => { button.style.transform = `none`; button.style.boxShadow = `1px 1px 4px var(--dark)` }, 100);
        }

        if (ev.keyCode === 38) { up.style.transform = `scale(.95)`; revertDPad(up); }
        else if (ev.keyCode === 39) { right.style.transform = `scale(.95)`; revertDPad(right); }
        else if (ev.keyCode === 40) { down.style.transform = `scale(.95)`; revertDPad(down); }
        else if (ev.keyCode === 37) { left.style.transform = `scale(.95)`; revertDPad(left); }
        else if (ev.keyCode === 66) { b.style.transform = `scale(.99)`; b.style.boxShadow = `none`; revertButton(b); }
        else if (ev.keyCode === 65) { a.style.transform = `scale(.99)`; a.style.boxShadow = `none`; revertButton(a); }
    }

    //prevent page scrolling with key presses
    if (konami.indexOf(ev.keyCode) > -1 || ev.keyCode === 32) {
        ev.preventDefault();
    }

    let correct = ev.keyCode === konami[i],
        color = correct ? `#16fe00` : `#fe0016`;

    console.log(`%c${(keyMap[ev.keyCode] || ev.key).toUpperCase()}`, `color: ${color}; font-size: 24px; font-weight: bold;`);

    i = correct ? i + 1 : 0;

    if (i === konami.length) {
        i = 0;

        let asItWas = document.body.innerHTML;

        document.body.innerHTML = null;

        coin.play();
        setTimeout(() => { fight.play(); }, 2500);

        document.body.style.background = `url("https://cdn-images-1.medium.com/max/800/1*TlqTjJ_uKiFJfQES7iLs-w.gif/#${uniqueRequest++}") no-repeat center`;

        setTimeout(() => {
            fight.pause();
            fight.currentTime = 0;
            document.body.style.background = `none`;
            document.body.innerHTML = asItWas;

            addListeners();
        }, 4000);
    }
}

//key down handler
window.addEventListener(`keydown`, detectSequence);

//click handler
function addListeners() {
    [left, right, up, down, b, a].forEach(ea => {
        //console.log(ea);
        ea.addEventListener(`click`, ev => {
            detectSequence(ev, true);
        });
    });
}
addListeners();