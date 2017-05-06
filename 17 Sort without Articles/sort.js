'use strict';

const [art, noArt] = document.querySelectorAll(`input[name="articles"]`),
    csv = document.getElementById(`csv`),
    sort = document.getElementById(`sort`),
    list = document.getElementById(`list`);

let articles = /*[`a`, `an`, `the`, `A`, `An`, ``AN, `The`, `THe`, `THE`]*/ /a|an|the/i,
    names = [];

art.checked = true;
csv.value = `A Long Time, The First Month, Two Towns, My Adventure`;

sort.addEventListener(`click`, ev => {
    list.innerHTML = null;

    csv.value
        .split(`, `)
        .map(name => {
            return name
                .trim()
                .split(` `);
        })
        .sort((a, b) => {
            //console.log(a, b);
            if (art.checked) {
                return a > b ? 1 : -1;;
            } else {
                if (/*articles.includes(a[0]) && articles.includes(b[0])*/ articles.test(a[0]) && articles.test(b[0])) {
                    return a[1] > b[1] ? 1 : -1;
                } else if (/*articles.includes(a[0])*/ articles.test(a[0])) {
                    return a[1] > b[0] ? 1 : -1;
                } else if (/*articles.includes(b[0])*/ articles.test(b[0])) {
                    return a[1] > b[0] ? 1 : -1;
                } else {
                    return a > b ? 1 : -1;
                }
            }
        })
        .forEach(value => {
            list.innerHTML += `<li>${value.join(` `)}</li>`;
        });
});