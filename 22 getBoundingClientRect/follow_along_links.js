'use strict';

const follower = document.getElementById(`follower`),
    links = document.querySelectorAll(`ul li a`);

function showStats() {
    let boundingRect = this.getBoundingClientRect() + document.body.scrollTop, // <-- might have messed it up, we'll see...
        padding = parseInt(getComputedStyle(follower).getPropertyValue(`padding`));

    follower.style.backgroundColor = `rgba(0, 0, 0, .25)`;
    follower.style.width = `${Math.round(boundingRect.width)}px`;
    follower.style.height = `${Math.round(boundingRect.bottom - boundingRect.top)}px`;
    follower.style.top = `${Math.round(boundingRect.top) - padding}px`
    follower.style.left = `${Math.round(boundingRect.left) - padding}px`
}

links.forEach(ea => ea.addEventListener(`mouseenter`, showStats));