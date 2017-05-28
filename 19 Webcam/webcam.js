'use strict';

const filter = document.querySelector(`.filter`), //get filter
    video = document.querySelector(`video`), //git video
    inputs = [...document.querySelectorAll(`.inputs-container input[type="range"]`)], //get inputs and put in an array
    wildOnes = [inputs[0], inputs[4]],
    initialState = inputs.map(input => input.value); //get inputs initial states

var [blur, brightness, contrast, grayscale, huerotate, invert, saturate, sepia] = initialState; //instantiate and initial vars (use 'var' for later window refernce)

//function to set filter values
function setFilter() {
    filter.style.filter = `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) hue-rotate(${huerotate}deg) invert(${invert}%) saturate(${saturate}%) sepia(${sepia}%)`;
}

//----------------------------------------------------------------------------------------//

//add listeners to inputs
inputs.forEach(input => input.addEventListener(`input`, ev => {
    window[input.className] = ev.target.value;
    setFilter();
}));

//go wild!
let goWild;
document.querySelector(`.go-wild`).addEventListener(`click`, ev => {
    goWild = setInterval(() => {
        wildOnes.forEach(one => {
            one.value = Math.floor(Math.random() * one.max);
            window[one.className] = one.value;
        });
        setFilter();
    }, 100)
});

//stop wild
wildOnes.forEach(one => one.addEventListener(`input`, ev => clearInterval(goWild)));

//reset
document.querySelector(`.reset`).addEventListener(`click`, ev => {
    clearInterval(goWild);
    inputs.forEach((input, i) => {
        input.value = initialState[i]; //weird way to do it... I know...
        window[input.className] = input.value;
    });
    setFilter();
});

//----------------------------------------------------------------------------------------//

//start video
navigator &&
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(mS => {
            video.srcObject = mS;
            video.onloadedmetadata = ev => video.play()
        })
        .catch(err => console.log(err));