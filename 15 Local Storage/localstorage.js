'use strict';

//SOLID STATE :) :) :)

//--------------------------------------------------------------------------------------------------

function getStyle(elem, prop) {
    return getComputedStyle(elem).getPropertyValue(prop);
}

//--------------------------------------------------------------------------------------------------

let puzzleBox = document.querySelector(`.puzzle-box`),
    coords = [
        [`0`, `0`],
        [`0`, `100`],
        [`0`, `200`],
        [`100`, `0`],
        [`100`, `100`],
        [`100`, `200`],
        [`200`, `0`],
        [`200`, `100`],
        [`200`, `200`]
    ],
    coordsCopy = Array.from(coords),
    coordsMap = {
        '0 0': 0,
        '0 100': 1,
        '0 200': 2,
        '100 0': 3,
        '100 100': 4,
        '100 200': 5,
        '200 0': 6,
        '200 100': 7,
        '200 200': 8

    },
    neighborhood = {
        0: [1, 3],
        1: [0, 2, 4],
        2: [1, 5],
        3: [0, 4, 6],
        4: [1, 3, 5, 7],
        5: [2, 4, 8],
        6: [3, 7],
        7: [6, 4, 8],
        8: [5, 7]
    },
    hole;

//--------------------------------------------------------------------------------------------------

function makeRando() {
    document.querySelectorAll(`.puzzle-box div`).forEach(ea => {
        ea.style.top = getStyle(ea, `top`);
        ea.style.left = getStyle(ea, `left`);

        let rando = coords.splice(Math.floor(Math.random() * coords.length), 1);
        ea.style.top = `${rando[0][0]}px`;
        ea.style.left = `${rando[0][1]}px`;
    });
    coords = [...coordsCopy];
}

if (!localStorage.state) {
    makeRando();
} else {
    puzzleBox.innerHTML = localStorage.state;
}

puzzleBox.style.opacity = 1;

//--------------------------------------------------------------------------------------------------

function assignState() {
    document.querySelectorAll(`.puzzle-box div`).forEach((ea, i) => {
        if (getStyle(ea, `background`).includes(`none`)) {
            hole = ea;
            hole.coord = coordsMap[`${parseInt(hole.style.top)} ${parseInt(hole.style.left)}`];
        }

        ea.index = i;
        ea.coord = coordsMap[`${parseInt(ea.style.top)} ${parseInt(ea.style.left)}`];

    });
}
assignState();

//--------------------------------------------------------------------------------------------------

function moveAndCheck4Win(ev) {
    if (neighborhood[hole.coord].includes(ev.target.coord)) {
        //prevent double clicks
        puzzleBox.removeEventListener(`mousedown`, moveAndCheck4Win);

        let savedTop = getStyle(ev.target, `top`),
            savedLeft = getStyle(ev.target, `left`);

        ev.target.style.top = getStyle(hole, `top`);
        ev.target.style.left = getStyle(hole, `left`);

        hole.style.top = savedTop;
        hole.style.left = savedLeft;

        ev.target.coord = coordsMap[`${parseInt(ev.target.style.top)} ${parseInt(ev.target.style.left)}`];
        hole.coord = coordsMap[`${parseInt(hole.style.top)} ${parseInt(hole.style.left)}`];

        localStorage.state = puzzleBox.innerHTML;

        let win = true;
        document.querySelectorAll(`.puzzle-box div`).forEach((ea, i) => {
            if (ea.coord !== i) {
                win = false;
            }
        });
        setTimeout(() => {
            //BIIIIIIGGGGGG WIIIIIIINNNNNNEEERRRRRRRRRRR!!!!!!!!!!!!!!!!!!!!!
            if (win) {
                alert(`🎉 🎉 🎉 YOU WIN!!!!! 🎉 🎉 🎉`);
            }
            //re-add
            puzzleBox.addEventListener(`mousedown`, moveAndCheck4Win);
        }, 340);
    }
}

//event delegation! ...put it higher up so as to not lose the listeners
puzzleBox.addEventListener(`mousedown`, moveAndCheck4Win);

//--------------------------------------------------------------------------------------------------

localStorage.state = puzzleBox.innerHTML;

//--------------------------------------------------------------------------------------------------

document.querySelector(`.jumble`).addEventListener(`click`, ev => {
    makeRando();
    assignState();
    localStorage.state = puzzleBox.innerHTML;
});