'use strict';

let mainContainer = document.querySelector(`.main-container`),
    containers = document.querySelectorAll(`.container:not(.title)`),
    ps = document.querySelectorAll(`.container:not(.title) p`),
    imgs = document.querySelectorAll(`.img`),
    [redSpot, bigToe, basket, drum, pet] = imgs, //destructured!
    leftOrRight,
    sY,
    i = 0;

imgs.forEach((ea, i) => {
    //console.log({el: mainContainer.offsetTop + containers[i].offsetTop + ps[i].offsetTop + ea.offsetTop + 128});
    ea.height = parseInt(getComputedStyle(ea).getPropertyValue(`height`));
    ea.scrollInHeight = mainContainer.offsetTop + containers[i].offsetTop + ps[i].offsetTop + ea.offsetTop + (ea.height / 2);
    ea.scrollOutHeight = mainContainer.offsetTop + containers[i].offsetTop + ps[i].offsetTop + parseInt(getComputedStyle(containers[i]).getPropertyValue(`height`)) + ea.height * 1.5;
    //console.log(ea.scrollInHeight, ea.scrollOutHeight);
});

function bringIn(img) {
    img.style.opacity = 1;
    img.style.transform = `translateY(8px)`;
}

function takeOut(img) {
    img.style.opacity = 0;
    leftOrRight = img.classList.contains(`left`) ? -110 : 110;
    img.style.transform = `scale(.75) translate(${leftOrRight}%) translateY(10%)`;
}

window.addEventListener(`scroll`, ev => {
    i++;
    if (window.scrollY === 0 || i % 2 === 0) { //debouncing
        sY = window.scrollY + window.innerHeight;
        //console.log(window.scrollY, sY);
        window.scrollY === 0 || (sY >= 0 && sY < redSpot.scrollOutHeight) ? bringIn(redSpot) : takeOut(redSpot);
        sY >= bigToe.scrollInHeight && sY < bigToe.scrollOutHeight ? bringIn(bigToe) : takeOut(bigToe);
        sY >= basket.scrollInHeight && sY < basket.scrollOutHeight ? bringIn(basket) : takeOut(basket);
        sY >= drum.scrollInHeight && sY < drum.scrollOutHeight ? bringIn(drum) : takeOut(drum);
        sY >= pet.scrollInHeight && sY < pet.scrollOutHeight ? bringIn(pet) : takeOut(pet);
    }
});

console.log(`%cBOO!`, `color: #efefef; font-size: 64px; font-weight: bold; text-shadow: 0 0 32px white;`);
console.log(
    `
 ,                                                               ,
 |'.                                                           .'/
  ),|                                                         /,( 
 /__|'.                                                     .'/__|
 |  .'.'-.__                                           __.-'.'.  /
  .)   .'-. |                                         / .-'.   ('
  /   _.--'| '.          ,               ,          .' /'--._   |
  |-'.      '. '-.__    / |             / |    __.-' .'      .'-|
  |         _..'-.,_'-.|/| |    _,_    / /||.-'_,.-'.._         /
   .|    .-'       /'-.|| | |.-"   "-.| / ||.-'|       '-.    /.
     )-'.        .'   :||  / -.|| //.- |  ||:   '.        .'-(
    /          .'    / ||_ |  /o.^'o|  | _// |    '.          |
    |       .-'    .'   .--|  ."/ |".  |--.   '.    '-.       /
     .)  _.'     .'    .--.; ||__"__/| ;.--.    '.     '._  ('
     /_.'     .-'  _.-'     || |/^|/ //     .-._  '-.     '._|
     |     .'._.--'          ||     //          .--._.'.     /
      '-._' /.            _   ||-.-//   _            .| '_.-'
          .<     _,..--''.|    |."./    |.''--..,_     >.
           _|  ..--..__   |     .'.     /   __..--..  /_
          /  '-.__     ..'-;    / |    ;-'..     __.-'  |
         |    _   ..''--..  |'-' | '-'/  ..--''..   _    |
         |     '-.       /   |/--|--||   |       .-'     /
          '-._    '-._  /    |---|---|    |  _.-'    _.-'
              .'-._   '/ / / /---|---| | | |'   _.-'.
                   '-./ / / / |.---./ | | | |.-'
                       .). .  /'---'|  . .(.
                      /.     |       |     .|
                     /  /  | |       | |  |  |
                 .--'  /   | '.     .' |   |  '--.
                /_____/|  / |._|   /_./ |  ||_____|
               (/      (/'     |) (/     .|)      |)
    `
)