'use strict';

function getStyle(elem, prop) {
    return getComputedStyle(elem).getPropertyValue(prop);
}

let h1 = document.querySelector(`h1`),
    dist = 10, //the larger this is, the closer the shadow
    blur = 32;

function moveShadow(ev) {
    //console.log(ev);
    let isMobile = navigator.appVersion.toLowerCase().includes(`mobile`),
        x = isMobile ? ev.targetTouches[0].clientX : ev.offsetX,
        y = isMobile ? ev.targetTouches[0].clientY : ev.offsetY,
        quad = `${x < h1.wd2 ? `left` : `right`} ${y < h1.hd2 ? `top` : `bottom`}`;

    h1.wd2 = parseInt(getStyle(h1, `width`)) / 2;
    h1.hd2 = parseInt(getStyle(h1, `height`)) / 2;

    if (quad === `left top`) {
        h1.style.textShadow = `${(h1.wd2 - x) / dist}px ${(h1.hd2 - y) / dist}px ${blur}px var(--shadow-color), ${(h1.wd2 - x + h1.wd2) / dist}px ${(h1.hd2 - y + h1.hd2) / dist}px ${blur}px var(--shadow-color)`;
    } else if (quad === `right top`) {
        h1.style.textShadow = `-${(x - h1.wd2) / dist}px ${(h1.hd2 - y) / dist}px ${blur}px var(--shadow-color), -${(x - h1.wd2 + h1.wd2) / dist}px ${(h1.hd2 - y + h1.hd2) / dist}px ${blur}px var(--shadow-color)`;
    } else if (quad === `right bottom`) {
        h1.style.textShadow = `-${(x - h1.wd2) / dist}px -${(y - h1.hd2) / dist}px ${blur}px var(--shadow-color), -${(x - h1.wd2 + h1.wd2) / dist}px -${(y - h1.hd2 + h1.hd2) / dist}px ${blur}px var(--shadow-color)`;
    } else {
        h1.style.textShadow = `${(h1.wd2 - x) / dist}px -${(y - h1.hd2) / dist}px ${blur}px var(--shadow-color), ${(h1.wd2 - x +h1.wd2) / dist}px -${(y - h1.hd2 + h1.hd2) / dist}px ${blur}px var(--shadow-color)`;
    }

    //console.log(x, y);
}

h1.addEventListener(`mousemove`, moveShadow);
h1.addEventListener(`touchmove`, moveShadow);