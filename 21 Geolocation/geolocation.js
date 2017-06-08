'use strict';

const arrow = document.getElementById(`arrow`),
    output = document.getElementById(`output`);

navigator.geolocation.watchPosition(
    data => {
        // console.log(data);
        if (data.coords) {
            arrow.style.transform = `rotate(${data.coords.heading}deg)`;
            output.textContent = `${data.coords.speed || `error`} km/hr`;
        } else {
            output.textContent = `Oops! There was an error`;
        }
    },
    err => {
        alert(`Oops! Need to allow geolocation!`);
    }
);
