'use strict';

const haroldBanner = document.getElementById(`harold-banner`),
    sticky = document.getElementById(`sticky`),
    apple = document.getElementById(`apple`);
let scroll;

function getBannerBottom() {
    return haroldBanner.getBoundingClientRect().bottom;
}

window.addEventListener(`scroll`, () => {
    scroll = document.body.scrollTop;

    if (scroll >= (getBannerBottom() + scroll)) {
        sticky.style.position = `fixed`;
        sticky.style.top = 0;
        apple.style.transform = `translate(0)`;
    } else {
        sticky.style.position = `absolute`;
        sticky.style.top = `${getBannerBottom() + scroll}px`;
        apple.style.transform = `translate(-100%)`;
    }
});