'use strict';

const root = document.documentElement.style,
    buttons = document.querySelectorAll(`#themes button`),
    props = [`--bg-color`, `--color`, `--font`],
    themeMap = {
        'Theme 1': e => {
            let values = [`whitesmoke`, `#111`, `tahoma`];

            for (let i = 0; i < 3; i++) {
                root.setProperty(props[i], values[i]);
            }
        },
        'Theme 2': e => { 
            let values = [`rgba(25, 200, 50, .75)`, `lime`, `monospace`];

            for (let i = 0; i < 3; i++) {
                root.setProperty(props[i], values[i]);
            }
        },
        'Theme 3': e => {
            let values = [`cornflowerblue`, `indianred`, `cursive`];

            for (let i = 0; i < 3; i++) {
                root.setProperty(props[i], values[i]);
            }
        }
    }

    buttons.forEach(ea => ea.addEventListener(`click`, themeMap[ea.textContent]));