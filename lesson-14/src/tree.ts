import * as fs from 'fs/promises';
import { join, resolve } from 'node:path';

const files: Array<string> = [];
const dirs: Array<string> = [];

async function tree(path: string) {
	return fs.realpath(path)
		.then(p => fs.opendir(p))
		.then(async d => {
			for await (const dirent of d) {
				const p = join(path, dirent.name);
				if (dirent.isDirectory()) {
					dirs.push(p);
					await tree(p);
				} else if (dirent.isFile()) {
					files.push(p);
				}
			}
		})
}

const path = process.argv[2];

if (!path || path === '--help') {
	console.log("Usage:\nnode tree.js path");
} else {
	tree(resolve(path))
		.then(() => console.log({ files, dirs }))
		.catch(e => console.error("Что то пошло не так:", e));
}
