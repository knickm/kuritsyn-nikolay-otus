import * as fs from 'fs/promises';
import { join, resolve } from 'node:path';
import { exit } from 'node:process';

class CTree {
	static files: Array<string> = [];
	static dirs: Array<string> = [];

	private async tree(path: string): Promise<{ files: Array<string>, dirs: Array<string> }> {
		return fs.realpath(path)
			.then(p => fs.opendir(p))
			.then(async d => {
				for await (const dirent of d) {
					const p = join(path, dirent.name);
					if (dirent.isDirectory()) {
						CTree.dirs.push(p);
						await this.tree(p);
					} else if (dirent.isFile()) {
						CTree.files.push(p);
					}
				}
				return { files: CTree.files, dirs: CTree.dirs }
			})
	}

	static main(argv: Array<string>) {
		const argvs = argv.slice(2);

		if (argvs.length === 0 || argvs[0] === '--help') {
			console.info("tree - вывод списка файлов и папок файловой системы");
			console.info(`
Usage:
node tree.js path

  --help     вывод этой подсказки
  --resolve  выведет полный путь к файлам и директории
             иначе покажет относительные пути
`);
			exit(0);
		}

		const resolvePath = argvs.length === 2 && argvs[1] === '--resolve';

		let path = argvs[0];
		if (resolvePath) {
			path = resolve(path);
		}

		new CTree().tree(path)
			.then(r => console.log(r))
			.catch(e => console.error("Что то пошло не так:", e));

	}
}

CTree.main(process.argv);
