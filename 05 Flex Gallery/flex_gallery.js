'use strict';

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Show me the booodddyyyy!!!!

function showBody() {
    setTimeout(() => {
        //show it
        document.body.style.opacity = 1;
        //grow it
        document.getElementById("panel3").style.animation = `blubb 1.75s ease-out`;
    }, 100);
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let panels = document.querySelectorAll(".panels");

panels.forEach(ea => {
    ea.addEventListener("click", ev => {
        let curTar = ev.currentTarget;

        panels.forEach(ea => ea.style.flex = 1);
        curTar.style.flex = 3;

        document.querySelectorAll(`p.top`).forEach(p => p.style.marginTop = `-10vh`);
        document.querySelectorAll(`p.mid`).forEach(p => p.style.transform = `scale(1)`);
        document.querySelectorAll(`p.bot`).forEach(p => p.style.marginBottom = `-10vh`);
        curTar.querySelectorAll(`p`).forEach((p, i) => {
            if (i === 0) { p.style.marginTop = `20vh` }
            else if (i === 1) { p.style.transform = `scale(1.2)` }
            else if (i === 2) { p.style.marginBottom = `20vh` }
        });
    });
});