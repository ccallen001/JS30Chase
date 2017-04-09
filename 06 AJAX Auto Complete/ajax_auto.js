'use strict';

const input = document.getElementsByTagName(`input`)[0],
    output = document.getElementsByTagName(`output`)[0];

let inpVal,
    cities,
    sliced,
    ioBgColor = getComputedStyle(document.documentElement).getPropertyValue(`--io-bg-color`),
    highlight = getComputedStyle(document.documentElement).getPropertyValue(`--highlight`);

function showPop(_this, pop) {
    let thisPop = _this.querySelector(`.pop`),
        humanI;
    
    pop = pop.toString().split(``).reverse();
    pop.forEach((ea, i) => {
        humanI = i + 1;

        if (pop.length > 3 && humanI % 3 === 0 && pop[humanI]) { pop[i] = `,${pop[i]}`; }
    });
    pop = pop.reverse().join(``);

    thisPop.textContent = `P: ${pop}`;

    _this.onmouseout = () => { thisPop.textContent = null; }
}

function ajaxComplete() {
    input.addEventListener(`keyup`, ev => {
        inpVal = input.value.toLowerCase();

        output.innerHTML = null;

        cities.forEach(city => {
            sliced = city.city.slice(0, inpVal.length);

            if (inpVal !== `` && sliced.toLowerCase() === inpVal) {
                output.innerHTML += `
                    <p style="background-color: ${ioBgColor};"
                    
                        onmouseover="showPop(this, ${city.population})">

                        <span style="background-color: ${highlight};">${sliced}</span>${city.city.slice(inpVal.length)}
                        <span class="pop"></span>
                    </p>
                `
            }
        });
    });
}

//fetch the city data, then call the function to work with the data
fetch(`https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw`)
    .then(resp => resp.json()
        .then(j => {
            cities = j;
            ajaxComplete();
        })
        .catch(e => `there was an error: ${e}`)
        .catch(e => `there was an error: ${e}`)
    );