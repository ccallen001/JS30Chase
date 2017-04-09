'use strict';

document.body.style.opacity = 0;

const hands = document.querySelectorAll(`.hands`),
    hour = hands[0].style,
    minute = hands[1].style,
    second = hands[2].style,

    digital = document.getElementById(`digital`);

let date = new Date(),
    hours = (date.getHours() <= 12 ? date.getHours() : date.getHours() - 12) * 30,
    h,
    minutes = date.getMinutes() * 6,
    seconds = date.getSeconds() * 6;

hour.transform = `rotate(${hours}deg)`;
minute.transform = `rotate(${minutes}deg)`;
second.transform = `rotate(${seconds}deg)`;

(function progress() {
    seconds += 6;
    if (seconds % 360 === 0) {
        minutes += 6;
        if (minutes % 360 === 0) {
            hours += 30;
        }
    }

    hour.transform = `rotate(${hours}deg)`;
    minute.transform = `rotate(${minutes}deg)`;
    second.transform = `rotate(${seconds}deg)`;

    date = new Date();
    h = date.getHours() <= 12 ? date.getHours() : date.getHours() - 12;

    digital.textContent = `
        ${ h < 10 ? `0` + h : h} : 
        ${ date.getMinutes() < 10 ? `0` + date.getMinutes() : date.getMinutes()} : 
        ${ date.getSeconds() < 10 ? `0` + date.getSeconds() : date.getSeconds()}
    `;

    setTimeout(() => { progress(); }, 1000);
})();

setTimeout(() => { document.body.style.opacity = 1 }, 60);