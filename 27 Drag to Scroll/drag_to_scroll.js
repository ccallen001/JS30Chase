'use strict';

let bod = document.body,
    xStart,
    xEnd,
    yStart,
    yEnd,
    xDistance,
    yDistance,
    slowness = 25; // larger it is, less pronounced the drag

addEventListener(`mousedown`, ev => {
    xStart = ev.x;
    yStart = ev.y;
});

addEventListener(`mousemove`, ev => {
    if (ev.buttons) {
        ev.preventDefault();

        xEnd = ev.x;
        yEnd = ev.y;

        xDistance = xEnd - xStart;
        yDistance = yEnd - yStart;

        // console.log({ xDistance: xDistance, yDistance: yDistance });

        bod.scrollLeft -= (xDistance / slowness);
        bod.scrollTop -= (yDistance / slowness);

        // console.log(bod.scrollLeft);
    }
});
