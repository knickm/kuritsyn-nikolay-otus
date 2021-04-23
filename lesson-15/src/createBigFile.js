const fs = require('fs');

/**
 * Слабо перемешивает массив на месте.
 * Но зато быстро
 * @param {Array<any>} a массив
 */
function shuffle(a) {
	const m = Math.floor(a.length / 2);
	for (let i = 0; i < m; ++i) {
		const j = Math.floor(Math.random() * a.length);
		const x = a[j];
		a[j] = a[i];
		a[i] = x;
	}
}

/**
 * Считает сколько приблизительно потребуется чисел для заполнения файла с заданным объемом в байтах
 * @param {number} size 
 * @returns number
 */
function calcNumString(size) {
	let prev = 0, sum = 0, lines = 0;

	const maxR = Math.floor(Math.log10(size));
	prev = maxR;

	while (prev > 1) {
		--prev;
		const lin = 10 ** prev - (prev > 1 ? (10 ** (prev - 1)) : 0);
		lines += lin;
		sum += (prev + 1) * lin;
	}
	lines += (size - sum) / (maxR + 1);

	return Math.ceil(lines);
}

/*************************************************/
/*             MAIN                              */
/*************************************************/
const maxLine = calcNumString(100 * 1024 * 1024);
console.info(`numbers count:${maxLine}\n`);

console.info("generate array and shuffle it...");
console.time('done');
const numbers = [...Array(maxLine).keys()];
shuffle(numbers);
console.timeEnd('done');
console.log();

console.info("write to file...");
console.time('complete');
var stream = fs.createWriteStream("data.num");
stream.once('open', (fd) => {
	stream.write(numbers.join("\n"));
	stream.write("\n"); // завершающий перенос строки
	stream.end(console.timeEnd("complete"));
});
