'use strict';

//check state of shift key///////////////////////////////////////////////////////////////////
// let shiftDown = false;
// window.addEventListener(`keydown`, ev => { if (ev.keyCode === 16) { shiftDown = true; } });
// window.addEventListener(`keyup`, ev => { if (ev.keyCode === 16) { shiftDown = false; } });
/////////////////////////////////////////////////////////////////////////////////////////////
//...found out I can just use ev.shiftKey property

let checkboxes = document.querySelectorAll(`#checkbox-list input[type="checkbox"]`),
    first,
    last,
    betwixt = false,
    clear = document.getElementById(`clear`);

function checkHandler(ev) {
    /*
    if (shiftDown) {
        this.checked = true;

        let first,
            last;

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                first = i;
                break;
            }
        }

        for (let i = checkboxes.length - 1; i > -1; i--) {
            if (checkboxes[i].checked) {
                last = i;
                break;
            }
        }

        //console.log(first, last);

        for (let i = first; i <= last; i++) {
            checkboxes[i].checked = true;
        }
    }
    */

    if (!ev.shiftKey) {
        first = this;
    } else {
        last = this;

        checkboxes.forEach(ea => {
            if (ea === first || ea === last) {
                betwixt = !betwixt;
            }

            if (betwixt) {
                ea.checked = true;
            }
        });
    }
}

checkboxes.forEach(ea => ea.addEventListener(`click`, checkHandler));

clear.addEventListener(`click`, () => checkboxes.forEach(ea => {
    first = null;
    last = null;
    ea.checked = false;
}));