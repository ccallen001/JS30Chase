'use strict';

const navbar = document.querySelector(`nav`),
    navs = document.querySelectorAll(`nav ul li a`),
    triangle = document.getElementById(`triangle`),
    followAlong = document.getElementById(`follow-along`);

let transTime = `0.2s`, // initial transtime is defined in the css.. this one will take over after hovering over navs
    contents = [
        // content 0
        `
        <div id="bland-city" class="bland">
            <h2>Bland City!</h2>
            <span class="bland-icon city"></span>
            <ul>
                <li>It's bland...</li>
                <li>It's a city...</li>
                <li>It's BLAND CITY!</li>
            </ul>
            <p>bland</p>
        </div>
        `
        ,
        // content 1
        `
        <div id="bland-land" class="bland">
            <h2>Bland Land!</h2>
            <span class="bland-icon land"></span>
            <ul>
                <li>It's bland...</li>
                <li>It's land...</li>
                <li>It's BLAND LAND!</li>
            </ul>
            <p>bland</p>
            <p>bland</p>
            <p>bland</p>
            <p>bland</p>
            <p>bland</p>
            <p>bland</p>
        </div>
        `
        ,
        // content 2
        `
        <div id="bland-town" class="bland">
            <h2>Bland Town!</h2>
            <span class="bland-icon town"></span>
            <ul>
                <li>It's bland...</li>
                <li>It's a town...</li>
                <li>It's BLAND TOWN!</li>
            </ul>
            <p>bland</p>
            <p>bland</p>
            <p>bland</p>
        </div>
        `
    ];

function getBR(el) {
    return el.getBoundingClientRect()
}

function getStyle(el, prop) {
    return window.getComputedStyle(el).getPropertyValue(prop);
}

navs.forEach((nav, i) => {
    nav.addEventListener(`mouseover`, () => {
        followAlong.innerHTML = contents[i];

        followAlong.style.width = `${getBR(followAlong.querySelector('div')).width}px`;
        followAlong.style.height = `${getBR(followAlong.querySelector('div')).height}px`;

        // quick and dirty
        followAlong.querySelector('div').style.opacity = 1;

        [triangle, followAlong].forEach(ea => {
            ea.style.left = 0;
            ea.style.transform = `translate(${getBR(nav).left + ((getBR(nav).width - (ea === triangle ? getBR(ea).width : ea.style.width.replace('px', ''))) / 2)}px)`; // whoa
            ea.style.display = `inline-block`;
            // yuck
            setTimeout(() => {
                ea.style.transition = `top ${transTime} linear 0s, left ${transTime} linear 0s, width ${transTime} linear 0s, height ${transTime} linear 0s, transform ${transTime} linear 0s`;
            }, getStyle(ea, `--trans-time`.replace(/s/, ``)) * 1000);
        });
    });
});

navbar.addEventListener(`mouseout`, () => {
    // TODO: revert to original state
});

// TODO: keep state on mouseover, revert to original on mouseout
followAlong.addEventListener(`mouseover`, () => { });
followAlong.addEventListener(`mouseout`, () => { });

// console.log(getStyle(document.documentElement, `--trans-time`)); // <-- use to get initial state