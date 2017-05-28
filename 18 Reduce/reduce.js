'use strict';

let inp = document.querySelector(`#times input`),
	add = document.getElementById(`add`),
	ul = document.querySelector(`#times ul`),
	totalBtn = document.getElementById(`total-btn`),
	total = document.getElementById(`total`);

function addXListeners() {
	document.querySelectorAll(`#times div span`).forEach(ea => {
		if (!ea.listening) {
			ea.addEventListener(`click`, ev => {
				ul.removeChild(ev.target.parentElement);
			});
			ea.listening = true;
		}
	});
}
addXListeners();

function resetInp() {
	inp.value = null;
	inp.focus();
}

add.addEventListener(`click`, ev => {
	let numColons = inp.value.split(``).filter(val => val === `:`).length;

	if (inp.value && !/[^\d:]/gm.test(inp.value) && numColons < 3) {
		ul.insertAdjacentHTML(`afterbegin`,
			`
            <div>
                <span>[X]</span><li>${inp.value}</li>
            </div>
        `);

		resetInp();

		addXListeners();
	} else {
		alert(`Oops! Time format must be h:m:s.`);

		resetInp();
	}
});

function totalTimes() {
	let times = [...document.querySelectorAll(`#times li`)].map(li => li.textContent ? li.textContent.split(`:`) : ``),
		totals = { hours: 0, mins: 0, secs: 0 };
	times.hours = [];
	times.mins = [];
	times.secs = [];

	times.forEach(ea => {
		if (!isNaN(+(ea[0]))) times.hours.push(+ea[0]);
		if (!isNaN(+(ea[1]))) times.mins.push(+ea[1]);
		if (!isNaN(+(ea[2]))) times.secs.push(+ea[2]);
	});

	[`hours`, `mins`, `secs`].forEach(ea => { totals[ea] = times[ea].reduce((a, b) => a + b, 0); });

	if (totals.secs > 59) {
		totals.mins += Math.floor(totals.secs / 60);
		totals.secs = totals.secs % 60;
	}

	if (totals.mins > 59) {
		totals.hours += Math.floor(totals.mins / 60);
		totals.mins = totals.mins % 60;
	}

	//console.log(totals);

	total.textContent = `total: ${totals.hours}:${totals.mins}:${totals.secs}`;
}

totalBtn.addEventListener(`click`, totalTimes);