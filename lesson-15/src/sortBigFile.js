const fs = require('fs');
const { join } = require('path');

/**
 * Делит файл с числами на файлы размером не больше заданного (`size`), разрезая по границе числа
 * @param {string} pathFn имя файла
 * @param {number} size размер куска
 * @returns `Promise<number>` сколько получилось кусков
 */
function splitFile(pathFn, size) {
	return new Promise((resolve, rejects) =>
		(rs => rs.on('readable', () => rs.read()))(
			((sbuf, i) => (
				Buffer.from(''), 0,
				fs.createReadStream(join(__dirname, pathFn), { highWaterMark: size })
					.on('data', (chunk) => {
						(n => {
							fs.writeFileSync(join(__dirname, `${pathFn}_${i++}.chunk`),
								Buffer.concat([sbuf, chunk.slice(0, n)])
									.toString()
									.split("\n")
									.map(n => parseInt(n)).filter(n => !isNaN(n)).sort((a, b) => a - b).join("\n"));
							sbuf = chunk.slice(n);
						})(chunk.lastIndexOf("\n") + 1)
					})
					.on('end', () => ((sbuf.length > 0 && fs.writeFileSync(join(__dirname, `${pathFn}_${i++}.chunk`), sbuf)), resolve(i)))
					.on('error', (err) => rejects(err))
			))(Buffer.from(''), 0)
		))
}

/**
 * Генератор. Возвращает числа из файла
 * @param {fs.ReadStream} rs поток для чтения
 */
async function* getNumber(rs) {
	let tail = Buffer.from('');
	for await (let chunk of rs) {
		let buf = Buffer.concat([tail, chunk]);
		while (true) {
			const n = buf.indexOf("\n");
			if (n === -1) {
				tail = buf;
				break;
			}
			yield buf.slice(0, n).toString();
			buf = buf.slice(n + 1);
		}
	}
	yield tail.toString();
}

/**
 * Возвращает индекс минимального числа игнорируя undefined
 * @param {Array<number>} a array of numbers
 * @returns минимальное число из массива
 */
function minIndex(a) {
	let idx = a.length;

	while (a[--idx] === undefined);

	for (let i = 0, len = idx; i < len; ++i) {
		if (a[i] !== undefined && a[i] < a[idx]) {
			idx = i;
		}
	}
	return idx;
}


/*************************************************/
/*             MAIN                              */
/*************************************************/
const fileName = process.argv[2];
splitFile(fileName, 7 * 1024 * 1024).then(async (numberChunk) => {
	const ws = fs.createWriteStream(join(__dirname, `${fileName}.sorted`));
	const sources = [];
	for (let i = 0; i < numberChunk; ++i) {
		sources.push(
			getNumber(fs.createReadStream(join(__dirname, `${fileName}_${i}.chunk`), { highWaterMark: 8 * 1024 })),
		)
	}

	const write = async () => {
		while (numbers.filter(v => v !== undefined).length > 0) {
			const i = minIndex(numbers);
			ws.write(numbers[i].toString() + "\n");
			const val = await sources[i].next();
			numbers[i] = val.value === undefined ? undefined : parseInt(val.value);
		}
	};

	const numbers = [];
	sources.forEach(async (v) => {
		const val = await v.next();
		numbers.push(parseInt(val.value));
		if (numbers.length === sources.length) {
			write();
		}
	});
});
