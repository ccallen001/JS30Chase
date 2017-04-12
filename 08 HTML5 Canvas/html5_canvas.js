'use strict';

const canvas = document.getElementById(`canvas`),
    ctx = canvas.getContext(`2d`);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//ctx.strokeStyle = `hsl(${hue++}, 100%, 50%)`;
ctx.lineJoin = `round`;
ctx.lineCap = `round`;
ctx.lineWidth = 10;

let hue = 0,
    direction = true;

let drawing = false;
canvas.onmousedown = () => drawing = true;
canvas.onmouseup = () => drawing = false;
canvas.onmouseover = e => { if (e.buttons) { drawing = true; } };
canvas.onmouseout = () => drawing = false;

function draw(e) {
    draw.x = e.x;
    draw.y = e.y;
    //console.log(drawing);
    /////////////////////////
    if (!drawing) { return; }
    /////////////////////////
    ctx.beginPath();
    ctx.moveTo(draw.x, draw.y);
    ctx.lineTo(e.x, e.y);
    ctx.strokeStyle = `hsl(${hue++}, 100%, 50%)`;
    ctx.stroke();

    if (direction) {
        ctx.lineWidth++;
        if (ctx.lineWidth > 45) { direction = false; }
    } else {
        ctx.lineWidth--;
        if (ctx.lineWidth < 10) { direction = true; }
    }
    //console.log(ctx.lineWidth, direction);
}

canvas.addEventListener(`mousedown`, draw);
canvas.addEventListener(`mousemove`, draw);