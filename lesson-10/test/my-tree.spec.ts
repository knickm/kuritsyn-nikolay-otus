// import { expect } from 'chai';
// import { fileURLToPath } from 'url';
import * as fs from 'fs';
import { join } from 'path';
import { JSDOM } from 'jsdom';
const jsdomglobal = import('jsdom-global');
import { MyTree } from '../src/my-tree';

const pathToTestHTML = join(__dirname, "test.html");

// type HTMLElement = typeof global.window.HTMLElement.prototype;

(async function f() {
	await jsdomglobal.then()
})()

describe("Testing custom element my-tree", () => {
	beforeAll(() => {
		var testHtml = fs.readFileSync(pathToTestHTML);
		const window = new JSDOM(testHtml).window;
		document.body.innerHTML = window.document.body.innerHTML;
	});
	test("Tag <tree>", () => {
		setTimeout(() => {
			const host = document.querySelector("#tree-1")?.shadowRoot?.host;
			let node = null;
			if (host) {
				console.log(host);
				node = ((host as any).childNodes[0] as HTMLElement).shadowRoot?.querySelector("#t1");
			}
			expect(node).not.toBeNull();
		});
	});

	test("Constructor", () => {
		const tree = new MyTree(null);
		expect(tree).not.toBeNull();
	});

	test("Set attribute \"tree\"", () => {
		const tree = new MyTree(null);
		tree.Tree = {
			"id": "2", "items": [
				{
					"id": "2-1",
					"items": [{ "id": "2-1-1" }, { "id": "2-1-2" }]
				},
				{
					"id": "2-2",
					"items": [{ "id": "2-2-1" }]
				}
			]
		};

		expect(tree.Tree.id).toEqual("2");
	});

	test("Append <my-tree> to body", () => {
		const tree = new MyTree("new-tree");
		tree.Tree = {
			"id": "new-2", "items": [
				{
					"id": "new-2-1",
					"items": [{ "id": "new-2-1-1" }, { "id": "new-2-1-2" }]
				},
				{
					"id": "new-2-2",
					"items": [{ "id": "new-2-2-1" }]
				}
			]
		};
		document.body.appendChild(tree);
		setTimeout(() => {
			const host = document.querySelector("#tree-1")?.shadowRoot?.host;
			let node = null;
			if (host) {
				console.log(host);
				node = ((host as any).childNodes[0] as HTMLElement).shadowRoot?.querySelector("#new-2");
			}
			expect(node).not.toBeNull();
		});
	});
})
