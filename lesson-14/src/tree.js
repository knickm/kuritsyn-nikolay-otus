import * as fs from 'fs/promises';
import { join, resolve } from 'node:path';
const files = [];
const dirs = [];
async function tree(path) {
    return fs.realpath(path)
        .then(p => fs.opendir(p))
        .then(async (d) => {
        for await (const dirent of d) {
            const p = join(path, dirent.name);
            if (dirent.isDirectory()) {
                dirs.push(p);
                await tree(p);
            }
            else if (dirent.isFile()) {
                files.push(p);
            }
        }
    });
}
const path = process.argv[2];
if (path) {
    await tree(resolve(path));
    console.log({ files, dirs });
}
else {
    console.log("Usage:\nnode tree.js path");
}
