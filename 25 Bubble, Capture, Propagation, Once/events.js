'use strict';

const family = document.querySelectorAll(`.family`),
    [grandparent, parent, child] = family,
    out = document.getElementById("out");

let i = 0;
function clickHandler(ev) {
    // ev.stopPropagation();
    if (!i++) out.textContent = null;
    out.textContent += `${this.id} `;
}

family.forEach(ea => ea.addEventListener(`click`, clickHandler, { capture: false, once: true }));
